import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://backend-promptly-dict.onrender.com', // Replace with your actual backend URL
});

export default axiosInstance;