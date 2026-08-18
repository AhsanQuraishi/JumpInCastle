import { schoolPerks, eduPerks, schoolStats, SCHOOL_HREF, EDU_HREF } from "@/data/siteData";
import Counter from "./Counter";

function PerkList({ perks, color }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 26 }}>
      {perks.map((perk) => (
        <div key={perk} style={{ display: "flex", gap: 10, alignItems: "flex-start", fontSize: 14, color: "rgba(255,255,255,.82)" }}>
          <span style={{ color, fontWeight: 700, flexShrink: 0 }}>✓</span>
          <span>{perk}</span>
        </div>
      ))}
    </div>
  );
}

function PlaceholderIcon({ color }) {
  return (
    <svg
      width="52"
      height="52"
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth="1.3"
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{ opacity: 0.85 }}
    >
      <rect x="3" y="3" width="18" height="18" rx="3" />
      <circle cx="8.5" cy="8.5" r="1.6" />
      <path d="m21 15-5-5L5 21" />
    </svg>
  );
}

export default function Schools() {
  return (
    <section id="schools" style={{ padding: "0 40px 90px", maxWidth: 1280, margin: "0 auto" }}>
      <div data-reveal="" style={{ textAlign: "center", marginBottom: 52 }}>
        <div style={{ fontSize: 13, letterSpacing: 3, textTransform: "uppercase", color: "#22d3ee", marginBottom: 12 }}>
          For Schools &amp; Groups
        </div>
        <h2
          style={{
            fontFamily: "var(--font-archivo-black)",
            fontSize: "clamp(34px,5vw,60px)",
            textTransform: "uppercase",
            lineHeight: 1,
          }}
        >
          Learning
          <br />
          In Motion
        </h2>
        <p style={{ maxWidth: 600, margin: "18px auto 0", color: "rgba(255,255,255,.6)", fontSize: 16, textWrap: "pretty" }}>
          Active play meets hands-on learning. Bring your class for a day of movement, teamwork and STEM
          discovery — fully supervised, fully insured, endlessly fun.
        </p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))", gap: 22 }}>
        {/* School Package */}
        <div
          data-reveal=""
          className="jic-brutal jic-shine-hover"
          style={{
            "--brutal-shadow": "#ff3f8e",
            "--rot": "-1.4deg",
            position: "relative",
            borderRadius: 26,
            overflow: "hidden",
            background: "#10152B",
            display: "flex",
            flexDirection: "column",
            border: "1px solid #ff3f8e",
            boxShadow: "0 0 70px #ff3f8e99, 0 0 130px #ff3f8e44, 0 20px 40px -10px rgba(0,0,0,.6)",
          }}
        >
          <div
            style={{
              position: "relative",
              height: 200,
              background: "linear-gradient(135deg,#ff3f8e33,#10152B)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div className="jic-icon-pop">
              <PlaceholderIcon color="#ff3f8e" />
            </div>
            <div
              style={{
                position: "absolute",
                bottom: 12,
                right: 14,
                fontSize: 10,
                letterSpacing: 1.5,
                textTransform: "uppercase",
                color: "rgba(255,255,255,.6)",
                fontWeight: 600,
              }}
            >
              Add photo
            </div>
            <div
              style={{
                position: "absolute",
                top: 14,
                left: 14,
                fontSize: 10,
                letterSpacing: 1.5,
                textTransform: "uppercase",
                padding: "6px 12px",
                borderRadius: 999,
                background: "#ff3f8e",
                color: "#0A0E1A",
                fontWeight: 700,
              }}
            >
              School Package
            </div>
          </div>
          <div style={{ padding: "30px 28px" }}>
            <h3 style={{ fontFamily: "var(--font-archivo-black)", fontSize: 26, textTransform: "uppercase", color: "#ff3f8e", marginBottom: 8 }}>
              School Day Out
            </h3>
            <p style={{ fontSize: 15, color: "rgba(255,255,255,.66)", lineHeight: 1.55, marginBottom: 22, textWrap: "pretty" }}>
              A full-park adventure day built around active fun and social play — the perfect end-of-term
              treat or reward trip.
            </p>
            <PerkList perks={schoolPerks} color="#ff3f8e" />
            <a
              href={SCHOOL_HREF}
              target="_blank"
              rel="noopener noreferrer"
              className="jic-opacity-cta jic-btn-brutal jic-confetti-trigger"
              style={{ display: "block", textAlign: "center", padding: 14, borderRadius: 999, fontWeight: 700, background: "#ff3f8e", color: "#0A0E1A" }}
            >
              Book a School Trip
            </a>
          </div>
        </div>

        {/* Educational Visit */}
        <div
          data-reveal=""
          className="jic-brutal jic-shine-hover"
          style={{
            "--brutal-shadow": "#b47aff",
            "--rot": "1.4deg",
            position: "relative",
            borderRadius: 26,
            overflow: "hidden",
            background: "linear-gradient(160deg,#b47aff22,#22d3ee11)",
            display: "flex",
            flexDirection: "column",
            border: "1px solid #b47aff",
            boxShadow: "0 0 70px #b47aff99, 0 0 130px #b47aff44, 0 20px 40px -10px rgba(0,0,0,.6)",
          }}
        >
          <div
            style={{
              position: "relative",
              height: 200,
              background: "linear-gradient(135deg,#b47aff33,#10152B)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div className="jic-icon-pop">
              <PlaceholderIcon color="#b47aff" />
            </div>
            <div
              style={{
                position: "absolute",
                bottom: 12,
                right: 14,
                fontSize: 10,
                letterSpacing: 1.5,
                textTransform: "uppercase",
                color: "rgba(255,255,255,.6)",
                fontWeight: 600,
              }}
            >
              Add photo
            </div>
            <div
              style={{
                position: "absolute",
                top: 14,
                left: 14,
                fontSize: 10,
                letterSpacing: 1.5,
                textTransform: "uppercase",
                padding: "6px 12px",
                borderRadius: 999,
                background: "#b47aff",
                color: "#fff",
                fontWeight: 700,
              }}
            >
              Educational Visit
            </div>
          </div>
          <div style={{ padding: "30px 28px" }}>
            <h3 style={{ fontFamily: "var(--font-archivo-black)", fontSize: 26, textTransform: "uppercase", color: "#b47aff", marginBottom: 8 }}>
              STEM &amp; Learn
            </h3>
            <p style={{ fontSize: 15, color: "rgba(255,255,255,.66)", lineHeight: 1.55, marginBottom: 22, textWrap: "pretty" }}>
              A guided, curriculum-friendly experience. Kids explore physics through the trampolines, logic
              in the laser maze, and coding concepts in our immersive projection room.
            </p>
            <PerkList perks={eduPerks} color="#b47aff" />
            <a
              href={EDU_HREF}
              target="_blank"
              rel="noopener noreferrer"
              className="jic-opacity-cta jic-btn-brutal jic-confetti-trigger"
              style={{ display: "block", textAlign: "center", padding: 14, borderRadius: 999, fontWeight: 700, background: "#b47aff", color: "#fff" }}
            >
              Plan an Educational Visit
            </a>
          </div>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(180px,1fr))", gap: 18, marginTop: 26 }}>
        {schoolStats.map((s, i) => (
          <div
            key={s.label}
            data-reveal=""
            className="jic-brutal"
            style={{
              "--brutal-shadow": s.color,
              "--rot": `${i % 2 === 0 ? -1.6 : 1.6}deg`,
              padding: 22,
              borderRadius: 18,
              background: "#10152B",
              textAlign: "center",
            }}
          >
            <div style={{ fontFamily: "var(--font-archivo-black)", fontSize: 30, color: s.color }}>
              <Counter value={s.stat} />
            </div>
            <div style={{ fontSize: 12, color: "rgba(255,255,255,.6)", letterSpacing: 1, textTransform: "uppercase", marginTop: 4 }}>
              {s.label}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
