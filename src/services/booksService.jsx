import AxiosConfig from '../axiosConfig';

const API_URL = 'http://localhost:5234/api';

export const getBooks = async () => {
  const response = await AxiosConfig.get(`${API_URL}/books`);
  return response.data;
};

export const getBook = async (id) => {
  const response = await AxiosConfig.get(`${API_URL}/books/${id}`);
  return response.data;
};

export const createBook = async (book) => {
  const response = await AxiosConfig.post(`${API_URL}/books`, book);
  return response.data;
};

export const updateBook = async (id, book) => {
  const response = await AxiosConfig.put(`${API_URL}/books/${id}`, book);
  return response.data;
};

export const deleteBook = async (id) => {
  const response = await AxiosConfig.delete(`${API_URL}/books/${id}`);
  return response.data;
};
