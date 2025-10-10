'use client';

import React, { useState, forwardRef, InputHTMLAttributes } from 'react';
import clsx from 'clsx';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string | null;
}

const Input = forwardRef<HTMLInputElement, InputProps>(({ label, error, className, type = 'text', ...rest }, ref) => {
  const [show, setShow] = useState(false);
  const isPassword = type === 'password';

  return (
    <div className="w-full space-y-1">
      {label && <label className="text-sm font-medium text-gray-700 dark:text-gray-200">{label}</label>}
      <div className={clsx('relative', className)}>
        <input
          ref={ref}
          type={isPassword ? (show ? 'text' : 'password') : type}
          {...rest}
          className={clsx(
            'w-full rounded-2xl border bg-white/80 px-4 py-3 text-gray-900 outline-none ring-0 transition',
            'focus:border-transparent focus:outline-none focus:ring-2 focus:ring-gray-400',
            'dark:bg-gray-900/60 dark:text-gray-100 dark:border-gray-700',
            error ? 'border-red-500 focus:ring-red-400' : 'border-gray-200',
            'pr-10' // for password toggle button spacing
          )}
        />
        {isPassword && (
          <button
            type="button"
            onClick={() => setShow(s => !s)}
            aria-label={show ? 'Hide password' : 'Show password'}
            className="absolute right-2 top-1/2 -translate-y-1/2 p-1 rounded-md"
          >
            {show ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-600 dark:text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-7 0-10-7-10-7a16.87 16.87 0 013.22-4.227M6.35 6.35A9.99 9.99 0 0112 5c7 0 10 7 10 7a16.4 16.4 0 01-1.657 2.725M3 3l18 18" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-600 dark:text-gray-300" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-1.274 4.057-5.065 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
            )}
          </button>
        )}
      </div>
      {error && <p className="mt-1 text-sm text-red-600 dark:text-red-400">{error}</p>}
    </div>
  );
});

Input.displayName = 'Input';
export default Input;
