import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { facilities, getFacilityBySlug, waLink, rules } from "@/data/siteData";

export function generateStaticParams() {
  return facilities.map((f) => ({ slug: f.slug }));
}

export function generateMetadata({ params }) {
  const facility = getFacilityBySlug(params.slug);
  if (!facility) return { title: "Attraction not found — Jump In Castle" };
  return {
    title: `${facility.name} — Jump In Castle`,
    description: facility.desc,
  };
}

// Generic per-category "what to expect" bullets — placeholder copy until
// real per-attraction highlights are written.
const CATEGORY_HIGHLIGHTS = {
  Thrill: [
    "Marshal-supervised at all times",
    "Height & weight limits apply — posted on-site",
    "Grip socks required",
    "Best for ages 6+",
  ],
  Kids: [
    "Padded, toddler-safe surfaces throughout",
    "Dedicated zone for under-6s",
    "Adult supervision required",
    "Suitable from walking age",
  ],
  Tech: [
    "Digital scoring & leaderboards",
    "Sessions run in timed rounds",
    "Great for groups and rivalries",
    "Suitable for ages 5+",
  ],
  Family: [
    "No height restrictions",
    "Great for a quick break between zones",
    "Tickets/tokens available at reception",
    "Suitable for all ages",
  ],
};

// Placeholder video/photo clips — swap for real media once it's ready.
const DUMMY_CLIP_COUNT = 4;

export default function AttractionDetailPage({ params }) {
  const facility = getFacilityBySlug(params.slug);
  if (!facility) notFound();

  const highlights = CATEGORY_HIGHLIGHTS[facility.cat] || CATEGORY_HIGHLIGHTS.Family;
  const bookHref = waLink(`Hi Jump In Castle! I'd like to know more about ${facility.name}.`);
  const related = facilities.filter((f) => f.slug !== facility.slug).slice(0, 3);

  return (
    <div style={{ position: "relative", width: "100%", maxWidth: "100%", overflow: "hidden" }}>
      <Navbar />

      <header
        style={{
          position: "relative",
          padding: "48px 40px 60px",
          overflow: "hidden",
          background: "#0A0E1A",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: `radial-gradient(ellipse 60% 45% at 20% 0%, ${facility.color}22, transparent 60%)`,
          }}
        />
        <div style={{ position: "relative", maxWidth: 1100, margin: "0 auto" }}>
          <Link
            href="/#attractions"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              fontSize: 13,
              fontWeight: 600,
              color: "rgba(255,255,255,.6)",
              marginBottom: 22,
            }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 12H5M11 18l-6-6 6-6" />
            </svg>
            All Attractions
          </Link>

          <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: 12, marginBottom: 16 }}>
            <span
              className="jic-sticker"
              style={{
                "--rot": "-3deg",
                fontSize: 11,
                letterSpacing: 1.5,
                textTransform: "uppercase",
                padding: "5px 12px",
                borderRadius: 999,
                background: facility.color,
                color: "#0A0E1A",
                fontWeight: 700,
              }}
            >
              {facility.cat}
            </span>
            {facility.hasDim && (
              <span style={{ fontSize: 12, fontWeight: 600, color: "rgba(255,255,255,.6)" }}>{facility.dim}</span>
            )}
            <span style={{ fontSize: 12, fontWeight: 600, color: "rgba(255,255,255,.35)" }}>№ {facility.num}</span>
          </div>

          <h1
            style={{
              fontFamily: "var(--font-archivo-black)",
              fontSize: "clamp(34px,6vw,64px)",
              lineHeight: 1.02,
              textTransform: "uppercase",
              textWrap: "balance",
              marginBottom: 18,
            }}
          >
            {facility.name}
          </h1>

          <p style={{ maxWidth: 620, fontSize: 17, color: "rgba(255,255,255,.72)", lineHeight: 1.6, marginBottom: 30 }}>
            {facility.desc}
          </p>

          <div
            className="jic-brutal jic-shine-hover"
            style={{
              "--brutal-shadow": facility.color,
              "--rot": "-0.6deg",
              position: "relative",
              height: "min(50vh, 420px)",
              borderRadius: 26,
              overflow: "hidden",
              background: facility.imgBg,
            }}
          >
            {facility.hasImg ? (
              <Image
                src={facility.img}
                alt={facility.name}
                fill
                sizes="(max-width: 1100px) 100vw, 1100px"
                style={{ objectFit: "cover" }}
                priority
              />
            ) : (
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 13,
                  letterSpacing: 1.5,
                  textTransform: "uppercase",
                  color: "rgba(255,255,255,.5)",
                  fontWeight: 600,
                }}
              >
                Photo coming soon
              </div>
            )}
            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg,transparent 55%,rgba(7,7,15,.75))" }} />
            <a
              href={bookHref}
              target="_blank"
              rel="noopener noreferrer"
              className="jic-btn-brutal jic-confetti-trigger"
              style={{
                position: "absolute",
                left: 24,
                bottom: 22,
                background: `linear-gradient(135deg,${facility.color},#0A0E1A)`,
                color: "#fff",
                fontWeight: 700,
                padding: "13px 26px",
                borderRadius: 999,
                fontSize: 14,
              }}
            >
              Book This Attraction →
            </a>
          </div>
        </div>
      </header>

      <section style={{ padding: "0 40px 90px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))", gap: 40 }}>
          <div>
            <div style={{ fontSize: 13, letterSpacing: 3, textTransform: "uppercase", color: facility.color, marginBottom: 16 }}>
              What To Expect
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {highlights.map((h) => (
                <div key={h} style={{ display: "flex", gap: 10, alignItems: "flex-start", fontSize: 14, color: "rgba(255,255,255,.82)" }}>
                  <span style={{ color: facility.color, fontWeight: 700, flexShrink: 0 }}>✓</span>
                  <span>{h}</span>
                </div>
              ))}
            </div>
          </div>

          <div>
            <div style={{ fontSize: 13, letterSpacing: 3, textTransform: "uppercase", color: facility.color, marginBottom: 16 }}>
              House Rules
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {rules.slice(0, 4).map((r) => (
                <div key={r.n} style={{ display: "flex", gap: 10, alignItems: "flex-start", fontSize: 13, color: "rgba(255,255,255,.65)" }}>
                  <span style={{ fontFamily: "var(--font-archivo-black)", fontSize: 12, color: facility.color, flexShrink: 0 }}>{r.n}</span>
                  <span>{r.t}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section style={{ padding: "0 40px 90px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", flexWrap: "wrap", gap: 16, marginBottom: 28 }}>
            <div>
              <div style={{ fontSize: 13, letterSpacing: 3, textTransform: "uppercase", color: facility.color, marginBottom: 10 }}>
                Videos &amp; Photos
              </div>
              <h2 style={{ fontFamily: "var(--font-archivo-black)", fontSize: "clamp(24px,3.5vw,36px)", textTransform: "uppercase" }}>
                See It In Action
              </h2>
            </div>
            <p style={{ maxWidth: 360, fontSize: 13, color: "rgba(255,255,255,.4)" }}>
              Real clips of {facility.name} are coming soon — this is placeholder content for now.
            </p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(220px,1fr))", gap: 20 }}>
            {Array.from({ length: DUMMY_CLIP_COUNT }).map((_, i) => (
              <div
                key={i}
                className="jic-brutal jic-shine-hover"
                style={{
                  "--brutal-shadow": facility.color,
                  "--rot": `${i % 2 === 0 ? -1.4 : 1.4}deg`,
                  position: "relative",
                  aspectRatio: "4 / 3",
                  borderRadius: 18,
                  overflow: "hidden",
                  background: facility.imgBg,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <div
                  style={{
                    width: 48,
                    height: 48,
                    borderRadius: "50%",
                    background: "rgba(7,7,15,.6)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="#fff">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
                <span
                  style={{
                    position: "absolute",
                    bottom: 10,
                    left: 12,
                    fontSize: 10,
                    letterSpacing: 1,
                    textTransform: "uppercase",
                    color: "rgba(255,255,255,.6)",
                    fontWeight: 600,
                  }}
                >
                  Clip {String(i + 1).padStart(2, "0")} · Coming soon
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {related.length > 0 && (
        <section style={{ padding: "0 40px 90px" }}>
          <div style={{ maxWidth: 1100, margin: "0 auto" }}>
            <div style={{ fontSize: 13, letterSpacing: 3, textTransform: "uppercase", color: "rgba(255,255,255,.4)", marginBottom: 20 }}>
              More Attractions
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))", gap: 18 }}>
              {related.map((f) => (
                <Link
                  key={f.slug}
                  href={`/attractions/${f.slug}`}
                  style={{
                    display: "block",
                    padding: 18,
                    borderRadius: 16,
                    border: "1px solid rgba(255,255,255,.1)",
                    background: "#10152B",
                    color: "#fff",
                    textDecoration: "none",
                  }}
                >
                  <div style={{ fontSize: 11, letterSpacing: 1, textTransform: "uppercase", color: f.color, marginBottom: 6 }}>{f.cat}</div>
                  <div style={{ fontFamily: "var(--font-archivo-black)", fontSize: 16, textTransform: "uppercase" }}>{f.name}</div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <Footer />
    </div>
  );
}
