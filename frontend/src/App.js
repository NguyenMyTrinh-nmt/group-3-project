import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Admin from "./pages/Admin";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import AdminLogPage from "./pages/AdminLogPage"; // 1. Import trang Log
import Navbar from "./components/Navbar";

// 2. Import các component bảo vệ mà bạn đã tạo (theo Bước 6)
import { ProtectedRoute, AdminRoute } from "./components/ProtectedRoute";

function App() {
  // --- KHÔNG CÒN useState HAY useEffect Ở ĐÂY ---
  // Tất cả state (user, role, token) đã được Redux quản lý
  // Component "Navbar" và các trang khác sẽ tự lấy state từ Redux

  return (
    <Router>
      <div style={styles.container}>
        <h1 style={styles.title}>🌐 Ứng dụng Authentication</h1>

        {/* 3. Navbar sẽ tự động cập nhật nhờ Redux */}
        <Navbar />

        {/* Thanh điều hướng cũ này bạn có thể TÍCH HỢP vào Navbar
          hoặc XÓA ĐI, vì Navbar đã làm nhiệm vụ này rồi.
          (Mình tạm giữ lại theo file của bạn)
        */}
        <nav style={styles.nav}>
          <Link style={styles.link} to="/login">Đăng nhập</Link>
          <Link style={styles.link} to="/signup">Đăng ký</Link>
          <Link style={styles.link} to="/profile">Profile</Link>
          <Link style={styles.link} to="/admin">Admin</Link>
          <Link style={styles.link} to="/admin/logs">Nhật ký</Link>
          <Link style={styles.link} to="/forgot-password">Quên mật khẩu</Link>
          
          {/* Bạn nên thêm link này vào Navbar, không phải ở đây */}
          {/* <Link style={styles.link} to="/admin/logs">Nhật ký</Link> */}
        </nav>

        {/* 📍 Nội dung trang */}
        <div style={styles.card}>
          <Routes>
            {/* === 4. ROUTES CÔNG KHAI === */}
            {/* Ai cũng vào được */}
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />

            {/* === 5. ROUTES CẦN ĐĂNG NHẬP (User thường) === */}
            {/* Bọc bởi <ProtectedRoute> */}
            <Route element={<ProtectedRoute />}>
              <Route path="/profile" element={<Profile />} />
              {/* Thêm các trang cho user thường ở đây */}
            </Route>

            {/* === 6. ROUTES CỦA ADMIN === */}
            {/* Bọc bởi <AdminRoute> (phải là admin mới vào được) */}
            <Route element={<AdminRoute />}>
              <Route path="/admin" element={<Admin />} />
              <Route path="/admin/logs" element={<AdminLogPage />} />
              {/* Thêm các trang admin khác ở đây */}
            </Route>

            {/* Route mặc định (chưa login thì về /login) */}
            <Route path="*" element={<Login />} />
            {/* (Hoặc bạn có thể trỏ về trang chủ nếu có) */}
            {/* <Route path="/" element={<HomePage />} /> */}

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