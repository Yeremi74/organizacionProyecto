import axios from 'axios';
export const getCollectionRequest = async () =>
  await axios.get(`https://organizacionproyecto.onrender.com/api/collections`);
