import Hero from "@/components/landing-page/hero";
import Features from "@/components/landing-page/features";
import HowItWorks from "@/components/landing-page/how-it-works";
import DemoVideo from "@/components/landing-page/demo-video";
import PopularDestinations from "@/components/landing-page/popular-destinations";
import Testimonials from "@/components/landing-page/testimonials";
import FAQ from "@/components/landing-page/faq";
import Footer from "@/components/footer";
import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";

export const metadata: Metadata = {
  title: "Tripma - AI-Powered Trip Planner & Travel Itinerary Creator",
  description:
    "Plan your dream trip in seconds with Tripma. Get tailor-made day-by-day itineraries, recommended stays, budget cost estimates, and interactive 3D route maps.",
};

export default function page() {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground antialiased selection:bg-primary/20 selection:text-primary">
      <main className="flex-1">
        {/* Hero Section */}
        <Hero />

        {/* Core Features Bento Grid */}
        <Features />

        {/* How It Works Section */}
        <HowItWorks />

        {/* Demo Video Walkthrough */}
        <DemoVideo />

        {/* Popular Destinations Grid */}
        <PopularDestinations />

        {/* Customer Testimonials */}
        <Testimonials />

        {/* FAQ Accordion Section */}
        <FAQ />

        {/* Bottom CTA Conversion Banner */}
        <section className="py-20 relative overflow-hidden bg-muted/20 border-t border-border/40">
          {/* Decorative backdrop */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-gradient-to-r from-primary/10 to-orange-500/10 rounded-full blur-3xl opacity-50 -z-10"></div>

          <div className="container mx-auto px-4 md:px-6 text-center max-w-4xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary mb-6 text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5 text-orange-500 animate-pulse" />
              <span>Free to start</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-6 leading-tight">
              Ready to Craft Your Next Dream Vacation?
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto mb-10">
              Join thousands of travelers who are using AI to bypass hours of
              research and build perfectly optimized itineraries.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md mx-auto">
              <Link href="/create-new-trip" className="w-full sm:w-auto">
                <Button
                  size="lg"
                  className="w-full sm:w-auto rounded-full bg-gradient-to-r from-primary to-orange-500 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300 gap-2 cursor-pointer hover:scale-102 h-12 px-8"
                >
                  <span>Start Planning Now</span>
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
              <Link href="/pricing" className="w-full sm:w-auto">
                <Button
                  size="lg"
                  variant="outline"
                  className="w-full sm:w-auto rounded-full border-border/80 text-foreground hover:bg-muted/40 font-semibold transition-all duration-300 h-12 px-8"
                >
                  View Pricing
                </Button>
              </Link>
            </div>

            <p className="text-xs text-muted-foreground mt-6">
              No credit card required. Generate your first trip in under 60
              seconds.
            </p>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
