import React from "react";
import { WHY_US_PILLARS, TRUST_METRICS, STORE_CONFIG } from "../data/storeData";
import { soundFx } from "../lib/utils";
import {
  ArrowLeft,
  ShieldCheck,
  Sparkles,
  Headphones,
  MapPin,
  CheckCircle2,
  XCircle,
  Phone,
  MessageCircle,
} from "lucide-react";

interface WhyUsPageProps {
  onNavigateHome: () => void;
  onNavigateStore: () => void;
}

export const WhyUsPage: React.FC<WhyUsPageProps> = ({
  onNavigateHome,
  onNavigateStore,
}) => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case "ShieldCheck":
        return <ShieldCheck className="w-6 h-6" />;
      case "Sparkles":
        return <Sparkles className="w-6 h-6" />;
      case "Headphones":
        return <Headphones className="w-6 h-6" />;
      case "MapPin":
        return <MapPin className="w-6 h-6" />;
      default:
        return <ShieldCheck className="w-6 h-6" />;
    }
  };

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
            Why Shanu's Gadgets
          </span>
        </div>

        {/* Page Title */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full apple-pill text-xs font-mono uppercase tracking-widest text-[#0071e3] dark:text-brand-gold mb-3 shadow-xs">
            <ShieldCheck className="w-3.5 h-3.5" />
            The Shanu's Standard
          </div>
          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-apple-text dark:text-white mb-4">
            Built On Trust & Precision.
          </h1>
          <p className="text-apple-gray text-base sm:text-xl font-normal leading-relaxed">
            We don’t just sell electronics. We curate genuine technology, support your everyday workflow, and provide lightning-fast local service.
          </p>
        </div>

        {/* Trust Metrics Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 mb-16">
          {TRUST_METRICS.map((metric, idx) => (
            <div
              key={idx}
              className="p-6 rounded-3xl apple-card dark:glass-card border border-black/[0.06] dark:border-white/10 text-center space-y-1 shadow-sm"
            >
              <div className="text-3xl sm:text-4xl font-extrabold text-[#0071e3] dark:text-brand-gold font-mono">
                {metric.value}
              </div>
              <div className="text-sm font-bold text-apple-text dark:text-white">
                {metric.label}
              </div>
              <div className="text-[11px] text-apple-gray">
                {metric.subtitle}
              </div>
            </div>
          ))}
        </div>

        {/* 4 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
          {WHY_US_PILLARS.map((pillar) => (
            <div
              key={pillar.id}
              className="p-8 sm:p-10 rounded-3xl apple-card dark:glass-card border border-black/[0.06] dark:border-white/10 space-y-4 hover:shadow-xl transition-all"
            >
              <div className="w-14 h-14 rounded-2xl bg-blue-50 dark:bg-brand-gold/10 border border-blue-200 dark:border-brand-gold/20 flex items-center justify-center text-[#0071e3] dark:text-brand-gold">
                {getIcon(pillar.icon)}
              </div>

              <span className="text-xs font-mono uppercase tracking-widest text-[#0071e3] dark:text-brand-gold font-bold block">
                {pillar.metric}
              </span>

              <h3 className="text-2xl font-bold text-apple-text dark:text-white tracking-tight">
                {pillar.title}
              </h3>

              <p className="text-sm font-semibold text-apple-text/80 dark:text-white/80">
                “{pillar.tagline}”
              </p>

              <p className="text-sm text-apple-gray leading-relaxed">
                {pillar.description}
              </p>
            </div>
          ))}
        </div>

        {/* Comparison Table */}
        <div className="rounded-3xl apple-card dark:glass-card border border-black/[0.06] dark:border-white/10 p-6 sm:p-10 mb-16 shadow-xl">
          <h3 className="text-2xl font-bold text-apple-text dark:text-white text-center mb-8">
            How Shanu’s Gadgets Compares
          </h3>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead>
                <tr className="border-b border-black/[0.08] dark:border-white/10 text-apple-gray font-mono uppercase tracking-wider">
                  <th className="py-4 px-4">Experience Aspect</th>
                  <th className="py-4 px-4 text-[#0071e3] dark:text-brand-gold font-bold">Shanu’s Gadgets</th>
                  <th className="py-4 px-4 text-apple-gray">Generic Online Portals</th>
                  <th className="py-4 px-4 text-apple-gray">Local Uncertified Shops</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-black/[0.06] dark:divide-white/[0.06]">
                <tr>
                  <td className="py-4 px-4 font-semibold text-apple-text dark:text-white">Hands-on Touch & Feel</td>
                  <td className="py-4 px-4 text-emerald-600 dark:text-emerald-400 font-semibold flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4" /> Live Demo Showcase
                  </td>
                  <td className="py-4 px-4 text-apple-gray flex items-center gap-1.5">
                    <XCircle className="w-4 h-4 text-red-400" /> Only Photos
                  </td>
                  <td className="py-4 px-4 text-apple-gray">Limited Boxes</td>
                </tr>
                <tr>
                  <td className="py-4 px-4 font-semibold text-apple-text dark:text-white">Brand Warranty & Invoicing</td>
                  <td className="py-4 px-4 text-emerald-600 dark:text-emerald-400 font-semibold flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4" /> 100% Genuine Barcoded
                  </td>
                  <td className="py-4 px-4 text-apple-gray">Varies by 3rd-Party Seller</td>
                  <td className="py-4 px-4 text-apple-gray">Often Missing Stamp</td>
                </tr>
                <tr>
                  <td className="py-4 px-4 font-semibold text-apple-text dark:text-white">On-The-Spot Express Repair</td>
                  <td className="py-4 px-4 text-emerald-600 dark:text-emerald-400 font-semibold flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4" /> 45 Minutes In-Store
                  </td>
                  <td className="py-4 px-4 text-apple-gray">7 to 15 Days Courier</td>
                  <td className="py-4 px-4 text-apple-gray">Sent Out of Town</td>
                </tr>
                <tr>
                  <td className="py-4 px-4 font-semibold text-apple-text dark:text-white">Data Transfer & Free Setup</td>
                  <td className="py-4 px-4 text-emerald-600 dark:text-emerald-400 font-semibold flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4" /> Lifetime In-Store Support
                  </td>
                  <td className="py-4 px-4 text-apple-gray">Self-Service / None</td>
                  <td className="py-4 px-4 text-apple-gray">Additional Charges</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Action Banner */}
        <div className="text-center space-y-4">
          <h4 className="text-xl font-bold text-apple-text dark:text-white">
            Visit the showroom today in Madhupur, Kamalasagar
          </h4>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={() => {
                soundFx.playClick();
                onNavigateStore();
              }}
              className="px-7 py-3.5 rounded-full bg-[#0071e3] hover:bg-[#0077ed] text-white text-xs font-semibold shadow-md hover:scale-105 transition-all"
            >
              Explore Showroom
            </button>
            <a
              href={STORE_CONFIG.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3.5 rounded-full bg-[#25D366] text-black text-xs font-semibold shadow-md hover:scale-105 transition-all flex items-center gap-1.5"
            >
              <MessageCircle className="w-4 h-4 fill-black" />
              <span>Chat on WhatsApp</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
