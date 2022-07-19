import axios from 'axios';

const instance = axios.create({
  baseURL: `${process.env.VITE_API_BASE_URL}/v1`,
  timeout: 2000,
});

export default instance;
