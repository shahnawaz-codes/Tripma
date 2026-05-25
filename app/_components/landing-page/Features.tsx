"use client";
import React from "react";
import {
  Compass,
  Map,
  DollarSign,
  Share2,
  Zap,
  Sliders,
  ArrowRight,
} from "lucide-react";
import { motion } from "motion/react";
import Link from "next/link";

const FEATURE_LIST = [
  {
    icon: <Zap className="w-5 h-5 text-orange-500" />,
    title: "AI Itinerary Engine",
    description:
      "Generate customized daily itineraries optimized by travel time, opening hours, and personal preferences in seconds.",
    size: "md:col-span-3",
    badge: "Most Popular",
    visual: (
      <div className="mt-6 bg-slate-950 text-slate-400 p-4 rounded-xl font-mono text-xs border border-slate-800/80 shadow-inner relative overflow-hidden h-[130px] flex flex-col justify-between">
        <div className="flex items-center gap-1.5 border-b border-slate-900 pb-2 text-[10px] text-slate-500">
          <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse"></span>
          <span>tripma-ai-core v2.0.4</span>
        </div>
        <div className="space-y-1.5 flex-1 py-2 text-slate-300">
          <p className="text-[10px] text-slate-500">
            &gt; Initializing travel model...
          </p>
          <p className="text-[11px] text-orange-400">
            <span className="text-slate-500">Prompt:</span> Plan 4 days in Rome,
            family-friendly, budget $200/day
          </p>
          <p className="text-[11px] text-emerald-400 leading-normal">
            &gt; Optimal schedule generated: Day 1 Colosseum, Day 2 Vatican
            City...
          </p>
        </div>
        <div className="absolute right-4 bottom-4 opacity-10">
          <Zap className="w-20 h-20 text-white" />
        </div>
      </div>
    ),
  },
  {
    icon: <Map className="w-5 h-5 text-blue-500" />,
    title: "Interactive 3D Globe",
    description:
      "Visualize routes, accommodations, and tourist spots on an interactive 3D map to map out your journey.",
    size: "md:col-span-3",
    badge: "Immersive",
    visual: (
      <div className="mt-6 bg-gradient-to-br from-blue-900/10 to-indigo-900/20 border border-blue-200/20 dark:border-blue-900/30 rounded-xl p-4 h-[130px] flex items-center justify-center relative overflow-hidden">
        <div
          className="w-20 h-20 rounded-full border-2 border-dashed border-blue-500/30 flex items-center justify-center animate-spin"
          style={{ animationDuration: "12s" }}
        >
          <div className="w-14 h-14 rounded-full border-2 border-blue-400/40 flex items-center justify-center">
            <Compass className="w-6 h-6 text-blue-500 animate-pulse" />
          </div>
        </div>
        {/* Floating route indicators */}
        <div className="absolute top-4 left-6 bg-white/80 dark:bg-slate-900/80 px-2 py-1 rounded-md text-[9px] border shadow-xs">
          📍 Colosseum
        </div>
        <div className="absolute bottom-4 right-6 bg-white/80 dark:bg-slate-900/80 px-2 py-1 rounded-md text-[9px] border shadow-xs">
          📍 Trevi Fountain
        </div>
        <div className="w-16 h-0.5 bg-blue-500/40 absolute rotate-12"></div>
      </div>
    ),
  },
  {
    icon: <DollarSign className="w-5 h-5 text-emerald-500" />,
    title: "Smart Cost Estimator",
    description:
      "Keep budgeting simple. Get automatic estimates for lodging, local transport, dining, and sightseeing fees.",
    size: "md:col-span-2",
    badge: "Budget-Friendly",
    visual: (
      <div className="mt-6 bg-card border rounded-xl p-4 h-[120px] flex flex-col justify-between">
        <div className="flex justify-between items-center text-xs">
          <span className="text-muted-foreground">Budget Cap</span>
          <span className="font-semibold text-foreground">$1,500</span>
        </div>
        <div className="space-y-1.5">
          <div className="w-full bg-muted h-2 rounded-full overflow-hidden">
            <div className="bg-emerald-500 h-full w-[78%]"></div>
          </div>
          <div className="flex justify-between text-[10px] text-muted-foreground">
            <span>Spend: $1,170</span>
            <span>78%</span>
          </div>
        </div>
        <div className="flex gap-2">
          <span className="text-[9px] px-1.5 py-0.5 rounded bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400 font-semibold font-mono">
            🏨 Hotel: $640
          </span>
          <span className="text-[9px] px-1.5 py-0.5 rounded bg-emerald-100 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 font-semibold font-mono">
            🍜 Food: $380
          </span>
        </div>
      </div>
    ),
  },
  {
    icon: <Sliders className="w-5 h-5 text-purple-500" />,
    title: "Tailored Travel Styles",
    description:
      "Whether you're a foodie, an outdoor adventurer, a history buff, or seeking a quiet retreat, customize your experience.",
    size: "md:col-span-2",
    badge: "Personalized",
    visual: (
      <div className="mt-6 flex flex-wrap gap-2 justify-center py-2">
        {[
          "🍜 Foodie",
          "🏔️ Adventure",
          "🏛️ History",
          "🏖️ Relaxation",
          "👨‍👩‍👧 Family",
          "🛍️ Shopping",
        ].map((vibe, idx) => (
          <span
            key={idx}
            className="text-xs bg-white dark:bg-slate-800 border hover:border-primary/50 px-3 py-1.5 rounded-full shadow-xs cursor-pointer select-none transition-all hover:scale-105 active:scale-95"
          >
            {vibe}
          </span>
        ))}
      </div>
    ),
  },
  {
    icon: <Share2 className="w-5 h-5 text-amber-500" />,
    title: "Easy Export & Sharing",
    description:
      "Export itineraries to PDF, sync directly to your Google Calendar, or share dynamic viewing links with family and friends.",
    size: "md:col-span-2",
    badge: "Collaborative",
    visual: (
      <div className="mt-6 bg-card border rounded-xl p-3 h-[120px] flex flex-col justify-between">
        <div className="flex items-center justify-between border-b pb-2">
          <span className="text-[10px] text-muted-foreground">
            Share Options
          </span>
          <span className="text-[9px] text-amber-600 bg-amber-50 dark:bg-amber-950/40 px-1 rounded font-bold">
            Public Link
          </span>
        </div>
        <div className="flex items-center gap-2 bg-muted/40 p-1.5 rounded border border-dashed text-[10px] text-muted-foreground select-none truncate">
          <span>tripma.ai/share/tokyo-trip-9892</span>
        </div>
        <button className="w-full bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 text-[10px] py-1.5 rounded-lg font-semibold hover:opacity-90 transition-all flex items-center justify-center gap-1">
          <Share2 className="w-3 h-3" /> Copy Shareable Link
        </button>
      </div>
    ),
  },
];

function Features() {
  return (
    <section
      className="py-20 bg-muted/20 border-y border-border/40 relative overflow-hidden"
      id="features-section"
    >
      {/* Decorative backdrop */}
      <div className="absolute top-1/2 left-0 w-[300px] h-[300px] bg-primary/5 rounded-full blur-3xl opacity-50 -z-10"></div>
      <div className="absolute bottom-0 right-0 w-[300px] h-[300px] bg-orange-500/5 rounded-full blur-3xl opacity-50 -z-10"></div>

      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary mb-4 text-xs font-semibold"
          >
            <span>Core Capabilities</span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl md:text-5xl font-extrabold tracking-tight mb-4"
          >
            Smarter planning. Better travel.
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-muted-foreground text-lg max-w-2xl mx-auto"
          >
            Everything you need to craft, budget, visualize, and share your
            custom itineraries in a single sleek dashboard.
          </motion.p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-6 gap-6 max-w-6xl mx-auto">
          {FEATURE_LIST.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              whileHover={{ y: -4 }}
              className={`group flex flex-col justify-between bg-card border border-border/60 rounded-2xl p-6 shadow-sm hover:shadow-md hover:border-primary/30 transition-all ${feature.size}`}
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-xl bg-muted/40 border flex items-center justify-center group-hover:scale-105 transition-transform">
                    {feature.icon}
                  </div>
                  {feature.badge && (
                    <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground bg-muted px-2 py-0.5 rounded-full">
                      {feature.badge}
                    </span>
                  )}
                </div>
                <h3 className="text-lg font-bold mb-2 text-foreground group-hover:text-primary transition-colors">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {feature.description}
                </p>
              </div>

              {feature.visual}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Features;
