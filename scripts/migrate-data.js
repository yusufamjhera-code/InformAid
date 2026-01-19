import { MongoClient } from 'mongodb';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import fs from 'fs';

// Get the current file's directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Create connection string with proper encoding
const username = 'yusufamjhera';
const password = encodeURIComponent('Yusuf@2511');
const cluster = 'informaid-database.knpkbn6.mongodb.net';
const dbName = 'informaid';

const uri = `mongodb+srv://${username}:${password}@${cluster}/${dbName}`;

const client = new MongoClient(uri);

async function migrateData() {
  try {
    console.log('Connecting to MongoDB Atlas...');
    await client.connect();
    console.log('Connected successfully!');

    const db = client.db('informaid');

    // Create collections if they don't exist
    const collections = ['disability_types', 'schemes'];
    for (const collection of collections) {
      const exists = await db.listCollections({ name: collection }).hasNext();
      if (!exists) {
        await db.createCollection(collection);
        console.log(`Created collection: ${collection}`);
      }
    }

    // Read and insert disability types
    const disabilityTypes = [
      { id: 'VI', name: 'Visual Impairment' },
      { id: 'HI', name: 'Hearing Impairment' },
      { id: 'ID', name: 'Intellectual Disability' },
      { id: 'PD', name: 'Physical Disability' }
    ];

    const disabilityTypesCollection = db.collection('disability_types');
    await disabilityTypesCollection.deleteMany({});
    await disabilityTypesCollection.insertMany(disabilityTypes);
    console.log('Inserted disability types');

    // Read and insert schemes
    const schemesDir = join(__dirname, '../schemes_data');
    console.log('Reading schemes from:', schemesDir);
    
    const schemeFiles = fs.readdirSync(schemesDir);
    console.log('Found files:', schemeFiles);

    const schemesCollection = db.collection('schemes');
    await schemesCollection.deleteMany({});

    for (const file of schemeFiles) {
      if (file.endsWith('.json')) {
        console.log(`\nProcessing file: ${file}`);
        const filePath = join(schemesDir, file);
        
        try {
          const fileContent = fs.readFileSync(filePath, 'utf8');
          console.log(`File content length: ${fileContent.length} characters`);
          
          const data = JSON.parse(fileContent);
          
          // Extract schemes from the correct structure
          const schemes = data.schemes || [];
          console.log(`Found ${schemes.length} schemes in ${file}`);
          
          // Add disability type to each scheme
          const disabilityType = file.replace('.json', '');
          const updatedSchemes = schemes.map(scheme => ({
            scheme_id: scheme.scheme_id || scheme.id,
            scheme_name: scheme.scheme_name || scheme.title,
            summary: scheme.summary,
            full_description: scheme.full_description,
            eligibility_criteria: scheme.eligibility_criteria,
            required_documents: scheme.required_documents,
            benefits: scheme.benefits,
            application_process: scheme.application_process,
            government_portal_link: scheme.government_portal_link,
            disability_type: disabilityType
          }));

          // Log a sample scheme before insertion
          if (updatedSchemes.length > 0) {
            console.log('Sample scheme to be inserted:', {
              scheme_id: updatedSchemes[0].scheme_id,
              scheme_name: updatedSchemes[0].scheme_name,
              disability_type: updatedSchemes[0].disability_type
            });
          }

          await schemesCollection.insertMany(updatedSchemes);
          console.log(`Successfully inserted ${updatedSchemes.length} schemes from ${file}`);
        } catch (error) {
          console.error(`Error processing ${file}:`, error);
          throw error;
        }
      }
    }

    console.log('\nMigration completed successfully!');

  } catch (error) {
    console.error('Migration error:', error);
  } finally {
    await client.close();
    console.log('Connection closed');
  }
}

migrateData(); 
    console.error('Migration error:', error);
  } finally {
    await client.close();
    console.log('Connection closed');
  }
}

migrateData(); 