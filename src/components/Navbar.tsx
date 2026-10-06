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
  Home,
  Store,
  Smartphone,
  Box,
  Layers,
  ShieldCheck,
  Star,
  ChevronRight,
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

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

      if (currentScrollY > 150) {
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

  const navLinks: { label: string; page: PageRoute; icon: React.ReactNode }[] = [
    { label: "Home", page: "home", icon: <Home className="w-4 h-4" /> },
    { label: "Store", page: "store", icon: <Store className="w-4 h-4" /> },
    { label: "Gadgets", page: "products", icon: <Smartphone className="w-4 h-4" /> },
    { label: "3D Studio", page: "studio", icon: <Box className="w-4 h-4" /> },
    { label: "Categories", page: "categories", icon: <Layers className="w-4 h-4" /> },
    { label: "Why Shanu's", page: "why-us", icon: <ShieldCheck className="w-4 h-4" /> },
    { label: "Reviews", page: "reviews", icon: <Star className="w-4 h-4" /> },
    { label: "Contact", page: "contact", icon: <Phone className="w-4 h-4" /> },
  ];

  const handleLinkClick = (page: PageRoute) => {
    soundFx.playClick();
    setMobileMenuOpen(false);
    onNavigatePage(page);
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 h-16 sm:h-20 transition-all duration-300 flex items-center ${
          isVisible ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"
        } ${
          isScrolled || mobileMenuOpen
            ? "bg-white/90 dark:bg-[#07070a]/90 backdrop-blur-2xl border-b border-black/[0.06] dark:border-white/[0.08] shadow-sm"
            : "bg-white/70 dark:bg-[#030304]/70 sm:bg-transparent backdrop-blur-lg sm:backdrop-blur-none"
        }`}
      >
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 w-full">
          <div className="flex items-center justify-between h-full">
            {/* Left: Brand Logo & Official Image Emblem */}
            <button
              onClick={() => handleLinkClick("home")}
              className="flex items-center gap-2.5 sm:gap-3 group text-left flex-shrink-0"
              data-cursor-text="HOME"
            >
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full overflow-hidden border-2 border-brand-gold/70 shadow-md group-hover:scale-105 transition-transform duration-300 flex-shrink-0 bg-black">
                <img
                  src={STORE_CONFIG.logo}
                  alt="Shanu's Gadgets Logo"
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="flex flex-col text-left">
                <span className="font-extrabold text-xs sm:text-base tracking-wider uppercase text-apple-text dark:text-white group-hover:text-[#0071e3] dark:group-hover:text-brand-gold transition-colors truncate max-w-[130px] sm:max-w-none">
                  {STORE_CONFIG.name}
                </span>
                <span className="text-[8px] sm:text-[9px] font-mono tracking-widest text-apple-gray uppercase -mt-0.5 hidden xs:block">
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

            {/* Right Action Icons (Uniform size across all devices) */}
            <div className="flex items-center gap-1.5 sm:gap-2.5">
              {/* Theme Toggle Button */}
              <button
                onClick={() => {
                  soundFx.playClick();
                  onToggleTheme();
                }}
                className="w-9 h-9 sm:w-10 sm:h-10 rounded-full apple-pill flex items-center justify-center text-apple-text dark:text-apple-gray hover:text-[#0071e3] dark:hover:text-white transition-all shadow-xs flex-shrink-0"
                title={isDark ? "Switch to Apple White Theme" : "Switch to Dark Theme"}
                aria-label="Toggle Theme"
              >
                {isDark ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-apple-text" />}
              </button>

              {/* Sound Effect Toggle (Desktop / Tablet) */}
              <button
                onClick={toggleSound}
                className="w-9 h-9 sm:w-10 sm:h-10 rounded-full apple-pill flex items-center justify-center text-apple-text/70 dark:text-apple-gray hover:text-apple-text dark:hover:text-white transition-all hidden sm:flex shadow-xs flex-shrink-0"
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
                className="w-9 h-9 sm:w-10 sm:h-10 rounded-full apple-pill flex items-center justify-center text-apple-text/70 dark:text-apple-gray hover:text-apple-text dark:hover:text-white transition-all shadow-xs flex-shrink-0"
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
                className="relative w-9 h-9 sm:w-10 sm:h-10 rounded-full apple-pill flex items-center justify-center text-apple-text dark:text-white hover:bg-black/[0.08] dark:hover:bg-white/15 transition-all shadow-xs flex-shrink-0"
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

              {/* WhatsApp Quick Link (Desktop) */}
              <a
                href={STORE_CONFIG.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => soundFx.playClick()}
                className="hidden md:inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-[#25D366]/15 hover:bg-[#25D366]/25 border border-[#25D366]/30 text-[#128C7E] dark:text-[#25D366] text-xs font-semibold tracking-wide transition-all shadow-sm"
              >
                <MessageCircle className="w-3.5 h-3.5 fill-current" />
                <span>WhatsApp</span>
              </a>

              {/* Mobile Hamburger Toggle (Stable identical sizing) */}
              <button
                onClick={() => {
                  soundFx.playClick();
                  setMobileMenuOpen(!mobileMenuOpen);
                }}
                className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center lg:hidden transition-all shadow-xs flex-shrink-0 ${
                  mobileMenuOpen
                    ? "bg-[#0071e3] text-white"
                    : "apple-pill text-apple-text dark:text-apple-gray"
                }`}
                aria-label="Toggle Mobile Menu"
              >
                {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Fullscreen Mobile Drawer Menu - Stays perfectly anchored beneath header without resizing navbar */}
      {mobileMenuOpen && (
        <div className="fixed inset-x-0 top-16 sm:top-20 bottom-0 z-40 bg-white/95 dark:bg-[#07070a]/95 backdrop-blur-3xl flex flex-col justify-between px-4 sm:px-6 pt-4 pb-8 lg:hidden animate-fade-in overflow-y-auto no-scrollbar">
          {/* Menu Items List */}
          <div className="flex flex-col space-y-1.5 max-w-lg mx-auto w-full">
            <div className="flex items-center justify-between px-2 py-1 mb-2">
              <span className="text-[10px] font-mono tracking-widest text-[#0071e3] dark:text-brand-gold uppercase font-semibold">
                Explore Shanu’s Gadgets
              </span>
              <span className="text-[10px] font-mono text-apple-gray">
                Madhupur • Kamalasagar
              </span>
            </div>

            {navLinks.map((link) => {
              const isActive = currentPage === link.page;
              return (
                <button
                  key={link.page}
                  onClick={() => handleLinkClick(link.page)}
                  className={`w-full py-3 px-4 rounded-2xl font-bold tracking-tight text-base sm:text-lg flex items-center justify-between transition-all duration-200 text-left ${
                    isActive
                      ? "bg-[#0071e3] text-white shadow-md"
                      : "text-apple-text dark:text-white hover:bg-black/[0.04] dark:hover:bg-white/[0.08] active:scale-[0.98]"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className={isActive ? "text-white" : "text-[#0071e3] dark:text-brand-gold"}>
                      {link.icon}
                    </span>
                    <span>{link.label}</span>
                  </div>
                  <ChevronRight className={`w-4 h-4 ${isActive ? "text-white" : "text-apple-gray"}`} />
                </button>
              );
            })}

            {/* Replay Intro Tour Button */}
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onReplayIntro();
              }}
              className="w-full py-2.5 px-4 rounded-xl text-xs font-mono text-apple-gray hover:text-apple-text dark:hover:text-white flex items-center gap-2 mt-2"
            >
              <Compass className="w-4 h-4 text-brand-gold" />
              <span>Replay Store Drone Tour</span>
            </button>
          </div>

          {/* Bottom Store Info & Action Buttons */}
          <div className="space-y-3 pt-4 mt-6 border-t border-black/[0.08] dark:border-white/10 max-w-lg mx-auto w-full">
            <div className="flex items-center justify-between text-[11px] text-apple-gray">
              <span className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-brand-gold" />
                Madhupur, Kamalasagar
              </span>
              <span className="font-mono text-[#0071e3] dark:text-brand-gold font-medium">
                10:00 AM – 9:30 PM
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2.5">
              <a
                href={STORE_CONFIG.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => soundFx.playClick()}
                className="py-3 rounded-2xl bg-[#25D366] text-black font-bold text-xs flex items-center justify-center gap-2 shadow-sm active:scale-95 transition-all"
              >
                <MessageCircle className="w-4 h-4 fill-black" />
                <span>WhatsApp Store</span>
              </a>
              <a
                href={`tel:${STORE_CONFIG.phonePrimary}`}
                className="py-3 rounded-2xl bg-black/5 dark:bg-white/10 border border-black/10 dark:border-white/20 text-apple-text dark:text-white font-bold text-xs flex items-center justify-center gap-2 active:scale-95 transition-all"
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
