import React from "react";
import type { Product } from "../data/storeData";
import { STORE_CONFIG } from "../data/storeData";
import { formatPrice, soundFx } from "../lib/utils";
import {
  X,
  Trash2,
  Plus,
  Minus,
  ShoppingBag,
  MessageCircle,
  ShieldCheck,
} from "lucide-react";

export interface CartItem {
  product: Product;
  quantity: number;
}

interface CartSlideOverProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (productId: string, qty: number) => void;
  onRemoveItem: (productId: string) => void;
  onClearCart?: () => void;
}

export const CartSlideOver: React.FC<CartSlideOverProps> = ({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
}) => {
  if (!isOpen) return null;

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.product.price * item.quantity,
    0
  );

  const handleWhatsAppCheckout = () => {
    soundFx.playChime();
    const itemsList = cartItems
      .map(
        (item) =>
          `• ${item.product.name} (Qty: ${item.quantity}) - ${formatPrice(
            item.product.price * item.quantity
          )}`
      )
      .join("\n");

    const message = `Hello Shanu's Gadgets,\nI would like to order the following items from your store:\n\n${itemsList}\n\n*Total Subtotal:* ${formatPrice(
      subtotal
    )}\n\nPlease confirm availability and payment / in-store pickup at Madhupur.`;

    const url = `https://wa.me/${STORE_CONFIG.whatsappNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
  };

  return (
    <div className="fixed inset-0 z-[120] bg-black/60 dark:bg-black/80 backdrop-blur-md flex justify-end animate-fade-in select-none">
      <div
        className="w-full max-w-md bg-white dark:bg-[#07070a] border-l border-black/[0.08] dark:border-white/10 h-full flex flex-col justify-between shadow-2xl p-6 relative overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header */}
        <div className="flex items-center justify-between pb-4 border-b border-black/[0.06] dark:border-white/[0.08]">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-[#0071e3] dark:text-brand-gold" />
            <h3 className="text-lg font-bold text-apple-text dark:text-white tracking-tight">Your Shopping Bag</h3>
            <span className="px-2 py-0.5 rounded-full bg-blue-50 dark:bg-white/10 text-xs font-mono text-[#0071e3] dark:text-white font-bold">
              {cartItems.reduce((acc, item) => acc + item.quantity, 0)}
            </span>
          </div>

          <button
            onClick={() => {
              soundFx.playClick();
              onClose();
            }}
            className="w-8 h-8 rounded-full apple-pill flex items-center justify-center text-apple-text/70 dark:text-apple-gray hover:text-apple-text dark:hover:text-white"
            aria-label="Close cart"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Cart Items List */}
        <div className="flex-1 overflow-y-auto py-6 space-y-4 no-scrollbar">
          {cartItems.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center space-y-3 py-16">
              <div className="w-16 h-16 rounded-full bg-black/[0.03] dark:bg-white/[0.04] border border-black/[0.06] dark:border-white/10 flex items-center justify-center text-apple-gray">
                <ShoppingBag className="w-8 h-8" />
              </div>
              <h4 className="text-base font-bold text-apple-text dark:text-white">Your bag is empty</h4>
              <p className="text-xs text-apple-gray max-w-xs font-normal">
                Discover flagship phones, titanium accessories, or explore our studio audio collection.
              </p>
              <button
                onClick={() => {
                  soundFx.playClick();
                  onClose();
                }}
                className="mt-2 px-5 py-2.5 rounded-full bg-[#0071e3] hover:bg-[#0077ed] text-white font-semibold text-xs shadow-md transition-all"
              >
                Start Exploring
              </button>
            </div>
          ) : (
            cartItems.map((item) => (
              <div
                key={item.product.id}
                className="p-4 rounded-2xl apple-card dark:glass-panel border border-black/[0.06] dark:border-white/[0.06] flex items-center gap-4 group shadow-xs"
              >
                {/* Thumbnail */}
                <div className="w-16 h-16 rounded-xl bg-black/[0.03] dark:bg-black/50 border border-black/[0.06] dark:border-white/10 p-2 flex items-center justify-center flex-shrink-0">
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="w-full h-full object-contain"
                  />
                </div>

                {/* Details */}
                <div className="flex-1 min-w-0">
                  <h4 className="text-xs font-bold text-apple-text dark:text-white tracking-tight truncate">
                    {item.product.name}
                  </h4>
                  <div className="text-xs font-extrabold text-[#0071e3] dark:text-brand-gold font-mono mt-0.5">
                    {formatPrice(item.product.price)}
                  </div>

                  {/* Quantity Modifier */}
                  <div className="flex items-center gap-2 mt-2">
                    <button
                      onClick={() => {
                        soundFx.playClick();
                        onUpdateQuantity(item.product.id, item.quantity - 1);
                      }}
                      className="w-6 h-6 rounded-md bg-black/[0.05] dark:bg-white/10 flex items-center justify-center text-apple-text dark:text-white hover:bg-black/10"
                      aria-label="Decrease quantity"
                    >
                      <Minus className="w-3 h-3" />
                    </button>
                    <span className="text-xs font-mono font-bold text-apple-text dark:text-white px-1">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => {
                        soundFx.playClick();
                        onUpdateQuantity(item.product.id, item.quantity + 1);
                      }}
                      className="w-6 h-6 rounded-md bg-black/[0.05] dark:bg-white/10 flex items-center justify-center text-apple-text dark:text-white hover:bg-black/10"
                      aria-label="Increase quantity"
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>
                </div>

                {/* Remove Button */}
                <button
                  onClick={() => {
                    soundFx.playClick();
                    onRemoveItem(item.product.id);
                  }}
                  className="text-apple-gray hover:text-red-500 transition-colors p-1"
                  title="Remove"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))
          )}
        </div>

        {/* Bottom Checkout Controls */}
        {cartItems.length > 0 && (
          <div className="pt-4 border-t border-black/[0.06] dark:border-white/[0.08] space-y-4">
            {/* Subtotal */}
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono uppercase text-apple-gray">SUBTOTAL</span>
              <span className="text-xl font-extrabold text-apple-text dark:text-white">{formatPrice(subtotal)}</span>
            </div>

            <div className="flex items-center gap-2 text-[11px] text-apple-gray font-mono">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
              <span>Official Warranty & Instant In-Store Pickup</span>
            </div>

            {/* Actions */}
            <div className="space-y-2">
              <button
                onClick={handleWhatsAppCheckout}
                className="w-full py-3.5 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-black font-bold text-xs sm:text-sm tracking-tight flex items-center justify-center gap-2 shadow-md transition-all"
              >
                <MessageCircle className="w-4 h-4 fill-black" />
                <span>Order Bag via WhatsApp</span>
              </button>

              <button
                onClick={() => {
                  soundFx.playClick();
                  onClose();
                }}
                className="w-full py-3 rounded-xl apple-pill text-apple-text dark:text-white font-medium text-xs transition-all"
              >
                Continue Shopping
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
