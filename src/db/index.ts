import { drizzle } from 'drizzle-orm/better-sqlite3';
import Database from 'better-sqlite3';
import * as schema from './schema';
import path from 'path';

// Use the existing DB from the prisma folder
const sqlite = new Database(path.join(process.cwd(), 'prisma', 'dev.db'));
export const db = drizzle(sqlite, { schema });
