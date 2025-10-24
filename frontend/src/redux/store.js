import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';

export const store = configureStore({
    reducer: {
        // Đây là nơi kết hợp tất cả các slice của bạn
        auth: authReducer, 
        // (Sau này có thể thêm post: postReducer, ...)
    },
});