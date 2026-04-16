import { NextResponse } from "next/server";
import { db } from "@/db";
import { users } from "@/db/schema";
import { desc, eq } from "drizzle-orm";
import crypto from "crypto";

export async function GET() {
  try {
    const results = await db.select().from(users).where(eq(users.role, "customer")).orderBy(desc(users.createdAt));
    return NextResponse.json(results);
  } catch (error: any) {
    console.error("DIAGNOSTIC - Failed to fetch customers:", error.message || error);
    return NextResponse.json([], { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    if (!body.email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    const id = crypto.randomUUID();
    const newCustomer = {
      id,
      email: body.email,
      passwordHash: body.passwordHash || "customer_default_pass",
      name: body.name || "",
      whatsapp: body.whatsapp || null,
      role: "customer",
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    await db.insert(users).values(newCustomer);
    return NextResponse.json(newCustomer);
  } catch (error: any) {
    return NextResponse.json({ error: "Failed to create customer" }, { status: 500 });
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
    if (typeof data.whatsapp === "string") updateData.whatsapp = data.whatsapp;

    await db
      .update(users)
      .set(updateData)
      .where(eq(users.id, id));

    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ error: "Failed to update customer" }, { status: 500 });
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
    return NextResponse.json({ error: "Failed to delete customer" }, { status: 500 });
  }
}
