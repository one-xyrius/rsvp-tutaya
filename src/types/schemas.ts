// src/types/schemas.ts
import { z } from "zod";

export const rsvpSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email"),
  attending: z.enum(["yes", "no"]),
  guests: z.number().int().min(0, "Guests must be 0 or more"),
  message: z.string().max(500, "Message too long").optional(),
  theme: z.enum(["anak", "remaja", "dewasa"]),
});

export const eventSchema = z.object({
  title: z.string().min(1, "Title is required"),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Invalid date format (YYYY-MM-DD)"),
  time: z.string().regex(/^\d{2}:\d{2}$/, "Invalid time format (HH:MM)"),
  location: z.string().min(1, "Location is required"),
  description: z.string().max(1000, "Description too long").optional(),
  theme: z.enum(["anak", "remaja", "dewasa"]),
});

export type RSVP = z.infer<typeof rsvpSchema>;
export type Event = z.infer<typeof eventSchema>;
