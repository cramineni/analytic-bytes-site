import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";
import Link from "next/link";
import type { Metadata } from "next";
import { ESSAYS, ArtifactLink, isEssayVisible } from "./essays";
import { ARTIFACTS, type Artifact } from "./artifacts-data";
import WritingsList, { type WritingEntry } from "./WritingsList";

export const metadata: Metadata = {
  title: "Library — Analytic Bytes",
  description:
    "Essays, artifacts, and field notes on decision systems, measurement, and operating-team data work.",
  openGraph: {
    title: "Notes from the decision system — Analytic Bytes Library",
    description:
      "Essays, artifacts, and field notes on decision-system architecture, measurement, and the operating teams that ship them.",
    url: "https://analyticbytes.systems/library",
    type: "article",
    images: [{ url: "https://analyticbytes.systems/og-library.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Notes from the decision system — Analytic Bytes Library",
    description:
      "Essays, artifacts, and field notes on decision-system architecture.",
    images: ["https://analyticbytes.systems/og-library.png"],
  },
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

// Artifacts — figures from the analytical work (architecture diagrams,
// data charts, flowcharts). The full ARTIFACTS registry lives in
// ./artifacts-data.ts so it can be shared with /library/artifacts and
// /library/artifacts/[slug]. This page shows only a preview strip.
const ARTIFACT_PREVIEW_COUNT = 6;
const ARTIFACT_PREVIEWS: Artifact[] = ARTIFACTS.slice(
  0,
  ARTIFACT_PREVIEW_COUNT
);

// Dated feed — published essays and field notes (from the ESSAYS registry),
// newest-first. Artifacts are dateless and render in their own gallery below.
// The list itself is rendered by <WritingsList /> (client-side, so it can
// hold the discipline filter state).
const ENTRIES: WritingEntry[] = ESSAYS.filter(isEssayVisible)
  .map(
    (e): WritingEntry => ({
      type: e.kind,
      title: e.title,
      date: e.date,
      summary: e.summary,
      url: `/library/${e.slug}`,
      arc: e.arc,
    })
  )
  .sort((a, b) => (b.date ?? "").localeCompare(a.date ?? ""));

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
              <p className="text-ink-3 text-[14.5px] sm:text-[15px] max-w-[600px] mt-4 leading-[1.6]">
                <ArtifactLink slug="decision-system-architecture-frame">
                  Decision-system architecture
                </ArtifactLink>{" "}
                is the umbrella frame for this library — composed of four
                disciplines:{" "}
                <span className="text-ink-2">Measurement</span>,{" "}
                <span className="text-ink-2">Integration governance</span>,{" "}
                <span className="text-ink-2">AI systems</span>, and{" "}
                <span className="text-ink-2">Data foundations</span>. Each
                piece sits in one of the four; the arc pill on each card
                names which.
              </p>
              <p className="text-ink-3 text-[14.5px] sm:text-[15px] max-w-[600px] mt-3 leading-[1.6]">
                Also live:{" "}
                <a
                  href="/library/public-data"
                  className="text-accent hover:text-accent-2 no-underline border-b border-line-2 hover:border-accent pb-px"
                >
                  Public data as a decision system
                </a>{" "}
                — a working demo of the framework applied to federal
                releases, with the honest question attached to every panel:
                did the number actually move?
              </p>
            </Reveal>
          </div>
        </section>

        {/* WRITINGS — essays & field notes, dated feed with a discipline
            filter row at the top. Filter state lives in <WritingsList />
            (client component) so page.tsx can stay a Server Component. */}
        <section className="pb-16">
          <div className="max-w-page mx-auto px-5 sm:px-8">
            <Reveal>
              <div className="pt-2">
                <WritingsList entries={ENTRIES} />
              </div>
            </Reveal>
          </div>
        </section>

        {/* ARTIFACTS — preview strip (first 6). Full gallery lives at
            /library/artifacts. Mirrors how PDDS links out from /library. */}
        {ARTIFACTS.length > 0 ? (
          <section className="pb-32">
            <div className="max-w-page mx-auto px-5 sm:px-8">
              <Reveal>
                <div className="border-t border-line pt-7">
                  <div className="font-mono text-[11px] text-ink-3 tracking-[0.18em] uppercase mb-2">
                    Artifacts
                  </div>
                  <p className="text-ink-2 text-[15px] max-w-[600px] mb-10 leading-[1.55]">
                    Diagrams, tables, and frames from the analytical work.
                    {" "}
                    {ARTIFACTS.length} and counting.
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-10">
                    {ARTIFACT_PREVIEWS.map((a) => (
                      <ArtifactPreviewCard key={a.slug} artifact={a} />
                    ))}
                  </div>
                  <div className="mt-8 text-right">
                    <Link
                      href="/library/artifacts"
                      className="font-mono text-[12px] tracking-[0.06em] uppercase text-accent hover:text-accent-2 no-underline border-b border-line-2 hover:border-accent pb-px"
                    >
                      See all {ARTIFACTS.length} artifacts →
                    </Link>
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

// Compact preview card for the /library artifacts strip. Links to the
// dedicated artifact page. Full gallery lives at /library/artifacts.
function ArtifactPreviewCard({ artifact }: { artifact: Artifact }) {
  return (
    <Link
      href={`/library/artifacts/${artifact.slug}`}
      className="group block no-underline"
    >
      <div className="rounded-md overflow-hidden border border-line bg-bg-alt mb-3 group-hover:border-line-2 transition-colors">
        {artifact.format === "html" ? (
          <div className="aspect-[3/2] flex items-center justify-center px-5 text-center bg-white">
            <div>
              <div className="font-mono text-[9.5px] tracking-[0.22em] uppercase text-accent mb-1.5">
                Interactive artifact
              </div>
              <div className="text-[13.5px] font-bold text-ink leading-[1.3] tracking-[-0.01em]">
                {artifact.title}
              </div>
              <div className="mt-2 font-mono text-[10px] tracking-[0.06em] text-ink-3">
                Open &rarr;
              </div>
            </div>
          </div>
        ) : (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={artifact.image}
            alt={artifact.title}
            className="w-full h-auto block"
            loading="lazy"
          />
        )}
      </div>
      <div className="font-mono text-[10.5px] tracking-[0.18em] uppercase text-accent mb-1.5">
        Artifact
      </div>
      <h3 className="text-[15.5px] sm:text-[16px] font-bold tracking-[-0.015em] text-ink leading-[1.3] group-hover:text-accent transition-colors">
        {artifact.title}
      </h3>
    </Link>
  );
}

// TextEntry + ArcPill moved to ./WritingsList.tsx so the client-side
// discipline filter and the per-entry display live in one unit.
