import { createFileRoute } from "@tanstack/react-router";
import { Badge } from "@/components/mf/Badge";
import { Button } from "@/components/mf/Button";
import { Chip } from "@/components/mf/Chip";
import { Field } from "@/components/mf/Field";

export const Route = createFileRoute("/design-system")({
  head: () => ({
    meta: [
      { title: "Design system & research notes — MediFlow" },
      {
        name: "description",
        content:
          "MediFlow's Figma-ready design system: colour and type styles, spacing scale, component states, design hypotheses and a proposed usability test.",
      },
      { property: "og:title", content: "Design system & research notes — MediFlow" },
      {
        property: "og:description",
        content: "Tokens, component states, design hypotheses and a proposed usability test for the MediFlow concept.",
      },
    ],
  }),
  component: DesignSystem,
});

const colors = [
  { name: "Primary / Forest green", token: "--primary", className: "bg-primary" },
  { name: "Primary soft", token: "--primary-soft", className: "bg-primary-soft" },
  { name: "Secondary / Soft sage", token: "--secondary", className: "bg-secondary" },
  { name: "Accent / Warm yellow", token: "--accent", className: "bg-accent" },
  { name: "Background / Warm off-white", token: "--background", className: "bg-background" },
  { name: "Text / Deep charcoal", token: "--foreground", className: "bg-foreground" },
  { name: "Success", token: "--success", className: "bg-success" },
  { name: "Error", token: "--destructive", className: "bg-destructive" },
];

const spacing = [4, 8, 12, 16, 24, 32, 48, 64];

function Section({ title, children, lead }: { title: string; lead?: string; children: React.ReactNode }) {
  return (
    <section className="mt-12 border-t border-border pt-8">
      <h2 className="text-h1">{title}</h2>
      {lead && <p className="mt-2 max-w-prose text-body text-muted-foreground">{lead}</p>}
      <div className="mt-5">{children}</div>
    </section>
  );
}

function DesignSystem() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6">
      <p className="text-label text-primary">Case study notes</p>
      <h1 className="mt-3 text-display">MediFlow design system</h1>
      <p className="mt-4 max-w-prose text-body text-muted-foreground">
        Every token, component and state below is named so it can be rebuilt in Figma as colour styles, text styles,
        Auto Layout components and variants — without redesigning the product. MediFlow is a design concept with
        fictional data; no patients were interviewed and nothing here has been deployed to real clinics.
      </p>

      <Section
        title="Colour styles"
        lead="A restrained palette: one primary, one supporting sage, one warm accent used sparingly, plus semantic success and error."
      >
        <ul className="grid gap-3 sm:grid-cols-2">
          {colors.map((c) => (
            <li key={c.token} className="flex items-center gap-3 rounded-md border border-border bg-card p-3">
              <span aria-hidden="true" className={`size-10 shrink-0 rounded-md border border-border ${c.className}`} />
              <span className="min-w-0">
                <span className="block text-small font-semibold">{c.name}</span>
                <code className="block text-small text-muted-foreground">{c.token}</code>
              </span>
            </li>
          ))}
        </ul>
      </Section>

      <Section title="Text styles" lead="One clean sans-serif family across six roles. Hindi uses a Devanagari companion at the same sizes.">
        <div className="grid gap-4 rounded-lg border border-border bg-card p-5">
          <p className="text-display">Display — 36/52px</p>
          <p className="text-h1">H1 — 26/32px</p>
          <p className="text-h2">H2 — 18px semibold</p>
          <p className="text-body">Body — 16px, 1.6 line height for comfortable reading.</p>
          <p className="text-small text-muted-foreground">Small — 14px, hints and metadata.</p>
          <p className="text-label text-muted-foreground">Label — 13px uppercase</p>
          <p className="text-h2" lang="hi">
            हिंदी — डॉक्टर खोजें
          </p>
        </div>
      </Section>

      <Section title="Spacing scale" lead="4px base scale, used for Auto Layout padding and gaps.">
        <ul className="flex flex-wrap items-end gap-4">
          {spacing.map((s) => (
            <li key={s} className="text-center">
              <span aria-hidden="true" className="block bg-primary" style={{ width: s, height: s }} />
              <span className="mt-2 block text-small text-muted-foreground">{s}</span>
            </li>
          ))}
        </ul>
      </Section>

      <Section title="Component states" lead="Buttons, chips, inputs and badges — default, hover, focus, selected, disabled, error and success.">
        <div className="grid gap-6">
          <div className="flex flex-wrap items-center gap-3">
            <Button>Primary</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="ghost">Ghost</Button>
            <Button disabled>Disabled</Button>
          </div>
          <div className="flex flex-wrap gap-2">
            <Chip>Default chip</Chip>
            <Chip selected>Selected chip</Chip>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Input — default" inputProps={{ placeholder: "Search doctors or specialties" }} />
            <Field
              label="Input — error"
              error="Enter a 10-digit phone number, without spaces or country code."
              inputProps={{ defaultValue: "98765" }}
            />
          </div>
          <div className="flex flex-wrap gap-2">
            <Badge>Neutral</Badge>
            <Badge tone="info">Video consultation</Badge>
            <Badge tone="success">Confirmed</Badge>
            <Badge tone="warning">Few slots left</Badge>
          </div>
        </div>
      </Section>

      <Section title="Figma structure to rebuild" lead="Pages, frames and components mapped one-to-one with this implementation.">
        <div className="rounded-lg border border-border bg-card p-5">
          <pre className="overflow-x-auto text-small leading-relaxed">
{`Page: 01 Foundations
  Colour styles · Text styles · Spacing · Radius · Focus ring
Page: 02 Components (Auto Layout + variants)
  Button      variant=primary|secondary|outline|ghost  state=default|hover|focus|disabled
  Input       state=default|focus|error   hint=on|off
  SearchField state=default|focus
  DoctorCard  availability=today|later
  FilterChip  state=default|selected
  DateSelector state=default|selected
  TimeSlot    state=available|selected|unavailable
  StatusBadge tone=neutral|info|success|warning
  Summary row · Navigation bar (mobile / desktop)
Page: 03 Screens (frames 390x844 mobile, 1440 desktop)
  Home · Search results · Doctor profile · Date & time
  Patient details · Review · Confirmation · Connection error
Page: 04 Prototype
  Home -> Search -> Profile -> Time -> Details -> Review -> Confirmation
  Back links on every screen; error state triggered from Review`}
          </pre>
        </div>
      </Section>

      <Section title="Design hypotheses" lead="Stated as hypotheses, not findings. These are what a study would test.">
        <ul className="grid gap-3">
          {[
            "Users may feel more confident when doctor information, availability and appointment details appear in a predictable order.",
            "Showing one primary action per screen may reduce hesitation compared with presenting all options at once.",
            "Plain-language error messages may help people recover without abandoning the form.",
            "Offering a language choice on navigation and primary actions may increase confidence for Hindi-first users.",
          ].map((h) => (
            <li key={h} className="rounded-md border-l-4 border-primary bg-primary-soft/50 p-4 text-body">
              {h}
            </li>
          ))}
        </ul>
      </Section>

      <Section title="Research questions" lead="Open questions this concept is built to explore.">
        <ul className="grid list-disc gap-2 pl-5 text-body">
          <li>What information do users need before choosing a doctor?</li>
          <li>Where do users hesitate during appointment booking?</li>
          <li>Which terminology is easiest to understand?</li>
          <li>How does language preference affect confidence?</li>
          <li>What accessibility barriers appear during form completion?</li>
        </ul>
      </Section>

      <Section title="Proposed usability test" lead="Not yet run. No results are claimed.">
        <div className="rounded-lg border border-border bg-card p-5">
          <p className="text-h2">Task</p>
          <p className="mt-1 text-body">“Book a dermatology appointment for tomorrow at 5:30 PM.”</p>
          <p className="mt-5 text-h2">Possible measures</p>
          <ul className="mt-1 grid list-disc gap-1 pl-5 text-body">
            <li>Task completion</li>
            <li>Navigation errors</li>
            <li>Points of hesitation</li>
            <li>Time on task</li>
            <li>Comprehension of labels and terminology</li>
          </ul>
        </div>
      </Section>

      <Section title="Accessibility decisions" lead="What is implemented in this build.">
        <ul className="grid list-disc gap-2 pl-5 text-body">
          <li>Semantic landmarks and a single H1 per screen, with an ordered heading structure.</li>
          <li>Visible 3px focus ring on every interactive element; full keyboard operability.</li>
          <li>Touch targets of at least 44px on primary controls.</li>
          <li>Time-slot states use icons, borders and strikethrough, never colour alone.</li>
          <li>Errors name the problem and the fix, and are announced via <code>role="alert"</code> and <code>aria-describedby</code>.</li>
          <li>Reduced-motion preference disables transitions; no decorative animation or heavy imagery.</li>
          <li>Form answers persist on the device so an interrupted connection does not lose data.</li>
        </ul>
      </Section>
    </div>
  );
}
