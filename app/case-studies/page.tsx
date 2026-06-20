import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Case Studies — Analytic Bytes",
  description:
    "It was never about the stack. Five engagements, five stacks — one discipline. Decision systems built from what was already there.",
};

const EMAIL = "hello@analyticbytes.systems";

// =====================================================================
// CASE STUDIES — five engagements, anonymized by org, named by sector.
// Each follows: context → already there → missing → what we built → stack → unlocked
// =====================================================================

type StackFlow = {
  sources: string[];
  integration: string[];
  storage: string[];
  analytics: string[];
  decisionSurface: string[];
};

type CaseStudy = {
  id: string;
  sector: string;
  context: string;
  alreadyThere: string;
  missing: string;
  weBuilt: string;
  stack: string;
  stackFlow: StackFlow;
  unlocked: string[];
};

const CASE_STUDIES: CaseStudy[] = [
  {
    id: "mental-health",
    sector: "National mental health nonprofit",
    context:
      "Mental-health programs spanning 150+ high schools, 25+ school districts, 500+ college campuses, and growing community-based programs; 1.5M+ rows of multi-year survey assessments across students, faculty, and school/campus leadership.",
    alreadyThere:
      "A Snowflake warehouse stood up by a vendor but stalled — dev/staging/prod schemas built but not in active use, Fivetran connections defined but not turned on. Multi-year survey data spanning four to six successive instrument versions sitting in Qualtrics. Salesforce capturing partnership phases, consultant caseloads, and assessment-cycle scheduling. Legacy operational data in Azure. A theory-of-change framework leadership already used to talk about impact.",
    missing:
      "A semantic dataset across multi-year surveys. An executive analytics surface for program operations. An impact-reporting workflow that mapped data back to the theory-of-change — instead of being authored alongside it. A targeted-funding view — surfacing where burden and disparity diverge across states, sized against public-health datasets.",
    weBuilt:
      "Activated the stalled warehouse with DevOps — turned on the Fivetran connections, validated freshness, brought the dev/staging/prod schemas into analytical use. Designed the semantic dataset architecture for multi-year survey analysis so the data team could build the report-ready layer underneath. Stood up a ThoughtSpot trial as a demonstration vehicle for executive dashboards on Salesforce program operations and national dataset DWH analytics — proof of value ahead of any procurement decision. Brought CDC Wonder data into the warehouse — moving multi-year trend and subgroup analyses from piece-meal Google Sheets queries into DWH-based workflow. Extended the same data into a targeted-funding view — a burden-vs-disparity quadrant by state, framing where need and underinvestment co-occur for grant-strategy use. Prototyped AI-assisted impact reporting using Snowflake Cortex, Streamlit, Gemini, and Python — mapping outputs to the theory-of-change domains so impact narrative could be drafted from data instead of authored separately.",
    stack:
      "Fivetran + Snowflake + Snowflake Cortex + Streamlit + Gemini + Python + ThoughtSpot + PowerBI + Looker + Google Sheets + CDC Wonder.",
    stackFlow: {
      sources: ["Qualtrics", "Salesforce", "Azure", "CDC Wonder"],
      integration: ["Fivetran"],
      storage: ["Snowflake"],
      analytics: ["Snowflake Cortex", "Streamlit", "Gemini", "Python"],
      decisionSurface: ["ThoughtSpot", "PowerBI", "Looker", "Google Sheets"],
    },
    unlocked: [
      "A semantic survey dataset spanning instrument versions",
      "Executive analytics on program operations",
      "AI-drafted impact reporting tied directly to the theory-of-change",
      "CDC Wonder data warehoused — enabling multi-year trend and subgroup analyses to run from DWH instead of piece-meal Google Sheets queries",
      "Targeted-funding analytics — burden-vs-disparity by state — demonstrated as a grant-strategy view",
    ],
  },
  {
    id: "k8-charter",
    sector: "K–8 charter network",
    context:
      "Multi-site K-8 charter network in the Bronx — 5 sites serving ~1,800 students, the only single-gender public charter network in NYC; one site closing and another opening during the engagement; single-analyst team inherited after the prior data lead and compliance manager had departed.",
    alreadyThere:
      "Three reporting platforms running in parallel — Looker, Tableau Cloud, Tableau Public. Tableau Cloud licenses on the books for two years, mostly unused. Student-level academic dashboards on public infrastructure with no governance. Daily attendance reporting that duplicated what the SIS already showed. Google Sheets workflows running quietly under most decisions. HubSpot, SchoolMint, PowerSchool, NWEA MAP, Illuminate, Google Forms, MailChimp, and a call center workflow — all real, all uneven.",
    missing:
      "A consolidated, governed reporting environment. A semantic data foundation that didn't depend on a missing BigQuery ETL layer. Dashboards refocused from daily attendance to chronic absenteeism, persistence, and school-health trends. An enrollment funnel principals and ops teams could act on through the recruitment cycle.",
    weBuilt:
      "Authored a data maturity assessment and phased roadmap (Stage 0 Siloed → Stage 1 Developing → Stage 2 Predictive). Consolidated three platforms into Tableau Cloud, operationalizing the licenses already on the books. Migrated student-level dashboards off Tableau Public for governance. Built the semantic data foundation on Google Sheets → Tableau, working around the missing BigQuery ETL. Drove enrollment forecasting at 99% accuracy via ARIMA — correcting an inherited attrition-rate error in the Looker model. Modernized recruitment from ad-hoc tabling into a measurable acquisition funnel integrating HubSpot, SchoolMint, PowerSchool, lead scoring, zipcode-based digital marketing, MailChimp, and the call center workflow with tiered ops/enrollment-team follow-ups.",
    stack:
      "BigQuery + Google Sheets + Tableau Cloud + Looker — consolidated from three reporting platforms running in parallel.",
    stackFlow: {
      sources: ["SchoolMint", "PowerSchool", "NWEA MAP", "Illuminate", "HubSpot", "Google Forms", "MailChimp"],
      integration: ["Google Sheets (semantic layer)"],
      storage: ["BigQuery", "Google Sheets"],
      analytics: ["ARIMA forecasting", "Lead scoring"],
      decisionSurface: ["Tableau Cloud", "Looker (legacy)"],
    },
    unlocked: [
      "Daily-refresh dashboards on key reports (enrollment and academic), faster turnaround on ad-hoc reports, and metric banks codified for compliance reporting cycles",
      "70% lift in dashboard adoption across Principals/ADs and School/Network Ops",
      "Ad-hoc reporting from 100% to <30%",
      "Enrollment forecasting at 99% accuracy — informing capacity, staffing, and real-estate obligation decisions across the network's facility portfolio",
      "Zipcode-targeted recruitment — digital marketing, promotional campaigns, and tabling events — delivered on a reduced budget",
    ],
  },
  {
    id: "behavioral-health",
    sector: "Behavioral health nonprofit",
    context:
      "Nine clinics across Westchester and Rockland; CCBHC grant recipient; 3,300+ active clients; clinical, claims, program operations, and population data spanning multiple service lines.",
    alreadyThere:
      "Validated psychometric instruments (PHQ-9, GAD-7, C-SSRS Adult and Child, NIDA Quick Screen, CAGE-AID, plus SIS, PAQ, Q-LES-Q, FIBSER) historically captured at 3-month visits only. A smartphone app being piloted to collect these as patient-reported every 2 to 4 weeks instead — supporting measurement-based care between visits. 837i claims feeds across multiple payers (Beacon Health, Fidelis Care NY, Health First, Partners Health Plan, United Healthcare) sitting separately. HL7/CCDA hospital encounter feeds from regional EDs, uncoordinated. Program operations data across Article 31, OnTrack NY, and Health Home. HR and financials in their own systems. Demographic and zipcode-level data the org had access to but wasn't analyzing.",
    missing:
      "A HIPAA-compliant patient-360 foundation. Real-time care coordination off ED and hospital encounter feeds. Instrument-level dashboards back in front of clinicians. A measurement-based care workflow that closed the loop after the visit. SDOH and chronic-condition risk scoring. NSDUH state-level prevalence integrated into population-health analytics.",
    weBuilt:
      "Architected a HIPAA-compliant Snowflake EDW POC with two contract engineers, integrating clinical assessments, 837i claims, HL7/CCDA hospital encounter feeds via Mirth Connect (real-time care coordination alerts), referrals, ED utilization, Article 31 / OnTrack NY / Health Home program operations, HR and financials, and demographic + zipcode data into a unified patient-360 analytical foundation. Built Tableau dashboards across the validated instruments, alongside operational and financial dashboards on caseload by clinician and managing office, claims by clinician, 837i payer submissions, ED utilization across regional hospitals, 30-day re-admission alerts, and SDOH + chronic-condition risk scoring. Designed the Mitram measurement-based care workflow with Otsuka — a pilot with 30+ patients across two waves drove +40% engagement after reminder automation and follow-ups. Integrated NSDUH prevalence data into the population-health view.",
    stack:
      "S3 + Matillion + Apache NiFi + Mirth Connect + Snowflake + Tableau + SPSS + PowerBI + Excel.",
    stackFlow: {
      sources: ["Clinical instruments", "837i claims feeds", "HL7/CCDA encounter feeds", "Article 31 / OnTrack NY / Health Home", "HR + financials", "NSDUH"],
      integration: ["Mirth Connect", "Matillion", "Apache NiFi"],
      storage: ["S3", "Snowflake"],
      analytics: ["SPSS"],
      decisionSurface: ["Tableau", "PowerBI", "Excel"],
    },
    unlocked: [
      "Patient-360 analytical foundation across clinical, claims, encounter, and operational feeds",
      "Real-time care coordination alerts off ED utilization",
      "Mitram pilot drove +40% patient engagement (30+ patients, two waves)",
      "SDOH and chronic-condition risk scoring",
      "NSDUH state-level prevalence integrated into the population-health view",
    ],
  },
  {
    id: "test-prep",
    sector: "Test-prep company",
    context:
      "National test-prep and tutoring brand with data dispersed across two legacy systems; test-prep alone spanned 6+ product lines (SAT/ACT/MCAT/GRE/GMAT/LSAT), 8+ channels, and multiple modalities; 300+ ad-hoc requests in queue on a legacy SQL/static-report environment.",
    alreadyThere:
      "A legacy SQL Server environment with 300+ ad-hoc requests for reports and insights in the queue. Three analytics FTEs plus roughly 10% of 30+ business-side FTEs spending time on manual data wrangling. A 55% annual reporting completion rate. A standing 8–12-request weekly inventory. Booking data flowing through six channels (Internet, Inbound Call, Local Office, Enrollment Advisor, Service Center, Marketing) across SAT/ACT/MCAT/GRE/GMAT/LSAT product lines. Score-gain data sitting unused for cross-tier analysis. Stakeholder voices across Product, Ops, Marketing that hadn't been collected into a single proposal.",
    missing:
      "A BI platform of record. Repeatable booking analytics across six product lines and six channels. Efficacy research the marketing and product teams could actually use. Cross-functional decision support across A/B testing, customer profiling, cancel/refund analysis, scheduling, and location-level enrollment.",
    weBuilt:
      "Authored an Analytics & Reporting 2.0 strategic proposal — diagnosed the legacy environment, captured stakeholder voices, ran a six-vendor BI evaluation (Tableau, Spotfire, Sisense, Domo, Periscope, Looker), and presented tiered investment scenarios. Selected Sisense as the platform of record. Implemented Sisense ElastiCube ETL across booking analytics for six product lines — daily/monthly pacing, budget-vs-actual, YoY trends, channel attribution, product mix. Conducted efficacy research on test-prep products — score-gain analyses across SAT, GRE, MCAT by instructor, location/PSO, and product tier. Delivered cross-functional decision support: A/B testing, high-value customer profiling, cancel/refund driver analysis, promotional-campaign performance, scheduling optimization, location-level enrollment data for leasing decisions.",
    stack:
      "SQL Server (storage, views, marts) + Sisense (ElastiCubes, dashboards) + R/SPSS (efficacy research).",
    stackFlow: {
      sources: ["Booking systems (6 channels)", "Score-gain data", "Product line data (SAT/ACT/MCAT/GRE/GMAT/LSAT)"],
      integration: ["SQL Server views + marts"],
      storage: ["SQL Server"],
      analytics: ["Sisense ElastiCubes", "R", "SPSS"],
      decisionSurface: ["Sisense dashboards"],
    },
    unlocked: [
      "Sisense as the platform of record after a six-vendor evaluation",
      "Repeatable booking analytics across six product lines and six channels",
      "Efficacy research operational for marketing and product",
      "Cross-functional decision support spanning A/B testing, customer profiling, cancel/refund driver analysis, and location-level leasing",
    ],
  },
  {
    id: "founding-engagements",
    sector: "Early test-prep + university advisory",
    context: "Founding AB engagements (2016–2017): test-prep platform launch + university learning analytics.",
    alreadyThere:
      "Existing platform log data. Course-level student outcome data on the university side — traditional and hybrid sections of the same course running in parallel. Stakeholders thinking about a next-generation test-prep product without a measurement frame.",
    missing:
      "A defensible set of log-data measures. A platform-design frame the product team could build against. A defensible analytical frame for comparing student outcomes between traditional and hybrid sections of the same course.",
    weBuilt:
      "Designed log-data measures and contributed to the NextGen test-prep platform design. Built conceptual dashboard designs as simulated charts — enough fidelity for product and stakeholder decisions, without waiting for the warehouse that wasn't built yet. On the university side: student outcomes analyses between traditional and hybrid sections of the same course.",
    stack: "Log data + SPSS + R + conceptual dashboard designs as simulated charts.",
    stackFlow: {
      sources: ["Platform log data", "Course outcome data"],
      integration: [],
      storage: [],
      analytics: ["SPSS", "R"],
      decisionSurface: ["Conceptual dashboards (simulated charts)"],
    },
    unlocked: [
      "A defensible measurement frame for the NextGen test-prep platform",
      "Conceptual dashboards that unblocked product decisions ahead of the warehouse",
      "A defensible outcomes-comparison frame across traditional vs. hybrid course sections on the university side",
    ],
  },
];

export default function CaseStudiesPage() {
  return (
    <>
      <Nav />

      <main>
        {/* HERO */}
        <section className="pt-20 pb-12 sm:pt-24 sm:pb-16">
          <div className="max-w-page mx-auto px-5 sm:px-8">
            <Reveal>
              <div className="font-mono text-[12px] text-ink-3">
                <span className="text-accent">●</span>&nbsp;&nbsp;Case Studies
              </div>
              <h1 className="font-extrabold leading-[0.95] tracking-[-0.035em] mt-6 text-[40px] sm:text-[64px] lg:text-[88px] text-ink max-w-[18ch]">
                It was never about the <span className="text-accent">stack.</span>
              </h1>
              <p className="text-ink-2 text-[18px] max-w-[600px] mt-7 leading-[1.55]">
                Five engagements. Five stacks. One discipline.
              </p>
            </Reveal>
          </div>
        </section>

        {/* INTRO PARAGRAPHS */}
        <section className="pb-16">
          <div className="max-w-page mx-auto px-5 sm:px-8">
            <Reveal>
              <div className="border-t border-line pt-12 max-w-[68ch] text-ink-2 text-[17px] sm:text-[18px] leading-[1.65] space-y-5">
                <p>
                  Most data work is sold by stack. Modern warehouse, modern transformation layer,
                  modern BI, modern AI. The promise is that decisions follow.
                </p>
                <p>
                  <span className="text-ink font-medium">They don&rsquo;t. Not on their own.</span>
                </p>
                <p>
                  Across five engagements over the last decade — five different
                  stacks, five different vintages of &ldquo;modern&rdquo; — the working decision
                  system never started with the tools. It started with what was already there —
                  clean systems running quietly, underutilized platforms sitting on the books,
                  instruments collecting data nobody surfaces, workflows already in motion in
                  spreadsheets and inboxes — and what was missing: a unified view, a feedback
                  loop back to the people doing the work, a decision someone could actually make.
                </p>
                <p className="text-ink font-medium">
                  The stack changes every time. The discipline doesn&rsquo;t.
                </p>
                <p>
                  Below: five engagements, anonymized by org. In each one, the
                  stack you see at the bottom is the consequence of the design — not the headline.
                </p>
              </div>
            </Reveal>
          </div>
        </section>

        {/* TABLE OF CONTENTS — anchor links to each case */}
        <section className="pb-20">
          <div className="max-w-page mx-auto px-5 sm:px-8">
            <Reveal>
              <div className="border-t border-line pt-10 max-w-[68ch]">
                <div className="font-mono text-[11px] text-ink-3 tracking-[0.18em] uppercase mb-6">
                  The five
                </div>
                <ul className="list-none p-0 m-0 space-y-3">
                  {CASE_STUDIES.map((cs, i) => (
                    <li key={cs.id}>
                      <a
                        href={`#${cs.id}`}
                        className="group flex items-baseline gap-4 text-ink hover:text-accent transition-colors no-underline"
                      >
                        <span className="font-mono text-[12px] text-accent tracking-[0.05em] w-10">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <span className="text-[17px] sm:text-[20px] font-bold tracking-[-0.015em] group-hover:translate-x-1 transition-transform">
                          {cs.sector}
                        </span>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>
        </section>

        {/* CASE STUDIES — one section per engagement */}
        {CASE_STUDIES.map((cs, i) => (
          <section
            key={cs.id}
            id={cs.id}
            className="py-20 sm:py-28 border-t border-line scroll-mt-20"
          >
            <div className="max-w-page mx-auto px-5 sm:px-8">
              <Reveal>
                <div className="max-w-[68ch]">
                  <div className="font-mono text-[11px] text-accent tracking-[0.18em] uppercase mb-3">
                    Case study {String(i + 1).padStart(2, "0")}
                  </div>
                  <h2 className="font-extrabold tracking-[-0.025em] leading-[1.05] text-[28px] sm:text-[40px] lg:text-[52px] text-ink mb-4">
                    {cs.sector}
                  </h2>
                  <p className="text-ink-2 text-[15px] sm:text-[16px] italic leading-[1.6] mb-12">
                    {cs.context}
                  </p>

                  {/* What was already there */}
                  <CaseBlock label="What was already there" body={cs.alreadyThere} />

                  {/* What was missing */}
                  <CaseBlock label="What was missing" body={cs.missing} />

                  {/* The decision system we stood up */}
                  <CaseBlock
                    label="The decision system we stood up"
                    body={cs.weBuilt}
                  />

                  {/* The stack — as a consequence */}
                  <div className="mb-8">
                    <div className="font-mono text-[11px] text-ink-3 tracking-[0.18em] uppercase mb-4">
                      The stack — as a consequence
                    </div>
                    <StackDiagram flow={cs.stackFlow} />
                  </div>

                  {/* What it unlocked — accent callout list */}
                  <div className="mt-10 pt-8 border-t border-line">
                    <div className="font-mono text-[11px] text-accent tracking-[0.18em] uppercase mb-4">
                      What it unlocked
                    </div>
                    <ul className="list-none p-0 m-0 space-y-2.5">
                      {cs.unlocked.map((item, i) => (
                        <li
                          key={i}
                          className="text-ink text-[16px] sm:text-[17px] font-medium leading-[1.55] pl-6 relative before:content-['—'] before:absolute before:left-0 before:text-accent"
                        >
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </Reveal>
            </div>
          </section>
        ))}

        {/* CLOSING */}
        <section className="pt-20 pb-16 border-t border-line">
          <div className="max-w-page mx-auto px-5 sm:px-8">
            <Reveal>
              <div className="max-w-[68ch]">
                <div className="font-mono text-[11px] text-ink-3 tracking-[0.18em] uppercase mb-6">
                  What this adds up to
                </div>
                <div className="text-ink-2 text-[17px] sm:text-[18px] leading-[1.65] space-y-5">
                  <p>
                    Across all five:{" "}
                    <span className="text-ink font-medium">
                      the stack changed. The discipline didn&rsquo;t.
                    </span>
                  </p>
                  <p>
                    Across the five: a vendor-built warehouse operationalized with
                    in-house DevOps and the existing data team (analyst + senior
                    data scientist); an inherited single-analyst team augmented by
                    in-house SIS and Ops leadership and a hybrid in-house/external
                    enrollment workstream; two contract engineers on an EDW POC,
                    plus an in-house workflow assistant and an Otsuka-side data
                    scientist on the Mitram pilot; an inherited SQL specialist and
                    graduate intern, plus a statistical analyst and market research
                    analyst added — a four-person function; solo and intern
                    collaborations on founding engagements.{" "}
                    <span className="text-ink font-medium">
                      The team configuration changed every time too — never a
                      default &ldquo;add headcount&rdquo; move.
                    </span>
                  </p>
                  <p>
                    In every engagement, the work organized around the same questions. What&rsquo;s
                    already in motion that nobody&rsquo;s named as an asset? What&rsquo;s being
                    collected but not surfaced? What&rsquo;s sitting on the books underutilized?
                    What workflow is already producing signal that&rsquo;s never closing the loop?
                    What decision do the people doing the work actually need to make next?
                  </p>
                  <p>
                    Modernization isn&rsquo;t a stack you buy and then hope decisions follow.
                    It&rsquo;s a decision system you organize from the assets you already have —
                    and the stack is what falls out of doing that honestly.
                  </p>
                  <p className="text-ink font-bold text-[20px] sm:text-[24px] tracking-[-0.015em] pt-4">
                    Stack-light. Context-rich. Built to be handed off.
                  </p>
                  <p className="text-accent font-bold text-[20px] sm:text-[24px] tracking-[-0.015em]">
                    From fragmented to decision-ready.
                  </p>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* CTA */}
        <section className="pt-16 pb-32">
          <div className="max-w-page mx-auto px-5 sm:px-8">
            <Reveal>
              <div className="border-t border-line pt-12 max-w-[68ch]">
                <div className="font-mono text-[12px] text-ink-3 mb-4">
                  <span className="text-accent">●</span>&nbsp;&nbsp;Get in touch
                </div>
                <h2 className="font-extrabold tracking-[-0.03em] leading-[1.0] text-[32px] sm:text-[48px] lg:text-[60px] max-w-[16ch] text-ink mb-8">
                  If any of this resonates.
                  <br />
                  <span className="text-accent">Send a note.</span>
                </h2>
                <div className="flex gap-3 flex-wrap">
                  <a
                    href={`mailto:${EMAIL}`}
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-md bg-accent text-white font-semibold text-[13.5px] hover:bg-accent-2 hover:-translate-y-px transition-all border border-accent"
                  >
                    Say hello
                  </a>
                  <a
                    href="/#arc"
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-md border border-line-2 text-ink hover:bg-ink/[0.04] transition-colors text-[13.5px] font-medium"
                  >
                    See the operating arc
                  </a>
                </div>
              </div>
            </Reveal>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}

function CaseBlock({
  label,
  body,
  mono = false,
}: {
  label: string;
  body: string;
  mono?: boolean;
}) {
  return (
    <div className="mb-8">
      <div className="font-mono text-[11px] text-ink-3 tracking-[0.18em] uppercase mb-3">
        {label}
      </div>
      <p
        className={`text-ink-2 leading-[1.65] ${
          mono
            ? "font-mono text-[14px] sm:text-[15px] text-ink"
            : "text-[15px] sm:text-[16px]"
        }`}
      >
        {body}
      </p>
    </div>
  );
}

function StackDiagram({ flow }: { flow: StackFlow }) {
  const stages: { label: string; items: string[] }[] = [
    { label: "Sources", items: flow.sources },
    { label: "Integration", items: flow.integration },
    { label: "Storage", items: flow.storage },
    { label: "Analytics & AI", items: flow.analytics },
    { label: "Decision Surface", items: flow.decisionSurface },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-5 gap-x-3 gap-y-7 mt-2">
      {stages.map((stage, i) => (
        <div key={stage.label} className="relative">
          <div className="font-mono text-[10px] text-accent tracking-[0.15em] uppercase pb-2 mb-3 border-b border-line-2">
            {stage.label}
          </div>
          <ul className="list-none p-0 m-0 space-y-1.5">
            {stage.items.length > 0 ? (
              stage.items.map((item, j) => (
                <li
                  key={j}
                  className="text-ink text-[12px] sm:text-[13px] font-medium leading-[1.4]"
                >
                  {item}
                </li>
              ))
            ) : (
              <li className="text-ink-3 text-[12px] italic">—</li>
            )}
          </ul>
          {i < stages.length - 1 && (
            <div
              aria-hidden
              className="hidden sm:block absolute -right-2.5 top-0 text-ink-3 text-[14px] leading-[1.5]"
            >
              →
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
