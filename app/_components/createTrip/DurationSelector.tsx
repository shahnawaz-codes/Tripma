import { Button } from "@/components/ui/button";
import { Minus, Plus } from "lucide-react";
import { useState } from "react";

export const DurationSelector = ({
  onSelect,
  disabled,
}: {
  onSelect: (duration: string) => void;
  disabled: boolean;
}) => {
  const [days, setDays] = useState(3);
  return (
    <div className="flex flex-col gap-3 mt-3 w-full sm:w-[80%] lg:w-[250px]">
      <div className="flex items-center justify-between border border-gray-200 rounded-xl p-2 bg-slate-50">
        <Button
          variant="outline"
          size="icon"
          onClick={() => setDays(Math.max(1, days - 1))}
          disabled={disabled || days <= 1}
          className="h-8 w-8 rounded-full bg-white shadow-sm hover:bg-gray-100"
        >
          <Minus className="w-4 h-4 text-gray-600" />
        </Button>
        <div className="flex flex-col items-center">
          <span className="font-bold text-gray-800 text-base">{days}</span>
          <span className="text-[10px] text-gray-500 font-medium uppercase tracking-wider">
            {days === 1 ? "Day" : "Days"}
          </span>
        </div>
        <Button
          variant="outline"
          size="icon"
          onClick={() => setDays(days + 1)}
          disabled={disabled}
          className="h-8 w-8 rounded-full bg-white shadow-sm hover:bg-gray-100"
        >
          <Plus className="w-4 h-4 text-gray-600" />
        </Button>
      </div>
      <Button
        onClick={() => onSelect(`${days} Days`)}
        disabled={disabled}
        className="w-full shadow-sm rounded-xl font-medium"
      >
        Confirm Duration
      </Button>
    </div>
  );
};
