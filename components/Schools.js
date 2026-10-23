import { COLORS, SCHOOL_HREF, EDU_HREF } from "@/data/siteData";

const VISITS = [
  {
    title: "School Day Out",
    meta: "3 hrs · ages 4+",
    blurb: "A full-park adventure day built around active fun and social play — the perfect end-of-term treat.",
    tags: ["Reserved arrival slot", "Marshals in every zone", "Grip socks included", "Lunch package option"],
    cta: "Book a School Trip →",
    href: SCHOOL_HREF,
    accent: COLORS.magenta,
    chipBg: "rgba(255,63,142,.14)",
    chipText: "#ff9ecb",
    solidCta: true,
  },
  {
    title: "STEM & Learn",
    meta: "3 hrs · curriculum-aligned",
    blurb: "A guided experience — physics on the trampolines, logic in the laser maze, coding in the projection room.",
    tags: ["Physics of Play session", "Laser Maze challenge", "Worksheets provided", "Certificates for all"],
    cta: "Plan an Educational Visit →",
    href: EDU_HREF,
    accent: COLORS.violet,
    chipBg: "rgba(180,122,255,.14)",
    chipText: "#d3bfff",
    solidCta: false,
  },
];

const FACTS = [
  { label: "Ages", value: "4+", color: COLORS.cyan },
  { label: "Marshal ratio", value: "1:8", color: COLORS.lime },
  { label: "Typical visit", value: "3 hrs", color: COLORS.orange },
  { label: "Teacher entry", value: "Free", color: COLORS.magenta },
];

export default function Schools() {
  return (
    <section id="schools" data-reveal="" className="jic-school-section" style={{ background: "#0A0E1A", padding: "52px 46px" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto" }}>
        <div style={{ marginBottom: 32 }}>
          <span style={{ fontSize: 11, fontWeight: 900, textTransform: "uppercase", letterSpacing: ".22em", color: COLORS.magenta }}>
            For Schools
          </span>
          <h2
            style={{
              marginTop: 10,
              fontFamily: "var(--font-archivo-black)",
              fontSize: 44,
              lineHeight: 1,
              color: "#fff",
              textTransform: "uppercase",
            }}
          >
            Learning in Motion
          </h2>
          <p style={{ marginTop: 12, maxWidth: 480, fontSize: 14, lineHeight: 1.6, color: "rgba(255,255,255,.5)" }}>
            Active play meets hands-on learning. Fully supervised, fully insured, endlessly fun.
          </p>
        </div>

        <div
          className="jic-school-panel"
          style={{
            borderRadius: 22,
            border: "1px solid rgba(255,255,255,.1)",
            background: "rgba(255,255,255,.03)",
            overflow: "hidden",
          }}
        >
          <div
            className="jic-school-photo"
            style={{
              display: "flex",
              alignItems: "flex-end",
              padding: 18,
              borderRight: "1px solid rgba(255,255,255,.08)",
              background: `linear-gradient(180deg, ${COLORS.magenta}2e, ${COLORS.violet}2e)`,
            }}
          >
            <span style={{ fontSize: 11, fontWeight: 600, textTransform: "uppercase", letterSpacing: ".14em", color: "rgba(255,255,255,.5)" }}>
              Photo — class on the ninja course
            </span>
          </div>

          <div style={{ display: "flex", flexDirection: "column" }}>
            {VISITS.map((v, i) => (
              <div
                key={v.title}
                style={{
                  padding: "24px 26px",
                  borderBottom: i === 0 ? "1px solid rgba(255,255,255,.08)" : "none",
                }}
              >
                <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", gap: 16, flexWrap: "wrap" }}>
                  <h3
                    style={{
                      fontFamily: "var(--font-archivo-black)",
                      fontSize: 22,
                      lineHeight: 1,
                      color: v.accent,
                      margin: 0,
                    }}
                  >
                    {v.title}
                  </h3>
                  <span style={{ fontSize: 12, fontWeight: 600, color: "rgba(255,255,255,.4)", whiteSpace: "nowrap" }}>{v.meta}</span>
                </div>

                <p style={{ margin: "9px 0 14px", fontSize: 13.5, lineHeight: 1.55, color: "rgba(255,255,255,.6)" }}>{v.blurb}</p>

                <ul style={{ display: "flex", flexWrap: "wrap", gap: 7, margin: 0, padding: 0, listStyle: "none" }}>
                  {v.tags.map((t) => (
                    <li
                      key={t}
                      style={{ padding: "6px 11px", borderRadius: 8, fontSize: 12, fontWeight: 600, background: v.chipBg, color: v.chipText }}
                    >
                      {t}
                    </li>
                  ))}
                </ul>

                <a
                  href={v.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="jic-school-cta jic-confetti-trigger"
                  style={
                    v.solidCta
                      ? {
                          marginTop: 16,
                          display: "inline-block",
                          borderRadius: 999,
                          padding: "11px 20px",
                          fontSize: 13,
                          fontWeight: 900,
                          background: v.accent,
                          color: "#0A0E1A",
                          textDecoration: "none",
                          transition: "background .15s ease",
                        }
                      : {
                          marginTop: 16,
                          display: "inline-block",
                          borderRadius: 999,
                          padding: "11px 20px",
                          fontSize: 13,
                          fontWeight: 700,
                          border: `1px solid ${v.accent}8c`,
                          color: v.chipText,
                          textDecoration: "none",
                          transition: "background .15s ease",
                        }
                  }
                >
                  {v.cta}
                </a>
              </div>
            ))}
          </div>
        </div>

        <div className="jic-school-facts" style={{ marginTop: 20, display: "flex", flexWrap: "wrap", gap: "8px 30px", padding: "0 4px" }}>
          {FACTS.map((f) => (
            <span key={f.label} style={{ fontSize: 12.5, fontWeight: 600, color: "rgba(255,255,255,.45)" }}>
              {f.label} <strong style={{ color: f.color }}>{f.value}</strong>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
