"use client";

import { useState } from "react";

export default function SettingsPage() {
  const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] = useState(true);

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold">⚙️ Settings</h2>

      <div className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg space-y-4">
        {/* Dark Mode */}
        <div className="flex items-center justify-between">
          <span className="font-medium text-gray-700 dark:text-gray-200">Dark Mode</span>
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="px-4 py-2 rounded-lg border dark:border-gray-600 transition"
          >
            {darkMode ? "☀️ Light" : "🌙 Dark"}
          </button>
        </div>

        {/* Notifications */}
        <div className="flex items-center justify-between">
          <span className="font-medium text-gray-700 dark:text-gray-200">Email Notifications</span>
          <button
            onClick={() => setNotifications(!notifications)}
            className={`px-4 py-2 rounded-lg border dark:border-gray-600 transition ${
              notifications ? "bg-green-500 text-white" : "bg-red-500 text-white"
            }`}
          >
            {notifications ? "Enabled" : "Disabled"}
          </button>
        </div>

        <button className="mt-4 px-4 py-2 rounded-lg bg-green-500 text-white font-semibold hover:bg-green-600 transition">
          Save Settings
        </button>
      </div>
    </div>
  );
}
