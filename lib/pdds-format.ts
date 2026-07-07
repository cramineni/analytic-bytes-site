// Presentation config + formatting for PDDS panels. This is the ONE place panel
// titles, colours, and number formats live, so the render layer stays a single
// source of truth (the data itself comes from pdds-dashboard.json).
//
// Colour palette matches the AB visual language:
//   navy #0F2A4A  · teal #0EA5E9  · muted #6B7A8C
// Each panel picks one of navy / teal as its primary. The "highlight" accent
// draws attention to a specific group inside a panel.

export interface PanelStyle {
  base: string;
  accent: string;
  seriesColors: string[]; // by period order; used when a panel has >1 period
  highlight: string[]; // group names drawn in accent (single-period panels)
}

const STYLES: Record<string, PanelStyle> = {
  // Multi-period: 2023 in muted, 2024 in teal (the year the number moved).
  overdose: {
    base: "#0F2A4A",
    accent: "#0EA5E9",
    seriesColors: ["#B4C0CC", "#0EA5E9"],
    highlight: [],
  },
  // Single-period: navy across, no highlight.
  naep: {
    base: "#0F2A4A",
    accent: "#0EA5E9",
    seriesColors: ["#0F2A4A"],
    highlight: [],
  },
  // Single-period: navy across.
  maternal: {
    base: "#0F2A4A",
    accent: "#0EA5E9",
    seriesColors: ["#0F2A4A"],
    highlight: [],
  },
  // Single-period: navy across, teal highlight on the national median.
  scorecard: {
    base: "#0F2A4A",
    accent: "#0EA5E9",
    seriesColors: ["#0F2A4A"],
    highlight: ["National median program"],
  },
  // Single-period: navy across. Two bars only; the surprise IS the comparison
  // (associate transfer earnings sitting close to bachelor's), so no highlight.
  slds: {
    base: "#0F2A4A",
    accent: "#0EA5E9",
    seriesColors: ["#0F2A4A"],
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
    subtitle: "Average scale score, 2022 (public school students)",
  },
  maternal: {
    title: "Maternal mortality rate by race",
    subtitle: "Deaths per 100,000 live births, 2023",
  },
  scorecard: {
    title: "Computer science median earnings by school",
    subtitle: "College Scorecard field-of-study earnings",
  },
  slds: {
    title: "Post-completion wages by credential",
    subtitle:
      "Median wages 5 years after graduation — Virginia Longitudinal Data System, 2024",
  },
};

export function panelMeta(id: string) {
  return PANEL_META[id] ?? { title: id, subtitle: "" };
}

// Compact axis label.
export function formatAxis(v: number, unit: string): string {
  if (unit === "usd") return "$" + Math.round(v / 1000) + "k";
  return String(v);
}

// Full tooltip / inline value.
export function formatFull(v: number, unit: string): string {
  if (unit === "usd") return "$" + v.toLocaleString();
  if (unit === "per_100k" || unit === "per_100k_births") return v + " per 100k";
  if (unit === "scale_score") return v + " pts";
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
    default:
      return String(v);
  }
}
