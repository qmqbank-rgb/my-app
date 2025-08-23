"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { Moon, Sun } from "lucide-react";

export default function Navbar() {
  const [darkMode, setDarkMode] = useState(false);
  const pathname = usePathname();

  // Dark mode toggle
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  // Helper: Active link style
  const linkClass = (href: string) =>
    pathname === href
      ? "border-b-2 border-yellow-300 text-yellow-300 pb-1"
      : "hover:text-yellow-200";

  return (
    <nav className="flex items-center justify-between px-6 py-4 shadow-md bg-gradient-to-r from-blue-600 to-purple-600 dark:from-gray-800 dark:to-gray-900">
      
      {/* Left side: Logo + Nav links */}
      <div className="flex items-center space-x-8">
        <Link href="/">
          <Image
            src="/qmqbank_logo.svg"
            alt="QmqBank Logo"
            width={55}
            height={55}
            priority
          />
        </Link>
        <div className="flex space-x-6 text-lg font-semibold text-white">
          <Link href="/" className={linkClass("/")}>
            Home
          </Link>
          <Link href="/questions" className={linkClass("/questions")}>
            Questions
          </Link>
        </div>
      </div>

      {/* Right side: Contact, About, Dark Mode */}
      <div className="flex items-center space-x-6 text-lg font-semibold text-white">
        <Link href="/contact" className={linkClass("/contact")}>
          Contact
        </Link>
        <Link href="/about" className={linkClass("/about")}>
          About
        </Link>
        <button
  onClick={() => setDarkMode(!darkMode)}
  className={`flex items-center space-x-2 px-5 py-2 rounded-full 
              transition-all duration-300 shadow-lg text-white
              ${darkMode 
                ? "bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600" 
                : "bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
              }`}
>
  {darkMode ? (
    <>
      <Sun size={20} className="drop-shadow" />
      <span className="text-sm font-medium">Light Mode</span>
    </>
  ) : (
    <>
      <Moon size={20} className="drop-shadow" />
      <span className="text-sm font-medium">Dark Mode</span>
    </>
  )}
</button>


      </div>
    </nav>
  );
}
