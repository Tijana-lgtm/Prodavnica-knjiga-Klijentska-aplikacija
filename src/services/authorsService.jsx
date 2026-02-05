import AxiosConfig from '../axiosConfig';

export const getAuthors = async () => {
  const response = await AxiosConfig.get('/Authors');
  return response.data;
};

export const fetchAuthorsPage = async (page) => {
  try {
    const response = await AxiosConfig.get('/Authors/paging?page=' + page);
    return response.data;
  }
  catch (error){
    throw new Error('Failed to fetch authors page');
  }
};