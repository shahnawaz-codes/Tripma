import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Plan a New Trip",
  description: "Use our interactive AI travel advisor to generate your custom travel itinerary, select hotels, explore top places, and see everything mapped on an interactive globe.",
};

export default function CreateTripLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
