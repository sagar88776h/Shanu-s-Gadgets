import React, { useRef, useState } from "react";
import type { Product } from "../data/storeData";
import { ALL_PRODUCTS } from "../data/storeData";
import { formatPrice, getWhatsAppOrderUrl, soundFx } from "../lib/utils";
import {
  ChevronLeft,
  ChevronRight,
  Sparkles,
  ShoppingBag,
  MessageCircle,
  Star,
} from "lucide-react";

interface HorizontalCollectionScrollProps {
  onSelectProduct: (product: Product) => void;
  onAddToCart: (product: Product) => void;
}

export const HorizontalCollectionScroll: React.FC<HorizontalCollectionScrollProps> = ({
  onSelectProduct,
  onAddToCart,
}) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [isTabChanging, setIsTabChanging] = useState<boolean>(false);

  const categories = [
    { id: "all", label: "All Curations" },
    { id: "smartphones", label: "Smartphones" },
    { id: "audio", label: "Studio Audio" },
    { id: "smartwatches", label: "Smart Watches" },
    { id: "accessories", label: "Accessories" },
    { id: "power-banks", label: "Power & Cables" },
    { id: "gaming", label: "Gaming & Keyboards" },
    { id: "repairing-graphics", label: "Repair & Skins" },
  ];

  const handleCategoryTabChange = (catId: string) => {
    if (catId === activeCategory) return;
    soundFx.playClick();
    setIsTabChanging(true);
    setTimeout(() => {
      setActiveCategory(catId);
      setIsTabChanging(false);
      if (scrollContainerRef.current) {
        scrollContainerRef.current.scrollTo({ left: 0, behavior: "smooth" });
      }
    }, 150);
  };

  const filteredProducts =
    activeCategory === "all"
      ? ALL_PRODUCTS
      : ALL_PRODUCTS.filter((p) => p.category === activeCategory);

  const scroll = (direction: "left" | "right") => {
    soundFx.playClick();
    if (scrollContainerRef.current) {
      const scrollAmount = direction === "left" ? -400 : 400;
      scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  return (
    <section className="py-24 md:py-36 bg-white dark:bg-[#030304] relative overflow-hidden transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 mb-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full apple-pill text-xs font-mono uppercase tracking-widest text-[#0071e3] dark:text-brand-gold mb-3 shadow-xs">
              <Sparkles className="w-3.5 h-3.5" />
              Complete Catalog
            </div>
            <div className="floating-font">
              <h2 className="text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-apple-text dark:text-white">
                Explore the collection.
              </h2>
            </div>
            <p className="text-apple-gray text-sm sm:text-base font-normal mt-2 max-w-xl floating-font-delayed">
              From flagship hardware to precision desk accessories and express chip repair services.
            </p>
          </div>

          {/* Controls: Scroll Arrow Buttons */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => scroll("left")}
              className="w-10 h-10 rounded-full apple-pill flex items-center justify-center text-apple-text/70 dark:text-apple-gray hover:text-apple-text dark:hover:text-white transition-all shadow-xs"
              aria-label="Scroll left"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => scroll("right")}
              className="w-10 h-10 rounded-full apple-pill flex items-center justify-center text-apple-text/70 dark:text-apple-gray hover:text-apple-text dark:hover:text-white transition-all shadow-xs"
              aria-label="Scroll right"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Animated Category Filter Pills with Sliding Indicator */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-2 pt-6 no-scrollbar">
          <div className="inline-flex p-1.5 rounded-full bg-black/[0.04] dark:bg-white/[0.06] border border-black/[0.06] dark:border-white/10 backdrop-blur-xl shadow-xs">
            {categories.map((cat) => {
              const isActive = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => handleCategoryTabChange(cat.id)}
                  className={`relative px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all duration-300 ${
                    isActive
                      ? "text-white dark:text-dark-950 shadow-sm"
                      : "text-apple-text/70 dark:text-apple-gray hover:text-apple-text dark:hover:text-white"
                  }`}
                >
                  {isActive && (
                    <span className="absolute inset-0 rounded-full bg-[#0071e3] dark:bg-white -z-10 shadow-sm animate-scale-in" />
                  )}
                  <span>{cat.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Horizontal Carousel Track with Transition */}
      <div
        ref={scrollContainerRef}
        className={`flex gap-6 overflow-x-auto px-4 sm:px-8 lg:px-12 pb-8 scroll-smooth no-scrollbar transition-all duration-300 ${
          isTabChanging ? "opacity-0 scale-[0.98] blur-xs" : "opacity-100 scale-100 blur-0"
        }`}
        style={{ scrollSnapType: "x mandatory" }}
      >
        {filteredProducts.map((product) => (
          <div
            key={product.id}
            className="w-[300px] sm:w-[350px] flex-shrink-0 rounded-3xl apple-card dark:glass-card border border-black/[0.06] dark:border-white/[0.08] p-6 flex flex-col justify-between group hover:border-black/20 dark:hover:border-white/20 transition-all duration-300 relative cursor-pointer shadow-sm hover:shadow-lg"
            style={{ scrollSnapAlign: "start" }}
            onClick={() => {
              soundFx.playClick();
              onSelectProduct(product);
            }}
            data-cursor-text="VIEW"
          >
            {/* Top Category and Rating */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-[10px] font-mono uppercase tracking-widest text-[#0071e3] dark:text-brand-gold font-semibold">
                  {product.categoryLabel}
                </span>
                <div className="flex items-center gap-1 text-xs text-amber-500 font-mono">
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  <span className="font-bold">{product.rating}</span>
                </div>
              </div>

              {/* Product Visual Container */}
              <div className="relative w-full aspect-square rounded-2xl bg-gradient-to-b from-black/[0.02] to-black/[0.05] dark:bg-black/40 border border-black/[0.04] dark:border-white/[0.04] p-4 flex items-center justify-center overflow-hidden mb-6 group-hover:bg-black/[0.07] dark:group-hover:bg-black/60 transition-colors shadow-inner">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-contain filter drop-shadow-md group-hover:scale-108 transition-transform duration-500 ease-out"
                />
                {product.badge && (
                  <span className="absolute top-3 left-3 px-2.5 py-0.5 rounded-full bg-white/90 dark:bg-white/10 backdrop-blur-md text-[10px] font-medium text-apple-text dark:text-white border border-black/10 dark:border-white/10 shadow-xs">
                    {product.badge}
                  </span>
                )}
              </div>

              {/* Product Info */}
              <h3 className="text-lg font-bold text-apple-text dark:text-white tracking-tight group-hover:text-[#0071e3] dark:group-hover:text-brand-gold transition-colors mb-1 line-clamp-1">
                {product.name}
              </h3>
              <p className="text-xs text-apple-gray font-normal line-clamp-2 leading-relaxed mb-4">
                {product.tagline}
              </p>
            </div>

            {/* Bottom Price & Quick Actions */}
            <div className="pt-4 border-t border-black/[0.06] dark:border-white/[0.06] flex items-center justify-between gap-3">
              <div>
                <span className="text-[10px] font-mono text-apple-gray block">STORE PRICE</span>
                <span className="text-base font-extrabold text-apple-text dark:text-white">
                  {formatPrice(product.price)}
                </span>
              </div>

              <div className="flex items-center gap-1.5" onClick={(e) => e.stopPropagation()}>
                <a
                  href={getWhatsAppOrderUrl(product.name, product.price)}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => soundFx.playClick()}
                  className="p-2.5 rounded-full bg-[#25D366]/15 hover:bg-[#25D366]/25 text-[#128C7E] dark:text-[#25D366] transition-all"
                  title="Order on WhatsApp"
                >
                  <MessageCircle className="w-4 h-4 fill-current" />
                </a>

                <button
                  onClick={() => {
                    soundFx.playClick();
                    onAddToCart(product);
                  }}
                  className="p-2.5 rounded-full bg-[#0071e3] hover:bg-[#0077ed] text-white transition-all shadow-sm"
                  title="Add to Shopping Bag"
                >
                  <ShoppingBag className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
