import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://2856-200-238-97-165.ngrok-free.app/',
   
});

export default axiosInstance;