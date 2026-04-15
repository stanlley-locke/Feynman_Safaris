import { NextResponse } from "next/server";
import { db } from "@/db";
import { destinations } from "@/db/schema";
import { desc, eq } from "drizzle-orm";

const safeParseJSON = (str: string | null) => {
  if (!str) return [];
  try {
    return JSON.parse(str);
  } catch (e) {
    console.error("JSON Parse Error:", e, "on string:", str);
    return [];
  }
};

export async function GET() {
  try {
    const rawResults = await db.select().from(destinations).orderBy(desc(destinations.createdAt));
    
    // Manually parse strings back to JSON for the client
    const results = rawResults.map(item => ({
      ...item,
      itinerary: safeParseJSON(item.itinerary),
      highlights: safeParseJSON(item.highlights),
      wildlife: safeParseJSON(item.wildlife),
      accommodationIds: safeParseJSON(item.accommodationIds),
      transportIds: safeParseJSON(item.transportIds),
    }));

    return NextResponse.json(results);
  } catch (error: any) {
    console.error("DIAGNOSTIC - Failed to fetch destinations:", error.message || error);
    return NextResponse.json({ 
      error: "Failed to fetch destinations", 
      details: error.message 
    }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    if (!body.name) return NextResponse.json({ error: "Name is required" }, { status: 400 });

    const id = crypto.randomUUID();
    const destinationData = {
      id,
      name: body.name,
      slug: (body.slug || body.name).toLowerCase().trim().replace(/[^a-z0-9]+/g, "-"),
      description: body.description || "",
      image: body.image || "",
      bestTime: body.bestTime || "Year Round",
      itinerary: JSON.stringify(body.itinerary || []),
      highlights: JSON.stringify(body.highlights || []),
      wildlife: JSON.stringify(body.wildlife || []),
      accommodationIds: JSON.stringify(body.accommodationIds || []),
      transportIds: JSON.stringify(body.transportIds || []),
      status: body.status || "active",
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    await db.insert(destinations).values(destinationData);
    
    // Return the parsed version
    return NextResponse.json({
      ...destinationData,
      itinerary: JSON.parse(destinationData.itinerary),
      highlights: JSON.parse(destinationData.highlights),
      wildlife: JSON.parse(destinationData.wildlife),
      accommodationIds: JSON.parse(destinationData.accommodationIds),
      transportIds: JSON.parse(destinationData.transportIds),
    });
  } catch (error: any) {
    console.error("CRITICAL API ERROR (Destinations):", error.message || error);
    return NextResponse.json({ 
      error: "Failed to create destination", 
      details: error.message 
    }, { status: 500 });
  }
}

export async function PATCH(request: Request) {
  try {
    const body = await request.json();
    const { id, ...data } = body;
    
    if (!id) return NextResponse.json({ error: "ID is required" }, { status: 400 });

    const updateData: any = {
      updatedAt: new Date(),
    };

    if (data.name) updateData.name = data.name;
    if (data.slug) updateData.slug = data.slug.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-");
    if (data.description) updateData.description = data.description;
    if (data.image) updateData.image = data.image;
    if (data.bestTime) updateData.bestTime = data.bestTime;
    if (data.status) updateData.status = data.status;
    
    if (data.itinerary !== undefined) updateData.itinerary = JSON.stringify(data.itinerary);
    if (data.highlights !== undefined) updateData.highlights = JSON.stringify(data.highlights);
    if (data.wildlife !== undefined) updateData.wildlife = JSON.stringify(data.wildlife);
    if (data.accommodationIds !== undefined) updateData.accommodationIds = JSON.stringify(data.accommodationIds);
    if (data.transportIds !== undefined) updateData.transportIds = JSON.stringify(data.transportIds);

    await db.update(destinations).set(updateData).where(eq(destinations.id, id));
    
    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("PATCH ERROR (Destinations):", error.message || error);
    return NextResponse.json({ 
      error: "Failed to update destination", 
      details: error.message 
    }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    if (!id) return NextResponse.json({ id: "ID required" }, { status: 400 });
    
    await db.delete(destinations).where(eq(destinations.id, id));
    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ 
      error: "Failed to delete", 
      details: error.message 
    }, { status: 500 });
  }
}
