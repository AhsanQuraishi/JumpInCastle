"use client";

import { useEffect, useMemo, useState } from "react";

const WEEKDAY_LABELS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const MONTH_LABELS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

function todayISO() {
  const d = new Date();
  d.setMinutes(d.getMinutes() - d.getTimezoneOffset());
  return d.toISOString().slice(0, 10);
}

function pad(n) {
  return String(n).padStart(2, "0");
}

function dateKey(year, month, day) {
  return `${year}-${pad(month + 1)}-${pad(day)}`;
}

function buildMonthGrid(year, month) {
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const startWeekday = new Date(year, month, 1).getDay();
  const cells = [];
  for (let i = 0; i < startWeekday; i += 1) cells.push(null);
  for (let day = 1; day <= daysInMonth; day += 1) cells.push(day);
  while (cells.length % 7 !== 0) cells.push(null);
  return cells;
}

const thStyle = {
  padding: "10px 12px",
  textAlign: "left",
  color: "rgba(255,255,255,.5)",
  textTransform: "uppercase",
  fontSize: 11,
  letterSpacing: 1,
};
const tdStyle = { padding: "10px 12px" };
const navBtnStyle = {
  width: 38,
  height: 38,
  borderRadius: 12,
  background: "rgba(255,255,255,.06)",
  border: "1px solid rgba(255,255,255,.16)",
  color: "#fff",
  fontSize: 18,
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

export default function AdminBookingsClient() {
  const today = todayISO();
  const [allBookings, setAllBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [viewYear, setViewYear] = useState(Number(today.slice(0, 4)));
  const [viewMonth, setViewMonth] = useState(Number(today.slice(5, 7)) - 1);
  const [selectedDate, setSelectedDate] = useState(today);

  const load = async () => {
    setLoading(true);
    const res = await fetch("/api/admin/bookings");
    const data = await res.json();
    setAllBookings(data.bookings || []);
    setLoading(false);
  };

  useEffect(() => {
    load();
  }, []);

  const countsByDate = useMemo(() => {
    const map = {};
    for (const b of allBookings) {
      if (b.status === "cancelled") continue;
      map[b.booking_date] = (map[b.booking_date] || 0) + 1;
    }
    return map;
  }, [allBookings]);

  const cells = useMemo(() => buildMonthGrid(viewYear, viewMonth), [viewYear, viewMonth]);

  const selectedBookings = useMemo(
    () => allBookings.filter((b) => b.booking_date === selectedDate),
    [allBookings, selectedDate]
  );

  const goMonth = (delta) => {
    let m = viewMonth + delta;
    let y = viewYear;
    if (m < 0) {
      m = 11;
      y -= 1;
    } else if (m > 11) {
      m = 0;
      y += 1;
    }
    setViewMonth(m);
    setViewYear(y);
  };

  const cancelBooking = async (id) => {
    await fetch(`/api/admin/bookings/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: "cancelled" }),
    });
    load();
  };

  const deleteBooking = async (id) => {
    if (!confirm("Delete this booking permanently?")) return;
    await fetch(`/api/admin/bookings/${id}`, { method: "DELETE" });
    load();
  };

  const logout = async () => {
    await fetch("/api/admin/logout", { method: "POST" });
    window.location.href = "/admin/login";
  };

  return (
    <div style={{ minHeight: "100vh", background: "#0A0E1A", padding: "40px 24px", color: "#fff" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 28,
            flexWrap: "wrap",
            gap: 12,
          }}
        >
          <div style={{ fontFamily: "var(--font-archivo-black)", fontSize: 26, textTransform: "uppercase" }}>
            Bookings
          </div>
          <button
            onClick={logout}
            style={{
              padding: "9px 16px",
              borderRadius: 999,
              background: "rgba(255,255,255,.08)",
              color: "#fff",
              border: "1px solid rgba(255,255,255,.16)",
              fontSize: 13,
              cursor: "pointer",
            }}
          >
            Log out
          </button>
        </div>

        <div
          style={{
            background: "#10152B",
            border: "1px solid rgba(255,255,255,.12)",
            borderRadius: 24,
            padding: "24px 28px",
            marginBottom: 32,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 22 }}>
            <button onClick={() => goMonth(-1)} style={navBtnStyle} aria-label="Previous month">‹</button>
            <div style={{ fontFamily: "var(--font-archivo-black)", fontSize: 22, textTransform: "uppercase" }}>
              {MONTH_LABELS[viewMonth]} {viewYear}
            </div>
            <button onClick={() => goMonth(1)} style={navBtnStyle} aria-label="Next month">›</button>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(7,1fr)", gap: 8, marginBottom: 8 }}>
            {WEEKDAY_LABELS.map((w) => (
              <div
                key={w}
                style={{
                  textAlign: "center",
                  fontSize: 11,
                  letterSpacing: 1,
                  textTransform: "uppercase",
                  color: "rgba(255,255,255,.4)",
                  padding: "4px 0",
                }}
              >
                {w}
              </div>
            ))}
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(7,1fr)", gap: 8 }}>
            {cells.map((day, i) => {
              if (day === null) return <div key={i} />;
              const key = dateKey(viewYear, viewMonth, day);
              const count = countsByDate[key] || 0;
              const isToday = key === today;
              const isSelected = key === selectedDate;
              return (
                <button
                  key={i}
                  type="button"
                  onClick={() => setSelectedDate(key)}
                  style={{
                    minHeight: 92,
                    borderRadius: 16,
                    padding: 10,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-start",
                    justifyContent: "space-between",
                    cursor: "pointer",
                    background: isSelected ? "#22d3ee" : count > 0 ? "rgba(34,211,238,.12)" : "rgba(255,255,255,.03)",
                    border: isToday ? "1.5px solid #ff3f8e" : "1px solid rgba(255,255,255,.08)",
                    color: isSelected ? "#0A0E1A" : "#fff",
                    transition: "background .15s ease, border-color .15s ease",
                  }}
                >
                  <span style={{ fontSize: 14, fontWeight: 700 }}>{day}</span>
                  {count > 0 && (
                    <span
                      style={{
                        fontSize: 12,
                        fontWeight: 700,
                        padding: "2px 8px",
                        borderRadius: 999,
                        alignSelf: "flex-end",
                        background: isSelected ? "#0A0E1A" : "#22d3ee",
                        color: isSelected ? "#22d3ee" : "#0A0E1A",
                      }}
                    >
                      {count}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        <div style={{ fontSize: 15, fontWeight: 700, marginBottom: 14 }}>
          {selectedDate}
          {selectedBookings.length > 0
            ? ` · ${selectedBookings.length} booking${selectedBookings.length > 1 ? "s" : ""}`
            : ""}
        </div>

        {loading ? (
          <div style={{ color: "rgba(255,255,255,.5)" }}>Loading…</div>
        ) : selectedBookings.length === 0 ? (
          <div style={{ color: "rgba(255,255,255,.5)" }}>No bookings for this date.</div>
        ) : (
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13.5 }}>
              <thead>
                <tr>
                  <th style={thStyle}>Time</th>
                  <th style={thStyle}>Name</th>
                  <th style={thStyle}>Phone</th>
                  <th style={thStyle}>Size</th>
                  <th style={thStyle}>Type</th>
                  <th style={thStyle}>Status</th>
                  <th style={thStyle}></th>
                </tr>
              </thead>
              <tbody>
                {selectedBookings.map((b) => (
                  <tr key={b.id} style={{ borderTop: "1px solid rgba(255,255,255,.08)" }}>
                    <td style={tdStyle}>{b.slot_time}</td>
                    <td style={tdStyle}>{b.customer_name}</td>
                    <td style={tdStyle}>{b.phone}</td>
                    <td style={tdStyle}>{b.party_size}</td>
                    <td style={tdStyle}>{b.booking_type}</td>
                    <td style={tdStyle}>
                      <span style={{ color: b.status === "confirmed" ? "#a3ff4d" : "#ff3f8e" }}>{b.status}</span>
                    </td>
                    <td style={{ ...tdStyle, display: "flex", gap: 8 }}>
                      {b.status === "confirmed" && (
                        <button
                          onClick={() => cancelBooking(b.id)}
                          style={{
                            padding: "6px 12px",
                            borderRadius: 999,
                            background: "rgba(255,63,142,.15)",
                            color: "#ff3f8e",
                            border: "1px solid #ff3f8e55",
                            fontSize: 12,
                            cursor: "pointer",
                          }}
                        >
                          Cancel
                        </button>
                      )}
                      <button
                        onClick={() => deleteBooking(b.id)}
                        style={{
                          padding: "6px 12px",
                          borderRadius: 999,
                          background: "rgba(255,255,255,.06)",
                          color: "rgba(255,255,255,.7)",
                          border: "1px solid rgba(255,255,255,.16)",
                          fontSize: 12,
                          cursor: "pointer",
                        }}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
