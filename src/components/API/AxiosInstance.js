// /src/api/axiosInstance.js
import axios from 'axios';
console.log("Ashish");

const axiosInstance = axios.create({
  // baseURL: 'https://collegebook-backend-production.up.railway.app',
  //  // Base URL
  baseURL:'http://localhost:8080',
  headers: {
    'Content-Type': 'application/json', // Add any default headers
  },
});

// Add a request interceptor to include JWT token in headers
axiosInstance.interceptors.request.use(

  (config) => {
    const publicEndpoints = ['/auth/signUp', '/auth/login'];

    // Check if the request URL ends with any public endpoint
    const isPublic = publicEndpoints.some(endpoint => config.url.endsWith(endpoint));

    if (!isPublic) {
      const token = localStorage.getItem('jwt');
      if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
      }
    }

    return config;
  },
  (error) => Promise.reject(error)
);

export default axiosInstance;
