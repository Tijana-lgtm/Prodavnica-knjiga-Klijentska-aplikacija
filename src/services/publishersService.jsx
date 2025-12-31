import axios from 'axios';

const API_URL = 'http://localhost:5234/api';

export const getPublishers = async () => {
  const response = await axios.get(`${API_URL}/publishers`);
  return response.data;
};