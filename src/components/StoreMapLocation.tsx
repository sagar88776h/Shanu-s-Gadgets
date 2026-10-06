import React from "react";
import { STORE_CONFIG } from "../data/storeData";
import { soundFx } from "../lib/utils";
import {
  MapPin,
  Navigation,
  Compass,
  Car,
  ExternalLink,
} from "lucide-react";

export const StoreMapLocation: React.FC = () => {
  return (
    <section className="py-20 md:py-28 bg-[#fbfbfd] dark:bg-[#030304] relative overflow-hidden transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="rounded-3xl apple-card dark:glass-card border border-black/[0.06] dark:border-white/10 p-6 sm:p-10 md:p-14 overflow-hidden relative shadow-xl">
          {/* Stylized Vector Radar Map Background */}
          <div className="absolute inset-0 bg-blue-50/20 dark:bg-[#07070a] z-0">
            <svg
              className="w-full h-full opacity-20 dark:opacity-25"
              viewBox="0 0 1000 500"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M 50 250 Q 300 200 500 250 T 950 220"
                stroke="currentColor"
                strokeWidth="4"
                strokeDasharray="6 6"
              />
              <path
                d="M 200 50 L 500 250 L 700 450"
                stroke="currentColor"
                strokeWidth="3"
              />
              <circle
                cx="500"
                cy="250"
                r="60"
                stroke="currentColor"
                strokeWidth="1.5"
                fill="none"
              />
              <circle
                cx="500"
                cy="250"
                r="120"
                stroke="currentColor"
                strokeWidth="1"
                fill="none"
              />
              <circle
                cx="500"
                cy="250"
                r="190"
                stroke="currentColor"
                strokeWidth="1"
                fill="none"
              />
            </svg>
          </div>

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Location Info */}
            <div className="lg:col-span-6 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full apple-pill text-xs font-mono uppercase tracking-widest text-[#0071e3] dark:text-brand-gold font-semibold shadow-xs">
                <Compass className="w-3.5 h-3.5" />
                Store Radar & Map
              </div>

              <div className="floating-font">
                <h3 className="text-3xl sm:text-5xl font-black tracking-tight text-apple-text dark:text-white">
                  Located in the Heart of Kamalasagar.
                </h3>
              </div>

              <p className="text-sm sm:text-base text-apple-gray font-normal leading-relaxed floating-font-delayed">
                Easily accessible along Madhupur Main Road with dedicated customer parking, express tech pickup bays, and instant product unboxing assistance.
              </p>

              <div className="space-y-3 pt-2">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-xl bg-blue-50 dark:bg-white/5 border border-blue-100 dark:border-white/10 flex items-center justify-center text-[#0071e3] dark:text-brand-gold flex-shrink-0 mt-0.5">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <h5 className="text-sm font-bold text-apple-text dark:text-white">Flagship Address</h5>
                    <p className="text-xs text-apple-gray">
                      {STORE_CONFIG.address} (Kamalasagar Market Corridor)
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-xl bg-emerald-50 dark:bg-white/5 border border-emerald-100 dark:border-white/10 flex items-center justify-center text-emerald-600 dark:text-brand-neon flex-shrink-0 mt-0.5">
                    <Car className="w-4 h-4" />
                  </div>
                  <div>
                    <h5 className="text-sm font-bold text-apple-text dark:text-white">Convenient Access</h5>
                    <p className="text-xs text-apple-gray">
                      Dedicated vehicle parking & easy two-wheeler drive-in spots right outside.
                    </p>
                  </div>
                </div>
              </div>

              <div className="pt-4 flex flex-wrap items-center gap-3">
                <a
                  href={STORE_CONFIG.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => soundFx.playClick()}
                  className="px-6 py-3 rounded-full bg-[#0071e3] hover:bg-[#0077ed] text-white font-semibold text-xs sm:text-sm tracking-tight shadow-md flex items-center gap-2 transition-all hover:scale-105"
                >
                  <span>Open in Google Maps</span>
                  <ExternalLink className="w-4 h-4" />
                </a>

                <a
                  href={STORE_CONFIG.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => soundFx.playClick()}
                  className="px-6 py-3 rounded-full apple-pill hover:bg-black/5 dark:hover:bg-white/15 text-apple-text dark:text-white font-semibold text-xs sm:text-sm flex items-center gap-2 transition-all shadow-xs"
                >
                  <Navigation className="w-4 h-4 text-[#0071e3] dark:text-brand-gold" />
                  <span>Send Live Pin on WhatsApp</span>
                </a>
              </div>
            </div>

            {/* Right Map Pin Card */}
            <div className="lg:col-span-6 flex items-center justify-center">
              <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden border border-black/[0.08] dark:border-white/15 p-6 flex flex-col items-center justify-center text-center bg-white/80 dark:bg-black/60 backdrop-blur-md group shadow-md">
                {/* Glowing Radar Rings */}
                <div className="relative w-28 h-28 flex items-center justify-center mb-6">
                  <div className="absolute inset-0 rounded-full bg-blue-400/20 animate-ping" />
                  <div className="absolute inset-3 rounded-full bg-[#0071e3]/20 animate-pulse" />
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#0071e3] to-blue-700 text-white flex items-center justify-center shadow-xl relative z-10">
                    <MapPin className="w-8 h-8 fill-white" />
                  </div>
                </div>

                <div className="space-y-1 relative z-10">
                  <span className="text-[10px] font-mono tracking-widest text-[#0071e3] dark:text-brand-gold uppercase font-semibold">
                    DESTINATION
                  </span>
                  <h4 className="text-xl font-bold text-apple-text dark:text-white tracking-tight">
                    {STORE_CONFIG.name}
                  </h4>
                  <p className="text-xs text-apple-gray">
                    Madhupur, Kamalasagar, Tripura
                  </p>
                </div>

                <div className="mt-4 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black/5 dark:bg-white/10 border border-black/5 dark:border-white/10 text-[11px] font-mono text-apple-text dark:text-apple-lightgray">
                  <span>GPS: 23.648° N, 91.285° E</span>
                  <span className="text-emerald-600 dark:text-emerald-400 font-bold">• Active</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
