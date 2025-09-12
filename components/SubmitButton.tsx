"use client";

import { ButtonHTMLAttributes, ReactNode } from "react";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  loading?: boolean;
  children: ReactNode; // children এর type explicit করলে TypeScript আরও strict হবে
}

export default function SubmitButton({ loading = false, children, ...rest }: Props) {
  return (
    <button
      disabled={loading}
      className="w-full rounded-2xl bg-gray-900 px-4 py-3 font-semibold text-white shadow-lg transition hover:opacity-95 disabled:opacity-60 dark:bg-gray-100 dark:text-gray-900"
      {...rest}
    >
      {loading ? "Processing…" : children}
    </button>
  );
}
