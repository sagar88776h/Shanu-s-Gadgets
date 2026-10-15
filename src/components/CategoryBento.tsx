import React from "react";
import type { CategoryId, Tier } from "../data/storeData";
import { CATEGORIES, TIERS, inr, priceRange } from "../data/storeData";
import { TierMark } from "./TierBadge";
import { TIER_STYLE } from "../lib/tierStyles";
import { soundFx, cn } from "../lib/utils";

interface CategoryBentoProps {
  onOpen: (category: CategoryId, tier?: Tier) => void;
}

// Each tile gets its own quiet colour so the five categories are easy to tell apart.
const TILE_BG: Record<CategoryId, string> = {
  phones: "from-sky-50 via-white to-indigo-50 dark:from-[#0c1424] dark:via-[#0a101c] dark:to-[#15112b]",
  airpods: "from-slate-100 to-zinc-50 dark:from-[#14161c] dark:to-[#0b0c10]",
  neckbands: "from-amber-50 to-orange-50 dark:from-[#1c150a] dark:to-[#100c07]",
  covers: "from-rose-50 to-amber-50 dark:from-[#1c1011] dark:to-[#120c09]",
  accessories: "from-emerald-50 to-teal-50 dark:from-[#0a1815] dark:to-[#080f0d]",
};

const TILE_SPAN: Record<CategoryId, string> = {
  phones: "md:col-span-2 lg:col-span-6 lg:row-span-2 min-h-[580px] md:min-h-[470px] lg:min-h-[640px]",
  airpods: "lg:col-span-3 min-h-[440px]",
  neckbands: "lg:col-span-3 min-h-[440px]",
  covers: "lg:col-span-3 min-h-[440px]",
  accessories: "lg:col-span-3 min-h-[440px]",
};

export const CategoryBento: React.FC<CategoryBentoProps> = ({ onOpen }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-4 sm:gap-5">
      {CATEGORIES.map((cat) => {
        const big = cat.id === "phones";
        return (
          <article
            key={cat.id}
            className={cn(
              "group relative overflow-hidden rounded-[28px] border border-black/[0.06] dark:border-white/[0.08] bg-gradient-to-br shadow-sm hover:shadow-xl transition-shadow duration-500",
              TILE_BG[cat.id],
              TILE_SPAN[cat.id]
            )}
          >
            {/* Whole tile opens the category */}
            <button
              onClick={() => {
                soundFx.playClick();
                onOpen(cat.id);
              }}
              aria-label={`Browse ${cat.name}`}
              className="absolute inset-0 z-0 w-full h-full cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#0071e3] rounded-[28px]"
            />

            {/* Product art */}
            <img
              src={cat.image}
              alt=""
              className={cn(
                "absolute pointer-events-none object-contain drop-shadow-[0_24px_30px_rgba(0,0,0,0.18)] transition-transform duration-700 ease-out group-hover:scale-[1.04] group-hover:-rotate-1",
                big
                  ? "w-[80%] sm:w-[62%] left-1/2 -translate-x-1/2 top-[22%] md:w-[46%] md:left-auto md:translate-x-0 md:right-[2%] md:top-[4%] lg:w-[84%] lg:right-[-6%] lg:top-[10%]"
                  : "w-[56%] md:w-[44%] lg:w-[62%] left-1/2 -translate-x-1/2 top-[27%]"
              )}
            />

            <div className={cn("relative z-10 h-full flex flex-col justify-between pointer-events-none", big ? "p-6 sm:p-8" : "p-5 sm:p-6")}>
              <div className={big ? "max-w-full md:max-w-[50%] lg:max-w-[58%]" : "max-w-full"}>
                <span className="inline-block text-[11px] font-semibold px-2.5 py-1 rounded-full bg-white/70 dark:bg-white/10 backdrop-blur-md border border-black/[0.06] dark:border-white/10 text-apple-text/80 dark:text-apple-lightgray">
                  {cat.stock}
                </span>
                <h3 className={cn("font-extrabold tracking-tight text-apple-text dark:text-white mt-3", big ? "text-4xl sm:text-5xl" : "text-3xl")}>
                  {cat.name}
                </h3>
                <p className="text-sm text-apple-text/70 dark:text-apple-gray mt-1.5 leading-snug">{cat.tagline}</p>
              </div>

              {/* Tier shortcuts */}
              <div
                className={cn(
                  "pointer-events-auto rounded-2xl bg-white/70 dark:bg-white/[0.07] backdrop-blur-xl border border-black/[0.06] dark:border-white/10 p-1.5 shadow-sm",
                  big ? "max-w-sm" : "w-full"
                )}
              >
                {TIERS.map((t) => {
                  const range = priceRange(cat.id, t.id);
                  return (
                    <button
                      key={t.id}
                      disabled={!range}
                      onClick={() => {
                        soundFx.playClick();
                        onOpen(cat.id, t.id);
                      }}
                      className="w-full flex items-center justify-between gap-2 px-3 py-2 rounded-xl text-left whitespace-nowrap hover:bg-black/[0.05] dark:hover:bg-white/[0.08] transition-colors disabled:opacity-40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0071e3]"
                    >
                      <span className={cn("flex items-center gap-2 text-sm font-semibold", TIER_STYLE[t.id].text)}>
                        <TierMark tier={t.id} />
                        {t.label}
                      </span>
                      <span className="text-xs text-apple-text/70 dark:text-apple-gray">
                        {range ? `from ${inr(range.min)}` : "—"}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </article>
        );
      })}
    </div>
  );
};
