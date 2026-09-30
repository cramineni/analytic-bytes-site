import re,html,difflib,glob,os,sys
#!/usr/bin/env python3
"""
Report which markdown sources and essays.tsx entries have drifted apart.

The Publishing Workflow makes the markdown canonical, so a fold runs MD -> JSX.
That makes two failure directions possible, and only one of them is visible:

  MD ahead   - the markdown carries prose the live site does not. A fold is owed.
  JSX ahead  - the LIVE SITE carries prose the markdown does not, usually because
               someone edited essays.tsx directly. The next fold DELETES it, with
               no warning. This is how a validity-grid ArtifactLink and two
               italicised publication titles were lost (see the 2026-09-30 notes).
  both ways  - each side has prose the other lacks, so the files alone cannot say
               which is newer.

Only one markdown file carries a status/version line, so for the rest there is no
provenance record to break the tie. That is the underlying problem this reports.

Why the self-test: this comparison is easy to get quietly wrong. Earlier versions
of this script reported 35 and then 36 "divergences" that were almost entirely
parser bugs - the body split threw away everything after a mid-document rule, a
'## In brief' heading was not recognised so Brief text leaked into the comparison,
and numbered lists sat inside <NumList> wrappers on both sides. So the script
first checks itself against files independently verified as 1:1 and REFUSES to
print library numbers if it cannot reproduce them. A wrong number here is worse
than no number, because it invites a fold that destroys live text.

Usage:
    python3 scripts/check-md-jsx-drift.py

Exit codes:
    0 = every matched markdown file is in sync
    1 = at least one file has drifted
    2 = the parser failed its own known-good cases (numbers not reported)
"""


REPO=os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
JP=os.path.join(REPO,'app','library','essays.tsx')
_REL = "Claude/AB Strategy & Lirbary/AB_Library_Essays/markdown_sources"
_CANDIDATES = [
    os.path.expanduser("~/Desktop/" + _REL),
    os.path.join(os.path.dirname(REPO), _REL),
    os.path.expanduser("~/" + _REL),
]
D = next((c for c in _CANDIDATES if os.path.isdir(c)), None)
if len(sys.argv) > 1 and sys.argv[1] not in ("-h", "--help"):
    D = sys.argv[1]
if not D or not os.path.isdir(D):
    print("markdown_sources not found. Pass the path:\n"
          "  python3 scripts/check-md-jsx-drift.py '/path/to/markdown_sources'", file=sys.stderr)
    sys.exit(2)

def norm(x):
    x=html.unescape(x)
    for a,c in (('“','"'),('”','"'),('’',"'"),('‘',"'"),('—','--'),('–','-')): x=x.replace(a,c)
    x=re.sub(r'\{"\s*"\}',' ',x); x=re.sub(r'<[^>]+>','',x); x=re.sub(r'\s+',' ',x)
    x=re.sub(r'\s+([,.;:)])',r'\1',x); x=re.sub(r'\(\s+','(',x)
    return x.strip().lower()

t=open(JP).read()
bl=[m.start() for m in re.finditer(r'\n  \{\n    kind: "',t)]+[len(t)]
REG={}
for a,b in zip(bl,bl[1:]):
    k=t[a:b]; s=re.search(r'slug: "([^"]+)"',k)
    if not s: continue
    ti=re.search(r'title: "([^"]+)"',k)
    REG[s.group(1)]={'blk':k,'title':ti.group(1) if ti else '','draft':'draft: true' in k}

def jsx_units(k):
    br=re.search(r'<Brief>.*?</Brief>',k,re.S)
    scan=k.replace(br.group(0),'') if br else k
    scan=re.split(r'<SeeAlso>',scan)[0]
    # NumItem carries numbered-list prose that the markdown writes as "1. ..."
    return [x for x in (norm(m.group(1) or m.group(2) or m.group(3))
            for m in re.finditer(r'<H2>(.*?)</H2>|<P>(.*?)</P>|<NumItem[^>]*>(.*?)</NumItem>',scan,re.S)) if len(x)>25]

def md_units(md):
    body = md.split('\n---\n',1)[1] if '\n---\n' in md else md
    body = re.sub(r'<!--.*?-->','',body,flags=re.S)
    body = re.split(r'<SeeAlso>|<MetaNote>',body)[0]
    out=[]; ib=False
    for p in re.split(r'\n\s*\n',body):
        p=re.sub(r'</?(NumList|NumItem|Brief)>','',p).strip()   # list wrappers sit in the MD too
        if not p: continue
        if set(p)<=set('-*_ ') and len(p)>=3: ib=False; continue
        if p.startswith('# '): continue
        low=p.lstrip('#').strip('*').strip().lower()   # '## In brief' and '**IN BRIEF**'
        if low.startswith('in brief'): ib=True; continue
        if p.startswith('## '): ib=False; out.append(norm(p[3:])); continue   # <-- the reset
        if p.startswith(('>','![','|','- ','* ','+ ')): continue      # blockquote, figure, table, Read-next list
        if '\u00b7' in p and 'analytic bytes' in p.lower(): continue   # byline line
        if re.match(r'^(chaitanya ramineni|analytic bytes)\b',p,re.I): continue
        if ib: continue
        if p.startswith('*') and p.endswith('*') and '](' not in p and len(p)<400: continue
        clean=norm(re.sub(r'\[([^\]]+)\]\([^)]+\)',r'\1',re.sub(r'[*_`#]','',p)))
        if len(re.findall(r'(?m)^\s*\d+\.\s',p))>=2:
            for item in re.split(r'(?m)^\s*\d+\.\s+',p):
                it=norm(re.sub(r'\[([^\]]+)\]\([^)]+\)',r'\1',re.sub(r'[*_`#]','',item)))
                if it: out.append(it)
            continue
        out.append(clean)
    return [x for x in out if len(x)>25]

def orphans(A,B,cut=0.93):
    pool=list(B); out=[]
    for x in A:
        m=difflib.get_close_matches(x,pool,n=1,cutoff=cut)
        if m: pool.remove(m[0])
        else: out.append(x)
    return out

def match(f):
    md=open(f).read(); fm=md.split('\n---\n',1)[0]
    c=re.search(r'cover:\s*"?/?(?:library/covers/)?([a-z0-9\-]+)\.svg"?',fm)
    if c and c.group(1) in REG: return c.group(1),md
    ti=re.search(r'title:\s*"([^"]+)"',fm)
    if ti:
        for s,v in REG.items():
            if v['title'].strip().lower()==ti.group(1).strip().lower(): return s,md
    return None,md

# ---- SELF TEST: two files independently verified as 1:1 must come out clean
TESTS=('for_the_record.md','valid_dollar.md','three_trainings_three_questions.md')
fail=[]
for tf in TESTS:
    slug,md=match(os.path.join(D,tf))
    J,M=jsx_units(REG[slug]['blk']),md_units(md)
    mo,jo=orphans(M,J),orphans(J,M)
    ok = (len(mo)+len(jo))==0
    print("SELF-TEST %-38s MD %-3d JSX %-3d orphans %d/%d  %s"%(tf,len(M),len(J),len(mo),len(jo),"PASS" if ok else "FAIL"))
    if not ok: fail.append(tf)
if fail:
    print("\nParser fails its own known-good cases (%s). Not reporting library numbers."%", ".join(fail)); sys.exit(1)
print()

rows=[];unm=[]
for f in sorted(glob.glob(D+"/*.md")):
    slug,md=match(f)
    if not slug: unm.append(os.path.basename(f)); continue
    J,M=jsx_units(REG[slug]['blk']),md_units(md)
    mo,jo=orphans(M,J),orphans(J,M)
    rows.append(dict(f=os.path.basename(f),slug=slug,J=len(J),M=len(M),mo=len(mo),jo=len(jo),
                     ver=bool(re.search(r'status:\s*"v',md)),draft=REG[slug]['draft'],
                     mo_ex=mo[:1],jo_ex=jo[:1]))
rows.sort(key=lambda r:-(r['mo']+r['jo']))
print("%-40s %-8s %-8s %-9s %s"%("markdown file","MD/JSX","MD-only","JSX-only","verdict"))
print("-"*96)
import collections; c=collections.Counter()
for r in rows:
    n=r['mo']+r['jo']
    v=("in sync" if n==0 else "both ways" if r['mo'] and r['jo'] else "MD ahead" if r['mo'] else "JSX ahead")
    c[v]+=1
    print("%-40s %-8s %-8d %-9d %s%s"%(r['f'][:39],"%d/%d"%(r['M'],r['J']),r['mo'],r['jo'],v,"  [DRAFT]" if r['draft'] else ""))
print("\n",dict(c))
print("files carrying a status/version line: %d of %d"%(sum(1 for r in rows if r['ver']),len(rows)))
print("markdown not matched to the registry: %d"%len(unm))
sys.exit(0 if c["in sync"]==len(rows) else 1)
