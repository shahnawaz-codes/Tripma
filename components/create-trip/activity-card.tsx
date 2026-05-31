"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { Activities } from "@/types/trip";
import Image from "next/image";
import { ArrowRight, Clock, Coins, MapPin, Navigation, ImageOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

type ActivityCardProps = {
  activity: Activities;
  openMap: (lat: number, lng: number, placeId: string) => void;
  index: number;
  imageStatus: string;
};

export function ActivityCard({
  activity,
  openMap,
  index,
  imageStatus,
}: ActivityCardProps) {
  return (
    <div className="flex flex-col overflow-hidden rounded-3xl bg-neutral-50/50 dark:bg-neutral-900/30 border border-neutral-200/50 dark:border-neutral-800/50 transition-all hover:shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:hover:shadow-[0_8px_30px_rgb(255,255,255,0.02)] hover:-translate-y-1 duration-300 w-full group h-full">
      <div className="h-52 shrink-0 relative overflow-hidden bg-neutral-200 dark:bg-neutral-800 m-2 rounded-2xl">
        {imageStatus === "pending" ? (
          <Skeleton className="w-full h-full rounded-2xl" />
        ) : imageStatus === "failed" ? (
          <div className="w-full h-full bg-neutral-100 dark:bg-neutral-900/50 flex flex-col items-center justify-center text-neutral-400 dark:text-neutral-500 gap-2">
            <ImageOff className="w-8 h-8 stroke-[1.5]" />
            <span className="text-xs font-semibold uppercase tracking-wider">No Image</span>
          </div>
        ) : (
          <Image
            unoptimized
            src={
              activity.place_image_url ||
              "https://placehold.co/600x400.png?text=Image+Unavailable"
            }
            alt={activity.place_name}
            className="w-full h-full object-cover transition-transform group-hover:scale-110 duration-700"
            fill
            sizes="100%"
            onError={(e) => {
              (e.target as HTMLImageElement).src =
                "https://placehold.co/600x400.png?text=Image+Unavailable";
            }}
          />
        )}
        <div className="absolute top-4 left-4 bg-white/90 dark:bg-black/80 backdrop-blur-md px-3 py-1.5 rounded-full flex items-center gap-1.5 text-xs font-bold shadow-sm text-neutral-800 dark:text-neutral-100">
          <Navigation className="w-3.5 h-3.5 text-blue-500" />
          <span>Stop {index + 1}</span>
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
            <p className="text-sm line-clamp-1" title={activity.place_address}>
              {activity.place_address}
            </p>
          </div>
        </div>

        <p
          className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed grow line-clamp-3"
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
            className="w-full mt-2 rounded-xl cursor-pointer border-neutral-200 dark:border-neutral-800 text-neutral-800 dark:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-900 font-semibold py-5 transition-all group/btn"
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
  );
}
