import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";
import type { Metadata } from "next";
import { getPddsDashboard } from "@/lib/pdds-dashboard";
import HeadlineCards from "@/components/pdds/HeadlineCards";
import DecisionPanel from "@/components/pdds/DecisionPanel";
import SourcesFooter from "@/components/pdds/SourcesFooter";

export const metadata: Metadata = {
  title: "Public data as a decision system — Analytic Bytes",
  description:
    "Federal public datasets, the policy levers attached to them, and whether the numbers actually moved. A working demo of the Analytic Bytes decision-system framework applied at national scale.",
};

// Re-read pdds-dashboard.json at most once an hour; the pipeline rewrites
// it on each build. In production this is effectively rebuild-cadence.
export const revalidate = 3600;

export default function PublicDataPage() {
  const data = getPddsDashboard();

  return (
    <>
      <Nav />

      <main>
        {/* HEADER */}
        <section className="pt-20 pb-10 sm:pt-24 sm:pb-14">
          <div className="max-w-page mx-auto px-5 sm:px-8">
            <Reveal>
              <div className="font-mono text-[12px] text-ink-3">
                <span className="text-accent">●</span>
                &nbsp;&nbsp;Library&nbsp;&nbsp;·&nbsp;&nbsp;Decision systems
              </div>
              <h1 className="font-extrabold leading-[0.95] tracking-[-0.035em] mt-6 text-[40px] sm:text-[60px] lg:text-[72px] text-ink max-w-[20ch]">
                Public data as a{" "}
                <span className="text-accent">decision system.</span>
              </h1>
              <p className="text-ink-2 text-[17px] max-w-[640px] mt-6 leading-[1.55]">
                Each panel pairs a public dataset with the policy lever attached
                to it — and asks the honest question: <em>once the data was
                published, did the number actually move?</em>
              </p>
              <p className="text-ink-3 text-[14.5px] sm:text-[15px] max-w-[640px] mt-4 leading-[1.6]">
                A working demo of the Analytic Bytes framework applied at
                national scale. Meaning is defined once per metric inside the
                pipeline. Authority sits on the lever — a specific policy owner
                is named for every data point. Validity is enforced by pinned
                snapshots and dbt tests: if a known-good total moves, the build
                fails instead of the number quietly reaching this page.
              </p>
            </Reveal>
          </div>
        </section>

        {/* HEADLINES + PANELS */}
        <section className="pb-16">
          <div className="max-w-page mx-auto px-5 sm:px-8">
            <Reveal>
              <div className="max-w-[820px] mx-auto">
                <HeadlineCards cards={data.headlines} />

                {data.panels.map((p) => (
                  <DecisionPanel key={p.panel_id} panel={p} />
                ))}

                <SourcesFooter
                  sources={data.sources}
                  generatedAt={data.generated_at}
                />
              </div>
            </Reveal>
          </div>
        </section>

        {/* METHOD NOTE */}
        <section className="pb-32">
          <div className="max-w-page mx-auto px-5 sm:px-8">
            <Reveal>
              <div className="max-w-[820px] mx-auto pt-8 border-t border-line">
                <div className="font-mono text-[11px] text-accent tracking-[0.18em] uppercase mb-4">
                  How this page stays honest
                </div>
                <p className="text-ink-2 text-[14.5px] sm:text-[15px] leading-[1.6] max-w-[64ch]">
                  Every figure on this page comes from a pinned federal
                  release, transformed through a DuckDB + dbt pipeline. The
                  ingestion step lands each release as a dated raw snapshot;
                  dbt tests encode the known-good totals so drift fails the
                  build instead of quietly landing here. When a source
                  publishes an update, the pipeline re-pins, the tests
                  re-run, and this page reflects the new numbers on the next
                  deploy. Nothing is hand-typed.
                </p>
                <p className="text-ink-3 text-[13.5px] sm:text-[14px] leading-[1.6] max-w-[64ch] mt-3">
                  This is early. More sectors, more levers, and better
                  cross-cutting views are on the roadmap. If you want to
                  suggest a dataset or a lever, or if you&rsquo;re building
                  something similar and want to compare notes,{" "}
                  <a
                    href="mailto:hello@analyticbytes.systems"
                    className="text-ink underline-offset-4 underline decoration-line-2 hover:decoration-accent"
                  >
                    send a note
                  </a>
                  .
                </p>
              </div>
            </Reveal>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
