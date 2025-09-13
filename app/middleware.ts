import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";

export async function middleware(req: NextRequest) {
  const res = NextResponse.next(); // res তৈরি করুন

  const supabase = createMiddlewareClient({ req, res }); // req + res উভয় দিতে হবে

  const { data: { user } } = await supabase.auth.getUser();

  const url = req.nextUrl.clone();

  const protectedPaths = ["/dashboard", "/settings", "/profile", "/orders"];
  const isProtected = protectedPaths.some(path => url.pathname.startsWith(path));

  if (isProtected && !user) {
    url.pathname = "/login";
    return NextResponse.redirect(url);
  }

  if ((url.pathname === "/login" || url.pathname === "/register") && user) {
    url.pathname = "/dashboard";
    return NextResponse.redirect(url);
  }

  return res;
}

export const config = {
  matcher: ["/dashboard", "/settings", "/profile", "/orders", "/login", "/register"],
};
