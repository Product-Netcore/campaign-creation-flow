import { cn } from "@/lib/utils";
import { CampaignCreationNavbar } from "./CampaignCreationNavbar";
import { CampaignCreationStepper, Step, DEFAULT_STEPS } from "./CampaignCreationStepper";
import { CampaignSummaryPanel, SummarySection, DEFAULT_SUMMARY_SECTIONS } from "./CampaignSummaryPanel";
import { ReactNode } from "react";

interface CampaignCreationLayoutProps {
  campaignName: string;
  campaignId?: string;
  lastSaved?: string;
  steps?: Step[];
  summarySections?: SummarySection[];
  onSave?: () => void;
  onNextStep?: () => void;
  onClose?: () => void;
  children: ReactNode;
  className?: string;
}

/**
 * CampaignCreationLayout
 *
 * Shell for every step of the campaign creation wizard.
 *   ┌───────────────────────────────────────────────────────────┐
 *   │  Navbar  (✉ Mother's day campaign     SAVE  NEXT STEP  ✕) │
 *   ├───────────────────────────────────────────────────────────┤
 *   │  Stepper (✓Setup → Content → Audience → Schedule)         │
 *   │                              ID: 1234  ✓ Last saved...   │
 *   ├──────────────────────────────────────┬────────────────────┤
 *   │  White card with step content        │  Summary           │
 *   │  on light blue page background       │  An overview...    │
 *   │                                      │  Setup ▲           │
 *   │                                      │  Audience ▼ ...    │
 *   └──────────────────────────────────────┴────────────────────┘
 */
export const CampaignCreationLayout = ({
  campaignName,
  campaignId,
  lastSaved,
  steps = DEFAULT_STEPS,
  summarySections = DEFAULT_SUMMARY_SECTIONS,
  onSave,
  onNextStep,
  onClose,
  children,
  className,
}: CampaignCreationLayoutProps) => {
  return (
    <div
      className={cn("h-screen w-screen flex flex-col", className)}
      style={{ backgroundColor: "#F4F8FF" }}
    >
      <CampaignCreationNavbar
        campaignName={campaignName}
        onSave={onSave}
        onNextStep={onNextStep}
        onClose={onClose}
      />

      <CampaignCreationStepper
        steps={steps}
        campaignId={campaignId}
        lastSaved={lastSaved}
      />

      <div className="flex-1 flex overflow-hidden">
        <div className="flex-1 overflow-y-auto px-10 py-6">
          {children}
        </div>
        <CampaignSummaryPanel sections={summarySections} />
      </div>
    </div>
  );
};
