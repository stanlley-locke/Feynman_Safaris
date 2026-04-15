import { NextResponse } from "next/server";
import { db } from "@/db";
import { accommodations } from "@/db/schema";
import { desc, eq } from "drizzle-orm";

const safeParseJSON = (str: string | null) => {
  if (!str) return [];
  try {
    return JSON.parse(str);
  } catch (e) {
    return [];
  }
};

export async function GET() {
  try {
    const rawResults = await db.select().from(accommodations).orderBy(desc(accommodations.createdAt));
    
    const results = rawResults.map(item => ({
      ...item,
      amenities: safeParseJSON(item.amenities),
      // Add a virtual status if the frontend expects it, or just omit if it doesn't exist in DB
      status: "active" 
    }));

    return NextResponse.json(results);
  } catch (error: any) {
    console.error("DIAGNOSTIC - Failed to fetch accommodations:", error.message || error);
    return NextResponse.json([], { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    if (!body.name) return NextResponse.json({ error: "Name is required" }, { status: 400 });

    const id = crypto.randomUUID();
    const accommodationData = {
      id,
      name: body.name,
      location: body.location || "",
      description: body.description || "",
      image: body.image || "",
      amenities: JSON.stringify(body.amenities || []),
      website: body.website || "",
      category: body.category || body.type || "Hotel",
      rating: body.rating ? parseInt(body.rating.toString(), 10) : 5,
      createdAt: new Date(),
      updatedAt: new Date(),
      // status: body.status || "active", // REMOVED: does not exist in DB
    };

    await db.insert(accommodations).values(accommodationData);
    
    return NextResponse.json({
      ...accommodationData,
      amenities: JSON.parse(accommodationData.amenities),
      status: "active"
    });
  } catch (error: any) {
    console.error("CRITICAL API ERROR (Accommodations):", error.message || error);
    return NextResponse.json({ error: "Failed to create" }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    if (!id) return NextResponse.json({ error: "ID required" }, { status: 400 });
    
    await db.delete(accommodations).where(eq(accommodations.id, id));
    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ error: "Failed to delete" }, { status: 500 });
  }
}

export async function PATCH(request: Request) {
  try {
    const body = await request.json();
    const { id, ...data } = body;
    if (!id) return NextResponse.json({ error: "ID required" }, { status: 400 });

    const updateData: Record<string, any> = {
      updatedAt: new Date(),
    };
    if (typeof data.name === "string") updateData.name = data.name;
    if (typeof data.location === "string") updateData.location = data.location;
    if (typeof data.description === "string") updateData.description = data.description;
    if (typeof data.image === "string") updateData.image = data.image;
    if (typeof data.website === "string") updateData.website = data.website;
    if (typeof data.category === "string") updateData.category = data.category;
    if (data.rating !== undefined) updateData.rating = parseInt(String(data.rating), 10) || 5;
    if (data.amenities !== undefined) updateData.amenities = JSON.stringify(data.amenities);

    await db.update(accommodations).set(updateData).where(eq(accommodations.id, id));
    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ error: "Failed to update accommodation" }, { status: 500 });
  }
}
