import React, { useEffect, useRef, useState } from "react";
import { STORE_CONFIG } from "../data/storeData";
import { soundFx } from "../lib/utils";
import {
  ArrowDown,
  MapPin,
  Box,
  Compass,
  ChevronRight,
  ShieldCheck,
  CheckCircle2,
  Camera,
} from "lucide-react";

interface HeroSectionProps {
  onExploreClick: () => void;
  onVisitStoreClick: () => void;
  on3DClick: () => void;
  onReplayIntro: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onExploreClick,
  onVisitStoreClick,
  on3DClick,
  onReplayIntro,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const visualRef = useRef<HTMLDivElement>(null);
  const [activeBannerSlide, setActiveBannerSlide] = useState<number>(0);

  const bannerSlides = [
    {
      id: "exterior",
      tag: "Flagship Storefront",
      title: "Shanu’s Gadgets — Mobile Phones & Accessories",
      subtitle: "Madhupur, Kamalasagar, Sepahijala, Tripura • Ph: +91 70058 38381",
      image: STORE_CONFIG.images.banner,
      badge: "Real Night Entrance",
    },
    {
      id: "interior",
      tag: "Showroom & Counter",
      title: "Luxury Interior, Geometric Lighting & Displays",
      subtitle: "Hands-on Smartphones, Audio Bays & 45-Min Express Repairs",
      image: STORE_CONFIG.images.interiorReal,
      badge: "Real Showroom",
    },
  ];

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!visualRef.current) return;
      if (window.innerWidth < 768) return; // Only 3D tilt on tablet/desktop
      const { innerWidth, innerHeight } = window;
      const x = (e.clientX / innerWidth - 0.5) * 16;
      const y = (e.clientY / innerHeight - 0.5) * 16;

      visualRef.current.style.transform = `perspective(1000px) rotateY(${x}deg) rotateX(${-y}deg) translateZ(0)`;
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const currentSlide = bannerSlides[activeBannerSlide];

  return (
    <section
      id="hero"
      ref={containerRef}
      className="relative min-h-screen flex flex-col justify-between pt-20 sm:pt-28 pb-12 sm:pb-16 px-3 sm:px-6 lg:px-8 overflow-hidden bg-white dark:bg-[#030304] transition-colors duration-300"
    >
      {/* Background Lighting Gradients */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[340px] sm:w-[700px] h-[300px] sm:h-[500px] bg-gradient-to-tr from-blue-100/60 via-amber-50/40 to-transparent dark:from-brand-gold/10 dark:via-blue-500/5 dark:to-transparent rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/3 right-1/4 w-[250px] sm:w-[400px] h-[250px] sm:h-[400px] bg-blue-50/60 dark:bg-sky-500/5 rounded-full blur-3xl pointer-events-none" />

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto w-full flex-1 flex flex-col justify-center items-center text-center relative z-10">
        {/* Status Pill Badge */}
        <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 rounded-full apple-pill text-[11px] sm:text-xs text-apple-text/80 dark:text-apple-gray mb-6 sm:mb-8 animate-fade-in shadow-xs max-w-full truncate">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse flex-shrink-0" />
          <span className="font-semibold text-apple-text dark:text-white truncate">Open Today in Madhupur, Kamalasagar</span>
          <span className="text-apple-gray hidden xs:inline">•</span>
          <span className="font-mono text-[10px] sm:text-[11px] text-[#0071e3] dark:text-brand-gold font-medium hidden xs:inline flex-shrink-0">
            10:00 AM – 9:30 PM
          </span>
        </div>

        {/* Floating Apple-Style Headline */}
        <div className="floating-font px-2">
          <h1 className="text-4xl xs:text-5xl sm:text-7xl md:text-8xl lg:text-[100px] font-extrabold tracking-tight sm:tracking-[-0.04em] leading-[1.05] sm:leading-[0.95] max-w-5xl mb-4 sm:mb-6 select-none">
            <span className="text-gradient-dark block">Technology,</span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0071e3] via-[#438eff] to-[#0071e3] dark:from-white dark:via-apple-lightgray dark:to-apple-gray">
              made personal.
            </span>
          </h1>
        </div>

        {/* Floating Supporting Text */}
        <p className="text-sm sm:text-lg md:text-2xl text-apple-gray font-normal max-w-2xl mx-auto mb-8 sm:mb-10 px-4 leading-relaxed floating-font-delayed">
          {STORE_CONFIG.subTagline}
        </p>

        {/* CTA Buttons - Stack cleanly on mobile */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mb-10 sm:mb-14 w-full sm:w-auto px-4">
          <button
            onClick={() => {
              soundFx.playClick();
              onExploreClick();
            }}
            className="w-full sm:w-auto px-7 py-3.5 rounded-full bg-[#0071e3] hover:bg-[#0077ed] text-white font-semibold text-sm sm:text-base tracking-tight transition-all duration-300 shadow-md hover:shadow-lg hover:scale-105 active:scale-95 flex items-center justify-center gap-2 group"
            data-cursor-text="EXPLORE"
          >
            <span>Explore Gadgets</span>
            <ChevronRight className="w-4 h-4 text-white group-hover:translate-x-1 transition-transform" />
          </button>

          <button
            onClick={() => {
              soundFx.playClick();
              onVisitStoreClick();
            }}
            className="w-full sm:w-auto px-7 py-3.5 rounded-full apple-pill hover:bg-black/5 dark:hover:bg-white/15 text-apple-text dark:text-white font-semibold text-sm sm:text-base tracking-tight transition-all duration-300 flex items-center justify-center gap-2 group shadow-xs"
          >
            <MapPin className="w-4 h-4 text-brand-gold" />
            <span>Visit Our Store</span>
          </button>

          <button
            onClick={() => {
              soundFx.playClick();
              on3DClick();
            }}
            className="w-full sm:w-auto px-5 py-3.5 rounded-full bg-black/[0.03] dark:bg-white/[0.06] hover:bg-black/[0.06] dark:hover:bg-white/[0.12] border border-blue-500/20 text-[#0071e3] dark:text-brand-neon font-mono text-xs sm:text-sm tracking-wide transition-all duration-300 flex items-center justify-center gap-2"
          >
            <Box className="w-4 h-4 text-[#0071e3] dark:text-brand-neon animate-spin-slow" />
            <span>3D Interactive Studio</span>
          </button>
        </div>

        {/* Main Real Storefront Home Screen Banner Visual */}
        <div
          ref={visualRef}
          className="w-full max-w-5xl rounded-2xl sm:rounded-3xl relative p-1 sm:p-4 transition-transform duration-300 ease-out cursor-pointer group"
          data-cursor-text="VISIT"
        >
          {/* Outer Glass Card */}
          <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden apple-card border border-black/[0.08] dark:border-white/10 shadow-xl">
            <div
              className="relative aspect-[4/3] xs:aspect-[16/10] sm:aspect-[21/9] w-full overflow-hidden bg-black"
              onClick={() => {
                soundFx.playClick();
                onVisitStoreClick();
              }}
            >
              <img
                key={currentSlide.image}
                src={currentSlide.image}
                alt={currentSlide.title}
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-1000 ease-out animate-fade-in"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />

              {/* Floating Live Store Card Badge */}
              <div className="absolute bottom-3 sm:bottom-6 left-3 sm:left-8 right-3 sm:right-auto z-10 flex flex-col text-left">
                <div className="flex items-center gap-1.5 sm:gap-2 mb-1">
                  <span className="px-2 sm:px-2.5 py-0.5 rounded-full bg-brand-gold text-dark-950 font-bold text-[10px] sm:text-[11px] font-mono uppercase tracking-wider shadow-sm">
                    {currentSlide.tag}
                  </span>
                  <span className="px-2 sm:px-2.5 py-0.5 rounded-full bg-black/60 backdrop-blur-md text-white text-[10px] sm:text-[11px] font-mono">
                    Madhupur, Kamalasagar
                  </span>
                </div>
                <h3 className="text-base sm:text-2xl font-bold text-white tracking-tight leading-snug">
                  {currentSlide.title}
                </h3>
                <p className="text-[11px] sm:text-xs text-apple-lightgray font-light mt-0.5 truncate">
                  {currentSlide.subtitle}
                </p>
              </div>

              {/* Right Floating Specs badge (Desktop / Tablet) */}
              <div className="absolute top-4 sm:top-6 right-4 sm:right-8 z-10 hidden md:flex items-center gap-3 bg-black/70 backdrop-blur-xl border border-white/20 px-4 py-2 rounded-2xl shadow-lg">
                <ShieldCheck className="w-5 h-5 text-emerald-400" />
                <div className="text-left text-xs">
                  <div className="font-semibold text-white">Genuine Devices & Repairs</div>
                  <div className="text-[11px] text-apple-lightgray">Official Brand Warranty</div>
                </div>
              </div>
            </div>

            {/* Interactive Banner View Switcher Tabs */}
            <div className="absolute top-2.5 sm:top-4 left-2.5 sm:left-4 z-20 flex items-center gap-1 sm:gap-1.5 p-1 rounded-full bg-black/70 backdrop-blur-md border border-white/20">
              {bannerSlides.map((slide, idx) => {
                const isActive = activeBannerSlide === idx;
                return (
                  <button
                    key={slide.id}
                    onClick={(e) => {
                      e.stopPropagation();
                      soundFx.playClick();
                      setActiveBannerSlide(idx);
                    }}
                    className={`px-2.5 sm:px-3 py-1 rounded-full text-[10px] sm:text-[11px] font-mono tracking-wide transition-all flex items-center gap-1 ${
                      isActive
                        ? "bg-white text-dark-950 font-bold shadow-sm"
                        : "text-white/80 hover:text-white"
                    }`}
                  >
                    <Camera className="w-3 h-3" />
                    <span>{slide.badge}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Ticker & Scroll Cue */}
      <div className="max-w-7xl mx-auto w-full pt-8 sm:pt-10 flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4 text-xs text-apple-gray relative z-10 border-t border-black/[0.06] dark:border-white/[0.06]">
        <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-6 text-[11px] sm:text-xs">
          <span className="flex items-center gap-1.5 text-apple-text/80 dark:text-white/90 font-medium">
            <CheckCircle2 className="w-3.5 h-3.5 text-[#0071e3] dark:text-brand-gold flex-shrink-0" />
            Flagship Smartphones
          </span>
          <span className="flex items-center gap-1.5 text-apple-text/80 dark:text-white/90 font-medium">
            <CheckCircle2 className="w-3.5 h-3.5 text-[#0071e3] dark:text-brand-gold flex-shrink-0" />
            Studio Acoustics
          </span>
          <span className="flex items-center gap-1.5 text-apple-text/80 dark:text-white/90 font-medium">
            <CheckCircle2 className="w-3.5 h-3.5 text-[#0071e3] dark:text-brand-gold flex-shrink-0" />
            45-Min Express Repair
          </span>
        </div>

        <div className="flex items-center gap-4">
          <button
            onClick={() => {
              soundFx.playClick();
              onReplayIntro();
            }}
            className="flex items-center gap-1.5 hover:text-[#0071e3] dark:hover:text-white transition-colors text-apple-gray font-mono text-[10px] sm:text-[11px]"
          >
            <Compass className="w-3.5 h-3.5 text-brand-gold" />
            <span>Replay Intro Tour</span>
          </button>

          <button
            onClick={() => {
              soundFx.playClick();
              onExploreClick();
            }}
            className="flex items-center gap-1 hover:text-[#0071e3] dark:hover:text-white transition-colors font-mono text-[10px] sm:text-[11px]"
          >
            <span>Scroll to Discover</span>
            <ArrowDown className="w-3 h-3 animate-bounce text-[#0071e3]" />
          </button>
        </div>
      </div>
    </section>
  );
};
