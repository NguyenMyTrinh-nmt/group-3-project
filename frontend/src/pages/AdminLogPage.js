import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux'; // 1. Import hook để lấy state
import api from '../api/axios'; // 2. File api của bạn (sửa lại nếu sai đường dẫn)

const AdminLogPage = () => {
    const [logs, setLogs] = useState([]);
    const [loading, setLoading] = useState(true);

    // 3. Lấy token từ Redux state
    const { token } = useSelector((state) => state.auth);

    useEffect(() => {
        const fetchLogs = async () => {
            if (!token) return; // Không gọi API nếu không có token

            try {
                // 4. GỬI TOKEN TRONG HEADER
                // Nhờ có proxy, '/api/logs' sẽ tự động trỏ đến 'localhost:5000/api/logs'
                const res = await api.get('/api/logs', {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                
                setLogs(res.data);
            } catch (err) {
                console.error('Không thể tải logs:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchLogs();
    }, [token]); // 5. Phải có [token] ở đây

    if (loading) {
        return <div>Đang tải dữ liệu...</div>;
    }

    return (
        <div style={{ padding: '20px' }}> {/* Tạm style */}
            <h2>Nhật ký hoạt động người dùng</h2>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                    <tr style={{ background: '#f4f4f4' }}>
                        <th style={{ border: '1px solid #ddd', padding: '8px' }}>Người dùng (Email)</th>
                        <th style={{ border: '1px solid #ddd', padding: '8px' }}>Hành động</th>
                        <th style={{ border: '1px solid #ddd', padding: '8px' }}>Thời gian</th>
                    </tr>
                </thead>
                <tbody>
                    {logs.map((log) => (
                        <tr key={log._id}>
                            <td style={{ border: '1px solid #ddd', padding: '8px' }}>
                                {log.userId ? log.userId.email : 'Không rõ'}
                            </td>
                            <td style={{ border: '1px solid #ddd', padding: '8px' }}>{log.action}</td>
                            <td style={{ border: '1px solid #ddd', padding: '8px' }}>
                                {new Date(log.timestamp).toLocaleString('vi-VN')}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default AdminLogPage;