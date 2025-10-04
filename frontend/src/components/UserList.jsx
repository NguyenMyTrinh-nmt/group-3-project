import React, { useEffect, useState } from "react";
import axios from "axios";

export default function UserList() {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({ name: "" });
  const [editingUser, setEditingUser] = useState(null);

  // Lấy danh sách user từ backend
  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    const res = await axios.get("http://localhost:5000/users");
    setUsers(res.data);
  };

  // Tạo user mới
  const handleAdd = async (e) => {
    e.preventDefault();
    if (!newUser.name) return alert("Nhập tên trước đã!");
    await axios.post("http://localhost:5000/users", newUser);
    setNewUser({ name: "" });
    fetchUsers();
  };

  // Xóa user
  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:5000/users/${id}`);
    setUsers(users.filter((u) => u.id !== id));
  };

  // Khi bấm nút "Sửa" → hiển thị form sửa
  const handleEdit = (user) => {
    setEditingUser(user);
  };

  // Gửi request PUT để cập nhật user
  const handleUpdate = async (e) => {
    e.preventDefault();
    await axios.put(`http://localhost:5000/users/${editingUser.id}`, editingUser);
    setEditingUser(null);
    fetchUsers();
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Danh sách User</h2>

      {/* Form thêm user */}
      <form onSubmit={handleAdd}>
        <input
          type="text"
          placeholder="Nhập tên..."
          value={newUser.name}
          onChange={(e) => setNewUser({ name: e.target.value })}
        />
        <button type="submit">Thêm</button>
      </form>

      {/* Nếu đang sửa thì hiển thị form sửa */}
      {editingUser && (
        <form onSubmit={handleUpdate}>
          <h3>Sửa user</h3>
          <input
            type="text"
            value={editingUser.name}
            onChange={(e) =>
              setEditingUser({ ...editingUser, name: e.target.value })
            }
          />
          <button type="submit">Lưu</button>
          <button type="button" onClick={() => setEditingUser(null)}>
            Hủy
          </button>
        </form>
      )}

      {/* Danh sách user */}
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            {user.name}{" "}
            <button onClick={() => handleEdit(user)}>Sửa</button>{" "}
            <button onClick={() => handleDelete(user.id)}>Xóa</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
