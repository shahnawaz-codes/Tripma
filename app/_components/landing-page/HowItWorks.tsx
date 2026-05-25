"use client";
import React from "react";
import { Sparkles, Calendar, Compass, ArrowRight } from "lucide-react";
import { motion } from "motion/react";

const STEPS = [
  {
    number: "01",
    icon: <Calendar className="w-5 h-5 text-primary" />,
    title: "Choose Your Preferences",
    description: "Enter your destination, select duration, set budget limits, and pick your travel vibes—whether romantic, foodie, or historical.",
    cardDetails: (
      <div className="bg-card border rounded-xl p-4 shadow-xs mt-4 space-y-3">
        <div className="space-y-1">
          <label className="text-[10px] font-bold text-muted-foreground uppercase">Where to?</label>
          <div className="bg-muted px-3 py-1.5 rounded-lg text-xs font-semibold">Tokyo, Japan</div>
        </div>
        <div className="grid grid-cols-2 gap-2">
          <div className="space-y-1">
            <label className="text-[10px] font-bold text-muted-foreground uppercase">Duration</label>
            <div className="bg-muted px-3 py-1.5 rounded-lg text-xs font-semibold">4 Days</div>
          </div>
          <div className="space-y-1">
            <label className="text-[10px] font-bold text-muted-foreground uppercase">Budget</label>
            <div className="bg-muted px-3 py-1.5 rounded-lg text-xs font-semibold">Moderate</div>
          </div>
        </div>
      </div>
    ),
  },
  {
    number: "02",
    icon: <Sparkles className="w-5 h-5 text-orange-500 animate-pulse" />,
    title: "AI Crafts the Itinerary",
    description: "Our engine processes your preferences, matches them with local hot spots, finds high-rated stays, and formats routes.",
    cardDetails: (
      <div className="bg-gradient-to-tr from-primary/10 to-orange-500/10 border border-primary/20 rounded-xl p-4 shadow-xs mt-4 flex flex-col items-center justify-center h-[126px] space-y-2 relative overflow-hidden">
        <div className="w-9 h-9 rounded-full bg-primary/20 flex items-center justify-center">
          <Sparkles className="w-4 h-4 text-primary animate-spin" style={{ animationDuration: "8s" }} />
        </div>
        <span className="text-[10.5px] font-bold text-primary animate-pulse">Analyzing spots...</span>
        <span className="text-[9px] text-muted-foreground">Optimal day-by-day routes computed</span>
      </div>
    ),
  },
  {
    number: "03",
    icon: <Compass className="w-5 h-5 text-emerald-500" />,
    title: "Explore and Customize",
    description: "Tweak the details in your dashboard, explore your route on a 3D globe, export files, and begin your next adventure.",
    cardDetails: (
      <div className="bg-card border rounded-xl p-4 shadow-xs mt-4 space-y-2">
        <div className="flex justify-between items-center bg-emerald-50 dark:bg-emerald-950/30 p-2 rounded-lg border border-emerald-100 dark:border-emerald-900/50">
          <span className="text-[10px] font-bold text-emerald-700 dark:text-emerald-400">PDF Itinerary Exported</span>
          <span className="text-[9px] bg-emerald-500 text-white px-1.5 py-0.5 rounded font-bold font-mono">Done</span>
        </div>
        <div className="flex justify-between items-center bg-blue-50 dark:bg-blue-950/30 p-2 rounded-lg border border-blue-100 dark:border-blue-900/50">
          <span className="text-[10px] font-bold text-blue-700 dark:text-blue-400">Synced to Google Calendar</span>
          <span className="text-[9px] bg-blue-500 text-white px-1.5 py-0.5 rounded font-bold font-mono">Done</span>
        </div>
      </div>
    ),
  },
];

function HowItWorks() {
  return (
    <section className="py-20 bg-background relative overflow-hidden" id="how-it-works-section">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary mb-4 text-xs font-semibold"
          >
            <span>Simple Workflow</span>
          </motion.div>
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-4 text-foreground">
            Get Going In Three Steps
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Planning a vacation shouldn't take longer than the trip itself. Start, build, and finalize in minutes.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 max-w-5xl mx-auto relative">
          {/* Connector Line for Desktop */}
          <div className="absolute top-[60px] left-[15%] right-[15%] h-[2px] bg-dashed bg-border -z-10 hidden lg:block border-t border-dashed"></div>

          {STEPS.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              className="flex flex-col items-center text-center relative group"
            >
              {/* Stepper Node with glowing index */}
              <div className="w-14 h-14 rounded-full bg-card border-2 border-border/80 group-hover:border-primary flex items-center justify-center shadow-md relative transition-colors duration-300">
                {step.icon}
                <div className="absolute -top-2.5 -right-2.5 w-6 h-6 rounded-full bg-gradient-to-tr from-primary to-orange-500 text-white font-bold text-[10px] flex items-center justify-center shadow-sm">
                  {step.number}
                </div>
              </div>

              <h3 className="text-xl font-bold mt-6 mb-2 text-foreground group-hover:text-primary transition-colors">{step.title}</h3>
              <p className="text-muted-foreground text-sm max-w-xs leading-relaxed mb-4">{step.description}</p>
              
              {/* Stepper mock UI representation */}
              <div className="w-full max-w-[280px] group-hover:scale-103 transition-transform duration-300">
                {step.cardDetails}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default HowItWorks;
