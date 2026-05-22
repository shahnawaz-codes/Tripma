"use client";
import Itinerary from "@/app/_components/createTrip/Itinerary";
import { api } from "@/convex/_generated/api";
import { TripPlan } from "@/types/trip";
import { useQuery } from "convex/react";
import { number } from "motion/react";
import { useParams } from "next/navigation";

export default function TripId() {
  const params: any = useParams();

  const data = useQuery(api.trips.getTripById, { tripId: params.id });

  console.log(data);
  if (!data) return <div>loading.....</div>;
  return (
    <>
      <Itinerary trip_data={data.tripPlan} />
    </>
  );
}
