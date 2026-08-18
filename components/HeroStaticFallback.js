import { HERO_VIVID } from "@/data/siteData";

// Server-renderable, no client-only APIs. Used both as the next/dynamic
// loading placeholder for TrampolineHero and as its prefers-reduced-motion
// fallback, so both paths render identical markup.
export default function HeroStaticFallback({ eyebrow, lines, subtitle, ctas = [], stats = [] }) {
  return (
    <div style={{ position: "relative", zIndex: 1, maxWidth: 820, margin: "0 auto", textAlign: "center", padding: "90px 20px" }}>
      <div
        className="jic-sticker"
        style={{
          "--rot": "-2deg",
          display: "inline-flex",
          alignItems: "center",
          gap: 8,
          padding: "8px 18px",
          borderRadius: 999,
          fontSize: 13,
          letterSpacing: 2,
          textTransform: "uppercase",
          color: "#0A0E1A",
          marginBottom: 28,
          background: HERO_VIVID.darkYellow,
          fontWeight: 700,
        }}
      >
        {eyebrow}
      </div>

      <h1
        style={{
          fontFamily: "var(--font-archivo-black)",
          fontSize: "clamp(30px,6.5vw,70px)",
          lineHeight: 1.08,
          textTransform: "uppercase",
          textWrap: "balance",
        }}
      >
        <span style={{ color: "#fff", textShadow: "0 0 10px #fff, 0 0 26px #00e5ff, 0 0 46px #00e5ff99" }}>{lines[0]}</span>
        <br />
        <span style={{ color: "#fff", textShadow: "0 0 10px #fff, 0 0 26px #ff2d95, 0 0 46px #ff2d9599" }}>{lines[1]}</span>
      </h1>

      <p
        style={{
          maxWidth: 560,
          margin: "22px auto 0",
          fontSize: 17,
          color: "rgba(255,255,255,.72)",
          textWrap: "pretty",
        }}
      >
        {subtitle}
      </p>

      <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap", marginTop: 34 }}>
        {ctas.map((cta) => (
          <a
            key={cta.label}
            href={cta.href}
            target={cta.external ? "_blank" : undefined}
            rel={cta.external ? "noopener noreferrer" : undefined}
            className="jic-btn-brutal jic-confetti-trigger"
            style={{
              background: cta.variant === "primary" ? `linear-gradient(135deg,${HERO_VIVID.pink},${HERO_VIVID.darkYellow})` : "#10152B",
              color: "#fff",
              fontWeight: 700,
              padding: "15px 32px",
              borderRadius: 999,
              fontSize: 15,
            }}
          >
            {cta.label}
          </a>
        ))}
      </div>

      {stats.length > 0 && (
        <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap", marginTop: 48 }}>
          {stats.map((s) => (
            <div
              key={s.label}
              style={{
                flex: 1,
                minWidth: 140,
                maxWidth: 200,
                padding: 18,
                borderRadius: 18,
                border: "1px solid rgba(255,255,255,.1)",
                background: "#10152B",
              }}
            >
              <div style={{ fontFamily: "var(--font-archivo-black)", fontSize: 28, color: "#fff" }}>{s.value}</div>
              <div style={{ fontSize: 12, color: "rgba(255,255,255,.55)", letterSpacing: 1, textTransform: "uppercase" }}>
                {s.label}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
