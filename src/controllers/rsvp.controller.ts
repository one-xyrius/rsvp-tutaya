// src/controllers/rsvp.controller.ts
import { NextResponse } from "next/server";
import { z } from "zod";
import { rsvpSchema, eventSchema } from "@/types/schemas";
import { rsvpService } from "@/services/rsvp.service";
import { eventService } from "@/services/event.service";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const theme = searchParams.get("theme") as "anak" | "remaja" | "dewasa";

  try {
    const event = await eventService.getEventByTheme(theme);
    return NextResponse.json(event);
  } catch (error) {
    return NextResponse.json(
      { error: "Event not found" },
      { status: 404 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const result = rsvpSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { errors: result.error.errors },
        { status: 400 }
      );
    }

    const rsvp = await rsvpService.createRSVP(result.data);
    return NextResponse.json(rsvp, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create RSVP" },
      { status: 500 }
    );
  }
}
