import React, { useState, useMemo } from "react";
import type { Product } from "../data/storeData";
import { ALL_PRODUCTS, CATEGORIES } from "../data/storeData";
import { soundFx } from "../lib/utils";
import { ProductCard3D } from "../components/ProductCard3D";
import {
  Search,
  Filter,
  ArrowLeft,
  Sparkles,
} from "lucide-react";

interface ProductsPageProps {
  initialCategory?: string;
  onSelectProduct: (product: Product) => void;
  onAddToCart: (product: Product) => void;
  onOpen3D: (product: Product) => void;
  onNavigateHome: () => void;
}

export const ProductsPage: React.FC<ProductsPageProps> = ({
  initialCategory,
  onSelectProduct,
  onAddToCart,
  onOpen3D,
  onNavigateHome,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>(
    initialCategory || "all"
  );
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [sortBy, setSortBy] = useState<"featured" | "price-low" | "price-high" | "rating">("featured");

  const categoriesList = [
    { id: "all", name: "All Gadgets" },
    ...CATEGORIES.map((c) => ({ id: c.slug, name: c.name })),
  ];

  const filteredProducts = useMemo(() => {
    let list = ALL_PRODUCTS;

    // Filter by Category
    if (selectedCategory !== "all") {
      list = list.filter((p) => p.category === selectedCategory);
    }

    // Filter by Search
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.tagline.toLowerCase().includes(q) ||
          p.categoryLabel.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q)
      );
    }

    // Sort
    return [...list].sort((a, b) => {
      if (sortBy === "price-low") return a.price - b.price;
      if (sortBy === "price-high") return b.price - a.price;
      if (sortBy === "rating") return b.rating - a.rating;
      return 0; // featured default
    });
  }, [selectedCategory, searchQuery, sortBy]);

  return (
    <div className="pt-24 sm:pt-28 pb-20 sm:pb-24 bg-white dark:bg-[#030304] text-apple-text dark:text-white transition-colors duration-300 animate-fade-in">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb Navigation */}
        <div className="flex items-center gap-3 mb-6 sm:mb-8">
          <button
            onClick={() => {
              soundFx.playClick();
              onNavigateHome();
            }}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full apple-pill text-xs font-semibold text-apple-gray hover:text-apple-text dark:hover:text-white transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Home</span>
          </button>
          <span className="text-xs text-apple-gray font-mono">/</span>
          <span className="text-xs font-mono text-[#0071e3] dark:text-brand-gold font-medium">
            Gadgets & Curated Hardware
          </span>
        </div>

        {/* Page Title & Intro */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 sm:mb-12 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full apple-pill text-xs font-mono uppercase tracking-widest text-[#0071e3] dark:text-brand-gold mb-3 shadow-xs">
              <Sparkles className="w-3.5 h-3.5" />
              Curated Catalog
            </div>
            <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-apple-text dark:text-white">
              Hardware. Curated Better.
            </h1>
            <p className="text-apple-gray text-xs sm:text-base mt-2 max-w-xl leading-relaxed">
              Explore flagship smartphones, studio acoustics, rugged timepieces, GaN charging systems, and on-site express repair services.
            </p>
          </div>

          {/* Search Input */}
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 text-apple-gray absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              placeholder="Search gadgets, models..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-full apple-pill text-xs text-apple-text dark:text-white placeholder:text-apple-gray focus:outline-none focus:ring-2 focus:ring-[#0071e3]/40 shadow-xs"
            />
          </div>
        </div>

        {/* Category Pills & Sorting Bar */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-8 pb-4 border-b border-black/[0.06] dark:border-white/[0.08]">
          {/* Animated Category Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1">
            {categoriesList.map((cat) => {
              const isActive = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => {
                    soundFx.playClick();
                    setSelectedCategory(cat.id);
                  }}
                  className={`px-3.5 sm:px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all duration-300 relative ${
                    isActive
                      ? "text-white dark:text-dark-950 shadow-sm"
                      : "text-apple-text/70 dark:text-apple-gray hover:text-apple-text dark:hover:text-white bg-black/[0.03] dark:bg-white/[0.06] hover:bg-black/[0.06]"
                  }`}
                >
                  {isActive && (
                    <span className="absolute inset-0 rounded-full bg-[#0071e3] dark:bg-white -z-10 shadow-sm" />
                  )}
                  <span>{cat.name}</span>
                </button>
              );
            })}
          </div>

          {/* Sorting Dropdown */}
          <div className="flex items-center gap-2 text-xs text-apple-gray flex-shrink-0">
            <Filter className="w-3.5 h-3.5" />
            <span>Sort by:</span>
            <select
              value={sortBy}
              onChange={(e) => {
                soundFx.playClick();
                setSortBy(e.target.value as any);
              }}
              className="bg-black/[0.04] dark:bg-white/[0.08] text-apple-text dark:text-white text-xs rounded-lg px-2.5 py-1.5 border border-black/[0.06] dark:border-white/10 focus:outline-none"
            >
              <option value="featured">Featured Collection</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
            </select>
          </div>
        </div>

        {/* Product Count Display */}
        <div className="text-xs font-mono text-apple-gray mb-6">
          Showing {filteredProducts.length} curated {filteredProducts.length === 1 ? "device" : "devices"} with 3D physical movement
        </div>

        {/* Product Grid with 3D Card Movement */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-24 rounded-3xl apple-card dark:glass-card border border-black/[0.06] dark:border-white/10 p-8">
            <Search className="w-12 h-12 text-apple-gray mx-auto mb-4 opacity-50" />
            <h3 className="text-xl font-bold text-apple-text dark:text-white">
              No gadgets match your search
            </h3>
            <p className="text-xs text-apple-gray mt-1">
              Try searching with different keywords or switch the category filter.
            </p>
            <button
              onClick={() => {
                setSearchQuery("");
                setSelectedCategory("all");
              }}
              className="mt-6 px-6 py-2.5 rounded-full bg-[#0071e3] text-white text-xs font-semibold"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredProducts.map((prod) => (
              <ProductCard3D
                key={prod.id}
                product={prod}
                onSelectProduct={onSelectProduct}
                onAddToCart={onAddToCart}
                onOpen3D={onOpen3D}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
