import api from './api';

export const requestMagicCode = async (email) => {
  const response = await api.post('/api/auth/request-code', { email });
  return response.data;
};

export const verifyMagicCode = async (token) => {
  const response = await api.post('/api/auth/verify-code', { token });
  return response.data;
};
