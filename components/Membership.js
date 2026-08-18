import { BOOK_HREF } from "@/data/siteData";
import Counter from "./Counter";

export default function Membership() {
  return (
    <section id="membership" style={{ padding: "0 40px 90px" }}>
      <div
        data-reveal=""
        className="jic-brutal"
        style={{
          "--brutal-shadow": "#ffee00",
          "--rot": "-0.6deg",
          maxWidth: 1280,
          margin: "0 auto",
          position: "relative",
          borderRadius: 30,
          overflow: "hidden",
          background: "linear-gradient(120deg,#b47aff,#ff3f8e)",
          padding: "56px 44px",
        }}
      >
        <div
          className="jic-blob"
          style={{
            top: -60,
            right: -30,
            width: 220,
            height: 220,
            background: "rgba(255,255,255,.14)",
            animationDuration: "14s",
          }}
        />
        <div style={{ position: "relative", display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: 30 }}>
          <div style={{ maxWidth: 560 }}>
            <div style={{ fontSize: 13, letterSpacing: 3, textTransform: "uppercase", color: "rgba(255,255,255,.85)", marginBottom: 14 }}>
              Jump Club Membership
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
              Play More.
              <br />
              Pay Less.
            </h2>
            <p style={{ fontSize: 16, color: "rgba(255,255,255,.9)", textWrap: "pretty" }}>
              Members get discounted entry every visit, priority party booking, exclusive event nights and a
              birthday-month freebie. Perfect for families who keep coming back.
            </p>
          </div>
          <div className="jic-sticker" style={{ "--rot": "1.2deg", background: "#0A0E1A", borderRadius: 22, padding: 30, minWidth: 250 }}>
            <div style={{ fontFamily: "var(--font-archivo-black)", fontSize: 15, color: "#a3ff4d", textTransform: "uppercase", marginBottom: 8 }}>
              Members Save
            </div>
            <div style={{ fontFamily: "var(--font-archivo-black)", fontSize: 56, lineHeight: 1 }}>
              <Counter value="20%" />
            </div>
            <div style={{ fontSize: 14, color: "rgba(255,255,255,.6)", marginBottom: 20 }}>on every jump session</div>
            <a
              href={BOOK_HREF}
              target="_blank"
              rel="noopener noreferrer"
              className="jic-lime-cta jic-btn-brutal jic-confetti-trigger"
              style={{ display: "block", textAlign: "center", background: "#a3ff4d", color: "#0A0E1A", fontWeight: 700, padding: 13, borderRadius: 999 }}
            >
              Join the Club
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
