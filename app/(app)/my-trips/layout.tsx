import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "My Adventures",
  description: "Explore, manage, and view details for all your customized AI travel itineraries in one place.",
};

export default function MyTripsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
