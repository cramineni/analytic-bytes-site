import type { Lever } from "@/types/dashboard";
import StatusBadge from "./StatusBadge";

// The "missing half" of each panel: the policy lever, whether the number
// moved, and the source. This is what keeps the series honest rather than
// just narrating a gap.
//
// Movement notes end with a "Decision: ..." clause — the punchline of the
// panel. Split it out and render as an indented, accent-bordered block so
// the reader's eye lands on it before scanning the full narrative.
function splitDecision(note: string): { body: string; decision: string | null } {
  const marker = /(?:^|\s)Decision:\s*/;
  const m = note.match(marker);
  if (!m || m.index === undefined) return { body: note, decision: null };
  const body = note.slice(0, m.index).trim();
  const decision = note.slice(m.index + m[0].length).trim();
  return { body, decision: decision.length > 0 ? decision : null };
}

export default function LeverBox({ lever }: { lever: Lever | null | undefined }) {
  if (!lever) return null;
  const { body, decision } = splitDecision(lever.movement_note);
  return (
    <div className="mt-4 p-5 bg-bg-alt border border-line rounded-md">
      <div className="flex items-center gap-2.5 flex-wrap mb-2">
        <StatusBadge label={lever.status_badge} />
        <span className="text-[13.5px] font-semibold text-ink">
          {lever.lever}
        </span>
      </div>
      <p className="text-[13.5px] text-ink-2 leading-[1.55] m-0">
        {body}
      </p>
      {decision && (
        <div className="mt-3 border-l-2 border-accent pl-3 py-1">
          <div className="font-mono text-[10.5px] tracking-[0.18em] uppercase text-accent mb-1">
            Decision
          </div>
          <p className="text-[13.5px] text-ink font-medium leading-[1.55] m-0">
            {decision}
          </p>
        </div>
      )}
      {lever.source_url && (
        <a
          className="inline-block mt-3 text-[12px] font-mono text-accent tracking-[0.06em] uppercase no-underline border-b border-line-2 hover:border-accent pb-px"
          href={lever.source_url}
          target="_blank"
          rel="noopener noreferrer"
        >
          Source →
        </a>
      )}
    </div>
  );
}
