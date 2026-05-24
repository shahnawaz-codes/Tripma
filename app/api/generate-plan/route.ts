import { NextResponse } from "next/server";
import { aj } from "../arcjet/route";
import { auth } from "@clerk/nextjs/server";
const PROMPT = `You are an AI Trip Planner Agent.

You must collect all travel details step-by-step. Ask ONLY ONE question at a time in this exact order:
1. source (departure location)
2. destination (where they want to travel)
3. groupSize (number of travelers)
4. tripDuration (number of days)
5. budget (budget tier or range)

Rules:
- NEVER skip a step. You must collect all 5 details.
- Ask ONLY ONE question per turn. Never ask multiple questions.
- If the user's answer to the current step is unclear, invalid, or a greeting (like "hi" or "hello"), you must ask for the current step again. Do not move to the next step.
- Do NOT generate any itinerary or trip plan yet.
- Once you have successfully collected and confirmed all 5 details, only then send a short summary/confirmation message and set ui to "final".

Allowed ui values:
"source"
"destination"
"groupSize"
"budget"
"tripDuration"
"final"

You must reply with ONLY a valid JSON object matching this schema (no extra text, no conversational wrapper):
{
  "resp": "Your response message to the user here",
  "ui": "current_step_name_or_final"
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
    const models = [
      "meta-llama/llama-3.3-70b-instruct:free",
      "qwen/qwen3-coder:free",
      "google/gemma-4-31b-it:free",
      "openai/gpt-oss-120b:free",
      "openai/gpt-oss-20b:free",
      "z-ai/glm-4.5-air:free",
      "openrouter/free",
    ];

    let response;
    let data;
    let success = false;
    let parsedData = null;
    let lastResortFallback = null;

    for (const model of models) {
      try {
        console.log(`Attempting plan generation with model: ${model}`);
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
                  content: PROMPT,
                },
                ...normalizedMessages,
              ],
            }),
          },
        );

        data = await response.json();
        if (response.ok && !data.error) {
          let content = data.choices?.[0]?.message?.content || "";
          console.log(`Model ${model} raw content:`, content);

          // Clean up reasoning/thinking/tool tags from the content
          content = content.replace(/<think>[\s\S]*?<\/think>/gi, "");
          content = content.replace(/<\/?think>/gi, "");
          content = content.replace(/<tool_call>[\s\S]*?<\/tool_call>/gi, "");
          content = content.replace(/<\/?tool_call>/gi, "");
          content = content.replace(/<\/?\w+[^>]*>/g, ""); // strip other stray HTML/XML-like tags

          // Store a last resort fallback message from the first model that gave a non-empty text response
          const lines = content
            .split("\n")
            .map((l: string) => l.trim())
            .filter(Boolean);
          const uniqueLines = Array.from(new Set(lines));
          const cleanText = uniqueLines.join("\n");
          if (cleanText && !lastResortFallback) {
            lastResortFallback = {
              resp: cleanText,
              ui: "source",
            };
          }

          // Extract JSON object using regex to handle prepended/appended text
          const jsonMatch = content.match(/\{[\s\S]*\}/);
          if (jsonMatch) {
            try {
              const tempParsed = JSON.parse(jsonMatch[0]);
              // We got a JSON object! Let's ensure it has the required fields.
              if (tempParsed && typeof tempParsed === "object") {
                if (tempParsed.resp || tempParsed.ui) {
                  parsedData = {
                    resp:
                      tempParsed.resp || "Let's continue planning your trip.",
                    ui: tempParsed.ui || "source",
                  };
                  success = true;
                  break;
                } else {
                  console.warn(
                    `Model ${model} returned JSON but it is missing 'resp' or 'ui' fields:`,
                    tempParsed,
                  );
                }
              }
            } catch (e) {
              console.warn(
                `Model ${model} returned invalid JSON:`,
                jsonMatch[0],
              );
            }
          } else {
            console.warn(
              `Model ${model} response did not contain a JSON object.`,
            );
          }
        } else {
          console.warn(
            `Model ${model} failed with error:`,
            data?.error || data,
          );
        }

        // Wait 1 second before trying the fallback model to prevent fast concurrent rate limits
        const retryAfter = data?.metadata?.retry_after_seconds || 3;

        await new Promise((resolve) => setTimeout(resolve, retryAfter * 1000));
      } catch (err) {
        console.error(`Error with model ${model}:`, err);
      }
    }

    if (!success) {
      if (lastResortFallback) {
        console.warn("Using last resort fallback response from a model.");
        parsedData = lastResortFallback;
      } else {
        console.error("All plan generation models failed.");
        return NextResponse.json(
          data || { error: "All models in fallback chain failed" },
          { status: data?.error?.code || 500 },
        );
      }
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
