'use client';

import Link from 'next/link';
import { useEffect } from 'react';

export default function NotFound() {
  useEffect(() => {
    document.title = '404 - Page Not Found';
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-900 text-center px-6">
      <h1 className="text-6xl font-extrabold text-gray-900 dark:text-white mb-4">
        404
      </h1>
      <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
        Oops! The page you’re looking for doesn’t exist or has been moved.
      </p>

      <Link
        href="/"
        className="inline-block bg-emerald-600 hover:bg-emerald-700 text-white font-medium py-2 px-6 rounded-full transition-all duration-200"
      >
        Go Back Home
      </Link>

      <p className="mt-10 text-sm text-gray-400 dark:text-gray-500">
        Need help? Contact support or try searching again.
      </p>
    </div>
  );
}
