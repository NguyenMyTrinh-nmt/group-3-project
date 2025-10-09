import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Profile from "./pages/Profile";

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
      </div>
    </Router>
  );
}

const styles = {
  card: {
    background: "#f9f9f9",
    padding: "25px",
    borderRadius: "10px",
    marginBottom: "25px",
    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
  },
  nav: {
    display: "flex",
    justifyContent: "center",
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