import React, { useEffect, useState } from "react";
import axios from "axios";

export default function AdminLogs() {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    axios.get("/api/logs/all")
      .then(res => setLogs(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">Nhật ký hoạt động người dùng</h2>
      <table className="w-full border text-left">
        <thead>
          <tr className="bg-gray-200">
            <th className="px-3 py-2">Email</th>
            <th className="px-3 py-2">Tên</th>
            <th className="px-3 py-2">Hành động</th>
            <th className="px-3 py-2">Thời gian</th>
            <th className="px-3 py-2">IP</th>
          </tr>
        </thead>
        <tbody>
          {logs.map(log => (
            <tr key={log._id} className="border-b">
              <td className="px-3 py-2">{log.userId?.email || "Ẩn"}</td>
              <td className="px-3 py-2">{log.userId?.name || "Ẩn"}</td>
              <td className="px-3 py-2">{log.action}</td>
              <td className="px-3 py-2">{new Date(log.timestamp).toLocaleString('vi-VN')}</td>
              <td className="px-3 py-2">{log.ip || "Ẩn"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
