import type { Metadata } from "next";
import { fetchQuery } from "convex/nextjs";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { auth } from "@clerk/nextjs/server";

type Props = {
  params: Promise<{ id: string }>;
  children: React.ReactNode;
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  try {
    const { getToken } = await auth();
    const token = (await getToken({ template: "convex" })) ?? undefined;
    const data = await fetchQuery(
      api.trips.getTripById,
      {
        tripId: id as Id<"trips">,
      },
      { token },
    );
    if (data && data.tripPlan) {
      const destination = data.tripPlan.destination || "Trip Details";
      const duration = data.tripPlan.duration || "";
      const budget = data.tripPlan.budget || "";
      return {
        title: `${destination} Travel Itinerary`,
        description: `Explore details, hotels, and activities for the ${duration} trip to ${destination} (${budget} budget) created with AI Trip Planner.`,
      };
    }
  } catch (error) {
    console.error("Error generating metadata for trip ID:", id, error);
  }

  return {
    title: "Trip Details",
    description:
      "View your personalized AI travel itinerary and interactive map details.",
  };
}

export default function TripLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
