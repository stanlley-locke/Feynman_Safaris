import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";
import { sql } from "drizzle-orm";

export const users = sqliteTable("User", {
  id: text("id").primaryKey(),
  email: text("email").notNull(),
  passwordHash: text("passwordHash").notNull(),
  name: text("name"),
  role: text("role").default("user").notNull(),
  createdAt: integer("createdAt", { mode: "timestamp" }).default(sql`(strftime('%s', 'now'))`),
  updatedAt: integer("updatedAt", { mode: "timestamp" }).default(sql`(strftime('%s', 'now'))`),
});

export const destinations = sqliteTable("Destination", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  slug: text("slug").notNull(),
  description: text("description").notNull(),
  itinerary: text("itinerary"),
  highlights: text("highlights"),
  bestTime: text("bestTime"),
  wildlife: text("wildlife"),
  image: text("image"),
  status: text("status").default("active").notNull(),
  createdAt: integer("createdAt", { mode: "timestamp" }).default(sql`(strftime('%s', 'now'))`),
  updatedAt: integer("updatedAt", { mode: "timestamp" }).default(sql`(strftime('%s', 'now'))`),
  accommodationIds: text("accommodationIds"),
  transportIds: text("transportIds"),
});

export const accommodations = sqliteTable("Accommodation", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  location: text("location").notNull(),
  description: text("description"),
  amenities: text("amenities"),
  image: text("image"),
  website: text("website"),
  createdAt: integer("createdAt", { mode: "timestamp" }).default(sql`(strftime('%s', 'now'))`),
  updatedAt: integer("updatedAt", { mode: "timestamp" }).default(sql`(strftime('%s', 'now'))`),
  category: text("category"),
  rating: integer("rating").default(5),
});

export const transports = sqliteTable("Transport", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  type: text("type").notNull(),
  plate: text("plate"),
  location: text("location"),
  status: text("status").default("available").notNull(),
  description: text("description"),
  image: text("image"),
  createdAt: integer("createdAt", { mode: "timestamp" }).default(sql`(strftime('%s', 'now'))`),
  updatedAt: integer("updatedAt", { mode: "timestamp" }).default(sql`(strftime('%s', 'now'))`),
});

export const bookings = sqliteTable("Booking", {
  id: text("id").primaryKey(),
  customerName: text("customerName").notNull(),
  customerEmail: text("customerEmail").notNull(),
  safariType: text("safariType").notNull(),
  destinationId: text("destinationId"),
  travelDate: integer("travelDate", { mode: "timestamp" }).notNull(),
  passengers: integer("passengers").notNull(),
  status: text("status").default("pending").notNull(),
  message: text("message"),
  createdAt: integer("createdAt", { mode: "timestamp" }).default(sql`(strftime('%s', 'now'))`),
  updatedAt: integer("updatedAt", { mode: "timestamp" }).default(sql`(strftime('%s', 'now'))`),
  amount: text("amount"),
});

export const messages = sqliteTable("Message", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  subject: text("subject"),
  content: text("content").notNull(),
  isRead: integer("isRead", { mode: "boolean" }).default(false).notNull(),
  isStarred: integer("isStarred", { mode: "boolean" }).default(false).notNull(),
  createdAt: integer("createdAt", { mode: "timestamp" }).default(sql`(strftime('%s', 'now'))`),
});

export const reviews = sqliteTable("Review", {
  id: text("id").primaryKey(),
  userName: text("userName").notNull(),
  userAvatar: text("userAvatar"),
  rating: integer("rating").notNull(),
  comment: text("comment").notNull(),
  destinationName: text("destinationName"),
  status: text("status").default("pending").notNull(),
  createdAt: integer("createdAt", { mode: "timestamp" }).default(sql`(strftime('%s', 'now'))`),
});

export const blogPosts = sqliteTable("BlogPost", {
  id: text("id").primaryKey(),
  title: text("title").notNull(),
  slug: text("slug").notNull(),
  content: text("content").notNull(),
  excerpt: text("excerpt"),
  image: text("image"),
  author: text("author").notNull(),
  category: text("category").notNull(),
  status: text("status").default("draft").notNull(),
  publishedAt: integer("publishedAt", { mode: "timestamp" }),
  createdAt: integer("createdAt", { mode: "timestamp" }).default(sql`(strftime('%s', 'now'))`),
  updatedAt: integer("updatedAt", { mode: "timestamp" }).default(sql`(strftime('%s', 'now'))`),
})
