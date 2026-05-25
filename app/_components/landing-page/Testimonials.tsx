"use client";
import React from "react";
import { Star, Check } from "lucide-react";
import { motion } from "motion/react";

const TESTIMONIALS = [
  {
    name: "Sarah Chen",
    role: "UX Designer",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&h=120&fit=crop&crop=faces",
    comment: "I planned a 5-day Kyoto trip in under two minutes. Usually, planning takes me weeks of comparing hotel forums and blogs. The AI suggested spots I didn't even know existed!",
    rating: 5,
    location: "San Francisco, CA",
  },
  {
    name: "Marcus Dupont",
    role: "Travel Blogger",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&h=120&fit=crop&crop=faces",
    comment: "The interactive globe mapping is an absolute game-changer. It makes tracing routes through regions like the Swiss Alps incredibly intuitive. Highly recommend for any roadtripper.",
    rating: 5,
    location: "Paris, France",
  },
  {
    name: "Emily Rodriguez",
    role: "Family Coordinator",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&h=120&fit=crop&crop=faces",
    comment: "Traveling with two kids is stressful. The budget estimator let us set realistic expectations for lodging and sightseeing fees before we booked anything. Outstanding helper!",
    rating: 5,
    location: "Austin, TX",
  },
  {
    name: "Julian Kade",
    role: "Software Engineer",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&h=120&fit=crop&crop=faces",
    comment: "Extremely clean product. Having estimated durations between different daily events automatically computed saved us from several railway connection mishaps. Super impressed.",
    rating: 5,
    location: "Berlin, Germany",
  },
];

function Testimonials() {
  return (
    <section className="py-20 bg-muted/20 border-y border-border/40 relative overflow-hidden" id="testimonials-section">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary mb-4 text-xs font-semibold"
          >
            <span>Real Experiences</span>
          </motion.div>
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-4 text-foreground">
            Loved By Modern Travelers
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            See how Tripma helps vacationers design, optimize, and organize their journeys across the globe.
          </p>
        </div>

        {/* Grid layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {TESTIMONIALS.map((t, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.08 }}
              className="bg-card border border-border/60 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex gap-0.5 text-amber-500 mb-4">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>
                <p className="text-muted-foreground text-sm leading-relaxed italic mb-6">
                  "{t.comment}"
                </p>
              </div>

              <div className="flex items-center gap-3 border-t border-border/40 pt-4">
                <img
                  src={t.avatar}
                  alt={t.name}
                  className="w-10 h-10 rounded-full object-cover border"
                />
                <div className="min-w-0">
                  <h4 className="font-bold text-xs text-foreground truncate flex items-center gap-1">
                    {t.name}
                    <span className="bg-primary/10 text-primary p-0.5 rounded-full inline-flex items-center justify-center">
                      <Check className="w-2.5 h-2.5 text-primary" />
                    </span>
                  </h4>
                  <p className="text-[10px] text-muted-foreground truncate">{t.role} • {t.location}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Testimonials;
