const mongoose = require('mongoose');

const schemeSchema = new mongoose.Schema({
  name: String,
  short_description: String,
  full_description: String,
  eligibility: [String],
  benefits: [String],
  documents_required: [String],
  application_process: [String],
  disability_type: Number, // 1: Visual, 2: Hearing, 3: Intellectual, 4: Physical
  official_link: String,
  created_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Scheme', schemeSchema); 