"use client";

import { useEffect, useState } from "react";
import { faqData, waLink } from "@/data/siteData";

const CTA_HREF = waLink("Hi Jump In Castle! I have a question about my visit.");

export default function Faq() {
  const [openIndex, setOpenIndex] = useState(0);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mq.matches);
    const onChange = (e) => setReducedMotion(e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  const toggle = (i) => setOpenIndex((cur) => (cur === i ? -1 : i));

  return (
    <section
      id="faq"
      style={{
        background: "#0a0f1e",
        backgroundImage: "radial-gradient(rgba(255,255,255,.05) 1px, transparent 1px)",
        backgroundSize: "26px 26px",
        padding: "clamp(64px,7vw,104px) clamp(24px,5vw,72px) clamp(72px,8vw,120px)",
      }}
    >
      <div
        style={{
          maxWidth: 1440,
          margin: "0 auto",
          display: "flex",
          flexWrap: "wrap",
          gap: "clamp(36px,4vw,88px)",
          alignItems: "flex-start",
        }}
      >
        <div style={{ flex: "1 1 320px", minWidth: 280, maxWidth: 420, display: "flex", flexDirection: "column", gap: 22 }}>
          <div style={{ marginTop: 40 }}>
            <div
              style={{
                fontFamily: "var(--font-jetbrains-mono)",
                fontSize: 13,
                fontWeight: 700,
                letterSpacing: ".28em",
                color: "#4ADE80",
              }}
            >
              GOOD TO KNOW
            </div>
            <h2
              style={{
                margin: "10px 0 0",
                fontFamily: "var(--font-archivo-black)",
                fontSize: "clamp(56px,6vw,82px)",
                lineHeight: 0.88,
                letterSpacing: "-.02em",
                color: "#fff",
                textTransform: "uppercase",
              }}
            >
              FAQ
            </h2>
          </div>

          <p style={{ margin: 0, fontSize: 16, lineHeight: 1.65, color: "#8b94a6", maxWidth: 320, textWrap: "pretty" }}>
            Everything parents ask before their first visit. If yours is not here, message us and we will answer
            within the hour.
          </p>

          <a
            href={CTA_HREF}
            target="_blank"
            rel="noopener noreferrer"
            className="jic-faq-cta jic-confetti-trigger"
            style={{
              alignSelf: "flex-start",
              marginTop: 8,
              fontFamily: "var(--font-jetbrains-mono)",
              fontSize: 12.5,
              fontWeight: 700,
              letterSpacing: ".12em",
              padding: "15px 24px",
              borderRadius: 999,
              background: "#4ADE80",
              color: "#06120b",
              textDecoration: "none",
              transition: "background .15s ease",
            }}
          >
            ASK ON WHATSAPP →
          </a>
        </div>

        <div style={{ flex: "4 1 460px", minWidth: 0, display: "flex", flexDirection: "column" }}>
          {faqData.map((q, i) => {
            const isOpen = openIndex === i;
            const panelId = `jic-faq-panel-${i}`;
            const buttonId = `jic-faq-button-${i}`;
            return (
              <div key={q.question} style={{ borderTop: "1px solid #1c2740", padding: "28px 0" }}>
                <h3 style={{ margin: 0 }}>
                  <button
                    id={buttonId}
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() => toggle(i)}
                    className="jic-faq-row"
                    style={{
                      width: "100%",
                      display: "flex",
                      alignItems: "center",
                      gap: "clamp(12px,1.6vw,22px)",
                      background: "none",
                      border: "none",
                      padding: 0,
                      margin: 0,
                      cursor: "pointer",
                      textAlign: "left",
                      font: "inherit",
                    }}
                  >
                    <span
                      style={{
                        fontFamily: "var(--font-jetbrains-mono)",
                        fontSize: 12,
                        letterSpacing: ".12em",
                        color: q.accent,
                        flexShrink: 0,
                      }}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span
                      style={{
                        flex: 1,
                        fontFamily: "var(--font-space-grotesk)",
                        fontWeight: 700,
                        fontSize: "clamp(18px,1.6vw,22px)",
                        lineHeight: 1.3,
                        textWrap: "pretty",
                        color: isOpen ? "#ffffff" : "#c4ccd9",
                        transition: reducedMotion ? "none" : "color .25s ease",
                      }}
                    >
                      {q.question}
                    </span>
                    <span
                      aria-hidden="true"
                      style={{
                        fontFamily: "var(--font-jetbrains-mono)",
                        fontSize: 21,
                        color: q.accent,
                        flexShrink: 0,
                        display: "inline-block",
                        transform: isOpen ? "rotate(45deg)" : "rotate(0deg)",
                        transition: reducedMotion ? "none" : "transform .35s cubic-bezier(.22,.7,.2,1)",
                      }}
                    >
                      +
                    </span>
                  </button>
                </h3>

                <div
                  id={panelId}
                  role="region"
                  aria-labelledby={buttonId}
                  style={{
                    display: "grid",
                    gridTemplateRows: isOpen ? "1fr" : "0fr",
                    transition: reducedMotion ? "none" : "grid-template-rows .4s cubic-bezier(.22,.7,.2,1)",
                  }}
                >
                  <div style={{ overflow: "hidden" }}>
                    <p
                      style={{
                        margin: 0,
                        padding: "16px clamp(0px,4vw,64px) 4px clamp(0px,3vw,44px)",
                        fontSize: 16,
                        lineHeight: 1.7,
                        color: "#8b94a6",
                        textWrap: "pretty",
                      }}
                    >
                      {q.answer}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
          <div style={{ borderTop: "1px solid #1c2740" }} />
        </div>
      </div>
    </section>
  );
}
