import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  const supabase = createMiddlewareClient({ req, res });

  // কুকি থেকে ইউজার নাও
  const { data: { user } } = await supabase.auth.getUser();

  const url = req.nextUrl.clone();
  const protectedPaths = ["/profile", "/dashboard"];

  const isProtected = protectedPaths.some(path => url.pathname.startsWith(path));

  if (isProtected && !user) {
    url.pathname = "/login";
    return NextResponse.redirect(url);
  }

  return res;
}

export const config = {
  matcher: ["/profile", "/dashboard", "/settings"]
};
