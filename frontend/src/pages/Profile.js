import { useEffect, useState } from "react";
import api from "../api/axios";        // dùng axios instance thay vì axios trực tiếp
import { logout } from "../api/auth";  // hàm logout riêng
import UploadAvatar from "../components/UploadAvatar";

export default function Profile() {
  const [user, setUser] = useState(null);
  const [form, setForm] = useState({ name: "", password: "" });
  const [message, setMessage] = useState("");
  const [avatar, setAvatar] = useState(null);

  // 🧭 Lấy thông tin user sau khi đăng nhập
  useEffect(() => {
    api
      .get("/profile")
      .then((res) => {
        setUser(res.data);
        setForm({ name: res.data.name, password: "" });
        if (res.data.avatar) setAvatar(res.data.avatar);
      })
      .catch(() => setMessage("⚠️ Token không hợp lệ hoặc hết hạn"));
  }, []);

  // ✍️ Thay đổi form
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // 💾 Cập nhật thông tin
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const res = await api.put("/profile", form);
      setUser(res.data);
      setMessage("✅ Cập nhật thông tin thành công!");
      setForm({ ...form, password: "" });
    } catch (err) {
      setMessage("❌ Lỗi khi cập nhật thông tin!");
    }
  };

  // 🖼️ Upload avatar
  const handleAvatarUpload = async (file) => {
    setAvatar(URL.createObjectURL(file)); // preview tạm

    const formData = new FormData();
   formData.append("avatar", file);

    try {
      const res = await api.post("/profile/avatar", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setAvatar(res.data.avatar);
      setMessage("✅ Upload avatar thành công!");
    } catch (err) {
      console.error("❌ Lỗi khi upload avatar", err);
      setMessage("❌ Lỗi khi upload avatar");
    }
  };

  if (!user) return <p>⏳ Đang tải thông tin...</p>;

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>👤 Thông tin cá nhân</h2>
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

      {/* Form update */}
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

      {/* 🔸 Nút Logout */}
      <div style={{ textAlign: "center", marginTop: "20px" }}>
        <button
          onClick={logout}
          style={{
            backgroundColor: "#d9534f",
            color: "white",
            padding: "10px 15px",
            borderRadius: "6px",
            border: "none",
            cursor: "pointer",
            fontWeight: "bold",
          }}
        >
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
};
