"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useRouter } from "next/navigation";

export default function DashboardPage() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    async function getUser() {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        router.push("/login?redirectedFrom=/dashboard");
      } else {
        setUser(user);
      }
      setLoading(false);
    }
    getUser();
  }, [router]);

  if (loading) return <p>Loading...</p>;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white p-6">
      <div className="w-full max-w-lg p-8 bg-white dark:bg-gray-800 rounded-3xl shadow-lg">
        <h1 className="text-3xl font-bold mb-4">Dashboard</h1>
        <p className="mb-6">Hello, {user?.email}</p>
      </div>
    </div>
  );
}
