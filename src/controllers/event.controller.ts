// src/controllers/event.controller.ts
import { NextResponse } from "next/server";
import { eventSchema } from "@/types/schemas";
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
    const result = eventSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { errors: result.error.errors },
        { status: 400 }
      );
    }

    const event = await eventService.createEvent(result.data);
    return NextResponse.json(event, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create event" },
      { status: 500 }
    );
  }
}
