"use client";

import { Skeleton } from "@/components/ui/skeleton";

export function DetailSkeleton() {
  return (
    <div className="relative flex flex-col lg:flex-row w-full lg:h-[calc(100vh-73px)] overflow-hidden bg-white dark:bg-neutral-950">
      {/* Left Column: Itinerary Details Skeleton */}
      <div className="w-full lg:w-[55%] xl:w-[60%] h-full p-4 sm:p-6 pb-20 max-w-7xl mx-auto space-y-16 overflow-y-auto">
        {/* Premium Header Skeleton */}
        <div className="relative rounded-3xl overflow-hidden h-[250px] sm:h-[350px] md:h-[400px] w-full">
          <Skeleton className="w-full h-full" />
          <div className="absolute inset-0 p-6 sm:p-8 flex flex-col justify-end gap-3.5 bg-gradient-to-t from-neutral-950/80 via-neutral-950/30 to-transparent">
            <Skeleton className="h-6 w-32 rounded-full bg-white/20" />
            <Skeleton className="h-10 w-2/3 rounded-lg bg-white/25" />
            <div className="flex flex-wrap gap-3 mt-2">
              <Skeleton className="h-5 w-24 rounded-full bg-white/20" />
              <Skeleton className="h-5 w-20 rounded-full bg-white/20" />
              <Skeleton className="h-5 w-28 rounded-full bg-white/20" />
            </div>
          </div>
        </div>

        {/* Hotels Section Skeleton */}
        <section className="px-2 md:px-6 space-y-6">
          <Skeleton className="h-8 w-56 rounded-xl" />
          <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,280px),1fr))] gap-6">
            {[1, 2, 3].map((idx) => (
              <div 
                key={idx} 
                className="rounded-3xl border border-neutral-200/50 dark:border-neutral-800/50 overflow-hidden space-y-4 pb-5 flex flex-col h-[380px]"
              >
                <Skeleton className="h-48 w-full rounded-t-3xl" />
                <div className="px-5 space-y-3.5 grow flex flex-col justify-between">
                  <div className="space-y-2">
                    <Skeleton className="h-5 w-5/6 rounded-md" />
                    <Skeleton className="h-4 w-2/3 rounded-md" />
                  </div>
                  <div className="space-y-2 mt-auto">
                    <Skeleton className="h-4 w-1/3 rounded-md" />
                    <Skeleton className="h-8 w-full rounded-xl" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Daily Itinerary Skeleton */}
        <section className="px-2 md:px-6 space-y-8">
          <Skeleton className="h-8 w-44 rounded-xl" />
          {[1, 2].map((dayIdx) => (
            <div key={dayIdx} className="space-y-4">
              <Skeleton className="h-6 w-20 rounded-md" />
              <div className="space-y-5 pl-4 sm:pl-6 border-l-2 border-neutral-200 dark:border-neutral-800 ml-1">
                {[1, 2].map((actIdx) => (
                  <div 
                    key={actIdx} 
                    className="flex flex-col sm:flex-row gap-4 p-4 rounded-3xl border border-neutral-200/50 dark:border-neutral-800/50 bg-neutral-50/20 dark:bg-neutral-900/10"
                  >
                    <Skeleton className="w-full sm:w-28 h-28 rounded-2xl shrink-0" />
                    <div className="space-y-3.5 grow flex flex-col justify-between py-1">
                      <div className="space-y-1.5">
                        <Skeleton className="h-5 w-1/2 rounded-md" />
                        <Skeleton className="h-4 w-11/12 rounded-md" />
                      </div>
                      <div className="flex flex-wrap gap-2">
                        <Skeleton className="h-6 w-20 rounded-full" />
                        <Skeleton className="h-6 w-24 rounded-full" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </section>
      </div>

      {/* Right Column: Globe Map Skeleton */}
      <div className="hidden lg:block w-full lg:w-[45%] xl:w-[40%] h-full border-l border-neutral-200 dark:border-neutral-800">
        <Skeleton className="w-full h-full" />
      </div>
    </div>
  );
}
