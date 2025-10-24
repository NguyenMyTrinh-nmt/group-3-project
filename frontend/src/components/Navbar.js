import { Link } from "react-router-dom";

export default function Navbar({ role = "guest" }) {
  return (
    <nav>
      <Link to="/">Trang chủ</Link>
      {role === "admin" && <Link to="/admin">Quản lý User</Link>}
      {role === "moderator" && <Link to="/reports">Báo cáo</Link>}
      {role === "user" && <Link to="/profile">Hồ sơ cá nhân</Link>}
    </nav>
  );
}
