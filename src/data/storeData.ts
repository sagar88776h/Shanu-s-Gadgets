/* =====================================================================
   SHANU'S GADGETS — STORE DATA
   Second-hand phones + brand-new AirPods, neckbands, covers & accessories.

   HOW TO ADD A PRODUCT
   1. Copy any entry in the PRODUCT SEEDS list below.
   2. Give it a unique `id`, a `category` and a `tier`
      (normal | mid-range | premium).
   3. Put the photo at /public/assets/products/<id>.jpg (or .svg/.webp) and set
      `image: "/assets/products/<id>.jpg"`. Without `image`, it uses <id>.svg.
   It appears on the category page, in the right tier, automatically.

   IMPORTANT: everything marked SAMPLE (names, prices, specs, battery %, warranty
   terms) is placeholder content. Replace it with Shanu's real stock before launch.
   ===================================================================== */

export type Tier = "normal" | "mid-range" | "premium";
export type CategoryId = "phones" | "airpods" | "neckbands" | "covers" | "accessories";
export type Grade = "Like New" | "Good" | "Fair";

export interface PhoneCondition {
  grade: Grade;
  /** Battery health in percent */
  battery: number;
  storage: string;
  ram: string;
  boxAndBill: boolean;
  /** What comes with the phone, joined by " + " */
  included: string;
}

export interface Product {
  id: string;
  name: string;
  tagline: string;
  category: CategoryId;
  categoryLabel: string;
  tier: Tier;
  condition?: PhoneCondition;
  price: number;
  originalPrice?: number;
  /** Only shown when real ratings exist */
  rating?: number;
  reviewCount?: number;
  image: string;
  gallery?: string[];
  description: string;
  badge?: string;
  isHero?: boolean;
  colors?: { name: string; hex: string; image?: string }[];
  specs: { label: string; value: string }[];
  features: { title: string; desc: string }[];
  inTheBox: string[];
  warranty: string;
  availability: "In Stock" | "Fast Store Pickup" | "Pre-Order";
  hotspots?: {
    x: number;
    y: number;
    title: string;
    description: string;
  }[];
}

export interface StoreReview {
  id: string;
  name: string;
  role: string;
  avatar?: string;
  rating: number;
  date: string;
  comment: string;
  verifiedPurchase: boolean;
  purchasedItem?: string;
}

export interface CategoryItem {
  id: CategoryId;
  slug: CategoryId;
  name: string;
  /** Short label used on cards, e.g. "Pre-owned phone" */
  productLabel: string;
  tagline: string;
  /** "Pre-owned" or "Brand new" */
  stock: "Pre-owned" | "Brand new";
  count: number;
  image: string;
}

export interface TierInfo {
  id: Tier;
  label: string;
  short: string;
}

export const STORE_CONFIG = {
  name: "SHANU’S GADGETS",
  shortName: "SHANU'S",
  tagline: "Technology. Curated Better.",
  subTagline:
    "Quality-checked pre-owned phones, plus brand-new AirPods, neckbands, covers and accessories — each in Normal, Mid-range and Premium.",
  servicesLine: "PRE-OWNED PHONES • AIRPODS • NECKBANDS • COVERS • ACCESSORIES",
  address: "Madhupur, Kamalasagar, Sepahijala, Tripura, 799102",
  landmark: "Near Main Road, Kamalasagar Market",
  phonePrimary: "+91 70058 38381",
  phoneSecondary: "+91 69993 51277",
  whatsappNumber: "917005838381",
  whatsappUrl: "https://wa.me/917005838381",
  email: "support@shanusgadgets.com",
  timing: "10:00 AM – 09:30 PM (Open 7 Days)",
  googleMapsUrl: "https://maps.google.com/?q=Madhupur+Kamalasagar+Sepahijala+Tripura",
  instagram: "@shanusgadgets",
  logo: "/assets/images/logo.png",
  images: {
    banner: "/assets/images/home-banner.jpg",
    exteriorReal: "/assets/images/home-banner.jpg",
    interiorReal: "/assets/images/real-store-interior.jpg",
    exterior: "/assets/images/home-banner.jpg",
    interior: "/assets/images/real-store-interior.jpg",
    shelves: "/assets/images/store-shelves.jpg",
    lifestyle: "/assets/images/store-lifestyle.jpg",
  },
};

/* ---------------------------------------------------------------------
   TIERS
   --------------------------------------------------------------------- */
export const TIERS: TierInfo[] = [
  { id: "normal", label: "Normal", short: "Everyday value" },
  { id: "mid-range", label: "Mid-range", short: "Best balance" },
  { id: "premium", label: "Premium", short: "Top quality" },
];

export const TIER_ORDER: Tier[] = ["normal", "mid-range", "premium"];

/** What each tier means inside each category (shown on category pages). */
export const TIER_COPY: Record<CategoryId, Record<Tier, string>> = {
  phones: {
    normal: "Budget phones that handle calls, WhatsApp and YouTube without fuss.",
    "mid-range": "Smooth performance and good cameras. The best value for most people.",
    premium: "Flagship phones with the best cameras, fastest chips and longest updates.",
  },
  airpods: {
    normal: "Simple wireless earbuds for music and calls.",
    "mid-range": "Better sound and clearer mics, with noise cancellation on select models.",
    premium: "The best sound, strongest noise cancellation and longest battery life.",
  },
  neckbands: {
    normal: "Light, bass-tuned neckbands for daily use.",
    "mid-range": "Clearer calls, longer battery and sweat resistance.",
    premium: "Hi-fi drivers, noise cancellation and a braided, built-to-last band.",
  },
  covers: {
    normal: "Clear and silicone covers that keep your phone scratch-free.",
    "mid-range": "Shockproof covers with reinforced corners and camera protection.",
    premium: "Leather and carbon-texture cases that feel as good as they look.",
  },
  accessories: {
    normal: "Everyday chargers and screen guards.",
    "mid-range": "Fast GaN chargers and power banks.",
    premium: "High-wattage power banks and magnetic wireless charging.",
  },
};

/* ---------------------------------------------------------------------
   USED-PHONE POLICY  (EDIT to match what Shanu really offers)
   --------------------------------------------------------------------- */
export const CONDITION_GUIDE: Record<Grade, string> = {
  "Like New": "Almost no marks on the screen or body.",
  Good: "Light signs of use. Everything works.",
  Fair: "Visible scratches or dents. Everything works, priced lower.",
};

export const USED_PHONE_CHECKS = [
  "Display and touch",
  "Front and rear cameras",
  "Speakers and microphone",
  "Wi-Fi, Bluetooth and SIM",
  "Fingerprint or Face unlock",
  "Charging port and battery",
];

/** SAMPLE warranty terms — edit before launch. */
export const WARRANTY: Record<CategoryId, Record<Tier, string>> = {
  phones: {
    normal: "7-Day Test Period + 1 Month Store Warranty",
    "mid-range": "7-Day Test Period + 1 Month Store Warranty",
    premium: "7-Day Test Period + 1 Month Store Warranty",
  },
  airpods: { normal: "1 Month Replacement Warranty", "mid-range": "3 Months Replacement Warranty", premium: "6 Months Replacement Warranty" },
  neckbands: { normal: "1 Month Replacement Warranty", "mid-range": "3 Months Replacement Warranty", premium: "6 Months Replacement Warranty" },
  covers: { normal: "7-Day Replacement for Defects", "mid-range": "7-Day Replacement for Defects", premium: "7-Day Replacement for Defects" },
  accessories: { normal: "1 Month Replacement Warranty", "mid-range": "3 Months Replacement Warranty", premium: "6 Months Replacement Warranty" },
};

const CATEGORY_LABEL: Record<CategoryId, string> = {
  phones: "Pre-owned phone",
  airpods: "AirPods",
  neckbands: "Neckband",
  covers: "Phone cover",
  accessories: "Accessory",
};

const FEATURES: Record<CategoryId, [string, string][]> = {
  phones: [
    ["Tested before listing", "Display, touch, cameras, speakers, network and charging are checked on every unit."],
    ["Honest condition grade", "The grade and battery health shown here match the phone you will hold in the store."],
    ["Store warranty", "Backed by the store, so you can come back to Madhupur with any problem."],
  ],
  airpods: [
    ["Brand new, sealed", "Fresh stock — never used or refurbished."],
    ["Pairs in seconds", "Open the case and connect from your phone's Bluetooth menu."],
    ["Test in store", "Ask for a demo and hear it before you buy."],
  ],
  neckbands: [
    ["Brand new, sealed", "Fresh stock — never used or refurbished."],
    ["All-day battery", "Charge once and use it through the week."],
    ["Test in store", "Ask for a demo and hear it before you buy."],
  ],
  covers: [
    ["Fits your exact model", "Tell us your phone model on WhatsApp and we will check the fit."],
    ["Camera protection", "Raised edges keep the screen and lenses off the table."],
    ["Fitted in store", "We help you put it on and check the buttons and ports."],
  ],
  accessories: [
    ["Brand new, sealed", "Fresh stock — never used or refurbished."],
    ["Safe charging", "Built-in protection against over-current and over-heating."],
    ["Test in store", "Ask us to plug it in and check it with your phone."],
  ],
};

const BOX: Record<CategoryId, string[]> = {
  phones: [],
  airpods: ["Earbuds (pair)", "Charging case", "Charging cable", "Spare ear tips", "Warranty card"],
  neckbands: ["Neckband", "Charging cable", "Spare ear tips", "Warranty card"],
  covers: ["Cover (for the model you choose)"],
  accessories: [],
};

/* ---------------------------------------------------------------------
   PRODUCT SEEDS  (SAMPLE stock — replace with real listings)
   --------------------------------------------------------------------- */
interface Seed {
  id: string;
  name: string;
  tagline: string;
  category: CategoryId;
  tier: Tier;
  price: number;
  description: string;
  specs: [string, string][];
  condition?: PhoneCondition;
  badge?: string;
  isHero?: boolean;
  image?: string;
  originalPrice?: number;
  colors?: { name: string; hex: string }[];
  features?: [string, string][];
  inTheBox?: string[];
  hotspots?: Product["hotspots"];
  availability?: Product["availability"];
}

const make = (s: Seed): Product => ({
  id: s.id,
  name: s.name,
  tagline: s.tagline,
  category: s.category,
  categoryLabel: CATEGORY_LABEL[s.category],
  tier: s.tier,
  condition: s.condition,
  price: s.price,
  originalPrice: s.originalPrice,
  image: s.image ?? `/assets/products/${s.id}.svg`,
  description: s.description,
  badge: s.badge,
  isHero: s.isHero,
  colors: s.colors,
  specs: s.specs.map(([label, value]) => ({ label, value })),
  features: (s.features ?? FEATURES[s.category]).map(([title, desc]) => ({ title, desc })),
  inTheBox:
    s.inTheBox ??
    (s.category === "phones" && s.condition
      ? ["Phone", ...s.condition.included.split(" + ")]
      : BOX[s.category]),
  warranty: WARRANTY[s.category][s.tier],
  availability: s.availability ?? "In Stock",
  hotspots: s.hotspots,
});

const SEEDS: Seed[] = [
  /* ============================ PHONES (pre-owned) ============================ */
  {
    id: "redmi-note-10-64", name: "Redmi Note 10", category: "phones", tier: "normal", price: 7499,
    tagline: "AMOLED screen and a 5,000 mAh battery.",
    description: "A dependable everyday phone with a bright AMOLED display and a battery that lasts the whole day. A solid first smartphone.",
    condition: { grade: "Good", battery: 86, storage: "64 GB", ram: "4 GB", boxAndBill: false, included: "Charger + Cable + Store invoice" },
    specs: [["Display", "6.43\" AMOLED"], ["Rear camera", "48 MP quad"], ["Battery", "5,000 mAh · 33W"], ["Colour", "Green"]],
  },
  {
    id: "realme-narzo-50-128", name: "Realme Narzo 50", category: "phones", tier: "normal", price: 6999,
    tagline: "A 120 Hz screen for smooth scrolling and gaming.",
    description: "Fast, smooth and light on your wallet. The 120 Hz display makes everything feel quick, from Instagram to Free Fire.",
    condition: { grade: "Good", battery: 88, storage: "128 GB", ram: "4 GB", boxAndBill: false, included: "Charger + Cable + Store invoice" },
    specs: [["Display", "6.6\" 120 Hz LCD"], ["Rear camera", "50 MP"], ["Battery", "5,000 mAh · 33W"], ["Colour", "Yellow"]],
  },
  {
    id: "galaxy-m31-128", name: "Samsung Galaxy M31", category: "phones", tier: "normal", price: 8999, badge: "Long battery",
    tagline: "Super AMOLED screen with a huge 6,000 mAh battery.",
    description: "Built for people who are always on their phone. A big battery and a vivid Super AMOLED display at an easy price.",
    condition: { grade: "Like New", battery: 90, storage: "128 GB", ram: "6 GB", boxAndBill: true, included: "Original box + Charger + Cable + Bill" },
    specs: [["Display", "6.4\" Super AMOLED"], ["Rear camera", "64 MP quad"], ["Battery", "6,000 mAh"], ["Colour", "Blue"]],
  },
  {
    id: "iphone-xr-64", name: "iPhone XR", category: "phones", tier: "mid-range", price: 13999,
    tagline: "Face ID, the A12 chip and the iPhone experience.",
    description: "The easiest way into iPhone. Fast, smooth, with a great camera and the App Store apps you want.",
    condition: { grade: "Good", battery: 82, storage: "64 GB", ram: "3 GB", boxAndBill: false, included: "Charger + Cable + Store invoice" },
    specs: [["Display", "6.1\" Liquid Retina"], ["Chip", "A12 Bionic"], ["Rear camera", "12 MP"], ["Colour", "Coral"]],
  },
  {
    id: "oneplus-nord-ce-128", name: "OnePlus Nord CE 5G", category: "phones", tier: "mid-range", price: 12499,
    tagline: "Smooth 90 Hz AMOLED and quick 30W charging.",
    description: "A clean, fast Android phone with a bright display and quick charging. Almost no marks on this unit.",
    condition: { grade: "Like New", battery: 94, storage: "128 GB", ram: "8 GB", boxAndBill: true, included: "Original box + Charger + Cable + Bill" },
    specs: [["Display", "6.43\" AMOLED · 90 Hz"], ["Rear camera", "64 MP triple"], ["Battery", "4,500 mAh · 30W"], ["Colour", "Silver"]],
  },
  {
    id: "iphone-11-64", name: "iPhone 11", category: "phones", tier: "mid-range", price: 18999, badge: "Top pick",
    tagline: "Dual cameras with Night mode. Still fast today.",
    description: "A great all-rounder. Excellent photos and video, long battery life and years of iOS updates left.",
    condition: { grade: "Like New", battery: 85, storage: "64 GB", ram: "4 GB", boxAndBill: false, included: "Charger + Cable + Store invoice" },
    specs: [["Display", "6.1\" Liquid Retina"], ["Chip", "A13 Bionic"], ["Rear camera", "12 MP dual"], ["Colour", "Purple"]],
  },
  {
    id: "iphone-13-128", name: "iPhone 13", category: "phones", tier: "premium", price: 36999,
    tagline: "OLED display, A15 chip and a superb low-light camera.",
    description: "Premium build and a camera that handles night shots with ease. A phone that still feels new.",
    condition: { grade: "Like New", battery: 91, storage: "128 GB", ram: "4 GB", boxAndBill: true, included: "Original box + Charger + Cable + Bill" },
    specs: [["Display", "6.1\" Super Retina XDR OLED"], ["Chip", "A15 Bionic"], ["Rear camera", "12 MP dual"], ["Colour", "Midnight"]],
  },
  {
    id: "galaxy-s21-fe-128", name: "Samsung Galaxy S21 FE 5G", category: "phones", tier: "premium", price: 26999,
    tagline: "120 Hz AMOLED, triple camera and a flagship feel.",
    description: "A big, beautiful display and a versatile triple camera. The most phone you can get in this range.",
    condition: { grade: "Good", battery: 89, storage: "128 GB", ram: "8 GB", boxAndBill: false, included: "Charger + Cable + Store invoice" },
    specs: [["Display", "6.4\" Dynamic AMOLED · 120 Hz"], ["Rear camera", "12 MP triple"], ["Battery", "4,500 mAh"], ["Colour", "Lavender"]],
  },
  {
    id: "iphone-14-pro-128", name: "iPhone 14 Pro", category: "phones", tier: "premium", price: 58999, isHero: true, badge: "Flagship",
    tagline: "48 MP camera, 120 Hz ProMotion and Dynamic Island.",
    description: "Pro cameras, an always-smooth ProMotion display and a fast A16 chip. The best used iPhone we stock right now.",
    condition: { grade: "Like New", battery: 93, storage: "128 GB", ram: "6 GB", boxAndBill: true, included: "Original box + Charger + Cable + Bill" },
    colors: [{ name: "Deep Purple", hex: "#54476f" }],
    specs: [["Display", "6.1\" ProMotion OLED · 120 Hz"], ["Chip", "A16 Bionic"], ["Rear camera", "48 MP triple"], ["Colour", "Deep Purple"]],
    hotspots: [
      { x: 27, y: 30, title: "48 MP triple camera", description: "Main, ultra-wide and 3x telephoto for sharp photos in any light." },
      { x: 66, y: 46, title: "120 Hz ProMotion display", description: "Smooth scrolling and bright, true-to-life colour outdoors." },
      { x: 41, y: 78, title: "Battery health 93%", description: "Tested in store. Shown on the condition report before you buy." },
    ],
  },

  /* ============================ AIRPODS (new) ============================ */
  {
    id: "pulse-buds-lite", name: "Pulse Buds Lite", category: "airpods", tier: "normal", price: 699,
    tagline: "Simple wireless earbuds for music and calls.",
    description: "Light, easy to pair and comfortable for hours. A great first pair of wireless earbuds.",
    specs: [["Bluetooth", "5.3"], ["Playtime", "4 h + 16 h with case"], ["Charging", "USB-C"], ["Controls", "Touch"]],
  },
  {
    id: "pulse-buds-mini", name: "Pulse Buds Mini", category: "airpods", tier: "normal", price: 899,
    tagline: "Compact, light and easy on the ears.",
    description: "A smaller fit for small ears and tight pockets, with a call mic that keeps your voice clear.",
    specs: [["Bluetooth", "5.3"], ["Playtime", "5 h + 20 h with case"], ["Charging", "USB-C"], ["Mic", "ENC call mic"]],
  },
  {
    id: "nova-buds-anc", name: "Nova Buds ANC", category: "airpods", tier: "mid-range", price: 1799, badge: "ANC",
    tagline: "Noise cancellation that makes the commute quieter.",
    description: "Switch on noise cancellation to cut engine and crowd noise, or switch it off to hear what is around you.",
    specs: [["Bluetooth", "5.3"], ["Noise control", "Active noise cancellation"], ["Playtime", "6 h + 24 h with case"], ["Charging", "USB-C"]],
  },
  {
    id: "nova-buds-stem", name: "Nova Buds Stem", category: "airpods", tier: "mid-range", price: 1499,
    tagline: "Stem-style buds with clear calls and punchy bass.",
    description: "A familiar stem design with a dual-mic setup for clear calls and a warm, bass-forward sound.",
    specs: [["Bluetooth", "5.3"], ["Mic", "Dual-mic ENC"], ["Playtime", "6 h + 24 h with case"], ["Controls", "Touch + volume"]],
  },
  {
    id: "aura-buds-pro-2", name: "Aura Buds Pro 2", category: "airpods", tier: "premium", price: 3499, isHero: true, badge: "Top quality",
    tagline: "Strong noise cancellation and silicone-tip comfort.",
    description: "Our best everyday earbuds. Adaptive noise cancellation, a transparency mode and soft silicone tips that stay put.",
    colors: [{ name: "White", hex: "#f4f5f7" }],
    specs: [["Bluetooth", "5.4"], ["Noise control", "Adaptive ANC + Transparency"], ["Playtime", "7 h + 30 h with case"], ["Charging", "USB-C + wireless"]],
    inTheBox: ["Earbuds (pair)", "Charging case", "USB-C cable", "3 sizes of silicone tips", "Warranty card"],
    hotspots: [
      { x: 36, y: 37, title: "Adaptive noise cancellation", description: "Blocks engine, fan and crowd noise. Switch to transparency to hear around you." },
      { x: 64, y: 36, title: "Silicone ear tips", description: "Three sizes in the box for a seal that stays comfortable." },
      { x: 50, y: 73, title: "Wireless charging case", description: "Up to 30 hours of total playtime with the case." },
    ],
  },
  {
    id: "aura-buds-max", name: "Aura Buds Max", category: "airpods", tier: "premium", price: 4299,
    tagline: "Hi-fi sound in a wireless-charging case.",
    description: "Tuned for detail and depth, with a premium metal-finish case and strong noise cancellation.",
    specs: [["Bluetooth", "5.4"], ["Drivers", "11 mm hi-fi tuned"], ["Playtime", "8 h + 32 h with case"], ["Charging", "USB-C + wireless"]],
  },

  /* ============================ NECKBANDS (new) ============================ */
  {
    id: "bass-band-101", name: "Bass Band 101", category: "neckbands", tier: "normal", price: 499,
    tagline: "A light neckband with deep bass for everyday use.",
    description: "Slip it on and forget it. Simple controls, a built-in mic and enough battery for a few days of music.",
    specs: [["Bluetooth", "5.2"], ["Playtime", "Up to 20 h"], ["Charging", "Type-C"], ["Calls", "Built-in mic"]],
  },
  {
    id: "bass-band-202", name: "Bass Band 202", category: "neckbands", tier: "normal", price: 699,
    tagline: "Magnetic buds and 30 hours of playtime.",
    description: "Magnetic buds snap together when not in use, and the longer battery keeps the music going all week.",
    specs: [["Bluetooth", "5.2"], ["Playtime", "Up to 30 h"], ["Buds", "Magnetic"], ["Charging", "Type-C"]],
  },
  {
    id: "flow-band-enc", name: "Flow Band ENC", category: "neckbands", tier: "mid-range", price: 1199,
    tagline: "Clear calls, even on a busy road.",
    description: "Environmental noise cancellation on the call mic keeps your voice clear while you walk or ride.",
    specs: [["Bluetooth", "5.3"], ["Call mic", "ENC"], ["Playtime", "Up to 35 h"], ["Charging", "Fast charge · Type-C"]],
  },
  {
    id: "flow-band-sport", name: "Flow Band Sport", category: "neckbands", tier: "mid-range", price: 1499,
    tagline: "Sweat-resistant and secure for workouts.",
    description: "A flexible band that stays put when you run, with sweat resistance and a long battery for the week.",
    specs: [["Bluetooth", "5.3"], ["Protection", "IPX5 sweat resistant"], ["Playtime", "Up to 40 h"], ["Charging", "Fast charge · Type-C"]],
  },
  {
    id: "meridian-band-anc", name: "Meridian Band ANC", category: "neckbands", tier: "premium", price: 2499, isHero: true, badge: "Top quality",
    tagline: "A braided band, noise cancellation and metal buds.",
    description: "The best neckband we stock. Active noise cancellation, a braided band that resists tangles and metal-finish buds.",
    colors: [{ name: "Black & Gold", hex: "#1c1917" }],
    specs: [["Bluetooth", "5.3"], ["Noise control", "Active noise cancellation"], ["Playtime", "Up to 45 h"], ["Band", "Braided, flexible"]],
    hotspots: [
      { x: 25, y: 28, title: "Metal-finish magnetic buds", description: "Buds snap together on your neck when not in use." },
      { x: 25, y: 59, title: "Inline controls", description: "Physical buttons for volume, tracks and noise control." },
      { x: 50, y: 73, title: "Braided flex band", description: "Soft, tangle-resistant and comfortable all day." },
    ],
  },
  {
    id: "meridian-band-hifi", name: "Meridian Band Hi-Fi", category: "neckbands", tier: "premium", price: 3199,
    tagline: "Studio-tuned drivers for people who care about sound.",
    description: "Large drivers tuned for detail, with a braided band and a battery that lasts for weeks of commuting.",
    specs: [["Bluetooth", "5.3"], ["Drivers", "13 mm hi-fi"], ["Playtime", "Up to 50 h"], ["Band", "Braided, flexible"]],
  },

  /* ============================ COVERS (new) ============================ */
  {
    id: "clear-cover", name: "Clear Transparent Cover", category: "covers", tier: "normal", price: 149,
    tagline: "Show off your phone. Protect every corner.",
    description: "A slim, soft cover that keeps scratches away without hiding the colour of your phone.",
    specs: [["Material", "Soft TPU"], ["Fit", "Most popular models"], ["Camera", "Raised lip"], ["Colour", "Clear"]],
  },
  {
    id: "soft-silicone-cover", name: "Soft Silicone Cover", category: "covers", tier: "normal", price: 199,
    tagline: "A smooth, grippy feel in colours you can match.",
    description: "Soft-touch silicone that is easy to hold and keeps your phone safe from everyday bumps.",
    specs: [["Material", "Soft silicone"], ["Fit", "Most popular models"], ["Lining", "Microfibre"], ["Colours", "Several"]],
  },
  {
    id: "shockproof-armor-cover", name: "Shockproof Armor Cover", category: "covers", tier: "mid-range", price: 449,
    tagline: "Reinforced corners for everyday drops.",
    description: "Dual-layer protection with air-cushion corners and a raised camera ring for real-world accidents.",
    specs: [["Material", "TPU + PC dual layer"], ["Corners", "Air-cushion"], ["Camera", "Raised ring"], ["Fit", "Select your model"]],
  },
  {
    id: "matte-bumper-cover", name: "Matte Bumper Cover", category: "covers", tier: "mid-range", price: 549,
    tagline: "A frosted back with a coloured bumper. No fingerprints.",
    description: "A hard frosted back that resists fingerprints, framed by a soft coloured bumper for grip and protection.",
    specs: [["Material", "PC back + TPU bumper"], ["Finish", "Frosted matte"], ["Camera", "Raised lip"], ["Fit", "Select your model"]],
  },
  {
    id: "leather-magnet-case", name: "Leather Case with Magnet Ring", category: "covers", tier: "premium", price: 1299, badge: "Premium",
    tagline: "A leather finish with a ring for magnetic chargers.",
    description: "A soft leather-finish case with stitched edges and a built-in magnetic ring that locks onto magnetic wireless chargers.",
    specs: [["Material", "Leather finish + microfibre lining"], ["Magnet", "Ring for magnetic chargers"], ["Edges", "Raised screen and camera lip"], ["Fit", "Select your model"]],
  },
  {
    id: "carbon-slim-case", name: "Carbon-Texture Slim Case", category: "covers", tier: "premium", price: 899,
    tagline: "Ultra-slim and light, with a carbon-fibre look.",
    description: "A thin hard case with a woven carbon texture and a gold-toned edge accent. Adds almost no bulk.",
    specs: [["Material", "PC with carbon texture"], ["Profile", "Ultra-slim"], ["Finish", "Matte weave"], ["Fit", "Select your model"]],
  },

  /* ============================ ACCESSORIES (new) ============================ */
  {
    id: "fast-charger-20w", name: "20W Type-C Fast Charger", category: "accessories", tier: "normal", price: 399,
    tagline: "Fast, safe charging for most phones.",
    description: "A compact 20W charger that tops up modern iPhones and Android phones quickly.",
    specs: [["Output", "20W USB-C PD"], ["Protection", "Over-current and over-heat"], ["Works with", "Most phones"], ["Plug", "2-pin"]],
    inTheBox: ["20W charger", "Warranty card"],
  },
  {
    id: "tempered-glass-2pack", name: "Tempered Glass (2-Pack)", category: "accessories", tier: "normal", price: 149,
    tagline: "9H glass that keeps your screen like new.",
    description: "Clear tempered glass that resists scratches. We can fit it for you at the store.",
    specs: [["Hardness", "9H"], ["Pack", "2 sheets + wipes"], ["Finish", "Clear HD"], ["Fit", "Select your model"]],
    inTheBox: ["2 glass sheets", "Cleaning wipe", "Dust sticker"],
  },
  {
    id: "gan-charger-33w-cable", name: "33W GaN Charger + Braided Cable", category: "accessories", tier: "mid-range", price: 899, badge: "Best value",
    tagline: "A smaller, cooler charger with a tough braided cable.",
    description: "GaN technology keeps the charger compact and cool, and the braided cable is built to survive daily use.",
    specs: [["Output", "33W USB-C"], ["Technology", "GaN"], ["Cable", "1 m braided Type-C"], ["Protection", "Over-current and over-heat"]],
    inTheBox: ["33W GaN charger", "1 m braided Type-C cable", "Warranty card"],
  },
  {
    id: "powerbank-10000", name: "10,000 mAh Power Bank", category: "accessories", tier: "mid-range", price: 1199,
    tagline: "Pocket-size backup with 22.5W fast charging.",
    description: "Slim enough for a pocket, with fast charging and a simple LED level indicator.",
    specs: [["Capacity", "10,000 mAh"], ["Output", "22.5W fast charge"], ["Ports", "USB-C + USB-A"], ["Indicator", "LED level"]],
    inTheBox: ["Power bank", "Type-C cable", "Warranty card"],
  },
  {
    id: "wireless-charger-15w", name: "15W Magnetic Wireless Charger", category: "accessories", tier: "premium", price: 1499,
    tagline: "Snap on and charge. No cable fiddling.",
    description: "A magnetic charging stand that holds your phone at a comfortable angle on your desk or bedside.",
    specs: [["Output", "15W magnetic wireless"], ["Input", "USB-C"], ["Design", "Desk stand"], ["Works with", "Magnetic-ring phones and cases"]],
    inTheBox: ["Wireless charger", "USB-C cable", "Warranty card"],
  },
  {
    id: "powerbank-20000-65w", name: "20,000 mAh 65W Power Bank", category: "accessories", tier: "premium", price: 2999, isHero: true, badge: "Top quality",
    tagline: "Powers phones, tablets and even laptops.",
    description: "A high-capacity power bank with 65W fast charging and a digital display that shows the exact charge left.",
    colors: [{ name: "Black & Gold", hex: "#2b2d33" }],
    specs: [["Capacity", "20,000 mAh"], ["Output", "65W USB-C PD"], ["Display", "Digital percentage"], ["Ports", "2× USB-C + USB-A"]],
    inTheBox: ["Power bank", "USB-C cable", "Carry pouch", "Warranty card"],
    hotspots: [
      { x: 43, y: 17, title: "Multiple ports", description: "Charge a phone, earbuds and a tablet together." },
      { x: 42, y: 30, title: "Digital display", description: "Shows the exact battery percentage left." },
      { x: 49, y: 72, title: "65W fast charging", description: "Fast enough to top up many laptops and tablets." },
    ],
  },
];

export const ALL_PRODUCTS: Product[] = SEEDS.map(make);

/** Used by the 3D Studio and featured picks: one star product per category. */
export const HERO_PRODUCTS: Product[] = ALL_PRODUCTS.filter((p) => p.isHero);

/* ---------------------------------------------------------------------
   CATEGORIES
   --------------------------------------------------------------------- */
const countIn = (id: CategoryId) => ALL_PRODUCTS.filter((p) => p.category === id).length;
const artOf = (productId: string) => `/assets/products/${productId}.svg`;

export const CATEGORIES: CategoryItem[] = [
  { id: "phones", slug: "phones", name: "Phones", productLabel: "Pre-owned phone", tagline: "Pre-owned, checked and priced fair.", stock: "Pre-owned", count: countIn("phones"), image: artOf("iphone-14-pro-128") },
  { id: "airpods", slug: "airpods", name: "AirPods", productLabel: "AirPods", tagline: "Brand-new wireless earbuds.", stock: "Brand new", count: countIn("airpods"), image: artOf("aura-buds-pro-2") },
  { id: "neckbands", slug: "neckbands", name: "Neckbands", productLabel: "Neckband", tagline: "Brand-new Bluetooth neckbands.", stock: "Brand new", count: countIn("neckbands"), image: artOf("meridian-band-anc") },
  { id: "covers", slug: "covers", name: "Covers", productLabel: "Phone cover", tagline: "Brand-new covers for popular models.", stock: "Brand new", count: countIn("covers"), image: artOf("leather-magnet-case") },
  { id: "accessories", slug: "accessories", name: "Accessories", productLabel: "Accessory", tagline: "Chargers, power banks and screen guards.", stock: "Brand new", count: countIn("accessories"), image: artOf("powerbank-20000-65w") },
];

/* ---------------------------------------------------------------------
   HELPERS
   --------------------------------------------------------------------- */
export const isCategoryId = (v: string | undefined | null): v is CategoryId =>
  !!v && CATEGORIES.some((c) => c.id === v);
export const isTier = (v: string | undefined | null): v is Tier =>
  !!v && TIER_ORDER.includes(v as Tier);

export const getCategory = (id: CategoryId) => CATEGORIES.find((c) => c.id === id)!;
export const getTier = (id: Tier) => TIERS.find((t) => t.id === id)!;

export const productsIn = (category: CategoryId | "all", tier: Tier | "all" = "all") =>
  ALL_PRODUCTS.filter((p) => (category === "all" || p.category === category) && (tier === "all" || p.tier === tier));

export const priceRange = (category: CategoryId | "all", tier: Tier | "all" = "all") => {
  const list = productsIn(category, tier);
  if (list.length === 0) return null;
  const prices = list.map((p) => p.price);
  return { min: Math.min(...prices), max: Math.max(...prices), count: list.length };
};

export const inr = (n: number) => `₹${n.toLocaleString("en-IN")}`;

/* ---------------------------------------------------------------------
   REVIEWS — PLACEHOLDERS. Replace with Shanu's real customer reviews
   (for example from Google Maps) before launch.
   --------------------------------------------------------------------- */
export const REVIEWS: StoreReview[] = [
  {
    id: "rev-1",
    name: "Debashis Roy",
    role: "Local Customer",
    rating: 5,
    date: "2 days ago",
    comment:
      "Best gadget store in Kamalasagar and Madhupur. Shanu personally helped me pick the right phone for my budget and was clear about the condition and battery before I paid.",
    verifiedPurchase: true,
    purchasedItem: "Pre-owned phone",
  },
  {
    id: "rev-2",
    name: "Ankita Chakraborty",
    role: "Content Creator",
    rating: 5,
    date: "1 week ago",
    comment:
      "Got my phone display repaired in about 40 minutes and added a custom forged carbon skin. The finishing is immaculate. Transparent pricing and very humble staff.",
    verifiedPurchase: true,
    purchasedItem: "Display repair & custom skin",
  },
  {
    id: "rev-3",
    name: "Rakesh Majumder",
    role: "Music Lover",
    rating: 5,
    date: "2 weeks ago",
    comment:
      "Finally a shop nearby with proper AirPods and neckbands to choose from in every budget. I could try them in the store instead of waiting days for a courier.",
    verifiedPurchase: true,
    purchasedItem: "Neckband",
  },
  {
    id: "rev-4",
    name: "Bikram Paul",
    role: "Verified Store Visitor",
    rating: 5,
    date: "3 weeks ago",
    comment:
      "Ordered on WhatsApp and picked up the charger 20 minutes later at the counter. Easy and quick.",
    verifiedPurchase: true,
    purchasedItem: "20W Fast Charger",
  },
];

export const WHY_US_PILLARS = [
  {
    id: "checked",
    title: "Checked before listing",
    tagline: "No surprises after you buy.",
    description:
      "Every pre-owned phone is tested for display, touch, cameras, speakers, network and charging before it reaches the shelf.",
    icon: "ShieldCheck",
    metric: "Tested units",
  },
  {
    id: "honest",
    title: "Honest condition grades",
    tagline: "Like New, Good or Fair.",
    description:
      "Each phone shows its grade and battery health, so you know exactly what you are paying for.",
    icon: "Sparkles",
    metric: "Clear grading",
  },
  {
    id: "new-accessories",
    title: "Brand-new accessories",
    tagline: "Sealed and fresh.",
    description:
      "AirPods, neckbands, covers and chargers come new. Pick Normal, Mid-range or Premium to match your budget.",
    icon: "Headphones",
    metric: "3 tiers each",
  },
  {
    id: "local",
    title: "Local help",
    tagline: "Right here in Madhupur.",
    description:
      "Touch and test in the store, or order on WhatsApp and collect from the counter.",
    icon: "MapPin",
    metric: "WhatsApp orders",
  },
];

export const TRUST_METRICS = [
  { label: "Categories", value: "5", subtitle: "Phones, AirPods, Neckbands, Covers, Accessories" },
  { label: "Tiers in each", value: "3", subtitle: "Normal, Mid-range and Premium" },
  { label: "Open", value: "7 Days", subtitle: "10:00 AM – 9:30 PM" },
  { label: "Order on", value: "WhatsApp", subtitle: "Pick up at the store" },
];

export const INSTAGRAM_POSTS = [
  {
    id: "post-1",
    image: "/assets/images/home-banner.jpg",
    caption: "Welcome to Shanu's Gadgets in Madhupur, Kamalasagar! Step in for quality-checked phones and fresh accessories.",
    likes: 412,
    date: "Yesterday",
  },
  {
    id: "post-2",
    image: "/assets/images/real-store-interior.jpg",
    caption: "Showroom vibe check ✨ Our golden marble showcase & ceiling LED strip design ready for your weekend visit.",
    likes: 589,
    date: "3 days ago",
  },
  {
    id: "post-3",
    image: "/assets/images/hero-phone.jpg",
    caption: "Pre-owned phones, graded and priced honestly. Come and compare them in person.",
    likes: 340,
    date: "5 days ago",
  },
  {
    id: "post-4",
    image: "/assets/images/store-shelves.jpg",
    caption: "Shelves restocked: AirPods, neckbands, covers and chargers in Normal, Mid-range and Premium.",
    likes: 624,
    date: "1 week ago",
  },
  {
    id: "post-5",
    image: "/assets/images/hero-accessories.jpg",
    caption: "New covers and screen guards for popular models. Tell us your phone and we will fit it.",
    likes: 478,
    date: "1 week ago",
  },
  {
    id: "post-6",
    image: "/assets/images/store-lifestyle.jpg",
    caption: "Precision laser skin application on the spot. Make your device uniquely yours.",
    likes: 512,
    date: "2 weeks ago",
  },
];
