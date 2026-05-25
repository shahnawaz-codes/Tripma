"use client";
import React from "react";
import { Play, Sparkles, MapPin, Eye } from "lucide-react";
import { motion } from "motion/react";

function DemoVideo() {
  return (
    <div className="py-20 bg-muted/30 border-y border-border/40 relative overflow-hidden" id="demo-video-section">
      {/* Glow backgrounds */}
      <div className="absolute top-[10%] left-1/2 -translate-x-1/2 w-[700px] h-[300px] bg-primary/10 rounded-full blur-3xl opacity-40 -z-10"></div>

      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary mb-4 text-xs font-semibold"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Product Tour</span>
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl md:text-5xl font-extrabold tracking-tight mb-4 text-foreground"
          >
            See It In Action
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-muted-foreground text-lg max-w-2xl mx-auto"
          >
            Watch how our AI travel co-pilot generates custom itineraries, maps routes, and structures budget estimates in real-time.
          </motion.p>
        </div>
        
        {/* Browser Mockup Wrapper */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative max-w-4xl mx-auto rounded-2xl overflow-hidden shadow-[0_30px_70px_rgba(0,0,0,0.15)] dark:shadow-[0_30px_70px_rgba(0,0,0,0.35)] group border border-border/80 bg-background"
        >
          {/* Browser Header dots */}
          <div className="flex items-center justify-between px-4 py-3 bg-muted/60 border-b border-border/40">
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-red-400/80 inline-block"></span>
              <span className="w-3 h-3 rounded-full bg-yellow-400/80 inline-block"></span>
              <span className="w-3 h-3 rounded-full bg-green-400/80 inline-block"></span>
            </div>
            <div className="text-[10px] text-muted-foreground font-semibold uppercase tracking-wider">Product Walkthrough</div>
            <div className="w-12"></div>
          </div>

          <div className="aspect-video relative bg-slate-950 flex items-center justify-center cursor-pointer overflow-hidden">
            {/* Dark blend background */}
            <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 via-orange-500/10 to-transparent mix-blend-overlay"></div>
            
            {/* Play Button Overlay */}
            <div className="absolute inset-0 flex items-center justify-center z-10 bg-black/30 group-hover:bg-black/40 transition-colors duration-300">
              <button className="relative w-20 h-20 bg-white dark:bg-white text-primary rounded-full flex items-center justify-center shadow-[0_10px_30px_rgba(0,0,0,0.2)] group-hover:scale-110 group-hover:shadow-[0_15px_40px_rgba(0,0,0,0.3)] transition-all duration-300 active:scale-95 cursor-pointer">
                <Play className="w-8 h-8 text-primary fill-primary ml-1.5" />
              </button>
            </div>

            {/* Video mockup background image */}
            <img 
              src="https://images.unsplash.com/photo-1488646953014-85cb44e25828?q=80&w=1200&auto=format&fit=crop" 
              alt="Travel Planning Demo" 
              className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:scale-103 transition-transform duration-700" 
            />
            
            {/* Browser Glassmorphic Indicator */}
            <div className="absolute bottom-4 left-4 right-4 flex justify-between text-xs text-foreground/90 font-semibold z-20 bg-background/80 dark:bg-slate-900/80 backdrop-blur-md p-3.5 rounded-xl border border-white/20 dark:border-white/5 shadow-lg select-none">
              <div className="flex items-center gap-2">
                <Sparkles className="w-3.5 h-3.5 text-orange-500 animate-pulse" />
                <span>AI Travel Assistant Demo Video</span>
              </div>
              <span className="font-mono bg-muted px-2 py-0.5 rounded text-[10px]">02:14</span>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default DemoVideo;
