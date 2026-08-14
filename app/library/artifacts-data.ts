// =====================================================================
// ARTIFACTS — the shared source of truth.
// =====================================================================
// Diagrams, tables, and frames from the analytical work. SVGs live in
// /public/library/artifacts/. Each artifact carries a slug that maps
// to a dedicated route at /library/artifacts/<slug>. The `referencedIn`
// array is the reverse-index of every <ArtifactLink slug=...> usage
// across essays.tsx — used by the per-artifact page to show a "Referenced
// in" cross-link block.
// =====================================================================

export type ArtifactReference = {
  slug: string;
  title: string;
};

export type Artifact = {
  title: string;
  summary: string;
  image: string;
  slug: string;
  referencedIn?: ArtifactReference[];
  // Format of the artifact asset. Defaults to "svg" if omitted (all
  // existing artifacts). "html" artifacts are self-contained pages
  // rendered in an iframe on the artifact detail page and served
  // directly at /library/artifacts/<slug>.html — no OG-preview image
  // is auto-generated; supply `previewImage` if you have one.
  format?: "svg" | "html";
  previewImage?: string;
};

export const ARTIFACTS: Artifact[] = [
  {
    title: "Decision-System Architecture — the four disciplines",
    summary:
      "The umbrella frame of the Analytic Bytes Library at a glance. A central node — Decision-System Architecture — surrounded by the four disciplines that compose it: Measurement, Integration governance, Data foundations, and AI systems. Each cluster names three load-bearing concepts inside its discipline. The arc pill on every library card maps to one of these four. For the technical stack the disciplines describe, see the reference architecture below.",
    image: "/library/artifacts/decision-system-architecture-frame.svg",
    slug: "decision-system-architecture-frame",
  },
  {
    title: "The Contract at the Seam",
    summary:
      "Integration moves the data. The contract makes the judgment. A tool- and sector-agnostic diagram of what the contract specifies that integration cannot — who owns the action, what data and at what resolution, on what cadence, and what decision the signal should trigger. The seam between delivered data and made decisions.",
    image: "/library/artifacts/contract-at-the-seam.svg",
    slug: "contract-at-the-seam",
    referencedIn: [
      {
        slug: "the-contracts-between-systems",
        title: "The contracts between systems",
      },
      {
        slug: "blown-assignment",
        title:
          "It’s not a communication issue. It’s a blown assignment.",
      },
      {
        slug: "functions-dont-run-plays",
        title: "Functions don’t run plays.",
      },
      { slug: "the-decision-system", title: "The Decision System" },
    ],
  },
  {
    title: "The Decision System — reference architecture",
    summary:
      "A tool-agnostic reference architecture: sources through integration, warehouse, and the semantic-layer keystone to AI and the reporting surfaces, with a governance rail across every layer and a learning loop that closes the system. For the editorial frame that organizes the library around this stack, see the four-disciplines view above.",
    image: "/library/artifacts/decision-system-reference-architecture.svg",
    slug: "decision-system-reference-architecture",
    referencedIn: [
      {
        slug: "three-surfaces-one-keystone",
        title: "Three Surfaces, One Keystone",
      },
      { slug: "the-decision-system", title: "The Decision System" },
    ],
  },
  {
    title: "One Architecture, Three Stacks",
    summary:
      "The same six-layer architecture instantiated three ways — Microsoft/Fabric, the modern data stack, and lean/open — showing the tools swap while the architecture holds. The semantic layer is the keystone in all three.",
    image: "/library/artifacts/one-architecture-three-stacks.svg",
    slug: "one-architecture-three-stacks",
  },
  {
    title: "The Agent System",
    summary:
      "An agentic-AI architecture: five named agents — Data, Analysis, Insight, Execution, Monitoring — operating the Signal–Decision–Action loop, with monitoring closing the loop and a human-in-the-loop rail across every agent. The system around the model, not the model itself, is the architecture.",
    image: "/library/artifacts/agent-system.svg",
    slug: "agent-system",
    referencedIn: [
      { slug: "actions-not-answers", title: "Actions, Not Answers" },
    ],
  },
  {
    title: "Decision Load vs Decision Capacity",
    summary:
      "AI raises both an organization's decision load and its decision capacity. Whether the gap closes or opens is a design choice. Deploy without redesign and a leader quietly becomes the buffer the system never built. Design for capacity expansion and the system absorbs what was previously personal.",
    image: "/library/artifacts/decision-load-vs-capacity.svg",
    slug: "decision-load-vs-capacity",
  },
  {
    title: "The Data Role Landscape",
    summary:
      "Data-leadership roles distributed across the five stages of the decision arc — build the system, govern the system, interpret the signal, support the decision, own the decision. Each role clusters around one or two arc positions; no single role carries every stage. The composite role many JDs imply requires heavy load across every position, which is the shape that makes it hard to fill with one hire.",
    image: "/library/artifacts/who-writes-the-contract-role-map.svg",
    slug: "who-writes-the-contract-role-map",
  },
  {
    title: "Reliability vs Validity",
    summary:
      "The four-target view of the AI scoring trap: a model can agree with human raters at a high rate (reliable) and still measure the wrong thing (invalid) — a tight cluster, off the bullseye.",
    image: "/library/artifacts/reliability-vs-validity.svg",
    slug: "reliability-vs-validity",
    referencedIn: [
      {
        slug: "what-is-this-system-measuring",
        title: "What is this system actually measuring?",
      },
    ],
  },
  {
    title: "The Validity Ladder",
    summary:
      "Five rungs of evidence for an AI system. Most AI scoring stops at rung three — agreement with human raters — when the real bar is rung four: does the score predict the outcome it was built to predict?",
    image: "/library/artifacts/validity-ladder.svg",
    slug: "validity-ladder",
    referencedIn: [
      {
        slug: "what-is-this-system-measuring",
        title: "What is this system actually measuring?",
      },
    ],
  },
  {
    title: "Fair for Whom?",
    summary:
      "Fairness reframed as validity asked one subgroup at a time. An aggregate accuracy number can look fine while the model quietly degrades for smaller groups — differential prediction hiding under the average.",
    image: "/library/artifacts/fair-for-whom.svg",
    slug: "fair-for-whom",
    referencedIn: [
      {
        slug: "what-is-this-system-measuring",
        title: "What is this system actually measuring?",
      },
    ],
  },
  {
    title: "The Evidence Spine",
    summary:
      "The measurement-and-evaluation architecture that turns monitoring into learning: a living theory of change as keystone, harmonized assessments, and one semantic layer so every audience sees numbers that agree.",
    image: "/library/artifacts/evidence-spine.svg",
    slug: "evidence-spine",
  },
  {
    title: "Measurement = Diagnostics",
    summary:
      "A sixteen-row translation table from educational measurement vocabulary to medical diagnostics — across foundations (validity, reliability), models (IRT and ROC, standard setting and thresholds, equating and calibration), bias and equity, stakes and decisions, standards and integrity, and the inferential closer: validity argument and differential diagnosis. Different instruments; the discipline is the same.",
    image: "/library/artifacts/measurement-equals-diagnostics.svg",
    slug: "measurement-equals-diagnostics",
  },
  {
    title: "Higher Ed = Healthcare",
    summary:
      "An eighteen-row translation table mapping higher-education data and analytics vocabulary onto healthcare equivalents — across outcomes, throughput, advising and care navigation, support programs, infrastructure (SIS/EHR, NSC/HIE, 1EdTech/FHIR), regulation, accountability, equity, and integrative philosophy. Different sectors; the discipline is the same.",
    image: "/library/artifacts/higher-ed-equals-healthcare.svg",
    slug: "higher-ed-equals-healthcare",
  },
  {
    title: "K-12 = Healthcare",
    summary:
      "An eighteen-row translation table mapping K-12 data and analytics vocabulary onto healthcare equivalents — across outcomes, intervention workflow, infrastructure, regulation, accountability, and integrative philosophy. Different sectors; the discipline is the same.",
    image: "/library/artifacts/k12-equals-healthcare.svg",
    slug: "k12-equals-healthcare",
  },
  {
    title: "Commercial = Mission-Driven",
    summary:
      "A fourteen-term translation table from commercial vocabulary — GTM, audience, segmentation, funnel, conversion, KPIs, OKRs, ROI, LTV, runway, churn, A/B testing, MVP, CI/CD — to its mission-driven equivalents. Different bottom line; the discipline is the same.",
    image: "/library/artifacts/commercial-equals-mission.svg",
    slug: "commercial-equals-mission",
  },
  {
    title: "The essential minimum — mission-driven AI evaluation",
    summary:
      "Five components of one discipline: task decomposition, ground-truth benchmarking with constrained data, deployment-context evaluation, downstream impact evaluation, and escalation with human-in-the-loop discipline. Each column names the principle and a concrete example. None of the five requires enterprise-scale infrastructure. All of them require naming what is being evaluated, evaluating it in the deployment context, and designing the human checkpoint back in.",
    image: "/library/artifacts/when-the-stakes-essential-minimum.svg",
    slug: "when-the-stakes-essential-minimum",
    referencedIn: [
      {
        slug: "when-the-stakes-are-the-mission",
        title: "When the stakes are the mission.",
      },
    ],
  },
  {
    title: "Three lenses on the same practice",
    summary:
      "Six task categories from AB's 90-day audit, read through three measurement lenses: raw session count (throughput), weighted-proxy volume (attention estimate), and real token share (cost measurement). The top two categories sit in an HITL band where AI drives and human oversees; the bottom four sit in an AITL band where human drives and AI assists. Where two lenses align the story holds; where they diverge, one method needs review. Aggregating them into a single 'how much AI' number destroys that signal. Caveat: tokens measured for 30 of 93 sessions.",
    image: "/library/artifacts/ab-three-lenses.svg",
    slug: "ab-three-lenses",
    referencedIn: [
      {
        slug: "auditing-an-ai-native-practice",
        title: "Auditing an AI-native practice.",
      },
    ],
  },
  {
    title: "Multi-tool selection map",
    summary:
      "Where the work lives now — a snapshot of current-state multi-tool selection across Claude, GPT, and Gemini. Each tool is matched to its actual strength, observed over time. Claude for structured intellectual work, GPT for voice and visuals, Gemini for critique. The working pattern (pre-work practice, voice protection, sycophancy detection, iteration tolerance) is the same across all three — the discipline lives in the practitioner, not in the tool.",
    image: "/library/artifacts/multi-tool-selection-map.html",
    slug: "multi-tool-selection-map",
    format: "html",
    referencedIn: [
      {
        slug: "my-relationship-with-ai",
        title: "My relationship with AI.",
      },
    ],
  },
  {
    title: "Governance Craft Card",
    summary:
      "One-page synthesis of AB's 90-day audit and its methodology anchors — the Executive Card. Names the validity spine (Kane's four inferences), the load-carrier axis (HITL / AITL), and the seven governance dimensions the practice scored itself against. The one-glance version of what the audit produced.",
    image: "/library/artifacts/governance-craft-card.html",
    slug: "governance-craft-card",
    format: "html",
    referencedIn: [
      {
        slug: "auditing-an-ai-native-practice",
        title: "Auditing an AI-native practice.",
      },
    ],
  },
  {
    title: "Governance Craft Log",
    summary:
      "The 23 discipline moves catalogued during the audit's own execution, phase by phase, plus 7 emergent methodology principles the close surfaced. Methodology documentation done inline, dated, and available for peer review — the audit documented its own methodology before publishing its findings on AB.",
    image: "/library/artifacts/governance-craft-log.html",
    slug: "governance-craft-log",
    format: "html",
    referencedIn: [
      {
        slug: "auditing-an-ai-native-practice",
        title: "Auditing an AI-native practice.",
      },
    ],
  },
  {
    title: "Dialogue Maturity Curve",
    summary:
      "116 threads scored on a six-metric rubric across the twelve-month arc (88 GPT + 28 Claude). Session shape shifted from GPT-era substantive threads (clustering 5&ndash;7 composite; tactical volume pulling the aggregate lower) to the Claude-era portion (mean 7.06, most clustering 7.0&ndash;8.5). The gain concentrated in three of the six rubric dimensions: voice ownership, meta-awareness, and generative reframing. The maturity curve underneath the working-with-AI story.",
    image: "/library/artifacts/dialogue-maturity-curve.html",
    slug: "dialogue-maturity-curve",
    format: "html",
    referencedIn: [
      {
        slug: "my-relationship-with-ai",
        title: "My relationship with AI.",
      },
      {
        slug: "auditing-an-ai-native-practice",
        title: "Auditing an AI-native practice.",
      },
    ],
  },
  {
    title: "AB Governance Maturity Scorecard",
    summary:
      "Seven governance dimensions scored against current baseline and next-90 targets. The validity spine and construct-definition rigor score HIGH; reflection cadence and instrumentation depth score LOW-to-MODERATE; descriptive-to-prescriptive dispatch measurement scores LOW. Named as baseline for a practice at ninety days.",
    image: "/library/artifacts/ab-governance-maturity-scorecard.html",
    slug: "ab-governance-maturity-scorecard",
    format: "html",
    referencedIn: [
      {
        slug: "auditing-an-ai-native-practice",
        title: "Auditing an AI-native practice.",
      },
    ],
  },
];
