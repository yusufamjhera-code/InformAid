const mongoose = require('mongoose');
require('dotenv').config();
const Scheme = require('./models/Scheme');

async function checkLinks() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    const schemes = await Scheme.find({}).limit(5);
    schemes.forEach(s => {
      console.log(`Name: ${s.name}`);
      console.log(`Official Link: ${s.official_link}`);
      console.log('---');
    });
    await mongoose.disconnect();
  } catch (err) {
    console.error('Error:', err);
  }
}

checkLinks(); 
require('dotenv').config();
const Scheme = require('./models/Scheme');

async function checkLinks() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    const schemes = await Scheme.find({}).limit(5);
    schemes.forEach(s => {
      console.log(`Name: ${s.name}`);
      console.log(`Official Link: ${s.official_link}`);
      console.log('---');
    });
    await mongoose.disconnect();
  } catch (err) {
    console.error('Error:', err);
  }
}

checkLinks(); 