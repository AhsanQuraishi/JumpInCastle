"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { gallery } from "@/data/siteData";

const ZONE_META = [
  { accent: "#FF3D8B", description: "Open jump, dodgeball, foam pit" },
  { accent: "#22D3EE", description: "Multi-level arena, 12 players" },
  { accent: "#4ADE80", description: "Timed laps, drift mode" },
  { accent: "#FB923C", description: "Ball pit, slides, climb net" },
  { accent: "#A78BFA", description: "Live scoreboard, auto reload" },
  { accent: "#FACC15", description: "Redemption games, prizes" },
];

const ZONES = gallery.map((g, i) => ({ ...g, ...ZONE_META[i % ZONE_META.length] }));

const OPEN_GROW = 4.2;

export default function Gallery() {
  const [active, setActive] = useState(0);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [hasHover, setHasHover] = useState(true);

  useEffect(() => {
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const hoverQuery = window.matchMedia("(hover: hover)");
    setReducedMotion(motionQuery.matches);
    setHasHover(hoverQuery.matches);
    const onMotionChange = (e) => setReducedMotion(e.matches);
    const onHoverChange = (e) => setHasHover(e.matches);
    motionQuery.addEventListener("change", onMotionChange);
    hoverQuery.addEventListener("change", onHoverChange);
    return () => {
      motionQuery.removeEventListener("change", onMotionChange);
      hoverQuery.removeEventListener("change", onHoverChange);
    };
  }, []);

  const onKeyDown = (e, i) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      setActive(i);
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      setActive((a) => Math.min(ZONES.length - 1, a + 1));
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      setActive((a) => Math.max(0, a - 1));
    }
  };

  const t = (transition) => (reducedMotion ? "none" : transition);

  return (
    <section
      className="jic-gallery-section"
      style={{ background: "#0a0f1e", padding: "96px 72px 112px", position: "relative", overflow: "hidden" }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: "radial-gradient(rgba(255,255,255,.055) 1px, transparent 1px)",
          backgroundSize: "26px 26px",
          pointerEvents: "none",
        }}
      />

      <div style={{ position: "relative", maxWidth: 1440, margin: "0 auto", display: "flex", flexDirection: "column", gap: 38 }}>
        <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: 40, flexWrap: "wrap" }}>
          <div>
            <div
              style={{
                fontFamily: "var(--font-jetbrains-mono)",
                fontSize: 13,
                fontWeight: 700,
                letterSpacing: ".28em",
                color: "#FF7A1A",
                marginBottom: 16,
              }}
            >
              GALLERY
            </div>
            <h2
              className="jic-gallery-heading"
              style={{
                margin: 0,
                fontFamily: "var(--font-archivo-black)",
                fontSize: 80,
                lineHeight: 0.88,
                letterSpacing: "-.02em",
                color: "#fff",
                textTransform: "uppercase",
              }}
            >
              See the fun
            </h2>
          </div>
          <div
            className="jic-gallery-hint"
            style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 8, paddingBottom: 12, textAlign: "right" }}
          >
            <span style={{ fontFamily: "var(--font-jetbrains-mono)", fontSize: 12, letterSpacing: ".16em", color: "#5f6a7d" }}>
              {hasHover ? "Hover to open" : "Tap to open"}
            </span>
            <span style={{ fontFamily: "var(--font-jetbrains-mono)", fontSize: 12, letterSpacing: ".16em", color: "#3f4a5e" }}>
              06 SPACES / ONE ROOF
            </span>
          </div>
        </div>

        <div className="jic-gallery-rail" style={{ display: "flex", gap: 10, height: 540 }}>
          {ZONES.map((z, i) => {
            const on = i === active;
            return (
              <div
                key={z.label}
                role="button"
                tabIndex={0}
                aria-pressed={on}
                aria-label={`Show ${z.label}`}
                onMouseEnter={() => setActive(i)}
                onClick={() => setActive(i)}
                onFocus={() => setActive(i)}
                onKeyDown={(e) => onKeyDown(e, i)}
                className="jic-gallery-panel"
                style={{
                  position: "relative",
                  overflow: "hidden",
                  borderRadius: 14,
                  background: "#111a2c",
                  minWidth: 0,
                  cursor: "pointer",
                  flexBasis: 0,
                  flexGrow: on ? OPEN_GROW : 1,
                  transition: t("flex-grow .55s cubic-bezier(.22,.7,.2,1)"),
                  outline: "none",
                }}
              >
                <div
                  className="jic-gallery-zoom"
                  style={{
                    position: "absolute",
                    inset: 0,
                    transform: on ? "scale(1)" : "scale(1.14)",
                    transition: t("transform .8s cubic-bezier(.22,.7,.2,1)"),
                  }}
                >
                  {z.hasImg ? (
                    <Image src={z.img} alt={z.label} fill sizes="(max-width: 768px) 100vw, 900px" style={{ objectFit: "cover" }} />
                  ) : (
                    <div style={{ position: "absolute", inset: 0, background: `linear-gradient(160deg,${z.accent}33,#111a2c)` }} />
                  )}
                </div>
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    background: "linear-gradient(to top,#04070e 0%,rgba(4,7,14,.25) 70%,rgba(4,7,14,.1) 100%)",
                    opacity: on ? 0.45 : 0.8,
                    transition: t("opacity .5s ease"),
                    pointerEvents: "none",
                  }}
                />
                <div style={{ position: "absolute", left: 0, right: 0, bottom: 0, height: 3, background: z.accent, pointerEvents: "none" }} />
                <div
                  style={{
                    position: "absolute",
                    top: 18,
                    left: 18,
                    fontFamily: "var(--font-jetbrains-mono)",
                    fontSize: 11,
                    letterSpacing: ".14em",
                    color: "rgba(255,255,255,.5)",
                    pointerEvents: "none",
                  }}
                >
                  {String(i + 1).padStart(2, "0")}
                </div>
                <div style={{ position: "absolute", left: 20, bottom: 22, display: "flex", alignItems: "center", gap: 11, pointerEvents: "none" }}>
                  <span style={{ width: 7, height: 7, borderRadius: "50%", flex: "0 0 auto", background: z.accent }} />
                  <span
                    className="jic-gallery-label"
                    style={{
                      fontFamily: "var(--font-jetbrains-mono)",
                      fontSize: 13,
                      fontWeight: 700,
                      letterSpacing: ".14em",
                      whiteSpace: "nowrap",
                      textTransform: "uppercase",
                      writingMode: on ? "horizontal-tb" : "vertical-rl",
                      transform: on ? "none" : "rotate(180deg)",
                      transition: t("color .4s ease"),
                      color: on ? "#ffffff" : "rgba(255,255,255,.55)",
                    }}
                  >
                    {z.label}
                  </span>
                </div>
                <div
                  className="jic-gallery-meta"
                  style={{
                    position: "absolute",
                    left: 38,
                    bottom: 52,
                    opacity: on ? 1 : 0,
                    transition: t("opacity .4s ease"),
                    pointerEvents: "none",
                  }}
                >
                  <span style={{ fontSize: 13.5, color: "rgba(255,255,255,.6)", whiteSpace: "nowrap" }}>{z.description}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
