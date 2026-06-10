"use client";

import { ReactNode, useEffect } from "react";
import { ConvexReactClient } from "convex/react";
import { ConvexProviderWithClerk } from "convex/react-clerk";
import { useAuth } from "@clerk/nextjs";
import Provider from "./provider";

if (!process.env.NEXT_PUBLIC_CONVEX_URL) {
  throw new Error("Missing NEXT_PUBLIC_CONVEX_URL in your .env file");
}

const convex = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL);

export default function ConvexClientProvider({
  children,
}: {
  children: ReactNode;
}) {
  useEffect(() => {
    import("@plausible-analytics/tracker").then(({ init }) => {
      init({
        domain: "https://tripma-ten.vercel.app",
        autoCapturePageviews: true,
      });
    });
  }, []);

  return (
    <ConvexProviderWithClerk client={convex} useAuth={useAuth}>
      <Provider> {children}</Provider>
    </ConvexProviderWithClerk>
  );
}
