import { NextRequest } from "next/server";
import NextAuth from "next-auth";
import { authOptions } from "@/lib/authOptions";

// GET এবং POST method export
export async function GET(req: NextRequest) {
  return NextAuth(authOptions)(req);
}

export async function POST(req: NextRequest) {
  return NextAuth(authOptions)(req);
}
