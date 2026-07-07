import type { Panel } from "@/types/dashboard";
import { formatAxis, formatFull, panelStyle } from "@/lib/pdds-format";

// Horizontal SVG bar chart. Server-rendered (no client hydration, no chart
// library). Single-period panels colour each bar individually (accent for
// highlighted groups); multi-period panels (e.g. overdose 2023 vs 2024) draw
// one bar per period per group. Sits inside the surrounding <section>; sizes
// itself to fit whatever the container gives it.
export default function PanelChart({ panel }: { panel: Panel }) {
  const periods = Object.keys(panel.series).sort();
  const style = panelStyle(panel.panel_id);
  const latest = periods[periods.length - 1];
  const groups = panel.series[latest].map((b) => b.group);

  // Build rows: [{ group, "2023": v, "2024": v }]
  const rows = groups.map((g) => {
    const row: Record<string, string | number | null> = { group: g };
    for (const p of periods) {
      const found = panel.series[p].find((b) => b.group === g);
      row[p] = found ? found.value : null;
    }
    return row;
  });

  const multi = periods.length > 1;

  // SVG geometry
  const width = 720;
  const labelW = 168;
  const rightPad = 56;
  const rowGap = multi ? 14 : 10;
  const barH = multi ? 12 : 22;
  const rowH = multi ? barH * periods.length + 6 + rowGap : barH + rowGap;
  const topPad = 10;
  const bottomPad = 34;
  const height = topPad + rowH * groups.length + bottomPad;

  // Compute max across all values for x-axis scale
  const allVals = Object.values(panel.series).flatMap((s) =>
    s.map((b) => b.value)
  );
  const maxV = Math.max(...allVals);
  // Round up to a nice number for the axis
  const niceMax = niceCeil(maxV);
  const xStart = labelW;
  const xEnd = width - rightPad;
  const scale = (v: number) => xStart + (v / niceMax) * (xEnd - xStart);

  // Axis ticks: 0, 25%, 50%, 75%, 100% of niceMax
  const tickCount = 4;
  const ticks = Array.from({ length: tickCount + 1 }, (_, i) =>
    Math.round((niceMax * i) / tickCount)
  );

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      className="w-full h-auto"
      role="img"
      aria-label={`${panel.metric} by group`}
    >
      {/* Gridlines */}
      {ticks.map((t) => (
        <line
          key={`grid-${t}`}
          x1={scale(t)}
          x2={scale(t)}
          y1={topPad}
          y2={height - bottomPad}
          stroke="#E2E8F0"
          strokeWidth={1}
          strokeDasharray={t === 0 ? "" : "2 3"}
        />
      ))}

      {/* Bars + labels */}
      {rows.map((row, i) => {
        const rowY = topPad + i * rowH;
        const label = row.group as string;
        return (
          <g key={label}>
            {/* Group label */}
            <text
              x={labelW - 10}
              y={rowY + rowH / 2}
              dominantBaseline="middle"
              textAnchor="end"
              fontSize={12.5}
              fill="#475569"
              fontFamily="Inter,Helvetica,Arial,sans-serif"
            >
              {truncate(label, 22)}
            </text>

            {/* Bar(s) */}
            {periods.map((p, pi) => {
              const v = row[p];
              if (v == null || typeof v !== "number") return null;
              const barY = multi
                ? rowY + 3 + pi * barH
                : rowY + (rowH - rowGap - barH) / 2;
              const fill = multi
                ? style.seriesColors[pi] ?? style.base
                : style.highlight.includes(label)
                  ? style.accent
                  : style.base;
              return (
                <g key={`${label}-${p}`}>
                  <rect
                    x={xStart}
                    y={barY}
                    width={scale(v) - xStart}
                    height={barH}
                    fill={fill}
                    rx={2}
                  />
                  {/* Value label at end of bar */}
                  <text
                    x={scale(v) + 6}
                    y={barY + barH / 2}
                    dominantBaseline="middle"
                    textAnchor="start"
                    fontSize={11}
                    fill="#0F2A4A"
                    fontFamily="Inter,Helvetica,Arial,sans-serif"
                    fontWeight={500}
                  >
                    {formatFull(v, panel.unit)}
                  </text>
                </g>
              );
            })}
          </g>
        );
      })}

      {/* X-axis ticks */}
      {ticks.map((t) => (
        <text
          key={`tick-${t}`}
          x={scale(t)}
          y={height - bottomPad + 16}
          textAnchor="middle"
          fontSize={11}
          fill="#94A3B8"
          fontFamily="Inter,Helvetica,Arial,sans-serif"
        >
          {formatAxis(t, panel.unit)}
        </text>
      ))}

      {/* Legend for multi-period */}
      {multi && (
        <g transform={`translate(${labelW}, ${height - 14})`}>
          {periods.map((p, pi) => (
            <g key={`legend-${p}`} transform={`translate(${pi * 90}, 0)`}>
              <rect
                x={0}
                y={-8}
                width={14}
                height={10}
                fill={style.seriesColors[pi] ?? style.base}
                rx={2}
              />
              <text
                x={20}
                y={0}
                fontSize={11}
                fill="#475569"
                fontFamily="Inter,Helvetica,Arial,sans-serif"
              >
                {p}
              </text>
            </g>
          ))}
        </g>
      )}
    </svg>
  );
}

// Round a value up to the next nice-looking axis max.
function niceCeil(v: number): number {
  if (v <= 0) return 1;
  const exp = Math.floor(Math.log10(v));
  const base = Math.pow(10, exp);
  const norm = v / base; // 1 .. 10
  let nice: number;
  if (norm <= 1) nice = 1;
  else if (norm <= 2) nice = 2;
  else if (norm <= 2.5) nice = 2.5;
  else if (norm <= 5) nice = 5;
  else nice = 10;
  return nice * base;
}

function truncate(s: string, max: number): string {
  return s.length <= max ? s : s.slice(0, max - 1) + "…";
}
