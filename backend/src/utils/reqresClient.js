const axios = require('axios');

const reqresClient = axios.create({
  baseURL: process.env.REQRES_API_URL || 'https://reqres.in/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Interceptor para agregar API key dinámicamente para endpoints de magic code
reqresClient.interceptors.request.use(
  (config) => {
    if (process.env.REQRES_API_KEY) {
      config.headers['x-api-key'] = process.env.REQRES_API_KEY;
    }
    return config;
  },
  (error) => {
    console.log(' ReqRes Request Error:', error);
    return Promise.reject(error);
  }
);

reqresClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    console.log(' ReqRes Response Error:', error.response?.status, error.message);
    return Promise.reject(error);
  }
);

module.exports = reqresClient;
