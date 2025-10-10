'use client';

import { useState, ChangeEvent, FormEvent, useRef } from 'react';
import Image from 'next/image';
import { supabase } from '@/lib/supabaseClient';
import Input from './Input';
import SubmitButton from './SubmitButton';

interface UserProfile {
  id: string;
  email: string;
  role: string;
  full_name?: string | null;
  avatar_url?: string | null;
}

interface Props {
  user: UserProfile;
  refreshUser: () => Promise<void>;
}

export default function ProfileForm({ user, refreshUser }: Props) {
  const [fullName, setFullName] = useState(user.full_name ?? '');
  const [email, setEmail] = useState(user.email);
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [avatarPreview, setAvatarPreview] = useState(user.avatar_url ?? null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const avatarInputRef = useRef<HTMLInputElement>(null);

  const handleAvatarChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null;
    setAvatarFile(file);
    if (file) setAvatarPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      let avatar_url = user.avatar_url ?? null;

      // Upload new avatar if selected
      if (avatarFile) {
        const fileExt = avatarFile.name.split('.').pop();
        const fileName = `${user.id}.${fileExt}`;

        const { error: uploadError } = await supabase.storage
          .from('avatars')
          .upload(fileName, avatarFile, { upsert: true });

        if (uploadError) throw uploadError;

        const { data: publicData } = supabase.storage
          .from('avatars')
          .getPublicUrl(fileName);

        avatar_url = publicData?.publicUrl ?? null;
      }

      // Update user metadata
      const { error: updateError } = await supabase.auth.updateUser({
        data: {
          full_name: fullName,
          role: user.role,
          avatar_url,
        },
      });
      if (updateError) throw updateError;

      // Update email if changed
      if (email !== user.email) {
        const { error: emailError } = await supabase.auth.updateUser({ email });
        if (emailError) throw emailError;
      }

      setSuccess('Profile updated successfully!');
      await refreshUser();
    } catch (err: unknown) {
      if (err instanceof Error) setError(err.message);
      else setError('Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-md max-w-md mx-auto"
    >
      <div className="flex flex-col items-center">
        {avatarPreview ? (
          <div
            className="w-24 h-24 rounded-full overflow-hidden mb-2 cursor-pointer"
            onClick={() => avatarInputRef.current?.click()}
          >
            <Image
              src={avatarPreview}
              alt="Avatar"
              width={96}
              height={96}
              className="object-cover w-full h-full"
            />
          </div>
        ) : (
          <div
            className="w-24 h-24 bg-gray-300 dark:bg-gray-700 rounded-full mb-2 flex items-center justify-center cursor-pointer"
            onClick={() => avatarInputRef.current?.click()}
          >
            <span className="text-gray-600 dark:text-gray-300 text-sm">No Avatar</span>
          </div>
        )}
        <input
          ref={avatarInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleAvatarChange}
        />
      </div>

      <Input
        label="Full Name"
        type="text"
        value={fullName}
        onChange={(e) => setFullName(e.target.value)}
      />

      <Input
        label="Email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      {error && <p className="text-red-600 dark:text-red-400 text-sm">{error}</p>}
      {success && <p className="text-green-600 dark:text-green-400 text-sm">{success}</p>}

      <SubmitButton loading={loading}>Save Changes</SubmitButton>
    </form>
  );
}
