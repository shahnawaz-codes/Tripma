import { Calendar, Wallet, Users } from "lucide-react";
import { TripPlan } from "@/types/trip";

export function PremiumHeader({ trip }: { trip: TripPlan }) {
  const originName = trip.origin.split(",")[0];
  const destName = trip.destination.split("(")[0].trim();

  return (
    <div className="bg-white dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 rounded-3xl p-6 md:p-10 shadow-sm mt-4">
      <div className="relative z-10">
        <h1 className="text-3xl md:text-5xl lg:text-6xl font-extrabold text-neutral-900 dark:text-white tracking-tight leading-[1.15] max-w-4xl">
          Your trip from{" "}
          <span className="text-orange-600 dark:text-orange-500">
            {originName}
          </span>{" "}
          to{" "}
          <span className="text-orange-600 dark:text-orange-500">
            {destName}
          </span>{" "}
          is ready.
        </h1>

        <div className="flex flex-wrap items-center gap-3 sm:gap-4 mt-8">
          <div className="flex items-center gap-2 bg-neutral-100 dark:bg-neutral-900 px-4 py-2.5 rounded-xl border border-neutral-200/50 dark:border-neutral-800/50">
            <Calendar className="w-4 h-4 text-neutral-500" />
            <span className="font-semibold text-sm text-neutral-800 dark:text-neutral-200">
              {trip.duration}
            </span>
          </div>
          <div className="flex items-center gap-2 bg-neutral-100 dark:bg-neutral-900 px-4 py-2.5 rounded-xl border border-neutral-200/50 dark:border-neutral-800/50">
            <Wallet className="w-4 h-4 text-neutral-500" />
            <span className="font-semibold text-sm text-neutral-800 dark:text-neutral-200">
              {trip.budget}
            </span>
          </div>
          <div className="flex items-center gap-2 bg-neutral-100 dark:bg-neutral-900 px-4 py-2.5 rounded-xl border border-neutral-200/50 dark:border-neutral-800/50">
            <Users className="w-4 h-4 text-neutral-500" />
            <span className="font-semibold text-sm text-neutral-800 dark:text-neutral-200">
              {trip.group_size}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
