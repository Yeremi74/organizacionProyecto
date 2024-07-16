import axios from 'axios';
export const getCollectionRequest = async () =>
  await axios.get(`http://localhost:3001/api/collections`);
