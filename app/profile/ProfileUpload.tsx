"use client";

import { useState } from "react";

export default function ProfileUpload({ user }: { user: { id: string } }) {
  const [file, setFile] = useState<File | null>(null);

  const handleUpload = async () => {
    if (!file) return;
    const formData = new FormData();
    formData.append("file", file);
    formData.append("userId", user.id);

    const res = await fetch("/api/upload-avatar", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();
    if (data.url) {
      alert("Avatar updated!");
      window.location.reload(); // Refresh Navbar
    } else {
      alert("Upload failed: " + data.error);
    }
  };

  return (
    <div className="p-4 border rounded-md">
      <h1 className="text-xl font-bold mb-2">Upload Avatar</h1>
      <input type="file" onChange={(e) => setFile(e.target.files?.[0] || null)} />
      <button
        onClick={handleUpload}
        className="ml-2 px-4 py-2 bg-blue-600 text-white rounded"
      >
        Upload
      </button>
    </div>
  );
}
