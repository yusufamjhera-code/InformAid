const axios = require('axios');

async function checkApplyLinks() {
  try {
    const response = await axios.get('http://localhost:5000/api/schemes');
    const schemes = response.data;
    
    const invalidLinks = schemes.filter(scheme => {
      try {
        new URL(scheme.official_link);
        return false;
      } catch {
        return true;
      }
    });
    
    console.log('Total schemes:', schemes.length);
    console.log('Schemes with invalid links:', invalidLinks.length);
    console.log('Invalid links:', invalidLinks.map(s => ({ id: s._id, link: s.official_link })));
    
    return invalidLinks;
  } catch (error) {
    console.error('Error checking apply links:', error);
    throw error;
  }
}

module.exports = checkApplyLinks; 