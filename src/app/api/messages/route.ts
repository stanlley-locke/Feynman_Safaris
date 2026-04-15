import { NextResponse } from "next/server";
import { db } from "@/db";
import { messages } from "@/db/schema";
import { desc, eq } from "drizzle-orm";

export async function GET() {
  try {
    const results = await db.select().from(messages).orderBy(desc(messages.createdAt));
    return NextResponse.json(results);
  } catch (error: any) {
    console.error("DIAGNOSTIC - Failed to fetch messages:", error.message || error);
    return NextResponse.json([], { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    const id = crypto.randomUUID();
    const newMessage = {
      id,
      name: body.name,
      email: body.email,
      subject: body.subject || "No Subject",
      content: body.content,
      isRead: false,
      isStarred: false,
      createdAt: new Date(),
    };

    await db.insert(messages).values(newMessage);
    
    return NextResponse.json(newMessage);
  } catch (error: any) {
    console.error("CRITICAL API ERROR (Messages):", error.message || error);
    return NextResponse.json({ error: "Failed to send message" }, { status: 500 });
  }
}

export async function PATCH(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    if (!id) return NextResponse.json({ error: "ID required" }, { status: 400 });
    
    const body = await request.json();
    await db.update(messages).set(body).where(eq(messages.id, id));
    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ error: "Failed to update message" }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    if (!id) return NextResponse.json({ error: "ID required" }, { status: 400 });
    
    await db.delete(messages).where(eq(messages.id, id));
    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ error: "Failed to delete message" }, { status: 500 });
  }
}
