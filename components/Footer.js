"use client";

import { useEffect, useState } from "react";
import { BOOK_HREF, waLink, weekSchedule, WHATSAPP_NUMBER } from "@/data/siteData";
import { getKarachiNow, fmtHour } from "@/lib/schedule";

const WHATSAPP_HREF = waLink("Hi Jump In Castle! I'd like to know more.");
const CALL_HREF = `tel:+${WHATSAPP_NUMBER}`;

const COLUMNS = [
  {
    label: "Visit",
    color: "#FF3D8B",
    links: [
      { label: "Attractions", href: "/#attractions" },
      { label: "Parties", href: "/#parties" },
      { label: "Pricing", href: "/#parties" },
      { label: "Opening hours", href: "/#hours" },
    ],
  },
  {
    label: "Follow",
    color: "#22D3EE",
    links: [
      { label: "Instagram", href: "#", external: true },
      { label: "Facebook", href: "#", external: true },
      { label: "TikTok", href: "#", external: true },
    ],
  },
  {
    label: "Talk To Us",
    color: "#4ADE80",
    links: [
      { label: "WhatsApp", href: WHATSAPP_HREF, external: true },
      { label: "Call us", href: CALL_HREF },
      { label: "Find us", href: "/#hours" },
    ],
  },
];

function LinkItem({ link }) {
  const props = link.external ? { target: "_blank", rel: "noopener noreferrer" } : {};
  return (
    <a href={link.href} className="jic-footer-link" {...props}>
      {link.label}
    </a>
  );
}

export default function Footer() {
  const [meta, setMeta] = useState(null);

  useEffect(() => {
    const { day } = getKarachiNow();
    const today = weekSchedule[day];
    setMeta({
      hoursLine: `OPEN TODAY ${fmtHour(today.open)} – ${fmtHour(today.close)} · MULTAN, PAKISTAN`,
      year: new Date().getFullYear(),
    });
  }, []);

  return (
    <footer style={{ position: "relative" }}>
      <div
        style={{
          position: "relative",
          overflow: "hidden",
          background: "#0d1120",
          padding: "clamp(64px,8vw,104px) clamp(24px,5vw,72px) clamp(56px,6vw,80px)",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            pointerEvents: "none",
            background:
              "radial-gradient(120% 130% at 22% 0%, rgba(255,61,139,.16) 0%, rgba(168,85,247,.08) 38%, transparent 68%)",
          }}
        />

        <div style={{ position: "relative", maxWidth: 1440, margin: "0 auto", display: "flex", flexWrap: "wrap", gap: "clamp(40px,5vw,72px)" }}>
          <div style={{ flex: "1.25 1 420px", minWidth: 300 }}>
            <h2
              style={{
                margin: "0 0 32px",
                fontFamily: "var(--font-archivo-black)",
                fontSize: "clamp(48px,6vw,82px)",
                lineHeight: 0.88,
                letterSpacing: "-.025em",
                color: "#fff",
                textTransform: "uppercase",
              }}
            >
              Ready To
              <br />
              Jump In?
            </h2>
            <a
              href={BOOK_HREF}
              target="_blank"
              rel="noopener noreferrer"
              className="jic-footer-cta jic-confetti-trigger"
              style={{
                display: "inline-block",
                fontFamily: "var(--font-space-grotesk)",
                fontWeight: 700,
                fontSize: 18,
                padding: "19px 38px",
                borderRadius: 999,
                background: "linear-gradient(90deg,#FF3D8B,#A855F7)",
                color: "#fff",
                whiteSpace: "nowrap",
                textDecoration: "none",
                transition: "filter .15s ease",
              }}
            >
              Book Your Session
            </a>
            <div
              style={{
                marginTop: 22,
                fontFamily: "var(--font-jetbrains-mono)",
                fontSize: 12,
                letterSpacing: ".14em",
                color: "#5f6a7d",
              }}
            >
              {meta ? meta.hoursLine : "MULTAN, PAKISTAN"}
            </div>
          </div>

          <div className="jic-footer-columns" style={{ flex: "1 1 440px", minWidth: 280, display: "grid", gridTemplateColumns: "repeat(3, minmax(120px,1fr))", gap: 32 }}>
            {COLUMNS.map((col) => (
              <nav key={col.label} aria-label={col.label}>
                <h3
                  style={{
                    margin: "0 0 14px",
                    fontFamily: "var(--font-jetbrains-mono)",
                    fontSize: 11,
                    fontWeight: 700,
                    letterSpacing: ".2em",
                    textTransform: "uppercase",
                    color: col.color,
                  }}
                >
                  {col.label}
                </h3>
                <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: 14 }}>
                  {col.links.map((link) => (
                    <li key={link.label}>
                      <LinkItem link={link} />
                    </li>
                  ))}
                </ul>
              </nav>
            ))}
          </div>
        </div>
      </div>

      <div style={{ borderTop: "1px solid #1a2338", background: "#0a0e1a" }}>
        <div
          style={{
            maxWidth: 1440,
            margin: "0 auto",
            padding: "26px clamp(24px,5vw,72px)",
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 20,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 13 }}>
            <div
              style={{
                width: 34,
                height: 34,
                borderRadius: 9,
                background: "linear-gradient(135deg,#FF3D8B,#A855F7)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontFamily: "var(--font-archivo-black)",
                fontSize: 17,
                color: "#fff",
                flexShrink: 0,
              }}
            >
              J
            </div>
            <span style={{ fontFamily: "var(--font-archivo-black)", fontSize: 16, letterSpacing: ".02em", textTransform: "uppercase", color: "#fff" }}>
              Jump In Castle
            </span>
          </div>
          <div style={{ fontFamily: "var(--font-jetbrains-mono)", fontSize: 12, letterSpacing: ".06em", color: "#5f6a7d" }}>
            {meta ? `Multan, Pakistan · © ${meta.year} Jump In Castle. All rights reserved.` : "Multan, Pakistan · Jump In Castle. All rights reserved."}
          </div>
        </div>
      </div>
    </footer>
  );
}
