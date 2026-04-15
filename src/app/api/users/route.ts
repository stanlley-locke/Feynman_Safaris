import { NextResponse } from "next/server";
import { db } from "@/db";
import { users } from "@/db/schema";
import { desc, eq } from "drizzle-orm";
import crypto from "crypto";

export async function GET() {
  try {
    const results = await db.select().from(users).orderBy(desc(users.createdAt));
    return NextResponse.json(results);
  } catch (error: any) {
    console.error("DIAGNOSTIC - Failed to fetch users:", error);
    return NextResponse.json([], { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    if (!body.email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }
    
    // Check if user already exists to avoid unique constraint errors 
    
    const id = crypto.randomUUID();
    const newUser = {
      id,
      email: body.email,
      passwordHash: body.passwordHash || "feynmantours",
      name: body.name || "",
      role: body.role || "user",
      // Drizzle handles the Date to integer conversion for mode: "timestamp"
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    await db.insert(users).values(newUser);
    
    return NextResponse.json({
      id: newUser.id,
      email: newUser.email,
      name: newUser.name,
      role: newUser.role,
      createdAt: newUser.createdAt
    });
  } catch (error: any) {
    console.error("USER CREATION ERROR:", error);
    return NextResponse.json({ 
      error: "Failed to create user", 
      details: error.message,
      stack: error.stack 
    }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    if (!id) return NextResponse.json({ error: "ID required" }, { status: 400 });
    
    await db.delete(users).where(eq(users.id, id));
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
    if (typeof data.email === "string") updateData.email = data.email;
    if (typeof data.role === "string") updateData.role = data.role;

    await db.update(users).set(updateData).where(eq(users.id, id));
    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ error: "Failed to update user" }, { status: 500 });
  }
}
