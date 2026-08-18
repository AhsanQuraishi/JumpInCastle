import Image from "next/image";
import { gallery } from "@/data/siteData";

const ACCENTS = ["#ff3f8e", "#22d3ee", "#a3ff4d", "#ff9433", "#b47aff", "#ffee00"];

export default function Gallery() {
  return (
    <section style={{ padding: "0 40px 90px" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto" }}>
        <div style={{ marginBottom: 34 }}>
          <div style={{ fontSize: 13, letterSpacing: 3, textTransform: "uppercase", color: "#ff9433", marginBottom: 12 }}>
            Gallery
          </div>
          <h2 style={{ fontFamily: "var(--font-archivo-black)", fontSize: "clamp(30px,4vw,48px)", textTransform: "uppercase", lineHeight: 1 }}>
            See The Fun
          </h2>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(240px,1fr))", gap: 24 }}>
          {gallery.map((g, i) => {
            const accent = ACCENTS[i % ACCENTS.length];
            return (
              <div
                key={g.label}
                data-reveal=""
                className="jic-brutal jic-gallery-item jic-shine-hover"
                style={{
                  "--brutal-shadow": accent,
                  "--rot": `${i % 2 === 0 ? -1.5 : 1.5}deg`,
                  position: "relative",
                  borderRadius: 20,
                  overflow: "hidden",
                  background: "#10152B",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <div style={{ position: "relative", aspectRatio: "4 / 3", overflow: "hidden", background: g.bg }}>
                  {g.hasImg ? (
                    <Image src={g.img} alt={g.label} fill sizes="(max-width: 768px) 50vw, 25vw" style={{ objectFit: "cover" }} />
                  ) : (
                    <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <span style={{ fontSize: 11, letterSpacing: 1.5, textTransform: "uppercase", color: "rgba(255,255,255,.5)", fontWeight: 600 }}>
                        Add photo
                      </span>
                    </div>
                  )}
                  <div className="jic-gallery-view">
                    <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="11" cy="11" r="7" />
                      <path d="m21 21-4.35-4.35" />
                    </svg>
                  </div>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 9, padding: "13px 16px" }}>
                  <span style={{ width: 8, height: 8, borderRadius: "50%", background: accent, flexShrink: 0 }} />
                  <span style={{ fontSize: 13, letterSpacing: 1, textTransform: "uppercase", color: "#fff", fontWeight: 700 }}>
                    {g.label}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
        <p style={{ textAlign: "center", color: "rgba(255,255,255,.4)", fontSize: 13, marginTop: 18 }}>
          More real photos coming soon — send yours to feature them here.
        </p>
      </div>
    </section>
  );
}
