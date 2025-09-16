// /app/dashboard/page.tsx
"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useRouter } from "next/navigation";

interface SupabaseUser {
  id: string;
  email?: string | null;
  user_metadata: {
    full_name?: string;
    [key: string]: any;
  };
}

export default function DashboardPage() {
  const [user, setUser] = useState<SupabaseUser | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const router = useRouter();

  useEffect(() => {
    const getUser = async () => {
      const { data } = await supabase.auth.getUser();
      if (!data.user) {
        // যদি user না থাকে → login page এ redirect
        router.push("/login?redirectedFrom=/dashboard");
      } else {
        const currentUser: SupabaseUser = {
          id: data.user.id,
          email: data.user.email,
          user_metadata: data.user.user_metadata ?? {},
        };
        setUser(currentUser);
      }
      setLoading(false);
    };

    getUser();
  }, [router]);

  if (loading) return <p className="text-center mt-20">Loading...</p>;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white p-6">
      <div className="w-full max-w-lg p-8 bg-white dark:bg-gray-800 rounded-3xl shadow-lg">
        <h1 className="text-3xl font-bold mb-4">Dashboard</h1>
        <p className="mb-2">
          Welcome,{" "}
          <span className="font-semibold">
            {user?.user_metadata.full_name ?? user?.email}
          </span>
        </p>
        <p className="text-gray-600 dark:text-gray-300">
          This is your protected dashboard page.
        </p>
      </div>
    </div>
  );
}
