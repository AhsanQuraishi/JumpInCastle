export default function Logo() {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
      <div
        className="jic-nav-logo-badge"
        style={{
          width: 42,
          height: 42,
          borderRadius: 12,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "var(--font-archivo-black)",
          fontSize: 22,
          color: "#fff",
          flexShrink: 0,
          boxShadow: "0 4px 18px rgba(255,30,111,.35)",
        }}
      >
        J
      </div>
      <div style={{ lineHeight: 1, whiteSpace: "nowrap" }}>
        <div
          className="jic-logo-title"
          style={{
            fontFamily: "var(--font-archivo-black)",
            fontSize: 18,
            letterSpacing: ".5px",
            background: "linear-gradient(90deg,#ffffff 30%,#ff8fc0 65%,#ffee00)",
            WebkitBackgroundClip: "text",
            backgroundClip: "text",
            color: "transparent",
          }}
        >
          JUMP IN CASTLE
        </div>
        <div className="jic-logo-tagline" style={{ fontSize: 10, letterSpacing: 3, color: "rgba(163,255,77,.8)", textTransform: "uppercase" }}>
          Multan · Adventure Park
        </div>
      </div>
    </div>
  );
}
