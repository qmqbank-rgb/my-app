// app/api/profile/route.ts
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("file");
    const userId = formData.get("userId");

    if (!file || !userId) {
      return NextResponse.json({ error: "Missing file or userId" }, { status: 400 });
    }

    // এখানে ফাইল আপলোড লজিক (Supabase, S3 ইত্যাদি)
    const publicUrl = "https://example.com/avatar.png"; // আপলোডের পরে URL

    return NextResponse.json({ data: { publicUrl } });
  } catch (err) {
    return NextResponse.json({ error: (err as Error).message }, { status: 500 });
  }
}
