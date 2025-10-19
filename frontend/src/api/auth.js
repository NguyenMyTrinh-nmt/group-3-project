// src/api/auth.js
import axios from "axios";

// 👉 Tạo instance axios riêng
const api = axios.create({
  baseURL: "http://localhost:5000",
});

// 👉 Thêm accessToken vào mỗi request
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");
  if (token) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }
  return config;
});

// 👉 Khi accessToken hết hạn → tự động gọi refresh
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const refreshToken = localStorage.getItem("refreshToken");
        const res = await axios.post("http://localhost:3000/auth/refresh", {
          refreshToken,
        });
        localStorage.setItem("accessToken", res.data.accessToken);
        originalRequest.headers["Authorization"] = `Bearer ${res.data.accessToken}`;
        return api(originalRequest);
      } catch (err) {
        console.error("Lỗi refresh token:", err);
        logout(); // nếu refresh lỗi thì logout luôn
      }
    }
    return Promise.reject(error);
  }
);

// 👉 Hàm logout
export const logout = async () => {
  try {
    const refreshToken = localStorage.getItem("refreshToken");
    if (refreshToken) {
      await api.post("/auth/logout", { refreshToken });
    }
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    window.location.href = "/login";
  } catch (err) {
    console.error("Lỗi khi logout:", err);
  }
};

export default api;
