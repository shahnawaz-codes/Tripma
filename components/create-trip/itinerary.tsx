"use client";
import { TripPlan } from "@/types/trip";
import { PremiumHeader } from "./premium-header";
import { FeaturedStays } from "./featured-stays";
import { DailyItinerary } from "./daily-itinerary";
import { Id } from "@/convex/_generated/dataModel";

export function Itinerary({
  imageStatus = "completed",
  trip_data,
  shareId,
  tripId,
}: {
  trip_data: TripPlan;
  imageStatus?: string;
  shareId: string;
  tripId: Id<"trips">;
}) {
  const trip = trip_data;

  const openMap = (lat: number, lng: number, placeId: string) => {
    const url = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(placeId)}`;
    window.open(url, "_blank");
  };

  return (
    <div className="w-full h-full overflow-y-auto p-4 sm:p-6 pb-20 max-w-7xl mx-auto space-y-16">
      <PremiumHeader trip={trip} shareId={shareId} tripId={tripId} />
      <section className="px-2 md:px-6">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-neutral-900 dark:text-white">
            Featured Stays (Hotels)
          </h2>
        </div>
        <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,280px),1fr))] gap-6">
          {trip.hotels.map((hotel, idx) => (
            <FeaturedStays
              hotel={hotel}
              openMap={openMap}
              key={idx}
              imageStatus={imageStatus}
            />
          ))}
        </div>
      </section>
      <DailyItinerary
        itinerary={trip.itinerary}
        openMap={openMap}
        imageStatus={imageStatus}
      />
    </div>
  );
}

export default Itinerary;
