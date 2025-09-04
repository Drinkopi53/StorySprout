// API configuration
const API_CONFIG = {
  GEMINI_API_KEY: process.env.REACT_APP_GEMINI_API_KEY || 'YOUR_GEMINI_API_KEY_HERE',
  GEMINI_API_URL: 'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent',
};

export default API_CONFIG;