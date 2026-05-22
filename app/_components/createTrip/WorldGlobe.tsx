"use client";

import { Activity, useRef } from "react";
import Map, { Marker, Popup } from "react-map-gl/maplibre";
import "maplibre-gl/dist/maplibre-gl.css";
import { TripPlan } from "@/types/trip";

export default function GlobeMap({ tripData }: { tripData: TripPlan | null }) {
  return (
    <Map
      initialViewState={{
        longitude: 50,
        latitude: 25,
        zoom: 2,
        pitch: 0,
      }}
      style={{ width: "100%", height: "100vh" }}
      mapStyle="https://tiles.openfreemap.org/styles/liberty"
      projection={{ type: "globe" }} // ← this gives the sphere look
    >
      {/* Example marker */}
      {tripData?.itinerary?.flatMap((day) =>
        day.activities.map((activity, idx) => (
          <Marker
            key={`${day.day}-${idx}`}
            longitude={activity.geo_coordinates.longitude}
            latitude={activity.geo_coordinates.latitude}
          >
            <div className="bg-blue-500 text-white text-xs px-2 py-1 rounded-full">
              {activity.place_name}
            </div>
          </Marker>
        )),
      )}
    </Map>
  );
}
