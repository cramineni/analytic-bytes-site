// Types matching the export/build_dashboard_json.py output (dashboard.json)
// from the public-data-decision-systems pipeline.
//
// Two tracks:
//   - MAIN: /public/data/pdds-dashboard.json — the frozen six panels.
//   - EXTENSION: /public/data/pdds-dashboard-ext.json — messy survey and
//     heterogeneous administrative panels admitted through revised
//     governance gates (see FIELD_NOTE_gates_for_messy_data.md). Panels
//     declare data_class + lever_type; some carry comparison_withheld
//     to make governance decisions visible on the page.

export interface HeadlineCard {
  card_id: string;
  label: string;
  value: number;
  unit: string;
  period: number;
  source_url: string;
}

export interface Bar {
  group: string;
  value: number | null;
  // Extension-track additions (2026-08-03): per-cell provenance stamp and
  // explicit missing-cell handling. Missing cells carry `cell_state:
  // "missing"` and a `note` explaining why the series has a break rather
  // than an interpolation. Main-track panels leave these unset.
  provenance?: string;
  cell_state?: "missing" | "present";
  note?: string;
}

export interface Gap {
  period: number;
  absolute_gap: number;
  ratio_high_to_low: number;
}

export interface Lever {
  lever: string;
  status_badge: string;
  movement_note: string;
  source_url: string;
  // Extension-track carries these too (set on both panel and lever).
  data_class?: "survey" | "administrative";
  lever_type?: "point" | "continuous";
  panel_id?: string;
}

// Extension-track: NJ-vs-neighbor comparison held off the axis until each
// unit's denominator-reconciliation is published alongside it. Making the
// governance decision visible is the panel's whole point — the "here's
// what I did NOT compare, and why" callout below the chart.
export interface ComparisonWithheld {
  anchor: string;
  anchor_excused_treatment?: string;
  units: {
    group: string;
    periods: number[];
    denominator_rule?: string;
    excused_treatment?: string;
  }[];
  note: string;
}

export interface Panel {
  panel_id: string;
  metric: string;
  unit: string;
  series: Record<string, Bar[]>; // keyed by period, e.g. "2023"
  gap?: Gap;
  lever?: Lever | null;
  // Extension-track additions (2026-08-03): each panel declares its data
  // class + lever type, which decides which governance gates apply.
  // comparison_withheld makes the "not-compared, and why" callout explicit.
  data_class?: "survey" | "administrative";
  lever_type?: "point" | "continuous";
  comparison_withheld?: ComparisonWithheld;
}

export interface Source {
  source_id: string;
  title: string;
  publisher: string;
  url: string;
  table_ref: string;
  release_date: string;
}

export interface Dashboard {
  generated_at: string;
  note?: string;
  headlines: HeadlineCard[];
  panels: Panel[];
  sources?: Source[];
}

// Extension-track dashboard (separate JSON, no headline cards — the
// extension track ships panels only; the main dashboard owns the
// summary headlines).
export interface DashboardExt {
  generated_at: string;
  track: "extension";
  round?: string;
  note?: string;
  panels: Panel[];
  sources?: Source[];
}
