import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://d8ab-200-238-97-165.ngrok-free.app/',
   
});

export default axiosInstance;