#!/usr/bin/env python3
"""Markdown -> JSX body converter for app/library/essays.tsx.

Lives in the repo rather than /tmp because it was rebuilt from scratch three
times after the sandbox recycled, and each rebuild reintroduced a bug that had
already been fixed once.

Every rule below exists because its absence broke a real fold:

  body split      take everything after the FIRST frontmatter separator. Taking
                  the last one discarded the whole body of any file with a '---'
                  rule near the end (validity_layer: 47k chars -> 10k).
  rules           a '---' with no blank line above glues to the paragraph before
                  it, so it never registers as its own block.
  dek             the italic line after the H1 is the subtitle; it has its own
                  JSX field and must not be emitted as a body paragraph.
  link titles     sibling AB pieces and artifacts are linked in PLAIN text
                  (measured: 138 plain vs 12 italic; 25 vs 0 for ArtifactLink).
                  External publication titles keep their italics in the anchor.
  NumList         numbered lists sit inside <NumList> wrappers in the markdown
                  too, so the wrapper is stripped before the items are split.
  entities        body prose uses HTML entities; alt/caption are string fields
                  and take raw Unicode.
  quotes          the markdown uses straight ASCII quotes; curl them first.
"""
import html, re

ACLS = ('text-accent hover:text-accent-2 no-underline border-b border-line-2 '
        'hover:border-accent pb-px')


def smart(s):
    out, open_d = [], True
    for ch in s:
        if ch == '"':
            out.append('“' if open_d else '”'); open_d = not open_d
        elif ch == "'":
            out.append('’')
        else:
            out.append(ch)
    return ''.join(out)


def entities(s):
    s = smart(s).replace('&', '&amp;')
    for a, b in (('—', '&mdash;'), ('–', '&ndash;'), ('’', '&rsquo;'),
                 ('‘', '&lsquo;'), ('“', '&ldquo;'), ('”', '&rdquo;'),
                 ('…', '&hellip;')):
        s = s.replace(a, b)
    return s


def _emph(x):
    x = re.sub(r'(?<!\*)\*\*([^*]+)\*\*(?!\*)', r'<B>\1</B>', x)
    return re.sub(r'(?<!\*)\*([^*]+)\*(?!\*)', r'<I>\1</I>', x)


def inline(md):
    slots = []

    def link(m):
        text, url = m.group(1), m.group(2)
        if url.startswith('/library/') and text.startswith('*') and text.endswith('*'):
            text = text.strip('*')                      # house: siblings link plain
        inner = _emph(entities(text))
        if url.startswith('/library/artifacts/'):
            tag = '<ArtifactLink slug="%s">%s</ArtifactLink>' % (url.rsplit('/', 1)[1], inner)
        elif url.startswith('/library/') and not url.endswith('.svg'):
            tag = '<InternalLink slug="%s">%s</InternalLink>' % (url.rsplit('/', 1)[1], inner)
        else:
            tag = '<a href="%s" target="_blank" rel="noopener" className="%s">%s</a>' % (url, ACLS, inner)
        slots.append(tag)
        return '\x00%d\x00' % (len(slots) - 1)

    s = re.sub(r'\[([^\]]+)\]\(([^)]+)\)', link, md)
    s = _emph(entities(s))
    for n, r in enumerate(slots):
        s = s.replace('\x00%d\x00' % n, r)
    return s


def convert(md_path, brief_jsx, tail_jsx):
    md = open(md_path).read()
    body = md.split('\n---\n', 1)[1] if '\n---\n' in md else md
    body = re.sub(r'(?m)^[ \t]*(-{3,}|\*{3,}|_{3,})[ \t]*$', '\n\n---\n\n', body)
    body = re.sub(r'<!--.*?-->', '', body, flags=re.S)
    body = re.split(r'<SeeAlso>|## Read next', body)[0]

    out, inbrief, seen_h1 = [brief_jsx], False, False
    paras = re.split(r'\n\s*\n', body)
    k = 0
    while k < len(paras):
        p = re.sub(r'</?(NumList|NumItem|Brief)>', '', paras[k]).strip(); k += 1
        if not p:
            continue
        if set(p) <= set('-*_ ') and len(p) >= 3:
            inbrief = False; continue
        if p.startswith('# '):
            seen_h1 = True; continue
        if p.lstrip('#').strip('*').strip().lower().startswith('in brief'):
            inbrief = True; continue
        if p.startswith('## '):
            inbrief = False; seen_h1 = False
            out.append('\n        <H2>%s</H2>' % inline(p[3:].strip())); continue
        if seen_h1 and p.startswith('*') and p.endswith('*') and '](' not in p and len(p) < 300:
            seen_h1 = False; continue                   # the dek
        seen_h1 = False
        if inbrief:
            continue
        m = re.match(r'!\[([^\]]*)\]\(([^)]+)\)\s*$', p)
        if m:
            alt, src, cap = m.group(1), m.group(2), ''
            if k < len(paras):
                nxt = paras[k].strip()
                if nxt.startswith('*') and nxt.endswith('*') and '](' not in nxt:
                    cap = nxt.strip('*').strip(); k += 1
            out.append('\n        <Figure\n          src="%s"\n          alt="%s"\n          caption="%s"\n        />'
                       % (src, smart(alt), smart(cap)))
            continue
        if len(re.findall(r'(?m)^\s*\d+\.\s', p)) >= 2:
            items = [x for x in re.split(r'(?m)^\s*\d+\.\s+', p) if x.strip()]
            inner = '\n'.join('          <NumItem n={%d}>\n            %s\n          </NumItem>'
                              % (n + 1, inline(it.strip())) for n, it in enumerate(items))
            out.append('\n        <NumList>\n%s\n        </NumList>' % inner); continue
        out.append('\n        <P>\n          %s\n        </P>' % inline(p))
    out.append(tail_jsx)
    return ''.join(out)
