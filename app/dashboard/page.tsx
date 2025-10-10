'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabaseClient';
import ProtectedRoute from '@/components/ProtectedRoute';

interface User {
  id: string;
  email: string;
  name?: string | null;
  avatar_url?: string | null;
  role?: string;
  created_at?: string;
}

export default function DashboardPage() {
  const [user, setUser] = useState<User | null>(null);
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchSession = async () => {
      const { data, error } = await supabase.auth.getSession();
      if (error || !data.session?.user) {
        router.push(`/login?redirectedFrom=/dashboard`);
        return;
      }

      const sessionUser = data.session.user;
      const role = sessionUser.user_metadata?.role || 'student';

      setUser({
        id: sessionUser.id,
        email: sessionUser.email ?? '',
        name: sessionUser.user_metadata?.name ?? null,
        avatar_url: sessionUser.user_metadata?.avatar_url ?? null,
        role,
      });

      // Only fetch all users if admin or teacher
      if (['admin', 'teacher'].includes(role)) {
        const { data: allUsers, error: usersError } = await supabase.from('users').select('*');
        if (usersError) console.error(usersError);
        else setUsers(allUsers);
      }

      setLoading(false);
    };

    fetchSession();

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        const role = session.user.user_metadata?.role || 'student';
        setUser({
          id: session.user.id,
          email: session.user.email ?? '',
          name: session.user.user_metadata?.name ?? null,
          avatar_url: session.user.user_metadata?.avatar_url ?? null,
          role,
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

  // Student / Regular user view
  if (user.role === 'student') {
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

  // Admin / Teacher view
  return (
    <ProtectedRoute allowedRoles={['admin', 'teacher']}>
      <div className="p-6 bg-gray-100 dark:bg-gray-900 min-h-screen">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">Users Dashboard</h1>
        <table className="w-full text-left border border-gray-300 dark:border-gray-700">
          <thead>
            <tr className="bg-gray-200 dark:bg-gray-800">
              <th className="px-4 py-2">Email</th>
              <th className="px-4 py-2">Role</th>
              <th className="px-4 py-2">Created At</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u.id} className="border-t border-gray-300 dark:border-gray-700">
                <td className="px-4 py-2 text-gray-700 dark:text-gray-200">{u.email}</td>
                <td className="px-4 py-2 text-gray-700 dark:text-gray-200">{u.role}</td>
                <td className="px-4 py-2 text-gray-700 dark:text-gray-200">
                  {u.created_at ? new Date(u.created_at).toLocaleString() : '-'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </ProtectedRoute>
  );
}
