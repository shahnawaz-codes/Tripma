"use client";

import Map, { Marker } from "react-map-gl/maplibre";
import "maplibre-gl/dist/maplibre-gl.css";
import { TripPlan } from "@/types/trip";

interface GlobeMapProps {
  tripData: TripPlan | null;
  style?: React.CSSProperties;
  className?: string;
}

export default function GlobeMap({
  tripData,
  style,
  className,
}: GlobeMapProps) {
  // Find the first valid activity or hotel geo-coordinates to center the map
  const firstCoords =
    tripData?.itinerary
      ?.flatMap((day) => day.activities)
      ?.find(
        (activity) =>
          activity?.geo_coordinates?.latitude &&
          activity?.geo_coordinates?.longitude,
      )?.geo_coordinates ||
    tripData?.hotels?.find(
      (hotel) =>
        hotel?.geo_coordinates?.latitude && hotel?.geo_coordinates?.longitude,
    )?.geo_coordinates;

  const initialLongitude = firstCoords?.longitude ?? 50;
  const initialLatitude = firstCoords?.latitude ?? 25;
  const initialZoom = firstCoords ? 10 : 2;

  return (
    <div className={`w-full h-full relative ${className || ""}`} style={style}>
      <Map
        initialViewState={{
          longitude: initialLongitude,
          latitude: initialLatitude,
          zoom: initialZoom,
          pitch: 0,
        }}
        style={{ width: "100%", height: "100%" }}
        mapStyle="https://basemaps.cartocdn.com/gl/voyager-gl-style/style.json"
        projection={{ type: "globe" }} // ← this gives the sphere look
      >
        {tripData?.itinerary?.flatMap((day) =>
          day.activities
            .filter(
              (activity) =>
                activity?.geo_coordinates?.latitude &&
                activity?.geo_coordinates?.longitude,
            )
            .map((activity, idx) => (
              <Marker
                key={`${day.day}-${idx}`}
                longitude={activity.geo_coordinates.longitude}
                latitude={activity.geo_coordinates.latitude}
                anchor="bottom"
              >
                <div className="group relative flex flex-col items-center">
                  {/* Premium Marker Pin */}
                  <div className="bg-primary/95 hover:bg-primary dark:bg-primary/90 text-white text-[11px] font-semibold px-2.5 py-1 rounded-full shadow-lg border border-white/20 hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer flex items-center gap-1.5 select-none whitespace-nowrap">
                    <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse shrink-0" />
                    <span>{activity.place_name}</span>
                  </div>

                  {/* Tooltip on hover */}
                  <div className="absolute bottom-full mb-2 hidden group-hover:flex flex-col items-center pointer-events-none z-50">
                    <div className="bg-neutral-900/95 dark:bg-neutral-800/95 text-white text-[10px] p-2.5 rounded-xl shadow-xl w-48 border border-neutral-700/50 backdrop-blur-sm">
                      <p className="font-bold text-xs mb-0.5 leading-tight text-white">
                        {activity.place_name}
                      </p>
                      {activity.place_details && (
                        <p className="text-neutral-300 font-normal line-clamp-3 leading-snug text-[9px] mt-1">
                          {activity.place_details}
                        </p>
                      )}
                    </div>
                    {/* Arrow */}
                    <div className="w-2 h-2 bg-neutral-900 dark:bg-neutral-800 rotate-45 -mt-1 border-r border-b border-neutral-700/50" />
                  </div>
                </div>
              </Marker>
            )),
        )}
      </Map>
    </div>
  );
}
