import axios from "axios";

const apiRequest = axios.create({
  baseURL: "https://seron-estate-server.onrender.com/api",
  // baseURL: "http://localhost:8800/api",
  withCredentials: true,
});

export default apiRequest;
