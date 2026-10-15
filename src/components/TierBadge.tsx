import React from "react";
import type { Tier } from "../data/storeData";
import { TIERS } from "../data/storeData";
import { cn } from "../lib/utils";
import { TIER_STYLE } from "../lib/tierStyles";

const RANK: Record<Tier, number> = { normal: 1, "mid-range": 2, premium: 3 };

/** Three ascending bars — 1, 2 or 3 filled. The tier is readable without colour. */
export const TierMark: React.FC<{ tier: Tier; className?: string }> = ({ tier, className }) => {
  const filled = RANK[tier];
  const heights = [4.5, 7.5, 10.5];
  return (
    <svg viewBox="0 0 13 12" className={cn("w-3 h-3 flex-shrink-0", className)} aria-hidden="true">
      {heights.map((h, i) => (
        <rect
          key={i}
          x={i * 4.6}
          y={11.5 - h}
          width={3.2}
          height={h}
          rx={0.9}
          fill="currentColor"
          opacity={i < filled ? 1 : 0.25}
        />
      ))}
    </svg>
  );
};

export const TierBadge: React.FC<{ tier: Tier; className?: string }> = ({ tier, className }) => {
  const label = TIERS.find((t) => t.id === tier)?.label ?? tier;
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-[11px] font-semibold leading-5",
        TIER_STYLE[tier].chip,
        className
      )}
    >
      <TierMark tier={tier} />
      {label}
    </span>
  );
};
