'use client';

import { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabaseClient';
import Input from '@/components/Input';
import SubmitButton from '@/components/SubmitButton';

export default function ResetPasswordPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const accessToken = searchParams.get('access_token'); // Supabase স্বয়ংক্রিয়ভাবে handle করবে

  const [password, setPassword] = useState('');
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!accessToken) setError('Invalid or expired reset link.');
  }, [accessToken]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!accessToken) return;

    setLoading(true);
    setMessage(null);
    setError(null);

    try {
      const { error: updateError } = await supabase.auth.updateUser({
        password,
      });

      if (updateError) throw updateError;

      setMessage('Password updated successfully! Redirecting to login...');
      setTimeout(() => router.push('/login'), 2000); // 2 সেকেন্ড পর login page এ redirect
    } catch (err: any) {
      setError(err.message || 'Failed to update password.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 p-4">
      <div className="w-full max-w-md p-8 rounded-3xl bg-white dark:bg-gray-800 shadow-lg">
        <h1 className="text-2xl font-bold mb-6 text-center text-gray-900 dark:text-white">
          Set a New Password
        </h1>
        {error && <p className="text-red-600 dark:text-red-400 mb-4 text-center">{error}</p>}
        {message ? (
          <p className="text-green-600 dark:text-green-400 text-center">{message}</p>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              label="New Password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-300"
            />
            <SubmitButton loading={loading}>Update Password</SubmitButton>
          </form>
        )}
      </div>
    </div>
  );
}
