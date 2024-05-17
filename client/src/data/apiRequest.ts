import axios from "axios";

const apiRequest = axios.create({
  baseURL: "https://seron-estate-server.onrender.com/api",
  withCredentials: true,
});

export default apiRequest;
