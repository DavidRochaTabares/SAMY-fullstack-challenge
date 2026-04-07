const axios = require('axios');

const headers = {
  'Content-Type': 'application/json'
};

// Agregar API key si está disponible
if (process.env.REQRES_API_KEY) {
  headers['x-api-key'] = process.env.REQRES_API_KEY;
}

const reqresClient = axios.create({
  baseURL: process.env.REQRES_API_URL || 'https://reqres.in/api',
  timeout: 10000,
  headers
});

reqresClient.interceptors.request.use(
  (config) => {
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
