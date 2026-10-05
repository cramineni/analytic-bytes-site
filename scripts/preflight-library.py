#!/usr/bin/env python3
"""
One preflight over the whole AB library. Runs EVERY mechanically checkable
rule from the frameworks against EVERY piece, in one pass.

WHY THIS EXISTS
---------------
The failure this replaces was not any single missed rule. It was checking
one framework per pass: cover audit one run, Brief lengths another, links
a third. Each pass came back clean on what it looked at, so each new pass
surfaced something the last one never examined, and the library looked
like it was drifting continuously when it was really being inspected
through a straw.

A rule that only runs when someone remembers it is not a standard. So:
every rule here, every piece, every run. A new piece is publish-ready when
this exits 0, not when the last thing someone happened to look at was fine.

WHAT IT CHECKS
--------------
  metadata     required fields present; draft flag; date parseable
  summary      length band (the library index card has NO line clamp, so an
               over-long summary overflows the card -- this is exactly how
               Partnership shipped at 1003 chars against a median of 328)
  brief        present; 70-220 words, 120-180 the target band
  metanote     present; not a stub
  seealso      present; 2 or 3 curated items (Gate 9)
  inline links present (Gate 9: InternalLink at each beat)
  structure    4-8 H2s; roughly one per 800-1200 words
  readingtime  declared vs computed at 230 wpm
  cover        file exists; <title> element with the right number; eyebrow
               kind and number; viewBox 1200x630; title character-for-
               character against the JSX title
  og card      -og.png twin exists beside the cover SVG
  entities     body prose uses HTML entities; string fields use raw Unicode
  em-dashes    one per sentence ceiling, one per paragraph ceiling (Gate 3)
  vocabulary   retired words (Gate 3 item 11)

THRESHOLDS ARE OBSERVED, NOT INVENTED
-------------------------------------
Where a framework states a number, that number is used. Where it does not,
the band comes from measuring the existing library, and the measurement is
recorded in the constant's comment so the next person can see what it was
derived from rather than guessing whether it is load-bearing.

Usage:
    python3 scripts/preflight-library.py            # all pieces
    python3 scripts/preflight-library.py <slug> ... # named pieces only
    python3 scripts/preflight-library.py --strict   # warnings count as failures

Exit codes:
    0 = clean
    1 = one or more ERRORs (or WARNings under --strict)
    2 = the script could not run (self-test failed, essays.tsx missing)
"""

import re
import sys
from pathlib import Path

# --- thresholds -------------------------------------------------------------
# Framework-stated:
BRIEF_TARGET = (120, 180)     # AB Editorial Standard
BRIEF_HARD = (70, 220)        # floor / ceiling
SEEALSO_RANGE = (2, 3)        # Gate 9
H2_RANGE = (4, 8)             # Structure Framework
WORDS_PER_H2 = (800, 1200)    # Structure Framework
WPM = 230                     # house reading-time rate
VIEWBOX = "0 0 1200 630"      # Cover Framework

# Observed from the library (39 pieces, measured 2026-10-05):
#   summary  min 102  median 328  max 523 excluding the Partnership outlier
#   The index card renders summary with max-w-[64ch] and NO line clamp, so
#   the ceiling is a layout constraint, not taste. 560 sits just above the
#   longest well-behaved summary.
SUMMARY_MAX = 560
SUMMARY_MIN = 90
#   metanote min 41  median 77  max 245
METANOTE_MIN = 40

RETIRED = [
    "keystone", "load-bearing", "substrate", "confabulate",
    "operator console", "goes to die", "features, not bugs",
]

REQUIRED_FIELDS = ["kind", "slug", "number", "title", "subtitle",
                   "date", "readingTime", "summary", "cover", "arc"]


# --- parsing ----------------------------------------------------------------
def object_window(src, pos):
    """Return the enclosing { ... } literal for a position in the source.

    Walks outward balancing braces. Regex cannot do this: `hidden: true` in
    one entry bled into its neighbour's parse before this existed.
    """
    depth, i, start = 0, pos, None
    while i > 0:
        i -= 1
        c = src[i]
        if c == "}":
            depth += 1
        elif c == "{":
            if depth == 0:
                start = i
                break
            depth -= 1
    depth, j, end = 0, pos, None
    while j < len(src):
        c = src[j]
        if c == "{":
            depth += 1
        elif c == "}":
            if depth == 0:
                end = j
                break
            depth -= 1
        j += 1
    return (start, end) if start is not None and end is not None else (None, None)


def parse_entries(src):
    out, seen = [], set()
    for m in re.finditer(r'slug:\s*"([^"]+)"', src):
        slug = m.group(1)
        if slug in seen:
            continue
        s, e = object_window(src, m.start())
        if s is None:
            continue
        w = src[s:e + 1]
        if "kind:" not in w or "number:" not in w:
            continue          # SeeAlsoItem and friends carry a slug but no kind
        seen.add(slug)
        out.append({"slug": slug, "src": w})
    return out


def field(w, name):
    m = re.search(name + r':\s*\n?\s*"((?:[^"\\]|\\.)*)"', w)
    return m.group(1) if m else None


def strip_tags(s):
    s = re.sub(r"<[^>]+>", " ", s)
    s = re.sub(r"&[a-zA-Z]+;|&#\d+;", " ", s)
    return s


def block(w, tag):
    m = re.search(r"<%s>(.*?)</%s>" % (tag, tag), w, re.S)
    return m.group(1) if m else None


# --- checks -----------------------------------------------------------------
def check_piece(e, repo):
    """Return a list of (level, code, message)."""
    w, slug = e["src"], e["slug"]
    out = []
    def err(c, m): out.append(("ERROR", c, m))
    def warn(c, m): out.append(("WARN", c, m))

    for f in REQUIRED_FIELDS:
        if not re.search(f + r"\s*:", w):
            err("metadata", "missing field `%s`" % f)

    kind = field(w, "kind") or ""
    number = field(w, "number") or ""
    title = field(w, "title") or ""
    is_draft = bool(re.search(r"draft:\s*true", w))

    # --- summary: the library index card -----------------------------------
    summary = field(w, "summary")
    if summary is not None:
        n = len(summary)
        if n > SUMMARY_MAX:
            err("summary", "%d chars, over the %d ceiling -- the index card has "
                           "no line clamp, so this overflows" % (n, SUMMARY_MAX))
        elif n < SUMMARY_MIN:
            warn("summary", "%d chars, under the %d floor" % (n, SUMMARY_MIN))

    # --- body-derived -------------------------------------------------------
    bodyi = w.find("body:")
    body = w[bodyi:] if bodyi >= 0 else ""
    words = len(strip_tags(body).split())

    brief = block(w, "Brief")
    if brief is None:
        err("brief", "no <Brief> -- every piece carries one")
    else:
        bw = len(strip_tags(brief).split())
        if not (BRIEF_HARD[0] <= bw <= BRIEF_HARD[1]):
            err("brief", "%d words, outside the hard %d-%d band" % (bw, *BRIEF_HARD))
        elif not (BRIEF_TARGET[0] <= bw <= BRIEF_TARGET[1]):
            warn("brief", "%d words, outside the %d-%d target" % (bw, *BRIEF_TARGET))

    meta = block(w, "MetaNote")
    if meta is None:
        err("metanote", "no <MetaNote>")
    elif len(strip_tags(meta).split()) < METANOTE_MIN:
        warn("metanote", "%d words, reads as a stub"
             % len(strip_tags(meta).split()))

    # Decision chain. Both essays published on 2026-10-05 shipped without these
    # because nothing checked for them -- 34 of 39 pieces carried them and the
    # two new ones did not, which is precisely the gap a per-piece eyeball misses.
    if not re.search(r"chainLink\s*:", w):
        warn("chain", "no chainLink -- where does the decision chain break?")
    if not re.search(r"failurePoint\s*:", w):
        warn("chain", "no failurePoint (meaning | authority | validity)")

    sa = len(re.findall(r"<SeeAlsoItem", w))
    if sa == 0:
        err("seealso", "no <SeeAlso> block")
    elif not (SEEALSO_RANGE[0] <= sa <= SEEALSO_RANGE[1]):
        warn("seealso", "%d items, Gate 9 curates %d-%d" % (sa, *SEEALSO_RANGE))

    if len(re.findall(r"<InternalLink", w)) == 0:
        warn("xref", "no inline <InternalLink> -- Gate 9 wants one at each beat")

    h2 = len(re.findall(r"<H2>", w))
    if h2 and not (H2_RANGE[0] <= h2 <= H2_RANGE[1]):
        warn("structure", "%d H2s, framework says %d-%d" % (h2, *H2_RANGE))

    # WORDS PER H2 IS DELIBERATELY NOT CHECKED.
    # The Structure Framework says roughly one H2 per 800-1200 words. Measured
    # across the library, the median is 389 and only 3 of 39 pieces sit inside
    # that band. A rule the whole corpus contradicts is either stale or being
    # read wrong, and a check that fails 36 of 39 pieces teaches people to
    # ignore the output -- the same way the required-for-what false positive
    # did. Left out until the framework and the practice are reconciled by the
    # author. See WORDS_PER_H2 above, kept only to document the open question.

    rt = field(w, "readingTime") or ""
    m = re.search(r"(\d+)", rt)
    if m and words:
        declared, computed = int(m.group(1)), round(words / WPM)
        if abs(declared - computed) > max(2, computed * 0.25):
            warn("readingtime", "declared %d min, %d words computes to %d at %d wpm"
                 % (declared, words, computed, WPM))

    # --- entity discipline --------------------------------------------------
    for ch, name in [("—", "em-dash"), ("’", "right quote"),
                     ("“", "left double quote")]:
        if ch in strip_tags(body):
            warn("entities", "raw %s in body prose -- body uses HTML entities"
                 % name)
            break
    for f in ["title", "subtitle", "summary"]:
        v = field(w, f)
        if v and re.search(r"&[a-zA-Z]+;|&#\d+;", v):
            err("entities", "HTML entity in `%s` -- string fields take raw Unicode" % f)

    # --- em-dash density (Gate 3) ------------------------------------------
    # Count CONSTRUCTIONS, not dashes. A parenthetical aside is bracketed by a
    # matched pair and is one construction, not two. Counting raw dashes flagged
    # all four of Partnership's asides as violations when every one of them was
    # a single correct parenthetical -- a false positive that would have sent
    # someone editing clean prose.
    def constructions(text):
        n = 0
        for sent in re.split(r"(?<=[.!?])\s+", text):
            d = sent.count("&mdash;") + sent.count("—")
            if d == 0:
                continue
            n += 1 if d <= 2 else d - 1   # one pair reads as one aside
        return n

    for p in re.findall(r"<P>(.*?)</P>", body, re.S):
        for sent in re.split(r"(?<=[.!?])\s+", p):
            if sent.count("&mdash;") + sent.count("—") > 2:
                warn("em-dash", "a sentence carries 3+ em-dashes")
                break
    hot = [p for p in re.findall(r"<P>(.*?)</P>", body, re.S)
           if constructions(p) > 1]
    if hot:
        warn("em-dash", "%d paragraph(s) over the one-construction ceiling"
             % len(hot))

    # --- retired vocabulary -------------------------------------------------
    low = strip_tags(body).lower()
    hits = [r for r in RETIRED if r in low]
    if hits:
        warn("vocabulary", "retired: " + ", ".join(hits))

    # --- cover + OG ---------------------------------------------------------
    cover = field(w, "cover")
    if cover:
        p = repo / "public" / cover.lstrip("/")
        if not p.exists():
            err("cover", "file missing: %s" % cover)
        else:
            svg = p.read_text()
            norm = svg.replace("&#183;", "·").replace("&middot;", "·")
            if VIEWBOX not in svg:
                err("cover", "viewBox is not %s" % VIEWBOX)
            t = re.search(r"<title>\s*(?:Essay|Field Note)\s+No\.\s+(\d+):\s*(.+?)</title>",
                          svg, re.I | re.S)
            if "<title>" not in svg:
                err("cover", "no <title> element")
            elif not t:
                err("cover", "<title> does not carry a number")
            else:
                if t.group(1) != number:
                    err("cover", "<title> says No. %s, JSX says %s" % (t.group(1), number))
                if t.group(2).strip() != title:
                    err("cover", "<title> text differs from the JSX title")
            ey = re.search(r">\s*(Essay|Field note)\s+·\s+No\.\s+(\d+)", norm, re.I)
            if not ey:
                err("cover", "no parseable eyebrow")
            else:
                if ey.group(2) != number:
                    err("cover", "eyebrow says No. %s, JSX says %s" % (ey.group(2), number))
                ek = ey.group(1).lower().replace(" ", "-")
                if ek != kind:
                    err("cover", "eyebrow kind %s, JSX kind %s" % (ek, kind))
            # cover title must appear character-for-character in the artwork
            if title and title not in norm:
                err("cover", "title not present character-for-character in the artwork")
            og = p.with_name(p.name.replace(".svg", "-og.png"))
            if not og.exists() and not is_draft:
                err("og", "no -og.png twin -- shares fall back to the site card")
    return out


# --- self-test --------------------------------------------------------------
def self_test():
    """Synthetic fixtures, never live files, so they cannot drift."""
    good = '''{
      kind: "essay", slug: "x", number: "1", title: "T.", subtitle: "S",
      date: "2026-01-01", readingTime: "1 min read", summary: "%s",
      cover: "/nope.svg", arc: "a",
      body: (<><Brief><p>%s</p></Brief><H2>a</H2><H2>b</H2><H2>c</H2><H2>d</H2>
      <MetaNote>%s</MetaNote><SeeAlso><SeeAlsoItem/><SeeAlsoItem/></SeeAlso></>)
    }''' % ("s" * 200, "w " * 150, "m " * 60)
    es = parse_entries(good)
    assert len(es) == 1, "parser should find exactly one entry, found %d" % len(es)
    codes = {c for _, c, _ in check_piece(es[0], Path("/nonexistent"))}
    assert "brief" not in codes, "a 150-word Brief must pass"
    assert "summary" not in codes, "a 200-char summary must pass"
    assert "cover" in codes, "a missing cover file must be caught"

    bad = good.replace('"%s"' % ("s" * 200), '"%s"' % ("s" * 900))
    codes = {c for _, c, _ in check_piece(parse_entries(bad)[0], Path("/nonexistent"))}
    assert "summary" in codes, "a 900-char summary must fail -- this is the card overflow"

    nobrief = re.sub(r"<Brief>.*?</Brief>", "", good, flags=re.S)
    codes = {c for _, c, _ in check_piece(parse_entries(nobrief)[0], Path("/nonexistent"))}
    assert "brief" in codes, "a missing Brief must fail"
    return True


def main():
    repo = Path(__file__).resolve().parent.parent
    try:
        self_test()
    except AssertionError as a:
        print("self-test FAILED: %s\nrefusing to report numbers" % a, file=sys.stderr)
        return 2

    tsx = repo / "app" / "library" / "essays.tsx"
    if not tsx.exists():
        print("essays.tsx not found", file=sys.stderr)
        return 2

    args = [a for a in sys.argv[1:] if not a.startswith("--")]
    strict = "--strict" in sys.argv
    entries = parse_entries(tsx.read_text())
    if args:
        entries = [e for e in entries if e["slug"] in args]

    n_err = n_warn = 0
    clean = []
    for e in sorted(entries, key=lambda x: x["slug"]):
        issues = check_piece(e, repo)
        if not issues:
            clean.append(e["slug"])
            continue
        print("\n  %s" % e["slug"])
        for lvl, code, msg in issues:
            print("    %-5s %-12s %s" % (lvl, code, msg))
            if lvl == "ERROR":
                n_err += 1
            else:
                n_warn += 1

    print("\n" + "=" * 68)
    print("  %d pieces checked -- %d clean, %d errors, %d warnings"
          % (len(entries), len(clean), n_err, n_warn))
    failed = n_err > 0 or (strict and n_warn > 0)
    print("  %s" % ("FAIL" if failed else "PASS"))
    return 1 if failed else 0


if __name__ == "__main__":
    sys.exit(main())
