import axios from 'axios';

const API_URL = 'http://localhost:5234/api';

export const getAuthors = async () => {
  const response = await axios.get(`${API_URL}/authors`);
  return response.data;
};