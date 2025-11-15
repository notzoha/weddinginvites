// app/api/rsvp/route.ts
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();

    // Very light validation for now
    if (!data.name || !data.attending || !data.guests) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Proof of concept: log to server console
    console.log("New RSVP:", data);

    // TODO: replace with saving to a real DB (Supabase/Prisma/etc.)
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("RSVP API error:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
