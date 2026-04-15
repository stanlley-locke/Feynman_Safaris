import { NextResponse } from "next/server";
import { db } from "@/db";
import { blogPosts } from "@/db/schema";
import { desc, eq } from "drizzle-orm";

export async function GET() {
  try {
    const results = await db.select().from(blogPosts).orderBy(desc(blogPosts.createdAt));
    return NextResponse.json(results);
  } catch (error: any) {
    console.error("DIAGNOSTIC - Failed to fetch blog posts:", error.message || error);
    return NextResponse.json([], { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    const id = crypto.randomUUID();
    const newPost = {
      id,
      title: body.title,
      slug: body.slug || body.title.toLowerCase().replace(/ /g, "-"),
      content: body.content,
      excerpt: body.excerpt || "",
      image: body.image || "",
      author: body.author || "Admin",
      category: body.category || "Safari",
      status: body.status || "draft",
      publishedAt: body.status === "published" ? new Date() : null,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    await db.insert(blogPosts).values(newPost);
    
    return NextResponse.json(newPost);
  } catch (error: any) {
    console.error("CRITICAL API ERROR (Blog):", error.message || error);
    return NextResponse.json({ error: "Failed to create post" }, { status: 500 });
  }
}

export async function PATCH(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    const body = await request.json();
    if (!id) return NextResponse.json({ error: "ID required" }, { status: 400 });
    
    await db.update(blogPosts).set({
      ...body,
      updatedAt: new Date()
    }).where(eq(blogPosts.id, id));
    
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
    
    await db.delete(blogPosts).where(eq(blogPosts.id, id));
    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ error: "Failed to delete" }, { status: 500 });
  }
}
