import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About — Analytic Bytes",
  description:
    "Built by Chaitanya Ramineni — operator, advisor, and builder of decision systems for mission-driven organizations.",
};

const LINKEDIN_URL = "https://www.linkedin.com/in/chaitanyaramineni/";

// =====================================================================
// BIO — paste your LinkedIn About text into the BIO_PARAGRAPHS array.
// Each string in the array becomes its own paragraph. Add or remove as needed.
// =====================================================================

const BIO_PARAGRAPHS: string[] = [
  "I build decision systems that change the way organizations operate.",
  "My work runs through schools, hospitals, and grant-funded programs — across modern data platforms, measurement, analytics, and the operating rhythms that turn signal into action. I step into complex environments, deliver early value, and build toward scalable systems with stronger decision discipline — from data foundations to the narratives executives and frontline operators can act on.",
  "I lead with a player-coach mindset and a bias toward turning priorities into progress. Every engagement strengthens the in-house team — not its dependency on me. Stack-light, context-rich, built to be handed off.",
  "I've built much of this work inside mission-driven organizations. Analytic Bytes exists to bring that same rigor — and the operating teams that own it — to organizations where better decisions translate directly into impact.",
];

// Optional: short list of credibility/highlight bullets to show after the bio.
// Set to [] (empty array) to hide this section.
const HIGHLIGHTS: { label: string; value: string }[] = [
  // { label: "Sectors", value: "Education · Healthcare · Grant-funded" },
  // { label: "Roles", value: "Data leader · Strategic advisor · Operator-coach" },
  // { label: "Based in", value: "City, State" },
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
              <div className="font-mono text-[12px] text-ink-3">
                <span className="text-accent">●</span>&nbsp;&nbsp;About
              </div>
              <h1 className="font-extrabold leading-[0.95] tracking-[-0.035em] mt-6 text-[40px] sm:text-[64px] lg:text-[80px] text-ink max-w-[18ch]">
                Built by <span className="text-accent">Chaitanya Ramineni.</span>
              </h1>
            </Reveal>
          </div>
        </section>

        {/* BIO */}
        <section className="pb-24">
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

                <div className="mt-12 flex flex-wrap gap-3">
                  <a
                    href={LINKEDIN_URL}
                    target="_blank"
                    rel="noopener"
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-md border border-line-2 text-ink hover:bg-ink/[0.04] transition-colors text-[13.5px] font-medium"
                  >
                    Connect on LinkedIn <span aria-hidden>↗</span>
                  </a>
                  <a
                    href="mailto:hello@analyticbytes.systems"
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-md bg-accent text-white font-semibold text-[13.5px] hover:bg-accent-2 hover:-translate-y-px transition-all border border-accent"
                  >
                    Book a 30-min call <span>→</span>
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
