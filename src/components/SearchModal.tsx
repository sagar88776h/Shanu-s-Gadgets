import React, { useState, useEffect, useRef } from "react";
import type { Product } from "../data/storeData";
import { ALL_PRODUCTS } from "../data/storeData";
import { formatPrice, soundFx } from "../lib/utils";
import { Search, X, ChevronRight } from "lucide-react";

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectProduct: (product: Product) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  onSelectProduct,
}) => {
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    } else {
      setQuery("");
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const results = query.trim()
    ? ALL_PRODUCTS.filter(
        (p) =>
          p.name.toLowerCase().includes(query.toLowerCase()) ||
          p.tagline.toLowerCase().includes(query.toLowerCase()) ||
          p.categoryLabel.toLowerCase().includes(query.toLowerCase()) ||
          p.description.toLowerCase().includes(query.toLowerCase())
      )
    : ALL_PRODUCTS.slice(0, 4);

  const quickTags = [
    "Titanium",
    "Headphones",
    "Smart Watch",
    "Screen Repair",
    "MagSafe",
    "Mechanical",
  ];

  return (
    <div
      className="fixed inset-0 z-[115] bg-black/60 dark:bg-black/80 backdrop-blur-xl flex items-start justify-center pt-20 px-4 animate-fade-in select-none"
      onClick={onClose}
    >
      <div
        className="w-full max-w-2xl rounded-3xl apple-card dark:glass-card border border-black/[0.08] dark:border-white/20 p-6 shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Box */}
        <div className="flex items-center gap-3 pb-4 border-b border-black/[0.06] dark:border-white/10">
          <Search className="w-5 h-5 text-[#0071e3] dark:text-brand-gold flex-shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search phones, audio, repair services, accessories..."
            className="w-full bg-transparent text-apple-text dark:text-white placeholder:text-apple-gray text-base focus:outline-none"
          />
          {query && (
            <button
              onClick={() => setQuery("")}
              className="text-apple-gray hover:text-apple-text dark:hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={onClose}
            className="px-2.5 py-1 rounded-md apple-pill text-[11px] font-mono text-apple-gray hover:text-apple-text dark:hover:text-white"
          >
            ESC
          </button>
        </div>

        {/* Quick Tag Pills */}
        <div className="flex items-center gap-2 py-3 overflow-x-auto no-scrollbar">
          <span className="text-[10px] font-mono uppercase text-apple-gray whitespace-nowrap">
            SUGGESTIONS:
          </span>
          {quickTags.map((tag) => (
            <button
              key={tag}
              onClick={() => {
                soundFx.playClick();
                setQuery(tag);
              }}
              className="px-3 py-1 rounded-full text-[11px] font-medium apple-pill text-apple-text/80 dark:text-apple-gray hover:text-[#0071e3] dark:hover:text-white whitespace-nowrap shadow-xs"
            >
              {tag}
            </button>
          ))}
        </div>

        {/* Results List */}
        <div className="max-h-80 overflow-y-auto space-y-2 pt-2 no-scrollbar">
          <div className="text-[10px] font-mono uppercase tracking-wider text-apple-gray mb-2">
            {query.trim() ? `RESULTS (${results.length})` : "FEATURED GADGETS"}
          </div>

          {results.length === 0 ? (
            <div className="py-8 text-center text-xs text-apple-gray font-normal">
              No matching gadgets found. Try searching for “Headphones”, “Titanium”, or “Repair”.
            </div>
          ) : (
            results.map((product) => (
              <div
                key={product.id}
                onClick={() => {
                  soundFx.playClick();
                  onSelectProduct(product);
                  onClose();
                }}
                className="p-3 rounded-2xl bg-black/[0.02] dark:bg-white/[0.02] hover:bg-black/[0.06] dark:hover:bg-white/[0.08] border border-transparent hover:border-black/10 dark:hover:border-white/10 flex items-center justify-between cursor-pointer transition-all group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-black/[0.03] dark:bg-black/50 border border-black/[0.06] dark:border-white/10 p-1 flex items-center justify-center flex-shrink-0">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-apple-text dark:text-white group-hover:text-[#0071e3] dark:group-hover:text-brand-gold transition-colors">
                      {product.name}
                    </h4>
                    <p className="text-xs text-apple-gray font-normal line-clamp-1">
                      {product.tagline}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <span className="text-xs font-bold text-apple-text dark:text-white font-mono">
                    {formatPrice(product.price)}
                  </span>
                  <ChevronRight className="w-4 h-4 text-apple-gray group-hover:text-apple-text dark:group-hover:text-white group-hover:translate-x-1 transition-all" />
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
