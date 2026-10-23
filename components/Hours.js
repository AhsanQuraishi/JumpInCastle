"use client";

import { useEffect, useState } from "react";
import { hours, weekSchedule, MAPS_HREF, waLink } from "@/data/siteData";
import { getKarachiNow, fmtHour } from "@/lib/schedule";

const WHATSAPP_HREF = waLink("Hi Jump In Castle! I'd like to know more.");

function computeStatus() {
  const { day, hNow } = getKarachiNow();
  const today = weekSchedule[day];
  const isOpen = hNow >= today.open && hNow < today.close;
  const mins = Math.round((today.close - hNow) * 60);

  let sub;
  if (isOpen) {
    sub = mins > 0 && mins <= 60 ? `CLOSES IN ${mins} MIN` : `CLOSES AT ${fmtHour(today.close)}`;
  } else if (hNow < today.open) {
    sub = `OPENS AT ${fmtHour(today.open)} TODAY`;
  } else {
    const tomorrow = weekSchedule[(day + 1) % 7];
    sub = `OPENS ${tomorrow.day} AT ${fmtHour(tomorrow.open)}`;
  }

  return { label: isOpen ? "OPEN NOW" : "CLOSED", color: isOpen ? "#4ADE80" : "#FB7185", sub };
}

export default function Hours() {
  const [status, setStatus] = useState(null);

  useEffect(() => {
    setStatus(computeStatus());
    const id = setInterval(() => setStatus(computeStatus()), 60000);
    return () => clearInterval(id);
  }, []);

  return (
    <section
      id="hours"
      style={{
        background: "#0a0f1e",
        backgroundImage: "radial-gradient(rgba(255,255,255,.05) 1px, transparent 1px)",
        backgroundSize: "26px 26px",
        padding: "0px clamp(24px,5vw,72px) clamp(60px,6vw,88px)",
      }}
    >
      <div style={{ maxWidth: 1440, margin: "0 auto" }}>
        <div
          role="status"
          style={{
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            gap: 14,
            paddingBottom: 32,
            borderBottom: "1px solid #1c2740",
            marginBottom: "clamp(32px,4vw,48px)",
          }}
        >
          <span
            aria-hidden="true"
            className="jic-hours-dot"
            style={{
              width: 9,
              height: 9,
              borderRadius: "50%",
              background: status ? status.color : "#5f6a7d",
            }}
          />
          <span
            style={{
              fontFamily: "var(--font-jetbrains-mono)",
              fontSize: 12.5,
              fontWeight: 700,
              letterSpacing: ".2em",
              color: status ? status.color : "#5f6a7d",
            }}
          >
            {status ? status.label : "—"}
          </span>
          {status && (
            <span style={{ fontFamily: "var(--font-jetbrains-mono)", fontSize: 12.5, letterSpacing: ".14em", color: "#5f6a7d" }}>
              {status.sub}
            </span>
          )}
        </div>

        <div style={{ display: "flex", flexWrap: "wrap", gap: "clamp(32px,3vw,0px)" }}>
          <div style={{ flex: "1.1 1 300px", minWidth: 280, paddingRight: "clamp(0px,4vw,56px)" }}>
            <div
              style={{
                fontFamily: "var(--font-jetbrains-mono)",
                fontSize: 12,
                fontWeight: 700,
                letterSpacing: ".28em",
                color: "#22D3EE",
                marginBottom: 26,
              }}
            >
              OPENING HOURS
            </div>
            {hours.map((h) => (
              <div key={h.day} style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", gap: 20, padding: "11px 0" }}>
                <span style={{ fontFamily: "var(--font-space-grotesk)", fontWeight: 600, fontSize: 16, color: "#c4ccd9" }}>{h.day}</span>
                <span style={{ fontFamily: "var(--font-jetbrains-mono)", fontSize: 13.5, fontWeight: 700, color: h.accent }}>{h.time}</span>
              </div>
            ))}
          </div>

          <div
            className="jic-hours-col"
            style={{ flex: "1 1 300px", minWidth: 280, padding: "0 clamp(0px,4vw,56px)", borderLeft: "1px solid #1c2740" }}
          >
            <div
              style={{
                fontFamily: "var(--font-jetbrains-mono)",
                fontSize: 12,
                fontWeight: 700,
                letterSpacing: ".28em",
                color: "#FF3D8B",
                marginBottom: 26,
              }}
            >
              FIND US
            </div>
            <h3
              style={{
                margin: "0 0 14px",
                fontFamily: "var(--font-archivo-black)",
                fontSize: "clamp(26px,2.4vw,30px)",
                lineHeight: 1.05,
                color: "#fff",
                textTransform: "uppercase",
              }}
            >
              Multan, Pakistan
            </h3>
            <p style={{ margin: 0, fontSize: 15, lineHeight: 1.6, color: "#8b94a6", textWrap: "pretty" }}>
              Add your exact mall / street address here. Free parking on-site. Walk-ins welcome, booking recommended
              on weekends.
            </p>
          </div>

          <div
            className="jic-hours-col"
            style={{
              flex: "1 1 260px",
              minWidth: 250,
              paddingLeft: "clamp(0px,4vw,56px)",
              borderLeft: "1px solid #1c2740",
              display: "flex",
              flexDirection: "column",
              gap: 20,
            }}
          >
            <div style={{ fontFamily: "var(--font-jetbrains-mono)", fontSize: 12, fontWeight: 700, letterSpacing: ".28em", color: "#4ADE80" }}>
              GET HERE
            </div>
            <a
              href={MAPS_HREF}
              target="_blank"
              rel="noopener noreferrer"
              className="jic-hours-btn jic-hours-primary-btn jic-confetti-trigger"
              style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: 12,
                padding: "17px 24px",
                borderRadius: 999,
                background: "#fff",
                color: "#0a0f1e",
                fontFamily: "var(--font-space-grotesk)",
                fontWeight: 700,
                fontSize: 16,
                textDecoration: "none",
                transition: "background .15s ease",
              }}
            >
              Get Directions →
            </a>
            <a
              href={WHATSAPP_HREF}
              target="_blank"
              rel="noopener noreferrer"
              className="jic-hours-btn jic-hours-secondary-btn jic-confetti-trigger"
              style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: 12,
                padding: "16px 24px",
                borderRadius: 999,
                border: "1px solid #26314a",
                color: "#c4ccd9",
                fontFamily: "var(--font-space-grotesk)",
                fontWeight: 700,
                fontSize: 16,
                textDecoration: "none",
                transition: "border-color .15s ease, color .15s ease",
              }}
            >
              WhatsApp us →
            </a>
            <span style={{ fontFamily: "var(--font-jetbrains-mono)", fontSize: 11.5, letterSpacing: ".14em", color: "#5f6a7d", lineHeight: 1.7 }}>
              FREE PARKING ON-SITE
              <br />
              WALK-INS WELCOME
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
