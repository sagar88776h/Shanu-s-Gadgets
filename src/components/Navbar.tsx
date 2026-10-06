import React, { useState, useEffect } from "react";
import { STORE_CONFIG } from "../data/storeData";
import { soundFx } from "../lib/utils";
import {
  Search,
  ShoppingBag,
  Menu,
  X,
  Volume2,
  VolumeX,
  Phone,
  MessageCircle,
  MapPin,
  Compass,
  Sun,
  Moon,
} from "lucide-react";

export type PageRoute =
  | "home"
  | "store"
  | "products"
  | "studio"
  | "categories"
  | "why-us"
  | "reviews"
  | "contact";

interface NavbarProps {
  currentPage: PageRoute;
  cartCount: number;
  isDark: boolean;
  onToggleTheme: () => void;
  onOpenCart: () => void;
  onOpenSearch: () => void;
  onNavigatePage: (page: PageRoute, category?: string) => void;
  onReplayIntro: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentPage,
  cartCount,
  isDark,
  onToggleTheme,
  onOpenCart,
  onOpenSearch,
  onNavigatePage,
  onReplayIntro,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

      if (currentScrollY > 180) {
        if (currentScrollY > lastScrollY && !mobileMenuOpen) {
          setIsVisible(false);
        } else {
          setIsVisible(true);
        }
      } else {
        setIsVisible(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY, mobileMenuOpen]);

  const toggleSound = () => {
    const newState = !soundEnabled;
    setSoundEnabled(newState);
    soundFx.enabled = newState;
    if (newState) soundFx.playClick();
  };

  const navLinks: { label: string; page: PageRoute }[] = [
    { label: "Home", page: "home" },
    { label: "Store", page: "store" },
    { label: "Gadgets", page: "products" },
    { label: "3D Studio", page: "studio" },
    { label: "Categories", page: "categories" },
    { label: "Why Shanu's", page: "why-us" },
    { label: "Reviews", page: "reviews" },
    { label: "Contact", page: "contact" },
  ];

  const handleLinkClick = (page: PageRoute) => {
    soundFx.playClick();
    setMobileMenuOpen(false);
    onNavigatePage(page);
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isVisible ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"
        } ${
          isScrolled
            ? "py-3 bg-white/85 dark:bg-[#07070a]/85 backdrop-blur-2xl border-b border-black/[0.06] dark:border-white/[0.08] shadow-sm dark:shadow-2xl"
            : "py-5 bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Left: Brand Logo & Official Image Emblem */}
            <button
              onClick={() => handleLinkClick("home")}
              className="flex items-center gap-3 group text-left"
              data-cursor-text="HOME"
            >
              <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-brand-gold/60 dark:border-brand-gold shadow-md group-hover:scale-105 transition-transform duration-300 flex-shrink-0 bg-black">
                <img
                  src={STORE_CONFIG.logo}
                  alt="Shanu's Gadgets Logo"
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="flex flex-col text-left">
                <span className="font-extrabold text-sm sm:text-base tracking-wider uppercase text-apple-text dark:text-white group-hover:text-[#0071e3] dark:group-hover:text-brand-gold transition-colors">
                  {STORE_CONFIG.name}
                </span>
                <span className="text-[9px] font-mono tracking-widest text-apple-gray uppercase -mt-0.5 hidden sm:block">
                  Madhupur • Kamalasagar
                </span>
              </div>
            </button>

            {/* Center Desktop Navigation Links with animated tab indicator */}
            <nav className="hidden lg:flex items-center gap-1 p-1 rounded-full apple-glass border border-black/[0.06] dark:border-white/10 shadow-sm">
              {navLinks.map((link) => {
                const isActive = currentPage === link.page;
                return (
                  <button
                    key={link.page}
                    onClick={() => handleLinkClick(link.page)}
                    className={`relative px-3.5 py-1.5 rounded-full text-xs font-medium tracking-tight transition-all duration-300 ${
                      isActive
                        ? "text-white dark:text-dark-950 font-semibold shadow-xs"
                        : "text-apple-text/70 dark:text-apple-gray hover:text-apple-text dark:hover:text-white hover:bg-black/[0.03] dark:hover:bg-white/[0.06]"
                    }`}
                  >
                    {isActive && (
                      <span className="absolute inset-0 rounded-full bg-[#0071e3] dark:bg-white -z-10 shadow-sm animate-scale-in" />
                    )}
                    {link.label}
                  </button>
                );
              })}
            </nav>

            {/* Right Action Icons */}
            <div className="flex items-center gap-2 sm:gap-3">
              {/* Theme Toggle Button */}
              <button
                onClick={() => {
                  soundFx.playClick();
                  onToggleTheme();
                }}
                className="w-9 h-9 rounded-full apple-pill flex items-center justify-center text-apple-text dark:text-apple-gray hover:text-[#0071e3] dark:hover:text-white transition-all shadow-xs"
                title={isDark ? "Switch to Apple White Theme" : "Switch to Dark Theme"}
                aria-label="Toggle Theme"
              >
                {isDark ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-apple-text" />}
              </button>

              {/* Sound Effect Toggle */}
              <button
                onClick={toggleSound}
                className="w-9 h-9 rounded-full apple-pill flex items-center justify-center text-apple-text/70 dark:text-apple-gray hover:text-apple-text dark:hover:text-white transition-all hidden sm:flex shadow-xs"
                title={soundEnabled ? "Audio Cues Enabled" : "Audio Muted"}
                aria-label="Toggle Sound Effects"
              >
                {soundEnabled ? <Volume2 className="w-4 h-4 text-brand-gold" /> : <VolumeX className="w-4 h-4" />}
              </button>

              {/* Search Modal Trigger */}
              <button
                onClick={() => {
                  soundFx.playClick();
                  onOpenSearch();
                }}
                className="w-9 h-9 rounded-full apple-pill flex items-center justify-center text-apple-text/70 dark:text-apple-gray hover:text-apple-text dark:hover:text-white transition-all shadow-xs"
                title="Search Gadgets"
                aria-label="Search"
              >
                <Search className="w-4 h-4" />
              </button>

              {/* Shopping Bag / Cart */}
              <button
                onClick={() => {
                  soundFx.playClick();
                  onOpenCart();
                }}
                className="relative w-9 h-9 rounded-full apple-pill flex items-center justify-center text-apple-text dark:text-white hover:bg-black/[0.08] dark:hover:bg-white/15 transition-all shadow-xs"
                title="Shopping Bag"
                aria-label="Cart"
              >
                <ShoppingBag className="w-4 h-4" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#0071e3] text-white font-bold text-[10px] flex items-center justify-center animate-bounce">
                    {cartCount}
                  </span>
                )}
              </button>

              {/* WhatsApp Quick Link */}
              <a
                href={STORE_CONFIG.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => soundFx.playClick()}
                className="hidden md:inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#25D366]/15 hover:bg-[#25D366]/25 border border-[#25D366]/30 text-[#128C7E] dark:text-[#25D366] text-xs font-semibold tracking-wide transition-all shadow-sm"
              >
                <MessageCircle className="w-3.5 h-3.5 fill-current" />
                <span>WhatsApp</span>
              </a>

              {/* Mobile Hamburger Toggle */}
              <button
                onClick={() => {
                  soundFx.playClick();
                  setMobileMenuOpen(!mobileMenuOpen);
                }}
                className="w-9 h-9 rounded-full apple-pill flex items-center justify-center text-apple-text dark:text-apple-gray hover:text-apple-text dark:hover:text-white lg:hidden transition-all shadow-xs"
                aria-label="Toggle Mobile Menu"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Fullscreen Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-white/95 dark:bg-[#030304]/95 backdrop-blur-3xl flex flex-col justify-between px-6 pt-24 pb-10 lg:hidden animate-fade-in select-none">
          <div className="flex flex-col space-y-4">
            <div className="flex items-center gap-3 mb-2">
              <img
                src={STORE_CONFIG.logo}
                alt="Logo"
                className="w-8 h-8 rounded-full border border-brand-gold"
              />
              <span className="text-[11px] font-mono tracking-widest text-brand-gold uppercase">
                Navigation Menu
              </span>
            </div>
            {navLinks.map((link, idx) => {
              const isActive = currentPage === link.page;
              return (
                <button
                  key={link.page}
                  onClick={() => handleLinkClick(link.page)}
                  className={`text-left text-2xl font-bold tracking-tight transition-colors py-1 flex items-center justify-between border-b border-black/[0.06] dark:border-white/[0.06] ${
                    isActive
                      ? "text-[#0071e3] dark:text-brand-gold"
                      : "text-apple-text dark:text-white hover:text-[#0071e3]"
                  }`}
                >
                  <span>{link.label}</span>
                  <span className="text-xs font-mono text-apple-gray">0{idx + 1}</span>
                </button>
              );
            })}

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onReplayIntro();
              }}
              className="text-left text-sm font-mono text-apple-gray hover:text-apple-text dark:hover:text-white pt-2 flex items-center gap-2"
            >
              <Compass className="w-4 h-4 text-brand-gold" />
              <span>Replay Store Drone Tour</span>
            </button>
          </div>

          <div className="space-y-4 pt-6 border-t border-black/[0.08] dark:border-white/10">
            <div className="flex items-center justify-between text-xs text-apple-gray">
              <span className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-brand-gold" />
                Madhupur, Kamalasagar
              </span>
              <span className="flex items-center gap-1.5">
                <Phone className="w-3.5 h-3.5 text-[#0071e3]" />
                +91 70058 38381
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <a
                href={STORE_CONFIG.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 rounded-xl bg-[#25D366] text-black font-semibold text-xs flex items-center justify-center gap-2 shadow-md"
              >
                <MessageCircle className="w-4 h-4 fill-black" />
                <span>WhatsApp Store</span>
              </a>
              <a
                href={`tel:${STORE_CONFIG.phonePrimary}`}
                className="w-full py-3 rounded-xl bg-black/5 dark:bg-white/10 border border-black/10 dark:border-white/20 text-apple-text dark:text-white font-semibold text-xs flex items-center justify-center gap-2"
              >
                <Phone className="w-4 h-4" />
                <span>Call Store</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
