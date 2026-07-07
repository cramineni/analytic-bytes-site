import fs from "node:fs";
import path from "node:path";
import type { Dashboard } from "../types/dashboard";

// Reads the file the public-data-decision-systems pipeline emits.
// The export step (export/build_dashboard_json.py) writes/copies
// dashboard.json to /public/data/pdds-dashboard.json in this repo.
// Server-side only — call from a Server Component.
export function getPddsDashboard(): Dashboard {
  const file = path.join(
    process.cwd(),
    "public",
    "data",
    "pdds-dashboard.json"
  );
  return JSON.parse(fs.readFileSync(file, "utf8")) as Dashboard;
}
