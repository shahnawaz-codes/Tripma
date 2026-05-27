"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Compass,
  Sparkles,
  CheckCircle2,
  Map,
  Building2,
  Utensils,
  CalendarDays,
  Globe,
} from "lucide-react";

interface TripStatusDisplayProps {
  status: "empty" | "generating";
}

const loadingSteps = [
  { id: 1, text: "Analyzing your preferences...", icon: Sparkles },
  { id: 2, text: "Searching for top-rated hotels...", icon: Building2 },
  { id: 3, text: "Mapping out the optimal route...", icon: Map },
  { id: 4, text: "Curating daily activities...", icon: Utensils },
  { id: 5, text: "Polishing your custom itinerary...", icon: CalendarDays },
];

const travelTips = [
  "Pack light: choose versatile clothing you can layer easily.",
  "Always keep digital copies of your passport and travel documents.",
  "Check the local weather forecast 3 days before departure to adjust packing.",
  "Try local street food spots with the longest lines—they're usually the best!",
  "Download offline map regions on your phone before you travel.",
];

export function TripStatusDisplay({ status }: TripStatusDisplayProps) {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [tipIndex, setTipIndex] = useState(0);

  // Cycle through checklist steps
  useEffect(() => {
    if (status !== "generating") return;

    const stepInterval = setInterval(() => {
      setCurrentStepIndex((prev) => {
        if (prev < loadingSteps.length - 1) {
          return prev + 1;
        }
        return prev;
      });
    }, 2800);

    return () => clearInterval(stepInterval);
  }, [status]);

  // Cycle through travel tips
  useEffect(() => {
    if (status !== "generating") return;

    const tipInterval = setInterval(() => {
      setTipIndex((prev) => (prev + 1) % travelTips.length);
    }, 4500);

    return () => clearInterval(tipInterval);
  }, [status]);

  if (status === "empty") {
    return (
      <div className="flex flex-col items-center justify-center w-full h-full min-h-[500px] p-6 relative overflow-hidden bg-radial from-neutral-50 to-white dark:from-neutral-900 dark:to-neutral-950">
        {/* Decorative background grid */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]" />

        {/* Ambient background glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] bg-primary/10 dark:bg-primary/5 rounded-full blur-3xl pointer-events-none" />

        <div className="relative flex flex-col items-center max-w-md text-center space-y-8 z-10">
          {/* Animated floating compass */}
          <motion.div
            animate={{
              y: [0, -12, 0],
              rotate: [0, 5, -5, 0],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="w-24 h-24 bg-white dark:bg-neutral-900 border border-neutral-200/60 dark:border-neutral-800/60 shadow-xl rounded-3xl flex items-center justify-center relative group"
          >
            <div className="absolute -inset-1.5 bg-gradient-to-r from-primary to-orange-500 rounded-3xl blur-lg opacity-25 group-hover:opacity-40 transition-opacity duration-500" />
            <Compass className="w-12 h-12 text-primary" />
          </motion.div>

          <div className="space-y-3">
            <h2 className="text-2xl font-bold tracking-tight text-neutral-800 dark:text-neutral-100">
              Your Next Journey Awaits
            </h2>
            <p className="text-neutral-500 dark:text-neutral-400 text-sm leading-relaxed">
              Use the AI assistant on the left to start planning. Describe your
              dream destination, travel style, duration, and budget, and we&apos;ll
              craft a custom day-by-day plan right here.
            </p>
          </div>

          {/* Value props steps */}
          <div className="grid grid-cols-3 gap-4 w-full pt-6 border-t border-neutral-150 dark:border-neutral-800/80">
            <div className="flex flex-col items-center space-y-2">
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-xs font-semibold text-primary">
                1
              </div>
              <span className="text-xs font-medium text-neutral-600 dark:text-neutral-400">
                Describe Idea
              </span>
            </div>
            <div className="flex flex-col items-center space-y-2">
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-xs font-semibold text-primary">
                2
              </div>
              <span className="text-xs font-medium text-neutral-600 dark:text-neutral-400">
                Refine Prefs
              </span>
            </div>
            <div className="flex flex-col items-center space-y-2">
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-xs font-semibold text-primary">
                3
              </div>
              <span className="text-xs font-medium text-neutral-600 dark:text-neutral-400">
                Get Details
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center w-full h-full min-h-[500px] p-6 relative overflow-hidden bg-radial from-neutral-50 to-white dark:from-neutral-900 dark:to-neutral-950">
      {/* Decorative background grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]" />

      {/* Animated subtle aura glows */}
      <div className="absolute top-1/4 -right-12 w-[300px] h-[300px] bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 -left-12 w-[300px] h-[300px] bg-orange-500/5 rounded-full blur-3xl" />

      <div className="relative flex flex-col items-center max-w-md w-full space-y-8 z-10 px-4">
        {/* Animated Globe / Radar Loop */}
        <div className="relative w-24 h-24 flex items-center justify-center">
          {/* Outer radar pulse */}
          <motion.div
            animate={{ scale: [1, 1.4, 1], opacity: [0.15, 0.4, 0.15] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            className="absolute inset-0 rounded-full bg-primary/20 border border-primary/30"
          />
          {/* Inner radar scanner line */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
            className="absolute inset-2 rounded-full border border-dashed border-primary/40 before:content-[''] before:absolute before:top-0 before:left-1/2 before:w-1.5 before:h-1.5 before:bg-primary before:rounded-full before:-translate-x-1/2"
          />
          {/* Center Spinning Globe */}
          <motion.div
            animate={{ rotateY: 360 }}
            transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
            className="w-12 h-12 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-full shadow-lg flex items-center justify-center z-10"
            style={{ perspective: 1000 }}
          >
            <Globe className="w-6 h-6 text-primary animate-pulse" />
          </motion.div>
        </div>

        {/* Header copy */}
        <div className="text-center space-y-2">
          <h2 className="text-xl font-bold tracking-tight text-neutral-800 dark:text-neutral-100 flex items-center justify-center gap-2">
            Crafting Your Custom Plan
            <motion.span
              animate={{ rotate: [0, 15, -15, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              ✨
            </motion.span>
          </h2>
          <p className="text-xs text-neutral-500 dark:text-neutral-400">
            This takes about 10–15 seconds to generate curated details.
          </p>
        </div>

        {/* Step-by-Step checklist Card */}
        <div className="bg-white/80 dark:bg-neutral-900/80 backdrop-blur-md border border-neutral-200/50 dark:border-neutral-800/50 rounded-2xl p-5 shadow-xl w-full space-y-4">
          <div className="space-y-3.5">
            {loadingSteps.map((step, idx) => {
              const isCompleted = idx < currentStepIndex;
              const isActive = idx === currentStepIndex;
              const StepIcon = step.icon;

              return (
                <div
                  key={step.id}
                  className={`flex items-center justify-between text-sm transition-all duration-300 ${
                    isActive
                      ? "text-neutral-800 dark:text-neutral-100 font-medium"
                      : isCompleted
                        ? "text-neutral-450 dark:text-neutral-400"
                        : "text-neutral-300 dark:text-neutral-700"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`p-1.5 rounded-lg transition-colors ${
                        isActive
                          ? "bg-primary/10 text-primary"
                          : isCompleted
                            ? "bg-neutral-100 dark:bg-neutral-850 text-neutral-400"
                            : "bg-transparent text-neutral-200 dark:text-neutral-800"
                      }`}
                    >
                      <StepIcon className="w-4 h-4" />
                    </div>
                    <span>{step.text}</span>
                  </div>

                  <div>
                    {isCompleted ? (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{
                          type: "spring",
                          stiffness: 300,
                          damping: 20,
                        }}
                      >
                        <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                      </motion.div>
                    ) : isActive ? (
                      <div className="relative w-4 h-4 flex items-center justify-center">
                        <span className="animate-ping absolute inline-flex h-2.5 w-2.5 rounded-full bg-primary opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-primary"></span>
                      </div>
                    ) : (
                      <div className="w-4 h-4 rounded-full border border-neutral-200 dark:border-neutral-800" />
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Micro Progress Bar */}
          <div className="h-1.5 w-full bg-neutral-100 dark:bg-neutral-800 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-primary to-orange-500 rounded-full"
              animate={{
                width: `${((currentStepIndex + 0.5) / loadingSteps.length) * 100}%`,
              }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
            />
          </div>
        </div>

        {/* Dynamic Travel Tip Box */}
        <div className="w-full bg-orange-50/20 dark:bg-neutral-900/20 border border-orange-100/30 dark:border-neutral-800/40 rounded-xl p-3.5 text-center">
          <span className="text-[10px] uppercase font-bold tracking-wider text-primary block mb-1">
            Travel Tip
          </span>
          <div className="h-9 flex items-center justify-center overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.p
                key={tipIndex}
                initial={{ y: 15, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -15, opacity: 0 }}
                transition={{ duration: 0.4 }}
                className="text-xs text-neutral-600 dark:text-neutral-400 italic font-medium leading-normal"
              >
                &quot;{travelTips[tipIndex]}&quot;
              </motion.p>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}
