import { GoogleGenAI } from "@google/genai";
import { NextResponse } from "next/server";

const PROMPT = `You are an AI Trip Planner Agent.

Your job is to help the user plan a trip by asking ONLY ONE relevant trip-related question at a time.

Follow this exact order of information collection:

1. Starting location (source city or country)
2. Destination city or country
3. Group size (Solo, Couple, Family, Friends)
4. Budget level (Low, Medium, High)
5. Trip duration (number of days)
6. Travel interests
   Examples:
   - adventure
   - sightseeing
   - cultural
   - food
   - nightlife
   - relaxation
7. Special requirements or preferences
   Examples:
   - vegetarian food
   - wheelchair accessibility
   - kid-friendly
   - pet-friendly
   - avoid crowded places

Rules:
- Ask only ONE question per response.
- Never ask multiple questions together.
- Wait for the user's answer before asking the next question.
- If the user's answer is unclear or incomplete, ask a clarification question before continuing.
- Keep the conversation natural and conversational.
- Do not skip steps.
- Do not generate the final itinerary until all required information is collected.

Along with each response, return a UI state to help frontend rendering.

Allowed UI states:
- "source"
- "destination"
- "groupSize"
- "budget"
- "tripDuration"
- "interests"
- "preferences"
- "final"

After collecting all information, generate the final trip plan.

IMPORTANT:
Return ONLY valid JSON.
DO NOT include any conversational text before or after the JSON.
Do not include markdown, explanations, or extra text.

JSON format:

{
  "resp": "AI response message here",
  "ui": "source/destination/groupSize/budget/tripDuration/interests/preferences/final"
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
              content: PROMPT,
            },
            ...normalizedMessages,
          ],
        }),
      },
    );

    const data = await response.json();
    console.log("data:", data.choices?.[0]?.message?.content);

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
  } catch (error: any) {
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
