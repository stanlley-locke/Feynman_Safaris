import "dotenv/config";
import postgres from "postgres";

async function checkNeon() {
  const databaseUrl = process.env.DATABASE_URL;
  if (!databaseUrl) {
    throw new Error("DATABASE_URL is missing");
  }

  const sql = postgres(databaseUrl, {
    ssl: "require",
    prepare: false,
    max: 1,
    connect_timeout: 15,
  });

  try {
    const result = await sql`select now() as now`;
    console.log("NEON_OK", result[0]?.now ? "YES" : "NO");
  } finally {
    await sql.end({ timeout: 5 });
  }
}

checkNeon().catch((error) => {
  console.error("NEON_ERROR", error instanceof Error ? error.message : error);
  process.exit(1);
});
