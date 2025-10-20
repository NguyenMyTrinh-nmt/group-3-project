import { useState } from "react";
import axios from "axios";

<<<<<<< HEAD
function Signup() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
=======
export default function Signup() {
  // Sửa name → username để khớp backend
  const [form, setForm] = useState({ username: "", email: "", password: "" });
>>>>>>> frontend
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/signup", form);
      setMessage("🎉 Đăng ký thành công!");
<<<<<<< HEAD
      setForm({ name: "", email: "", password: "" });
=======
      setForm({ username: "", email: "", password: "" });
>>>>>>> frontend
    } catch (err) {
      console.log(err.response?.data); // debug message từ server
      setMessage(err.response?.data?.message || "⚠️ Có lỗi xảy ra!");
    }
  };

  return (
    <div>
<<<<<<< HEAD
      <h2 style={styles.title}>Đăng ký tài khoản</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <label style={styles.label}>Tên</label>
        <input
          type="text"
          name="name"
          placeholder="Nhập tên..."
          value={form.name}
=======
      <h2 style={styles.title}>📝 Đăng ký tài khoản</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          type="text"
          name="username"  // sửa name
          placeholder="Tên đăng nhập"
          value={form.username}
>>>>>>> frontend
          onChange={handleChange}
          required
          style={styles.input}
        />

        <label style={styles.label}>Email</label>
        <input
          type="email"
          name="email"
<<<<<<< HEAD
          placeholder="Nhập email..."
=======
          placeholder="Email"
>>>>>>> frontend
          value={form.email}
          onChange={handleChange}
          required
          style={styles.input}
        />

        <label style={styles.label}>Mật khẩu</label>
        <input
          type="password"
          name="password"
<<<<<<< HEAD
          placeholder="Nhập mật khẩu..."
=======
          placeholder="Mật khẩu"
>>>>>>> frontend
          value={form.password}
          onChange={handleChange}
          required
          style={styles.input}
        />
<<<<<<< HEAD

        <button type="submit" style={styles.signupBtn}>
=======
        <button type="submit" style={styles.btn}>
>>>>>>> frontend
          Đăng ký
        </button>
      </form>
      {message && <p style={styles.message}>{message}</p>}
    </div>
  );
}

const styles = {
<<<<<<< HEAD
  title: {
    textAlign: "center",
    color: "#007bff",
    marginBottom: "15px",
  },
  form: {
    display: "flex",
    flexDirection: "column",
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
  signupBtn: {
    marginTop: "10px",
    backgroundColor: "#007bff",
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

export default Signup;
=======
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
>>>>>>> frontend
