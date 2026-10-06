import React, { useEffect, useState, useRef } from "react";
import { STORE_CONFIG } from "../data/storeData";
import { soundFx } from "../lib/utils";
import { ArrowRight, Volume2, VolumeX } from "lucide-react";

interface CinematicIntroProps {
  onComplete: () => void;
  isFirstVisit?: boolean;
}

export const CinematicIntro: React.FC<CinematicIntroProps> = ({ onComplete }) => {
  const [step, setStep] = useState<number>(0);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(0);
  const timerRef = useRef<ReturnType<typeof setTimeout>[]>([]);

  useEffect(() => {
    // Step 0 -> 1: Brand Logo & Title Reveal (0.6s)
    const t1 = setTimeout(() => {
      setStep(1);
      if (!isMuted) soundFx.playChime();
    }, 600);

    // Step 1 -> 2: Tagline Reveal (2.2s)
    const t2 = setTimeout(() => {
      setStep(2);
    }, 2200);

    // Step 2 -> 3: Exterior Store Reveal & Drone Push (3.8s)
    const t3 = setTimeout(() => {
      setStep(3);
      if (!isMuted) soundFx.playSwoosh();
    }, 3800);

    // Step 3 -> 4: Camera Moves Inside / Interior Reveal (6.5s)
    const t4 = setTimeout(() => {
      setStep(4);
      if (!isMuted) soundFx.playClick();
    }, 6500);

    // Step 4 -> 5: Enter Homepage (9.0s)
    const t5 = setTimeout(() => {
      setStep(5);
      setTimeout(onComplete, 600);
    }, 9000);

    timerRef.current = [t1, t2, t3, t4, t5];

    // Progress bar ticker
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 1.2;
      });
    }, 100);

    return () => {
      timerRef.current.forEach(clearTimeout);
      clearInterval(interval);
    };
  }, [onComplete, isMuted]);

  const handleSkip = () => {
    soundFx.playClick();
    setStep(5);
    setTimeout(onComplete, 300);
  };

  const toggleSound = () => {
    setIsMuted(!isMuted);
    soundFx.enabled = isMuted;
  };

  return (
    <div
      className={`fixed inset-0 z-[100] bg-[#030304] text-[#f5f5f7] flex flex-col items-center justify-center overflow-hidden transition-opacity duration-700 select-none ${
        step === 5 ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
    >
      {/* Background Ambience Layers */}
      <div className="absolute inset-0 bg-[#030304] z-0" />
      <div className="absolute inset-0 film-grain pointer-events-none z-10" />

      {/* STEP 3: Real Storefront Banner Reveal & Push */}
      <div
        className={`absolute inset-0 z-10 transition-all duration-1000 ease-out overflow-hidden ${
          step >= 3 && step < 4
            ? "opacity-100 scale-100 filter-none"
            : step >= 4
            ? "opacity-0 scale-125 pointer-events-none"
            : "opacity-0 scale-95 pointer-events-none"
        }`}
      >
        <img
          src={STORE_CONFIG.images.banner}
          alt="Shanu's Gadgets Real Storefront"
          className="w-full h-full object-cover object-center transform transition-transform duration-[3500ms] ease-out scale-105"
          style={{
            transform: step >= 3 ? "scale(1.18) translateY(-2%)" : "scale(1.0)",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-black/70" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-transparent to-black/80" />

        <div className="absolute bottom-16 left-8 md:left-16 z-20 max-w-xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black/60 border border-white/20 text-xs font-mono uppercase tracking-widest text-brand-gold mb-3 backdrop-blur-md">
            <span className="w-2 h-2 rounded-full bg-brand-gold animate-ping" />
            Flagship Storefront • Madhupur, Kamalasagar
          </div>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white mb-2">
            Where Technology Meets Precision.
          </h2>
          <p className="text-apple-gray text-sm md:text-base font-light">
            Step into the next-generation electronics showroom designed for tech enthusiasts.
          </p>
        </div>
      </div>

      {/* STEP 4: Camera Moves Inside Showroom Reveal */}
      <div
        className={`absolute inset-0 z-20 transition-all duration-1000 ease-out overflow-hidden ${
          step >= 4
            ? "opacity-100 scale-100 filter-none"
            : "opacity-0 scale-90 pointer-events-none"
        }`}
      >
        <img
          src={STORE_CONFIG.images.interiorReal}
          alt="Shanu's Gadgets Interior Showroom"
          className="w-full h-full object-cover object-center transform transition-transform duration-[3000ms] ease-out scale-105"
          style={{
            transform: step >= 4 ? "scale(1.12)" : "scale(1.0)",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-black/70" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-transparent to-black/80" />

        <div className="absolute bottom-16 left-8 md:left-16 z-30 max-w-xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black/60 border border-white/20 text-xs font-mono uppercase tracking-widest text-[#0071e3] mb-3 backdrop-blur-md">
            <span className="w-2 h-2 rounded-full bg-[#0071e3] animate-pulse" />
            Inside The Showroom
          </div>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white mb-2">
            Touch. Feel. Experience.
          </h2>
          <p className="text-apple-gray text-sm md:text-base font-light">
            Genuine flagship devices, curated audio, express repairs, and personalized advice.
          </p>
        </div>
      </div>

      {/* STEP 0, 1, 2: Initial Official Logo & Typography Reveal */}
      <div
        className={`relative z-30 flex flex-col items-center justify-center text-center px-6 transition-all duration-700 ${
          step >= 3 ? "opacity-0 scale-95 pointer-events-none" : "opacity-100 scale-100"
        }`}
      >
        {/* Animated Official Glowing Logo Emblem */}
        <div
          className={`w-28 h-28 mb-8 rounded-full overflow-hidden border-2 border-brand-gold/90 shadow-[0_0_50px_rgba(245,166,35,0.4)] flex items-center justify-center p-0.5 bg-black transition-all duration-1000 ${
            step >= 1 ? "opacity-100 scale-100 blur-0" : "opacity-0 scale-75 blur-md"
          }`}
        >
          <img
            src={STORE_CONFIG.logo}
            alt="Official Shanu's Gadgets Logo"
            className="w-full h-full object-cover rounded-full"
          />
        </div>

        {/* Brand Headline */}
        <h1
          className={`text-5xl md:text-8xl font-black tracking-tighter uppercase mb-4 text-gradient-silver transition-all duration-1000 ease-out ${
            step >= 1 ? "opacity-100 blur-0 translate-y-0" : "opacity-0 blur-xl translate-y-6"
          }`}
        >
          SHANU’S
          <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-apple-lightgray to-apple-gray">
            GADGETS
          </span>
        </h1>

        {/* Services Line */}
        <div
          className={`text-xs md:text-sm font-mono tracking-[0.3em] uppercase text-brand-gold mb-6 transition-all duration-700 delay-100 ${
            step >= 2 ? "opacity-100 blur-0 translate-y-0" : "opacity-0 blur-md translate-y-4"
          }`}
        >
          {STORE_CONFIG.servicesLine}
        </div>

        {/* Tagline */}
        <p
          className={`text-xl md:text-3xl font-light tracking-tight text-apple-gray max-w-lg transition-all duration-700 delay-200 ${
            step >= 2 ? "opacity-100 blur-0 translate-y-0" : "opacity-0 blur-md translate-y-4"
          }`}
        >
          “{STORE_CONFIG.tagline}”
        </p>

        {/* Loading Pill Indicator */}
        <div
          className={`mt-12 flex items-center gap-3 px-4 py-2 rounded-full glass-pill transition-all duration-700 ${
            step >= 1 ? "opacity-100" : "opacity-0"
          }`}
        >
          <div className="w-32 h-1 bg-white/10 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-brand-gold to-white transition-all duration-100 ease-out"
              style={{ width: `${Math.min(progress, 100)}%` }}
            />
          </div>
          <span className="text-[11px] font-mono text-apple-gray">
            {step < 3 ? "CURATING EXPERIENCE" : step < 4 ? "ARRIVING AT STORE" : "ENTERING SHOWROOM"}
          </span>
        </div>
      </div>

      {/* Top Floating Controls: Sound Toggle and Skip Intro */}
      <div className="absolute top-6 right-6 z-40 flex items-center gap-3">
        <button
          onClick={toggleSound}
          className="px-3 py-2 rounded-full glass-pill text-xs text-apple-gray hover:text-white flex items-center gap-2 transition-all"
          title={isMuted ? "Unmute Sound" : "Mute Sound"}
        >
          {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
          <span className="hidden sm:inline font-mono">{isMuted ? "Sound Off" : "Sound On"}</span>
        </button>

        <button
          onClick={handleSkip}
          className="px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-xs font-semibold tracking-wider uppercase text-white flex items-center gap-1.5 transition-all shadow-lg hover:scale-105"
        >
          <span>Skip Intro</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Bottom Subtle Location Badge */}
      <div className="absolute bottom-6 z-40 text-center text-xs font-mono text-apple-darkgray">
        📍 {STORE_CONFIG.address}
      </div>
    </div>
  );
};
