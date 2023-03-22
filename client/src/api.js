// src/api.js
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3030",
});

// Add a request interceptor to set the Authorization header for all requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    if (config.data instanceof FormData) {
      config.headers["Content-Type"] = "multipart/form-data";
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
