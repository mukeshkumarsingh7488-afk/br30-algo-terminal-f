import axios from "axios";
import API_BASE_URL from "../config/api";

const API = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000,
  headers: {
    "Content-Type": "application/json",
  },
});

API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("br30_algo_token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

API.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error?.response?.status;

    if (status === 401) {
      localStorage.removeItem("br30_algo_token");
      localStorage.removeItem("br30_algo_user");
      window.location.href = "/login";
    }

    return Promise.reject(error);
  }
);

export default API;
