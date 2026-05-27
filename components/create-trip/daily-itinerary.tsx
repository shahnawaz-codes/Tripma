"use client";

import { Timeline } from "@/components/ui/timeline";
import { Clock } from "lucide-react";
import { Itinerary } from "@/types/trip";
import { ActivityCard } from "./ActivityCard";

interface DailyItineraryProps {
  itinerary: Itinerary[];
  openMap: (lat: number, lng: number, placeId: string) => void;
}

export function DailyItinerary({ itinerary, openMap }: DailyItineraryProps) {
  const itineraryTimelineData = itinerary.map((day) => ({
    title: `Day ${day.day}`,
    content: (
      <div className="flex flex-col gap-8 mb-16 w-full max-w-full">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-neutral-200 dark:border-neutral-800 pb-4">
          <h3 className="text-xl md:text-2xl font-bold text-neutral-900 dark:text-neutral-100">
            {day.day_plan}
          </h3>
          <div className="flex items-center gap-1.5 text-sm bg-neutral-100 dark:bg-neutral-800/50 px-3 py-1.5 rounded-full text-neutral-600 dark:text-neutral-300 font-medium">
            <Clock className="w-4 h-4" />
            <span>{day.best_time_to_visit_day}</span>
          </div>
        </div>

        <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,260px),1fr))] gap-6">
          {day.activities.map((activity, idx) => (
            <ActivityCard
              activity={activity}
              openMap={openMap}
              key={idx}
              index={idx}
            />
          ))}
        </div>
      </div>
    ),
  }));

  return (
    <section className="md:pl-4">
      <div className="flex items-center gap-3 mb-8 px-2 md:px-0">
        <h2 className="text-2xl md:text-3xl font-bold text-neutral-900 dark:text-white">
          Daily Itinerary
        </h2>
      </div>
      <div className="-mx-4 sm:mx-0">
        <Timeline data={itineraryTimelineData} />
      </div>
    </section>
  );
}
