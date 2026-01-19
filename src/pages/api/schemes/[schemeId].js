const { MongoClient } = require('mongodb');
require('dotenv').config({ path: '.env.local' });

export default async function handler(req, res) {
  const { method } = req;
  const { schemeId } = req.query;
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
        // Get a specific scheme
        const scheme = await db.collection('schemes').findOne({ scheme_id: schemeId });
        
        if (!scheme) {
          return res.status(404).json({ error: 'Scheme not found' });
        }
        
        res.status(200).json(scheme);
        break;

      case 'PUT':
        // Update a scheme
        const updatedScheme = req.body;
        
        // Validate required fields
        if (!updatedScheme.scheme_name || !updatedScheme.disability_type) {
          return res.status(400).json({ error: 'Missing required fields' });
        }

        const result = await db.collection('schemes').updateOne(
          { scheme_id: schemeId },
          { $set: updatedScheme }
        );

        if (result.matchedCount === 0) {
          return res.status(404).json({ error: 'Scheme not found' });
        }

        res.status(200).json({ message: 'Scheme updated successfully' });
        break;

      case 'DELETE':
        // Delete a scheme
        const deleteResult = await db.collection('schemes').deleteOne({ scheme_id: schemeId });

        if (deleteResult.deletedCount === 0) {
          return res.status(404).json({ error: 'Scheme not found' });
        }

        res.status(200).json({ message: 'Scheme deleted successfully' });
        break;

      default:
        res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
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