import axios from 'axios';

const AxiosConfig = axios.create({
  baseURL: 'http://localhost:5234/api'
});

export default AxiosConfig;