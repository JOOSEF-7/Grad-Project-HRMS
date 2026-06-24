// services/axiosPublic.js
import axios from "axios";

const axiosPublic = axios.create({
  // baseURL: "https://grad-project-hrms-production-7.up.railway.app/api",
  baseURL: "http://localhost:5000/api",
  timeout: 120000,
});

export default axiosPublic;
