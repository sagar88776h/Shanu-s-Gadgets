import React from "react";
import { CATEGORIES } from "../data/storeData";
import { soundFx } from "../lib/utils";
import { ArrowUpRight, Sparkles } from "lucide-react";

interface CategoryGridProps {
  onSelectCategory: (slug: string) => void;
}

export const CategoryGrid: React.FC<CategoryGridProps> = ({ onSelectCategory }) => {
  return (
    <section id="categories" className="py-24 md:py-36 bg-[#fbfbfd] dark:bg-[#030304] relative overflow-hidden transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 md:mb-24">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full apple-pill text-xs font-mono uppercase tracking-widest text-[#0071e3] dark:text-brand-gold mb-4 shadow-xs">
            <Sparkles className="w-3.5 h-3.5" />
            Curated Ecosystems
          </div>
          <div className="floating-font">
            <h2 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-gradient-dark mb-4">
              Explore by Category.
            </h2>
          </div>
          <p className="text-apple-gray text-base sm:text-lg font-normal floating-font-delayed">
            Every department is strictly vetted for acoustic purity, battery longevity, and precision ergonomics.
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
              className="group relative aspect-[4/5] rounded-3xl overflow-hidden apple-card border border-black/[0.06] dark:border-white/[0.08] p-6 flex flex-col justify-between cursor-pointer hover:border-black/20 dark:hover:border-white/30 transition-all duration-500 shadow-md hover:shadow-xl"
              data-cursor-text="EXPLORE"
            >
              {/* Background Image with Zoom */}
              <div className="absolute inset-0 z-0 overflow-hidden">
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="w-full h-full object-cover object-center filter brightness-[0.75] group-hover:brightness-[0.9] group-hover:scale-110 transition-all duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
              </div>

              {/* Top Tag & Item Count */}
              <div className="relative z-10 flex items-center justify-between">
                <span className="px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-[11px] font-mono text-white font-medium">
                  {cat.count}+ ITEMS
                </span>

                <div className="w-9 h-9 rounded-full bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                  <ArrowUpRight className="w-4 h-4 text-white" />
                </div>
              </div>

              {/* Bottom Category Info */}
              <div className="relative z-10 transform group-hover:-translate-y-1 transition-transform duration-300">
                <h3 className="text-2xl font-bold text-white tracking-tight group-hover:text-brand-gold transition-colors">
                  {cat.name}
                </h3>
                <p className="text-xs text-white/80 font-normal mt-1 line-clamp-2">
                  {cat.tagline}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
