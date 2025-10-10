'use client'; // client-only layout

import React from 'react';

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <header className="bg-gray-100 p-4 flex justify-between items-center">
        {/* এখানে চাইলে লোগো বা ন্যাভ দিতে পারো */}
      </header>
      <main className="p-4">{children}</main>
    </div>
  );
}
