import { NextResponse } from "next/server";
import { db } from "@/db";
import { bookings, users, destinations, messages } from "@/db/schema";
import { count, eq, desc } from "drizzle-orm";

export async function GET() {
  try {
    const [totalBookings] = await db.select({ value: count() }).from(bookings);
    const [pendingBookings] = await db.select({ value: count() }).from(bookings).where(eq(bookings.status, "pending"));
    const [totalCustomers] = await db.select({ value: count() }).from(users).where(eq(users.role, "customer"));
    const [unreadInquiries] = await db.select({ value: count() }).from(messages).where(eq(messages.isRead, false));
    const [activeSafaris] = await db.select({ value: count() }).from(destinations).where(eq(destinations.status, "active"));

    const recentBookings = await db.select()
      .from(bookings)
      .orderBy(desc(bookings.createdAt))
      .limit(5);

    return NextResponse.json({
      stats: {
        activeSafaris: activeSafaris?.value || 0,
        pendingBookings: pendingBookings?.value || 0,
        totalCustomers: totalCustomers?.value || 0,
        unreadInquiries: unreadInquiries?.value || 0,
        totalBookings: totalBookings?.value || 0,
      },
      recentBookings
    });
  } catch (error: any) {
    console.error("Failed to fetch dashboard stats:", error);
    return NextResponse.json({ error: "Failed to fetch stats" }, { status: 500 });
  }
}
