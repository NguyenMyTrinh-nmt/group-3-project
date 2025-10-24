import { useState, useEffect } from "react";
import api from "../api/axios";

export function useAuth() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const loadMe = async () => {
    const token = localStorage.getItem("accessToken");
    if (!token) {
      setUser(null);
      setLoading(false);
      return;
    }

    try {
      const res = await api.get("/profile");
      setUser(res.data);
    } catch (err) {
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadMe();
  }, []);

  const login = async (email, password) => {
  const res = await api.post("/api/auth/login", { email, password });
    const { accessToken, refreshToken } = res.data;
    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("refreshToken", refreshToken);
    await loadMe();
  };

  const logout = async () => {
    try {
      const rt = localStorage.getItem("refreshToken");
      if (rt) {
  await api.post("/api/auth/logout", { refreshToken: rt });
      }
    } catch (e) {
      // ignore server error on logout
    } finally {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      setUser(null);
      window.location.href = "/login"; // or use router navigate
    }
  };

  return { user, loading, login, logout };
}