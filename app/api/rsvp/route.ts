// app/api/rsvp/route.ts
import { NextRequest, NextResponse } from "next/server";

type RsvpPayload = {
  partyName: string;
  email?: string;
  phone?: string;
  attending: "yes" | "no" | "maybe";
  guestCount: number;
  guestNames: string[];
  dietary?: string;
  notes?: string;
};

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as RsvpPayload;

    if (!body.partyName || !body.attending) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    if (body.attending !== "no") {
      if (body.guestCount < 1 || body.guestCount > 10) {
        return NextResponse.json(
          { error: "Guest count must be between 1 and 10" },
          { status: 400 }
        );
      }

      if (
        !Array.isArray(body.guestNames) ||
        body.guestNames.length !== body.guestCount
      ) {
        return NextResponse.json(
          { error: "Guest names must match guest count" },
          { status: 400 }
        );
      }
    }

    console.log("New party RSVP:", body);

    // TODO: save to database instead of just logging
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("RSVP API error:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
