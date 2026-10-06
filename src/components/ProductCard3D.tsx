import React, { useRef, useState } from "react";
import type { Product } from "../data/storeData";
import { STORE_CONFIG } from "../data/storeData";
import { soundFx } from "../lib/utils";
import {
  Star,
  ShoppingBag,
  MessageCircle,
  Box,
  Eye,
} from "lucide-react";

interface ProductCard3DProps {
  product: Product;
  onSelectProduct: (product: Product) => void;
  onAddToCart: (product: Product) => void;
  onOpen3D?: (product: Product) => void;
}

export const ProductCard3D: React.FC<ProductCard3DProps> = ({
  product,
  onSelectProduct,
  onAddToCart,
  onOpen3D,
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotX, setRotX] = useState<number>(0);
  const [rotY, setRotY] = useState<number>(0);
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [glarePos, setGlarePos] = useState<{ x: number; y: number }>({ x: 50, y: 50 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    // Calculate rotation (-15deg to 15deg)
    const rotateY = ((x - centerX) / centerX) * 14;
    const rotateX = -((y - centerY) / centerY) * 14;

    setRotX(rotateX);
    setRotY(rotateY);
    setGlarePos({
      x: (x / rect.width) * 100,
      y: (y / rect.height) * 100,
    });
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setRotX(0);
    setRotY(0);
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="relative rounded-3xl apple-card dark:glass-card border border-black/[0.06] dark:border-white/10 p-5 sm:p-6 flex flex-col justify-between transition-all duration-200 ease-out group select-none shadow-md hover:shadow-2xl"
      style={{
        perspective: "1000px",
        transform: isHovered
          ? `perspective(1000px) rotateX(${rotX}deg) rotateY(${rotY}deg) scale3d(1.02, 1.02, 1.02)`
          : "perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)",
        transformStyle: "preserve-3d",
      }}
    >
      {/* Specular Glare Reflection Layer */}
      {isHovered && (
        <div
          className="absolute inset-0 rounded-3xl pointer-events-none z-30 transition-opacity duration-300 opacity-60 dark:opacity-40"
          style={{
            background: `radial-gradient(circle 280px at ${glarePos.x}% ${glarePos.y}%, rgba(255, 255, 255, 0.45), transparent 70%)`,
          }}
        />
      )}

      {/* Card Top Details */}
      <div style={{ transform: "translateZ(20px)", transformStyle: "preserve-3d" }}>
        {/* Badges Bar */}
        <div className="flex items-center justify-between gap-2 mb-3">
          <span className="text-[10px] font-mono uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-black/[0.04] dark:bg-white/10 text-apple-text dark:text-white font-medium">
            {product.categoryLabel}
          </span>
          <div className="flex items-center gap-1.5">
            <div className="flex items-center gap-1 text-[11px] font-mono text-amber-500 font-bold">
              <Star className="w-3 h-3 fill-current text-amber-400" />
              <span>{product.rating}</span>
            </div>
            {product.badge && (
              <span className="text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded-full bg-brand-gold/15 text-brand-gold font-bold">
                {product.badge}
              </span>
            )}
          </div>
        </div>

        {/* 3D Floating Product Image Stage */}
        <div
          onClick={() => {
            soundFx.playClick();
            onSelectProduct(product);
          }}
          className="aspect-square rounded-2xl overflow-hidden bg-black/[0.02] dark:bg-black/40 mb-4 cursor-pointer relative flex items-center justify-center p-4 transition-transform duration-300 group/image"
          style={{
            transform: isHovered ? "translateZ(38px) scale(1.04)" : "translateZ(0px)",
            transformStyle: "preserve-3d",
          }}
        >
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-contain filter drop-shadow-md group-hover/image:drop-shadow-2xl transition-all duration-300 animate-float"
          />

          {/* Quick Hover Inspect Overlay */}
          <div className="absolute inset-0 bg-black/0 group-hover/image:bg-black/15 transition-colors flex items-center justify-center">
            <span className="opacity-0 group-hover/image:opacity-100 transition-all duration-200 px-3.5 py-1.5 rounded-full bg-white/95 dark:bg-black/95 text-apple-text dark:text-white text-xs font-semibold shadow-lg flex items-center gap-1.5 transform translate-y-2 group-hover/image:translate-y-0">
              <Eye className="w-3.5 h-3.5 text-[#0071e3]" />
              <span>Inspect Details</span>
            </span>
          </div>
        </div>

        {/* Product Title & Tagline */}
        <h3
          onClick={() => {
            soundFx.playClick();
            onSelectProduct(product);
          }}
          className="text-lg sm:text-xl font-bold text-apple-text dark:text-white tracking-tight cursor-pointer hover:text-[#0071e3] transition-colors leading-snug"
          style={{ transform: "translateZ(18px)" }}
        >
          {product.name}
        </h3>
        <p
          className="text-xs text-apple-gray mt-1 line-clamp-2 leading-relaxed font-normal"
          style={{ transform: "translateZ(12px)" }}
        >
          {product.tagline}
        </p>

        {/* Key Specs Pills */}
        {product.specs && product.specs.length > 0 && (
          <div
            className="mt-3 flex flex-wrap gap-1.5"
            style={{ transform: "translateZ(15px)" }}
          >
            {product.specs.slice(0, 2).map((s, idx) => (
              <span
                key={idx}
                className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-black/[0.03] dark:bg-white/[0.05] text-apple-gray"
              >
                {s.value}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Price & Action Strip */}
      <div
        className="pt-4 mt-4 border-t border-black/[0.06] dark:border-white/[0.06] space-y-2.5"
        style={{ transform: "translateZ(25px)", transformStyle: "preserve-3d" }}
      >
        <div className="flex items-center justify-between">
          <div>
            <span className="text-lg sm:text-xl font-extrabold text-apple-text dark:text-white">
              ₹{product.price.toLocaleString("en-IN")}
            </span>
            {product.originalPrice && (
              <span className="text-xs text-apple-gray line-through ml-2 font-normal">
                ₹{product.originalPrice.toLocaleString("en-IN")}
              </span>
            )}
          </div>

          <div className="flex items-center gap-1.5">
            {/* 3D Stage Trigger */}
            {onOpen3D && product.isHero && (
              <button
                onClick={() => {
                  soundFx.playClick();
                  onOpen3D(product);
                }}
                className="w-9 h-9 rounded-full bg-black/[0.04] dark:bg-white/[0.08] hover:bg-blue-500/15 text-[#0071e3] dark:text-brand-neon flex items-center justify-center transition-all shadow-xs"
                title="Launch 3D Studio"
              >
                <Box className="w-4 h-4 animate-spin-slow" />
              </button>
            )}

            {/* Add to Bag */}
            <button
              onClick={() => {
                soundFx.playClick();
                onAddToCart(product);
              }}
              className="px-3.5 py-2 rounded-full bg-[#0071e3] hover:bg-[#0077ed] text-white text-xs font-semibold flex items-center gap-1.5 shadow-sm hover:scale-105 active:scale-95 transition-all"
            >
              <ShoppingBag className="w-3.5 h-3.5" />
              <span>Add</span>
            </button>
          </div>
        </div>

        {/* WhatsApp Order */}
        <a
          href={`https://wa.me/${STORE_CONFIG.whatsappNumber}?text=${encodeURIComponent(
            `Hello Shanu's Gadgets! I am interested in purchasing: ${product.name} (₹${product.price.toLocaleString('en-IN')}). Is it currently available for store pickup?`
          )}`}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => soundFx.playClick()}
          className="w-full py-2 rounded-xl bg-[#25D366]/10 hover:bg-[#25D366]/20 border border-[#25D366]/30 text-[#128C7E] dark:text-[#25D366] text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
        >
          <MessageCircle className="w-3.5 h-3.5 fill-current" />
          <span>WhatsApp Order</span>
        </a>
      </div>
    </div>
  );
};
