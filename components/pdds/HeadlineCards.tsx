import type { HeadlineCard } from "@/types/dashboard";
import { formatHeadline } from "@/lib/pdds-format";

export default function HeadlineCards({ cards }: { cards: HeadlineCard[] }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-10">
      {cards.map((c) => (
        <a
          key={c.card_id}
          className="block p-4 rounded-md border border-line bg-bg-alt no-underline text-ink hover:border-accent transition-colors"
          href={c.source_url}
          target="_blank"
          rel="noopener noreferrer"
        >
          <div className="text-[24px] font-semibold tracking-[-0.01em] text-ink">
            {formatHeadline(c.value, c.unit)}
          </div>
          <div className="text-[12.5px] text-ink-2 leading-[1.4] mt-1">
            {c.label}
          </div>
          <div className="text-[11px] text-ink-3 mt-1.5 font-mono tracking-[0.04em]">
            {c.period}
          </div>
        </a>
      ))}
    </div>
  );
}
