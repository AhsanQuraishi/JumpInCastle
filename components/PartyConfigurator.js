"use client";

import { useMemo, useState } from "react";
import { packages, partyAddons, EXTRA_KID_PRICE, waLink } from "@/data/siteData";

function formatPKR(n) {
  return "Rs " + n.toLocaleString("en-US");
}

const SLIDER_RANGE = 15;

// Add-ons split across two themed columns, mirroring the handoff's
// two-team layout but with our own naming.
const COLUMN_A_IDS = ["hour", "host", "loot"];
const COLUMNS = [
  {
    title: "Team Bounce Picks",
    accent: "#ff9433",
    border: "rgba(255,148,51,.35)",
    wash: "rgba(255,148,51,.14)",
    ids: COLUMN_A_IDS,
  },
  {
    title: "Team Sparkle Picks",
    accent: "#ff3f8e",
    border: "rgba(255,63,142,.30)",
    wash: "rgba(255,63,142,.13)",
    ids: partyAddons.map((a) => a.id).filter((id) => !COLUMN_A_IDS.includes(id)),
  },
];

export default function PartyConfigurator() {
  const popularIdx = Math.max(0, packages.findIndex((p) => p.popular));
  const [pkgIdx, setPkgIdx] = useState(popularIdx);
  const pkg = packages[pkgIdx];
  const [guests, setGuests] = useState(pkg.baseKids + 2);
  const [selected, setSelected] = useState(["loot"]);

  const clampedGuests = Math.max(pkg.baseKids, guests);
  const extraKids = Math.max(0, clampedGuests - pkg.baseKids);
  const sliderMax = pkg.baseKids + SLIDER_RANGE;
  const pct = ((clampedGuests - pkg.baseKids) / SLIDER_RANGE) * 100;

  const total = useMemo(() => {
    const addOnsTotal = partyAddons.filter((a) => selected.includes(a.id)).reduce((s, a) => s + a.price, 0);
    return pkg.basePrice + extraKids * EXTRA_KID_PRICE + addOnsTotal;
  }, [pkg, extraKids, selected]);

  const selectPackage = (idx) => {
    setPkgIdx(idx);
    setGuests((g) => Math.max(packages[idx].baseKids, Math.min(g, packages[idx].baseKids + SLIDER_RANGE)));
  };

  const toggle = (id) => setSelected((s) => (s.includes(id) ? s.filter((x) => x !== id) : [...s, id]));

  const messageLines = [
    `Hi Jump In Castle! I'd like to book a birthday party:`,
    `• Package: ${pkg.name} (${clampedGuests} kids)`,
    selected.length
      ? `• Add-ons: ${partyAddons.filter((a) => selected.includes(a.id)).map((a) => a.label).join(", ")}`
      : null,
    `• Estimated total: ${formatPKR(total)}`,
  ].filter(Boolean);
  const bookHref = waLink(messageLines.join("\n"));

  return (
    <div style={{ background: "#0A0E1A" }}>
      <div className="jic-pkg-body" style={{ position: "relative", overflow: "hidden", padding: "56px 46px 0" }}>
        <div
          style={{
            position: "absolute",
            pointerEvents: "none",
            filter: "blur(10px)",
            inset: "-40% 55% 40% -20%",
            background: "radial-gradient(circle, rgba(255,148,51,.22), transparent 65%)",
          }}
        />
        <div
          style={{
            position: "absolute",
            pointerEvents: "none",
            filter: "blur(10px)",
            inset: "40% -20% -40% 55%",
            background: "radial-gradient(circle, rgba(255,63,142,.20), transparent 65%)",
          }}
        />

        <div style={{ position: "relative", maxWidth: 820, margin: "0 auto" }}>
          <div className="jic-pkg-header">
            <h2
              className="jic-pkg-heading"
              style={{
                fontFamily: "var(--font-archivo-black)",
                fontSize: 60,
                lineHeight: 0.9,
                letterSpacing: "-0.02em",
                color: "#fff",
                textTransform: "uppercase",
                margin: 0,
              }}
            >
              Pick Your
              <br />
              <span style={{ color: pkg.accent, transition: "color .2s ease" }}>Package</span>
            </h2>
            <p style={{ maxWidth: 250, fontSize: 14, lineHeight: 1.5, color: "rgba(255,255,255,.5)", margin: 0 }}>
              Three quick choices, one live price — tune it exactly to your party.
            </p>
          </div>

          <div
            className="jic-pkg-switch"
            style={{
              marginBottom: 30,
              borderRadius: 999,
              border: "1px solid rgba(255,255,255,.09)",
              background: "rgba(255,255,255,.05)",
              padding: 6,
            }}
          >
            {packages.map((p, i) => {
              const active = i === pkgIdx;
              return (
                <button
                  key={p.name}
                  type="button"
                  onClick={() => selectPackage(i)}
                  style={{
                    flex: 1,
                    padding: 14,
                    borderRadius: 999,
                    fontSize: 15,
                    border: "none",
                    cursor: "pointer",
                    transition: "background .15s ease, color .15s ease, box-shadow .15s ease",
                    background: active ? p.accent : "transparent",
                    color: active ? "#0A0E1A" : "rgba(255,255,255,.55)",
                    fontWeight: active ? 900 : 700,
                    boxShadow: active ? `0 8px 30px -8px ${p.accent}B3` : "none",
                  }}
                >
                  {p.name} · {p.baseKids} kids
                </button>
              );
            })}
          </div>

          <div className="jic-pkg-columns">
            {COLUMNS.map((col) => (
              <div
                key={col.title}
                style={{
                  borderRadius: 20,
                  border: `1px solid ${col.border}`,
                  background: `linear-gradient(140deg, ${col.wash}, rgba(0,0,0,.02))`,
                  padding: 24,
                }}
              >
                <span
                  style={{
                    fontSize: 11,
                    fontWeight: 900,
                    textTransform: "uppercase",
                    letterSpacing: ".18em",
                    color: col.accent,
                  }}
                >
                  {col.title}
                </span>
                <div style={{ marginTop: 16, display: "flex", flexDirection: "column", gap: 10 }}>
                  {partyAddons
                    .filter((a) => col.ids.includes(a.id))
                    .map((a) => {
                      const on = selected.includes(a.id);
                      return (
                        <button
                          key={a.id}
                          type="button"
                          onClick={() => toggle(a.id)}
                          aria-pressed={on}
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: 12,
                            borderRadius: 12,
                            padding: "12px 14px",
                            textAlign: "left",
                            cursor: "pointer",
                            border: "none",
                            transition: "background .15s ease",
                            background: on ? col.accent : "rgba(255,255,255,.05)",
                          }}
                        >
                          <span style={{ flex: 1, fontSize: 14, fontWeight: on ? 900 : 700, color: on ? "#0A0E1A" : "#fff" }}>
                            {a.label}
                          </span>
                          <span
                            style={{
                              fontFamily: "var(--font-archivo-black)",
                              fontSize: 13,
                              fontWeight: 700,
                              color: on ? "#0A0E1A" : col.accent,
                            }}
                          >
                            {formatPKR(a.price)}
                          </span>
                        </button>
                      );
                    })}
                </div>
              </div>
            ))}
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 20,
              marginBottom: 34,
              borderRadius: 18,
              border: "1px solid rgba(255,255,255,.08)",
              background: "rgba(255,255,255,.04)",
              padding: "18px 22px",
            }}
          >
            <span
              style={{
                fontSize: 11,
                fontWeight: 900,
                textTransform: "uppercase",
                letterSpacing: ".18em",
                color: "rgba(255,255,255,.45)",
              }}
            >
              Guests
            </span>
            <div style={{ position: "relative", flex: 1 }}>
              <input
                type="range"
                min={pkg.baseKids}
                max={sliderMax}
                value={clampedGuests}
                onChange={(e) => setGuests(Number(e.target.value))}
                aria-label="Number of guests"
                style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: 0, cursor: "pointer" }}
              />
              <div style={{ height: 6, borderRadius: 999, background: "rgba(255,255,255,.1)" }}>
                <div
                  style={{
                    height: 6,
                    borderRadius: 999,
                    width: `${pct}%`,
                    background: `linear-gradient(90deg,${pkg.accent}66,${pkg.accent})`,
                  }}
                />
              </div>
              <div
                style={{
                  pointerEvents: "none",
                  position: "absolute",
                  top: -8,
                  left: `${pct}%`,
                  width: 22,
                  height: 22,
                  borderRadius: "50%",
                  background: "#fff",
                  boxShadow: "0 4px 14px rgba(0,0,0,.5)",
                  transform: "translateX(-50%)",
                }}
              />
            </div>
            <span
              style={{
                minWidth: 76,
                textAlign: "right",
                fontFamily: "var(--font-archivo-black)",
                fontSize: 20,
                color: "#fff",
              }}
            >
              {clampedGuests} kids
            </span>
          </div>
        </div>
      </div>

      <div className="jic-pkg-total" style={{ background: pkg.accent, padding: "22px 46px", transition: "background .2s ease" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <span
            style={{
              fontSize: 10,
              fontWeight: 900,
              textTransform: "uppercase",
              letterSpacing: ".2em",
              color: "rgba(10,14,26,.6)",
            }}
          >
            {pkg.name} · {clampedGuests} kids · {selected.length} add-on{selected.length === 1 ? "" : "s"}
          </span>
          <span style={{ fontFamily: "var(--font-archivo-black)", fontSize: 38, lineHeight: 1, color: "#0A0E1A" }}>
            {formatPKR(total)}
          </span>
        </div>
        <a
          href={bookHref}
          target="_blank"
          rel="noopener noreferrer"
          className="jic-confetti-trigger"
          style={{
            borderRadius: 999,
            background: "#0A0E1A",
            padding: "17px 30px",
            fontSize: 15,
            fontWeight: 900,
            color: "#fff",
            whiteSpace: "nowrap",
            textDecoration: "none",
            transition: "background .15s ease",
          }}
        >
          Book This Party →
        </a>
      </div>
    </div>
  );
}
