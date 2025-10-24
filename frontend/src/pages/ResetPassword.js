import { useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import axios from "axios";

export default function ResetPassword() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const token = searchParams.get("token");

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!token) {
      setMessage("❌ Liên kết không hợp lệ. Vui lòng yêu cầu lại email đổi mật khẩu.");
      return;
    }

    if (newPassword !== confirmPassword) {
      setMessage("❌ Mật khẩu xác nhận không khớp.");
      return;
    }

    try {
      await axios.post("http://localhost:5000/api/auth/reset-password", {
        token,
        newPassword,
      });

      setMessage("✅ Đổi mật khẩu thành công. Đang chuyển về trang đăng nhập...");
      setNewPassword("");
      setConfirmPassword("");

      setTimeout(() => navigate("/login"), 2000);
    } catch (err) {
      setMessage("❌ Token đã hết hạn hoặc có lỗi xảy ra. Vui lòng thử lại.");
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>🔐 Đặt lại mật khẩu</h2>
      {message && (
        <p
          style={{
            ...styles.message,
            color: message.startsWith("✅") ? "#28a745" : "#d9534f",
          }}
        >
          {message}
        </p>
      )}
      <form onSubmit={handleSubmit} style={styles.form}>
        <label style={styles.label}>Mật khẩu mới</label>
        <input
          type="password"
          placeholder="Nhập mật khẩu mới..."
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          required
          minLength={6}
          style={styles.input}
        />

        <label style={styles.label}>Xác nhận mật khẩu</label>
        <input
          type="password"
          placeholder="Nhập lại mật khẩu..."
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
          minLength={6}
          style={styles.input}
        />

        <button type="submit" style={styles.button}>
          Đổi mật khẩu
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
    color: "#007bff",
    marginBottom: "15px",
  },
  message: {
    textAlign: "center",
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
  button: {
    backgroundColor: "#007bff",
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
