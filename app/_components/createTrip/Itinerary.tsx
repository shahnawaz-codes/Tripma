"use client";
import { TripPlan } from "@/types/trip";
import { PremiumHeader } from "./PremiumHeader";
import { FeaturedStays } from "./FeaturedStays";
import { DailyItinerary } from "./DailyItinerary";

export function Itinerary({ trip_data }: { trip_data: TripPlan }) {
  const trip = trip_data;

  const openMap = (lat: number, lng: number, placeId: string) => {
    const url = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(placeId)}`;
    window.open(url, "_blank");
  };

  return (
    <div className="w-full h-full overflow-y-auto p-4 sm:p-6 pb-20 max-w-7xl mx-auto space-y-16">
      <PremiumHeader trip={trip} />
      <FeaturedStays hotels={trip.hotels} openMap={openMap} />
      <DailyItinerary itinerary={trip.itinerary} openMap={openMap} />
    </div>
  );
}

export default Itinerary;
