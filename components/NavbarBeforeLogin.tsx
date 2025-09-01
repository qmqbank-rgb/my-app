"use client";
import React from "react";

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
        <a href="/register" className="px-2 py-1 hover:underline">
          Register
        </a>
        <a href="/login" className="px-2 py-1 hover:underline">
          Login
        </a>
      </div>

      {/* বাম সাইড */}
      <div className="flex items-center space-x-4">
        <span className="font-bold text-lg">QmqBank Logo</span>
        <a href="/" className="px-2 py-1 hover:underline">
          Home
        </a>
        <a href="#features" className="px-2 py-1 hover:underline">
          Features
        </a>
        <a href="#pricing" className="px-2 py-1 hover:underline">
          Pricing
        </a>
      </div>
    </nav>
  );
}
