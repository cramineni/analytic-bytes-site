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
  // Extension track — NJ chronic absenteeism. Six periods (2019–2024) with
  // two missing (2020, 2021 held blank as series break, not interpolated).
  // Muted grey for pre-pandemic + missing-cell periods, navy for the
  // 2022–2024 in-scope years the corrective-action trigger reads against.
  absenteeism: {
    base: "#0F2A4A",
    accent: "#0EA5E9",
    seriesColors: ["#B4C0CC", "#B4C0CC", "#B4C0CC", "#0F2A4A", "#0F2A4A", "#0F2A4A"],
    highlight: [],
  },
  // Extension track — NSCH flourishing (Panel 07). Single-period, survey data
  // across five states + national. Mirrors the PDDS pipeline's own web/lib
  // styling: Nationwide reads as the accent anchor, states muted in slate.
  // Reader's eye lands on the national reference first, then scans states
  // against it with a visual sense of "not distinguishable from" — which is
  // exactly the CI overlap story the movement_note tells.
  //
  // accent is a shade darker than the site-wide accent so the anchor bar
  // has enough value-contrast against the (light) accent-teal CI whiskers
  // that overlay it. Whiskers stay bright accent (uncertainty = feature);
  // anchor bar is heavier accent (authority). Same hue family, two weights.
  nsch: {
    base: "#B4C0CC",
    accent: "#0369A1",
    seriesColors: ["#B4C0CC"],
    highlight: ["Nationwide"],
  },
  // Extension track — YRBSS mental-health indicators (Panel 09). Single-period,
  // survey data across four adolescent mental-health items. Same navy palette;
  // the extension-track panel handles data-class + comparison-withheld framing.
  yrbss: {
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
  absenteeism: {
    title: "New Jersey chronic absenteeism rate",
    subtitle:
      "Share of students absent 10%+ of enrolled days, 2019–2024 (NJDOE state statistic; 2020–2021 held blank as series break)",
  },
  nsch: {
    title: "Child flourishing by state",
    subtitle:
      "Share of children ages 6–17 meeting all three flourishing items, 2023 (National Survey of Children's Health, HRSA MCHB)",
  },
  yrbss: {
    title: "Adolescent mental-health indicators",
    subtitle:
      "Share of U.S. high-school students reporting each condition, 2023 (Youth Risk Behavior Surveillance System, CDC)",
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
