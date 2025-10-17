// src/api/auth.js
import api from "./axios";

export const logout = async () => {
  try {
    await api.post("/auth/logout", {
      refreshToken: localStorage.getItem("refreshToken"),
    });
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    window.location.href = "/login";
  } catch (err) {
    console.error("Lỗi khi logout:", err);
  }
};