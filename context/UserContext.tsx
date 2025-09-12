// context/UserContext.tsx
'use client';

import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { supabase } from '@/lib/supabaseClient';

interface UserContextType {
  user: any;
  avatarUrl: string | null;
  refreshUser: () => Promise<void>;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<any>(null);
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);

  const refreshUser = async () => {
    const { data } = await supabase.auth.getUser();
    setUser(data.user);

    if (data.user) {
      const { data: profile, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', data.user.id)
        .single();

      if (error) {
        console.error(error);
        setAvatarUrl(null);
      } else if (profile?.avatar_url) {
        const { data: signedUrlData } = await supabase.storage
          .from('avatars-private')
          .createSignedUrl(profile.avatar_url, 60);
        setAvatarUrl(signedUrlData?.signedUrl ?? null);
      } else {
        setAvatarUrl(null);
      }
    } else {
      setAvatarUrl(null);
    }
  };

  useEffect(() => {
    refreshUser();
  }, []);

  return (
    <UserContext.Provider value={{ user, avatarUrl, refreshUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) throw new Error('useUser must be used within UserProvider');
  return context;
};
