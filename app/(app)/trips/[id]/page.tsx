"use client";
import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";
import { number } from "motion/react";
import { useParams } from "next/navigation";

export default function TripId() {
  const params: any = useParams();

  const data = useQuery(api.trips.getTripById, { tripId: params.id });
  console.log(data);
  if (!data) return <div>loading.....</div>;
  return <>
    </>;
}
