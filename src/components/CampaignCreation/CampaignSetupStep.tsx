import { Switch } from "@/components/ui/switch";
import { useState } from "react";

/**
 * CampaignSetupStep
 * Setup step content for CampaignCreationLayout.
 * One white card containing: Campaign details + Advanced sections.
 */
export const CampaignSetupStep = () => {
  const [name, setName] = useState("Mother's day campaign");
  const [tags, setTags] = useState("Sample");
  const [gaTracking, setGaTracking] = useState(false);
  const [conversionTracking, setConversionTracking] = useState(false);

  return (
    <div className="bg-white border border-[#DDE2EE] rounded-lg p-8 w-full">
      {/* Inner content constrained so inputs/cards don't stretch */}
      <div className="max-w-[640px]">
        {/* Campaign details */}
        <div className="mb-6">
          <h2 className="text-base font-bold text-[#17173A]">Campaign details</h2>
          <p className="text-sm text-[#6F6F8D] mt-1">Specify basic details for this campaign</p>
        </div>

        {/* Campaign name */}
        <div className="mb-5">
          <label className="block text-sm font-semibold text-[#17173A] mb-1.5">
            Campaign name <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value.slice(0, 100))}
              placeholder="Ex: MyCampaign"
              className="w-full h-10 bg-[#F8F8F8] border border-[#DDE2EE] rounded-md px-3 text-sm text-[#17173A] placeholder:text-[#6F6F8D] focus:outline-none focus:ring-1 focus:ring-[#143F93]/40"
            />
            <span className="absolute right-1 -bottom-5 text-[11px] text-[#6F6F8D]">
              {name.length}/100
            </span>
          </div>
        </div>

        {/* Tags */}
        <div className="mb-8 mt-7">
          <label className="block text-sm font-semibold text-[#17173A] mb-1.5">
            Add tags
          </label>
          <input
            type="text"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            placeholder="Sample"
            className="w-full h-10 bg-[#F8F8F8] border border-[#DDE2EE] rounded-md px-3 text-sm text-[#17173A] placeholder:text-[#6F6F8D] focus:outline-none focus:ring-1 focus:ring-[#143F93]/40"
          />
        </div>

        {/* Advanced */}
        <div className="mb-5">
          <h2 className="text-base font-bold text-[#17173A]">Advanced</h2>
          <p className="text-sm text-[#6F6F8D] mt-1 leading-5">
            Track your campaign performance to measure traffic and conversion. Set default values for Google analytics tracking and conversion goal in global advanced settings.
          </p>
        </div>

        {/* GA Tracking */}
        <div className="border border-[#DDE2EE] rounded-md p-4 mb-3 flex items-start justify-between">
          <div>
            <p className="text-sm font-bold text-[#17173A]">GA Tracking</p>
            <p className="text-xs text-[#6F6F8D] mt-1">
              Track performance of your campaign with UTM parameters{" "}
              <a href="#" className="text-[#0A8FFD] underline">learn more</a>
            </p>
          </div>
          <Switch
            checked={gaTracking}
            onCheckedChange={setGaTracking}
            className="shrink-0 data-[state=checked]:bg-[#00C48C]"
          />
        </div>

        {/* Conversion Tracking */}
        <div className="border border-[#DDE2EE] rounded-md p-4 flex items-start justify-between">
          <div>
            <p className="text-sm font-bold text-[#17173A]">Conversion tracking</p>
            <p className="text-xs text-[#6F6F8D] mt-1">
              Activity which represent a conversion for your campaign.
            </p>
          </div>
          <Switch
            checked={conversionTracking}
            onCheckedChange={setConversionTracking}
            className="shrink-0 data-[state=checked]:bg-[#00C48C]"
          />
        </div>
      </div>
    </div>
  );
};
