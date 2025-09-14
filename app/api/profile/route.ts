// app/api/profile/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { updateAvatar } from '@/app/services/profile';

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_ANON_KEY!
);

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get('avatar') as File | null;
    const userId = formData.get('userId') as string;

    if (!file || !userId) {
      return NextResponse.json({ error: 'Missing file or userId' }, { status: 400 });
    }

    // Supabase storage upload
    const { data, error: uploadError } = await supabase.storage
      .from('avatars')
      .upload(`${userId}-${Date.now()}`, file);

    if (uploadError) {
      return NextResponse.json({ error: uploadError.message }, { status: 500 });
    }

    const publicUrl = supabase.storage.from('avatars').getPublicUrl(data.path).data.publicUrl;

    // Update DB
    await updateAvatar(userId, publicUrl!);

    return NextResponse.json({ success: true, avatarUrl: publicUrl });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
