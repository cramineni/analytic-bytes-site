import fs from "node:fs";
import path from "node:path";
import type { Dashboard, DashboardExt } from "../types/dashboard";

// Reads the files the public-data-decision-systems pipeline emits.
// The export step (export/build_dashboard_json.py) writes/copies
// dashboard.json to /public/data/pdds-dashboard.json (main track,
// frozen six panels) and dashboard_ext.json to
// /public/data/pdds-dashboard-ext.json (extension track, panels
// admitted through revised governance gates — see
// FIELD_NOTE_gates_for_messy_data.md). Server-side only —
// call from a Server Component.

export function getPddsDashboard(): Dashboard {
  const file = path.join(
    process.cwd(),
    "public",
    "data",
    "pdds-dashboard.json"
  );
  return JSON.parse(fs.readFileSync(file, "utf8")) as Dashboard;
}

export function getPddsDashboardExt(): DashboardExt | null {
  const file = path.join(
    process.cwd(),
    "public",
    "data",
    "pdds-dashboard-ext.json"
  );
  if (!fs.existsSync(file)) return null;
  return JSON.parse(fs.readFileSync(file, "utf8")) as DashboardExt;
}
