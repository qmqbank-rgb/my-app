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
  const avatarUrl = user.user_metadata?.avatar_url || '/default.png'; // readonly for now

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Call API to update user profile
    console.log({ username, email, avatarUrl });
    alert('Profile updated successfully!');
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto p-6 bg-white dark:bg-gray-800 rounded-xl shadow space-y-4"
    >
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Update Profile</h2>

      <div className="flex justify-center">
        <Image
          src={avatarUrl}
          alt="Avatar"
          width={100}
          height={100}
          className="rounded-full border-2 border-gray-300 dark:border-gray-600"
        />
      </div>

      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Full Name"
        className="w-full px-4 py-2 border rounded-lg bg-gray-100 dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-500"
      />

      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        className="w-full px-4 py-2 border rounded-lg bg-gray-100 dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-500"
      />

      <button
        type="submit"
        className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg font-semibold transition"
      >
        Save Changes
      </button>
    </form>
  );
}
