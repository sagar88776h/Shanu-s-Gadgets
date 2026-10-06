import React, { useState, useRef, useEffect } from "react";
import type { Product } from "../data/storeData";
import { HERO_PRODUCTS } from "../data/storeData";
import { formatPrice, getWhatsAppOrderUrl, soundFx } from "../lib/utils";
import {
  RotateCcw,
  Sparkles,
  ShoppingBag,
  MessageCircle,
  ZoomIn,
  ZoomOut,
  Zap,
} from "lucide-react";

interface Interactive3DViewerProps {
  initialProduct?: Product;
  onAddToCart: (product: Product) => void;
  onSelectProduct?: (product: Product) => void;
}

export const Interactive3DViewer: React.FC<Interactive3DViewerProps> = ({
  initialProduct = HERO_PRODUCTS[0],
  onAddToCart,
}) => {
  const [selectedProduct, setSelectedProduct] = useState<Product>(initialProduct);
  const [activeColorIdx, setActiveColorIdx] = useState<number>(0);
  const [rotationY, setRotationY] = useState<number>(0);
  const [rotationX, setRotationX] = useState<number>(0);
  const [zoom, setZoom] = useState<number>(1);
  const [isAutoSpin, setIsAutoSpin] = useState<boolean>(true);
  const [activeHotspot, setActiveHotspot] = useState<number | null>(0);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [isTabChanging, setIsTabChanging] = useState<boolean>(false);

  const dragStartRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const startRotRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });

  useEffect(() => {
    if (initialProduct) {
      setSelectedProduct(initialProduct);
      setActiveColorIdx(0);
    }
  }, [initialProduct]);

  useEffect(() => {
    if (!isAutoSpin || isDragging) return;
    const interval = setInterval(() => {
      setRotationY((prev) => (prev + 0.4) % 360);
    }, 30);
    return () => clearInterval(interval);
  }, [isAutoSpin, isDragging]);

  const handleProductTabChange = (prod: Product) => {
    if (prod.id === selectedProduct.id) return;
    soundFx.playClick();
    setIsTabChanging(true);
    setTimeout(() => {
      setSelectedProduct(prod);
      setActiveColorIdx(0);
      setActiveHotspot(0);
      setRotationX(0);
      setRotationY(0);
      setIsTabChanging(false);
    }, 150);
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setIsAutoSpin(false);
    dragStartRef.current = { x: e.clientX, y: e.clientY };
    startRotRef.current = { x: rotationX, y: rotationY };
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    const deltaX = e.clientX - dragStartRef.current.x;
    const deltaY = e.clientY - dragStartRef.current.y;

    setRotationY(startRotRef.current.y + deltaX * 0.6);
    setRotationX(Math.max(-25, Math.min(25, startRotRef.current.x - deltaY * 0.4)));
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length === 1) {
      setIsDragging(true);
      setIsAutoSpin(false);
      dragStartRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
      startRotRef.current = { x: rotationX, y: rotationY };
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging || e.touches.length !== 1) return;
    const deltaX = e.touches[0].clientX - dragStartRef.current.x;
    const deltaY = e.touches[0].clientY - dragStartRef.current.y;

    setRotationY(startRotRef.current.y + deltaX * 0.6);
    setRotationX(Math.max(-25, Math.min(25, startRotRef.current.x - deltaY * 0.4)));
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    setZoom((prev) => Math.max(0.75, Math.min(1.5, prev - e.deltaY * 0.001)));
  };

  const resetView = () => {
    soundFx.playClick();
    setRotationX(0);
    setRotationY(0);
    setZoom(1);
    setIsAutoSpin(true);
    setActiveHotspot(null);
  };

  const colors = selectedProduct.colors || [
    { name: "Space Titanium", hex: "#8a8a93" },
    { name: "Deep Obsidian", hex: "#141416" },
  ];

  return (
    <section
      id="interactive-3d"
      className="py-24 md:py-36 bg-white dark:bg-[#030304] border-t border-b border-black/[0.06] dark:border-white/[0.06] relative overflow-hidden select-none transition-colors duration-300"
    >
      {/* Dynamic Studio Ambience Backlight */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] rounded-full blur-[140px] pointer-events-none transition-colors duration-1000 opacity-20 dark:opacity-25"
        style={{ backgroundColor: colors[activeColorIdx]?.hex || "#0071e3" }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full apple-pill text-xs font-mono uppercase tracking-widest text-[#0071e3] dark:text-brand-neon mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            360° Hardware Studio
          </div>
          <div className="floating-font">
            <h2 className="text-3xl sm:text-5xl md:text-6xl font-black tracking-tight text-apple-text dark:text-white mb-4">
              Explore Every Curve & Finish.
            </h2>
          </div>
          <p className="text-apple-gray text-sm sm:text-lg font-normal floating-font-delayed">
            Drag to rotate, pinch or scroll to zoom, and interact with micro-engineered hardware components.
          </p>
        </div>

        {/* Animated Product Selector Ribbon with Sliding Indicator */}
        <div className="flex items-center justify-center gap-2 overflow-x-auto pb-4 mb-8 no-scrollbar">
          <div className="inline-flex p-1.5 rounded-full bg-black/[0.04] dark:bg-white/[0.06] border border-black/[0.06] dark:border-white/10 backdrop-blur-xl shadow-xs">
            {HERO_PRODUCTS.map((prod) => {
              const isSelected = selectedProduct.id === prod.id;
              return (
                <button
                  key={prod.id}
                  onClick={() => handleProductTabChange(prod)}
                  className={`relative px-4 sm:px-5 py-2 rounded-full text-xs sm:text-sm font-medium whitespace-nowrap transition-all duration-300 ${
                    isSelected
                      ? "text-white dark:text-dark-950 font-semibold shadow-sm"
                      : "text-apple-text/70 dark:text-apple-gray hover:text-apple-text dark:hover:text-white"
                  }`}
                >
                  {isSelected && (
                    <span className="absolute inset-0 rounded-full bg-[#0071e3] dark:bg-white -z-10 shadow-sm animate-scale-in" />
                  )}
                  <span>{prod.name}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* 3D Studio Canvas Container */}
        <div className="relative rounded-3xl apple-card dark:glass-card border border-black/[0.06] dark:border-white/10 p-4 sm:p-8 md:p-12 overflow-hidden shadow-xl">
          {/* Top Canvas Controls Bar */}
          <div className="flex items-center justify-between gap-4 mb-6 z-20 relative">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#0071e3] animate-ping" />
              <span className="text-xs font-mono uppercase tracking-wider text-apple-gray">
                Interactive Studio • Drag to Inspect
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  soundFx.playClick();
                  setZoom((prev) => Math.min(1.5, prev + 0.15));
                }}
                className="w-8 h-8 rounded-full apple-pill flex items-center justify-center text-apple-text/70 dark:text-apple-gray hover:text-apple-text dark:hover:text-white"
                title="Zoom In"
              >
                <ZoomIn className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => {
                  soundFx.playClick();
                  setZoom((prev) => Math.max(0.75, prev - 0.15));
                }}
                className="w-8 h-8 rounded-full apple-pill flex items-center justify-center text-apple-text/70 dark:text-apple-gray hover:text-apple-text dark:hover:text-white"
                title="Zoom Out"
              >
                <ZoomOut className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={resetView}
                className="px-3 py-1.5 rounded-full apple-pill text-xs font-mono text-apple-text/70 dark:text-apple-gray hover:text-apple-text dark:hover:text-white flex items-center gap-1.5"
                title="Reset Camera"
              >
                <RotateCcw className="w-3 h-3" />
                <span className="hidden sm:inline">Reset</span>
              </button>
            </div>
          </div>

          {/* Center 3D Interactive Stage */}
          <div
            className={`relative w-full aspect-[4/3] sm:aspect-[16/9] max-h-[580px] flex items-center justify-center cursor-grab active:cursor-grabbing touch-none select-none bg-gradient-to-b from-black/[0.01] to-black/[0.04] dark:from-black/20 dark:to-black/40 rounded-2xl transition-all duration-300 ${
              isTabChanging ? "opacity-0 scale-95 blur-xs" : "opacity-100 scale-100 blur-0"
            }`}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            onWheel={handleWheel}
            data-cursor-text="DRAG"
          >
            {/* Interactive Layered Product Asset */}
            <div
              className="relative transition-transform duration-100 ease-out flex items-center justify-center"
              style={{
                transform: `scale(${zoom}) rotateY(${rotationY}deg) rotateX(${rotationX}deg)`,
                transformStyle: "preserve-3d",
              }}
            >
              <img
                src={selectedProduct.image}
                alt={selectedProduct.name}
                className="max-h-[380px] sm:max-h-[440px] w-auto object-contain filter drop-shadow-[0_20px_35px_rgba(0,0,0,0.25)] dark:drop-shadow-[0_25px_60px_rgba(0,0,0,0.95)] pointer-events-none select-none"
                draggable={false}
              />

              {/* Reflection Floor */}
              <div
                className="absolute -bottom-8 w-[80%] h-6 bg-gradient-to-t from-transparent via-black/10 dark:via-white/5 to-transparent blur-md rounded-full pointer-events-none"
                style={{ transform: "rotateX(90deg)" }}
              />
            </div>

            {/* Pulsing Interactive Hotspots */}
            {selectedProduct.hotspots?.map((spot, idx) => {
              const isActive = activeHotspot === idx;
              return (
                <div
                  key={idx}
                  className="absolute z-30 transition-all duration-300"
                  style={{
                    top: `${spot.y}%`,
                    left: `${spot.x}%`,
                  }}
                  onClick={(e) => {
                    e.stopPropagation();
                    soundFx.playClick();
                    setActiveHotspot(isActive ? null : idx);
                  }}
                >
                  <button
                    className={`relative w-8 h-8 rounded-full flex items-center justify-center shadow-md transition-all duration-300 ${
                      isActive
                        ? "bg-[#0071e3] text-white scale-125 ring-4 ring-[#0071e3]/30"
                        : "bg-white dark:bg-black/80 border border-black/15 dark:border-white/40 text-[#0071e3] dark:text-brand-gold hover:scale-110"
                    }`}
                  >
                    <span className="w-2.5 h-2.5 rounded-full bg-[#0071e3] animate-ping absolute" />
                    <span className="text-xs font-bold">{idx + 1}</span>
                  </button>

                  {/* Hotspot Card Flyout */}
                  {isActive && (
                    <div className="absolute left-1/2 -translate-x-1/2 top-10 w-60 sm:w-72 p-4 rounded-2xl bg-white/95 dark:bg-dark-900/95 border border-black/10 dark:border-white/20 backdrop-blur-xl shadow-xl text-left z-40 animate-fade-in pointer-events-auto">
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="text-[10px] font-mono uppercase tracking-widest text-[#0071e3] dark:text-brand-gold font-bold">
                          Callout 0{idx + 1}
                        </span>
                        <Zap className="w-3 h-3 text-[#0071e3] dark:text-brand-gold" />
                      </div>
                      <h4 className="text-sm font-bold text-apple-text dark:text-white mb-1">{spot.title}</h4>
                      <p className="text-xs text-apple-gray leading-relaxed font-normal">
                        {spot.description}
                      </p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Bottom Bar: Color Switcher & Direct Purchase Action */}
          <div className="mt-6 pt-6 border-t border-black/[0.06] dark:border-white/[0.08] flex flex-wrap items-center justify-between gap-6 relative z-20">
            {/* Colors */}
            <div className="flex items-center gap-4">
              <span className="text-xs font-mono uppercase tracking-wider text-apple-gray">
                FINISH:
              </span>
              <div className="flex items-center gap-2">
                {colors.map((c, cIdx) => (
                  <button
                    key={c.name}
                    onClick={() => {
                      soundFx.playClick();
                      setActiveColorIdx(cIdx);
                    }}
                    className={`px-3 py-1.5 rounded-full text-xs font-medium flex items-center gap-2 transition-all ${
                      activeColorIdx === cIdx
                        ? "bg-black/10 dark:bg-white/20 border border-black/20 dark:border-white/50 text-apple-text dark:text-white shadow-xs"
                        : "bg-black/[0.03] dark:bg-white/5 border border-black/5 dark:border-white/10 text-apple-gray hover:text-apple-text dark:hover:text-white"
                    }`}
                  >
                    <span
                      className="w-3 h-3 rounded-full border border-black/20 dark:border-white/20"
                      style={{ backgroundColor: c.hex }}
                    />
                    <span>{c.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Price and CTA */}
            <div className="flex items-center gap-3">
              <div className="text-right mr-2">
                <span className="text-xs text-apple-gray font-mono block">STORE PRICE</span>
                <span className="text-xl font-bold text-apple-text dark:text-white">
                  {formatPrice(selectedProduct.price)}
                </span>
              </div>

              <a
                href={getWhatsAppOrderUrl(selectedProduct.name, selectedProduct.price)}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => soundFx.playClick()}
                className="px-5 py-2.5 rounded-full bg-[#25D366] hover:bg-[#20bd5a] text-black font-semibold text-xs flex items-center gap-1.5 shadow-md transition-transform hover:scale-105"
              >
                <MessageCircle className="w-4 h-4 fill-black" />
                <span>Reserve on WhatsApp</span>
              </a>

              <button
                onClick={() => {
                  soundFx.playClick();
                  onAddToCart(selectedProduct);
                }}
                className="px-4 py-2.5 rounded-full bg-[#0071e3] hover:bg-[#0077ed] text-white font-medium text-xs flex items-center gap-1.5 transition-all shadow-sm"
              >
                <ShoppingBag className="w-3.5 h-3.5" />
                <span>Add to Bag</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
