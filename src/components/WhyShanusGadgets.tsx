import React from "react";
import { WHY_US_PILLARS, TRUST_METRICS } from "../data/storeData";
import {
  ShieldCheck,
  Sparkles,
  Headphones,
  MapPin,
  CheckCircle2,
  Award,
} from "lucide-react";

export const WhyShanusGadgets: React.FC = () => {
  const getIcon = (name: string) => {
    switch (name) {
      case "ShieldCheck":
        return <ShieldCheck className="w-7 h-7 text-[#0071e3] dark:text-brand-gold" />;
      case "Sparkles":
        return <Sparkles className="w-7 h-7 text-[#0071e3] dark:text-brand-neon" />;
      case "Headphones":
        return <Headphones className="w-7 h-7 text-amber-500 dark:text-amber-400" />;
      case "MapPin":
        return <MapPin className="w-7 h-7 text-emerald-600 dark:text-emerald-400" />;
      default:
        return <Award className="w-7 h-7 text-[#0071e3] dark:text-brand-gold" />;
    }
  };

  return (
    <section id="why-us" className="py-24 md:py-36 bg-[#fbfbfd] dark:bg-[#030304] relative overflow-hidden transition-colors duration-300">
      {/* Background Lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-blue-100/30 dark:bg-brand-gold/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-20 md:mb-28">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full apple-pill text-xs font-mono uppercase tracking-widest text-[#0071e3] dark:text-brand-gold mb-4 shadow-xs">
            <Sparkles className="w-3.5 h-3.5" />
            Our Philosophy
          </div>
          <div className="floating-font">
            <h2 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-apple-text dark:text-white mb-4">
              More than gadgets.
            </h2>
          </div>
          <p className="text-apple-gray text-base sm:text-xl font-normal floating-font-delayed">
            We bridge the gap between world-class technology and genuine, personalized neighborhood care.
          </p>
        </div>

        {/* 4 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-24">
          {WHY_US_PILLARS.map((pillar) => (
            <div
              key={pillar.id}
              className="rounded-3xl apple-card dark:glass-card border border-black/[0.06] dark:border-white/[0.08] p-8 flex flex-col justify-between group hover:border-black/20 dark:hover:border-white/20 transition-all duration-300 shadow-sm hover:shadow-lg"
            >
              <div>
                {/* Icon Container */}
                <div className="w-14 h-14 rounded-2xl bg-black/[0.03] dark:bg-white/[0.05] border border-black/[0.06] dark:border-white/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-xs">
                  {getIcon(pillar.icon)}
                </div>

                <span className="text-[11px] font-mono uppercase tracking-widest text-[#0071e3] dark:text-brand-gold block mb-1 font-semibold">
                  {pillar.metric}
                </span>

                <h3 className="text-xl font-bold text-apple-text dark:text-white tracking-tight mb-2">
                  {pillar.title}
                </h3>

                <p className="text-sm font-medium text-apple-gray dark:text-apple-lightgray mb-3">
                  “{pillar.tagline}”
                </p>

                <p className="text-xs text-apple-text/80 dark:text-apple-gray font-normal leading-relaxed">
                  {pillar.description}
                </p>
              </div>

              <div className="pt-6 mt-6 border-t border-black/[0.06] dark:border-white/[0.06] flex items-center gap-2 text-[11px] font-mono text-apple-gray">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#0071e3] dark:text-brand-gold" />
                <span>Verified Quality Standard</span>
              </div>
            </div>
          ))}
        </div>

        {/* Trust Metrics & Banner */}
        <div className="rounded-3xl apple-card dark:glass-panel border border-black/[0.06] dark:border-white/10 p-8 sm:p-12 shadow-sm">
          <div className="text-center max-w-xl mx-auto mb-10">
            <span className="text-xs font-mono uppercase tracking-widest text-[#0071e3] dark:text-brand-gold font-semibold">
              LOCAL EXCELLENCE
            </span>
            <h3 className="text-2xl sm:text-4xl font-extrabold text-apple-text dark:text-white mt-1">
              Buy with confidence.
            </h3>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 text-center">
            {TRUST_METRICS.map((metric, idx) => (
              <div
                key={idx}
                className="p-4 rounded-2xl bg-black/[0.02] dark:bg-white/[0.02] border border-black/[0.04] dark:border-white/[0.05]"
              >
                <div className="text-3xl sm:text-5xl font-black text-apple-text dark:text-white tracking-tight mb-1">
                  {metric.value}
                </div>
                <div className="text-xs sm:text-sm font-semibold text-apple-gray dark:text-apple-lightgray">
                  {metric.label}
                </div>
                <div className="text-[11px] font-mono text-apple-gray mt-0.5">
                  {metric.subtitle}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
