"use client";

import { useMemo, useState } from "react";
import { ARC_LABELS, DISCIPLINE_ARCS, type Arc } from "./essays";

// Filterable writings list for /library.
//
// Renders a row of discipline chips (All + the four arcs) above the
// dated feed of essays and field notes. Selecting a chip filters the
// feed client-side; no navigation, no query params. Artifacts are
// excluded — they live in their own gallery below.
//
// The Entry rendering (dateline · type label · title · summary · arc
// pill) lives in this file so the filter and the display stay
// colocated. Keeps page.tsx focused on layout composition.

export type WritingEntry = {
  type: "essay" | "field-note";
  title: string;
  date?: string;
  summary: string;
  url?: string;
  arc?: Arc;
};

const TYPE_LABELS: Record<WritingEntry["type"], string> = {
  essay: "Essay",
  "field-note": "Field Note",
};

function formatDate(iso?: string) {
  if (!iso) return "";
  const d = new Date(iso + "T00:00:00");
  return d.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export default function WritingsList({ entries }: { entries: WritingEntry[] }) {
  const [selected, setSelected] = useState<Arc | null>(null);

  // Precompute per-arc counts (including a total) so the chips can show
  // the size of each filter — useful signal that the library has weight
  // in every arc without forcing the reader to click each one.
  const counts = useMemo(() => {
    const c: Record<Arc | "all", number> = {
      all: entries.length,
      measurement: 0,
      "integration-governance": 0,
      "ai-systems": 0,
      "data-foundations": 0,
    };
    for (const e of entries) {
      if (e.arc) c[e.arc] += 1;
    }
    return c;
  }, [entries]);

  const filtered = selected
    ? entries.filter((e) => e.arc === selected)
    : entries;

  return (
    <div>
      {/* Filter chip row */}
      <div className="flex flex-wrap items-center gap-2 pb-6">
        <FilterChip
          label="All"
          count={counts.all}
          active={selected === null}
          onClick={() => setSelected(null)}
        />
        {DISCIPLINE_ARCS.map((arc) => (
          <FilterChip
            key={arc}
            label={ARC_LABELS[arc]}
            count={counts[arc]}
            active={selected === arc}
            onClick={() => setSelected(arc)}
            arc={arc}
          />
        ))}
      </div>

      {/* Filtered feed */}
      <div className="border-t border-line">
        {filtered.length === 0 ? (
          <p className="text-ink-3 text-[14px] py-10 italic">
            Nothing in this discipline yet.
          </p>
        ) : (
          filtered.map((entry, i) => (
            <TextEntry key={`${entry.date}-${i}`} entry={entry} />
          ))
        )}
      </div>
    </div>
  );
}

// Chip: mono-uppercase label with a tiny arc marker (matching ArcPill's
// visual grammar) and a count badge. Active chip fills navy so the
// selected discipline reads as the anchor; inactive chips stay in the
// muted-ink palette so the row doesn't compete with the feed below.
function FilterChip({
  label,
  count,
  active,
  onClick,
  arc,
}: {
  label: string;
  count: number;
  active: boolean;
  onClick: () => void;
  arc?: Arc;
}) {
  const marker = arc ? arcMarkerClass(arc) : null;
  return (
    <button
      type="button"
      onClick={onClick}
      className={[
        "inline-flex items-center gap-1.5 font-mono text-[10.5px] tracking-[0.14em] uppercase pl-2 pr-2 py-1 rounded-sm border transition-colors",
        active
          ? "bg-ink text-white border-ink"
          : "bg-transparent text-ink-2 border-line-2 hover:border-ink hover:text-ink",
      ].join(" ")}
      aria-pressed={active}
    >
      {marker && (
        <span
          aria-hidden
          className={`inline-block w-1.5 h-1.5 shrink-0 ${marker}${
            active ? " opacity-90" : ""
          }`}
        />
      )}
      <span>{label}</span>
      <span
        className={`ml-1 font-mono text-[9.5px] tracking-[0.08em] ${
          active ? "text-white/70" : "text-ink-3"
        }`}
      >
        {count}
      </span>
    </button>
  );
}

// Matches the ArcPill marker treatment in page.tsx so the chip row and
// the per-entry pills read as one visual system.
function arcMarkerClass(arc: Arc): string {
  const markers: Record<Arc, string> = {
    measurement: "bg-accent rounded-full",
    "integration-governance": "bg-ink rounded-full",
    "ai-systems": "bg-bg border border-accent rounded-full",
    "data-foundations": "bg-ink rotate-45",
  };
  return markers[arc];
}

// Per-entry card. Extracted from page.tsx as-is (renamed only) so the
// filter and the display stay in one client-side unit.
function TextEntry({ entry }: { entry: WritingEntry }) {
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
          {entry.arc ? (
            <div className="mt-3">
              <ArcPill arc={entry.arc} />
            </div>
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

function ArcPill({ arc }: { arc: Arc }) {
  return (
    <span className="inline-flex items-center gap-1.5 font-mono text-[10.5px] tracking-[0.12em] uppercase text-ink-2 border border-line-2 rounded-sm pl-1.5 pr-2 py-0.5">
      <span
        aria-hidden
        className={`inline-block w-1.5 h-1.5 shrink-0 ${arcMarkerClass(arc)}`}
      />
      {ARC_LABELS[arc]}
    </span>
  );
}
