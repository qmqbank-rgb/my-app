"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";
import {
  FiMenu,
  FiX,
  FiHome,
  FiUser,
  FiActivity,
  FiSettings,
  FiDollarSign,
} from "react-icons/fi";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/");
  };

  const menuItems = [
    { name: "Overview", href: "/dashboard", icon: <FiHome /> },
    { name: "Profile", href: "/dashboard/profile", icon: <FiUser /> },
    { name: "Transactions", href: "/dashboard/transactions", icon: <FiActivity /> },
    { name: "Settings", href: "/dashboard/settings", icon: <FiSettings /> },
  ];

  return (
    <div className={`${darkMode ? "dark" : ""}`}>
      <div className="flex h-screen bg-gray-100 dark:bg-gray-900">
        {/* Sidebar */}
        <aside
          className={`fixed inset-y-0 left-0 z-20 w-64 transform bg-white dark:bg-gray-800 p-6 shadow-lg transition-transform duration-300 md:translate-x-0 ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-2xl font-bold text-green-600 dark:text-green-400">
              QmqBank
            </h1>
            <button className="md:hidden" onClick={() => setSidebarOpen(false)}>
              <FiX size={24} />
            </button>
          </div>

          <nav className="flex flex-col gap-4">
            {menuItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="flex items-center gap-3 p-2 rounded-lg hover:bg-green-50 dark:hover:bg-gray-700 transition text-gray-700 dark:text-gray-200"
                onClick={() => setSidebarOpen(false)}
              >
                {item.icon} {item.name}
              </Link>
            ))}

            <button
              onClick={handleLogout}
              className="mt-6 rounded-lg bg-red-500 px-3 py-2 text-white hover:bg-red-600 flex items-center justify-center gap-2 transition"
            >
              Logout
            </button>
          </nav>

          <div className="mt-6">
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="w-full rounded-lg border px-3 py-2 text-sm transition"
            >
              {darkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
            </button>
          </div>
        </aside>

        {/* Overlay for mobile */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 z-10 bg-black opacity-50 md:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Main Content */}
        <div className="flex-1 flex flex-col ml-0 md:ml-64 transition-all duration-300">
          {/* Top Navbar */}
          <header className="flex items-center justify-between p-4 bg-white dark:bg-gray-800 shadow-md md:hidden">
            <button onClick={() => setSidebarOpen(true)}>
              <FiMenu size={24} />
            </button>
            <h1 className="text-xl font-bold text-green-600 dark:text-green-400">
              Dashboard
            </h1>
          </header>

          <main className="flex-1 p-6 overflow-auto">{children}</main>
        </div>
      </div>
    </div>
  );
}
