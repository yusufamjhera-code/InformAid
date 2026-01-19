const { MongoClient } = require('mongodb');
require('dotenv').config({ path: '.env.local' });

if (!process.env.MONGODB_URI) {
  throw new Error('Please add your MongoDB URI to .env.local');
}

const uri = process.env.MONGODB_URI;
const options = {
  maxPoolSize: 50,
  serverSelectionTimeoutMS: 5000,
  socketTimeoutMS: 45000,
  retryWrites: true,
  w: 'majority'
};

let client;
let clientPromise;

if (process.env.NODE_ENV === 'development') {
  // In development mode, use a global variable so that the value
  // is preserved across module reloads caused by HMR (Hot Module Replacement).
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri, options);
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  // In production mode, it's best to not use a global variable.
  client = new MongoClient(uri, options);
  clientPromise = client.connect();
}

// Export a module-scoped MongoClient promise. By doing this in a
// separate module, the client can be shared across functions.
module.exports = clientPromise;

async function connectToDatabase() {
  try {
    const client = await clientPromise;
    const db = client.db('informaid');
    return { client, db };
  } catch (error) {
    console.error('Error connecting to MongoDB Atlas:', error);
    throw error;
  }
}

async function getCollection(collectionName) {
  const { db } = await connectToDatabase();
  return db.collection(collectionName);
}

module.exports.connectToDatabase = connectToDatabase;
module.exports.getCollection = getCollection;

// Error handling middleware
module.exports.withDatabase = async (handler) => {
  return async (req, res) => {
    try {
      await connectToDatabase();
      return handler(req, res);
    } catch (error) {
      console.error('Database error:', error);
      res.status(500).json({ error: 'Database connection error' });
    }
  };
};

// Graceful shutdown
process.on('SIGINT', async () => {
  if (client) {
    await client.close();
    console.log('MongoDB connection closed');
    process.exit(0);
  }
}); 
    console.log('MongoDB connection closed');
    process.exit(0);
  }
}); 