import React, { useState, useEffect } from "react";
import Lenis from "lenis";
import type { Product } from "./data/storeData";
import { HERO_PRODUCTS } from "./data/storeData";
import { CustomCursor } from "./components/CustomCursor";
import { CinematicIntro } from "./components/CinematicIntro";
import { Navbar, type PageRoute } from "./components/Navbar";
import { Footer } from "./components/Footer";
import { ProductDetailModal } from "./components/ProductDetailModal";
import { CartSlideOver, type CartItem } from "./components/CartSlideOver";
import { SearchModal } from "./components/SearchModal";
import { soundFx } from "./lib/utils";

// Dedicated Pages
import { HomePage } from "./pages/HomePage";
import { StorePage } from "./pages/StorePage";
import { ProductsPage } from "./pages/ProductsPage";
import { StudioPage } from "./pages/StudioPage";
import { CategoriesPage } from "./pages/CategoriesPage";
import { WhyUsPage } from "./pages/WhyUsPage";
import { ReviewsPage } from "./pages/ReviewsPage";
import { ContactPage } from "./pages/ContactPage";

export const App: React.FC = () => {
  const [showIntro, setShowIntro] = useState(true);
  const [isDark, setIsDark] = useState(false); // Default to Apple White Theme
  const [currentPage, setCurrentPage] = useState<PageRoute>("home");
  const [productCategoryFilter, setProductCategoryFilter] = useState<string | undefined>(undefined);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [studioProduct, setStudioProduct] = useState<Product>(HERO_PRODUCTS[0]);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  // Sync dark class on document element
  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDark]);

  const toggleTheme = () => {
    setIsDark((prev) => !prev);
  };

  // URL Hash Routing Sync
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace("#/", "").replace("#", "").trim();
      const validPages: PageRoute[] = [
        "home",
        "store",
        "products",
        "studio",
        "categories",
        "why-us",
        "reviews",
        "contact",
      ];

      if (validPages.includes(hash as PageRoute)) {
        setCurrentPage(hash as PageRoute);
        window.scrollTo({ top: 0, behavior: "instant" });
      } else if (!hash) {
        setCurrentPage("home");
      }
    };

    // Initial check
    handleHashChange();

    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  // Initialize Lenis smooth scroll
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 0.9,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  const navigateToPage = (page: PageRoute, category?: string) => {
    if (category) {
      setProductCategoryFilter(category);
    } else if (page !== "products") {
      setProductCategoryFilter(undefined);
    }
    setCurrentPage(page);
    window.location.hash = `/${page === "home" ? "" : page}`;
    window.scrollTo({ top: 0, behavior: "instant" });
  };

  const handleAddToCart = (product: Product) => {
    soundFx.playChime();
    setCartItems((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { product, quantity: 1 }];
    });
  };

  const handleUpdateQuantity = (productId: string, qty: number) => {
    if (qty <= 0) {
      handleRemoveFromCart(productId);
    } else {
      setCartItems((prev) =>
        prev.map((item) =>
          item.product.id === productId ? { ...item, quantity: qty } : item
        )
      );
    }
  };

  const handleRemoveFromCart = (productId: string) => {
    setCartItems((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const handleOpen3D = (product: Product) => {
    setStudioProduct(product);
    navigateToPage("studio");
  };

  const totalCartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="min-h-screen bg-white dark:bg-[#030304] text-apple-text dark:text-[#f5f5f7] selection:bg-[#0071e3]/20 selection:text-[#0071e3] relative transition-colors duration-300">
      {/* Desktop Custom Cursor */}
      <CustomCursor />

      {/* Cinematic Store Intro Experience */}
      {showIntro && (
        <CinematicIntro onComplete={() => setShowIntro(false)} />
      )}

      {/* Main Navbar with Multi-Page Navigation and Theme Toggle */}
      <Navbar
        currentPage={currentPage}
        cartCount={totalCartCount}
        isDark={isDark}
        onToggleTheme={toggleTheme}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenSearch={() => setIsSearchOpen(true)}
        onNavigatePage={navigateToPage}
        onReplayIntro={() => setShowIntro(true)}
      />

      {/* Page Routing Switcher */}
      <main className="relative min-h-[80vh]">
        {currentPage === "home" && (
          <HomePage
            onNavigatePage={navigateToPage}
            onSelectProduct={(p) => setSelectedProduct(p)}
            onAddToCart={handleAddToCart}
            onReplayIntro={() => setShowIntro(true)}
          />
        )}

        {currentPage === "store" && (
          <StorePage
            onNavigateHome={() => navigateToPage("home")}
            onNavigateProducts={() => navigateToPage("products")}
          />
        )}

        {currentPage === "products" && (
          <ProductsPage
            initialCategory={productCategoryFilter}
            onSelectProduct={(p) => setSelectedProduct(p)}
            onAddToCart={handleAddToCart}
            onOpen3D={handleOpen3D}
            onNavigateHome={() => navigateToPage("home")}
          />
        )}

        {currentPage === "studio" && (
          <StudioPage
            initialProduct={studioProduct}
            onAddToCart={handleAddToCart}
            onSelectProduct={(p) => setSelectedProduct(p)}
            onNavigateHome={() => navigateToPage("home")}
          />
        )}

        {currentPage === "categories" && (
          <CategoriesPage
            onSelectCategory={(slug) => navigateToPage("products", slug)}
            onNavigateHome={() => navigateToPage("home")}
          />
        )}

        {currentPage === "why-us" && (
          <WhyUsPage
            onNavigateHome={() => navigateToPage("home")}
            onNavigateStore={() => navigateToPage("store")}
          />
        )}

        {currentPage === "reviews" && (
          <ReviewsPage
            onNavigateHome={() => navigateToPage("home")}
            onNavigateStore={() => navigateToPage("store")}
          />
        )}

        {currentPage === "contact" && (
          <ContactPage
            onNavigateHome={() => navigateToPage("home")}
          />
        )}
      </main>

      {/* Premium Apple-Level Footer */}
      <Footer
        onNavigatePage={navigateToPage}
        onReplayIntro={() => setShowIntro(true)}
      />

      {/* Modals & Overlays */}
      <ProductDetailModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onAddToCart={handleAddToCart}
      />

      <CartSlideOver
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveFromCart}
        onClearCart={() => setCartItems([])}
      />

      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onSelectProduct={(p) => setSelectedProduct(p)}
      />
    </div>
  );
};

export default App;
