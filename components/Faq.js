"use client";

import { useState } from "react";
import { faqData } from "@/data/siteData";

const ACCENTS = ["#ff3f8e", "#22d3ee", "#a3ff4d", "#ff9433", "#b47aff", "#ffee00"];

export default function Faq() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section id="faq" style={{ padding: "0 40px 100px" }}>
      <div style={{ maxWidth: 820, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 40 }}>
          <div style={{ fontSize: 13, letterSpacing: 3, textTransform: "uppercase", color: "#a3ff4d", marginBottom: 12 }}>
            Good To Know
          </div>
          <h2 style={{ fontFamily: "var(--font-archivo-black)", fontSize: "clamp(30px,4vw,48px)", textTransform: "uppercase", lineHeight: 1 }}>
            FAQ
          </h2>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {faqData.map((q, i) => {
            const isOpen = openIndex === i;
            const accent = ACCENTS[i % ACCENTS.length];
            return (
              <div
                key={q.question}
                data-reveal=""
                className="jic-brutal jic-shine-hover"
                style={{
                  "--brutal-shadow": accent,
                  "--rot": i % 2 === 0 ? "-0.6deg" : "0.6deg",
                  borderRadius: 18,
                  background: "#10152B",
                  overflow: "hidden",
                }}
              >
                <div
                  onClick={() => setOpenIndex(isOpen ? -1 : i)}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    gap: 16,
                    padding: "20px 24px",
                    cursor: "pointer",
                  }}
                >
                  <span style={{ display: "flex", alignItems: "center", gap: 10, fontWeight: 700, fontSize: 16 }}>
                    <span style={{ width: 8, height: 8, borderRadius: "50%", background: accent, flexShrink: 0 }} />
                    {q.question}
                  </span>
                  <span
                    style={{
                      fontFamily: "var(--font-archivo-black)",
                      fontSize: 22,
                      color: accent,
                      flexShrink: 0,
                      display: "inline-block",
                      transition: "transform .3s cubic-bezier(.34,1.56,.64,1)",
                      transform: isOpen ? "rotate(45deg) scale(1.2)" : "rotate(0deg) scale(1)",
                    }}
                  >
                    +
                  </span>
                </div>
                {isOpen && (
                  <div style={{ padding: "0 24px 22px", color: "rgba(255,255,255,.66)", fontSize: 15, lineHeight: 1.6 }}>
                    {q.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
