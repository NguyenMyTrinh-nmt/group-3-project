import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

// 1. Component cho user thường (chỉ cần đăng nhập)
export const ProtectedRoute = () => {
    const { isAuthenticated, isLoading } = useSelector((state) => state.auth);

    // Vẫn đang kiểm tra (ví dụ khi refresh)
    if (isLoading) {
        return <div>Loading...</div>; // Hoặc 1 spinner
    }

    // Nếu đã đăng nhập, cho phép truy cập.
    // <Outlet /> sẽ render bất cứ component con nào (vd: ProfilePage)
    return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
};

// 2. Component cho Admin (phải đăng nhập VÀ là admin)
export const AdminRoute = () => {
    const { isAuthenticated, user, isLoading } = useSelector((state) => state.auth);

    if (isLoading) {
        return <div>Loading...</div>; // Hoặc 1 spinner
    }
    
    // Nếu đã đăng nhập VÀ user.role === 'admin'
    return isAuthenticated && user.role === 'admin' ? (
        <Outlet />
    ) : (
        <Navigate to="/login" replace /> // Văng về login nếu ko phải admin
    );
};