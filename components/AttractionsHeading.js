"use client";

import dynamic from "next/dynamic";

const PhysicsHeading = dynamic(() => import("./PhysicsHeading"), {
  ssr: false,
  loading: () => (
    <h2
      style={{
        fontFamily: "var(--font-archivo-black)",
        fontSize: "clamp(34px,5vw,60px)",
        lineHeight: 1,
        textTransform: "uppercase",
      }}
    >
      19 Ways To Play
    </h2>
  ),
});

export default function AttractionsHeading() {
  return <PhysicsHeading text="19 Ways To Play" height={130} />;
}
