"use client";

import dynamic from "next/dynamic";
import { BOOK_HREF } from "@/data/siteData";

const LINES = ["MULTAN'S BIGGEST", "INDOOR ADVENTURE PARK"];
const SUBTITLE =
  "19 next-level attractions under one roof — trampolines, ninja courses, laser tag, immersive projection rooms and a whole lot more. Where every jump becomes a memory.";
const CTAS = [
  { label: "Book Your Jump →", href: BOOK_HREF, external: true, variant: "primary" },
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

const HERO_BACKGROUND = (
  <div style={{ position: "absolute", inset: 0 }}>
    {/* Full-quality image — dimmed via an overlay tint below, not via its
        own opacity, so it doesn't wash out/look compressed. */}
    <div
      style={{
        position: "absolute",
        inset: 0,
        backgroundImage: "url(/images/neon_castle_without_text.png)",
        backgroundSize: "cover",
        backgroundPosition: "top center",
        backgroundRepeat: "no-repeat",
      }}
    />
    {/* Light vignette for heading/subtitle legibility over the image. */}
    <div
      style={{
        position: "absolute",
        inset: 0,
        background:
          "linear-gradient(180deg, rgba(16,21,43,.88) 0%, rgba(16,21,43,.72) 22vw, rgba(16,21,43,.8) 50vw, rgba(16,21,43,.94) 100%)",
      }}
    />
  </div>
);

export default function Hero() {
  return (
    <TrampolineHero
      eyebrow="Now open in Multan"
      lines={LINES}
      hint="grab a letter — it'll bounce back into place"
      subtitle={SUBTITLE}
      ctas={CTAS}
      stats={STATS}
      background={HERO_BACKGROUND}
    />
  );
}

