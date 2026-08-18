import Link from "next/link";
import { facilities } from "@/data/siteData";

const ZONES = [
  {
    cat: "Thrill",
    label: "Thrill Zone",
    color: "#ff3f8e",
    icon: <path d="M13 2 4 14h6l-1 8 9-12h-6l1-8Z" />,
  },
  {
    cat: "Kids",
    label: "Kids Zone",
    color: "#a3ff4d",
    icon: (
      <>
        <circle cx="12" cy="9" r="6" />
        <path d="M12 15v6M9.5 19.5 12 21l2.5-1.5" />
      </>
    ),
  },
  {
    cat: "Tech",
    label: "Tech Zone",
    color: "#22d3ee",
    icon: (
      <>
        <rect x="3" y="3" width="18" height="18" rx="3" />
        <circle cx="8.5" cy="8.5" r="1.6" />
        <path d="m21 15-5-5L5 21" />
      </>
    ),
  },
  {
    cat: "Family",
    label: "Family Zone",
    color: "#ff9433",
    icon: (
      <>
        <path d="M4 18h16l-1.2-9-4 4-2.8-6-2.8 6-4-4L4 18Z" />
      </>
    ),
  },
];

export default function ParkMap() {
  return (
    <section style={{ padding: "0 40px 90px" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 44 }}>
          <div style={{ fontSize: 13, letterSpacing: 3, textTransform: "uppercase", color: "#ffee00", marginBottom: 12 }}>
            Find Your Way
          </div>
          <h2 style={{ fontFamily: "var(--font-archivo-black)", fontSize: "clamp(30px,4vw,48px)", textTransform: "uppercase", lineHeight: 1 }}>
            Park Map
          </h2>
          <p style={{ maxWidth: 520, margin: "16px auto 0", color: "rgba(255,255,255,.6)", fontSize: 15, textWrap: "pretty" }}>
            A quick look at what's where — click any attraction to jump straight to it. (Stylized layout for now, real floor plan coming soon.)
          </p>
        </div>

        <div
          className="jic-brutal"
          style={{
            "--brutal-shadow": "#b47aff",
            "--rot": "0deg",
            position: "relative",
            borderRadius: 28,
            padding: "34px 28px",
            background: "#10152B",
          }}
        >
          <div
            className="jic-sticker"
            style={{
              "--rot": "-4deg",
              position: "absolute",
              top: -16,
              left: 26,
              zIndex: 2,
              fontSize: 11,
              letterSpacing: 1.5,
              textTransform: "uppercase",
              fontWeight: 700,
              padding: "7px 14px",
              borderRadius: 999,
              background: "#ffee00",
              color: "#0A0E1A",
            }}
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" style={{ display: "inline-block", verticalAlign: "-1px", marginRight: 5 }}>
              <path d="M12 2C7.6 2 4 5.6 4 10c0 5.4 6.8 11.2 7.1 11.5.5.4 1.3.4 1.8 0C13.2 21.2 20 15.4 20 10c0-4.4-3.6-8-8-8Zm0 11a3 3 0 1 1 0-6 3 3 0 0 1 0 6Z" />
            </svg>
            You Are Here — Entrance
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              gap: 20,
              marginTop: 22,
            }}
          >
            {ZONES.map((zone) => {
              const items = facilities.filter((f) => f.cat === zone.cat);
              return (
                <div
                  key={zone.cat}
                  style={{
                    borderRadius: 20,
                    border: `1px solid ${zone.color}55`,
                    background: `linear-gradient(160deg,${zone.color}18,#10152B)`,
                    padding: "18px 16px 20px",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 14 }}>
                    <span
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        width: 28,
                        height: 28,
                        borderRadius: 8,
                        background: zone.color,
                        color: "#0A0E1A",
                        flexShrink: 0,
                      }}
                    >
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        {zone.icon}
                      </svg>
                    </span>
                    <span style={{ fontFamily: "var(--font-archivo-black)", fontSize: 14, textTransform: "uppercase", letterSpacing: 0.5, color: zone.color }}>
                      {zone.label}
                    </span>
                    <span style={{ marginLeft: "auto", fontSize: 11, color: "rgba(255,255,255,.4)" }}>{items.length} spots</span>
                  </div>

                  <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(110px, 1fr))", gap: 8 }}>
                    {items.map((f) => (
                      <Link
                        key={f.slug}
                        href={`/attractions/${f.slug}`}
                        className="jic-map-tile"
                        style={{
                          "--tile-color": zone.color,
                          display: "block",
                          padding: "10px 10px",
                          borderRadius: 10,
                          border: "1px solid rgba(255,255,255,.1)",
                          background: "rgba(255,255,255,.03)",
                          color: "#fff",
                          textDecoration: "none",
                        }}
                      >
                        <div style={{ fontSize: 12, fontWeight: 700, lineHeight: 1.25 }}>{f.name}</div>
                        {f.hasDim && <div style={{ fontSize: 9.5, color: "rgba(255,255,255,.4)", marginTop: 3 }}>{f.dim}</div>}
                      </Link>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>

          <div style={{ display: "flex", gap: 18, flexWrap: "wrap", justifyContent: "center", marginTop: 26 }}>
            {ZONES.map((zone) => (
              <div key={zone.cat} style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12, color: "rgba(255,255,255,.55)" }}>
                <span style={{ width: 9, height: 9, borderRadius: 3, background: zone.color, flexShrink: 0 }} />
                {zone.label}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
