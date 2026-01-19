const axios = require('axios');

async function checkUsers() {
  try {
    const response = await axios.get('http://localhost:5000/api/users');
    const users = response.data;
    
    console.log('Total users:', users.length);
    console.log('User IDs:', users.map(u => u._id));
    
    return users;
  } catch (error) {
    console.error('Error checking users:', error);
    throw error;
  }
}

module.exports = checkUsers; 