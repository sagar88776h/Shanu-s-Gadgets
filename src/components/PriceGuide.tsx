import React from "react";
import type { CategoryId, Tier } from "../data/storeData";
import { CATEGORIES, TIERS, inr, priceRange } from "../data/storeData";
import { TierMark } from "./TierBadge";
import { TIER_STYLE } from "../lib/tierStyles";
import { soundFx, cn } from "../lib/utils";

interface PriceGuideProps {
  onOpen: (category: CategoryId, tier: Tier) => void;
}

const fmt = (min: number, max: number) => (min === max ? inr(min) : `${inr(min)} – ${inr(max)}`);

/** Categories x tiers, with the real price range from the catalogue in every cell. */
export const PriceGuide: React.FC<PriceGuideProps> = ({ onOpen }) => {
  return (
    <div className="rounded-3xl border border-black/[0.06] dark:border-white/[0.08] bg-white dark:bg-white/[0.03] overflow-hidden shadow-sm">
      {/* Header row (tablet and up) */}
      <div className="hidden md:grid grid-cols-[1.1fr_repeat(3,1fr)] border-b border-black/[0.06] dark:border-white/[0.08] bg-black/[0.02] dark:bg-white/[0.03]">
        <div className="px-6 py-4 text-xs font-semibold text-apple-gray">Category</div>
        {TIERS.map((t) => (
          <div key={t.id} className="px-6 py-4">
            <div className={cn("flex items-center gap-2 text-sm font-bold", TIER_STYLE[t.id].text)}>
              <TierMark tier={t.id} className="w-3.5 h-3.5" />
              {t.label}
            </div>
            <div className="text-xs text-apple-gray mt-0.5">{t.short}</div>
          </div>
        ))}
      </div>

      {CATEGORIES.map((cat, i) => (
        <div
          key={cat.id}
          className={cn(
            "grid grid-cols-1 md:grid-cols-[1.1fr_repeat(3,1fr)]",
            i > 0 && "border-t border-black/[0.06] dark:border-white/[0.08]"
          )}
        >
          <div className="flex items-center gap-3 px-5 md:px-6 pt-5 md:py-5">
            <span className="w-12 h-12 rounded-2xl bg-black/[0.03] dark:bg-white/[0.06] flex items-center justify-center flex-shrink-0">
              <img src={cat.image} alt="" className="w-10 h-10 object-contain" />
            </span>
            <div>
              <div className="font-bold text-apple-text dark:text-white">{cat.name}</div>
              <div className="text-xs text-apple-gray">{cat.stock}</div>
            </div>
          </div>

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
                className="group flex md:block items-center justify-between gap-3 text-left px-5 md:px-6 py-3 md:py-5 hover:bg-black/[0.03] dark:hover:bg-white/[0.05] transition-colors disabled:opacity-40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#0071e3]"
              >
                <span className={cn("md:hidden flex items-center gap-2 text-sm font-semibold", TIER_STYLE[t.id].text)}>
                  <TierMark tier={t.id} />
                  {t.label}
                </span>
                <span className="block text-sm md:text-base font-semibold text-apple-text dark:text-white">
                  {range ? fmt(range.min, range.max) : "—"}
                </span>
                {range && (
                  <span className="hidden md:block text-xs text-apple-gray mt-0.5 group-hover:text-[#0071e3] dark:group-hover:text-brand-gold transition-colors">
                    {range.count} {range.count === 1 ? "product" : "products"}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      ))}
    </div>
  );
};
