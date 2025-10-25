import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Admin from "./pages/Admin"; // ĐÃ BỎ COMMENT: Khắc phục lỗi 'Admin is not defined'
import AdminLogPage from "./pages/AdminLogPage";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import { ProtectedRoute, AdminRoute } from "./components/ProtectedRoute";

function App() {
  return (
    <Router>
      <div style={styles.container}>
        <h1 style={styles.title}> Ứng dụng Authentication</h1>

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
          <Link style={styles.link} to="/admin/logs">
            Nhật ký
          </Link>
          <Link style={styles.link} to="/forgot-password">
            Quên mật khẩu
          </Link>
          <Link style={styles.link} to="/reset-password">
            Đặt lại mật khẩu
          </Link>
        </nav>

        <div style={styles.card}>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password" element={<ResetPassword />} />

            <Route element={<ProtectedRoute />}>
              <Route path="/profile" element={<Profile />} />
            </Route>

            <Route element={<AdminRoute />}>
              <Route path="/admin" element={<Admin />} />
              <Route path="/admin/logs" element={<AdminLogPage />} />
            </Route>

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

export default App;