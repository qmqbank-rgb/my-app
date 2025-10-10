'use client';

import { useEffect, useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { supabase } from '@/lib/supabaseClient';
import ProfileForm from '@/components/ProfileForm';

interface UserProfile {
  id: string;
  email: string;
  role: string;
  full_name?: string | null;
  avatar_url?: string | null;
}

export default function ProfilePage() {
  const router = useRouter();
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  // useCallback দিয়ে fetchUser ঠিকভাবে define করা
  const fetchUser = useCallback(async () => {
    try {
      const { data, error } = await supabase.auth.getSession();
      if (error || !data.session?.user) {
        router.push('/login?redirectedFrom=/profile');
        return;
      }

      const sessionUser = data.session.user;
      setUser({
        id: sessionUser.id,
        email: sessionUser.email ?? '',
        role: sessionUser.user_metadata?.role ?? 'student',
        full_name: sessionUser.user_metadata?.full_name ?? null,
        avatar_url: sessionUser.user_metadata?.avatar_url ?? null,
      });
    } catch {
      router.push('/login?redirectedFrom=/profile');
    } finally {
      setLoading(false);
    }
  }, [router]);

  useEffect(() => {
    fetchUser();

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        setUser({
          id: session.user.id,
          email: session.user.email ?? '',
          role: session.user.user_metadata?.role ?? 'student',
          full_name: session.user.user_metadata?.full_name ?? null,
          avatar_url: session.user.user_metadata?.avatar_url ?? null,
        });
      } else {
        setUser(null);
        router.push('/login?redirectedFrom=/profile');
      }
    });

    return () => listener.subscription.unsubscribe();
  }, [fetchUser, router]); // fetchUser now in dependency array

  if (loading)
    return (
      <div className="min-h-screen grid place-items-center bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white">
        <p>Loading profile…</p>
      </div>
    );

  if (!user)
    return (
      <div className="min-h-screen grid place-items-center bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white">
        <p>Fetching profile…</p>
      </div>
    );

  return (
    <div className="min-h-screen p-6 bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white max-w-md mx-auto">
      <h1 className="text-3xl font-bold mb-4 text-center">My Profile</h1>

      {user.avatar_url && (
        <div className="w-24 h-24 mb-4 mx-auto relative rounded-full overflow-hidden">
          <Image
            src={user.avatar_url}
            alt="Avatar"
            width={96}
            height={96}
            className="object-cover w-full h-full"
          />
        </div>
      )}

      <div className="space-y-2">
        <p>
          <strong>ID:</strong> {user.id}
        </p>
        <p>
          <strong>Email:</strong> {user.email}
        </p>
        <p>
          <strong>Role:</strong> {user.role}
        </p>
        {user.full_name && (
          <p>
            <strong>Full Name:</strong> {user.full_name}
          </p>
        )}
      </div>

      <div className="mt-6">
        <ProfileForm user={user} refreshUser={fetchUser} />
      </div>
    </div>
  );
}
