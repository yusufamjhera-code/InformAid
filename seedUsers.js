const mongoose = require('mongoose');
require('dotenv').config();
const bcrypt = require('bcryptjs');

const User = require('./models/User');

const users = [
  {
    name: "Test User 1",
    email: "test1@example.com",
    password: "password123",
    gender: "Male",
    dob: "1990-01-01",
    bloodGroup: "O+",
    contact: "9876543210",
    address: "123 Test Street, Test City",
    disabilityType: "Visual",
    isVerified: true
  },
  {
    name: "Test User 2",
    email: "test2@example.com",
    password: "password123",
    gender: "Female",
    dob: "1995-05-05",
    bloodGroup: "A+",
    contact: "9876543211",
    address: "456 Test Avenue, Test Town",
    disabilityType: "Hearing",
    isVerified: true
  }
];

async function seedUsers() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/informaid');
    console.log('Connected to MongoDB');

    // Clear existing users
    await User.deleteMany({});
    console.log('Cleared existing users');

    // Hash passwords and create users
    const hashedUsers = await Promise.all(users.map(async (user) => {
      const hashedPassword = await bcrypt.hash(user.password, 10);
      return {
        ...user,
        password: hashedPassword
      };
    }));

    // Insert users
    await User.insertMany(hashedUsers);
    console.log('Successfully seeded users');

    // Disconnect from MongoDB
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
  } catch (error) {
    console.error('Error seeding users:', error);
    process.exit(1);
  }
}

seedUsers(); 
require('dotenv').config();
const bcrypt = require('bcryptjs');

const User = require('./models/User');

const users = [
  {
    name: "Test User 1",
    email: "test1@example.com",
    password: "password123",
    gender: "Male",
    dob: "1990-01-01",
    bloodGroup: "O+",
    contact: "9876543210",
    address: "123 Test Street, Test City",
    disabilityType: "Visual",
    isVerified: true
  },
  {
    name: "Test User 2",
    email: "test2@example.com",
    password: "password123",
    gender: "Female",
    dob: "1995-05-05",
    bloodGroup: "A+",
    contact: "9876543211",
    address: "456 Test Avenue, Test Town",
    disabilityType: "Hearing",
    isVerified: true
  }
];

async function seedUsers() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/informaid');
    console.log('Connected to MongoDB');

    // Clear existing users
    await User.deleteMany({});
    console.log('Cleared existing users');

    // Hash passwords and create users
    const hashedUsers = await Promise.all(users.map(async (user) => {
      const hashedPassword = await bcrypt.hash(user.password, 10);
      return {
        ...user,
        password: hashedPassword
      };
    }));

    // Insert users
    await User.insertMany(hashedUsers);
    console.log('Successfully seeded users');

    // Disconnect from MongoDB
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
  } catch (error) {
    console.error('Error seeding users:', error);
    process.exit(1);
  }
}

seedUsers(); 