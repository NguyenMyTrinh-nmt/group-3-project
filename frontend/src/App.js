import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Profile from "./pages/Profile"; // 👤 Thêm trang Profile
import Admin from "./pages/Admin";     // 👑 Trang Admin

function App() {
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
        </nav>

        {/* 📍 Routes */}
        <div style={styles.card}>
          <Routes>
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="*" element={<Login />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

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
    gap: "15px",
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

export default App;