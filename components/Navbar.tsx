"use client";

import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import { Sun, Moon, Menu, X } from "lucide-react";

export default function Navbar() {
  const { data: session } = useSession();
  const [darkMode, setDarkMode] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (darkMode) document.documentElement.classList.add("dark");
    else document.documentElement.classList.remove("dark");
  }, [darkMode]);

  return (
    <nav className="flex justify-between items-center p-4 bg-gray-100 dark:bg-gray-900 shadow-md">
      <div className="flex items-center space-x-4">
        <Link href="/" className="font-bold text-xl text-gray-800 dark:text-gray-100">
          MyApp
        </Link>
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700"
        >
          {darkMode ? <Sun size={20} /> : <Moon size={20} />}
        </button>
      </div>

      <div className="hidden md:flex items-center space-x-4">
        {session ? (
          <>
            <span className="text-gray-800 dark:text-gray-200">Hi, {session.user?.name}</span>
            <button
              onClick={() => signOut()}
              className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
            >
              Logout
            </button>
          </>
        ) : (
          <button
            onClick={() => signIn("github")}
            className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Login
          </button>
        )}
      </div>

      <div className="md:hidden">
        <button onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {menuOpen && (
        <div className="absolute top-16 right-4 bg-gray-100 dark:bg-gray-900 p-4 rounded shadow-md flex flex-col space-y-2 md:hidden">
          {session ? (
            <>
              <span className="text-gray-800 dark:text-gray-200">{session.user?.name}</span>
              <button
                onClick={() => signOut()}
                className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
              >
                Logout
              </button>
            </>
          ) : (
            <button
              onClick={() => signIn("github")}
              className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Login
            </button>
          )}
        </div>
      )}
    </nav>
  );
}
