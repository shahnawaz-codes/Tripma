import { GoogleGenAI } from "@google/genai";
import { NextResponse } from "next/server";

const PROMPT = `You are a STRICT AI Trip Planner Agent.

Your job is to help the user plan a trip by having a strict step-by-step conversation. 

Here are the 7 pieces of information you MUST collect in this EXACT sequential order:
1. Starting location (source city or country)
2. Destination city or country
3. Group size (Solo, Couple, Family, Friends)
4. Budget level (Low, Medium, High)
5. Trip duration (number of days)
6. Travel interests (e.g., adventure, cultural, food, relaxation)
7. Special requirements or preferences

YOUR INSTRUCTIONS FOR EVERY TURN:
- Step A: Analyze the conversation history carefully. What specific information has the user provided so far?
- Step B: Look at the list of 7 items above. What is the VERY FIRST item on the list that is still missing?
- Step C: Ask the user a question to collect ONLY that first missing item. Do NOT ask for multiple items at once.

CRITICAL RULES (FAILURE TO FOLLOW IS A CRITICAL ERROR):
- NEVER skip items. You cannot ask for the budget (item 4) if you do not know the group size (item 3).
- You MUST explicitly ask for "Trip duration" (item 5). Do not assume the duration.
- Ask EXACTLY ONE question per response.
- Wait for the user's answer before moving to the next step.
- Do not generate the final itinerary until ALL 7 pieces of information are explicitly provided by the user. If they haven't provided the duration, you MUST ask for it.

Along with each response, return a UI state.
Allowed UI states: "source", "destination", "groupSize", "budget", "tripDuration", "interests", "preferences", "final"

After collecting all 7 pieces of information, DO NOT generate the final trip plan. Just say "I have all the information needed! I am generating your trip plan now..." and return the "final" UI state.

CRITICAL OUTPUT FORMAT:
- Return EXACTLY ONE JSON object.
- DO NOT output multiple JSON objects. (e.g., Never do {...}{...})
- DO NOT include any conversational text outside the JSON.
- DO NOT use markdown code blocks (like \`\`\`json).

JSON format:
{
  "resp": "Your SINGLE question or response here",
  "ui": "one_of_the_allowed_ui_states_here"
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
