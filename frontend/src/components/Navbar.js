import React from "react";

export default function Navbar({ role }) {
  return (
    <nav>
      <a href="/">Trang chủ</a>
      {role === "admin" && <a href="/admin">Quản lý User</a>}
      {role === "moderator" && <a href="/reports">Báo cáo</a>}
      {role === "user" && <a href="/profile">Hồ sơ cá nhân</a>}
    </nav>
  );
}
