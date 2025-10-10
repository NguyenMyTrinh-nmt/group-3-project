import { useEffect, useState } from "react";
import axios from "axios";

export default function Profile() {
  const [user, setUser] = useState(null);
  const [form, setForm] = useState({ name: "", password: "" });
  const [message, setMessage] = useState("");

  // 🧭 Lấy thông tin user sau khi đăng nhập
  useEffect(() => {
    const token = localStorage.getItem("token");
    axios
      .get("http://localhost:5000/profile", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setUser(res.data);
        setForm({ name: res.data.name, password: "" });
      })
      .catch(() => setMessage("⚠️ Token không hợp lệ hoặc hết hạn"));
  }, []);

  // ✍️ Hàm thay đổi form
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // 💾 Hàm cập nhật thông tin
  const handleUpdate = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    try {
      const res = await axios.put(
        "http://localhost:5000/profile",
        form,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setUser(res.data);
      setMessage("✅ Cập nhật thông tin thành công!");
      setForm({ ...form, password: "" });
    } catch (err) {
      setMessage("❌ Lỗi khi cập nhật thông tin!");
    }
  };

  if (!user) return <p>⏳ Đang tải thông tin...</p>;

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>👤 Thông tin cá nhân</h2>
      {message && <p style={styles.message}>{message}</p>}

      <form onSubmit={handleUpdate} style={styles.form}>
        <label style={styles.label}>Tên</label>
        <input
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
          style={styles.input}
        />

        <label style={styles.label}>Mật khẩu mới</label>
        <input
          type="password"
          name="password"
          value={form.password}
          onChange={handleChange}
          placeholder="Để trống nếu không đổi"
          style={styles.input}
        />

        <button type="submit" style={styles.updateBtn}>
          Lưu thay đổi
        </button>
      </form>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: "400px",
    margin: "0 auto",
    background: "#f9f9f9",
    padding: "25px",
    borderRadius: "10px",
    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
  },
  title: {
    textAlign: "center",
    color: "#28a745",
    marginBottom: "15px",
  },
  message: {
    textAlign: "center",
    color: "#d9534f",
    marginBottom: "10px",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "15px",
  },
  label: {
    fontWeight: "bold",
    color: "#333",
  },
  input: {
    padding: "10px",
    borderRadius: "6px",
    border: "1px solid #ccc",
    fontSize: "15px",
  },
  updateBtn: {
    backgroundColor: "#28a745",
    color: "white",
    padding: "12px",
    border: "none",
    borderRadius: "6px",
    fontSize: "15px",
    fontWeight: "bold",
    cursor: "pointer",
    transition: "0.3s",
  },
};