import { useState, useEffect } from "react";
import { DurationSelector } from "@/app/_components/createTrip/DurationSelector";
import { RenderOptions } from "./renderOption";
import { Sparkles, Loader2, CheckCircle2, AlertTriangle, ArrowRight } from "lucide-react";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";

type RenderGenerativeUiProps = {
  ui: string;
  sendMessage: (text: string) => void;
  isLoading: boolean;
  isGeneratingPlan: boolean;
  tripId?: string;
  tripGenerated: boolean;
  generateFinalTripPlan: () => void;
};
export const RenderGenerativeUi = ({
  ui,
  sendMessage,
  isLoading,
  isGeneratingPlan,
  tripId,
  tripGenerated,
  generateFinalTripPlan,
}: RenderGenerativeUiProps) => {
  const router = useRouter();
  const [loadingStep, setLoadingStep] = useState(0);

  const loadingSteps = [
    "Analyzing your preferences...",
    "Finding top-rated hotels...",
    "Curating custom activities...",
    "Mapping routes on the 3D globe...",
    "Finalizing your travel itinerary...",
  ];

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isGeneratingPlan) {
      setLoadingStep(0);
      interval = setInterval(() => {
        setLoadingStep((prev) =>
          prev < loadingSteps.length - 1 ? prev + 1 : prev
        );
      }, 2000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isGeneratingPlan]);

  if (!ui) return null;
  const commonProps = { sendMessage, isLoading, ui };
  if (ui === "source") {
    return (
      <RenderOptions
        options={[
          { label: "New York", icon: "🗽", badge: "US Hub" },
          { label: "London", icon: "💂", badge: "Europe" },
          { label: "Tokyo", icon: "🗼", badge: "Asia" },
          { label: "Paris", icon: "🥐", badge: "Europe" },
        ]}
        {...commonProps}
      />
    );
  } else if (ui === "destination") {
    return (
      <RenderOptions
        options={[
          { label: "Maldives", icon: "🏖️", badge: "Tropical" },
          { label: "Swiss Alps", icon: "🏔️", badge: "Alpine" },
          { label: "Kyoto", icon: "⛩️", badge: "Cultural" },
          { label: "Bali", icon: "🌴", badge: "Island" },
        ]}
        {...commonProps}
      />
    );
  } else if (ui === "budget") {
    return (
      <RenderOptions
        options={[
          {
            label: "Low",
            icon: "🎒",
            desc: "Affordable backpacking & saving",
            badge: "$0-$50/day",
            value: "Cheap",
          },
          {
            label: "Moderate",
            icon: "🏨",
            desc: "Comfortable mid-range hotels",
            badge: "$50-$150/day",
            value: "Moderate",
          },
          {
            label: "Luxury",
            icon: "💎",
            desc: "High-end premium experience",
            badge: "$150+/day",
            value: "Luxury",
          },
        ]}
        {...commonProps}
      />
    );
  } else if (ui === "groupSize") {
    return (
      <RenderOptions
        options={[
          {
            label: "Solo",
            icon: "👤",
            desc: "Just me traveling solo",
            badge: "1 Person",
          },
          {
            label: "Couple",
            icon: "💑",
            desc: "Romantic trip for two",
            badge: "2 People",
          },
          {
            label: "Family",
            icon: "👨‍👩‍👧‍👦",
            desc: "Trip with kids & family",
            badge: "3-5 People",
          },
          {
            label: "Friends",
            icon: "👯",
            desc: "Adventure with group",
            badge: "5+ People",
          },
        ]}
        {...commonProps}
      />
    );
  } else if (ui === "tripDuration") {
    return <DurationSelector onSelect={sendMessage} disabled={isLoading} />;
  } else if (ui === "final") {
    // 1. Generation Failed State
    if (tripGenerated && !tripId && !isGeneratingPlan) {
      return (
        <div className="w-full max-w-sm p-6 rounded-3xl border border-red-200 dark:border-red-900/30 bg-red-50/50 dark:bg-red-950/10 backdrop-blur-md shadow-lg flex flex-col items-center gap-4 text-center animate-in fade-in slide-in-from-bottom-4 duration-300 mt-4">
          <div className="w-12 h-12 bg-red-100 dark:bg-red-950/30 rounded-full flex items-center justify-center text-red-500">
            <AlertTriangle className="w-6 h-6 animate-bounce" />
          </div>
          <div className="space-y-1.5">
            <h3 className="font-bold text-neutral-950 dark:text-neutral-50 text-sm">
              Generation Limit Reached
            </h3>
            <p className="text-xs text-neutral-500 dark:text-neutral-400 leading-relaxed">
              You've used all your free credits. Please upgrade your plan to continue crafting unlimited customized itineraries.
            </p>
          </div>
          <Button
            className="w-full mt-2 rounded-2xl py-5 font-bold shadow-md bg-gradient-to-r from-red-600 to-orange-600 text-white border-none hover:opacity-95 cursor-pointer"
            onClick={() => router.push("/pricing")}
          >
            Upgrade to Premium
          </Button>
        </div>
      );
    }

    // 2. Active Generating State
    if (isGeneratingPlan) {
      return (
        <div className="w-full max-w-sm p-6 rounded-3xl border border-primary/20 dark:border-primary/30 bg-gradient-to-b from-primary/5 to-orange-500/5 dark:from-primary/10 dark:to-orange-500/5 backdrop-blur-md shadow-xl flex flex-col items-center gap-4 text-center animate-in fade-in slide-in-from-bottom-4 duration-300 mt-4">
          <div className="relative w-16 h-16 flex items-center justify-center">
            {/* Spinning gradient ring */}
            <div className="absolute inset-0 rounded-full border-4 border-primary/10 border-t-primary animate-spin duration-1000" />
            {/* Inner pulsing sparkles */}
            <Sparkles className="w-6 h-6 text-primary animate-pulse" />
          </div>
          <div className="space-y-2 w-full">
            <h3 className="font-extrabold text-neutral-900 dark:text-neutral-100 text-sm tracking-tight animate-pulse">
              Generating Itinerary
            </h3>
            <div className="flex flex-col items-center gap-1.5">
              <span className="text-xs font-semibold text-primary/95 dark:text-primary min-h-[18px]">
                {loadingSteps[loadingStep]}
              </span>
              <p className="text-[11px] text-neutral-400 dark:text-neutral-500">
                This takes a few seconds...
              </p>
            </div>
            {/* Elegant loading progress line */}
            <div className="w-full bg-neutral-200 dark:bg-neutral-800 h-1 rounded-full overflow-hidden mt-2">
              <div 
                className="bg-gradient-to-r from-primary to-orange-500 h-full rounded-full transition-all duration-1000" 
                style={{ width: `${((loadingStep + 1) / loadingSteps.length) * 100}%` }}
              />
            </div>
          </div>
          <Button
            className="w-full mt-2 rounded-2xl py-5 font-bold shadow-sm cursor-not-allowed"
            disabled
          >
            <Loader2 className="w-4 h-4 animate-spin mr-2" />
            <span>Building Plan...</span>
          </Button>
        </div>
      );
    }

    // 3. Success / Ready State
    if (tripGenerated && tripId) {
      return (
        <div className="w-full max-w-sm p-6 rounded-3xl border border-emerald-200 dark:border-emerald-900/30 bg-emerald-50/20 dark:bg-emerald-950/5 backdrop-blur-md shadow-xl flex flex-col items-center gap-4 text-center animate-in fade-in slide-in-from-bottom-4 duration-300 mt-4">
          <div className="w-12 h-12 bg-emerald-100 dark:bg-emerald-950/30 rounded-full flex items-center justify-center text-emerald-600 dark:text-emerald-400">
            <CheckCircle2 className="w-6 h-6 animate-in zoom-in duration-300" />
          </div>
          <div className="space-y-1.5">
            <h3 className="font-extrabold text-neutral-900 dark:text-neutral-100 text-sm tracking-tight">
              Adventure is Ready!
            </h3>
            <p className="text-xs text-neutral-500 dark:text-neutral-400 leading-relaxed">
              Your customized travel schedule, recommended hotels, and activity maps have been created successfully.
            </p>
          </div>
          <Button
            className="w-full mt-2 rounded-2xl py-5 font-bold shadow-md bg-gradient-to-r from-emerald-600 to-teal-600 text-white border-none hover:opacity-95 hover:shadow-lg transition-all group cursor-pointer flex items-center justify-center gap-1.5"
            onClick={() => router.push(`/my-trips/${tripId}`)}
          >
            <span>View Itinerary</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </Button>
        </div>
      );
    }

    // 4. Initial "Ready to Generate" State
    return (
      <div className="w-full max-w-sm p-6 rounded-3xl border border-primary/20 dark:border-primary/30 bg-gradient-to-b from-primary/5 to-orange-500/5 dark:from-primary/10 dark:to-orange-500/5 backdrop-blur-md shadow-xl flex flex-col items-center gap-4 text-center animate-in fade-in slide-in-from-bottom-4 duration-300 mt-4">
        <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary">
          <Sparkles className="w-6 h-6 animate-pulse" />
        </div>
        <div className="space-y-1.5">
          <h3 className="font-extrabold text-neutral-900 dark:text-neutral-100 text-sm tracking-tight">
            Preferences Captured!
          </h3>
          <p className="text-xs text-neutral-500 dark:text-neutral-400 leading-relaxed">
            All your options are collected. Ready to generate your custom AI travel plan?
          </p>
        </div>
        <Button
          className="w-full mt-2 rounded-2xl py-5 font-bold shadow-md bg-gradient-to-r from-primary to-orange-500 text-white border-none hover:opacity-95 hover:shadow-lg transition-all cursor-pointer"
          onClick={generateFinalTripPlan}
        >
          Generate Trip Plan
        </Button>
      </div>
    );
  }
  return null;
};
