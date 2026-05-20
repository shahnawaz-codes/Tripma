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
      <section className="px-2 md:px-6">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-neutral-900 dark:text-white">
            Featured Stays (Hotels)
          </h2>
        </div>
        <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,280px),1fr))] gap-6">
          {trip.hotels.map((hotel, idx) => (
            <FeaturedStays hotel={hotel} openMap={openMap} key={idx} />
          ))}
        </div>
      </section>
      <DailyItinerary itinerary={trip.itinerary}  openMap={openMap} />
    </div>
  );
}

export default Itinerary;
