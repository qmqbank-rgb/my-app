'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { supabase } from '@/lib/supabaseClient';
import Input from '@/components/Input';
import SubmitButton from '@/components/SubmitButton';
import Link from 'next/link';

interface AuthCardProps {
  mode: 'login' | 'register';
  onError?: (msg: string) => void;
}

export default function AuthCard({ mode, onError }: AuthCardProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get('redirectedFrom') || '/dashboard';

  useEffect(() => {
    setError(null);
    setSuccess(null);
  }, [mode]);

  const handleError = (msg: string) => {
    setError(msg);
    if (onError) onError(msg);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      if (mode === 'register') {
        const { error: signUpError } = await supabase.auth.signUp({
          email,
          password,
          options: { data: { full_name: fullName } },
        });

        if (signUpError) {
          if (signUpError.message.includes('already registered')) {
            throw new Error('Email is already registered');
          }
          throw new Error(signUpError.message || 'Failed to create account');
        }

        setSuccess(
          'Account created! Please check your email to confirm your account before logging in.'
        );
      } else {
        const { error: signInError } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (signInError) {
          if (signInError.message.includes('Invalid login credentials')) {
            throw new Error('Invalid email or password');
          }
          if (signInError.message.includes('Email not confirmed')) {
            throw new Error(
              'Email not confirmed. Please check your inbox for the confirmation link.'
            );
          }
          throw new Error(signInError.message || 'Login failed');
        }

        setSuccess('Login successful!');
        router.push(redirectTo);
      }
    } catch (err: unknown) {
      handleError(err instanceof Error ? err.message : 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const { error: oauthError } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: { redirectTo: process.env.NEXT_PUBLIC_SUPABASE_REDIRECT_URI || redirectTo },
      });
      if (oauthError) throw oauthError;
    } catch (err: unknown) {
      handleError(err instanceof Error ? err.message : 'Google sign-in failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen grid place-items-center bg-gradient-to-br from-gray-50 to-gray-200 dark:from-gray-950 dark:to-black p-6">
      <div className="w-full max-w-md p-8 rounded-3xl bg-white/95 dark:bg-gray-800/95 shadow-2xl backdrop-blur-md">
        <h1 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white text-center">
          {mode === 'register' ? 'Create an account' : 'Welcome back'}
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          {mode === 'register' && (
            <Input
              label="Full Name"
              type="text"
              placeholder="John Doe"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
              className="bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-300"
            />
          )}

          <Input
            label="Email"
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-300"
          />

          <Input
            label="Password"
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-300"
          />

          {mode === 'login' && (
            <div className="mt-2 text-right text-sm text-gray-700 dark:text-gray-300">
              <Link
                href="/forgot-password"
                className="font-semibold underline hover:text-gray-900 dark:hover:text-white"
              >
                Forgot password?
              </Link>
            </div>
          )}

          {error && (
            <div className="rounded-xl border border-red-200 bg-red-50 dark:bg-red-800/50 dark:border-red-700 px-4 py-3 text-sm text-red-700 dark:text-red-200">
              {error}
            </div>
          )}

          {success && (
            <div className="rounded-xl border border-emerald-200 bg-emerald-50 dark:bg-emerald-800/50 dark:border-emerald-700 px-4 py-3 text-sm text-emerald-700 dark:text-emerald-200">
              {success}
            </div>
          )}

          <SubmitButton loading={loading}>
            {mode === 'register' ? 'Create account' : 'Sign in'}
          </SubmitButton>
        </form>

        <div className="mt-6 text-center text-sm text-gray-700 dark:text-gray-300">
          {mode === 'register' ? (
            <span>
              Already have an account?{' '}
              <Link href="/login" className="font-semibold underline">
                Sign in
              </Link>
            </span>
          ) : (
            <span>
              New here?{' '}
              <Link href="/register" className="font-semibold underline">
                Create an account
              </Link>
            </span>
          )}
        </div>

        <div className="mt-4 text-center">
          <button
            type="button"
            onClick={handleGoogleSignIn}
            className="w-full rounded-2xl border border-gray-300 bg-white dark:bg-gray-700 px-4 py-3 font-semibold text-gray-900 dark:text-white shadow-sm hover:bg-gray-50 dark:hover:bg-gray-600 transition"
          >
            Continue with Google
          </button>
        </div>

        <p className="mt-4 text-center text-xs text-gray-500 dark:text-gray-300">
          By continuing you agree to our Terms & Privacy.
        </p>
      </div>
    </div>
  );
}
