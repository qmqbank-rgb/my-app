import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { createClient } from "@supabase/supabase-js";

// Supabase credentials
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export async function middleware(req: NextRequest) {
  const supabase = createClient(supabaseUrl, supabaseAnonKey, {
    global: { fetch },
  });

  // Cookie থেকে token নাও
  const token = req.cookies.get("sb-access-token")?.value;

  // user fetch করা
  let user = null;
  if (token) {
    const { data, error } = await supabase.auth.getUser(token);
    if (error) {
      console.error("Supabase getUser error:", error.message);
    } else {
      user = data.user; // ✅ এখন TypeScript safe
    }
  }

  const url = req.nextUrl.clone();

  // Protected pages
  const protectedPaths = ["/dashboard", "/profile", "/settings"];
  const isProtected = protectedPaths.some((path) =>
    url.pathname.startsWith(path)
  );

  // Logged-in user visiting login/register → dashboard
  if ((url.pathname === "/login" || url.pathname === "/register") && user) {
    url.pathname = "/dashboard";
    return NextResponse.redirect(url);
  }

  // Protected page → redirect to login if not logged in
  if (isProtected && !user) {
    url.pathname = "/login";
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

// Middleware কোথায় apply হবে
export const config = {
  matcher: ["/dashboard", "/profile", "/settings", "/login", "/register"],
};
