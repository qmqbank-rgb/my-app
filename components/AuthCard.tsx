"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import Input from "@/components/Input";
import SubmitButton from "@/components/SubmitButton";
import Link from "next/link";

interface Props {
  mode: "login" | "register";
}

export default function AuthCard({ mode }: Props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  useEffect(() => {
    setError(null);
    setSuccess(null);
  }, [mode]);

  // Email/password login & register
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      if (mode === "register") {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: { full_name: fullName },
            emailRedirectTo: `${window.location.origin}/login`,
          },
        });
        if (error) throw error;
        setSuccess("Account created! Check your email to confirm.");
      } else {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (error) throw error;
        setSuccess("Login successful!");
      }
    } catch (err: any) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  // Google OAuth login
  const handleGoogleSignIn = async () => {
    setLoading(true);
    setError(null);
    setSuccess(null);
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: process.env.NEXT_PUBLIC_SUPABASE_REDIRECT_URI,
        },
      });
      if (error) throw error;
    } catch (err: any) {
      setError(err?.message || "Google sign-in failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[70vh] grid place-items-center bg-gradient-to-br from-gray-50 to-gray-200 dark:from-gray-950 dark:to-black py-12 px-4">
      <div className="w-full max-w-md rounded-3xl bg-white/80 p-8 shadow-2xl backdrop-blur-md dark:bg-gray-900/70">
        <h1 className="text-2xl font-bold mb-6 text-center">
          {mode === "register" ? "Create an account" : "Welcome back"}
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          {mode === "register" && (
            <Input
              label="Full Name"
              type="text"
              placeholder="John Doe"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
            />
          )}

          <Input
            label="Email"
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="email"
            required
          />

          <Input
            label="Password"
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete={mode === "login" ? "current-password" : "new-password"}
            required
          />

          {error && (
            <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              {error}
            </div>
          )}
          {success && (
            <div className="rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
              {success}
            </div>
          )}

          <SubmitButton loading={loading}>
            {mode === "register" ? "Create account" : "Sign in"}
          </SubmitButton>
        </form>

        <div className="mt-6 text-center text-sm text-gray-700 dark:text-gray-300">
          {mode === "register" ? (
            <span>
              Already have an account?{" "}
              <Link className="font-semibold underline underline-offset-4" href="/login">
                Sign in
              </Link>
            </span>
          ) : (
            <span>
              New here?{" "}
              <Link className="font-semibold underline underline-offset-4" href="/register">
                Create an account
              </Link>
            </span>
          )}
        </div>

        <div className="mt-4 text-center">
          <button
            type="button"
            onClick={handleGoogleSignIn}
            className="w-full rounded-2xl border border-gray-300 bg-white px-4 py-3 font-semibold text-gray-900 shadow-sm transition hover:bg-gray-50 dark:bg-gray-800 dark:text-gray-50 dark:border-gray-700"
          >
            Continue with Google
          </button>
        </div>

        <p className="mt-4 text-center text-xs text-gray-500 dark:text-gray-400">
          By continuing you agree to our Terms & Privacy.
        </p>
      </div>
    </div>
  );
}
