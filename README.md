# Jump In Castle — Next.js Site

Converted from the original single-file HTML export into a proper Next.js 14 (App Router) project,
with each visual section broken into its own component.

## Structure

```
app/
  layout.js          — root layout, loads Google Fonts (Archivo Black, Space Grotesk) + globals.css
  page.js             — assembles all sections in order
  globals.css         — reset, keyframe animations, scroll-reveal, hover utility classes
components/
  Navbar.js           — sticky top nav + Book Now CTA
  Hero.js             — headline, stats, CTAs
  Marquee.js          — scrolling ticker strip
  Attractions.js      — grid section wrapper
  AttractionCard.js   — single attraction card (used by Attractions)
  Parties.js          — birthday package section wrapper
  PackageCard.js      — single package card (used by Parties)
  Schools.js          — schools & education section
  Membership.js       — Jump Club membership banner
  Safety.js           — house rules
  Gallery.js          — photo grid
  Hours.js            — opening hours + find us
  Faq.js              — accordion FAQ (client component)
  Footer.js           — final CTA + footer
data/
  siteData.js         — single source of truth for all copy, pricing, and image paths
public/images/        — all 19 facility + gallery photos
```

## Editing content

Everything text/price/image related lives in `data/siteData.js`. Change it there —
no component has hardcoded copy.

- `WHATSAPP_NUMBER` — update this to your real WhatsApp Business number.
- `facilities` — the 19 attraction cards.
- `packages` — the 3 birthday packages and pricing.
- `hours`, `faqData`, `rules`, `gallery` — self-explanatory.
- Real address: edit the copy directly in `components/Hours.js` ("Add your exact mall / street address here").

## Run locally

```bash
npm install
npm run dev
```

Then open http://localhost:3000.

## Build for production

```bash
npm run build
npm run start
```

## Notes

- Fonts are loaded via `next/font/google` (no self-hosted font files needed).
- Images use `next/image` for automatic optimization — all local, in `public/images/`.
- The FAQ accordion is the only client component (`"use client"`); everything else is a server component.
- Scroll-reveal animation (`[data-reveal]`) uses the CSS `animation-timeline: view()` API — supported in
  modern Chromium-based browsers, degrades gracefully (no animation) elsewhere.
