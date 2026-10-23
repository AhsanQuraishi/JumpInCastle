import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabaseAdmin";
import { getIsAdmin } from "@/lib/adminAuth";

export async function GET(request) {
  if (!getIsAdmin()) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const from = searchParams.get("from");

  let query = supabaseAdmin
    .from("bookings")
    .select("*")
    .order("booking_date", { ascending: true })
    .order("slot_time", { ascending: true });

  if (from) {
    query = query.gte("booking_date", from);
  }

  const { data, error } = await query;
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ bookings: data });
}
