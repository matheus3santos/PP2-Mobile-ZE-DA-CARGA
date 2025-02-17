import axios from 'axios';

const axiosInstance = axios.create({
  //baseURL: 'http://3.136.103.206:8080/',
  baseURL: "https://6935-2804-14d-5483-45d0-54b6-f52e-4499-d22c.ngrok-free.app/",
   
});

export default axiosInstance;