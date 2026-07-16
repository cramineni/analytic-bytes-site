import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";
import type { Metadata } from "next";
import { getPddsDashboard } from "@/lib/pdds-dashboard";
import HeadlineCards from "@/components/pdds/HeadlineCards";
import DecisionPanel from "@/components/pdds/DecisionPanel";
import SourcesFooter from "@/components/pdds/SourcesFooter";

const PDDS_COVER =
  "https://analyticbytes.systems/library/covers/public-data-decision-systems.svg";
const PDDS_TITLE = "Public data as a decision system — Analytic Bytes";
const PDDS_DESCRIPTION =
  "Every panel reads an official statistic at the grain it’s reported, attaches a policy lever it bears on, and names the decision that grain can and can’t support. Descriptions used to decide, not models used to predict.";

export const metadata: Metadata = {
  title: PDDS_TITLE,
  description: PDDS_DESCRIPTION,
  openGraph: {
    title: PDDS_TITLE,
    description: PDDS_DESCRIPTION,
    type: "article",
    url: "https://analyticbytes.systems/library/public-data",
    images: [
      {
        url: PDDS_COVER,
        width: 1200,
        height: 630,
        alt: "Public data as a decision system — a mosaic of five panels showing overdose, NAEP, maternal, scorecard, and SLDS bar charts",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: PDDS_TITLE,
    description: PDDS_DESCRIPTION,
    images: [PDDS_COVER],
  },
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
                Every panel reads an official statistic at the grain
                it&rsquo;s reported, attaches a policy lever it bears on, and
                names the decision that grain can and can&rsquo;t support.
              </p>
              <p className="text-ink text-[17px] sm:text-[18px] max-w-[640px] mt-4 leading-[1.5] font-medium italic">
                Descriptions used to decide, not models used to predict.
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
                <div className="font-mono text-[11px] text-accent tracking-[0.18em] uppercase mb-4 mt-8">
                  How this is built
                </div>
                <p className="text-ink-2 text-[14.5px] sm:text-[15px] leading-[1.6] max-w-[64ch]">
                  On top of that pipeline, the write-up under each panel is
                  drafted by a language model and then run through automated
                  checks before it can publish. Two of those checks are
                  strict: every number in a note must trace back to a bar on
                  this page, and no note may claim a policy lever caused a
                  change the data can&rsquo;t support. If either fails, the
                  build stops. The statistics are computed in code, never by
                  the model; the model only narrates numbers it&rsquo;s
                  handed. A final step runs the release loop itself &mdash;
                  regenerate a note, run the checks, diagnose any failure
                  &mdash; under a guardrail that lets it fix the wording but
                  never the tests it has to pass.
                </p>
                <p className="text-ink-3 text-[13.5px] sm:text-[14px] leading-[1.6] max-w-[64ch] mt-8">
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
