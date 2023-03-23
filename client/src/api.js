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

export const fetchAllProducts = async () => {
  try {
    const response = await api.get("/hotels/all-hotels");
    return response.data;
  } catch (error) {
    console.error("Error fetching hotels:", error);
  }
};

export default api;
