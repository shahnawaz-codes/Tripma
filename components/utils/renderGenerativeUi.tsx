import { DurationSelector } from "@/app/_components/createTrip/DurationSelector";
import { RenderOptions } from "./renderOption";
import { Sparkles } from "lucide-react";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";

type RenderGenerativeUiProps = {
  ui: string;
  sendMessage: (text: string) => void;
  isLoading: boolean;
  isGeneratingPlan: boolean;
  tripId?: string;
};
export const RenderGenerativeUi = ({
  ui,
  sendMessage,
  isLoading,
  isGeneratingPlan,
  tripId,
}: RenderGenerativeUiProps) => {
  const router = useRouter();

  if (!ui) return null;
  const commonProps = { sendMessage, isLoading, ui };
  if (ui === "source") {
    return (
      <RenderOptions
        options={[
          { label: "New York", icon: "🗽", badge: "US Hub" },
          { label: "London", icon: "💂", badge: "Europe" },
          { label: "Tokyo", icon: "🗼", badge: "Asia" },
          { label: "Paris", icon: "🥐", badge: "Europe" },
        ]}
        {...commonProps}
      />
    );
  } else if (ui === "destination") {
    return (
      <RenderOptions
        options={[
          { label: "Maldives", icon: "🏖️", badge: "Tropical" },
          { label: "Swiss Alps", icon: "🏔️", badge: "Alpine" },
          { label: "Kyoto", icon: "⛩️", badge: "Cultural" },
          { label: "Bali", icon: "🌴", badge: "Island" },
        ]}
        {...commonProps}
      />
    );
  } else if (ui === "budget") {
    return (
      <RenderOptions
        options={[
          {
            label: "Low",
            icon: "🎒",
            desc: "Affordable backpacking & saving",
            badge: "$0-$50/day",
            value: "Cheap",
          },
          {
            label: "Moderate",
            icon: "🏨",
            desc: "Comfortable mid-range hotels",
            badge: "$50-$150/day",
            value: "Moderate",
          },
          {
            label: "Luxury",
            icon: "💎",
            desc: "High-end premium experience",
            badge: "$150+/day",
            value: "Luxury",
          },
        ]}
        {...commonProps}
      />
    );
  } else if (ui === "groupSize") {
    return (
      <RenderOptions
        options={[
          {
            label: "Solo",
            icon: "👤",
            desc: "Just me traveling solo",
            badge: "1 Person",
          },
          {
            label: "Couple",
            icon: "💑",
            desc: "Romantic trip for two",
            badge: "2 People",
          },
          {
            label: "Family",
            icon: "👨‍👩‍👧‍👦",
            desc: "Trip with kids & family",
            badge: "3-5 People",
          },
          {
            label: "Friends",
            icon: "👯",
            desc: "Adventure with group",
            badge: "5+ People",
          },
        ]}
        {...commonProps}
      />
    );
  } else if (ui === "tripDuration") {
    return <DurationSelector onSelect={sendMessage} disabled={isLoading} />;
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
          onClick={() => router.push(`/my-trips/${tripId}`)}
        >
          Save & View Trip Plan
        </Button>
      </div>
    );
  }
  return null;
};
