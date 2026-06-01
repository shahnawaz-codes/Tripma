import arcjet, { fixedWindow, tokenBucket } from "@arcjet/next";
import { NextResponse } from "next/server";

export const aj = arcjet({
  key: process.env.ARCJET_KEY!,
  rules: [
    // Create a fixed window to rate limit.
    fixedWindow({
      mode: "LIVE", // will block requests. Use "DRY_RUN" to log only
      characteristics: ["userId"], // track requests by a custom user ID
      window: "1d",
      max: 2,
    }),
  ],
});

export const checkCreditsAj = arcjet({
  key: process.env.ARCJET_KEY!,
  rules: [
    fixedWindow({
      mode: "DRY_RUN", // dry run mode to inspect credits without decrementing/blocking
      characteristics: ["userId"],
      window: "1d",
      max: 2,
    }),
  ],
});

