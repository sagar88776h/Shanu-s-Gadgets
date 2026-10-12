import React, { useState, useEffect, useRef } from "react";
import type { CategoryId } from "../data/storeData";
import { STORE_CONFIG, CATEGORIES } from "../data/storeData";
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
  Headphones,
  Headset,
  Plug,
  Shield,
  Box,
  ShieldCheck,
  Star,
  ChevronRight,
  ChevronDown,
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

interface NavItem {
  label: string;
  page: PageRoute;
  category?: CategoryId;
  icon: React.ReactNode;
}

const CATEGORY_ICON: Record<CategoryId, React.ReactNode> = {
  phones: <Smartphone className="w-4 h-4" />,
  airpods: <Headphones className="w-4 h-4" />,
  neckbands: <Headset className="w-4 h-4" />,
  covers: <Shield className="w-4 h-4" />,
  accessories: <Plug className="w-4 h-4" />,
};

interface NavbarProps {
  currentPage: PageRoute;
  activeCategory?: CategoryId | "all";
  cartCount: number;
  isDark: boolean;
  onToggleTheme: () => void;
  onOpenCart: () => void;
  onOpenSearch: () => void;
  onNavigatePage: (page: PageRoute, category?: string, tier?: string) => void;
  onReplayIntro: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentPage,
  activeCategory = "all",
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
  const [moreOpen, setMoreOpen] = useState(false);
  const moreRef = useRef<HTMLDivElement>(null);

  // Close the "More" menu on outside click or Escape
  useEffect(() => {
    if (!moreOpen) return;
    const onDown = (e: MouseEvent) => {
      if (moreRef.current && !moreRef.current.contains(e.target as Node)) setMoreOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMoreOpen(false);
    };
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [moreOpen]);

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

  // Five shop categories sit in the main nav so every option is one tap away.
  const navLinks: NavItem[] = [
    { label: "Home", page: "home", icon: <Home className="w-4 h-4" /> },
    ...CATEGORIES.map((c) => ({
      label: c.name,
      page: "products" as PageRoute,
      category: c.id,
      icon: CATEGORY_ICON[c.id],
    })),
    { label: "Store", page: "store", icon: <Store className="w-4 h-4" /> },
    { label: "Contact", page: "contact", icon: <Phone className="w-4 h-4" /> },
  ];

  const moreLinks: NavItem[] = [
    { label: "3D Studio", page: "studio", icon: <Box className="w-4 h-4" /> },
    { label: "Why Shanu's", page: "why-us", icon: <ShieldCheck className="w-4 h-4" /> },
    { label: "Reviews", page: "reviews", icon: <Star className="w-4 h-4" /> },
  ];

  const isLinkActive = (link: NavItem) =>
    link.category
      ? currentPage === "products" && activeCategory === link.category
      : currentPage === link.page;

  const handleLinkClick = (link: NavItem) => {
    soundFx.playClick();
    setMobileMenuOpen(false);
    setMoreOpen(false);
    onNavigatePage(link.page, link.category);
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
              onClick={() => handleLinkClick(navLinks[0])}
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
                <span className="font-extrabold text-[11px] xs:text-xs sm:text-base tracking-wide sm:tracking-wider uppercase text-apple-text dark:text-white group-hover:text-[#0071e3] dark:group-hover:text-brand-gold transition-colors truncate max-w-[165px] sm:max-w-none">
                  {STORE_CONFIG.name}
                </span>
                <span className="text-[8px] sm:text-[9px] font-mono tracking-widest text-apple-gray uppercase -mt-0.5 hidden xs:block">
                  Madhupur • Kamalasagar
                </span>
              </div>
            </button>

            {/* Center Desktop Navigation Links with animated tab indicator */}
            <nav className="hidden xl:flex items-center gap-1 p-1 rounded-full apple-glass border border-black/[0.06] dark:border-white/10 shadow-sm">
              {navLinks.map((link) => {
                const isActive = isLinkActive(link);
                return (
                  <button
                    key={link.category ?? link.page}
                    onClick={() => handleLinkClick(link)}
                    className={`relative isolate px-3 py-1.5 rounded-full text-xs font-medium tracking-tight transition-all duration-300 ${
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
            
              {/* More: 3D Studio, Why Shanu's, Reviews */}
              <div className="relative" ref={moreRef}>
                <button
                  onClick={() => {
                    soundFx.playClick();
                    setMoreOpen((o) => !o);
                  }}
                  aria-haspopup="menu"
                  aria-expanded={moreOpen}
                  className={`relative isolate px-3 py-1.5 rounded-full text-xs font-medium tracking-tight transition-all duration-300 flex items-center gap-1 ${
                    moreLinks.some((l) => l.page === currentPage)
                      ? "text-white dark:text-dark-950 font-semibold shadow-xs"
                      : "text-apple-text/70 dark:text-apple-gray hover:text-apple-text dark:hover:text-white hover:bg-black/[0.03] dark:hover:bg-white/[0.06]"
                  }`}
                >
                  {moreLinks.some((l) => l.page === currentPage) && (
                    <span className="absolute inset-0 rounded-full bg-[#0071e3] dark:bg-white -z-10 shadow-sm" />
                  )}
                  More
                  <ChevronDown className={`w-3 h-3 transition-transform duration-200 ${moreOpen ? "rotate-180" : ""}`} />
                </button>

                {moreOpen && (
                  <div
                    role="menu"
                    className="absolute right-0 top-full mt-3 w-52 rounded-2xl bg-white/95 dark:bg-[#0d0d11]/95 backdrop-blur-xl border border-black/[0.08] dark:border-white/10 shadow-xl p-1.5 z-50"
                  >
                    {moreLinks.map((link) => (
                      <button
                        key={link.page}
                        role="menuitem"
                        onClick={() => handleLinkClick(link)}
                        className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm font-medium text-left transition-colors ${
                          currentPage === link.page
                            ? "bg-[#0071e3] text-white"
                            : "text-apple-text dark:text-white hover:bg-black/[0.05] dark:hover:bg-white/[0.08]"
                        }`}
                      >
                        <span className={currentPage === link.page ? "text-white" : "text-[#0071e3] dark:text-brand-gold"}>{link.icon}</span>
                        {link.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
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
                className="w-9 h-9 sm:w-10 sm:h-10 rounded-full apple-pill flex items-center justify-center text-apple-text/70 dark:text-apple-gray hover:text-apple-text dark:hover:text-white transition-all hidden sm:flex xl:hidden 2xl:flex shadow-xs flex-shrink-0"
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
                aria-label="WhatsApp" className="hidden md:inline-flex items-center justify-center gap-1.5 w-10 h-10 2xl:w-auto 2xl:h-auto 2xl:px-3.5 2xl:py-2 rounded-full bg-[#25D366]/15 hover:bg-[#25D366]/25 border border-[#25D366]/30 text-[#128C7E] dark:text-[#25D366] text-xs font-semibold tracking-wide transition-all shadow-sm"
              >
                <MessageCircle className="w-3.5 h-3.5 fill-current" />
                <span className="hidden 2xl:inline">WhatsApp</span>
              </a>

              {/* Mobile Hamburger Toggle (Stable identical sizing) */}
              <button
                onClick={() => {
                  soundFx.playClick();
                  setMobileMenuOpen(!mobileMenuOpen);
                }}
                className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center xl:hidden transition-all shadow-xs flex-shrink-0 ${
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
        <div className="fixed inset-x-0 top-16 sm:top-20 bottom-0 z-40 bg-white/95 dark:bg-[#07070a]/95 backdrop-blur-3xl flex flex-col justify-between px-4 sm:px-6 pt-4 pb-8 xl:hidden animate-fade-in overflow-y-auto no-scrollbar">
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
              const isActive = isLinkActive(link);
              return (
                <button
                  key={link.category ?? link.page}
                  onClick={() => handleLinkClick(link)}
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

            <div className="px-2 pt-3 pb-1 text-[11px] text-apple-gray font-semibold">More</div>
            <div className="grid grid-cols-3 gap-2">
              {moreLinks.map((link) => (
                <button
                  key={link.page}
                  onClick={() => handleLinkClick(link)}
                  className={`py-2.5 px-2 rounded-xl text-xs font-semibold flex flex-col items-center gap-1.5 transition-all ${
                    currentPage === link.page
                      ? "bg-[#0071e3] text-white"
                      : "bg-black/[0.04] dark:bg-white/[0.07] text-apple-text dark:text-white hover:bg-black/[0.07]"
                  }`}
                >
                  <span className={currentPage === link.page ? "text-white" : "text-[#0071e3] dark:text-brand-gold"}>{link.icon}</span>
                  {link.label}
                </button>
              ))}
            </div>

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
