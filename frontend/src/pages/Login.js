import { useState, useEffect } from "react"; // 1. Import thêm useEffect
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux'; // 2. Import Redux Hooks
import { loginUser } from '../redux/authSlice'; // 3. Import Thunk login

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  
  // 4. Khởi tạo các hook cần thiết
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // 5. Lấy state từ Redux store (thay vì state "message" cũ)
  const { isAuthenticated, isLoading, error } = useSelector((state) => state.auth);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
 
  // 6. Sửa lại hàm handleSubmit để dùng Redux
  const handleSubmit = (e) => { // Không cần "async" nữa
    e.preventDefault();
    
    // Thay vì gọi api.post và localStorage...
    // bạn chỉ cần GỌI (dispatch) HÀNH ĐỘNG (loginUser)
    // Redux Thunk sẽ tự động gọi API và xử lý state
    dispatch(loginUser(form)); 
  };

  // 7. Thêm useEffect để tự động chuyển trang KHI ĐĂNG NHẬP THÀNH CÔNG
  useEffect(() => {
    // Nếu Redux báo là đã xác thực (isAuthenticated)
    if (isAuthenticated) {
        navigate('/profile'); // Tự động chuyển đến trang profile
    }
  }, [isAuthenticated, navigate]); // Chạy lại khi 'isAuthenticated' thay đổi

  return (
    <div>
      <h2 style={styles.title}>🔐 Đăng nhập</h2>
      
      {/* 8. Hiển thị thông báo loading hoặc lỗi từ Redux state */}
      {isLoading && <p style={styles.message}>Đang đăng nhập...</p>}
      {error && <p style={{...styles.message, color: '#d9534f'}}>{error}</p>}
      
      <form onSubmit={handleSubmit} style={styles.form}>
        <div style={styles.formGroup}>
          <label style={styles.label}>Email</label>
          <input
            type="email"
            name="email"
            placeholder="Nhập email..."
            value={form.email}
            onChange={handleChange}
            required
            style={styles.input}
          />
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label}>Mật khẩu</label>
          <input
            type="password"
            name="password"
            placeholder="Nhập mật khẩu..."
            value={form.password}
            onChange={handleChange}
            required
            style={styles.input}
          />
        </div>

        {/* 9. Vô hiệu hóa nút khi đang loading */}
        <button type="submit" style={styles.loginBtn} disabled={isLoading}>
          {isLoading ? "Đang xử lý..." : "Đăng nhập"}
        </button>
      </form>
    </div>
  );
  
}


// --- Giữ nguyên không thay đổi ---
const styles = {
  title: {
    textAlign: "center",
    color: "#28a745",
    marginBottom: "20px",
  },
  message: {
    textAlign: "center",
    // color: "#d9534f", // Sẽ set ở trên
    fontWeight: "bold",
    marginBottom: "15px",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "15px",
  },
  formGroup: {
    display: "flex",
    flexDirection: "column",
  },
  label: {
    fontWeight: "bold",
    marginBottom: "5px",
    color: "#444",
  },
  input: {
    padding: "10px",
    borderRadius: "6px",
    border: "1px solid #ccc",
    fontSize: "15px",
    outline: "none",
    transition: "0.3s",
  },
  loginBtn: {
    backgroundColor: "#28a745",
    color: "white",
    border: "none",
    padding: "12px",
    borderRadius: "6px",
    cursor: "pointer",
    fontWeight: "bold",
    fontSize: "15px",
    transition: "0.3s",
  },
};