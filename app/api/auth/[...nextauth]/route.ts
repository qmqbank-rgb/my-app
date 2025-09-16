// app/api/auth/[...nextauth]/route.ts
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { authOptions } from "@/lib/authOptions";

// NextAuth handler তৈরি
const handler = NextAuth(authOptions);

// GET এবং POST এক্সপোর্ট
export { handler as GET, handler as POST };
