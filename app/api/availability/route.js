import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabaseAdmin";
import { DAILY_SLOTS, SLOT_CAPACITY } from "@/data/slots";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const date = searchParams.get("date");

  if (!date) {
    return NextResponse.json({ error: "date is required" }, { status: 400 });
  }

  const { data, error } = await supabaseAdmin
    .from("bookings")
    .select("slot_time, party_size")
    .eq("booking_date", date)
    .eq("status", "confirmed");

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  const bookedBySlot = {};
  for (const row of data) {
    bookedBySlot[row.slot_time] = (bookedBySlot[row.slot_time] || 0) + row.party_size;
  }

  const slots = DAILY_SLOTS.map((slot) => ({
    ...slot,
    remaining: Math.max(0, SLOT_CAPACITY - (bookedBySlot[slot.time] || 0)),
  }));

  return NextResponse.json({ slots });
}
