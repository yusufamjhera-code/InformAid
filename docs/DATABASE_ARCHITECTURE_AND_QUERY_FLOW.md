# Database Architecture and Query Flow: Frontend → Backend → Database

## Table of Contents

1. [Database Architecture Overview](#database-architecture-overview)
2. [MongoDB Connection Setup](#mongodb-connection-setup)
3. [Database Schema Design](#database-schema-design)
4. [Complete Query Flow](#complete-query-flow)
5. [Frontend to Backend Communication](#frontend-to-backend-communication)
6. [Backend to Database Communication](#backend-to-database-communication)
7. [Detailed Query Examples](#detailed-query-examples)
8. [Data Flow Diagrams](#data-flow-diagrams)

---

## Database Architecture Overview

### System Architecture

```
┌─────────────────────────────────────────────────────────┐
│                    FRONTEND (React)                      │
│  - User Interface (Browser)                             │
│  - React Components                                     │
│  - HTTP Requests (fetch/axios)                          │
└────────────────────┬────────────────────────────────────┘
                     │
                     │ HTTP/REST API
                     │ (JSON Data)
                     │
┌────────────────────▼────────────────────────────────────┐
│              BACKEND (Express.js)                        │
│  - API Endpoints (Routes)                               │
│  - Business Logic                                       │
│  - Authentication (JWT)                                  │
│  - Data Processing                                      │
└────────────────────┬────────────────────────────────────┘
                     │
                     │ Mongoose ODM
                     │ (Object Document Mapper)
                     │
┌────────────────────▼────────────────────────────────────┐
│              DATABASE (MongoDB)                           │
│  - Collections (Schemes, Users)                          │
│  - Documents (JSON-like)                                │
│  - Indexes                                              │
└─────────────────────────────────────────────────────────┘
```

### Technology Stack

- **Frontend:** React.js (Browser)
- **Backend:** Node.js + Express.js (Server)
- **Database:** MongoDB (NoSQL Document Database)
- **ODM:** Mongoose (MongoDB Object Document Mapper)

---

## MongoDB Connection Setup

### Connection Process

**File:** `server.js`

```javascript
// Step 1: Import Mongoose
const mongoose = require('mongoose');
require('dotenv').config();

// Step 2: Connect to MongoDB
mongoose.connect(
  process.env.MONGODB_URI || 'mongodb://localhost:27017/informaid'
)
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('MongoDB connection error:', err));
```

### Connection Details

**Connection String Format:**
```
mongodb://[username:password@]host[:port]/[database]
```

**Example:**
```
mongodb://localhost:27017/informaid
```

**What Happens During Connection:**
1. Mongoose establishes TCP connection to MongoDB server
2. Authenticates (if credentials provided)
3. Selects database: `informaid`
4. Creates connection pool for efficient query handling
5. Ready to accept queries

**Connection Pool:**
- Multiple connections maintained for concurrent requests
- Reuses connections instead of creating new ones
- Improves performance significantly

---

## Database Schema Design

### MongoDB Collections

MongoDB uses **Collections** (similar to tables in SQL) and **Documents** (similar to rows).

### Collection 1: Schemes

**Schema Definition:**
```javascript
const schemeSchema = new mongoose.Schema({
  name: String,
  short_description: String,
  full_description: String,
  eligibility: [String],           // Array of strings
  benefits: [String],              // Array of strings
  documents_required: [String],   // Array of strings
  application_process: [String],  // Array of strings
  disability_type: Number,        // 1-4
  official_link: String,
  created_at: { type: Date, default: Date.now }
});

const Scheme = mongoose.model('Scheme', schemeSchema);
```

**Example Document:**
```json
{
  "_id": ObjectId("507f1f77bcf86cd799439011"),
  "name": "ADIP Scheme",
  "short_description": "Financial assistance for aids and appliances",
  "full_description": "The ADIP Scheme aims at helping disabled persons...",
  "eligibility": [
    "Indian citizen with 40% or more disability",
    "Monthly income not exceeding Rs. 22,500/-"
  ],
  "benefits": [
    "Financial assistance for aids/appliances",
    "100% assistance for income below Rs. 15,000/-"
  ],
  "documents_required": [
    "Disability certificate",
    "Income certificate",
    "Aadhar card"
  ],
  "application_process": [
    "Contact nearest ALIMCO office",
    "Submit application with documents",
    "Assessment by medical board"
  ],
  "disability_type": 1,
  "official_link": "https://disabilityaffairs.gov.in/content/page/adip.php",
  "created_at": ISODate("2024-01-15T10:30:00Z")
}
```

### Collection 2: Users

**Schema Definition:**
```javascript
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
```

**Example Document:**
```json
{
  "_id": ObjectId("507f1f77bcf86cd799439012"),
  "name": "John Doe",
  "email": "john@example.com",
  "password": "$2a$10$hashedpassword...",
  "gender": "Male",
  "dob": "1990-01-15",
  "bloodGroup": "O+",
  "contact": "9876543210",
  "address": "123 Main St, City",
  "disabilityType": "Visual Impairment",
  "isVerified": true,
  "created_at": ISODate("2024-01-10T08:00:00Z")
}
```

### Why MongoDB (NoSQL)?

**Advantages for This Project:**
1. **Flexible Schema:** Each scheme can have different fields
2. **Array Support:** Native support for arrays (eligibility, benefits)
3. **JSON-like:** Matches JavaScript objects naturally
4. **Scalable:** Handles large datasets efficiently
5. **No Joins:** Embedded documents reduce query complexity

---

## Complete Query Flow

### Flow Diagram

```
┌──────────────┐
│   Browser    │
│  (Frontend)   │
└──────┬───────┘
       │
       │ 1. User Action (click, type, etc.)
       │
       ▼
┌─────────────────────────────────────┐
│  React Component                    │
│  - useState/useEffect               │
│  - Event Handlers                   │
└──────┬──────────────────────────────┘
       │
       │ 2. HTTP Request
       │    Method: GET/POST/PUT/DELETE
       │    URL: http://localhost:5000/api/...
       │    Headers: Content-Type: application/json
       │    Body: JSON data (if POST/PUT)
       │
       ▼
┌─────────────────────────────────────┐
│  Express.js Server                  │
│  - Receives HTTP Request            │
│  - Parses JSON body                 │
│  - Routes to appropriate handler    │
└──────┬──────────────────────────────┘
       │
       │ 3. Mongoose Query
       │    Model.find(), Model.findById(), etc.
       │
       ▼
┌─────────────────────────────────────┐
│  MongoDB Database                    │
│  - Executes Query                   │
│  - Returns Documents                │
└──────┬──────────────────────────────┘
       │
       │ 4. Query Result
       │    Array of documents or single document
       │
       ▼
┌─────────────────────────────────────┐
│  Express.js Server                   │
│  - Processes Data                   │
│  - Formats Response                 │
│  - Sends HTTP Response              │
└──────┬──────────────────────────────┘
       │
       │ 5. HTTP Response
       │    Status: 200, 400, 404, 500
       │    Body: JSON data
       │
       ▼
┌─────────────────────────────────────┐
│  React Component                     │
│  - Receives Response                │
│  - Updates State                    │
│  - Re-renders UI                    │
└─────────────────────────────────────┘
```

---

## Frontend to Backend Communication

### How Frontend Makes Requests

**Technology:** 
- `fetch()` API (native browser API)
- `axios` library (for some components)

**Base URL:** `http://localhost:5000` (configured in `package.json` proxy)

### Example 1: Fetching Schemes by Disability Type

**Frontend Code:** `src/pages/SearchSection.js`

```javascript
useEffect(() => {
  const fetchAllSchemes = async () => {
    try {
      let allSchemes = [];
      // Loop through all 4 disability types
      for (let id = 1; id <= 4; id++) {
        // Make HTTP GET request
        const res = await fetch(`/api/schemes/${id}`);
        // Parse JSON response
        const data = await res.json();
        if (Array.isArray(data)) {
          allSchemes = allSchemes.concat(data);
        }
      }
      setSchemes(allSchemes);
      // Build Trie from fetched schemes
      trieRef.current.buildFromSchemes(allSchemes);
    } catch (err) {
      console.error('Error fetching schemes:', err);
    }
  };
  fetchAllSchemes();
}, []);
```

**What Happens:**
1. **Frontend:** Makes GET request to `/api/schemes/1`
2. **Browser:** Sends HTTP request to `http://localhost:5000/api/schemes/1`
3. **Backend:** Express route handler receives request
4. **Backend:** Executes MongoDB query
5. **Database:** Returns matching documents
6. **Backend:** Sends JSON response
7. **Frontend:** Receives and processes data

### Example 2: User Login

**Frontend Code:** `src/pages/Login.js`

```javascript
const handleLogin = async (e) => {
  e.preventDefault();
  try {
    // Make POST request with credentials
    const response = await axios.post("http://localhost:5000/api/login", {
      email,
      password,
    });
    
    // Store token and user data
    if (response.data.token) {
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.user));
      navigate("/");
    }
  } catch (err) {
    setError(err.response?.data?.message || "Login failed");
  }
};
```

**Request Details:**
```http
POST http://localhost:5000/api/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123"
}
```

### Example 3: Fetching Scheme Details

**Frontend Code:** `src/pages/DetailInfo.js`

```javascript
useEffect(() => {
  const fetchScheme = async () => {
    try {
      // GET request with scheme ID
      const response = await fetch(`http://localhost:5000/api/scheme/${id}`);
      const data = await response.json();
      if (data && data._id) {
        setScheme(data);
      }
    } catch (err) {
      setError("Failed to fetch scheme details.");
    }
  };
  fetchScheme();
}, [id]);
```

**Request Details:**
```http
GET http://localhost:5000/api/scheme/507f1f77bcf86cd799439011
```

---

## Backend to Database Communication

### How Backend Queries Database

**Technology:** Mongoose ODM (Object Document Mapper)

### Mongoose Query Methods

#### 1. Find All Documents

```javascript
// Find all schemes
const schemes = await Scheme.find({});
```

**MongoDB Query Equivalent:**
```javascript
db.schemes.find({})
```

#### 2. Find with Filter

```javascript
// Find schemes by disability type
const schemes = await Scheme.find({ disability_type: 1 });
```

**MongoDB Query Equivalent:**
```javascript
db.schemes.find({ disability_type: 1 })
```

#### 3. Find by ID

```javascript
// Find single scheme by ID
const scheme = await Scheme.findById(req.params.id);
```

**MongoDB Query Equivalent:**
```javascript
db.schemes.findOne({ _id: ObjectId("507f1f77bcf86cd799439011") })
```

#### 4. Find One Document

```javascript
// Find user by email
const user = await User.findOne({ email: email });
```

**MongoDB Query Equivalent:**
```javascript
db.users.findOne({ email: "user@example.com" })
```

#### 5. Create New Document

```javascript
// Create new user
const user = new User({
  name, email, password: hashedPassword, ...
});
await user.save();
```

**MongoDB Query Equivalent:**
```javascript
db.users.insertOne({
  name: "...",
  email: "...",
  password: "...",
  ...
})
```

#### 6. Update Document

```javascript
// Update user verification status
user.isVerified = true;
user.otp = undefined;
await user.save();
```

**MongoDB Query Equivalent:**
```javascript
db.users.updateOne(
  { _id: ObjectId("...") },
  { $set: { isVerified: true }, $unset: { otp: "" } }
)
```

### Query Execution Flow

```
Backend Code
    │
    │ Scheme.find({ disability_type: 1 })
    │
    ▼
Mongoose ODM
    │
    │ Converts to MongoDB Query
    │ { disability_type: 1 }
    │
    ▼
MongoDB Driver
    │
    │ Sends Query to MongoDB Server
    │
    ▼
MongoDB Server
    │
    │ Executes Query on Collection
    │ Searches indexes
    │ Returns matching documents
    │
    ▼
MongoDB Driver
    │
    │ Receives Documents
    │
    ▼
Mongoose ODM
    │
    │ Converts to JavaScript Objects
    │ Applies schema validation
    │
    ▼
Backend Code
    │
    │ Receives Array of Scheme Objects
    │
    ▼
Express Response
    │
    │ JSON.stringify(data)
    │
    ▼
HTTP Response to Frontend
```

---

## Detailed Query Examples

### Example 1: Get Schemes by Disability Type

**Complete Flow:**

#### Step 1: Frontend Request
```javascript
// src/pages/SearchSection.js
const res = await fetch(`/api/schemes/1`);
```

**HTTP Request:**
```http
GET /api/schemes/1 HTTP/1.1
Host: localhost:5000
```

#### Step 2: Backend Route Handler
```javascript
// server.js
app.get('/api/schemes/:id', async (req, res) => {
  try {
    // Extract parameter from URL
    const disabilityType = parseInt(req.params.id); // id = "1"
    
    // Query MongoDB
    const schemes = await Scheme.find({ 
      disability_type: disabilityType 
    });
    
    // Send response
    res.json(schemes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
```

#### Step 3: Mongoose Query Execution
```javascript
Scheme.find({ disability_type: 1 })
```

**What Mongoose Does:**
1. Validates query syntax
2. Converts to MongoDB query: `{ disability_type: 1 }`
3. Sends to MongoDB server
4. Waits for response

#### Step 4: MongoDB Query Execution
```javascript
// MongoDB executes:
db.schemes.find({ disability_type: 1 })
```

**MongoDB Process:**
1. Checks if `disability_type` field is indexed
2. Scans collection (or uses index)
3. Filters documents where `disability_type === 1`
4. Returns matching documents

#### Step 5: Response Back to Frontend
```json
[
  {
    "_id": "507f1f77bcf86cd799439011",
    "name": "ADIP Scheme",
    "disability_type": 1,
    ...
  },
  {
    "_id": "507f1f77bcf86cd799439012",
    "name": "Education Support Scheme",
    "disability_type": 1,
    ...
  }
]
```

**HTTP Response:**
```http
HTTP/1.1 200 OK
Content-Type: application/json

[{...}, {...}]
```

#### Step 6: Frontend Processing
```javascript
const data = await res.json();
setSchemes(data); // Update React state
// UI re-renders with new data
```

### Example 2: User Login Flow

#### Step 1: Frontend Request
```javascript
// src/pages/Login.js
const response = await axios.post("http://localhost:5000/api/login", {
  email: "user@example.com",
  password: "password123"
});
```

**HTTP Request:**
```http
POST /api/login HTTP/1.1
Host: localhost:5000
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123"
}
```

#### Step 2: Backend Route Handler
```javascript
// server.js
app.post('/api/login', async (req, res) => {
  try {
    // Extract data from request body
    const { email, password } = req.body;
    
    // Step 2a: Find user in database
    const user = await User.findOne({ email });
    
    if (!user) {
      return res.status(401).json({ 
        message: 'Invalid email or password' 
      });
    }
    
    // Step 2b: Check if verified
    if (!user.isVerified) {
      return res.status(401).json({ 
        message: 'Please verify your email first' 
      });
    }
    
    // Step 2c: Verify password
    const isPasswordValid = await bcrypt.compare(
      password, 
      user.password
    );
    
    if (!isPasswordValid) {
      return res.status(401).json({ 
        message: 'Invalid email or password' 
      });
    }
    
    // Step 2d: Generate JWT token
    const token = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );
    
    // Step 2e: Return response
    res.json({
      message: 'Login successful',
      token,
      user: { ...user, password: undefined }
    });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});
```

#### Step 3: Database Queries

**Query 1: Find User**
```javascript
const user = await User.findOne({ email: "user@example.com" });
```

**MongoDB Query:**
```javascript
db.users.findOne({ email: "user@example.com" })
```

**MongoDB Process:**
1. Uses index on `email` field (if exists)
2. Finds document with matching email
3. Returns user document

**Result:**
```json
{
  "_id": ObjectId("..."),
  "email": "user@example.com",
  "password": "$2a$10$hashed...",
  "isVerified": true,
  ...
}
```

**Query 2: Password Verification**
```javascript
const isPasswordValid = await bcrypt.compare(password, user.password);
```
- This is NOT a database query
- It's a cryptographic operation
- Compares plain password with hashed password

#### Step 4: Response
```json
{
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "_id": "...",
    "name": "John Doe",
    "email": "user@example.com",
    "disabilityType": "Visual Impairment",
    ...
  }
}
```

### Example 3: Get Scheme Recommendations

#### Step 1: Frontend Request
```javascript
// src/pages/DetailInfo.js
const response = await fetch(
  `http://localhost:5000/api/scheme/${scheme._id}/recommendations?method=bfs&limit=5`
);
```

**HTTP Request:**
```http
GET /api/scheme/507f1f77bcf86cd799439011/recommendations?method=bfs&limit=5
```

#### Step 2: Backend Route Handler
```javascript
// server.js
app.get('/api/scheme/:id/recommendations', async (req, res) => {
  try {
    const { id } = req.params;
    const { method = 'bfs', limit = 5 } = req.query;
    
    // Validate ID
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ 
        message: 'Invalid scheme ID format' 
      });
    }
    
    // Use Graph for recommendations
    if (schemeGraph) {
      const recommendations = schemeGraph.getRecommendations(
        id, 
        parseInt(limit), 
        method
      );
      
      // Extract schemes from recommendations
      const schemes = recommendations.map(rec => rec.scheme);
      return res.json(schemes);
    }
    
    // Fallback: Database query
    const scheme = await Scheme.findById(id);
    const relatedSchemes = await Scheme.find({
      disability_type: scheme.disability_type,
      _id: { $ne: id }
    }).limit(parseInt(limit));
    
    res.json(relatedSchemes);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching recommendations' });
  }
});
```

#### Step 3: Graph-Based Recommendations

**If Graph is Available:**
- No database query needed
- Uses in-memory graph structure
- BFS/DFS traversal finds related schemes
- Returns scheme objects from graph

**If Graph Not Available (Fallback):**
```javascript
// Query 1: Get the scheme
const scheme = await Scheme.findById(id);
// MongoDB: db.schemes.findOne({ _id: ObjectId(id) })

// Query 2: Find related schemes
const relatedSchemes = await Scheme.find({
  disability_type: scheme.disability_type,
  _id: { $ne: id }  // Not equal to current scheme ID
}).limit(5);
// MongoDB: db.schemes.find({ 
//   disability_type: 1, 
//   _id: { $ne: ObjectId(id) } 
// }).limit(5)
```

---

## Data Flow Diagrams

### Diagram 1: User Registration Flow

```
User fills signup form
    │
    ▼
Frontend: POST /api/signup
    │
    │ { name, email, password, ... }
    │
    ▼
Backend: Express Route Handler
    │
    │ 1. Validate input
    │ 2. Check if user exists
    │    └─→ User.findOne({ email })
    │        └─→ MongoDB Query
    │
    │ 3. Hash password (bcrypt)
    │
    │ 4. Generate OTP
    │
    │ 5. Create user document
    │    └─→ new User({ ... })
    │        └─→ user.save()
    │            └─→ MongoDB Insert
    │
    │ 6. Send OTP email
    │
    ▼
Response: { message: "User registered. OTP sent." }
    │
    ▼
Frontend: Show OTP input form
```

### Diagram 2: Scheme Search Flow

```
User types in search box: "edu"
    │
    ▼
Frontend: Trie Search (Client-side)
    │
    │ trieRef.current.search("edu", 10)
    │
    │ (No backend call needed - instant results)
    │
    ▼
Display suggestions instantly
    │
    ▼
User clicks on suggestion
    │
    ▼
Frontend: GET /api/scheme/:id
    │
    │ { schemeId }
    │
    ▼
Backend: Express Route Handler
    │
    │ Scheme.findById(id)
    │
    ▼
MongoDB Query:
    db.schemes.findOne({ _id: ObjectId(id) })
    │
    ▼
MongoDB Returns: Scheme Document
    │
    ▼
Backend: res.json(scheme)
    │
    ▼
Frontend: Display scheme details
```

### Diagram 3: Recommendations Flow

```
User views scheme details page
    │
    ▼
Frontend: GET /api/scheme/:id/recommendations
    │
    │ { schemeId, method='bfs', limit=5 }
    │
    ▼
Backend: Express Route Handler
    │
    │ schemeGraph.getRecommendations(id, 5, 'bfs')
    │
    │ (Graph traversal - no database query)
    │
    │ OR (if graph not available)
    │
    │ Scheme.findById(id)
    │   └─→ MongoDB Query 1
    │
    │ Scheme.find({ 
    │   disability_type: scheme.disability_type,
    │   _id: { $ne: id }
    │ })
    │   └─→ MongoDB Query 2
    │
    ▼
Backend: res.json(recommendations)
    │
    ▼
Frontend: Display recommendations
```

---

## MongoDB Query Operations

### CRUD Operations

#### CREATE (Insert)

**Backend Code:**
```javascript
// Create new user
const user = new User({
  name: "John Doe",
  email: "john@example.com",
  password: hashedPassword,
  ...
});
await user.save();
```

**MongoDB Operation:**
```javascript
db.users.insertOne({
  name: "John Doe",
  email: "john@example.com",
  password: "$2a$10$...",
  created_at: new Date(),
  ...
})
```

#### READ (Query)

**Backend Code:**
```javascript
// Find all schemes
const schemes = await Scheme.find({});

// Find by filter
const schemes = await Scheme.find({ disability_type: 1 });

// Find one
const scheme = await Scheme.findById(id);
const user = await User.findOne({ email: email });
```

**MongoDB Operations:**
```javascript
// Find all
db.schemes.find({})

// Find with filter
db.schemes.find({ disability_type: 1 })

// Find one
db.schemes.findOne({ _id: ObjectId("...") })
db.users.findOne({ email: "..." })
```

#### UPDATE

**Backend Code:**
```javascript
// Update user
user.isVerified = true;
user.otp = undefined;
await user.save();
```

**MongoDB Operation:**
```javascript
db.users.updateOne(
  { _id: ObjectId("...") },
  { 
    $set: { isVerified: true },
    $unset: { otp: "", otpExpires: "" }
  }
)
```

#### DELETE

**Not implemented in current project** (data preservation)

**Example:**
```javascript
await Scheme.deleteOne({ _id: id });
// MongoDB: db.schemes.deleteOne({ _id: ObjectId("...") })
```

### Query Operators

**Comparison Operators:**
```javascript
// Equal
Scheme.find({ disability_type: 1 })

// Not Equal
Scheme.find({ _id: { $ne: id } })

// Greater Than
Scheme.find({ created_at: { $gt: new Date('2024-01-01') } })

// In Array
Scheme.find({ disability_type: { $in: [1, 2] } })
```

**Logical Operators:**
```javascript
// OR
Scheme.find({
  $or: [
    { name: { $regex: q, $options: 'i' } },
    { short_description: { $regex: q, $options: 'i' } }
  ]
})

// AND (implicit)
Scheme.find({
  disability_type: 1,
  name: { $regex: "education", $options: 'i' }
})
```

**Array Operators:**
```javascript
// Array contains
Scheme.find({ benefits: "Scholarship" })

// Array size
Scheme.find({ eligibility: { $size: 3 } })
```

---

## Request-Response Cycle

### Complete Example: Fetching Scheme Details

```
┌─────────────────────────────────────────────────────────┐
│ STEP 1: User Action                                     │
│ User clicks on a scheme card                             │
└─────────────────────────────────────────────────────────┘
                    │
                    ▼
┌─────────────────────────────────────────────────────────┐
│ STEP 2: Frontend Event Handler                          │
│ onClick={() => navigate(`/detail-info/${scheme._id}`)} │
└─────────────────────────────────────────────────────────┘
                    │
                    ▼
┌─────────────────────────────────────────────────────────┐
│ STEP 3: React Router                                    │
│ Navigates to /detail-info/:id                           │
│ Renders DetailInfo component                            │
└─────────────────────────────────────────────────────────┘
                    │
                    ▼
┌─────────────────────────────────────────────────────────┐
│ STEP 4: useEffect Hook                                  │
│ useEffect(() => { fetchScheme(); }, [id])               │
└─────────────────────────────────────────────────────────┘
                    │
                    ▼
┌─────────────────────────────────────────────────────────┐
│ STEP 5: HTTP Request                                    │
│ fetch(`http://localhost:5000/api/scheme/${id}`)        │
│                                                          │
│ Request:                                                 │
│ GET /api/scheme/507f1f77bcf86cd799439011 HTTP/1.1       │
│ Host: localhost:5000                                    │
└─────────────────────────────────────────────────────────┘
                    │
                    ▼
┌─────────────────────────────────────────────────────────┐
│ STEP 6: Express Server Receives Request                 │
│ app.get('/api/scheme/:id', async (req, res) => {...})   │
│                                                          │
│ Extracts: req.params.id = "507f1f77bcf86cd799439011"   │
└─────────────────────────────────────────────────────────┘
                    │
                    ▼
┌─────────────────────────────────────────────────────────┐
│ STEP 7: Mongoose Query                                  │
│ const scheme = await Scheme.findById(req.params.id)     │
│                                                          │
│ Mongoose converts to MongoDB query                      │
└─────────────────────────────────────────────────────────┘
                    │
                    ▼
┌─────────────────────────────────────────────────────────┐
│ STEP 8: MongoDB Query Execution                         │
│ db.schemes.findOne({                                    │
│   _id: ObjectId("507f1f77bcf86cd799439011")            │
│ })                                                       │
│                                                          │
│ MongoDB searches collection                             │
│ Uses _id index for fast lookup                          │
└─────────────────────────────────────────────────────────┘
                    │
                    ▼
┌─────────────────────────────────────────────────────────┐
│ STEP 9: MongoDB Returns Document                       │
│ {                                                        │
│   _id: ObjectId("507f1f77bcf86cd799439011"),           │
│   name: "ADIP Scheme",                                  │
│   disability_type: 1,                                  │
│   ...                                                    │
│ }                                                        │
└─────────────────────────────────────────────────────────┘
                    │
                    ▼
┌─────────────────────────────────────────────────────────┐
│ STEP 10: Mongoose Converts to JavaScript Object         │
│ {                                                        │
│   _id: "507f1f77bcf86cd799439011",                     │
│   name: "ADIP Scheme",                                  │
│   disability_type: 1,                                  │
│   ...                                                    │
│ }                                                        │
└─────────────────────────────────────────────────────────┘
                    │
                    ▼
┌─────────────────────────────────────────────────────────┐
│ STEP 11: Express Sends Response                        │
│ res.json(scheme)                                        │
│                                                          │
│ HTTP Response:                                          │
│ HTTP/1.1 200 OK                                         │
│ Content-Type: application/json                          │
│                                                          │
│ { name: "ADIP Scheme", ... }                           │
└─────────────────────────────────────────────────────────┘
                    │
                    ▼
┌─────────────────────────────────────────────────────────┐
│ STEP 12: Frontend Receives Response                    │
│ const data = await response.json()                     │
│                                                          │
│ data = { name: "ADIP Scheme", ... }                    │
└─────────────────────────────────────────────────────────┘
                    │
                    ▼
┌─────────────────────────────────────────────────────────┐
│ STEP 13: React State Update                             │
│ setScheme(data)                                         │
│                                                          │
│ Triggers re-render                                      │
└─────────────────────────────────────────────────────────┘
                    │
                    ▼
┌─────────────────────────────────────────────────────────┐
│ STEP 14: UI Updates                                     │
│ Scheme details displayed on screen                      │
└─────────────────────────────────────────────────────────┘
```

---

## API Endpoints Summary

### Authentication Endpoints

| Method | Endpoint | Frontend → Backend | Backend → Database |
|--------|----------|-------------------|-------------------|
| POST | `/api/signup` | User data (JSON) | `User.findOne()` + `user.save()` |
| POST | `/api/signup/verify` | Email + OTP | `User.findOne()` + `user.save()` |
| POST | `/api/login` | Email + Password | `User.findOne()` |

### Scheme Endpoints

| Method | Endpoint | Frontend → Backend | Backend → Database |
|--------|----------|-------------------|-------------------|
| GET | `/api/schemes/:id` | Disability type ID | `Scheme.find({ disability_type })` |
| GET | `/api/scheme/:id` | Scheme ID | `Scheme.findById(id)` |
| GET | `/api/scheme/:id/recommendations` | Scheme ID + params | Graph (or `Scheme.find()`) |
| GET | `/api/search` | Query string | Trie (or `Scheme.find()` with regex) |

---

## Database Indexes

### Automatic Indexes

MongoDB automatically creates index on `_id` field for all collections.

### Custom Indexes

**Email Index (Users Collection):**
```javascript
// Defined in schema
email: { type: String, unique: true, required: true }
// MongoDB creates unique index automatically
```

**Benefits:**
- Fast lookups: O(log n) instead of O(n)
- Unique constraint: Prevents duplicate emails
- Query optimization: MongoDB uses index for queries

### Query Performance

**Without Index:**
- Full collection scan: O(n)
- For 1000 users: 1000 comparisons

**With Index:**
- Index lookup: O(log n)
- For 1000 users: ~10 comparisons

---

## Error Handling

### Database Connection Errors

```javascript
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => {
    console.error('MongoDB connection error:', err);
    // Server continues but database operations will fail
  });
```

### Query Errors

```javascript
try {
  const scheme = await Scheme.findById(id);
  if (!scheme) {
    return res.status(404).json({ message: 'Scheme not found' });
  }
  res.json(scheme);
} catch (error) {
  console.error('Error:', error);
  res.status(500).json({ message: 'Server error' });
}
```

### Common Errors

1. **Connection Refused:** MongoDB server not running
2. **Invalid ObjectId:** Wrong ID format
3. **Duplicate Key:** Unique constraint violation (email)
4. **Validation Error:** Required field missing
5. **Timeout:** Query taking too long

---

## Summary

### Key Points

1. **Frontend** makes HTTP requests to backend API
2. **Backend** receives requests, processes, queries database
3. **Mongoose** translates JavaScript to MongoDB queries
4. **MongoDB** executes queries and returns documents
5. **Backend** formats response and sends to frontend
6. **Frontend** receives data and updates UI

### Data Flow Pattern

```
User Action → Frontend Request → Backend Route → 
Mongoose Query → MongoDB → Documents → 
Backend Response → Frontend Update → UI Render
```

### Performance Optimizations

1. **Connection Pooling:** Reuses database connections
2. **Indexes:** Fast lookups on email, _id
3. **Caching:** Trie and Graph built once, reused
4. **Query Optimization:** Only fetch needed fields
5. **Async/Await:** Non-blocking operations

This architecture ensures efficient, scalable data flow from user interaction to database and back!


