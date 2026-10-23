import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabaseAdmin";
import { DAILY_SLOTS, SLOT_CAPACITY } from "@/data/slots";

export async function POST(request) {
  const body = await request.json();
  const { date, slotTime, name, phone, email, partySize, type, packageName, addons, totalPrice } = body;

  if (!date || !slotTime || !name || !phone || !partySize) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }
  if (!DAILY_SLOTS.some((s) => s.time === slotTime)) {
    return NextResponse.json({ error: "Invalid slot" }, { status: 400 });
  }
  const size = Number(partySize);
  if (!Number.isFinite(size) || size <= 0) {
    return NextResponse.json({ error: "Invalid party size" }, { status: 400 });
  }
  const bookingDate = new Date(`${date}T00:00:00`);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  if (Number.isNaN(bookingDate.getTime()) || bookingDate < today) {
    return NextResponse.json({ error: "Invalid date" }, { status: 400 });
  }

  const { data: existing, error: fetchError } = await supabaseAdmin
    .from("bookings")
    .select("party_size")
    .eq("booking_date", date)
    .eq("slot_time", slotTime)
    .eq("status", "confirmed");

  if (fetchError) {
    return NextResponse.json({ error: fetchError.message }, { status: 500 });
  }

  const alreadyBooked = existing.reduce((sum, row) => sum + row.party_size, 0);
  if (alreadyBooked + size > SLOT_CAPACITY) {
    return NextResponse.json({ error: "This slot doesn't have enough spots left." }, { status: 409 });
  }

  const { data, error } = await supabaseAdmin
    .from("bookings")
    .insert({
      booking_date: date,
      slot_time: slotTime,
      customer_name: name,
      phone,
      email: email || null,
      party_size: size,
      booking_type: type === "party" ? "party" : "general",
      package_name: packageName || null,
      addons: addons || null,
      total_price: totalPrice || null,
    })
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ booking: data }, { status: 201 });
}
