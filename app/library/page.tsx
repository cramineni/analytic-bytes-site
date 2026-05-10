import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Library — Analytic Bytes",
  description:
    "Essays, artifacts, and field notes on decision systems, measurement, and operating-team data work.",
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

type Entry = {
  type: "essay" | "artifact" | "field-note";
  title: string;
  date: string;
  summary: string;
  url?: string;
  image?: string;
};

const ENTRIES: Entry[] = [
  // Artifacts — visual cards from LinkedIn posts. Newest first.
  // Add `url` field with the LinkedIn post link when you have time to grab them.

  // ----- Carousel post on LinkedIn (AB page), May 6, 2026 -----
  // "Most data work stops at the dashboard. That..."
  {
    type: "artifact",
    title: "Enrollment as a decision system",
    date: "2026-05-06",
    summary:
      "Signal-to-action mapping for enrollment: demand, conversion, geography, capacity → staffing, scheduling, access, resources. Better decisions. Faster response. Stronger outcomes.",
    image: "/library/enrollment-decision-system.png",
    url: "https://www.linkedin.com/posts/analytic-bytes_most-data-work-stops-at-the-dashboard-that-activity-7457788236564680704-9lj-",
  },
  {
    type: "artifact",
    title: "Attendance as a decision system",
    date: "2026-05-06",
    summary:
      "Signal-to-action mapping for attendance: trends, absences, patterns, at-risk indicators → interventions, outreach, support, follow-up. The value of a signal is how quickly it changes action.",
    image: "/library/attendance-decision-system.png",
    url: "https://www.linkedin.com/posts/analytic-bytes_most-data-work-stops-at-the-dashboard-that-activity-7457788236564680704-9lj-",
  },
  {
    type: "artifact",
    title: "Capacity as a decision system",
    date: "2026-05-06",
    summary:
      "Signal-to-action mapping for capacity: demand pressure, utilization, constraints, capacity gaps → align staffing, optimize scheduling, allocate resources, expand or adjust. The goal isn't just to understand signals — it's to build capacity to respond.",
    image: "/library/capacity-decision-system.png",
    url: "https://www.linkedin.com/posts/analytic-bytes_most-data-work-stops-at-the-dashboard-that-activity-7457788236564680704-9lj-",
  },

  // ----- Foundational framework post on LinkedIn (AB page), May 4, 2026 -----
  // "Data doesn't fail at visibility. It fails..."
  {
    type: "artifact",
    title: "From Signal to Action — the decision system architecture",
    date: "2026-05-04",
    summary:
      "The four-stage flow that anchors every decision-system engagement: Signal → Interpretation → Decision → Action. A system is not the dashboard — it's what happens after.",
    image: "/library/from-signal-to-action.png",
    url: "https://www.linkedin.com/posts/analytic-bytes_data-doesnt-fail-at-visibility-it-fails-activity-7457094343435169792-OtkE",
  },
];

const TYPE_LABELS: Record<Entry["type"], string> = {
  essay: "Essay",
  artifact: "Artifact",
  "field-note": "Field Note",
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
                Essays, artifacts, and field notes — on decision-system architecture,
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
  // Artifact entries get an image-led layout; essays/field-notes get a text-row layout
  if (entry.type === "artifact") {
    return <ArtifactEntry entry={entry} />;
  }
  return <TextEntry entry={entry} />;
}

function ArtifactEntry({ entry }: { entry: Entry }) {
  const isLink = entry.url && entry.url.length > 0;
  const Wrap = isLink
    ? ({ children }: { children: React.ReactNode }) => (
        <a
          href={entry.url}
          target={entry.url?.startsWith("http") ? "_blank" : undefined}
          rel="noopener"
          className="block group no-underline"
        >
          {children}
        </a>
      )
    : ({ children }: { children: React.ReactNode }) => (
        <div className="block">{children}</div>
      );

  return (
    <Wrap>
      <article className="py-10 border-b border-line">
        <div className="grid grid-cols-1 sm:grid-cols-[120px_120px_1fr] gap-2 sm:gap-8 mb-5">
          <time className="font-mono text-[12px] text-ink-3 tracking-[0.04em] uppercase pt-1.5">
            {formatDate(entry.date)}
          </time>
          <div className="font-mono text-[11px] tracking-[0.18em] uppercase pt-2 text-accent">
            {TYPE_LABELS[entry.type]}
          </div>
          <h3 className="text-[18px] sm:text-[22px] lg:text-[24px] font-bold tracking-[-0.015em] text-ink leading-[1.25] min-w-0">
            {entry.title}
            {isLink && (
              <span className="ml-2 text-ink-3 text-[18px] inline-block group-hover:text-accent group-hover:translate-x-0.5 transition-all">
                ↗
              </span>
            )}
          </h3>
        </div>
        {entry.image ? (
          <div className="sm:ml-[256px] mb-4 rounded-md overflow-hidden border border-line bg-bg-alt">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={entry.image}
              alt={entry.title}
              className="w-full h-auto block"
              loading="lazy"
            />
          </div>
        ) : (
          <div className="sm:ml-[256px] mb-4 rounded-md border border-dashed border-line-2 bg-bg-alt aspect-[4/3] sm:aspect-[16/10] flex items-center justify-center text-ink-3 text-[12px] font-mono">
            (image pending — drop file at {`/public${entry.image ?? "/library/..."}`})
          </div>
        )}
        {entry.summary ? (
          <p className="sm:ml-[256px] text-ink-2 text-[14px] sm:text-[15px] leading-[1.55] max-w-[64ch]">
            {entry.summary}
          </p>
        ) : null}
      </article>
    </Wrap>
  );
}

function TextEntry({ entry }: { entry: Entry }) {
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
        <div className="font-mono text-[11px] tracking-[0.18em] uppercase pt-2 text-accent">
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
