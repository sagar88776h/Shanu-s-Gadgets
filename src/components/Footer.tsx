import React from "react";
import { STORE_CONFIG } from "../data/storeData";
import { soundFx } from "../lib/utils";
import type { PageRoute } from "./Navbar";
import {
  ArrowUp,
  MessageCircle,
  Phone,
  MapPin,
} from "lucide-react";
import { InstagramIcon } from "./Icons";

interface FooterProps {
  onNavigatePage: (page: PageRoute, category?: string) => void;
  onReplayIntro: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigatePage, onReplayIntro }) => {
  const scrollToTop = () => {
    soundFx.playClick();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleLink = (page: PageRoute, category?: string) => {
    soundFx.playClick();
    onNavigatePage(page, category);
  };

  return (
    <footer className="bg-[#fbfbfd] dark:bg-[#030304] border-t border-black/[0.06] dark:border-white/[0.08] text-apple-gray pt-20 pb-12 relative overflow-hidden select-none transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-16 border-b border-black/[0.06] dark:border-white/[0.08]">
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-brand-gold/70 shadow-md flex-shrink-0 bg-black">
                <img
                  src={STORE_CONFIG.logo}
                  alt="Shanu's Gadgets Logo"
                  className="w-full h-full object-cover"
                />
              </div>
              <span className="text-xl font-extrabold tracking-wider text-apple-text dark:text-white">
                {STORE_CONFIG.name}
              </span>
            </div>

            <p className="text-sm font-medium text-apple-text/90 dark:text-white/90">
              “{STORE_CONFIG.tagline}”
            </p>

            <p className="text-xs text-apple-gray font-normal max-w-sm leading-relaxed">
              Madhupur & Kamalasagar’s premier destination for flagship smartphones, studio acoustics, titanium accessories, custom 3D skins, and certified express repairs.
            </p>

            <div className="pt-2 flex items-center gap-3">
              <a
                href={STORE_CONFIG.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => soundFx.playClick()}
                className="w-9 h-9 rounded-full apple-pill flex items-center justify-center text-apple-gray hover:text-[#25D366] transition-colors shadow-xs"
                title="WhatsApp"
              >
                <MessageCircle className="w-4 h-4" />
              </a>

              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => soundFx.playClick()}
                className="w-9 h-9 rounded-full apple-pill flex items-center justify-center text-apple-gray hover:text-pink-500 transition-colors shadow-xs"
                title="Instagram"
              >
                <InstagramIcon className="w-4 h-4" />
              </a>

              <a
                href={`tel:${STORE_CONFIG.phonePrimary}`}
                onClick={() => soundFx.playClick()}
                className="w-9 h-9 rounded-full apple-pill flex items-center justify-center text-apple-gray hover:text-[#0071e3] transition-colors shadow-xs"
                title="Phone"
              >
                <Phone className="w-4 h-4" />
              </a>

              <a
                href={STORE_CONFIG.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => soundFx.playClick()}
                className="w-9 h-9 rounded-full apple-pill flex items-center justify-center text-apple-gray hover:text-brand-gold transition-colors shadow-xs"
                title="Maps"
              >
                <MapPin className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3 text-xs">
            <h5 className="font-mono uppercase tracking-widest text-apple-text dark:text-white font-bold">Curated Pages</h5>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => handleLink("products")}
                  className="hover:text-apple-text dark:hover:text-white transition-colors"
                >
                  Featured Gadgets Catalog
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleLink("studio")}
                  className="hover:text-apple-text dark:hover:text-white transition-colors"
                >
                  3D Interactive Studio
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleLink("categories")}
                  className="hover:text-apple-text dark:hover:text-white transition-colors"
                >
                  All 8 Departments
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleLink("store")}
                  className="hover:text-apple-text dark:hover:text-white transition-colors"
                >
                  Store & Showroom Tour
                </button>
              </li>
            </ul>
          </div>

          {/* Services & In-Store */}
          <div className="space-y-3 text-xs">
            <h5 className="font-mono uppercase tracking-widest text-apple-text dark:text-white font-bold">Care & Repairs</h5>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => handleLink("contact")}
                  className="hover:text-apple-text dark:hover:text-white transition-colors"
                >
                  45-Min Screen Replacement
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleLink("contact")}
                  className="hover:text-apple-text dark:hover:text-white transition-colors"
                >
                  Original Battery Refresh
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleLink("contact")}
                  className="hover:text-apple-text dark:hover:text-white transition-colors"
                >
                  Laser Cut 3M Skins
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleLink("why-us")}
                  className="hover:text-apple-text dark:hover:text-white transition-colors"
                >
                  Warranty & Authentication
                </button>
              </li>
            </ul>
          </div>

          {/* Store Hours & Location */}
          <div className="space-y-3 text-xs">
            <h5 className="font-mono uppercase tracking-widest text-apple-text dark:text-white font-bold">Visit Showroom</h5>
            <p className="text-apple-text/80 dark:text-white/80">
              {STORE_CONFIG.address}
            </p>
            <p className="font-mono text-[11px] text-[#0071e3] dark:text-brand-gold font-bold">
              {STORE_CONFIG.timing}
            </p>
            <p className="text-[11px] text-apple-gray">
              Primary: {STORE_CONFIG.phonePrimary}
              <br />
              Alternate: {STORE_CONFIG.phoneSecondary}
            </p>
          </div>
        </div>

        {/* Bottom Copyright & Back to Top */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] font-mono text-apple-gray">
          <div className="flex items-center gap-1">
            <span>© {new Date().getFullYear()} {STORE_CONFIG.name}. All rights reserved.</span>
          </div>

          <div className="flex items-center gap-6">
            <button
              onClick={() => onReplayIntro()}
              className="hover:text-[#0071e3] dark:hover:text-brand-gold transition-colors"
            >
              Replay Intro Tour
            </button>
            <button
              onClick={scrollToTop}
              className="flex items-center gap-1 hover:text-apple-text dark:hover:text-white transition-colors text-apple-gray"
            >
              <span>Back to Top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
