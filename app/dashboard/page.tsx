"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";

interface User {
  id: string;
  email: string;
  user_metadata: {
    full_name?: string;
    [key: string]: any;
  };
}

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getUser = async () => {
      const { data } = await supabase.auth.getUser();

      if (!data.user) {
        router.push("/login"); // লগ ইন না করলে Login এ রিডিরেক্ট
      } else {
        setUser(data.user as User);
      }
      setLoading(false);
    };

    getUser();
  }, [router]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/login");
  };

  if (loading) {
    return <p className="text-center mt-20">Loading...</p>;
  }

  if (!user) return null;

  return (
    <div className="max-w-2xl mx-auto mt-20 p-6 border rounded-lg shadow bg-white dark:bg-gray-800 text-gray-900 dark:text-white">
      <h2 className="text-2xl font-bold mb-4">Welcome to your Dashboard 🎉</h2>
      <p className="mb-4">
        Hello, <strong>{user.user_metadata.full_name || user.email}</strong>
      </p>

      <div className="flex gap-4">
        <button
          type="button"
          onClick={handleLogout}
          className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition-colors"
        >
          Logout
        </button>
      </div>
    </div>
  );
}
