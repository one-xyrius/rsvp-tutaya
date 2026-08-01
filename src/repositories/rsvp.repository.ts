// src/repositories/rsvp.repository.ts
import { db } from "@/db";
import { rsvps } from "@/db/schema";
import { eq } from "drizzle-orm";
import { RSVP } from "@/types/schemas";

export const rsvpRepository = {
  async create(data: RSVP) {
    const [rsvp] = await db.insert(rsvps).values(data).returning();
    return rsvp;
  },

  async findByTheme(theme: string) {
    return await db.select().from(rsvps).where(eq(rsvps.theme, theme));
  },
};
