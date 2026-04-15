import { NextResponse } from "next/server";
import { db } from "@/db";
import { destinations } from "@/db/schema";
import { eq } from "drizzle-orm";

const safeParseJSON = (str: string | null) => {
  if (!str) return [];
  try {
    return JSON.parse(str);
  } catch {
    return [];
  }
};

export async function GET(
  _request: Request,
  context: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await context.params;
    const rows = await db.select().from(destinations).where(eq(destinations.slug, slug)).limit(1);
    const destination = rows[0];

    if (!destination) {
      return NextResponse.json({ error: "Destination not found" }, { status: 404 });
    }

    return NextResponse.json({
      ...destination,
      itinerary: safeParseJSON(destination.itinerary),
      highlights: safeParseJSON(destination.highlights),
      wildlife: safeParseJSON(destination.wildlife),
      accommodationIds: safeParseJSON(destination.accommodationIds),
      transportIds: safeParseJSON(destination.transportIds),
    });
  } catch (error: any) {
    return NextResponse.json({ error: "Failed to fetch destination" }, { status: 500 });
  }
}
