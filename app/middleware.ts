import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export async function middleware(req: NextRequest) {
  const supabase = createClient(supabaseUrl, supabaseAnonKey, {
    global: { fetch },
  });

  // কুকি থেকে access token নাও
  const token = req.cookies.get("sb-access-token")?.value;

  let user = null;
  if (token) {
    const {
      data: { user: supabaseUser },
    } = await supabase.auth.getUser(token);
    user = supabaseUser;
  }

  const url = req.nextUrl.clone();

  // যেসব পাথ প্রোটেক্টেড রাখতে চান
  const protectedPaths = ["/dashboard", "/settings", "/profile", "/orders"];

  // চেক করো বর্তমান URL কোনো প্রোটেক্টেড পাথ কিনা
  const isProtected = protectedPaths.some((path) =>
    url.pathname.startsWith(path)
  );

  // যদি ইউজার না থাকে → login এ পাঠাও
  if (isProtected && !user) {
    url.pathname = "/login";
    return NextResponse.redirect(url);
  }

  // যদি ইউজার লগইন করা থাকে আর /login বা /register এ যায় → dashboard এ পাঠাও
  if ((url.pathname === "/login" || url.pathname === "/register") && user) {
    url.pathname = "/dashboard";
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

// Middleware কোন কোন পাথে চলবে
export const config = {
  matcher: ["/dashboard", "/settings", "/profile", "/orders", "/login", "/register"],
};
