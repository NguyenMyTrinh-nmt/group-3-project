import { useState } from "react";
<<<<<<< HEAD
import axios from "axios";
import { useNavigate } from "react-router-dom"; // 👈 thêm dòng này
=======
import api from "../api/axios"; // ✅ import axios instance có interceptor
import { useNavigate } from "react-router-dom";
>>>>>>> frontend

function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");
<<<<<<< HEAD
  const navigate = useNavigate(); // 👈 khởi tạo điều hướng
=======
  const navigate = useNavigate();
>>>>>>> frontend

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
<<<<<<< HEAD
      const res = await axios.post("http://localhost:5000/login", form);
      localStorage.setItem("token", res.data.token);
      setMessage("🎉 Đăng nhập thành công!");

      // 👉 Sau 1s chuyển sang trang profile
      setTimeout(() => {
        navigate("/profile");
      }, 1000);

      setForm({ email: "", password: "" });
=======
      // ✅ gọi API login
      const res = await api.post("/login", form);

      // ✅ lưu token
      localStorage.setItem("accessToken", res.data.accessToken);
      localStorage.setItem("refreshToken", res.data.refreshToken);

      setMessage("🎉 Đăng nhập thành công!");
      setTimeout(() => navigate("/profile"), 800);
>>>>>>> frontend
    } catch (err) {
      setMessage("⚠️ Sai email hoặc mật khẩu!");
    }
  };

  return (
    <div>
<<<<<<< HEAD
      <h2 style={styles.title}>Đăng nhập</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
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
=======
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
>>>>>>> frontend

        <button type="submit" style={styles.loginBtn}>
          Đăng nhập
        </button>
      </form>
<<<<<<< HEAD

      {message && <p style={styles.message}>{message}</p>}
=======
>>>>>>> frontend
    </div>
  );
}

const styles = {
  title: {
    textAlign: "center",
    color: "#28a745",
<<<<<<< HEAD
=======
    marginBottom: "20px",
  },
  message: {
    textAlign: "center",
    color: "#d9534f",
    fontWeight: "bold",
>>>>>>> frontend
    marginBottom: "15px",
  },
  form: {
    display: "flex",
    flexDirection: "column",
<<<<<<< HEAD
    gap: "10px",
  },
  label: {
    fontWeight: "bold",
    color: "#444",
  },
  input: {
    padding: "8px",
    borderRadius: "6px",
    border: "1px solid #ccc",
  },
  loginBtn: {
    marginTop: "10px",
    backgroundColor: "#28a745",
    color: "white",
    border: "none",
    padding: "10px",
    borderRadius: "6px",
    cursor: "pointer",
    fontWeight: "bold",
    transition: "0.3s",
  },
  message: {
    marginTop: "10px",
    textAlign: "center",
  },
};

export default Login;
=======
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
>>>>>>> frontend
