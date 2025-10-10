import React, { useState } from "react";
import UploadAvatar from "../components/UploadAvatar";

export default function Profile() {
  const [avatar, setAvatar] = useState(null);

  const handleUpload = (file) => {
    setAvatar(URL.createObjectURL(file)); // hiển thị preview
    // TODO: upload file lên backend nếu muốn lưu vĩnh viễn
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold">Profile</h2>
      <UploadAvatar onUpload={handleUpload} />
      {avatar && (
        <img
          src={avatar}
          alt="avatar"
          className="w-32 h-32 rounded-full mt-4"
        />
      )}
    </div>
  );
}