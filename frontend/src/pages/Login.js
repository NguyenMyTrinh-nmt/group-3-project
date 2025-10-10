import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // 👈 thêm dòng này

function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");
  const navigate = useNavigate(); // 👈 khởi tạo điều hướng

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/login", form);
      localStorage.setItem("token", res.data.token);
      setMessage("🎉 Đăng nhập thành công!");

      // 👉 Sau 1s chuyển sang trang profile
      setTimeout(() => {
        navigate("/profile");
      }, 1000);

      setForm({ email: "", password: "" });
    } catch (err) {
      setMessage("⚠️ Sai email hoặc mật khẩu!");
    }
  };

  return (
    <div>
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

        <button type="submit" style={styles.loginBtn}>
          Đăng nhập
        </button>
      </form>

      {message && <p style={styles.message}>{message}</p>}
    </div>
  );
}

const styles = {
  title: {
    textAlign: "center",
    color: "#28a745",
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
