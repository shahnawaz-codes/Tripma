import { Play } from 'lucide-react';
import React from 'react';

function DemoVideo() {
  return (
    <div className="py-20 bg-muted/30">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">See It In Action</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Watch how our AI crafts the perfect itinerary for your next vacation in just a few simple steps.
          </p>
        </div>
        
        <div className="relative max-w-4xl mx-auto rounded-2xl overflow-hidden shadow-2xl group border border-border/50 bg-background">
          <div className="aspect-video relative bg-slate-900/5 flex items-center justify-center">
            {/* Fallback for the video / Thumbnail area */}
            <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 to-orange-500/10 mix-blend-overlay"></div>
            
            <button className="relative z-10 w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
              <Play className="w-8 h-8 text-primary ml-1" />
            </button>
            
            {/* The user will replace this with their actual video tag */}
            <div className="absolute bottom-4 left-4 right-4 flex justify-between text-sm text-foreground/70 font-medium z-10 bg-white/80 backdrop-blur-sm p-3 rounded-lg border border-white/20">
              <span>Demo Video (Add your video here)</span>
              <span>02:14</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DemoVideo;
