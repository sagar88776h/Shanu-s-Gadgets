import React from "react";
import { ContactSection } from "../components/ContactSection";
import { StoreMapLocation } from "../components/StoreMapLocation";
import { soundFx } from "../lib/utils";
import { ArrowLeft, Sparkles } from "lucide-react";

interface ContactPageProps {
  onNavigateHome: () => void;
}

export const ContactPage: React.FC<ContactPageProps> = ({ onNavigateHome }) => {
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
            Contact & Express Repair Service
          </span>
        </div>

        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full apple-pill text-xs font-mono uppercase tracking-widest text-[#0071e3] dark:text-brand-gold mb-3 shadow-xs">
            <Sparkles className="w-3.5 h-3.5" />
            Direct Support Desk
          </div>
          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-apple-text dark:text-white mb-4">
            We’re Here To Help.
          </h1>
          <p className="text-apple-gray text-base sm:text-xl font-normal">
            Whether you want to check gadget availability, get an instant quote for a 45-min screen repair, or custom laser skins, connect with our specialists.
          </p>
        </div>

        {/* Contact Section Form & Channels */}
        <ContactSection />

        {/* Radar Map Location */}
        <div className="mt-16">
          <StoreMapLocation />
        </div>
      </div>
    </div>
  );
};
