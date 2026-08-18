"use client";

import { useEffect } from "react";

const COLORS = ["#ff3f8e", "#22d3ee", "#a3ff4d", "#ff9433", "#b47aff", "#ffee00"];
const SHAPES = ["50%", "4px", "2px 12px"];

function burst(x, y) {
  const count = 18;
  for (let i = 0; i < count; i++) {
    const piece = document.createElement("div");
    const angle = (Math.PI * 2 * i) / count + Math.random() * 0.5;
    const dist = 60 + Math.random() * 90;
    const dx = Math.cos(angle) * dist;
    const dy = Math.sin(angle) * dist - 30;
    const size = 6 + Math.random() * 6;

    piece.className = "jic-confetti-piece";
    piece.style.left = `${x}px`;
    piece.style.top = `${y}px`;
    piece.style.width = `${size}px`;
    piece.style.height = `${size}px`;
    piece.style.background = COLORS[i % COLORS.length];
    piece.style.borderRadius = SHAPES[i % SHAPES.length];
    piece.style.setProperty("--dx", `${dx}px`);
    piece.style.setProperty("--dy", `${dy}px`);
    piece.style.setProperty("--rot2", `${360 + Math.random() * 360}deg`);

    document.body.appendChild(piece);
    piece.addEventListener("animationend", () => piece.remove());
  }
}

export default function ConfettiLayer() {
  useEffect(() => {
    const onClick = (e) => {
      const trigger = e.target.closest(".jic-confetti-trigger");
      if (!trigger) return;
      burst(e.clientX, e.clientY);
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  return null;
}
