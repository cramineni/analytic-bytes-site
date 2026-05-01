import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Library — Analytic Bytes",
  description:
    "Essays, artifacts, notes, and samples on decision systems, measurement, and operating-team data work.",
};

// =====================================================================
// CONTENT — add new entries here. Newest first.
// =====================================================================
//
// type:    one of 'essay' | 'artifact' | 'note' | 'sample'
// title:   short title
// date:    YYYY-MM-DD
// summary: 1–2 line description
// url:     external link (LinkedIn, Substack, etc.) OR leave empty for placeholder
// =====================================================================

type Entry = {
  type: "essay" | "artifact" | "note" | "sample";
  title: string;
  date: string;
  summary: string;
  url?: string;
};

const ENTRIES: Entry[] = [
  // Add your real entries here. Examples below to seed the page.
  {
    type: "artifact",
    title: "From signal to action — the decision system architecture",
    date: "2026-01-15",
    summary:
      "The four-stage flow that anchors every decision-system engagement: Signal, Interpretation, Decision, Action.",
    url: "",
  },
  {
    type: "essay",
    title: "A system is not the dashboard. It's what happens after.",
    date: "2026-01-10",
    summary:
      "Most teams stop at signal. The work that compounds — interpretation, decision, action — lives downstream.",
    url: "",
  },
  {
    type: "artifact",
    title: "The 90·90·90 operating loop",
    date: "2026-01-05",
    summary:
      "A 270-day pattern for repeatable execution: deliver signal, build the system, scale & extend.",
    url: "",
  },
  {
    type: "note",
    title: "Most data problems are decision problems",
    date: "2025-12-22",
    summary:
      "Dashboards show signal. Decisions require systems. The reframe that drives every Analytic Bytes engagement.",
    url: "",
  },
];

const TYPE_COLORS: Record<Entry["type"], string> = {
  essay: "text-accent",
  artifact: "text-accent",
  note: "text-ink-3",
  sample: "text-ink-3",
};

const TYPE_LABELS: Record<Entry["type"], string> = {
  essay: "Essay",
  artifact: "Artifact",
  note: "Note",
  sample: "Sample",
};

function formatDate(iso: string) {
  const d = new Date(iso + "T00:00:00");
  return d.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

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
                Essays, artifacts, notes, and samples — on decision-system architecture,
                measurement, and the operating teams that ship them.
              </p>
            </Reveal>
          </div>
        </section>

        {/* ENTRIES */}
        <section className="pb-32">
          <div className="max-w-page mx-auto px-5 sm:px-8">
            <Reveal>
              <div className="border-t border-line">
                {ENTRIES.length === 0 ? (
                  <div className="py-16 text-center text-ink-3 font-mono text-[13px]">
                    More soon.
                  </div>
                ) : (
                  ENTRIES.map((entry, i) => (
                    <Entry key={`${entry.date}-${i}`} entry={entry} />
                  ))
                )}
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
      </main>

      <Footer />
    </>
  );
}

function Entry({ entry }: { entry: Entry }) {
  const isLink = entry.url && entry.url.length > 0;
  const Wrap = isLink
    ? ({ children }: { children: React.ReactNode }) => (
        <a
          href={entry.url}
          target={entry.url?.startsWith("http") ? "_blank" : undefined}
          rel="noopener"
          className="block group hover:bg-bg-alt transition-colors no-underline"
        >
          {children}
        </a>
      )
    : ({ children }: { children: React.ReactNode }) => (
        <div className="block opacity-70">{children}</div>
      );

  return (
    <Wrap>
      <article className="grid grid-cols-1 sm:grid-cols-[120px_120px_1fr_auto] gap-2 sm:gap-8 py-8 border-b border-line">
        <time className="font-mono text-[12px] text-ink-3 tracking-[0.04em] uppercase pt-1.5">
          {formatDate(entry.date)}
        </time>
        <div
          className={`font-mono text-[11px] tracking-[0.18em] uppercase pt-2 ${TYPE_COLORS[entry.type]}`}
        >
          {TYPE_LABELS[entry.type]}
        </div>
        <div className="min-w-0">
          <h3 className="text-[18px] sm:text-[22px] lg:text-[24px] font-bold tracking-[-0.015em] text-ink leading-[1.25]">
            {entry.title}
          </h3>
          {entry.summary ? (
            <p className="text-ink-2 text-[14px] sm:text-[15px] mt-2 leading-[1.5] max-w-[64ch]">
              {entry.summary}
            </p>
          ) : null}
          {!isLink ? (
            <p className="text-ink-3 text-[11px] mt-2 font-mono tracking-[0.04em] uppercase">
              Coming soon
            </p>
          ) : null}
        </div>
        <div className="text-ink-3 text-2xl group-hover:text-accent group-hover:translate-x-1.5 transition-all hidden sm:block self-center">
          {isLink ? "↗" : ""}
        </div>
      </article>
    </Wrap>
  );
}
