// Presentation config + formatting for PDDS panels. This is the ONE place panel
// titles, colours, and number formats live, so the render layer stays a single
// source of truth (the data itself comes from pdds-dashboard.json).
//
// Colour convention (locked 2026-07-10):
//   AB visual grammar is navy = structure, teal = signal / accent claim.
//   In PDDS every bar is a data point of equal weight — the distribution
//   IS the claim, so no single bar earns teal. All bars render navy
//   #0F2A4A. Multi-period panels use muted grey #B4C0CC for the baseline
//   year to separate it from the current year visually. Teal stays for
//   AB brand surfaces around the panels (nav, /library callout, hover
//   accents), not inside the bar charts themselves.
//   Palette: navy #0F2A4A · teal #0EA5E9 · muted grey #B4C0CC

export interface PanelStyle {
  base: string;
  accent: string;
  seriesColors: string[]; // by period order; used when a panel has >1 period
  highlight: string[]; // group names drawn in accent (single-period panels)
}

const STYLES: Record<string, PanelStyle> = {
  // Multi-period: muted-grey baseline year + navy current year.
  overdose: {
    base: "#0F2A4A",
    accent: "#0EA5E9",
    seriesColors: ["#B4C0CC", "#0F2A4A"],
    highlight: [],
  },
  naep: {
    base: "#0F2A4A",
    accent: "#0EA5E9",
    seriesColors: ["#B4C0CC", "#0F2A4A"],
    highlight: [],
  },
  maternal: {
    base: "#0F2A4A",
    accent: "#0EA5E9",
    seriesColors: ["#B4C0CC", "#0F2A4A"],
    highlight: [],
  },
  // Single-period: navy across, no highlights.
  // (The old "National median program" highlight was retired 2026-07-10
  // — the pipeline no longer returns that group, and the movement_note
  // carries the reference framing in prose.)
  scorecard: {
    base: "#0F2A4A",
    accent: "#0EA5E9",
    seriesColors: ["#0F2A4A"],
    highlight: [],
  },
  slds: {
    base: "#0F2A4A",
    accent: "#0EA5E9",
    seriesColors: ["#0F2A4A"],
    highlight: [],
  },
  // Multi-period: 2010 pre-HRRP baseline in muted, 2016 post-HRRP in navy.
  readmissions: {
    base: "#0F2A4A",
    accent: "#0EA5E9",
    seriesColors: ["#B4C0CC", "#0F2A4A"],
    highlight: [],
  },
};

export function panelStyle(id: string): PanelStyle {
  return (
    STYLES[id] ?? {
      base: "#0F2A4A",
      accent: "#0EA5E9",
      seriesColors: ["#0F2A4A"],
      highlight: [],
    }
  );
}

export const PANEL_META: Record<string, { title: string; subtitle: string }> = {
  overdose: {
    title: "Drug overdose death rate by race",
    subtitle: "Deaths per 100,000, 2023 vs 2024",
  },
  naep: {
    title: "NAEP grade 8 math score by race",
    subtitle: "Average scale score, 2022 vs 2024 (public school students)",
  },
  maternal: {
    title: "Maternal mortality rate by race",
    subtitle: "Deaths per 100,000 live births, 2022 vs 2023",
  },
  scorecard: {
    title: "Computer science median earnings by school",
    subtitle:
      "Median earnings 4 years after completion, Title IV recipients — College Scorecard field-of-study API",
  },
  slds: {
    title: "Post-completion wages by credential",
    subtitle:
      "Median wages 5 years after graduation — Virginia Longitudinal Data System, 2024",
  },
  readmissions: {
    title: "Medicare 30-day readmission rate",
    subtitle:
      "Fee-for-service, all conditions, 2010 (pre-HRRP) vs 2016 (post-HRRP)",
  },
};

export function panelMeta(id: string) {
  return PANEL_META[id] ?? { title: id, subtitle: "" };
}

// Compact axis label.
export function formatAxis(v: number, unit: string): string {
  if (unit === "usd") return "$" + Math.round(v / 1000) + "k";
  if (unit === "percent") return v + "%";
  return String(v);
}

// Full tooltip / inline value.
export function formatFull(v: number, unit: string): string {
  if (unit === "usd") return "$" + v.toLocaleString();
  if (unit === "per_100k" || unit === "per_100k_births") return v + " per 100k";
  if (unit === "scale_score") return v + " pts";
  if (unit === "percent") return v + "%";
  return String(v);
}

// Headline card value.
export function formatHeadline(v: number, unit: string): string {
  switch (unit) {
    case "count":
      return v.toLocaleString();
    case "years":
      return v.toFixed(1);
    case "usd":
      return "$" + v.toLocaleString();
    case "scale_points":
      return v + " pts";
    case "per_100k_births":
      return v.toString();
    // "ratio" was added 2026-07-12 when the maternal headline was reframed
    // from aggregate rate to Black-White gap. The × makes it read as a
    // multiplier rather than a bare scalar.
    case "ratio":
      return v.toFixed(1) + "×";
    // "percent" was added 2026-07-14 with the readmissions panel — the
    // Medicare 30-day readmission rate is expressed as a percentage.
    case "percent":
      return v.toFixed(1) + "%";
    default:
      return String(v);
  }
}
