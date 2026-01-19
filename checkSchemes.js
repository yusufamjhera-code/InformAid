const mongoose = require('mongoose');
require('dotenv').config();

const Scheme = require('./models/Scheme');

async function checkSchemes() {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/informaid');
    console.log('Connected to MongoDB');

    const schemes = await Scheme.find({});
    console.log('Number of schemes in database:', schemes.length);
    console.log('First few schemes:', schemes.slice(0, 3));

    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
  } catch (error) {
    console.error('Error:', error);
  }
}

checkSchemes(); 
require('dotenv').config();

const Scheme = require('./models/Scheme');

async function checkSchemes() {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/informaid');
    console.log('Connected to MongoDB');

    const schemes = await Scheme.find({});
    console.log('Number of schemes in database:', schemes.length);
    console.log('First few schemes:', schemes.slice(0, 3));

    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
  } catch (error) {
    console.error('Error:', error);
  }
}

checkSchemes(); 