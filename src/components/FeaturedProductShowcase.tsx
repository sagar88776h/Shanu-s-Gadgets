import React, { useState } from "react";
import type { Product } from "../data/storeData";
import { HERO_PRODUCTS } from "../data/storeData";
import { formatPrice, getWhatsAppOrderUrl, soundFx } from "../lib/utils";
import {
  ChevronRight,
  Sparkles,
  ShoppingBag,
  MessageCircle,
  Check,
  Maximize2,
} from "lucide-react";

interface FeaturedProductShowcaseProps {
  onSelectProduct: (product: Product) => void;
  onAddToCart: (product: Product) => void;
  onOpen3D: (product: Product) => void;
}

export const FeaturedProductShowcase: React.FC<FeaturedProductShowcaseProps> = ({
  onSelectProduct,
  onAddToCart,
  onOpen3D,
}) => {
  const [activeTab, setActiveTab] = useState<number>(0);
  const [selectedColorIdx, setSelectedColorIdx] = useState<{ [key: string]: number }>({});
  const [activeHotspot, setActiveHotspot] = useState<string | null>(null);
  const [isTransitioning, setIsTransitioning] = useState<boolean>(false);

  const handleTabChange = (idx: number) => {
    if (idx === activeTab) return;
    soundFx.playClick();
    setIsTransitioning(true);
    setTimeout(() => {
      setActiveTab(idx);
      setIsTransitioning(false);
    }, 180);
  };

  const handleColorChange = (productId: string, idx: number) => {
    soundFx.playClick();
    setSelectedColorIdx((prev) => ({ ...prev, [productId]: idx }));
  };

  const activeProduct = HERO_PRODUCTS[activeTab] || HERO_PRODUCTS[0];
  const currentColorIdx = selectedColorIdx[activeProduct.id] || 0;
  const currentColor = activeProduct.colors ? activeProduct.colors[currentColorIdx] : null;

  return (
    <section
      id="featured-gadgets"
      className="py-24 md:py-36 bg-[#fbfbfd] dark:bg-[#030304] relative overflow-hidden transition-colors duration-300"
    >
      {/* Background Ambient Spheres */}
      <div className="absolute top-1/3 left-10 w-96 h-96 bg-blue-100/40 dark:bg-brand-gold/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-10 w-96 h-96 bg-amber-100/40 dark:bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 md:mb-20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full apple-pill text-xs font-mono uppercase tracking-widest text-[#0071e3] dark:text-brand-gold mb-4 shadow-xs">
            <Sparkles className="w-3.5 h-3.5" />
            Curated Hero Lineup
          </div>
          <div className="floating-font">
            <h2 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-gradient-dark mb-6">
              Meet your next favorite gadget.
            </h2>
          </div>
          <p className="text-apple-gray text-base sm:text-xl font-normal leading-relaxed floating-font-delayed">
            Handpicked flagship devices with unprecedented performance, tactile engineering, and official brand warranty.
          </p>

          {/* Animated Tab Switcher with Sliding Pill Indicator */}
          <div className="relative inline-flex p-1.5 rounded-full bg-black/[0.05] dark:bg-white/[0.06] border border-black/[0.06] dark:border-white/10 backdrop-blur-xl mt-8 shadow-xs">
            <div className="flex items-center gap-1 relative z-10">
              {HERO_PRODUCTS.map((prod, idx) => {
                const isActive = activeTab === idx;
                return (
                  <button
                    key={prod.id}
                    onClick={() => handleTabChange(idx)}
                    className={`relative px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold tracking-wide transition-all duration-300 ${
                      isActive
                        ? "text-white dark:text-dark-950 shadow-md scale-100"
                        : "text-apple-text/70 dark:text-apple-gray hover:text-apple-text dark:hover:text-white"
                    }`}
                  >
                    {/* Active Sliding Background Pill */}
                    {isActive && (
                      <span className="absolute inset-0 rounded-full bg-[#0071e3] dark:bg-white -z-10 shadow-md animate-scale-in" />
                    )}
                    <span>{prod.categoryLabel}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Hero Product Stage with Tab Changing Smooth Transition */}
        <div
          className={`relative rounded-3xl p-6 sm:p-10 md:p-16 apple-card dark:glass-card border border-black/[0.06] dark:border-white/[0.09] transition-all duration-500 shadow-lg ${
            isTransitioning
              ? "opacity-0 scale-[0.98] blur-xs translate-y-2"
              : "opacity-100 scale-100 blur-0 translate-y-0"
          }`}
        >
          {/* Category & Badge Header */}
          <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
            <div className="flex items-center gap-3">
              <span className="text-xs font-mono uppercase tracking-[0.25em] text-[#0071e3] dark:text-brand-gold font-semibold">
                {activeProduct.categoryLabel}
              </span>
              {activeProduct.badge && (
                <span className="px-2.5 py-0.5 rounded-full bg-black/5 dark:bg-white/10 text-[11px] font-medium text-apple-text dark:text-white border border-black/10 dark:border-white/15">
                  {activeProduct.badge}
                </span>
              )}
            </div>

            <div className="text-right">
              <span className="text-xs text-apple-gray font-mono block">STARTING AT</span>
              <span className="text-2xl sm:text-3xl font-extrabold text-apple-text dark:text-white">
                {formatPrice(activeProduct.price)}
              </span>
            </div>
          </div>

          {/* Main Story Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            {/* Left Column: Story Headline, Features & Actions */}
            <div className="lg:col-span-6 space-y-6">
              <h3 className="text-3xl sm:text-5xl md:text-6xl font-black tracking-tight text-apple-text dark:text-white leading-tight">
                {activeProduct.name}
              </h3>

              <p className="text-xl sm:text-2xl font-medium text-apple-gray dark:text-apple-lightgray tracking-tight">
                “{activeProduct.tagline}”
              </p>

              <p className="text-sm sm:text-base text-apple-text/80 dark:text-apple-gray leading-relaxed font-normal">
                {activeProduct.description}
              </p>

              {/* Technical Specs Callout Grid */}
              <div className="grid grid-cols-2 gap-3 py-3 border-y border-black/[0.06] dark:border-white/[0.08]">
                {activeProduct.specs.slice(0, 4).map((spec, sIdx) => (
                  <div key={sIdx} className="space-y-0.5">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-apple-gray">
                      {spec.label}
                    </span>
                    <p className="text-xs sm:text-sm font-semibold text-apple-text dark:text-white/90">
                      {spec.value}
                    </p>
                  </div>
                ))}
              </div>

              {/* Color Switcher */}
              {activeProduct.colors && activeProduct.colors.length > 0 && (
                <div className="space-y-2 pt-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-apple-gray font-mono text-[11px]">FINISH:</span>
                    <span className="text-apple-text dark:text-white font-medium">{currentColor?.name}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    {activeProduct.colors.map((c, cIdx) => (
                      <button
                        key={c.name}
                        onClick={() => handleColorChange(activeProduct.id, cIdx)}
                        className={`w-7 h-7 rounded-full transition-all duration-300 relative flex items-center justify-center ${
                          currentColorIdx === cIdx
                            ? "ring-2 ring-[#0071e3] dark:ring-brand-gold scale-110 shadow-md"
                            : "opacity-80 hover:opacity-100"
                        }`}
                        style={{ backgroundColor: c.hex }}
                        title={c.name}
                      >
                        {currentColorIdx === cIdx && (
                          <Check className="w-3.5 h-3.5 text-white stroke-[3]" />
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3.5 pt-4">
                <button
                  onClick={() => {
                    soundFx.playClick();
                    onSelectProduct(activeProduct);
                  }}
                  className="px-6 py-3 rounded-full bg-[#0071e3] hover:bg-[#0077ed] text-white font-semibold text-xs sm:text-sm tracking-tight transition-all duration-300 shadow-md flex items-center gap-1.5"
                  data-cursor-text="DETAILS"
                >
                  <span>View Specifications</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>

                <a
                  href={getWhatsAppOrderUrl(activeProduct.name, activeProduct.price)}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => soundFx.playClick()}
                  className="px-5 py-3 rounded-full bg-[#25D366]/15 hover:bg-[#25D366]/25 border border-[#25D366]/30 text-[#128C7E] dark:text-[#25D366] font-semibold text-xs sm:text-sm tracking-wide transition-all flex items-center gap-2"
                >
                  <MessageCircle className="w-4 h-4 fill-current" />
                  <span>WhatsApp Inquiry</span>
                </a>

                <button
                  onClick={() => {
                    soundFx.playClick();
                    onAddToCart(activeProduct);
                  }}
                  className="p-3 rounded-full apple-pill hover:bg-black/5 dark:hover:bg-white/15 text-apple-text dark:text-white transition-all shadow-xs"
                  title="Add to Cart"
                >
                  <ShoppingBag className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Right Column: Hero Visual with Interactive Hotspots */}
            <div className="lg:col-span-6 relative flex items-center justify-center">
              <div
                className="relative w-full aspect-square max-w-[500px] rounded-3xl overflow-hidden bg-gradient-to-b from-black/[0.02] to-black/[0.05] dark:bg-black/40 border border-black/[0.06] dark:border-white/10 p-6 sm:p-10 flex items-center justify-center group cursor-pointer shadow-inner"
                onClick={() => {
                  soundFx.playClick();
                  onSelectProduct(activeProduct);
                }}
                data-cursor-text="EXPAND"
              >
                {/* Product Image with Smooth Scale and Float */}
                <img
                  key={activeProduct.id}
                  src={activeProduct.image}
                  alt={activeProduct.name}
                  className="w-full h-full object-contain filter drop-shadow-[0_20px_40px_rgba(0,0,0,0.2)] dark:drop-shadow-[0_20px_50px_rgba(0,0,0,0.9)] transform group-hover:scale-105 transition-all duration-700 ease-out animate-fade-in"
                />

                {/* Interactive Hotspot Pins */}
                {activeProduct.hotspots?.map((hotspot, hIdx) => {
                  const isHotspotActive = activeHotspot === `${activeProduct.id}-${hIdx}`;
                  return (
                    <div
                      key={hIdx}
                      className="absolute z-20"
                      style={{ top: `${hotspot.y}%`, left: `${hotspot.x}%` }}
                      onClick={(e) => {
                        e.stopPropagation();
                        soundFx.playClick();
                        setActiveHotspot(isHotspotActive ? null : `${activeProduct.id}-${hIdx}`);
                      }}
                    >
                      <button
                        className="relative w-6 h-6 rounded-full bg-[#0071e3] text-white flex items-center justify-center shadow-md hover:scale-125 transition-transform"
                        title={hotspot.title}
                      >
                        <span className="w-2 h-2 rounded-full bg-[#0071e3] animate-ping absolute" />
                        <span className="text-[10px] font-black">+</span>
                      </button>

                      {/* Hotspot Tooltip */}
                      {isHotspotActive && (
                        <div className="absolute left-1/2 -translate-x-1/2 top-8 w-48 sm:w-56 p-3 rounded-xl bg-white/95 dark:bg-dark-900/95 border border-black/10 dark:border-white/20 backdrop-blur-xl shadow-xl text-left z-30 animate-fade-in">
                          <div className="text-xs font-bold text-apple-text dark:text-white mb-1 flex items-center gap-1.5">
                            <Sparkles className="w-3 h-3 text-[#0071e3] dark:text-brand-gold" />
                            {hotspot.title}
                          </div>
                          <p className="text-[11px] text-apple-gray leading-tight">
                            {hotspot.description}
                          </p>
                        </div>
                      )}
                    </div>
                  );
                })}

                {/* 3D Viewer Badge Overlay */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    soundFx.playClick();
                    onOpen3D(activeProduct);
                  }}
                  className="absolute bottom-4 right-4 px-3 py-1.5 rounded-full bg-white/80 dark:bg-black/70 border border-black/10 dark:border-white/15 text-xs text-apple-text dark:text-white font-mono flex items-center gap-1.5 backdrop-blur-md transition-all shadow-sm hover:scale-105"
                >
                  <Maximize2 className="w-3.5 h-3.5 text-[#0071e3]" />
                  <span>Interactive 360°</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
