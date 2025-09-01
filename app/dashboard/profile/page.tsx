"use client";

import { useState } from "react";

export default function ProfilePage() {
  const [name, setName] = useState("John Doe");
  const [email, setEmail] = useState("john@example.com");
  const [phone, setPhone] = useState("+123456789");

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold">👤 Profile</h2>

      <div className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg space-y-4">
        <div className="flex flex-col md:flex-row gap-4">
          <label className="w-full md:w-1/3 font-medium text-gray-700 dark:text-gray-200">
            Name:
          </label>
          <input
            className="w-full p-2 rounded-lg border dark:bg-gray-700 dark:border-gray-600"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="flex flex-col md:flex-row gap-4">
          <label className="w-full md:w-1/3 font-medium text-gray-700 dark:text-gray-200">
            Email:
          </label>
          <input
            className="w-full p-2 rounded-lg border dark:bg-gray-700 dark:border-gray-600"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="flex flex-col md:flex-row gap-4">
          <label className="w-full md:w-1/3 font-medium text-gray-700 dark:text-gray-200">
            Phone:
          </label>
          <input
            className="w-full p-2 rounded-lg border dark:bg-gray-700 dark:border-gray-600"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>

        <button className="mt-4 px-4 py-2 rounded-lg bg-green-500 text-white font-semibold hover:bg-green-600 transition">
          Save Changes
        </button>
      </div>
    </div>
  );
}
