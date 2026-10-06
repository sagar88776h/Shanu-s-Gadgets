import React, { useState } from "react";
import type { Product } from "../data/storeData";
import { HERO_PRODUCTS } from "../data/storeData";
import { Interactive3DViewer } from "../components/Interactive3DViewer";
import { soundFx } from "../lib/utils";
import { ArrowLeft, Box, Sparkles } from "lucide-react";

interface StudioPageProps {
  initialProduct?: Product;
  onAddToCart: (product: Product) => void;
  onSelectProduct: (product: Product) => void;
  onNavigateHome: () => void;
}

export const StudioPage: React.FC<StudioPageProps> = ({
  initialProduct,
  onAddToCart,
  onSelectProduct,
  onNavigateHome,
}) => {
  const [currentProduct, setCurrentProduct] = useState<Product>(
    initialProduct || HERO_PRODUCTS[0]
  );

  return (
    <div className="pt-28 pb-24 bg-white dark:bg-[#030304] text-apple-text dark:text-white transition-colors duration-300 animate-fade-in">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb Navigation */}
        <div className="flex items-center gap-3 mb-8">
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
            3D Interactive Hardware Studio
          </span>
        </div>

        {/* Page Title & Intro */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full apple-pill text-xs font-mono uppercase tracking-widest text-[#0071e3] dark:text-brand-gold mb-3 shadow-xs">
            <Box className="w-3.5 h-3.5 animate-spin-slow" />
            Interactive Hardware Stage
          </div>
          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-apple-text dark:text-white mb-4">
            Inspect in 3D Space.
          </h1>
          <p className="text-apple-gray text-sm sm:text-base leading-relaxed">
            Drag to rotate 360°, inspect real aerospace materials, trigger internal acoustic chambers, and customize titanium finishes in real time.
          </p>
        </div>

        {/* Interactive 3D Canvas Section */}
        <Interactive3DViewer
          initialProduct={currentProduct}
          onAddToCart={onAddToCart}
          onSelectProduct={onSelectProduct}
        />
      </div>
    </div>
  );
};
