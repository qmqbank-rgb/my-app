"use client";
import React from "react";
import Link from "next/link";

interface NavbarProps {
  toggleDarkMode: () => void;
}

export default function NavbarBeforeLogin({ toggleDarkMode }: NavbarProps) {
  return (
    <nav className="flex justify-between items-center p-4 bg-gray-100 dark:bg-gray-900">
      {/* ডান সাইড */}
      <div className="flex items-center space-x-4 order-last">
        <button
          onClick={toggleDarkMode}
          className="px-2 py-1 border rounded"
        >
          Light/Dark
        </button>
        <Link href="/register" className="px-2 py-1 hover:underline">
          Register
        </Link>
        <Link href="/login" className="px-2 py-1 hover:underline">
          Login
        </Link>
      </div>

      {/* বাম সাইড */}
      <div className="flex items-center space-x-4">
        <span className="font-bold text-lg">QmqBank Logo</span>
        <Link href="/" className="px-2 py-1 hover:underline">
          Home
        </Link>
        <Link href="#features" className="px-2 py-1 hover:underline">
          Features
        </Link>
        <Link href="#pricing" className="px-2 py-1 hover:underline">
          Pricing
        </Link>
      </div>
    </nav>
  );
}
