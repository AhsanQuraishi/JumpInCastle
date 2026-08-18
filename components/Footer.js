import { BOOK_HREF } from "@/data/siteData";

const footerLinks = [
  { href: BOOK_HREF, label: "WhatsApp", external: true },
  { href: "#", label: "Instagram", external: false },
  { href: "#", label: "Facebook", external: false },
  { href: "#attractions", label: "Attractions", external: false },
  { href: "#parties", label: "Parties", external: false },
];

export default function Footer() {
  return (
    <footer
      style={{
        position: "relative",
        padding: "80px 40px 46px",
        background: "linear-gradient(180deg,#0A0E1A,#0D1226)",
        borderTop: "1px solid rgba(255,255,255,.08)",
        textAlign: "center",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: 20,
          left: "50%",
          transform: "translateX(-50%)",
          width: 600,
          maxWidth: "90%",
          height: 200,
          background: "radial-gradient(circle,rgba(255,30,111,.25),transparent 70%)",
          filter: "blur(40px)",
        }}
      />
      <div style={{ position: "relative", maxWidth: 760, margin: "0 auto" }}>
        <h2
          style={{
            fontFamily: "var(--font-archivo-black)",
            fontSize: "clamp(34px,6vw,72px)",
            textTransform: "uppercase",
            lineHeight: 0.95,
            marginBottom: 24,
          }}
        >
          Ready To
          <br />
          Jump In?
        </h2>
        <a
          href={BOOK_HREF}
          target="_blank"
          rel="noopener noreferrer"
          className="jic-footer-cta jic-btn-brutal jic-confetti-trigger"
          style={{
            display: "inline-block",
            background: "linear-gradient(135deg,#ff3f8e,#b47aff)",
            color: "#fff",
            fontWeight: 700,
            padding: "18px 44px",
            borderRadius: 999,
            fontSize: 18,
          }}
        >
          Book Your Session
        </a>

        <div style={{ display: "flex", gap: 24, justifyContent: "center", flexWrap: "wrap", margin: "44px 0 30px", fontSize: 14 }}>
          {footerLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target={link.external ? "_blank" : undefined}
              rel={link.external ? "noopener noreferrer" : undefined}
              style={{ color: "rgba(255,255,255,.7)" }}
            >
              {link.label}
            </a>
          ))}
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 10, justifyContent: "center", marginBottom: 14 }}>
          <div
            style={{
              width: 32,
              height: 32,
              borderRadius: 9,
              background: "linear-gradient(135deg,#ff3f8e,#b47aff)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontFamily: "var(--font-archivo-black)",
              fontSize: 16,
            }}
          >
            J
          </div>
          <span style={{ fontFamily: "var(--font-archivo-black)", fontSize: 15 }}>JUMP IN CASTLE</span>
        </div>
        <div style={{ color: "rgba(255,255,255,.4)", fontSize: 13 }}>
          Multan, Pakistan · © 2026 Jump In Castle. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
