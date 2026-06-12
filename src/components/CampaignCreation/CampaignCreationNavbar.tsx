import { Mail, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface CampaignCreationNavbarProps {
  campaignName: string;
  onSave?: () => void;
  onNextStep?: () => void;
  onClose?: () => void;
  className?: string;
}

export const CampaignCreationNavbar = ({
  campaignName,
  onSave,
  onNextStep,
  onClose,
  className,
}: CampaignCreationNavbarProps) => {
  return (
    <div
      className={cn(
        "h-[56px] bg-white border-b border-[#DDE2EE] flex items-center justify-between px-5 shrink-0",
        className
      )}
    >
      {/* Left: mail icon + campaign name */}
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded bg-[#F4F8FF] flex items-center justify-center">
          <Mail className="w-4 h-4 text-[#143F93]" strokeWidth={2} />
        </div>
        <h1 className="text-base font-bold text-[#17173A] leading-[22px]">
          {campaignName}
        </h1>
      </div>

      {/* Right: SAVE + NEXT STEP + X */}
      <div className="flex items-center gap-3">
        <button
          onClick={onSave}
          className="h-8 px-4 border border-[#DDE2EE] rounded text-[#17173A] font-semibold uppercase text-xs tracking-[0.42px] hover:bg-[#F8F8F8] transition-colors"
        >
          Save
        </button>
        <button
          onClick={onNextStep}
          className="h-8 px-4 bg-[#143F93] rounded text-white font-semibold uppercase text-xs tracking-[0.42px] hover:bg-[#143F93]/90 transition-colors"
        >
          Next Step
        </button>
        <button
          onClick={onClose}
          className="w-8 h-8 flex items-center justify-center border border-[#DDE2EE] rounded hover:bg-[#F8F8F8] text-[#17173A] transition-colors"
          aria-label="Close"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
