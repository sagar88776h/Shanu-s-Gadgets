import React, { useState } from "react";
import { REVIEWS, STORE_CONFIG } from "../data/storeData";
import { soundFx } from "../lib/utils";
import {
  ArrowLeft,
  Star,
  CheckCircle2,
  MessageCircle,
  Sparkles,
  ExternalLink,
} from "lucide-react";

interface ReviewsPageProps {
  onNavigateHome: () => void;
  onNavigateStore: () => void;
}

export const ReviewsPage: React.FC<ReviewsPageProps> = ({
  onNavigateHome,
  onNavigateStore,
}) => {
  const [filterRating, setFilterRating] = useState<number | "all">("all");

  const filteredReviews =
    filterRating === "all"
      ? REVIEWS
      : REVIEWS.filter((r) => r.rating === filterRating);

  return (
    <div className="pt-28 pb-24 bg-white dark:bg-[#030304] text-apple-text dark:text-white transition-colors duration-300 animate-fade-in">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
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
            Customer Reviews & Trust
          </span>
        </div>

        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full apple-pill text-xs font-mono uppercase tracking-widest text-brand-gold mb-3 shadow-xs">
            <Sparkles className="w-3.5 h-3.5" />
            Verified Customer Stories
          </div>
          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-apple-text dark:text-white mb-4">
            Loved By Local Tech Enthusiasts.
          </h1>
          <p className="text-apple-gray text-base sm:text-xl font-normal">
            Read real feedback from customers in Madhupur, Kamalasagar, and across Sepahijala Tripura who upgraded their gadgets with us.
          </p>
        </div>

        {/* Overall Score Card Banner */}
        <div className="rounded-3xl apple-card dark:glass-card border border-black/[0.06] dark:border-white/10 p-8 sm:p-12 mb-16 shadow-xl flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex flex-col sm:flex-row items-center gap-6 text-center sm:text-left">
            <div className="w-24 h-24 rounded-3xl bg-gradient-to-tr from-[#0071e3] to-blue-400 text-white flex flex-col items-center justify-center shadow-lg font-mono">
              <span className="text-4xl font-extrabold">4.9</span>
              <span className="text-[10px] uppercase tracking-wider font-semibold">out of 5</span>
            </div>
            <div>
              <div className="flex items-center justify-center sm:justify-start gap-1 text-amber-400 mb-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-current" />
                ))}
              </div>
              <h3 className="text-xl font-bold text-apple-text dark:text-white">
                520+ Verified Local Reviews
              </h3>
              <p className="text-xs text-apple-gray mt-0.5">
                Google Maps Rating & In-Store Purchase Feedback
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <a
              href={STORE_CONFIG.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => soundFx.playClick()}
              className="px-6 py-3 rounded-full bg-[#0071e3] hover:bg-[#0077ed] text-white text-xs font-semibold flex items-center gap-2 shadow-md hover:scale-105 transition-all"
            >
              <span>Write Google Review</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
            <a
              href={STORE_CONFIG.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => soundFx.playClick()}
              className="px-5 py-3 rounded-full bg-[#25D366]/15 hover:bg-[#25D366]/25 text-[#128C7E] dark:text-[#25D366] text-xs font-semibold flex items-center gap-1.5 transition-all"
            >
              <MessageCircle className="w-3.5 h-3.5 fill-current" />
              <span>Share WhatsApp Feedback</span>
            </a>
          </div>
        </div>

        {/* Reviews List */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 mb-16">
          {filteredReviews.map((rev) => (
            <div
              key={rev.id}
              className="p-8 rounded-3xl apple-card dark:glass-card border border-black/[0.06] dark:border-white/10 space-y-4 hover:shadow-xl transition-all"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1 text-amber-400">
                  {[...Array(rev.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>
                <span className="text-[11px] font-mono text-apple-gray">
                  {rev.date}
                </span>
              </div>

              <p className="text-sm sm:text-base text-apple-text/90 dark:text-white/90 leading-relaxed italic">
                “{rev.comment}”
              </p>

              <div className="pt-3 border-t border-black/[0.06] dark:border-white/[0.06] flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-bold text-apple-text dark:text-white">
                    {rev.name}
                  </h4>
                  <p className="text-[11px] text-apple-gray">{rev.role}</p>
                </div>

                {rev.verifiedPurchase && (
                  <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-[10px] font-mono font-medium">
                    <CheckCircle2 className="w-3 h-3" />
                    <span>Verified Purchase</span>
                  </div>
                )}
              </div>

              {rev.purchasedItem && (
                <div className="text-[11px] font-mono text-apple-gray bg-black/[0.02] dark:bg-white/[0.03] px-3 py-1.5 rounded-xl">
                  Purchased: <span className="text-apple-text dark:text-white font-semibold">{rev.purchasedItem}</span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
