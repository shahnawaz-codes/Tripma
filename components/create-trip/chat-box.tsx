"use client";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { nanoid } from "nanoid";
import slugify from "slugify";
import { Textarea } from "@/components/ui/textarea";
import { RenderGenerativeUi } from "@/components/generative/render-generative-ui";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { generateImgForHotels } from "@/lib/generate-img-hotels";
import { generateImgForactivities } from "@/lib/generate-img-activities";
import { TripPlan } from "@/types/trip";
import { useUser } from "@clerk/nextjs";
import axios from "axios";
import { useMutation } from "convex/react";
import { Bot, Send } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

type Message = {
  role: string;
  content: string;
  ui?: string;
};
type Props = {
  isGeneratingPlan: boolean;
  setIsGeneratingPlan: (isGeneratingPlan: boolean) => void;
  tripId: Id<"trips"> | undefined;
  setTripId: (tripId: Id<"trips">) => void;
};
export const ChatBox = ({
  isGeneratingPlan,
  setIsGeneratingPlan,
  tripId,
  setTripId,
}: Props) => {
  const { user } = useUser();
  const userImage = user?.imageUrl;
  const saveTripMutation = useMutation(api.trips.saveNewTrip);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content:
        "Hi there! I'm your AI travel assistant. Let's plan an amazing trip together. Where would you like to go?",
    },
  ]);
  const [userInput, setUserInput] = useState<string>("");
  const [tripGenerated, setTripGenerated] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [generationError, setGenerationError] = useState<"limit" | "failed" | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  ///------ auto scroll feat
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      scrollToBottom();
    }, 100);
    return () => clearTimeout(timeoutId);
  }, [messages]);

  //-------- generate Trip
  async function generateFinalTripPlan() {
    try {
      setIsGeneratingPlan(true);
      setTripGenerated(true);
      setGenerationError(null);
      const res = await axios.post("/api/generate-trip", {
        message: messages,
      });
      if (res.status == 200) {
        const tripData = res?.data?.trip_plan || res?.data;
        const hotelWithImage = await generateImgForHotels(tripData?.hotels);
        const itineraryWithImage = await generateImgForactivities(
          tripData?.itinerary,
        );
        const tripPlan = {
          ...tripData,
          hotels: hotelWithImage,
          itinerary: itineraryWithImage,
        };
        // unique id to make unique share url
        const shareId =
          slugify(tripData.destination, { lower: true }) + "-" + nanoid(5);
        // save to db
        const id = await saveTripMutation({
          tripPlan: tripPlan,
          shareId: shareId,
        });
        console.log("saved trip with id:", id);
        setTripId(id);
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 429) {
          setGenerationError("limit");
          setMessages((prev) => [
            ...prev,
            {
              role: "assistant",
              content:
                "You’ve used all free trip generations. Upgrade to continue.",
              ui: "limit",
            },
          ]);
        } else {
          setGenerationError("failed");
          setMessages((prev) => [
            ...prev,
            {
              role: "assistant",
              content:
                "Sorry, I encountered an error while generating your travel plan. The AI models failed to return a valid plan. Please try again.",
            },
          ]);
        }
      } else {
        setGenerationError("failed");
        setMessages((prev) => [
          ...prev,
          {
            role: "assistant",
            content:
              "Sorry, an unexpected error occurred. Please try again.",
          },
        ]);
      }
      console.log("something wrong while generating trip", error);
    } finally {
      setIsGeneratingPlan(false);
    }
  }
  // call ai endpoint
  const sendMessage = async (text: string) => {
    if (!text.trim()) return;
    // store user ques with role
    const userAsk: Message = {
      role: "user",
      content: text,
    };
    // update message state after getting user que
    const newMessages = [...messages, userAsk];
    setMessages(newMessages);
    setUserInput("");
    try {
      setIsLoading(true);
      const res = await axios.post("/api/generate-plan", {
        message: newMessages,
      });
      const { resp, ui } = res.data;
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: resp, ui: ui },
      ]);
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        console.error("Failed to send message:", error);
        alert(
          "Backend API Error: " +
            (error.response?.data?.details || error.message),
        );
      }
    } finally {
      setIsLoading(false);
    }
  };

  const RenderGenerativeUiProps = {
    sendMessage,
    isLoading,
    isGeneratingPlan,
    tripId,
    generateFinalTripPlan,
    tripGenerated,
    generationError,
  };

  return (
    <div className="flex flex-col h-full w-full bg-white overflow-hidden">
      {/* Header */}
      <div className="p-4 border-b bg-slate-50/50 flex items-center gap-3">
        <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
          <Bot className="w-5 h-5 text-primary" />
        </div>
        <div>
          <h2 className="font-semibold text-gray-800">AI Trip Planner</h2>
          <p className="text-xs text-gray-500">Always ready to help</p>
        </div>
      </div>

      {/* Chat messages */}
      <section className="flex-1 overflow-y-auto p-4 space-y-6 bg-slate-50/30">
        {messages.map((msg, idx) =>
          msg.role === "user" ? (
            <div key={idx} className="flex items-start gap-3 justify-end">
              <div className="bg-primary text-primary-foreground p-3 px-4 rounded-2xl rounded-tr-sm shadow-sm max-w-[80%]">
                <p className="text-sm leading-relaxed">{msg.content}</p>
              </div>
              <div
                className="w-8 h-8 mt-1 bg-gray-200 flex shrink-0 items-center justify-center
              rounded-full 
              "
              >
                <Image
                  className="rounded-full "
                  src={userImage || ""}
                  alt="profile"
                  width={24}
                  height={24}
                />
              </div>
            </div>
          ) : (
            <div key={idx} className="flex flex-col gap-2 justify-start w-full">
              <div className="flex items-start gap-3 justify-start">
                <div className="w-8 h-8 mt-1 bg-primary/10 rounded-full flex shrink-0 items-center justify-center">
                  <Bot className="w-4 h-4 text-primary" />
                </div>
                <div
                  className={`bg-white border border-gray-100 text-gray-800 p-3 px-4 rounded-2xl rounded-tl-sm shadow-sm ${msg.ui ? "w-full max-w-full lg:max-w-none" : "max-w-[80%]"}`}
                >
                  <p className="text-sm leading-relaxed">{msg.content}</p>
                  {msg.ui && (
                    <RenderGenerativeUi
                      ui={msg.ui}
                      {...RenderGenerativeUiProps}
                    />
                  )}
                </div>
              </div>
            </div>
          ),
        )}

        {isLoading && (
          <div className="flex items-start gap-3 justify-start">
            <div className="w-8 h-8 mt-1 bg-primary/10 rounded-full flex shrink-0 items-center justify-center">
              <Bot className="w-4 h-4 text-primary" />
            </div>
            <div className="bg-white border border-gray-100 p-4 px-4 rounded-2xl rounded-tl-sm shadow-sm max-w-[80%] w-[250px]">
              <div className="flex flex-col gap-2.5">
                <Skeleton className="h-3 w-full" />
                <Skeleton className="h-3 w-3/4" />
                <Skeleton className="h-3 w-4/5" />
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </section>

      {/* Input box */}
      <section className="p-4 bg-white border-t">
        <div className="w-full relative bg-slate-50 border rounded-2xl focus-within:ring-1 focus-within:ring-primary focus-within:border-primary transition-all">
          <Textarea
            placeholder="Type your message here..."
            className="min-h-[60px] max-h-[150px] border-none focus-visible:ring-0 shadow-none text-sm resize-none p-4 pr-16 bg-transparent"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                sendMessage(userInput);
              }
            }}
          />
          <div className="absolute bottom-2 right-2">
            <Button
              className="rounded-full w-10 h-10 p-0 flex items-center justify-center shadow-md hover:shadow-lg transition-all group bg-primary"
              onClick={() => sendMessage(userInput)}
            >
              <Send className="w-4 h-4 text-primary-foreground group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};
