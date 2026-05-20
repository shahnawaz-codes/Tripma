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
  const commonProps = { sendMessage, isLoading };
  if (ui === "source") {
    return (
      <RenderOptions
        options={[
          { label: "New York", icon: "🗽" },
          { label: "London", icon: "💂" },
          { label: "Tokyo", icon: "🗼" },
          { label: "Paris", icon: "🥐" },
        ]}
        {...commonProps}
      />
    );
  } else if (ui === "destination") {
    return (
      <RenderOptions
        options={[
          { label: "Maldives", icon: "🏖️" },
          { label: "Swiss Alps", icon: "🏔️" },
          { label: "Kyoto", icon: "⛩️" },
          { label: "Bali", icon: "🌴" },
        ]}
        {...commonProps}
      />
    );
  } else if (ui === "budget") {
    return (
      <RenderOptions
        options={[
          { label: "Low", icon: "🎒", desc: "Backpacking" },
          { label: "Moderate", icon: "🏨", desc: "Comfort" },
          { label: "Luxury", icon: "💎", desc: "Premium" },
        ]}
        {...commonProps}
      />
    );
  } else if (ui === "groupSize") {
    return (
      <RenderOptions
        options={[
          { label: "Solo", icon: "👤", desc: "Just me" },
          { label: "Couple", icon: "💑", desc: "Romantic" },
          { label: "Family", icon: "👨‍👩‍👧‍👦", desc: "With kids" },
          { label: "Friends", icon: "👯", desc: "Group trip" },
        ]}
        {...commonProps}
      />
    );
  } else if (ui === "tripDuration") {
    return <DurationSelector onSelect={sendMessage} disabled={isLoading} />;
  } else if (ui === "interests") {
    return (
      <RenderOptions
        options={[
          { label: "Nature", icon: "🌲" },
          { label: "Culture", icon: "🏛️" },
          { label: "Food", icon: "🍜" },
          { label: "Relaxation", icon: "🏖️" },
        ]}
        {...commonProps}
      />
    );
  } else if (ui === "preferences") {
    return (
      <RenderOptions
        options={[
          { label: "Fast Paced", icon: "🏃", desc: "See it all" },
          { label: "Relaxed", icon: "🐢", desc: "Take it easy" },
        ]}
        {...commonProps}
      />
    );
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
          onClick={() => router.push(`/trips/${tripId}`)}
        >
          Save & View Trip Plan
        </Button>
      </div>
    );
  }
  return null;
};
