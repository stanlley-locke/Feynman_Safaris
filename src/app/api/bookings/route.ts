import { NextResponse } from "next/server";
import { db } from "@/db";
import { bookings } from "@/db/schema";
import { desc, eq } from "drizzle-orm";

export async function GET() {
  try {
    const results = await db.select().from(bookings).orderBy(desc(bookings.createdAt));
    return NextResponse.json(results);
  } catch (error: any) {
    console.error("DIAGNOSTIC - Failed to fetch bookings:", error.message || error);
    return NextResponse.json([], { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    const id = crypto.randomUUID();
    const newBooking = {
      id,
      customerName: body.customerName,
      customerEmail: body.customerEmail,
      safariType: body.safariType,
      travelDate: new Date(body.travelDate),
      passengers: parseInt(body.passengers),
      status: body.status || "pending",
      message: body.message || "",
      amount: body.amount || "$0",
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    await db.insert(bookings).values(newBooking);
    
    return NextResponse.json(newBooking);
  } catch (error: any) {
    console.error("CRITICAL API ERROR (Bookings):", error.message || error);
    return NextResponse.json({ error: "Failed to create booking" }, { status: 500 });
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

    if (typeof data.customerName === "string") updateData.customerName = data.customerName;
    if (typeof data.customerEmail === "string") updateData.customerEmail = data.customerEmail;
    if (typeof data.safariType === "string") updateData.safariType = data.safariType;
    if (typeof data.status === "string") updateData.status = data.status;
    if (typeof data.message === "string") updateData.message = data.message;
    if (typeof data.amount === "string") updateData.amount = data.amount;
    if (data.passengers !== undefined) updateData.passengers = parseInt(String(data.passengers), 10) || 1;
    if (data.travelDate) updateData.travelDate = new Date(data.travelDate);
    if (typeof data.destinationId === "string") updateData.destinationId = data.destinationId;

    await db.update(bookings).set(updateData).where(eq(bookings.id, id));
    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ error: "Failed to update booking" }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    if (!id) return NextResponse.json({ error: "ID required" }, { status: 400 });
    
    await db.delete(bookings).where(eq(bookings.id, id));
    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ error: "Failed to delete" }, { status: 500 });
  }
}
