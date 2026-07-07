import type { Panel } from "@/types/dashboard";
import PanelChart from "./PanelChart";
import LeverBox from "./LeverBox";
import { panelMeta } from "@/lib/pdds-format";

// One entry in the section: title, chart, and the lever/movement box.
export default function DecisionPanel({ panel }: { panel: Panel }) {
  const meta = panelMeta(panel.panel_id);
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
      </header>
      <div className="my-4">
        <PanelChart panel={panel} />
      </div>
      <LeverBox lever={panel.lever} />
    </section>
  );
}
