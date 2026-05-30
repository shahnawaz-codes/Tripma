import { getWikipediaImage } from "@/lib/wikipedia";
import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { geoCoordinates, placeName } = await req.json();
    const { latitude, longitude } = geoCoordinates || {};
    if (!placeName || !latitude || !longitude) {
      return NextResponse.json(
        {
          message: "placeName, latitude and longitude are required",
        },
        {
          status: 400,
        },
      );
    }
    const imageSource = await getWikipediaImage(placeName, latitude, longitude);
    if (!imageSource) {
      return NextResponse.json(
        "https://placehold.co/600x800.png?text=Image+Unavailable",
      );
    }
    return NextResponse.json(imageSource);
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      return NextResponse.json(
        {
          message: error.message,
          data: error.response?.data,
        },
      {
          status: error.response?.status || 500,
        },
      );
    }

    return NextResponse.json(
      {
        message: "Unknown error",
      },
      {
        status: 500,
      },
    );
  }
}
