'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabaseClient';
import Input from '@/components/Input';
import SubmitButton from '@/components/SubmitButton';

/**
 * 🔹 Wrapper Component — Suspense-safe version
 * Reason: useSearchParams() must be used inside a Suspense boundary.
 */
function ResetPasswordForm() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const accessToken = searchParams.get('access_token');

  const [password, setPassword] = useState('');
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!accessToken) setError('Invalid or expired reset link.');
  }, [accessToken]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!accessToken) return;

    setLoading(true);
    setMessage(null);
    setError(null);

    try {
      const { error: updateError } = await supabase.auth.updateUser({ password });

      if (updateError) throw updateError;

      setMessage('✅ Password updated successfully! Redirecting to login...');
      setTimeout(() => router.push('/login'), 2000);
    } catch (err: unknown) {
      if (err instanceof Error) setError(err.message);
      else setError('Failed to update password.');
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

/**
 * 🔹 Export Default — wrapped in Suspense
 * Prevents “missing suspense with CSR bailout” build error
 */
export default function ResetPasswordPage() {
  return (
    <Suspense fallback={<div className="text-center mt-20 text-gray-500">Loading...</div>}>
      <ResetPasswordForm />
    </Suspense>
  );
}
