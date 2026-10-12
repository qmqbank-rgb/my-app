```tsx
'use client';

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabaseClient';
import Input from '@/components/Input';
import SubmitButton from '@/components/SubmitButton';

function ResetPasswordForm() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [ready, setReady] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;

    async function verifyResetLink() {
      try {
        // Supabase PKCE flow: email link may contain ?code=...
        const code = searchParams.get('code');

        if (code) {
          const { error: exchangeError } =
            await supabase.auth.exchangeCodeForSession(code);

          if (exchangeError) throw exchangeError;
        }

        // Check whether a valid recovery session exists.
        const { data, error: sessionError } =
          await supabase.auth.getSession();

        if (sessionError) throw sessionError;

        if (!data.session) {
          throw new Error(
            'Reset link is invalid or expired. Please request a new password reset email.'
          );
        }

        if (active) setReady(true);
      } catch (err: unknown) {
        if (active) {
          setError(
            err instanceof Error
              ? err.message
              : 'Unable to verify the reset link.'
          );
        }
      }
    }

    verifyResetLink();

    return () => {
      active = false;
    };
  }, [searchParams]);

  async function handleSubmit(
    e: React.FormEvent<HTMLFormElement>
  ) {
    e.preventDefault();
    setError(null);
    setMessage(null);

    if (password.length < 8) {
      setError('Password must be at least 8 characters long.');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    setLoading(true);

    try {
      const { data: sessionData, error: sessionError } =
        await supabase.auth.getSession();

      if (sessionError) throw sessionError;

      if (!sessionData.session) {
        throw new Error(
          'Your reset session has expired. Please request a new reset email.'
        );
      }

      const { error: updateError } =
        await supabase.auth.updateUser({ password });

      if (updateError) throw updateError;

      setMessage(
        'Password updated successfully. Please log in with your new password.'
      );

      await supabase.auth.signOut();

      setTimeout(() => router.replace('/login'), 2000);
    } catch (err: unknown) {
      setError(
        err instanceof Error
          ? err.message
          : 'Failed to update password.'
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 p-4">
      <div className="w-full max-w-md rounded-2xl bg-white dark:bg-gray-800 shadow p-8">
        <h1 className="text-2xl font-bold mb-6 text-center text-gray-900 dark:text-white">
          Set a New Password
        </h1>

        {error && (
          <p className="mb-4 text-center text-sm text-red-600 dark:text-red-400">
            {error}
          </p>
        )}

        {message ? (
          <p className="text-center text-green-600 dark:text-green-400">
            {message}
          </p>
        ) : !ready ? (
          <p className="text-center text-gray-600 dark:text-gray-300">
            {error
              ? 'Please request a new reset link.'
              : 'Verifying your reset link...'}
          </p>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              label="New Password"
              type="password"
              placeholder="Enter new password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <Input
              label="Confirm New Password"
              type="password"
              placeholder="Enter password again"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />

            <SubmitButton loading={loading}>
              Update Password
            </SubmitButton>
          </form>
        )}
      </div>
    </div>
  );
}

export default function ResetPasswordPage() {
  return (
    <Suspense
      fallback={
        <div className="mt-20 text-center text-gray-500">
          Loading...
        </div>
      }
    >
      <ResetPasswordForm />
    </Suspense>
  );
}
```
