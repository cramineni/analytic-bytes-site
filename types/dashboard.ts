// Types matching the export/build_dashboard_json.py output (dashboard.json)
// from the public-data-decision-systems pipeline.

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
  value: number;
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
}

export interface Panel {
  panel_id: string;
  metric: string;
  unit: string;
  series: Record<string, Bar[]>; // keyed by period, e.g. "2023"
  gap?: Gap;
  lever?: Lever | null;
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
