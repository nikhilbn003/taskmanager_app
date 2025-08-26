import axios from "axios";

// Get token from localStorage
const token = localStorage.getItem("token");

const axiosInstance = axios.create({
  baseURL: "http://localhost:5000",
  headers: {
    Authorization: token ? `Bearer ${token}` : "",
    "Content-Type": "application/json",
  },
});

export default axiosInstance;
