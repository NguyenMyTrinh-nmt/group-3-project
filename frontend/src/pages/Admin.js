import { useEffect, useState } from "react";
import axios from "axios";

import { useNavigate } from "react-router-dom";

export default function Admin() {
  const [users, setUsers] = useState([]);
  const [message, setMessage] = useState("");
    const navigate = useNavigate();

  // 🧭 Lấy danh sách user
  useEffect(() => {
    const token = localStorage.getItem("token");
      const role = localStorage.getItem("role");
    if (role !== "admin") {
      navigate("/"); // quay lại nếu không phải admin
    }
    
    axios
      .get("http://localhost:5000/users", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setUsers(res.data))
      .catch(() => setMessage("❌ Không có quyền truy cập hoặc lỗi server"));

  }, [navigate]);
  

  // 🗑️ Xóa user
  const handleDelete = (id) => {
    const token = localStorage.getItem("token");
    axios
      .delete(`http://localhost:5000/users/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(() => {
        setUsers(users.filter((user) => user._id !== id));
        setMessage("✅ Đã xóa user thành công");
      })
      .catch(() => setMessage("⚠️ Không thể xóa user"));
  };

  return (
    <div>
      <h2 style={styles.title}>👑 Quản lý người dùng (Admin)</h2>
      {message && <p style={styles.message}>{message}</p>}
      <table style={styles.table}>
        <thead>
          <tr>
            <th>Tên</th>
            <th>Email</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>
                <button
                  onClick={() => handleDelete(user._id)}
                  style={styles.deleteBtn}
                >
                  Xóa
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const styles = {
  title: {
    textAlign: "center",
    color: "#28a745",
    marginBottom: "15px",
  },
  message: {
    textAlign: "center",
    color: "#d9534f",
    fontWeight: "bold",
    marginBottom: "10px",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    boxShadow: "0 2px 10px rgba(0,0,0,0.05)",
  },
  deleteBtn: {
    backgroundColor: "#dc3545",
    color: "white",
    border: "none",
    padding: "5px 10px",
    borderRadius: "5px",
    cursor: "pointer",
    fontWeight: "bold",
  },
};