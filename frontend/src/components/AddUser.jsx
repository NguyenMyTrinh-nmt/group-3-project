import React, { useState } from "react";
import axios from "axios";

const AddUser = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const newUser = { name, email };
    axios.post("http://localhost:3000/users", newUser)
      .then(res => {
        alert("Thêm user thành công!");
        setName("");
        setEmail("");
      })
      .catch(err => console.error(err));
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Thêm User</h2>
      <input 
        type="text" 
        placeholder="Name" 
        value={name} 
        onChange={e => setName(e.target.value)} 
        required
      />
      <input 
        type="email" 
        placeholder="Email" 
        value={email} 
        onChange={e => setEmail(e.target.value)} 
        required
      />
      <button type="submit">Thêm</button>
    </form>
  );
};

export default AddUser;