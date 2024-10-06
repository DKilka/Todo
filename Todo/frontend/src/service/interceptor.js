import axios from "axios";

const HEADERS = {
  "Content-Type": "application/json",
};

const axiosInstance = axios.create({
  headers: HEADERS,
});

axiosInstance.interceptors.request.use(
  function (config) {
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

export default axiosInstance;
