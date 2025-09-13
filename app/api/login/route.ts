import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export async function POST(req: NextRequest) {
  const { email, password } = await req.json();

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) return NextResponse.json({ error: error.message }, { status: 401 });

  // সেশন কুকিতে সেট করা হবে
  const res = NextResponse.json({ user: data.user });
  data.session && res.cookies.set("sb-access-token", data.session.access_token, { path: "/" });

  return res;
}
