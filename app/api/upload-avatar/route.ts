import { supabase } from "@/lib/supabaseClient";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as Blob;
    const userId = formData.get("userId") as string;

    if (!file || !userId) {
      return NextResponse.json({ error: "File or userId missing" }, { status: 400 });
    }

    // Upload to bucket
    const { data, error } = await supabase.storage
      .from("avatars")
      .upload(`${userId}/profile.png`, file, { upsert: true });

    if (error) return NextResponse.json({ error: error.message }, { status: 400 });

    // Get public URL
    const { data: urlData } = supabase.storage.from("avatars").getPublicUrl(`${userId}/profile.png`);

    // Update user's profile in DB
    const { error: dbError } = await supabase
      .from("profiles")
      .update({ avatar_url: urlData.publicUrl })
      .eq("id", userId);

    if (dbError) return NextResponse.json({ error: dbError.message }, { status: 400 });

    return NextResponse.json({ url: urlData.publicUrl });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
