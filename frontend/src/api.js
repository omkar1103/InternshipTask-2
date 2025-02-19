import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8080", // Correct backend URL
  withCredentials: true,            // If using cookies or auth headers
});

export default api;
