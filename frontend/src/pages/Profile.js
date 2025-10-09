import { useEffect, useState } from "react";
import axios from "axios";

export default function Profile() {
  const [user, setUser] = useState(null);
  const [message, setMessage] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setMessage("❌ Bạn chưa đăng nhập!");
      return;
    }

    axios
      .get("http://localhost:5000/profile", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setUser(res.data);
        setName(res.data.name);
      })
      .catch(() => setMessage("⚠️ Token không hợp lệ hoặc hết hạn!"));
  }, []);

  const handleUpdate = async (e) => {
    e.preventDefault();
    setSuccess("");

    try {
      const token = localStorage.getItem("token");
      const res = await axios.put(
        "http://localhost:5000/profile",
        { name, password },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setUser(res.data);
      setPassword("");
      setSuccess("✅ Cập nhật thông tin thành công!");
    } catch (err) {
      setMessage("❌ Có lỗi xảy ra khi cập nhật!");
    }
  };

  if (message) return <p style={styles.message}>{message}</p>;
  if (!user) return <p>Đang tải...</p>;

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Thông tin cá nhân</h2>

      <div style={styles.infoBox}>
        <p>
          <strong>Tên:</strong> {user.name}
        </p>
        <p>
          <strong>Email:</strong> {user.email}
        </p>
      </div>

      <form style={styles.form} onSubmit={handleUpdate}>
        <h3 style={styles.subtitle}>Cập nhật thông tin</h3>
        <input
          type="text"
          placeholder="Tên mới..."
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={styles.input}
        />
        <input
          type="password"
          placeholder="Mật khẩu mới (bỏ trống nếu không đổi)"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={styles.input}
        />
        <button type="submit" style={styles.button}>
          Cập nhật
        </button>
        {success && <p style={styles.success}>{success}</p>}
      </form>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: "400px",
    margin: "0 auto",
    background: "#f9f9f9",
    padding: "20px",
    borderRadius: "10px",
    boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
  },
  title: {
    textAlign: "center",
    color: "#2d2d2d",
    marginBottom: "10px",
  },
  subtitle: {
    textAlign: "center",
    color: "#444",
    marginBottom: "10px",
  },
  infoBox: {
    background: "#fff",
    borderRadius: "8px",
    padding: "15px",
    boxShadow: "0 1px 4px rgba(0,0,0,0.1)",
    marginBottom: "15px",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  },
  input: {
    padding: "10px",
    borderRadius: "6px",
    border: "1px solid #ccc",
    outline: "none",
  },
  button: {
    background: "#28a745",
    color: "#fff",
    padding: "10px",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    fontWeight: "bold",
  },
  message: {
    textAlign: "center",
    color: "#d9534f",
  },
  success: {
    textAlign: "center",
    color: "#28a745",
    fontSize: "14px",
  },
};
