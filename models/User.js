const mongoose = require('mongoose');

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

module.exports = mongoose.model('User', userSchema); 
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

module.exports = mongoose.model('User', userSchema); 
