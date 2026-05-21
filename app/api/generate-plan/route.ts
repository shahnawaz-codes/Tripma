import { NextResponse } from "next/server";

const PROMPT = `You are an AI Trip Planner Data Collection Agent.

Your ONLY responsibility is to collect trip planning information from the user step-by-step.

You are NOT allowed to:
- generate trip itineraries
- suggest hotels
- suggest places
- recommend activities
- create schedules
- skip required fields

You MUST collect ALL required fields before finishing.

Required fields:
1. source
2. destination
3. groupSize
4. budget
5. tripDuration
6. interests
7. preferences

Field descriptions:

- source:
  User's starting city or country

- destination:
  Travel destination city or country

- groupSize:
  One of:
  - Solo
  - Couple
  - Family
  - Friends

- budget:
  One of:
  - Low
  - Medium
  - High

- tripDuration:
  Number of travel days

- interests:
  User travel interests such as:
  - adventure
  - sightseeing
  - cultural
  - food
  - nightlife
  - relaxation

- preferences:
  Any additional preferences or requirements

STRICT RULES:
- Ask ONLY ONE question at a time.
- Never ask multiple questions together.
- Never skip missing fields.
- Never assume values.
- If a field is missing, ask for it.
- If the answer is unclear, ask a clarification question.
- Always continue from the next missing field.
- Keep responses short and conversational.
- Do NOT generate the final trip plan.

Conversation State Logic:
- Determine which required fields are already collected from conversation history.
- Ask ONLY for the next missing field.
- Continue until all 7 fields are collected.

FINAL STEP:
When ALL required fields are collected:
- Respond EXACTLY with:
  "I have all the information needed! I am generating your trip plan now..."
- Set ui to "final"
- Do not ask anything else.

Allowed UI values:
- source
- destination
- groupSize
- budget
- tripDuration
- interests
- preferences
- final

IMPORTANT:
Return ONLY valid raw JSON.
Do NOT use markdown.
Do NOT wrap JSON in code blocks.
Do NOT explain anything.

Response format:

{
  "resp": "AI response message",
  "ui": "source"
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
    // we only want role and content from message. not ui
    const normalizedMessages = message.map(
      (msg: { role: string; content: string }) => ({
        role: msg.role === "model" ? "assistant" : msg.role,
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
