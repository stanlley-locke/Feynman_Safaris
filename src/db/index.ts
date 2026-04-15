import "dotenv/config";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from './schema';

const databaseUrl = process.env.DATABASE_URL?.trim();

if (!databaseUrl) {
  throw new Error("DATABASE_URL is required for Postgres/Neon connection");
}

const client = postgres(databaseUrl, {
  ssl: "require",
  max: 1,
  prepare: false,
});

export const db = drizzle(client, { schema });

export const testDbConnection = async () => {
  try {
    await client`select 1`;
    return true;
  } catch (error) {
    return false;
  }
};
