'use client';

import { useState } from 'react';
import Image from 'next/image';

interface User {
  id: string;
  email?: string | null;
  user_metadata?: {
    full_name?: string | null;
    [key: string]: any;
  };
}

interface ProfileFormProps {
  user: User;
}

interface ProfileFormValues {
  username: string;
  email: string;
  avatarUrl: string; // string, never undefined
}

export default function ProfileForm({ user }: ProfileFormProps) {
  const [values, setValues] = useState<ProfileFormValues>({
    username: user.user_metadata?.full_name || '',
    email: user.email || '',
    avatarUrl: '/default.png', // default value
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setValues(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Submitted values:', values);
    // এখানে আপনার submit logic লিখতে পারেন
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto p-6 bg-white dark:bg-gray-800 rounded-xl shadow space-y-4"
    >
      <h2 className="text-2xl font-bold">Update Profile</h2>

      {/* Avatar */}
      <div className="flex flex-col items-center">
        <Image
          src={values.avatarUrl || '/default.png'} // fallback নিশ্চিত
          alt="Avatar"
          width={100}
          height={100}
          className="rounded-full object-cover"
        />
      </div>

      {/* Username */}
      <div className="flex flex-col">
        <label
          htmlFor="username"
          className="mb-1 font-medium text-gray-700 dark:text-gray-300"
        >
          Username
        </label>
        <input
          type="text"
          id="username"
          name="username"
          value={values.username}
          onChange={handleChange}
          className="p-2 border rounded dark:bg-gray-700 dark:text-white"
        />
      </div>

      {/* Email */}
      <div className="flex flex-col">
        <label
          htmlFor="email"
          className="mb-1 font-medium text-gray-700 dark:text-gray-300"
        >
          Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={values.email}
          onChange={handleChange}
          className="p-2 border rounded dark:bg-gray-700 dark:text-white"
        />
      </div>

      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition-colors"
      >
        Save Changes
      </button>
    </form>
  );
}
