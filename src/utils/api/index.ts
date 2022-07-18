import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:8000/v1',
  timeout: 8000,
});

export default instance;
