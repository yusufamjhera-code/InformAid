const { MongoClient } = require('mongodb');
require('dotenv').config();

module.exports = async function handler(req, res) {
  const uri = process.env.MONGODB_URI;
  console.log('Attempting to connect to MongoDB with URI:', uri);
  
  try {
    const client = new MongoClient(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    
    await client.connect();
    console.log('Successfully connected to MongoDB');
    
    const db = client.db();
    const collections = await db.listCollections().toArray();
    
    await client.close();
    
    res.status(200).json({
      status: 'ok',
      collections: collections.map(c => c.name)
    });
  } catch (error) {
    console.error('MongoDB connection error:', error);
    res.status(500).json({
      status: 'error',
      message: error.message
    });
  }
} 
require('dotenv').config();

module.exports = async function handler(req, res) {
  const uri = process.env.MONGODB_URI;
  console.log('Attempting to connect to MongoDB with URI:', uri);
  
  try {
    const client = new MongoClient(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    
    await client.connect();
    console.log('Successfully connected to MongoDB');
    
    const db = client.db();
    const collections = await db.listCollections().toArray();
    
    await client.close();
    
    res.status(200).json({
      status: 'ok',
      collections: collections.map(c => c.name)
    });
  } catch (error) {
    console.error('MongoDB connection error:', error);
    res.status(500).json({
      status: 'error',
      message: error.message
    });
  }
} 