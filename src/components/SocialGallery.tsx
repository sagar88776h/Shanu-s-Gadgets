import React from "react";
import { INSTAGRAM_POSTS, STORE_CONFIG } from "../data/storeData";
import { soundFx } from "../lib/utils";
import { Heart, ArrowUpRight } from "lucide-react";
import { InstagramIcon } from "./Icons";

export const SocialGallery: React.FC = () => {
  return (
    <section className="py-24 md:py-36 bg-[#030304] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/[0.06] border border-white/10 text-xs font-mono uppercase tracking-widest text-brand-gold mb-3">
              <InstagramIcon className="w-3.5 h-3.5" />
              Community & Feeds
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white">
              See what’s happening at Shanu’s.
            </h2>
            <p className="text-apple-gray text-sm sm:text-base font-light mt-1">
              New unboxings, store moments, customer setups, and tech updates daily.
            </p>
          </div>

          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => soundFx.playClick()}
            className="px-6 py-3 rounded-full glass-pill hover:bg-white/15 text-white font-medium text-xs sm:text-sm flex items-center gap-2 transition-all self-start md:self-auto"
          >
            <InstagramIcon className="w-4 h-4 text-pink-400" />
            <span>Follow {STORE_CONFIG.instagram}</span>
            <ArrowUpRight className="w-4 h-4 text-apple-gray" />
          </a>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {INSTAGRAM_POSTS.map((post) => (
            <div
              key={post.id}
              className="group relative aspect-square rounded-2xl overflow-hidden glass-panel border border-white/10 cursor-pointer shadow-lg"
              data-cursor-text="INSTA"
            >
              <img
                src={post.image}
                alt="Instagram post"
                className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-700 ease-out"
              />

              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-black/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-4 flex flex-col justify-between backdrop-blur-xs">
                <div className="flex items-center justify-between text-xs text-brand-gold font-mono">
                  <span>{post.date}</span>
                  <div className="flex items-center gap-1 text-pink-400">
                    <Heart className="w-3.5 h-3.5 fill-pink-400" />
                    <span>{post.likes}</span>
                  </div>
                </div>

                <p className="text-[11px] text-white/90 font-light line-clamp-3 leading-snug">
                  {post.caption}
                </p>

                <div className="flex items-center gap-1 text-[10px] font-mono text-apple-gray">
                  <span>View Post</span>
                  <ArrowUpRight className="w-3 h-3 text-brand-gold" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
