import React, { useState } from "react";
import { REVIEWS } from "../data/storeData";
import { soundFx } from "../lib/utils";
import { Star, ChevronLeft, ChevronRight, Quote, ShieldCheck, Sparkles } from "lucide-react";

export const CustomerReviews: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isChanging, setIsChanging] = useState(false);

  const switchReview = (newIndex: number) => {
    soundFx.playClick();
    setIsChanging(true);
    setTimeout(() => {
      setCurrentIndex(newIndex);
      setIsChanging(false);
    }, 150);
  };

  const prevReview = () => {
    switchReview(currentIndex === 0 ? REVIEWS.length - 1 : currentIndex - 1);
  };

  const nextReview = () => {
    switchReview(currentIndex === REVIEWS.length - 1 ? 0 : currentIndex + 1);
  };

  const review = REVIEWS[currentIndex];

  return (
    <section id="reviews" className="py-24 md:py-36 bg-white dark:bg-[#030304] relative overflow-hidden transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full apple-pill text-xs font-mono uppercase tracking-widest text-[#0071e3] dark:text-brand-gold mb-4 shadow-xs">
            <Sparkles className="w-3.5 h-3.5" />
            Customer Voices
          </div>
          <div className="floating-font">
            <h2 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-apple-text dark:text-white mb-4">
              Stories from our showroom.
            </h2>
          </div>
          <p className="text-apple-gray text-base sm:text-lg font-normal floating-font-delayed">
            Real feedback from tech enthusiasts and daily gadget buyers in Madhupur & Kamalasagar.
          </p>
        </div>

        {/* Featured Testimonial Card with Animation */}
        <div className="max-w-4xl mx-auto rounded-3xl apple-card dark:glass-card border border-black/[0.06] dark:border-white/10 p-8 sm:p-14 relative shadow-xl">
          <Quote className="w-16 h-16 text-black/[0.04] dark:text-white/[0.06] absolute top-8 right-8 pointer-events-none" />

          {/* Review Details Container */}
          <div
            className={`transition-all duration-300 ${
              isChanging ? "opacity-0 scale-[0.98] blur-xs" : "opacity-100 scale-100 blur-0"
            }`}
          >
            {/* Stars & Badge */}
            <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
              <div className="flex items-center gap-1.5">
                {[...Array(review.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />
                ))}
              </div>

              {review.verifiedPurchase && (
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-xs font-mono font-medium">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Verified In-Store Buyer</span>
                </div>
              )}
            </div>

            {/* Review Text */}
            <blockquote className="text-xl sm:text-3xl font-light text-apple-text dark:text-white leading-relaxed mb-8">
              “{review.comment}”
            </blockquote>

            {/* Customer Meta & Item */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-6 border-t border-black/[0.06] dark:border-white/[0.08]">
              <div>
                <h4 className="text-base font-bold text-apple-text dark:text-white">{review.name}</h4>
                <p className="text-xs text-apple-gray">{review.role} • {review.date}</p>
                {review.purchasedItem && (
                  <span className="text-[11px] font-mono text-[#0071e3] dark:text-brand-gold font-medium block mt-0.5">
                    Item: {review.purchasedItem}
                  </span>
                )}
              </div>

              {/* Navigation Arrows */}
              <div className="flex items-center gap-2">
                <button
                  onClick={prevReview}
                  className="w-10 h-10 rounded-full apple-pill flex items-center justify-center text-apple-text/70 dark:text-apple-gray hover:text-apple-text dark:hover:text-white transition-all shadow-xs"
                  aria-label="Previous review"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>

                <span className="text-xs font-mono text-apple-gray px-2 font-medium">
                  0{currentIndex + 1} / 0{REVIEWS.length}
                </span>

                <button
                  onClick={nextReview}
                  className="w-10 h-10 rounded-full apple-pill flex items-center justify-center text-apple-text/70 dark:text-apple-gray hover:text-apple-text dark:hover:text-white transition-all shadow-xs"
                  aria-label="Next review"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
