import { NextResponse } from "next/server";
import { db } from "@/db";
import { bookings } from "@/db/schema";
import { desc } from "drizzle-orm";

const escapeCsv = (value: unknown) => {
  const stringValue = value == null ? "" : String(value);
  if (/[",\n]/.test(stringValue)) {
    return `"${stringValue.replace(/"/g, '""')}"`;
  }
  return stringValue;
};

export async function GET() {
  try {
    const rows = await db.select().from(bookings).orderBy(desc(bookings.createdAt));
    const headers = [
      "id",
      "customerName",
      "customerEmail",
      "safariType",
      "destinationId",
      "travelDate",
      "passengers",
      "status",
      "message",
      "amount",
      "createdAt",
    ];

    const csv = [
      headers.join(","),
      ...rows.map((row) =>
        [
          row.id,
          row.customerName,
          row.customerEmail,
          row.safariType,
          row.destinationId,
          row.travelDate ? new Date(row.travelDate).toISOString() : "",
          row.passengers,
          row.status,
          row.message,
          row.amount,
          row.createdAt ? new Date(row.createdAt).toISOString() : "",
        ]
          .map(escapeCsv)
          .join(",")
      ),
    ].join("\n");

    return new NextResponse(csv, {
      headers: {
        "Content-Type": "text/csv; charset=utf-8",
        "Content-Disposition": 'attachment; filename="bookings.csv"',
      },
    });
  } catch (error) {
    return NextResponse.json({ error: "Failed to export bookings" }, { status: 500 });
  }
}
