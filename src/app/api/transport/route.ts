import { NextResponse } from "next/server";
import { db } from "@/db";
import { transports } from "@/db/schema";
import { desc, eq } from "drizzle-orm";

export async function GET() {
  try {
    const results = await db.select().from(transports).orderBy(desc(transports.createdAt));
    
    // Add a virtual capacity if the frontend expects it, or ignore
    const finalResults = results.map(item => ({
      ...item,
      capacity: (item as any).capacity || 6 // Fallback if needed
    }));

    return NextResponse.json(finalResults);
  } catch (error: any) {
    console.error("DIAGNOSTIC - Failed to fetch transport:", error.message || error);
    return NextResponse.json([], { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    console.log("Creating transport with body:", body);
    
    if (!body.name) return NextResponse.json({ error: "Name is required" }, { status: 400 });

    const id = crypto.randomUUID();
    const transportData = {
      id,
      name: body.name,
      type: body.type || "Safari Land Cruiser",
      plate: body.plate || "",
      location: body.location || "",
      description: body.description || "",
      image: body.image || "",
      status: body.status || "available",
      createdAt: new Date(),
      updatedAt: new Date(),
      // capacity: body.capacity ? parseInt(body.capacity.toString(), 10) : 6, // REMOVED: no such column
    };

    await db.insert(transports).values(transportData);
    
    return NextResponse.json({
      ...transportData,
      capacity: body.capacity || 6
    });
  } catch (error: any) {
    console.error("CRITICAL API ERROR (Transport):", error.message || error);
    return NextResponse.json({ error: "Failed to create" }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    if (!id) return NextResponse.json({ error: "ID required" }, { status: 400 });
    
    await db.delete(transports).where(eq(transports.id, id));
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
    if (typeof data.type === "string") updateData.type = data.type;
    if (typeof data.plate === "string") updateData.plate = data.plate;
    if (typeof data.location === "string") updateData.location = data.location;
    if (typeof data.description === "string") updateData.description = data.description;
    if (typeof data.image === "string") updateData.image = data.image;
    if (typeof data.status === "string") updateData.status = data.status;

    await db.update(transports).set(updateData).where(eq(transports.id, id));
    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ error: "Failed to update transport" }, { status: 500 });
  }
}
