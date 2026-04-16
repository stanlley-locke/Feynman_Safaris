import { NextResponse } from "next/server";
import { db } from "@/db";
import { reviews } from "@/db/schema";
import { desc, eq } from "drizzle-orm";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get("status");
    
    let query = db.select().from(reviews);
    
    if (status) {
      query = query.where(eq(reviews.status, status));
    }
    
    const results = await query.orderBy(desc(reviews.createdAt));
    return NextResponse.json(results);
  } catch (error: any) {
    console.error("DIAGNOSTIC - Failed to fetch reviews:", error.message || error);
    return NextResponse.json([], { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    const id = crypto.randomUUID();
    const newReview = {
      id,
      userName: body.userName,
      userAvatar: body.userAvatar || "",
      rating: body.rating,
      comment: body.comment,
      destinationName: body.destinationName || "",
      status: body.status || "pending",
      createdAt: new Date(),
    };

    await db.insert(reviews).values(newReview);
    
    return NextResponse.json(newReview);
  } catch (error: any) {
    console.error("CRITICAL API ERROR (Reviews):", error.message || error);
    return NextResponse.json({ error: "Failed to create review" }, { status: 500 });
  }
}

export async function PATCH(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    const body = await request.json();
    if (!id) return NextResponse.json({ error: "ID required" }, { status: 400 });
    
    await db.update(reviews).set(body).where(eq(reviews.id, id));
    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ error: "Failed to update" }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    if (!id) return NextResponse.json({ error: "ID required" }, { status: 400 });
    
    await db.delete(reviews).where(eq(reviews.id, id));
    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ error: "Failed to delete" }, { status: 500 });
  }
}
