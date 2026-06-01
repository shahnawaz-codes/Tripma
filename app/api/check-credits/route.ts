import { NextResponse } from "next/server";
import { checkCreditsAj } from "@/lib/arcjet";
import { auth } from "@clerk/nextjs/server";

export async function GET(req: Request) {
  try {
    const { userId, has } = await auth();
    if (!userId) {
      return NextResponse.json(
        {
          error: "Unauthorized",
        },
        {
          status: 401,
        },
      );
    }

    const hasPremiumAccess = has({ plan: "monthly" });

    // If premium, bypass limit checks
    if (hasPremiumAccess) {
      return NextResponse.json({
        remaining: 9999,
        hasPremiumAccess: true,
      });
    }

    // Call Arcjet check in DRY_RUN mode
    const decision = await checkCreditsAj.protect(req, {
      userId: userId || " ",
    });

    let remaining = 0;
    if (decision.reason.isRateLimit()) {
      remaining = decision.reason.remaining;
    }

    return NextResponse.json({
      remaining,
      hasPremiumAccess: false,
    });
  } catch (error) {
    console.error("Failed to check credits:", error);
    return NextResponse.json(
      {
        error: "Failed to check credit status",
        details: error instanceof Error ? error.message : String(error),
      },
      {
        status: 500,
      },
    );
  }
}
