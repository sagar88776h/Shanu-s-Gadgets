import React from "react";
import { CATEGORIES } from "../data/storeData";
import { soundFx } from "../lib/utils";
import { ArrowLeft, ArrowRight, Sparkles, Layers } from "lucide-react";

interface CategoriesPageProps {
  onSelectCategory: (slug: string) => void;
  onNavigateHome: () => void;
}

export const CategoriesPage: React.FC<CategoriesPageProps> = ({
  onSelectCategory,
  onNavigateHome,
}) => {
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
            Browse Categories
          </span>
        </div>

        {/* Page Title */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full apple-pill text-xs font-mono uppercase tracking-widest text-[#0071e3] dark:text-brand-gold mb-3 shadow-xs">
            <Layers className="w-3.5 h-3.5" />
            Curated Departments
          </div>
          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-apple-text dark:text-white mb-4">
            Curated For Every Need.
          </h1>
          <p className="text-apple-gray text-base sm:text-xl font-normal">
            From flagship smartphones and studio ANC headphones to GaN charging arrays and custom 3M laser skins.
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {CATEGORIES.map((cat) => (
            <div
              key={cat.id}
              onClick={() => {
                soundFx.playClick();
                onSelectCategory(cat.slug);
              }}
              className="group relative rounded-3xl overflow-hidden aspect-[4/5] bg-black cursor-pointer shadow-lg hover:shadow-2xl transition-all duration-500 flex flex-col justify-end p-6 border border-black/[0.06] dark:border-white/10"
            >
              {/* Background Image */}
              <img
                src={cat.image}
                alt={cat.name}
                className="absolute inset-0 w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent" />

              {/* Content Overlay */}
              <div className="relative z-10 space-y-2 text-left">
                <span className="inline-block text-[10px] font-mono uppercase tracking-widest text-brand-gold px-2.5 py-0.5 rounded-full bg-black/60 backdrop-blur-md border border-brand-gold/30">
                  {cat.count} Items Available
                </span>

                <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                  {cat.name}
                </h3>

                <p className="text-xs text-apple-lightgray font-light line-clamp-2">
                  {cat.tagline}
                </p>

                <div className="pt-2 flex items-center gap-1 text-xs font-semibold text-[#438eff] group-hover:translate-x-1 transition-transform">
                  <span>Explore Department</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
