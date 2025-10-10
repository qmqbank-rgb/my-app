'use client';

import { useState, Suspense } from 'react';
import AuthCard from '@/components/AuthCard';

export default function RegisterPage() {
  const [error, setError] = useState<string | null>(null);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 p-4">
      <Suspense fallback={<p className="text-center text-gray-700 dark:text-gray-200">Loading register form…</p>}>
        <AuthCard
          mode="register"
          onError={(msg: string) => setError(msg)}
        />
      </Suspense>

      {error && (
        <div className="absolute top-6 p-3 bg-red-100 dark:bg-red-800 text-red-700 dark:text-red-200 rounded-md shadow-md text-center max-w-sm">
          {error}
        </div>
      )}
    </div>
  );
}
