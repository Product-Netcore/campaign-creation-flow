import { HashRouter, Routes, Route } from "react-router-dom";
import { CampaignCreationLayout } from "@/components/CampaignCreation/CampaignCreationLayout";
import { CampaignSetupStep } from "@/components/CampaignCreation/CampaignSetupStep";

const CampaignCreationPage = () => (
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
);

const App = () => (
  <HashRouter>
    <Routes>
      <Route path="/" element={<CampaignCreationPage />} />
    </Routes>
  </HashRouter>
);

export default App;
