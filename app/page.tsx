import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";
import Architecture from "@/components/Architecture";
import { ESSAYS } from "./library/essays";

// =====================================================================
// CONTENT — edit copy here. Each constant maps to one section.
// =====================================================================

const HERO = {
  eyebrow: "Human-serving Systems",
  headline: ["Most data problems", "are decision problems.", "Fix the system."],
  lede: {
    head: "Dashboards show signal.",
    accent: "Decisions require systems.",
  },
};

const ARC_PHASES = [
  {
    tag: "→ 01",
    title: "Deliver signal",
    range: "PHASE_01 · DAYS 0—90",
    bullets: [
      "Find the bottleneck that actually moves the number.",
      "Ship decision-ready outputs — not dashboards.",
      "Build trust quickly with the operating team.",
    ],
  },
  {
    tag: "→ 02",
    title: "Build the system",
    range: "PHASE_02 · DAYS 90—180",
    bullets: [
      "Define metrics, owners, and the cadence around them.",
      "Establish reporting flows and the data spine.",
      "Create the operating rhythms decisions live inside.",
    ],
  },
  {
    tag: "→ 03",
    title: "Scale & extend",
    range: "PHASE_03 · DAYS 180—270",
    bullets: [
      "Turn early wins into repeatable playbooks.",
      "Develop the talent that will own it — frontline through leadership.",
      "Align with product, ops & strategy.",
      "Define the next horizon — and hand off.",
    ],
  },
];

const PROOF_ROWS = [
  { tag: "360 Views", desc: "Student 360, Patient 360, Institutional 360 — scattered signals fused into the one decision-grade view." },
  { tag: "Channel & Conversion", desc: "Channel attribution, lead scoring, geo analysis, and yield modeling — wherever marketing dollars meet enrollment, advancement, or revenue." },
  { tag: "Operations", desc: "Attendance, caseload, billing, capacity, hardware, and talent — operating signals across multi-site, brick-and-mortar, and online." },
  { tag: "Measurement & Impact", desc: "Baseline/post reporting, longitudinal program evaluation, domain KPIs, survey pipelines, executive narratives, and state/federal/accreditation compliance reporting." },
  { tag: "Target Funding", desc: "Public & proprietary datasets shaped into grant strategy, opportunity sizing, and proposal-to-award rhythms." },
];

const OFFERS = [
  { num: "→ 01", title: "Decision audit", desc: "A four-week diagnostic. Where decisions stall, who owns them, and the single highest-leverage place to intervene." },
  { num: "→ 02", title: "Operator residency", desc: "A 90-day embedded arc. Full capability — tech and talent — at fractional cost. We ship decision-ready outputs and coach your in-house operators alongside us, so when we leave the work compounds." },
  { num: "→ 03", title: "Build the spine", desc: "A long arc for teams ready to make data the way they operate — not a quarterly review artifact." },
];

const EMAIL = "hello@analyticbytes.systems";

// Set to true to surface the "Work with AB" offerings section again.
// Hidden during the Princeton role-search window to keep the site aligned
// with the transitional-practice framing of the bio. When flipped back to
// true, also re-add { href: "/#work", label: "Work" } to the nav links in
// components/Nav.tsx and update the section counters from "/ 05" to "/ 06"
// (this section's internal counter is already 06/06).
const SHOW_WORK = false;

// Recent Library entries surfaced on the homepage in section 02. Auto-pulled
// from the ESSAYS registry, sorted newest-first, top 4.
const RECENT_LIBRARY = [...ESSAYS]
  .filter((e) => !e.hidden)
  .sort((a, b) => b.date.localeCompare(a.date))
  .slice(0, 4);

// =====================================================================
// PAGE
// =====================================================================

export default function Home() {
  return (
    <>
      <Nav />

      <main>
        {/* HERO */}
        <section className="pt-20 pb-16 sm:pt-24 sm:pb-20">
          <div className="max-w-page mx-auto px-5 sm:px-8">
            <Reveal>
              <div className="font-mono text-[12px] text-ink-3">
                <span className="text-accent">●</span>
                &nbsp;&nbsp;{HERO.eyebrow}
              </div>
              <h1 className="font-extrabold leading-[0.95] tracking-[-0.035em] mt-6 text-[40px] sm:text-[72px] lg:text-[96px] text-ink">
                {HERO.headline[0]}<br />
                {HERO.headline[1]}<br />
                <span className="text-accent">{HERO.headline[2]}</span>
              </h1>
              <p className="text-ink-2 text-[18px] max-w-[560px] mt-6 leading-[1.55]">
                {HERO.lede.head}{" "}
                <span className="text-ink font-medium">{HERO.lede.accent}</span>
              </p>
              <div className="flex gap-3 mt-9 flex-wrap">
                <a
                  href={`mailto:${EMAIL}`}
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-md bg-accent text-white font-semibold text-[13.5px] hover:bg-accent-2 hover:-translate-y-px transition-all border border-accent"
                >
                  Contact
                </a>
                <a
                  href="#architecture"
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-md border border-line-2 text-ink hover:bg-ink/[0.04] transition-colors text-[13.5px] font-medium"
                >
                  See the architecture
                </a>
              </div>
            </Reveal>
          </div>
        </section>

        {/* 01 ARCHITECTURE */}
        <Architecture />

        {/* 02 LIBRARY */}
        <section id="library-preview" className="py-32 sm:py-36">
          <div className="max-w-page mx-auto px-5 sm:px-8">
            <Reveal>
              <div className="flex items-start gap-6 border-t border-line pt-7 mb-12">
                <div className="font-mono text-[12px] text-ink-3 min-w-[80px]">
                  02<span className="opacity-50 mx-1.5">/</span><span className="opacity-50">05</span>
                </div>
                <div className="flex-1 flex flex-wrap items-start justify-between gap-8">
                  <div className="font-mono text-[13px] text-ink-2">Library</div>
                  <h2 className="section-head-title-right font-extrabold tracking-[-0.03em] leading-[1.02] text-[28px] sm:text-[44px] lg:text-[60px] sm:text-right text-ink sm:max-w-[14ch]">
                    Notes from the<br />
                    <span className="text-accent">decision system.</span>
                  </h2>
                </div>
              </div>
            </Reveal>

            <Reveal>
              <div className="grid grid-cols-1 mt-12">
                {RECENT_LIBRARY.map((e, i) => (
                  <a
                    key={e.slug}
                    href={`/library/${e.slug}`}
                    className={`group grid grid-cols-1 sm:grid-cols-[200px_1fr_auto] gap-2 sm:gap-12 py-9 border-t border-line hover:bg-bg-alt transition-colors no-underline ${
                      i === RECENT_LIBRARY.length - 1 ? "border-b" : ""
                    }`}
                  >
                    <div className="font-mono text-[11px] text-accent tracking-[0.18em] uppercase pt-2">
                      {e.kind === "essay" ? "Essay" : "Field Note"} {e.number}
                    </div>
                    <div className="min-w-0">
                      <div className="text-ink text-[18px] sm:text-[20px] lg:text-[22px] font-bold tracking-[-0.015em] leading-[1.3] group-hover:text-accent transition-colors">
                        {e.title}
                      </div>
                      <div className="text-ink-2 text-[14px] sm:text-[15px] mt-2 max-w-[64ch] leading-[1.55]">
                        {e.subtitle}
                      </div>
                    </div>
                    <div className="text-ink-3 text-2xl group-hover:text-accent group-hover:translate-x-1.5 transition-all hidden sm:block self-center">
                      →
                    </div>
                  </a>
                ))}
              </div>
            </Reveal>

            <Reveal>
              <div className="mt-10 sm:mt-12 flex justify-end">
                <a
                  href="/library"
                  className="inline-flex items-center gap-2 text-ink hover:text-accent transition-colors text-[14px] sm:text-[15px] font-semibold no-underline border-b border-line-2 hover:border-accent pb-1"
                >
                  All essays, artifacts &amp; field notes
                  <span aria-hidden>→</span>
                </a>
              </div>
            </Reveal>
          </div>
        </section>

        {/* 03 OPERATING ARC */}
        <section id="arc" className="py-32 sm:py-36">
          <div className="max-w-page mx-auto px-5 sm:px-8">
            <Reveal>
              <div className="flex items-start gap-6 border-t border-line pt-7 mb-12">
                <div className="font-mono text-[12px] text-ink-3 min-w-[80px]">
                  03<span className="opacity-50 mx-1.5">/</span><span className="opacity-50">05</span>
                </div>
                <div className="flex-1 flex flex-wrap items-start justify-between gap-8">
                  <div className="font-mono text-[13px] text-ink-2">The 90·90·90 operating arc</div>
                  <h2 className="section-head-title-right font-extrabold tracking-[-0.03em] leading-[1.02] text-[28px] sm:text-[44px] lg:text-[60px] sm:text-right text-ink sm:max-w-[14ch]">
                    Signal, system, scale.<br />
                    <span className="text-accent">Three ninety-day phases.</span>
                  </h2>
                </div>
              </div>

              <p className="text-ink-2 text-[18px] max-w-[680px] leading-[1.55] mb-14">
                How a decision-system intervention takes shape over 270 days —{" "}
                <span className="text-ink font-medium">boardroom to frontline</span>.{" "}
                Stack-light, context-rich, built to be handed off. Measurement and AI for rigor and speed at every step.
              </p>
            </Reveal>

            <Reveal>
              <div className="grid grid-cols-1 lg:grid-cols-3">
                {ARC_PHASES.map((p, i) => (
                  <div
                    key={p.tag}
                    className={`py-9 border-t border-line ${i > 0 ? "lg:border-l lg:pl-8" : ""} pr-8`}
                  >
                    <div className="font-mono text-[11px] text-accent tracking-[0.05em]">{p.tag}</div>
                    <h3 className="text-[22px] sm:text-[28px] lg:text-[32px] font-extrabold tracking-[-0.02em] mt-3.5 mb-1.5 leading-[1.05] text-ink">
                      {p.title}
                    </h3>
                    <div className="text-ink-3 text-[12.5px] mb-6 font-mono tracking-[0.04em]">
                      {p.range}
                    </div>
                    <ul className="list-none p-0 m-0">
                      {p.bullets.map((b, j) => (
                        <li
                          key={j}
                          className={`text-ink-2 text-[14px] leading-[1.55] py-3 ${j > 0 ? "border-t border-line" : ""}`}
                        >
                          {b}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </Reveal>

            {/* Closing line — the coaching philosophy as a quiet footnote, not a banner */}
            <Reveal>
              <div className="mt-12 pt-8 border-t border-line">
                <p className="text-[16px] sm:text-[18px] text-ink-2 italic max-w-[44ch] leading-[1.5]">
                  We don&rsquo;t build dependencies.{" "}
                  <span className="text-ink font-medium not-italic">We build operating teams.</span>
                </p>
              </div>
            </Reveal>
          </div>
        </section>

        {/* 04 THESIS */}
        <section className="py-32 sm:py-36">
          <div className="max-w-page mx-auto px-5 sm:px-8">
            <Reveal>
              <div className="flex items-start gap-6 border-t border-line pt-7 mb-16">
                <div className="font-mono text-[12px] text-ink-3 min-w-[80px]">
                  04<span className="opacity-50 mx-1.5">/</span><span className="opacity-50">05</span>
                </div>
                <div className="flex-1 flex flex-wrap items-start justify-between gap-8">
                  <div className="font-mono text-[13px] text-ink-2">Thesis</div>
                </div>
              </div>
              <h2 className="font-extrabold tracking-[-0.03em] leading-[1.05] text-[36px] sm:text-[56px] lg:text-[72px] text-ink max-w-[16ch]">
                A system is not<br />the dashboard.<br />
                <span className="text-accent">It&rsquo;s what happens after.</span>
              </h2>
            </Reveal>
          </div>
        </section>

        {/* WHOLE-PERSON VIDEO — sits between the Thesis statement and the
            Proof of Work section. Reads as the visual answer to the Thesis
            line above it, and as the primer for the 360 Views row below. */}
        <section className="pt-8 pb-24 sm:pt-12 sm:pb-32">
          <div className="max-w-page mx-auto px-5 sm:px-8">
            <Reveal>
              <div className="font-mono text-[11px] text-accent tracking-[0.18em] uppercase mb-8">
                Seeing the person whole
              </div>
              <video
                src="/videos/AB_WholePersonStack_v1.mp4"
                poster="/videos/AB_WholePersonStack_v1_poster.jpg"
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
                className="w-full h-auto rounded-lg border border-line"
                aria-label="Seeing the person whole — the AB framework, the 360 view, the governance contract, and the integration work. From fragmented to decision-ready."
              />
            </Reveal>
          </div>
        </section>

        {/* 05 PROOF OF WORK */}
        <section id="proof" className="py-32 sm:py-36">
          <div className="max-w-page mx-auto px-5 sm:px-8">
            <Reveal>
              <div className="flex items-start gap-6 border-t border-line pt-7 mb-12">
                <div className="font-mono text-[12px] text-ink-3 min-w-[80px]">
                  05<span className="opacity-50 mx-1.5">/</span><span className="opacity-50">05</span>
                </div>
                <div className="flex-1 flex flex-wrap items-start justify-between gap-8">
                  <div className="font-mono text-[13px] text-ink-2">Proof of work</div>
                  <h2 className="section-head-title-right font-extrabold tracking-[-0.03em] leading-[1.02] text-[28px] sm:text-[44px] lg:text-[60px] sm:text-right text-ink sm:max-w-[14ch]">
                    The same systems move.<br />
                    <span className="text-accent">Different work.</span>
                  </h2>
                </div>
              </div>
            </Reveal>

            <Reveal>
              <div className="grid grid-cols-1 mt-12">
                {PROOF_ROWS.map((row, i) => (
                  <div
                    key={row.tag}
                    className={`grid grid-cols-1 sm:grid-cols-[200px_1fr] gap-2 sm:gap-12 py-9 border-t border-line ${
                      i === PROOF_ROWS.length - 1 ? "border-b" : ""
                    }`}
                  >
                    <div className="font-mono text-[12px] text-accent tracking-[0.18em] uppercase pt-2">
                      {row.tag}
                    </div>
                    <div className="text-ink-2 text-[16px] sm:text-[18px] lg:text-[20px] font-medium leading-[1.45] tracking-[-0.005em] max-w-[64ch]">
                      {row.desc}
                    </div>
                  </div>
                ))}
              </div>
            </Reveal>

            <Reveal>
              <div className="mt-10 sm:mt-12 flex justify-end">
                <a
                  href="/case-studies"
                  className="inline-flex items-center gap-2 text-ink hover:text-accent transition-colors text-[14px] sm:text-[15px] font-semibold no-underline border-b border-line-2 hover:border-accent pb-1"
                >
                  See the engagements behind these capabilities
                  <span aria-hidden>→</span>
                </a>
              </div>
            </Reveal>
          </div>
        </section>

        {/* 06 WORK WITH AB — hidden during Princeton window. Flip SHOW_WORK to true to surface. */}
        {SHOW_WORK && (
        <section id="work" className="py-32 sm:py-36">
          <div className="max-w-page mx-auto px-5 sm:px-8">
            <Reveal>
              <div className="flex items-start gap-6 border-t border-line pt-7 mb-16">
                <div className="font-mono text-[12px] text-ink-3 min-w-[80px]">
                  06<span className="opacity-50 mx-1.5">/</span><span className="opacity-50">06</span>
                </div>
                <div className="flex-1 flex flex-wrap items-start justify-between gap-8">
                  <div className="font-mono text-[13px] text-ink-2">Work with AB</div>
                  <h2 className="section-head-title-right font-extrabold tracking-[-0.03em] leading-[1.02] text-[28px] sm:text-[44px] lg:text-[60px] sm:text-right text-ink sm:max-w-[14ch]">
                    Three ways to<br />
                    <span className="text-accent">plug us in.</span>
                  </h2>
                </div>
              </div>
            </Reveal>

            <Reveal>
              <div className="grid grid-cols-1">
                {OFFERS.map((o, i) => (
                  <a
                    key={o.num}
                    href="#contact"
                    className={`group grid grid-cols-[80px_1fr_auto] gap-8 items-center py-9 border-t border-line hover:pl-4 hover:bg-bg-alt transition-all no-underline ${
                      i === OFFERS.length - 1 ? "border-b" : ""
                    }`}
                  >
                    <div className="font-mono text-[12px] text-accent tracking-[0.04em]">{o.num}</div>
                    <div>
                      <div className="text-[22px] sm:text-[28px] lg:text-[36px] font-bold tracking-[-0.02em] text-ink">
                        {o.title}
                      </div>
                      <div className="text-ink-2 text-[14px] mt-2 max-w-[62ch] leading-[1.55]">{o.desc}</div>
                    </div>
                    <div className="text-ink-3 text-2xl group-hover:text-accent group-hover:translate-x-1.5 transition-all hidden sm:block">
                      ↗
                    </div>
                  </a>
                ))}
              </div>
            </Reveal>
          </div>
        </section>
        )}

        {/* CTA */}
        <section id="contact" className="pt-44 pb-36">
          <div className="max-w-page mx-auto px-5 sm:px-8">
            <Reveal>
              <div className="font-mono text-[12px] text-ink-3">
                <span className="text-accent">●</span>
                &nbsp;&nbsp;Get in touch
              </div>
              <h2 className="font-extrabold tracking-[-0.03em] leading-[0.98] mt-6 text-[40px] sm:text-[60px] lg:text-[76px] max-w-[16ch] text-ink">
                If any of this resonates.<br />
                <span className="text-accent">Send a note.</span>
              </h2>
              <div className="flex gap-3 mt-12 flex-wrap">
                <a
                  href={`mailto:${EMAIL}`}
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-md bg-accent text-white font-semibold text-[13.5px] hover:bg-accent-2 hover:-translate-y-px transition-all border border-accent"
                >
                  Contact
                </a>
              </div>
            </Reveal>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
