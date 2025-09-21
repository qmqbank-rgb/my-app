"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { supabase } from "@/lib/supabaseClient";

interface User {
  id: string;
  email: string;
  name?: string | null;
  avatar_url?: string | null;
}

export default function DashboardPage() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      const { data, error } = await supabase.auth.getSession();
      if (error) {
        console.error("Supabase session error:", error.message);
        setLoading(false);
        return;
      }

      const sessionUser = data.session?.user;
      if (sessionUser) {
        setUser({
          id: sessionUser.id,
          email: sessionUser.email ?? "",
          name: sessionUser.user_metadata?.name ?? null,
          avatar_url: sessionUser.user_metadata?.avatar_url ?? null,
        });
      }
      setLoading(false);
    };

    fetchUser();

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        setUser({
          id: session.user.id,
          email: session.user.email ?? "",
          name: session.user.user_metadata?.name ?? null,
          avatar_url: session.user.user_metadata?.avatar_url ?? null,
        });
      } else {
        setUser(null);
      }
    });

    return () => {
      listener?.subscription.unsubscribe();
    };
  }, []);

  if (loading) return <p className="p-4">Loading...</p>;
  if (!user) return <p className="p-4">You must be logged in to view this page.</p>;

  return (
    <div className="min-h-screen p-6 bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <h1 className="text-3xl font-bold mb-4">Welcome, {user.name ?? user.email}</h1>
      {user.avatar_url && (
        <Image
          src={user.avatar_url}
          alt="Avatar"
          width={96}
          height={96}
          className="rounded-full mb-4"
        />
      )}
      <p>User ID: {user.id}</p>
      <p>Email: {user.email}</p>
    </div>
  );
}
