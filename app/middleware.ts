import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export async function middleware(req: NextRequest) {
  const supabase = createClient(supabaseUrl, supabaseAnonKey, { global: { fetch } });

  const token = req.cookies.get("sb-access-token")?.value;
  let user = null;

  if (token) {
    const { data: { user: supabaseUser } } = await supabase.auth.getUser(token);
    user = supabaseUser;
  }

  const url = req.nextUrl.clone();

  const protectedPaths = ["/dashboard", "/settings", "/profile"];
  const isProtected = protectedPaths.some(path => url.pathname.startsWith(path));

  if (isProtected && !user) {
    url.pathname = "/login";
    url.searchParams.set("redirectedFrom", req.nextUrl.pathname);
    return NextResponse.redirect(url);
  }

  if ((url.pathname === "/login" || url.pathname === "/register") && user) {
    url.pathname = "/dashboard";
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/settings/:path*", "/profile/:path*", "/login", "/register"],
};
