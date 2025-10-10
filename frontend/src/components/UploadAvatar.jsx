import React, { useState } from "react";

export default function UploadAvatar({ onUpload }) {
  const [preview, setPreview] = useState(null);
 const [avatar, setAvatar] = useState(null); // avatar preview
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setAvatar(reader.result);
      reader.readAsDataURL(file);
      onUpload(file); // gửi file lên Profile để xử lý
    }
  };

  return (
    <div className="flex flex-col items-center">
      <input type="file" accept="image/*" onChange={handleFileChange} />
      {avatar && (
          <img
            src={avatar}
            alt="avatar"
            style={{ width: "120px", height: "120px", borderRadius: "50%", marginTop: "10px" }}
          />
        )}
    </div>
  );
}