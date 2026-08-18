import { rules } from "@/data/siteData";

export default function Safety() {
  return (
    <section style={{ padding: "0 40px 90px" }}>
      <div
        style={{
          maxWidth: 1280,
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))",
          gap: 40,
          alignItems: "center",
        }}
      >
        <div>
          <div style={{ fontSize: 13, letterSpacing: 3, textTransform: "uppercase", color: "#22d3ee", marginBottom: 12 }}>
            Safety First
          </div>
          <h2
            style={{
              fontFamily: "var(--font-archivo-black)",
              fontSize: "clamp(30px,4vw,48px)",
              textTransform: "uppercase",
              lineHeight: 1,
              marginBottom: 16,
            }}
          >
            Play Hard,
            <br />
            Play Safe
          </h2>
          <p style={{ color: "rgba(255,255,255,.62)", fontSize: 16, textWrap: "pretty" }}>
            Every zone is monitored by trained marshals, and all guests complete a quick safety briefing on
            arrival. Follow the house rules and everyone goes home smiling.
          </p>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          {rules.map((r, i) => (
            <div
              key={r.n}
              data-reveal=""
              className="jic-brutal"
              style={{
                "--brutal-shadow": "#a3ff4d",
                "--rot": `${i % 2 === 0 ? -0.8 : 0.8}deg`,
                display: "flex",
                gap: 14,
                alignItems: "flex-start",
                padding: "16px 18px",
                borderRadius: 14,
                background: "#10152B",
              }}
            >
              <span style={{ fontFamily: "var(--font-archivo-black)", fontSize: 14, color: "#a3ff4d", flexShrink: 0 }}>
                {r.n}
              </span>
              <span style={{ fontSize: 14, color: "rgba(255,255,255,.82)", lineHeight: 1.5 }}>{r.t}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
