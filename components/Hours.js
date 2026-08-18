import { hours, BOOK_HREF } from "@/data/siteData";

const ACCENTS = ["#ff3f8e", "#22d3ee", "#a3ff4d", "#ff9433", "#b47aff", "#ffee00"];

export default function Hours() {
  return (
    <section id="hours" style={{ padding: "0 40px 90px" }}>
      <div
        data-reveal=""
        style={{
          maxWidth: 1280,
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))",
          gap: 22,
        }}
      >
        <div
          className="jic-brutal jic-shine-hover"
          style={{ "--brutal-shadow": "#22d3ee", "--rot": "-0.8deg", padding: 38, borderRadius: 26, background: "#10152B", overflow: "hidden" }}
        >
          <div style={{ fontSize: 13, letterSpacing: 3, textTransform: "uppercase", color: "#22d3ee", marginBottom: 20 }}>
            Opening Hours
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
            {hours.map((h, i) => (
              <div key={h.day} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "15px 0", borderBottom: "1px solid rgba(255,255,255,.07)" }}>
                <span style={{ display: "flex", alignItems: "center", gap: 9, fontWeight: 600, fontSize: 15 }}>
                  <span style={{ width: 8, height: 8, borderRadius: "50%", background: ACCENTS[i % ACCENTS.length], flexShrink: 0 }} />
                  {h.day}
                </span>
                <span style={{ color: ACCENTS[i % ACCENTS.length], fontWeight: 600, fontSize: 15 }}>{h.time}</span>
              </div>
            ))}
          </div>
        </div>

        <div
          className="jic-brutal jic-shine-hover"
          style={{
            "--brutal-shadow": "#ff3f8e",
            "--rot": "0.8deg",
            padding: 38,
            borderRadius: 26,
            overflow: "hidden",
            background: "linear-gradient(135deg,#22d3ee22,#b47aff22)",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <div style={{ fontSize: 13, letterSpacing: 3, textTransform: "uppercase", color: "#ff3f8e", marginBottom: 14 }}>
            Find Us
          </div>
          <h3 style={{ fontFamily: "var(--font-archivo-black)", fontSize: 26, textTransform: "uppercase", marginBottom: 10 }}>
            Multan, Pakistan
          </h3>
          <p style={{ color: "rgba(255,255,255,.7)", fontSize: 15, lineHeight: 1.6, marginBottom: 22 }}>
            Add your exact mall / street address here. Free parking on-site. Walk-ins welcome, booking
            recommended on weekends.
          </p>
          <a
            href={BOOK_HREF}
            target="_blank"
            rel="noopener noreferrer"
            className="jic-white-cta jic-btn-brutal jic-confetti-trigger"
            style={{ alignSelf: "flex-start", background: "#fff", color: "#0A0E1A", fontWeight: 700, padding: "13px 26px", borderRadius: 999 }}
          >
            Get Directions →
          </a>
        </div>
      </div>
    </section>
  );
}
