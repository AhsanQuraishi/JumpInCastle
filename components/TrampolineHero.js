"use client";

import { useEffect, useRef, useState } from "react";
import { HERO_VIVID as VIVID, COLORS } from "@/data/siteData";
import HeroStaticFallback from "./HeroStaticFallback";

const heroSectionStyle = {
  position: "relative",
  width: "100%",
  minHeight: "100vh",
  overflow: "hidden",
  background: "#070914",
};

function DefaultAtmosphere() {
  return (
    <div style={{ position: "absolute", inset: 0, overflow: "hidden" }}>
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "linear-gradient(135deg, #11152c 0%, #070914 72%)",
        }}
      />
      <div
        className="jic-blob"
        style={{ top: "6%", left: "58%", width: 380, height: 380, background: COLORS.magenta, opacity: 0.3, filter: "blur(80px)" }}
      />
      <div
        className="jic-blob"
        style={{ top: "52%", left: "4%", width: 320, height: 320, background: COLORS.cyan, opacity: 0.24, filter: "blur(80px)", animationDelay: "-4s" }}
      />
      <div
        className="jic-blob"
        style={{ top: "66%", left: "68%", width: 300, height: 300, background: COLORS.violet, opacity: 0.26, filter: "blur(80px)", animationDelay: "-8s" }}
      />
      <div
        className="jic-blob"
        style={{ top: "10%", left: "10%", width: 240, height: 240, background: COLORS.yellow, opacity: 0.18, filter: "blur(80px)", animationDelay: "-2s" }}
      />
    </div>
  );
}

export default function TrampolineHero({
  eyebrow = "Now open in Multan",
  lines = ["MULTAN'S BIGGEST", "INDOOR ADVENTURE PARK"],
  hint = "watch the words bounce into place",
  subtitle,
  ctas = [],
  stats = [],
  background = null,
}) {
  const heroRef = useRef(null);
  const canvasRef = useRef(null);
  const spacerRef = useRef(null);
  const [reducedMotion, setReducedMotion] = useState(null);
  const [settled, setSettled] = useState(false);
  const [replayKey, setReplayKey] = useState(0);
  const [spacerHeight, setSpacerHeight] = useState(null);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReducedMotion(mediaQuery.matches);
    update();
    mediaQuery.addEventListener("change", update);
    return () => mediaQuery.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    if (reducedMotion !== false) return;

    const hero = heroRef.current;
    const canvas = canvasRef.current;
    if (!hero || !canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = hero.clientWidth;
    let height = hero.clientHeight;
    let frame = 0;
    let lastTime = performance.now();
    let elapsed = 0;
    let impact = 0;
    let impactX = 0;
    let impactY = 0;
    let allSettled = false;
    let dragged = null;
    let pointerX = 0;
    let pointerY = 0;

    const resize = () => {
      width = hero.clientWidth;
      height = hero.clientHeight;
      canvas.width = Math.max(1, Math.floor(width * window.devicePixelRatio));
      canvas.height = Math.max(1, Math.floor(height * window.devicePixelRatio));
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(
        window.devicePixelRatio,
        0,
        0,
        window.devicePixelRatio,
        0,
        0,
      );
    };
    resize();

    const fontFamily =
      getComputedStyle(document.documentElement)
        .getPropertyValue("--font-archivo-black")
        .trim() || "Arial Black, sans-serif";

    const trampoline = () => {
      const sideWidth = Math.min(width * 0.72, 760);
      return {
        x: width * 0.5,
        y: height * 0.6,
        rx: sideWidth / 2,
        ry: Math.max(28, Math.min(44, sideWidth * 0.075)),
      };
    };

    const titleFont = Math.max(30, Math.min(width * 0.062, 68));
    const BIG_SCALE = 1.55;

    const measureAt = (char, size) => {
      ctx.font = `900 ${size}px ${fontFamily}`;
      return char === " " ? size * 0.3 : ctx.measureText(char).width;
    };

    const stage = trampoline();
    const titleCenterX = width * 0.5;
    const lineGap = titleFont * 1.45;
    const titleTop = height * 0.26;

    const headlineBottom = titleTop + lineGap + titleFont * BIG_SCALE * 0.42;
    const trampolineBottom = stage.y + Math.max(stage.ry, 70) + 28;
    const contentBottom = Math.max(headlineBottom, trampolineBottom);
    if (spacerRef.current) {
      const spacerTop =
        spacerRef.current.getBoundingClientRect().top -
        hero.getBoundingClientRect().top;
        setSpacerHeight(Math.max(140, contentBottom - spacerTop + 18));
    }

    const letters = [];
    const PALETTE = [COLORS.magenta, COLORS.cyan, COLORS.lime, COLORS.orange, COLORS.violet, COLORS.yellow];
    let colorIndex = 0;
    let groupNumber = 0;
    const groupPattern = [2, 3, 4];
    let groupIndex = 0;
    let indexInGroup = 0;

    lines.slice(0, 2).forEach((line, lineIndex) => {
      const chars = [...line];
      const isWordStart = (index) =>
        chars[index] !== " " && (index === 0 || chars[index - 1] === " ");
      const sizes = chars.map((char, index) =>
        char === " "
          ? titleFont
          : isWordStart(index)
            ? titleFont * BIG_SCALE
            : titleFont * (0.86 + Math.random() * 0.22),
      );
      const widths = chars.map((char, index) => measureAt(char, sizes[index]));
      const lineWidth = widths.reduce((sum, value) => sum + value, 0);
      let cursor = titleCenterX - lineWidth / 2;

      chars.forEach((char, index) => {
        const charWidth = widths[index];
        const size = sizes[index];
        const targetX = cursor + charWidth / 2;
        const targetY = titleTop + lineIndex * lineGap;
        cursor += charWidth;
        if (char === " ") return;

        const wordStart = isWordStart(index);
        const groupSize = groupPattern[groupIndex % groupPattern.length];
        const landingOffset =
          (indexInGroup - (groupSize - 1) / 2) * Math.min(58, stage.rx * 0.22);
        const letter = {
          char,
          x: stage.x + landingOffset,
          y: -120 - Math.random() * 180,
          vx: 0,
          vy: 0,
          rotation: (Math.random() - 0.5) * 0.35,
          vr: (Math.random() - 0.5) * 0.2,
          width: charWidth,
          height: size,
          fontSize: size,
          color: PALETTE[colorIndex++ % PALETTE.length],
          big: wordStart,
          targetX,
          targetY,
          releaseAt: 550 + groupNumber * 760 + indexInGroup * 90,
          state: "waiting",

          
          bounceStartedAt: 0,
          bounceCount: 0,
          restitution: 0.58 + Math.random() * 0.16,
          squash: 1,
          stretch: 1,
          grabbed: false,
        };
        letters.push(letter);
        indexInGroup += 1;
        if (indexInGroup >= groupSize) {
          indexInGroup = 0;
          groupNumber += 1;
          groupIndex += 1;
        }
      });
    });

    const triggerImpact = (letter, speed) => {
      const energy = Math.min(1, (speed || 10) / 22);
      impact = Math.max(impact, 0.3 + energy * 0.7);
      impactX = letter.x;
      impactY = stage.y;
      const intensity = 1.18 + energy * 0.5;
      letter.squash = intensity;
      letter.stretch = Math.max(0.52, 2.05 - intensity);
      letter.squashHoldUntil = elapsed + 90;
    };
    

    const updateLetter = (letter, dt) => {
      if (letter.grabbed) {
        letter.x = pointerX;
        letter.y = pointerY;
        letter.vx = 0;
        letter.vy = 0;
        return;
      }

      if (letter.state === "waiting" && elapsed >= letter.releaseAt) {
        letter.state = "falling";
        letter.vy = 1.2;
        letter.vx = (Math.random() - 0.5) * 1.8;
      }

      if (letter.state === "falling" || letter.state === "bouncing") {
        letter.vy += 0.55 * dt;
        letter.x += letter.vx * dt;
        letter.y += letter.vy * dt;
        letter.rotation += letter.vr * dt;

        const landingY = stage.y - stage.ry * 0.55 - letter.height * 0.22;
        if (
          letter.vy > 0 &&
          letter.y >= landingY &&
          Math.abs(letter.x - stage.x) < stage.rx * 0.94
        ) {
          letter.y = landingY;
          letter.bounceCount += 1;
          const incomingSpeed = Math.abs(letter.vy);
          triggerImpact(letter, incomingSpeed);
          letter.vy = -incomingSpeed * letter.restitution;
          letter.vx *= 0.72;
          letter.vr += (Math.random() - 0.5) * 0.05;
          letter.state = "bouncing";
          letter.bounceStartedAt ||= elapsed;

          if (Math.abs(letter.vy) < 3 || letter.bounceCount >= 5) {
            letter.state = "settling";
          }
        }

        if (
          letter.state === "bouncing" &&
          elapsed - letter.bounceStartedAt > 2100
        ) {
          letter.state = "settling";
        }

        if (elapsed > letter.squashHoldUntil) {
          const speedStretch = Math.min(0.3, Math.abs(letter.vy) / 42);
          const targetStretch = 1 + speedStretch;
          const targetSquash = 1 - speedStretch * 0.55;
          const springEase = Math.min(1, 0.22 * dt);
          letter.squash += (targetSquash - letter.squash) * springEase;
          letter.stretch += (targetStretch - letter.stretch) * springEase;
        }
      }

      if (letter.state === "settling") {
        const ease = Math.min(1, 0.08 * dt);
        letter.x += (letter.targetX - letter.x) * ease;
        letter.y += (letter.targetY - letter.y) * ease;
        letter.rotation *= 0.88;
        letter.vx *= 0.82;
        letter.vy *= 0.82;
        letter.squash += (1 - letter.squash) * Math.min(1, 0.15 * dt);
        letter.stretch += (1 - letter.stretch) * Math.min(1, 0.15 * dt);
        if (
          Math.hypot(letter.targetX - letter.x, letter.targetY - letter.y) < 1.5
        ) {
          letter.x = letter.targetX;
          letter.y = letter.targetY;
          letter.state = "settled";
        }
      }

    };

    const drawGlowText = (letter, hovered) => {
      ctx.save();
      ctx.translate(letter.x, letter.y);
      ctx.rotate(letter.rotation);
      ctx.scale(letter.squash, letter.stretch);
      ctx.font = `900 ${letter.fontSize}px ${fontFamily}`;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";

      ctx.fillStyle = hovered ? VIVID.darkYellow : letter.color;
      ctx.fillText(letter.char, 0, 0);

      ctx.restore();
    };

    const drawTrampoline = () => {
      const pulse = impact * 12;
      const rimY = stage.y + pulse * 0.18;
      const matY = stage.y + pulse * 0.42;
      const gradient = ctx.createLinearGradient(
        stage.x - stage.rx,
        rimY,
        stage.x + stage.rx,
        rimY,
      );
      gradient.addColorStop(0, "#00e5ff");
      gradient.addColorStop(0.34, "#7c3cff");
      gradient.addColorStop(0.68, "#ff2d95");
      gradient.addColorStop(1, "#ffd166");

      const ambientGlow = ctx.createRadialGradient(
        stage.x,
        rimY,
        stage.rx * 0.2,
        stage.x,
        rimY,
        stage.rx * 1.15,
      );
      ambientGlow.addColorStop(0, `rgba(124,60,255,${0.22 + impact * 0.12})`);
      ambientGlow.addColorStop(0.55, "rgba(0,229,255,.08)");
      ambientGlow.addColorStop(1, "rgba(0,229,255,0)");
      ctx.save();
      ctx.fillStyle = ambientGlow;
      ctx.beginPath();
      ctx.ellipse(stage.x, rimY, stage.rx * 1.15, stage.ry * 2.1, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();

      ctx.save();
      ctx.globalAlpha = 0.48;
      ctx.fillStyle = "#000";
      ctx.shadowColor = "#ff2d95";
      ctx.shadowBlur = 35;
      ctx.beginPath();
      ctx.ellipse(
        stage.x,
        stage.y + 75,
        stage.rx * 0.92,
        20,
        0,
        0,
        Math.PI * 2,
      );
      ctx.fill();
      ctx.restore();

      ctx.save();
      ctx.strokeStyle = "rgba(0,229,255,.22)";
      ctx.shadowColor = "#00e5ff";
      ctx.shadowBlur = 34;
      ctx.lineWidth = 21;
      ctx.beginPath();
      ctx.ellipse(
        stage.x,
        rimY + 20,
        stage.rx * 0.98,
        stage.ry * 0.78,
        0,
        0,
        Math.PI * 2,
      );
      ctx.stroke();
      ctx.restore();

      [-0.62, 0, 0.62].forEach((factor, index) => {
        const x = stage.x + stage.rx * factor;
        const footX = x + factor * 16;
        const footY = stage.y + 70;
        const legGradient = ctx.createLinearGradient(x, rimY, x, footY);
        legGradient.addColorStop(0, "#ecfdff");
        legGradient.addColorStop(0.5, index % 2 ? "#7c3cff" : "#ff2d95");
        legGradient.addColorStop(1, "#17142e");
        ctx.save();
        ctx.strokeStyle = legGradient;
        ctx.lineWidth = 9;
        ctx.lineCap = "round";
        ctx.shadowColor = "#ff2d95";
        ctx.shadowBlur = 15;
        ctx.beginPath();
        ctx.moveTo(x, rimY + 20);
        ctx.lineTo(footX, footY);
        ctx.stroke();
        ctx.restore();

        ctx.save();
        ctx.fillStyle = "#ffd166";
        ctx.shadowColor = "#ffd166";
        ctx.shadowBlur = 14;
        ctx.beginPath();
        ctx.ellipse(footX, footY, 9, 4.5, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = "rgba(255,255,255,.8)";
        ctx.lineWidth = 1;
        ctx.shadowBlur = 0;
        ctx.beginPath();
        ctx.ellipse(footX, footY - 1, 9, 4.5, 0, Math.PI, Math.PI * 2);
        ctx.stroke();
        ctx.restore();
      });

      ctx.save();
      ctx.strokeStyle = gradient;
      ctx.shadowColor = "#00e5ff";
      ctx.shadowBlur = 28 + impact * 20;
      ctx.lineWidth = 13;
      ctx.beginPath();
      ctx.ellipse(stage.x, rimY, stage.rx, stage.ry, 0, 0, Math.PI * 2);
      ctx.stroke();
      ctx.strokeStyle = "rgba(255,255,255,.7)";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.ellipse(
        stage.x,
        rimY - 4,
        stage.rx * 0.98,
        stage.ry * 0.9,
        0,
        Math.PI,
        Math.PI * 2,
      );
      ctx.stroke();
      ctx.restore();

      const matGradient = ctx.createRadialGradient(
        stage.x,
        matY - 6,
        5,
        stage.x,
        matY,
        stage.rx,
      );
      matGradient.addColorStop(0, "#33206e");
      matGradient.addColorStop(0.55, "#121033");
      matGradient.addColorStop(1, "#040510");
      ctx.save();
      ctx.fillStyle = matGradient;
      ctx.shadowColor = "#7c3cff";
      ctx.shadowBlur = 22;
      ctx.beginPath();
      ctx.ellipse(
        stage.x,
        matY,
        stage.rx * 0.86,
        stage.ry * 0.82,
        0,
        0,
        Math.PI * 2,
      );
      ctx.fill();
      ctx.clip();
      ctx.strokeStyle = "rgba(255,255,255,.11)";
      ctx.lineWidth = 1.5;
      for (let x = stage.x - stage.rx; x < stage.x + stage.rx; x += 17) {
        ctx.beginPath();
        ctx.moveTo(x, matY - stage.ry);
        ctx.lineTo(x + stage.ry * 1.6, matY + stage.ry);
        ctx.stroke();
      }
      for (let i = 0; i < 18; i += 1) {
        const theta = (i / 18) * Math.PI * 2;
        ctx.beginPath();
        ctx.moveTo(stage.x, matY);
        ctx.lineTo(
          stage.x + Math.cos(theta) * stage.rx * 0.82,
          matY + Math.sin(theta) * stage.ry * 0.68,
        );
        ctx.strokeStyle =
          i % 2 ? "rgba(0,229,255,.17)" : "rgba(255,45,149,.17)";
        ctx.stroke();
      }
      ctx.restore();

      ctx.save();
      ctx.beginPath();
      ctx.ellipse(stage.x, matY, stage.rx * 0.86, stage.ry * 0.82, 0, 0, Math.PI * 2);
      ctx.clip();
      const sheen = ctx.createLinearGradient(
        stage.x - stage.rx * 0.5,
        matY - stage.ry * 0.9,
        stage.x + stage.rx * 0.3,
        matY - stage.ry * 0.1,
      );
      sheen.addColorStop(0, "rgba(255,255,255,0)");
      sheen.addColorStop(0.5, "rgba(255,255,255,.14)");
      sheen.addColorStop(1, "rgba(255,255,255,0)");
      ctx.fillStyle = sheen;
      ctx.beginPath();
      ctx.ellipse(
        stage.x - stage.rx * 0.12,
        matY - stage.ry * 0.32,
        stage.rx * 0.58,
        stage.ry * 0.3,
        -0.15,
        0,
        Math.PI * 2,
      );
      ctx.fill();
      ctx.restore();

      const springCount = Math.max(14, Math.round(stage.rx / 20));
      for (let i = 0; i < springCount; i += 1) {
        const theta = (i / springCount) * Math.PI * 2;
        const ox = stage.x + Math.cos(theta) * stage.rx;
        const oy = rimY + Math.sin(theta) * stage.ry;
        const ix = stage.x + Math.cos(theta) * stage.rx * 0.86;
        const iy = matY + Math.sin(theta) * stage.ry * 0.74;
        ctx.save();
        ctx.strokeStyle = i % 2 ? "#ff2d95" : "#00e5ff";
        ctx.shadowColor = ctx.strokeStyle;
        ctx.shadowBlur = 7;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(ix, iy);
        for (let coil = 1; coil <= 4; coil += 1) {
          const t = coil / 4;
          ctx.lineTo(
            ix + (ox - ix) * (t - 0.08) + (coil % 2 ? 3 : -3),
            iy + (oy - iy) * (t - 0.08),
          );
          ctx.lineTo(ix + (ox - ix) * t, iy + (oy - iy) * t);
        }
        ctx.stroke();
        ctx.restore();
      }

      if (impact > 0.03) {
        ctx.save();
        ctx.globalAlpha = impact * 0.72;
        ctx.strokeStyle = "#ffffff";
        ctx.shadowColor = "#00e5ff";
        ctx.shadowBlur = 18;
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.ellipse(
          stage.x,
          matY,
          stage.rx * (0.18 + impact * 0.65),
          stage.ry * (0.16 + impact * 0.55),
          0,
          0,
          Math.PI * 2,
        );
        ctx.stroke();
        ctx.restore();
      }
    };

    const draw = (now) => {
      const dt = Math.min(2.4, Math.max(0.5, (now - lastTime) / 16.67));
      lastTime = now;
      elapsed += dt * 16.67;
      impact *= 0.87;

      ctx.clearRect(0, 0, width, height);
      drawTrampoline();

      letters.forEach((letter) => updateLetter(letter, dt));
      letters.forEach((letter) => drawGlowText(letter, letter === dragged));

      if (
        !allSettled &&
        letters.length > 0 &&
        letters.every((letter) => letter.state === "settled")
      ) {
        allSettled = true;
        setSettled(true);
      }

      if (elapsed > 7200 && !allSettled) {
        letters.forEach((letter) => {
          if (letter.state !== "settled") letter.state = "settling";
        });
      }

      frame = requestAnimationFrame(draw);
    };

    const hitTest = (x, y) => {
      for (let i = letters.length - 1; i >= 0; i -= 1) {
        const letter = letters[i];
        if (
          Math.abs(x - letter.x) < letter.width &&
          Math.abs(y - letter.y) < letter.height
        )
          return letter;
      }
      return null;
    };

    const pointerPosition = (event) => {
      const rect = canvas.getBoundingClientRect();
      return { x: event.clientX - rect.left, y: event.clientY - rect.top };
    };

    const onPointerDown = (event) => {
      const point = pointerPosition(event);
      const hit = hitTest(point.x, point.y);
      if (!hit) return;
      dragged = hit;
      dragged.grabbed = true;
      pointerX = point.x;
      pointerY = point.y;
      canvas.setPointerCapture(event.pointerId);
    };

    const onPointerMove = (event) => {
      if (!dragged) return;
      const point = pointerPosition(event);
      pointerX = point.x;
      pointerY = point.y;
    };

    const releasePointer = () => {
      if (!dragged) return;
      dragged.grabbed = false;
      dragged.state = "bouncing";
      dragged.vy = -10;
      dragged.bounceStartedAt = elapsed;
      dragged = null;
    };

    canvas.addEventListener("pointerdown", onPointerDown);
    canvas.addEventListener("pointermove", onPointerMove);
    canvas.addEventListener("pointerup", releasePointer);
    canvas.addEventListener("pointercancel", releasePointer);
    window.addEventListener("resize", resize);
    frame = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", resize);
      canvas.removeEventListener("pointerdown", onPointerDown);
      canvas.removeEventListener("pointermove", onPointerMove);
      canvas.removeEventListener("pointerup", releasePointer);
      canvas.removeEventListener("pointercancel", releasePointer);
    };
  }, [reducedMotion, lines.join("|"), replayKey]);

  if (reducedMotion !== false) {
    return (
      <section className="jic-hero-fade-in" style={heroSectionStyle}>
        {background || <DefaultAtmosphere />}
        <div className="jic-hero-vignette" />
        <HeroStaticFallback
          eyebrow={eyebrow}
          lines={lines}
          subtitle={subtitle}
          ctas={ctas}
          stats={stats}
        />
      </section>
    );
  }

  return (
    <section
      ref={heroRef}
      className="jic-hero-fade-in"
      style={heroSectionStyle}
    >
      {background || <DefaultAtmosphere />}
      <div className="jic-mat-grid" />
      <div className="jic-hero-vignette" />
      <h1 className="jic-sr-only">{lines.join(" ")}</h1>
      <canvas
        ref={canvasRef}
        style={{
          position: "absolute",
          inset: 0,
          display: "block",
          touchAction: "none",
          cursor: "grab",
        }}
      />

      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
          pointerEvents: "none",
          padding: "8vh 5vw 0",
        }}
      >
        <div
          className="jic-sticker"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            padding: "8px 18px",
            borderRadius: 999,
            fontSize: 13,
            letterSpacing: 2,
            textTransform: "uppercase",
            color: "#0A0E1A",
            marginBottom: 12,
            background: VIVID.darkYellow,
            fontWeight: 700,
          }}
        >
          {eyebrow}
        </div>

        <div className={`jic-tt-hint${settled ? " jic-tt-show" : ""}`}>
          {hint}
        </div>
        <div
          ref={spacerRef}
          style={{
            height: spacerHeight ? `${spacerHeight}px` : "clamp(250px, 42vh, 390px)",
            width: "100%",
            flexShrink: 0,
          }}
        />

        <p className={`jic-tt-subtitle${settled ? " jic-tt-show" : ""}`}>
          {subtitle}
        </p>
        <div
          className={`jic-tt-cta-row${settled ? " jic-tt-show" : ""}`}
          style={{ pointerEvents: settled ? "auto" : "none" }}
        >
          {ctas.map((cta) => (
            <a
              key={cta.label}
              href={cta.href}
              target={cta.external ? "_blank" : undefined}
              rel={cta.external ? "noopener noreferrer" : undefined}
              className="jic-btn-brutal jic-confetti-trigger"
              style={{
                background:
                  cta.variant === "primary"
                    ? `linear-gradient(135deg,${VIVID.pink},${VIVID.darkYellow})`
                    : "transparent",
                color: "#fff",
                fontWeight: 700,
                padding: "15px 32px",
                borderRadius: 999,
                fontSize: 15,
              }}
            >
              {cta.label}
            </a>
          ))}
          <button
            type="button"
            onClick={() => setReplayKey((key) => key + 1)}
            className="jic-tt-replay"
          >
            Replay bounce
          </button>
        </div>

        {stats.length > 0 && (
          <div
            className={`jic-tt-stats${settled ? " jic-tt-show" : ""}`}
            style={{ pointerEvents: settled ? "auto" : "none" }}
          >
            {stats.map((stat) => (
              <div key={stat.label} className="jic-tt-stat">
                <div
                  style={{
                    fontFamily: "var(--font-archivo-black)",
                    fontSize: 26,
                    color: "#fff",
                  }}
                >
                  {stat.value}
                </div>
                <div
                  style={{
                    fontSize: 11,
                    color: "rgba(255,255,255,.55)",
                    letterSpacing: 1,
                    textTransform: "uppercase",
                  }}
                >
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
