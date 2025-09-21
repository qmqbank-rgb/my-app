"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
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
  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      const { data, error } = await supabase.auth.getSession();
      if (error || !data.session?.user) {
        router.push(`/login?redirectedFrom=/dashboard`);
        return;
      }

      const sessionUser = data.session.user;
      setUser({
        id: sessionUser.id,
        email: sessionUser.email ?? "",
        name: sessionUser.user_metadata?.name ?? null,
        avatar_url: sessionUser.user_metadata?.avatar_url ?? null,
      });
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
        router.push(`/login?redirectedFrom=/dashboard`);
      }
    });

    return () => listener.subscription.unsubscribe();
  }, [router]);

  if (loading) return <p className="p-4 text-center">Loading...</p>;
  if (!user) return null;

  return (
    <div className="min-h-screen p-6 bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <h1 className="text-3xl font-bold mb-4">Welcome, {user.name ?? user.email}</h1>
      {user.avatar_url && (
        <div className="w-24 h-24 mb-4 relative">
          <Image
            src={user.avatar_url}
            alt="Avatar"
            fill
            className="rounded-full object-cover"
            sizes="96px"
          />
        </div>
      )}
      <p>User ID: {user.id}</p>
      <p>Email: {user.email}</p>
    </div>
  );
}
