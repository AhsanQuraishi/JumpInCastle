"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

const VISIBLE_RANGE = 4;

function shortestOffset(i, active, count) {
  let d = i - active;
  if (d > count / 2) d -= count;
  if (d < -count / 2) d += count;
  return d;
}
function clamp(v, min, max) {
  return Math.min(Math.max(v, min), max);
}

export default function AttractionCarousel({ facilities }) {
  const [active, setActive] = useState(0);
  const [dragging, setDragging] = useState(false);
  const dragStartX = useRef(0);
  const router = useRouter();
  const count = facilities.length;

  const go = useCallback((delta) => setActive((a) => (a + delta + count) % count), [count]);
  const goTo = useCallback((i) => setActive(i), []);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [go]);

  const onPointerDown = (e) => {
    setDragging(true);
    dragStartX.current = e.clientX ?? e.touches?.[0]?.clientX ?? 0;
  };
  const onPointerUp = (e) => {
    if (!dragging) return;
    setDragging(false);
    const endX = e.clientX ?? e.changedTouches?.[0]?.clientX ?? dragStartX.current;
    const delta = endX - dragStartX.current;
    if (Math.abs(delta) > 40) go(delta < 0 ? 1 : -1);
  };

  const handleCardClick = (i, facility) => {
    const offset = shortestOffset(i, active, count);
    if (offset === 0) {
      router.push(`/attractions/${facility.slug}`);
    } else {
      goTo(i);
    }
  };

  return (
    <div>
      <div
        style={{ position: "relative", height: "min(56vw, 460px)", perspective: 1600 }}
        onMouseDown={onPointerDown}
        onMouseUp={onPointerUp}
        onMouseLeave={() => setDragging(false)}
        onTouchStart={onPointerDown}
        onTouchEnd={onPointerUp}
      >
        {facilities.map((f, i) => {
          const offset = shortestOffset(i, active, count);
          const abs = Math.abs(offset);
          const hidden = abs > VISIBLE_RANGE;
          const isActive = offset === 0;

          const translateX = offset * 190;
          const rotateY = clamp(offset * -28, -78, 78);
          const scale = Math.max(1 - abs * 0.14, 0.42);
          const translateZ = -abs * 90;
          const opacity = hidden ? 0 : Math.max(1 - abs * 0.22, 0.08);
          const zIndex = 100 - abs;

          return (
            <button
              key={f.slug}
              type="button"
              onClick={() => handleCardClick(i, f)}
              aria-label={isActive ? `Open ${f.name}` : `Show ${f.name}`}
              className="jic-carousel-card"
              style={{
                "--glow": f.color,
                position: "absolute",
                top: "50%",
                left: "50%",
                width: 250,
                height: "min(52vw, 420px)",
                marginTop: "calc(min(52vw, 420px) / -2)",
                marginLeft: -125,
                borderRadius: 24,
                overflow: "hidden",
                border: "1px solid rgba(255,255,255,.14)",
                background: "#10152B",
                cursor: "pointer",
                padding: 0,
                transform: `translateX(${translateX}px) translateZ(${translateZ}px) rotateY(${rotateY}deg) scale(${scale})`,
                opacity,
                zIndex,
                pointerEvents: hidden ? "none" : "auto",
                transition: dragging
                  ? "none"
                  : "transform .55s cubic-bezier(.22,.9,.24,1.1), opacity .5s ease, box-shadow .4s ease, border-color .4s ease",
                boxShadow: isActive
                  ? `0 0 70px ${f.color}99, 0 0 130px ${f.color}44, 0 20px 40px -10px rgba(0,0,0,.6)`
                  : abs === 1
                  ? `0 0 30px ${f.color}44`
                  : "none",
                borderColor: isActive ? f.color : "rgba(255,255,255,.14)",
              }}
            >
              <div style={{ position: "relative", width: "100%", height: "100%" }}>
                {f.hasImg ? (
                  <Image src={f.img} alt={f.name} fill sizes="250px" style={{ objectFit: "cover" }} />
                ) : (
                  <div style={{ position: "absolute", inset: 0, background: f.imgBg }} />
                )}
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    background: "linear-gradient(180deg,rgba(7,7,15,.1) 40%,rgba(7,7,15,.92))",
                  }}
                />
                <div style={{ position: "absolute", top: 14, left: 14, fontSize: 10, letterSpacing: 1.5, textTransform: "uppercase", padding: "5px 11px", borderRadius: 999, background: f.color, color: "#0A0E1A", fontWeight: 700 }}>
                  {f.cat}
                </div>
                <div style={{ position: "absolute", left: 18, right: 18, bottom: 18, textAlign: "left" }}>
                  <div style={{ fontFamily: "var(--font-archivo-black)", fontSize: 20, textTransform: "uppercase", lineHeight: 1.05, color: "#fff" }}>
                    {f.name}
                  </div>
                  {isActive && (
                    <div style={{ marginTop: 8, fontSize: 11, fontWeight: 700, letterSpacing: 1, textTransform: "uppercase", color: f.color }}>
                      Click to explore →
                    </div>
                  )}
                </div>
              </div>
            </button>
          );
        })}
      </div>

      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", marginTop: 30 }}>
        <div style={{ width: 120, height: 3, borderRadius: 2, background: "rgba(255,255,255,.12)", overflow: "hidden" }}>
          <div
            style={{
              height: "100%",
              borderRadius: 2,
              background: facilities[active].color,
              width: `${((active + 1) / count) * 100}%`,
              transition: "width .4s ease, background .4s ease",
            }}
          />
        </div>
      </div>
    </div>
  );
}
