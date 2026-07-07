import type { Source } from "@/types/dashboard";

export default function SourcesFooter({
  sources,
  generatedAt,
}: {
  sources: Source[] | undefined;
  generatedAt: string;
}) {
  return (
    <footer className="mt-12 pt-8 border-t border-line">
      <h3 className="text-[11px] font-mono tracking-[0.18em] text-accent uppercase mb-3">
        Sources
      </h3>
      {sources && sources.length > 0 ? (
        <ul className="list-none p-0 m-0 space-y-2 mb-6">
          {sources.map((s) => (
            <li key={s.source_id} className="text-[13.5px] text-ink-2 leading-[1.55]">
              <a
                href={s.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-ink underline-offset-4 underline decoration-line-2 hover:decoration-accent"
              >
                {s.title}
              </a>
              <span className="text-ink-3">
                {" — "}
                {s.publisher}
                {s.table_ref ? `, ${s.table_ref}` : ""}
              </span>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-[13.5px] text-ink-3 leading-[1.55] mb-6">
          College Scorecard (US Dept of Education), CDC provisional overdose &amp;
          maternal mortality data (NCHS), NAEP (Nation&rsquo;s Report Card), and
          NCES Digest tables. Each headline card links directly to its source
          release.
        </p>
      )}
      <p className="text-[12px] font-mono text-ink-3 tracking-[0.04em]">
        Built from federal releases. Data snapshot generated {generatedAt}.
      </p>
    </footer>
  );
}
