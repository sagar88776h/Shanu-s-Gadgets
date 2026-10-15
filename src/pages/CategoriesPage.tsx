import React from "react";
import type { CategoryId, Tier } from "../data/storeData";
import { soundFx } from "../lib/utils";
import { CategoryBento } from "../components/CategoryBento";
import { PriceGuide } from "../components/PriceGuide";
import { ArrowLeft } from "lucide-react";

interface CategoriesPageProps {
  onSelectCategory: (slug: CategoryId, tier?: Tier) => void;
  onNavigateHome: () => void;
}

export const CategoriesPage: React.FC<CategoriesPageProps> = ({ onSelectCategory, onNavigateHome }) => {
  return (
    <div className="pt-24 sm:pt-28 pb-24 bg-white dark:bg-[#030304] text-apple-text dark:text-white transition-colors duration-300 animate-fade-in">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 mb-8 text-xs text-apple-gray">
          <button
            onClick={() => {
              soundFx.playClick();
              onNavigateHome();
            }}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full apple-pill font-semibold hover:text-apple-text dark:hover:text-white transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Home
          </button>
          <span>/</span>
          <span className="font-semibold text-apple-text dark:text-white">Categories</span>
        </nav>

        <div className="max-w-2xl mb-10 sm:mb-14">
          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight">Five categories. Three tiers each.</h1>
          <p className="text-apple-gray text-base sm:text-lg mt-4 leading-relaxed">
            Phones are pre-owned and graded. Everything else is brand new. In every category, pick Normal, Mid-range or Premium.
          </p>
        </div>

        <CategoryBento onOpen={onSelectCategory} />

        <div className="mt-20 sm:mt-28">
          <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight">Pick a tier by budget.</h2>
          <p className="text-apple-gray mt-2 mb-8 max-w-xl">Tap any price to see what is inside.</p>
          <PriceGuide onOpen={onSelectCategory} />
        </div>
      </div>
    </div>
  );
};
