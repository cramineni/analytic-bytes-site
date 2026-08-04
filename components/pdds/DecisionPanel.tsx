import type { Panel } from "@/types/dashboard";
import PanelChart from "./PanelChart";
import LeverBox from "./LeverBox";
import { panelMeta } from "@/lib/pdds-format";

// One entry in the section: title, chart, lever/movement box, and — for
// extension-track panels — the comparison-withheld callout that names
// what governance decision was made to keep this panel honest.
export default function DecisionPanel({ panel }: { panel: Panel }) {
  const meta = panelMeta(panel.panel_id);
  const cw = panel.comparison_withheld;

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
          <div className="mt-2 flex flex-wrap gap-2 font-mono text-[10.5px] tracking-[0.14em] uppercase">
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
        )}
      </header>
      <div className="my-4">
        <PanelChart panel={panel} />
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
