import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About — Analytic Bytes",
  description:
    "Built by Chaitanya Ramineni — operator, advisor, and builder of decision systems for mission-driven organizations.",
};

// =====================================================================
// BIO — paste your LinkedIn About text into the BIO_PARAGRAPHS array.
// Each string in the array becomes its own paragraph. Add or remove as needed.
// =====================================================================

const BIO_PARAGRAPHS: string[] = [
  "I build decision systems that change the way organizations operate.",
  "My work runs through education, mental health and behavioral programs, and grant-funded mission-driven organizations — across modern data platforms, measurement, analytics, AI, and the operating rhythms that turn signal into action. I step into complex environments, deliver early value, and build toward scalable systems with stronger decision discipline — from data foundations to the narratives executives and frontline operators can act on.",
  "I lead with a player-coach mindset and a bias toward turning priorities into progress. Every engagement strengthens the in-house team — not its dependency on me. Stack-light, context-rich, built to be handed off.",
  "I've built much of this work inside mission-driven organizations. Analytic Bytes exists to bring that same rigor — and the operating teams that own it — to organizations where better decisions translate directly into impact.",
];

// Optional: short list of credibility/highlight bullets to show after the bio.
// Set to [] (empty array) to hide this section.
const HIGHLIGHTS: { label: string; value: string }[] = [
  {
    label: "Background",
    value:
      "PhD, Educational Measurement (University of Delaware) · Seven years of AI-evaluation research at ETS · Operational data practice across education and mental health organizations · Stanford Executive Education in AI-Driven Leadership · MIT Sloan Executive Education in Implementing Agentic AI",
  },
];

// =====================================================================
// PRINCIPLES — what AB stands for. Public-facing version of BRAND_SOUL.md.
// Edit/reorder/add — keep them tight (1 line title + 1 line description).
// =====================================================================

const PRINCIPLES: { title: string; desc: string }[] = [
  {
    title: "Built around the human, not the system.",
    desc: "The people inside the system AND the people the system serves. Every layer, every choice.",
  },
  {
    title: "Asset-based, not deficit-based.",
    desc: "Start from what's already there, not what's missing. New tools and headcount come second, if at all.",
  },
  {
    title: "Build operating teams, not dependencies.",
    desc: "Every engagement strengthens the in-house team. Success is measured by their independence after handoff.",
  },
  {
    title: "Stack-light, context-rich.",
    desc: "Simple infrastructure, deep institutional knowledge. The cheapest stack that holds; the richest context that compounds.",
  },
  {
    title: "AI-augmented, human-owned.",
    desc: "AB runs the way it tells clients to run — AI tools used deliberately across research, writing, and delivery, with human judgment owning every decision.",
  },
  {
    title: "The frontline matters.",
    desc: "Decisions that work are the ones the people closest to the work can act on. Boardroom AND frontline.",
  },
  {
    title: "Mission-driven shouldn't mean self-breaking.",
    desc: "Caring about the work shouldn't cost the people doing it. Body-breaking and mind-breaking aren't proof of commitment.",
  },
  {
    title: "Clarity over comfort.",
    desc: "Real progress needs the conversation that names the trade-off, the cost, and the call — even when it's the harder one.",
  },
];

export default function AboutPage() {
  return (
    <>
      <Nav />

      <main>
        {/* HEADER */}
        <section className="pt-20 pb-10 sm:pt-24 sm:pb-14">
          <div className="max-w-page mx-auto px-5 sm:px-8">
            <Reveal>
              {/*
                Chaitanya's photo — drop a square portrait in `public/chaitanya.jpg`
                (recommended ~800x800, JPG). If the file isn't there, you'll see a
                broken-image icon (intentional reminder). Replace with photo when ready.
              */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/chaitanya.jpg"
                alt="Chaitanya Ramineni"
                className="w-32 h-32 sm:w-40 sm:h-40 rounded-2xl object-cover mb-8 border border-line"
              />
              <div className="font-mono text-[12px] text-ink-3">
                <span className="text-accent">●</span>&nbsp;&nbsp;About
              </div>
              <h1 className="font-extrabold leading-[1.05] tracking-[-0.025em] mt-6 text-[28px] sm:text-[40px] lg:text-[52px] text-ink max-w-[18ch]">
                Built by <span className="text-accent">Chaitanya Ramineni.</span>
              </h1>
            </Reveal>
          </div>
        </section>

        {/* BIO */}
        <section className="pb-16">
          <div className="max-w-page mx-auto px-5 sm:px-8">
            <Reveal>
              <div className="border-t border-line pt-10 max-w-[68ch]">
                {BIO_PARAGRAPHS.map((p, i) => (
                  <p
                    key={i}
                    className="text-ink-2 text-[17px] sm:text-[18px] leading-[1.65] mb-5"
                  >
                    {p}
                  </p>
                ))}

                {HIGHLIGHTS.length > 0 ? (
                  <div className="mt-10 pt-10 border-t border-line grid grid-cols-1 sm:grid-cols-[160px_1fr] gap-y-3 gap-x-8">
                    {HIGHLIGHTS.map((h) => (
                      <div key={h.label} className="contents">
                        <div className="font-mono text-[11px] text-ink-3 tracking-[0.18em] uppercase pt-1">
                          {h.label}
                        </div>
                        <div className="text-ink text-[15px]">{h.value}</div>
                      </div>
                    ))}
                  </div>
                ) : null}
              </div>
            </Reveal>
          </div>
        </section>

        {/* WHAT I DO — concept visual */}
        <section className="pb-16">
          <div className="max-w-page mx-auto px-5 sm:px-8">
            <Reveal>
              <div className="border-t border-line pt-10 max-w-[820px]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/about/what-i-do.svg"
                  alt="What I do — a three-stage decision-systems diagram. Signals to Intelligence to Execution, anchored in measurement, evidence, analytics, AI, operations, and learning, across education, mental health, healthcare, and mission-driven sectors."
                  className="w-full h-auto block"
                />
              </div>
            </Reveal>
          </div>
        </section>

        {/* PRINCIPLES */}
        <section className="pb-16">
          <div className="max-w-page mx-auto px-5 sm:px-8">
            <Reveal>
              <div className="border-t border-line pt-10 max-w-[68ch]">
                <div className="font-mono text-[11px] text-ink-3 tracking-[0.18em] uppercase mb-8">
                  Principles
                </div>
                <ul className="list-none p-0 m-0">
                  {PRINCIPLES.map((p, i) => (
                    <li
                      key={i}
                      className={`py-5 ${i > 0 ? "border-t border-line" : ""}`}
                    >
                      <div className="text-ink font-bold text-[18px] sm:text-[20px] tracking-[-0.015em] mb-1.5">
                        {p.title}
                      </div>
                      <div className="text-ink-2 text-[15px] leading-[1.55]">
                        {p.desc}
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>
        </section>

      </main>

      <Footer />
    </>
  );
}
