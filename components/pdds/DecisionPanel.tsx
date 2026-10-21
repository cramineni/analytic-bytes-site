import type { Panel } from "@/types/dashboard";
import PanelChart from "./PanelChart";
import LeverBox from "./LeverBox";
import { panelMeta } from "@/lib/pdds-format";

// One entry in the section: title, chart, lever/movement box, and — for
// extension-track panels — the comparison-withheld callout that names
// what governance decision was made to keep this panel honest.
export default function DecisionPanel({ panel }: { panel: Panel }) {
  const meta = panelMeta(panel.panel_id, Object.keys(panel.series ?? {}));
  const cw = panel.comparison_withheld;
  // Explain the whisker where the whisker is, not in the movement note. The
  // question a reader asks of an interval is what it covers, and the honest
  // answer on a survey at a 30.6% response rate is: less than you think.
  const hasCI = Object.values(panel.series ?? {}).some((rows) =>
    (rows as { ci?: number[] }[]).some((b) => Array.isArray(b.ci))
  );
  // Does any estimate sit exactly on a bound of its own interval? That only
  // happens when the source rounds the estimate and the bounds separately:
  // YRBS attempted suicide 2025 publishes as 6 (6-7) at CDC's whole-percent
  // grain, so the whisker draws one-sided, as though the number can rise but
  // not fall. It can fall; the grain hid it. The sentence appears only where
  // the artifact is actually present rather than being asserted on every
  // panel, so it stays true as the data changes.
  const roundedToBound = Object.values(panel.series ?? {}).some((rows) =>
    (rows as { value?: number; ci?: number[] }[]).some(
      (b) =>
        Array.isArray(b.ci) &&
        typeof b.value === "number" &&
        (b.value === b.ci[0] || b.value === b.ci[1])
    )
  );

  return (
    <section className="pt-8 pb-6 border-t border-line">
      <header className="mb-3">
        <h2 className="text-[20px] sm:text-[22px] font-bold tracking-[-0.015em] text-ink m-0">
          {meta.title}
        </h2>
        {meta.subtitle && (
          <p className="text-[13px] text-ink-3 mt-1 m-0 font-mono tracking-[0.02em]">
            {meta.subtitle}
          </p>
        )}
        {(panel.data_class || panel.lever_type) && (
          <div className="mt-2">
            <div className="flex flex-wrap gap-2 font-mono text-[10.5px] tracking-[0.14em] uppercase">
              {panel.data_class && (
                <span className="text-ink-3 border border-line rounded px-1.5 py-0.5">
                  {panel.data_class}
                </span>
              )}
              {panel.lever_type && (
                <span className="text-ink-3 border border-line rounded px-1.5 py-0.5">
                  {panel.lever_type} lever
                </span>
              )}
            </div>
            <p className="text-[12px] text-ink-3 mt-1.5 leading-[1.5] m-0">
              {panel.data_class === "administrative"
                ? "administrative = record-based, not survey"
                : panel.data_class === "survey"
                  ? "survey = self-reported response, not a record"
                  : null}
              {panel.data_class && panel.lever_type ? " · " : null}
              {panel.lever_type === "continuous"
                ? "continuous = standing policy, no single enactment date — read as trend"
                : panel.lever_type === "point"
                  ? "point = single enactment date — read as before/after"
                  : null}
            </p>
          </div>
        )}
      </header>
      <div className="my-4">
        <PanelChart panel={panel} />
        {hasCI && (
          <p className="text-[12px] text-ink-3 mt-2 leading-[1.5] m-0">
            Whiskers are 95% confidence intervals: the range sampling error
            alone leaves around each estimate. They do not cover who answered.
            A narrow interval means the sample was large enough to pin the
            number down, not that the number is free of bias from who was
            missing.
            {roundedToBound && (
              <>
                {" "}
                Intervals are shown at the source&rsquo;s published grain. Where
                that grain is whole percentages, rounding can place a bound on
                the estimate itself, which draws the interval one-sided; the
                estimate is not pinned to that end of it.
              </>
            )}
          </p>
        )}
      </div>
      <LeverBox lever={panel.lever} />
      {cw && (
        <div className="mt-4 border-l-2 border-accent pl-4 py-2 bg-bg-alt/40">
          <div className="font-mono text-[10.5px] tracking-[0.18em] uppercase text-accent mb-1.5">
            Comparison withheld
          </div>
          <p className="text-[13.5px] sm:text-[14px] text-ink-2 leading-[1.55] m-0">
            {cw.note}
          </p>
          {cw.units && cw.units.length > 0 && (
            <p className="text-[12.5px] text-ink-3 mt-2 m-0 font-mono">
              Held off axis: {cw.units.map((u) => u.group).join(", ")} — awaiting denominator reconciliation.
            </p>
          )}
        </div>
      )}
    </section>
  );
}
