import axios from "axios";
import { store } from "./store/store";
import { setErrorMessage, clearErrorMessage } from "./store/slices/error-slice";

const apiUrl = process.env.REACT_APP_API_URL;
const api = axios.create({
  baseURL: apiUrl,
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

api.interceptors.response.use(
  (response) => {
    // If the request was successful, clear any previous error messages
    store.dispatch(clearErrorMessage());
    return response;
  },
  (error) => {
    // If there was an error, dispatch it to the Redux store
    const errorMessage =
      error.response?.data?.message || "An error occurred. Please try again.";
    store.dispatch(setErrorMessage(errorMessage));

    return Promise.reject(error);
  }
);

export const fetchAllProducts = async () => {
  try {
    const response = await api.get("/hotels/all-hotels");
    return response.data;
  } catch (error) {
    console.error("Error fetching products:", error);
  }
};

export default api;
