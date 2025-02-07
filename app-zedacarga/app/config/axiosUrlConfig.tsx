import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://3.136.103.206:8080/',
   
});

export default axiosInstance;