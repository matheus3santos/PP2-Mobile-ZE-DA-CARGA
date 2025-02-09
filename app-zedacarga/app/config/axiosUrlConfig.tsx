import axios from 'axios';

const axiosInstance = axios.create({
  // baseURL: 'http://3.136.103.206:8080/',
  baseURL: "https://32c9-200-238-97-165.ngrok-free.app/",
   
});

export default axiosInstance;