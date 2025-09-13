// app/db/client.ts
import pkg from 'pg';
const { Client } = pkg;

let client: InstanceType<typeof Client> | null = null;

export function getDbClient() {
  if (!client) {
    client = new Client({
      connectionString: process.env.DATABASE_URL, // safer
    });
    client.connect().catch((err: Error) => console.error('DB connect error:', err));
  }
  return client;
}
