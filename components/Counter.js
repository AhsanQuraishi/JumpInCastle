"use client";

import { useEffect, useRef, useState } from "react";

// Splits "19+", "1:8", "20%", "3 hrs" into a numeric part to animate and a suffix to keep static.
function splitValue(raw) {
  const match = String(raw).match(/^(\d+)(.*)$/);
  if (!match) return { num: null, prefix: "", suffix: String(raw) };
  return { num: parseInt(match[1], 10), prefix: "", suffix: match[2] };
}

export default function Counter({ value, duration = 1200 }) {
  const { num, suffix } = splitValue(value);
  const [display, setDisplay] = useState(num === null ? value : "0" + suffix);
  const ref = useRef(null);
  const started = useRef(false);

  useEffect(() => {
    if (num === null) return;
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const start = performance.now();
          const tick = (now) => {
            const t = Math.min((now - start) / duration, 1);
            const eased = 1 - Math.pow(1 - t, 3);
            setDisplay(Math.round(eased * num) + suffix);
            if (t < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
        }
      },
      { threshold: 0.4 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [num, suffix, duration]);

  return (
    <span ref={ref} className="jic-counter">
      {display}
    </span>
  );
}
