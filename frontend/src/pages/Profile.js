import { useState } from "react"; // 1. ĐÃ XÓA 'useEffect'
import { useSelector, useDispatch } from 'react-redux'; 
import { useNavigate } from 'react-router-dom';
import api from "../api/axios"; 
import { logout } from '../redux/authSlice'; 
import UploadAvatar from "../components/UploadAvatar";

export default function Profile() {
    const { user, token } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [form, setForm] = useState({ name: user?.name || "", password: "" });
    const [message, setMessage] = useState("");
    const [avatar, setAvatar] = useState(user?.avatar || null);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            // 2. ĐÃ XÓA "const res =" (vì không dùng)
            await api.put("/profile", form, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            
            setMessage("✅ Cập nhật thông tin thành công!");
            setForm({ ...form, password: "" });
        } catch (err) {
            setMessage("❌ Lỗi khi cập nhật thông tin!");
        }
    };

    const handleAvatarUpload = async (file) => {
        setAvatar(URL.createObjectURL(file));

<<<<<<< HEAD
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
=======
        const formData = new FormData();
        formData.append("avatar", file);

        try {
            // 3. SỬA LUÔN Ở ĐÂY (thêm "const res =")
            const res = await api.post("/profile/avatar", formData, {
                headers: { 
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${token}` 
                },
            });
            setAvatar(res.data.avatar); // <-- 'res' được dùng ở đây
        } catch (err) {
            console.error("❌ Lỗi khi upload avatar", err);
        }
    };
>>>>>>> origin/feature/redux-protected

    const handleLogout = () => {
        dispatch(logout());
        navigate('/login'); 
    };

    if (!user) return <p>⏳ Đang tải thông tin...</p>; 

<<<<<<< HEAD
     
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
=======
    return (
        <div style={styles.container}>
            <h2 style={styles.title}>👤 Thông tin cá nhân</h2>
            <p style={{textAlign: 'center', fontWeight: 'bold'}}>Xin chào, {user.email}</p> 
            {message && <p style={styles.message}>{message}</p>}
>>>>>>> origin/feature/redux-protected

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

            <div style={{ textAlign: "center", marginTop: "20px" }}>
                <button
                    onClick={handleLogout} 
                    style={styles.logoutBtn} // Dùng style
                >
                    Logout
                </button>
            </div>
        </div>
    );
}

// ... (Dán styles của bạn vào đây)
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
  logoutBtn: { // Style cho nút logout
    backgroundColor: "#d9534f",
    color: "white",
    padding: "10px 15px",
    borderRadius: "6px",
    border: "none",
    cursor: "pointer",
    fontWeight: "bold",
  }
};