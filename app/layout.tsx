import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import ConvexClientProvider from "./ConvexClientProvider";

const outfit = Outfit({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "AI Trip Planner - Plan Your Dream Trip in Seconds",
    template: "%s | AI Trip Planner",
  },
  description:
    "Your personal AI travel expert. Get tailored itineraries, curated hotel options, and activities mapped on an interactive 3D globe in seconds.",
  keywords: [
    "ai trip planner",
    "travel planner",
    "itinerary generator",
    "ai travel assistant",
    "custom travel itinerary",
    "trip creator",
    "travel schedule",
    "vacation planner",
    "smart travel",
    "interactive travel map",
  ],
  authors: [{ name: "AI Trip Planner Team" }],
  creator: "AI Trip Planner Team",
  publisher: "AI Trip Planner",
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
  ),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    title: "AI Trip Planner - Plan Your Dream Trip in Seconds",
    description:
      "Get personalized itineraries, curated hotel options, and activities mapped on a 3D globe using next-gen AI.",
    siteName: "AI Trip Planner",
    images: [
      {
        url: "/logo.svg",
        width: 1200,
        height: 630,
        alt: "AI Trip Planner Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Trip Planner - Plan Your Dream Trip in Seconds",
    description:
      "Get personalized itineraries, curated hotel options, and activities mapped on a 3D globe using next-gen AI.",
    images: ["/logo.svg"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={outfit.className}>
      <link rel="icon" href="/logo.svg" sizes="any" />
      <body className="min-h-screen flex flex-col">
        <ClerkProvider>
          <ConvexClientProvider>{children}</ConvexClientProvider>
        </ClerkProvider>
      </body>
    </html>
  );
}
