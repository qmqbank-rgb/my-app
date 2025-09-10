import { getDbClient } from '../db/client';

export async function updateAvatar(userEmail: string, userPassword: string, avatarUrl: string) {
  const client = await getDbClient(userEmail, userPassword);

  const query = `
    UPDATE profiles
    SET avatar_url = $1
    WHERE email = current_user
    RETURNING *;
  `;

  const res = await client.query(query, [avatarUrl]);
  await client.end();

  return res.rows[0];
}
