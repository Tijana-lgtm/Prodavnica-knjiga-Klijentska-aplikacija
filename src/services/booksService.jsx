import axios from 'axios';

const API_URL = 'http://localhost:5234/api';

export const getBooks = async () => {
  const response = await axios.get(`${API_URL}/books`);
  return response.data;
};

export const deleteBook = async (id) => {
  const response = await axios.delete(`${API_URL}/books/${id}`);
  return response.data;
};
