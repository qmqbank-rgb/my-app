import { Client } from 'pg';

export async function getDbClient(userEmail: string, userPassword: string) {
  const client = new Client({
    user: userEmail,
    password: userPassword,
    host: 'localhost',
    database: 'myapp'
  });

  await client.connect();
  return client;
}
