import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://organizacionproyecto.onrender.com/api',
  withCredentials: true,
});

export default instance;
