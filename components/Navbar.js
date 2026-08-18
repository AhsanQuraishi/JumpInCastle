"use client";

import { useEffect, useRef, useState } from "react";
import { BOOK_HREF, navLinks } from "@/data/siteData";

function Icon({ path }) {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      {path}
    </svg>
  );
}

const ICONS = {
  "#attractions": (
    <Icon path={<path d="M13 2 4 14h6l-1 8 9-12h-6l1-8Z" />} />
  ),
  "#parties": (
    <Icon
      path={
        <>
          <circle cx="12" cy="9" r="6" />
          <path d="M12 15v6M9.5 19.5 12 21l2.5-1.5" />
        </>
      }
    />
  ),
  "#schools": (
    <Icon
      path={
        <>
          <path d="M12 3 2 8l10 5 10-5-10-5Z" />
          <path d="M6 10.5V16c0 1.66 2.69 3 6 3s6-1.34 6-3v-5.5" />
        </>
      }
    />
  ),
  "#membership": <Icon path={<path d="M4 18h16l-1.2-9-4 4-2.8-6-2.8 6-4-4L4 18Z" />} />,
  "#hours": (
    <Icon
      path={
        <>
          <circle cx="12" cy="12" r="9" />
          <path d="M12 7v5l3.5 2" />
        </>
      }
    />
  ),
  "#faq": (
    <Icon
      path={
        <>
          <circle cx="12" cy="12" r="9" />
          <path d="M9.6 9.3a2.4 2.4 0 1 1 3.4 2.2c-.9.4-1.4 1-1.4 2.1" />
          <path d="M12 17h.01" />
        </>
      }
    />
  ),
};

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [hoverIdx, setHoverIdx] = useState(null);
  const [activeIdx, setActiveIdx] = useState(-1);
  const [pill, setPill] = useState({ left: 0, width: 0, opacity: 0 });
  const [menuOpen, setMenuOpen] = useState(false);
  const linkRefs = useRef([]);
  const containerRef = useRef(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll while the mobile menu is open, close on Escape.
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    if (!menuOpen) return;
    const onKey = (e) => e.key === "Escape" && setMenuOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  // Scroll-spy: highlight whichever section is currently in view.
  useEffect(() => {
    const sections = navLinks.map((l) => document.querySelector(l.href)).filter(Boolean);
    if (!sections.length) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = sections.indexOf(entry.target);
            if (idx !== -1) setActiveIdx(idx);
          }
        });
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 }
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  // Position the sliding pill under whichever link is hovered, falling back to the active section.
  useEffect(() => {
    const idx = hoverIdx ?? activeIdx;
    const el = linkRefs.current[idx];
    const container = containerRef.current;
    if (!el || !container) {
      setPill((p) => ({ ...p, opacity: 0 }));
      return;
    }
    const elRect = el.getBoundingClientRect();
    const containerRect = container.getBoundingClientRect();
    setPill({ left: elRect.left - containerRect.left, width: elRect.width, opacity: 1 });
  }, [hoverIdx, activeIdx]);

  return (
    <nav
      className={`jic-navbar${scrolled ? " jic-scrolled" : ""}`}
      style={{
        position: "sticky",
        top: 0,
        zIndex: 50,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "18px 40px",
        background: "rgba(7,7,15,.55)",
        backdropFilter: "blur(18px)",
        WebkitBackdropFilter: "blur(18px)",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <div
          className="jic-nav-logo-badge"
          style={{
            width: 42,
            height: 42,
            borderRadius: 12,
            background: "linear-gradient(135deg,#ff3f8e,#b47aff)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontFamily: "var(--font-archivo-black)",
            fontSize: 22,
            boxShadow: "0 4px 18px rgba(255,30,111,.35)",
          }}
        >
          J
        </div>
        <div style={{ lineHeight: 1 }}>
          <div
            style={{
              fontFamily: "var(--font-archivo-black)",
              fontSize: 18,
              letterSpacing: ".5px",
              background: "linear-gradient(90deg,#ffffff,#e6d9ff)",
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
              color: "transparent",
            }}
          >
            JUMP IN CASTLE
          </div>
          <div style={{ fontSize: 10, letterSpacing: 3, color: "rgba(255,255,255,.45)", textTransform: "uppercase" }}>
            Multan · Adventure Park
          </div>
        </div>
      </div>

      <div
        ref={containerRef}
        onMouseLeave={() => setHoverIdx(null)}
        className="jic-nav-links-desktop"
        style={{
          position: "relative",
          display: "flex",
          gap: 4,
          alignItems: "center",
          fontWeight: 600,
          fontSize: 14,
          flexWrap: "wrap",
          justifyContent: "center",
        }}
      >
        <div
          className="jic-nav-pill"
          style={{ left: pill.left, width: pill.width, opacity: pill.opacity }}
        />
        {navLinks.map((link, i) => (
          <a
            key={link.href}
            ref={(el) => (linkRefs.current[i] = el)}
            href={`/${link.href}`}
            className={`jic-nav-link${activeIdx === i ? " jic-nav-link-active" : ""}`}
            onMouseEnter={() => setHoverIdx(i)}
            style={{ animationDelay: `${0.15 + i * 0.07}s` }}
          >
            <span className="jic-nav-icon">{ICONS[link.href]}</span>
            {link.label}
          </a>
        ))}
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
        <a
          href={BOOK_HREF}
          target="_blank"
          rel="noopener noreferrer"
          className="jic-nav-cta jic-confetti-trigger"
          style={{
            background: "linear-gradient(135deg,#ff3f8e,#b47aff)",
            color: "#fff",
            fontWeight: 600,
            padding: "11px 24px",
            borderRadius: 999,
            fontSize: 14,
            letterSpacing: ".2px",
          }}
        >
          Book Now
        </a>

        <button
          type="button"
          className="jic-nav-toggle"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((o) => !o)}
        >
          <span className={`jic-burger-line${menuOpen ? " jic-open" : ""}`} />
          <span className={`jic-burger-line${menuOpen ? " jic-open" : ""}`} />
          <span className={`jic-burger-line${menuOpen ? " jic-open" : ""}`} />
        </button>
      </div>

      <div className={`jic-mobile-menu${menuOpen ? " jic-open" : ""}`}>
        {navLinks.map((link, i) => (
          <a
            key={link.href}
            href={`/${link.href}`}
            className="jic-mobile-link"
            style={{ transitionDelay: menuOpen ? `${i * 0.05}s` : "0s" }}
            onClick={() => setMenuOpen(false)}
          >
            <span className="jic-nav-icon" style={{ opacity: 0.85 }}>{ICONS[link.href]}</span>
            {link.label}
          </a>
        ))}
        <a
          href={BOOK_HREF}
          target="_blank"
          rel="noopener noreferrer"
          className="jic-mobile-link jic-mobile-cta jic-confetti-trigger"
          style={{ transitionDelay: menuOpen ? `${navLinks.length * 0.05}s` : "0s" }}
          onClick={() => setMenuOpen(false)}
        >
          Book Now →
        </a>
      </div>
    </nav>
  );
}
