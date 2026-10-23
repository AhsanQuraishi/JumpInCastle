# Handoff: Safety Section — House Rules Board

## Overview
Redesign of the "SAFETY FIRST / PLAY HARD, PLAY SAFE" section of a family entertainment venue
website. The chosen direction (option **1b**) is a **house rules board**: a left-aligned headline
with the intro paragraph beside it, then a responsive grid of five colour-washed rule cards plus
a sixth reassurance card. It replaces a single narrow column of five identical dark bars, which
gave every rule the same weight and left the left half of the section empty below the intro.

Target: a **Next.js (App Router) + React** codebase. Deliver as a single component.

## About the Design Files
The files in this bundle are **design references created in HTML** — prototypes that show the
intended look and behaviour. They are **not production code to copy directly**.

Recreate the design in this project's existing environment using its established patterns:
Next.js App Router, React function components, and whatever styling layer the repo already uses
(Tailwind, CSS Modules, styled-components). If there is no convention yet, use Tailwind CSS.
Match the values in **Design Tokens** exactly; do not port the inline `style` attributes verbatim.

Files to open for reference:
- `Safety Rules Board.dc.html` — the final, chosen design (build this)
- `Safety Section Redesign.dc.html` — the exploration board (two other directions, context only)

Both open directly in a browser.

## Fidelity
**High-fidelity.** Colors, typography, spacing, radii and gradients are final and listed below.
Recreate pixel-perfectly, substituting the repo's own font loading.

## Screens / Views

### Safety section (single view, part of a longer marketing page)

**Purpose:** reassure a parent that the venue is supervised, and make the five house rules
scannable before arrival.

**Layout**
- Section wrapper: `background #0a0f1e`, padding
  `clamp(64px,7vw,96px) clamp(24px,5vw,72px) clamp(72px,8vw,104px)`. No dot texture here — the
  cards carry the colour.
- Inner container: `max-width:1440px; margin:0 auto`.

**Header row** — `display:flex; flex-wrap:wrap; align-items:flex-end;
justify-content:space-between; gap:clamp(28px,4vw,48px); margin-bottom:clamp(36px,4vw,52px)`
- Left block `flex:1 1 480px; min-width:300px`:
  - Eyebrow: `SAFETY FIRST`, JetBrains Mono 700, `13px`, `letter-spacing .28em`, color `#22D3EE`,
    `margin-bottom:16px`.
  - Heading: `Play hard, play safe`, Archivo Black, `clamp(46px,5.4vw,70px)`, `line-height .9`,
    `letter-spacing -.02em`, uppercase, `#fff`, `margin:0`. It wraps naturally after the comma at
    desktop width — do not hardcode a `<br>`; a fixed break orphans a word at intermediate widths.
- Right paragraph `flex:0 1 420px`: Archivo `16px / 1.65`, color `#8b94a6`, `text-wrap:pretty`,
  `padding-bottom:8px` to sit on the heading's baseline.

**Rules grid**
- `display:grid; grid-template-columns:repeat(auto-fit, minmax(300px,1fr)); gap:16px`
  — three across at 1440, two at tablet, one on mobile, with no media queries.
- **Rule card** (five of them), each keyed to its own accent color `C`:
  - `position:relative; overflow:hidden; border-radius:16px; padding:30px 30px 32px;
    display:flex; flex-direction:column; gap:14px`
  - Background wash: `linear-gradient(150deg, {C}1f 0%, {C}0a 42%, #0e1626 78%)`
    (that is the accent at 12% → 4% alpha, fading into the card base color).
  - Border: `1px solid {C}3d` (24% alpha) with `border-top: 3px solid {C}`.
    Hover: `border-color: {C}` at full opacity, `transition: border-color .25s ease`.
  - **Ghost number**: absolutely positioned `top:-26px; right:-8px`, Archivo Black `96px`,
    `line-height:1`, color `{C}1f` (12% alpha), `pointer-events:none`. It bleeds off the top-right
    corner and is clipped by the card's `overflow:hidden`. Decorative — `aria-hidden`.
  - **Keyword row**: `position:relative; display:flex; align-items:center; gap:10px`.
    A `7×7px` `border-radius:50%` dot in `{C}`, then the keyword in JetBrains Mono 700, `12px`,
    `letter-spacing .2em`, uppercase, color `{C}`.
  - **Rule text**: `position:relative; margin:0`, Archivo `16px / 1.6`, color `#dfe6f0`,
    `text-wrap:pretty`. The `position:relative` on both children is what keeps them above the
    ghost number.
- **Reassurance card** (sixth cell, no number, no keyword):
  - `border-radius:16px; padding:30px`,
    `background: linear-gradient(140deg, rgba(163,230,53,.13), rgba(163,230,53,0))`,
    `border:1px solid rgba(163,230,53,.3)`,
    `display:flex; flex-direction:column; justify-content:center; gap:10px`.
  - Title: Archivo 700 `19px`, `#fff`.
  - Body: Archivo `15px / 1.6`, color `#a9bb92`.

**Content**

| # | Keyword | Accent | Rule text |
|---|---------|--------|-----------|
| 01 | Grip socks | `#A3E635` | Grip socks are mandatory on all trampoline and soft-play zones (available on-site). |
| 02 | Supervision | `#22D3EE` | One adult must supervise children under 5 at all times. |
| 03 | Clear pockets | `#FF3D8B` | No food, drink, sharp objects or jewellery inside play zones. |
| 04 | Height limits | `#FB923C` | Follow marshal instructions and posted height/age limits for each attraction. |
| 05 | One at a time | `#A78BFA` | No double-bouncing, pushing or somersaults unless in a designated zone. |

Sixth card: title "Marshals on every zone", body "First aid trained, briefed daily. Ask any of
them if you are unsure."

The five **rule texts, the eyebrow, the heading and the intro paragraph are the client's own
copy — do not rewrite them.** The five **keywords and the whole sixth card are proposed
additions**; confirm the first-aid claim with the client before shipping, since it is a safety
statement.

## Interactions & Behavior
- Static content. The only interaction is card hover: border goes to the full accent color.
- No entrance animation, no expand/collapse. Nothing needs `prefers-reduced-motion` handling
  beyond honouring it if the repo adds transitions.
- **Accessibility**
  - Render the section with a heading hierarchy: `<h2>` for "Play hard, play safe", each card's
    keyword as an `<h3>`, and the rules as a `<ul>`/`<li>` — they are a list.
  - The ghost number and the dot are decorative: `aria-hidden="true"`.
  - Contrast: rule text `#dfe6f0` on the washed card passes AA comfortably. The keyword colors on
    their own wash pass AA at 12px bold — do not lighten the wash or shrink the keyword.
  - `#FB923C` and `#A3E635` are close in hue for some colour-blind users; the keyword text
    carries the meaning, so colour is never the only signal. Keep the keywords on.
- **Responsive**: `auto-fit` + `minmax(300px,1fr)` handles it. Verify at 1440 / 1024 / 768 / 390.
  On mobile the header stacks (heading above paragraph) and the cards become a single column;
  consider dropping the ghost number below 400px where it crowds the text.

## State Management
None. Fully presentational, safe to render on the server.

Component props (all optional, with these defaults):
- `rules` — the five rules above (`{ keyword, text, accentColor }`), ideally from CMS
- `monoAccent: boolean` = `false` — when true every card uses `#A3E635` instead of its own accent
- `showGhostNumbers: boolean` = `true`
- `showKeywords: boolean` = `true`

## Design Tokens

**Colors**
- Section background: `#0a0f1e`; card base `#0e1626`
- Eyebrow: `#22D3EE`
- Rule accents: `#A3E635`, `#22D3EE`, `#FF3D8B`, `#FB923C`, `#A78BFA`
- Accent alpha suffixes used: `1f` (12%, wash top + ghost number), `0a` (4%, wash mid),
  `3d` (24%, border)
- Text: heading `#ffffff`, rule text `#dfe6f0`, intro `#8b94a6`, reassurance body `#a9bb92`
- Reassurance card: `rgba(163,230,53,.13)` → transparent, border `rgba(163,230,53,.3)`

**Typography**
- Display: **Archivo Black** 400 — heading clamp(46px,5.4vw,70px) / .9 / -.02em uppercase;
  ghost number 96px
- Mono/labels: **JetBrains Mono** 700 — eyebrow 13px / .28em, keyword 12px / .2em
- Body: **Archivo** 400–700 — rule text 16px / 1.6, intro 16px / 1.65,
  reassurance title 19px / 700, reassurance body 15px / 1.6
- Google Fonts: `Archivo+Black`, `Archivo:wght@400;500;600;700`, `JetBrains+Mono:wght@500;700`.
  In Next.js load via `next/font/google`.

**Spacing** — 8px base; values used: 8, 10, 14, 16, 30, 32, 52, 72, 96, 104
(outer padding, header gap and the header bottom margin are `clamp()`ed as listed above)

**Radii** — 16px (cards), 50% (keyword dot)

**Motion** — `border-color .25s ease` on card hover. Nothing else.

**Shadows** — none. Depth comes from the gradient wash and the 3px top rule.

## Assets
None. No images and no icons — the dots are CSS and the numbers are type. Fonts come from Google
Fonts. If the repo has an icon set, a small pictogram per rule (sock, adult+child, no-food,
height gauge, no-somersault) would strengthen the section; ask the client first.

## Files
- `Safety Rules Board.dc.html` — final chosen design (option 1b). **Build this one.**
- `Safety Section Redesign.dc.html` — exploration board with the alternatives
  (1a ruled rulebook, 1c checklist stack). Reference only.
- `support.js` — runtime for the HTML prototypes. **Prototype tooling only — do not port it.**
