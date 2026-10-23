import { rules } from "@/data/siteData";

export default function Safety() {
  return (
    <section style={{ background: "#0a0f1e", padding: "clamp(64px,7vw,96px) clamp(24px,5vw,72px) clamp(72px,8vw,104px)" }}>
      <div style={{ maxWidth: 1440, margin: "0 auto" }}>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            alignItems: "flex-end",
            justifyContent: "space-between",
            gap: "clamp(28px,4vw,48px)",
            marginBottom: "clamp(36px,4vw,52px)",
          }}
        >
          <div style={{ flex: "1 1 480px", minWidth: 300 }}>
            <div
              style={{
                fontFamily: "var(--font-jetbrains-mono)",
                fontSize: 13,
                fontWeight: 700,
                letterSpacing: ".28em",
                color: "#22D3EE",
                marginBottom: 16,
              }}
            >
              SAFETY FIRST
            </div>
            <h2
              style={{
                margin: 0,
                fontFamily: "var(--font-archivo-black)",
                fontSize: "clamp(46px,5.4vw,70px)",
                lineHeight: 0.9,
                letterSpacing: "-.02em",
                color: "#fff",
                textTransform: "uppercase",
              }}
            >
              Play hard, play safe
            </h2>
          </div>
          <p style={{ flex: "0 1 420px", margin: 0, paddingBottom: 8, fontSize: 16, lineHeight: 1.65, color: "#8b94a6", textWrap: "pretty" }}>
            Every zone is monitored by trained marshals, and all guests complete a quick safety briefing on arrival.
            Follow the house rules and everyone goes home smiling.
          </p>
        </div>

        <ul
          style={{
            listStyle: "none",
            margin: 0,
            padding: 0,
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px,1fr))",
            gap: 16,
          }}
        >
          {rules.map((r) => (
            <li
              key={r.n}
              className="jic-rule-card"
              style={{
                position: "relative",
                overflow: "hidden",
                borderRadius: 16,
                padding: "30px 30px 32px",
                display: "flex",
                flexDirection: "column",
                gap: 14,
                background: `linear-gradient(150deg, ${r.accent}1f 0%, ${r.accent}0a 42%, #0e1626 78%)`,
                border: `1px solid ${r.accent}3d`,
                borderTop: `3px solid ${r.accent}`,
                "--rule-accent": r.accent,
              }}
            >
              <span
                aria-hidden="true"
                className="jic-rule-ghost"
                style={{
                  position: "absolute",
                  top: -26,
                  right: -8,
                  fontFamily: "var(--font-archivo-black)",
                  fontSize: 96,
                  lineHeight: 1,
                  color: `${r.accent}1f`,
                  pointerEvents: "none",
                }}
              >
                {r.n}
              </span>
              <div style={{ position: "relative", display: "flex", alignItems: "center", gap: 10 }}>
                <span aria-hidden="true" style={{ width: 7, height: 7, borderRadius: "50%", background: r.accent, flexShrink: 0 }} />
                <h3
                  style={{
                    margin: 0,
                    fontFamily: "var(--font-jetbrains-mono)",
                    fontSize: 12,
                    fontWeight: 700,
                    letterSpacing: ".2em",
                    textTransform: "uppercase",
                    color: r.accent,
                  }}
                >
                  {r.keyword}
                </h3>
              </div>
              <p style={{ position: "relative", margin: 0, fontSize: 16, lineHeight: 1.6, color: "#dfe6f0", textWrap: "pretty" }}>{r.t}</p>
            </li>
          ))}

          <li
            style={{
              borderRadius: 16,
              padding: 30,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              gap: 10,
              background: "linear-gradient(140deg, rgba(163,230,53,.13), rgba(163,230,53,0))",
              border: "1px solid rgba(163,230,53,.3)",
            }}
          >
            <div style={{ fontFamily: "var(--font-space-grotesk)", fontWeight: 700, fontSize: 19, color: "#fff" }}>
              Marshals on every zone
            </div>
            <p style={{ margin: 0, fontSize: 15, lineHeight: 1.6, color: "#a9bb92" }}>
              First aid trained, briefed daily. Ask any of them if you are unsure.
            </p>
          </li>
        </ul>
      </div>
    </section>
  );
}
