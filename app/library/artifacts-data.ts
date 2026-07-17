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
};

export const ARTIFACTS: Artifact[] = [
  {
    title: "Decision-System Architecture — the four disciplines",
    summary:
      "The umbrella frame of the Analytic Bytes Library at a glance. A central node — Decision-System Architecture — surrounded by the four disciplines that compose it: Measurement, Integration governance, AI systems, and Organizational design. Each cluster names three load-bearing concepts inside its discipline. The arc pill on every library card maps to one of these four. For the technical stack the disciplines describe, see the reference architecture below.",
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
      "Fifteen senior data-leadership roles distributed across the five stages of the decision arc — build the system, govern the system, interpret the signal, support the decision, own the decision. Each role clusters around one or two arc positions; no single role carries every stage. The composite role many JDs imply requires heavy load across every position, which is the shape that makes it unfillable by one hire.",
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
];
