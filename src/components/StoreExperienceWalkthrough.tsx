import React, { useState } from "react";
import { STORE_CONFIG } from "../data/storeData";
import { soundFx } from "../lib/utils";
import {
  MapPin,
  Clock,
  Phone,
  MessageCircle,
  Navigation,
  Sparkles,
  Camera,
  CheckCircle2,
} from "lucide-react";

export const StoreExperienceWalkthrough: React.FC = () => {
  const [activeView, setActiveView] = useState<number>(0);
  const [isTransitioning, setIsTransitioning] = useState<boolean>(false);

  const views = [
    {
      id: "exterior",
      title: "Storefront & Architecture",
      subtitle: "Madhupur, Kamalasagar Main Road",
      image: STORE_CONFIG.images.exterior,
      description:
        "Our prominent retail store featuring custom architectural trim, high-visibility illuminated signage, and an welcoming modern glass entrance.",
      tag: "REAL STOREFRONT",
    },
    {
      id: "interior",
      title: "Luxury Showroom & Counter",
      subtitle: "Geometric LED Ceiling & Gold Showcase",
      image: STORE_CONFIG.images.interior,
      description:
        "Step inside our climate-controlled boutique with warm marble display walls, underglow counter accents, and hands-on testing stations for all flagships.",
      tag: "REAL INTERIOR",
    },
    {
      id: "shelves",
      title: "Curated Accessory Gallery",
      subtitle: "Precision Shelving & Audio Bays",
      image: STORE_CONFIG.images.shelves,
      description:
        "Every case, cable, GaN charger, and headphone is neatly organized with live demo units so you can test fit and sound quality before buying.",
      tag: "ACCESSORY GALLERY",
    },
    {
      id: "lifestyle",
      title: "Specialist Advice & Repair Lab",
      subtitle: "One-on-One Technical Consultation",
      image: STORE_CONFIG.images.lifestyle,
      description:
        "Get transparent advice from knowledgeable tech lovers. Watch your phone get repaired or wrapped in custom 3D skins right before your eyes.",
      tag: "EXPERT SERVICE",
    },
  ];

  const handleTabChange = (idx: number) => {
    if (idx === activeView) return;
    soundFx.playClick();
    setIsTransitioning(true);
    setTimeout(() => {
      setActiveView(idx);
      setIsTransitioning(false);
    }, 180);
  };

  const currentView = views[activeView];

  return (
    <section
      id="store-experience"
      className="py-24 md:py-36 bg-white dark:bg-[#030304] border-t border-black/[0.06] dark:border-white/[0.06] relative overflow-hidden transition-colors duration-300"
    >
      {/* Background Ambience */}
      <div className="absolute top-1/4 right-0 w-[600px] h-[600px] bg-blue-100/30 dark:bg-brand-gold/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full apple-pill text-xs font-mono uppercase tracking-widest text-[#0071e3] dark:text-brand-gold mb-4 shadow-xs">
            <Sparkles className="w-3.5 h-3.5" />
            Physical Experience
          </div>
          <div className="floating-font">
            <h2 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-apple-text dark:text-white mb-4">
              Come see it yourself.
            </h2>
          </div>
          <p className="text-apple-gray text-base sm:text-xl font-normal floating-font-delayed">
            We believe technology should be experienced in person. Touch the titanium, hear the acoustics, and get genuine advice.
          </p>
        </div>

        {/* Cinematic Multi-View Gallery Stage */}
        <div className="rounded-3xl apple-card dark:glass-card border border-black/[0.06] dark:border-white/10 p-4 sm:p-8 md:p-12 mb-16 shadow-xl">
          {/* Animated Tab Switcher with Sliding Pill Indicator */}
          <div className="relative inline-flex p-1.5 rounded-full bg-black/[0.04] dark:bg-white/[0.06] border border-black/[0.06] dark:border-white/10 backdrop-blur-xl mb-8 overflow-x-auto no-scrollbar shadow-xs">
            <div className="flex items-center gap-1 relative z-10">
              {views.map((v, idx) => {
                const isActive = activeView === idx;
                return (
                  <button
                    key={v.id}
                    onClick={() => handleTabChange(idx)}
                    className={`relative px-4 sm:px-6 py-2.5 rounded-full text-xs sm:text-sm font-semibold tracking-wide whitespace-nowrap transition-all duration-300 flex items-center gap-2 ${
                      isActive
                        ? "text-white dark:text-dark-950 shadow-md scale-100"
                        : "text-apple-text/70 dark:text-apple-gray hover:text-apple-text dark:hover:text-white"
                    }`}
                  >
                    {isActive && (
                      <span className="absolute inset-0 rounded-full bg-[#0071e3] dark:bg-white -z-10 shadow-md animate-scale-in" />
                    )}
                    <Camera className="w-3.5 h-3.5" />
                    <span>{v.title}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Large Interactive Viewport with cross-fade animation */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Main Visual Frame */}
            <div
              className={`lg:col-span-8 relative aspect-[16/10] sm:aspect-[16/9] rounded-2xl overflow-hidden bg-black/10 dark:bg-black/50 border border-black/[0.06] dark:border-white/10 group shadow-md transition-all duration-500 ${
                isTransitioning
                  ? "opacity-0 scale-[0.98] blur-xs"
                  : "opacity-100 scale-100 blur-0"
              }`}
            >
              <img
                key={currentView.image}
                src={currentView.image}
                alt={currentView.title}
                className="w-full h-full object-cover object-center animate-fade-in transition-transform duration-1000 ease-out group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

              {/* Tag pill */}
              <div className="absolute top-4 left-4 z-10 px-3 py-1 rounded-full bg-black/70 border border-white/20 backdrop-blur-md text-[11px] font-mono uppercase tracking-widest text-white font-semibold shadow-sm">
                {currentView.tag}
              </div>

              {/* Bottom Caption Overlay */}
              <div className="absolute bottom-4 sm:bottom-6 left-4 sm:left-6 right-4 sm:right-6 z-10">
                <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                  {currentView.title}
                </h3>
                <p className="text-xs sm:text-sm text-apple-lightgray font-normal mt-0.5">
                  {currentView.subtitle}
                </p>
              </div>
            </div>

            {/* Right Information & Services Column */}
            <div
              className={`lg:col-span-4 space-y-6 transition-all duration-500 ${
                isTransitioning
                  ? "opacity-0 translate-y-2"
                  : "opacity-100 translate-y-0"
              }`}
            >
              <div className="space-y-3">
                <span className="text-xs font-mono uppercase tracking-widest text-[#0071e3] dark:text-brand-gold font-semibold">
                  STORE ARCHITECTURE & CARE
                </span>
                <h4 className="text-2xl font-bold text-apple-text dark:text-white tracking-tight">
                  {currentView.title}
                </h4>
                <p className="text-sm text-apple-gray font-normal leading-relaxed">
                  {currentView.description}
                </p>
              </div>

              {/* Real In-Store Highlights */}
              <div className="space-y-2.5 pt-2 border-t border-black/[0.06] dark:border-white/[0.08]">
                <div className="flex items-center gap-2.5 text-xs text-apple-text/80 dark:text-apple-lightgray">
                  <CheckCircle2 className="w-4 h-4 text-[#0071e3] dark:text-brand-gold flex-shrink-0" />
                  <span>Hands-on Live Product Demo Tables</span>
                </div>
                <div className="flex items-center gap-2.5 text-xs text-apple-text/80 dark:text-apple-lightgray">
                  <CheckCircle2 className="w-4 h-4 text-[#0071e3] dark:text-brand-gold flex-shrink-0" />
                  <span>Certified Express Repair Counter (45-Min)</span>
                </div>
                <div className="flex items-center gap-2.5 text-xs text-apple-text/80 dark:text-apple-lightgray">
                  <CheckCircle2 className="w-4 h-4 text-[#0071e3] dark:text-brand-gold flex-shrink-0" />
                  <span>Laser-Cut 3M Device Skins & Screen Armor</span>
                </div>
                <div className="flex items-center gap-2.5 text-xs text-apple-text/80 dark:text-apple-lightgray">
                  <CheckCircle2 className="w-4 h-4 text-[#0071e3] dark:text-brand-gold flex-shrink-0" />
                  <span>Official Warranty & Instant Billing</span>
                </div>
              </div>

              {/* View Switcher Thumbnails */}
              <div className="grid grid-cols-4 gap-2 pt-2">
                {views.map((v, idx) => (
                  <button
                    key={v.id}
                    onClick={() => handleTabChange(idx)}
                    className={`aspect-square rounded-xl overflow-hidden border transition-all ${
                      activeView === idx
                        ? "border-[#0071e3] dark:border-brand-gold ring-2 ring-[#0071e3]/30 scale-105 shadow-sm"
                        : "border-black/10 dark:border-white/15 opacity-60 hover:opacity-100"
                    }`}
                  >
                    <img src={v.image} alt={v.title} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Store Contact & Action Cards Banner */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1: Address */}
          <div className="p-6 sm:p-8 rounded-3xl apple-card dark:glass-card border border-black/[0.06] dark:border-white/[0.08] space-y-4 shadow-sm">
            <div className="w-12 h-12 rounded-2xl bg-blue-50 dark:bg-brand-gold/10 border border-blue-200 dark:border-brand-gold/20 flex items-center justify-center text-[#0071e3] dark:text-brand-gold">
              <MapPin className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[11px] font-mono text-apple-gray uppercase tracking-wider block">
                LOCATION
              </span>
              <h4 className="text-lg font-bold text-apple-text dark:text-white tracking-tight mt-0.5">
                {STORE_CONFIG.address}
              </h4>
              <p className="text-xs text-apple-gray mt-1">
                {STORE_CONFIG.landmark}
              </p>
            </div>
            <a
              href={STORE_CONFIG.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => soundFx.playClick()}
              className="inline-flex items-center gap-2 text-xs font-semibold text-[#0071e3] hover:underline transition-colors"
            >
              <span>Get Directions</span>
              <Navigation className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Card 2: Hours */}
          <div className="p-6 sm:p-8 rounded-3xl apple-card dark:glass-card border border-black/[0.06] dark:border-white/[0.08] space-y-4 shadow-sm">
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 dark:bg-brand-neon/10 border border-emerald-200 dark:border-brand-neon/20 flex items-center justify-center text-emerald-600 dark:text-brand-neon">
              <Clock className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[11px] font-mono text-apple-gray uppercase tracking-wider block">
                OPENING HOURS
              </span>
              <h4 className="text-lg font-bold text-apple-text dark:text-white tracking-tight mt-0.5">
                10:00 AM – 09:30 PM
              </h4>
              <p className="text-xs text-apple-gray mt-1">
                Open All 7 Days • Including Weekends & Holidays
              </p>
            </div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs font-mono font-medium">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Currently Open For Visitors</span>
            </div>
          </div>

          {/* Card 3: Connect & Direct Actions */}
          <div className="p-6 sm:p-8 rounded-3xl apple-card dark:glass-card border border-black/[0.06] dark:border-white/[0.08] space-y-4 shadow-sm">
            <div className="w-12 h-12 rounded-2xl bg-[#25D366]/10 border border-[#25D366]/20 flex items-center justify-center text-[#128C7E] dark:text-[#25D366]">
              <MessageCircle className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[11px] font-mono text-apple-gray uppercase tracking-wider block">
                DIRECT INQUIRY
              </span>
              <h4 className="text-lg font-bold text-apple-text dark:text-white tracking-tight mt-0.5">
                {STORE_CONFIG.phonePrimary}
              </h4>
              <p className="text-xs text-apple-gray mt-1">
                Alternate: {STORE_CONFIG.phoneSecondary}
              </p>
            </div>
            <div className="flex items-center gap-2 pt-1">
              <a
                href={STORE_CONFIG.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => soundFx.playClick()}
                className="flex-1 py-2.5 rounded-xl bg-[#25D366] text-black font-semibold text-xs flex items-center justify-center gap-1.5 shadow-sm"
              >
                <MessageCircle className="w-3.5 h-3.5 fill-black" />
                <span>WhatsApp Us</span>
              </a>
              <a
                href={`tel:${STORE_CONFIG.phonePrimary}`}
                className="px-4 py-2.5 rounded-xl bg-black/5 dark:bg-white/10 hover:bg-black/10 text-apple-text dark:text-white font-semibold text-xs flex items-center justify-center gap-1.5"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>Call</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
