"use client";
import { Calendar, Wallet, Users, Download, Share } from "lucide-react";
import { TripPlan } from "@/types/trip";
import { useParams } from "next/navigation";
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
  const params = useParams();
  const [isExporting, setIsExporting] = useState<boolean>(false);
  /**
   * window.location.origin -> returns actual orgin of application -> domain-hostname-port
   */
  const shareUrl = `${window.location.origin}/trip/${shareId}`;

  const handleShare = async () => {
    if (navigator.share) {
      await navigator.share({
        title: trip.destination,
        text: "Check out my AI trip!",
        url: shareUrl,
      });
    } else {
      // fallback if browser/device doesn't support navigator.share
      await navigator.clipboard.writeText(shareUrl);
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
      console.log("tripid", tripId);
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
      }
    } catch (error) {
      console.log("something goes wrong", error);
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

        <div className="flex flex-wrap items-center gap-3 sm:gap-4 mt-8">
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

          <button
            disabled={isExporting}
            onClick={handleExportPdf}
            className="flex items-center gap-2 bg-orange-600 hover:bg-orange-700 text-white dark:bg-orange-500 dark:hover:bg-orange-600 px-5 py-2.5 rounded-xl transition-all font-semibold text-sm cursor-pointer shadow-sm hover:scale-105 active:scale-95 ml-auto"
          >
            <Download className="w-4 h-4" />
            <span>{isExporting ? "Exporting..." : "Export PDF"}</span>
          </button>
          <button
            onClick={handleShare}
            className="flex items-center gap-2 bg-orange-600 hover:bg-orange-700 text-white dark:bg-orange-500 dark:hover:bg-orange-600 px-5 py-2.5 rounded-xl transition-all font-semibold text-sm cursor-pointer shadow-sm hover:scale-105 active:scale-95 ml-auto"
          >
            <Share className="w-4 h-4" />
            <span>Share</span>
          </button>
        </div>
      </div>
    </div>
  );
}
