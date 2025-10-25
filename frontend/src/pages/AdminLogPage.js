import { useEffect, useState } from "react"; 
import React from "react";
import { useSelector } from "react-redux";
import { useAuth } from "../auth/useAuth";
import api from "../api/axios";

const AdminLogPage = () => {
    const { user, loading: authLoading } = useAuth();
    const { token } = useSelector((state) => state.auth);
    const [logs, setLogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        let isMounted = true;

        const fetchLogs = async () => {
            if (!token) {
                if (isMounted) {
                    setLoading(false);
                }
                return;
            }

            try {
                const response = await api.get("/api/logs", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (isMounted) {
                    setLogs(response.data || []);
                    setError(null);
                }
            } catch (err) {
                if (isMounted) {
                    setError("Không thể tải danh sách nhật ký.");
                }
            } finally {
                if (isMounted) {
                    setLoading(false);
                }
            }
        };

        if (user && user.role === "admin") {
            fetchLogs();
        } else if (!authLoading) {
            setLoading(false);
        }

        return () => {
            isMounted = false;
        };
    }, [token, user, authLoading]);

    if (authLoading) {
        return <div>Đang kiểm tra quyền truy cập...</div>;
    }

    if (!user || user.role !== "admin") {
        return <div>Bạn không có quyền truy cập trang này.</div>;
    }

    if (loading) {
        return <div>Đang tải dữ liệu...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div style={{ padding: "20px" }}>
            <h2>Nhật ký hoạt động người dùng</h2>
            {logs.length === 0 ? (
                <p>Hiện chưa có nhật ký nào.</p>
            ) : (
                <table style={{ width: "100%", borderCollapse: "collapse" }}>
                    <thead>
                        <tr style={{ background: "#f4f4f4" }}>
                            <th style={{ border: "1px solid #ddd", padding: "8px" }}>
                                Người dùng (Email)
                            </th>
                            <th style={{ border: "1px solid #ddd", padding: "8px" }}>
                                Hành động
                            </th>
                            <th style={{ border: "1px solid #ddd", padding: "8px" }}>
                                Thời gian
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {logs.map((log) => (
                            <tr key={log._id}>
                                <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                                    {log.userId ? log.userId.email : "Không rõ"}
                                </td>
                                <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                                    {log.action}
                                </td>
                                <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                                    {log.timestamp
                                        ? new Date(log.timestamp).toLocaleString("vi-VN")
                                        : "Không rõ"}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default AdminLogPage;
