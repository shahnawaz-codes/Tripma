import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Sparkles, Send, MapPin, Heart, Mountain } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

function Hero() {
  return (
    <div className="relative overflow-hidden bg-background pt-[120px] pb-[80px] md:pt-[150px] md:pb-[120px]">
      {/* Background decoration */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/20 rounded-full blur-3xl opacity-50 -z-10 animate-pulse"></div>
      
      <div className="container mx-auto px-4 md:px-6 flex flex-col items-center text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 text-primary mb-6 text-sm font-medium">
          <Sparkles className="w-4 h-4" />
          <span>AI-Powered Travel Intelligence</span>
        </div>
        
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tight max-w-4xl text-foreground mb-6">
          Plan Your Dream Trip in <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-orange-500">Seconds</span>
        </h1>
        
        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mb-10">
          Your personal AI travel expert. Get tailored itineraries and hidden gems in seconds.
        </p>
        
        <div className="w-full max-w-2xl mx-auto mb-6 bg-card rounded-3xl p-4 md:p-5 shadow-2xl border border-border/50 relative text-left">
          <Textarea 
            placeholder="Where do you want to go? E.g., Plan a 5-day trip to Tokyo focusing on food and culture..."
            className="min-h-[120px] border-none focus-visible:ring-0 shadow-none text-base md:text-lg resize-none p-2 bg-transparent pb-14"
          />
          <div className="absolute bottom-4 right-4">
            <Button className="rounded-full w-12 h-12 p-0 flex items-center justify-center shadow-lg hover:shadow-xl transition-all group bg-primary">
              <Send className="w-5 h-5 text-primary-foreground group-hover:translate-x-1 transition-transform -ml-0.5" />
            </Button>
          </div>
        </div>

        {/* Suggestions Outside */}
        <div className="flex flex-wrap justify-center items-center gap-3 w-full max-w-2xl mx-auto">
          <button className="flex items-center gap-2 text-sm bg-white/50 dark:bg-slate-800/50 border border-border/50 hover:bg-white dark:hover:bg-slate-800 text-foreground px-4 py-2 rounded-full transition-all shadow-sm">
            <div className="bg-blue-100 dark:bg-blue-900/50 p-1.5 rounded-full">
              <MapPin className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
            </div>
            3 days in Paris
          </button>
          <button className="flex items-center gap-2 text-sm bg-white/50 dark:bg-slate-800/50 border border-border/50 hover:bg-white dark:hover:bg-slate-800 text-foreground px-4 py-2 rounded-full transition-all shadow-sm">
            <div className="bg-pink-100 dark:bg-pink-900/50 p-1.5 rounded-full">
              <Heart className="w-3.5 h-3.5 text-pink-600 dark:text-pink-400" />
            </div>
            Bali honeymoon
          </button>
          <button className="flex items-center gap-2 text-sm bg-white/50 dark:bg-slate-800/50 border border-border/50 hover:bg-white dark:hover:bg-slate-800 text-foreground px-4 py-2 rounded-full transition-all shadow-sm hidden sm:flex">
            <div className="bg-green-100 dark:bg-green-900/50 p-1.5 rounded-full">
              <Mountain className="w-3.5 h-3.5 text-green-600 dark:text-green-400" />
            </div>
            Swiss Alps road trip
          </button>
        </div>
      </div>
    </div>
  );
}

export default Hero;
