import ProfileForm from '@/components/ProfileForm';
import { getServerSession } from 'next-auth';
import { authOptions } from '../api/auth/[...nextauth]/route';

interface SessionUser {
  id: string;
  email?: string | null;
  name?: string | null;
  image?: string | null;
  [key: string]: any;
}

export default async function ProfilePage() {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    return <p className="text-center mt-20">You must log in</p>;
  }

  // Type-safe user object for ProfileForm
  const user = {
    id: session.user.id,
    email: session.user.email ?? '',
    user_metadata: {
      full_name: session.user.name ?? '',
      avatar_url: session.user.image ?? '/default.png',
    },
  };

  return <ProfileForm user={user} />;
}
