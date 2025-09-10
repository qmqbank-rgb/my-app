"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const getUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        router.push("/login"); // লগ ইন না করলে Login এ রিডিরেক্ট হবে
      } else {
        setUser(user);
      }
    };

    getUser();
  }, [router]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/login");
  };

  if (!user) {
    return <p className="text-center mt-20">Loading...</p>;
  }

  return (
    <div className="max-w-2xl mx-auto mt-20 p-6 border rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-4">Welcome to your Dashboard 🎉</h2>
      <p className="mb-4">Hello, <strong>{user.user_metadata.full_name || user.email}</strong></p>

      <div className="flex gap-4">
        <button
          onClick={handleLogout}
          className="bg-red-600 text-white px-4 py-2 rounded"
        >
          Logout
        </button>
      </div>
    </div>
  );
}
