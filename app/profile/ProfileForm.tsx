'use client';

import { useState, useEffect, useRef } from 'react';
import { supabase } from '@/lib/supabaseClient';

type ProfileFormProps = {
  user: { id: string; name?: string | null; email?: string | null; image?: string | null };
};

export default function ProfileForm({ user }: ProfileFormProps) {
  const [fullName, setFullName] = useState(user.name || '');
  const [previewUrl, setPreviewUrl] = useState(user.image || null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.length) return;
    uploadAvatar(e.target.files[0]);
  };

  const uploadAvatar = async (file: File) => {
    setLoading(true);
    setMessage('');
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${user.id}.${fileExt}`;
      const { error } = await supabase.storage
        .from('avatars-private')
        .upload(fileName, file, { upsert: true });
      if (error) throw error;

      await supabase.from('profiles').update({ avatar_url: fileName }).eq('id', user.id);
      setPreviewUrl(`${fileName}?t=${Date.now()}`);
      setMessage('Avatar updated successfully ✅');
    } catch (err: any) {
      setMessage(err.message || 'Upload failed');
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async (e: React.FormEvent) => {
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

      <form onSubmit={handleUpdate} className="flex flex-col gap-4">
        <div
          className="flex flex-col items-center gap-2 border-2 border-dashed border-gray-300 rounded p-4 cursor-pointer"
          onClick={() => fileInputRef.current?.click()}
        >
          <img
            src={previewUrl || `https://ui-avatars.com/api/?name=${fullName || user.email}&background=random`}
            alt="avatar"
            className="w-24 h-24 rounded-full border object-cover"
          />
          <input type="file" accept="image/*" className="hidden" ref={fileInputRef} onChange={handleFileChange} />
          <p className="text-sm text-gray-500 mt-2">
            Click to select or drag & drop an image
          </p>
        </div>

        <input
          type="text"
          placeholder="Full Name"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          className="border p-2 rounded"
        />
        <input type="email" value={user.email || ''} disabled className="border p-2 rounded bg-gray-100 cursor-not-allowed" />

        {message && <p className="text-sm text-green-600">{message}</p>}

        <button type="submit" disabled={loading} className="bg-blue-600 text-white p-2 rounded disabled:opacity-50">
          {loading ? 'Updating...' : 'Update Profile'}
        </button>
      </form>
    </div>
  );
}
