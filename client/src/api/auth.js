import axios from './axios.js';

// const API = 'http://localhost:3001/api';

export const registerRequest = (user) => axios.post(`/register`, user);

export const loginRequest = (user) => axios.post(`/login`, user);

export const verifyTokenRequest = async () => axios.get('/verify');

export const getUsersRequest = async () => {
  return await axios.get('/users');
};

export const getUniqueRequest = (id) => axios.get(`/users/${id}`);

export const updateUserRequest = (id, user) => {
  return axios.put(`/users/${id}`, user);
};
