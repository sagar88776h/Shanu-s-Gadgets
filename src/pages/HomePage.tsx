import React from "react";
import type { Product } from "../data/storeData";
import type { PageRoute } from "../components/Navbar";
import { STORE_CONFIG, CATEGORIES, HERO_PRODUCTS } from "../data/storeData";
import { HeroSection } from "../components/HeroSection";
import { WhyShanusGadgets } from "../components/WhyShanusGadgets";
import { CustomerReviews } from "../components/CustomerReviews";
import { SocialGallery } from "../components/SocialGallery";
import { soundFx } from "../lib/utils";
import {
  ArrowRight,
  Sparkles,
  Box,
  MapPin,
  ChevronRight,
  ShieldCheck,
  ShoppingBag,
  Zap,
} from "lucide-react";

interface HomePageProps {
  onNavigatePage: (page: PageRoute, category?: string) => void;
  onSelectProduct: (product: Product) => void;
  onAddToCart: (product: Product) => void;
  onReplayIntro: () => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  onNavigatePage,
  onSelectProduct,
  onAddToCart,
  onReplayIntro,
}) => {
  return (
    <div className="animate-fade-in">
      {/* 01: Hero Section */}
      <HeroSection
        onExploreClick={() => onNavigatePage("products")}
        onVisitStoreClick={() => onNavigatePage("store")}
        on3DClick={() => onNavigatePage("studio")}
        onReplayIntro={onReplayIntro}
      />

      {/* 02: Curated Flagship Showcase Teaser */}
      <section className="py-24 bg-[#fbfbfd] dark:bg-[#07070a] border-t border-black/[0.06] dark:border-white/[0.06] transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div>
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full apple-pill text-xs font-mono uppercase tracking-widest text-[#0071e3] dark:text-brand-gold mb-3 shadow-xs">
                <Sparkles className="w-3.5 h-3.5" />
                Curated Flagships
              </div>
              <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-apple-text dark:text-white">
                Featured Highlights.
              </h2>
            </div>
            <button
              onClick={() => {
                soundFx.playClick();
                onNavigatePage("products");
              }}
              className="inline-flex items-center gap-2 text-sm font-semibold text-[#0071e3] hover:underline"
            >
              <span>View All Gadgets</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Grid of Top 4 Hero Products */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {HERO_PRODUCTS.map((prod) => (
              <div
                key={prod.id}
                className="rounded-3xl apple-card dark:glass-card border border-black/[0.06] dark:border-white/10 p-5 flex flex-col justify-between hover:shadow-xl transition-all duration-300 group"
              >
                <div>
                  {/* Badge */}
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[10px] font-mono uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-black/[0.04] dark:bg-white/10 text-apple-text dark:text-white">
                      {prod.categoryLabel}
                    </span>
                    {prod.badge && (
                      <span className="text-[10px] font-mono uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-brand-gold/15 text-brand-gold font-bold">
                        {prod.badge}
                      </span>
                    )}
                  </div>

                  {/* Image */}
                  <div
                    onClick={() => {
                      soundFx.playClick();
                      onSelectProduct(prod);
                    }}
                    className="aspect-square rounded-2xl overflow-hidden bg-black/5 dark:bg-black/40 mb-4 cursor-pointer relative group-hover:scale-[1.02] transition-transform duration-500"
                  >
                    <img
                      src={prod.image}
                      alt={prod.name}
                      className="w-full h-full object-cover object-center"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center">
                      <span className="opacity-0 group-hover:opacity-100 transition-opacity px-3 py-1.5 rounded-full bg-white/90 dark:bg-black/90 text-apple-text dark:text-white text-xs font-semibold shadow-md">
                        Quick View
                      </span>
                    </div>
                  </div>

                  {/* Title & Tagline */}
                  <h3
                    onClick={() => {
                      soundFx.playClick();
                      onSelectProduct(prod);
                    }}
                    className="text-lg font-bold text-apple-text dark:text-white tracking-tight cursor-pointer hover:text-[#0071e3] transition-colors"
                  >
                    {prod.name}
                  </h3>
                  <p className="text-xs text-apple-gray mt-1 line-clamp-2">
                    {prod.tagline}
                  </p>
                </div>

                {/* Price & Action */}
                <div className="pt-5 mt-4 border-t border-black/[0.06] dark:border-white/[0.06] flex items-center justify-between">
                  <div>
                    <span className="text-base font-extrabold text-apple-text dark:text-white">
                      ₹{prod.price.toLocaleString("en-IN")}
                    </span>
                    {prod.originalPrice && (
                      <span className="text-xs text-apple-gray line-through ml-1.5 font-normal">
                        ₹{prod.originalPrice.toLocaleString("en-IN")}
                      </span>
                    )}
                  </div>

                  <button
                    onClick={() => {
                      soundFx.playClick();
                      onAddToCart(prod);
                    }}
                    className="w-8 h-8 rounded-full bg-[#0071e3] hover:bg-[#0077ed] text-white flex items-center justify-center shadow-xs hover:scale-110 active:scale-95 transition-all"
                    title="Add to Bag"
                  >
                    <ShoppingBag className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 03: 3D Hardware Studio Callout Banner */}
      <section className="py-20 bg-white dark:bg-[#030304] border-t border-black/[0.06] dark:border-white/[0.06]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl bg-gradient-to-r from-blue-50 via-indigo-50/50 to-amber-50/40 dark:from-[#0b101b] dark:via-[#0e1628] dark:to-[#17130b] border border-blue-500/20 p-8 sm:p-12 relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8 shadow-lg">
            <div className="max-w-xl space-y-4 text-left z-10">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0071e3]/10 border border-[#0071e3]/20 text-xs font-mono text-[#0071e3] dark:text-blue-400 font-semibold">
                <Box className="w-3.5 h-3.5 animate-spin-slow" />
                Interactive 360° Studio
              </div>
              <h3 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-apple-text dark:text-white">
                Inspect Hardware in 3D Space.
              </h3>
              <p className="text-sm sm:text-base text-apple-gray">
                Rotate flagship smartphones, change aerospace titanium finishes, and explore internal acoustic chambers before your store visit.
              </p>
              <div className="pt-2">
                <button
                  onClick={() => {
                    soundFx.playClick();
                    onNavigatePage("studio");
                  }}
                  className="px-6 py-3 rounded-full bg-[#0071e3] hover:bg-[#0077ed] text-white font-semibold text-sm flex items-center gap-2 shadow-md hover:scale-105 transition-all"
                >
                  <span>Launch 3D Studio</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="relative z-10 w-full md:w-auto flex justify-center">
              <div
                onClick={() => {
                  soundFx.playClick();
                  onNavigatePage("studio");
                }}
                className="w-48 h-48 sm:w-56 sm:h-56 rounded-full bg-white dark:bg-black/60 border border-blue-500/30 flex flex-col items-center justify-center p-6 text-center cursor-pointer shadow-xl hover:scale-105 transition-transform group"
              >
                <Box className="w-16 h-16 text-[#0071e3] dark:text-brand-gold group-hover:rotate-45 transition-transform duration-700" />
                <span className="text-xs font-bold text-apple-text dark:text-white mt-3">
                  Click to Rotate 360°
                </span>
                <span className="text-[10px] font-mono text-apple-gray mt-0.5">
                  Apex Titanium Pro
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 04: Visual Categories Teaser */}
      <section className="py-20 bg-[#fbfbfd] dark:bg-[#07070a] border-t border-black/[0.06] dark:border-white/[0.06]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div>
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full apple-pill text-xs font-mono uppercase tracking-widest text-brand-gold mb-3 shadow-xs">
                <Zap className="w-3.5 h-3.5" />
                Departments
              </div>
              <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-apple-text dark:text-white">
                Explore Categories.
              </h2>
            </div>
            <button
              onClick={() => {
                soundFx.playClick();
                onNavigatePage("categories");
              }}
              className="inline-flex items-center gap-2 text-sm font-semibold text-[#0071e3] hover:underline"
            >
              <span>View All 8 Categories</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            {CATEGORIES.slice(0, 4).map((cat) => (
              <div
                key={cat.id}
                onClick={() => {
                  soundFx.playClick();
                  onNavigatePage("products", cat.slug);
                }}
                className="group relative rounded-3xl overflow-hidden aspect-[4/5] bg-black cursor-pointer shadow-md hover:shadow-xl transition-all duration-300"
              >
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 text-left">
                  <span className="text-[10px] font-mono text-brand-gold uppercase tracking-wider block mb-1">
                    {cat.count} Products
                  </span>
                  <h4 className="text-base sm:text-lg font-bold text-white tracking-tight">
                    {cat.name}
                  </h4>
                  <p className="text-xs text-apple-lightgray font-light mt-0.5 line-clamp-1">
                    {cat.tagline}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 05: Store Experience Promo Banner with REAL Lightbox Board Photo */}
      <section className="py-20 bg-white dark:bg-[#030304] border-t border-black/[0.06] dark:border-white/[0.06]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl apple-card dark:glass-card border border-black/[0.06] dark:border-white/10 overflow-hidden shadow-xl grid grid-cols-1 lg:grid-cols-12 items-center">
            <div className="lg:col-span-7 relative aspect-[16/10] sm:aspect-[16/9] w-full overflow-hidden bg-black">
              <img
                src={STORE_CONFIG.images.banner}
                alt="Shanu's Gadgets Real Storefront"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-black/70 backdrop-blur-md border border-white/20 text-[11px] font-mono text-white">
                📍 Madhupur, Kamalasagar Main Road
              </div>
            </div>

            <div className="lg:col-span-5 p-6 sm:p-10 space-y-6 text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs font-mono font-medium">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                Open Today: 10:00 AM – 9:30 PM
              </div>

              <div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-apple-text dark:text-white tracking-tight">
                  Experience Shanu’s Gadgets In Person.
                </h3>
                <p className="text-sm text-apple-gray mt-2 leading-relaxed">
                  Touch the newest devices, get 45-min on-the-spot display repairs, and have our specialists guide you to the perfect daily setup.
                </p>
              </div>

              <div className="space-y-2 pt-2 border-t border-black/[0.06] dark:border-white/[0.08] text-xs text-apple-text/80 dark:text-apple-lightgray">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-[#0071e3]" />
                  <span>100% Genuine Brand Seals & Official Invoices</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-brand-gold" />
                  <span>Madhupur, Kamalasagar, Sepahijala, Tripura, 799102</span>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-3 pt-2">
                <button
                  onClick={() => {
                    soundFx.playClick();
                    onNavigatePage("store");
                  }}
                  className="px-6 py-3 rounded-full bg-[#0071e3] hover:bg-[#0077ed] text-white font-semibold text-xs tracking-tight shadow-md hover:scale-105 transition-all"
                >
                  Explore Store Showroom
                </button>
                <a
                  href={STORE_CONFIG.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-3 rounded-full bg-[#25D366]/15 hover:bg-[#25D366]/25 text-[#128C7E] dark:text-[#25D366] font-semibold text-xs transition-all"
                >
                  WhatsApp Inquiries
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 06: Why Shanu's Gadgets */}
      <WhyShanusGadgets />

      {/* 07: Customer Reviews */}
      <CustomerReviews />

      {/* 08: Social Grid */}
      <SocialGallery />
    </div>
  );
};
