// API Configuration for InformAid
// Automatically switches between development and production URLs

const config = {
    API_BASE_URL: process.env.NODE_ENV === 'production'
        ? process.env.REACT_APP_API_URL || 'https://informaid-api.onrender.com'
        : 'http://localhost:5000'
};

export default config;
