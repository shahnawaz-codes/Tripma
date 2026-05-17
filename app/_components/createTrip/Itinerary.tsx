"use client";
import { Timeline } from "@/components/ui/timeline";
import {
  MapPin,
  Star,
  Clock,
  Coins,
  Users,
  Calendar,
  Wallet,
  Sparkles,
  Map,
  ArrowRight,
  Navigation,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { TripPlan } from "@/types/trip";



export function Itinerary({ trip_data }: { trip_data: TripPlan }) {
  const trip = trip_data;
  const openMap = (lat: number, lng: number, placeId: string) => {
    const url = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(placeId)}`;
    window.open(url, "_blank");
  };

  const itineraryTimelineData = trip.itinerary.map((day) => ({
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

        <div className="grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-6">
          {day.activities.map((activity, idx) => (
            <div
              key={idx}
              className="flex flex-col overflow-hidden rounded-3xl bg-neutral-50/50 dark:bg-neutral-900/30 border border-neutral-200/50 dark:border-neutral-800/50 transition-all hover:shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:hover:shadow-[0_8px_30px_rgb(255,255,255,0.02)] hover:-translate-y-1 duration-300 w-full group h-full"
            >
              <div className="h-52 shrink-0 relative overflow-hidden bg-neutral-200 dark:bg-neutral-800 m-2 rounded-2xl">
                <img
                  src={activity.place_image_url}
                  alt={activity.place_name}
                  className="w-full h-full object-cover transition-transform group-hover:scale-110 duration-700"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src =
                      "https://placehold.co/600x400?text=Image+Unavailable";
                  }}
                />
                <div className="absolute top-4 left-4 bg-white/90 dark:bg-black/80 backdrop-blur-md px-3 py-1.5 rounded-full flex items-center gap-1.5 text-xs font-bold shadow-sm text-neutral-800 dark:text-neutral-100">
                  <Navigation className="w-3.5 h-3.5 text-blue-500" />
                  <span>Stop {idx + 1}</span>
                </div>
              </div>

              <div className="p-6 flex flex-col grow gap-4">
                <div>
                  <h4
                    className="font-bold text-lg text-neutral-900 dark:text-neutral-100 line-clamp-1 mb-1"
                    title={activity.place_name}
                  >
                    {activity.place_name}
                  </h4>
                  <div className="flex items-start gap-1.5 text-neutral-500 dark:text-neutral-400">
                    <MapPin className="w-4 h-4 shrink-0 mt-0.5" />
                    <p
                      className="text-sm line-clamp-1"
                      title={activity.place_address}
                    >
                      {activity.place_address}
                    </p>
                  </div>
                </div>

                <p
                  className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed flex-grow line-clamp-3"
                  title={activity.place_details}
                >
                  {activity.place_details}
                </p>

                <div className="flex flex-col gap-3 mt-auto pt-5">
                  <div className="grid grid-cols-2 gap-2 text-sm bg-white dark:bg-neutral-950 p-3 rounded-2xl border border-neutral-100 dark:border-neutral-800/80">
                    <div className="flex flex-col gap-0.5">
                      <span className="text-[10px] uppercase font-bold text-neutral-400">
                        Time
                      </span>
                      <div className="flex items-center gap-1.5 text-blue-600 dark:text-blue-400 font-medium">
                        <Clock className="w-3.5 h-3.5 shrink-0" />
                        <span className="line-clamp-1 text-xs">
                          {activity.best_time_to_visit}
                        </span>
                      </div>
                    </div>
                    <div className="flex flex-col gap-0.5">
                      <span className="text-[10px] uppercase font-bold text-neutral-400">
                        Cost
                      </span>
                      <div className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400 font-medium">
                        <Coins className="w-3.5 h-3.5 shrink-0" />
                        <span
                          className="line-clamp-1 text-xs"
                          title={activity.ticket_pricing}
                        >
                          {activity.ticket_pricing}
                        </span>
                      </div>
                    </div>
                  </div>

                  <Button
                    variant="outline"
                    className="w-full mt-2 rounded-xl border-neutral-200 dark:border-neutral-800 text-neutral-800 dark:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-900 font-semibold py-5 transition-all group/btn"
                    onClick={() => {
                      openMap(
                        activity.geo_coordinates.latitude,
                        activity.geo_coordinates.longitude,
                        activity.place_name,
                      );
                    }}
                  >
                    <span>View Location</span>
                    <ArrowRight className="w-4 h-4 ml-2 opacity-50 group-hover/btn:opacity-100 group-hover/btn:translate-x-1 transition-all" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    ),
  }));

  const originName = trip.origin.split(",")[0];
  const destName = trip.destination.split("(")[0].trim();

  return (
    <div className="w-full h-full overflow-y-auto p-4 sm:p-6 pb-20 max-w-7xl mx-auto space-y-16">
      {/* Premium Header */}
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
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-rose-500">
              {originName}
            </span>{" "}
            to{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-indigo-500">
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

      {/* Featured Stays (Hotels) - Moved outside timeline for prominence */}
      <section className="px-2 md:px-6">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-neutral-900 dark:text-white">
            Featured Stays (Hotels)
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {trip.hotels.map((hotel, idx) => (
            <div
              key={idx}
              className="group relative h-[380px] rounded-3xl overflow-hidden cursor-pointer"
              onClick={() => {
                openMap(
                  hotel.geo_coordinates.latitude,
                  hotel.geo_coordinates.longitude,
                  hotel.hotel_name,
                );
              }}
            >
              <img
                src={hotel.hotel_image_url}
                alt={hotel.hotel_name}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                onError={(e) => {
                  (e.target as HTMLImageElement).src =
                    "https://placehold.co/600x800?text=Image+Unavailable";
                }}
              />
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent pointer-events-none" />

              {/* Top badges */}
              <div className="absolute top-4 right-4 bg-black/50 backdrop-blur-md px-3 py-1.5 rounded-full flex items-center gap-1.5 text-xs font-bold text-white">
                <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                <span>{hotel.rating}</span>
              </div>

              {/* Bottom Content */}
              <div className="absolute bottom-0 left-0 w-full p-6 flex flex-col gap-2 pointer-events-none">
                <h3 className="font-bold text-xl text-white line-clamp-1 leading-tight">
                  {hotel.hotel_name}
                </h3>
                <div className="flex items-center gap-1.5 text-neutral-300 text-sm">
                  <MapPin className="w-4 h-4 shrink-0" />
                  <p className="line-clamp-1">{hotel.hotel_address}</p>
                </div>

                <div className="mt-2 flex items-center justify-between">
                  <div className="bg-emerald-500/20 backdrop-blur-md text-emerald-300 border border-emerald-500/30 px-3 py-1.5 rounded-lg text-sm font-bold flex items-center gap-1.5">
                    <Wallet className="w-4 h-4" />
                    {hotel.price_per_night}
                  </div>

                  <div className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20 text-white group-hover:bg-white group-hover:text-black transition-colors">
                    <Map className="w-4 h-4" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Itinerary Timeline */}
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
    </div>
  );
}

export default Itinerary;
