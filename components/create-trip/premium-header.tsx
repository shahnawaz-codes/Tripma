"use client";
import { Calendar, Wallet, Users, Download, Share, Check } from "lucide-react";
import { TripPlan } from "@/types/trip";
import { useEffect, useState } from "react";
import { Id } from "@/convex/_generated/dataModel";

export function PremiumHeader({
  trip,
  shareId,
  tripId,
}: {
  trip: TripPlan;
  shareId: string;
  tripId: Id<"trips">;
}) {
  const originName = trip.origin.split(",")[0];
  const destName = trip.destination.split("(")[0].trim();
  const [isExporting, setIsExporting] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);
  /**
   * window.location.origin -> returns actual orgin of application -> domain-hostname-port
   */
  const shareUrl =
    typeof window !== "undefined"
      ? `${window.location.origin}/trip/${shareId}`
      : "";
  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: trip.destination,
          text: "Check out my AI trip!",
          url: shareUrl,
        });
      } catch (error) {
        console.error("Error sharing:", error);
      }
    } else {
      // fallback if browser/device doesn't support navigator.share
      try {
        await navigator.clipboard.writeText(shareUrl);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch (error) {
        console.error("Failed to copy link:", error);
      }
    }
  };
  const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(
    `Check my trip: ${shareUrl}`,
  )}`;
  const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
    `Check my trip: ${shareUrl}`,
  )}`;

  const handleExportPdf = async () => {
    try {
      setIsExporting(true);
      const res = await fetch("/api/export-pdf", {
        method: "POST",
        body: JSON.stringify({
          tripId: tripId,
        }),
      });
      if (res.ok) {
        const blob = await res.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `trip-${trip.destination}.pdf`;
        a.click();
        window.URL.revokeObjectURL(url);
      } else {
        const errData = await res.json();
        console.error("Failed to generate PDF:", errData.error, errData.details);
      }
    } catch (error) {
      console.error("something goes wrong", error);
    } finally {
      setIsExporting(false);
    }
  };
  return (
    <div className="bg-white dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 rounded-3xl p-6 md:p-10 shadow-sm mt-4">
      <div className="relative z-10">
        <h1 className="text-3xl md:text-5xl lg:text-6xl font-extrabold text-neutral-900 dark:text-white tracking-tight leading-[1.15] max-w-4xl">
          Your trip from{" "}
          <span className="text-orange-600 dark:text-orange-500">
            {originName}
          </span>{" "}
          to{" "}
          <span className="text-orange-600 dark:text-orange-500">
            {destName}
          </span>{" "}
          is ready.
        </h1>

        <div className="flex flex-wrap items-center justify-between gap-4 mt-8 w-full">
          <div className="flex flex-wrap items-center gap-3 sm:gap-4">
            <div className="flex items-center gap-2 bg-neutral-100 dark:bg-neutral-900 px-4 py-2.5 rounded-xl border border-neutral-200/50 dark:border-neutral-800/50">
              <Calendar className="w-4 h-4 text-neutral-500" />
              <span className="font-semibold text-sm text-neutral-800 dark:text-neutral-200">
                {trip.duration}
              </span>
            </div>
            <div className="flex items-center gap-2 bg-neutral-100 dark:bg-neutral-900 px-4 py-2.5 rounded-xl border border-neutral-200/50 dark:border-neutral-800/50">
              <Wallet className="w-4 h-4 text-neutral-500" />
              <span className="font-semibold text-sm text-neutral-800 dark:text-neutral-200">
                {trip.budget}
              </span>
            </div>
            <div className="flex items-center gap-2 bg-neutral-100 dark:bg-neutral-900 px-4 py-2.5 rounded-xl border border-neutral-200/50 dark:border-neutral-800/50">
              <Users className="w-4 h-4 text-neutral-500" />
              <span className="font-semibold text-sm text-neutral-800 dark:text-neutral-200">
                {trip.group_size}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2.5 w-full sm:flex sm:items-center sm:gap-3 sm:w-auto">
            <button
              disabled={isExporting}
              onClick={handleExportPdf}
              className="group/export flex items-center justify-center gap-2 bg-gradient-to-r from-orange-600 to-amber-500 hover:from-orange-700 hover:to-amber-600 dark:from-orange-500 dark:to-amber-500 dark:hover:from-orange-600 dark:hover:to-amber-600 text-white px-5 py-2.5 rounded-xl font-semibold text-sm cursor-pointer shadow-sm hover:shadow-md hover:shadow-orange-500/10 transition-all duration-300 ease-out hover:-translate-y-0.5 hover:scale-[1.02] active:translate-y-0 active:scale-[0.98] disabled:pointer-events-none disabled:opacity-50 w-full sm:w-auto"
            >
              <Download className="w-4 h-4 group-hover/export:translate-y-0.5 transition-transform duration-200" />
              <span>{isExporting ? "Exporting..." : "Export PDF"}</span>
            </button>
            <button
              onClick={handleShare}
              className={`group/share flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm cursor-pointer shadow-sm hover:shadow-md transition-all duration-300 ease-out hover:-translate-y-0.5 hover:scale-[1.02] active:translate-y-0 active:scale-[0.98] w-full sm:w-auto border ${
                copied
                  ? "bg-emerald-50 border-emerald-200 text-emerald-600 dark:bg-emerald-950/20 dark:border-emerald-800/50 dark:text-emerald-400"
                  : "bg-white hover:bg-neutral-50 border-neutral-200 hover:border-neutral-300 text-neutral-700 hover:text-neutral-900 dark:bg-neutral-950 dark:hover:bg-neutral-900 dark:border-neutral-800 dark:hover:border-neutral-700 dark:text-neutral-300 dark:hover:text-white"
              }`}
            >
              {copied ? (
                <Check className="w-4 h-4 animate-in fade-in zoom-in duration-200" />
              ) : (
                <Share className="w-4 h-4 group-hover/share:rotate-12 transition-transform duration-200" />
              )}
              <span>{copied ? "Link Copied!" : "Share"}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
