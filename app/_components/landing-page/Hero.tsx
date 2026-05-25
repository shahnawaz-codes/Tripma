"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { useUser } from "@clerk/nextjs";
import {
  Sparkles,
  ArrowRight,
  Play,
  MapPin,
  Heart,
  Mountain,
  Calendar,
  Compass,
  DollarSign,
  Bot,
  Star,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "motion/react";

function Hero() {
  const { user } = useUser();
  const router = useRouter();

  const handleStartPlanning = () => {
    if (!user) {
      router.push("/sign-in");
      return;
    }
    router.push("/create-new-trip");
  };

  const scrollToDemo = () => {
    const element = document.getElementById("demo-video-section");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="relative overflow-hidden bg-background pt-[100px] pb-[80px] md:pt-[130px] md:pb-[100px]">
      {/* Background decoration */}
      <div className="absolute top-[-10%] left-[5%] w-[600px] h-[600px] bg-primary/10 rounded-full blur-3xl opacity-60 -z-10"></div>
      <div className="absolute bottom-[10%] right-[5%] w-[500px] h-[500px] bg-orange-500/10 rounded-full blur-3xl opacity-50 -z-10"></div>

      <div className="container mx-auto px-4 md:px-6 flex flex-col items-center text-center">
        {/* Sparkle Badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary mb-6 text-sm font-semibold shadow-sm backdrop-blur-md cursor-pointer hover:bg-primary/15 transition-all"
        >
          <Sparkles className="w-4 h-4 text-orange-500 animate-pulse" />
          <span>v2.0: AI-Powered Travel Engine</span>
        </motion.div>

        {/* Hero Title */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight max-w-4xl text-foreground mb-6 leading-[1.1]"
        >
          Plan Your Next Adventure in{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-orange-500 to-amber-500">
            Seconds
          </span>
        </motion.h1>

        {/* Hero Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-lg md:text-xl text-muted-foreground max-w-2xl mb-10 leading-relaxed"
        >
          Your intelligent co-pilot for travel. Skip the hours of research and
          get beautifully organized daily itineraries customized to your taste,
          budget, and vibe.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12 w-full max-w-md mx-auto"
        >
          <Button
            size="lg"
            className="w-full sm:w-auto rounded-full bg-gradient-to-r from-primary to-orange-500 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300 gap-2 cursor-pointer hover:scale-102 h-12 px-8"
            onClick={handleStartPlanning}
          >
            <span>Start Planning Free</span>
            <ArrowRight className="w-4 h-4" />
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="w-full sm:w-auto rounded-full border-border/80 text-foreground hover:bg-muted/40 font-semibold transition-all duration-300 gap-2 cursor-pointer h-12 px-8"
            onClick={scrollToDemo}
          >
            <Play className="w-4 h-4 fill-foreground/10 text-foreground" />
            <span>Watch Demo</span>
          </Button>
        </motion.div>

        {/* Social Proof */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-16 text-sm text-muted-foreground bg-muted/20 px-6 py-2.5 rounded-full border border-border/40 backdrop-blur-sm shadow-sm"
        >
          <div className="flex -space-x-2">
            {[
              "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=faces",
              "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=faces",
              "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=faces",
              "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=faces",
            ].map((url, i) => (
              <img
                key={i}
                src={url}
                alt="User avatar"
                className="w-7 h-7 rounded-full border-2 border-background object-cover"
              />
            ))}
          </div>
          <div className="flex items-center gap-1.5">
            <div className="flex text-amber-500">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-3.5 h-3.5 fill-current" />
              ))}
            </div>
            <span>Trusted by 10,000+ travelers worldwide</span>
          </div>
        </motion.div>

        {/* High-Fidelity Dashboard Mockup */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 50, delay: 0.5 }}
          className="w-full max-w-5xl mx-auto rounded-2xl border border-border/60 bg-card shadow-[0_20px_50px_rgba(0,0,0,0.15)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.3)] overflow-hidden relative"
        >
          {/* Browser Header Bar */}
          <div className="flex items-center justify-between px-4 py-3 bg-muted/50 border-b border-border/60">
            <div className="flex items-center gap-1.5">
              <span className="w-3.5 h-3.5 rounded-full bg-red-400 dark:bg-red-500/80 inline-block"></span>
              <span className="w-3.5 h-3.5 rounded-full bg-yellow-400 dark:bg-yellow-500/80 inline-block"></span>
              <span className="w-3.5 h-3.5 rounded-full bg-green-400 dark:bg-green-500/80 inline-block"></span>
            </div>
            <div className="w-1/2 sm:w-1/3 bg-background border border-border/60 py-1.5 px-3 rounded-md text-[11px] text-muted-foreground select-none truncate flex items-center justify-center gap-1">
              <Compass className="w-3 h-3 text-primary" />
              <span>tripma.ai/my-trips/kyoto-culinary-adventure</span>
            </div>
            <div className="flex gap-2 opacity-0 sm:opacity-100">
              <span className="w-4 h-4 bg-muted border rounded-sm inline-block"></span>
              <span className="w-4 h-4 bg-muted border rounded-sm inline-block"></span>
            </div>
          </div>

          {/* App Simulated Workspace */}
          <div className="grid grid-cols-1 md:grid-cols-5 h-[340px] md:h-[450px] overflow-hidden text-left bg-background text-foreground">
            {/* Sidebar Mockup */}
            <div className="hidden md:flex col-span-1 border-r border-border/60 bg-muted/20 p-4 flex-col justify-between">
              <div className="space-y-4">
                <div className="flex items-center gap-2 pb-3 border-b border-border/40">
                  <div className="w-6 h-6 bg-primary rounded-md flex items-center justify-center">
                    <span className="text-[10px] font-bold text-white">T</span>
                  </div>
                  <span className="text-xs font-bold tracking-wide">
                    Tripma AI
                  </span>
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-2 px-2.5 py-1.5 bg-primary/10 text-primary rounded-md text-xs font-semibold">
                    <Compass className="w-3.5 h-3.5" />
                    <span>My Trips</span>
                  </div>
                  <div className="flex items-center gap-2 px-2.5 py-1.5 text-muted-foreground hover:bg-muted/50 rounded-md text-xs font-medium cursor-pointer transition-colors">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>Discover</span>
                  </div>
                  <div className="flex items-center gap-2 px-2.5 py-1.5 text-muted-foreground hover:bg-muted/50 rounded-md text-xs font-medium cursor-pointer transition-colors">
                    <DollarSign className="w-3.5 h-3.5" />
                    <span>Budgets</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2 bg-muted/60 p-2 rounded-lg border">
                <div className="w-6 h-6 rounded-full bg-orange-100 flex items-center justify-center text-[10px] font-bold text-orange-600">
                  S
                </div>
                <div className="truncate">
                  <p className="text-[10px] font-semibold truncate leading-none">
                    Sarah Chen
                  </p>
                  <span className="text-[8px] text-muted-foreground truncate">
                    srk@gmail.com
                  </span>
                </div>
              </div>
            </div>

            {/* Left Chat Pane Mockup */}
            <div className="col-span-1 md:col-span-2 border-r border-border/60 flex flex-col justify-between bg-card">
              {/* Chat Header */}
              <div className="px-4 py-3 bg-muted/20 border-b border-border/40 flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                  <Bot className="w-4 h-4 text-primary" />
                </div>
                <div>
                  <h4 className="text-xs font-bold">AI Trip Planner</h4>
                  <p className="text-[9px] text-muted-foreground">
                    Always ready to build itineraries
                  </p>
                </div>
              </div>

              {/* Chat Message Logs */}
              <div className="p-4 flex-1 overflow-y-auto space-y-4 text-xs">
                {/* User Msg */}
                <div className="flex items-start gap-2 justify-end">
                  <div className="bg-primary text-white p-2.5 rounded-xl rounded-tr-none shadow-sm max-w-[85%] text-[11px] leading-normal">
                    Plan a 5-day cultural trip to Kyoto, Japan. I love foodie
                    spots, historical temples, and quiet gardens!
                  </div>
                  <div className="w-6 h-6 rounded-full bg-orange-100 flex shrink-0 items-center justify-center text-[9px] font-bold text-orange-600 mt-0.5">
                    S
                  </div>
                </div>

                {/* Assistant Msg */}
                <div className="flex items-start gap-2">
                  <div className="w-6 h-6 rounded-full bg-primary/10 flex shrink-0 items-center justify-center mt-0.5">
                    <Bot className="w-3.5 h-3.5 text-primary" />
                  </div>
                  <div className="bg-muted/40 border border-border/40 text-foreground p-2.5 rounded-xl rounded-tl-none shadow-sm max-w-[85%] text-[11px] leading-normal">
                    I'd love to help! I've custom-designed a 5-day Kyoto
                    itinerary focusing on Zen temples, local food alleys, and
                    traditional matcha tasting.
                    <div className="mt-2 p-2 bg-background border rounded-lg flex items-center justify-between gap-2 shadow-xs cursor-pointer hover:border-primary/50 transition-colors">
                      <div className="flex items-center gap-2 truncate">
                        <div className="w-5 h-5 bg-orange-100 rounded flex items-center justify-center">
                          <Sparkles className="w-3 h-3 text-orange-500" />
                        </div>
                        <span className="text-[10px] font-semibold text-primary truncate">
                          Kyoto Culinary & Culture Plan
                        </span>
                      </div>
                      <span className="text-[9px] text-muted-foreground whitespace-nowrap bg-muted px-1.5 py-0.5 rounded font-mono">
                        Ready
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Input Area Mock */}
              <div className="p-3 bg-muted/10 border-t border-border/40">
                <div className="bg-background border rounded-lg px-3 py-2 flex items-center justify-between gap-2">
                  <span className="text-[11px] text-muted-foreground">
                    Add more coffee shops to day 3...
                  </span>
                  <div className="w-7 h-7 bg-primary rounded-full flex items-center justify-center shadow-md shadow-primary/20">
                    <ArrowRight className="w-3.5 h-3.5 text-white" />
                  </div>
                </div>
              </div>
            </div>

            {/* Right Itinerary Details Mockup */}
            <div className="col-span-1 md:col-span-2 flex flex-col bg-muted/10 h-full overflow-y-auto">
              {/* Header */}
              <div className="p-4 border-b border-border/40 bg-background flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-bold flex items-center gap-1.5">
                    <MapPin className="w-4 h-4 text-primary" />
                    Kyoto, Japan
                  </h3>
                  <p className="text-[10px] text-muted-foreground mt-0.5">
                    5 Days Plan • Culinary & Heritage
                  </p>
                </div>
                <div className="bg-primary/10 text-primary border border-primary/20 text-[9px] font-semibold px-2 py-0.5 rounded-full">
                  ⭐ 4.9 Score
                </div>
              </div>

              {/* Itinerary Contents */}
              <div className="p-4 space-y-4 text-xs">
                {/* Stay Card */}
                <div className="space-y-1.5">
                  <h4 className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">
                    Recommended Stay
                  </h4>
                  <div className="bg-background border rounded-xl p-2.5 flex gap-3 shadow-xs">
                    <div className="w-14 h-14 bg-gradient-to-tr from-slate-200 to-slate-300 dark:from-slate-700 dark:to-slate-800 rounded-lg flex items-center justify-center shrink-0 overflow-hidden relative">
                      <img
                        src="https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?q=80&w=200&auto=format&fit=crop"
                        className="object-cover w-full h-full"
                        alt="Kyoto Hotel"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-[11px] text-foreground truncate">
                        Kyoto Granbell Hotel
                      </p>
                      <p className="text-[9px] text-muted-foreground">
                        Gion, Kyoto • 2 mins walk to Gion Station
                      </p>
                      <div className="flex items-center justify-between mt-1">
                        <span className="text-[10px] font-semibold text-primary">
                          $175 / night
                        </span>
                        <div className="flex text-amber-500 text-[8px] items-center gap-0.5">
                          <Star className="w-2.5 h-2.5 fill-current" /> 4.8
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Day 1 */}
                <div className="space-y-2">
                  <h4 className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary inline-block"></span>
                    Day 1: Historic Higashiyama & Local Foods
                  </h4>
                  <div className="space-y-1.5 pl-2.5 border-l border-primary/20">
                    {/* Activity 1 */}
                    <div className="bg-background border rounded-lg p-2 hover:border-primary/30 transition-colors">
                      <div className="flex justify-between items-start gap-2">
                        <div>
                          <p className="font-bold text-[10.5px]">
                            Kiyomizu-dera Temple
                          </p>
                          <p className="text-[9px] text-muted-foreground mt-0.5">
                            09:00 AM • 2 hours • Iconic wooden stage
                          </p>
                        </div>
                        <span className="text-[9px] font-mono text-muted-foreground">
                          🎟️ $4.00
                        </span>
                      </div>
                    </div>
                    {/* Activity 2 */}
                    <div className="bg-background border rounded-lg p-2 hover:border-primary/30 transition-colors">
                      <div className="flex justify-between items-start gap-2">
                        <div>
                          <p className="font-bold text-[10.5px]">
                            Nishiki Market Culinary Walk
                          </p>
                          <p className="text-[9px] text-muted-foreground mt-0.5">
                            12:30 PM • 1.5 hours • Try skewers & matcha ice
                            cream
                          </p>
                        </div>
                        <span className="text-[9px] font-mono text-emerald-600 font-semibold bg-emerald-50 dark:bg-emerald-950/40 px-1 rounded">
                          🍜 Foodie Pick
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Floating UI Elements */}
          <div className="absolute top-1/4 right-[2%] bg-background/80 dark:bg-neutral-900/80 backdrop-blur-md border border-border/80 p-2.5 rounded-xl shadow-lg flex items-center gap-2 hover:scale-105 transition-all select-none hidden lg:flex">
            <div className="bg-emerald-100 dark:bg-emerald-950/50 p-1.5 rounded-full">
              <DollarSign className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
            </div>
            <div>
              <p className="text-[9px] text-muted-foreground font-medium leading-none">
                Total Est. Cost
              </p>
              <p className="text-[11px] font-bold text-foreground mt-0.5">
                $1,240 USD
              </p>
            </div>
          </div>

          <div className="absolute bottom-[8%] left-[2%] bg-background/80 dark:bg-neutral-900/80 backdrop-blur-md border border-border/80 p-2.5 rounded-xl shadow-lg flex items-center gap-2.5 hover:scale-105 transition-all select-none hidden lg:flex">
            <div className="bg-orange-100 dark:bg-orange-950/50 p-1.5 rounded-full">
              <Sparkles className="w-3.5 h-3.5 text-orange-600 dark:text-orange-400" />
            </div>
            <div>
              <p className="text-[9px] text-muted-foreground font-medium leading-none">
                Map Routes
              </p>
              <p className="text-[11px] font-bold text-foreground mt-0.5">
                3D Map Ready
              </p>
            </div>
          </div>
        </motion.div>

        {/* Suggestion Quick Tags */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.7 }}
          className="flex flex-wrap justify-center items-center gap-3 w-full max-w-2xl mx-auto mt-10"
        >
          <button
            onClick={handleStartPlanning}
            className="flex items-center gap-2 text-sm bg-card border border-border/60 hover:border-primary/50 text-foreground px-4.5 py-2 rounded-full cursor-pointer hover:shadow-md hover:scale-102 transition-all"
          >
            <div className="bg-blue-100 dark:bg-blue-900/50 p-1.5 rounded-full">
              <MapPin className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
            </div>
            3 days in Paris
          </button>
          <button
            onClick={handleStartPlanning}
            className="flex items-center gap-2 text-sm bg-card border border-border/60 hover:border-primary/50 text-foreground px-4.5 py-2 rounded-full cursor-pointer hover:shadow-md hover:scale-102 transition-all"
          >
            <div className="bg-pink-100 dark:bg-pink-900/50 p-1.5 rounded-full">
              <Heart className="w-3.5 h-3.5 text-pink-600 dark:text-pink-400" />
            </div>
            Bali honeymoon
          </button>
          <button
            onClick={handleStartPlanning}
            className="flex items-center gap-2 text-sm bg-card border border-border/60 hover:border-primary/50 text-foreground px-4.5 py-2 rounded-full cursor-pointer hover:shadow-md hover:scale-102 transition-all hidden sm:flex"
          >
            <div className="bg-green-100 dark:bg-green-900/50 p-1.5 rounded-full">
              <Mountain className="w-3.5 h-3.5 text-green-600 dark:text-green-400" />
            </div>
            Swiss Alps road trip
          </button>
        </motion.div>
      </div>
    </div>
  );
}

export default Hero;
