import { NextResponse } from "next/server";
import { aj } from "../arcjet/route";
import { auth } from "@clerk/nextjs/server";
const PROMPT = `You are an AI Trip Planner Agent.

Ask ONLY ONE question at a time and follow this exact order:

1. source
2. destination
3. groupSize
4. budget
5. tripDuration

Rules:
- Never skip steps.
- Never ask multiple questions.
- Wait for the user's answer before continuing.
- If the answer is unclear, ask again for the same step.
- Do NOT generate any itinerary or trip plan.
- After collecting all details, only send a short summary/confirmation message.
- When finished, return ui as "final".

Allowed ui values:
"source"
"destination"
"groupSize"
"budget"
"tripDuration"
"final"

Return ONLY valid JSON:

{
  "resp": "message",
  "ui": "source/destination/groupSize/budget/tripDuration/final"
}`;
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
    const { userId, has } = await auth();
    const hasPremiumAccess = has({ plan: "monthly" });
    const decision = await aj.protect(req, {
      userId: userId || " ",
      requested: 1,
    });
    console.log(decision.reason?.remaining, hasPremiumAccess);
    if (
  decision.reason?.isRateLimit() &&
  decision.reason.remaining === 0 &&
  !hasPremiumAccess
) {
  return NextResponse.json({
    resp: "No Free Credit Remaining",
    ui: "limit",
  });
}

    // we only want role and content from message. not ui
    const normalizedMessages = message.map(
      (msg: { role: string; content: string }) => ({
        role: msg.role,
        content: msg.content,
      }),
    );
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
              content: PROMPT,
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

      // Extract the FIRST valid JSON object using regex
      const jsonMatch = content.match(/\{[^{}]+\}/);
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
  } catch (error) {
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
