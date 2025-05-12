// /src/api/axiosInstance.js
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://collegebook-backend-production.up.railway.app', // Base URL
  headers: {
    'Content-Type': 'application/json', // Add any default headers
  },
});

// Add a request interceptor to include JWT token in headers
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('jwt'); // Get JWT from localStorage
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`; // Add token in Authorization header
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
