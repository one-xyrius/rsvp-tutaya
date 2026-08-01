// src/db/schema.ts
import { pgTable, text, integer, timestamp } from "drizzle-orm/pg-core";

export const rsvps = pgTable("rsvps", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  attending: text("attending").$type<"yes" | "no">().notNull(),
  guests: integer("guests").notNull(),
  message: text("message"),
  theme: text("theme").$type<"anak" | "remaja" | "dewasa">().notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const events = pgTable("events", {
  id: text("id").primaryKey(),
  title: text("title").notNull(),
  date: text("date").notNull(),
  time: text("time").notNull(),
  location: text("location").notNull(),
  description: text("description"),
  theme: text("theme").$type<"anak" | "remaja" | "dewasa">().notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});
