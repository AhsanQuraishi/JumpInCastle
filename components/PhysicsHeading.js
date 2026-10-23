"use client";

import { useEffect, useRef, useState } from "react";
import Matter from "matter-js";
import { COLORS } from "@/data/siteData";

const PALETTE = [COLORS.magenta, COLORS.cyan, COLORS.lime, COLORS.orange, COLORS.violet, COLORS.yellow];

export default function PhysicsHeading({ text, height = 130 }) {
  const wrapRef = useRef(null);
  const canvasRef = useRef(null);
  const [reducedMotion, setReducedMotion] = useState(null);
  const [playKey, setPlayKey] = useState(0);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mq.matches);
    const onChange = (e) => setReducedMotion(e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  // Replay the fall/bounce/settle every time this heading actually scrolls
  // into view — otherwise it plays once on mount and, since this section is
  // below the fold, is usually already settled before anyone scrolls to it.
  useEffect(() => {
    if (reducedMotion !== false) return;
    const wrap = wrapRef.current;
    if (!wrap) return;
    let wasVisible = false;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !wasVisible) {
          setPlayKey((k) => k + 1);
        }
        wasVisible = entry.isIntersecting;
      },
      { threshold: 0.35 }
    );
    observer.observe(wrap);
    return () => observer.disconnect();
  }, [reducedMotion]);

  useEffect(() => {
    if (reducedMotion !== false || playKey === 0) return;
    const wrap = wrapRef.current;
    const canvas = canvasRef.current;
    if (!wrap || !canvas) return;

    const { Engine, World, Bodies, Body, Events, Runner } = Matter;

    let W = wrap.clientWidth;
    let H = wrap.clientHeight;
    canvas.width = W;
    canvas.height = H;
    const ctx = canvas.getContext("2d");

    const engine = Engine.create();
    engine.gravity.y = 1.1;
    const world = engine.world;

    const resolvedFont =
      getComputedStyle(document.documentElement).getPropertyValue("--font-archivo-black").trim() || "sans-serif";
    const FONT_SIZE = Math.max(24, Math.min(W * 0.052, 56));
    const FONT = `900 ${FONT_SIZE}px ${resolvedFont}`;
    ctx.font = FONT;
    const measure = (ch) => ctx.measureText(ch).width;

    const letterBodies = [];
    const centerY = H * 0.5;
    const groundY = H - 6;

    const chars = [...text];
    const widths = chars.map((ch) => (ch === " " ? FONT_SIZE * 0.3 : measure(ch)));
    const totalWidth = widths.reduce((a, b) => a + b, 0);
    let cursorX = (W - totalWidth) / 2;
    let letterCounter = 0;

    chars.forEach((ch, i) => {
      const w = widths[i];
      const cx = cursorX + w / 2;
      cursorX += w;
      if (ch === " ") return;
      const startY = -40 - Math.random() * H * 2.2;
      const body = Bodies.rectangle(cx, startY, w * 0.86, FONT_SIZE * 0.72, {
        restitution: 0.45,
        friction: 0.25,
        frictionAir: 0.014,
        density: 0.0016,
        chamfer: { radius: 5 },
      });
      body.letter = ch;
      body.targetX = cx;
      body.targetY = centerY;
      body.color = PALETTE[letterCounter++ % PALETTE.length];
      Body.setAngle(body, Math.random() * 0.4 - 0.2);
      letterBodies.push(body);
      World.add(world, body);
    });

    const ground = Bodies.rectangle(W / 2, groundY + 20, W * 1.4, 40, { isStatic: true, restitution: 0.4, friction: 0.25 });
    const wallL = Bodies.rectangle(-20, H / 2, 40, H * 4, { isStatic: true });
    const wallR = Bodies.rectangle(W + 20, H / 2, 40, H * 4, { isStatic: true });
    World.add(world, [ground, wallL, wallR]);

    let phase = "falling";
    let settled = false;
    let settleCheckCount = 0;

    const onAfterUpdateSettleCheck = () => {
      if (settled) return;
      const avgSpeed = letterBodies.reduce((s, b) => s + Math.abs(b.velocity.x) + Math.abs(b.velocity.y), 0) / letterBodies.length;
      if (avgSpeed < 0.35) {
        settleCheckCount++;
        if (settleCheckCount > 18) {
          settled = true;
          phase = "homing";
          letterBodies.forEach((b) => {
            b.collisionFilter.group = -1;
          });
        }
      } else {
        settleCheckCount = 0;
      }
    };
    Events.on(engine, "afterUpdate", onAfterUpdateSettleCheck);
    const fallbackTimer = setTimeout(() => {
      settled = true;
      phase = "homing";
      letterBodies.forEach((b) => {
        b.collisionFilter.group = -1;
      });
    }, 4200);

    const onAfterUpdateHoming = () => {
      if (phase !== "homing") return;
      letterBodies.forEach((b) => {
        const ease = 0.1;
        Body.setPosition(b, {
          x: b.position.x + (b.targetX - b.position.x) * ease,
          y: b.position.y + (b.targetY - b.position.y) * ease,
        });
        Body.setAngle(b, b.angle + (0 - b.angle) * ease);
        Body.setVelocity(b, { x: 0, y: 0 });
        Body.setAngularVelocity(b, 0);
      });
    };
    Events.on(engine, "afterUpdate", onAfterUpdateHoming);

    const runner = Runner.create();
    Runner.run(runner, engine);

    let rafId;
    function draw() {
      // Once every letter has homed in, the frame is static — stop the
      // physics runner and the draw loop instead of repainting forever.
      const done =
        phase === "homing" &&
        letterBodies.every(
          (b) => Math.abs(b.targetX - b.position.x) < 0.5 && Math.abs(b.targetY - b.position.y) < 0.5
        );
      ctx.clearRect(0, 0, W, H);
      ctx.font = FONT;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      letterBodies.forEach((b) => {
        ctx.save();
        ctx.translate(b.position.x, b.position.y);
        ctx.rotate(b.angle);
        ctx.fillStyle = b.color;
        ctx.fillText(b.letter, 0, 0);
        ctx.restore();
      });
      if (done) {
        Runner.stop(runner);
        return;
      }
      rafId = requestAnimationFrame(draw);
    }
    draw();

    const onResize = () => {
      W = wrap.clientWidth;
      H = wrap.clientHeight;
      canvas.width = W;
      canvas.height = H;
    };
    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("resize", onResize);
      clearTimeout(fallbackTimer);
      cancelAnimationFrame(rafId);
      Events.off(engine, "afterUpdate", onAfterUpdateSettleCheck);
      Events.off(engine, "afterUpdate", onAfterUpdateHoming);
      Runner.stop(runner);
      World.clear(world, false);
      Engine.clear(engine);
    };
  }, [reducedMotion, text, playKey]);

  if (reducedMotion !== false) {
    return (
      <h2
        style={{
          fontFamily: "var(--font-archivo-black)",
          fontSize: "clamp(34px,5vw,60px)",
          lineHeight: 1,
          textTransform: "uppercase",
        }}
      >
        {text}
      </h2>
    );
  }

  return (
    <div ref={wrapRef} style={{ position: "relative", width: "100%", height }}>
      <h2 className="jic-sr-only">{text}</h2>
      <canvas ref={canvasRef} style={{ display: "block", width: "100%", height: "100%" }} />
    </div>
  );
}
