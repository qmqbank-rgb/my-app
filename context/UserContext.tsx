"use client";
import { createContext, useContext, useState, useEffect } from "react";
import { supabase } from "@/lib/supabaseClient";

interface UserContextType {
  user: any;
  avatarUrl: string | null;
  refreshUser: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<any>(null);
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);

  async function refreshUser() {
    const { data } = await supabase.auth.getUser();
    setUser(data.user);

    if (data.user) {
      const { data: profile } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", data.user.id)
        .single();

      if (profile?.avatar_url) {
        const { data: signedUrlData } = await supabase.storage
          .from("avatars-private")
          .createSignedUrl(profile.avatar_url, 60);

        // TypeScript-safe: handle nullable signedUrlData
        setAvatarUrl(signedUrlData?.signedUrl ?? null);
      } else {
        setAvatarUrl(null);
      }
    } else {
      setAvatarUrl(null);
    }
  }

  useEffect(() => {
    refreshUser();
  }, []);

  return (
    <UserContext.Provider value={{ user, avatarUrl, refreshUser }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (!context) throw new Error("useUser must be used within UserProvider");
  return context;
}
