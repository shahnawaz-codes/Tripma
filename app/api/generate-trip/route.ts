import { NextResponse } from "next/server";

const FINAL_PROMPT = `
Generate Travel Plan with given details.

Give me:
- Hotel options list with:
  - Hotel Name
  - Hotel Address
  - Price
  - Hotel Image URL
  - Geo Coordinates
  - Rating
  - Description

Also suggest itinerary with:
- Place Name
- Place Details
- Place Image URL
- Geo Coordinates
- Place Address
- Ticket Pricing
- Travel Time for each location
- Best time to visit

Return everything in JSON format.

Output Schema:
{
  "trip_plan": {
    "destination": "string",
    "duration": "string",
    "origin": "string",
    "budget": "string",
    "group_size": "string",

    "hotels": [
      {
        "hotel_name": "string",
        "hotel_address": "string",
        "price_per_night": "string",
        

        "geo_coordinates": {
          "latitude": number,
          "longitude": number
        },

        "rating": number,
        "description": "string"
      }
    ],

    "itinerary": [
      {
        "day": number,
        "day_plan": "string",
        "best_time_to_visit_day": "string",

        "activities": [
          {
            "place_name": "string",
            "place_details": "string",
           

            "geo_coordinates": {
              "latitude": number,
              "longitude": number
            },

            "place_address": "string",
            "ticket_pricing": "string",
            "time_travel_each_location": "string",
            "best_time_to_visit": "string"
          }
        ]
      }
    ]
  }
}
`;
// make a post req
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { message } = body;
    if (!message) {
      return NextResponse.json({
        message: "message is required",
        status: false,
      });
    }
    const normalizedMessages = message.map(
      (msg: { role: string; content: string }) => ({
        role: msg.role === "model" ? "assistant" : msg.role,
        content: msg.content,
      }),
    );
    console.log(normalizedMessages);
    const response = await fetch(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,

          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "openai/gpt-oss-120b:free",
          messages: [
            {
              role: "system",
              content: FINAL_PROMPT,
            },
            ...normalizedMessages,
          ],
        }),
      },
    );

    const data = await response.json();
    if (data.error) {
      console.error("OpenRouter API Error:", data.error);
      return NextResponse.json(data, { status: data.error.code || 500 });
    }

    let parsedData;
    try {
      const content = data.choices?.[0]?.message?.content || "{}";

      // Extract JSON object using regex to handle prepended/appended text
      const jsonMatch = content.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        parsedData = JSON.parse(jsonMatch[0]);
      } else {
        throw new Error("No JSON object found in response");
      }
    } catch (e) {
      console.error(
        "Failed to parse AI response:",
        data.choices?.[0]?.message?.content,
      );
      parsedData = {
        resp:
          data.choices?.[0]?.message?.content ||
          "Sorry, I couldn't understand that.",
        ui: "source",
      };
    }

    return NextResponse.json(parsedData);
  } catch (error: unknown) {
    if (error instanceof Response) {
      if (error?.status === 429) {
        return NextResponse.json(
          { error: "Rate limit hit. Try again in a moment." },
          { status: 429 },
        );
      }
      console.error("API ROUTE ERROR:", error);
      return NextResponse.json(
        {
          error: "Failed to generate trip response",
          details: error instanceof Error ? error.message : String(error),
        },
        { status: 500 },
      );
    }
  }
}
