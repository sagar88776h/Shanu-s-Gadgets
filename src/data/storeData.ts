export interface Product {
  id: string;
  name: string;
  tagline: string;
  category: string;
  categoryLabel: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviewCount: number;
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
  availability: 'In Stock' | 'Fast Store Pickup' | 'Pre-Order';
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
  id: string;
  name: string;
  tagline: string;
  count: number;
  image: string;
  slug: string;
}

export const STORE_CONFIG = {
  name: "SHANU’S GADGETS",
  shortName: "SHANU'S",
  tagline: "Technology. Curated Better.",
  subTagline: "Discover the gadgets that make everyday life smarter.",
  servicesLine: "MOBILE • GRAPHICS • REPAIRING • ACCESSORIES",
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
  }
};

export const CATEGORIES: CategoryItem[] = [
  {
    id: "smartphones",
    name: "Smartphones",
    tagline: "Flagship performance & camera power",
    count: 24,
    image: "/assets/images/hero-phone.jpg",
    slug: "smartphones"
  },
  {
    id: "audio",
    name: "Audio & ANC",
    tagline: "Studio acoustics & spatial sound",
    count: 32,
    image: "/assets/images/hero-headphones.jpg",
    slug: "audio"
  },
  {
    id: "smartwatches",
    name: "Smart Watches",
    tagline: "Titanium chassis & health tracking",
    count: 18,
    image: "/assets/images/hero-smartwatch.jpg",
    slug: "smartwatches"
  },
  {
    id: "accessories",
    name: "Accessories",
    tagline: "Leather cases, lens guards & stands",
    count: 85,
    image: "/assets/images/store-shelves.jpg",
    slug: "accessories"
  },
  {
    id: "chargers-cables",
    name: "Chargers & Cables",
    tagline: "GaN Fast charging & braided silicon",
    count: 42,
    image: "/assets/images/hero-accessories.jpg",
    slug: "chargers-cables"
  },
  {
    id: "power-banks",
    name: "Power Banks",
    tagline: "MagSafe wireless & high-capacity",
    count: 20,
    image: "/assets/images/category-power.jpg",
    slug: "power-banks"
  },
  {
    id: "gaming",
    name: "Gaming Gear",
    tagline: "Mechanical switches & low-latency",
    count: 28,
    image: "/assets/images/category-gaming.jpg",
    slug: "gaming"
  },
  {
    id: "repairing-graphics",
    name: "Repair & Custom Skins",
    tagline: "Expert chip repair & laser wraps",
    count: 15,
    image: "/assets/images/store-lifestyle.jpg",
    slug: "repairing-graphics"
  }
];

export const HERO_PRODUCTS: Product[] = [
  {
    id: "titan-pro-flagship",
    name: "Apex Titanium Pro",
    tagline: "Power that fits your world.",
    category: "smartphones",
    categoryLabel: "Flagship Smartphone",
    price: 79999,
    originalPrice: 84999,
    rating: 4.9,
    reviewCount: 148,
    image: "/assets/images/hero-phone.jpg",
    isHero: true,
    badge: "Flagship Edition",
    description: "Forged in Aerospace-grade Titanium with the industry's brightest 120Hz LTPO curved AMOLED display and Quad-Pixel 50MP optical stabilization system.",
    colors: [
      { name: "Natural Titanium", hex: "#a8a8a4" },
      { name: "Space Black", hex: "#1f2022" },
      { name: "Desert Gold", hex: "#d9b897" },
      { name: "Deep Navy", hex: "#1f2937" }
    ],
    specs: [
      { label: "Processor", value: "Snapdragon 8 Elite / Bionic Gen 3" },
      { label: "Display", value: "6.7\" LTPO AMOLED, 1-120Hz, 3000 nits" },
      { label: "Camera", value: "50MP Main OIS + 48MP Ultra-Wide + 5x Tele" },
      { label: "Battery", value: "5,000mAh with 100W HyperCharge" },
      { label: "Chassis", value: "Grade 5 Titanium & Ceramic Shield" }
    ],
    features: [
      { title: "Aerospace Titanium", desc: "Unmatched strength-to-weight ratio with precision contoured micro-blasted edges." },
      { title: "Next-Gen Thermal Vapor", desc: "Sustained peak framerates for AAA gaming and 4K ProRes video capture." },
      { title: "Pro Visual Pipeline", desc: "Zero-shutter-lag computational photography tuned for true-to-life tones." }
    ],
    inTheBox: ["Apex Titanium Pro Device", "100W Fast Power Adapter", "Reinforced Type-C Braided Cable", "SIM Ejector", "Store Warranty Card"],
    warranty: "1 Year Official Brand Warranty + Free 1st Year In-Store Service at Shanu's Gadgets",
    availability: "In Stock",
    hotspots: [
      { x: 70, y: 35, title: "50MP Quad-Pixel Camera", description: "F/1.6 aperture with 2nd-gen sensor-shift optical image stabilization." },
      { x: 30, y: 55, title: "120Hz LTPO AMOLED", description: "Ultra-responsive dynamic refresh rate with 3000 nits outdoor peak brightness." },
      { x: 50, y: 80, title: "All-Day 5000mAh", description: "0 to 80% charge in just 18 minutes with included GaN adapter." },
      { x: 80, y: 70, title: "Grade 5 Titanium Frame", description: "Micro-arc oxidation finish with ultra-lightweight durability." }
    ]
  },
  {
    id: "acoustic-anc-headphones",
    name: "Acoustix Studio Max",
    tagline: "Sound. Without compromise.",
    category: "audio",
    categoryLabel: "Studio Over-Ear ANC",
    price: 26999,
    originalPrice: 29999,
    rating: 5.0,
    reviewCount: 92,
    image: "/assets/images/hero-headphones.jpg",
    isHero: true,
    badge: "Audiophile Grade",
    description: "Engineered with bespoke 40mm dual-neodymium drivers and hybrid 42dB active noise cancellation. Pure high-fidelity spatial realism with memory foam ear cushions.",
    colors: [
      { name: "Space Gray", hex: "#37373f" },
      { name: "Silver Moonlight", hex: "#e5e5eb" },
      { name: "Midnight Matte", hex: "#111114" }
    ],
    specs: [
      { label: "Driver Size", value: "40mm Custom High-Excursion Titanium" },
      { label: "Noise Cancellation", value: "Hybrid ANC with 6-Mic Beamforming" },
      { label: "Battery Life", value: "40 Hours with ANC On (5min quick charge = 4h)" },
      { label: "Connectivity", value: "Bluetooth 5.4 + LDAC + Lossless USB-C Audio" },
      { label: "Weight", value: "278g Ultralight Balanced Ergonomics" }
    ],
    features: [
      { title: "Dynamic Head Tracking", desc: "Immersive 3D audio space transforms movies and studio tracks into concert halls." },
      { title: "Acoustically Tuned Mesh", desc: "Breathable canopy distributes weight evenly to eliminate crown pressure points." },
      { title: "Precision Digital Crown", desc: "Tactile rotary dial gives exact volume increments and transparency toggling." }
    ],
    inTheBox: ["Acoustix Studio Max", "Smart Magnetic Travel Case", "USB-C Audio & Fast Charge Cable", "3.5mm Gold-Plated Audio Cable"],
    warranty: "1 Year Replacement Warranty + Free Audio Calibration at Shanu's Gadgets",
    availability: "Fast Store Pickup",
    hotspots: [
      { x: 45, y: 20, title: "Acoustic Mesh Headband", description: "Reduces head pressure with breathable tension fabric." },
      { x: 72, y: 58, title: "40mm Neodymium Driver", description: "Delivers sub-bass down to 10Hz and ultra-crisp highs up to 40kHz." },
      { x: 38, y: 72, title: "Hybrid ANC Array", description: "6 precision microphones filter out ambient environmental noise." }
    ]
  },
  {
    id: "apex-chrono-ultra",
    name: "Apex Chrono Ultra 49",
    tagline: "Precision crafted for peak moments.",
    category: "smartwatches",
    categoryLabel: "Rugged Titanium Smartwatch",
    price: 34999,
    originalPrice: 38999,
    rating: 4.9,
    reviewCount: 110,
    image: "/assets/images/hero-smartwatch.jpg",
    isHero: true,
    badge: "Extreme Durability",
    description: "Built with 49mm forged titanium case, sapphire crystal front, dual-frequency precision GPS, and up to 72 hours of uninterrupted expedition battery life.",
    colors: [
      { name: "Titanium Orange Action", hex: "#f97316" },
      { name: "Stealth Black Loop", hex: "#1e293b" },
      { name: "Alpine Glacier", hex: "#94a3b8" }
    ],
    specs: [
      { label: "Case Size", value: "49mm Aerospace Titanium" },
      { label: "Screen", value: "2.1\" Sapphire OLED, 2500 nits Night Mode" },
      { label: "Sensors", value: "ECG, SpO2, Skin Temp, Depth Gauge, Dual GPS" },
      { label: "Water Resistance", value: "100m WR100 / EN13319 Dive Certified" },
      { label: "Battery", value: "72 Hours Normal / 120h Low-Power Mode" }
    ],
    features: [
      { title: "Customizable Action Button", desc: "Instant physical access to workout tracking, compass waypoints, or flashlight." },
      { title: "86dB Emergency Siren", desc: "Audible up to 600 feet away in wilderness or emergency conditions." },
      { title: "Military Spec 810H", desc: "Tested against extreme cold, desert heat, altitude shock, and vibration." }
    ],
    inTheBox: ["Apex Chrono Ultra", "Titanium G-Hook Alpine Band", "Magnetic Fast Charging Cable", "Quick Start Guide"],
    warranty: "1 Year Official Warranty + Free Band Swaps Consultation in Store",
    availability: "In Stock",
    hotspots: [
      { x: 50, y: 40, title: "Sapphire Crystal Display", description: "2500 nits high-visibility flat crystal that resists scratches from sand and rocks." },
      { x: 80, y: 45, title: "Digital Crown & Guard", description: "Larger knurled dial easily operated with gloves in rain or snow." },
      { x: 30, y: 70, title: "Woven Trail Loop", description: "High-strength polyester blend with corrosion-proof titanium hardware." }
    ]
  },
  {
    id: "magdock-matrix-3in1",
    name: "MagMatrix 3-in-1 Fast Station",
    tagline: "Small upgrades. Big difference.",
    category: "chargers-cables",
    categoryLabel: "Qi2 Wireless Charger",
    price: 5499,
    originalPrice: 6999,
    rating: 4.8,
    reviewCount: 76,
    image: "/assets/images/hero-accessories.jpg",
    isHero: true,
    badge: "Best Seller",
    description: "Machined from a solid block of space-grade aluminum. Simultaneously delivers 15W Qi2 magnetic fast charging to your smartphone, smartwatch, and wireless earbuds.",
    colors: [
      { name: "Space Gray", hex: "#3b3b44" },
      { name: "Silver Frost", hex: "#d1d5db" }
    ],
    specs: [
      { label: "Output Power", value: "Total 25W (15W Phone + 5W Watch + 5W Buds)" },
      { label: "Standard", value: "Official Qi2 Certified Magnetic Alignment" },
      { label: "Material", value: "CNC Anodized Aluminum + Soft-Touch Silicone" },
      { label: "Angle Adjust", value: "60° Tilt & 360° Portrait/Landscape Rotation" },
      { label: "Safety", value: "Active TempGuard & Foreign Object Detection" }
    ],
    features: [
      { title: "Zero Cable Clutter", desc: "Powers your entire daily carry from a single minimalist braided USB-C input." },
      { title: "StandBy & Nightstand Ready", desc: "Holds your device at the optimal viewing angle for alarms, widgets, and Face ID." }
    ],
    inTheBox: ["MagMatrix 3-in-1 Base", "35W USB-C GaN Wall Plug", "1.5m Reinforced Braided Cable"],
    warranty: "2 Years No-Hassle Replacement Warranty at Shanu's Gadgets",
    availability: "In Stock",
    hotspots: [
      { x: 45, y: 35, title: "15W Magnetic Puck", description: "Rare-earth neodymium ring aligns phone instantly with strong lock." },
      { x: 68, y: 55, title: "Fast Watch Charger", description: "Rapid induction pad charges smartwatch 0-80% in 45 minutes." },
      { x: 48, y: 82, title: "Earbuds Base Tray", description: "Contoured recess with non-slip silicone base and status LED." }
    ]
  }
];

export const ALL_PRODUCTS: Product[] = [
  ...HERO_PRODUCTS,
  {
    id: "cyber-charge-powerbank",
    name: "VoltCore 10000 Magnetic Slim",
    tagline: "Pocket-sized endurance with digital LED readout.",
    category: "power-banks",
    categoryLabel: "Magnetic Power Bank",
    price: 2999,
    originalPrice: 3999,
    rating: 4.9,
    reviewCount: 88,
    image: "/assets/images/category-power.jpg",
    badge: "Customer Favorite",
    description: "Ultra-slim 10,000mAh magnetic battery with real-time numeric power display, 20W PD bi-directional fast charging, and pass-through support.",
    specs: [
      { label: "Capacity", value: "10,000mAh (38.5Wh)" },
      { label: "Output", value: "15W Magnetic Wireless + 20W USB-C PD" },
      { label: "Weight", value: "185g ultra-slim profile" },
      { label: "Display", value: "Real-Time Percentage LED Display" }
    ],
    features: [
      { title: "Snaps & Stays", desc: "1200g magnetic holding force keeps it firmly locked to your device." },
      { title: "Dual Charging", desc: "Charge your phone wirelessly while charging earbuds via the USB-C port." }
    ],
    inTheBox: ["VoltCore 10000", "0.3m Braided Type-C Cable", "Store Warranty Slip"],
    warranty: "1 Year Store Replacement Warranty",
    availability: "In Stock"
  },
  {
    id: "mechanical-keeb-pro",
    name: "KeyStudio 75 CNC Mechanical",
    tagline: "Tactile acoustics with gasket-mounted aluminum body.",
    category: "gaming",
    categoryLabel: "Mechanical Keyboard",
    price: 8999,
    originalPrice: 10999,
    rating: 5.0,
    reviewCount: 64,
    image: "/assets/images/category-gaming.jpg",
    badge: "Enthusiast Choice",
    description: "Full CNC aluminum gasket-mount mechanical keyboard with factory pre-lubed linear switches, hot-swappable PCB, warm underglow, and multi-device Bluetooth/2.4G.",
    specs: [
      { label: "Layout", value: "75% Compact (81 Keys with Rotary Knob)" },
      { label: "Body", value: "6063 Anodized CNC Aluminum (1.8kg)" },
      { label: "Switches", value: "Pre-Lubed Custom Cream Linear Switches" },
      { label: "Connectivity", value: "Tri-Mode: 2.4GHz + BT 5.3 + Type-C" }
    ],
    features: [
      { title: "Thock Acoustic Dampening", desc: "5-layer Poron foam and IXPE switch pads create a deep, satisfying sound." },
      { title: "Hot-Swap Sockets", desc: "Easily swap 3-pin and 5-pin MX mechanical switches without soldering." }
    ],
    inTheBox: ["KeyStudio 75", "Coiled Aviator Cable", "Keycap/Switch Puller", "Extra Accent Keycaps"],
    warranty: "1 Year Official Warranty + Free Switch Servicing",
    availability: "In Stock"
  },
  {
    id: "leather-case-titanium",
    name: "Vintage Top-Grain Leather Armor",
    tagline: "Ages gracefully with handcrafted patina.",
    category: "accessories",
    categoryLabel: "Premium Phone Case",
    price: 1899,
    originalPrice: 2499,
    rating: 4.8,
    reviewCount: 130,
    image: "/assets/images/store-shelves.jpg",
    badge: "Handcrafted",
    description: "Full-grain vegetable tanned Italian leather case with machined aluminum buttons, microfiber interior lining, and integrated MagSafe magnet array.",
    specs: [
      { label: "Material", value: "Full-Grain Italian Leather" },
      { label: "Buttons", value: "Machined Anodized Aluminum" },
      { label: "Drop Protection", value: "10ft Mil-Grade Impact Cushioning" }
    ],
    features: [
      { title: "Natural Patina", desc: "Develops a unique rich character and texture the more you use it." },
      { title: "Raised Camera Ring", desc: "Protects delicate camera lenses from table scratches and abrasive surfaces." }
    ],
    inTheBox: ["Leather Armor Case", "Authenticity Card"],
    warranty: "6 Months Craftsmanship Warranty",
    availability: "In Stock"
  },
  {
    id: "repair-service-display",
    name: "OEM Precision Screen Replacement",
    tagline: "Original OLED clarity restored in 45 minutes.",
    category: "repairing-graphics",
    categoryLabel: "Store Repair Service",
    price: 3499,
    rating: 5.0,
    reviewCount: 310,
    image: "/assets/images/store-lifestyle.jpg",
    badge: "Express 45-Min Service",
    description: "Professional chip-level display replacement using 100% factory original OLED/AMOLED panels. Done right before your eyes at Shanu's Gadgets service counter.",
    specs: [
      { label: "Time Required", value: "45 Minutes on-the-spot" },
      { label: "Component", value: "Original Grade Display Assembly with TrueColor" },
      { label: "Includes", value: "Free Hydrogel Screen Armor Installation" }
    ],
    features: [
      { title: "True Tone & 120Hz Retained", desc: "Full calibration using specialized hardware programmers." },
      { title: "Water-Resistance Resealed", desc: "Factory acoustic adhesive gasket reapplied after service." }
    ],
    inTheBox: ["Repaired Device", "Old Part Handover", "6-Month Written Warranty Card"],
    warranty: "6 Months Warranty on Touch & Display Quality",
    availability: "Fast Store Pickup"
  },
  {
    id: "custom-laser-skins",
    name: "3D Textured Laser Device Wrap",
    tagline: "Precision cut skins with zero bulk.",
    category: "repairing-graphics",
    categoryLabel: "Custom Graphics",
    price: 499,
    originalPrice: 799,
    rating: 4.9,
    reviewCount: 420,
    image: "/assets/images/real-store-interior.jpg",
    badge: "Instant Fit",
    description: "Military-grade 3M textured vinyl wraps laser cut for exact 0.05mm precision fit on smartphones, laptops, tablets, and gaming consoles.",
    specs: [
      { label: "Vinyl Type", value: "Original 3M Cast Matrix with Air-Release" },
      { label: "Thickness", value: "0.22mm ultra-slim shield" },
      { label: "Textures", value: "Forged Carbon, Matte Stealth, Honeycomb, Cyber Camo" }
    ],
    features: [
      { title: "Zero Residue", desc: "Peels off cleanly without leaving any sticky residue behind." },
      { title: "Instant Store Installation", desc: "Heat-formed and applied flawlessly by Shanu's specialists in 10 minutes." }
    ],
    inTheBox: ["Laser Cut Skin Applied on Device", "Bonus Camera Lens Skins"],
    warranty: "Lifetime Store Peeling Guarantee",
    availability: "In Stock"
  }
];

export const REVIEWS: StoreReview[] = [
  {
    id: "rev-1",
    name: "Debashis Roy",
    role: "Local Tech Enthusiast",
    rating: 5,
    date: "2 days ago",
    comment: "Hands down the best gadget store in Kamalasagar and Madhupur. The interior looks like a mini Apple Store, and Shanu personally helped me choose the right flagship phone. Genuine products with official warranty.",
    verifiedPurchase: true,
    purchasedItem: "Apex Titanium Pro"
  },
  {
    id: "rev-2",
    name: "Ankita Chakraborty",
    role: "Content Creator",
    rating: 5,
    date: "1 week ago",
    comment: "Got my phone display repaired in just 40 minutes and added a custom forged carbon skin. The finishing is immaculate. Super transparent pricing and very humble staff.",
    verifiedPurchase: true,
    purchasedItem: "Display Repair & Custom Skin"
  },
  {
    id: "rev-3",
    name: "Rakesh Majumder",
    role: "Audiophile & Gamer",
    rating: 5,
    date: "2 weeks ago",
    comment: "Finally a store that stocks authentic studio headphones and mechanical keyboards locally! You don't have to wait days for courier delivery anymore. 100% recommended.",
    verifiedPurchase: true,
    purchasedItem: "Acoustix Studio Max"
  },
  {
    id: "rev-4",
    name: "Bikram Paul",
    role: "Verified Store Visitor",
    rating: 5,
    date: "3 weeks ago",
    comment: "Ordered via their WhatsApp button and picked up the charger 20 minutes later at the counter. The ambient lighting and showroom setup are incredible.",
    verifiedPurchase: true,
    purchasedItem: "MagMatrix 3-in-1 Station"
  }
];

export const WHY_US_PILLARS = [
  {
    id: "authentic",
    title: "AUTHENTIC PRODUCTS",
    tagline: "Technology you can trust.",
    description: "Every smartphone, accessory, and cable is 100% genuine with verifiable brand serials and official manufacturer warranty.",
    icon: "ShieldCheck",
    metric: "100% Genuine"
  },
  {
    id: "guidance",
    title: "EXPERT GUIDANCE",
    tagline: "Real people. Real advice.",
    description: "No aggressive sales pitches. Our passionate tech specialists take time to understand your lifestyle and find the exact gear for your needs.",
    icon: "Sparkles",
    metric: "Dedicated Care"
  },
  {
    id: "after-sales",
    title: "AFTER-SALES SUPPORT",
    tagline: "We stay with you after the purchase.",
    description: "From data migration and free software setup to hassle-free warranty assistance and swift in-house repairs.",
    icon: "Headphones",
    metric: "Lifetime Setup"
  },
  {
    id: "local-service",
    title: "LOCAL SERVICE",
    tagline: "Premium technology, close to home.",
    description: "Experience the convenience of touching, testing, and picking up high-end technology right here in Madhupur, Kamalasagar, Sepahijala.",
    icon: "MapPin",
    metric: "Instant Pickup"
  }
];

export const TRUST_METRICS = [
  { label: "Happy Customers", value: "15,000+", subtitle: "Across Sepahijala & Tripura" },
  { label: "Google & Store Rating", value: "4.9 ★", subtitle: "Based on 520+ Reviews" },
  { label: "Genuine Guarantee", value: "100%", subtitle: "Official Brand Seals" },
  { label: "Express Repairs", value: "45 Min", subtitle: "Average Turnaround" }
];

export const INSTAGRAM_POSTS = [
  {
    id: "post-1",
    image: "/assets/images/home-banner.jpg",
    caption: "Welcome to Shanu's Gadgets in Madhupur, Kamalasagar! Step in for the latest smartphones & accessories.",
    likes: 412,
    date: "Yesterday"
  },
  {
    id: "post-2",
    image: "/assets/images/real-store-interior.jpg",
    caption: "Showroom vibe check ✨ Our golden marble showcase & ceiling LED strip design ready for your weekend visit.",
    likes: 589,
    date: "3 days ago"
  },
  {
    id: "post-3",
    image: "/assets/images/hero-phone.jpg",
    caption: "Aerospace Titanium in the palm of your hand. Unbox excellence at our counter.",
    likes: 340,
    date: "5 days ago"
  },
  {
    id: "post-4",
    image: "/assets/images/store-shelves.jpg",
    caption: "Shelves restocked with premium audio gear, MagSafe docks, and custom leather accessories.",
    likes: 624,
    date: "1 week ago"
  },
  {
    id: "post-5",
    image: "/assets/images/category-gaming.jpg",
    caption: "Custom CNC mechanical keyboards & braided coils for your dream desk setup.",
    likes: 478,
    date: "1 week ago"
  },
  {
    id: "post-6",
    image: "/assets/images/store-lifestyle.jpg",
    caption: "Precision laser skin application on the spot. Make your device uniquely yours.",
    likes: 512,
    date: "2 weeks ago"
  }
];
