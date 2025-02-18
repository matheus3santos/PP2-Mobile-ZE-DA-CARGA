import axios from 'axios';

const axiosInstance = axios.create({
  //baseURL: 'http://3.136.103.206:8080/',
  baseURL: "https://3593-2804-14d-5483-45d0-61db-6040-5128-4ead.ngrok-free.app/",
   
});

export default axiosInstance;