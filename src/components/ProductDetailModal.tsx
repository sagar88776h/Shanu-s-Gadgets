import React, { useState, useRef, useEffect } from "react";
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
  RotateCcw,
  Play,
  Pause,
  ZoomIn,
  ZoomOut,
  Hand,
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

  // 3D Inspection State (Full Mobile & Desktop Support)
  const [rotX, setRotX] = useState<number>(0);
  const [rotY, setRotY] = useState<number>(0);
  const [zoom, setZoom] = useState<number>(1);
  const [isAutoSpin, setIsAutoSpin] = useState<boolean>(false);
  const [isInteracting, setIsInteracting] = useState<boolean>(false);
  const [hasInteracted, setHasInteracted] = useState<boolean>(false);
  const [floatOffset, setFloatOffset] = useState<number>(0);

  const dragStartRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const startRotRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const velocityRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const lastPosRef = useRef<{ x: number; y: number; time: number }>({ x: 0, y: 0, time: 0 });

  const colors = product.colors || [
    { name: "Space Black", hex: "#1f2022" },
    { name: "Titanium Silver", hex: "#a8a8a4" },
  ];

  // Floating breathing physics on mobile & desktop
  useEffect(() => {
    let animId: number;
    let start = performance.now();

    const animateFloat = (time: number) => {
      const elapsed = (time - start) / 1000;
      setFloatOffset(Math.sin(elapsed * 2) * 6);
      animId = requestAnimationFrame(animateFloat);
    };

    animId = requestAnimationFrame(animateFloat);
    return () => cancelAnimationFrame(animId);
  }, []);

  // Auto rotation & momentum inertia physics
  useEffect(() => {
    let animId: number;

    const tick = () => {
      if (isAutoSpin && !isInteracting) {
        setRotY((prev) => (prev + 0.6) % 360);
      } else if (!isInteracting && (Math.abs(velocityRef.current.x) > 0.05 || Math.abs(velocityRef.current.y) > 0.05)) {
        setRotY((prev) => (prev + velocityRef.current.x) % 360);
        setRotX((prev) => Math.max(-35, Math.min(35, prev + velocityRef.current.y)));
        velocityRef.current.x *= 0.93;
        velocityRef.current.y *= 0.93;
      }
      animId = requestAnimationFrame(tick);
    };

    animId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(animId);
  }, [isAutoSpin, isInteracting]);

  // Touch Handlers for Mobile Devices
  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length === 1) {
      setIsInteracting(true);
      setIsAutoSpin(false);
      setHasInteracted(true);
      dragStartRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
      startRotRef.current = { x: rotX, y: rotY };
      lastPosRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY, time: performance.now() };
      velocityRef.current = { x: 0, y: 0 };
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isInteracting || e.touches.length !== 1) return;
    const clientX = e.touches[0].clientX;
    const clientY = e.touches[0].clientY;
    const now = performance.now();
    const dt = Math.max(1, now - lastPosRef.current.time);
    const deltaX = clientX - dragStartRef.current.x;
    const deltaY = clientY - dragStartRef.current.y;

    const vx = ((clientX - lastPosRef.current.x) / dt) * 12;
    const vy = -((clientY - lastPosRef.current.y) / dt) * 12;

    velocityRef.current = { x: vx, y: vy };
    lastPosRef.current = { x: clientX, y: clientY, time: now };

    setRotY(startRotRef.current.y + deltaX * 0.7);
    setRotX(Math.max(-35, Math.min(35, startRotRef.current.x - deltaY * 0.5)));
  };

  const handleTouchEnd = () => {
    setIsInteracting(false);
  };

  // Mouse Handlers for Desktop Devices
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsInteracting(true);
    setIsAutoSpin(false);
    setHasInteracted(true);
    dragStartRef.current = { x: e.clientX, y: e.clientY };
    startRotRef.current = { x: rotX, y: rotY };
    lastPosRef.current = { x: e.clientX, y: e.clientY, time: performance.now() };
    velocityRef.current = { x: 0, y: 0 };
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isInteracting) return;
    const now = performance.now();
    const dt = Math.max(1, now - lastPosRef.current.time);
    const deltaX = e.clientX - dragStartRef.current.x;
    const deltaY = e.clientY - dragStartRef.current.y;

    const vx = ((e.clientX - lastPosRef.current.x) / dt) * 14;
    const vy = -((e.clientY - lastPosRef.current.y) / dt) * 14;

    velocityRef.current = { x: vx, y: vy };
    lastPosRef.current = { x: e.clientX, y: e.clientY, time: now };

    setRotY(startRotRef.current.y + deltaX * 0.7);
    setRotX(Math.max(-35, Math.min(35, startRotRef.current.x - deltaY * 0.5)));
  };

  const handleMouseUp = () => {
    setIsInteracting(false);
  };

  const reset3DView = () => {
    soundFx.playClick();
    setRotX(0);
    setRotY(0);
    setZoom(1);
    setIsAutoSpin(false);
    velocityRef.current = { x: 0, y: 0 };
  };

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
    <div className="fixed inset-0 z-[110] bg-black/60 dark:bg-black/80 backdrop-blur-xl flex items-center justify-center p-2 sm:p-6 overflow-y-auto animate-fade-in select-none">
      <div
        className="relative w-full max-w-5xl rounded-2xl sm:rounded-3xl apple-card dark:glass-card border border-black/[0.08] dark:border-white/15 overflow-hidden my-auto max-h-[94vh] flex flex-col shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header Close Bar */}
        <div className="flex items-center justify-between px-4 sm:px-6 py-3.5 sm:py-4 border-b border-black/[0.06] dark:border-white/[0.08] bg-white/90 dark:bg-[#07070a]/90 backdrop-blur-md sticky top-0 z-30">
          <div className="flex items-center gap-2 truncate">
            <span className="text-[11px] sm:text-xs font-mono uppercase tracking-widest text-[#0071e3] dark:text-brand-gold font-bold truncate">
              {product.categoryLabel}
            </span>
            <span className="text-apple-gray hidden xs:inline">•</span>
            <span className="text-[11px] sm:text-xs text-apple-gray font-mono hidden xs:inline">{product.availability}</span>
          </div>

          <button
            onClick={() => {
              soundFx.playClick();
              onClose();
            }}
            className="w-8 h-8 rounded-full apple-pill flex items-center justify-center text-apple-text/70 dark:text-apple-gray hover:text-apple-text dark:hover:text-white transition-all flex-shrink-0"
            aria-label="Close modal"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="overflow-y-auto p-4 sm:p-10 space-y-6 sm:space-y-8 no-scrollbar">
          {/* Main Visual & Buying Box Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-start">
            {/* Left: Interactive 3D Inspection Canvas for Mobile & Desktop */}
            <div className="lg:col-span-6 rounded-2xl bg-gradient-to-b from-black/[0.02] to-black/[0.06] dark:bg-black/50 border border-black/[0.06] dark:border-white/[0.06] p-4 sm:p-8 flex flex-col items-center justify-center relative aspect-square shadow-inner overflow-hidden select-none touch-none">
              {/* Top Controls Overlay on 3D Stage */}
              <div className="absolute top-3 left-3 right-3 z-30 flex items-center justify-between pointer-events-auto">
                <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/60 dark:bg-black/80 backdrop-blur-md border border-white/20 text-[10px] font-mono text-white">
                  <span className="w-2 h-2 rounded-full bg-[#0071e3] animate-pulse" />
                  <span>3D Motion</span>
                </div>

                <div className="flex items-center gap-1">
                  {/* Auto Spin Toggle */}
                  <button
                    onClick={() => {
                      soundFx.playClick();
                      setIsAutoSpin(!isAutoSpin);
                    }}
                    className={`px-2 py-1 rounded-full text-[10px] font-mono flex items-center gap-1 backdrop-blur-md border transition-all ${
                      isAutoSpin
                        ? "bg-[#0071e3] text-white border-[#0071e3]"
                        : "bg-black/60 text-white border-white/20 hover:bg-black/80"
                    }`}
                    title={isAutoSpin ? "Pause Auto Spin" : "Auto Spin 360°"}
                  >
                    {isAutoSpin ? <Pause className="w-2.5 h-2.5" /> : <Play className="w-2.5 h-2.5" />}
                    <span>{isAutoSpin ? "Spinning" : "Spin"}</span>
                  </button>

                  {/* Zoom In */}
                  <button
                    onClick={() => {
                      soundFx.playClick();
                      setZoom((prev) => Math.min(1.4, prev + 0.15));
                    }}
                    className="w-7 h-7 rounded-full bg-black/60 hover:bg-black/80 text-white backdrop-blur-md border border-white/20 flex items-center justify-center transition-all"
                    title="Zoom In"
                  >
                    <ZoomIn className="w-3 h-3" />
                  </button>

                  {/* Zoom Out */}
                  <button
                    onClick={() => {
                      soundFx.playClick();
                      setZoom((prev) => Math.max(0.75, prev - 0.15));
                    }}
                    className="w-7 h-7 rounded-full bg-black/60 hover:bg-black/80 text-white backdrop-blur-md border border-white/20 flex items-center justify-center transition-all"
                    title="Zoom Out"
                  >
                    <ZoomOut className="w-3 h-3" />
                  </button>

                  {/* Reset */}
                  <button
                    onClick={reset3DView}
                    className="w-7 h-7 rounded-full bg-black/60 hover:bg-black/80 text-white backdrop-blur-md border border-white/20 flex items-center justify-center transition-all"
                    title="Reset 3D View"
                  >
                    <RotateCcw className="w-3 h-3" />
                  </button>
                </div>
              </div>

              {/* 3D Interactive Touch/Mouse Viewport */}
              <div
                className="relative w-full h-full flex items-center justify-center cursor-grab active:cursor-grabbing touch-none select-none"
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
              >
                {/* 3D Moving Product Asset with Floating Physics */}
                <div
                  className="relative transition-transform duration-75 ease-out flex items-center justify-center"
                  style={{
                    transform: `scale(${zoom}) translateY(${floatOffset}px) rotateY(${rotY}deg) rotateX(${rotX}deg)`,
                    transformStyle: "preserve-3d",
                  }}
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-contain filter drop-shadow-[0_20px_40px_rgba(0,0,0,0.2)] dark:drop-shadow-[0_20px_50px_rgba(0,0,0,0.9)] max-h-[260px] sm:max-h-[340px] pointer-events-none select-none"
                    draggable={false}
                  />

                  {/* Dynamic Floor Reflection */}
                  <div
                    className="absolute -bottom-6 w-[85%] h-5 bg-gradient-to-t from-transparent via-black/15 dark:via-white/10 to-transparent blur-md rounded-full pointer-events-none"
                    style={{
                      transform: `rotateX(90deg) scale(${1 - Math.abs(floatOffset) * 0.03})`,
                      opacity: 0.5 + Math.cos((rotY * Math.PI) / 180) * 0.25,
                    }}
                  />
                </div>
              </div>

              {/* Touch & Drag Hint Badge on Mobile */}
              <div
                className={`absolute bottom-3 z-20 flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/60 dark:bg-black/80 backdrop-blur-md border border-white/20 text-[10px] font-mono text-white transition-opacity duration-500 pointer-events-none ${
                  hasInteracted ? "opacity-30 hover:opacity-100" : "opacity-90 animate-bounce"
                }`}
              >
                <Hand className="w-3 h-3 text-[#0071e3]" />
                <span>Swipe or drag to rotate 3D</span>
              </div>

              {/* Product Category Badge */}
              {product.badge && (
                <span className="absolute top-12 left-3 px-2.5 py-0.5 rounded-full bg-brand-gold/20 text-brand-gold border border-brand-gold/30 text-[10px] font-mono font-bold shadow-xs z-20">
                  {product.badge}
                </span>
              )}
            </div>

            {/* Right: Product Details & Buying Actions */}
            <div className="lg:col-span-6 space-y-4 sm:space-y-6">
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

                <h2 className="text-2xl sm:text-4xl font-black text-apple-text dark:text-white tracking-tight">
                  {product.name}
                </h2>
                <p className="text-sm sm:text-base text-[#0071e3] dark:text-brand-gold font-medium mt-1">
                  “{product.tagline}”
                </p>
              </div>

              {/* Price Tag */}
              <div className="flex items-baseline gap-2.5 sm:gap-3 flex-wrap">
                <span className="text-2xl sm:text-3xl font-extrabold text-apple-text dark:text-white">
                  {formatPrice(product.price)}
                </span>
                {product.originalPrice && (
                  <span className="text-sm sm:text-lg text-apple-gray line-through font-mono">
                    {formatPrice(product.originalPrice)}
                  </span>
                )}
                <span className="text-[11px] sm:text-xs font-mono text-emerald-600 dark:text-emerald-400 font-medium">
                  (Includes Official Store Warranty)
                </span>
              </div>

              <p className="text-xs sm:text-sm text-apple-text/80 dark:text-apple-gray leading-relaxed font-normal">
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
                <div className="grid grid-cols-2 gap-2.5 sm:gap-3">
                  <button
                    onClick={handleAdd}
                    className={`py-3 sm:py-3.5 rounded-xl font-bold text-xs sm:text-sm tracking-tight transition-all flex items-center justify-center gap-2 shadow-md ${
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
                    className="py-3 sm:py-3.5 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-black font-bold text-xs sm:text-sm tracking-tight flex items-center justify-center gap-2 shadow-md"
                  >
                    <MessageCircle className="w-4 h-4 fill-black" />
                    <span>WhatsApp</span>
                  </a>
                </div>

                {/* Instant Store Pickup Notice */}
                <div className="p-2.5 sm:p-3 rounded-xl bg-black/[0.03] dark:bg-white/[0.04] border border-black/[0.06] dark:border-white/[0.08] flex items-center justify-between text-[11px] sm:text-xs">
                  <div className="flex items-center gap-2 text-apple-gray truncate mr-2">
                    <Truck className="w-4 h-4 text-[#0071e3] dark:text-brand-gold flex-shrink-0" />
                    <span className="truncate">In-Store Pickup Available Today at Madhupur</span>
                  </div>
                  <span className="font-mono text-emerald-600 dark:text-emerald-400 font-bold flex-shrink-0">READY IN 15 MIN</span>
                </div>
              </div>
            </div>
          </div>

          {/* Interactive Detail Tabs with Sliding Indicator */}
          <div className="pt-4 sm:pt-6 border-t border-black/[0.06] dark:border-white/[0.08]">
            <div className="flex items-center gap-1.5 sm:gap-2 border-b border-black/[0.06] dark:border-white/[0.08] pb-3 mb-4 sm:mb-6 overflow-x-auto no-scrollbar">
              {[
                { id: "features", label: "Highlights", icon: Sparkles },
                { id: "specs", label: "Specifications", icon: Cpu },
                { id: "box", label: "In The Box", icon: Package },
              ].map((tab) => {
                const Icon = tab.icon;
                const isActive = activeDetailTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => handleTabChange(tab.id as "features" | "specs" | "box")}
                    className={`relative px-3 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center gap-1.5 sm:gap-2 whitespace-nowrap ${
                      isActive
                        ? "text-[#0071e3] dark:text-white bg-blue-50/80 dark:bg-white/10 shadow-xs"
                        : "text-apple-gray hover:text-apple-text dark:hover:text-white"
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5" />
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
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
                  {product.features.map((feat, fIdx) => (
                    <div key={fIdx} className="p-3.5 sm:p-4 rounded-2xl bg-black/[0.02] dark:bg-white/[0.03] border border-black/[0.05] dark:border-white/[0.06] space-y-1">
                      <h4 className="text-xs sm:text-sm font-bold text-apple-text dark:text-white">{feat.title}</h4>
                      <p className="text-[11px] sm:text-xs text-apple-gray font-normal leading-relaxed">{feat.desc}</p>
                    </div>
                  ))}
                </div>
              )}

              {activeDetailTab === "specs" && product.specs && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3">
                  {product.specs.map((spec, sIdx) => (
                    <div
                      key={sIdx}
                      className="p-3 sm:p-3.5 rounded-xl bg-black/[0.02] dark:bg-black/40 border border-black/[0.05] dark:border-white/[0.05] flex items-center justify-between"
                    >
                      <span className="text-[11px] sm:text-xs font-mono text-apple-gray uppercase">
                        {spec.label}
                      </span>
                      <span className="text-[11px] sm:text-xs font-semibold text-apple-text dark:text-white/90 text-right">
                        {spec.value}
                      </span>
                    </div>
                  ))}
                </div>
              )}

              {activeDetailTab === "box" && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-apple-text dark:text-white font-bold text-xs sm:text-sm">
                      <Package className="w-4 h-4 text-[#0071e3] dark:text-brand-gold" />
                      <span>What’s in the Box</span>
                    </div>
                    <ul className="space-y-1 text-xs text-apple-gray">
                      {product.inTheBox?.map((item, iIdx) => (
                        <li key={iIdx} className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#0071e3] dark:bg-brand-gold flex-shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-apple-text dark:text-white font-bold text-xs sm:text-sm">
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
