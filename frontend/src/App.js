import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Admin from "./pages/Admin"; // Sẽ nhận props
import ForgotPassword from "./pages/ForgotPassword";

import { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "./components/Navbar";

// UserList và AddUser nên được import bên trong Admin.js
// Nơi chúng thực sự được sử dụng

function App() {
  // --- TẤT CẢ STATE VÀ HOOKS PHẢI Ở ĐÂY (TOP LEVEL) ---

  const [users, setUsers] = useState([]);
  const [role, setRole] = useState("");

  // ✅ ĐÚNG: Hook ở top-level
  useEffect(() => {
    const savedRole = localStorage.getItem("role");
    if (savedRole) {
      setRole(savedRole);
    }
  }, []);

  // Lấy danh sách user từ backend
  // ✅ ĐÚNG: Hàm này giờ chỉ làm một việc là fetch data
  const fetchUsers = async () => {
    try {
      const res = await axios.get("http://localhost:5000/users");
      setUsers(res.data);
    } catch (err) {
      console.error("Lỗi khi lấy danh sách user:", err);
    }
  };

  // ✅ ĐÚNG: Hook ở top-level
  // Chạy lần đầu để lấy users
  useEffect(() => {
    fetchUsers();
  }, []);

  // --- KẾT THÚC KHU VỰC HOOKS ---

  return (
    <Router>
      <div style={styles.container}>
        <h1 style={styles.title}>🌐 Ứng dụng Authentication</h1>

        {/* Navbar hiển thị trên mọi trang
          Nó nhận 'role' từ state ở trên 
        */}
        <Navbar role={role} />

        {/* Thanh điều hướng cũ của bạn (có thể bạn muốn tích hợp vào Navbar) */}
        <nav style={styles.nav}>
          <Link style={styles.link} to="/login">Đăng nhập</Link>
          <Link style={styles.link} to="/signup">Đăng ký</Link>
          <Link style={styles.link} to="/profile">Profile</Link>
          <Link style={styles.link} to="/admin">Admin</Link>
          <Link style={styles.link} to="/forgot-password">Quên mật khẩu</Link>
        </nav>

        {/* 📍 Nội dung trang */}
        <div style={styles.card}>
          <Routes>
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/profile" element={<Profile />} />

            {/* ✅ Sửa lỗi logic: 
              Truyền state 'users' và hàm 'fetchUsers' vào component Admin
              Component Admin bây giờ sẽ chứa UserList và AddUser.
            */}
            <Route
              path="/admin"
              element={<Admin users={users} onAdd={fetchUsers} />}
            />

            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="*" element={<Login />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}
export default App;

// ... (giữ nguyên 'styles' của bạn)
const styles = {
  container: {
    padding: "40px",
    maxWidth: "600px",
    margin: "0 auto",
    fontFamily: "Segoe UI, Arial, sans-serif",
  },
  title: {
    textAlign: "center",
    color: "#222",
    marginBottom: "20px",
    fontWeight: "600",
  },
  nav: {
    display: "flex",
    justifyContent: "center",
    flexWrap: "wrap",
    gap: "12px",
    marginBottom: "30px",
  },
  link: {
    textDecoration: "none",
    color: "#28a745",
    fontWeight: "bold",
    fontSize: "16px",
    padding: "8px 12px",
    borderRadius: "6px",
    background: "#e8f5e9",
    transition: "0.3s",
  },
  card: {
    background: "#fff",
    padding: "25px",
    borderRadius: "10px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
  },
};