// General-admission time slots offered every open day. Adjust freely —
// the booking API and availability check both read from this list.
export const DAILY_SLOTS = [
  { time: "12:00", label: "12:00 PM" },
  { time: "14:00", label: "2:00 PM" },
  { time: "16:00", label: "4:00 PM" },
  { time: "18:00", label: "6:00 PM" },
  { time: "20:00", label: "8:00 PM" },
];

// Max people allowed per slot across all bookings.
export const SLOT_CAPACITY = 40;
