import { facilities } from "@/data/siteData";
import AttractionCarousel from "./AttractionCarousel";
import AttractionsHeading from "./AttractionsHeading";

export default function Attractions() {
  return (
    <section id="attractions" style={{ padding: "90px 40px", maxWidth: 1280, margin: "0 auto" }}>
      <div
        style={{
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: 20,
          marginBottom: 48,
        }}
      >
        <div style={{ minWidth: 280, flex: 1 }}>
          <div style={{ fontSize: 13, letterSpacing: 3, textTransform: "uppercase", color: "#22d3ee", marginBottom: 12 }}>
            The Attractions
          </div>
          <AttractionsHeading />
        </div>
        <p style={{ maxWidth: 380, color: "rgba(255,255,255,.6)", fontSize: 16, textWrap: "pretty" }}>
          From adrenaline-pumping thrills to safe soft-play for the little ones — there&apos;s something for
          every age and every energy level.
        </p>
      </div>

      <AttractionCarousel facilities={facilities} />
    </section>
  );
}
