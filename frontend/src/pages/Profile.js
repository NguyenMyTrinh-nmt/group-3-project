import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import { logout } from "../redux/authSlice";
import UploadAvatar from "../components/UploadAvatar";

export default function Profile() {
  const { user, token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [form, setForm] = useState({ name: user?.name || "", password: "" });
  const [message, setMessage] = useState("");
  const [avatar, setAvatar] = useState(user?.avatar || null);

  useEffect(() => {
    if (user) {
      setForm({ name: user.name || "", password: "" });
      setAvatar(user.avatar || null);
    }
  }, [user]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdate = async (event) => {
    event.preventDefault();
    try {
      await api.put(
        "/profile",
        { name: form.name, password: form.password || undefined },
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );

      setMessage("✅ Cập nhật thông tin thành công!");
      setForm((prev) => ({ ...prev, password: "" }));
    } catch (error) {
      setMessage("❌ Lỗi khi cập nhật thông tin!");
    }
  };

  const handleAvatarUpload = async (file) => {
    setAvatar(URL.createObjectURL(file));

    const formData = new FormData();
    formData.append("avatar", file);

    try {
      const response = await api.post("/profile/avatar", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });
      setAvatar(response.data.avatar);
      setMessage("✅ Upload avatar thành công!");
    } catch (error) {
      console.error("❌ Lỗi khi upload avatar", error);
      setMessage("❌ Lỗi khi upload avatar");
    }
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  if (!user) {
    return <p>⏳ Đang tải thông tin...</p>;
  }

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>👤 Thông tin cá nhân</h2>
      <p style={{ textAlign: "center", fontWeight: "bold" }}>Xin chào, {user.email}</p>
      {message && <p style={styles.message}>{message}</p>}

      <div style={{ textAlign: "center", marginBottom: "20px" }}>
        <UploadAvatar onUpload={handleAvatarUpload} />
        {avatar && (
          <img
            src={avatar}
            alt="Avatar"
            style={{ width: "100px", height: "100px", borderRadius: "50%", marginTop: "10px" }}
          />
        )}
      </div>

      <form onSubmit={handleUpdate} style={styles.form}>
        <label style={styles.label}>Tên</label>
        <input type="text" name="name" value={form.name} onChange={handleChange} style={styles.input} />
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

      <div style={{ textAlign: "center", marginTop: "20px" }}>
        <button onClick={handleLogout} style={styles.logoutBtn}>
          Logout
        </button>
      </div>
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
  logoutBtn: {
    backgroundColor: "#d9534f",
    color: "white",
    padding: "10px 15px",
    borderRadius: "6px",
    border: "none",
    cursor: "pointer",
    fontWeight: "bold",
  },
};