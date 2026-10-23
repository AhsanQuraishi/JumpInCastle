"use client";

import dynamic from "next/dynamic";

const LINES = ["MULTAN'S BIGGEST", "INDOOR ADVENTURE PARK"];
const SUBTITLE =
  "19 next-level attractions under one roof — trampolines, ninja courses, laser tag, immersive projection rooms and a whole lot more. Where every jump becomes a memory.";
const CTAS = [
  { label: "Book Your Jump →", href: "/book", variant: "primary" },
  { label: "Explore Attractions", href: "#attractions", variant: "ghost" },
];
const STATS = [
  { value: "19+", label: "Attractions" },
  { value: "All Ages", label: "Welcome" },
  { value: "7 Days", label: "A Week" },
];

// Matter.js touches canvas/window — keep it fully out of SSR. While the
// chunk loads, show nothing but the hero's own backdrop so the page goes
// straight from blank to the falling letters instead of via static text.
const TrampolineHero = dynamic(() => import("./TrampolineHero"), {
  ssr: false,
  loading: () => <div style={{ position: "relative", background: "#10152B", minHeight: "100vh" }} />,
});

export default function Hero() {
  return (
    <TrampolineHero
      eyebrow="Now open in Multan"
      lines={LINES}
      hint="grab a letter — it'll bounce back into place"
      subtitle={SUBTITLE}
      ctas={CTAS}
      stats={STATS}
    />
  );
}

