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
    try {
      // Get current user
      const { data: { user: currentUser }, error: userError } = await supabase.auth.getUser();
      if (userError) {
        console.warn('User fetch warning:', userError.message || userError);
        setUser(null);
        setAvatarUrl(null);
        return;
      }
      setUser(currentUser);

      if (!currentUser) {
        setAvatarUrl(null);
        return;
      }

      // Fetch profile
      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', currentUser.id)
        .single();

      if (profileError) {
        // Safe logging: if error is empty object, log readable message
        const errorMsg = profileError?.message || 'Unknown profile fetch error';
        console.warn('Profile fetch warning:', errorMsg);
        setAvatarUrl(null);
      } else if (profile?.avatar_url) {
        try {
          const { data: signedUrlData, error: storageError } = await supabase.storage
            .from('avatars-private')
            .createSignedUrl(profile.avatar_url, 60);

          if (storageError) {
            console.warn('Avatar signed URL warning:', storageError.message || storageError);
            setAvatarUrl(null);
          } else {
            setAvatarUrl(signedUrlData?.signedUrl ?? null);
          }
        } catch (err) {
          console.warn('Avatar fetch exception:', err);
          setAvatarUrl(null);
        }
      } else {
        setAvatarUrl(null);
      }
    } catch (err) {
      console.warn('Unexpected error in refreshUser:', err);
      setUser(null);
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
