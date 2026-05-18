"use client";

import { MapPin, Star, Wallet, Map } from "lucide-react";
import { TripPlan } from "@/types/trip";

interface FeaturedStaysProps {
  hotels: TripPlan["hotels"];
  openMap: (lat: number, lng: number, placeId: string) => void;
}

export function FeaturedStays({ hotels, openMap }: FeaturedStaysProps) {
  return (
    <section className="px-2 md:px-6">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl md:text-3xl font-bold text-neutral-900 dark:text-white">
          Featured Stays (Hotels)
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {hotels.map((hotel, idx) => (
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
            <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/40 to-transparent pointer-events-none" />

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
  );
}
