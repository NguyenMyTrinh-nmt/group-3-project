import React from 'react';
import AdminLogs from '../components/AdminLogs';
import { useAuth } from '../auth/useAuth';

const AdminLogPage = () => {
  const { user } = useAuth();
  // Nếu chưa đăng nhập hoặc không phải admin thì không cho xem
  if (!user || user.role !== 'admin') {
    return <div>Bạn không có quyền truy cập trang này.</div>;
  }
  return (
    <div>
      <h2>Nhật ký hoạt động người dùng</h2>
      <AdminLogs />
    </div>
  );
};

export default AdminLogPage;