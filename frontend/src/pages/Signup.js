import { useState } from "react";
import axios from "axios";

export default function Signup() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/signup", form);
      setMessage("🎉 Đăng ký thành công!");
      setForm({ name: "", email: "", password: "" });
    } catch (err) {
      setMessage("⚠️ Email đã tồn tại hoặc có lỗi!");
    }
  };

  return (
    <div>
      <h2 style={styles.title}>📝 Đăng ký tài khoản</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          type="text"
          name="name"
          placeholder="Họ tên"
          value={form.name}
          onChange={handleChange}
          required
          style={styles.input}
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
          style={styles.input}
        />
        <input
          type="password"
          name="password"
          placeholder="Mật khẩu"
          value={form.password}
          onChange={handleChange}
          required
          style={styles.input}
        />
        <button type="submit" style={styles.btn}>
          Đăng ký
        </button>
      </form>
      {message && <p style={styles.message}>{message}</p>}
    </div>
  );
}

const styles = {
  title: { textAlign: "center", color: "#28a745", marginBottom: "15px" },
  form: { display: "flex", flexDirection: "column", gap: "10px" },
  input: {
    padding: "10px",
    border: "1px solid #ccc",
    borderRadius: "6px",
    outline: "none",
  },
  btn: {
    backgroundColor: "#28a745",
    color: "#fff",
    padding: "10px",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    fontWeight: "600",
    transition: "0.3s",
  },
  message: { marginTop: "10px", textAlign: "center", color: "#555" },
};