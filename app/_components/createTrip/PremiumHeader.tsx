import { Sparkles, Calendar, Wallet, Users } from "lucide-react";
import { TripPlan } from "@/types/trip";

export function PremiumHeader({ trip }: { trip: TripPlan }) {
  const originName = trip.origin.split(",")[0];
  const destName = trip.destination.split("(")[0].trim();

  return (
    <div className="relative overflow-hidden rounded-3xl bg-neutral-50 dark:bg-neutral-900/50 border border-neutral-200/50 dark:border-neutral-800/50 p-8 md:p-12 mt-4">
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-72 h-72 bg-blue-500/10 dark:bg-blue-500/20 rounded-full blur-[80px] pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-72 h-72 bg-purple-500/10 dark:bg-purple-500/20 rounded-full blur-[80px] pointer-events-none"></div>

      <div className="relative z-10">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 text-xs font-bold text-neutral-800 dark:text-neutral-200 mb-6 shadow-sm">
          <Sparkles className="w-3.5 h-3.5 text-blue-500" />
          <span>AI-Generated Plan</span>
        </div>

        <h1 className="text-3xl md:text-5xl lg:text-6xl font-black text-neutral-900 dark:text-white tracking-tight leading-[1.1] max-w-4xl">
          Your trip from{" "}
          <span className="text-transparent bg-clip-text bg-linear-to-r from-orange-500 to-rose-500">
            {originName}
          </span>{" "}
          to{" "}
          <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-500 to-indigo-500">
            {destName}
          </span>{" "}
          is ready.
        </h1>

        <div className="flex flex-wrap items-center gap-3 sm:gap-6 mt-8">
          <div className="flex items-center gap-2 bg-white dark:bg-neutral-950 px-4 py-2.5 rounded-2xl border border-neutral-200/60 dark:border-neutral-800/60 shadow-sm">
            <div className="bg-orange-100 dark:bg-orange-900/30 p-1.5 rounded-lg text-orange-600 dark:text-orange-400">
              <Calendar className="w-4 h-4" />
            </div>
            <span className="font-semibold text-sm text-neutral-800 dark:text-neutral-200">
              {trip.duration}
            </span>
          </div>
          <div className="flex items-center gap-2 bg-white dark:bg-neutral-950 px-4 py-2.5 rounded-2xl border border-neutral-200/60 dark:border-neutral-800/60 shadow-sm">
            <div className="bg-emerald-100 dark:bg-emerald-900/30 p-1.5 rounded-lg text-emerald-600 dark:text-emerald-400">
              <Wallet className="w-4 h-4" />
            </div>
            <span className="font-semibold text-sm text-neutral-800 dark:text-neutral-200">
              {trip.budget}
            </span>
          </div>
          <div className="flex items-center gap-2 bg-white dark:bg-neutral-950 px-4 py-2.5 rounded-2xl border border-neutral-200/60 dark:border-neutral-800/60 shadow-sm">
            <div className="bg-blue-100 dark:bg-blue-900/30 p-1.5 rounded-lg text-blue-600 dark:text-blue-400">
              <Users className="w-4 h-4" />
            </div>
            <span className="font-semibold text-sm text-neutral-800 dark:text-neutral-200">
              {trip.group_size}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
