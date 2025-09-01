import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "../api/auth/[...nextauth]/route";
import Navbar from "@/components/Navbar";

export default async function QuestionsPage() {
  const session = await getServerSession(authOptions);

  if (!session) redirect("/login");

  return (
    <>
      <Navbar />
      <div className="p-4">
        <h1 className="text-2xl font-bold">Protected Questions Page</h1>
        <p>Welcome, {session.user?.name}!</p>
        <p>Only logged-in users can see this content.</p>
      </div>
    </>
  );
}
