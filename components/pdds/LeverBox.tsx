import type { Lever } from "@/types/dashboard";
import StatusBadge from "./StatusBadge";

// The "missing half" of each panel: the policy lever, whether the number
// moved, and the source. This is what keeps the series honest rather than
// just narrating a gap.
export default function LeverBox({ lever }: { lever: Lever | null | undefined }) {
  if (!lever) return null;
  return (
    <div className="mt-4 p-5 bg-bg-alt border border-line rounded-md">
      <div className="flex items-center gap-2.5 flex-wrap mb-2">
        <StatusBadge label={lever.status_badge} />
        <span className="text-[13.5px] font-semibold text-ink">
          {lever.lever}
        </span>
      </div>
      <p className="text-[13.5px] text-ink-2 leading-[1.55] m-0">
        {lever.movement_note}
      </p>
      {lever.source_url && (
        <a
          className="inline-block mt-2 text-[12px] font-mono text-accent tracking-[0.06em] uppercase no-underline border-b border-line-2 hover:border-accent pb-px"
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
