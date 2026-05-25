"use client";
import React, { useState } from "react";
import { ChevronDown, HelpCircle } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

const FAQ_LIST = [
  {
    question: "How does the AI Trip Planner generate my itineraries?",
    answer: "Our system combines advanced AI models with verified global maps, attraction reviews, and local routing logic. By analyzing your travel days, interests, and budget limits, it organizes a day-by-day itinerary that balances sightseeing, meals, and rest.",
  },
  {
    question: "Is it free to start planning?",
    answer: "Yes, you can generate your initial trip plans completely free. If you find yourself planning frequently or need advanced exporting capabilities (like offline PDF downloads or unlimited credits), you can upgrade to one of our premium plans.",
  },
  {
    question: "Can I customize the generated trip plan?",
    answer: "Absolutely! The AI-generated plan is a flexible starting point. You can add or delete individual activities, swap out suggested hotels, edit scheduling times, and reorganize the details directly in your interactive trip dashboard.",
  },
  {
    question: "How do I share my itinerary with others?",
    answer: "Every trip in your dashboard has a unique, secure link that you can share with travel partners, family, or friends. Additionally, you can export your entire schedule to a clean PDF format or sync it directly to Google Calendar.",
  },
  {
    question: "Does it support international destinations?",
    answer: "Yes, our travel intelligence covers locations worldwide. Whether you are mapping out a weekend escape in New York, a foodie tour in Kyoto, or a multi-stop road trip across Europe, the AI will pull relevant local hotspots.",
  },
];

function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-20 bg-background relative overflow-hidden" id="faq-section">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary mb-4 text-xs font-semibold"
          >
            <span>Have Questions?</span>
          </motion.div>
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-4 text-foreground">
            Frequently Asked Questions
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Got queries about how Tripma operates? We have gathered answers to the most common questions here.
          </p>
        </div>

        {/* Accordions */}
        <div className="max-w-3xl mx-auto space-y-4">
          {FAQ_LIST.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className="bg-card border border-border/60 hover:border-primary/20 rounded-2xl overflow-hidden shadow-xs transition-all duration-200"
              >
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full flex items-center justify-between p-5 text-left font-bold text-sm sm:text-base text-foreground cursor-pointer select-none"
                >
                  <div className="flex items-center gap-3">
                    <HelpCircle className={`w-5 h-5 text-primary shrink-0 transition-transform ${isOpen ? "scale-110 rotate-12" : ""}`} />
                    <span>{faq.question}</span>
                  </div>
                  <ChevronDown className={`w-4 h-4 text-muted-foreground shrink-0 transition-transform duration-300 ${isOpen ? "rotate-180 text-primary" : ""}`} />
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: "easeInOut" }}
                    >
                      <div className="px-5 pb-5 pt-1 text-muted-foreground text-sm leading-relaxed border-t border-border/40 bg-muted/10">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default FAQ;
