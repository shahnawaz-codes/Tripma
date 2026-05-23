import { NextResponse } from "next/server";

const FINAL_PROMPT = `
You are an expert AI Travel Planner. Generate a comprehensive travel plan based on the user's travel details.

IMPORTANT INSTRUCTIONS:
1. You must suggest a list of 3 to 5 realistic hotel options in the destination matching the budget tier.
2. You must suggest a daily itinerary that covers the entire duration day-by-day (e.g. if the duration is 6 days, you must generate a day-by-day itinerary with exactly 6 days, from Day 1 to Day 6).
3. For each day, include 2 to 4 activities/places to visit. Do NOT leave the activities empty.
4. Each activity and hotel must have realistic details, including actual/realistic names, physical addresses, ratings, ticket pricing, and geo-coordinates (latitude and longitude numbers).
5. For geo_coordinates, provide valid numeric values for latitude and longitude (not strings, and do not leave them empty).
6. Do NOT leave "hotels" or "itinerary" as empty arrays under any circumstances. They must be fully populated.
7. Return ONLY a valid JSON object matching the output schema. No conversational prefix, suffix, or markdown wrapping.

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
        role: msg.role,
        content: msg.content,
      }),
    );

    // Append a final user trigger to make sure the model generates the structured output
    normalizedMessages.push({
      role: "user",
      content: "Based on all the details collected in our conversation history above, please generate the complete travel plan now following the requested JSON schema. Do not leave the hotels or itinerary arrays empty; populate them with realistic, detailed information matching the destination, budget, duration, group size, and origin.",
    });

    console.log("Sending messages to OpenRouter:", normalizedMessages);

    const models = [
      "meta-llama/llama-3.3-70b-instruct:free",
      "qwen/qwen-2.5-coder-32b-instruct:free",
      "openai/gpt-oss-120b:free",
      "google/gemma-2-9b-it:free",
      "meta-llama/llama-3.1-8b-instruct:free",
      "openrouter/free"
    ];

    let response;
    let data;
    let success = false;

    for (const model of models) {
      try {
        console.log(`Attempting generation with model: ${model}`);
        response = await fetch(
          "https://openrouter.ai/api/v1/chat/completions",
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              model: model,
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

        data = await response.json();
        if (response.ok && !data.error) {
          success = true;
          break;
        }

        console.warn(`Model ${model} failed with error:`, data?.error || data);
        // Wait 1 second before trying the fallback model to prevent fast concurrent rate limits
        await new Promise((resolve) => setTimeout(resolve, 1000));
      } catch (err) {
        console.error(`Error with model ${model}:`, err);
      }
    }

    if (!success) {
      console.error("All models in the fallback chain failed.");
      return NextResponse.json(
        data || { error: "All models in fallback chain failed" },
        { status: data?.error?.code || 500 }
      );
    }

    let parsedData;
    try {
      let content = data.choices?.[0]?.message?.content || "{}";

      // Clean up reasoning/thinking/tool tags from the content
      content = content.replace(/<think>[\s\S]*?<\/think>/gi, "");
      content = content.replace(/<\/?think>/gi, "");
      content = content.replace(/<tool_call>[\s\S]*?<\/tool_call>/gi, "");
      content = content.replace(/<\/?tool_call>/gi, "");
      content = content.replace(/<\/?\w+[^>]*>/g, ""); // strip other stray HTML/XML-like tags

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

      // Clean up raw response content for the fallback user message
      let rawText = data.choices?.[0]?.message?.content || "Sorry, I couldn't understand that.";
      rawText = rawText.replace(/<think>[\s\S]*?<\/think>/gi, "");
      rawText = rawText.replace(/<\/?think>/gi, "");
      rawText = rawText.replace(/<tool_call>[\s\S]*?<\/tool_call>/gi, "");
      rawText = rawText.replace(/<\/?tool_call>/gi, "");
      rawText = rawText.replace(/<\/?\w+[^>]*>/g, "");

      // Handle duplicate output blocks common in reasoning models
      const lines = rawText.split("\n").map((l: string) => l.trim()).filter(Boolean);
      const uniqueLines = Array.from(new Set(lines));
      const cleanText = uniqueLines.join("\n");

      parsedData = {
        resp: cleanText,
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
