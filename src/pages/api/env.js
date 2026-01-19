require('dotenv').config({ path: '.env.local' });

module.exports = function handler(req, res) {
  res.status(200).json({
    mongodbUri: process.env.MONGODB_URI ? 'Set' : 'Not set',
    nodeEnv: process.env.NODE_ENV,
    env: process.env
  });
} 

module.exports = function handler(req, res) {
  res.status(200).json({
    mongodbUri: process.env.MONGODB_URI ? 'Set' : 'Not set',
    nodeEnv: process.env.NODE_ENV,
    env: process.env
  });
} 