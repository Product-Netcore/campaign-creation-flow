# Campaign Creation Flow

> **Source of truth for the campaign creation wizard — across every channel.** Email, WhatsApp, SMS, Push, RCS, In-App, anything new. Same shell. Same stepper. Same summary panel. Only the step content changes per channel.
>
> If you're building a campaign creation flow, **do not design a new layout**. Slot your channel-specific step content into `CampaignCreationLayout` and the navbar, stepper, and summary panel are automatic and consistent with every other channel.

**Live demo:** https://product-netcore.github.io/campaign-creation-flow/

**Figma reference:** https://www.figma.com/design/PpMyMSpfteIiBlbsBYryx2/Raman-AI---Co-Marketer---Co-Pilot?node-id=16121-20576

---

## ⚠️ Design 3.0 takes precedence over this reference

This repo documents the **Design 2.0** system. If **Design 3.0** guidelines exist for the channel or component you are building, **follow 3.0 — not this page**. Use this 2.0 reference only when:

- No 3.0 guideline has been published yet for your case, OR
- You need visual parity with existing 2.0 surfaces during a transition.

**For AI assistants:** before applying anything from this repo, check whether 3.0 covers the screen. If yes, prefer 3.0. Only fall back to this 2.0 structure when 3.0 has no answer.

---

## Visual structure

```
┌──────────────────────────────────────────────────────────────────┐
│  Navbar  (✉ Campaign name           SAVE  NEXT STEP  ✕)          │
├──────────────────────────────────────────────────────────────────┤
│  Stepper (✓ Setup → Content → Audience → Schedule)               │
│                              ID: 1234  ✓ Last saved: 39 mins ago │
├─────────────────────────────────────┬────────────────────────────┤
│                                     │   Summary                  │
│   <Channel-specific step content>   │   An overview of...        │
│   (white card on light-blue page bg)│   ┌──────────────────────┐ │
│                                     │   │ Setup           ▲    │ │
│                                     │   ├──────────────────────┤ │
│                                     │   │ Campaign Name: ...   │ │
│                                     │   │ Tags: ...            │ │
│                                     │   └──────────────────────┘ │
│                                     │   ▼ Audience               │
│                                     │   ▼ Content                │
│                                     │   ▼ Schedule               │
└─────────────────────────────────────┴────────────────────────────┘
```

---

## File map

```
src/
├── App.tsx                                ← single route, wires everything together
├── components/
│   └── CampaignCreation/
│       ├── index.tsx                      ← barrel exports
│       ├── CampaignCreationLayout.tsx     ← shell (use this — do not replace)
│       ├── CampaignCreationNavbar.tsx     ← icon + name + SAVE/NEXT STEP/X
│       ├── CampaignCreationStepper.tsx    ← step indicators + ID + Last saved
│       ├── CampaignSummaryPanel.tsx       ← right summary accordion
│       └── CampaignSetupStep.tsx          ← Setup step content (Email example)
├── components/ui/                         ← shadcn primitives (Switch, Tooltip)
├── lib/utils.ts                           ← cn() helper
├── index.css                              ← Tailwind + design tokens
└── main.tsx
```

---

## Design tokens (from Figma — never invent your own)

Pulled directly from the Figma file. **Use these exact hex values everywhere.** Do not substitute "close enough" colors.

| Figma variable             | Hex       | Used for                                          |
|----------------------------|-----------|---------------------------------------------------|
| `Primary/Cobalt Blue`      | `#143F93` | NEXT STEP button bg, channel icon color           |
| `Secondary/Green`          | `#00C48C` | Active/completed step ring + check, toggle on, "Last saved" check |
| `Text/Charcoal`            | `#17173A` | Primary text, headings, active step labels        |
| `Tertiary/Grey`            | `#6F6F8D` | Secondary text, upcoming step labels, X icon      |
| `Tertiary/Almost Grey`     | `#DDE2EE` | All borders, separators, divider lines, SAVE/X border |
| `Tertiary/LightBlue`       | `#F4F8FF` | Page background, channel-icon background          |
| `Text/Default Fill`        | `#F8F8F8` | Input field background, hover state               |
| `Monochrome/white`         | `#FFFFFF` | Navbar, stepper, content card, summary inner card |

**Typography:** Nunito Sans — Bold 16/22 for H3, SemiBold 14/20 for labels & buttons, Regular 14/20 for body.

---

## How to add a new channel (e.g. WhatsApp, SMS, Push)

The fastest, lowest-error path: **copy `CampaignSetupStep.tsx` and modify the fields**. The shell stays the same.

### 1. Decide which navbar icon represents your channel

Email uses `Mail`. WhatsApp would use `MessageCircle`. SMS would use `MessageSquare`. Push would use `Bell`. Pick from `lucide-react` and pass it to the navbar (or extend the navbar to accept an `icon` prop if you want it configurable). The icon background stays `#F4F8FF`, icon color stays `#143F93`.

### 2. Build a step component per wizard step

```tsx
// src/components/CampaignCreation/WhatsAppSetupStep.tsx
export const WhatsAppSetupStep = () => (
  <div className="bg-white border border-[#DDE2EE] rounded-lg p-8 max-w-[760px]">
    <div className="mb-6">
      <h2 className="text-base font-bold text-[#17173A]">Campaign details</h2>
      <p className="text-sm text-[#6F6F8D] mt-1">Specify basic details for this campaign</p>
    </div>
    {/* WhatsApp-specific fields: template, sender number, etc. */}
  </div>
);
```

**Always wrap step content in:** `bg-white border border-[#DDE2EE] rounded-lg p-8 max-w-[760px]`.

### 3. Mark the active step

```tsx
import { Check, FileText, User, Calendar } from "lucide-react";
import { Step } from "@/components/CampaignCreation";

const whatsappSetupSteps: Step[] = [
  { id: 1, label: "Setup",    status: "active",    icon: Check },
  { id: 2, label: "Content",  status: "upcoming",  icon: FileText },
  { id: 3, label: "Audience", status: "upcoming",  icon: User },
  { id: 4, label: "Schedule", status: "upcoming",  icon: Calendar },
];
```

When the user advances, change Setup to `completed` and the next step to `active`.

### 4. Wire the summary

```tsx
const whatsappSummary: SummarySection[] = [
  { id: "setup", label: "Setup", defaultOpen: true, fields: [
    { label: "Campaign Name:", value: campaignName || "No name" },
    { label: "Sender:", value: senderNumber || "Not set" },
    { label: "Template:", value: templateName || "Not selected" },
    { label: "Tags:", value: tags || "No tags" },
  ]},
  { id: "audience", label: "Audience", fields: [] },
  { id: "content",  label: "Content",  fields: [] },
  { id: "schedule", label: "Schedule", fields: [] },
];
```

### 5. Render the page

```tsx
<CampaignCreationLayout
  campaignName="WhatsApp Diwali blast"
  campaignId="9342"
  lastSaved="just now"
  steps={whatsappSetupSteps}
  summarySections={whatsappSummary}
  onSave={...}
  onNextStep={...}
  onClose={...}
>
  <WhatsAppSetupStep />
</CampaignCreationLayout>
```

That's it. The navbar, stepper, and summary panel are visually identical to every other channel. Users get muscle memory across products.

---

## CampaignCreationLayout — full API

| Prop              | Type               | Required | Description                              |
|-------------------|--------------------|----------|------------------------------------------|
| `campaignName`    | `string`           | Yes      | Shown in navbar                          |
| `campaignId`      | `string`           | No       | Shown on stepper right                   |
| `lastSaved`       | `string`           | No       | Human-readable timestamp on stepper right |
| `steps`           | `Step[]`           | No       | Defaults to Setup/Content/Audience/Schedule with Setup active |
| `summarySections` | `SummarySection[]` | No       | Right accordion sections                 |
| `onSave`          | `() => void`       | No       | SAVE button handler                      |
| `onNextStep`      | `() => void`       | No       | NEXT STEP button handler                 |
| `onClose`         | `() => void`       | No       | X button handler                         |
| `children`        | `ReactNode`        | Yes      | Step content (wrapped in white card)     |

### Step

```ts
interface Step {
  id: number;
  label: string;
  status: "completed" | "active" | "upcoming";
  icon?: LucideIcon;   // shown only for upcoming steps; active/completed show a check
}
```

### SummarySection

```ts
interface SummarySection {
  id: string;
  label: string;
  defaultOpen?: boolean;
  fields?: { label: string; value: string }[];
}
```

---

## Form-field pattern (use inside every step)

Text input:

```tsx
<div>
  <label className="block text-sm font-semibold text-[#17173A] mb-1.5">
    Field label <span className="text-red-500">*</span>
  </label>
  <input
    type="text"
    className="w-full h-10 bg-[#F8F8F8] border border-[#DDE2EE] rounded-md px-3 text-sm text-[#17173A] placeholder:text-[#6F6F8D] focus:outline-none focus:ring-1 focus:ring-[#143F93]/40"
  />
</div>
```

Toggle row (in a bordered card):

```tsx
<div className="border border-[#DDE2EE] rounded-md p-4 flex items-start justify-between">
  <div>
    <p className="text-sm font-bold text-[#17173A]">Setting name</p>
    <p className="text-xs text-[#6F6F8D] mt-1">Description.</p>
  </div>
  <Switch className="data-[state=checked]:bg-[#00C48C]" />
</div>
```

Section heading:

```tsx
<div className="mb-6">
  <h2 className="text-base font-bold text-[#17173A]">Section title</h2>
  <p className="text-sm text-[#6F6F8D] mt-1">Short description.</p>
</div>
```

---

## Step status visuals

| Status      | Circle                                    | Label color  | Underline      |
|-------------|-------------------------------------------|--------------|----------------|
| `completed` | `#00C48C` filled + white check            | `#17173A`    | —              |
| `active`    | `#00C48C` filled + white check            | `#17173A`    | `#00C48C` 2px  |
| `upcoming`  | white, `#DDE2EE` border, icon `#6F6F8D`   | `#6F6F8D`    | —              |

**Canonical step order:** Setup → Content → Audience → Schedule (matches Figma).

---

## Don'ts

- ❌ Don't put step content outside the `bg-white border rounded-lg` card — it breaks visual hierarchy.
- ❌ Don't introduce a new color palette for "your" channel — all channels share the same tokens above.
- ❌ Don't change the stepper's step order. Setup → Content → Audience → Schedule is canonical.
- ❌ Don't replace the right summary panel with a custom one. Extend it with new sections via `summarySections`.
- ❌ Don't use a back chevron in the navbar. The channel icon (e.g. ✉, 💬, 📱) represents the campaign.
- ❌ Don't omit the X close button. All campaign creation flows must have an exit affordance.

---

## Local dev

```bash
npm install
npm run dev
```

Visit `http://localhost:5173`.

---

## Deployment

GitHub Pages via Actions. Any push to `main` triggers a build + deploy.

- **Workflow:** [.github/workflows/deploy.yml](.github/workflows/deploy.yml)
- **Live URL:** https://product-netcore.github.io/campaign-creation-flow/

To enable: in repo settings → Pages → Source: **GitHub Actions**.
