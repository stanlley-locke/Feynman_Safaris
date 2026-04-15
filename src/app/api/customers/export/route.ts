import { NextResponse } from "next/server";
import { db } from "@/db";
import { users } from "@/db/schema";
import { desc, eq } from "drizzle-orm";

const escapeCsv = (value: unknown) => {
  const stringValue = value == null ? "" : String(value);
  if (/[",\n]/.test(stringValue)) {
    return `"${stringValue.replace(/"/g, '""')}"`;
  }
  return stringValue;
};

export async function GET() {
  try {
    const rows = await db
      .select()
      .from(users)
      .where(eq(users.role, "customer"))
      .orderBy(desc(users.createdAt));

    const headers = ["id", "name", "email", "role", "createdAt"];
    const csv = [
      headers.join(","),
      ...rows.map((row) =>
        [row.id, row.name, row.email, row.role, row.createdAt ? new Date(row.createdAt).toISOString() : ""]
          .map(escapeCsv)
          .join(",")
      ),
    ].join("\n");

    return new NextResponse(csv, {
      headers: {
        "Content-Type": "text/csv; charset=utf-8",
        "Content-Disposition": 'attachment; filename="customers.csv"',
      },
    });
  } catch (error) {
    return NextResponse.json({ error: "Failed to export customers" }, { status: 500 });
  }
}
