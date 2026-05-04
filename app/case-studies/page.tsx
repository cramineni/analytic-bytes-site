import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Case Studies — Analytic Bytes",
  description:
    "It was never about the stack. Five engagements, five sectors, five stacks — one discipline. Decision systems built from what was already there.",
};

const CALENDLY_URL = "https://calendly.com/chaitanya-ramineni/30min";

// =====================================================================
// CASE STUDIES — five engagements, anonymized by org, named by sector.
// Each follows: context → already there → missing → what we built → stack → unlocked
// =====================================================================

type CaseStudy = {
  id: string;
  sector: string;
  context: string;
  alreadyThere: string;
  missing: string;
  weBuilt: string;
  stack: string;
  unlocked: string;
};

const CASE_STUDIES: CaseStudy[] = [
  {
    id: "mental-health",
    sector: "National mental health nonprofit",
    context:
      "Survey program reaching ~152 schools and ~40 districts; multi-year, multi-respondent (students, faculty, principals).",
    alreadyThere:
      "A Snowflake warehouse stood up by a vendor but stalled — dev/staging/prod schemas built but not in active use, Fivetran connections defined but not turned on. Multi-year survey data spanning four to six successive instrument versions sitting in Qualtrics. Salesforce capturing partnership phases, consultant caseloads, and assessment-cycle scheduling. Legacy operational data in Azure. A theory-of-change framework leadership already used to talk about impact.",
    missing:
      "A semantic dataset across multi-year surveys. An executive analytics surface for program operations. An impact-reporting workflow that mapped data back to the theory-of-change — instead of being authored alongside it.",
    weBuilt:
      "Activated the stalled warehouse with DevOps — turned on the Fivetran connections, validated freshness, brought the dev/staging/prod schemas into analytical use. Designed the semantic dataset architecture for multi-year survey analysis so the data team could build the report-ready layer underneath. Stood up a ThoughtSpot trial as a demonstration vehicle for executive dashboards on Salesforce program operations and national dataset DWH analytics — proof of value ahead of any procurement decision. Prototyped AI-assisted impact reporting using Snowflake Cortex, Streamlit, and GPT, mapping outputs to the theory-of-change domains so impact narrative could be drafted from data instead of authored separately.",
    stack:
      "Fivetran + Snowflake + Snowflake Cortex + Streamlit + GPT + ThoughtSpot + PowerBI + Looker + Google Sheets.",
    unlocked:
      "A semantic survey dataset spanning instrument versions. Executive analytics on program operations. AI-drafted impact reporting tied directly to the theory-of-change.",
  },
  {
    id: "k8-charter",
    sector: "K–8 charter network",
    context:
      "Multi-site network in the Bronx; single-analyst team inherited after the prior data lead and compliance manager had departed.",
    alreadyThere:
      "Three reporting platforms running in parallel — Looker, Tableau Cloud, Tableau Public. Tableau Cloud licenses on the books for two years, mostly unused. Student-level academic dashboards on public infrastructure with no governance. Daily attendance reporting that duplicated what the SIS already showed. Google Sheets workflows running quietly under most decisions. HubSpot, SchoolMint, PowerSchool, NWEA MAP, Illuminate, Google Forms, MailChimp, and a call center workflow — all real, all uneven.",
    missing:
      "A consolidated, governed reporting environment. A semantic data foundation that didn't depend on a missing BigQuery ETL layer. Dashboards refocused from daily attendance to chronic absenteeism, persistence, and school-health trends. An enrollment funnel principals and ops teams could act on through the recruitment cycle.",
    weBuilt:
      "Authored a data maturity assessment and phased roadmap (Stage 0 Siloed → Stage 1 Developing → Stage 2 Predictive). Consolidated three platforms into Tableau Cloud, operationalizing the licenses already on the books. Migrated student-level dashboards off Tableau Public for governance. Built the semantic data foundation on Google Sheets → Tableau, working around the missing BigQuery ETL. Drove enrollment forecasting at 99% accuracy via ARIMA — correcting an inherited attrition-rate error in the Looker model. Modernized recruitment from ad-hoc tabling into a measurable acquisition funnel integrating HubSpot, SchoolMint, PowerSchool, lead scoring, zipcode-based digital marketing, MailChimp, and the call center workflow with tiered ops/enrollment-team follow-ups.",
    stack:
      "BigQuery + Google Sheets + Tableau Cloud + Looker — consolidated from three reporting platforms running in parallel.",
    unlocked:
      "40% faster turnaround on key reports (10 → 6 days). 70% lift in dashboard adoption across Principals/ADs and School/Network Ops. Data completeness from ~60% to >90% in SIS records. Ad-hoc reporting from 100% to <30%. Enrollment forecasting at 99% accuracy.",
  },
  {
    id: "behavioral-health",
    sector: "Behavioral health nonprofit",
    context:
      "Nine clinics across Westchester and Rockland; 3,300+ active clients; clinical, claims, program operations, and population data spanning multiple service lines.",
    alreadyThere:
      "Validated psychometric instruments (PHQ-9, GAD-7, C-SSRS Adult and Child, NIDA Quick Screen, CAGE-AID, plus SIS, PAQ, Q-LES-Q, FIBSER) collected at intake and follow-up but not surfaced back to clinicians. 837i claims feeds across multiple payers (Beacon Health, Fidelis Care NY, Health First, Partners Health Plan, United Healthcare) sitting separately. HL7/CCDA hospital encounter feeds from regional EDs, uncoordinated. Program operations data across Article 31, OnTrack NY, and Health Home. HR and financials in their own systems. Demographic and zipcode-level data the org had access to but wasn't analyzing.",
    missing:
      "A HIPAA-compliant patient-360 foundation. Real-time care coordination off ED and hospital encounter feeds. Instrument-level dashboards back in front of clinicians. A measurement-based care workflow that closed the loop after the visit. SDOH and chronic-condition risk scoring at the zipcode level. NSDUH state-level prevalence integrated into population-health analytics.",
    weBuilt:
      "Architected a HIPAA-compliant Snowflake EDW POC with two contract engineers, integrating clinical assessments, 837i claims, HL7/CCDA hospital encounter feeds via Mirth Connect (real-time care coordination alerts), referrals, ED utilization, Article 31 / OnTrack NY / Health Home program operations, HR and financials, and demographic + zipcode data into a unified patient-360 analytical foundation. Built Tableau dashboards across the validated instruments, alongside operational and financial dashboards on caseload by clinician and managing office, claims by clinician, 837i payer submissions, ED utilization across regional hospitals, 30-day re-admission alerts, and SDOH + chronic-condition risk scoring by zipcode. Designed the Mitram measurement-based care workflow with Otsuka — a pilot with 30+ patients across two waves drove +40% engagement after reminder automation and faster clinician response. Integrated NSDUH prevalence data into the population-health view.",
    stack:
      "S3 + Matillion + Apache NiFi + Mirth Connect + Snowflake + Tableau + SPSS + PowerBI + Excel.",
    unlocked:
      "Patient-360 analytical foundation across clinical, claims, encounter, and operational feeds. Real-time care coordination alerts off ED utilization. Mitram pilot drove +40% patient engagement (30+ patients, two waves). Population-health risk scoring by zipcode integrated with NSDUH state prevalence.",
  },
  {
    id: "test-prep",
    sector: "Test-prep company",
    context:
      "National test-prep brand; 30+ business-side FTEs across product, marketing, sales, and operations; 320 reports/year on a legacy SQL/static-report environment.",
    alreadyThere:
      "A legacy SQL Server environment producing 320 reports a year. Three analytics FTEs plus roughly 10% of 30+ business-side FTEs spending time on manual data wrangling. A 55% annual reporting completion rate. A standing 8–12-request weekly inventory. Booking data flowing through six channels (Internet, Inbound Call, Local Office, Enrollment Advisor, Service Center, Marketing) across SAT/ACT/MCAT/GRE/GMAT/LSAT product lines. Score-gain data sitting unused for cross-tier analysis. Stakeholder voices across VP Ops, CMO, and National Product Manager that hadn't been collected into a single proposal.",
    missing:
      "A BI platform of record. Repeatable booking analytics across six product lines and six channels. Efficacy research the marketing and product teams could actually use. Cross-functional decision support across A/B testing, customer profiling, cancel/refund analysis, scheduling, and location-level enrollment.",
    weBuilt:
      "Authored an Analytics & Reporting 2.0 strategic proposal — diagnosed the legacy environment, captured stakeholder voices, ran a six-vendor BI evaluation (Tableau, Spotfire, Sisense, Domo, Periscope, Looker), and presented tiered investment scenarios. Selected Sisense as the platform of record. Implemented Sisense ElastiCube ETL across booking analytics for six product lines — daily/monthly pacing, budget-vs-actual, YoY trends, channel attribution, product mix. Conducted efficacy research on test-prep products — score-gain analyses across SAT, GRE, MCAT by instructor, location/PSO, and product tier. Delivered cross-functional decision support: A/B testing, high-value customer profiling, cancel/refund driver analysis, promotional-campaign performance, scheduling optimization, location-level enrollment data for leasing decisions.",
    stack:
      "SQL Server (storage, views, marts) + Sisense (ElastiCubes, dashboards) + R/SPSS (efficacy research).",
    unlocked:
      "Sisense as the platform of record after a six-vendor evaluation. Repeatable booking analytics across six product lines and six channels. Efficacy research operational for marketing and product. Cross-functional decision support spanning A/B testing, customer profiling, cancel/refund driver analysis, and location-level leasing.",
  },
  {
    id: "founding-engagements",
    sector: "Early test-prep + university advisory",
    context: "Founding AB engagements (2016–2017): test-prep platform launch + university learning analytics.",
    alreadyThere:
      "Existing platform log data. Course-level student outcome data on the university side. Stakeholders thinking about a next-generation test-prep product without a measurement frame.",
    missing:
      "A defensible set of log-data measures. A platform-design frame the product team could build against. Predictive models that surfaced at-risk learners earlier in the course cycle.",
    weBuilt:
      "Designed log-data measures and contributed to the NextGen test-prep platform design. Built conceptual dashboard designs as simulated charts — enough fidelity for product and stakeholder decisions, without waiting for the warehouse that wasn't built yet. Built predictive models for at-risk learners on the university side.",
    stack: "Log data + SPSS + R + conceptual dashboard designs as simulated charts.",
    unlocked:
      "A defensible measurement frame for the NextGen test-prep platform. Conceptual dashboards that unblocked product decisions ahead of the warehouse. Early-warning models for at-risk learners on the university side.",
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
                Five engagements. Five sectors. Five stacks. One discipline.
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
                  Across five engagements over the last decade — five sectors, five different
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
                  Below: five engagements, anonymized by org, named by sector. In each one, the
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
                  <CaseBlock label="The stack — as a consequence" body={cs.stack} mono />

                  {/* What it unlocked — accent callout */}
                  <div className="mt-10 pt-8 border-t border-line">
                    <div className="font-mono text-[11px] text-accent tracking-[0.18em] uppercase mb-3">
                      What it unlocked
                    </div>
                    <p className="text-ink text-[16px] sm:text-[17px] font-medium leading-[1.6]">
                      {cs.unlocked}
                    </p>
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
                  <span className="text-accent">●</span>&nbsp;&nbsp;Work With AB
                </div>
                <h2 className="font-extrabold tracking-[-0.03em] leading-[1.0] text-[32px] sm:text-[48px] lg:text-[60px] max-w-[16ch] text-ink mb-8">
                  Bring the messy problem.
                  <br />
                  <span className="text-accent">Let&rsquo;s make the system visible.</span>
                </h2>
                <div className="flex gap-3 flex-wrap">
                  <a
                    href={CALENDLY_URL}
                    target="_blank"
                    rel="noopener"
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-md bg-accent text-white font-semibold text-[13.5px] hover:bg-accent-2 hover:-translate-y-px transition-all border border-accent"
                  >
                    Let&rsquo;s talk <span>→</span>
                  </a>
                  <a
                    href="/#work"
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-md border border-line-2 text-ink hover:bg-ink/[0.04] transition-colors text-[13.5px] font-medium"
                  >
                    See engagement options
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
