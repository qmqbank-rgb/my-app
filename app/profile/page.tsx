import ProfileForm from "../../components/ProfileForm";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";

export default async function ProfilePage() {
  const session = await getServerSession(authOptions);

  if (!session?.user)
    return <p className="text-center mt-20">You must log in</p>;

  return <ProfileForm user={session.user} />;
}
