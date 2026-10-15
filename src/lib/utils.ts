import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import type { Product } from "../data/storeData";
import { STORE_CONFIG, TIERS } from "../data/storeData";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPrice(amount: number): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);
}

// Generate pre-filled WhatsApp link (always uses the number in STORE_CONFIG)
export function getWhatsAppOrderUrl(productName: string, price?: number): string {
  const priceText = price ? ` (Listed at ${formatPrice(price)})` : "";
  const text = encodeURIComponent(
    `Hello Shanu’s Gadgets,\nI am interested in:\n• ${productName}${priceText}\n\nPlease share current availability and store pickup details.`
  );
  return `https://wa.me/${STORE_CONFIG.whatsappNumber}?text=${text}`;
}

// Richer message for a product: includes tier and, for used phones, the condition.
// Covers and screen guards ask for the phone model because they are model specific.
export function getProductWhatsAppUrl(product: Product): string {
  const tier = TIERS.find((t) => t.id === product.tier)?.label ?? product.tier;
  const lines = [
    "Hello Shanu’s Gadgets,",
    "I am interested in:",
    `• ${product.name} (${product.categoryLabel} · ${tier}) — ${formatPrice(product.price)}`,
  ];
  if (product.condition) {
    lines.push(`• ${product.condition.grade}, battery ${product.condition.battery}%, ${product.condition.storage}`);
  }
  if (product.category === "covers" || product.specs.some((sp) => /select your model/i.test(sp.value))) {
    lines.push("", "My phone model: ");
  }
  lines.push("", "Is it available for store pickup?");
  return `https://wa.me/${STORE_CONFIG.whatsappNumber}?text=${encodeURIComponent(lines.join("\n"))}`;
}

// Subtle Apple-style Web Audio Synthesizer (Zero External Audio File Latency)
class SoundFx {
  private ctx: AudioContext | null = null;
  public enabled: boolean = true;

  private initCtx() {
    if (!this.ctx && typeof window !== "undefined") {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === "suspended") {
      this.ctx.resume();
    }
  }

  playClick() {
    if (!this.enabled) return;
    try {
      this.initCtx();
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      
      osc.type = "sine";
      osc.frequency.setValueAtTime(800, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(300, this.ctx.currentTime + 0.03);
      
      gain.gain.setValueAtTime(0.04, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.03);
      
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      
      osc.start();
      osc.stop(this.ctx.currentTime + 0.03);
    } catch {
      // Audio autoplay policy fallback
    }
  }

  playSwoosh() {
    if (!this.enabled) return;
    try {
      this.initCtx();
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      
      osc.type = "sine";
      osc.frequency.setValueAtTime(200, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(600, this.ctx.currentTime + 0.08);
      
      gain.gain.setValueAtTime(0.03, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.08);
      
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      
      osc.start();
      osc.stop(this.ctx.currentTime + 0.08);
    } catch {
      // Audio autoplay policy fallback
    }
  }

  playChime() {
    if (!this.enabled) return;
    try {
      this.initCtx();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;
      [523.25, 659.25, 783.99, 1046.5].forEach((freq, idx) => {
        if (!this.ctx) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.frequency.setValueAtTime(freq, now + idx * 0.05);
        gain.gain.setValueAtTime(0.03, now + idx * 0.05);
        gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.05 + 0.25);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(now + idx * 0.05);
        osc.stop(now + idx * 0.05 + 0.25);
      });
    } catch {
      // Audio fallback
    }
  }
}

export const soundFx = new SoundFx();
