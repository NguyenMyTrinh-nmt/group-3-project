import { useState } from "react";
import api from "../api/axios"; // ✅ import axios instance có interceptor
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // ✅ gọi API login
      const res = await api.post("/auth/login", form);

      // ✅ lưu token
      localStorage.setItem("accessToken", res.data.accessToken);
      localStorage.setItem("refreshToken", res.data.refreshToken);

      setMessage("🎉 Đăng nhập thành công!");
      setTimeout(() => navigate("/profile"), 800);
    } catch (err) {
      setMessage("⚠️ Sai email hoặc mật khẩu!");
    }
  };

  return (
    <div>
      <h2 style={styles.title}>🔐 Đăng nhập</h2>
      {message && <p style={styles.message}>{message}</p>}
      <form onSubmit={handleSubmit} style={styles.form}>
        <div style={styles.formGroup}>
          <label style={styles.label}>Email</label>
          <input
            type="email"
            name="email"
            placeholder="Nhập email..."
            value={form.email}
            onChange={handleChange}
            required
            style={styles.input}
          />
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label}>Mật khẩu</label>
          <input
            type="password"
            name="password"
            placeholder="Nhập mật khẩu..."
            value={form.password}
            onChange={handleChange}
            required
            style={styles.input}
          />
        </div>

        <button type="submit" style={styles.loginBtn}>
          Đăng nhập
        </button>
      </form>
    </div>
  );
}

const styles = {
  title: {
    textAlign: "center",
    color: "#28a745",
    marginBottom: "20px",
  },
  message: {
    textAlign: "center",
    color: "#d9534f",
    fontWeight: "bold",
    marginBottom: "15px",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "15px",
  },
  formGroup: {
    display: "flex",
    flexDirection: "column",
  },
  label: {
    fontWeight: "bold",
    marginBottom: "5px",
    color: "#444",
  },
  input: {
    padding: "10px",
    borderRadius: "6px",
    border: "1px solid #ccc",
    fontSize: "15px",
    outline: "none",
    transition: "0.3s",
  },
  loginBtn: {
    backgroundColor: "#28a745",
    color: "white",
    border: "none",
    padding: "12px",
    borderRadius: "6px",
    cursor: "pointer",
    fontWeight: "bold",
    fontSize: "15px",
    transition: "0.3s",
  },
};