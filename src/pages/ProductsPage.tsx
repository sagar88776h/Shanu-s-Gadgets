import React, { useEffect, useMemo, useRef, useState } from "react";
import type { CategoryId, Grade, Product, Tier } from "../data/storeData";
import {
  CATEGORIES,
  CONDITION_GUIDE,
  STORE_CONFIG,
  TIER_COPY,
  TIER_ORDER,
  getCategory,
  getTier,
  inr,
  priceRange,
  productsIn,
} from "../data/storeData";
import { soundFx, cn } from "../lib/utils";
import { ProductCard3D } from "../components/ProductCard3D";
import { TierMark } from "../components/TierBadge";
import { TIER_STYLE } from "../lib/tierStyles";
import { Search, ArrowLeft, SlidersHorizontal, MessageCircle, LayoutGrid } from "lucide-react";

type CategoryFilter = CategoryId | "all";
type TierFilter = Tier | "all";
type GradeFilter = Grade | "any";
type SortKey = "featured" | "price-low" | "price-high";

interface ProductsPageProps {
  category: CategoryFilter;
  tier: TierFilter;
  onChangeFilters: (category: CategoryFilter, tier: TierFilter) => void;
  onSelectProduct: (product: Product) => void;
  onAddToCart: (product: Product) => void;
  onOpen3D: (product: Product) => void;
  onNavigateHome: () => void;
}

const PAGE_COPY: Record<CategoryFilter, { title: string; intro: string }> = {
  all: {
    title: "Shop everything.",
    intro: "Pre-owned phones and brand-new accessories. Pick a category, then a tier that fits your budget.",
  },
  phones: {
    title: "Pre-owned phones.",
    intro: "Every phone is tested and graded. Pick a tier by budget, then read the condition report before you buy.",
  },
  airpods: {
    title: "AirPods.",
    intro: "Brand-new wireless earbuds, from simple everyday pairs to noise-cancelling premium.",
  },
  neckbands: {
    title: "Neckbands.",
    intro: "Brand-new Bluetooth neckbands. Choose bass-tuned basics or long-battery premium bands.",
  },
  covers: {
    title: "Phone covers.",
    intro: "From clear and silicone to shockproof, leather and carbon. Tell us your model and we will check the fit.",
  },
  accessories: {
    title: "Accessories.",
    intro: "Chargers, power banks and screen guards in three tiers.",
  },
};

const GRADES: GradeFilter[] = ["any", "Like New", "Good", "Fair"];

export const ProductsPage: React.FC<ProductsPageProps> = ({
  category,
  tier,
  onChangeFilters,
  onSelectProduct,
  onAddToCart,
  onOpen3D,
  onNavigateHome,
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<SortKey>("featured");
  const [grade, setGrade] = useState<GradeFilter>("any");

  const activeGrade: GradeFilter = category === "phones" ? grade : "any";

  // On small screens the category tabs scroll sideways: keep the chosen one in view.
  const tabsRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = tabsRef.current?.querySelector<HTMLElement>('[aria-selected="true"]');
    el?.scrollIntoView({ inline: "center", block: "nearest", behavior: "smooth" });
  }, [category]);
  const copy = PAGE_COPY[category];

  const setCategory = (c: CategoryFilter) => {
    soundFx.playClick();
    onChangeFilters(c, tier);
  };
  const setTier = (t: TierFilter) => {
    soundFx.playClick();
    onChangeFilters(category, t);
  };

  const sortFn = (a: Product, b: Product) => {
    if (sortBy === "price-low") return a.price - b.price;
    if (sortBy === "price-high") return b.price - a.price;
    return 0;
  };

  const filtered = useMemo(() => {
    let list = productsIn(category, tier);
    if (activeGrade !== "any") list = list.filter((p) => p.condition?.grade === activeGrade);
    const q = searchQuery.trim().toLowerCase();
    if (q) {
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.tagline.toLowerCase().includes(q) ||
          p.categoryLabel.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          getTier(p.tier).label.toLowerCase().includes(q)
      );
    }
    return [...list].sort(sortFn);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [category, tier, activeGrade, searchQuery, sortBy]);

  // How the results are grouped: by category when browsing everything,
  // by tier when a category is open, flat when both are chosen.
  const groups = useMemo(() => {
    if (category === "all") {
      return CATEGORIES.map((c) => ({
        key: c.id,
        kind: "category" as const,
        category: c.id,
        items: filtered.filter((p) => p.category === c.id),
      })).filter((g) => g.items.length > 0);
    }
    if (tier === "all") {
      return TIER_ORDER.map((t) => ({
        key: t,
        kind: "tier" as const,
        tier: t,
        items: filtered.filter((p) => p.tier === t),
      })).filter((g) => g.items.length > 0);
    }
    return [{ key: "flat", kind: "flat" as const, items: filtered }];
  }, [filtered, category, tier]);

  const cat = category === "all" ? null : getCategory(category);
  const tierInfo = tier === "all" ? null : getTier(tier);

  const renderGrid = (items: Product[], hideTier = false) => (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
      {items.map((prod) => (
        <ProductCard3D
          key={prod.id}
          product={prod}
          onSelectProduct={onSelectProduct}
          onAddToCart={onAddToCart}
          onOpen3D={onOpen3D}
          hideTier={hideTier}
        />
      ))}
    </div>
  );

  return (
    <div className="pt-24 sm:pt-28 pb-20 sm:pb-24 bg-white dark:bg-[#030304] text-apple-text dark:text-white transition-colors duration-300 animate-fade-in">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-2 mb-6 sm:mb-8 text-xs text-apple-gray">
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
          <button onClick={() => onChangeFilters("all", "all")} className="hover:text-apple-text dark:hover:text-white">
            Shop
          </button>
          {cat && (
            <>
              <span>/</span>
              <button onClick={() => onChangeFilters(cat.id, "all")} className="hover:text-apple-text dark:hover:text-white">
                {cat.name}
              </button>
            </>
          )}
          {tierInfo && (
            <>
              <span>/</span>
              <span className="font-semibold text-apple-text dark:text-white">{tierInfo.label}</span>
            </>
          )}
        </nav>

        {/* Title + search */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8 sm:mb-10">
          <div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight">{copy.title}</h1>
            <p className="text-apple-gray text-sm sm:text-base mt-3 max-w-xl leading-relaxed">{copy.intro}</p>
          </div>
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 text-apple-gray absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="search"
              aria-label="Search products"
              placeholder={cat ? `Search ${cat.name.toLowerCase()}…` : "Search products…"}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-full apple-pill text-sm text-apple-text dark:text-white placeholder:text-apple-gray focus:outline-none focus:ring-2 focus:ring-[#0071e3]/40 shadow-xs"
            />
          </div>
        </div>

        {/* Step 1: category */}
        <div className="mb-4">
          <div ref={tabsRef} className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1 -mx-1 px-1" role="tablist" aria-label="Category">
            {[{ id: "all" as const, name: "All", image: "", count: productsIn("all").length }, ...CATEGORIES].map((c) => {
              const active = category === c.id;
              return (
                <button
                  key={c.id}
                  role="tab"
                  aria-selected={active}
                  onClick={() => setCategory(c.id)}
                  className={cn(
                    "flex items-center gap-2.5 pl-2.5 pr-4 py-2 rounded-2xl text-sm font-semibold whitespace-nowrap transition-all duration-200 border focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0071e3]",
                    active
                      ? "bg-[#0071e3] text-white border-transparent shadow-md dark:bg-white dark:text-dark-950"
                      : "bg-black/[0.03] dark:bg-white/[0.06] border-black/[0.05] dark:border-white/[0.08] text-apple-text/80 dark:text-apple-lightgray hover:bg-black/[0.06] dark:hover:bg-white/[0.1]"
                  )}
                >
                  {c.image ? (
                    <span className="w-8 h-8 rounded-xl bg-white/90 dark:bg-white/10 flex items-center justify-center overflow-hidden">
                      <img src={c.image} alt="" className="w-7 h-7 object-contain" />
                    </span>
                  ) : (
                    <span className="w-8 h-8 rounded-xl bg-black/[0.06] dark:bg-white/10 flex items-center justify-center">
                      <LayoutGrid className="w-4 h-4" />
                    </span>
                  )}
                  <span>{c.name}</span>
                  <span className={cn("text-xs font-medium", active ? "opacity-80" : "text-apple-gray")}>{c.count}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Step 2: tier */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-3" role="tablist" aria-label="Tier">
          {(["all", ...TIER_ORDER] as TierFilter[]).map((t) => {
            const active = tier === t;
            const range = priceRange(category, t);
            const label = t === "all" ? "All tiers" : getTier(t).label;
            const disabled = !range;
            return (
              <button
                key={t}
                role="tab"
                aria-selected={active}
                disabled={disabled}
                onClick={() => setTier(t)}
                className={cn(
                  "text-left rounded-2xl px-4 py-2.5 border transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0071e3] disabled:opacity-40 disabled:cursor-not-allowed",
                  active
                    ? cn("border-transparent shadow-md", t === "all" ? "bg-apple-text text-white dark:bg-white dark:text-dark-950" : TIER_STYLE[t].active)
                    : "bg-black/[0.03] dark:bg-white/[0.06] border-black/[0.05] dark:border-white/[0.08] hover:bg-black/[0.06] dark:hover:bg-white/[0.1]"
                )}
              >
                <span className="flex items-center gap-1.5 text-sm font-bold">
                  {t !== "all" && <TierMark tier={t} />}
                  {label}
                </span>
                <span className={cn("block text-xs mt-0.5", active ? "opacity-85" : "text-apple-gray")}>
                  {range ? (t === "all" ? `${range.count} products` : `From ${inr(range.min)}`) : "None yet"}
                </span>
              </button>
            );
          })}
        </div>

        {/* What the chosen tier means */}
        <p className="text-sm text-apple-gray min-h-[1.25rem] mb-5">
          {cat && tierInfo
            ? TIER_COPY[cat.id][tierInfo.id]
            : cat
            ? "Choose a tier to narrow down, or scroll to compare all three."
            : tierInfo
            ? `Showing ${tierInfo.label.toLowerCase()} products across every category.`
            : ""}
        </p>

        {/* Phones only: condition */}
        {category === "phones" && (
          <div className="mb-5 flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
            <span className="text-xs font-semibold text-apple-text dark:text-white">Condition</span>
            <div className="flex flex-wrap gap-1.5">
              {GRADES.map((g) => (
                <button
                  key={g}
                  onClick={() => {
                    soundFx.playClick();
                    setGrade(g);
                  }}
                  aria-pressed={grade === g}
                  className={cn(
                    "px-3 py-1.5 rounded-full text-xs font-semibold border transition-colors",
                    grade === g
                      ? "bg-apple-text text-white border-transparent dark:bg-white dark:text-dark-950"
                      : "bg-transparent border-black/10 dark:border-white/15 text-apple-text/80 dark:text-apple-lightgray hover:bg-black/[0.04] dark:hover:bg-white/[0.08]"
                  )}
                >
                  {g === "any" ? "Any condition" : g}
                </button>
              ))}
            </div>
            {grade !== "any" && <span className="text-xs text-apple-gray">{CONDITION_GUIDE[grade]}</span>}
          </div>
        )}

        {/* Count + sort */}
        <div className="flex items-center justify-between gap-4 mb-6 pb-4 border-b border-black/[0.06] dark:border-white/[0.08]">
          <p className="text-sm text-apple-gray" aria-live="polite">
            {filtered.length} {filtered.length === 1 ? "product" : "products"}
          </p>
          <label className="flex items-center gap-2 text-xs text-apple-gray">
            <SlidersHorizontal className="w-3.5 h-3.5" />
            <span>Sort</span>
            <select
              value={sortBy}
              onChange={(e) => {
                soundFx.playClick();
                setSortBy(e.target.value as SortKey);
              }}
              className="bg-black/[0.04] dark:bg-white/[0.08] text-apple-text dark:text-white text-xs rounded-lg px-2.5 py-1.5 border border-black/[0.06] dark:border-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0071e3]"
            >
              <option value="featured">Featured</option>
              <option value="price-low">Price: low to high</option>
              <option value="price-high">Price: high to low</option>
            </select>
          </label>
        </div>

        {/* Results */}
        {filtered.length === 0 ? (
          <div className="text-center py-20 rounded-3xl apple-card dark:glass-card border border-black/[0.06] dark:border-white/10 p-8">
            <Search className="w-10 h-10 text-apple-gray mx-auto mb-4 opacity-50" />
            <h3 className="text-xl font-bold">Nothing matches that yet</h3>
            <p className="text-sm text-apple-gray mt-1">Stock changes often. Ask us on WhatsApp and we will check what is available.</p>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <button
                onClick={() => {
                  setSearchQuery("");
                  setGrade("any");
                  onChangeFilters("all", "all");
                }}
                className="px-6 py-2.5 rounded-full bg-[#0071e3] text-white text-sm font-semibold"
              >
                Clear filters
              </button>
              <a
                href={STORE_CONFIG.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-2.5 rounded-full bg-[#25D366]/15 text-[#128C7E] dark:text-[#25D366] text-sm font-semibold"
              >
                Ask on WhatsApp
              </a>
            </div>
          </div>
        ) : (
          <div className="space-y-14 sm:space-y-16">
            {groups.map((g) => {
              if (g.kind === "flat") return <React.Fragment key={g.key}>{renderGrid(g.items)}</React.Fragment>;

              if (g.kind === "tier") {
                const range = priceRange(category, g.tier);
                return (
                  <section key={g.key} aria-labelledby={`tier-${g.tier}`}>
                    <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-6">
                      <div className="flex items-start gap-4">
                        <span className={cn("w-1 self-stretch min-h-[3rem] rounded-full", TIER_STYLE[g.tier].bar)} aria-hidden="true" />
                        <div>
                          <h2 id={`tier-${g.tier}`} className="flex items-center gap-3 text-2xl sm:text-3xl font-extrabold tracking-tight">
                            <TierMark tier={g.tier} className={cn("w-5 h-5", TIER_STYLE[g.tier].text)} />
                            {getTier(g.tier).label}
                          </h2>
                          <p className="text-sm text-apple-gray mt-1 max-w-xl">{cat ? TIER_COPY[cat.id][g.tier] : ""}</p>
                        </div>
                      </div>
                      {range && (
                        <p className={cn("text-sm font-semibold", TIER_STYLE[g.tier].text)}>
                          {range.min === range.max ? inr(range.min) : `${inr(range.min)} – ${inr(range.max)}`}
                        </p>
                      )}
                    </div>
                    {renderGrid(g.items, true)}
                  </section>
                );
              }

              const c = getCategory(g.category);
              const range = priceRange(g.category, tier);
              return (
                <section key={g.key} aria-labelledby={`cat-${c.id}`}>
                  <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-6">
                    <div className="flex items-center gap-4">
                      <span className="w-14 h-14 rounded-2xl bg-black/[0.03] dark:bg-white/[0.06] flex items-center justify-center flex-shrink-0">
                        <img src={c.image} alt="" className="w-12 h-12 object-contain" />
                      </span>
                      <div>
                        <h2 id={`cat-${c.id}`} className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                          {c.name}
                        </h2>
                        <p className="text-sm text-apple-gray mt-0.5">
                          {c.stock} · {range ? `from ${inr(range.min)}` : ""}
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() => {
                        soundFx.playClick();
                        onChangeFilters(c.id, tier);
                        window.scrollTo({ top: 0, behavior: "smooth" });
                      }}
                      className="text-sm font-semibold text-[#0071e3] dark:text-brand-gold hover:underline self-start sm:self-auto"
                    >
                      See {c.name} by tier
                    </button>
                  </div>
                  {renderGrid(g.items)}
                </section>
              );
            })}
          </div>
        )}

        {/* WhatsApp help */}
        <div className="mt-16 sm:mt-20 rounded-3xl bg-black/[0.03] dark:bg-white/[0.04] border border-black/[0.06] dark:border-white/[0.08] p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-5">
          <div>
            <h3 className="text-lg sm:text-xl font-bold">Not sure which tier to pick?</h3>
            <p className="text-sm text-apple-gray mt-1 max-w-xl">
              Tell us your budget and what you use it for. We will suggest the best option in the store.
            </p>
          </div>
          <a
            href={`${STORE_CONFIG.whatsappUrl}?text=${encodeURIComponent("Hello Shanu’s Gadgets, my budget is ₹____ and I am looking for ____. What do you suggest?")}`}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => soundFx.playClick()}
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-[#25D366] text-black font-bold text-sm shadow-md hover:scale-105 active:scale-95 transition-transform flex-shrink-0"
          >
            <MessageCircle className="w-4 h-4 fill-black" />
            Message us on WhatsApp
          </a>
        </div>
      </div>
    </div>
  );
};
