import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import dotenv from "dotenv";

dotenv.config();

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL environment variable is not set");
}

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

const setup = () => {
  return drizzle(pool);
};

const endConnection = async () => {
  await pool.end();
};

const db = setup();

export { db, endConnection };
