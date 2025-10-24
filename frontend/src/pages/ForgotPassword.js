import { useState } from "react";
import api from "../api/axios";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/api/auth/forgot-password", { email });
      setMessage("✅ Vui lòng kiểm tra email của bạn để nhận liên kết đặt lại mật khẩu.");
      setIsError(false);
      setEmail("");
    } catch (err) {
      setMessage("❌ Email không tồn tại hoặc có lỗi xảy ra.");
      setIsError(true);
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>📩 Quên mật khẩu</h2>
      {message && (
        <p
          style={{
            ...styles.message,
            color: isError ? "#d9534f" : "#28a745",
          }}
        >
          {message}
        </p>
      )}
      <form onSubmit={handleSubmit} style={styles.form}>
        <label style={styles.label}>Email</label>
        <input
          type="email"
          placeholder="Nhập email của bạn..."
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={styles.input}
        />
        <button type="submit" style={styles.button}>
          Gửi yêu cầu
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
  button: {
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