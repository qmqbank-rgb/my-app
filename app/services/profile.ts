// app/services/profile.ts
import { getDbClient } from '@/app/db/client';

export async function updateAvatar(userId: string, avatarUrl: string) {
  const client = getDbClient();
  const query = `
    UPDATE profiles
    SET avatar_url = $1
    WHERE id = $2
  `;
  await client.query(query, [avatarUrl, userId]);
}
