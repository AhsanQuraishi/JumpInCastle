"use client";

import { useEffect, useState } from "react";

const ACCENT = "#22d3ee";

function todayISO() {
  const d = new Date();
  d.setMinutes(d.getMinutes() - d.getTimezoneOffset());
  return d.toISOString().slice(0, 10);
}

const fieldStyle = {
  width: "100%",
  padding: "12px 14px",
  borderRadius: 12,
  background: "rgba(255,255,255,.05)",
  border: "1px solid rgba(255,255,255,.16)",
  color: "#fff",
  fontSize: 14,
  outline: "none",
};

const labelStyle = {
  display: "block",
  fontSize: 12,
  letterSpacing: 1,
  textTransform: "uppercase",
  color: "rgba(255,255,255,.5)",
  marginBottom: 8,
};

export default function BookingForm() {
  const [date, setDate] = useState(todayISO());
  const [slots, setSlots] = useState([]);
  const [slotTime, setSlotTime] = useState("");
  const [loadingSlots, setLoadingSlots] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [partySize, setPartySize] = useState(2);
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState(null);

  useEffect(() => {
    let cancelled = false;
    setLoadingSlots(true);
    setSlotTime("");
    fetch(`/api/availability?date=${date}`)
      .then((r) => r.json())
      .then((data) => {
        if (cancelled) return;
        setSlots(data.slots || []);
      })
      .catch(() => !cancelled && setSlots([]))
      .finally(() => !cancelled && setLoadingSlots(false));
    return () => {
      cancelled = true;
    };
  }, [date]);

  const submit = async (e) => {
    e.preventDefault();
    if (!slotTime) return;
    setSubmitting(true);
    setResult(null);
    try {
      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ date, slotTime, name, phone, partySize, type: "general" }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Booking failed");
      setResult({ ok: true, message: `Booked for ${date} at ${slotTime}. See you soon!` });
      setName("");
      setPhone("");
      setPartySize(2);
      setSlotTime("");
    } catch (err) {
      setResult({ ok: false, message: err.message });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={submit}
      style={{
        maxWidth: 560,
        margin: "0 auto",
        padding: "32px 28px",
        borderRadius: 24,
        background: "#10152B",
        border: `1.5px solid ${ACCENT}55`,
        boxShadow: `0 0 0 1px ${ACCENT}22, 0 0 34px ${ACCENT}33`,
        display: "flex",
        flexDirection: "column",
        gap: 22,
      }}
    >
      <div>
        <label style={labelStyle} htmlFor="jic-book-date">Date</label>
        <input
          id="jic-book-date"
          type="date"
          min={todayISO()}
          value={date}
          onChange={(e) => setDate(e.target.value)}
          style={fieldStyle}
          required
        />
      </div>

      <div>
        <label style={labelStyle}>Time slot</label>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
          {loadingSlots && <span style={{ color: "rgba(255,255,255,.5)", fontSize: 13 }}>Loading slots…</span>}
          {!loadingSlots &&
            slots.map((slot) => {
              const full = slot.remaining <= 0;
              const selected = slotTime === slot.time;
              return (
                <button
                  key={slot.time}
                  type="button"
                  disabled={full}
                  onClick={() => setSlotTime(slot.time)}
                  style={{
                    padding: "9px 14px",
                    borderRadius: 999,
                    fontSize: 12.5,
                    fontWeight: 600,
                    cursor: full ? "not-allowed" : "pointer",
                    color: full ? "rgba(255,255,255,.35)" : selected ? "#0A0E1A" : "#fff",
                    background: full ? "rgba(255,255,255,.04)" : selected ? ACCENT : "rgba(255,255,255,.06)",
                    border: `1px solid ${full ? "rgba(255,255,255,.1)" : selected ? ACCENT : "rgba(255,255,255,.16)"}`,
                  }}
                >
                  {slot.label} {full ? "· Full" : `· ${slot.remaining} left`}
                </button>
              );
            })}
        </div>
      </div>

      <div>
        <label style={labelStyle} htmlFor="jic-book-name">Full name</label>
        <input id="jic-book-name" type="text" value={name} onChange={(e) => setName(e.target.value)} style={fieldStyle} required />
      </div>

      <div>
        <label style={labelStyle} htmlFor="jic-book-phone">Phone</label>
        <input id="jic-book-phone" type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} style={fieldStyle} required />
      </div>

      <div>
        <label style={labelStyle} htmlFor="jic-book-size">Party size</label>
        <input
          id="jic-book-size"
          type="number"
          min={1}
          max={40}
          value={partySize}
          onChange={(e) => setPartySize(e.target.value)}
          style={fieldStyle}
          required
        />
      </div>

      {result && (
        <div
          style={{
            padding: "12px 14px",
            borderRadius: 12,
            fontSize: 13.5,
            background: result.ok ? "rgba(163,255,77,.12)" : "rgba(255,63,142,.12)",
            border: `1px solid ${result.ok ? "#a3ff4d" : "#ff3f8e"}55`,
            color: result.ok ? "#a3ff4d" : "#ff3f8e",
          }}
        >
          {result.message}
        </div>
      )}

      <button
        type="submit"
        disabled={submitting || !slotTime}
        className="jic-btn-brutal jic-confetti-trigger"
        style={{
          background: !slotTime ? "rgba(255,255,255,.08)" : ACCENT,
          color: !slotTime ? "rgba(255,255,255,.4)" : "#0A0E1A",
          fontWeight: 700,
          padding: "15px 32px",
          borderRadius: 999,
          fontSize: 15,
          border: "none",
          cursor: !slotTime || submitting ? "not-allowed" : "pointer",
        }}
      >
        {submitting ? "Booking…" : "Confirm Booking"}
      </button>
    </form>
  );
}
