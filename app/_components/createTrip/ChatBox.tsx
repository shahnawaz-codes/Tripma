"use client";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Send, Bot, User, Minus, Plus, Sparkles } from "lucide-react";
import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import { Skeleton } from "@/components/ui/skeleton";
import { useUser } from "@clerk/nextjs";
import { DurationSelector } from "./DurationSelector";

type Message = {
  role: string;
  content: string;
  ui?: string;
};

export const ChatBox = () => {
  const { user } = useUser();
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content:
        "Hi there! I'm your AI travel assistant. Let's plan an amazing trip together. Where would you like to go?",
    },
  ]);
  const [isGeneratingPlan, setIsGeneratingPlan] = useState(false);

  const [userInput, setUserInput] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
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

  //---------Generate plan:
  useEffect(() => {
    const lastMsg = messages[messages.length - 1];
    if (lastMsg.ui === "final") {
      generateFinalTripPlan();
    }
  }, [messages]);
  // call ai endpoint
  const sendMessage = async (text: string) => {
    if (!text.trim()) return;
    // store user ques with role
    let userAsk: Message = {
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
    } catch (error: any) {
      console.error("Failed to send message:", error);
      alert(
        "Backend API Error: " +
          (error.response?.data?.details || error.message),
      );
    } finally {
      setIsLoading(false);
    }
  };
  const generateFinalTripPlan = async () => {
    try {
      setIsGeneratingPlan(true);
      const res = await axios.post("/api/generate-trip", {
        message: messages,
      });
      console.log(res.data);
    } catch (error) {
      console.log("something wrong while generating trip", error);
    } finally {
      setIsGeneratingPlan(false);
    }
  };
  const renderGenerativeUi = (ui: string) => {
    if (!ui) return null;

    const renderOptions = (
      options: { label: string; icon: string; desc?: string }[],
    ) => (
      <div className="grid grid-cols-2 gap-2 mt-3 w-full sm:w-[80%] lg:w-[300px]">
        {options.map((opt) => (
          <Button
            key={opt.label}
            variant="outline"
            className="flex flex-col items-center justify-center gap-1.5 h-auto py-3 px-2 rounded-xl bg-white hover:bg-primary/5 hover:border-primary/40 border-gray-100 transition-all text-xs shadow-sm"
            onClick={() => sendMessage(opt.label)}
            disabled={isLoading}
          >
            <span className="text-2xl mb-0.5">{opt.icon}</span>
            <span className="font-semibold text-gray-700 whitespace-normal text-center leading-tight">
              {opt.label}
            </span>
            {opt.desc && (
              <span className="text-[10px] text-gray-400 font-normal mt-0">
                {opt.desc}
              </span>
            )}
          </Button>
        ))}
      </div>
    );
    if (ui === "source") {
      return renderOptions([
        { label: "New York", icon: "🗽" },
        { label: "London", icon: "💂" },
        { label: "Tokyo", icon: "🗼" },
        { label: "Paris", icon: "🥐" },
      ]);
    } else if (ui === "destination") {
      return renderOptions([
        { label: "Maldives", icon: "🏖️" },
        { label: "Swiss Alps", icon: "🏔️" },
        { label: "Kyoto", icon: "⛩️" },
        { label: "Bali", icon: "🌴" },
      ]);
    } else if (ui === "budget") {
      return renderOptions([
        { label: "Budget", icon: "🎒", desc: "Backpacking" },
        { label: "Moderate", icon: "🏨", desc: "Comfort" },
        { label: "Luxury", icon: "💎", desc: "Premium" },
      ]);
    } else if (ui === "groupSize") {
      return renderOptions([
        { label: "Solo", icon: "👤", desc: "Just me" },
        { label: "Couple", icon: "💑", desc: "Romantic" },
        { label: "Family", icon: "👨‍👩‍👧‍👦", desc: "With kids" },
        { label: "Friends", icon: "👯", desc: "Group trip" },
      ]);
    } else if (ui === "tripDuration") {
      return <DurationSelector onSelect={sendMessage} disabled={isLoading} />;
    } else if (ui === "interests") {
      return renderOptions([
        { label: "Nature", icon: "🌲" },
        { label: "Culture", icon: "🏛️" },
        { label: "Food", icon: "🍜" },
        { label: "Relaxation", icon: "🏖️" },
      ]);
    } else if (ui === "preferences") {
      return renderOptions([
        { label: "Fast Paced", icon: "🏃", desc: "See it all" },
        { label: "Relaxed", icon: "🐢", desc: "Take it easy" },
      ]);
    } else if (ui === "final") {
      return (
        <div className="mt-4 p-5 border border-primary/20 bg-primary/5 rounded-2xl flex flex-col items-center justify-center gap-3 text-center w-full sm:w-[80%] lg:w-[300px]">
          <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-1">
            <Sparkles className="w-6 h-6 text-primary animate-pulse" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-800 text-sm">
              {/* TODO: Change this text to "Your trip plan is ready!" when generation is complete */}
              {isGeneratingPlan
                ? "Your trip plan is generating...."
                : "Your trip plan is ready!"}
            </h3>
            <p className="text-xs text-gray-500 mt-1.5 leading-relaxed">
              Please wait a moment while we craft your perfect itinerary.
            </p>
          </div>
          <Button
            className="w-full mt-3 rounded-xl shadow-sm"
            disabled={isGeneratingPlan}
            onClick={() => {
              // TODO: Implement the logic for when the user clicks "View Trip Plan"
              // 1. Typically, you will save the generated plan to your database and get a trip ID.
              // 2. Use next/navigation router to redirect: router.push(`/trip/${tripId}`)
              console.log(
                "View Trip Plan clicked! Redirecting to trip page...",
              );
            }}
          >
            View Trip Plan
          </Button>
        </div>
      );
    }
    return null;
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
                <img
                  className="rounded-full "
                  src={user?.imageUrl}
                  alt="profile"
                />
              </div>
            </div>
          ) : (
            <div key={idx} className="flex flex-col gap-2 justify-start w-full">
              <div className="flex items-start gap-3 justify-start">
                <div className="w-8 h-8 mt-1 bg-primary/10 rounded-full flex shrink-0 items-center justify-center">
                  <Bot className="w-4 h-4 text-primary" />
                </div>
                <div className="bg-white border border-gray-100 text-gray-800 p-3 px-4 rounded-2xl rounded-tl-sm shadow-sm max-w-[80%]">
                  <p className="text-sm leading-relaxed">{msg.content}</p>
                  {msg.ui && renderGenerativeUi(msg.ui)}
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
