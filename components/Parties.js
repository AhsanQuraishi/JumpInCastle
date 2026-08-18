import PartyConfigurator from "./PartyConfigurator";

export default function Parties() {
  return (
    <section id="parties" style={{ padding: "0 40px 90px", background: "linear-gradient(180deg,#0D1226,#0A0E1A)" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto" }}>
        <div data-reveal="" style={{ textAlign: "center", marginBottom: 52 }}>
          <div style={{ fontSize: 13, letterSpacing: 3, textTransform: "uppercase", color: "#ff3f8e", marginBottom: 12 }}>
            Celebrate With Us
          </div>
          <h2
            style={{
              fontFamily: "var(--font-archivo-black)",
              fontSize: "clamp(34px,5vw,60px)",
              textTransform: "uppercase",
              lineHeight: 1,
            }}
          >
            Birthday Party
            <br />
            Packages
          </h2>
          <p style={{ maxWidth: 560, margin: "18px auto 0", color: "rgba(255,255,255,.6)", fontSize: 16 }}>
            Pick a starting package, then tune it to your party — extra kids, add-ons, the price updates as
            you go.
          </p>
        </div>

        <div style={{ maxWidth: 720, margin: "0 auto" }}>
          <PartyConfigurator />
        </div>
      </div>
    </section>
  );
}
