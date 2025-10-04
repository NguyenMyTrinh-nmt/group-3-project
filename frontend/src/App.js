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

  return (
    <div className="App">
      <h1>Quản lý User</h1>
      <AddUser onAdd={fetchUsers} />
      <UserList users={users} />
    </div>
  );
}

export default App;