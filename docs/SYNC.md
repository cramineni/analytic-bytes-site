# AB Library Sync Table

**Where this file lives:** `/Users/ChaitanyaRamineni/Desktop/ab-library-content-deploy/docs/SYNC.md`. Moved here 2026-07-15 from `~/Desktop/AB_LibrarySyncTable.md` so it travels with the deploy artifact. Any thread that gets the deploy folder path sees this file automatically — no separate hand-off protocol needed.

**Canonical map of every library piece:** slug ↔ markdown source ↔ last-sync state.

**Canonical markdown location** (single source of truth for essay bodies):
`/Users/ChaitanyaRamineni/Desktop/Claude/AB Strategy & Lirbary/AB_Library_Essays/markdown_sources/`

**Update rule**: I regenerate this table on every deploy zip build. Compare `MD_mtime` against `deploy_mtime` — if MD is newer, that piece needs a mechanical diff + fold before the next push. If the diff shows substantive prose difference (compression, expansion, argument change), I show the raw diff and ask before folding. No unilateral edits.

**Last regenerated:** 2026-07-15 02:05 (Thumbnails MD folded to match JSX prose — 3 sentence updates: "Not because human attention got cheaper", italicized *thumbnail or full picture?* question, "Now you can. And now you should." close. WWC MD anonymization completed — Qualtrics/RStudio/Stata tool list generalized, "national youth mental-health foundation" → "national mission-driven foundation", hiring-loop parenthetical simplified. TBOI MD verified current — multi-speed maturity Figure present in correct position; frontmatter date matches JSX.) Also 2026-07-16: WWC JSX brought current with MD draft — expanded title list, added ed-tech/COO reporting-line details, regulated-sectors HIPAA/FERPA/SOC2/GLBA/PCI paragraph, inserted 2 Figures (skill-tier chart + role-landscape map), replaced first-person hiring-loop paragraph with de-personalized pattern + live-scan paragraphs. Also 2026-07-16 22:13: WWC MD post-editorial fold — 11 edits: reporting-line paragraph adds tech/ed-tech CTO lead + university CDO/Assoc-CIO sentence, "single-role fusion" reframe, dropped "often" from rubric-capture, "semantic-and-decision-authoring tier that the role actually needs", depersonalization sweep ("this essay" → "the observations above"/"named earlier"/"is being diagnosed here"), operator's-test authority em-dash + "and", /library page artifact summary updated Seven→Fifteen. Standalone WWC artifact SVG swapped from wrong 7-role compact map (9547 B) to correct 15-role landscape (22191 B).

---

## Metadata sync — standing pre-deploy check (added 2026-07-15)

**Rule**: every canonical MD in `markdown_sources/` MUST carry a YAML frontmatter block with these keys, populated to match JSX truth:

```
---
title: "..."
subtitle: "..."
summary: "..."
author: "Chaitanya Ramineni"
date: "YYYY-MM-DD"       # NO placeholder like "2026-07-XX"
cover: "/library/covers/<slug>.svg"
type: "essay" | "field-note"
number: "NN"
arc: "measurement" | "integration-governance" | "ai-systems" | "organizational-design"
readingTime: "N min read"
---
```

**Before every deploy zip build, I run:**
1. Parse every JSX essay entry: `kind, slug, number, title, subtitle, summary, date, cover, arc, readingTime`
2. Resolve `slug → canonical MD filename` via the Registry table below (filename ≠ slug for six pieces — do not infer from slug alone)
3. For each MD: parse frontmatter, diff against JSX truth
4. If any frontmatter is missing/stale, fix it before shipping the zip
5. Log the audit result in the "Last regenerated" line

Script for the check lives in-conversation; canonical version can be extracted to `scripts/check_metadata_sync.py` in the deploy repo when we clone it locally.

---

## Definitive slug ↔ canonical MD map (do not infer from slug alone — six pieces have legacy filenames)

| Slug | Canonical MD filename | Filename ≠ slug? |
|---|---|---|
| three-surfaces-one-keystone | `three_surfaces_one_keystone.md` | |
| grounding-the-ai-layer | `grounding_the_ai_layer.md` | |
| where-should-data-sit | `AB_Library_Essay_Where_Should_Data_Sit.md` | ⚠ legacy |
| actions-not-answers | `actions_not_answers.md` | (dup `AB_Library_Essay_Actions_Not_Answers.md` is stale — non-canonical) |
| what-is-this-system-measuring | `what_is_this_system_measuring.md` | |
| numbers-dont-agree | `numbers_dont_agree.md` | |
| the-contracts-between-systems | `the_contracts_between_systems.md` | |
| the-decision-system | `decision_system_framework_v2.md` | ⚠ legacy (dup `decision_system_framework.md` is v1, stale) |
| why-the-rules-look-weird | `why_the_rules_look_weird.md` | |
| two-bets-one-institution | `two_bets_one_institution.md` | |
| who-writes-the-contract | `who_writes_the_contract.md` | |
| when-genai-redesigned-my-dashboard | `when_genai_redesigned_my_dashboard.md` | |
| lo-2-0-stitching-the-layers | `lo_2_0_stitching_the_layers.md` | |
| burden-disparity-and-the-next-dollar | `AB_Field_Note_Burden_Disparity_Next_Dollar_REVISED_v2.md` | ⚠ legacy |
| the-take-home-test | `AB_Library_05_The_Take_Home_Test.md` | ⚠ legacy |
| plumbing-got-upgraded-water-didnt | `plumbing_got_upgraded_water_didnt.md` | |
| blown-assignment | `cross_functional_is_a_football_play.md` | ⚠ legacy (filename ≠ slug) |
| functions-dont-run-plays | `functions_dont_run_plays.md` | |
| the-reach-trap | `reach_trap.md` | ⚠ (drift-prone; user often edits in `reach_trap_figures/`) |
| we-used-to-settle-for-thumbnails | `we_used_to_settle_for_thumbnails.md` | |
| ai-did-not-write-my-library | `ai_did_not_write_my_library.md` | |

## Non-canonical MDs on disk

**Archived 2026-07-15** to `_archive_stale_2026-07-15/`:
- `AB_Library_Essay_Actions_Not_Answers.md` — v1 duplicate; canonical is `actions_not_answers.md`
- `decision_system_framework.md` — v1; canonical is `decision_system_framework_v2.md`

**Active in the pipeline (drafts for later publication — do NOT archive):**
- `one_pager_outcomes_and_progress.md`
- `the_absorbed_data_role.md`
- `the_contracts_between_systems_v2_notes.md` — working notes for Contracts
- `three_buckets_essay_scope.md`
- `validity_layer_beneath_responsible_ai.md`
- `when_the_stakes_are_the_mission.md`

---

## Registry

| Slug | Markdown source filename | MD mtime | ✓ deployed | Sync notes |
|---|---|---|---|---|
| when-genai-redesigned-my-dashboard | `when_genai_redesigned_my_dashboard.md` | 2026-06-28 19:52 | ✓ | |
| lo-2-0-stitching-the-layers | `lo_2_0_stitching_the_layers.md` | 2026-07-11 00:15 | ✓ | **Fact correction folded 2026-07-11**: replaced the "pattern compounds with grade" sentence (implied Math worst-at-Class-X) with the accurate non-monotonic Math sequence (III 63 → V 82 → VIII 78 → X 80) and named Science as the piece with the actual grade-on-grade decline (III 65 → X 94). All figures verified against NCERT PARAKH NAS 2021 dashboard (Andhra Pradesh, Class 10). MetaNote citation added with URL `https://parakh.ncert.gov.in/dashboard/NAS2021#/`. Both JSX and canonical MD synced. |
| burden-disparity-and-the-next-dollar | `AB_Field_Note_Burden_Disparity_Next_Dollar_REVISED_v2.md` | 2026-06-27 02:39 | ✓ | |
| the-take-home-test | `AB_Library_05_The_Take_Home_Test.md` | 2026-06-27 01:32 | ✓ | |
| plumbing-got-upgraded-water-didnt | `plumbing_got_upgraded_water_didnt.md` | 2026-07-02 01:03 | ✓ | **Reconciled to MD canonical 2026-07-02** after gather thread ran its own em-dash sweep. All my earlier JSX-only em-dash softenings reverted to match MD exactly. 16 em-dashes in section (12 MD body + 4 JSX chrome: subtitle/summary/aria-label/SeeAlso gloss). |
| functions-dont-run-plays | `functions_dont_run_plays.md` | 2026-07-02 01:04 | ✓ | **Reconciled to MD canonical 2026-07-02**. Gather thread's de-AI pass converted em-dash pairs to parentheses. JSX now matches: subtitle/summary/Brief/body all switched em-dash pairs → parens. 1 em-dash in section (matches MD). Three-archetypes rewrite unchanged from earlier fold. |
| blown-assignment | **`cross_functional_is_a_football_play.md`** ← **filename ≠ slug** | 2026-07-01 22:56 | ✓ | **Canonical: 662w MD (folded 2026-07-02).** SOP/SLA expansion dropped. Summary/opening compressed. Reading time 4→3 min. "operational redundancy — a backup" MD em-dash restored. FN08 SeeAlso reciprocal + Two Bets MetaNote kept as Gate 9 additions. |
| functions-dont-run-plays | `functions_dont_run_plays.md` | 2026-07-01 22:49 | ✓ | Three-archetypes rewrite folded (task #134). |
| three-surfaces-one-keystone | `three_surfaces_one_keystone.md` | 2026-06-28 19:52 | ✓ | |
| grounding-the-ai-layer | `grounding_the_ai_layer.md` | 2026-07-08 15:17 | ✓ | **Fresh edit folded 2026-07-08**: "The dbt semantic layer is the grounding contract" softened to "The semantic contract, often implemented through dbt or a metric API, is the grounding contract" — architecture-neutral framing (dbt not the only implementation). No other body changes. |
| where-should-data-sit | `AB_Library_Essay_Where_Should_Data_Sit.md` | 2026-06-27 04:13 | ✓ | |
| actions-not-answers | `actions_not_answers.md` | 2026-07-08 15:17 | ✓ | **Fresh edits folded 2026-07-08 (3 items)**: (1) Checkpoint sentence rewritten: "It comes free, built into the format. An answer is inert until a person picks it up, and the picking-up is the checkpoint." → "The format holds the seat for a checkpoint, whether or not the person uses it. An answer is inert until a person picks it up, and the picking-up is where the checkpoint can happen — even if the person only skims." (2) Algorithmic-trading / autopilot / ad-bidding / anti-fraud comparison paragraph **removed**. (3) Readiness question expanded: "The technology is mostly good enough" → "The technology is good enough to force the governance question, though not good enough for every action." |
| what-is-this-system-measuring | `what_is_this_system_measuring.md` | 2026-06-27 02:39 | ✓ | |
| the-contracts-between-systems | `the_contracts_between_systems.md` | 2026-07-01 23:01 | ✓ | Mechanical diff showed 0.2% delta — JSX already softer than MD on em-dashes. No fold needed. Contains consumption-angle content. |
| numbers-dont-agree | `numbers_dont_agree.md` | 2026-07-01 23:00 | ✓ | Consumption paragraph FOLDED 2026-07-02 (approved theme, replaces older parenthetical version). "features not bugs" cliché removed. |
| the-reach-trap | **`reach_trap.md`** (drift kept recurring — user edits in `reach_trap_figures/`; reconciled to canonical again 2026-07-08 13:52) | 2026-07-08 13:48 | ✓ | Field Note 09. Arc: measurement. **Fresh edits folded 2026-07-08**: (1) Brief closer softened to "It is a field note. It makes one structural claim." (2) Utilization-focused paragraph MOVED from end of "Reach is what falls out for free" to end of "Why the CRM can't save you". (3) NEW paragraph on scale-is-decision-specific added after rubric intro. (4) NEW paragraph on funder-and-grantee co-authoring the mapping added after Grantee A/B/C. (5) Spine section extended with confidence-definition sentences ("Confidence is not a mood..."). (6) Closing italic softened: "AB builds X for teams ready to move" → "AB helps teams build X and move". Uses inline Figure primitive with 3 SVGs in `/public/library/figures/reach-trap-*.svg`. |
| why-the-rules-look-weird | `why_the_rules_look_weird.md` | 2026-07-04 03:51 | ✓ | **Reclassified 2026-07-04 23:08 from FN10 → Essay 09.** Arc: organizational-design. Five sports rules for institutional design. External link to Goodhart's Law Wikipedia. Length (~10 min read, prose-heavy structural argument) fits essay convention; DS Framework's InternalLink already reads "That's a whole essay of its own". Cover eyebrow flipped `Field note · No. 10` → `Essay · No. 09`, SVG `<title>` updated. **Field-note number 10 slot now empty** (precedented — FN06 also empty). FN11/FN12 unchanged. |
| the-decision-system | `decision_system_framework_v2.md` | 2026-07-04 03:49 | ✓ | New Essay 08. Arc: integration-governance. **The umbrella framework** unifying the library (meaning, authority, validity + agentic AI stress test). Rich InternalLink/ArtifactLink cross-references to 10+ pieces. |
| we-used-to-settle-for-thumbnails | `we_used_to_settle_for_thumbnails.md` | 2026-07-14 03:35 | ✓ VISIBLE | Field Note 11 (dated 2026-07-09). Arc: measurement. **Unhidden 2026-07-14**. MD is now 5956 bytes (was 5936 at first fold) — 20-byte delta is punctuation/whitespace, no substantive prose change to fold. Cover: thumbnail→full-picture visual. |
| ai-did-not-write-my-library | `ai_did_not_write_my_library.md` | 2026-07-04 22:51 | ⏸ HIDDEN | Field Note 12 (dated 2026-07-13). Arc: ai-systems. **`hidden: true` set 2026-07-04** — unhide next week. **Editorial-standard pass folded 2026-07-04 22:57**: dropped 2 "actually"s, converted 3 em-dash pairs → parens (`(September 2025 through early April 2026)`, `(adding field names, metadata on tables, code correction)`, `(race vs room, Constellation Self, Tree with Silhouettes)`), restored schema/pipeline/AI-reporting detail with colon on data-platform ramp line, softened `That property (removing...)`. Cover: 5 ascending bars on shelf line. |
| — (retired) | ~~dialogue-maturity-curve~~ | — | ✗ NOT ARTIFACT | **Retired 2026-07-05.** Realized on rereading `ai_did_not_write_my_library.html` (source) that this viz is a **figure inline in the essay body** (Chart.js canvas in the "What transferred. What expanded." section), not a standalone artifact. Correct treatment: render as inline `<Figure>` inside FN12 when it unhides. SVG deleted from `/public/library/artifacts/`; gallery entry removed from ARTIFACTS; ArtifactLink reference stripped from FN12 body. |
| — (retired) | ~~monthly-conversation-volume~~ | — | ✗ NOT ARTIFACT | **Retired 2026-07-05.** Same story — this is a figure inline in FN12 body (Chart.js `volChart` canvas in the Stage 3 crisis section), not a standalone artifact. Retirement done the same way. |
| — (deferred) | `multi_tool_selection_map.html` (found in /Claude/Library/) | — | ⏸ DEFERRED | Discovered 2026-07-05. Same category: an inline figure in FN12 Stage 5, not a standalone. Will render as inline `<Figure>` (three-column tool grid + flow + principle box) alongside the two above when FN12 unhides. |

## Public Data Decision Systems (PDDS) — new sub-section

| Route | Status | Notes |
|---|---|---|
| `/library/public-data` | ✓ LIVE 2026-07-07 | **Medium-route launch.** Sub-page under /library, not yet a peer nav item. Renders 4 headline cards + 4 disparity panels (overdose, NAEP, maternal mortality, College Scorecard CS earnings) + lever boxes + sources. Data flows from `public/data/pdds-dashboard.json` which is generated by the DuckDB + dbt pipeline at `/Users/ChaitanyaRamineni/Desktop/public-data-decision-systems/`. Discoverable via a callout paragraph in the /library hero. **Next step decision (deferred):** promote to peer nav item (`Library | Decision Systems | The work | About`) once it earns traffic. |

### PDDS files in the deploy (added 2026-07-07)
- `types/dashboard.ts` — Dashboard, HeadlineCard, Panel, Lever, Source types
- `lib/pdds-dashboard.ts` — server-side `getPddsDashboard()` that reads `public/data/pdds-dashboard.json`
- `lib/pdds-format.ts` — panel meta, chart color palette (adapted to AB navy/teal), number formatters
- `components/pdds/*.tsx` — 6 components ported and restyled to AB Tailwind + AB palette
  - HeadlineCards, StatusBadge, LeverBox, PanelChart (SVG, no recharts), DecisionPanel, SourcesFooter
- `app/library/public-data/page.tsx` — the sub-page with Nav + Footer + intro block + method note
- `public/data/pdds-dashboard.json` — the pinned snapshot the pipeline emits

### PDDS refresh workflow (for me, every deploy)
1. Update pipeline at `/Users/ChaitanyaRamineni/Desktop/public-data-decision-systems/`
2. Run `python export/build_dashboard_json.py` — emits fresh dashboard.json
3. Copy `dashboard.json` → `ab-library-content-deploy/public/data/pdds-dashboard.json`
4. Rebuild zip

| two-bets-one-institution | `two_bets_one_institution.md` | 2026-07-14 03:59 | ✓ | **New Essay 10 shipped 2026-07-14** (dated 2026-07-14). Arc: integration-governance. ~3300 words / 12 min read. Named higher-ed exemplars (ASU/OpenAI, Dartmouth/Anthropic, UChicago/Anthropic, Cal State/OpenAI) + 4 external URLs KEPT — public journalistic-standard enterprise deals. Named federated exemplars (U-M GPT, Stanford CRFM) KEPT. Brief anonymization pass 2026-07-14 04:30 was REVERTED at 04:39 per user direction: public deals are safe to name; only candidate-perspective org commentary carries risk (see WWC row). 1 internal link (WSDS). SeeAlso wires to Contracts, WWC, Grounding, WSDS, Plumbing. |
| who-writes-the-contract | `who_writes_the_contract.md` | 2026-07-14 03:59 | ✓ | **New Essay 11 shipped 2026-07-14** (dated 2026-07-15 for feed ordering). Arc: organizational-design. ~2900 words / 12 min read. **JSX-anonymized 2026-07-14**: named references to Project Evident and JED Foundation in "reporting line," "contrast cases," and "hiring loop" paragraphs + MetaNote replaced with generic descriptors ("a national philanthropy-supporting organization," "a national youth-mental-health foundation," "two national mission-driven organizations"). Specific tool lists tied to JED (Qualtrics/RStudio/Stata) generalized. Canonical MD retains original — do NOT re-sync MD prose to JSX without re-applying anonymization pass. SeeAlso wires to Contracts, WSDS, TBOI, Plumbing. |

## Drafted but not yet published

| Slug | Markdown | Status |
|---|---|---|
| _(none currently)_ | | |

## JSX-only deviations (edits made in this thread, not written back to markdown)

| Piece | Deviation | Reason | Date |
|---|---|---|---|
| plumbing-got-upgraded-water-didnt | "some form of data governance in place" (not MD's "invested heavily in") | Softened for nonprofit audience per task #94 | 2026-06-XX |
| ~~plumbing-got-upgraded-water-didnt em-dash sweep~~ | REVERTED 2026-07-02 — gather thread ran its own em-dash pass, JSX reconciled to match MD exactly | | |
| blown-assignment | Added FN08 SeeAlso reciprocal + Two Bets MetaNote reference | Gate 9 cross-reference additions | 2026-07-02 |
| numbers-dont-agree | Consumption paragraph replaced older parenthetical with MD's compressed version | Consumption angle theme approved | 2026-07-02 |

## Open editorial questions

1. **Consumption angle — running theme?** Currently only in Contracts + Numbers. Candidates for extension: grounding-the-ai-layer, actions-not-answers, what-is-this-system-measuring. **Waiting on user direction: gather thread adds, or I propose insertions for approval.**

2. **DS Framework needs editorial re-pass (2026-07-04).** Substantive additions this thread: "Let's start", "not a directive", `<InternalLink>` swap to WSDS, bold "named human owner", compressed Rules section → "Design the rules for the failure mode" with link out, semantic-keystone ArtifactLink, inline flag-wall/system Figure with caption. All folded back to canonical `decision_system_framework_v2.md`. **Gather thread should run editorial standard on these additions.**

3. **Why the rules look weird needs editorial re-pass (2026-07-04).** New paragraphs added: **CIRS/Messick/AI-benchmark paragraph** after Free Guard Zone (adds construct-irrelevant-strategies frame + Samuel Messick + reward hacking/specification gaming/Goodhart taxonomy) and **Chesterton's Fence paragraph** before closing thesis. Both folded back to canonical `why_the_rules_look_weird.md`. **Gather thread should run editorial standard on these additions.**

## Traps caught (for future reference)

1. **Filename ≠ slug**: `cross_functional_is_a_football_play.md` maps to `blown-assignment`. Do not search by slug only — always cross-reference this table.
2. **Location drift (2026-07-04)**: `reach_trap.md` was drafted in `AB_Library_Essays/reach_trap_figures/` — NOT in canonical `markdown_sources/`. Now copied to canonical. Rule: any new MD drafted anywhere on Desktop should be moved to `markdown_sources/` before deploy.
2b. **Location drift #3 (2026-07-04)**: `ai_did_not_write_my_library.md` was drafted in `/Claude/Library/` — NOT in canonical `markdown_sources/`. Copied to canonical. Rule reinforces: sweep `find /Users/ChaitanyaRamineni/Desktop -name "*.md" -newer <last_deploy>` before every deploy to catch drift.
2c. **Location drift #4 (2026-07-08) — REPEAT for reach-trap**: `reach_trap.md` was again edited in `reach_trap_figures/` instead of canonical `markdown_sources/`. Second occurrence for the same file (first was 2026-07-04). Reconciled again. **Pattern: the user's gather thread appears to always edit reach_trap in `reach_trap_figures/`.** Consider making `reach_trap_figures/reach_trap.md` a symlink to canonical, or accepting that location as canonical for this piece only.
2. **PENDING EDIT flags in MD**: `<!-- PENDING EDIT -->` sections mark material not yet approved for deploy. Skip these unless explicitly told to fold. (Was the case for the Numbers consumption paragraph — user approved 2026-07-02, now folded.)
3. **JSX chrome vs MD prose**: JSX Brief block, H2 headings, SeeAlso block, MetaNote are web chrome — MD doesn't have them. When diffing, strip these before comparing.
4. **Curly vs straight typography**: JSX uses curly quotes/apostrophes per AB style. MD may use straight. Don't flag as deltas.

## Sync process (for me, every deploy)

1. `find markdown_sources/ -name "*.md" -newer ab-library-content-deploy.zip` — list MDs modified since last deploy
2. For each newly-modified MD:
   - Extract JSX body prose (strip Brief/H2/SeeAlso/MetaNote chrome)
   - Normalize MD (strip frontmatter, headings, links, italic/bold markers)
   - Run `diff` on the two normalized files
   - **If substantive prose change**: show user raw diff, ask before folding
   - **If small edits (em-dashes, punctuation, single-word swaps)**: apply directly, log in JSX-only deviations table
3. Rebuild zip
4. Regenerate this sync table
