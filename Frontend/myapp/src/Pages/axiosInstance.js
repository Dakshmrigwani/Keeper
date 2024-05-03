// axiosInstance.js
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:8080/api/v1", // Update to your backend URL
  withCredentials: true, // Send cookies with every request
});

export default axiosInstance;
