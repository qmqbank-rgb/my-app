import { NextRequest } from "next/server";
import NextAuth, { AuthOptions } from "next-auth";
import GithubProvider from "next-auth/providers/github";

// Internal const, do NOT export
const authOptions: AuthOptions = {
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    }),
  ],
  session: { strategy: "jwt" as const },
  callbacks: {
    async session({ session, token }) {
      if (session?.user) {
        session.user.id = token.sub ?? ""; // Safe assignment
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};

// Next.js 15 App Router compatible handlers
export async function GET(req: NextRequest) {
  return NextAuth(authOptions)(req);
}

export async function POST(req: NextRequest) {
  return NextAuth(authOptions)(req);
}
