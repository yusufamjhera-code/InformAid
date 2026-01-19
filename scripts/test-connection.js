import { MongoClient } from 'mongodb';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import fs from 'fs';

// Get the current file's directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Define the path to .env.local
const envPath = join(__dirname, '../.env.local');
console.log('Looking for .env file at:', envPath);

// Check if file exists
if (!fs.existsSync(envPath)) {
  console.error(`.env.local file not found at: ${envPath}`);
  process.exit(1);
}

// Read and parse the .env file
try {
  const envContent = fs.readFileSync(envPath, 'utf8');
  console.log('File contents:', envContent);
  
  const envVars = envContent.split('\n').reduce((acc, line) => {
    const [key, value] = line.split('=');
    if (key && value) {
      acc[key.trim()] = value.trim();
    }
    return acc;
  }, {});

  // Set environment variables
  process.env = { ...process.env, ...envVars };
  
  console.log('Environment variables loaded successfully');
  console.log('MONGODB_URI exists:', !!process.env.MONGODB_URI);
} catch (error) {
  console.error('Error reading .env file:', error);
  process.exit(1);
}

// Create connection string with proper encoding
const username = 'yusufamjhera';
const password = encodeURIComponent('Yusuf@2511');
const cluster = 'informaid-database.knpkbn6.mongodb.net';
const dbName = 'informaid';

const uri = `mongodb+srv://${username}:${password}@${cluster}/${dbName}`;

console.log('Using connection string:', uri.replace(/\/\/[^@]+@/, '//[REDACTED]@'));

const client = new MongoClient(uri);

async function testConnection() {
  try {
    console.log('Attempting to connect to MongoDB Atlas...');
    await client.connect();
    console.log('Successfully connected to MongoDB Atlas!');
    
    const db = client.db('informaid');
    
    // Get all collections
    const collections = await db.listCollections().toArray();
    console.log('\nAvailable collections:', collections.map(c => c.name));
    
    // Check disability types
    const disabilityTypes = await db.collection('disability_types').find({}).toArray();
    console.log('\nDisability Types:', disabilityTypes.map(dt => `${dt.id}: ${dt.name}`));
    
    // Check schemes count by disability type
    const schemes = await db.collection('schemes').find({}).toArray();
    const schemesByType = schemes.reduce((acc, scheme) => {
      acc[scheme.disability_type] = (acc[scheme.disability_type] || 0) + 1;
      return acc;
    }, {});
    
    console.log('\nSchemes by disability type:');
    Object.entries(schemesByType).forEach(([type, count]) => {
      console.log(`${type}: ${count} schemes`);
    });
    
    // Show a sample scheme
    if (schemes.length > 0) {
      console.log('\nSample scheme:');
      const sample = schemes[0];
      console.log({
        scheme_id: sample.scheme_id,
        scheme_name: sample.scheme_name,
        disability_type: sample.disability_type
      });
    }
    
  } catch (error) {
    console.error('Connection error:', error);
  } finally {
    await client.close();
    console.log('\nConnection closed');
  }
}

testConnection(); 
    
    console.log('\nSchemes by disability type:');
    Object.entries(schemesByType).forEach(([type, count]) => {
      console.log(`${type}: ${count} schemes`);
    });
    
    // Show a sample scheme
    if (schemes.length > 0) {
      console.log('\nSample scheme:');
      const sample = schemes[0];
      console.log({
        scheme_id: sample.scheme_id,
        scheme_name: sample.scheme_name,
        disability_type: sample.disability_type
      });
    }
    
  } catch (error) {
    console.error('Connection error:', error);
  } finally {
    await client.close();
    console.log('\nConnection closed');
  }
}

testConnection(); 