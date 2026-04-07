import api from './api';

export const fetchReqresUsersAPI = async (page = 1) => {
  const response = await api.get(`/api/users/reqres?page=${page}`);
  return response.data;
};

export const fetchReqresUserByIdAPI = async (id) => {
  const response = await api.get(`/api/users/reqres/${id}`);
  return response.data;
};

export const importUserAPI = async (userId) => {
  const response = await api.post(`/api/users/import/${userId}`);
  return response.data;
};

export const fetchSavedUsersAPI = async (page = 1, limit = 10) => {
  const response = await api.get(`/api/users/saved?page=${page}&limit=${limit}`);
  return response.data;
};
