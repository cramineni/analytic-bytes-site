#!/usr/bin/env python3
"""
Check that every cross-reference attributes in a direction that is true.

The Gate 9 rule (AB_Editorial_Standard.md, added 2026-09-28):

    Attribution has a direction; pointing does not.

    A cross-reference to a piece published BEFORE the one being written may
    attribute -- "The reach trap ARGUED THAT a portfolio needs one comparable
    axis", "the pattern I DESCRIBED IN The absorbed data role". That is a claim
    about the order of the work, and it has to be true.

    A cross-reference to a piece published AFTER may only POINT: name the piece
    and what it covers, in the present tense, with no verb claiming it came
    first. Forward links stay allowed and are wanted -- readers arrive from
    search, not in publication order. What is not allowed is an older piece
    citing a newer one as prior art.

Why this script exists rather than a grep: the verb has to be bound to the
SPECIFIC link, not merely to the sentence. A sentence can carry one backward
link that attributes and one forward link that points, and it is correct:

    "That is the absorption pattern I described in The absorbed data role,
     and it is the same seat that carries everything in For the record."

A sentence-level check calls that a violation. It is not one -- "described in"
governs the backward link, and the forward link is phrased as a pointer. So
this script measures word distance from each link individually, in both
directions, and only flags a verb that actually attaches to it.

Checks both surfaces, because either can be edited first:
    - app/library/essays.tsx          <InternalLink slug="...">Title</InternalLink>
    - the markdown sources            [Title](/library/slug)

Usage:
    python3 scripts/check-crossref-attribution.py
    python3 scripts/check-crossref-attribution.py --md-dir /path/to/markdown_sources
    python3 scripts/check-crossref-attribution.py --verbose   # also list clean forward links

Exit codes:
    0 = clean (no forward link carries an attribution)
    1 = at least one violation
    2 = could not parse the registry
"""

import argparse
import html
import re
import sys
from datetime import datetime
from pathlib import Path

REPO = Path(__file__).resolve().parent.parent
ESSAYS_TSX = REPO / "app" / "library" / "essays.tsx"
DEFAULT_MD_DIR = Path.home() / (
    "Desktop/Claude/AB Strategy & Lirbary/AB_Library_Essays/markdown_sources"
)

# Past-tense / perfect attribution verbs. These claim the linked piece already
# existed and already made its argument. Present-tense verbs ("works through",
# "puts to the test", "covers", "argues") are pointers and are always fine, so
# only the past and perfect forms belong here.
ATTRIBUTION_VERBS = [
    r"argued",
    r"showed",
    r"(?:has|had|have)\s+shown",
    r"made\s+the\s+(?:same\s+)?(?:point|case|argument)",
    r"traced",
    r"established",
    r"demonstrated",
    r"worked\s+through",
    r"set\s+out",
    r"laid\s+out",
    r"described",
    r"proposed",
    r"introduced",
    r"named",
    r"took\s+up",
    r"went\s+further",
    r"covered",
    r"explored",
    r"examined",
]
ATTRIBUTION = r"\b(?:%s)\b" % "|".join(ATTRIBUTION_VERBS)
ATTR_RE = re.compile(ATTRIBUTION, re.I)

# A verb BEFORE a link only attributes to it when a preposition carries it
# there: "described IN X", "as I argued IN X", "laid out BY X". Without the
# preposition the verb belongs to something else in the sentence.
PRE_ATTACH_RE = re.compile(ATTRIBUTION + r"\s+(?:in|by|at)\s*$", re.I)

WINDOW_WORDS = 5  # how far a verb may sit from the link and still attach to it
SENTINEL = "\x00LINK%d\x00"


# --------------------------------------------------------------------------
# registry
# --------------------------------------------------------------------------


def brace_block(src: str, start: int) -> str:
    """Return the { ... } object literal enclosing position `start`."""
    i = start
    depth = 0
    while i > 0:
        if src[i] == "}":
            depth += 1
        elif src[i] == "{":
            if depth == 0:
                break
            depth -= 1
        i -= 1
    open_at = i
    depth = 0
    j = open_at
    while j < len(src):
        if src[j] == "{":
            depth += 1
        elif src[j] == "}":
            depth -= 1
            if depth == 0:
                return src[open_at : j + 1]
        j += 1
    return src[open_at:]


def load_registry(path: Path):
    """slug -> {date, title, block}. Bounded per entry, so fields cannot bleed."""
    src = path.read_text()
    out = {}
    for m in re.finditer(r'slug:\s*"([^"]+)"', src):
        slug = m.group(1)
        if slug in out:
            continue
        blk = brace_block(src, m.start())
        d = re.search(r'date:\s*"(\d{4}-\d{2}-\d{2})"', blk)
        t = re.search(r'title:\s*"([^"]+)"', blk)
        if not d:
            continue
        out[slug] = {
            "date": datetime.strptime(d.group(1), "%Y-%m-%d"),
            "date_s": d.group(1),
            "title": t.group(1) if t else slug,
            "block": blk,
        }
    return out


# --------------------------------------------------------------------------
# link extraction
# --------------------------------------------------------------------------


def flatten(fragment: str, link_re: str, slug_group: int):
    """Strip markup, leaving a sentinel where each internal link stood.

    Returns (plain_text, [slug, ...]) with sentinel N marking links[N].
    """
    links = []

    def grab(m):
        links.append(m.group(slug_group))
        return SENTINEL % (len(links) - 1)

    s = re.sub(link_re, grab, fragment, flags=re.S)
    s = re.sub(r"<[^>]+>", " ", s)          # remaining JSX/HTML tags
    s = re.sub(r'\{"\s*"\}', " ", s)        # JSX whitespace glue
    s = html.unescape(s)
    s = re.sub(r"[*_`]", "", s)             # markdown emphasis
    s = re.sub(r"\s+", " ", s)
    return s.strip(), links


def sentence_around(text: str, idx: int):
    """The sentence containing position idx. Boundaries are . ! ? + space."""
    starts = [0] + [m.end() for m in re.finditer(r"[.!?]\s+", text[:idx])]
    start = starts[-1]
    m = re.search(r"[.!?](?:\s|$)", text[idx:])
    end = idx + m.end() if m else len(text)
    return start, end


def violations_in(text: str, links, src_slug, src_date, reg, surface, where):
    """Flag any forward link with an attribution verb bound to it."""
    found = []
    forward = 0
    for n, tgt in enumerate(links):
        token = SENTINEL % n
        idx = text.find(token)
        if idx < 0 or tgt not in reg:
            continue
        if reg[tgt]["date"] <= src_date:
            continue  # backward or same day: attribution is allowed
        forward += 1

        s_start, s_end = sentence_around(text, idx)
        before = text[s_start:idx]
        after = text[idx + len(token) : s_end]

        post = " ".join(after.split()[:WINDOW_WORDS])
        pre_words = before.split()[-WINDOW_WORDS:]
        pre = " ".join(pre_words)

        hit = None
        m = ATTR_RE.search(post)
        if m:
            hit = m.group(0).strip()
        elif PRE_ATTACH_RE.search(pre):
            hit = PRE_ATTACH_RE.search(pre).group(0).strip()

        if hit:
            sentence = re.sub(SENTINEL % n, "«%s»" % reg[tgt]["title"].rstrip("."), text[s_start:s_end])
            sentence = re.sub(r"\x00LINK\d+\x00", "", sentence).strip()
            found.append(
                {
                    "surface": surface,
                    "where": where,
                    "source": src_slug,
                    "source_date": src_date.strftime("%Y-%m-%d"),
                    "target": tgt,
                    "target_date": reg[tgt]["date_s"],
                    "verb": hit,
                    "sentence": sentence,
                }
            )
    return found, forward


# --------------------------------------------------------------------------
# surfaces
# --------------------------------------------------------------------------

JSX_LINK = r'<InternalLink\s+slug="([^"]+)"\s*>(.*?)</InternalLink>'
MD_LINK = r"\[([^\]]+)\]\(/library/([a-z0-9\-]+)\)"


def scan_jsx(reg):
    bad, fwd = [], 0
    for slug, e in reg.items():
        blk, d = e["block"], e["date"]
        for m in re.finditer(r"<P>(.*?)</P>", blk, re.S):
            txt, links = flatten(m.group(1), JSX_LINK, 1)
            v, f = violations_in(txt, links, slug, d, reg, "essays.tsx", "body")
            bad += v
            fwd += f
        for m in re.finditer(r"<SeeAlsoItem\b([^>]*)>", blk):
            attrs = m.group(1)
            t = re.search(r'slug="([^"]+)"', attrs)
            g = re.search(r'gloss="([^"]*)"', attrs)
            if not (t and g):
                continue
            txt, links = flatten(
                '<InternalLink slug="%s">x</InternalLink> %s' % (t.group(1), g.group(1)),
                JSX_LINK,
                1,
            )
            v, f = violations_in(txt, links, slug, d, reg, "essays.tsx", "SeeAlso gloss")
            bad += v
            fwd += f
    return bad, fwd


def md_slug(raw: str, reg):
    """Markdown frontmatter carries no slug field, so recover it.

    Order: the cover path (/library/covers/<slug>.svg), then an exact title
    match against the registry, then a unique date match. Anything still
    unresolved is reported rather than skipped silently -- a file the check
    cannot place is a file the check is not covering.
    """
    m = re.search(r'cover:\s*"/library/covers/([a-z0-9\-]+)\.svg"', raw)
    if m and m.group(1) in reg:
        return m.group(1)
    t = re.search(r'title:\s*"([^"]+)"', raw)
    if t:
        for slug, e in reg.items():
            if e["title"].strip().lower() == t.group(1).strip().lower():
                return slug
    d = re.search(r'date:\s*"(\d{4}-\d{2}-\d{2})"', raw)
    if d:
        same = [s for s, e in reg.items() if e["date_s"] == d.group(1)]
        if len(same) == 1:
            return same[0]
    return None


def scan_md(reg, md_dir: Path):
    bad, fwd, unresolved = [], 0, []
    if not md_dir.is_dir():
        return bad, fwd, 0, unresolved
    files = sorted(md_dir.glob("*.md"))
    for f in files:
        raw = f.read_text()
        slug = md_slug(raw, reg)
        if not slug:
            if "/library/" in raw:
                unresolved.append(f.name)
            continue
        d = reg[slug]["date"]
        for para in re.split(r"\n\s*\n", raw):
            if "/library/" not in para:
                continue
            txt, links = flatten(para, MD_LINK, 2)
            v, fw = violations_in(txt, links, slug, d, reg, f.name, "markdown")
            bad += v
            fwd += fw
    return bad, fwd, len(files), unresolved


# --------------------------------------------------------------------------


def main():
    ap = argparse.ArgumentParser(description=__doc__)
    ap.add_argument("--md-dir", type=Path, default=DEFAULT_MD_DIR)
    ap.add_argument("--verbose", action="store_true")
    args = ap.parse_args()

    if not ESSAYS_TSX.exists():
        print("cannot find %s" % ESSAYS_TSX, file=sys.stderr)
        return 2
    reg = load_registry(ESSAYS_TSX)
    if not reg:
        print("parsed no entries from essays.tsx", file=sys.stderr)
        return 2

    jsx_bad, jsx_fwd = scan_jsx(reg)
    md_bad, md_fwd, md_files, md_unresolved = scan_md(reg, args.md_dir)
    bad = jsx_bad + md_bad

    print("Cross-reference attribution check")
    print("  registry:        %d dated pieces" % len(reg))
    print("  essays.tsx:      %d forward links scanned" % jsx_fwd)
    if md_files:
        print("  markdown:        %d forward links scanned across %d files" % (md_fwd, md_files))
    else:
        print("  markdown:        skipped (%s not found)" % args.md_dir)
    if md_unresolved:
        print("  NOT CHECKED:     %d markdown file(s) carry library links but could not be"
              % len(md_unresolved))
        print("                   matched to a dated registry entry: %s"
              % ", ".join(md_unresolved))
    print()

    if not bad:
        print("PASS — every forward cross-reference points rather than attributes.")
        return 0

    print("FAIL — %d forward cross-reference%s attribute%s to a piece published later.\n"
          % (len(bad), "" if len(bad) == 1 else "s", "s" if len(bad) == 1 else ""))
    for v in bad:
        print("  %s  (%s, %s)" % (v["source"], v["surface"], v["where"]))
        print("    links forward to : %s" % v["target"])
        print("    dates            : %s  ->  %s" % (v["source_date"], v["target_date"]))
        print("    attributing verb : %s" % v["verb"])
        print("    %s" % v["sentence"][:300])
        print()
    print("Fix: rewrite as a pointer in the present tense. The linked piece did not")
    print("exist when this one shipped, so it cannot be cited as prior art.")
    return 1


if __name__ == "__main__":
    sys.exit(main())
