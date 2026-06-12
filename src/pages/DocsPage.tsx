import { Link } from "react-router-dom";
import { ArrowLeft, ExternalLink } from "lucide-react";

const Section = ({ title, children, id }: { title: string; children: React.ReactNode; id?: string }) => (
  <section id={id} className="mb-12 scroll-mt-6">
    <h2 className="text-xl font-bold text-[#17173A] mb-3">{title}</h2>
    <div className="text-sm text-[#17173A] leading-6">{children}</div>
  </section>
);

const Code = ({ children }: { children: React.ReactNode }) => (
  <code className="bg-[#F4F8FF] text-[#143F93] px-1.5 py-0.5 rounded text-[13px] font-mono">{children}</code>
);

const Pre = ({ children }: { children: React.ReactNode }) => (
  <pre className="bg-[#17173A] text-[#E3E8F4] text-[13px] leading-5 font-mono rounded-lg p-4 overflow-x-auto my-3">
    <code>{children}</code>
  </pre>
);

const Swatch = ({ hex, name, use }: { hex: string; name: string; use: string }) => (
  <tr className="border-b border-[#DDE2EE] last:border-0">
    <td className="py-2 pr-4">
      <div className="flex items-center gap-2">
        <span className="w-5 h-5 rounded border border-[#DDE2EE]" style={{ backgroundColor: hex }} />
        <span className="font-mono text-[12px]">{hex}</span>
      </div>
    </td>
    <td className="py-2 pr-4 text-[#17173A]">{name}</td>
    <td className="py-2 text-[#6F6F8D]">{use}</td>
  </tr>
);

export const DocsPage = () => {
  return (
    <div className="min-h-screen bg-[#F4F8FF]">
      {/* Top bar */}
      <div className="bg-white border-b border-[#DDE2EE] px-6 py-4 flex items-center justify-between sticky top-0 z-10">
        <div className="flex items-center gap-3">
          <Link to="/" className="flex items-center gap-2 text-[#143F93] hover:underline text-sm font-semibold">
            <ArrowLeft className="w-4 h-4" />
            Back to demo
          </Link>
        </div>
        <a
          href="https://github.com/Product-Netcore/campaign-creation-flow"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 text-sm text-[#6F6F8D] hover:text-[#143F93]"
        >
          GitHub <ExternalLink className="w-3.5 h-3.5" />
        </a>
      </div>

      <div className="max-w-[920px] mx-auto px-6 py-10 grid grid-cols-[1fr_200px] gap-10">
        <div>
          <h1 className="text-3xl font-bold text-[#17173A] mb-2">Campaign Creation Flow</h1>
          <p className="text-base text-[#6F6F8D] mb-2">
            The shared structure for every campaign creation wizard — Email, WhatsApp, SMS, Push, RCS, and anything new.
          </p>
          <p className="text-sm text-[#6F6F8D] mb-10">
            Same shell. Same stepper. Same summary panel. Only the step content changes per channel.
          </p>

          <div className="bg-white border border-[#DDE2EE] rounded-lg p-5 mb-10">
            <p className="text-sm font-bold text-[#17173A] mb-2">For AI assistants reading this page</p>
            <p className="text-sm text-[#6F6F8D]">
              When you are asked to build any campaign creation screen, you MUST mirror this structure. Do not invent a new layout. Use the exact hex tokens listed below. Do not substitute colors. Do not change the step order. Do not remove the X close button. Copy <Code>CampaignSetupStep.tsx</Code> as your template and only change the fields.
            </p>
          </div>

          <Section id="structure" title="Visual structure">
            <Pre>{`┌─────────────────────────────────────────────────────────────┐
│  Navbar  (✉ Campaign name      SAVE  NEXT STEP  ✕)         │
├─────────────────────────────────────────────────────────────┤
│  Stepper (✓ Setup → Content → Audience → Schedule)          │
│                     ID: 1234  ✓ Last saved: 39 mins ago     │
├─────────────────────────────────────┬───────────────────────┤
│  <Channel-specific step content>    │   Summary             │
│  (white card on light-blue page bg) │   ▲ Setup             │
│                                     │     Campaign Name:    │
│                                     │     Tags:             │
│                                     │   ▼ Audience          │
│                                     │   ▼ Content           │
│                                     │   ▼ Schedule          │
└─────────────────────────────────────┴───────────────────────┘`}</Pre>
            <p className="mt-4">
              See it live at{" "}
              <Link to="/" className="text-[#143F93] underline">/</Link>{" "}
              (the demo route).
            </p>
          </Section>

          <Section id="tokens" title="Design tokens — never invent your own">
            <p className="mb-3 text-[#6F6F8D]">
              Pulled directly from Figma. Use these exact hex values everywhere — do not substitute "close enough" colors.
            </p>
            <div className="bg-white border border-[#DDE2EE] rounded-lg overflow-hidden">
              <table className="w-full text-sm">
                <thead className="bg-[#F8F8F8] text-left text-[#17173A]">
                  <tr>
                    <th className="py-2 px-3 font-semibold">Hex</th>
                    <th className="py-2 px-3 font-semibold">Figma name</th>
                    <th className="py-2 px-3 font-semibold">Used for</th>
                  </tr>
                </thead>
                <tbody className="px-3">
                  <Swatch hex="#143F93" name="Primary / Cobalt Blue" use="NEXT STEP bg, channel icon" />
                  <Swatch hex="#00C48C" name="Secondary / Green" use="Active step ring, toggle on, Last saved check" />
                  <Swatch hex="#17173A" name="Text / Charcoal" use="Primary text, headings, active labels" />
                  <Swatch hex="#6F6F8D" name="Tertiary / Grey" use="Secondary text, upcoming step labels, X icon" />
                  <Swatch hex="#DDE2EE" name="Tertiary / Almost Grey" use="All borders, separators, SAVE/X border" />
                  <Swatch hex="#F4F8FF" name="Tertiary / LightBlue" use="Page bg, channel-icon bg" />
                  <Swatch hex="#F8F8F8" name="Text / Default Fill" use="Input field background" />
                  <Swatch hex="#FFFFFF" name="Monochrome / White" use="Navbar, stepper, content card" />
                </tbody>
              </table>
            </div>
            <p className="mt-4 text-[#6F6F8D]">
              <strong>Typography:</strong> Nunito Sans — Bold 16/22 for H3, SemiBold 14/20 for labels & buttons, Regular 14/20 for body.
            </p>
          </Section>

          <Section id="add-channel" title="How to add a new channel">
            <p className="mb-3">
              The fastest path: <strong>copy <Code>CampaignSetupStep.tsx</Code> and modify the fields</strong>. The shell stays the same across every channel.
            </p>
            <ol className="list-decimal list-inside space-y-3 my-4 text-[#17173A]">
              <li>
                <strong>Pick a channel icon</strong> from <Code>lucide-react</Code>. Email uses <Code>Mail</Code>, WhatsApp <Code>MessageCircle</Code>, SMS <Code>MessageSquare</Code>, Push <Code>Bell</Code>. Background <Code>#F4F8FF</Code>, icon color <Code>#143F93</Code>.
              </li>
              <li>
                <strong>Build a step component</strong> wrapped in:
                <Pre>{`<div className="bg-white border border-[#DDE2EE] rounded-lg p-8 max-w-[760px]">
  {/* your channel-specific fields */}
</div>`}</Pre>
              </li>
              <li>
                <strong>Define the steps</strong> with the canonical order Setup → Content → Audience → Schedule, marking one as <Code>active</Code>.
              </li>
              <li>
                <strong>Wire the summary</strong> with the fields that matter for your channel.
              </li>
              <li>
                <strong>Render the page</strong>:
                <Pre>{`<CampaignCreationLayout
  campaignName="WhatsApp Diwali blast"
  campaignId="9342"
  lastSaved="just now"
  steps={whatsappSteps}
  summarySections={whatsappSummary}
  onSave={...}
  onNextStep={...}
  onClose={...}
>
  <WhatsAppSetupStep />
</CampaignCreationLayout>`}</Pre>
              </li>
            </ol>
          </Section>

          <Section id="form-fields" title="Form-field pattern">
            <p className="mb-2 font-semibold text-[#17173A]">Text input</p>
            <Pre>{`<label className="block text-sm font-semibold text-[#17173A] mb-1.5">
  Field label <span className="text-red-500">*</span>
</label>
<input className="w-full h-10 bg-[#F8F8F8] border border-[#DDE2EE] rounded-md px-3 text-sm
  text-[#17173A] placeholder:text-[#6F6F8D]
  focus:outline-none focus:ring-1 focus:ring-[#143F93]/40" />`}</Pre>

            <p className="mb-2 mt-5 font-semibold text-[#17173A]">Toggle row (in a bordered card)</p>
            <Pre>{`<div className="border border-[#DDE2EE] rounded-md p-4 flex items-start justify-between">
  <div>
    <p className="text-sm font-bold text-[#17173A]">Setting name</p>
    <p className="text-xs text-[#6F6F8D] mt-1">Description.</p>
  </div>
  <Switch className="data-[state=checked]:bg-[#00C48C]" />
</div>`}</Pre>

            <p className="mb-2 mt-5 font-semibold text-[#17173A]">Section heading</p>
            <Pre>{`<h2 className="text-base font-bold text-[#17173A]">Section title</h2>
<p className="text-sm text-[#6F6F8D] mt-1">Short description.</p>`}</Pre>
          </Section>

          <Section id="step-status" title="Step status visuals">
            <div className="bg-white border border-[#DDE2EE] rounded-lg overflow-hidden">
              <table className="w-full text-sm">
                <thead className="bg-[#F8F8F8] text-left text-[#17173A]">
                  <tr>
                    <th className="py-2 px-3 font-semibold">Status</th>
                    <th className="py-2 px-3 font-semibold">Circle</th>
                    <th className="py-2 px-3 font-semibold">Label color</th>
                    <th className="py-2 px-3 font-semibold">Underline</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-[#DDE2EE]">
                    <td className="py-2 px-3 font-mono text-[12px]">completed</td>
                    <td className="py-2 px-3">#00C48C filled + white check</td>
                    <td className="py-2 px-3">#17173A</td>
                    <td className="py-2 px-3">—</td>
                  </tr>
                  <tr className="border-b border-[#DDE2EE]">
                    <td className="py-2 px-3 font-mono text-[12px]">active</td>
                    <td className="py-2 px-3">#00C48C filled + white check</td>
                    <td className="py-2 px-3">#17173A</td>
                    <td className="py-2 px-3">#00C48C 2px</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-3 font-mono text-[12px]">upcoming</td>
                    <td className="py-2 px-3">white, #DDE2EE border, icon #6F6F8D</td>
                    <td className="py-2 px-3">#6F6F8D</td>
                    <td className="py-2 px-3">—</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="mt-3">
              <strong>Canonical step order:</strong> Setup → Content → Audience → Schedule (matches Figma).
            </p>
          </Section>

          <Section id="donts" title="Don'ts">
            <ul className="space-y-2 list-disc list-inside">
              <li>Don't put step content outside the <Code>bg-white border rounded-lg</Code> card.</li>
              <li>Don't introduce a new color palette — every channel shares the tokens above.</li>
              <li>Don't change the stepper order.</li>
              <li>Don't replace the right summary panel with a custom one — extend it via <Code>summarySections</Code>.</li>
              <li>Don't use a back chevron in the navbar; the channel icon represents the campaign.</li>
              <li>Don't omit the X close button — every campaign creation flow needs an exit affordance.</li>
            </ul>
          </Section>

          <Section id="reference" title="Reference this page in your .md">
            <p className="mb-3">In any project's CLAUDE.md, README, or Cursor rules, paste this:</p>
            <Pre>{`When building a campaign creation screen, mirror the
structure documented at:
https://product-netcore.github.io/campaign-creation-flow/#/docs

Use the exact hex tokens listed there. Do not design a new
layout. Copy CampaignSetupStep.tsx as a template — see the
repo at github.com/Product-Netcore/campaign-creation-flow`}</Pre>
            <p className="mt-3 text-[#6F6F8D]">
              AI tools that follow links will fetch this page, internalize the structure, and produce screens consistent with every other channel.
            </p>
          </Section>
        </div>

        {/* Right sidebar TOC */}
        <aside className="text-sm sticky top-20 h-fit">
          <p className="text-[11px] uppercase tracking-wide text-[#6F6F8D] font-bold mb-3">On this page</p>
          <ul className="space-y-2 text-[#6F6F8D]">
            <li><a href="#structure" className="hover:text-[#143F93]">Visual structure</a></li>
            <li><a href="#tokens" className="hover:text-[#143F93]">Design tokens</a></li>
            <li><a href="#add-channel" className="hover:text-[#143F93]">Add a new channel</a></li>
            <li><a href="#form-fields" className="hover:text-[#143F93]">Form-field pattern</a></li>
            <li><a href="#step-status" className="hover:text-[#143F93]">Step status visuals</a></li>
            <li><a href="#donts" className="hover:text-[#143F93]">Don'ts</a></li>
            <li><a href="#reference" className="hover:text-[#143F93]">Reference in your .md</a></li>
          </ul>
        </aside>
      </div>
    </div>
  );
};
