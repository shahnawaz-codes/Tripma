import { Button } from "@/components/ui/button";

type Option = {
  label: string;
  icon: string;
  desc?: string;
};
type RenderOptionsProps = {
  options: Option[];
  sendMessage: (text: string) => void;
  isLoading: boolean;
};
export const RenderOptions = ({
  options,
  sendMessage,
  isLoading,
}: RenderOptionsProps) => (
  <div className="grid grid-cols-2 gap-2 mt-3 w-full sm:w-[80%] lg:w-75">
    {options.map((opt) => (
      <Button
        key={opt.label}
        variant="outline"
        className="flex flex-col items-center justify-center gap-1.5 h-auto py-3 px-2 rounded-xl bg-white hover:bg-primary/5 hover:border-primary/40 border-gray-100 transition-all text-xs shadow-sm"
        onClick={() => sendMessage(opt.label)}
        disabled={isLoading}
      >
        <span className="text-2xl mb-0.5">{opt.icon}</span>
        <span className="font-semibold text-gray-700 whitespace-normal text-center leading-tight">
          {opt.label}
        </span>
        {opt.desc && (
          <span className="text-[10px] text-gray-400 font-normal mt-0">
            {opt.desc}
          </span>
        )}
      </Button>
    ))}
  </div>
);
