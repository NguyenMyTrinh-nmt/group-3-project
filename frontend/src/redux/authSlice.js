// 1. Import "api" của bạn, KHÔNG DÙNG "axios"
import api from '../api/axios'; 
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// ... (code 'initialState' của bạn ở đây) ...

// 2. Tạo Thunk ĐÃ SỬA
export const loginUser = createAsyncThunk(
    'auth/login',
    async ({ email, password }, thunkAPI) => {
        try {
            // 3. Sửa "axios.post" -> "api.post"
            // 4. Sửa path -> "/users/login" (đây là path đúng của bạn)
            const response = await api.post('/users/login', {
                email,
                password,
            });

            // 5. Sửa lại cho đúng tên token của bạn
            localStorage.setItem('accessToken', response.data.accessToken);
            localStorage.setItem('refreshToken', response.data.refreshToken);
            localStorage.setItem('role', response.data.user.role); 
            localStorage.setItem('user', JSON.stringify(response.data.user));
            
            return { 
                user: response.data.user, 
                token: response.data.accessToken 
            };
        } catch (error) {
            const message = (error.response?.data?.msg) || 'Sai email hoặc mật khẩu';
            return thunkAPI.rejectWithValue(message);
        }
    }
);

// 3. Tạo Slice
const authSlice = createSlice({
    name: 'auth',
    initialState: {
        // Lấy state ban đầu từ localStorage
        user: JSON.parse(localStorage.getItem('user')) || null,
        token: localStorage.getItem('accessToken') || null,
        isAuthenticated: localStorage.getItem('accessToken') ? true : false,
        isLoading: false,
        error: null,
    },
    
    // Reducers: Dùng cho các hành động đồng bộ (sync)
    reducers: {
        logout: (state) => {
            localStorage.removeItem('user');
            localStorage.removeItem('accessToken'); // Sửa lại cho đúng tên
            localStorage.removeItem('refreshToken');
            localStorage.removeItem('role');
            state.user = null;
            state.token = null;
            state.isAuthenticated = false;
        },
    },

    // ExtraReducers: Dùng cho các hành động bất đồng bộ (async - như Thunk)
    extraReducers: (builder) => {
        builder
            // Khi bắt đầu gọi API login
            .addCase(loginUser.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            // Khi gọi API thành công
            .addCase(loginUser.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isAuthenticated = true;
                state.user = action.payload.user;
                state.token = action.payload.token;
                state.error = null;
            })
            // Khi gọi API thất bại
            .addCase(loginUser.rejected, (state, action) => {
                state.isLoading = false;
                state.isAuthenticated = false;
                state.user = null;
                state.token = null; // Xóa token cũ nếu login thất bại
                state.error = action.payload; 
            });
    },
});

// 4. Export
export const { logout } = authSlice.actions;

// 5. DÒNG QUAN TRỌNG NHẤT GÂY LỖI
export default authSlice.reducer;
// ... (code 'authSlice' và 'extraReducers' của bạn ở đây) ...