"use client";

import { use, useState } from "react";
import dynamic from "next/dynamic";
import { useParams } from "next/navigation";
import { useQuery } from "convex/react";
import { Map, List } from "lucide-react";
import Itinerary from "@/components/create-trip/itinerary";
import { api } from "@/convex/_generated/api";
import { DetailSkeleton } from "@/components/my-trips/detail-skeleton";
import { Id } from "@/convex/_generated/dataModel";

// Dynamically import WorldGlobe map component with SSR disabled
const WorldGlobe = dynamic(
  () => import("@/components/create-trip/world-globe"),
  {
    ssr: false, // critical to prevent window/document undefined issues during SSR
    loading: () => (
      <div className="flex items-center justify-center w-full h-full text-neutral-500 bg-neutral-50/50 dark:bg-neutral-900/50 backdrop-blur-sm">
        <span className="text-sm font-medium animate-pulse">
          Loading map...
        </span>
      </div>
    ),
  },
);

export default function TripId() {
  const params = useParams<{ id: Id<"trips"> }>();
  const { id } = params;
  const [showMapOnMobile, setShowMapOnMobile] = useState(false);
  const data = useQuery(api.trips.getTripById, { tripId: id });
  if (!data) {
    return <DetailSkeleton />;
  }
  console.log("shareData", data);

  return (
    <div className="relative flex flex-col lg:flex-row w-full lg:h-[calc(100vh-73px)] overflow-hidden bg-white dark:bg-neutral-950">
      {/* Left Column: Itinerary Details */}
      <div
        className={`w-full lg:w-[55%] xl:w-[60%] h-full lg:overflow-y-auto ${
          showMapOnMobile ? "hidden lg:block" : "block"
        }`}
      >
        <Itinerary trip_data={data.tripPlan} />
      </div>

      {/* Right Column: Globe Map */}
      <div
        className={`w-full lg:w-[45%] xl:w-[40%] h-[calc(100vh-73px)] lg:h-full border-t lg:border-t-0 lg:border-l border-neutral-200 dark:border-neutral-800 ${
          showMapOnMobile ? "block" : "hidden lg:block"
        }`}
      >
        <WorldGlobe tripData={data.tripPlan} />
      </div>

      {/* Floating responsive toggle button for mobile/tablet screens */}
      <button
        onClick={() => setShowMapOnMobile(!showMapOnMobile)}
        className="lg:hidden fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2 bg-neutral-900 hover:bg-neutral-800 dark:bg-white dark:hover:bg-neutral-100 text-white dark:text-neutral-900 px-5 py-3 rounded-full shadow-2xl hover:scale-105 active:scale-95 transition-all duration-200 text-sm font-semibold border border-white/10 dark:border-black/5 cursor-pointer backdrop-blur-md"
      >
        {showMapOnMobile ? (
          <>
            <List className="w-4 h-4" />
            <span>Show List</span>
          </>
        ) : (
          <>
            <Map className="w-4 h-4" />
            <span>Show Map</span>
          </>
        )}
      </button>
    </div>
  );
}
