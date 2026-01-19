// Centralized Axios instance for InformAid API calls
// Automatically uses the correct base URL in dev vs production

import axios from 'axios';

const API_BASE_URL = process.env.NODE_ENV === 'production'
    ? (process.env.REACT_APP_API_URL || 'https://informaid-api.onrender.com')
    : '';  // Empty string = use proxy in development

const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json'
    }
});

// Add auth token to requests if available
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default api;
