import api from './api';

export const fetchPostsAPI = async (page = 1, limit = 10) => {
  const response = await api.get(`/api/posts?page=${page}&limit=${limit}`);
  return response.data;
};

export const fetchPostByIdAPI = async (id) => {
  const response = await api.get(`/api/posts/${id}`);
  return response.data;
};

export const createPostAPI = async (postData) => {
  const response = await api.post('/api/posts', postData);
  return response.data;
};

export const updatePostAPI = async (id, postData) => {
  const response = await api.put(`/api/posts/${id}`, postData);
  return response.data;
};

export const deletePostAPI = async (id) => {
  const response = await api.delete(`/api/posts/${id}`);
  return response.data;
};
