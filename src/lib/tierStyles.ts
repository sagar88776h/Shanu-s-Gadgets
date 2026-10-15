import type { Grade, Tier } from "../data/storeData";

/** Colour system for the three tiers. Full class strings so Tailwind keeps them. */
export const TIER_STYLE: Record<
  Tier,
  { chip: string; text: string; active: string; bar: string; soft: string }
> = {
  normal: {
    chip: "bg-slate-500/10 text-slate-700 dark:text-slate-300 border-slate-500/20",
    text: "text-slate-600 dark:text-slate-300",
    active: "bg-slate-700 text-white dark:bg-slate-200 dark:text-slate-900",
    bar: "bg-slate-400",
    soft: "bg-slate-500/[0.07]",
  },
  "mid-range": {
    chip: "bg-sky-500/10 text-sky-700 dark:text-sky-300 border-sky-500/25",
    text: "text-sky-700 dark:text-sky-300",
    active: "bg-sky-600 text-white dark:bg-sky-400 dark:text-slate-900",
    bar: "bg-sky-500",
    soft: "bg-sky-500/[0.08]",
  },
  premium: {
    chip: "bg-amber-500/10 text-amber-700 dark:text-brand-gold border-amber-500/30",
    text: "text-amber-700 dark:text-brand-gold",
    active: "bg-[#b8801f] text-white dark:bg-brand-gold dark:text-dark-950",
    bar: "bg-brand-gold",
    soft: "bg-amber-500/[0.09]",
  },
};

export const GRADE_STYLE: Record<Grade, string> = {
  "Like New": "bg-emerald-500/10 text-emerald-700 dark:text-emerald-300",
  Good: "bg-lime-500/10 text-lime-700 dark:text-lime-300",
  Fair: "bg-orange-500/10 text-orange-700 dark:text-orange-300",
};
