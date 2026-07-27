#!/usr/bin/env python3
"""
Audit the current AB library numbering AND cover-SVG alignment.

Two checks:
    1. JSX numbering: every essay + field note number, hidden flags,
       collisions, next-available slots.
    2. Cover-SVG drift: every cover's eyebrow text + <title> element
       is cross-checked against the JSX metadata. Any mismatch is
       flagged (this is how the FN10-drift and WWC-#9 bugs surfaced).

Run BEFORE assigning a number to any new/renumbered piece,
AND after any renumber/reclassification to verify covers stay in sync.

Usage:
    python3 scripts/audit-library-numbering.py

Exit codes:
    0 = clean (no collisions, no cover drift)
    1 = collisions or cover drift present
"""

import re
import sys
from collections import Counter
from pathlib import Path


ESSAY_PREFIX = {"essay": "Essay", "field-note": "Field note"}
TITLE_PREFIX = {"essay": "Essay", "field-note": "Field Note"}


def parse_jsx_entries(essays_tsx_path: Path):
    """Return list of dicts with keys: kind, slug, number, cover, hidden.

    Bounds each entry's window to the enclosing { ... } object literal by
    walking backward from the slug to the nearest unmatched `{` and forward
    to the matching `}`. This prevents `hidden: true` in one entry from
    bleeding into the neighbor's parse.
    """
    src = essays_tsx_path.read_text()
    slug_matches = list(re.finditer(r'slug:\s*"([^"]+)"', src))
    entries = []
    seen = set()
    for m in slug_matches:
        slug = m.group(1)
        if slug in seen:
            continue
        # Walk backward from slug to find enclosing `{`
        depth = 0
        i = m.start()
        obj_start = None
        while i > 0:
            i -= 1
            c = src[i]
            if c == "}":
                depth += 1
            elif c == "{":
                if depth == 0:
                    obj_start = i
                    break
                depth -= 1
        # Walk forward from slug to find matching `}`
        depth = 0
        j = m.end()
        obj_end = None
        while j < len(src):
            c = src[j]
            if c == "{":
                depth += 1
            elif c == "}":
                if depth == 0:
                    obj_end = j
                    break
                depth -= 1
            j += 1
        if obj_start is None or obj_end is None:
            continue
        window = src[obj_start:obj_end + 1]
        kind_m = re.search(r'kind:\s*"(essay|field-note)"', window)
        num_m = re.search(r'number:\s*"(\d+)"', window)
        cover_m = re.search(r'cover:\s*"([^"]+)"', window)
        hidden_m = re.search(r'hidden:\s*true', window)
        # Skip SeeAlsoItem entries — they have slug but no kind
        if kind_m and num_m:
            seen.add(slug)
            entries.append({
                "kind": kind_m.group(1),
                "slug": slug,
                "number": int(num_m.group(1)),
                "cover": cover_m.group(1) if cover_m else None,
                "hidden": bool(hidden_m),
            })
    return entries


def parse_cover_svg(cover_path: Path):
    """Extract (eyebrow_kind, eyebrow_num, title_num) from a cover SVG."""
    if not cover_path.exists():
        return None, None, None
    svg = cover_path.read_text()
    # Eyebrow: `>Essay  ·  No. NN<` or `>Field note  ·  No. NN<`
    e = re.search(r'>\s*(Essay|Field note)\s+·\s+No\.\s+(\d+)', svg, re.IGNORECASE)
    eyebrow_kind = e.group(1).lower() if e else None
    eyebrow_num = int(e.group(2)) if e else None
    # Title: `<title>Essay No. NN...` or `<title>Field Note No. NN...`
    t = re.search(r'<title>\s*(?:Essay|Field Note)\s+No\.\s+(\d+)', svg, re.IGNORECASE)
    title_num = int(t.group(1)) if t else None
    return eyebrow_kind, eyebrow_num, title_num


def next_num(nums):
    return max(nums) + 1 if nums else 1


def main(repo_root: Path) -> int:
    essays_tsx = repo_root / "app" / "library" / "essays.tsx"
    if not essays_tsx.exists():
        print(f"error: {essays_tsx} not found", file=sys.stderr)
        return 2

    entries = parse_jsx_entries(essays_tsx)
    essays = sorted([e for e in entries if e["kind"] == "essay"], key=lambda e: e["number"])
    fns = sorted([e for e in entries if e["kind"] == "field-note"], key=lambda e: e["number"])

    print("=== ESSAYS ===")
    for e in essays:
        tag = "  [HIDDEN]" if e["hidden"] else ""
        print(f"  E{e['number']:02d}  {e['slug']}{tag}")

    print("\n=== FIELD NOTES ===")
    for e in fns:
        tag = "  [HIDDEN]" if e["hidden"] else ""
        print(f"  FN{e['number']:02d} {e['slug']}{tag}")

    print("\n=== NEXT AVAILABLE ===")
    print(f"  Next essay:      E{next_num([e['number'] for e in essays]):02d}")
    print(f"  Next field note: FN{next_num([e['number'] for e in fns]):02d}  (honoring hidden reservations)")
    print(f"  Next FN if released: FN{next_num([e['number'] for e in fns if not e['hidden']]):02d}  (published-only)")

    print("\n=== NUMBERING COLLISIONS ===")
    e_col = [n for n, c in Counter([e["number"] for e in essays]).items() if c > 1]
    f_col = [n for n, c in Counter([e["number"] for e in fns]).items() if c > 1]
    print(f"  Essay: {e_col or 'none'}")
    print(f"  FN:    {f_col or 'none'}")
    if f_col:
        for n in f_col:
            hits = [(e["slug"], "HIDDEN" if e["hidden"] else "published") for e in fns if e["number"] == n]
            print(f"    FN{n:02d}: {hits}")

    print("\n=== COVER-SVG DRIFT CHECK ===")
    drifts = []
    for e in entries:
        if not e["cover"]:
            drifts.append((e["slug"], e["kind"], e["number"], "no-cover-path"))
            continue
        cover_path = repo_root / "public" / e["cover"].lstrip("/")
        eye_kind, eye_num, title_num = parse_cover_svg(cover_path)
        issues = []
        if eye_kind is None:
            issues.append("missing-eyebrow")
        elif eye_kind != e["kind"] and not (eye_kind == "field note" and e["kind"] == "field-note"):
            issues.append(f"eyebrow-kind={eye_kind}")
        if eye_num is not None and eye_num != e["number"]:
            issues.append(f"eyebrow-num={eye_num}")
        if title_num is not None and title_num != e["number"]:
            issues.append(f"title-num={title_num}")
        if issues:
            drifts.append((e["slug"], e["kind"], e["number"], ", ".join(issues)))

    if drifts:
        for slug, kind, num, issue in drifts:
            prefix = "E" if kind == "essay" else "FN"
            print(f"  ⚠️  {slug}  JSX={prefix}{num:02d}  → {issue}")
    else:
        print("  All covers aligned to JSX ✓")

    has_issues = bool(f_col or e_col or drifts)
    print(f"\n=== EXIT: {'FAIL — issues present' if has_issues else 'CLEAN'} ===")
    return 1 if has_issues else 0


if __name__ == "__main__":
    repo_root = Path(__file__).resolve().parent.parent
    sys.exit(main(repo_root))
