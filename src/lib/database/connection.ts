import { drizzle } from 'drizzle-orm/node-postgres';
import { Client } from 'pg';

const client = new Client({
	connectionString: process.env.DATABASE_URL, // Defina esta variável no seu ambiente
});

await client.connect();
const db = drizzle(client);
export default db;
