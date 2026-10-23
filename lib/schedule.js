// Venue runs on Asia/Karachi time regardless of the visitor's own clock.
export function getKarachiNow() {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: "Asia/Karachi",
    weekday: "short",
    hour: "numeric",
    minute: "numeric",
    hour12: false,
  }).formatToParts(new Date());
  const map = {};
  for (const p of parts) map[p.type] = p.value;
  const weekdayIndex = { Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6 };
  const hour = Number(map.hour) % 24;
  const minute = Number(map.minute);
  return { day: weekdayIndex[map.weekday], hNow: hour + minute / 60 };
}

export function fmtHour(h) {
  const n = ((h % 24) + 24) % 24;
  const ampm = n >= 12 ? "PM" : "AM";
  const hr = n % 12 === 0 ? 12 : n % 12;
  return `${hr} ${ampm}`;
}
