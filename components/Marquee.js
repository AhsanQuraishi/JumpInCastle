import { marqueeWords } from "@/data/siteData";

function WordRow({ keyPrefix }) {
  return (
    <>
      {marqueeWords.map((w, i) => (
        <span
          key={`${keyPrefix}-${i}`}
          className="jic-chip"
          style={{ background: w.color, color: "#0A0E1A", border: "none" }}
        >
          {w.text}
        </span>
      ))}
    </>
  );
}

export default function Marquee() {
  return (
    <div
      style={{
        overflow: "hidden",
        borderTop: "3px solid rgba(255,255,255,.9)",
        borderBottom: "3px solid rgba(255,255,255,.9)",
        background: "#0D1226",
        padding: "16px 0",
        transform: "rotate(-0.6deg)",
        margin: "8px 0",
      }}
    >
      <div
        style={{
          display: "flex",
          whiteSpace: "nowrap",
          width: "max-content",
          animation: "marquee 26s linear infinite",
          fontFamily: "var(--font-archivo-black)",
          fontSize: 18,
          textTransform: "uppercase",
          letterSpacing: 1,
        }}
      >
        <WordRow keyPrefix="a" />
        <WordRow keyPrefix="b" />
      </div>
    </div>
  );
}
