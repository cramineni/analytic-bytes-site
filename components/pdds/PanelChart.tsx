import type { Panel } from "@/types/dashboard";
import { formatAxis, formatFull, panelStyle } from "@/lib/pdds-format";

// Horizontal SVG bar chart. Server-rendered (no client hydration, no chart
// library). Single-period panels colour each bar individually (accent for
// highlighted groups); multi-period panels (e.g. overdose 2023 vs 2024) draw
// one bar per period per group. Sits inside the surrounding <section>; sizes
// itself to fit whatever the container gives it.
//
// Layout guard (added 2026-08-04 with Panel 08 absenteeism): a "single-unit
// multi-year" panel — exactly one group, three or more periods — flips to
// year-on-Y layout (one bar per year). Missing cells render as an italic
// "Not reported" row rather than a gap. The guard is geometry-based so no
// frozen panel can accidentally trigger it; only extension-track panels
// with the SUMY shape use this branch. Readmissions (2 periods) stays.
export default function PanelChart({ panel }: { panel: Panel }) {
  const periods = Object.keys(panel.series).sort();
  const style = panelStyle(panel.panel_id);
  const latest = periods[periods.length - 1];
  const groups = panel.series[latest].map((b) => b.group);

  // SUMY layout: one group, 3+ periods → year-on-Y single-column bars.
  const isSUMY = groups.length === 1 && periods.length >= 3;
  if (isSUMY) return <SUMYChart panel={panel} periods={periods} style={style} />;

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
  // Does any bar in the latest period carry a CI tuple? If so we render
  // whiskers on the bars and drop a small legend row at the bottom.
  const hasCI =
    !multi && panel.series[latest].some((b) => Array.isArray(b.ci));

  // SVG geometry
  const width = 720;
  // labelW was 168 — too tight for AI/AN, Native Hawaiian/PI, and
  // Massachusetts Institute of Technology. Widened to 200 and combined
  // with two-line wrapping (see renderLabel below) to handle 30+ char
  // groups without truncation.
  const labelW = 200;
  const rightPad = 56;
  const rowGap = multi ? 14 : 10;
  const barH = multi ? 12 : 22;
  const rowH = multi ? barH * periods.length + 6 + rowGap : barH + rowGap;
  const topPad = 10;
  // bottomPad reserves two rows below the axis line:
  //   - x-axis tick labels (0, 25, 50, ...) at height - bottomPad + 16
  //   - legend swatches (multi-period only, or CI legend for survey
  //     panels) at height - 14
  // Previously bottomPad was 34, which put both on the same line and
  // the year labels stacked directly on top of the tick numbers.
  const bottomPad = multi ? 56 : hasCI ? 52 : 34;
  const height = topPad + rowH * groups.length + bottomPad;

  // Compute max across all values for x-axis scale. Filter out null cells
  // (extension-track "missing" bars) so they don't confuse the domain.
  const allVals = Object.values(panel.series)
    .flatMap((s) => s.map((b) => b.value))
    .filter((v): v is number => typeof v === "number");
  const maxV = allVals.length > 0 ? Math.max(...allVals) : 1;
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
        // Look up the raw bar for this row+latest-period so we can pull
        // survey-track fields the pivoted rows[] shape drops (ci, note).
        // Only used for the single-period layout below; multi-period
        // panels don't carry ci in current data.
        const latestBar = !multi
          ? panel.series[latest].find((b) => b.group === label)
          : undefined;
        return (
          <g key={label}>
            {/* Group label — wraps to two lines if it exceeds the
                single-line budget, split at a natural boundary. */}
            {(() => {
              const lines = wrapLabel(label, 26);
              const cy = rowY + rowH / 2;
              const x = labelW - 10;
              const common = {
                textAnchor: "end" as const,
                fontSize: 12.5,
                fill: "#475569",
                fontFamily: "Inter,Helvetica,Arial,sans-serif",
              };
              if (lines.length === 1) {
                return (
                  <text x={x} y={cy} dominantBaseline="middle" {...common}>
                    {lines[0]}
                  </text>
                );
              }
              // Two lines, centered vertically around cy.
              // Each line ~12.5px; total two-line block ~28px. Placing
              // baselines at cy-6 and cy+8 puts the visual midpoint of
              // the pair right on cy.
              return (
                <text {...common}>
                  <tspan x={x} y={cy - 6}>
                    {lines[0]}
                  </tspan>
                  <tspan x={x} y={cy + 8}>
                    {lines[1]}
                  </tspan>
                </text>
              );
            })()}

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
              // CI whisker: only survey bars carry a ci tuple, only
              // present it on the single-period layout (multi-period
              // data in this codebase doesn't have CIs yet). Whisker
              // sits centered on the bar, using accent teal so it reads
              // against both a navy bar and the white background it
              // extends onto past the bar tip.
              const ci = !multi ? latestBar?.ci : undefined;
              const showCI = !multi && Array.isArray(ci);
              const ciCenterY = barY + barH / 2;
              const capH = 8;
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
                  {showCI && (
                    <g>
                      {/* Horizontal whisker line */}
                      <line
                        x1={scale(ci![0])}
                        x2={scale(ci![1])}
                        y1={ciCenterY}
                        y2={ciCenterY}
                        stroke="#0EA5E9"
                        strokeWidth={1.5}
                      />
                      {/* Left cap (low) */}
                      <line
                        x1={scale(ci![0])}
                        x2={scale(ci![0])}
                        y1={ciCenterY - capH / 2}
                        y2={ciCenterY + capH / 2}
                        stroke="#0EA5E9"
                        strokeWidth={1.5}
                      />
                      {/* Right cap (high) */}
                      <line
                        x1={scale(ci![1])}
                        x2={scale(ci![1])}
                        y1={ciCenterY - capH / 2}
                        y2={ciCenterY + capH / 2}
                        stroke="#0EA5E9"
                        strokeWidth={1.5}
                      />
                    </g>
                  )}
                  {/* Value label at end of bar (or past CI-high, whichever
                      is further right, so labels don't sit inside the
                      whisker). */}
                  <text
                    x={(showCI ? scale(Math.max(v, ci![1])) : scale(v)) + 6}
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
      {/* Legend for CI whiskers (survey panels only) */}
      {hasCI && (
        <g transform={`translate(${labelW}, ${height - 12})`}>
          {/* Mini whisker glyph */}
          <line x1={0} x2={0} y1={-4} y2={4} stroke="#0EA5E9" strokeWidth={1.5} />
          <line x1={0} x2={22} y1={0} y2={0} stroke="#0EA5E9" strokeWidth={1.5} />
          <line x1={22} x2={22} y1={-4} y2={4} stroke="#0EA5E9" strokeWidth={1.5} />
          <text
            x={30}
            y={0}
            dominantBaseline="middle"
            fontSize={11}
            fill="#475569"
            fontFamily="Inter,Helvetica,Arial,sans-serif"
          >
            95% confidence interval
          </text>
        </g>
      )}
    </svg>
  );
}

// SUMY (single-unit multi-year) layout: years down the Y-axis, one bar per
// year, one column of the group's value. Missing cells render an italic
// "Not reported — pandemic series break" line instead of a bar. No legend
// (each row is a year — color would be redundant).
function SUMYChart({
  panel,
  periods,
  style,
}: {
  panel: Panel;
  periods: string[];
  style: ReturnType<typeof panelStyle>;
}) {
  const group = panel.series[periods[periods.length - 1]][0].group;

  // For each period, look up the value and any missing-cell note.
  const rows = periods.map((p) => {
    const bar = panel.series[p].find((b) => b.group === group);
    return {
      period: p,
      value: bar?.value ?? null,
      missing: bar?.cell_state === "missing",
      note: bar?.note ?? null,
    };
  });

  // Geometry — narrower label column since Y is just 4-digit years.
  const width = 720;
  const labelW = 80;
  const rightPad = 56;
  const rowGap = 12;
  const barH = 20;
  const rowH = barH + rowGap;
  const topPad = 10;
  const bottomPad = 34; // room for x-axis ticks; no legend
  const height = topPad + rowH * rows.length + bottomPad;

  // X domain: nice-ceil over present values only.
  const presentVals = rows
    .map((r) => r.value)
    .filter((v): v is number => typeof v === "number");
  const maxV = presentVals.length > 0 ? Math.max(...presentVals) : 1;
  const niceMax = niceCeil(maxV);
  const xStart = labelW;
  const xEnd = width - rightPad;
  const scale = (v: number) => xStart + (v / niceMax) * (xEnd - xStart);

  const tickCount = 4;
  const ticks = Array.from({ length: tickCount + 1 }, (_, i) =>
    Math.round((niceMax * i) / tickCount)
  );

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      className="w-full h-auto"
      role="img"
      aria-label={`${panel.metric} for ${group} by year`}
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

      {rows.map((r, i) => {
        const rowY = topPad + i * rowH;
        const cy = rowY + rowH / 2;
        // Series color per period if provided, else base.
        const fill = style.seriesColors[i] ?? style.base;
        return (
          <g key={r.period}>
            <text
              x={labelW - 10}
              y={cy}
              dominantBaseline="middle"
              textAnchor="end"
              fontSize={12.5}
              fill="#475569"
              fontFamily="Inter,Helvetica,Arial,sans-serif"
            >
              {r.period}
            </text>
            {typeof r.value === "number" ? (
              <>
                <rect
                  x={xStart}
                  y={rowY + (rowH - rowGap - barH) / 2}
                  width={scale(r.value) - xStart}
                  height={barH}
                  fill={fill}
                  rx={2}
                />
                <text
                  x={scale(r.value) + 6}
                  y={cy}
                  dominantBaseline="middle"
                  textAnchor="start"
                  fontSize={11}
                  fill="#0F2A4A"
                  fontFamily="Inter,Helvetica,Arial,sans-serif"
                  fontWeight={500}
                >
                  {formatFull(r.value, panel.unit)}
                </text>
              </>
            ) : (
              <text
                x={xStart}
                y={cy}
                dominantBaseline="middle"
                textAnchor="start"
                fontSize={11.5}
                fontStyle="italic"
                fill="#94A3B8"
                fontFamily="Inter,Helvetica,Arial,sans-serif"
              >
                Not reported &mdash; pandemic series break
              </text>
            )}
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

// Break a long group name into two lines at a natural boundary — space,
// slash, or hyphen — near the middle of the string. Falls back to a hard
// character split only if no break candidate exists.
// Returns a single-element array if the label already fits maxSingleLine.
function wrapLabel(label: string, maxSingleLine: number): string[] {
  if (label.length <= maxSingleLine) return [label];

  // Candidates: positions of space, slash, or hyphen. Prefer the one
  // closest to the string's midpoint so both lines land roughly balanced.
  const breakChars = new Set([" ", "/", "-"]);
  const mid = label.length / 2;
  const candidates: number[] = [];
  for (let i = 0; i < label.length; i++) {
    if (breakChars.has(label[i])) candidates.push(i);
  }
  if (candidates.length === 0) {
    // No natural break — hard-split at mid, truncate second half if huge.
    const cut = Math.ceil(mid);
    return [label.slice(0, cut), truncate(label.slice(cut), maxSingleLine)];
  }

  // Pick the break candidate closest to the midpoint.
  candidates.sort((a, b) => Math.abs(a - mid) - Math.abs(b - mid));
  const cut = candidates[0];
  // If break is a space, drop it. Slashes and hyphens stay with line 1.
  const line1 =
    label[cut] === " " ? label.slice(0, cut) : label.slice(0, cut + 1);
  const line2Start = label[cut] === " " ? cut + 1 : cut + 1;
  const line2 = label.slice(line2Start);
  return [
    truncate(line1, maxSingleLine),
    truncate(line2, maxSingleLine),
  ];
}
