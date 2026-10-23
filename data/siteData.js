// All copy, images and pricing for the site live here.
// Change this file to update the whole site — no component holds hardcoded content.

export const COLORS = {
  magenta: "#ff3f8e",
  cyan: "#22d3ee",
  lime: "#a3ff4d",
  orange: "#ff9433",
  violet: "#b47aff",
  yellow: "#ffee00",
};

const COLOR_CYCLE = [
  COLORS.magenta,
  COLORS.cyan,
  COLORS.lime,
  COLORS.orange,
  COLORS.violet,
  COLORS.yellow,
];

export { COLOR_CYCLE };

// The hero's bouncing letters/confetti/ambient balls cycle through the same
// site-wide palette as everything else, so the hero doesn't feel like a
// different theme from the rest of the page. "hero" naming kept so
// components importing it don't need to change.
export const HERO_VIVID = {
  darkYellow: COLORS.yellow,
  pink: COLORS.magenta,
  white: "#ffffff",
  cyan: COLORS.cyan,
  lime: COLORS.lime,
  violet: COLORS.violet,
};

export const HERO_PALETTE = COLOR_CYCLE;

export const WHATSAPP_NUMBER = "923000000000";

export function waLink(message) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

export const BOOK_HREF = waLink("Hi Jump In Castle! I'd like to book a session.");
export const SCHOOL_HREF = waLink("Hi Jump In Castle! I'd like to book a school trip.");
export const EDU_HREF = waLink("Hi Jump In Castle! I'd like to plan an educational visit.");

// [name, category, description, dimensions, imageFile]
const RAW_FACILITIES = [
  ["Bounce Trampoline", "Thrill", "Wall-to-wall interconnected trampolines — bounce, flip and defy gravity across the main arena.", "57 × 35 ft", "bounce-trampoline.jpg"],
  ["Ninja Warrior", "Thrill", "Conquer the obstacle course — swinging ropes, cargo nets, warped walls and the buzzer at the top.", "20 × 30 ft", "ninja-warrior.jpg"],
  ["Kids Soft Play", "Kids", "A padded, colourful playscape built just for little explorers to climb, crawl and tumble safely.", "30 × 27 ft", "kids-soft-play.jpg"],
  ["Slide Area", "Thrill", "Twisting light-reactive slides that glow and shift colour the whole way down.", "22 × 30 ft", ""],
  ["Laser Maze", "Tech", "Weave, duck and dodge through a grid of laser beams — beat the clock without breaking a beam.", "10 × 20 ft", "laser-maze.jpg"],
  ["Laser Tag", "Tech", "Team up in our multi-level neon arena for fast, tactical laser tag battles.", "46 × 40 ft", "laser-tag.jpg"],
  ["Physical Pac-Man", "Tech", "Step inside the classic on our loft level — chase the dots, dodge the ghosts in a life-sized arena.", "15 × 40 ft", "pacman.jpg"],
  ["Gift Catcher", "Family", "Grab-the-prize claw machines packed with toys, plush and surprises.", "", "gift-catcher.jpg"],
  ["Power Hammer", "Family", "Swing for the top — test your strength and light up the tower on the high-striker.", "", "power-hammer.jpg"],
  ["Power Punch", "Family", "Load up and hit hard — the punch machine scores every knockout blow.", "", "power-punch.jpg"],
  ["Kiddie Rides", "Kids", "Gentle, cheerful rides sized perfectly for our youngest guests.", "", "kiddie-rides.jpg"],
  ["Kids Construction Zone", "Kids", "Giant sandpit diggers, dumper trucks and build sets for hands-on creative play and mini engineers.", "", "construction-zone.jpg"],
  ["Auto Reload Archery", "Tech", "Interactive target practice — real bows, auto-reloading digital targets and instant scoring.", "", "auto-reload-archery.jpg"],
  ["Driving Simulator", "Tech", "Full racing rigs with big screens — take the wheel and chase the fastest lap.", "", "driving-simulator.jpg"],
  ["Arcade Area", "Family", "A wall of classic and modern arcade machines — win tickets, redeem prizes.", "", "arcade-area.jpg"],
  ["GTA Room", "Tech", "High-energy open-world driving experience on a wraparound big-screen setup.", "", "gta-room.jpg"],
  ["Immersive Projection Room", "Tech", "A 360° interactive projection playground that reacts to your every move — touch the walls, change the world.", "", "projection-room.jpg"],
  ["Thrill Slides", "Thrill", "Steep, LED-lit racing slides for the biggest rush in the park.", "", "thrill-slides.jpg"],
  ["Drop Stick Game", "Family", "Fast-reaction skill game — time the drop, hit the mark, beat your score.", "", "drop-stick.jpg"],
];

function slugify(name) {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export const facilities = RAW_FACILITIES.map((r, i) => {
  const color = COLOR_CYCLE[i % COLOR_CYCLE.length];
  const color2 = COLOR_CYCLE[(i + 2) % COLOR_CYCLE.length];
  const [name, cat, desc, dim, img] = r;
  return {
    num: String(i + 1).padStart(2, "0"),
    slug: slugify(name),
    name,
    cat,
    desc,
    dim,
    hasDim: !!dim,
    img: img ? `/images/${img}` : "",
    hasImg: !!img,
    color,
    imgBg: `linear-gradient(135deg,${color}33,${color2}22)`,
  };
});

export function getFacilityBySlug(slug) {
  return facilities.find((f) => f.slug === slug);
}

export const packages = [
  {
    name: "Mini",
    tag: "Perfect for the little ones",
    price: "Rs 18,000",
    per: "/ up to 10 kids",
    basePrice: 18000,
    baseKids: 10,
    popular: false,
    bg: "#10152B",
    border: "rgba(255,255,255,.08)",
    accent: COLORS.cyan,
    btnBg: "transparent",
    btnColor: "#fff",
    btnBorder: true,
    perks: ["90 min unlimited play", "Private party table", "Dedicated party host", "Grip socks for all guests"],
  },
  {
    name: "Mega",
    tag: "Our most-booked package",
    price: "Rs 32,000",
    per: "/ up to 20 kids",
    basePrice: 32000,
    baseKids: 20,
    popular: true,
    bg: "linear-gradient(160deg,#b47aff33,#ff3f8e22)",
    border: "rgba(182,255,46,.4)",
    accent: COLORS.lime,
    btnBg: COLORS.lime,
    btnColor: "#0A0E1A",
    btnBorder: false,
    perks: ["2 hrs unlimited play", "Private party room", "Food & drinks package", "Host + dedicated marshal", "Birthday shout-out on screens"],
  },
  {
    name: "Ultimate",
    tag: "Go all out — full VIP",
    price: "Rs 55,000",
    per: "/ up to 30 kids",
    basePrice: 55000,
    baseKids: 30,
    popular: false,
    bg: "#10152B",
    border: "rgba(255,255,255,.08)",
    accent: COLORS.orange,
    btnBg: COLORS.orange,
    btnColor: "#0A0E1A",
    btnBorder: false,
    perks: ["3 hrs full-park access", "Private VIP room", "Premium food & cake", "Party host + photographer", "Facade projection dedication", "Return-visit voucher"],
  },
];

export const EXTRA_KID_PRICE = 800;

export const partyAddons = [
  { id: "hour", label: "+1 Hour of Play", price: 5000 },
  { id: "photographer", label: "Professional Photographer", price: 4000 },
  { id: "cake", label: "Custom Cake Upgrade", price: 3000 },
  { id: "host", label: "Extra Dedicated Host", price: 2500 },
  { id: "loot", label: "Loot Bags for Every Guest", price: 2000 },
];

export const rules = [
  ["01", "Grip socks are mandatory on all trampoline and soft-play zones (available on-site).", "Grip socks", "#A3E635"],
  ["02", "One adult must supervise children under 5 at all times.", "Supervision", "#22D3EE"],
  ["03", "No food, drink, sharp objects or jewellery inside play zones.", "Clear pockets", "#FF3D8B"],
  ["04", "Follow marshal instructions and posted height/age limits for each attraction.", "Height limits", "#FB923C"],
  ["05", "No double-bouncing, pushing or somersaults unless in a designated zone.", "One at a time", "#A78BFA"],
].map(([n, t, keyword, accent]) => ({ n, t, keyword, accent }));

export const gallery = [
  { label: "Trampoline Arena", bg: "linear-gradient(135deg,#ff3f8e33,#b47aff22)", ratio: "4/3", img: "bounce-trampoline.jpg" },
  { label: "Laser Tag Arena", bg: "linear-gradient(135deg,#22d3ee33,#10152B)", ratio: "4/5", img: "laser-tag.jpg" },
  { label: "RC Drift Track", bg: "linear-gradient(135deg,#a3ff4d22,#10152B)", ratio: "4/3", img: "drift-track.jpg" },
  { label: "Kids Soft Play", bg: "linear-gradient(135deg,#ff943333,#10152B)", ratio: "4/3", img: "kids-soft-play.jpg" },
  { label: "Auto Reload Archery", bg: "linear-gradient(135deg,#b47aff33,#10152B)", ratio: "4/5", img: "auto-reload-archery.jpg" },
  { label: "Arcade Zone", bg: "linear-gradient(135deg,#ffee0022,#10152B)", ratio: "4/3", img: "" },
].map((g) => ({ ...g, img: g.img ? `/images/${g.img}` : "", hasImg: !!g.img }));

export const hours = [
  { day: "Monday – Thursday", time: "12 PM – 10 PM", accent: "#FF3D8B" },
  { day: "Friday – Saturday", time: "11 AM – 12 AM", accent: "#22D3EE" },
  { day: "Sunday", time: "11 AM – 11 PM", accent: "#4ADE80" },
];

// Drives the live open/closed status on the hours bar. 0 = Sunday … 6 = Saturday,
// 24h decimal hours, close: 24 means midnight.
export const weekSchedule = [
  { day: "SUN", open: 11, close: 23 },
  { day: "MON", open: 12, close: 22 },
  { day: "TUE", open: 12, close: 22 },
  { day: "WED", open: 12, close: 22 },
  { day: "THU", open: 12, close: 22 },
  { day: "FRI", open: 11, close: 24 },
  { day: "SAT", open: 11, close: 24 },
];

export const MAPS_HREF = "https://www.google.com/maps/search/?api=1&query=Jump+In+Castle+Multan";

export const faqData = [
  ["What ages is Jump In Castle for?", "Jump In Castle is built for ages 3 to 14. Under 5s have their own soft play zone with a separate entry, so the little ones are never in the way of the big jumpers.", "#FF3D8B"],
  ["Do I need to book in advance?", "Walk-ins are welcome on weekdays. Weekends and school holidays fill up fast, so booking online holds your slot and skips the queue.", "#22D3EE"],
  ["What should we wear?", "Comfortable clothes and grip socks. Grip socks are required on the trampolines and are available at the front desk.", "#4ADE80"],
  ["Can adults jump too?", "Yes. Adults jump on the same ticket. If you would rather watch, there is a parent lounge with a clear view of the arena and a coffee counter.", "#FB923C"],
  ["How do birthday parties work?", "Choose a package, pick a date, and our team handles the rest — private space, a host, food and unlimited play. Message us to check availability.", "#A78BFA"],
].map(([question, answer, accent]) => ({ question, answer, accent }));

export const navLinks = [
  { href: "#attractions", label: "Attractions" },
  { href: "#parties", label: "Parties" },
  { href: "#schools", label: "Schools" },
  { href: "#membership", label: "Membership" },
  { href: "#hours", label: "Hours" },
  { href: "#faq", label: "FAQ" },
];

export const marqueeWords = [
  { text: "BOUNCE", color: COLORS.magenta },
  { text: "NINJA", color: COLORS.cyan },
  { text: "LASER TAG", color: COLORS.lime },
  { text: "ARCADE", color: COLORS.orange },
  { text: "PROJECTION", color: COLORS.violet },
];

// Site-wide toggle mirroring the original `showPrices` prop.
export const SHOW_PRICES = true;
