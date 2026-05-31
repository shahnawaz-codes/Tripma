"use client";

import { use, useState } from "react";
import dynamic from "next/dynamic";
import { useParams } from "next/navigation";
import { useQuery } from "convex/react";
import { Map, List, Compass } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
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

  if (data === undefined) {
    return <DetailSkeleton />;
  }

  if (data === null) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[80vh] w-full p-6 text-center bg-white dark:bg-neutral-950 relative overflow-hidden">
        {/* Ambient background glows */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] bg-primary/10 dark:bg-primary/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]" />

        <div className="relative flex flex-col items-center max-w-md w-full space-y-8 z-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
          {/* Icon wrapper */}
          <div className="w-24 h-24 bg-white dark:bg-neutral-900 border border-neutral-200/60 dark:border-neutral-800/60 shadow-xl rounded-3xl flex items-center justify-center relative group">
            <div className="absolute -inset-1.5 bg-gradient-to-r from-primary to-orange-500 rounded-3xl blur-lg opacity-25 group-hover:opacity-45 transition-opacity duration-500" />
            <Compass className="w-12 h-12 text-primary animate-[spin_20s_linear_infinite]" />
          </div>

          <div className="space-y-3">
            <h2 className="text-3xl font-extrabold tracking-tight text-neutral-900 dark:text-neutral-100">
              Trip Not Found
            </h2>
            <p className="text-neutral-500 dark:text-neutral-400 text-sm leading-relaxed">
              We couldn&apos;t find the itinerary you are looking for. It may have been deleted, or you might not have permission to view it.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3.5 w-full pt-4">
            <Link href="/my-trips" className="flex-1">
              <Button variant="outline" className="w-full rounded-2xl py-6 font-semibold border-neutral-200 dark:border-neutral-800 hover:bg-neutral-50 dark:hover:bg-neutral-900 text-neutral-700 dark:text-neutral-300">
                Back to My Trips
              </Button>
            </Link>
            <Link href="/create-new-trip" className="flex-1">
              <Button className="w-full bg-gradient-to-r from-primary to-orange-500 text-white hover:opacity-95 shadow-md shadow-primary/10 rounded-2xl py-6 font-bold">
                Plan New Trip
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="relative flex flex-col lg:flex-row w-full lg:h-[calc(100vh-73px)] overflow-hidden bg-white dark:bg-neutral-950">
      {/* Left Column: Itinerary Details */}
      <div
        className={`w-full lg:w-[55%] xl:w-[60%] h-full lg:overflow-y-auto ${
          showMapOnMobile ? "hidden lg:block" : "block"
        }`}
      >
        <Itinerary
          tripId={data._id}
          trip_data={data.tripPlan}
          shareId={data.shareId as string}
          imageStatus={data.imagStatus as string}
        />
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
