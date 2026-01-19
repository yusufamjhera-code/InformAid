const axios = require('axios');

async function checkSchemes() {
  try {
    const response = await axios.get('http://localhost:5000/api/schemes');
    const schemes = response.data;
    
    console.log('Total schemes:', schemes.length);
    console.log('Scheme IDs:', schemes.map(s => s._id));
    
    return schemes;
  } catch (error) {
    console.error('Error checking schemes:', error);
    throw error;
  }
}

module.exports = checkSchemes; 