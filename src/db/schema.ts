import { pgTable, text, integer, timestamp, boolean } from "drizzle-orm/pg-core";

export const users = pgTable("User", {
  id: text("id").primaryKey(),
  email: text("email").notNull(),
  passwordHash: text("passwordHash").notNull(),
  name: text("name"),
  whatsapp: text("whatsapp"),
  role: text("role").default("user").notNull(),
  createdAt: timestamp("createdAt", { mode: "date", withTimezone: true }).defaultNow(),
  updatedAt: timestamp("updatedAt", { mode: "date", withTimezone: true }).defaultNow(),
});

export const destinations = pgTable("Destination", {
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
  createdAt: timestamp("createdAt", { mode: "date", withTimezone: true }).defaultNow(),
  updatedAt: timestamp("updatedAt", { mode: "date", withTimezone: true }).defaultNow(),
  accommodationIds: text("accommodationIds"),
  transportIds: text("transportIds"),
});

export const accommodations = pgTable("Accommodation", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  location: text("location").notNull(),
  description: text("description"),
  amenities: text("amenities"),
  image: text("image"),
  website: text("website"),
  createdAt: timestamp("createdAt", { mode: "date", withTimezone: true }).defaultNow(),
  updatedAt: timestamp("updatedAt", { mode: "date", withTimezone: true }).defaultNow(),
  category: text("category"),
  rating: integer("rating").default(5),
});

export const transports = pgTable("Transport", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  type: text("type").notNull(),
  plate: text("plate"),
  location: text("location"),
  status: text("status").default("available").notNull(),
  description: text("description"),
  image: text("image"),
  createdAt: timestamp("createdAt", { mode: "date", withTimezone: true }).defaultNow(),
  updatedAt: timestamp("updatedAt", { mode: "date", withTimezone: true }).defaultNow(),
});

export const bookings = pgTable("Booking", {
  id: text("id").primaryKey(),
  customerName: text("customerName").notNull(),
  customerEmail: text("customerEmail").notNull(),
  safariType: text("safariType").notNull(),
  destinationId: text("destinationId"),
  travelDate: timestamp("travelDate", { mode: "date", withTimezone: true }).notNull(),
  passengers: integer("passengers").notNull(),
  status: text("status").default("pending").notNull(),
  message: text("message"),
  createdAt: timestamp("createdAt", { mode: "date", withTimezone: true }).defaultNow(),
  updatedAt: timestamp("updatedAt", { mode: "date", withTimezone: true }).defaultNow(),
  amount: text("amount"),
});

export const messages = pgTable("Message", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  subject: text("subject"),
  content: text("content").notNull(),
  isRead: boolean("isRead").default(false).notNull(),
  isStarred: boolean("isStarred").default(false).notNull(),
  createdAt: timestamp("createdAt", { mode: "date", withTimezone: true }).defaultNow(),
});

export const reviews = pgTable("Review", {
  id: text("id").primaryKey(),
  userName: text("userName").notNull(),
  userAvatar: text("userAvatar"),
  rating: integer("rating").notNull(),
  comment: text("comment").notNull(),
  destinationName: text("destinationName"),
  status: text("status").default("pending").notNull(),
  createdAt: timestamp("createdAt", { mode: "date", withTimezone: true }).defaultNow(),
});

export const blogPosts = pgTable("BlogPost", {
  id: text("id").primaryKey(),
  title: text("title").notNull(),
  slug: text("slug").notNull(),
  content: text("content").notNull(),
  excerpt: text("excerpt"),
  image: text("image"),
  author: text("author").notNull(),
  category: text("category").notNull(),
  status: text("status").default("draft").notNull(),
  publishedAt: timestamp("publishedAt", { mode: "date", withTimezone: true }),
  createdAt: timestamp("createdAt", { mode: "date", withTimezone: true }).defaultNow(),
  updatedAt: timestamp("updatedAt", { mode: "date", withTimezone: true }).defaultNow(),
});
