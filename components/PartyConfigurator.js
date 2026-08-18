"use client";

import { useMemo, useState } from "react";
import { packages, partyAddons, EXTRA_KID_PRICE, waLink } from "@/data/siteData";

function formatPKR(n) {
  return "Rs " + n.toLocaleString("en-US");
}

function Icon({ path, size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      {path}
    </svg>
  );
}

function StepLabel({ n, color, children }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
      <span
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: 28,
          height: 28,
          borderRadius: "50%",
          background: color,
          color: "#0A0E1A",
          fontFamily: "var(--font-archivo-black)",
          fontSize: 13,
          flexShrink: 0,
          transition: "background .4s ease",
        }}
      >
        {n}
      </span>
      <span style={{ fontSize: 14, letterSpacing: 1, textTransform: "uppercase", fontWeight: 700, color: "#fff" }}>{children}</span>
    </div>
  );
}

const TIER_ICONS = {
  Mini: (
    <>
      <circle cx="12" cy="9" r="6" />
      <path d="M12 15v6M9.5 19.5 12 21l2.5-1.5" />
    </>
  ),
  Mega: <path d="M12 22c4 0 7-3 7-7 0-3-2-5-3-6 .5 2-1 3-2 3-1.5 0-2-1.5-1-3C11 5 9 8 9 11c0 1 .5 2 1 2.5-1.5-.5-3-2-3-4.5C7 12 8 18 12 22Z" />,
  Ultimate: <path d="M4 18h16l-1.2-9-4 4-2.8-6-2.8 6-4-4L4 18Z" />,
};

const ADDON_ICONS = {
  hour: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3.5 2" />
    </>
  ),
  photographer: (
    <>
      <path d="M4 8h3l1.5-2h7L17 8h3a1 1 0 0 1 1 1v9a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1Z" />
      <circle cx="12" cy="13" r="3.3" />
    </>
  ),
  cake: (
    <>
      <rect x="4" y="12" width="16" height="8" rx="1.5" />
      <path d="M4 16.5h16" />
      <path d="M9 12V8M15 12V8" />
    </>
  ),
  host: (
    <>
      <circle cx="12" cy="8" r="3.5" />
      <path d="M5 21c0-4 3-6 7-6s7 2 7 6" />
    </>
  ),
  loot: <path d="m12 3 2.6 5.6 6.1.6-4.6 4.1 1.3 6-5.4-3.1-5.4 3.1 1.3-6-4.6-4.1 6.1-.6L12 3Z" />,
};

export default function PartyConfigurator() {
  const [selectedIdx, setSelectedIdx] = useState(packages.findIndex((p) => p.popular));
  const [extraKids, setExtraKids] = useState(0);
  const [addonIds, setAddonIds] = useState([]);

  const pkg = packages[selectedIdx];

  const addonsTotal = useMemo(
    () => partyAddons.filter((a) => addonIds.includes(a.id)).reduce((sum, a) => sum + a.price, 0),
    [addonIds]
  );
  const total = pkg.basePrice + extraKids * EXTRA_KID_PRICE + addonsTotal;
  const totalKids = pkg.baseKids + extraKids;

  const toggleAddon = (id) => {
    setAddonIds((ids) => (ids.includes(id) ? ids.filter((x) => x !== id) : [...ids, id]));
  };

  const selectPackage = (i) => {
    setSelectedIdx(i);
    setExtraKids(0);
  };

  const messageLines = [
    `Hi Jump In Castle! I'd like to book a birthday party:`,
    `• Package: ${pkg.name} (${totalKids} kids)`,
    addonIds.length ? `• Add-ons: ${partyAddons.filter((a) => addonIds.includes(a.id)).map((a) => a.label).join(", ")}` : null,
    `• Estimated total: ${formatPKR(total)}`,
  ].filter(Boolean);
  const enquireHref = waLink(messageLines.join("\n"));

  return (
    <div
      style={{
        position: "relative",
        borderRadius: 24,
        padding: "36px 32px",
        background: "#10152B",
        border: `1.5px solid ${pkg.accent}88`,
        boxShadow: `0 0 0 1px ${pkg.accent}33, 0 0 34px ${pkg.accent}44, inset 0 0 40px ${pkg.accent}14`,
        transition: "border-color .4s ease, box-shadow .4s ease",
      }}
    >
      <div style={{ textAlign: "center", marginBottom: 34 }}>
        <div style={{ fontFamily: "var(--font-archivo-black)", fontSize: "clamp(19px,2.2vw,24px)", textTransform: "uppercase", color: "#fff" }}>
          Design Your Party
        </div>
        <div style={{ fontSize: 13, color: "rgba(255,255,255,.4)", marginTop: 6 }}>
          Three quick choices, one live price.
        </div>
      </div>

      <StepLabel n={1} color={pkg.accent}>Pick a starting package</StepLabel>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(160px,1fr))", gap: 14, marginBottom: 34 }}>
        {packages.map((p, i) => {
          const selected = i === selectedIdx;
          return (
            <button
              key={p.name}
              type="button"
              onClick={() => selectPackage(i)}
              className="jic-tier-btn jic-neon-card"
              style={{
                position: "relative",
                textAlign: "left",
                padding: "18px 16px 15px",
                borderRadius: 16,
                cursor: "pointer",
                background: selected
                  ? `linear-gradient(160deg, ${p.accent}22, #0A0E1A 75%)`
                  : "rgba(255,255,255,.03)",
                border: `1.5px solid ${p.accent}${selected ? "" : "70"}`,
                boxShadow: selected
                  ? `0 0 0 1px ${p.accent}55, 0 0 22px ${p.accent}66, 0 10px 24px -10px ${p.accent}88, inset 0 0 18px ${p.accent}22`
                  : `0 0 10px ${p.accent}44, inset 0 0 10px ${p.accent}11`,
                transform: selected ? "translateY(-2px)" : "none",
                "--glow": p.accent,
              }}
            >
              {p.popular && (
                <span
                  style={{
                    position: "absolute",
                    top: 12,
                    right: 14,
                    fontSize: 9,
                    letterSpacing: 1,
                    textTransform: "uppercase",
                    fontWeight: 700,
                    color: p.accent,
                    textShadow: `0 0 8px ${p.accent}`,
                  }}
                >
                  Popular
                </span>
              )}
              <div style={{ color: p.accent, marginBottom: 10, filter: `drop-shadow(0 0 6px ${p.accent}aa)` }}>
                <Icon path={TIER_ICONS[p.name]} size={20} />
              </div>
              <div
                style={{
                  fontFamily: "var(--font-archivo-black)",
                  fontSize: 16,
                  textTransform: "uppercase",
                  color: p.accent,
                  textShadow: selected ? `0 0 12px ${p.accent}aa, 0 0 24px ${p.accent}55` : "none",
                }}
              >
                {p.name}
              </div>
              <div style={{ fontSize: 12, color: "rgba(255,255,255,.5)", marginTop: 4 }}>
                {formatPKR(p.basePrice)} · up to {p.baseKids} kids
              </div>
            </button>
          );
        })}
      </div>

      <StepLabel n={2} color={pkg.accent}>Extra kids beyond {pkg.baseKids}</StepLabel>
      <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 36 }}>
        <button
          type="button"
          onClick={() => setExtraKids((n) => Math.max(0, n - 1))}
          className="jic-configurator-step"
          aria-label="Fewer extra kids"
        >
          −
        </button>
        <div style={{ flex: 1 }}>
          <input
            type="range"
            min={0}
            max={20}
            value={extraKids}
            onChange={(e) => setExtraKids(Number(e.target.value))}
            className="jic-configurator-slider"
            style={{ "--accent": pkg.accent, width: "100%" }}
            aria-label="Extra kids"
          />
          <div style={{ fontSize: 13, marginTop: 6, color: "rgba(255,255,255,.7)" }}>
            <strong style={{ color: "#fff" }}>{totalKids} kids total</strong>
            {extraKids > 0 && <span> (+{extraKids} × {formatPKR(EXTRA_KID_PRICE)})</span>}
          </div>
        </div>
        <button
          type="button"
          onClick={() => setExtraKids((n) => Math.min(20, n + 1))}
          className="jic-configurator-step"
          aria-label="More extra kids"
        >
          +
        </button>
      </div>

      <StepLabel n={3} color={pkg.accent}>Add-ons</StepLabel>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginBottom: 8 }}>
        {partyAddons.map((a) => {
          const on = addonIds.includes(a.id);
          return (
            <button
              key={a.id}
              type="button"
              onClick={() => toggleAddon(a.id)}
              className="jic-addon-chip"
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                padding: "9px 14px",
                borderRadius: 999,
                cursor: "pointer",
                fontSize: 12.5,
                fontWeight: 600,
                color: on ? "#0A0E1A" : "#fff",
                background: on ? pkg.accent : "rgba(255,255,255,.06)",
                border: `1px solid ${on ? pkg.accent : "rgba(255,255,255,.16)"}`,
              }}
            >
              <Icon path={ADDON_ICONS[a.id]} size={14} />
              {a.label} <span style={{ opacity: 0.7 }}>· {formatPKR(a.price)}</span>
            </button>
          );
        })}
      </div>

      <div
        style={{
          marginTop: 26,
          paddingTop: 24,
          borderTop: "1px solid rgba(255,255,255,.1)",
        }}
      >
        <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: 20 }}>
          <div>
            <div style={{ fontSize: 11, letterSpacing: 1.5, textTransform: "uppercase", color: "rgba(255,255,255,.5)" }}>
              Estimated Total
            </div>
            <div
              key={total}
              style={{
                fontFamily: "var(--font-archivo-black)",
                fontSize: "clamp(30px,4vw,38px)",
                color: pkg.accent,
                lineHeight: 1.1,
                animation: "jic-total-pop .3s ease",
              }}
            >
              {formatPKR(total)}
            </div>
            <div style={{ fontSize: 12, color: "rgba(255,255,255,.4)", marginTop: 4 }}>
              {pkg.name} · {totalKids} kids{addonIds.length ? ` · ${addonIds.length} add-on${addonIds.length > 1 ? "s" : ""}` : ""}
            </div>
          </div>
          <a
            href={enquireHref}
            target="_blank"
            rel="noopener noreferrer"
            className="jic-confetti-trigger"
            style={{
              background: pkg.accent,
              color: "#0A0E1A",
              fontWeight: 700,
              padding: "14px 28px",
              borderRadius: 999,
              fontSize: 14,
              whiteSpace: "nowrap",
              transition: "opacity .2s ease",
            }}
          >
            Enquire About This Party →
          </a>
        </div>
      </div>
    </div>
  );
}
