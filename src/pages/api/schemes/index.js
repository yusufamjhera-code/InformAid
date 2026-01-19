const { MongoClient } = require('mongodb');
require('dotenv').config({ path: '.env.local' });

export default async function handler(req, res) {
  const { method } = req;
  let client;

  try {
    // Ensure the connection string is properly formatted
    const uri = process.env.MONGODB_URI.replace('@', '%40');
    console.log('Connecting to MongoDB with URI:', uri);

    client = new MongoClient(uri, {
      maxPoolSize: 50,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
      retryWrites: true,
      w: 'majority'
    });

    await client.connect();
    console.log('Successfully connected to MongoDB');
    
    const db = client.db('informaid');

    switch (method) {
      case 'GET':
        // Get all schemes with optional filtering
        const { disability_type } = req.query;
        let query = {};
        
        if (disability_type) {
          query.disability_type = disability_type;
        }

        const schemes = await db.collection('schemes').find(query).toArray();
        res.status(200).json(schemes);
        break;

      case 'POST':
        // Create a new scheme
        const newScheme = req.body;
        
        // Validate required fields
        if (!newScheme.scheme_name || !newScheme.disability_type) {
          return res.status(400).json({ error: 'Missing required fields' });
        }

        // Insert the new scheme
        const result = await db.collection('schemes').insertOne(newScheme);
        res.status(201).json({ 
          message: 'Scheme created successfully',
          scheme_id: result.insertedId 
        });
        break;

      default:
        res.setHeader('Allow', ['GET', 'POST']);
        res.status(405).end(`Method ${method} Not Allowed`);
    }
  } catch (error) {
    console.error('API Error:', error);
    res.status(500).json({ 
      error: 'Internal Server Error',
      details: error.message 
    });
  } finally {
    if (client) {
      await client.close();
    }
  }
} 
      error: 'Internal Server Error',
      details: error.message 
    });
  } finally {
    if (client) {
      await client.close();
    }
  }
} 