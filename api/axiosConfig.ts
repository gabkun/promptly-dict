import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:4500', // Replace with your actual backend URL
});

export default axiosInstance;