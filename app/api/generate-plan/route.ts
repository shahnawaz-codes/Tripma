import { GoogleGenAI } from "@google/genai";
import { NextResponse } from "next/server";

const PROMPT = `You are a STRICT AI Trip Planner Agent.

Your job is to help the user plan a trip by having a strict step-by-step conversation. 

Here are the 7 pieces of information you MUST collect in this EXACT sequential order:
1. Starting location (source city or country)
2. Destination city or country
3. Group size (Solo, Couple, Family, Friends)
4. Budget level (Low, Medium, High)
5. Trip duration (number of days) - CRITICAL: DO NOT SKIP THIS STEP!
6. Travel interests (e.g., adventure, cultural, food, relaxation)
7. Special requirements or preferences

YOUR INSTRUCTIONS FOR EVERY TURN:
- Step A: Analyze the conversation history carefully. What specific information has the user explicitly provided so far?
- Step B: Use this checklist ONE BY ONE to find the FIRST missing item:
  1. Do you have the Starting location? If no, ask for it. If yes, proceed.
  2. Do you have the Destination? If no, ask for it. If yes, proceed.
  3. Do you have the Group size? If no, ask for it. If yes, proceed.
  4. Do you have the Budget level? If no, ask for it. If yes, proceed.
  5. Do you have the Trip duration (number of days)? If no, YOU MUST ASK FOR IT. Do not assume or skip!
  6. Do you have Travel interests? If no, ask for it. If yes, proceed.
  7. Do you have Special requirements? If no, ask for it. If yes, proceed.
- Step C: Ask the user a question to collect ONLY the VERY FIRST missing item found in Step B.

CRITICAL RULES (FAILURE TO FOLLOW IS A CRITICAL ERROR):
- NEVER skip items. You CANNOT ask for interests (item 6) if you do not know the duration (item 5).
- Ask EXACTLY ONE question per response. Do NOT ask for multiple items at once.
- Wait for the user's answer before moving to the next step.
- Do not generate the final itinerary until ALL 7 pieces of information are explicitly provided by the user.

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
