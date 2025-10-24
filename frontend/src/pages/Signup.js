import { useState } from "react";
// 1. DÙNG 'api' (từ proxy), KHÔNG DÙNG 'axios'
import api from "../api/axios"; 
import { useNavigate } from "react-router-dom"; 

export default function Signup() {
    const [form, setForm] = useState({ username: "", email: "", password: "", confirmPassword: "" });
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (form.password !== form.confirmPassword) {
            setMessage("⚠️ Mật khẩu nhập lại không khớp!");
            return;
        }

        setLoading(true);
        setMessage("");
        try {
            const { username, email, password } = form;
            
            // 2. SỬA LẠI ĐÚNG ĐƯỜNG DẪN API
            // (Backend của bạn là /users/register, không phải /signup)
           await api.post("/users/signup", { name: username, email, password }); // (Gửi "name" thay vì "username" nếu backend cần "name")
            
            setMessage("🎉 Đăng ký thành công! Đang chuyển đến trang đăng nhập...");
            setForm({ username: "", email: "", password: "", confirmPassword: "" });
            
            setTimeout(() => navigate('/login'), 1500);

        } catch (err) {
            const errMsg = err.response?.data?.msg || "⚠️ Có lỗi xảy ra!";
            setMessage(errMsg);
        } finally {
            setLoading(false);
        }
    };

    // ... (Phần return <form> ... giữ nguyên như code trước) ...
    // ... (Phần styles ... giữ nguyên như code trước) ...
    return (
        <div>
            <h2 style={styles.title}>📝 Đăng ký tài khoản</h2>

            {message && <p style={{
                ...styles.message,
                color: message.startsWith('🎉') ? 'green' : 'red' 
            }}>{message}</p>}

            <form onSubmit={handleSubmit} style={styles.form}>
                <label style={styles.label}>Tên đăng nhập</label>
                <input
                    type="text"
                    name="username" // (Nếu backend nhận 'name', đổi name="name" ở đây)
                    placeholder="Tên đăng nhập"
                    value={form.username}
                    onChange={handleChange}
                    required
                    style={styles.input}
                />

                <label style={styles.label}>Email</label>
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={form.email}
                    onChange={handleChange}
                    required
                    style={styles.input}
                />

                <label style={styles.label}>Mật khẩu</label>
                <input
                    type="password"
                    name="password"
                    placeholder="Mật khẩu"
                    value={form.password}
                    onChange={handleChange}
                    required
                    style={styles.input}
                />

                <label style={styles.label}>Nhập lại mật khẩu</label>
                <input
                    type="password"
                    name="confirmPassword"
                    placeholder="Nhập lại mật khẩu"
                    value={form.confirmPassword}
                    onChange={handleChange}
                    required
                    style={styles.input}
                />

                <button type="submit" style={styles.btn} disabled={loading}>
                    {loading ? "Đang xử lý..." : "Đăng ký"}
                </button>
            </form>
        </div>
    );
}

// ... (Giữ nguyên styles của bạn)
const styles = {
    title: { textAlign: "center", color: "#28a745", marginBottom: "15px" },
    form: { display: "flex", flexDirection: "column", gap: "10px" },
    label: {
        fontWeight: "bold",
        color: "#444",
        marginBottom: "-5px",
    },
    input: {
        padding: "10px",
        border: "1px solid #ccc",
        borderRadius: "6px",
        outline: "none",
    },
    btn: {
        backgroundColor: "#28a745",
        color: "#fff",
        padding: "10px",
        border: "none",
        borderRadius: "6px",
        cursor: "pointer",
        fontWeight: "600",
        transition: "0.3s",
    },
    message: { 
        marginTop: "10px", 
        textAlign: "center", 
        fontWeight: "bold" 
    },
};