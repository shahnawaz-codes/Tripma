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
import { Bot, Send, AlertTriangle, ArrowRight } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";

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
  const { user, isLoaded } = useUser();
  const userImage = user?.imageUrl;
  const saveTripMutation = useMutation(api.trips.saveNewTrip);
  const router = useRouter();

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
  const [generationError, setGenerationError] = useState<
    "limit" | "failed" | null
  >(null);
  
  const [credits, setCredits] = useState<number | null>(null);
  const [hasPremium, setHasPremium] = useState<boolean>(false);
  const [checkingCredits, setCheckingCredits] = useState<boolean>(true);

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

  //-------- check user credits at session start
  useEffect(() => {
    async function checkUserCredits() {
      try {
        setCheckingCredits(true);
        const res = await axios.get("/api/check-credits");
        if (res.status === 200) {
          setCredits(res.data.remaining);
          setHasPremium(res.data.hasPremiumAccess);
        }
      } catch (error) {
        console.error("Error checking credits:", error);
      } finally {
        setCheckingCredits(false);
      }
    }

    if (isLoaded) {
      if (user) {
        checkUserCredits();
      } else {
        setCheckingCredits(false);
      }
    }
  }, [user, isLoaded]);

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
        // unique id to make unique share url
        const shareId =
          slugify(tripData.destination, { lower: true }) + "-" + nanoid(5);
        // save to db
        const id = await saveTripMutation({
          tripPlan: tripData,
          shareId: shareId,
        });
        setTripId(id);
        // Decrement local credits count since a credit was successfully consumed
        setCredits((prev) => (prev !== null && prev > 0 ? prev - 1 : 0));
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 429) {
          setGenerationError("limit");
          setCredits(0);
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
            content: "Sorry, an unexpected error occurred. Please try again.",
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
    if (credits === 0 && !hasPremium) return;
    
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
    <div className="flex flex-col h-full w-full bg-white overflow-hidden relative">
      {/* Header */}
      <div className="p-4 border-b bg-slate-50/50 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
            <Bot className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h2 className="font-semibold text-gray-800">AI Trip Planner</h2>
            <p className="text-xs text-gray-500">Always ready to help</p>
          </div>
        </div>

        {/* Credit Count Indicator */}
        {checkingCredits ? (
          <div className="w-32 h-6 bg-slate-100 rounded-full animate-pulse border" />
        ) : credits !== null ? (
          <div className="text-xs px-3 py-1.5 rounded-full bg-slate-100 border border-slate-200 text-slate-600 font-medium transition-all duration-300">
            {hasPremium ? (
              <span className="text-primary font-bold">Premium Plan</span>
            ) : (
              <span>
                {credits} {credits === 1 ? "generation" : "generations"} remaining
              </span>
            )}
          </div>
        ) : null}
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
            placeholder={
              credits === 0 && !hasPremium
                ? "Chat locked - 0 generations left"
                : "Type your message here..."
            }
            className="min-h-[60px] max-h-[150px] border-none focus-visible:ring-0 shadow-none text-sm resize-none p-4 pr-16 bg-transparent"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            disabled={
              isLoading ||
              checkingCredits ||
              (credits === 0 && !hasPremium)
            }
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
              disabled={
                isLoading ||
                checkingCredits ||
                (credits === 0 && !hasPremium) ||
                !userInput.trim()
              }
            >
              <Send className="w-4 h-4 text-primary-foreground group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </Button>
          </div>
        </div>
      </section>

      {/* Gated chat overlay if credits = 0 */}
      {credits === 0 && !hasPremium && (
        <div className="absolute inset-x-0 bottom-0 top-[73px] z-50 bg-white/85 backdrop-blur-md flex flex-col items-center justify-center p-6 text-center animate-in fade-in duration-300">
          <div className="max-w-sm p-8 rounded-3xl border border-red-100 bg-white shadow-2xl flex flex-col items-center gap-5 text-center">
            <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center text-red-500 shadow-inner">
              <AlertTriangle className="w-8 h-8 animate-bounce" />
            </div>
            <div className="space-y-2">
              <h3 className="font-extrabold text-gray-900 text-lg tracking-tight">
                You have 0 generations left
              </h3>
              <p className="text-sm text-gray-500 leading-relaxed">
                You've used all your free credits. Upgrade to a premium plan to unlock unlimited custom trip planning and detailed itineraries.
              </p>
            </div>
            <Button
              className="w-full mt-2 rounded-2xl py-6 font-bold shadow-lg shadow-orange-500/20 bg-gradient-to-r from-primary to-orange-500 text-white border-none hover:opacity-95 cursor-pointer flex items-center justify-center gap-2 group text-sm"
              onClick={() => router.push("/pricing")}
            >
              <span>Upgrade to Premium</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

