'use client';

import { useEffect, useState, useRef } from 'react';
import { supabase } from '@/lib/supabaseClient';

interface ProfileFormProps {
  user: {
    id: string;
    name?: string | null;
    email?: string | null;
    image?: string | null;
  };
}

export default function ProfileForm({ user }: ProfileFormProps) {
  const [fullName, setFullName] = useState(user.name || '');
  const [previewUrl, setPreviewUrl] = useState(user.image || null);
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    setPreviewUrl(user.image || null);
  }, [user.image]);

  if (!user) return <p className="text-center mt-20">Loading...</p>;

  // Drag & Drop Handlers
  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (!e.dataTransfer.files || e.dataTransfer.files.length === 0) return;
    handleFile(e.dataTransfer.files[0]);
  };
  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => e.preventDefault();
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.[0]) return;
    handleFile(e.target.files[0]);
  };
  const handleFile = (file: File) => {
    setFile(file);
    setPreviewUrl(URL.createObjectURL(file));
  };

  const uploadAvatar = async () => {
    if (!file) return;
    setLoading(true);
    setMessage('');

    try {
      const ext = file.name.split('.').pop();
      const fileName = `${user.id}.${ext}`;

      // Upload to Supabase storage
      const { error: uploadError } = await supabase.storage
        .from('avatars-private')
        .upload(fileName, file, { upsert: true });
      if (uploadError) throw uploadError;

      // Update profile in Supabase
      await supabase.from('profiles').update({ avatar_url: fileName }).eq('id', user.id);

      // Cache-busting
      setPreviewUrl(`${URL.createObjectURL(file)}?t=${Date.now()}`);
      setMessage('Avatar updated successfully ✅');
    } catch (err: any) {
      setMessage(err.message || 'Upload failed');
    } finally {
      setLoading(false);
    }
  };

  const updateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      await supabase.auth.updateUser({ data: { full_name: fullName } });
      setMessage('Profile updated successfully ✅');
    } catch (err: any) {
      setMessage(err.message || 'Update failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-20 p-6 border rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-4">Your Profile</h2>

      <form onSubmit={updateProfile} className="flex flex-col gap-4">
        {/* Drag & Drop Avatar */}
        <div
          className="flex flex-col items-center gap-2 border-2 border-dashed border-gray-300 rounded p-4 cursor-pointer"
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onClick={() => fileInputRef.current?.click()}
        >
          <img
            src={previewUrl || `https://ui-avatars.com/api/?name=${fullName || user.email}&background=random`}
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

        <button
          type="button"
          onClick={uploadAvatar}
          disabled={loading || !file}
          className="bg-blue-600 text-white p-2 rounded disabled:opacity-50"
        >
          {loading ? 'Uploading...' : 'Upload Avatar'}
        </button>

        {/* Full Name */}
        <input
          type="text"
          placeholder="Full Name"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          className="border p-2 rounded"
        />

        {/* Email (read-only) */}
        <input
          type="email"
          value={user.email || ''}
          disabled
          className="border p-2 rounded bg-gray-100 cursor-not-allowed"
        />

        {message && <p className="text-sm text-green-600">{message}</p>}

        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 text-white p-2 rounded disabled:opacity-50"
        >
          {loading ? 'Updating...' : 'Update Profile'}
        </button>
      </form>
    </div>
  );
}
