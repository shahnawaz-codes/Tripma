"use client";
import { ChatBox } from "@/app/_components/createTrip/ChatBox";
import React, { useState } from "react";
import { TripPlan } from "@/types/trip";
import Itinerary from "@/app/_components/createTrip/Itinerary";
import dynamic from "next/dynamic";
import { Button } from "@/components/ui/button";
import { AirplayIcon, Globe2 } from "lucide-react";
import {
  HoverCard,
  HoverCardTrigger,
  HoverCardContent,
} from "@/components/ui/hover-card";
import { TripStatusDisplay } from "@/app/_components/createTrip/TripStatusDisplay";

const WorldGlobe = dynamic(
  () => import("@/app/_components/createTrip/WorldGlobe"),
  {
    ssr: false, // ← critical, skips server render
    loading: () => <div className="flex items-center justify-center w-full h-full text-neutral-500">Loading map...</div>,
  },
);

const CreateTrip = () => {
  const [tripPlanInfo, setTripPlanInfo] = useState<TripPlan | null>(null);
  const [isGlobe, setIsGlobe] = useState<boolean>(false);
  const [isGeneratingPlan, setIsGeneratingPlan] = useState(false);
  return (
    <div className="w-full h-[calc(100vh-70px)] overflow-hidden flex">
      {/* chat box */}
      <div className="w-full lg:w-[580px] xl:w-[620px] shrink-0 h-full bg-white border-r border-neutral-200 dark:border-neutral-800">
        <ChatBox
          setTripPlanInfo={setTripPlanInfo}
          setIsGeneratingPlan={setIsGeneratingPlan}
          isGeneratingPlan={isGeneratingPlan}
        />
      </div>

      {/* display map and area place  */}
      <div className="hidden lg:block flex-1 bg-white dark:bg-neutral-950 overflow-hidden h-full relative">
        {isGeneratingPlan ? (
          <TripStatusDisplay key="generating" status="generating" />
        ) : tripPlanInfo ? (
          isGlobe ? (
            <WorldGlobe tripData={tripPlanInfo} />
          ) : (
            <Itinerary trip_data={tripPlanInfo} />
          )
        ) : (
          <TripStatusDisplay key="empty" status="empty" />
        )}

        {/* Floating glassmorphic toggle buttons with hover-card details */}
        {tripPlanInfo && !isGeneratingPlan && (
          <>
            {/* Centered pill-shaped switch */}
            <div className="absolute top-4 left-1/2 -translate-x-1/2 z-40 bg-white/90 dark:bg-neutral-900/90 backdrop-blur-md p-1.5 rounded-full shadow-lg border border-neutral-200/50 dark:border-neutral-800/50 flex items-center gap-1.5 transition-all duration-300">
              <button
                onClick={() => setIsGlobe(false)}
                className={`px-4 py-2 rounded-full text-xs font-semibold transition-all duration-300 flex items-center gap-1.5 cursor-pointer ${
                  !isGlobe
                    ? "bg-gradient-to-r from-primary to-orange-500 text-white shadow-md shadow-primary/20 scale-105"
                    : "text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 hover:bg-neutral-100/50 dark:hover:bg-neutral-800/50"
                }`}
              >
                <AirplayIcon className="w-3.5 h-3.5" />
                <span>Itinerary</span>
              </button>
              <button
                onClick={() => setIsGlobe(true)}
                className={`px-4 py-2 rounded-full text-xs font-semibold transition-all duration-300 flex items-center gap-1.5 cursor-pointer ${
                  isGlobe
                    ? "bg-gradient-to-r from-primary to-orange-500 text-white shadow-md shadow-primary/20 scale-105"
                    : "text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 hover:bg-neutral-100/50 dark:hover:bg-neutral-800/50"
                }`}
              >
                <Globe2 className="w-3.5 h-3.5" />
                <span>Interactive Map</span>
              </button>
            </div>

            {/* Corner floating toggle button with hover-card details */}
            <div className="absolute top-4 right-4 z-40">
              <HoverCard openDelay={200} closeDelay={100}>
                <HoverCardTrigger asChild>
                  <Button
                    onClick={() => setIsGlobe(!isGlobe)}
                    variant="outline"
                    size="icon"
                    className="w-12 h-12 rounded-full shadow-md border border-neutral-200/50 dark:border-neutral-800/50 bg-white/80 dark:bg-neutral-900/80 backdrop-blur-md hover:scale-105 transition-all duration-200 text-neutral-700 dark:text-neutral-300 hover:text-primary dark:hover:text-primary cursor-pointer flex items-center justify-center"
                  >
                    {isGlobe ? <AirplayIcon className="w-5 h-5" /> : <Globe2 className="w-5 h-5" />}
                  </Button>
                </HoverCardTrigger>
                <HoverCardContent align="end" className="w-60 p-3 bg-white/95 dark:bg-neutral-900/95 backdrop-blur-md border border-neutral-200/50 dark:border-neutral-800/50 shadow-xl rounded-xl">
                  <div className="space-y-1.5">
                    <h4 className="text-xs font-semibold text-neutral-800 dark:text-neutral-200 flex items-center gap-1.5">
                      {isGlobe ? (
                        <>
                          <AirplayIcon className="w-3.5 h-3.5 text-primary" />
                          Switch to Itinerary
                        </>
                      ) : (
                        <>
                          <Globe2 className="w-3.5 h-3.5 text-primary" />
                          Switch to Interactive Map
                        </>
                      )}
                    </h4>
                    <p className="text-[11px] text-neutral-500 dark:text-neutral-400 leading-normal">
                      {isGlobe 
                        ? "View your detailed day-by-day travel plan, curated hotels, and lists of activities."
                        : "Visualize your trip routes and activities on an interactive 3D Globe map."
                      }
                    </p>
                  </div>
                </HoverCardContent>
              </HoverCard>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default CreateTrip;
