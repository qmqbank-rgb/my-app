"use client";

import { useEffect, useState, useRef } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useRouter } from "next/navigation";
import { useUser } from "@/context/UserContext";

export default function ProfilePage() {
  const router = useRouter();
  const { user, refreshUser } = useUser();
  const [fullName, setFullName] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("");
  const [previewUrl, setPreviewUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!user) return;
    setFullName(user.user_metadata?.full_name || "");
    setAvatarUrl(user.user_metadata?.avatar_url || "");
    setPreviewUrl(user.user_metadata?.avatar_url || "");
  }, [user]);

  if (!user) {
    router.push("/login");
    return null;
  }

  // Drag & Drop handlers
  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (!e.dataTransfer.files || e.dataTransfer.files.length === 0) return;
    uploadAvatar(e.dataTransfer.files[0]);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    uploadAvatar(e.target.files[0]);
  };

  const uploadAvatar = async (file: File) => {
    setLoading(true);
    setMessage("");

    const fileExt = file.name.split(".").pop();
    const fileName = `${user.id}.${fileExt}`;
    const filePath = fileName;

    const { error: uploadError } = await supabase.storage
      .from("avatars")
      .upload(filePath, file, { upsert: true });

    if (uploadError) {
      setMessage(uploadError.message);
      setLoading(false);
      return;
    }

    const { data: publicUrlData } = supabase.storage
      .from("avatars")
      .getPublicUrl(filePath);

    setAvatarUrl(publicUrlData.publicUrl);
    setPreviewUrl(publicUrlData.publicUrl);
    setLoading(false);
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    const { error } = await supabase.auth.updateUser({
      data: { full_name: fullName, avatar_url: avatarUrl },
    });

    if (error) {
      setMessage(error.message);
    } else {
      setMessage("Profile updated successfully ✅");
      await refreshUser(); // update global context → Navbar auto-update
    }

    setLoading(false);
  };

  return (
    <div className="max-w-md mx-auto mt-20 p-6 border rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-4">Your Profile</h2>

      <form onSubmit={handleUpdate} className="flex flex-col gap-4">
        {/* Drag & Drop Avatar */}
        <div
          className="flex flex-col items-center gap-2 border-2 border-dashed border-gray-300 rounded p-4 cursor-pointer"
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onClick={() => fileInputRef.current?.click()}
        >
          <img
            src={
              previewUrl ||
              `https://ui-avatars.com/api/?name=${fullName || user.email}&background=random`
            }
            alt="avatar"
            className="w-24 h-24 rounded-full border object-cover"
          />
          <input
            type="file"
            accept="image/*"
            className="hidden"
            ref={fileInputRef}
            onChange={handleFileChange}
          />
          <p className="text-sm text-gray-500 mt-2">
            Drag & drop an image here or click to select
          </p>
        </div>

        {/* Full Name */}
        <input
          type="text"
          placeholder="Full Name"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          className="border p-2 rounded"
        />

        {/* Email (disabled) */}
        <input
          type="email"
          value={user.email}
          disabled
          className="border p-2 rounded bg-gray-100 cursor-not-allowed"
        />

        {message && <p className="text-sm text-green-600">{message}</p>}

        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 text-white p-2 rounded disabled:opacity-50"
        >
          {loading ? "Updating..." : "Update Profile"}
        </button>
      </form>
    </div>
  );
}
