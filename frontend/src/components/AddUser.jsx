import { useState } from "react";
import axios from "axios";

export default function AddUser({ onAdd }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState({}); // Lưu lỗi validation

  const handleSubmit = async (e) => {
    e.preventDefault();

    let validationErrors = {};

    // Kiểm tra name
    if (!name.trim()) {
      validationErrors.name = "Name không được để trống";
    }

    // Kiểm tra email
    if (!email.trim()) {
      validationErrors.email = "Email không được để trống";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      validationErrors.email = "Email không hợp lệ";
    }

    // Nếu có lỗi, set state errors và dừng submit
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      await axios.post("http://localhost:5000/users", { name, email });
      onAdd(); // refresh danh sách user
      setName("");
      setEmail("");
      setErrors({});
    } catch (err) {
      console.error("Lỗi khi thêm user:", err);
      setErrors({ submit: "Thêm user thất bại. Kiểm tra console." });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <input
          type="text"
          placeholder="Tên"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        {errors.name && <p style={{ color: "red" }}>{errors.name}</p>}
      </div>

      <div>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        {errors.email && <p style={{ color: "red" }}>{errors.email}</p>}
      </div>

      <button type="submit">Thêm User</button>

      {errors.submit && <p style={{ color: "red" }}>{errors.submit}</p>}
    </form>
  );
}