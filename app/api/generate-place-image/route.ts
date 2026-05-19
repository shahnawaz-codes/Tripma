import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { geoCoordinates, placeName } = await req.json();
    const { latitude, longitude } = geoCoordinates;

    let url = `https://en.wikipedia.org/w/api.php?action=query&generator=search&gsrsearch=${encodeURIComponent(
      placeName,
    )}&gsrlimit=1&prop=pageimages&pithumbsize=600&format=json&origin=*`;

    let res = await axios.get(url, {
      headers: {
        "User-Agent": "MyTripPlanner/1.0",
      },
    });
    let page = res.data?.query?.pages;
    if (page) {
      return NextResponse.json(
        (Object.values(page)[0] as any)?.thumbnail?.source,
      );
    }

    /// ----------------------- fallback-----------------------------------
    url = `https://en.wikipedia.org/w/api.php?action=query&prop=pageimages&pithumbsize=600&generator=geosearch&ggscoord=${latitude}|${longitude}&ggsradius=500&ggslimit=1&format=json&origin=*`;
    res = await axios.get(url, {
      headers: {
        "User-Agent": "MyTripPlanner/1.0",
      },
    });
    page = res.data?.query?.pages;
    if (page) {
      return NextResponse.json(
        (Object.values(page)[0] as any)?.thumbnail?.source,
      );
    }
    return null;
  } catch (error: any) {
    console.log(error.response?.data);

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
}
