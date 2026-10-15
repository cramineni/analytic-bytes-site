#!/usr/bin/env python3
"""
Check every OG card against the cover SVG it was rendered from.

WHY THIS EXISTS
---------------
A cover is vector text; its OG card is a raster rendered from it at some
earlier moment. Nothing connects the two after that moment. Edit the cover
subtitle and the site shows the new line while every social preview keeps
showing the old one, silently, possibly for months. There is no error, no
broken link and no build failure -- just two different versions of the same
card in circulation.

Timestamps cannot answer this. An SVG newer than its PNG may only have had a
<title> element added, which changes nothing visible; that exact false
positive cost real time when nine covers were flagged as stale and none were.

So this reads the PNG. Tesseract OCRs the card, and the text that comes back
is compared against the text in the SVG. That is a direct check of what a
reader actually sees in a shared link, not a proxy for it.

WHAT IT COMPARES
----------------
    title     must appear in the card, matched fuzzily
    eyebrow   kind and number ("Field Note No. 18")
    subtitle  the cover's own subtitle line, which the Cover Framework
              allows to be an abridgement of the essay subtitle

OCR IS NOISY AND THE THRESHOLDS ALLOW FOR IT
--------------------------------------------
Tesseract reliably reads "AI" as "Al" in this typeface, renders the middle
dot as "-", and drops thin punctuation. Comparison therefore runs on a
normalised form: lowercase, punctuation stripped, l/i and 0/o folded. A line
matches at >= 0.90 similarity. Anything below that is REPORTED, never fixed:
a disagreement here means a human needs to look at the card.

Exit codes:
    0 = every card matches its cover
    1 = at least one mismatch, or a cover with no card
    2 = tesseract unavailable, or the self-test failed (nothing reported)
"""

import difflib
import os
import re
import subprocess
import sys
import tempfile
from pathlib import Path

THRESHOLD = 0.90


def norm(s):
    """Fold the differences OCR invents, not the ones that matter."""
    s = s.lower()
    s = s.replace("’", "'").replace("‘", "'")
    s = s.replace("“", '"').replace("”", '"')
    s = s.replace("—", " ").replace("–", " ").replace("·", " ")
    s = re.sub(r"&#?\w+;", " ", s)
    s = re.sub(r"[^a-z0-9 ]", " ", s)
    s = s.replace("l", "i").replace("0", "o")      # Al/AI, 0/O
    return re.sub(r"\s+", " ", s).strip()


def ocr(png, crop=None):
    """OCR the card, or only a band of it when `crop` is "WxH+X+Y"."""
    base = tempfile.mktemp()
    pre = ["-crop", crop, "+repage"] if crop else []
    subprocess.run(["convert", str(png)] + pre + ["-colorspace", "Gray",
                    "-resize", "200%", "-sharpen", "0x1", base + ".png"],
                   check=True, capture_output=True)
    subprocess.run(["tesseract", base + ".png", base, "--psm", "6"],
                   capture_output=True)
    try:
        txt = open(base + ".txt").read()
    finally:
        for f in (base + ".png", base + ".txt"):
            if os.path.exists(f):
                os.remove(f)
    return norm(txt)


def svg_lines(svg_path):
    s = svg_path.read_text()
    s = s.replace("&#183;", "·").replace("&#8217;", "’")
    # <title>/<desc> are metadata and are not painted, so they are not compared
    s = re.sub(r"<title>.*?</title>|<desc>.*?</desc>", "", s, flags=re.S)
    return [re.sub(r"\s+", " ", t).strip()
            for t in re.findall(r">([^<>]{3,})</text>", s)]


def contains(hay, needle):
    """Is `needle` present in `hay`, allowing OCR drift?"""
    n = norm(needle)
    if not n:
        return True
    if n in hay:
        return True
    # Eyebrows are set with wide letter-spacing ("E s s a y  .  N o .  1 4"),
    # which OCR returns as separated characters: "essa y no 1 4". Comparing
    # with all whitespace removed recovers these without weakening the title
    # check, since a squashed title is missing glyphs, not just spaces.
    if n.replace(" ", "") in hay.replace(" ", ""):
        return True
    # slide a window of the needle's length and take the best match
    w, best = len(n), 0.0
    for i in range(0, max(1, len(hay) - w + 1), 4):
        best = max(best, difflib.SequenceMatcher(None, n, hay[i:i + w]).ratio())
        if best >= THRESHOLD:
            return True
    return best >= THRESHOLD


def self_test():
    """The normaliser is the part that can silently rot. Pin its behaviour."""
    assert norm("AI-native") == norm("Al native"), "AI/Al fold"
    assert norm("Field Note  ·  No. 18") == "fieid note no 18", norm("Field Note  ·  No. 18")
    # Apostrophes become spaces. That is fine because it happens on both sides
    # of the comparison; what matters is that the curly and straight forms fold
    # together, since the SVG uses one and OCR returns the other.
    assert norm("don’t") == norm("don't") == "don t"
    hay = norm("Once accumulation is cheap. Analytic Bytes 2026")
    assert contains(hay, "Once accumulation is cheap."), "exact title must match"
    assert not contains(hay, "Partnership is a handoff."), "unrelated title must not match"
    return True


def main():
    repo = Path(__file__).resolve().parent.parent
    if not shutil_which("tesseract"):
        print("tesseract not available; cannot read the cards. Nothing reported.",
              file=sys.stderr)
        return 2
    try:
        self_test()
    except AssertionError as a:
        print("self-test FAILED: %s\nrefusing to report" % a, file=sys.stderr)
        return 2

    tsx = (repo / "app" / "library" / "essays.tsx").read_text()
    entries = []
    for mm in re.finditer(r'slug:\s*"([^"]+)"', tsx):
        blk = tsx[max(0, mm.start() - 1200): mm.start() + 1600]
        cov = re.search(r'cover:\s*"([^"]+)"', blk)
        ttl = re.search(r'title:\s*"([^"]+)"', blk)
        num = re.search(r'number:\s*"(\d+)"', blk)
        kind = re.search(r'kind:\s*"([^"]+)"', blk)
        if cov and ttl and num and kind:
            entries.append((mm.group(1), cov.group(1), ttl.group(1),
                            num.group(1), kind.group(1)))

    seen, bad, missing, soft, ok = set(), [], [], [], 0
    for slug, cov, title, number, kind in entries:
        if slug in seen:
            continue
        seen.add(slug)
        svg = repo / "public" / cov.lstrip("/")
        png = svg.with_name(svg.name.replace(".svg", "-og.png"))
        if not svg.exists():
            continue
        if not png.exists():
            missing.append(slug)
            continue
        card = ocr(png)
        issues = []
        # THE TITLE RULE IS STRICT (Cover Framework, Title section). The
        # title painted on the cover must match the JSX title character for
        # character. Only the SUBTITLE may be abridged. So two checks, and
        # neither falls back to "some other line on the card is close enough":
        #
        # 1. Text, no OCR: the SVG's painted title line equals the JSX title.
        svg_title = re.search(r'font-size="3\d" font-weight="500"[^>]*>([^<]+)</text>',
                              svg.read_text().replace("&#8217;", "’"))
        if not svg_title or norm(svg_title.group(1)) != norm(title):
            issues.append("cover SVG title %r != JSX title %r"
                          % (svg_title.group(1) if svg_title else None, title))
        # 2. Pixels: the card shows that title. Full-card OCR in psm 6 can drop
        #    the title line when the motif is a multi-column diagram (seen on
        #    the-reach-trap), so on a miss, re-read the title band alone
        #    (y 400-470 at 1200x630) before calling it a defect.
        if not contains(card, title) and not contains(ocr(png, "1200x70+0+400"), title):
            issues.append("title not found in card")
        # EYEBROW IS INFORMATIONAL, NOT A FAILURE.
        # It is 11px, wide-tracked and set in light blue on white, which is the
        # combination OCR handles worst. Six cards were flagged whose eyebrows
        # are perfectly legible when you look at them. Raising contrast before
        # thresholding to recover them destroyed everything else: that attempt
        # took the run from 20 matched to 0 matched, 40 flagged. So the eyebrow
        # is reported at low confidence and does not fail the check, because a
        # flag nobody can act on is the kind that turns the whole report into
        # scenery.
        label = "Field Note" if kind == "field-note" else "Essay"
        if not contains(card, "%s No. %s" % (label, number)):
            soft.append("%s: eyebrow unreadable to OCR (verify by eye)" % slug)
        # the cover's own subtitle: longest painted line that is not the title
        # THE SUBTITLE IS THE LINE AFTER THE TITLE, not the longest line.
        # Taking the longest picked a diagram label on the-reach-trap --
        # "emerging - building - established - sustained" is a box caption
        # inside the artwork, not the cover subtitle, which is "The CRM counts
        # reach." Covers with wordy diagrams would fail forever on that.
        lines = svg_lines(svg)
        sub = None
        for i, t in enumerate(lines):
            if norm(t) == norm(title):
                for nxt in lines[i + 1:]:
                    if ("analytic bytes" not in nxt.lower() and not nxt.isupper()
                            and len(nxt.split()) >= 3):
                        sub = nxt
                        break
                break
        if sub:
            if not contains(card, sub):
                issues.append("cover subtitle not found: %r" % sub[:60])
        if issues:
            bad.append((slug, issues))
        else:
            ok += 1

    print("=== OG CARD vs COVER SVG ===\n")
    for slug, issues in bad:
        print("  MISMATCH  %s" % slug)
        for i in issues:
            print("              %s" % i)
    for slug in missing:
        print("  NO CARD   %s" % slug)
    if soft:
        print("\n  low confidence (OCR limit, not necessarily a defect):")
        for n in soft:
            print("    %s" % n)
    print("\n  %d matched, %d mismatched, %d with no card" % (ok, len(bad), len(missing)))
    return 1 if (bad or missing) else 0


def shutil_which(x):
    from shutil import which
    return which(x)


if __name__ == "__main__":
    sys.exit(main())
