# Editorial Followups Log

Parking lot for editorial issues surfaced during a fold that couldn't be resolved mechanically — either because they require an authorial decision (a specific memory, a snarky aside, a voice call) or because they got deferred for time.

**Standing rule:** every fold thread should scan this file at the start and offer to close any items relevant to the piece being folded. When new followups get flagged, append them here with date + piece + issue + suggested placement.

---

## What Gate 10 (Idiosyncratic voice moment) actually is

From `AB_Editorial_Standard.md`, Gate 10 asks: does the piece contain at least one sentence that sounds unmistakably like Chaitanya — a specific memory, a dated aside, a wry observation, an outside-domain reference, a moment that only she would write? Without it, essays can read as clean framework prose that any careful writer could have produced. With it, the piece carries her fingerprint.

**Examples of the shape:**
- A specific memory: *"In 2005, in a small town, the science teacher who ran the CBIT program also ran the grade-level assessments — because the accountability data had to go somewhere and no one else was going to touch it."*
- A dated aside: *"Two months into the audit I killed a hypothesis I'd carried for three years. That should have taken three weeks with proper instruments."*
- A wry observation: *"Every operator working with AI is already doing practitioner AI governance, badly or well. Almost none are doing it with measurement discipline attached."* ← this one actually landed in FN12, so FN12 is closer than the flag suggested
- An outside-domain reference: bringing in cricket, dosa physics, a piece of Telugu grammar — anything that anchors the argument in a specific life, not a generic one.

**Where to place it:** anywhere it lands naturally. Common spots: the opener (setting the scene from lived experience), inside a numbered finding (a personal caveat on the finding), the closing paragraphs (dating what came next). Avoid forcing it into a rhythmic slot; the aside works when it's the one place the writer stopped being framework-y and became specific.

**Test:** cover the aside with your finger and re-read the paragraph without it. If nothing is lost, the aside was decorative. If a specific hook goes missing, the aside was earning its place.

---

## Open items

### FN12 — Auditing an AI-native practice (2026-08-04)

**Issue:** Piece reads clean/framework-y. Editorial audit flagged missing Gate 10 idiosyncratic moment.

**On reflection:** the piece may actually contain a Gate-10 line already — *"Every operator working with AI is already doing practitioner AI governance, badly or well. Almost none are doing it with measurement discipline attached."* — that's the writer's voice, not framework voice. Worth a second read to decide whether to add another aside or accept this one already carries the fingerprint.

**Suggested placement if adding another:**
- Opener of "Handling the N=1" section (a dated line about what a prior audit taught you)
- Finding #4 (dispatch discipline) — "operator confessing what she doesn't measure yet" moment
- Final paragraph before "The instrument this piece describes is v1..." — a one-line aside on what the audit revealed you were wrong about

**Status:** deferred, author to decide.

---

### HTML artifacts palette — 2nd-pass polish (2026-08-05)

**Issue:** The 4 HTML artifacts (`governance-craft-card`, `governance-craft-log`, `dialogue-maturity-curve`, `ab-governance-maturity-scorecard`) had a bulk color-token swap to AB primary palette (navy, teal, slate). Chrome now conforms. 6-28 off-palette hexes remain per file, mostly pastel status badges and chart series-encoding (phase pips, dimension colors).

**Status:** primary AB alignment shipped. Second-pass polish deferred.

**Suggested moves:**
- Semantic status pills — remap to shades of `#0EA5E9` (teal), `#94A3B8` (slate), `#6B7A8C` (mid-slate) with opacity/tint variations for weight, rather than pastel red/yellow/green/lavender.
- Chart series-encoding — use `#0F2A4A` (navy), `#0EA5E9` (teal), `#94A3B8` (slate), `#B4C0CC` (muted grey) as the 4-color rotation. Beyond 4 series, add opacity variants.
- One stray `#2a1745` lowercase in governance-craft-log — case-sensitivity edge case my sweep missed; quick manual cleanup.

**Priority:** low. Artifacts render cleanly inside AB iframe; the internal encoding colors read as "inside data visualization" rather than clashing with brand chrome.

---

### E13 — Before it was called AI evaluation (2026-08-05)

**Issue:** Em-dash count 23 in body (ceiling ~15-18 for a 14-min piece). Extraction from a substantial 3527-word MD carried more em-dashes than the editorial ceiling. The piece publishes with them; a follow-up sweep should cut 5-8, especially bracket-pair patterns like "X — Y —" inside sentences.

**Suggested moves:**
- Convert bracket-pair em-dashes to parentheses: `X — clause — Y` → `X (clause) Y`
- Collapse em-dash-and-restart into commas: `X — and Y` → `X, and Y`
- Preserve em-dashes where they mark a genuine caesura or shift, not decoration

**Status:** deferred, low-priority polish. Piece is publishable as-is.

---

## Closed items

*(none yet)*
