import { Check, LucideIcon, FileText, User, Calendar } from "lucide-react";
import { cn } from "@/lib/utils";

export type StepStatus = "completed" | "active" | "upcoming";

export interface Step {
  id: number;
  label: string;
  status: StepStatus;
  icon?: LucideIcon;
}

interface CampaignCreationStepperProps {
  steps: Step[];
  campaignId?: string;
  lastSaved?: string;
  className?: string;
}

const StepIndicator = ({ step }: { step: Step }) => {
  if (step.status === "completed" || step.status === "active") {
    return (
      <div className="w-[18px] h-[18px] rounded-full bg-[#00C48C] flex items-center justify-center shrink-0">
        <Check className="w-2.5 h-2.5 text-white" strokeWidth={3} />
      </div>
    );
  }
  const Icon = step.icon;
  return (
    <div className="w-[18px] h-[18px] rounded-full border border-[#DDE2EE] bg-white flex items-center justify-center shrink-0">
      {Icon ? (
        <Icon className="w-2.5 h-2.5 text-[#6F6F8D]" strokeWidth={2} />
      ) : (
        <span className="text-[9px] font-bold text-[#6F6F8D]">{step.id}</span>
      )}
    </div>
  );
};

export const CampaignCreationStepper = ({
  steps,
  campaignId,
  lastSaved,
  className,
}: CampaignCreationStepperProps) => {
  return (
    <div
      className={cn(
        "h-[48px] bg-white border-b border-[#DDE2EE] flex items-center justify-between px-5 shrink-0",
        className
      )}
    >
      {/* Steps — single centered row; active underline absolutely positioned */}
      <div className="flex items-center">
        {steps.map((step, i) => {
          const isActive = step.status === "active";
          const isDoneOrActive = isActive || step.status === "completed";
          return (
            <div key={step.id} className="flex items-center">
              <div className="relative flex items-center gap-1.5 h-[48px]">
                <StepIndicator step={step} />
                <span
                  className={cn(
                    "text-sm font-semibold leading-5 tracking-[0.42px]",
                    isDoneOrActive ? "text-[#17173A]" : "text-[#6F6F8D]"
                  )}
                >
                  {step.label}
                </span>
                {isActive && (
                  <div className="absolute left-0 right-0 bottom-0 h-[2px] bg-[#00C48C]" />
                )}
              </div>
              {i < steps.length - 1 && (
                <div className="w-[80px] h-px bg-[#DDE2EE] mx-4" />
              )}
            </div>
          );
        })}
      </div>

      {/* Right: ID + Last saved */}
      <div className="flex items-center gap-4 text-xs text-[#6F6F8D]">
        {campaignId && <span className="font-normal">ID: {campaignId}</span>}
        {lastSaved && (
          <div className="flex items-center gap-1">
            <Check className="w-3 h-3 text-[#00C48C]" strokeWidth={3} />
            <span>Last saved: {lastSaved}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export const DEFAULT_STEPS: Step[] = [
  { id: 1, label: "Setup",    status: "active",   icon: Check },
  { id: 2, label: "Content",  status: "upcoming", icon: FileText },
  { id: 3, label: "Audience", status: "upcoming", icon: User },
  { id: 4, label: "Schedule", status: "upcoming", icon: Calendar },
];
