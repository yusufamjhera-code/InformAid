// ================== IMPORTS & CONFIG ==================
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const nodemailer = require('nodemailer');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const app = express();

// ================== MIDDLEWARE ==================
app.use(cors());
app.use(express.json());

// ================== MONGODB CONNECTION ==================
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/informaid')
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('MongoDB connection error:', err));

// ================== SCHEMAS ==================
// Scheme Schema
const schemeSchema = new mongoose.Schema({
  name: String,
  short_description: String,
  full_description: String,
  eligibility: [String],
  benefits: [String],
  documents_required: [String],
  application_process: [String],
  disability_type: Number, // 1: Visual, 2: Hearing, 3: Intellectual, 4: Physical
  created_at: { type: Date, default: Date.now }
});
const Scheme = mongoose.model('Scheme', schemeSchema);

// User Schema (with OTP fields)
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  gender: String,
  dob: String,
  bloodGroup: String,
  contact: { type: String, required: true },
  address: String,
  disabilityType: String,
  isVerified: { type: Boolean, default: false },
  otp: String,
  otpExpires: Date,
  created_at: { type: Date, default: Date.now }
});
const User = mongoose.model('User', userSchema);

// ================== EMAIL TRANSPORTER ==================
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

function sendOTPEmail(to, otp) {
  return transporter.sendMail({
    from: process.env.EMAIL_USER,
    to,
    subject: 'Your InformAid OTP Code',
    text: `Your OTP code is: ${otp}`
  });
}

// ================== AUTH ROUTES ==================
// Login endpoint
app.post('/api/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log('Login attempt for email:', email);
    
    // Validate input
    if (!email || !password) {
      console.log('Missing email or password');
      return res.status(400).json({ message: 'Email and password are required' });
    }

    // Find user
    const user = await User.findOne({ email });
    console.log('User found:', user ? 'Yes' : 'No');
    
    if (!user) {
      console.log('User not found');
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Check if account is verified
    if (!user.isVerified) {
      console.log('User not verified');
      return res.status(401).json({ message: 'Please verify your email first' });
    }

    // Check password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    console.log('Password valid:', isPasswordValid);
    
    if (!isPasswordValid) {
      console.log('Invalid password');
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Generate JWT token
    const token = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '24h' }
    );

    // Return user data (excluding password) and token
    const { password: _, ...userWithoutPassword } = user.toObject();
    console.log('Login successful for user:', user.email);
    res.json({
      message: 'Login successful',
      token,
      user: userWithoutPassword
    });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Registration endpoint with OTP generation
app.post('/api/signup', async (req, res) => {
  try {
    const { name, email, password, gender, dob, bloodGroup, contact, address, disabilityType } = req.body;
    // Basic validation
    if (!name || !email || !password || !contact) {
      return res.status(400).json({ message: 'Missing required fields' });
    }
    // Check if user already exists
    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(409).json({ message: 'Email already exists' });
    }
    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    // Generate OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const otpExpires = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes
    // Create user (unverified)
    const user = new User({
      name, email, password: hashedPassword, gender, dob, bloodGroup, contact, address, disabilityType,
      otp, otpExpires, isVerified: false
    });
    await user.save();
    // Send OTP email
    await sendOTPEmail(email, otp);
    res.status(201).json({ message: 'User registered. OTP sent to email.' });
  } catch (err) {
    console.error('Signup error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// OTP verification endpoint
app.post('/api/signup/verify', async (req, res) => {
  try {
    const { email, otp } = req.body;
    if (!email || !otp) return res.status(400).json({ message: 'Email and OTP required' });
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: 'User not found' });
    if (user.isVerified) return res.status(400).json({ message: 'User already verified' });
    if (user.otp !== otp) return res.status(400).json({ message: 'Invalid OTP' });
    if (user.otpExpires < new Date()) return res.status(400).json({ message: 'OTP expired' });
    user.isVerified = true;
    user.otp = undefined;
    user.otpExpires = undefined;
    await user.save();
    res.json({ message: 'Account verified successfully' });
  } catch (err) {
    console.error('OTP verify error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// ================== TRIE SEARCH (Optional optimization) ==================
const ServerTrie = require('./utils/trieServer');
let schemeTrie = null;
let allSchemesCache = [];

// ================== GRAPH FOR RECOMMENDATIONS ==================
const ServerGraph = require('./utils/graphServer');
let schemeGraph = null;

// Build Trie when server starts (optional optimization)
async function buildTrie() {
  try {
    const schemes = await Scheme.find({});
    allSchemesCache = schemes;
    schemeTrie = new ServerTrie();
    schemeTrie.buildFromSchemes(schemes);
    console.log('Server-side Trie built with', schemes.length, 'schemes');
  } catch (err) {
    console.error('Error building Trie:', err);
  }
}

// Rebuild Trie when schemes are updated
buildTrie();

// Build Graph for recommendations
async function buildGraph() {
  try {
    const schemes = await Scheme.find({});
    schemeGraph = new ServerGraph();
    schemeGraph.buildGraph(schemes, 0.2); // 0.2 similarity threshold
    console.log('Server-side Graph built:', schemeGraph.getStats());
  } catch (err) {
    console.error('Error building Graph:', err);
  }
}

buildGraph();

// ================== SCHEME ROUTES ==================
app.get('/api/schemes/:id', async (req, res) => {
  try {
    const schemes = await Scheme.find({ disability_type: parseInt(req.params.id) });
    res.json(schemes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Smart search endpoint using Trie
app.get('/api/search', async (req, res) => {
  try {
    const { q, limit = 10 } = req.query;
    
    if (!q || q.trim().length === 0) {
      return res.json([]);
    }

    // Use Trie if available, otherwise fallback to database search
    if (schemeTrie) {
      const schemeIds = schemeTrie.search(q.trim(), parseInt(limit));
      const schemes = allSchemesCache.filter(s => 
        schemeIds.includes(s._id.toString())
      );
      res.json(schemes);
    } else {
      // Fallback to MongoDB text search
      const schemes = await Scheme.find({
        $or: [
          { name: { $regex: q, $options: 'i' } },
          { short_description: { $regex: q, $options: 'i' } }
        ]
      }).limit(parseInt(limit));
      res.json(schemes);
    }
  } catch (error) {
    console.error('Search error:', error);
    res.status(500).json({ message: 'Search error' });
  }
});

app.get('/api/scheme/:id', async (req, res) => {
  try {
    console.log('Fetching scheme with ID:', req.params.id);
    
    // Validate ID format
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      console.log('Invalid scheme ID format');
      return res.status(400).json({ message: 'Invalid scheme ID format' });
    }

    const scheme = await Scheme.findById(req.params.id);
    console.log('Found scheme:', scheme ? 'Yes' : 'No');
    
    if (!scheme) {
      console.log('Scheme not found');
      return res.status(404).json({ message: 'Scheme not found' });
    }

    console.log('Successfully fetched scheme:', scheme.name);
    res.json(scheme);
  } catch (error) {
    console.error('Error fetching scheme:', error);
    res.status(500).json({ message: 'Error fetching scheme details' });
  }
});

// Get recommendations for a scheme using Graph BFS/DFS
app.get('/api/scheme/:id/recommendations', async (req, res) => {
  try {
    const { id } = req.params;
    const { method = 'bfs', limit = 5 } = req.query;
    
    // Validate ID format
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid scheme ID format' });
    }

    // Use Graph if available
    if (schemeGraph) {
      const recommendations = schemeGraph.getRecommendations(
        id, 
        parseInt(limit), 
        method
      );
      
      // Extract just the schemes from recommendations
      const schemes = recommendations.map(rec => rec.scheme);
      return res.json(schemes);
    }

    // Fallback: Get schemes with same disability type
    const scheme = await Scheme.findById(id);
    if (!scheme) {
      return res.status(404).json({ message: 'Scheme not found' });
    }

    const relatedSchemes = await Scheme.find({
      disability_type: scheme.disability_type,
      _id: { $ne: id }
    }).limit(parseInt(limit));

    res.json(relatedSchemes);
  } catch (error) {
    console.error('Error fetching recommendations:', error);
    res.status(500).json({ message: 'Error fetching recommendations' });
  }
});

// ================== START SERVER ==================
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
}); 