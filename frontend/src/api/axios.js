// src/api/axios.js
import axios from "axios";

const baseURL = process.env.REACT_APP_API_URL || "http://localhost:5000"; // set backend URL

const api = axios.create({
  baseURL,
  headers: { "Content-Type": "application/json" },
});

// queue for requests while refresh in progress
let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
  failedQueue.forEach(p => (error ? p.reject(error) : p.resolve(token)));
  failedQueue = [];
};

// attach access token to requests
api.interceptors.request.use(
  config => {
    const token = localStorage.getItem("accessToken");
    if (token) config.headers["Authorization"] = `Bearer ${token}`;
    return config;
  },
  err => Promise.reject(err)
);

// response interceptor: auto refresh on 401
api.interceptors.response.use(
  res => res,
  err => {
    const originalRequest = err.config;
    if (!originalRequest) return Promise.reject(err);

    const status = err.response ? err.response.status : null;

    // If 401 and not retrying yet
    if (status === 401 && !originalRequest._retry) {
      // If no refresh token -> force logout
      const refreshToken = localStorage.getItem("refreshToken");
      if (!refreshToken) {
        // cleanup and redirect (or throw)
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        window.location.href = "/login";
        return Promise.reject(err);
      }

      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then(token => {
            originalRequest.headers["Authorization"] = "Bearer " + token;
            return api(originalRequest);
          })
          .catch(e => Promise.reject(e));
      }

      originalRequest._retry = true;
      isRefreshing = true;

      return new Promise((resolve, reject) => {
        // NOTE: use axios (not api) to avoid interceptor loop
  axios.post(`${baseURL}/api/auth/refresh-token`, { refreshToken })
          .then(({ data }) => {
            const { accessToken, refreshToken: newRefreshToken } = data;
            localStorage.setItem("accessToken", accessToken);
            if (newRefreshToken) localStorage.setItem("refreshToken", newRefreshToken);
            api.defaults.headers.common["Authorization"] = "Bearer " + accessToken;
            processQueue(null, accessToken);
            resolve(api(originalRequest));
          })
          .catch(error => {
            processQueue(error, null);
            localStorage.removeItem("accessToken");
            localStorage.removeItem("refreshToken");
            // redirect to login page
            window.location.href = "/login";
            reject(error);
          })
          .finally(() => {
            isRefreshing = false;
          });
      });
    }

    return Promise.reject(err);
  }
);

export default api;
