'use client';

import { useState } from 'react';
import Image from 'next/image';

interface User {
  id: string;
  email?: string | null;
  user_metadata?: {
    full_name?: string | null;
    avatar_url?: string | null;
  };
}

interface ProfileFormProps {
  user: User;
}

export default function ProfileForm({ user }: ProfileFormProps) {
  const [username, setUsername] = useState(user.user_metadata?.full_name || '');
  const [email, setEmail] = useState(user.email || '');
  const [avatarUrl, setAvatarUrl] = useState(user.user_metadata?.avatar_url || '/default.png');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({ username, email, avatarUrl });
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-6 bg-white dark:bg-gray-800 rounded-xl shadow space-y-4">
      <h2 className="text-2xl font-bold">Update Profile</h2>
      <div className="flex justify-center">
        <Image src={avatarUrl} alt="Avatar" width={100} height={100} className="rounded-full" />
      </div>
      <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username" />
      <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
      <button type="submit" className="bg-blue-600 text-white p-2 rounded">Save Changes</button>
    </form>
  );
}
