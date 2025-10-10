'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import Input from '@/components/Input';
import SubmitButton from '@/components/SubmitButton';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setMessage(null);

    try {
      const redirectTo =
        process.env.NEXT_PUBLIC_SUPABASE_RESET_PASSWORD_REDIRECT ||
        `${window.location.origin}/auth/reset-password`;

      const { error: resetError } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo,
      });

      if (resetError) throw resetError;

      setMessage('Password reset email sent. Check your inbox.');
    } catch (err: any) {
      setError(err.message || 'Failed to send reset email.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen grid place-items-center bg-gray-50 dark:bg-gray-900 p-6">
      <div className="w-full max-w-md bg-white dark:bg-gray-800 p-8 rounded-2xl shadow">
        <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">Forgot Password</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          {error && <div className="text-sm text-red-600 dark:text-red-400">{error}</div>}
          {message && <div className="text-sm text-emerald-600 dark:text-emerald-400">{message}</div>}
          <SubmitButton loading={loading}>Send Reset Email</SubmitButton>
        </form>
      </div>
    </div>
  );
}
