import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabaseClient';

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get('avatar') as File | null;
    const fullName = formData.get('fullName') as string | null;

    // Current user fetch
    const { data: { user }, error: userError } = await supabase.auth.getUser();
    if (userError || !user) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
    }

    let avatarUrl = user.user_metadata?.avatar_url || null;

    // Avatar upload
    if (file) {
      const filePath = `avatars/${user.id}-${Date.now()}-${file.name}`;
      const { error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(filePath, file, { upsert: true });

      if (uploadError) {
        return NextResponse.json({ error: uploadError.message }, { status: 500 });
      }

      const { data } = supabase.storage.from('avatars').getPublicUrl(filePath);
      avatarUrl = data.publicUrl;
    }

    // Update user metadata
    const { error: updateError } = await supabase.auth.updateUser({
      data: {
        full_name: fullName || user.user_metadata?.full_name,
        avatar_url: avatarUrl,
      },
    });

    if (updateError) {
      return NextResponse.json({ error: updateError.message }, { status: 500 });
    }

    return NextResponse.json({
      success: true,
      user: {
        ...user,
        user_metadata: {
          full_name: fullName || user.user_metadata?.full_name,
          avatar_url: avatarUrl,
        },
      },
    });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
