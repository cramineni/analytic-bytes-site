import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";
import type { Metadata } from "next";
import { ESSAYS, ARC_LABELS, type Arc } from "./essays";

export const metadata: Metadata = {
  title: "Library — Analytic Bytes",
  description:
    "Essays, artifacts, and field notes on decision systems, measurement, and operating-team data work.",
};

// =====================================================================
// CONTENT — add new entries here. Newest first.
// =====================================================================
//
// type:     'essay' | 'artifact' | 'field-note'
// title:    short title
// date:     YYYY-MM-DD
// summary:  1–2 line description (for essays/field-notes) OR caption (for artifacts)
// url:      external link (LinkedIn post, Substack, etc.) OR leave empty
// image:    OPTIONAL — for artifacts. Path to image in /public/library/[file]
//           Example: "/library/from-signal-to-action.png"
//           Recommended: 1200x900 or similar, optimized for web
// =====================================================================

type Entry = {
  type: "essay" | "artifact" | "field-note";
  title: string;
  date?: string; // essays/field-notes are dated; artifacts are not
  summary: string;
  url?: string;
  image?: string;
  arc?: Arc; // only set on essays/field-notes; artifacts are arc-less
  slug?: string; // only set on artifacts; used to render anchor id for cross-links
};

// Artifacts — figures from the analytical work (architecture diagrams,
// data charts, flowcharts). Dateless on purpose; they render in their own
// gallery below the dated essays/field-notes feed. SVGs live in
// /public/library/artifacts/. Essays are NOT listed here — they come from
// the ESSAYS registry (./essays.tsx).
const ARTIFACTS: Entry[] = [
  {
    type: "artifact",
    title: "The Contract at the Seam",
    summary:
      "Integration moves the data. The contract makes the judgment. A tool- and sector-agnostic diagram of what the contract specifies that integration cannot — who owns the action, what data and at what resolution, on what cadence, and what decision the signal should trigger. The seam between delivered data and made decisions.",
    image: "/library/artifacts/contract-at-the-seam.svg",
    slug: "contract-at-the-seam",
  },
  {
    type: "artifact",
    title: "The Decision System — reference architecture",
    summary:
      "A tool-agnostic reference architecture: sources through integration, warehouse, and the semantic-layer keystone to AI and the reporting surfaces, with a governance rail across every layer and a learning loop that closes the system.",
    image: "/library/artifacts/decision-system-reference-architecture.svg",
    slug: "decision-system-reference-architecture",
  },
  {
    type: "artifact",
    title: "One Architecture, Three Stacks",
    summary:
      "The same six-layer architecture instantiated three ways — Microsoft/Fabric, the modern data stack, and lean/open — showing the tools swap while the architecture holds. The semantic layer is the keystone in all three.",
    image: "/library/artifacts/one-architecture-three-stacks.svg",
    slug: "one-architecture-three-stacks",
  },
  {
    type: "artifact",
    title: "The Agent System",
    summary:
      "An agentic-AI architecture: five named agents — Data, Analysis, Insight, Execution, Monitoring — operating the Signal–Decision–Action loop, with monitoring closing the loop and a human-in-the-loop rail across every agent. The system around the model, not the model itself, is the architecture.",
    image: "/library/artifacts/agent-system.svg",
    slug: "agent-system",
  },
  {
    type: "artifact",
    title: "Decision Load vs Decision Capacity",
    summary:
      "AI raises both an organization's decision load and its decision capacity. Whether the gap closes or opens is a design choice. Deploy without redesign and a leader quietly becomes the buffer the system never built. Design for capacity expansion and the system absorbs what was previously personal.",
    image: "/library/artifacts/decision-load-vs-capacity.svg",
    slug: "decision-load-vs-capacity",
  },
  {
    type: "artifact",
    title: "Reliability vs Validity",
    summary:
      "The four-target view of the AI scoring trap: a model can agree with human raters at a high rate (reliable) and still measure the wrong thing (invalid) — a tight cluster, off the bullseye.",
    image: "/library/artifacts/reliability-vs-validity.svg",
    slug: "reliability-vs-validity",
  },
  {
    type: "artifact",
    title: "The Validity Ladder",
    summary:
      "Five rungs of evidence for an AI system. Most AI scoring stops at rung three — agreement with human raters — when the real bar is rung four: does the score predict the outcome it was built to predict?",
    image: "/library/artifacts/validity-ladder.svg",
    slug: "validity-ladder",
  },
  {
    type: "artifact",
    title: "Fair for Whom?",
    summary:
      "Fairness reframed as validity asked one subgroup at a time. An aggregate accuracy number can look fine while the model quietly degrades for smaller groups — differential prediction hiding under the average.",
    image: "/library/artifacts/fair-for-whom.svg",
    slug: "fair-for-whom",
  },
  {
    type: "artifact",
    title: "The Evidence Spine",
    summary:
      "The measurement-and-evaluation architecture that turns monitoring into learning: a living theory of change as keystone, harmonized assessments, and one semantic layer so every audience sees numbers that agree.",
    image: "/library/artifacts/evidence-spine.svg",
    slug: "evidence-spine",
  },
  {
    type: "artifact",
    title: "Measurement = Diagnostics",
    summary:
      "A sixteen-row translation table from educational measurement vocabulary to medical diagnostics — across foundations (validity, reliability), models (IRT and ROC, standard setting and thresholds, equating and calibration), bias and equity, stakes and decisions, standards and integrity, and the inferential closer: validity argument and differential diagnosis. Different instruments; the discipline is the same.",
    image: "/library/artifacts/measurement-equals-diagnostics.svg",
    slug: "measurement-equals-diagnostics",
  },
  {
    type: "artifact",
    title: "Higher Ed = Healthcare",
    summary:
      "An eighteen-row translation table mapping higher-education data and analytics vocabulary onto healthcare equivalents — across outcomes, throughput, advising and care navigation, support programs, infrastructure (SIS/EHR, NSC/HIE, 1EdTech/FHIR), regulation, accountability, equity, and integrative philosophy. Different sectors; the discipline is the same.",
    image: "/library/artifacts/higher-ed-equals-healthcare.svg",
    slug: "higher-ed-equals-healthcare",
  },
  {
    type: "artifact",
    title: "K-12 = Healthcare",
    summary:
      "An eighteen-row translation table mapping K-12 data and analytics vocabulary onto healthcare equivalents — across outcomes, intervention workflow, infrastructure, regulation, accountability, and integrative philosophy. Different sectors; the discipline is the same.",
    image: "/library/artifacts/k12-equals-healthcare.svg",
    slug: "k12-equals-healthcare",
  },
  {
    type: "artifact",
    title: "Commercial = Mission-Driven",
    summary:
      "A fourteen-term translation table from commercial vocabulary — GTM, audience, segmentation, funnel, conversion, KPIs, OKRs, ROI, LTV, runway, churn, A/B testing, MVP, CI/CD — to its mission-driven equivalents. Different bottom line; the discipline is the same.",
    image: "/library/artifacts/commercial-equals-mission.svg",
    slug: "commercial-equals-mission",
  },
];

// Dated feed — published essays and field notes (from the ESSAYS registry),
// newest-first. Artifacts are dateless and render in their own gallery below.
const ENTRIES: Entry[] = ESSAYS.filter((e) => !e.hidden).map(
  (e): Entry => ({
    type: e.kind,
    title: e.title,
    date: e.date,
    summary: e.summary,
    url: `/library/${e.slug}`,
    arc: e.arc,
  })
).sort((a, b) => (b.date ?? "").localeCompare(a.date ?? ""));

const TYPE_LABELS: Record<Entry["type"], string> = {
  essay: "Essay",
  artifact: "Artifact",
  "field-note": "Field Note",
};

function formatDate(iso?: string) {
  if (!iso) return "";
  const d = new Date(iso + "T00:00:00");
  return d.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export default function LibraryPage() {
  return (
    <>
      <Nav />

      <main>
        {/* HEADER */}
        <section className="pt-20 pb-12 sm:pt-24 sm:pb-16">
          <div className="max-w-page mx-auto px-5 sm:px-8">
            <Reveal>
              <div className="font-mono text-[12px] text-ink-3">
                <span className="text-accent">●</span>&nbsp;&nbsp;Library
              </div>
              <h1 className="font-extrabold leading-[0.95] tracking-[-0.035em] mt-6 text-[44px] sm:text-[68px] lg:text-[84px] text-ink max-w-[18ch]">
                Notes from the <span className="text-accent">decision system.</span>
              </h1>
              <p className="text-ink-2 text-[17px] max-w-[600px] mt-6 leading-[1.55]">
                Essays, artifacts, and field notes — on decision-system architecture,
                measurement, and the operating teams that ship them.
              </p>
            </Reveal>
          </div>
        </section>

        {/* WRITINGS — essays & field notes, dated feed */}
        <section className="pb-16">
          <div className="max-w-page mx-auto px-5 sm:px-8">
            <Reveal>
              <div className="border-t border-line">
                {ENTRIES.map((entry, i) => (
                  <Entry key={`${entry.date}-${i}`} entry={entry} />
                ))}
              </div>
            </Reveal>
          </div>
        </section>

        {/* ARTIFACTS — dateless visual gallery */}
        {ARTIFACTS.length > 0 ? (
          <section className="pb-32">
            <div className="max-w-page mx-auto px-5 sm:px-8">
              <Reveal>
                <div className="border-t border-line pt-7">
                  <div className="font-mono text-[11px] text-ink-3 tracking-[0.18em] uppercase mb-2">
                    Artifacts
                  </div>
                  <p className="text-ink-2 text-[15px] max-w-[600px] mb-10 leading-[1.55]">
                    Diagrams and figures from the work — architecture, measurement,
                    and decision-system frames.
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-12">
                    {ARTIFACTS.map((entry, i) => (
                      <ArtifactCard key={`artifact-${i}`} entry={entry} />
                    ))}
                  </div>
                </div>
                <div className="mt-16 text-ink-3 text-sm">
                  More entries coming. Have a topic you want me to write about?{" "}
                  <a
                    href="mailto:hello@analyticbytes.systems"
                    className="text-ink underline-offset-4 underline decoration-line-2 hover:decoration-accent"
                  >
                    Send a note
                  </a>
                  .
                </div>
              </Reveal>
            </div>
          </section>
        ) : null}
      </main>

      <Footer />
    </>
  );
}

function Entry({ entry }: { entry: Entry }) {
  return <TextEntry entry={entry} />;
}

// Dateless, image-led card for the artifacts gallery.
function ArtifactCard({ entry }: { entry: Entry }) {
  const inner = (
    <>
      <div className="rounded-md overflow-hidden border border-line bg-bg-alt mb-4">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={entry.image}
          alt={entry.title}
          className="w-full h-auto block"
          loading="lazy"
        />
      </div>
      <div className="font-mono text-[11px] tracking-[0.18em] uppercase text-accent mb-2">
        Artifact
      </div>
      <h3 className="text-[18px] sm:text-[20px] font-bold tracking-[-0.015em] text-ink leading-[1.3]">
        {entry.title}
      </h3>
      {entry.summary ? (
        <p className="text-ink-2 text-[14px] sm:text-[15px] leading-[1.55] mt-2 max-w-[60ch]">
          {entry.summary}
        </p>
      ) : null}
    </>
  );
  const anchorId = entry.slug ? `artifact-${entry.slug}` : undefined;
  return entry.url ? (
    <a
      id={anchorId}
      href={entry.url}
      target={entry.url.startsWith("http") ? "_blank" : undefined}
      rel="noopener"
      className="group block no-underline scroll-mt-24"
    >
      {inner}
    </a>
  ) : (
    <div id={anchorId} className="block scroll-mt-24">
      {inner}
    </div>
  );
}

function TextEntry({ entry }: { entry: Entry }) {
  const isLink = entry.url && entry.url.length > 0;
  const Wrap = isLink
    ? ({ children }: { children: React.ReactNode }) => (
        <a
          href={entry.url}
          target={entry.url?.startsWith("http") ? "_blank" : undefined}
          rel="noopener"
          className="block group hover:bg-bg-alt transition-colors no-underline"
        >
          {children}
        </a>
      )
    : ({ children }: { children: React.ReactNode }) => (
        <div className="block opacity-70">{children}</div>
      );

  return (
    <Wrap>
      <article className="grid grid-cols-1 sm:grid-cols-[120px_120px_1fr_auto] gap-2 sm:gap-8 py-8 border-b border-line">
        <time className="font-mono text-[12px] text-ink-3 tracking-[0.04em] uppercase pt-1.5">
          {formatDate(entry.date)}
        </time>
        <div className="font-mono text-[11px] tracking-[0.18em] uppercase pt-2 text-accent">
          {TYPE_LABELS[entry.type]}
        </div>
        <div className="min-w-0">
          <h3 className="text-[18px] sm:text-[22px] lg:text-[24px] font-bold tracking-[-0.015em] text-ink leading-[1.25]">
            {entry.title}
          </h3>
          {entry.summary ? (
            <p className="text-ink-2 text-[14px] sm:text-[15px] mt-2 leading-[1.5] max-w-[64ch]">
              {entry.summary}
            </p>
          ) : null}
          {entry.arc ? (
            <div className="mt-3">
              <span className="inline-flex items-center font-mono text-[10.5px] tracking-[0.12em] uppercase text-ink-2 border border-line-2 rounded-sm px-2 py-0.5">
                {ARC_LABELS[entry.arc]}
              </span>
            </div>
          ) : null}
          {!isLink ? (
            <p className="text-ink-3 text-[11px] mt-2 font-mono tracking-[0.04em] uppercase">
              Coming soon
            </p>
          ) : null}
        </div>
        <div className="text-ink-3 text-2xl group-hover:text-accent group-hover:translate-x-1.5 transition-all hidden sm:block self-center">
          {isLink ? "↗" : ""}
        </div>
      </article>
    </Wrap>
  );
}
