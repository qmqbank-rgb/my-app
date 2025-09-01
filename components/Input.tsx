"use client";

import { forwardRef, InputHTMLAttributes } from "react";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

const Input = forwardRef<HTMLInputElement, Props>(({ label, error, ...rest }, ref) => {
  return (
    <div className="w-full space-y-1">
      <label className="text-sm font-medium text-gray-700 dark:text-gray-200">{label}</label>
      <input
        ref={ref}
        className="w-full rounded-2xl border border-gray-200 bg-white/80 px-4 py-3 text-gray-900 outline-none ring-0 transition focus:border-transparent focus:outline-none focus:ring-2 focus:ring-gray-400 dark:bg-gray-900/60 dark:text-gray-100 dark:border-gray-700"
        {...rest}
      />
      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  );
});

Input.displayName = "Input";
export default Input;
