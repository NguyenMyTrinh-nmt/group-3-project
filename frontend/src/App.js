<<<<<<< HEAD
=======

>>>>>>> frontend
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
<<<<<<< HEAD

function App() {
  return (
    <Router>
      <div
        style={{
          padding: "40px",
          maxWidth: "500px",
          margin: "0 auto",
          fontFamily: "Segoe UI, Arial, sans-serif",
        }}
      >
        <h1
          style={{
            textAlign: "center",
            color: "#222",
            marginBottom: "30px",
            letterSpacing: "0.5px",
          }}
        >
          🌐 Ứng dụng Authentication
        </h1>

        {/* Thanh chuyển trang nhỏ */}
        <nav style={styles.nav}>
          <Link to="/" style={styles.navLink}>
            Đăng nhập
          </Link>
          <Link to="/signup" style={styles.navLink}>
            Đăng ký
          </Link>
          <Link to="/profile" style={styles.navLink}>
            Profile
          </Link>
        </nav>

        {/* Các route */}
        <section style={styles.card}>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </section>
=======
import Admin from "./pages/Admin";
import ForgotPassword from "./pages/ForgotPassword"; // 📨 Thêm trang quên mật khẩu

import { useState, useEffect } from "react";
import axios from "axios";
import UserList from "./components/UserList";
import AddUser from "./components/AddUser";


function App() {
  const [users, setUsers] = useState([]);

  // Lấy danh sách user từ backend
  const fetchUsers = async () => {
    try {
      const res = await axios.get("http://localhost:5000/users");
      setUsers(res.data);
    } catch (err) {
      console.error("Lỗi khi lấy danh sách user:", err);
    }
  };

  // Chạy lần đầu và khi cần refresh
  useEffect(() => {
    fetchUsers();
  }, []);
   <div className="App">
      <h1>Quản lý User</h1>
      <AddUser onAdd={fetchUsers} />
      <UserList users={users} />
    </div>

  return (
        
    <Router>
      <div style={styles.container}>
        <h1 style={styles.title}>🌐 Ứng dụng Authentication</h1>

        {/* 🧭 Thanh điều hướng */}
        <nav style={styles.nav}>
          <Link style={styles.link} to="/login">
            Đăng nhập
          </Link>
          <Link style={styles.link} to="/signup">
            Đăng ký
          </Link>
          <Link style={styles.link} to="/profile">
            Profile
          </Link>
          <Link style={styles.link} to="/admin">
            Admin
          </Link>
          <Link style={styles.link} to="/forgot-password">
            Quên mật khẩu
          </Link>
        </nav>

        {/* 📍 Nội dung trang */}
        <div style={styles.card}>
          <Routes>
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="*" element={<Login />} />
          </Routes>
        </div>
>>>>>>> frontend
      </div>
    </Router>
  );
}
export default App;

const styles = {
<<<<<<< HEAD
  card: {
    background: "#f9f9f9",
    padding: "25px",
    borderRadius: "10px",
    marginBottom: "25px",
    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
=======
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
>>>>>>> frontend
  },
  nav: {
    display: "flex",
    justifyContent: "center",
<<<<<<< HEAD
    gap: "15px",
    marginBottom: "20px",
  },
  navLink: {
    textDecoration: "none",
    color: "#28a745",
    fontWeight: "bold",
  },
};

export default App;
=======
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




 
>>>>>>> frontend
