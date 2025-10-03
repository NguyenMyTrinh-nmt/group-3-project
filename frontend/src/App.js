import { useState, useEffect } from "react";
import axios from "axios";
import UserList from "./components/UserList";
import AddUser from "./components/AddUser";

function App() {
  const [users, setUsers] = useState([]); // Khởi tạo mảng rỗng, không undefined

  // Lấy danh sách user từ backend
  const fetchUsers = async () => {
    try {
      const res = await axios.get("http://localhost:5000/users");
      setUsers(res.data || []); // fallback nếu res.data undefined
    } catch (err) {
      console.error("Lỗi khi lấy danh sách user:", err);
      setUsers([]); // đảm bảo users luôn là mảng
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Hàm cập nhật state khi thêm user mới
  const handleAddUser = (newUser) => {
    setUsers((prev) => [...prev, newUser]);
  };

  return (
    <div className="App">
      <h1>Quản lý User</h1>
      <AddUser onAdd={handleAddUser} />
      <UserList users={users} />
    </div>
  );
}

export default App;