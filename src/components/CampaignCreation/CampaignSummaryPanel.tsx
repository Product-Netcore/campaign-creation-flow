import { ChevronUp, ChevronDown } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

export interface SummaryField {
  label: string;
  value: string;
}

export interface SummarySection {
  id: string;
  label: string;
  fields?: SummaryField[];
  defaultOpen?: boolean;
}

interface CampaignSummaryPanelProps {
  sections: SummarySection[];
  className?: string;
}

const SummaryAccordionItem = ({ section }: { section: SummarySection }) => {
  const [open, setOpen] = useState(section.defaultOpen ?? false);
  const hasFields = section.fields && section.fields.length > 0;

  return (
    <div>
      <button
        className="w-full flex items-center justify-between py-3 border-b border-[#DDE2EE]"
        onClick={() => setOpen(!open)}
      >
        <span className="text-sm font-bold text-[#17173A]">{section.label}</span>
        {open ? (
          <ChevronUp className="w-4 h-4 text-[#6F6F8D]" />
        ) : (
          <ChevronDown className="w-4 h-4 text-[#6F6F8D]" />
        )}
      </button>
      {open && hasFields && (
        <div className="bg-white border border-[#DDE2EE] rounded-md mt-3 mb-3 px-4 py-4">
          <div className="space-y-4">
            {section.fields!.map((field, i) => (
              <div key={`${field.label}-${i}`}>
                <p className="text-sm font-semibold text-[#17173A]">{field.label}</p>
                <p className="text-sm text-[#6F6F8D] mt-1">{field.value}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export const CampaignSummaryPanel = ({
  sections,
  className,
}: CampaignSummaryPanelProps) => {
  return (
    <div
      className={cn(
        "w-[300px] shrink-0 flex flex-col overflow-y-auto px-5 pt-5",
        className
      )}
    >
      <h2 className="text-base font-bold text-[#17173A]">Summary</h2>
      <p className="text-xs text-[#6F6F8D] mt-1 mb-2">An overview of this campaign</p>
      <div className="flex-1">
        {sections.map((section) => (
          <SummaryAccordionItem key={section.id} section={section} />
        ))}
      </div>
    </div>
  );
};

export const DEFAULT_SUMMARY_SECTIONS: SummarySection[] = [
  {
    id: "setup",
    label: "Setup",
    defaultOpen: true,
    fields: [
      { label: "Campaign Name:", value: "No name" },
      { label: "Tags:", value: "No tags" },
      { label: "Conversion Goal:", value: "Off" },
      { label: "GA Tracking:", value: "Off" },
    ],
  },
  { id: "audience", label: "Audience", fields: [] },
  { id: "content", label: "Content", fields: [] },
  { id: "schedule", label: "Schedule", fields: [] },
];
