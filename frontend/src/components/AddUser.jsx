import { useState } from "react";
import axios from "axios";

export default function AddUser({ onAdd }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newUser = { name, email };

    try {
  const res = await axios.post("http://localhost:5000/users", newUser);
  console.log("Thêm user thành công:", res.data); // log kết quả trả về
  onAdd(res.data); 
  setName("");
  setEmail("");
} catch (err) {
  console.error("Lỗi khi thêm user:", err);
}
  };

  return (
    <form onSubmit={handleSubmit}>
      <input 
        type="text"
        placeholder="Tên"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <input 
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <button type="submit">Thêm User</button>
    </form>
  );
}