"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { Moon, Sun, Menu, X } from "lucide-react";

export default function Navbar() {
  const [darkMode, setDarkMode] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  // Dark mode toggle
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  // Active link helper
  const linkClass = (href: string) =>
    pathname === href
      ? "border-b-2 border-yellow-300 text-yellow-300 pb-1"
      : "hover:text-yellow-200";

  return (
    <nav className="bg-gradient-to-r from-blue-600 to-purple-600 dark:from-gray-800 dark:to-gray-900 shadow-md px-4 py-3">
      <div className="max-w-7xl mx-auto flex items-center justify-between">

        {/* Left: Logo + Home + Questions */}
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
          <div className="hidden md:flex items-center space-x-6 text-lg font-semibold text-white">
            <Link href="/" className={linkClass("/")}>Home</Link>
            <Link href="/questions" className={linkClass("/questions")}>Questions</Link>
          </div>
        </div>

        {/* Right: Contact + About + Dark Mode */}
        <div className="flex items-center space-x-4">
          <div className="hidden md:flex items-center space-x-6 text-lg font-semibold text-white">
            <Link href="/contact" className={linkClass("/contact")}>Contact</Link>
            <Link href="/about" className={linkClass("/about")}>About</Link>
          </div>

          {/* Dark Mode button */}
          <button
            onClick={() => setDarkMode(!darkMode)}
            className={`flex items-center space-x-2 px-4 py-2 rounded-full transition-all duration-300 shadow-lg
              ${darkMode 
                ? "bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600" 
                : "bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
              } text-white font-medium text-sm`}
          >
            {darkMode ? (
              <>
                <Sun size={20} className="drop-shadow" />
                <span>Light Mode</span>
              </>
            ) : (
              <>
                <Moon size={20} className="drop-shadow" />
                <span>Dark Mode</span>
              </>
            )}
          </button>

          {/* Hamburger menu button */}
          <button
            className="md:hidden text-white"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden mt-2 flex flex-col space-y-2 text-lg font-semibold text-white px-2">
          <Link href="/" className={linkClass("/")}>Home</Link>
          <Link href="/questions" className={linkClass("/questions")}>Questions</Link>
          <Link href="/contact" className={linkClass("/contact")}>Contact</Link>
          <Link href="/about" className={linkClass("/about")}>About</Link>
        </div>
      )}
    </nav>
  );
}
