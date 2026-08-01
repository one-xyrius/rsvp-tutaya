// src/repositories/event.repository.ts
import { db } from "@/db";
import { events } from "@/db/schema";
import { eq } from "drizzle-orm";
import { Event } from "@/types/schemas";

export const eventRepository = {
  async create(data: Event) {
    const [event] = await db.insert(events).values(data).returning();
    return event;
  },

  async findByTheme(theme: string) {
    const [event] = await db.select().from(events).where(eq(events.theme, theme)).limit(1);
    return event;
  },
};
