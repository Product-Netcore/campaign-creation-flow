import { HashRouter, Routes, Route, Link } from "react-router-dom";
import { BookOpen } from "lucide-react";
import { CampaignCreationLayout } from "@/components/CampaignCreation/CampaignCreationLayout";
import { CampaignSetupStep } from "@/components/CampaignCreation/CampaignSetupStep";
import { DocsPage } from "@/pages/DocsPage";

const CampaignCreationPage = () => (
  <div className="relative">
    {/* Floating docs link — visible from the demo */}
    <Link
      to="/docs"
      className="fixed top-3 left-1/2 -translate-x-1/2 z-50 flex items-center gap-1.5 px-3 py-1.5 bg-[#143F93] text-white text-xs font-semibold rounded-full shadow-lg hover:bg-[#143F93]/90"
    >
      <BookOpen className="w-3.5 h-3.5" />
      View structure docs
    </Link>
    <CampaignCreationLayout
      campaignName="Mother's day campaign"
      campaignId="1234"
      lastSaved="39 mins ago"
      onSave={() => console.log("save")}
      onNextStep={() => console.log("next step")}
      onClose={() => console.log("close")}
    >
      <CampaignSetupStep />
    </CampaignCreationLayout>
  </div>
);

const App = () => (
  <HashRouter>
    <Routes>
      <Route path="/" element={<CampaignCreationPage />} />
      <Route path="/docs" element={<DocsPage />} />
    </Routes>
  </HashRouter>
);

export default App;
