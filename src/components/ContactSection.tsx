import React, { useState } from "react";
import { STORE_CONFIG } from "../data/storeData";
import { soundFx } from "../lib/utils";
import confetti from "canvas-confetti";
import {
  MessageCircle,
  Phone,
  Send,
  Sparkles,
  CheckCircle2,
  Clock,
  Navigation,
} from "lucide-react";

export const ContactSection: React.FC = () => {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    service: "Gadget Inquiry",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    soundFx.playChime();
    setSubmitted(true);

    try {
      confetti({
        particleCount: 60,
        spread: 70,
        origin: { y: 0.7 },
        colors: ["#0071e3", "#f5a623", "#ffffff"],
      });
    } catch {
      // Confetti fallback
    }

    const msg = `Hello Shanu's Gadgets,\n\nName: ${form.name}\nPhone: ${form.phone}\nService Interested: ${form.service}\nMessage: ${form.message}`;
    const url = `https://wa.me/${STORE_CONFIG.whatsappNumber}?text=${encodeURIComponent(msg)}`;

    setTimeout(() => {
      window.open(url, "_blank");
    }, 800);
  };

  return (
    <section id="contact" className="py-24 md:py-36 bg-white dark:bg-[#030304] border-t border-black/[0.06] dark:border-white/[0.06] relative overflow-hidden transition-colors duration-300">
      {/* Background Ambience */}
      <div className="absolute top-1/2 left-1/3 -translate-y-1/2 w-[700px] h-[500px] bg-blue-100/30 dark:bg-brand-gold/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Direct Contacts */}
          <div className="lg:col-span-6 space-y-8">
            <div>
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full apple-pill text-xs font-mono uppercase tracking-widest text-[#0071e3] dark:text-brand-gold mb-4 shadow-xs">
                <Sparkles className="w-3.5 h-3.5" />
                Direct Communication
              </div>
              <div className="floating-font">
                <h2 className="text-4xl sm:text-6xl font-black tracking-tight text-apple-text dark:text-white mb-4">
                  Let’s find the right technology for you.
                </h2>
              </div>
              <p className="text-apple-gray text-base sm:text-lg font-normal leading-relaxed floating-font-delayed">
                Whether you want to check live stock, schedule an express repair, or ask for gadget recommendations, we are always ready.
              </p>
            </div>

            {/* Quick Connect Action Buttons */}
            <div className="grid grid-cols-2 gap-4">
              <a
                href={STORE_CONFIG.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => soundFx.playClick()}
                className="p-5 rounded-2xl bg-[#25D366]/10 hover:bg-[#25D366]/20 border border-[#25D366]/30 text-apple-text dark:text-white transition-all group flex flex-col justify-between aspect-[16/10] shadow-sm"
              >
                <div className="flex items-center justify-between">
                  <MessageCircle className="w-6 h-6 text-[#128C7E] dark:text-[#25D366]" />
                  <span className="text-[10px] font-mono text-[#128C7E] dark:text-[#25D366] font-bold">INSTANT</span>
                </div>
                <div>
                  <h4 className="font-bold text-sm text-apple-text dark:text-white group-hover:text-[#128C7E] transition-colors">
                    WhatsApp Chat
                  </h4>
                  <p className="text-[11px] text-apple-gray">{STORE_CONFIG.phonePrimary}</p>
                </div>
              </a>

              <a
                href={`tel:${STORE_CONFIG.phonePrimary}`}
                onClick={() => soundFx.playClick()}
                className="p-5 rounded-2xl apple-card dark:glass-card border border-black/[0.06] dark:border-white/10 text-apple-text dark:text-white transition-all group flex flex-col justify-between aspect-[16/10] shadow-sm"
              >
                <div className="flex items-center justify-between">
                  <Phone className="w-6 h-6 text-[#0071e3] dark:text-brand-neon" />
                  <span className="text-[10px] font-mono text-apple-gray font-semibold">DIRECT CALL</span>
                </div>
                <div>
                  <h4 className="font-bold text-sm text-apple-text dark:text-white group-hover:text-[#0071e3] transition-colors">
                    Call Store
                  </h4>
                  <p className="text-[11px] text-apple-gray">{STORE_CONFIG.phoneSecondary}</p>
                </div>
              </a>

              <a
                href={STORE_CONFIG.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => soundFx.playClick()}
                className="p-5 rounded-2xl apple-card dark:glass-card border border-black/[0.06] dark:border-white/10 text-apple-text dark:text-white transition-all group flex flex-col justify-between aspect-[16/10] shadow-sm"
              >
                <div className="flex items-center justify-between">
                  <Navigation className="w-6 h-6 text-brand-gold" />
                  <span className="text-[10px] font-mono text-brand-gold font-semibold">MAPS</span>
                </div>
                <div>
                  <h4 className="font-bold text-sm text-apple-text dark:text-white group-hover:text-brand-gold transition-colors">
                    Get Directions
                  </h4>
                  <p className="text-[11px] text-apple-gray">Madhupur, Kamalasagar</p>
                </div>
              </a>

              <div className="p-5 rounded-2xl apple-card dark:glass-card border border-black/[0.06] dark:border-white/10 text-apple-text dark:text-white flex flex-col justify-between aspect-[16/10] shadow-sm">
                <div className="flex items-center justify-between">
                  <Clock className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
                  <span className="text-[10px] font-mono text-emerald-600 dark:text-emerald-400 font-bold">7 DAYS</span>
                </div>
                <div>
                  <h4 className="font-bold text-sm text-apple-text dark:text-white">Store Timings</h4>
                  <p className="text-[11px] text-apple-gray">10:00 AM – 09:30 PM</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Clean Minimal Contact Form */}
          <div className="lg:col-span-6">
            <div className="rounded-3xl apple-card dark:glass-card border border-black/[0.06] dark:border-white/10 p-8 sm:p-10 shadow-xl">
              <h3 className="text-2xl font-bold text-apple-text dark:text-white tracking-tight mb-2">
                Send a Direct Message
              </h3>
              <p className="text-xs text-apple-gray font-normal mb-6">
                Fill in the details below. It will automatically prepare a verified WhatsApp ticket for our specialists.
              </p>

              {submitted ? (
                <div className="p-8 rounded-2xl bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/30 text-center space-y-3 animate-fade-in">
                  <CheckCircle2 className="w-12 h-12 text-emerald-600 dark:text-emerald-400 mx-auto" />
                  <h4 className="text-xl font-bold text-apple-text dark:text-white">Connecting via WhatsApp</h4>
                  <p className="text-xs text-apple-gray">
                    Thank you, {form.name}! Your message has been prepared. Our store specialist will respond immediately.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="px-5 py-2 rounded-full apple-pill text-xs text-apple-text dark:text-white"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="text-[11px] font-mono uppercase tracking-wider text-apple-gray block mb-1">
                      Your Full Name
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Debashis Roy"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-black/[0.02] dark:bg-black/50 border border-black/10 dark:border-white/10 text-apple-text dark:text-white text-sm focus:outline-none focus:border-[#0071e3] transition-colors placeholder:text-apple-gray"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-[11px] font-mono uppercase tracking-wider text-apple-gray block mb-1">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="+91 9876543210"
                        value={form.phone}
                        onChange={(e) => setForm({ ...form, phone: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-black/[0.02] dark:bg-black/50 border border-black/10 dark:border-white/10 text-apple-text dark:text-white text-sm focus:outline-none focus:border-[#0071e3] transition-colors placeholder:text-apple-gray"
                      />
                    </div>

                    <div>
                      <label className="text-[11px] font-mono uppercase tracking-wider text-apple-gray block mb-1">
                        Service Interest
                      </label>
                      <select
                        value={form.service}
                        onChange={(e) => setForm({ ...form, service: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-black/[0.02] dark:bg-black/50 border border-black/10 dark:border-white/10 text-apple-text dark:text-white text-sm focus:outline-none focus:border-[#0071e3] transition-colors"
                      >
                        <option value="Flagship Smartphone Purchase">Flagship Smartphone</option>
                        <option value="Studio Audio & Headphones">Studio Audio & Headphones</option>
                        <option value="Express Screen/Battery Repair">Express Screen/Battery Repair</option>
                        <option value="Custom Laser Skins & Graphics">Custom Laser Skins & Graphics</option>
                        <option value="MagSafe & Fast Chargers">MagSafe & Fast Chargers</option>
                        <option value="General Store Visit">General Store Visit</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="text-[11px] font-mono uppercase tracking-wider text-apple-gray block mb-1">
                      Your Message / Gadget Details
                    </label>
                    <textarea
                      rows={4}
                      required
                      placeholder="Let us know what device model or accessories you're looking for..."
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-black/[0.02] dark:bg-black/50 border border-black/10 dark:border-white/10 text-apple-text dark:text-white text-sm focus:outline-none focus:border-[#0071e3] transition-colors placeholder:text-apple-gray resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 rounded-xl bg-[#0071e3] hover:bg-[#0077ed] text-white font-bold text-sm tracking-tight transition-all duration-300 shadow-md flex items-center justify-center gap-2 hover:scale-[1.01]"
                  >
                    <Send className="w-4 h-4" />
                    <span>Send Message via WhatsApp</span>
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
