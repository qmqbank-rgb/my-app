'use client';

import React, { ButtonHTMLAttributes, ReactNode } from 'react';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  loading?: boolean;
  children: ReactNode;
  type?: 'button' | 'submit' | 'reset';
}

export default function SubmitButton({ loading = false, children, type = 'submit', ...rest }: Props) {
  return (
    <button
      type={type}
      disabled={loading}
      {...rest}
      className={`w-full py-3 px-4 rounded-xl font-semibold shadow-lg transition
        text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-60
        dark:bg-gray-100 dark:text-gray-900 dark:hover:opacity-95`}
    >
      {loading ? 'Processing…' : children}
    </button>
  );
}
