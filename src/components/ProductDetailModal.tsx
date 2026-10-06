import React, { useState } from "react";
import type { Product } from "../data/storeData";
import { formatPrice, getWhatsAppOrderUrl, soundFx } from "../lib/utils";
import confetti from "canvas-confetti";
import {
  X,
  Sparkles,
  ShoppingBag,
  MessageCircle,
  ShieldCheck,
  Check,
  Truck,
  Star,
  Package,
  Cpu,
} from "lucide-react";

interface ProductDetailModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product) => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  onClose,
  onAddToCart,
}) => {
  if (!product) return null;

  const [selectedColor, setSelectedColor] = useState<number>(0);
  const [activeDetailTab, setActiveDetailTab] = useState<"features" | "specs" | "box">("features");
  const [addedAnimation, setAddedAnimation] = useState(false);
  const [isTabChanging, setIsTabChanging] = useState(false);

  const colors = product.colors || [
    { name: "Space Black", hex: "#1f2022" },
    { name: "Titanium Silver", hex: "#a8a8a4" },
  ];

  const handleTabChange = (tab: "features" | "specs" | "box") => {
    if (tab === activeDetailTab) return;
    soundFx.playClick();
    setIsTabChanging(true);
    setTimeout(() => {
      setActiveDetailTab(tab);
      setIsTabChanging(false);
    }, 120);
  };

  const handleAdd = () => {
    soundFx.playChime();
    setAddedAnimation(true);
    onAddToCart(product);

    try {
      confetti({
        particleCount: 40,
        spread: 50,
        origin: { y: 0.8 },
        colors: ["#0071e3", "#f5a623", "#ffffff"],
      });
    } catch {
      // Confetti fallback
    }

    setTimeout(() => setAddedAnimation(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-[110] bg-black/60 dark:bg-black/80 backdrop-blur-xl flex items-center justify-center p-4 sm:p-6 overflow-y-auto animate-fade-in select-none">
      <div
        className="relative w-full max-w-5xl rounded-3xl apple-card dark:glass-card border border-black/[0.08] dark:border-white/15 overflow-hidden my-auto max-h-[90vh] flex flex-col shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header Close Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-black/[0.06] dark:border-white/[0.08] bg-white/90 dark:bg-[#07070a]/90 backdrop-blur-md sticky top-0 z-30">
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono uppercase tracking-widest text-[#0071e3] dark:text-brand-gold font-bold">
              {product.categoryLabel}
            </span>
            <span className="text-apple-gray">•</span>
            <span className="text-xs text-apple-gray font-mono">{product.availability}</span>
          </div>

          <button
            onClick={() => {
              soundFx.playClick();
              onClose();
            }}
            className="w-8 h-8 rounded-full apple-pill flex items-center justify-center text-apple-text/70 dark:text-apple-gray hover:text-apple-text dark:hover:text-white transition-all"
            aria-label="Close modal"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="overflow-y-auto p-6 sm:p-10 space-y-8">
          {/* Main Visual & Buying Box Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left: Product Large Visual with 3D Depth Movement */}
            <div
              className="lg:col-span-6 rounded-2xl bg-gradient-to-b from-black/[0.02] to-black/[0.06] dark:bg-black/50 border border-black/[0.06] dark:border-white/[0.06] p-6 sm:p-10 flex flex-col items-center justify-center relative aspect-square shadow-inner overflow-hidden group cursor-grab active:cursor-grabbing"
              onMouseMove={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                const x = (e.clientX - rect.left - rect.width / 2) / (rect.width / 2);
                const y = (e.clientY - rect.top - rect.height / 2) / (rect.height / 2);
                const img = e.currentTarget.querySelector("img");
                if (img) {
                  img.style.transform = `perspective(800px) rotateY(${x * 16}deg) rotateX(${-y * 16}deg) scale(1.05)`;
                }
              }}
              onMouseLeave={(e) => {
                const img = e.currentTarget.querySelector("img");
                if (img) {
                  img.style.transform = `perspective(800px) rotateY(0deg) rotateX(0deg) scale(1)`;
                }
              }}
            >
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-contain filter drop-shadow-[0_20px_40px_rgba(0,0,0,0.15)] dark:drop-shadow-[0_20px_40px_rgba(0,0,0,0.8)] max-h-[380px] transition-transform duration-200 ease-out animate-float pointer-events-none"
              />

              {product.badge && (
                <span className="absolute top-4 left-4 px-3 py-1 rounded-full bg-white/90 dark:bg-white/10 backdrop-blur-md border border-black/10 dark:border-white/15 text-xs text-apple-text dark:text-white font-medium shadow-xs">
                  {product.badge}
                </span>
              )}

              <span className="absolute bottom-3 text-[10px] font-mono text-apple-gray opacity-70">
                Move cursor to inspect 3D perspective
              </span>
            </div>

            {/* Right: Product Details & Buying Actions */}
            <div className="lg:col-span-6 space-y-6">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <div className="flex items-center gap-1 text-amber-500 text-xs">
                    <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                    <span className="font-bold">{product.rating}</span>
                  </div>
                  <span className="text-xs text-apple-gray">
                    ({product.reviewCount} Verified Reviews)
                  </span>
                </div>

                <h2 className="text-3xl sm:text-4xl font-black text-apple-text dark:text-white tracking-tight">
                  {product.name}
                </h2>
                <p className="text-base text-[#0071e3] dark:text-brand-gold font-medium mt-1">
                  “{product.tagline}”
                </p>
              </div>

              {/* Price Tag */}
              <div className="flex items-baseline gap-3">
                <span className="text-3xl font-extrabold text-apple-text dark:text-white">
                  {formatPrice(product.price)}
                </span>
                {product.originalPrice && (
                  <span className="text-lg text-apple-gray line-through font-mono">
                    {formatPrice(product.originalPrice)}
                  </span>
                )}
                <span className="text-xs font-mono text-emerald-600 dark:text-emerald-400 font-medium">
                  (Includes All Taxes & Store Warranty)
                </span>
              </div>

              <p className="text-sm text-apple-text/80 dark:text-apple-gray leading-relaxed font-normal">
                {product.description}
              </p>

              {/* Color Finishes */}
              {colors.length > 0 && (
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-apple-gray font-mono">FINISH:</span>
                    <span className="text-apple-text dark:text-white font-medium">{colors[selectedColor]?.name}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    {colors.map((c, idx) => (
                      <button
                        key={c.name}
                        onClick={() => {
                          soundFx.playClick();
                          setSelectedColor(idx);
                        }}
                        className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${
                          selectedColor === idx
                            ? "ring-2 ring-[#0071e3] dark:ring-brand-gold scale-110 shadow-md"
                            : "opacity-80 hover:opacity-100"
                        }`}
                        style={{ backgroundColor: c.hex }}
                        title={c.name}
                      >
                        {selectedColor === idx && (
                          <Check className="w-3.5 h-3.5 text-white stroke-[3]" />
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Primary Actions */}
              <div className="space-y-3 pt-2">
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={handleAdd}
                    className={`py-3.5 rounded-xl font-bold text-xs sm:text-sm tracking-tight transition-all flex items-center justify-center gap-2 shadow-md ${
                      addedAnimation
                        ? "bg-emerald-500 text-white"
                        : "bg-[#0071e3] hover:bg-[#0077ed] text-white"
                    }`}
                  >
                    <ShoppingBag className="w-4 h-4" />
                    <span>{addedAnimation ? "Added to Bag!" : "Add to Bag"}</span>
                  </button>

                  <a
                    href={getWhatsAppOrderUrl(product.name, product.price)}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => soundFx.playClick()}
                    className="py-3.5 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-black font-bold text-xs sm:text-sm tracking-tight flex items-center justify-center gap-2 shadow-md"
                  >
                    <MessageCircle className="w-4 h-4 fill-black" />
                    <span>Order on WhatsApp</span>
                  </a>
                </div>

                {/* Instant Store Pickup Notice */}
                <div className="p-3 rounded-xl bg-black/[0.03] dark:bg-white/[0.04] border border-black/[0.06] dark:border-white/[0.08] flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2 text-apple-gray">
                    <Truck className="w-4 h-4 text-[#0071e3] dark:text-brand-gold" />
                    <span>In-Store Pickup Available Today at Madhupur</span>
                  </div>
                  <span className="font-mono text-emerald-600 dark:text-emerald-400 font-bold">READY IN 15 MIN</span>
                </div>
              </div>
            </div>
          </div>

          {/* Interactive Detail Tabs with Sliding Indicator */}
          <div className="pt-6 border-t border-black/[0.06] dark:border-white/[0.08]">
            <div className="flex items-center gap-2 border-b border-black/[0.06] dark:border-white/[0.08] pb-3 mb-6">
              {[
                { id: "features", label: "Why You’ll Love It", icon: Sparkles },
                { id: "specs", label: "Technical Specifications", icon: Cpu },
                { id: "box", label: "In The Box & Warranty", icon: Package },
              ].map((tab) => {
                const Icon = tab.icon;
                const isActive = activeDetailTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => handleTabChange(tab.id as "features" | "specs" | "box")}
                    className={`relative px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center gap-2 ${
                      isActive
                        ? "text-[#0071e3] dark:text-white bg-blue-50/80 dark:bg-white/10 shadow-xs"
                        : "text-apple-gray hover:text-apple-text dark:hover:text-white"
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Tab Body Content with Animation */}
            <div
              className={`transition-all duration-300 ${
                isTabChanging ? "opacity-0 translate-y-1 blur-xs" : "opacity-100 translate-y-0 blur-0"
              }`}
            >
              {activeDetailTab === "features" && product.features && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {product.features.map((feat, fIdx) => (
                    <div key={fIdx} className="p-4 rounded-2xl bg-black/[0.02] dark:bg-white/[0.03] border border-black/[0.05] dark:border-white/[0.06] space-y-1">
                      <h4 className="text-sm font-bold text-apple-text dark:text-white">{feat.title}</h4>
                      <p className="text-xs text-apple-gray font-normal leading-relaxed">{feat.desc}</p>
                    </div>
                  ))}
                </div>
              )}

              {activeDetailTab === "specs" && product.specs && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {product.specs.map((spec, sIdx) => (
                    <div
                      key={sIdx}
                      className="p-3.5 rounded-xl bg-black/[0.02] dark:bg-black/40 border border-black/[0.05] dark:border-white/[0.05] flex items-center justify-between"
                    >
                      <span className="text-xs font-mono text-apple-gray uppercase">
                        {spec.label}
                      </span>
                      <span className="text-xs font-semibold text-apple-text dark:text-white/90 text-right">
                        {spec.value}
                      </span>
                    </div>
                  ))}
                </div>
              )}

              {activeDetailTab === "box" && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-apple-text dark:text-white font-bold text-sm">
                      <Package className="w-4 h-4 text-[#0071e3] dark:text-brand-gold" />
                      <span>What’s in the Box</span>
                    </div>
                    <ul className="space-y-1 text-xs text-apple-gray">
                      {product.inTheBox?.map((item, iIdx) => (
                        <li key={iIdx} className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#0071e3] dark:bg-brand-gold" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-apple-text dark:text-white font-bold text-sm">
                      <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                      <span>Warranty & Care</span>
                    </div>
                    <p className="text-xs text-apple-gray font-normal leading-relaxed">
                      {product.warranty}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
