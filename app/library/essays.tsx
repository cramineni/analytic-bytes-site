import type { ReactNode } from "react";

// =====================================================================
// LIBRARY PIECES — full-text content + registry (essays + field notes).
// =====================================================================
// Each piece renders on its own route at /library/[slug] via app/library/[slug]/page.tsx.
// `kind` distinguishes essays (standalone arguments) from field notes (reports
// from specific practice). Each kind carries its own number sequence.
//
// Every piece here has passed AB_Editorial_Standard.md — the eight-gate
// pre-publish standard (soul, voice, de-AI, overreach, facts, balance, rigor,
// sourcing). Edit copy in the body JSX directly; re-run the standard after.
// =====================================================================

// ---------------------------------------------------------------------
// PROSE PRIMITIVES — the only place essay styling lives.
// ---------------------------------------------------------------------

/** The "In brief" callout block at the top of each piece. */
function Brief({ children }: { children: ReactNode }) {
  return (
    <aside className="my-10 border-l-2 border-accent bg-bg-alt rounded-r-md pl-6 pr-6 py-6">
      <div className="font-mono text-[11px] text-accent tracking-[0.18em] uppercase mb-4">
        In brief
      </div>
      <div className="text-ink-2 text-[15px] sm:text-[16px] leading-[1.7] space-y-4">
        {children}
      </div>
    </aside>
  );
}

/** Section heading. */
function H2({ children }: { children: ReactNode }) {
  return (
    <h2 className="text-ink font-extrabold tracking-[-0.02em] text-[24px] sm:text-[30px] leading-[1.2] mt-14 mb-5">
      {children}
    </h2>
  );
}

/** Sub-section heading. */
function H3({ children }: { children: ReactNode }) {
  return (
    <h3 className="text-ink font-bold tracking-[-0.01em] text-[17px] sm:text-[19px] leading-[1.3] mt-9 mb-3">
      {children}
    </h3>
  );
}

/** Body paragraph. */
function P({ children }: { children: ReactNode }) {
  return (
    <p className="text-ink-2 text-[17px] sm:text-[18px] leading-[1.72] mb-6">
      {children}
    </p>
  );
}

/** Inline emphasis — pulls a phrase up to primary ink weight. */
function B({ children }: { children: ReactNode }) {
  return <strong className="text-ink font-semibold">{children}</strong>;
}

/** Inline italic. */
function I({ children }: { children: ReactNode }) {
  return <em className="italic">{children}</em>;
}

/** Inline code / technical term. */
function C({ children }: { children: ReactNode }) {
  return (
    <code className="font-mono text-[0.85em] text-ink bg-bg-alt border border-line rounded px-1.5 py-0.5">
      {children}
    </code>
  );
}

/** Punchy standalone line — for the piece's load-bearing sentences. */
function Pull({ children }: { children: ReactNode }) {
  return (
    <p className="my-9 text-ink font-bold tracking-[-0.015em] text-[20px] sm:text-[24px] leading-[1.35]">
      {children}
    </p>
  );
}

/** Numbered list wrapper + item. */
function NumList({ children }: { children: ReactNode }) {
  return <ol className="list-none p-0 m-0 mb-7 space-y-5">{children}</ol>;
}
function NumItem({ n, children }: { n: number; children: ReactNode }) {
  return (
    <li className="relative pl-11">
      <span className="absolute left-0 top-[2px] font-mono text-[13px] text-accent font-semibold tabular-nums">
        {String(n).padStart(2, "0")}
      </span>
      <span className="block text-ink-2 text-[17px] sm:text-[18px] leading-[1.72]">
        {children}
      </span>
    </li>
  );
}

/** Comparison table. */
function EssayTable({
  headers,
  rows,
}: {
  headers: string[];
  rows: string[][];
}) {
  return (
    <div className="my-9 overflow-x-auto">
      <table className="w-full border-collapse text-left">
        <thead>
          <tr>
            {headers.map((h, i) => (
              <th
                key={i}
                className="border-b-2 border-line-2 py-2.5 pr-4 align-bottom font-mono text-[10.5px] text-accent tracking-[0.08em] uppercase"
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, ri) => (
            <tr key={ri}>
              {row.map((cell, ci) => (
                <td
                  key={ci}
                  className={`border-b border-line py-2.5 pr-4 text-[13px] sm:text-[14px] leading-[1.5] ${
                    ci === 0 ? "font-semibold text-ink" : "text-ink-2"
                  }`}
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/** Horizontal bar figure for in-body statistics. */
function BarFigure({
  label,
  bars,
  source,
}: {
  label: string;
  bars: { name: string; value: number }[];
  source: string;
}) {
  return (
    <figure className="my-9 border border-line rounded-md bg-bg-alt px-5 py-6 sm:px-7">
      <figcaption className="font-mono text-[11px] text-accent tracking-[0.14em] uppercase mb-5">
        {label}
      </figcaption>
      <div className="space-y-3.5">
        {bars.map((b) => (
          <div key={b.name} className="flex items-center gap-3 sm:gap-4">
            <div className="w-[112px] sm:w-[136px] shrink-0 font-mono text-[12px] sm:text-[13px] text-ink-2 leading-[1.3]">
              {b.name}
            </div>
            <div className="flex-1 h-7 rounded-sm bg-bg border border-line relative overflow-hidden">
              <div
                className="absolute inset-y-0 left-0 bg-accent"
                style={{ width: `${b.value}%` }}
              />
            </div>
            <div className="w-[42px] shrink-0 text-right font-mono text-[13px] sm:text-[14px] font-semibold text-ink tabular-nums">
              {b.value}%
            </div>
          </div>
        ))}
      </div>
      <div className="mt-5 font-mono text-[11px] text-ink-3 tracking-[0.03em]">
        {source}
      </div>
    </figure>
  );
}

/** Closing meta-note — publication date + caveats. */
function MetaNote({ children }: { children: ReactNode }) {
  return (
    <p className="mt-12 pt-6 border-t border-line text-ink-3 text-[13px] sm:text-[14px] italic leading-[1.6]">
      {children}
    </p>
  );
}

/** Compact framed note — sensitivity / crisis-line callouts. */
function Note({ children }: { children: ReactNode }) {
  return (
    <p className="my-9 border-l-2 border-line-2 bg-bg-alt rounded-r-md pl-5 pr-5 py-4 text-ink-2 text-[14px] sm:text-[15px] leading-[1.65]">
      {children}
    </p>
  );
}

/** Image figure with caption — for charts and diagrams embedded in an essay body. */
function Figure({
  src,
  alt,
  caption,
}: {
  src: string;
  alt: string;
  caption?: string;
}) {
  return (
    <figure className="my-9 border border-line rounded-md bg-bg-alt p-4 sm:p-5">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={alt}
        className="w-full h-auto block rounded-sm"
        loading="lazy"
      />
      {caption ? (
        <figcaption className="mt-3 px-1 text-ink-3 text-[12.5px] sm:text-[13px] leading-[1.55] italic">
          {caption}
        </figcaption>
      ) : null}
    </figure>
  );
}

/** Inline cross-link to another library piece. Use mid-essay when prose
 * naturally invokes another piece's argument. Looks the same as an external
 * link; the slug-based href keeps the navigation consistent. */
function InternalLink({
  slug,
  children,
}: {
  slug: string;
  children: ReactNode;
}) {
  return (
    <a
      href={`/library/${slug}`}
      className="text-accent hover:text-accent-2 no-underline border-b border-line-2 hover:border-accent pb-px"
    >
      {children}
    </a>
  );
}

/** Inline link to an artifact's dedicated page at /library/artifacts/{slug}.
 * Use mid-essay only when prose explicitly invokes the diagram or frame the
 * artifact depicts. Exported so other pages (e.g. case-studies, the /library
 * hero) can reuse the styling. Previously anchored to /library#artifact-{slug};
 * retargeted 2026-07-17 when artifacts got their own routes. */
export function ArtifactLink({
  slug,
  children,
}: {
  slug: string;
  children: ReactNode;
}) {
  return (
    <a
      href={`/library/artifacts/${slug}`}
      className="text-accent hover:text-accent-2 no-underline border-b border-line-2 hover:border-accent pb-px"
    >
      {children}
    </a>
  );
}

/** End-of-essay "Read next" block — pairs the piece with 2-3 related pieces
 * along the same arc. Rendered before the MetaNote so the navigation lands
 * while the reader is still in the mood to follow it. */
function SeeAlso({ children }: { children: ReactNode }) {
  return (
    <aside className="mt-12 pt-6 border-t border-line">
      <div className="font-mono text-[11px] text-accent tracking-[0.18em] uppercase mb-4">
        Read next
      </div>
      <ul className="list-none p-0 m-0 space-y-3">{children}</ul>
    </aside>
  );
}

/** A single item inside a SeeAlso block. Title links to /library/[slug];
 * gloss is a short one-line description of the connection (not a summary
 * of the linked piece). */
function SeeAlsoItem({
  slug,
  title,
  gloss,
}: {
  slug: string;
  title: string;
  gloss: string;
}) {
  return (
    <li className="leading-[1.55] text-[14.5px] sm:text-[15px]">
      <a
        href={`/library/${slug}`}
        className="text-ink hover:text-accent no-underline font-semibold"
      >
        {title}
      </a>
      <span className="text-ink-2"> — {gloss}</span>
    </li>
  );
}

// ---------------------------------------------------------------------
// PIECE TYPE + REGISTRY
// ---------------------------------------------------------------------

/** Soft taxonomy for navigating the library. Four disciplines that
 * compose AB's umbrella frame — Decision-System Architecture. Each piece
 * belongs to one primary arc; bridging pieces get the discipline whose
 * frame they live inside, not the layer they touch. The umbrella itself
 * is the library, not a slice of it. Used to render the arc pill on
 * /library and as a future filter dimension. */
export type Arc =
  | "measurement"
  | "integration-governance"
  | "ai-systems"
  | "data-foundations";

export const ARC_LABELS: Record<Arc, string> = {
  measurement: "Measurement",
  "integration-governance": "Integration governance",
  "ai-systems": "AI systems",
  "data-foundations": "Data foundations",
};

// Four canonical disciplines of AB's Decision-System Architecture frame.
// Renamed 2026-08-08: "Organizational design" → "Data foundations". The
// seven pieces under this arc are about the data function's position,
// authority, ownership, and coordination — where data sits and who owns
// data work. Framework may evolve later to add pills or elevate Data
// Foundations to something else; for now, four disciplines, one frame.
export const DISCIPLINE_ARCS: readonly Arc[] = [
  "measurement",
  "integration-governance",
  "ai-systems",
  "data-foundations",
];

export type Essay = {
  kind: "essay" | "field-note";
  slug: string;
  number: string; // sequence number within its kind, e.g. "01"
  title: string;
  subtitle: string;
  date: string; // YYYY-MM-DD
  readingTime: string; // "11 min read"
  summary: string; // 1–2 lines, for the /library index
  cover: string; // /library/covers/[file].svg
  arc: Arc; // primary arc for navigation + future filtering
  hidden?: boolean; // if true, hidden everywhere (dev + prod). Use for retired or archived pieces.
  draft?: boolean; // if true, hidden in production but visible in local dev (npm run dev). Use for pieces you're still reading/iterating on before publishing.
  body: ReactNode;
};

export const ESSAYS: Essay[] = [
  // ===================================================================
  // ESSAY 01 — Three Surfaces, One Keystone
  // ===================================================================
  {
    kind: "essay",
    slug: "three-surfaces-one-keystone",
    number: "01",
    title: "Three Surfaces, One Keystone",
    subtitle: "Why BI tool selection is the last decision, not the first.",
    date: "2026-05-08",
    readingTime: "11 min read",
    summary:
      "Why BI tool selection is the last decision, not the first — and the three reporting surfaces most analytics products owe their audiences.",
    cover: "/library/covers/three-surfaces-one-keystone.svg",
    arc: "data-foundations",
    body: (
      <>
        <Brief>
          <p>
            Most leaders meet this problem as a procurement decision. A budget
            request lands for a BI platform (Tableau, Power BI, Looker,
            Sisense) with an evaluation matrix attached and a recommendation at
            the bottom. Approve it, and on paper reporting is handled.
          </p>
          <p>
            It isn’t. The reason deserves a leader’s attention before the
            signature goes on. The tool is the last decision in the sequence,
            not the first. The decisions that determine whether your reporting
            changes how the organization acts come earlier, and they are not
            technology decisions. They are decisions about which calls your
            teams are trying to make, and whether everyone is working from the
            same numbers. This is a decision-system question misread as a
            procurement question.
          </p>
          <p>
            What follows is written for the person who has to build the thing,
            but the leadership point sits up front: get the sequence right and
            the vendor choice barely matters; get it wrong and no vendor will
            save you.
          </p>
        </Brief>

        <P>
          Sooner or later somebody hands you a BI evaluation matrix. The columns
          are Tableau, Power BI, Looker, Sisense, ThoughtSpot, Reveal. The rows
          are dashboards, embedding, semantic modeling, warehouse compatibility,
          narrative reporting. The exercise looks reasonable, the cells fill in,
          and a winner emerges. Six months later the product underperforms in
          ways nobody can quite articulate. Reports look like screenshots. The
          ops team opens the dashboard only to click through to other systems.
          Leadership has stopped opening the executive dashboard.
        </P>
        <P>
          The matrix is a real exercise; every product team has to run it
          eventually. The trap is running it first, before clarifying what
          kinds of reporting need different surfaces.
        </P>
        <P>
          In most product organizations I’ve watched, skipping that step
          produces sprawl. Multiple tool licenses, no cohesion across reports
          and dashboards, users still running workarounds because no single
          tool quite fit the job it was handed. AI features amplify it. More
          vendors offer more in-tool AI, there is more incentive to bolt
          features in across the stack, and more risk of overpaying for AI
          without knowing where each capability belongs.
        </P>
        <P>
          An analytics product that serves more than one audience, and that is
          most of them, is serving three reporting surfaces at once. They differ
          on five dimensions: audience, cadence, governance, permission model,
          output format. None of the five compromises gracefully. Force a
          single tool to span all three surfaces and the result is mediocre on
          every axis. The failure never trips an alarm. It just produces a
          system nobody relies on.
        </P>
        <P>
          The first decision is not which BI tool. It is recognizing that the
          surfaces are different products, and giving each the architecture it
          deserves. The second decision is the semantic layer feeding all
          three, and it matters more than any surface choice. Vendor selection
          comes last. Once the rest is done, it barely matters.
        </P>

        <Figure
          src="/library/figures/three_surfaces_one_keystone_figure.svg"
          alt="Three surfaces, one keystone: three reporting products sitting on one canonical semantic layer"
          caption="Three surfaces above. One canonical computation beneath. The keystone is what keeps the same number in every one of them."
        />

        <H2>The three surfaces</H2>
        <P>
          <B>Surface A is the program report.</B> A school report, a quarterly
          client deck, a regulatory filing, a board appendix. The audience is
          specific (one school, one client, one regulator), and the cadence is
          per cycle. Every output goes through review: a program lead reads it,
          comms revises the language, legal sometimes signs off, and it gets
          published. The artifact persists. Three years from now someone will
          pull the Spring 2024 version and expect it to render identically.
          Sentence-level language matters here, because the readers are
          non-technical and the data is about them.
        </P>
        <P>
          <B>Surface B is the operator console.</B> Internal staff, opened
          whenever they open it, governance essentially nil because nothing gets
          published from it. The user wants “what’s mine, what’s overdue, what
          changed since last week.” The output is the workflow itself. The user
          does work in the surface; they don’t read and leave. Its failure
          mode is being a day out of date.
        </P>
        <P>
          <B>Surface C is the executive view.</B> Leadership and board,
          quarterly cadence, governance light because the audience already
          trusts the source. The user wants “are we winning at the portfolio
          level,” not site-level granularity. The artifact is usually projected
          in a meeting, occasionally exported to a PDF nobody reads carefully.
        </P>
        <P>
          These are three different products. Who reads them, how often, under
          what review, with what access, how long the output must last — they
          differ on every dimension, and none of them bend gracefully.
        </P>

        <EssayTable
          headers={[
            "",
            "Surface A — report",
            "Surface B — console",
            "Surface C — executive",
          ]}
          rows={[
            ["Audience", "external, specific", "internal, role-based", "leadership, portfolio"],
            ["Cadence", "per cycle", "continuous", "quarterly"],
            ["Governance", "reviewed, approved", "none", "light"],
            ["Permission", "per-recipient", "role-based", "broad"],
            ["Output", "branded document", "live workspace", "summary view"],
          ]}
        />

        <P>
          No single tool is good at all three surfaces. What most teams end up
          with is a tool that is strong on one and just acceptable on the
          others, accepted as “the BI stack” by default. That is not a tool
          problem. It is what the org chart produces: one person who owns
          “BI,” one tool that owns “all reporting.” It will reproduce with
          whichever vendor you pick next, until the structure changes.
        </P>

        <H2>Why no BI vendor solves the publication problem</H2>
        <P>
          Surface A is the interesting case, because that is where the BI
          vendor pitch fails worst and where most organizations underestimate
          the gap.
        </P>
        <P>
          Most BI tools on a typical evaluation matrix assume the deliverable is
          a screen rendered live against a data source. The publication problem
          needs the inverse: a templated document with branded typography,
          headers, footers, footnotes, and language that comms or design owns
          separately from the analyst. PDF export from a BI tool produces a
          screenshot, not a structured document. The artifact a board member
          emails to a colleague is a Word file, or a PDF that looks like one.
          Nobody forwards a dashboard URL with a login prompt behind it.
        </P>
        <P>
          There is also a layout-ownership problem. In a BI tool, the analyst
          owns the visual layout because the layout is the dashboard. In a real
          publication system, comms or design owns the template and the analyst
          owns the data. Those should be different people with different review
          authority and different release cadences. BI vendors don’t have a
          credible answer for that split, and most don’t attempt one.
        </P>
        <P>
          The right architecture for Surface A is the one formal-publication
          systems already use: legal contracts, financial statements,
          regulatory filings, clinical trial reports. Templated layout owned by
          the layout team, data tokens inserted at render time, the result
          snapshotted at publication. Concretely: a Word or PowerPoint template
          registry, a token resolver that pulls metric values from the
          warehouse at render time, a snapshotting layer that records what data
          each published artifact came from, and a review-state machine — draft,
          commented, approved, published.
        </P>
        <P>
          This is unglamorous plumbing. It has no vendor logo. But it gives you
          four things no BI tool can match. The output is reproducible: the same
          metric snapshot and the same template produce a byte-identical file
          forever. The layout is independent: comms can rewrite the template
          without involving engineering. The governance reaches sentence level:
          every published string has a known author, reviewer, and timestamp.
          And it stays LLM-safe: a model can fill narrative tokens from a single
          metric row, with the reviewer’s sign-off recorded before anything
          publishes.
        </P>
        <P>
          The mistake organizations make is being talked into replacing this
          path with “embed a Tableau dashboard in a PDF” because it sounds like
          one less system. The system that goes missing is the one built for
          the job.
        </P>

        <H2>The keystone: one canonical computation per concept</H2>
        <P>
          The keystone argument is non-negotiable. It is the difference between
          a system that scales and a system that loses credibility over time.
        </P>
        <P>
          Whatever combination of surfaces gets built, all of them should read
          from a single semantic layer where every metric is defined exactly
          once, in code, tested, and version-controlled. <C>dbt</C> is the
          dominant choice for this on the warehouse side, but the principle is
          older than the tool. It is just one canonical computation per concept.
          The{" "}
          <ArtifactLink slug="decision-system-reference-architecture">
            reference architecture
          </ArtifactLink>{" "}
          places the semantic layer as the keystone of the whole stack, feeding
          AI and reporting alike — so every surface sees the same number.
        </P>
        <P>
          In practice, each metric has a single materialization. Domain
          rollups, scoring rules, trajectory classifications: each defined in
          one file, with one reviewable diff. Tests run automatically — grain
          uniqueness, score-range bounds, mapping coverage, completeness
          thresholds. The build graph tracks which downstream artifacts depend
          on each upstream change, so when an item map advances from V3 to V4,
          you know which dashboards and reports need re-validation.
        </P>
        <P>
          All three surfaces then read from the same materialized marts. The
          publication template resolves a row from <C>marts.f_cycle_metrics</C>.
          The operator console queries <C>marts.f_open_actions</C>. The
          executive dashboard reads <C>marts.f_portfolio_rollup</C>. There is
          one source of truth for any metric, and it costs about one
          engineer-month of upfront modeling plus the standing discipline of not
          adding shadow definitions.
        </P>
        <P>
          That discipline is the part that fails. Which is why the architecture
          has to do the enforcing.
        </P>

        <H2>The drift war story</H2>
        <P>
          “Do the keystone first” is non-negotiable because of the failure mode
          it prevents.
        </P>
        <P>
          Without a single semantic layer, this is what happens. The publication
          template uses <C>select avg(item_value)…</C> written by an analyst in
          2023. The dashboard uses Tableau’s calculated-field syntax with a
          slightly different filter for null handling. The Streamlit prototype
          uses pandas with <C>.mean()</C> and forgets to drop incomplete
          responses. The operator console uses a Python helper that hardcodes
          which items belong to which domain. Each calculates “Domain 4 score”
          with technically reasonable but slightly different rules.
        </P>
        <P>
          Three artifacts, same site, same cycle, three different numbers. A
          program lead notices. They escalate. The analyst spends a week
          reconciling. Next quarter it happens again, because nothing
          structurally changed: three definitions still live in three places,
          and any one of them can drift on its own.
        </P>
        <P>
          This is one of the most common failure modes in analytics products.
          It’s slow. It rarely triggers a single alarm. It degrades the
          credibility of every artifact the team produces, until people stop
          quoting numbers in meetings and start saying “I’d want to verify
          that.” Once that phrase shows up, the product has failed even if
          it’s still being maintained.
        </P>
        <P>
          This is what a decision-system problem looks like at the root: not a
          missing dashboard, but a missing source of truth that adds
          re-verification cost to every downstream decision. Every number
          arrives with a question attached, and the decision-maker has to
          resolve it before they can act.
        </P>
        <P>
          The semantic layer prevents drift by removing the alternative. If the
          only way to compute “Domain 4 score” is to read{" "}
          <C>marts.f_school_domain_wave</C>, drift cannot happen between
          surfaces, because there is no second definition to drift toward. That
          is the keystone property. It is not that everyone agrees to be
          careful; it is that there is nothing to be careless about.
        </P>

        <H2>Sequencing</H2>
        <P>
          This is where most teams get it wrong, including teams that agree
          with everything above. The instinct is to start with the visible
          surface: pick a BI tool, build a dashboard, show leadership progress.
          The result is a polished surface over an unmodeled data layer,
          worse than the prototype it replaced because now it looks credible.
        </P>
        <P>The right sequence is:</P>
        <NumList>
          <NumItem n={1}>
            <B>Build the semantic layer first.</B> dbt project, marts, tests,
            version pinning. No surfaces yet. This feels like nothing is
            shipping. It is the most important phase.
          </NumItem>
          <NumItem n={2}>
            <B>Then Surface A,</B> because publications are the highest-stakes
            artifact and the architecture is mostly plumbing on top of templates
            that already exist. The token resolver and the snapshotting are
            well-understood patterns; the work is in template inventory and
            review-state machinery, not in invention.
          </NumItem>
          <NumItem n={3}>
            <B>Then Surface B,</B> the operator console. Streamlit-in-warehouse
            or a thin app on top of the marts. This is where actions get
            assigned and tracked, which is where program value compounds.
          </NumItem>
          <NumItem n={4}>
            <B>Then Surface C</B> if needed at all, and the vendor question is
            small at this point. Tableau, Power BI, Looker: they all read from a
            properly-modeled warehouse competently. Pick whatever the org
            already has skills in. This is the last decision and the least
            consequential one.
          </NumItem>
        </NumList>
        <P>
          The vendor-evaluation matrix that arrives at the start of this work is
          not wrong. It is premature. Run it after the semantic layer exists and
          you will find the choice barely matters. Run it before, and the six
          months you spend on it will go toward tuning the wrong variable,
          while the layer that decides the outcome still hasn’t been built.
        </P>

        <H2>Closing</H2>
        <P>
          The question “which BI tool should we use” feels like a real decision:
          there is a matrix, there are vendors, there are demos. But it is the
          last decision in the sequence, and the sequence is what determines
          whether the product works.
        </P>
        <Pull>Three surfaces. One keystone. Vendor last.</Pull>
        <P>
          If a BI evaluation matrix lands on your desk, the right first response
          is to ask which surface it’s for, then to ask what sits underneath. If
          the answer to either is unclear, the matrix isn’t ready to be filled
          in yet.
        </P>
        <P>
          One discipline runs through all of this: a reporting system is only
          as good as the decision it was built to serve. Most reporting gets
          built backward — from the tool the organization bought, not from the
          decision someone has to make. Name the decisions. Give each its own
          surface. Put one canonical computation beneath them all. The vendor
          is the last and smallest choice. <I>From fragmented to
          decision-ready</I> is the distance that sequence closes.
        </P>

                <SeeAlso>
          <SeeAlsoItem
            slug="where-should-data-sit"
            title="Where Should Data Sit?"
            gloss="Who owns the function that owes these surfaces, and where it sits on the org chart."
          />
          <SeeAlsoItem
            slug="the-take-home-test"
            title="The Take-Home Test"
            gloss="What it looks like when an organization asks for a dashboard instead of a decision."
          />
          <SeeAlsoItem
            slug="what-is-this-system-measuring"
            title="What is this system actually measuring?"
            gloss="The measurement integrity behind whatever number ends up on the surface."
          />
        </SeeAlso>

        <MetaNote>
          Written May 2026 for the Analytic Bytes Library. Tool capabilities and
          product names cited reflect that period; the architectural argument is
          intended to outlast specific vendor features.
        </MetaNote>
      </>
    ),
  },

  // ===================================================================
  // FIELD NOTE 01 — When GenAI Redesigned My Dashboard
  // ===================================================================
  {
    kind: "field-note",
    slug: "when-genai-redesigned-my-dashboard",
    number: "01",
    title: "When GenAI Redesigned My Dashboard",
    subtitle:
      "The redesign was uglier and clearer. What that taught me about data teams and AI tools.",
    date: "2026-05-11",
    readingTime: "7 min read",
    summary:
      "A GenAI redesign of my own dashboard came back uglier — and clearer. What that taught me about data teams and AI tools.",
    cover: "/library/covers/when-genai-redesigned-my-dashboard.svg",
    arc: "ai-systems",
    body: (
      <>
        <Brief>
          <p>
            This one starts with a small professional embarrassment, so the
            leadership point may as well go first: the dashboards a data team is
            proud of and the dashboards a busy decision-maker uses are
            frequently not the same dashboard. The gap between them is quiet. It
            rarely shows up in a status update. A lot of analytics work stops
            earning its keep in that gap.
          </p>
          <p>
            What follows is written for the people building dashboards, but the
            method is small enough for a leader to hold a team to: let an AI
            tool propose what the audience needs to see before the team’s craft
            instincts lock in, then curate from there. The claim is not that AI
            designs better. AI doesn’t yet share your team’s aesthetic habits,
            which makes it a useful mirror for a bias every data team has and
            few can see in themselves.
          </p>
        </Brief>

        <P>
          A few years ago I built a school-performance dashboard in Looker for a
          charter network. It was sophisticated. Meter charts for percentile
          readings, multi-layered filters, polished visual treatment that took
          weeks to get right. I was proud of it.
        </P>
        <P>
          For my Stanford AI-Driven Leadership capstone, I put a similar
          dashboard back in front of GenAI tools (ChatGPT, Claude, Gemini) and
          asked them what they would change. The redesign was uglier than my
          original. It was also clearer to school leaders. The meter charts went
          away. The filters got fewer. The headline metric got bigger and
          earlier. The dashboard turned into something a busy principal could
          read in fifteen seconds and act on.
        </P>
        <Pull>
          I had been designing for sophistication. The AI tools were designing
          for action.
        </Pull>

        <Figure
          src="/library/figures/genai-dashboard-cr-looker-original.png"
          alt="The original Looker-style enrollment dashboard prototype, with six tiles, gauges, and donut charts covering every category."
          caption="The original prototype. Six tiles with gauges and donuts, every cut on screen, every category sliced. A dashboard the data team is proud of."
        />

        <Figure
          src="/library/figures/genai-dashboard-gpt-redesign.png"
          alt="The AI-proposed redesign of the enrollment dashboard, a 2x2 grid of four focused bar charts: enrollment vs target, subgroup enrollment vs target, retention funnel, and ELL enrollment gap."
          caption="The AI-proposed redesign. Four charts, each tied to a question a leader would actually act on: am I on target, where is the subgroup gap, where is the retention funnel leaking, which gap needs immediate attention. Uglier than the original. Clearer in fifteen seconds."
        />

        <P>
          That gap matters in mission-driven analytics: the dashboards data
          teams build because they are satisfying to make versus the dashboards
          decision-makers use to decide. And GenAI tools, used the right way,
          are surprisingly good at exposing it.
        </P>
        <P>
          This is what came out of the four-phase capstone: letting AI propose
          first changed the work.
        </P>

        <H2>The discipline: AI proposes, human curates</H2>
        <P>
          The traditional dashboard-building pattern goes: analyst pulls the
          data, designer drafts the layout, dashboard-builder implements,
          stakeholder reviews. Each step adds aesthetic and analytic
          preferences. The output reflects what the data team wanted to build,
          often more than what the stakeholder will use.
        </P>
        <P>The pattern I now use looks different.</P>
        <NumList>
          <NumItem n={1}>
            <B>Hand the dataset to a GenAI tool with the question.</B>{" "}
            <I>
              “This is school-level data on attendance, mastery, persistence,
              behavior. The audience is school leaders deciding which two
              schools to visit this week. What should they see?”
            </I>
          </NumItem>
          <NumItem n={2}>
            <B>
              Take the AI’s first proposal seriously even when it’s uglier than
              what you would have built.
            </B>{" "}
            The AI won’t reach for a meter chart unless asked. It will reach for
            the simplest visualization that answers the question. That
            simplicity is usually what the stakeholder needs.
          </NumItem>
          <NumItem n={3}>
            <B>Curate. Don’t rebuild.</B> The AI’s proposal is the starting
            point, not the deliverable. The data team adjusts for tone, brand,
            governance, edge cases. But the structure (what is prominent, what
            is secondary, what is omitted) is anchored on the AI’s reading of
            what the audience needs to see, not the data team’s reading of
            what’s satisfying to build.
          </NumItem>
        </NumList>
        <P>
          This is closer to user-research methodology than to traditional BI
          design. The AI acts as a fast proxy for the stakeholder’s cognitive
          needs. Because it hasn’t spent five years in your design reviews, it
          is useful at this step.
        </P>

        <H2>Where each tool fits in the discipline</H2>
        <P>The tools have different strengths inside this workflow.</P>
        <P>
          <B>ChatGPT, with its data-analysis tooling, is strong at the first
          proposal step.</B>{" "}
          Hand it a dataset and a question; it produces summary statistics,
          suggests metrics, and prototypes a structure. The analyst’s job is to
          interpret the proposal, not to start from scratch.
        </P>
        <P>
          <B>Claude is strong at the curation and narrative-overlay step.</B>{" "}
          Once the dashboard structure is clear, Claude is better at writing the
          audience-appropriate headline copy, the metric definitions, and the
          interpretive callouts that turn a chart into a decision surface.
        </P>
        <P>
          <B>
            Gemini is useful when the question pairs internal data with external
            context.
          </B>{" "}
          Recent research, sector benchmarks, regulatory framing: the
          search-augmented variant handles those when they come up.
        </P>
        <P>
          These specific advantages will shift as capabilities converge; that is
          already happening. The discipline does not: let AI propose what the
          stakeholder needs to see before the data team’s preferences lock in,
          then curate from there.
        </P>

        <H2>What this changes about data-team workflow</H2>
        <P>
          When AI is positioned as design-collaborator-first rather than as
          content-generator-last, three things shift.
        </P>
        <P>
          <B>The first deliverable gets faster.</B> A first-draft dashboard can
          go from days of design iteration to hours of curation on top of an AI
          proposal. The team’s bandwidth concentrates on the judgment calls
          (what is right for this stakeholder, what governance demands, what
          brand voice requires) instead of on building from a blank canvas.
        </P>
        <P>
          <B>The aesthetic-vs-decision tension surfaces earlier.</B> When the AI
          proposes the simplest viable chart and the data team wants to add a
          more sophisticated one, the conversation is now explicit. Is the
          sophistication serving the decision, or serving the team’s desire to
          build something interesting? Better to have that conversation early
          than after the dashboard ships.
        </P>
        <P>
          <B>Stakeholder interpretation becomes part of the design process.</B>{" "}
          AI proposals are easy to test against actual users. Does a school
          principal read this faster than the original? You can answer that
          with five principals and a week, which is most of the point.
        </P>

        <H2>What the discipline cannot replace</H2>
        <P>
          The AI proposal is rarely the final answer. Three things still require
          human judgment.
        </P>
        <P>
          <B>Brand and tone.</B> The AI doesn’t know your organization’s
          conventions, the words your audience trusts, the colors you’ve
          standardized. Curation owns that.
        </P>
        <P>
          <B>Edge cases and governance.</B> The AI proposes from the dataset it
          sees. It doesn’t know which subgroups need cell suppression, which
          metrics have known data-quality issues, which interpretations would
          mislead a board reader. The data team owns that.
        </P>
        <P>
          <B>The question itself.</B> The AI is great at proposing how to
          display an answer once it has the question. It is worse at deciding
          which question matters most. The analyst keeps that call; no tool
          I’ve tried has made it easier.
        </P>

        <H2>The reframe</H2>
        <P>
          The traditional dashboard-design conversation centers on what the data
          team can build. The discipline I’d recommend now centers on what the
          audience can read in fifteen seconds and act on. That is the
          difference between building for the immediate task (show every cut
          of the data with all the craft the team can bring) and building for
          the intended outcome the dashboard exists to support: a better
          decision, made sooner, by the person it
          was built for. A dashboard can be flawless at the first and useless at
          the second. AI tools help here not because they are better designers,
          but because they don’t share our aesthetic biases. Letting them
          propose first surfaces the gap between sophistication and usefulness,
          and most data teams default to the wrong side of that gap.
        </P>
        <Pull>
          Beautiful dashboards are not the same as decision-driving ones. Used
          well, AI tools are a discipline against our own biases.
        </Pull>
        <P>
          And the discipline generalizes well past dashboards. Design every
          surface backward from the decision it is meant to change, not forward
          from the data you happen to hold. Ask it of a report, an alert, a
          model’s output: what decision does this serve, and does it measurably
          move it? The fifteen-second dashboard a principal can act on is just
          one surface answering that question honestly. <I>From fragmented to
          decision-ready</I> names what changes when a data team stops
          designing for itself and starts designing for the decision.
        </P>

                <SeeAlso>
          <SeeAlsoItem
            slug="three-surfaces-one-keystone"
            title="Three Surfaces, One Keystone"
            gloss="Why the surface mattered in the first place — and which of the three this redesign served."
          />
          <SeeAlsoItem
            slug="the-take-home-test"
            title="The Take-Home Test"
            gloss="The pattern this redesign worked against: organizations asking for a dashboard instead of a decision."
          />
          <SeeAlsoItem
            slug="actions-not-answers"
            title="Actions, Not Answers"
            gloss="The related discipline: a surface should drive action, not just describe."
          />
        </SeeAlso>

        <MetaNote>
          Written May 2026 for the Analytic Bytes Library. Tool capabilities and
          product names cited reflect that period, and capabilities are
          converging quickly. The discipline it names — let AI propose what the
          stakeholder needs to see, then curate — is intended to outlast
          specific tool advantages.
        </MetaNote>
      </>
    ),
  },

  // ===================================================================
  // ESSAY 02 — Grounding the AI Layer
  // ===================================================================
  {
    kind: "essay",
    slug: "grounding-the-ai-layer",
    number: "02",
    title: "Grounding the AI Layer",
    subtitle:
      "Where AI belongs in the modern data stack, and what keeps it honest.",
    date: "2026-05-15",
    readingTime: "12 min read",
    summary:
      "Where AI belongs in the modern data stack, and the single contract that keeps every AI feature honest.",
    cover: "/library/covers/grounding-the-ai-layer.svg",
    arc: "ai-systems",
    body: (
      <>
        <Brief>
          <p>
            A leader rarely sees AI architecture as architecture. It shows up
            as a series of small, reasonable approvals: an AI-assisted connector
            here, a copilot there, a natural-language layer on the BI tool, a
            chatbot for the client portal. Each has a working demo and a
            plausible champion. Say yes to each on its own merits, and the
            result six months on is a stack full of AI features and less trust
            in the numbers than before.
          </p>
          <p>
            What follows is written for the person who has to build this, but
            the leadership point belongs up front. Every AI feature is a small
            delegation of a decision to a model. Where you place that model, and
            what you ground it against, matters far more than which vendor’s
            model it is. Placement and grounding are leadership decisions about
            authority and trust; vendor selection is the small choice that comes
            after. Treat them in that order and AI compounds. Treat them in
            reverse and it drifts. And because the drift shows up as confident
            language rather than wrong numbers, nobody catches it for months.
          </p>
        </Brief>

        <P>
          Every quarter, somebody hands you a list of AI features to evaluate.
          Fivetran’s AI-assisted connectors. Snowflake Cortex. dbt Copilot.
          Whatever the BI vendor renamed their NL feature to last week. The list
          looks reasonable, the demos work, and the question that emerges is
          “which of these should we adopt?” Six months later you have eight AI
          features deployed across the stack and trust in numbers is worse than
          it was before, because the LLM in the chatbot says one thing, the AI
          summary above the dashboard says another, and the auto-generated alert
          email says a third. Nobody can tell which one is right. Several of
          them are.
        </P>
        <P>
          The shopping-list exercise is a real one. Every data org has to decide
          where AI fits, and the vendor pitches make those decisions feel
          pressing. The trap is treating it as a vendor question before deciding
          where each kind of AI compute belongs in the stack, and how the
          language outputs across the stack stay consistent with the structured
          outputs underneath.
        </P>
        <P>
          “What AI features should we adopt” is a vendor question. The
          architectural question is where each kind of AI compute belongs and
          what grounds it, and it decides whether your AI investments compound
          or corrupt the data product. Place AI in the wrong
          layer and it gets expensive, slow, and untrustworthy. Place it in the
          right layer with no grounding contract and it makes things up. Place it
          correctly, ground it against the same canonical metric definitions as
          your BI and your reports, and it earns trust the way the rest of the
          stack does.
        </P>
        <P>
          This is the argument, in three parts. AI compute has a natural
          placement at each layer of the stack, and placement is more
          consequential than feature selection. The semantic contract, often
          implemented through dbt or a metric API, is the grounding contract
          for AI features, the same way it is the grounding contract for BI
          surfaces; drift between AI features is the same problem as drift
          between dashboards, only harder to detect, because the symptoms are
          language, not numbers. And in the client portal where dashboards and
          reports live, AI shows up as alerts, summaries, and chat. Each earns
          its place by doing something the deterministic layer cannot, and
          none of them get to invent metrics.
        </P>

        <H2>AI by layer: placement is the question</H2>
        <P>Working bottom up.</P>
        <P>
          <B>Fivetran, or whatever your ingestion layer is.</B> The temptation
          is to do “AI-driven data quality” at the connector. Resist it. Use the
          vendor’s AI features for what they are good at: schema-drift alerts,
          anomaly detection on row counts, AI-assisted connector creation. Stop
          there. Data-quality logic with semantic stakes (this respondent
          is suspicious, this batch should be excluded from reports, this null
          means absent rather than unknown) belongs in dbt, where it is
          testable, version-controlled, and auditable. A vendor’s black-box
          quality model that drops rows for reasons you cannot reproduce will
          break during a stakeholder review and leave you unable to explain
          why.
        </P>
        <P>
          <B>Snowflake, or whatever your warehouse is.</B> This is where most of
          your AI compute should live, because the data is already there and
          governance gets easier when nothing leaves the boundary. The pieces
          that earn their keep:
        </P>
        <P>
          Cortex Search for retrieval over program docs, item glossaries,
          methodology notes, and historical reports. This is the RAG primitive
          everything else builds on. Don’t build your own.
        </P>
        <P>
          ML Functions (anomaly detection, forecast, top insights) for the
          deterministic “something is unusual” detection. This is the workhorse
          for alerts: cheap, batch, no LLM required. Most “AI alerts” should
          start here, with an LLM only on top for copy.
        </P>
        <P>
          Cortex Analyst, or whichever text-to-SQL surface your warehouse
          offers, for analyst-facing exploration, only when fed your dbt
          semantic layer as the YAML model. Without that grounding it
          invents metric names. Don’t expose it to clients in v1.
        </P>
        <P>
          Cortex COMPLETE / SUMMARIZE / EMBED_TEXT for narrative generation and
          embeddings, used inside warehouse-native apps when PHI needs to stay
          in place.
        </P>
        <P>
          Document AI if you have any PDF intake (consent forms, partner
          packets, prior reports) that you’d otherwise extract by hand.
        </P>
        <P>
          The architectural rule: deterministic statistics and search live in
          the warehouse. Open-ended language generation can live there too if
          PHI matters, but more often it lives in the application layer, where
          you can swap models and version prompts independently of your data
          platform.
        </P>
        <P>
          <B>dbt.</B> dbt Copilot for model and test generation is fine but
          minor. The real AI play at this layer is the inverse: making the dbt
          project legible to AI features. Every metric definition becomes a tool
          description, every domain a typed entity, every test a guardrail. The
          MCP server pattern, or whatever your equivalent is, lets a chatbot
          call <C>get_domain_score(school_id, domain_id, wave_id)</C> instead of
          writing SQL. That move eliminates most of the hallucination risk in
          a portal chatbot, and much of the setup work is already done. The
          remaining decision is that the dbt semantic layer serves as the
          canonical contract every AI feature reads through.
        </P>
        <P>
          <B>BI tools.</B> Tableau Pulse, Power BI Copilot, ThoughtSpot Spotter,
          Looker Explore Assistant are all variants of “ask a question, get a
          chart.” Useful for internal exploration. Bad for client-facing
          surfaces, for the same reason BI tools are bad at the publication
          problem: they read directly from BI semantic models, which drift from
          your dbt semantic layer the moment a Tableau analyst adds a calculated
          field. The BI tool’s job is rendering the dashboard. If you want
          chatbot-style features in your client portal, build them against the
          dbt semantic layer through your own API, not against the BI tool’s NL
          interface. AI goes around the BI tool, not through it.
        </P>
        <P>
          That is the placement story, one paragraph per layer. Grounding,
          addressed next, is where most stacks fail.
        </P>

        <H2>The semantic layer is also the AI contract</H2>
        <P>
          The keystone argument from the companion piece, <I>Three Surfaces, One
          Keystone</I>, extends one step. There, the claim was that all three
          reporting surfaces (program report, operator console, executive view)
          must read from a single dbt-defined semantic layer or they drift,
          and drift is the failure mode that erodes trust.
        </P>

        <Figure
          src="/library/figures/grounding_the_ai_layer_figure.svg"
          alt="Grounding the AI layer: where AI reaches and what it reaches through"
          caption="Ungrounded, the AI invents definitions. Grounded, the semantic layer is the contract the AI has to go through."
        />

        <P>
          The same argument applies, more strongly, to AI features. Three
          reasons.
        </P>
        <P>
          <B>The drift surface is bigger.</B> With BI tools you have a small
          number of dashboards, each owned by an analyst who can be talked to.
          With AI features you have potentially every alert, every summary,
          every chatbot answer, every auto-generated email, each of which can
          independently drift from the canonical metric. No single owner
          exists to consult.
        </P>
        <P>
          <B>The drift symptom is language, not numbers.</B> When two dashboards
          show different numbers, somebody notices. When a chatbot says “Domain
          4 is improving at most schools” and an alert email says “Domain 4 has
          plateaued,” nobody catches it for months. The discrepancy is buried in
          prose, and prose is harder to diff than numbers.
        </P>
        <P>
          <B>The drift cost is reputational.</B> A wrong number in a dashboard
          is embarrassing. A wrong claim in an LLM-drafted email to a school is
          a brand-existential risk in a regulated or sensitive domain.
        </P>
        <P>
          The mechanism that prevents this is the same as before, applied to a
          different consumer. Every AI feature reads metrics through the dbt
          semantic layer, exposed as a typed metric API. The chatbot calls{" "}
          <C>get_domain_trajectory(...)</C>, gets typed JSON back, and renders
          it. The alert generator pulls a row from{" "}
          <C>marts.f_school_domain_wave</C> and feeds it to the LLM as the only
          input the model can see. The AI summary card on the dashboard reads
          the same row the dashboard rendered from, and the LLM has no tool
          access, only the snapshot.
        </P>
        <P>
          In every case the LLM is producing language about a structured input.
          It is never the source of truth for any number it mentions. The
          semantic layer is.
        </P>
        <P>
          This is the discipline that makes the rest of the AI architecture
          safe. Without it, every AI feature is a small bet that nobody on the
          team will let it drift. With it, drift is structurally prevented
          because there is nothing to drift toward.
        </P>

        <H2>In the portal: three AI surfaces</H2>
        <P>
          In the React/Node client portal where embedded dashboards and reports
          live, AI shows up in three places. Each has a job, a failure mode, and
          a cost profile.
        </P>

        <H3>Alerts</H3>
        <P>
          The “your report is ready” alert is mostly mechanical. The portal
          already knows which report, which school, which cycle, from a{" "}
          <C>report.published</C> event emitted by a warehouse task. The AI value
          is a one-line preview (“Spring Cycle 2026, fourteen schools, biggest
          movers in Domain 4”), generated from the structured snapshot. Use a
          small model. Cache aggressively. The same alert goes to many
          recipients.
        </P>
        <P>
          The “your next phase is coming” alert is calendar-driven, not
          AI-driven. The schedule is in your data. AI value is personalization:
          drafting a message that references what the school did in the prior
          cycle and what to prepare for. Optional but high-leverage for
          engagement.
        </P>
        <P>
          The “you should look at this” alert is where AI does real work. The
          signal comes from the deterministic anomaly or trajectory layer:
          warehouse ML functions, or your own materialized <C>f_trajectory</C>{" "}
          table. The AI generates the interpretation of that signal: “Domain 3 at
          School X dropped into declining with high confidence. Recommended next
          action: review trusted-adult training participation.” That paragraph
          is grounded on a single structured row plus a playbook reference,
          snapshotted in the audit log alongside the alert ID.
        </P>
        <P>
          The pattern across all three: detection is deterministic,
          interpretation is generative. Don’t let the LLM decide what to alert
          on. Let it decide how to phrase the alert, given a structured event
          payload.
        </P>

        <H3>AI summaries on dashboards</H3>
        <P>
          Above each embedded BI view, render a card that calls your portal’s
          narrative service. The service takes the same metric snapshot the
          dashboard rendered from, runs it through a prompt with the program
          glossary and benchmarks attached, and returns two or three sentences.
          The card shows the summary, a “regenerate” button (rate-limited), and
          a citation back to the metric snapshot.
        </P>
        <P>
          The implementation rule that makes this safe: the LLM has access only
          to the structured snapshot. No tool use, no follow-up queries, no SQL
          generation. That bounds the failure mode: at worst a confused summary
          built from the right row, not a confident number drawn from the wrong
          data.
        </P>

        <H3>Chatbot</H3>
        <P>
          Most portal chatbots fail because they try to be helpful about
          everything. The version that works has narrow, explicit scope, and the
          LLM is wrapped in tool-use, not given freeform SQL. In practice the
          scope shrinks to a handful of permitted intents.
        </P>
        <P>
          <I>Program documentation.</I> RAG over a Cortex Search index of
          program docs, item glossaries, methodology notes. Low stakes, high
          value.
        </P>
        <P>
          <I>Metric lookup.</I> The chatbot calls typed tools (
          <C>get_school_summary(school_id, wave)</C>,{" "}
          <C>get_domain_trajectory(school_id, domain_id)</C>,{" "}
          <C>compare_to_norm(school_id, domain_id)</C>) defined as wrappers over
          the dbt semantic layer. The model receives structured JSON and renders
          it. No SQL generation in the user path.
        </P>
        <P>
          <I>Report status.</I> “When is my Spring report ready?” looks up{" "}
          <C>f_report_publication</C>, returns state.
        </P>
        <P>
          Anything outside those scopes routes to a human, or to an “I can’t
          answer that, want me to flag it for your program lead?” response. The
          temptation to use full text-to-SQL on the user-facing chatbot is real
          and should be resisted in v1. It is the right tool for an internal
          analyst console, the wrong tool for a client portal where the surface
          area is too large to keep grounded.
        </P>
        <P>
          Every chatbot answer that includes a number must show the source row
          it pulled from, with a “view underlying data” link. A school
          superintendent who cannot see the number’s source is unlikely to use
          it again.
        </P>

        <H2>The architecture in one paragraph</H2>
        <P>
          The warehouse holds the data and runs deterministic AI: anomaly
          detection, trajectory classification, search over docs, embeddings.
          dbt defines the semantic layer that everything else reads through. A
          Node service exposes a metric API and an event spine; the metric API
          wraps the dbt semantic layer, the event spine routes warehouse-emitted
          events (<C>report.published</C>, <C>phase.due_soon</C>,{" "}
          <C>trajectory.changed</C>, <C>anomaly.detected</C>) to subscribers. AI
          features in the portal (chatbot, alert copy, summary cards, phase
          guidance) call into the metric API for grounding and into a model
          gateway for generation, with outputs snapshotted into an audit table.
          The React portal embeds BI dashboards as opaque panels and renders the
          AI features around them. The BI tool’s own AI features are unused, or
          used only by internal analysts. There is one canonical computation per
          metric, one canonical event per state change, and one canonical audit
          row per AI-drafted output.
        </P>

        <H2>The operational principles</H2>
        <P>
          A handful of rules that make all this scale, in rough priority order.
        </P>
        <P>
          <B>One semantic contract.</B> Every AI feature reads metrics through
          the same dbt-defined API. Chatbot, alert generator, AI summary,
          operator console, internal analyst console. All of them go through{" "}
          <C>get_domain_score(...)</C> or its equivalent, never raw SQL. This is
          the keystone applied one level up.
        </P>
        <P>
          <B>Pre-compute when possible, generate when needed.</B> Most “AI
          insights” are pre-computable rules with LLM-drafted prose on top.
          Trajectory classification is deterministic; the explanation is
          generated. Anomaly detection is deterministic; the alert copy is
          generated. Resist building “live AI” anywhere a cached version would
          do; it is cheaper, faster, and audits more cleanly.
        </P>
        <P>
          <B>Grounded generation everywhere.</B> Every LLM output that includes a
          number comes from a structured input row, snapshotted alongside the
          output. If the metric layer changes, you can re-render the narrative.
          If a stakeholder asks where a sentence came from, you can answer in
          seconds.
        </P>
        <P>
          <B>Schema-constrained output.</B> When the LLM is producing anything
          structured (alert payloads, classification calls, action
          recommendations), constrain the output schema. JSON mode, function
          calling, or guidance/outlines libraries. Free-text generation is for
          narrative only, never for control flow.
        </P>
        <P>
          <B>Async by default.</B> Don’t put LLMs in the critical path of a page
          load or a notification dispatch. Generate copy on schedule or on
          event, store it, render the cached version. Streaming chat is the
          exception, and even there have a non-streaming fallback.
        </P>
        <P>
          <B>Cost and latency budgets per surface.</B> Different AI surfaces
          tolerate different costs. Chatbot answers can be slower but expensive;
          alert copy needs to be cheap because volume is high; AI summaries on
          dashboards need to be cached because they render on every page open.
          Put numbers on these before building.
        </P>
        <P>
          <B>Audit trail for AI outputs.</B> Same publication-snapshotting
          pattern as the companion piece on reporting surfaces, extended. Every
          AI-drafted alert, summary, narrative, and chatbot answer gets a row
          recording prompt template version, model name and version, input
          snapshot, output, timestamp, recipient. This is decision observability
          applied to AI: for any decision the system shaped, you can say what
          the model saw, what it produced, and which version of which prompt
          stood behind it. A decision you cannot reconstruct is a decision you
          cannot defend. In a regulated or sensitive domain, that is the
          difference between an answerable question and an unanswerable one.
        </P>
        <P>
          <B>Read-only by default.</B> No AI feature writes to the database
          without a human approval state. Even “schedule the next phase” or
          “assign this action” should land in a draft state for a program lead
          to confirm.
        </P>

        <H2>What to skip in v1</H2>
        <P>
          A few things that look obviously AI-shaped but cost more than they
          return.
        </P>
        <P>
          <B>Generative dashboards:</B> LLMs producing a new chart for every
          question. The trust math isn’t there yet, and your audience can’t tell
          good charts from bad ones at a glance. Stick with curated dashboards
          plus AI summaries above them.
        </P>
        <P>
          <B>Free-text NL-to-SQL in the user-facing chatbot.</B> Fine for an
          analyst who can sanity-check the SQL; a liability for a client whose
          first run-in with a wrong answer is the only one that counts. Use
          typed tool calls into the metric API instead.
        </P>
        <P>
          <B>Voice or multi-turn agentic chat.</B> Single-turn, scoped Q&amp;A
          works in a regulated context. Agentic loops are a brand risk before
          they’re a feature.
        </P>
        <P>
          <B>LLM-generated subject lines as A/B tests.</B> Tempting, low-stakes,
          but you’ll spend more time monitoring quality than you save.
        </P>

        <H2>Closing</H2>
        <P>
          Most AI architecture conversations begin with vendor selection. The
          version of the conversation that produces a system you can trust
          starts upstream of that, with three questions in order.
        </P>
        <NumList>
          <NumItem n={1}>
            Where does each kind of AI compute belong, given the data, the
            governance, and the latency profile of the surface that consumes it.
          </NumItem>
          <NumItem n={2}>
            What grounds every output: what is the canonical contract every AI
            feature reads metrics through.
          </NumItem>
          <NumItem n={3}>
            Which features earn their place, given that detection is
            deterministic, interpretation is generative, and language costs more
            to verify than numbers do.
          </NumItem>
        </NumList>
        <P>
          If those three questions have clean answers, the vendor question is
          small. Cortex, Claude, GPT, an open-weights model behind a gateway:
          the choice barely matters once placement and grounding are decided. If
          they don’t have clean answers, no vendor will save you, because the
          stack you build will drift and the AI features will accelerate the
          drift.
        </P>
        <Pull>
          Place compute by layer. Ground language by contract. Snapshot
          everything that generates.
        </Pull>
        <P>The keystone hasn’t changed. The surface has.</P>
        <P>
          Every AI feature is a small delegation of a decision to a model.
          The architecture’s whole job is
          to keep those delegations deliberate: placed on purpose, grounded
          against one source of truth, observable after the fact. Where AI
          authority sits in a workflow is a design choice. Make it, rather than
          inheriting it from whichever vendor demo shipped last. That is what it
          takes to carry a data stack <I>from fragmented to decision-ready</I>,
          with the AI layer held to the same standard as everything beneath it.
        </P>

        <SeeAlso>
          <SeeAlsoItem
            slug="what-is-this-system-measuring"
            title="What is this system actually measuring?"
            gloss="The measurement-science question every adopted AI system should answer."
          />
          <SeeAlsoItem
            slug="lo-2-0-stitching-the-layers"
            title="LO 2.0, Stitching the Layers"
            gloss="How the layers below the AI layer get composed into something usable."
          />
          <SeeAlsoItem
            slug="the-contracts-between-systems"
            title="The contracts between systems"
            gloss="What the agentic-era contract has to specify, beyond engineering integration."
          />
        </SeeAlso>

        <MetaNote>
          Written May 2026 for the Analytic Bytes Library. Tool capabilities,
          product names, and feature specifics cited reflect that period; the
          architectural argument is intended to outlast specific vendor
          features.
        </MetaNote>
      </>
    ),
  },

  // ===================================================================
  // FIELD NOTE 02 — LO 2.0, Stitching the Layers
  // ===================================================================
  {
    kind: "field-note",
    slug: "lo-2-0-stitching-the-layers",
    number: "02",
    title: "LO 2.0 — Stitching the Layers",
    subtitle:
      "Why national education data, classroom assessments, and local instruments are most useful when used together, and what the integration architecture looks like.",
    date: "2026-05-18",
    readingTime: "8 min read",
    summary:
      "Why national education data, classroom assessments, and local instruments are most useful stitched together — and what the integration architecture looks like.",
    cover: "/library/covers/lo-2-0-stitching-the-layers.svg",
    arc: "integration-governance",
    body: (
      <>
        <Brief>
          <p>
            This piece is about education data in India, but a leader in any
            sector should recognize the shape of the problem inside the first
            thirty seconds. An organization has spent years collecting data.
            Multiple systems, real coverage, genuine cost. And still nobody can
            answer the question the data was supposed to answer: <I>which
            classrooms need which support this term.</I>
          </p>
          <p>
            That is not a data-collection problem. It is an integration
            problem: the layers exist and don’t talk to each other, so no
            decision-maker sees the whole picture at the granularity their own
            decision requires. The fix is an architecture that stitches the
            layers you already have into decision surfaces for the people who
            have to act — not another portal. Different surface, same
            discipline — the one that applies as readily to a behavioral-health
            nonprofit or a charter network as to a state education ministry.
          </p>
        </Brief>

        <P>
          In healthcare, you don’t pick one data source and use it for
          everything. You stitch CDC mortality data with NSDUH prevalence,
          claims data with electronic health records, patient-reported outcomes
          with hospital encounter feeds. Each layer measures something
          different, runs at a different cadence, and serves a different
          decision. The work is in the integration: what kind of question goes
          to which layer, and how the layers compose into a coherent picture of
          a population, a patient, a program.
        </P>
        <P>
          Education has the same opportunity. India, specifically, has an
          unusually rich set of national data systems: UDISE+ for school-level
          infrastructure and enrollment, NAS for sample-based achievement, PGI
          for composite ranking, SEQI for composite quality. Below that, schools
          have classroom assessments, board exam results, NCERT-aligned learning
          materials, and increasingly digital assessment platforms in some
          districts. The layers exist, but the integration architecture isn’t
          yet built.
        </P>
        <P>
          The pattern is familiar from US K-12 too. A district runs its SIS
          for attendance and enrollment, NWEA MAP for growth on standardized
          assessment, an internal mastery tracker on Illuminate or a
          classroom-embedded platform, disciplinary data on Kickboard, and a
          state accountability assessment once a year. Each layer measures
          something different, on its own cadence, purchased with its own
          budget line. The question they were all meant to answer
          &mdash; which classrooms need which support this term &mdash; is
          one none of the layers composes into on its own.
        </P>
        <P>
          That integration architecture is what LO 2.0 proposes: the thing that
          stitches national, district, school, and classroom layers into
          coherent decision support for teachers, headmasters, district
          officers, ministries, and policy designers.
        </P>

        <Figure
          src="/library/figures/lo_2_0_stitched_layers_figure.svg"
          alt="LO 2.0 — the layers exist, the stitching does not"
          caption="The layers exist. The stitching contracts between them are what LO 2.0 proposes and what most systems have not yet built."
        />

        <P>
          This is the analytical picture, the state-level evidence that
          integration matters, and the framework for building it.
        </P>

        <H2>The layers and what each is good for</H2>
        <P>
          <B>
            <a
              href="https://udiseplus.gov.in/"
              target="_blank"
              rel="noopener"
              className="text-accent hover:text-accent-2 no-underline border-b border-line-2 hover:border-accent pb-px"
            >
              UDISE+
            </a>
          </B>{" "}
          (Unified District Information System Education Plus).
          Census-style coverage of every school. Strong on infrastructure
          adequacy, demographic patterns, enrollment trends, attendance
          aggregates. Weak on learning outcomes, individual student tracking,
          and real-time signal. Best used for: macro-policy decisions,
          infrastructure investment, demographic-shift analysis, federal funding
          allocation.
        </P>
        <P>
          <B>
            <a
              href="https://parakh.ncert.gov.in/nas-dashboard"
              target="_blank"
              rel="noopener"
              className="text-accent hover:text-accent-2 no-underline border-b border-line-2 hover:border-accent pb-px"
            >
              NAS
            </a>
          </B>{" "}
          (National Achievement Survey). Sample-based, high-quality
          achievement assessment, fielded only every few years. Reports state
          and group averages. Strong on national snapshots and inter-state
          comparison. Weak on improvement tracking, classroom-level signal, and
          cross-cycle comparability when grades sampled change. Best used for:
          periodic state benchmarking, policy effectiveness review,
          resource-prioritization signals.
        </P>
        <P>
          <B>
            <a
              href="https://pgi.udiseplus.gov.in/"
              target="_blank"
              rel="noopener"
              className="text-accent hover:text-accent-2 no-underline border-b border-line-2 hover:border-accent pb-px"
            >
              PGI 2.0
            </a>
          </B>{" "}
          (Performance Grading Index). Built for state-level
          comparison, federal incentive frameworks, and publicly visible
          accountability. A composite index that combines UDISE+ and NAS into
          ranking grades across 73 indicators on a 1,000-point scale. It is not
          the right tool when the question is operational or
          improvement-shaped.
        </P>
        <P>
          <B>
            <a
              href="https://niti.gov.in/sites/default/files/2019-09/seqi_document_0.pdf"
              target="_blank"
              rel="noopener"
              className="text-accent hover:text-accent-2 no-underline border-b border-line-2 hover:border-accent pb-px"
            >
              SEQI
            </a>
          </B>{" "}
          (School Education Quality Index). Composite ranking,
          evaluative framing. Last report 2019. Useful as historical baseline;
          less useful as current signal.
        </P>
        <P>
          <B>Local classroom assessments.</B> Whatever each school or district
          has built: weekly tests, board-exam practice, digital adaptive
          platforms in some districts. Strong on classroom-level cadence and
          granularity. Weak on standardization, comparability across schools,
          and aggregation upward.
        </P>
        <P>
          <B>Board exam results.</B> Annual, summative, high-stakes. Strong on
          student-level outcomes at terminal points (Class X, Class XII). Weak
          for formative use during the year.
        </P>
        <P>
          The pattern is recognizable: each layer does something well and has
          a clear failure mode, and none alone is sufficient. Stitched through
          an integration architecture, they can serve a teacher, a headmaster,
          a district officer, and a policy designer reading the same assets at
          different cadences.
        </P>

        <H2>The picture for one state</H2>
        <P>
          Andhra Pradesh, 2021. NAS data shows Class X performance below 50% on
          every measured learning outcome, and below the national average on 16
          of them. Eighty percent of students at or below basic level in Math;
          94% at or below basic in Science; 86% at or below basic in Social
          Science. Performance is far worse in every upper grade than at
          Class III: at-or-below-basic in Math stays near 80% from Class V
          (82%) through Class X (80%), versus 63% in Class III. That is a
          jump after the foundational grade, not a steady climb. The clean
          grade-on-grade decline shows up in Science instead: 65% at
          Class III rising to 94% at Class X. The state-private gap
          is wide — 85% at or below basic in Math at state schools against 73%
          at private, a 12-point spread. AP graded Akanshi-1 overall on PGI 2022–23
          (third-lowest band), and Akanshi-2 on the learning-outcomes domain.
          Thirty-nine percent of teachers reported overload of work.
        </P>

        <BarFigure
          label="At or below basic — Class X"
          bars={[
            { name: "Mathematics", value: 80 },
            { name: "Science", value: 94 },
            { name: "Social Science", value: 86 },
          ]}
          source="Andhra Pradesh · National Achievement Survey, 2021"
        />

        <P>
          These signals come from national data. They are real and useful —
          for federal allocation, for state-level priority-setting, for policy
          design.
        </P>
        <P>
          What they don’t yet tell anyone is which classrooms in which districts
          need which kind of support this term. That answer requires the local
          layer (student-level continuous assessment, teacher-feedback loops,
          principal observation) running in tandem with the national signal.
        </P>
        <P>
          A district officer reading the NAS data alone gets <I>AP is
          underperforming in Math.</I> A district officer reading NAS +
          classroom assessments + teacher-feedback together gets <I>these 12
          schools have the steepest grade-level decline in Math fluency, these 4
          of them have the highest teacher-PD need, these 2 have the strongest
          prior intervention response.</I> Same data, different decisions
          enabled.
        </P>
        <Pull>
          This is what stitching makes possible; none of the layers alone
          enables it.
        </Pull>

        <H2>The LO 2.0 framework</H2>
        <P>Three pillars, each addressing a specific integration gap.</P>
        <P>
          <B>Classroom assessments at the cadence the classroom runs at.</B> A
          digital assessment platform integrated into instructional flow.
          Built-in items anchored to curriculum progression (CBSE or state).
          Drill-down insights by standard and topic for early remediation.
          Real-time dashboards for teachers. Differentiated learning support
          pathways at topic and sub-topic level for at-risk students. Reduced
          teacher workload on creating assessments and lesson plans. The
          assessment cadence matches the classroom cadence; the data gets back
          to the teacher within the week.
        </P>
        <P>
          <B>A central Operational Data Store that joins the layers.</B>{" "}
          Integrating data from existing portals (UDISE+, NAS, PGI inputs, board
          exams, state-level systems) and the new classroom assessment layer.
          Automated reporting. Standardized score cards comparable across
          schools and districts. Growth KPIs alongside achievement KPIs as the
          primary lens for closing learning gaps for students with varying
          ability (CWSN) and varying access (income, gender, SC/ST groups). The
          integration layer that makes the national signal usable at the
          district level and the local signal aggregatable at the policy level.
        </P>
        <P>
          <B>
            Decision surfaces for different decision-makers, reading from the
            same data.
          </B>{" "}
          Teachers reading classroom-level continuous assessment for
          differentiated instruction. Headmasters reading school-level patterns
          for staffing and PD allocation. District officers reading aggregated
          school patterns for resource and PD allocation. State ministries
          reading aggregated district patterns for policy and funding. Federal
          designers reading the same data for allocation and policy. Each
          decision-maker reads what they need at the appropriate granularity.
          The underlying semantic layer is shared.
        </P>

        <H2>The decisions stitching enables</H2>
        <P>
          With the layers stitched, specific decisions get sharper.
        </P>
        <P>
          <B>Teacher actions at the classroom level.</B> Which students need
          re-teaching on which standard this week. What differentiated practice
          fits which subgroup. Which intervention worked the last time a similar
          pattern showed up.
        </P>
        <P>
          <B>Student outcomes tracked longitudinally.</B> Year-over-year
          persistence in mastery. Cohort growth trajectories. Early
          identification of students whose pattern suggests intervention is
          needed before the next high-stakes assessment.
        </P>
        <P>
          <B>Teacher professional development designed around real evidence.</B>{" "}
          Which schools have the highest teacher-PD demand based on
          classroom-level outcome patterns? Which districts are running
          interventions that work and could be replicated?
        </P>
        <P>
          <B>Funding and resource allocation grounded in granular need.</B>{" "}
          Federal allocation has historically run on UDISE+ infrastructure data
          and PGI rankings. Stitched data lets allocation also reflect
          classroom-level outcome trajectories, closer to where the need is.
        </P>
        <P>
          <B>Policy that can read both signals.</B> A state ministry reading
          aggregated district patterns alongside aggregated classroom signal can
          design policy that targets the gap, not just measures it.
        </P>
        <P>
          This is the same parallel as healthcare. CDC + NSDUH + claims + EHR +
          patient-reported outcomes don’t replace each other; they enable
          different decisions for different actors at different cadences,
          provided the layers between them are stitched.
        </P>

        <H2>The pilot proposal</H2>
        <P>
          Ten to twelve weeks, Class X, Math and Science,
          a selected low/medium-performing district, state curriculum (with CBSE
          optionally included for Class VIII or IX). Pre- and post-assessment to
          measure efficacy. Weekly assessments to track growth. Real-time
          dashboards informing instruction. Pre-built differentiated lesson
          plans. Student-behavior data on planning, engagement, guessing, and
          test-taking skills. Teacher training on data-driven practice. Student
          and teacher reflection surveys.
        </P>
        <P>
          Deliverables: a comprehensive statistical analysis of student learning
          outcomes; a prototype centralized operational data store with
          dashboards across teacher, headmaster, district, and state surfaces;
          teacher training and survey materials; recommendations for scaling.
        </P>

        <H2>Closing note</H2>
        <P>
          Education-policy debates often frame “national data systems vs.
          classroom assessments” as a binary, but each layer does something
          the other can’t. The real question is what integration architecture
          lets them serve different decision-makers running different decisions
          at different cadences.
        </P>
        <P>
          Healthcare has spent decades building toward this, integrating CDC +
          NSDUH + claims + EHR + patient-reported outcomes through
          population-health platforms and clinical decision-support systems,
          and it is still not finished. Education hasn’t yet built the
          equivalent. LO 2.0 is one shape that integration architecture could
          take.
        </P>
        <P>
          The integration argument is illustrative. State-level findings reflect
          NAS 2021 and PGI 2022–23; a refresh against the NAS 2024 cycle would
          update the picture without changing the architecture. Pilot timing
          and scope are sketched for orientation; an actual engagement would
          scale to the district’s existing assessment infrastructure and
          academic calendar.
        </P>
        <P>
          The opportunity is in the layers already collected. The work is to
          stitch them into decision surfaces for the people who have to act.
        </P>
        <P>
          That is decision-systems architecture at state-government scale: start
          from the assets already in place rather than the ones that are
          missing, route each decision to the layer that can answer it, and give
          every decision-maker (teacher, headmaster, district officer, ministry)
          a surface built for the call in front of them. The portal was never
          the point. The work is to go <I>from fragmented to decision-ready</I>,
          whether the fragments are clinics, schools, or a national education
          system.
        </P>

        <SeeAlso>
          <SeeAlsoItem
            slug="grounding-the-ai-layer"
            title="Grounding the AI Layer"
            gloss="Why the AI layer needs the layers beneath it to actually hold."
          />
          <SeeAlsoItem
            slug="three-surfaces-one-keystone"
            title="Three Surfaces, One Keystone"
            gloss="The three surfaces the stitched-together layers exist to feed."
          />
        </SeeAlso>

        <MetaNote>
          Written May 2026 for the Analytic Bytes Library. State-level findings
          reflect NAS 2021 and PGI 2022–23 cycles. The Andhra Pradesh Class 10
          figures cited above trace to the{" "}
          <a
            href="https://parakh.ncert.gov.in/dashboard/NAS2021#/"
            target="_blank"
            rel="noopener"
            className="text-accent hover:text-accent-2 no-underline border-b border-line-2 hover:border-accent pb-px"
          >
            NCERT PARAKH NAS 2021 dashboard
          </a>{" "}
          (Andhra Pradesh &rsaquo; Class 10 &rsaquo; By Range of Performance).
          Subsequent NAS 2024 and PGI releases would refine the picture. The
          integration-architecture argument is intended to outlast specific
          cycle data.
        </MetaNote>
      </>
    ),
  },

  // ===================================================================
  // FIELD NOTE 03 — Burden, Disparity, and the Next Dollar
  // ===================================================================
  {
    kind: "field-note",
    slug: "burden-disparity-and-the-next-dollar",
    number: "03",
    title: "Burden, Disparity, and the Next Dollar",
    subtitle:
      "A reliability-filtered read of CDC suicide-mortality data — and why the single headline rate sends prevention money to the wrong map.",
    date: "2026-05-25",
    readingTime: "9 min read",
    summary:
      "Burden and disparity are two different signals in the same CDC mortality data. The priority list you build from one is not the list you build from the other — and a framework that shows both changes where the next prevention dollar goes.",
    cover: "/library/covers/burden-disparity-and-the-next-dollar.svg",
    arc: "measurement",
    body: (
      <>
        <Brief>
          <p>
          A funder with a fixed prevention budget, or a state health officer with one, faces the same question every cycle: where does the next dollar go? The instinct is to follow the headline and fund the states with the highest suicide rate. That instinct isn&rsquo;t wrong, but on its own it sends money to the wrong map. This is a field note, not a study. It is an exploratory, reliability-filtered read of seven years of CDC WONDER mortality data, and its only real claim is structural: burden and disparity are two different signals, the priority list you build from one is not the list you build from the other, and a framework showing both — while staying honest about what it can&rsquo;t see — changes the allocation decision. Written for the person who has to defend that decision after it&rsquo;s made.
        </p>
          <p>
            This is a field note, not a study. It is an exploratory,
            reliability-filtered read of{" "}
            <a
              href="https://wonder.cdc.gov/"
              target="_blank"
              rel="noopener"
              className="text-accent hover:text-accent-2 no-underline border-b border-line-2 hover:border-accent pb-px"
            >
              CDC WONDER
            </a>{" "}
            mortality data from 2021 to 2024, and its only real claim is
            structural: burden and disparity are two different signals, the
            priority list you would build from one is not the list you would
            build from the other, and a prioritization framework that shows
            both, and stays honest about what it can’t see, changes the
            allocation decision. This piece is for the person who has to
            defend that decision after it’s made.
          </p>
        </Brief>

        <H2>The headline that hides the signal</H2>
        <P>
          Let’s start with the good news, because it is real. Across the younger age
          bands, suicide rates fell between 2021 and 2024, and not slightly.
          Ages 10–14 down about 16 percent. Ages 15–19 down 13 percent. Ages
          20–24 down 13 percent. Ages 25–34 down 12 percent. Four bands, every
          one of them moving the right direction.
        </P>
        <P>
          Now split the same dataset differently. The mid-life bands moved the other way over the same three years: ages 35--44 up roughly 3 percent, and 45--54 up about 3.5 percent. The decline among the young and the rise after 35 are happening at the same time, in the same country, in the same data.
        </P>

        <Figure
          src="/library/figures/cdc-age-rate-change-2021-2024.png"
          alt="Bar chart of percent change in crude suicide rate by age band, 2021 to 2024, ages 10–54. Four younger bands (10–14, 15–19, 20–24, 25–34) declined 12–16 percent; two mid-life bands (35–44, 45–54) rose 3 to 3.5 percent."
          caption="Percent change in crude suicide rate by age band, 2021 to 2024, ages 10–54. Source: CDC WONDER provisional mortality data. Descriptive comparison; not causal."
        />

        <P>
          A single national rate blends those opposite movements into one number, and because the youngest bands are falling fast, that number still reads as progress. The blend hides the reversal inside it: for every age band past 35, the trend has already turned. An average cannot tell a funder that, and a funder who reads only the average will not know to look. The lesson isn&rsquo;t really about age — it is that any rolled-up number is a decision hazard. It blends signals moving in opposite directions, and the blend erases the contrast a resource decision depends on. You have to disaggregate before you can allocate. Age is one cut. The one this note is about is harder.
        </P>

        <H2>Two signals, not one</H2>
        <P>
          When prevention dollars get prioritized by geography, the working
          number is almost always <I>burden</I>: the state’s overall suicide
          rate, deaths relative to population. It is the obvious signal, and a
          sound one. It answers a real question: how large is the problem here.
        </P>
        <P>
          It is not the only question. The second signal is <I>disparity</I>:
          within a state, how much higher the rate runs for the most-affected
          racial group than for the White population. Expressed as relative
          risk, a value of 2.0 means that group’s rate is twice as high.
          Disparity doesn’t measure how big the problem is. It measures how
          unevenly it falls.
        </P>
        <P>
          Burden and disparity are different instruments, and they answer to
          different commitments. A funder optimizing to prevent the most deaths
          leans on burden. A funder optimizing to close the widest gap leans on
          disparity. Most prioritization exercises pick one, usually burden,
          because it is the number that sorts cleanly into a ranked list, and
          never see the other at all.
        </P>

        <H2>The map burden draws, and the map disparity draws</H2>
        <P>
          Rank states by burden for 2024, ages 10--54, and the top of the list is Alaska (a rate of 36.4 per 100,000), Wyoming (31.5), Montana (30.4), New Mexico (29.8), South Dakota (26.9), then North Dakota, Colorado, Oklahoma, Maine, Arkansas, Idaho. It is, broadly, a Mountain-West and rural map.
        </P>

        <Figure
          src="/library/figures/cdc-top-burden-states-2024.png"
          alt="Horizontal bar chart of the top 15 US states by overall suicide rate, ages 10–54, 2024. Mountain West and rural states lead."
          caption="Top 15 states by overall suicide rate, ages 10–54, 2024. High burden does not imply a credible within-state disparity signal. Source: CDC WONDER provisional mortality data."
        />

        <P>
          Now rank by disparity instead. The strongest reliable relative-risk
          signals are Minnesota (3.6×, the rate for American Indian and Alaska
          Native residents against the White rate), South Dakota (3.1×), Alaska
          (2.9×), Montana (1.9×), Hawaii (1.8×, here for residents identified as
          more than one race), Arizona (1.6×), and California (1.5×).
        </P>

        <Figure
          src="/library/figures/cdc-top-disparity-states-2024.png"
          alt="Horizontal bar chart of US states passing all reliability filters, ranked by relative risk of suicide for the most-affected racial group versus the White population, ages 10–54, 2024."
          caption="States passing all reliability filters, ranked by relative risk vs. the White population, ages 10–54, 2024. Signal rules: deaths ≥ 20 in both comparison groups; RR ≥ 1.25; positive absolute rate difference. Source: CDC WONDER."
        />

        <P>
          The two lists overlap in some places and split hard in others.
          Minnesota and California both carry serious disparity signals while
          sitting at or below the middle of the burden table; a burden-only
          funder never sees them. Wyoming and New Mexico sit near the top of the
          burden table with no reliable disparity signal at the state level; a
          disparity-only funder never sees <I>them</I>. Same data, same year.
          Two different priority lists, depending only on which signal you let
          do the sorting.
        </P>

        <H2>One map, four groups</H2>
        <P>
          Put both signals on the same axes and the states sort into four
          groups.
        </P>

        <Figure
          src="/library/figures/cdc-burden-disparity-quadrant.png"
          alt="Scatter plot of US states with overall suicide rate on the horizontal axis and disparity relative risk on the vertical axis. States in the upper-right quadrant carry both high burden and a credible disparity signal."
          caption="Burden × disparity signal map, ages 10–54, 2024. Each point is a state: horizontal position is the overall suicide rate, vertical position is the relative risk for the most-affected racial group vs. the White population. States with no reliable disparity signal are plotted at 1.0. Signal rules: deaths ≥ 20 in both comparison groups; RR ≥ 1.25; positive absolute rate difference. Source: CDC WONDER provisional mortality data."
        />

        <P>
          <B>High burden and credible disparity:</B> the upper-right. Alaska,
          South Dakota, Montana, Arizona, Hawaii. Both signals fire — a high
          overall rate <I>and</I> a measurable, reliable equity gap inside the state.
          This is the strongest and most defensible case for the next dollar,
          because it answers to both commitments at once.
        </P>
        <P>
          <B>High burden only:</B> the lower-right. Wyoming, New Mexico,
          Colorado, North Dakota, Oklahoma, and more. A real, large problem,
          with no reliable evidence of a racial disparity at the state level.
          Investment here is well-justified on volume of harm alone.
        </P>
        <P>
          <B>Credible disparity, lower burden:</B> the upper-left. Minnesota
          and California. The statewide rate is not alarming, but a specific
          population inside the state is carrying a markedly higher rate than its
          White neighbors — about one and a half times higher in California, more
          than three times higher in Minnesota. Investment here is justified on
          equity, and it is the case a burden ranking renders invisible.
        </P>
        <P>
          <B>Monitor:</B> the lower-left. Neither signal fires reliably. Not
          “safe,” and not dismissed, just not where this dataset points a
          limited budget first.
        </P>
        <P>
          One pattern runs through nearly every disparity signal on the map. In six of the seven states with a reliable signal, the most-affected group is American Indian and Alaska Native communities; in Hawaii, it is residents of more than one race. That is the clearest pattern the disparity signals show. It should shape not only where the dollar goes, but who helps design what it funds; a prevention dollar spent <I>on</I> a community tends to underperform a dollar spent <I>with</I> one.
        </P>

        <H2>Where the next dollar goes</H2>
        <P>
          The framework doesn&rsquo;t hand a funder an answer; it makes the question explicit. A dollar can be spent to prevent the most deaths or to close the widest gap, and those are different ethical commitments that lead to different states. A serious allocation decision says which one it is optimizing, or splits the budget across both on purpose, instead of letting the choice get made implicitly by whichever number was on the slide.
        </P>
        <P>
          The overlap group is where the argument is easiest. Alaska, South Dakota, Montana, Arizona, and Hawaii satisfy both commitments simultaneously, and for most funders that is where a first tranche belongs. The harder and more revealing conversations are the off-diagonal ones. Is a Minnesota — an unremarkable statewide rate hiding a more-than-threefold disparity — a priority for your mission? A burden ranking already answered “no” on your behalf before anyone in the room weighed in. The quadrant&rsquo;s value is that it puts the state back on the table and forces the answer to be given on purpose.
        </P>

        <H2>The honest version</H2>
        <P>
          This is a field note, and being precise about what the data cannot do is part of the method — not a disclaimer bolted to the end.
        </P>
        <P>
          The figures are <I>provisional.</I> CDC WONDER mortality counts for 2018--2024 are revised over time; the picture will shift.
        </P>
        <P>
          The disparity signals are <I>reliability-filtered.</I> A signal counted here only if there were at least 20 deaths in both the comparison group and the White comparison group, a relative risk of at least 1.25, and a positive absolute rate difference. Below those thresholds, small counts produce rates that swing wildly from year to year, and an unfiltered ranking would look precise without being so.
        </P>
        <P>
          <I>Absence of a signal is not evidence of equity.</I> Several states,
          Montana and South Dakota among them, carry a suppression-caution flag:
          the comparison is real but thin, built on few enough visible groups
          that it should be read carefully. And “no reliable disparity signal”
          almost never means a state has no disparity. It usually means the
          affected groups are too small, in that state, for this dataset to
          surface one safely.
        </P>
        <P>
          Most important: this is an <I>exploratory prioritization signal</I>,
          not an allocation formula. It is a map of where to look harder and ask
          sharper questions, not a number that should move money on its own. A
          measure that triggers investigation and a measure that drives
          allocation are not the same instrument, and treating the first as if
          it were the second is one of the most common ways well-meant analysis
          does harm.
        </P>

        <H2>What this is really about</H2>
        <P>
          Underneath the subject matter, this is a decision-systems problem.
          An organization has a real decision to make (where prevention
          resources go), and the data it holds is being read through a single
          number that cannot carry the decision. The fix is not more data. It is
          a framework that disaggregates the signals the decision
          rests on, shows them together, and stays disciplined about its own
          limits.
        </P>
        <P>
          That move is the same whether the decision is a state’s prevention
          budget, a school district’s intervention dollars, or a clinical
          network’s capacity plan: name the decision, find the distinct signals
          it truly depends on, and refuse to let one rolled-up average stand in
          for all of them.
        </P>
        <P>
          The next dollar gets spent either way. A framework like this one doesn&rsquo;t spend it for you, and it shouldn&rsquo;t. It makes sure that when you spend it, you were looking at the whole map: both signals, and the honest edges of what the data can and cannot say. <I>From fragmented to decision-ready.</I>
        </P>

        <Note>
          This piece discusses suicide. If you or someone you know is
          struggling, the 988 Suicide &amp; Crisis Lifeline (call or text 988)
          is available 24/7 in the US.
        </Note>

        <SeeAlso>
          <SeeAlsoItem
            slug="actions-not-answers"
            title="Actions, Not Answers"
            gloss="What it takes to turn a disparity signal into a decision someone owns."
          />
          <SeeAlsoItem
            slug="what-is-this-system-measuring"
            title="What is this system actually measuring?"
            gloss="The measurement discipline beneath a fairness claim."
          />
        </SeeAlso>

        <MetaNote>
          Exploratory analysis of CDC WONDER provisional mortality data,
          2021–2024 (ages 10–54). Written May 2026 for the Analytic Bytes
          Library. This is a signal framework for strategic prioritization, not
          a causal analysis, an epidemiological ranking, or a definitive
          allocation system. Reliability filters are described in the text.
        </MetaNote>
      </>
    ),
  },

  // ===================================================================
  // ESSAY 03 — Where Should Data Sit
  // ===================================================================
  {
    kind: "essay",
    slug: "where-should-data-sit",
    number: "03",
    title: "Where Should Data Sit?",
    subtitle:
      "Who owns data infrastructure — and the principle that should settle it.",
    date: "2026-05-22",
    readingTime: "10 min read",
    summary:
      "Who owns data infrastructure is one of the org chart’s most muddled questions. The fix is not a better title; it is a principle — report to the integration seat, never to a single function.",
    cover: "/library/covers/where-should-data-sit.svg",
    arc: "data-foundations",
    body: (
      <>
        <Brief>
          <p>
            In most organizations, one line on the org chart was never really
            decided. It was inherited. Who owns data infrastructure? The
            function ended up reporting wherever the first analyst was hired, or
            under IT because data felt technical, or under finance because data
            felt like an asset to safeguard. It was rarely a deliberate choice,
            and it tends to stay wherever it landed.
          </p>
          <p>
            That accident has consequences. Where data infrastructure reports
            decides what the function is allowed to become, and it also drives
            a hiring problem that looks unrelated. This piece argues there is a
            right answer. Not a right title; a right principle. It is written
            for anyone drawing, or redrawing, an org chart with a data function
            on it, and it is an argued position: I will make the case for each
            alternative before I make mine.
          </p>
        </Brief>

        <P>
          Start with the confusion. It is real, and it is a clue. Ask ten
          organizations who owns data infrastructure and you get a tour of the
          alphabet: the CIO, the CTO, the CFO, the COO, the CPO, a CDO, a CDAO,
          a Chief Innovation Officer, sometimes a Chief Impact Officer, a CAIDO. Several of those titles mean
          different things at different organizations. The acronym soup is not a
          trivia problem; it is the symptom. The field has not agreed what this
          function <I>is</I>, so it has not agreed who should own it. Every
          organization improvises.
        </P>
        <P>
          Recent industry data backs the improvising read. In{" "}
          <a
            href="https://static1.squarespace.com/static/62adf3ca029a6808a6c5be30/t/67642c0d40b42a7d7e684f49/1734618125933/2025+AI+&+Data+Leadership+Executive+Benchmark+Survey+120624.pdf"
            target="_blank"
            rel="noopener"
            className="text-accent hover:text-accent-2 no-underline border-b border-line-2 hover:border-accent pb-px"
          >
            NewVantage Partners’ 2025 benchmark survey of data and AI executives
          </a>
          , 53.7% of CDOs and CDAOs reported being in role under three years,
          and fewer than half (47.6%) characterized the role as “very
          successful.” The seat keeps turning over before it has time to
          settle, and the people sitting in it don’t agree on whether the
          seat is working.
        </P>
        <P>
          So set the title question aside. Answering it first is how
          organizations end up improvising. Ask the prior one. What does data
          infrastructure actually need from its place on the org chart? Answer
          that, and the seat stops being a matter of taste.
        </P>
        <P>
          I first met this argument in a narrower form, in a single
          mission-driven organization: the monitoring-and-evaluation data — what
          tells a funder whether a program worked — sat with the digital-products
          team, and it got bent toward that team’s priorities rather than the
          evaluators’. The fix there and the fix here are one argument at two
          scales: data should not be owned by a function whose incentives point
          somewhere else. What follows is that argument at full-organization
          scale.
        </P>

        <H2>The four reasonable answers</H2>
        <P>
          There are four defensible places to put data infrastructure. Each
          deserves a fair case before I argue against it.
        </P>
        <P>
          <B>Under the CTO or CIO.</B> The case is strong. Data runs on
          technical infrastructure: pipelines, warehouses, access controls,
          uptime. That is engineering, and engineering muscle lives under the
          CTO. Put data where the people who can build and run the plumbing
          already sit. The cost shows up later. Under the CTO, data is treated
          as a system to keep running, and what gets resourced is what the CTO
          is measured on — reliability, security, uptime. The semantic layer —
          what makes data <I>mean</I> something to a program lead or a board —
          becomes nobody’s priority. The function slowly turns into a
          service desk — requests arrive through a ticketing queue, analysts
          close them quickly, and the decision happens somewhere else without
          them.
        </P>
        <P>
          <B>Under the CFO or CFAO.</B> Also a real case. Data is a governed,
          risk-bearing asset, and finance already runs enterprise reporting, has
          audit discipline, treats numbers as things that must reconcile and
          withstand scrutiny. Few functions are better at custody. The cost is
          one of orientation. Finance looks backward by habit, and it looks at
          compliance &mdash; the close, the audit, the filing. Under finance,
          the data function optimizes for the report being correct rather than
          the decision being better, and forward-looking operational work is
          always the thing finance will get to later.
        </P>
        <P>
          <B>Its own seat, a CDO or CDAO.</B> This is the strongest alternative,
          and it should be conceded as one. Data is strategic enough to warrant
          a peer-level seat: uncaptured, visible, with a standing none of the
          embedded options confer. The role exists to solve the placement
          problem. The cost is the gap between a seat and traction. A CDO with a
          title but no integration mandate produces strategy &mdash; frameworks,
          roadmaps, decks &mdash; and not adopted systems, because nothing structurally
          obliges the other functions to change how they work. The seat becomes
          an island. And for most mid-size and mission-driven organizations the
          seat is unaffordable; prescribing it prescribes nothing they can act
          on.
        </P>
        <P>
          <B>Under the CPO, in service of the product.</B> Where data{" "}
          <I>is</I> the product, or feeds it directly, this is correct and
          barely needs defending. The trap is the boundary case: when a product
          team is building a customer-facing surface that incorporates data
          delivery, it tends to claim the data infrastructure as part of the
          product itself. Where data is not the product, it is the narrowest
          capture of all: the function answers the product’s questions well and
          the rest of the organization’s not at all.
        </P>
        <P>
          All four placements share one flaw. Each puts data infrastructure
          inside a single function, and a single function bends data toward its
          own incentive. The executives aren’t at fault; this is how reporting
          lines work. A cross-functional capability owned by one function gets
          narrowed to it.
        </P>

        <H2>What the function actually needs</H2>
        <P>
          So name what data infrastructure needs from its place on the chart.
          Four things.
        </P>
        <NumList>
          <NumItem n={1}>
            It needs to <B>see across every function</B>, because it serves all
            of them: programs, finance, operations, development, the executive
            team.
          </NumItem>
          <NumItem n={2}>
            It needs to stay <B>uncaptured</B>. The moment it bends toward one
            function’s incentive, the other functions stop trusting it as
            theirs.
          </NumItem>
          <NumItem n={3}>
            It needs <B>traction</B>. Sight is not enough &mdash; it needs the
            standing to make functions adopt shared definitions and use what it
            produces. Sight without traction is a research office nobody acts
            on.
          </NumItem>
          <NumItem n={4}>
            It needs to report at the{" "}
            <B>altitude where its daily decisions live</B>. Data infrastructure
            does feed strategy — board reviews, capital decisions, multi-year
            bets — but those are episodic. The function’s daily rhythm is the
            recurring operating decisions that run across functions. Place
            ownership where the recurring rhythm lives, and the episodic work
            still gets served. Place it at the strategic altitude and the daily
            rhythm starves.
          </NumItem>
        </NumList>
        <P>
          No single-function seat provides all four. A function seat fails the
          second test the day it is created.
        </P>

        <H2>The seat that is left</H2>
        <P>
          Strip away the four embedded options and one seat is left: the one
          already accountable for how the whole organization runs together.
          Call it the integration seat. In most organizations, it is the Chief
          Operating Officer.
        </P>
        <P>
          The COO is not a single function. The COO is the place the functions
          already meet, which clears the capture test, and the COO sees across
          all of operations, which clears the sight test. The third test is the
          one a standalone CDO cannot pass: the COO has the standing to make a
          shared definition stick. When the COO says every team will use one
          definition of an active client, teams use it. When a peer says it,
          they negotiate. That is a property of the seat. And the altitude
          matches: the COO’s job is how the organization operates day to day,
          which is where data infrastructure’s decisions live.
        </P>
        <P>
          Why not put data under the CEO, then? More authority still. The answer
          is that authority is not the binding constraint. Altitude is. The
          CEO’s seat is strategy, the board, fundraising, the outside world. A
          data function reporting to the CEO tends to collect the title and not
          the operating attention; the CEO will not run the weekly cadence that
          turns a data function into an adopted one. It ends up high-status and
          under-used, an orphan with a good address.
        </P>
        <P>
          There is one real exception, and it matters, because it describes most
          of the organizations I work with. Many organizations have no COO. In
          smaller and mission-driven organizations, the executive director or
          CEO <I>is</I> the operating integrator. There is no second seat to
          move it to. There, data infrastructure should sit with the CEO or ED
          &mdash; not because that office is senior enough, but because in that
          organization it is the integration seat. As the organization grows and adds a COO,
          ownership should migrate to it.
        </P>
        <P>
          In MEL-heavy organizations — foundations, intermediaries with a
          strong measurement mandate — the Chief Impact Officer can function as
          the integration seat for measurement and program data. That holds
          when the role’s scope actually covers cross-functional adoption
          rather than just impact reporting. Where it does, it is the
          integration seat for that organization, and the principle holds —
          the seat just isn’t always called what the principle expects.
        </P>
        <P>
          In clinical organizations — hospitals, health systems, integrated
          care networks — the same role is often the Chief Medical Information
          Officer (CMIO), who sits at the bridge between clinical operations,
          IT, and data. Where the CMIO’s mandate covers cross-functional
          adoption — clinical, operational, financial — rather than just EHR
          governance, the principle holds: it is the integration seat for
          clinical analytics, even though the title looks sector-specific.
        </P>
        <P>
          That is the principle, and it is worth stating without a single
          acronym in it:
        </P>
        <Pull>
          Data infrastructure should report to the integration seat, never to a
          single-function seat.
        </Pull>
        <P>
          That seat is the COO by default, the CEO or executive director where
          there is no COO, and ownership should move between them as the
          organization formalizes. The title changes from org to org, and over
          time. The principle does not. That is the real resolution of the
          acronym soup. The field keeps trying to settle a <I>function</I>{" "}
          question with a <I>naming</I> answer, and it never works, because the
          answer was never a name.
        </P>

        <Figure
          src="/library/figures/where_should_data_sit_placement_options_figure.svg"
          alt="Where data can sit — five common placements, one AB-argued position"
          caption="Four of the five placements bend the function toward one seat&rsquo;s incentives. The fifth &mdash; the integration seat &mdash; is where data infrastructure earns its independence."
        />

        <P>
          The principle is not anti-CTO. The CTO owns the pipes: the engineering
          of the platform, the security, the uptime, and owns them well. Data
          infrastructure, placed at the integration seat, owns the semantic
          layer and the decision-serving built on top of those pipes. Two
          functions, one clean handoff. Placing data at the integration seat
          does not take it away from engineering. It ends the pretense that the
          semantic-and-decision layer is an engineering by-product.
        </P>
        <P>
          I have watched this from inside more org charts than most people get
          to. The same data capability, sometimes the same people, sat under a
          research division at one organization, under the business at another,
          under a COO at a third. At one, it was moved mid-year from one
          executive to another and renamed on the way. At another, the role was
          dissolved and quietly rehired by a different function a year later,
          which is the placement principle running its own correction in slow
          motion. The capability did not change across those moves; its reach
          did. Under the integrator it served the whole organization. Everywhere
          else it served whoever it reported to, and the rest of the organization
          learned to route around it.
        </P>

        <H2>The unicorn that isn’t</H2>
        <P>
          There is a hiring problem that looks unrelated to all of this. It
          isn’t.
        </P>
        <P>
          Mission-driven organizations keep writing job descriptions for data
          leaders that read as impossible. One person who can architect the
          infrastructure, and carry real measurement depth, and run the
          analytics, and hold their own with the C-suite. Search committees
          circulate these, then sigh that the candidate is a unicorn and the
          role cannot be filled.
        </P>
        <P>
          Most of the time, the unicorn is not a talent problem. What looks
          like a talent problem is a placement problem. When data
          infrastructure is buried under IT, or scattered across programs, or
          housed in finance, the person hired to lead it has to personally span
          every layer the org chart failed to connect. They are the only
          integration the organization built. The role looks heroic because it
          is doing, in one body, the structural work a correct reporting line
          would have done for free.
        </P>
        <P>
          Place ownership at the integration seat and the heroics subside.
          Full-stack capability stops being a unicorn requirement. It becomes a
          senior role <I>supported</I> by its position instead of compensating
          for the lack of one. The role was never impossible. It was
          mis-housed, and the job description was billing one person for the
          org chart’s unpaid debt.
        </P>

        <H2>Where this is going</H2>
        <P>
          The field is slowly moving toward all of this. Data spent two decades
          under IT, treated as a cost to control rather than a capability to
          build. The Chief Data Officer emerged to pull it up and out, and the
          title has since absorbed analytics and then AI, cycling through CDO,
          CDAO, CAIDO. The direction of travel is real: data climbing from the
          basement toward the place decisions get made.
        </P>
        <P>
          But the climb has mostly reached large enterprises. Mid-size and
          mission-driven organizations are still placing data by accident. And
          the churn of titles is the field, again, trying to solve a function
          problem with a naming solution.
        </P>
        <P>
          Agentic AI is about to make the question impossible to keep
          improvising. Agents do not just inform decisions; they make them, and
          every agent needs a manager and an owner. An organization that never
          decided where its <I>data</I> infrastructure sits is now going to be
          asked where its <I>agents</I> sit, and who is accountable when one
          acts. The placement question does not get easier &mdash; it gets
          unavoidable.
        </P>
        <P>
          The answer, when an organization finally faces it, will not be a
          title. It will be a decision about what the function is <I>for</I>:
          serving decisions across the whole organization. Once that is named,
          the seat is named with it &mdash; the one place already accountable
          for the whole organization running together. Put data there and it
          stops being a service desk, a compliance engine, or an island. It
          becomes what it was designed to be. <I>From fragmented to
          decision-ready</I> &mdash; and that begins, before a single dashboard
          is built, with where the function sits.
        </P>

                <SeeAlso>
          <SeeAlsoItem
            slug="plumbing-got-upgraded-water-didnt"
            title="Plumbing got upgraded. The water didn’t."
            gloss="The work-side argument: what people call plumbing has become water-authority work — which is what makes the seat question worth asking."
          />
          <SeeAlsoItem
            slug="numbers-dont-agree"
            title="The numbers don’t agree because the words don’t"
            gloss="Why the seat needs the standing to make a shared definition stick across functions."
          />
          <SeeAlsoItem
            slug="three-surfaces-one-keystone"
            title="Three Surfaces, One Keystone"
            gloss="The reporting surfaces the function owes once it has the right seat."
          />
        </SeeAlso>

        <MetaNote>
          Written May 2026 for the Analytic Bytes Library. An argued position
          piece; the honest case for each alternative is made in earnest before
          the argument lands.
        </MetaNote>
      </>
    ),
  },

  // ===================================================================
  // ESSAY 04 — Actions, Not Answers
  // ===================================================================
  {
    kind: "essay",
    slug: "actions-not-answers",
    number: "04",
    title: "Actions, Not Answers",
    subtitle:
      "Agentic AI is not a smarter tool — it is a decision-system redesign, and the checkpoint that used to come free now has to be built.",
    date: "2026-05-29",
    readingTime: "9 min read",
    summary:
      "Agentic AI produces actions, not answers — and the human checkpoint that came free with every answer is gone unless you design it back in. Why agentic adoption is a decision-system question, not a technology one.",
    cover: "/library/covers/actions-not-answers.svg",
    arc: "ai-systems",
    body: (
      <>
        <Brief>
          <p>
            Agentic AI is being sold to leaders right now as a capability
            upgrade: the same AI you already use, except now it can act on its
            own. Approve it the way you would approve any tool upgrade (a budget
            line, a pilot, a vendor) and you will have missed the one thing that
            changed.
          </p>
          <p>
          What changed is not the model. It is the unit of work. AI used to produce answers. An answer has a human reading it before anything happens. Agentic AI produces actions, and an action does not wait to be read. The human checkpoint that came free with every answer is gone, unless you design it back in. That makes agentic adoption a decision-system question, not a technology one. What follows is written for the leader who has to decide, concretely, what their organization will let an agent do.
        </p>
        </Brief>

        <P>
          Let’s start with what an “agent” is, because the demo obscures it.
          An agent is the same kind of model as any other, with two
          things added: tools it can call, and a change in how its output is
          read. The same text a chatbot would hand back as a reply, an agent
          treats as a program — an instruction to go do something. Read as a
          reply, the output is an answer. Read as a program, it is an action.
          That interpretive shift, plus the tools, is the whole of it.
        </P>
        <P>
          It sounds small. It is not. It is the difference between a tool you
          use and a system you manage, and most of what a leader needs to weigh
          follows from that one line.
        </P>
        <P>
          A working definition, the kind you would say at the start of a meeting (I drafted this for my MIT capstone playbook and use it now in client conversations): agentic AI is a software system that takes a goal, plans its own next moves across your tools and data, and produces actions rather than answers. Hold onto “actions rather than answers.” Everything else follows from it.
        </P>

        <P>
          Throughout the rest of this piece, I&rsquo;ll keep coming back to one workflow as the worked example: AB&rsquo;s “Deliver Signal,” the first ninety days of how I take a mission-driven client from fragmented sources to one decision-ready surface an executive and a frontline operator can both act on. It is the candidate workflow I worked through in detail for my MIT capstone, and it is also the work I am doing, currently end-to-end myself, with AI augmentation in code, prose, and analysis. It surfaces every decision this essay will walk through: where the human checkpoint is, where the agent&rsquo;s autonomy ends, what safeguards are required, and who owns the result.
        </P>

        <H2>The checkpoint that used to be free</H2>
        <P>
          When an AI system produces an answer, a decision still has to happen. Someone reads the answer, judges it, and acts on it, or doesn&rsquo;t. That human decision point is not something anyone designed in. The format leaves room for a checkpoint, whether or not the person uses it. An answer is inert until a person reads it, and that reading is where the checkpoint can happen — even if the person only skims.
        </P>
        <P>
          When an AI system produces actions, that checkpoint is gone by
          default. The agent books the appointment, sends the message, moves the
          money. The decision still gets made; each of those is a decision. But
          now the system makes it, at its own speed, unless a human was
          deliberately designed into the path.
        </P>
        <P>
          The real shift is a relocation. Agentic AI does not add a
          decision to your organization; it relocates one. It takes a decision
          that used to belong, by default, to a human who got it for free, and
          hands it, by default, to a model. Every “let the agent handle that” is
          a decision about who holds decision authority, made whether or not
          anyone in the room noticed they were making it.
        </P>
        <P>
          That is why this is a decision-system redesign and not a tooling upgrade. A tooling upgrade changes how a step is performed; this changes who decides.
        </P>

        <H2>Most data problems are still decision problems</H2>
        <P>
          There is a claim at the center of how Analytic Bytes reads every one
          of these situations: most organizations do not have a data problem.
          They have a decision-system problem. The decisions are unnamed,
          unowned, made by default, or resting on signals nobody checks.
        </P>
        <P>
          Agentic AI does not change that claim. It sharpens it. An organization that never named which decisions its workflows make, who carries them, and what evidence they stand on has a decision-system problem whether or not AI is anywhere near it. Hand that organization a set of agents and it does not get those questions answered. It gets them executed: unanswered, at machine speed, by a system that will not pause to ask. The confusion was survivable when a human sat in every loop, slow enough to catch it. Take the human out and the confusion itself runs the workflow.
        </P>
        <Pull>
          The unexamined decision system does not get fixed. It gets automated.
        </Pull>
        <P>
          So the readiness question for agentic AI is not “is the technology good enough.” The technology is good enough to force the governance question, though not good enough for every action. The question is whether the underlying decision system is clear enough to be worth speeding up.
        </P>

        <H2>Putting the checkpoint back, on purpose</H2>
        <P>
          If the free checkpoint is gone, the work is to build a deliberate one.
          Two disciplines do most of that work.
        </P>
        <P>
          The first is a threshold map. For any workflow you are considering
          handing to an agent, draw the line three ways. Where may the agent
          act entirely on its own? Where must it stop and pass the decision up
          to a human? And where must the human start the decision in the first
          place, with the agent not acting at all, only assisting? Most teams
          never draw this map. They let the vendor’s default draw it, which
          means the line ends up wherever the demo happened to put it.
        </P>
        <P>
          For AB’s Deliver Signal workflow, the three zones look concrete.
          Take source-inventory tagging, where the agent categorizes each new
          client data source by ownership, freshness, and criticality. The
          agent acts on its own when ownership is clear, freshness signals
          agree, and the source fits a known pattern from AB’s procedural
          memory. It escalates when ownership is ambiguous, freshness signals
          conflict, or the source is a new-to-AB system type. And I originate
          the decision before the agent touches any metadata when the source
          carries regulated data: student PII, EHR records, claims data. The
          same workflow has different lines for different decisions inside
          it. Drawing the map once is not the discipline. Drawing it per
          decision is.
        </P>
        <P>
          The second move is recognizing that autonomy isn&rsquo;t a binary setting. An agent isn&rsquo;t “autonomous” or “not.” For each task, in each context, it sits somewhere on a range: from only returning pre-verified responses, to acting within tight rules, to acting with every consequential move reviewed first, to acting freely and checked only by exception. The discipline is to calibrate that range per decision, by stakes, not once and globally by habit. A low-stakes, highly repeatable decision can be placed well along the range. A decision that is rare, hard to reverse, or lands on a vulnerable person should not, however capable the model looks in a demo.
        </P>
        <P>
          In AB’s case, that calibration looks different across the same
          engagement. Source-inventory tagging belongs well along the range,
          because the criteria are pattern-matchable and the cost of an
          individual wrong tag is low and recoverable. Diagnostic
          prioritization, choosing which of the client’s many problems is the
          highest-leverage gap to close first, belongs much closer to the
          human-only end. The criteria there (political readiness, sponsor
          energy, data quality, frontline pain) trade off against each other
          in ways the agent can’t yet weigh, and the cost of getting it wrong
          is months of misdirected engagement.
        </P>

        <Figure
          src="/library/figures/ab-autonomy-range.svg"
          alt="A horizontal autonomy spectrum with four decisions from AB's Deliver Signal workflow plotted at different points. Diagnostic prioritization and Frontline-versus-boardroom framing sit near the human-only end. Gap ranking is mid-spectrum, escalation-heavy. Source-inventory tagging belongs well along the spectrum toward agent autonomy."
          caption="Autonomy range for AB's Deliver Signal workflow: same engagement, four decisions, each with its own calibration. Stakes set the position, not capability."
        />

        <P>
          Readers of earlier pieces will recognize the pattern: it is the same risk-and-repeatability logic that decides where AI authority sits in any deployment. Agentic AI does not introduce that question. It raises the stakes on getting the answer written down.
        </P>

        <H2>You cannot bolt safety onto the model</H2>
        <P>
          Two design truths close the loop, and both cut against instinct.
        </P>
        <P>
          The first: do not rely on the model to keep itself safe. The temptation is to make the model careful, with better instructions and sterner prompts. But a system whose safety depends on the model choosing well, every single time, has no safety at all. Safety has to be built into the <a href="/library#artifact-agent-system" target="_blank" rel="noopener" className="text-accent hover:text-accent-2 no-underline border-b border-line-2 hover:border-accent pb-px"><ArtifactLink slug="agent-system">structure around the model</ArtifactLink></a> . Start with reversibility: an action designed to be undone has margin for the other layers to fail. Then hard limits the agent cannot cross because they are coded in, not requested in a prompt. Then an independent second check that does not share the first model&rsquo;s blind spots. Then a human escalation path more than one person deep. Layered defense, because any single layer will eventually fail, and the design has to assume it.
        </P>
        <P>
          For AB’s Deliver Signal workflow, that stack looks specific. The
          agent’s outputs (source tags, gap rankings, draft dashboards) are
          all reversible because the artifact lives in AB’s working
          environment, not in client production systems, until I sign off.
          The hard limits are coded in: the agent cannot touch regulated-data
          systems without my explicit pre-approval, and it cannot ship a
          deliverable to a client. The independent check is a separate model
          reviewing the synthesizer’s gap rankings before they make it into a
          draft. The human escalation path is short by design (there is only
          me), but the design assumes that short path is the wrong long-term
          answer.
        </P>
        <P>
          The second design truth is the comparison the conversation most often gets wrong. The question to ask of an agent is not “does it make mistakes?” Of course it does. So does the human process it would replace. The real question is whether this agent, with its safeguards, produces better decisions than the process it replaces, on the dimensions that matter. That reframe keeps the conversation off a fantasy (agent versus perfection) and on the real choice: the agent and its safeguards together, weighed against a status quo that had its own error rate all along, usually unmeasured.
        </P>
        <P>
          This is also where AB’s ed-tech and behavioral-health client
          conversations diverge before the comparison can even be made. In
          ed-tech, “agent” tends to mean an LLM-wrapped assistant that helps
          a teacher draft a lesson, and the comparison is straightforward,
          against the lesson the teacher would have written. In
          behavioral-health, “agent” gets confused with regulated staff roles
          (intake agent, case management agent) or with RPA (robotic process automation) bots already
          approved under HIPAA review. The comparison cannot be made until
          that definitional confusion is cleared with the Chief Clinical
          Officer or whoever holds the regulated-data accountability.
        </P>
        <P>
          Evaluation does not end at launch. Because the model drifts, an agent has to be watched continuously: its override rate, its disagreement signals, its slow drift as conditions change. Monitoring is no longer a quarterly report; it is an ongoing conversation with a system that continues to make decisions in your name.
        </P>

        <H2>The job becomes management, not use</H2>
        <P>
          This is the consequence leaders most often miss. When AI produced
          answers, the human’s relationship to it was use, the way you use a
          calculator or a search box. When AI produces actions, that
          relationship has to become management. Every agent has to have a
          named owner: a specific person accountable for what it does.
        </P>
        <P>
          Managing an agent is a new job, with new responsibilities that no prior role quite contained. The owner calibrates the thresholds as the agent&rsquo;s behavior drifts, and it will drift, because the model underneath gets upgraded by a vendor on a schedule nobody consulted you about. The owner decides which patterns the agent should retain and which it should drop. And the owner does the hardest thing of all: refuses to let the agent act. Deciding, in real time, that a particular case is one the agent should not touch, and being able to defend that call.
        </P>
        <P>
          For AB’s first agentic workflow, I’m the day-to-day owner. That’s
          uncomfortable but honest: at AB’s current scale there is no other
          person, and the agent’s job is to do work I would otherwise do
          myself. The role becomes a formal hire only once the operating
          standard is documented well enough that an AB associate could
          supervise the agent against it, and once at least one engagement
          has run through the agent cleanly enough to know what “right” looks
          like. The first agent-owner hire is then a deliberate role, not a
          generic engineer.
        </P>
        <P>
          An organization that deploys agents without naming who owns each one has installed a decision-maker with no one accountable for it. When the agent makes a bad call, the question of who carries it has no answer prepared, and the response tends to be slower than the original bad call.
        </P>

        <H2>What this asks of a leader</H2>
        <P>
          The leader’s real question was never “should we adopt agentic AI.”
          It is narrower and harder, and it is a list: for which decisions,
          at what point on the autonomy range, with what checkpoint, owned by
          whom, watched how. Not one of those is a technology question. Every
          one is a decision-system question, and they were the right
          questions to ask long before agents existed. Agentic AI’s real
          effect is that it removed the option of leaving them unasked.
        </P>
        <P>
          For AB, working through that list is the work, not a preliminary to the work. The Deliver Signal workflow gets handed to an agent only after the decisions inside it have been named, the owners assigned, the thresholds drawn, the safeguards built. An organization that does this first can gain real speed without losing coherence. An organization that hands an agent its confusion gets the confusion back faster, with no human in the loop slow enough to notice.
        </P>
        <P>
          The discipline is not in any single safeguard. It is in the architecture, the cadence, and the refusal to loosen the constraint at the moment loosening it would be convenient. <I>From fragmented to decision-ready</I> was always the work. Agentic AI did not change that. It only raised the price of skipping it.
        </P>

                <SeeAlso>
          <SeeAlsoItem
            slug="the-contracts-between-systems"
            title="The contracts between systems"
            gloss="What the agentic-era contract has to specify so an action a machine takes is one a human can stand behind."
          />
          <SeeAlsoItem
            slug="numbers-dont-agree"
            title="The numbers don’t agree because the words don’t"
            gloss="When the words underneath the answer were never settled to begin with."
          />
          <SeeAlsoItem
            slug="burden-disparity-and-the-next-dollar"
            title="Burden, Disparity, and the Next Dollar"
            gloss="A disparity signal that needed an action, not an answer."
          />
        </SeeAlso>

        <MetaNote>
          Written May 2026 for the Analytic Bytes Library. The argument adapts
          several frameworks from MIT Sloan’s Agentic AI Development program:
          the autonomy spectrum, the four safeguard layers, the
          human-in-the-loop threshold pattern, the comparison-that-matters
          reframe, and the “every agent needs a manager” positioning. The
          working definition and the AB Deliver Signal worked example come
          from the author’s program capstone playbook. The original
          contribution here is the “free checkpoint” framing and the
          decision-system reading of agentic adoption. A future field note
          will revisit this argument once AB’s first agentic workflow has
          been deployed and run.
        </MetaNote>
      </>
    ),
  },

  // ===================================================================
  // ESSAY 05 — What is this system actually measuring?
  // ===================================================================
  {
    kind: "essay",
    slug: "what-is-this-system-measuring",
    number: "05",
    title: "What is this system actually measuring?",
    subtitle: "The evaluation gap in higher education’s AI moment.",
    date: "2026-05-31",
    readingTime: "8 min read",
    summary:
      "Universities have built the scaffolding to govern AI and skipped the evaluation layer. The measurement-science question every adopted system should face — what is this actually measuring, and is that what we meant?",
    cover: "/library/covers/what-is-this-system-measuring.svg",
    arc: "measurement",
    body: (
      <>
        <Brief>
          <p>
          By the start of 2026, most universities had done the visible work of responding to artificial intelligence. They had written policies on student and faculty use. They had stood up AI committees and working groups. They had run pilots: assistants for student services, drafting tools for administrative staff, models that flag students who might be slipping. The scaffolding went up quickly, under real pressure. Enrollment is contracting as the <a
              href="https://www.press.jhu.edu/books/title/11859/demographics-and-demand-higher-education"
              target="_blank"
              rel="noopener"
              className="text-accent hover:text-accent-2 no-underline border-b border-line-2 hover:border-accent pb-px"
            >
              demographic cliff
            </a> arrives. The public is questioning the return on a degree. Federal funding and tax conditions have tightened.{" "}
          <a
            href="https://www.deloitte.com/us/en/insights/industry/articles-on-higher-education/2026-higher-education-trends.html"
            target="_blank"
            rel="noopener"
            className="text-accent hover:text-accent-2 no-underline border-b border-line-2 hover:border-accent pb-px"
          >
            Deloitte&rsquo;s 2026 higher education outlook
          </a>{" "}
          describes a sector moving from a long period of growth into one of disciplined focus on core priorities, with the business model itself under scrutiny and risk management demanding tighter coordination across offices that once operated apart. AI arrived in the middle of all of it, as both another pressure and a promised relief.
        </p>
          <p>
          The role of the technology executive has shifted with it. In{" "}
          <a
            href="https://www.deloitte.com/us/en/programs/chief-information-officer/articles/global-technology-leadership-study.html"
            target="_blank"
            rel="noopener"
            className="text-accent hover:text-accent-2 no-underline border-b border-line-2 hover:border-accent pb-px"
          >
            Deloitte&rsquo;s 2026 Global Technology Leadership Study
          </a>
          , the large majority of CIOs described their primary job as implementing AI across the institution or serving as evangelists for it, moving, in the report&rsquo;s phrase, from keeping the lights on to lighting the way forward. That shift is real and, on balance, healthy. But there is a cost. When the mandate becomes adoption, we assume evaluation instead of performing it.
        </p>
        </Brief>

        <H2>The question that gets skipped</H2>
        <P>
          There is a gap I keep noticing. Universities have become fluent in two questions about AI: should we use it, and what are the rules for using it. Those are the questions a policy answers and a committee debates, and they are necessary. But they are not the question that determines whether a given AI system is doing its job. That question is narrower and harder: does this specific system do what we claim it does?
        </P>
        <P>
          It is an easy question to skip. A tool gets adopted because it is
          plausible, because a vendor demonstrated it well, because a respected
          peer institution uses it, because a pilot felt successful. None of
          those is evidence that the system measures or predicts what it
          purports to. Adoption and policy have outrun evaluation. We have
          built the scaffolding for governing AI and left out the evaluation
          layer.
        </P>

        <H2>What seven years of scoring engines taught me</H2>
        <P>
          I spent seven years at the Educational Testing Service evaluating AI-driven scoring systems — the engines that score essays and spoken responses on large-scale assessments. That work is where I first noticed this pattern.
        </P>
        <P>
          When you build an automated scoring model, the obvious way to judge it is agreement: how often does the machine&rsquo;s score match a trained human rater&rsquo;s score? It is a clean number, and it is reassuring. It is also not sufficient. A model can agree with human raters at a high rate and still be measuring the wrong thing. It can learn that longer essays tend to score higher, and quietly reward length. It can lean on vocabulary, sentence count, surface fluency: features that correlate with quality without being quality. The scores look right. The agreement statistics look right. And the system is measuring something other than what its label claims.
        </P>
        <P>
          The discipline of measurement science exists, in large part, to catch exactly that. The question it trains you to ask is the one I have used in every kind of data work since: what is this system actually measuring, and does that match what we say it measures? Not whether the output looks plausible, but whether the thing being measured is the thing we intended. An automated scoring engine that earns its agreement by rewarding length is not a writing-quality measure. It is a length measure with a writing-quality label. The difference looks small in aggregate. It is decisive for{" "}
          <ArtifactLink slug="fair-for-whom">
            the writers the correlation doesn&rsquo;t hold for
          </ArtifactLink>
          .
        </P>

        <Figure
          src="/library/figures/what_is_this_system_measuring_validity_gap_figure.svg"
          alt="Two paths feeding one shared score. The claimed path starts from the construct the system says it measures; the actual path starts from the proxy it learned to track instead. Both produce the same score and trigger the same decision, where agreement, accuracy and fairness checks all run and none of them can see the split. The paths separate again at the far end into two different consequences, with the gap between them labelled the validity gap."
          caption="A system can perform beautifully against the proxy and still be wrong for the decision it was deployed to inform. The divergence is invisible in the middle. It shows up only at the two ends: what is being measured, and who absorbs the difference."
        />

        <H2>The harder question</H2>
        <P>
          The methodological alternative is older than machine learning, and it
          is what measurement science was built on. A test like the{" "}
          <a
            href="https://www.ets.org/gre/test-takers/general-test/prepare/content/analytical-writing.html"
            target="_blank"
            rel="noopener"
            className="text-accent hover:text-accent-2 no-underline border-b border-line-2 hover:border-accent pb-px"
          >
            GRE Analytical Writing measure
          </a>{" "}
          is not, at its core, asking whether an AI can match a human rater on
          a 30-minute timed essay. The test asks students to produce a single
          timed analytical essay — the Issue task — and is making a claim
          about the relationship between performance on that timed task and
          performance on something quite different in shape: the longer,
          drafted-and-revised writing students produce over weeks in a
          first-year graduate course. Two different formats. Different rubrics.
          Different human evaluators. Two ways of capturing the same underlying
          writing construct, with the test asserting a relationship between
          them.
        </P>
        <P>
          Validating an AI scoring engine against that relationship is a
          different question than validating it against immediate rater
          agreement on the timed essay itself. The relationship question is
          whether the AI’s score on the timed essay predicts instructor
          evaluations of the student’s actual coursework writing. Both
          questions involve human judgment. The difference is where it sits:
          at the immediate output, where the human is the rater the AI is
          trained to match, or at the downstream construct expression, where
          the human is the instructor evaluating what the test was built to
          predict. The first is{" "}
          <ArtifactLink slug="reliability-vs-validity">reliability</ArtifactLink>
          , often pursued because it is faster and cheaper. The second is{" "}
          <ArtifactLink slug="validity-ladder">validity</ArtifactLink>, and it
          is what the test claims to do in the first place. The AI-scoring
          conversation has mostly been running on the easier question.
        </P>
        <P>
          There is a second reason it has stayed there, and it is honest to
          name. The harder validity work was historically expensive. It
          required gathering downstream outcomes, running instructor
          evaluations of subsequent coursework, tracking students
          longitudinally. Reliability-against-human-raters was what could be
          done at scale. The cost economics favored the easier question. That
          economics has changed. The same AI capability that made faster
          scoring possible, the cheap compute and cheap storage and cheap data
          integration of the last decade, has also lowered the cost of running
          the harder question. The validity work that was once prohibitively
          expensive is newly affordable. The methodology was built for an older
          cost structure. The cost structure has moved. The methodology
          hasn’t.
        </P>
        <P>
          This is not an argument against keeping humans in the loop. It is an
          argument against confusing two different roles humans play in that
          loop. Humans as decision-makers are the people who act on a score,
          who decide what an early-alert flag means in a specific student’s
          life, who weigh the AI’s output against the rest of what they know.
          They should stay, and should stay clearly in charge. Humans as the
          immediate-output validation target, the rater the AI is trained to
          match, is the harder question. That rater is always a proxy for the
          construct, not the construct itself. Validating against the
          downstream criterion still involves human judgment, but a human
          judgment anchored at what the test is built to predict, not at the
          score itself. Keep humans deciding. Anchor the validation at the
          prediction target (the coursework) not at the score.
        </P>

        <H2>Every system makes a claim</H2>
        <P>
          Every AI system a university adopts makes a claim like that label, and most of the claims are never written down. An early-alert model claims to identify students at academic risk. An advising assistant claims to surface the guidance a student needs. An admissions-support tool claims to predict yield, or fit, or success. A staff-facing assistant claims to produce work accurate enough to act on. Each is a statement about an intended outcome. And each can be wrong the way an automated scoring engine can be wrong — tracking a surface signal, missing the substance, because the claim was implicit and no one was assigned to check it.
        </P>
        <P>
          The early-alert model is the cleanest example. Built without care, it can learn that the strongest predictor of risk in the historical record is a demographic pattern, or a single missed assignment, or enrollment in one difficult course. It will flag students, and the flags will even be partly accurate. But a model that flags students by proxy measures the proxy, not the risk — and sends the institution&rsquo;s attention and resources there instead. No one set out to build that system. It is what results when a tool is adopted on plausibility and never asked the intended-outcome question.
        </P>
        <P>
          Generative and agentic tools make the problem harder, not easier. A
          predictive model at least produces a score that can be tested against
          an outcome. A generative assistant produces fluent, confident prose
          whose quality is difficult to assess at a glance, and fluency is
          itself a proxy the human eye is inclined to reward.{" "}
          <a
            href="https://www.deloitte.com/us/en/insights/topics/emerging-technologies/ai-agents-scaling-faster.html"
            target="_blank"
            rel="noopener"
            className="text-accent hover:text-accent-2 no-underline border-b border-line-2 hover:border-accent pb-px"
          >
            The 2026 enterprise-AI research
          </a>{" "}
          is consistent on this point: only a small share of organizations
          report a mature model for governing autonomous AI agents, and the real constraints on scaling AI are rarely the
          technology itself. They are data quality, security, and the absence
          of evaluation discipline. The newer the system, the more easily
          plausibility substitutes for proof.
        </P>

        <H2>The discipline already exists</H2>
        <P>
          This is the missing discipline inside AI governance.{" "}
          <a
            href="https://www.educause.edu/research-and-publications/research/top-10-it-issues-technologies-and-trends/2026"
            target="_blank"
            rel="noopener"
            className="text-accent hover:text-accent-2 no-underline border-b border-line-2 hover:border-accent pb-px"
          >
            EDUCAUSE&rsquo;s 2026 priorities
          </a>{" "}
          name the human edge of AI, and data analytics for institutional decision-making, among the issues that matter most. University technology leaders have been clear that the next phase of AI work is operational, moving from written policy to running practice. Evaluation is the easiest part of that practice to skip, because it is invisible when it is working and expensive to do well. It also decides whether everything else is real.
        </P>
        <P>
          Applying the discipline does not mean slowing adoption, and it does not mean another layer of bureaucracy. It means a small set of hard questions, asked consistently: before a system is trusted, and periodically after. Is the system measuring the intended construct, or a proxy for it? When it is wrong, what happens downstream, and to whom? Does it perform consistently across the different groups of people it touches, or does its accuracy concentrate where the training data was richest? What human decision is the system meant to support, and does its output improve that decision? None of these questions is exotic. They are the ordinary questions of measurement. A university that has an institutional research office and an assessment culture already employs people who know how to ask them. No one has pointed them at the AI systems moving into administrative use yet.
        </P>

        <H2>Seeing the student whole</H2>
        <P>
          There is a deeper version of the intended-outcome question, and in a university it is the one that matters most. When we ask what a system is actually measuring, we are often really asking whether it sees a person whole. An early-alert model that optimizes a retention number reduces the student to the outcome the institution wants to protect. A model built to help the institution understand and support a student treats the number as a signal that points back toward a person, one with a context, a trajectory, and reasons. Asked seriously, the intended-outcome question is a check against measuring students as proxies for the metrics we happen to collect. A university, of all institutions, should want its systems to see students whole. That is an evaluation standard, not a sentiment — it is answerable, and it is the standard worth holding AI to.
        </P>
        <P>
          One clarification, because the easiest misread of this argument is
          that it’s anti-proxy. It is not. Institutional modeling at scale
          has to use proxies; that is how the work runs. The discipline being
          asked for is not the abandonment of proxies but the validity work
          underneath them — knowing which construct each proxy stands in for,
          which part of the construct it actually captures, and where the
          proxy quietly substitutes itself for the construct it was supposed
          to serve. Pro-proxy, with the validity work done out loud. That is
          the standard.
        </P>

        <H2>An old discipline, a new set of systems</H2>
        <P>
          The institutions that handle this moment well will not be the ones
          with the most AI, or the fastest adoption, or the longest policy.
          They will be the ones that can tell the difference between AI that
          works and AI that only looks like it works, and tell it on purpose,
          through a discipline, rather than discovering it after a system has
          been shaping decisions, unnoticed, for two years.
        </P>
        <P>
          That discipline does not need to be invented. Higher education has spent decades building the science of measuring hard things well and holding the measurements accountable to what they claim. It has a name, validity, and two statements worth reading before anyone rebuilds it. <a href="https://doi.org/10.1037/0033-2909.112.3.527" target="_blank" rel="noopener" className="text-accent hover:text-accent-2 no-underline border-b border-line-2 hover:border-accent pb-px">Kane (1992)</a> treats validation as an argument: a chain of inferences examined link by link, with the evidence aimed at whichever link is weakest rather than spread evenly across all of them. <a href="https://psycnet.apa.org/doi/10.1037/0003-066X.50.9.741" target="_blank" rel="noopener" className="text-accent hover:text-accent-2 no-underline border-b border-line-2 hover:border-accent pb-px">Messick (1995)</a> locates validity in the interpretation and use of a score rather than in the score itself, consequences included. That second point is why two of the questions above, the one about what happens downstream and to whom and the one about which human decision the system is meant to improve, are not additions to the measurement question. They are the measurement question. The same rigor that asks whether an essay score reflects writing or length can ask whether an early-alert flag reflects risk or a proxy for it. It is the same question. Higher education&rsquo;s AI moment does not need a new framework so much as it needs to turn an old and well-tested one toward a new set of systems, and to ask, of every system it adopts, the plain and demanding question: what is this actually measuring, and is that what we meant?
        </P>

        {/* DOWNLOAD BUNDLE — three operating documents that turn this essay's
            argument into a leadership-meeting move. Free, no gate. Soft attribution
            line invites response without barricading the read. */}
        <div className="my-14 border-t border-b border-line py-10">
          <div className="font-mono text-[11px] text-accent tracking-[0.18em] uppercase mb-4">
            Operating kit
          </div>
          <h3 className="text-ink font-bold tracking-[-0.015em] text-[20px] sm:text-[22px] leading-[1.3] mb-3">
            The AI Evaluation Kit
          </h3>
          <p className="text-ink-2 text-[15px] sm:text-[16px] leading-[1.65] mb-7 max-w-[62ch]">
            Three documents that turn the argument above into a leadership-meeting
            move. The full kit names twelve evaluation questions across signals,
            intelligence, and execution. The one-page diagnostic is the scorecard
            a leadership team can run through in a single meeting. The 90-day cadence
            is the wrapper that turns the diagnostic into a quarterly operating
            practice. Free, no gate.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-x-6 gap-y-4">
            <div>
              <div className="text-ink font-semibold text-[14.5px] mb-2">
                The Kit
              </div>
              <div className="text-ink-3 text-[12.5px] leading-[1.5] mb-3">
                Twelve questions across the three pillars. The main asset.
              </div>
              <div className="flex gap-3 text-[13px] font-mono">
                <a href="/downloads/AB_AI_Evaluation_Kit.pdf" className="text-accent hover:text-accent-2 no-underline border-b border-line-2 hover:border-accent pb-px">PDF</a>
                <a href="/downloads/AB_AI_Evaluation_Kit.docx" className="text-accent hover:text-accent-2 no-underline border-b border-line-2 hover:border-accent pb-px">DOCX</a>
              </div>
            </div>
            <div>
              <div className="text-ink font-semibold text-[14.5px] mb-2">
                The Diagnostic
              </div>
              <div className="text-ink-3 text-[12.5px] leading-[1.5] mb-3">
                One page. Twelve questions as a leadership-meeting scorecard.
              </div>
              <div className="flex gap-3 text-[13px] font-mono">
                <a href="/downloads/AB_AI_Evaluation_Diagnostic.pdf" className="text-accent hover:text-accent-2 no-underline border-b border-line-2 hover:border-accent pb-px">PDF</a>
                <a href="/downloads/AB_AI_Evaluation_Diagnostic.docx" className="text-accent hover:text-accent-2 no-underline border-b border-line-2 hover:border-accent pb-px">DOCX</a>
              </div>
            </div>
            <div>
              <div className="text-ink font-semibold text-[14.5px] mb-2">
                The 90-Day Cadence
              </div>
              <div className="text-ink-3 text-[12.5px] leading-[1.5] mb-3">
                Implementation wrapper. Turns the diagnostic into operating practice.
              </div>
              <div className="flex gap-3 text-[13px] font-mono">
                <a href="/downloads/AB_AI_Evaluation_90Day_Cadence.pdf" className="text-accent hover:text-accent-2 no-underline border-b border-line-2 hover:border-accent pb-px">PDF</a>
                <a href="/downloads/AB_AI_Evaluation_90Day_Cadence.docx" className="text-accent hover:text-accent-2 no-underline border-b border-line-2 hover:border-accent pb-px">DOCX</a>
              </div>
            </div>
          </div>
          <p className="text-ink-3 text-[13px] sm:text-[13.5px] italic leading-[1.55] mt-8 max-w-[62ch]">
            If this changes how you evaluate AI in your context, I’d love to hear
            about it —{" "}
            <a
              href="mailto:hello@analyticbytes.systems"
              className="text-ink-2 not-italic font-medium border-b border-line-2 hover:border-accent transition-colors no-underline pb-px"
            >
              hello@analyticbytes.systems
            </a>
            .
          </p>
        </div>

                <SeeAlso>
          <SeeAlsoItem
            slug="grounding-the-ai-layer"
            title="Grounding the AI Layer"
            gloss="What grounding means before any measurement question gets asked."
          />
          <SeeAlsoItem
            slug="burden-disparity-and-the-next-dollar"
            title="Burden, Disparity, and the Next Dollar"
            gloss="Measurement discipline applied to a real dataset — defining the construct, filtering for reliability, naming what the data cannot do."
          />
          <SeeAlsoItem
            slug="numbers-dont-agree"
            title="The numbers don’t agree because the words don’t"
            gloss="The cousin question one layer down: when the words underneath a number were never settled to begin with."
          />
        </SeeAlso>

        <MetaNote>
          Written May 2026 for the Analytic Bytes Library. The argument draws
          on measurement-science practice and is intended to outlast specific
          AI products and platforms. The downloadable operating kit (above) is
          the Q3 2026 v3 release, refreshed for procurement-grade vendor
          stress-testing and tighter operator voice.
        </MetaNote>
      </>
    ),
  },

  // ===================================================================
  // FIELD NOTE 04 — The Take-Home Test
  // ===================================================================
  {
    kind: "field-note",
    slug: "the-take-home-test",
    number: "04",
    title: "The Take-Home Test",
    subtitle:
      "More than a dozen interview take-home tasks, done cold for a dozen organizations, read as one long experiment in how teams relate to their own decisions.",
    date: "2026-06-03",
    readingTime: "8 min read",
    summary:
      "More than a dozen interview take-home tasks, done cold across a decade, read as one experiment. The same few failures showed up in almost every one — and none of them was a skills gap.",
    cover: "/library/covers/the-take-home-test.svg",
    arc: "data-foundations",
    hidden: false,
    body: (
      <>
        <Brief>
          <p>
          The interview take-home is a strange little genre. A stranger hands you their messiest data situation, gives you somewhere between two hours and five days, and asks you to diagnose it and design something. Cold — no colleagues, no institutional memory, a clock running. Most people do one or two over a career and never think about them again. Over the past decade I did more than a dozen, for organizations across K-12 charter networks, national education nonprofits, youth mental health, and assessment. Read one at a time, they were job interviews. Read as a set, they are something more useful: the same diagnostic, run on a dozen organizations, by the same person, under the same constraints. A natural experiment, and it has a result. A small number of failures showed up in almost every one. This piece is what the set revealed. It is written for any leader who has opened a data role, approved a dashboard, and wondered why the decisions never got sharper.
        </p>
          <p>
            Over the past decade I did more than a dozen, for organizations
            across K-12 charter networks, national education nonprofits, youth
            mental health, and assessment. Read one at a time, they were job
            interviews. Read as a set, they are something more useful: the same
            diagnostic, run on a dozen organizations, by the same person, under
            the same constraints. A natural experiment, and it has a result. A
            small number of failures showed up in almost every one. This piece
            is what the set revealed. It is written for any leader who has
            opened a data role, approved a dashboard, and wondered why the
            decisions never got sharper.
          </p>
        </Brief>

        <P>
          A take-home is short, and the pressure keeps the organization
          honest. The clock is short, so the organization cannot dress
          the problem up. It hands you the thing it wants help with.
          And what an organization reaches for when it wants help tells
          you, with some precision, how it understands its own data.
          Do enough of them and the individual scenarios blur, but the
          shape underneath stops being noise. The same handful of
          things are wrong, and wrong in the same order.
        </P>
        <P>
          First, plainly: none of these organizations was bad at data.
          Sit with that for a moment. Most had real systems, real
          analysts, real dashboards. They were good at data and still
          stuck. That is the point, and the rest of this piece is why.
        </P>

        <H2>The brief that names everything but the decision</H2>
        <P>
          Here is a take-home, lightly abstracted. A principal writes: the
          seniors just took their college-entrance exam, I am presenting at
          professional development this afternoon, I need this back in an hour.
          Then a list. Averages by subject, the share above a threshold score,
          which homeroom did best, how one student group performed against two
          others, whether GPA tracks the score, how the teachers compare. And
          the last line: anything else you find interesting.
        </P>
        <P>
          It is a completely reasonable request. Read closely, it is also a request for outputs, not a decision. Six questions, a slide deck, an hour, and nothing about what gets <I>done</I> differently once the slides go up. “Anything else you find interesting” gives it away. If a decision were driving the request, “interesting” would already be defined — interesting <I>toward what.</I> Its absence means the analysis is the point, not a decision it feeds.
        </P>
        <P>
          Nearly every take-home had this shape. Build the dashboard, write the trends report, produce the plan. A surprising share did not ask for analysis-toward-a-decision at all. They asked for <I>compliance:</I> get the new state attendance codes computing correctly, get the course-collection feed accurate and auditable — necessary work, but compliance is the purest form of the pattern, an output the organization must produce with no decision attached to it at all. When most of what a data function is handed is outputs and filings, it becomes a service desk — and a service desk never gets to the decision, however fast it moves.
        </P>

        <H2>The two-line change that touches seven systems</H2>
        <P>
          One task asked, in effect: your state just introduced two new
          attendance codes. What would you change?
        </P>
        <P>
          The honest answer was uncomfortably long. To make two codes compute
          correctly you would touch a database view, a stored procedure, the
          student information system’s configuration, the outbound fields in the
          state report, the data-validation checks, the way front-office staff
          enter attendance each morning, and the historical records already on
          file. Two codes. Seven systems.
        </P>
        <P>
          That task is not hard because attendance is conceptually difficult. It is hard because the concept “attendance” is <I>defined in seven places,</I> with no single place to change it. This is the common problem across half the take-homes: the organization has no canonical definition of its own core measures, so every measure exists in several slightly different versions, and any change, or any disagreement about a number, takes weeks to trace. An organization in that state is one decision away from fixed, not one tool — the decision that each measure means one thing, computed in one place.
        </P>

        <H2>A dashboard is not a decision surface</H2>
        <P>
          Almost every take-home asked for a dashboard or a report, and asked
          for it the same way: as an <I>artifact</I>. Build a monthly enrollment
          dashboard for the board. Produce a topline executive trends report.
          Submit a dashboard you have made. The deliverable is the thing —
          built, presented, monthly.
        </P>
        <P>
          Not once was a dashboard requested as <I>the surface a named person
          uses to make a specific recurring call</I>. The enrollment dashboard
          was never framed as “what the enrollment lead opens every Monday to
          decide where this week’s outreach goes.” It was framed as a
          board-reporting object.
        </P>
        <P>
          The difference is not cosmetic. An organization that asks for “a dashboard” and an organization that asks for “the Monday-morning surface the enrollment lead decides from” will get two different objects. The first is a display. The second is a decision surface, built backward from a decision, an owner, and a cadence. Only the second changes what happens on Monday. Most briefs ask for the first and hope for the second.
        </P>

        <Figure
          src="/library/figures/dashboard-vs-decision-surface.svg"
          alt="Two enrollment objects side by side. The left object is a generic dashboard with charts and an unspecified audience. The right object is a decision surface labeled with the owner, the recurring call, and the cadence."
          caption="Same enrollment data, rendered two ways. The left object is built for an audience; the owner and the call are unspecified. The right object is built backward from a recurring call — where this week’s outreach hours go — with the owner, the cadence, and the decision named on the surface itself."
        />

        <H2>The organization hires a person to be the system it never built</H2>
        <P>
          Several take-homes asked for leadership-grade systems thinking: a first-ninety-days plan, a risk-and-change-management plan for replacing core systems across several regions at once, a strategy for collecting and safeguarding sensitive personal data. Anticipate resistance, build buy-in.
        </P>
        <P>
          These are the right things to ask of a senior hire. But the
          implication is quiet and worth catching. The organization knows it has
          a systems gap, and its plan for closing it is to hire a person who
          will carry the system in their head: hold the definitions, broker the
          cross-functional agreements, remember the edge cases, watch the
          corners.
        </P>
        <P>
          A person takes vacation, gets pulled into a
          crisis, and eventually leaves. When they go, the systems thinking
          goes with them. The take-home that asks for a brilliant
          ninety-day plan is, underneath, an organization hoping a hire will
          substitute for an architecture. The best version of that hire spends
          the ninety days building the architecture instead, so the organization
          stops depending on any one person’s memory, including their own.
        </P>

        <H2>One dataset, four audiences, no infrastructure</H2>
        <P>
          The last pattern was the most repetitive, and the most expensive.
          Present this to leadership and to teachers. Adapt this report for
          school leaders, for staff, for families. Prepare talking points for
          two executives walking into two different meetings.
        </P>
        <P>
          Every organization needs the same underlying numbers spoken in three
          or four registers: board, operator, frontline, external partner. None
          had a system that did the translation. So every cycle someone
          re-renders the same data by hand into each new voice, and that manual
          work competes for the same scarce hours as the analysis itself. The
          result is a data function permanently busy and permanently behind, not
          because the analysis is hard, but because the <I>distribution</I> of
          it was never built as a system.
        </P>

        <H2>What the set adds up to</H2>
        <P>
          Read together, more than a dozen take-homes point at one thing, and it is not a skills gap. These organizations had analysts, tools, and dashboards. They did not have the connective tissue between analysis and decision: a canonical definition of each measure, a surface built backward from a specific recurring call, a distribution system that speaks to every audience without redoing the work, and an architecture that keeps working after the person who built it leaves.
        </P>
        <P>
          That layer has a name. It is the decision system. And the take-home is an honest instrument because it catches an organization reaching for more analysis, under real pressure and in good faith, when the thing missing is the system that connects analysis to a decision.
        </P>

        <H2>The reframe</H2>
        <P>
          A decade of take-homes taught me one habit, and it is the one I would hand to anyone who commissions this kind of work. When an organization gives you a data problem, the first job is not to answer it. It is to find the decision the brief did not name, and answer <I>that.</I> The slides the principal asked for take an hour. The question of which students get which support this term, who owns that call, and from what surface they make it — that is the work, and the brief never mentioned it.
        </P>
        <P>
          Do that a dozen times and your eye changes. You stop seeing data problems. You start seeing decision systems with one part missing, and more often than not you can name the missing part before lunch. Most organizations do not have a data problem. They have a decision-system problem, and a take-home is a short, honest way to surface one. <I>From fragmented to decision-ready</I> is the distance between the brief they wrote and the brief they meant.
        </P>

        <SeeAlso>
          <SeeAlsoItem
            slug="three-surfaces-one-keystone"
            title="Three Surfaces, One Keystone"
            gloss="The surface the take-home asks for vs. the surface that would actually serve a decision."
          />
          <SeeAlsoItem
            slug="where-should-data-sit"
            title="Where Should Data Sit?"
            gloss="The placement question that the take-home brief rarely names."
          />
          <SeeAlsoItem
            slug="blown-assignment"
            title="It’s a blown assignment"
            gloss="What gets called a data problem on the surface and turns out not to be."
          />
        </SeeAlso>

        <MetaNote>
          Written May 2026 for the Analytic Bytes Library. Drawn from interview
          performance tasks completed between 2017 and 2026; organizations and
          task specifics are abstracted throughout, and no individual
          organization’s task, scenario detail, or data is reproduced.
        </MetaNote>
      </>
    ),
  },
  {
    kind: "essay",
    slug: "numbers-dont-agree",
    number: "06",
    title: "The numbers don’t agree because the words don’t.",
    subtitle:
      "Why information and analytics governance lives or dies on shared definitions.",
    date: "2026-06-09",
    readingTime: "7 min read",
    summary:
      "Two people read different student-persistence numbers from the same data. The governance council is functioning. The framework looks complete. What's broken is definitional, and the work to fix it is the work most councils skip.",
    cover: "/library/covers/numbers-dont-agree.svg",
    arc: "integration-governance",
    hidden: false,
    body: (
      <>
        <Brief>
          <p>
            Two people in the same meeting cite a different
            student-persistence number. Both are reading from a real report,
            prepared by competent people, drawn from the institution’s real
            data. A third person at the table has a third number. The
            institution has a data governance council. It has a published
            data policy. It has named stewards. None of that stops the
            meeting from getting stuck.
          </p>
          <p>
            Most “data problems” are not data problems. They are
            definitional disagreements misread as technical ones.
            “Student persistence” (the rate at which enrolled students
            continue from one period to the next) can mean keeping a
            student from the first day of the school year to the last day.
            It can mean keeping them from one annual official census date
            to the next census date a year later, which is how state
            accountability typically counts. It can mean keeping them from
            the first day of school to that same year’s census date, which
            is a different and shorter window. Each of those is a valid and
            useful definition. Each is what some real obligation requires.
            They do not agree with one another, and the institution cannot
            act on data it cannot agree on.
          </p>
        </Brief>

        <H2>The framework is necessary but insufficient</H2>

        <P>
          Governance councils default to architecture, and they have well-developed frames to draw on.{" "}
          <a
            href="https://dama.org/learning-resources/dama-data-management-body-of-knowledge-dmbok/"
            target="_blank"
            rel="noopener"
            className="text-accent hover:text-accent-2 no-underline border-b border-line-2 hover:border-accent pb-px"
          >
            DAMA&rsquo;s Data Management Body of Knowledge
          </a>{" "}
          organizes the field into eleven knowledge areas with governance at the center: architecture, modeling, integration, quality, metadata, master and reference data, and the rest.{" "}
          <a
            href="https://www.educause.edu/showcase-series/2025/the-data-empowered-institution"
            target="_blank"
            rel="noopener"
            className="text-accent hover:text-accent-2 no-underline border-b border-line-2 hover:border-accent pb-px"
          >
            EDUCAUSE&rsquo;s data-empowered-institution model
          </a>{" "}
          distills the higher-education version to five components — data quality, integration, governance, management, and literacy. Both frames are correct about what to build. Both are necessary. Both are also insufficient. The operational work that makes governance stick — getting the registrar, financial aid, institutional research, and the deans into the same room to decide which version of “persistence” gets used where, and why each version exists — is slow, unglamorous, and often unwritten. Most councils never do it. The framework looks complete. The numbers still do not agree.
        </P>

        <H2>Three definitions, one number, eight recalculations</H2>

        <P>
          At a K–8 charter network operating across multiple campuses, student persistence was formally defined at least three different ways at the same time. From day one of the school year to the last day, for program-completion reporting. From one annual state census day to the next year&rsquo;s census day, for state accountability. From the first day of school to that same year&rsquo;s census date, for early-year persistence reporting. Those translations fed into still more obligations (S&P bond-rating reporting, principal incentive calculations, enrollment forecasting, federal accountability), each of which required a particular version. You cannot discard any of them; each one exists because a real obligation requires exactly that version. In one year alone, the same persistence number was independently recalculated eight or more times across the network&rsquo;s reports: every recalculation correct under its own definition, none of them agreeing with the others. And yet the institution still had to be able to talk about persistence without the conversation fragmenting into a definitional argument every time it came up.
        </P>

        <Figure
          src="/library/figures/numbers_dont_agree_one_metric_eight_uses_figure.svg"
          alt="One metric, eight recalculations: how a single word fragments across obligations"
          caption="One word. Eight obligations. Eight numbers &mdash; each correct under its own definition, none of them agreeing."
        />

        <P>
          The same gap now has a second cost, and it shows up as consumption rather than confusion. When an analyst recalculated persistence eight ways, the institution was spending labor it had already paid for in salary. When an agent does that work, each version it computes is a metered call against a model. Ask an agent for the persistence rate against ungoverned definitions and it has no basis to pick one; it can compute every plausible version, or recompute the same one on every request, because nothing in the data told it which definition the question meant. The stuck meeting was the human-scale symptom of missing definitional reconciliation. Metered recomputation is the machine-scale symptom of the same missing thing. A governed number that names which definition feeds which obligation ends the disagreement. It also keeps the agent from paying to generate versions no one asked for. The semantic layer was always a correctness control. Pointed at an agent that runs at machine cadence and bills per call, it becomes a consumption control too, and the spend, like the disagreement, comes back to whether the words were settled first.
        </P>

        <P>
          The work that closed the gap was not a framework. It was definitional reconciliation. The team mapped every reporting obligation to its required definition. Each definition was named explicitly. The relationships among them were established: how one translated to another, which report drew which number from where, what shared baseline assumptions each one relied on. Then a small set of trusted, governed numbers fed every obligation with the correct version, so that one set of dashboards could serve all of them without any of them being wrong. With that definitional reconciliation as the foundation, data completeness rose from 60 percent to 90 percent, principal dashboard adoption reached 70 percent, and reporting lag dropped by 40 percent. The framework looked the same after that work as it had before. The numbers themselves did not become identical; the framework still required several different ones, for several different obligations. What changed was that the words behind each number started meaning the same thing across the institution, and the disagreements stopped.
        </P>

        <H2>The same problem across time: crosswalks</H2>

        <P>
          The other shape of the same problem appears across time. Any
          organization that runs longitudinal measurement of latent
          constructs (a foundation tracking program outcomes, a
          youth-mental-health team tracking adherence and well-being, a
          behavioral-health agency tracking clinical change) runs into the
          same definitional friction. Survey versions get updated as the
          theory of change matures. The constructs being measured shift as
          the field learns what matters. Items are added, edited, retired.
          Data-quality standards tighten. Each of those changes is
          legitimate; none can be paused while the field catches up. And
          yet the institution still has to be able to look at three years
          of program data and say something true about it.
        </P>

        <P>
          What keeps that work coherent, in modern data-stack terms, is a
          semantic layer above the raw data tables: explicit canonical
          definitions for each construct, maintained as the underlying
          instruments evolve, with the discipline of crosswalks. The
          crosswalks document how a question asked in one survey version
          maps to the same construct asked slightly differently in the
          next, with documented limits of comparability and documented gaps
          where comparison is not warranted. In practice the semantic
          layer might be a separate analytics schema above raw
          tables, reachable from dashboards through whatever read interface
          fits the stack (PySpark or otherwise). The field-mapping
          work of bringing parallel collection platforms together — for
          example two survey-collection environments feeding the
          same warehouse — is itself a definitional discipline before it is
          an engineering one. The framework is not the answer. The
          semantic layer, the crosswalks, and the discipline of owning
          every definitional change are what hold the reporting foundation
          honest as the underlying questions keep evolving.
        </P>

        <H2>The same problem across systems: rostering</H2>

        <P>
          Different systems hold overlapping versions of the same field, and the drift compounds under load. In one K-8 network, enrollment moved through four holders between June and August: the SIS held one version of who was enrolled, the applicant-tracking system held another (still processing applications that had been accepted but not yet rolled forward), the operations office kept a spreadsheet the ops team used for building assignments and family communications, and the enrollment team kept its own spreadsheet, the one they used to track summer targets and plan late-summer marketing efforts. All four were correct against their own local definition of “enrolled.” None of the four agreed on the first day of school. The reconciliation ran through August and rarely caught up before the first day of school. The definitional gap was not that anyone was wrong; “enrolled” was doing four different jobs across four systems, and no one had written the mapping down.
        </P>

        <H2>Granularity is its own governance problem</H2>

        <P>
          Granularity is its own governance problem, and aggregation is where many institutions quietly compromise it. At the same K–8 network, daily attendance was a single data stream with at least three different operational lives. A single absence on a given day triggered an immediate workflow (outreach, follow-up, resolution), owned by an operations coordinator. Three consecutive days of absence triggered a different workflow, owned by a teacher or student-support counselor. Chronic absenteeism (eighteen or more days in a year, or more than ten percent of school days as a running rate) triggered a third workflow, owned by the principal. The same data, three aggregations, three views, three sets of decision rights, three stakeholders. Governance at the granularity layer was not deciding whether to compute these numbers. It was deciding which view triggered which workflow, who owned each decision, and what the legitimate translation among them was, knowing that you cannot break a chronic-absenteeism rate back into daily counts without losing what it measured.
        </P>

        <H2>Architecture is governance</H2>

        <P>
          Architecture is governance too. When a student-information system is replaced, or a behavioral-health electronic record is migrated to a new platform, the definitional question is not the migration. It is whether what the new system records is the same thing the old one recorded. You have to make field mappings explicit, add new fields where the schema changed, retire legacy fields only after every use case is covered, and train data-entry personnel on the new system&rsquo;s expectations for completeness, accuracy, and timeliness. None of that is technical work — it is definitional work at the architectural layer, the layer{" "}
          <InternalLink slug="the-contracts-between-systems">
            the contract between systems
          </InternalLink>{" "}
          has to govern.
        </P>

        <H2>Stewardship is what makes it stick</H2>

        <P>
          Quality is a continuous practice owned by the people closest to the data. The principal dashboard adoption rate of 70 percent at the K–8 network was not just a usage statistic. It was evidence of distributed stewardship. The principals did more than consume their numbers. They noticed anomalies, raised corrections, pushed back on definitions that did not serve their schools, and held the institution to its own standards. A central data office that owns quality alone is fragile. A network of stewards who own their own data, with shared definitions they help refresh, is durable. This is the model that survives leadership turnover, budget cycles, and reorganization.
        </P>

        <P>
          Stewardship of that kind requires operational discipline at the configuration and training layer, because the biggest risk in any compliance or reporting process is rarely one dramatic mistake. Most of the time it is drift. If a gradebook is configured one way at one school and a different way at another, GPA calculations diverge before any dashboard sees them. The same instance has to be replicated across sites (same scales, same formulae, same business rules) with a checking cadence and alerts in place to catch unintended drift or misconfiguration before errors propagate. Definitional work also has to reach the personnel who actually enter the data. Whether an in-house suspension is coded as “present” or “absent” in the student-information system is a definitional decision data-entry personnel make every day. If they have not been trained on which version the institution is using, no framework above them can compensate. Quality is held together one configuration, one alert, and one training conversation at a time.
        </P>

        <H2>Why universities need this most</H2>

        <P>
          Universities are structurally decentralized in ways most organizations are not. School autonomy, faculty governance, and distributed authority are how the institution is designed to work. Governance imposed from the center has a poor track record in higher education because the autonomy is rightly defended. Governance embedded through definitions has a much better one. A definition agreed across the registrar, financial aid, institutional research, and the relevant deans is much harder to walk back, because each domain steward owns it. A policy written by the governance council, however thorough, can be politely ignored by a department running its own numbers. The framework&rsquo;s real authority is the working set of shared definitions that domain leaders maintain together — not the document itself.
        </P>

        <H2>What working governance actually looks like</H2>

        <P>
          When a dean and the registrar can agree on what a number
          means — and can recover, on demand, why three other versions of
          the same number exist, where each one is used, how this year’s
          definition relates to last year’s, and how the system that
          produces it connects to the systems that consume it, governance
          is working. When the policy document is elegant and the numbers
          still do not agree, it is not. The work to do is not a better
          framework. It is the slow, distributed work that lives inside
          the framework: definitional reconciliation, crosswalks,
          aggregation governance, architectural mapping, and stewardship.
          That work turns fragmented words about the institution into
          decision-ready meaning. It is the work most governance councils
          skip, and the work the institution’s hardest questions cannot be
          answered until someone does.
        </P>

                <SeeAlso>
          <SeeAlsoItem
            slug="the-contracts-between-systems"
            title="The contracts between systems"
            gloss="The integration governance that sits on top of definitional reconciliation."
          />
          <SeeAlsoItem
            slug="where-should-data-sit"
            title="Where Should Data Sit?"
            gloss="The seat that has the standing to make a shared definition stick."
          />
          <SeeAlsoItem
            slug="what-is-this-system-measuring"
            title="What is this system actually measuring?"
            gloss="The construct-validity cousin — what the AI claims to measure vs. what it is actually measuring."
          />
        </SeeAlso>

        <MetaNote>
          Written June 2026 for the Analytic Bytes Library by Chaitanya
          Ramineni. Cases described are drawn from the author’s practice
          across a K–8 charter network and longitudinal-measurement
          settings; organizational details are abstracted and no
          individual record, person, or proprietary number is reproduced.
          The performance figures cited from the K–8 case — data
          completeness, principal dashboard adoption, reporting lag — come
          from the author’s working records and internal reports compiled
          during the engagement; the figures appear consistent with their
          documented use in the author’s case-studies record.
        </MetaNote>
      </>
    ),
  },
  {
    kind: "essay",
    slug: "the-contracts-between-systems",
    number: "07",
    title: "The contracts between systems",
    subtitle:
      "Why integration governance, not engineering, decides whether anyone can act on what the institution knows.",
    date: "2026-06-16",
    readingTime: "13 min read",
    summary:
      "Integration is two questions stacked on top of each other: do the bytes move, and when they arrive, can anyone act on them. Institutions have answered the first across three eras and skipped the second, and the agentic era is about to make that gap load-bearing.",
    cover: "/library/covers/the-contracts-between-systems.svg",
    arc: "integration-governance",
    hidden: false,
    body: (
      <>
        <Brief>
          <p>
          Universities, school networks, foundations, and behavioral-health agencies have been buying integration for a long time. Warehouses get built. Pipes get connected. Connectors ship. The bytes move from the system that wrote them to the system that reads them. And then, very often, the leader looking for institutional intelligence — a 360 view for the CEO, role-specific intelligence for a program officer or a principal or a clinician or a dean, a number a District Education Officer can act on this week — discovers that the integration ran and the institution still cannot make the decision.
        </p>
          <p>
          That is the gap I want to focus on. Integration is two questions stacked on top of each other, and institutions have been treating them as one. The first is engineering: do the bytes move from where they were written to where they will be read, in the right shape, on a defensible cadence, without breaking? The second is governance: when the bytes arrive, can anyone act on them? Who is allowed to read them, who is allowed to write them, on what cadence, under what consent envelope, with what authority, with what reversibility, with what audit trail if they are wrong? The first question has good answers in every era&rsquo;s stack. The second has not been answered in almost any institution I have worked with, in any era.
        </p>
          <p>
          Those second-question elements together are what I will call the governance contract: the explicit, named understanding that turns integrated bytes into something a stakeholder can act on with authority — an operational agreement the institution writes for itself and enforces internally, not a legal document. This essay is about that contract, and about what it has looked like across three eras of integration: legacy, modern, and the agentic era now arriving. The engineering changes. The contract has to change with it. The governance gap, in most institutions, does not. I have named this same gap, in a field note, a <a href="/library/blown-assignment" target="_blank" rel="noopener" className="text-accent hover:text-accent-2 no-underline border-b border-line-2 hover:border-accent pb-px"><InternalLink slug="blown-assignment">blown assignment</InternalLink></a>: the dashboard runs and nobody wrote the contract that says who acts on the number, with what authority, on what cadence.
        </p>
        </Brief>

        <Figure
          src="/library/figures/contracts_between_systems_three_eras_figure.svg"
          alt="Contracts between systems: the gap between bytes-move and can-act across three eras"
          caption="The bytes move in every era. The question of whether anyone can act on them is what the contract answers &mdash; and the agentic era is what makes writing it non-optional."
        />

        <H2>Legacy era: contracts in someone’s head</H2>

        <P>
          A network of seven public schools operating under one back office,
          with three reporting platforms all live and none speaking to the
          others, roughly fifty Google Sheets carrying the semantic data
          foundation because the BigQuery ETL the prior team had planned
          never got built, and recruitment running across HubSpot,
          SchoolMint, PowerSchool, MailChimp, and a call-center workflow
          with tiered ops and enrollment follow-ups. The CEO needs to see
          network-level recruitment performance for the next board meeting.
          The principal needs to see their campus’s funnel. The director of
          enrollment needs to know which families are stalling and where in
          the funnel they are stuck. The integration engineering is
          finishable: consolidate the reporting onto Tableau Cloud, treat
          the Google Sheets layer as the explicit semantic contract over
          what remains a legacy stack underneath, define the funnel stages,
          plumb them through. At the end of that work, the funnel report
          exists and the dashboard runs.
        </P>

        <P>
          The harder question is who can vouch for the number when the principal calls and asks why their applicant count moved by twelve in a week. Someone has to know which of the source systems was reconciled when, which sheet version held the most recent definition of “applicant” versus “enrolled,” which call-center status code rolled up to which funnel stage, and what changed in the overnight refresh. In the legacy era that someone is a steward. The contracts were not absent — they were everywhere, in vendor documentation, in file format conventions, in batch cadences, in the append-versus-delete semantics buried in scheduled jobs, in the implicit understanding that “an applicant is who SchoolMint says they are unless HubSpot has them flagged for follow-up.” They were tacit institutional knowledge, held in the head of the steward who could vouch for a number when a stakeholder was about to act on it. That is not a failure of engineering. It is what legacy-era integration governance was. When the steward left, the integration still ran. The number stopped being actionable, because the contract that connected the integration to the decision left with the steward.
        </P>

        <P>
          The same problem looks different in a public-sector frame. An Indian state runs four parallel state
          systems —{" "}
          <a
            href="https://udiseplus.gov.in/"
            target="_blank"
            rel="noopener"
            className="text-accent hover:text-accent-2 no-underline border-b border-line-2 hover:border-accent pb-px"
          >
            UDISE+
          </a>{" "}
          for the annual school census,{" "}
          <a
            href="https://parakh.ncert.gov.in/nas-dashboard"
            target="_blank"
            rel="noopener"
            className="text-accent hover:text-accent-2 no-underline border-b border-line-2 hover:border-accent pb-px"
          >
            NAS
          </a>{" "}
          for a sample-based achievement survey on a four-year cycle with
          grade-band shifts between cycles,{" "}
          <a
            href="https://pgi.udiseplus.gov.in/"
            target="_blank"
            rel="noopener"
            className="text-accent hover:text-accent-2 no-underline border-b border-line-2 hover:border-accent pb-px"
          >
            PGI
          </a>{" "}
          as a centrally-designed state grading index, and{" "}
          <a
            href="https://niti.gov.in/sites/default/files/2019-09/seqi_document_0.pdf"
            target="_blank"
            rel="noopener"
            className="text-accent hover:text-accent-2 no-underline border-b border-line-2 hover:border-accent pb-px"
          >
            SEQI
          </a>{" "}
          as a state quality index with its own definitions of the same
          outcome variables. Technically the
          four integrate: states submit, the central agencies consolidate,
          the dashboards land. What can a District Education Officer or a
          Mandal Education Officer act on, this month, in their block? Each
          system reports something different about overlapping populations on incompatible cycles. The
          contracts between these four state systems were never written.
          There is no single steward who holds them. The integration runs.
          The decision interface does not exist.
        </P>

        <P>
          The legacy-era test was the steward&rsquo;s test: can the steward vouch for the number a stakeholder is about to act on, because the implicit contracts held? In K–8 networks the answer was sometimes yes, when one institutional research lead or data manager held the full picture. In multi-ministry state systems the answer was rarely yes, because no single steward held the contracts across four systems owned by four different bodies. Higher education&rsquo;s legacy era looked more like the school-network case at much larger scale: Banner sitting on top of a legacy database, PeopleSoft Campus Solutions feeding several downstream warehouses, multiple legacy financial systems feeding the budget office on separate cycles. The contracts were implicit, lived in the institutional research team, and were held in the head of a senior IR analyst whose vouching let the Provost and the CFO act on a number. The decision interface was a person — the senior IR analyst. That worked, in the institutions where it worked, only as long as the person stayed and the questions stayed within their working memory.
        </P>

        <H2>Modern era: the artifact exists, the council doesn’t</H2>

        <P>
          The modern era was supposed to fix this, and at the engineering
          layer it largely has. The stack is now familiar: Snowflake or
          Databricks for the warehouse, Fivetran or Airbyte for ingestion,
          dbt for transformation, a semantic layer for shared definitions,
          freshness SLAs in the lineage tooling, and data-contract testing
          in the build pipeline. The contract is now explicit, written, and
          version-controlled. The artifact exists, in a file, where it can
          be reviewed.
        </P>

        <P>
          What changes less than institutions hope is the governance layer on top of the artifact. A youth-mental-health foundation, working with a cloud data warehouse a prior contractor had stood up at the dev/prod schema layer but never finished integrating data into, had a data warehouse and a survey platform running as two parallel data-collection platforms, with survey data accumulating across four to six instrument versions of the same construct over multiple years and external standardized survey instruments and public datasets pulled in for context. The activation work was technical — managed-ETL connectors, DevOps cleanup, and warehouse schema design that reconciled the two collection platforms and the instrument versions into a unified semantic layer, with named definitions for what “engaged participant” meant in the canonical schema and how each instrument version mapped into it. At the end of that work, the artifact existed and the integration ran on a defensible cadence — the engineering layer.
        </P>

        <P>
          It wasn&rsquo;t the schema design that turned that work into
          institutional intelligence. It was the council, however
          lightweight, that owned it. Who is allowed to ship a change to the “engaged
          participant” definition? Who has to be told before the change
          ships? How long does it take for the quarterly report a program
          officer is about to act on to reflect the change? Is the prior
          quarter’s figure still defensible after the change, and if not,
          who explains that to the partner clinicians and the funders
          before they read the new report? Modern integration gives an
          institution the contract artifact. It does not give the
          institution the governance interface that decides who reads the
          contract, who can change it, and how downstream stakeholders
          trigger their actions when it changes. Most institutions in this
          era buy the tooling and skip the council, and end up with no one
          who can answer the program officer when the number moves and the
          question is whether to act on it or wait.
        </P>

        <P>
          The same gap shows up at a different scale and a higher cost
          stack in behavioral health. A regional behavioral-health agency
          running Certified Community Behavioral Health Clinic services had
          to integrate hospital encounter feeds via HL7 v2 and CCDA, a
          regional Health Information Exchange via FHIR, payer
          authorizations, the financial system, HR, and a population-health
          analytics layer. The hybrid HIPAA-compliant design moved
          source-system feeds through an integration layer where Mirth
          Connect handled the hospital data, through ETL and validation,
          into a cloud warehouse with BI on top — and privacy-by-design
          lived as architectural components rather than afterthoughts, with
          HIPAA and additional pharma-partner privacy rules at the access
          layer, consent tracking integrated through the stack,
          de-identification at extract, and role-based access through the
          BI layer. The cost stack ran from thousands per integration pipe
          to hundreds of thousands for population-health management once it
          had to drive care decisions rather than only describe them.
          Engineering money buys a lot of pipes. The pipes do not, on their
          own, buy a decision interface.
        </P>

        <P>
          The architecture work made the governance question visible in a way the engineering work could not answer. When a clinician at a partner clinic opens the chart and the integrated population-health view shows the patient has had three no-shows in sixty days, what is the contract that says the clinician is allowed to act on that number? At what cadence does the no-show count have to be fresh enough to support an outreach call without first re-checking the source system? When the patient&rsquo;s status updates at the partner clinic, how long until the central view reflects it, and what action is the clinician expected to take in the lag window? HL7 carries the message. The schema defines the fields. The governance contract — written, agreed, enforced across the partner clinics and the central agency — is what tells the clinician whether the number on their screen is a decision interface or only a description.
        </P>

        <P>
          A measurement-based-care pilot run through a patient-facing smartphone app, built into the same behavioral-health setting, made the freshness-contract question concrete at clinical cadence. A patient opens the app and completes a brief symptom inventory in the morning; the result lands on the clinician&rsquo;s dashboard before the day&rsquo;s appointments, and the clinician adjusts treatment planning based on the symptom trajectory. The dashboard feeds the warehouse, which in turn feeds adherence and engagement analytics. The pilot ran with thirty-plus patients across two waves, produced a forty percent engagement lift after reminder automation, surfaced earlier clinician response, and began to show predictive patterns in adherence and symptom improvement. There is a human clinician acting on integrated data at a faster cadence than weekly review can sustain — and the freshness contract is already what makes that loop work, even with no agent in the cycle. If the morning symptom score reaches the clinician three days late, the treatment planning at the noon appointment is being done on a stale number. The contract that has to be specified is not “the data is integrated.” It is “the cadence at which the patient&rsquo;s status stays fresh enough for the clinician to adjust treatment planning, and what happens when it slips below that threshold.”
        </P>

        <P>
          There is a quieter version of this same gap that shows up when
          the contract author is external. A public charter school
          operating inside a state’s accountability framework works inside
          an explicit modern-era integration contract whose author is the
          state agency itself, which writes the course-collection policy:
          schools submit course registration, attendance codes, and
          reporting cadences on the state’s schedule, in the state’s
          format, against the state’s definitions. The contract is not
          optional and not invented by the school. The state writes it;
          the school conforms. That gives the principal a usable decision
          interface, because they know exactly what counts, why it counts,
          when it counts, and who reads it. The example matters because
          most institutional contexts have no equivalent author. There is
          no state agency writing the contracts inside the foundation, the
          school network, the regional behavioral-health agency, or the
          university. If the institution does not write the contracts
          itself, no one does.
        </P>

        <H2>Higher ed’s modern era</H2>

        <P>
          Higher education is standing in this same gap at scale right now. Most institutions are standing up — or have stood up — a warehouse, a semantic layer, some dbt, and some lineage, and the integration engineering is largely being done. The missing piece is the council that owns the decision interface on top of the artifact, and so the Provost still cannot get a 360 view even after the CIO has built the warehouse. The data governance committee, where one exists, often meets quarterly to debate naming conventions. The decision interface is unowned.
        </P>

        <H2>The agentic era: provenance, consent, reversibility</H2>

        <P>
          The agentic era changes what the contract has to specify and raises what the stakes are when it does not exist. The freshness-contract pattern that was already central to modern-era clinical loops becomes more demanding when an agent enters the cycle, because the agent acts at machine cadence and the human stakeholder still has to stand behind the action. The earliest agentic example I have worked on is a reporting prototype where Snowflake Cortex reads from governed Snowflake schemas, Streamlit fronts a Python pattern that reads against the warehouse, and Gemini is used at a bounded scope to verify significance-test results and the interpretation of those tests before a human program officer acts on them. Even at that bounded scope — LLM-inferred verification of a statistical claim a human is about to act on — the provenance question already arrives. Was this confidence-interval check produced by a human, by a deterministic test, or by an LLM that may have hallucinated it? Once agentic deployments scale beyond verification into drafting and writing (which is the direction reporting pipelines are heading), the contract has to extend to provenance categories the data-integration era did not have to name. Was this paragraph human-authored, deterministic-pipeline-generated, or LLM-inferred? On the warehouse side, was this record written by a human program officer, by the nightly ingestion job, or by the agent acting on the program officer&rsquo;s behalf? Provenance now has to sit inside the data, not alongside it as metadata. A program officer reading the impact report has to know which sentences were synthesized and which were sourced, because the question “can I stand behind this when a funder asks” depends on the answer.
        </P>

        <P>
          The contract has to extend to consent semantics for machine
          write actions. A human writing to a patient’s chart operates
          under a known consent envelope — what the patient agreed to at
          intake, what the clinician’s role-based access permits, what
          HIPAA’s minimum-necessary rule treats as defensible. An LLM
          writing to a chart raises a different consent question. Did the
          patient consent to LLM-inferred annotations on their record? Did
          the clinician supervise the inference? Can the inference be
          reversed? What is the audit trail that lets a regulator answer
          “what wrote this, and when” months after the fact? The
          data-integration era’s contracts did not have to answer any of
          those questions. The agentic era’s contracts do, before any
          agent goes into production rather than after.
        </P>

        <P>
          Reversibility envelopes are the third extension. When a human writes a wrong number to a record, the institution can undo it through a defined process and a known reviewer. When an LLM writes a wrong number at machine cadence, the institution may have minutes, not days, before downstream stakeholders are already acting on the changed record. The reversibility contract has to specify the window within which a roll-back is possible, the conditions under which it is automatic versus reviewed, and the downstream stakeholders who have to be notified that the records they were acting on may have just moved. The contract now has to say whether, if the machine writes something wrong, the institution can take it back before a decision has been triggered on it.
        </P>

        <P>
          Consumption is the fourth extension, and the one institutions notice last because it arrives as an invoice rather than an incident. When a human runs a query, the cost is a salary the institution has already paid. When an agent runs a query, the institution pays per call, and an agent that reads across six systems to answer one question can run that question hundreds of times a day without anyone having decided it should. The contract that governed who is allowed to write a record now has to govern what an agent is allowed to spend to produce one: which workloads may call a premium model and which are routed to a cheaper one, and how the consumption is attributed back to the program or department whose workflow generated it, so the spend has an owner who can be asked about it. An institution that writes the read, write, consent, provenance, and reversibility contracts and skips the consumption contract finds the gap the same way it finds every other ungoverned seam: after the fact, when the bill arrives and no one can say which workflow produced it or whether it was worth producing.
        </P>

        <H2>Higher ed and the agentic era</H2>

        <P>
          Higher education is not far from this. Banner-to-Workday-Student transitions are landing. Financial-aid agents reading across multiple systems are landing. Advising assistants writing to advising notes are landing. AI tutors writing to gradebooks are landing. The institution will have the integration. It will have, mostly, the engineering. What it will not have, in most cases, is the contract layer. That gap is not unique to higher education: in a <a href="https://www.deloitte.com/us/en/insights/topics/emerging-technologies/ai-agents-scaling-faster.html" target="_blank" rel="noopener" className="text-accent hover:text-accent-2 no-underline border-b border-line-2 hover:border-accent pb-px"><a
            href="https://www.deloitte.com/us/en/insights/topics/emerging-technologies/ai-agents-scaling-faster.html"
            target="_blank"
            rel="noopener"
            className="text-accent hover:text-accent-2 no-underline border-b border-line-2 hover:border-accent pb-px"
          >
            2026 Deloitte survey of more than three thousand technology and
            business leaders
          </a></a>, only about one in five reported a mature governance model for agentic AI, while adoption ran well ahead of it. Who is allowed to write a gradebook entry on behalf of an AI tutor? What is the consent envelope under which a financial-aid agent moves a student between aid scenarios? When the advising assistant writes a recommendation into a student&rsquo;s record that the advisor never reviewed, what is the reversibility window, and who tells the advisor? The architectural question is the same one the behavioral-health case faces. The systems differ. The contract questions are identical.
        </P>

        <H2>The freshness contract becomes load-bearing</H2>

        <P>
          The freshness contract (the discipline of treating timestamps
          not as metadata but as part of the decision) already mattered
          in the modern era, because reports drove decisions on a weekly
          or monthly cadence and stale numbers produced wrong reports. In
          the agentic era it matters in a different way. An LLM acting on
          stale data at machine cadence produces wrong outcomes faster
          than a human at the same staleness, and faster than the
          decision interface can be re-anchored once it has started
          producing decisions that look fluent and are not. The timestamp
          is no longer a field next to the record. It is the boundary
          between an actionable number and a misleading one.
        </P>

        <P>
          That is what makes integration governance a layer the institution cannot leave to engineering or architecture in any era. Engineering moves the bytes. Architecture stages them. Governance contracts — who reads, who writes, on what cadence, with what consent, with what provenance, with what reversibility, with what consumption, with what authority to act — turn fragmented bytes into decision-ready institutional intelligence stakeholders can stand behind. Without those contracts, the integration runs and the data on the other side stays fragmented to anyone trying to act on it. With those contracts, fragmented bytes become decision-ready intelligence: a 360 view for the CEO, role-specific intelligence for program officers and principals and clinicians and deans and District Education Officers, and a decision interface that triggers action.
        </P>

        <P>
          The contracts have to be written. By someone, named, inside the institution. Where in the institution that role should sit is something I have taken up elsewhere. In every era these contracts were already needed. In the next era they will hold the weight.
        </P>

        <SeeAlso>
          <SeeAlsoItem
            slug="plumbing-got-upgraded-water-didnt"
            title="Plumbing got upgraded. The water didn’t."
            gloss="Why the pipes got industrialized and the contracts didn’t."
          />
          <SeeAlsoItem
            slug="blown-assignment"
            title="It’s a blown assignment"
            gloss="The same gap as a missed assignment on a play, in field-note form."
          />
          <SeeAlsoItem
            slug="numbers-dont-agree"
            title="The numbers don’t agree because the words don’t"
            gloss="The shared definitions the contracts have to govern."
          />
        </SeeAlso>

        <MetaNote>
          This essay was written in June 2026 for the Analytic Bytes
          Library. It draws on the author’s practice across K–8 charter
          networks, a youth-mental-health foundation, a regional
          behavioral-health agency, a DC public charter school context,
          and Andhra Pradesh state systems. Organizational details are
          abstracted where appropriate. The argument is intended to
          outlast specific products and platforms.
        </MetaNote>
      </>
    ),
  },

  // ===================================================================
  // FIELD NOTE 05 — Plumbing got upgraded. The water didn't.
  // ===================================================================
  {
    kind: "field-note",
    slug: "plumbing-got-upgraded-water-didnt",
    number: "05",
    title: "Plumbing got upgraded. The water didn’t.",
    subtitle:
      "The pipes got industrialized. The water got harder to govern.",
    date: "2026-06-23",
    readingTime: "6 min read",
    summary:
      "The data integration layer is mostly solved — the pipes have been industrialized. The work that remains is closer to running a water authority: sourcing, testing, pressure, authority, who’s allowed to drink. The unglamorous part isn’t the pipes anymore. It’s the water.",
    cover: "/library/covers/plumbing-got-upgraded-water-didnt.svg",
    arc: "integration-governance",
    body: (
      <>
        <Brief>
          <p>
            The data integration layer is mostly solved. The pipes have
            been industrialized: Fivetran, dbt, Snowflake, the cloud
            data platforms. The questions that stay hard are no longer
            about the pipes.
          </p>
          <p>
            Why <I>plumbing</I> stopped being the right word for the
            work, and what the work is now: the water itself —
            sourcing, testing, pressure, authority, who’s allowed to
            drink. The{" "}
            <ArtifactLink slug="contract-at-the-seam">
              contract at the seam
            </ArtifactLink>
            , not the pipe in the wall. The gap between{" "}
            <I>we have a data warehouse</I> and{" "}
            <I>we can make a decision.</I>
          </p>
        </Brief>

        {/* Visual primer — 60s silent captioned video pairing with this field note */}
        <div className="my-10">
          <div className="font-mono text-[11px] text-accent tracking-[0.18em] uppercase mb-4">
            The 60-second version
          </div>
          {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
          <video
            src="/videos/AB_PlumbingFallacy_v6_6.mp4"
            poster="/videos/AB_PlumbingFallacy_v6_6_poster.jpg"
            autoPlay
            muted
            playsInline
            preload="metadata"
            controls
            className="w-full h-auto rounded-lg border border-line"
            aria-label="Plumbing got upgraded, the water didn’t — a 60-second visual primer for this field note."
          />
        </div>

        <P>
          For most of my career, when people asked what I do, I&rsquo;d say <I>data plumbing</I>. It was a useful shorthand. Everyone got it. The pipes, the joints, the connections between systems — the unglamorous infrastructure that makes everything else possible. Plumbers don&rsquo;t get a lot of credit. But the building doesn&rsquo;t work without them.
        </P>
        <P>Lately I’ve stopped using the word.</P>
        <P>
          Not because it was wrong. Because the word stopped meaning
          what it used to mean.
        </P>
        <P>
          When I started in this work, <I>plumbing</I> was the hard part. Moving data between two enterprise systems took months. Integration was a strategic asset. Today the pipes have been industrialized — Fivetran, dbt, Snowflake, the cloud data platforms. The difficulty is no longer engineering the pipe; it&rsquo;s mostly paying the subscription and managing the configuration. The plumbing got upgraded. It&rsquo;s a solved problem class, even if individual lines still get clogged.
        </P>
        <P>
          So if “plumbing” was what I called the hard part of the work,
          and the hard part has moved, the word doesn’t fit anymore.
        </P>

        <H2>The faucet, not the pipes</H2>
        <P>
          Here’s the shift I keep coming back to.
        </P>
        <P>
          Imagine your house has plumbing. Pipes run through the walls. Water comes from a treatment plant somewhere. It comes out of a faucet. You turn the handle. Something comes out.
        </P>
        <P>
          The work of getting pipes into the walls — that’s plumbing in
          the old sense. Most modern houses have it. It’s table stakes.
        </P>
        <P>
          The work that determines whether you can drink the water, cook with it, give it to a child, wash a wound — that work isn&rsquo;t in the pipes. It&rsquo;s: What&rsquo;s the source. Is the source clean. Did anything get added or removed upstream. What&rsquo;s the pressure at the faucet: too high and it sprays, too low and you can&rsquo;t fill a pot. Who&rsquo;s allowed to open which tap, what happens when the system fails, who notices.
        </P>
        <P>
          None of that is plumbing. All of it is what having water actually feels like.
        </P>

        <H2>Speed was the only knob we turned</H2>
        <P>
          There’s a useful way to think about what AI changed
          in all this.
        </P>
        <P>
          For a long time, the only knob most data systems could really turn was speed. Faster pipes, more frequent refreshes, real-time dashboards. Speed got cheap — that&rsquo;s most of what the modern stack delivered.
        </P>
        <P>But speed isn’t the only knob. Two others have been sitting there the whole time.</P>
        <P>
          <I>Resolution</I> — how granular a picture makes it through the pipe. Whether the decision-maker gets the full pattern, or a flattened score that stands in for it.
        </P>
        <P>
          <I>Context</I> — what surrounds the data point. The
          cross-system signals and the constraints that change what a
          number actually means.
        </P>
        <P>
          AI made all three knobs more accessible. The speed knob was already turned up; that&rsquo;s the part most institutions invested in. The resolution and context knobs are still mostly at their default positions. The gap is not speed. It is the other two we have not spent. <I>(A fourth dimension deserves its own piece: whether the construct in the pipe is still the construct you sampled last quarter. That one gets its own treatment in “The construct keeps moving.”)</I>
        </P>

        <H2>The Thursday afternoon</H2>
        <P>
          Consider a Thursday afternoon in a college advisor&rsquo;s office. A junior student-athlete has skipped three classes and tripped the LMS risk flag. The bursar&rsquo;s stack shows their aid disbursement is on hold for a missing verification document. The campus dining system hasn&rsquo;t seen a swipe in forty-eight hours. All three systems know something. None of them are talking to the advisor across the desk. The plumbing ran perfectly. The student still fell through.
        </P>
        <P>
          When I look at what I spend my time on now, it&rsquo;s almost entirely those kinds of moments, applied to data. The easy question is <I>can we connect these two systems</I> — yes, almost always. The questions that stay hard are: what does the field actually measure, whose number wins when two systems disagree, who&rsquo;s allowed to read what, who&rsquo;s allowed to change it, on what cadence, and when it goes wrong, who notices.
        </P>
        <P>That’s not plumbing. That’s closer to running a water authority.</P>
        <P>
          The distinction matters, so name it directly: Most
          institutions have invested heavily in <I>data governance</I>:
          the policies that decide who can access which table, how a
          field is defined in the catalog, how lineage is tracked. That
          work is real and necessary. But data governance is governance
          of the pipe. <I>Decision governance</I> is governance of the
          faucet — who’s allowed to act on what comes out, at what
          resolution, on what cadence, and what kind of decision the
          architecture is built to support. An institution can have
          mature data governance and almost no decision governance, and
          the seam still fails.
        </P>
        <P>
          The same Thursday afternoon happens in a clinic. In a
          behavioral health agency. In a K-12 district trying to act on
          an early-warning flag. In a foundation reviewing grantees.
          In a workforce board trying to know whether a participant is
          on track. The shape doesn’t change. The systems hold pieces.
          Nobody has the picture.
        </P>

        <H2>The water authority</H2>
        <P>The analogy keeps holding up.</P>
        <P>
          The water treatment plant is the place that decides what
          counts as drinkable water and tests every batch. That’s the
          construct question. Are we measuring what we say we’re
          measuring. Is the thing in the pipe still what it was when we
          sampled it last quarter.
        </P>
        <P>
          The municipal authority decides which neighborhoods get
          pressure, sets the testing cadence, and is responsible when
          the boil-water advisory goes out. That’s the governance
          contract: who reads, who writes, on what cadence, with what
          authority. This is the contract at the seam: the point where
          the architecture stops and a person has to act on what comes
          through. Most institutions have a contract for the pipes:
          vendor SLAs, integration agreements, data-sharing terms. Few
          have one for what happens at the faucet.
        </P>
        <P>
          The faucet itself is the moment someone turns the handle.
          That’s the decision. A dosage adjustment, a budget call, an
          eligibility flag, a credit limit, a clinical alert. That’s
          where the entire stack either works or doesn’t. And the
          agentic era is already installing faucets that turn themselves
          on, mix their own temperature, and pour before anyone can
          taste what’s coming out.
        </P>
        <P>
          The engineers who used to be your bottleneck, the integration specialists — they&rsquo;re more like the contractors who installed the pipes in the first place. Important. But you don&rsquo;t call them when the water tastes wrong.
        </P>

        <H2>The contract at the seam</H2>
        <P>
          If I had to describe the contract at the seam in plain terms,
          it has four pieces.
        </P>
        <P><I>Who</I> is allowed to act on the signal.</P>
        <P><I>What data</I> they see, and at what resolution.</P>
        <P><I>On what cadence</I> the signal reaches them.</P>
        <P><I>What kind of decision</I> the system is built to support.</P>
        <P>
          Most institutions skip the last piece: what kind of decision.
          They build for monitoring, then ask the same plumbing to
          support intervention, and the seam fails. The work is
          matching the architecture to the decision the institution
          needs to make.
        </P>

        <H2>The water is the work</H2>
        <P>
          I think the reason I’m slow to give up the old word is that
          “plumbing” has a kind of working-class honesty to it. It
          signals: <I>I do the unglamorous part. I don’t oversell.</I>
          That register matters in a field full of overselling.
        </P>
        <P>
          But the truth is, the unglamorous part isn’t the pipes
          anymore. The unglamorous part is the water — what’s in it,
          who decided what gets in, who’s responsible if it makes
          someone sick. The pipes are fine. The pipes were never the
          problem most institutions thought they were.
        </P>
        <P>
          If I had to describe what I do now without picking a clever new name for it, I&rsquo;d just say it&rsquo;s water authority work. Sourcing. Testing. Pressure. Authority. Who&rsquo;s allowed to drink. The integration layer is solved enough to not need most senior people&rsquo;s time. The layer that decides whether what comes out of the faucet is fit for purpose is barely staffed at most institutions, barely contracted for, barely measured. It&rsquo;s the gap between “we have a data warehouse” and “we can make a decision.”
        </P>
        <P>Plumbing got upgraded. The water didn’t.</P>
        <P>That’s the work.</P>

                <SeeAlso>
          <SeeAlsoItem
            slug="the-contracts-between-systems"
            title="The contracts between systems"
            gloss="What the water-authority layer actually has to specify across three eras."
          />
          <SeeAlsoItem
            slug="blown-assignment"
            title="It’s a blown assignment"
            gloss="Why the dashboard runs and the play doesn’t."
          />
          <SeeAlsoItem
            slug="where-should-data-sit"
            title="Where Should Data Sit?"
            gloss="Where the integration seat that owns the water work sits on the org chart."
          />
          <SeeAlsoItem
            slug="functions-dont-run-plays"
            title="Functions don’t run plays."
            gloss="The org-side of the same mismatch — why the plumbing gets upgraded and the work still doesn’t hold."
          />
        </SeeAlso>

        <MetaNote>
          This field note was written in June 2026 for the Analytic
          Bytes Library. The longer arguments referenced here live in
          other library pieces:{" "}
          <InternalLink slug="what-is-this-system-measuring">
            What Is This System Actually Measuring?
          </InternalLink>{" "}
          (the water-safety question),{" "}
          <InternalLink slug="numbers-dont-agree">
            The numbers don’t agree because the words don’t
          </InternalLink>{" "}
          (when two pipes feed the same tap),{" "}
          <InternalLink slug="the-contracts-between-systems">
            The Contracts Between Systems
          </InternalLink>{" "}
          and related work on who writes the contract (authority at the
          seam).
        </MetaNote>
      </>
    ),
  },

  // ===================================================================
  // FIELD NOTE 07 — It's not a communication issue. It's a blown assignment.
  // ===================================================================
  {
    kind: "field-note",
    slug: "blown-assignment",
    number: "06",
    title: "It’s not a communication issue. It’s a blown assignment.",
    subtitle: "Cross-functional work is a football play. Three phases, three failure modes, one fix that isn’t another meeting.",
    date: "2026-06-27",
    readingTime: "3 min read",
    summary:
      "Most cross-functional breakdowns get diagnosed as a communication issue and answered with another meeting. They’re a football play instead: alignment, assignment, execution. Each phase fails differently, and a communication-issue diagnosis collapses all three.",
    cover: "/library/covers/blown-assignment.svg",
    arc: "integration-governance",
    body: (
      <>
        <Brief>
          <p>
            Most cross-functional breakdowns get diagnosed as a communication
            issue and answered with another meeting. The diagnosis collapses
            three different failure modes into one, and the meeting can name
            the breakdown without repairing any of them.
          </p>
          <p>
            The three failures are different in shape, and each needs a
            different fix. None of those fixes is another meeting. Football
            coaches have a frame for naming them that transfers cleanly into
            cross-functional work.
          </p>
        </Brief>

        <H2>The frame</H2>
        <P>
          Cross-functional work feels less like collaboration and more like a
          football play. Eleven specialists, one designed play, executed in a
          single coordinated burst against a defense built to break it.
        </P>
        <P>
          Football coaches drill the same three-word mantra every year.
        </P>
        <P>Know where you stand. Know what you do. Run the play.</P>
        <P>
          That’s the whole frame. It does most of what cross-functional teams
          actually need.
        </P>

        <H2>Three phases, three failure modes</H2>
        <P>
          <B>Alignment</B> is where you fit relative to everyone else. In football, it&rsquo;s where you stand on the field. In cross-functional work, it&rsquo;s where your function stands relative to the others. Who you partner with upstream. Who you hand off to downstream. Whose problem becomes your problem when something doesn&rsquo;t move.
        </P>
        <P>
          Alignment failures look like this. The school counselor, the behavioral health clinic, and the family are all aware of the same student. None of them know who owns the case. The student is not missed because no one cared. They are missed because everyone thought they were on someone else&rsquo;s coverage.
        </P>
        <P>
          <B>Assignment</B> is what you do on this specific play. In football,
          it’s the difference between blocking the inside gap and pulling left
          to lead block. Same player, two completely different jobs depending
          on the call.
        </P>
        <P>
          Assignment failures look like this. The data architecture is fine. Three systems flow into a dashboard. The advisor sees the dashboard. Then nothing happens, because nobody wrote what should happen. No contract says <I>if the score crosses this line, who acts, with what authority, on what cadence.</I> The dashboard isn&rsquo;t the problem. The missing assignment is.
        </P>
        <P>
          <B>Execution</B> is the actual play running. The line moves on the
          snap. The receiver runs the route. The quarterback reads and throws.
          The timing has to be inside a fraction of a second.
        </P>
        <P>
          Execution failures look like this. The alignment is right. The
          assignment is right. The operational handoff still fumbles. The
          discharge plan was written. The follow-up was assigned to the care
          coordinator. The care coordinator was out for a week, and nothing
          escalated. The play was called. The play didn’t run.
        </P>
        <P>Three phases. Three different failure modes. One play.</P>

        <H2>Why “a communication issue” is the wrong diagnosis</H2>
        <P>
          Most institutions diagnose all three as the same problem.{" "}
          <I>We have a communication issue.</I> And schedule another meeting.
        </P>
        <P>
          A communication issue treats all breakdowns as if they were the same
          flat thing, but they aren’t. An alignment failure needs a clearer
          organizational map. An assignment failure needs a written contract.
          An execution failure needs operational redundancy — a backup when
          the named person is out. Three different fixes. Three different
          conversations. Three different artifacts.
        </P>
        <P>The meeting can name the breakdown. It can’t fix any of them.</P>

        <H2>Where the AB lane sits</H2>
        <P>
          Most of the work we get pulled into looks like a data problem on the surface. A dashboard nobody uses. A handoff that doesn&rsquo;t stick. A metric stuck in someone&rsquo;s email instead of a workflow. None of those are data problems. They are alignment problems, assignment problems, or execution problems misread as data problems.
        </P>
        <P>
          The fix is the play. Written down. Owned by named roles. With the contingencies designed in. That&rsquo;s the <ArtifactLink slug="contract-at-the-seam">seam contract</ArtifactLink>. That&rsquo;s the artifact the modern data stack does not ship in the box.
        </P>
        <P>The plumbing got upgraded. The play didn’t.</P>
        <P>That’s the work.</P>

        <SeeAlso>
          <SeeAlsoItem
            slug="plumbing-got-upgraded-water-didnt"
            title="Plumbing got upgraded. The water didn’t."
            gloss="Why integration isn’t the decision, and what would be."
          />
          <SeeAlsoItem
            slug="the-contracts-between-systems"
            title="The contracts between systems"
            gloss="What lives inside a seam contract."
          />
          <SeeAlsoItem
            slug="functions-dont-run-plays"
            title="Functions don’t run plays."
            gloss="The org-structure side of the same mismatch."
          />
          <SeeAlsoItem
            slug="where-should-data-sit"
            title="Where Should Data Sit?"
            gloss="Who has the standing to hold the cross-functional contract."
          />
        </SeeAlso>

        <MetaNote>
          Written June 2026 for the Analytic Bytes Library. Composite of
          cross-functional patterns observed across K-12, behavioral health,
          and higher-ed engagements; specific examples are abstracted. The
          longer arguments referenced here live in companion pieces:{" "}
          <InternalLink slug="plumbing-got-upgraded-water-didnt">
            Plumbing got upgraded. The water didn’t.
          </InternalLink>{" "}
          (why integration isn’t the decision),{" "}
          <InternalLink slug="the-contracts-between-systems">
            The Contracts Between Systems
          </InternalLink>{" "}
          and <I>Who Writes the Contract</I> (what lives in a seam contract),{" "}
          <I>Two Bets, One Institution</I> (how to decide whether to build
          the play in-house or partner for it), and{" "}
          <InternalLink slug="what-is-this-system-measuring">
            What Is This System Actually Measuring?
          </InternalLink>{" "}
          (whether the construct is still the right one).
        </MetaNote>
      </>
    ),
  },

  // ===================================================================
  // FIELD NOTE 08 — Functions don't run plays.
  // ===================================================================
  {
    kind: "field-note",
    slug: "functions-dont-run-plays",
    number: "07",
    title: "Functions don’t run plays.",
    subtitle:
      "The org chart is vertical. The work is horizontal. Multiple honest structural forms can carry the play (councils, flash teams, standing squads) and none of them works without a seam contract underneath.",
    date: "2026-06-30",
    readingTime: "4 min read",
    summary:
      "The mismatch between horizontal work and vertical org charts is structural. Multiple honest forms can carry it: councils that deliberate and hand playbooks back to functions, flash teams that merge for the deliverable, standing squads drawn permanently from across functions. All rely on the same seam contract underneath. Without that contract, none of them holds.",
    cover: "/library/covers/functions-dont-run-plays.svg",
    arc: "data-foundations",
    body: (
      <>
        <Brief>
          <p>
          Most modern work is cross-functional and time-bound. Most org charts are functional and indefinite. I keep coming back to that mismatch.
        </p>
          <p>
            More than one honest structural form can carry that mismatch:
            councils that deliberate and hand a playbook back to each
            function; flash teams that merge across functions for a
            deliverable and dissolve; standing squads drawn permanently from
            across functions. What is common to all three is a seam contract:
            who acts, on what signal, at what cadence, with what authority.
            The container is the institution&rsquo;s choice. The contract is
            not optional.
          </p>
        </Brief>

        <H2>The mismatch</H2>
        <P>
          The work is horizontal: a specific deliverable, a specific clock, expertise drawn from several functions. The org chart is vertical: each function reporting up to its own executive, evaluated against its own scorecard, accountable to its own incentives. The mismatch is structural. Smart, well-meaning people do not make it go away. The structure does.
        </P>
        <P>
          So institutions patch it. The patches are familiar. A standing cross-functional meeting names the breakdown without fixing it. A matrix reporting line multiplies the bosses without changing the unit of work. A “communication issue” diagnosis schedules another meeting. The heroic senior hire is expected to span every layer the org chart failed to connect, then gets sighed about as a unicorn when one person cannot.
        </P>

        <H2>More than one honest answer</H2>
        <P>
          There is more than one honest structural answer to the mismatch, and the field of practice is diverse. Councils. Steering committees. Advisory boards. Working groups. Task forces. Tiger teams. Flash teams. Agile squads. Product teams. Centers of excellence. Each one differs on permanence, authority, composition, and purpose. Each has a legitimate place.
        </P>
        <P>Three archetypes cover most of the actual practice.</P>

        <P>
          <I>Deliberate together, execute locally.</I> A cross-functional
          body (a council, a steering committee, a working group)
          deliberates and writes a shared playbook. The playbook names the
          definitions, handoffs, timing, cadences, and the decisions the
          work depends on. Each function then takes the playbook back to
          its own team and runs its portion inside its existing operating
          context. Advancement, facilities, research management, and
          academic affairs contribute to the same playbook in council,
          then execute their piece each in their own house. Widespread in
          universities, foundations, and mission-driven organizations. Can
          run for decades.
        </P>

        <P>
          <I>Merge for the deliverable.</I> Flash teams (Melissa Valentine
          and her collaborators at Stanford named this pattern), tiger
          teams, project teams, task forces. Expertise is drawn from
          across functions and merged into a single team for the duration
          of the work. When the work is done, the team dissolves and
          people go back to their functions. More common in tech, product,
          and consulting.
        </P>

        <P>
          <I>Standing cross-functional composition.</I> Agile squads,
          product teams, centers of excellence, matrix teams. Ongoing
          teams drawn permanently or semi-permanently from across
          functions. Common in software organizations and in mature
          product-led institutions.
        </P>

        <P>
          These are structurally different. They carry different rhythms, different authority patterns, different membership assumptions. Which one fits depends on the institution and the work: the operating rhythm, the permanence of the effort, the authority pattern already in place, the culture that has to receive it. All three share what <InternalLink slug="blown-assignment">the football piece</InternalLink> called a <ArtifactLink slug="contract-at-the-seam">seam contract</ArtifactLink>: who acts, on what signal, at what cadence, with what authority. The institution chooses the container. The contract is not optional.
        </P>

        <H2>Not anti-function</H2>
        <P>
          None of this is anti-function. Functions are where deep expertise develops. An evaluator reports into research and evaluation. An advisor reports into student success. A clinician reports into clinical operations. The function is the home of the role, and that does not change.
        </P>
        <P>What changes is what runs the play.</P>
        <P>
          Whichever container carries the work (a merged team, a council with a playbook, a standing squad) draws expertise from the functions for a specific deliverable and carries its own seam contract. It is authorized to form across functions by an integration seat that has the standing to make the arrangement stick. When the work lands, the container changes shape. A flash team dissolves. A council closes out. A squad moves to its next mission. People go back to their functions. The next play forms a different container.
        </P>
        <P>
          <InternalLink slug="blown-assignment">The football piece</InternalLink> in the library named the artifact underneath all of this: the <ArtifactLink slug="contract-at-the-seam">seam contract</ArtifactLink>. The <InternalLink slug="plumbing-got-upgraded-water-didnt">plumbing piece</InternalLink> described the same artifact at a different layer, between architecture and human. <I><InternalLink slug="the-contracts-between-systems">
            Contracts Between Systems
          </InternalLink></I> and <I>Two Bets, One Institution</I> describe it at still other layers. Seams all the way down, each with its own contract. This piece is about the one that runs across the org chart when people, not systems, do the handoffs.
        </P>

        <H2>The agentic era intensifies this</H2>
        <P>
          The agentic era does not change this argument. It intensifies it.
        </P>
        <P>
          Agents can be introduced at every layer where a seam contract exists. The container that absorbs them (flash team, council playbook, standing squad) matters less than the contract they are joining. What matters is that the contract exists at that layer, with its four pieces named: who acts, on what signal, at what cadence, with what authority. Without a contract, an agent at any layer creates the same problem: decisions with no owner, no cadence, and no authority to reverse them.
        </P>
        <P>
          The consequence of introducing an agent scales with the layer. An agent inside a data pipeline is a technical operation. A failed transform is a rerun. An agent inside a clinical alert, an eligibility flag, or an intervention call is an institutional action. A failed call is a person harmed. Most institutions will introduce agents first at the layer whose failures are reversible, then work upward as the contracts at higher layers mature. That is not a claim about where agents belong. It is a claim about where they can safely start.
        </P>
        <P>
          The patches will not hold. The work is horizontal. The org chart
          is vertical. The mismatch only grows.
        </P>
        <P>
          The unit of work is the play. The mechanism that runs it across the org chart is a seam contract. Some institutions carry that contract in a flash team, some in a council playbook, some in a standing squad. All are honest answers. None works without the contract.
        </P>

        <SeeAlso>
          <SeeAlsoItem
            slug="plumbing-got-upgraded-water-didnt"
            title="Plumbing got upgraded. The water didn’t."
            gloss="Why integration stopped being the hard part."
          />
          <SeeAlsoItem
            slug="blown-assignment"
            title="It’s not a communication issue. It’s a blown assignment."
            gloss="The play as the unit of cross-functional work."
          />
          <SeeAlsoItem
            slug="where-should-data-sit"
            title="Where Should Data Sit?"
            gloss="Which seat has standing to authorize the play to form."
          />
          <SeeAlsoItem
            slug="the-contracts-between-systems"
            title="The Contracts Between Systems"
            gloss="The seam contract at the system-to-system layer."
          />
        </SeeAlso>

        <MetaNote>
          Written June 2026 for the Analytic Bytes Library. The flash-team
          construct comes from Melissa Valentine and collaborators at
          Stanford; the council, squad, and product-team archetypes reflect
          standard practice across higher education, foundations,
          healthcare, and tech. The longer arguments referenced here live
          in companion pieces:{" "}
          <InternalLink slug="plumbing-got-upgraded-water-didnt">
            Plumbing got upgraded. The water didn&rsquo;t.
          </InternalLink>{" "}
          (why integration stopped being the hard part),{" "}
          <InternalLink slug="blown-assignment">
            It&rsquo;s not a communication issue. It&rsquo;s a blown
            assignment.
          </InternalLink>{" "}
          (the play as the unit of cross-functional work),{" "}
          <InternalLink slug="where-should-data-sit">
            Where Should Data Sit?
          </InternalLink>{" "}
          (the seat that authorizes the play to form),{" "}
          <InternalLink slug="the-contracts-between-systems">
            The Contracts Between Systems
          </InternalLink>{" "}
          (the seam contract at the system-to-system layer), and{" "}
          <I>Two Bets, One Institution</I> (seam contracts between
          institutional domains).
        </MetaNote>
      </>
    ),
  },

  // ===================================================================
  // FIELD NOTE 09 — The Reach Trap
  // ===================================================================
  {
    kind: "field-note",
    slug: "the-reach-trap",
    number: "08",
    title: "The Reach Trap",
    subtitle:
      "Why your CRM keeps handing you reach — and what a decision system reads instead.",
    date: "2026-07-03",
    readingTime: "7 min read",
    summary:
      "A program officer, a portfolio manager, and a CSR lead can all report reach, but none can say whether it worked or where the next dollar should go. The usual diagnosis is a reporting problem. It isn’t. It’s a category error: a system of record for activity asked to behave like a system of record for outcomes.",
    cover: "/library/covers/the-reach-trap.svg",
    arc: "measurement",
    body: (
      <>
        <Brief>
          <p>
          A program officer, a portfolio manager, and a CSR (corporate social responsibility) lead all hit the same problem. Each can tell you how many people were reached, how much money went out, how many sessions were delivered. None can tell you, across the whole book, whether it worked or where the next rupee or dollar should go. The usual diagnosis is a reporting problem: buy a better dashboard, tighten the template. The real problem is a category error. You bought a system of record for <I>activity</I> and asked it to behave like a system of record for <I>outcomes</I>. This note is about that difference. It&rsquo;s also about the missing category — the evidence spine — that turns reach into a decision. It&rsquo;s a field note. It makes one structural claim.
        </p>
        </Brief>

        <H2>Reach is what falls out for free</H2>
        <P>
          Every measurement stack pulls toward reach.
          Count the people served, the dollars deployed, the workshops
          run, the grants closed. These numbers are not wrong and they are
          not useless — a funder who cannot say how many children a
          literacy program touched has a real problem. But ask{" "}
          <I>why</I> they are always the numbers you have. They fall out
          of the system for free. They are byproducts of transactions the
          organization was already logging for other reasons: the grant
          was disbursed, so the dollars are counted; the session happened,
          so attendance is counted. Reach is the exhaust of operations.
        </P>
        <P>
          Outcomes are not exhaust. Nobody&rsquo;s operational system logs “and it worked” as a side effect of cutting a check. Whether a program actually moved its outcome has to be <I>constructed</I> — the outcome defined, placed on a scale, and made comparable to the next program that defines success in its own words. Reach is counted. Evidence is built. The reach trap is mistaking the first for the second, and then blaming the reporting when the second never shows up.
        </P>

        <H2>Why the CRM can’t save you</H2>
        <P>
          This is where most teams go looking for the fix. It fails here. The instinct is familiar: we have a CRM, it holds all our grantee data, surely the answer is a better view on top of it. But a CRM is a system of record for <I>relationships and transactions</I> — contacts, grants, touchpoints, disbursements, pipeline stage. It is engineered, correctly, to answer <I>who did we fund, what did we do, what is the status.</I> That is a real and necessary job. It is just not the job of telling you whether any of it worked.
        </P>

        <Figure
          src="/library/figures/reach-trap-crm-vs-spine.svg"
          alt="CRM versus the evidence spine — two systems of record. A CRM holds activity and answers who, what, and status, yielding reach metrics. An evidence spine holds outcomes and answers whether it worked and where next, yielding invest, scale, and stop."
          caption="CRM versus the evidence spine — two systems of record. A CRM holds activity and answers who, what, and status, yielding reach metrics. An evidence spine holds outcomes and answers whether it worked and where next, yielding invest, scale, and stop."
        />

        <P>
          The claim isn&rsquo;t “CRMs are bad.” You can
          bolt an outcome field onto any CRM. The trouble is that
          comparability is not a storage feature; it is a governance
          feature. Add a free-text “impact” field and, across forty
          grantees, you get forty differently-worded fields that do not
          read across. The seam you were trying to close reopens, now
          with a database licence attached. The CRM was never the wrong
          tool. Treating it as your evidence layer is the category error.
          Reach falls out of it for free; comparability does not exist
          unless you build the second system deliberately.
        </P>
        <P>
          None of this says measurement people have ignored use. Utilization-focused evaluation has argued for decades that an evaluation nobody acts on has failed; the conviction here is inherited, not invented. What changes is where you put it. Shared-measurement frameworks reach comparability by making every grantee report the same indicators up front; metric catalogs like IRIS+ do it by prescribing a common dictionary to pick from. Both work when a portfolio shares one goal or one asset class. A grant book rarely does. Forty grantees carry forty theories of change, so the spine runs the other way: let each keep its own language, then place it on one scale afterward. The results-framework world already tried the alternative. The <a href="https://www.oecd.org/en/topics/results-based-management.html" target="_blank" rel="noopener" className="text-accent hover:text-accent-2 no-underline border-b border-line-2 hover:border-accent pb-px">OECD</a>&rsquo;s review of results-based management found a familiar pattern: data gets collected, but rarely reaches the decision. The easy read is a culture problem — teams never build the habit of looking. The real read is structural: the data was never shaped to be read as a decision. The second system is what shapes it.
        </P>

        <H2>What the rubric actually is</H2>
        <P>
          The second system has two moving parts, and the first is the one people skip. A rubric isn&rsquo;t a survey or a KPI list. It&rsquo;s a <I>shared outcome scale</I> — an explicit, small, ordered set of what “good” looks like, the same scale for every grantee in the book. Four points, say: emerging, building, established, sustained. That much is intuitive. The second piece does the real work: a semantic layer that maps each grantee&rsquo;s own language onto that scale.
        </P>
        <P>
          The scale is not a universal yardstick for impact. It is
          decision-specific: for this book, at this decision point, it
          asks a single question, what stronger evidence of progress
          looks like, and it is honest only along that axis. Compare
          grantees doing genuinely different work on a scale built for a
          different decision and you get false equivalence, not
          comparability.
        </P>

        <Figure
          src="/library/figures/reach-trap-rubric.svg"
          alt="The rubric — one outcome scale plus a semantic layer. Three grantees describe success in different words; the semantic layer maps each phrasing onto a shared four-point scale, so different words in become one comparable placement out."
          caption="The rubric — one outcome scale plus a semantic layer. Three grantees describe success in different words; the semantic layer maps each phrasing onto a shared four-point scale, so different words in become one comparable placement out."
        />

        <P>
          Grantee A says “kids reading at grade level.” Grantee B says “literacy gains held two years.” Grantee C says “fewer kids need remediation.” On their own, those are three incomparable sentences. Run them through the semantic layer and they become placements on one scale — B at sustained, C at established, A at building. Different words in; one comparable placement out. Without the semantic layer, a rubric is just a fourth dialect nobody speaks. With it, forty theories of change finally line up on a single axis.
        </P>
        <P>
          People imagine that mapping is automatic. It isn&rsquo;t.
          Funder and grantee co-author it: they agree, in advance,
          what evidence justifies each placement. The layer doesn&rsquo;t
          remove the judgment about whether “held two years” outranks
          “reading at grade level.” It forces that judgment to be made
          once, in the open, and then reused, instead of relitigated
          grantee by grantee every cycle.
        </P>

        <H2>What the spine actually is</H2>
        <P>
          The rubric tells you where one grantee lands. The spine is what makes the whole book a book. It is the shared record shape — the same handful of columns for every grantee, every cycle: the outcome tier from the rubric, the leading signal you are watching, the confidence you have in the evidence behind it. That consistency isn&rsquo;t clerical tidiness — the shared columns <I>are</I> the structure. They are what a CRM&rsquo;s per-grantee custom fields can never be. One of those columns earns a definition the others assume. Confidence isn&rsquo;t a mood. It&rsquo;s how much weight the evidence behind a placement can bear: how strong it is, how recent, whether it is comparable to the grantee in the next row. Keep it vague and one officer&rsquo;s “high” is another&rsquo;s “medium.” Define it and the column carries actual weight.
        </P>

        <Figure
          src="/library/figures/reach-trap-spine.svg"
          alt="The evidence spine — one shared record shape for every grantee. A table with consistent columns (outcome tier, leading signal, confidence) across grantees; the shared schema is the spine, and it reads across into invest, scale, and stop."
          caption="The evidence spine — one shared record shape for every grantee. A table with consistent columns (outcome tier, leading signal, confidence) across grantees; the shared schema is the spine, and it reads across into invest, scale, and stop."
        />

        <P>
          Keep the columns identical and the whole book reads across at a glance — same columns, one axis, comparability. You can sort, compare, and rank forty grantees on the same terms, and the portfolio question — where does the next dollar go — becomes answerable instead of rhetorical. Fragmented in, decision-ready out. Drop the columns, let each grantee report in its own shape, and you are back to forty PDFs that agree on nothing. The spine is unglamorous by design — a schema, not a dashboard. But it&rsquo;s the actual decision architecture for MEL (monitoring, evaluation, and learning). It&rsquo;s what the reach trap leaves out.
        </P>

        <H2>One spine, three decisions</H2>
        <P>
          The reason this is worth building once is that the same spine
          serves three different seats without being rebuilt. The
          vocabulary changes; the architecture does not. A{" "}
          <B>program officer</B> reads a single grantee’s row and asks
          whether it is working. The spine gives them the leading signal
          before the post-mortem, not just the status the CRM already
          showed. A <B>portfolio manager</B> reads down the whole column
          and asks where the next dollar goes; comparability lets that
          view resolve into invest, scale, or stop instead of collapsing
          to a single green number. A <B>CSR lead</B> in India reads the
          same structure board-facing, against Schedule VII and the
          two-percent mandate, and asks whether to renew, scale, or exit.
          Their ERP already gives them spend and compliance. The spine
          gives them the impact half that spend alone can never defend.
        </P>
        <P>
          Three readers, three questions, one record shape. That is the
          whole argument for treating the spine as architecture rather
          than a report: you build it once and it pays out at every
          altitude.
        </P>

        <H2>Where to start</H2>
        <P>
          You do not start by ripping out the CRM. You start by admitting it&rsquo;s a system of record for activity and will never be more. Then you build the small second system beside it. Name the four-point scale before you argue about metrics. Write down the semantic layer — the mapping from each grantee&rsquo;s language to the scale — because that is the part everyone wants to skip and the part that makes the rest work. Fix the three or four columns that will be identical for every grantee, forever. That is a spine. It is less software than people fear and more discipline than they hope. But it&rsquo;s the difference between a stack that hands you reach and a system that hands you decisions.
        </P>
        <P>
          <I>
            Reach is a number. The decision is the system you architect
            around it. Analytic Bytes helps funders, portfolios, and CSR
            teams build that evidence spine — the rubric, the semantic
            layer, and the shared record shape — and move from
            fragmented to decision-ready.
          </I>
        </P>

        <SeeAlso>
          <SeeAlsoItem
            slug="what-is-this-system-measuring"
            title="What is this system measuring?"
            gloss="The construct question underneath every rubric."
          />
          <SeeAlsoItem
            slug="actions-not-answers"
            title="Actions, not answers."
            gloss="Why the output of measurement is a decision, not a number."
          />
          <SeeAlsoItem
            slug="the-contracts-between-systems"
            title="The Contracts Between Systems"
            gloss="Comparability as a governance feature, not a storage feature."
          />
          <SeeAlsoItem
            slug="where-should-data-sit"
            title="Where Should Data Sit?"
            gloss="Which seat has standing to authorize the second system."
          />
          <SeeAlsoItem
            slug="numbers-dont-agree"
            title="When the numbers don’t agree."
            gloss="What happens when forty grantees report in forty shapes."
          />
        </SeeAlso>

        <MetaNote>
          Written July 2026 for the Analytic Bytes Library. A field note
          on the category error underneath most MEL stacks — the CRM as
          system of record for activity, and the evidence spine as the
          separate, deliberately-built system of record for outcomes.
        </MetaNote>
      </>
    ),
  },

  // ===================================================================
  // ESSAY 09 — Why the rules look weird (reclassified from FN10, 2026-07-04)
  // ===================================================================
  {
    kind: "essay",
    slug: "why-the-rules-look-weird",
    number: "09",
    title: "Why the rules look weird",
    subtitle:
      "What sports rules teach about preventing predictable failure in any decision system.",
    date: "2026-07-06",
    readingTime: "10 min read",
    summary:
      "Most rules in a system describe normal behavior. The handful that look weird — that interrupt, that constrain, that pre-resolve a specific exploit — are the rules doing the structural work. Five sports rules, five structural lessons for institutional design.",
    cover: "/library/covers/why-the-rules-look-weird.svg",
    arc: "data-foundations",
    body: (
      <>
        <Brief>
          <p>
          Most rule books in any organization read like a description of normal behavior. Show up on time, document the decision, get the approval, follow the policy. They are the rules that explain how to do the thing. They are necessary. They are not the rules that decide whether the institution holds together under pressure.
        </p>
          <p>
          The interesting rules are the others. The ones that look weird at first reading. The ones a new player has to have explained twice. The ones that seem to interrupt the flow of the game rather than describe it. Those are the rules doing the structural work. Once you start noticing them, you see the same problem inside every institution.
        </p>
        </Brief>

        <P>
          The most important systems are not designed to optimize performance. They are designed to prevent predictable failure. Most rules in those systems describe the normal case. The handful that do not — that interrupt, constrain, or pre-resolve a specific exploit — are the rules doing the real integrity work. Sports rules are the cleanest place to see this discipline. The system is visible, the failure modes have been observed at scale, and the rule book has been pressure-tested for decades under conditions as adversarial as any rule book faces.
        </P>
        <P>Five rules. Five structural lessons.</P>

        <H2>The Infield Fly Rule</H2>
        <P>
          Baseball. With runners on first and second, or bases loaded, and
          fewer than two outs, the batter hits a fair fly ball that an
          infielder can catch with ordinary effort. The umpire calls the
          batter out immediately — whether or not the fielder catches the
          ball. Almost every new fan finds this rule confusing. It exists
          because without it, an infielder could intentionally drop the
          ball, force the runners into uncertainty about whether to
          advance, and convert one out into a double play the offense had
          no defense against. The rule does not describe normal play. It
          pre-resolves a known asymmetry that would otherwise reward an
          intentional drop.
        </P>
        <P>
          That move (pre-resolving an exploit before it can be exploited) is the most underused discipline in institutional design. Every governance document I have read at scale describes what people should do. Almost none of them name the specific exploits the structure would otherwise reward, and pre-resolve them. The Infield Fly Rule is what a rule book looks like when someone actually asked what the rules are for — closing the loopholes the obvious would otherwise create.
        </P>

        <H2>The Free Guard Zone</H2>
        <P>
          Curling. For the first five rocks of every end, no stone in the
          free guard zone (the area between the hog line and the tee line,
          excluding the house) can be removed from play. The rule arrived
          in the 1990s after every team converged on the same strategy:
          take out, take out, take out. It has been widened since. The current five-rock version has been in force in international play since the 2018&ndash;19 season. The dominant strategy
          worked. It also collapsed the game &mdash; low scores, sterile
          play. The rule was added not to tell players what to do, but to
          prevent rational optimization from destroying the thing the game
          was built to be.
        </P>
        <P>
          This is <a
            href="https://en.wikipedia.org/wiki/Goodhart%27s_law"
            target="_blank"
            rel="noopener noreferrer"
            className="text-accent hover:text-accent-2 no-underline border-b border-line-2 hover:border-accent pb-px"
          >
            Goodhart&rsquo;s Law
          </a> built into the rules, not just cited as a warning. (Originally Charles Goodhart&rsquo;s 1975 observation that statistical regularities collapse once they are targeted for policy, popularly reformulated by Marilyn Strathern in 1997 as <I>“when a measure becomes a target, it ceases to be a good measure.”</I>) Every metric eventually gets gamed. Every KPI eventually rewards the behavior that hits the number rather than the behavior the number was meant to encourage. Every growth-at-all-costs strategy eventually hollows the product. The discipline isn&rsquo;t asking whether the metric will get gamed — it will. The discipline is writing the rule that stops the gaming from destroying what the metric was meant to measure. A funder whose impact metric inadvertently rewards risk-averse program design needs the Free Guard Zone equivalent: the rule that prevents the rational pursuit of the metric from killing what the metric was meant to encourage. Almost no funder has that rule written down.
        </P>
        <P>
          Measurement scientists have a name for the pattern the Free Guard Zone was written to prevent: <B>construct-irrelevant strategies</B> — responses that hit the score without demonstrating the thing the score was built to measure. <a href="https://en.wikipedia.org/wiki/Samuel_Messick" target="_blank" rel="noopener" className="text-accent hover:text-accent-2 no-underline border-b border-line-2 hover:border-accent pb-px">Samuel Messick</a> built the modern validity framework around exactly this failure mode. The AI benchmark community has been rediscovering it under other names — reward hacking, specification gaming, Goodhart taxonomy — as models learn to score high on evaluations without learning the underlying skill. Same problem, different domain. That&rsquo;s why the weird rule has to be written before the metric ships.
        </P>

        <H2>Soccer Offside</H2>
        <P>
          A player is offside if they are in the opposing team&rsquo;s half
          AND closer to the opposing goal line than both the ball and the
          second-to-last defender when their teammate plays the ball.
          Generations of new fans have asked: why is this a rule? The
          answer is that without it, the optimal strategy is to camp a
          fast striker near the opposing goal and play long balls over the
          top. The midfield empties. The game shrinks to two penalty
          boxes with a void between them. The structure of the game
          disappears in pursuit of the most efficient way to score.
        </P>
        <P>
          Offside preserves the distributed structure of the game. It
          forces play through the midfield. It rewards the coordinated
          movement that is the game. The institutional parallel is direct:
          organizations that do not have rules preventing the cherry-pick
          (the function that bypasses the structure because it can, the
          team that goes around the process because it is faster)
          eventually discover that the structure has dissolved. The rule
          that prevents cherry-picking is not a rule about how to play. It
          is a rule about preserving the playing field. Every
          cross-functional process I have watched fail, has failed because
          the rule that protected the structure was not written. The
          cherry-pickers won, and the field collapsed.
        </P>

        <H2>The Advantage Rule</H2>
        <P>
          Soccer and rugby. When a foul occurs, the referee can choose not
          to enforce it if enforcing it would penalize the team that was
          fouled — if, for example, the fouled team is in the middle of a
          promising attacking move that a free kick would interrupt. The
          rule exists because rigid enforcement of process compliance can
          defeat the purpose of the process. The fouled team is the team
          the rule was written to protect; enforcing the foul would punish
          them. The referee has the authority to say: not now.
        </P>
        <P>
          The AB audience runs into this rule constantly. Foundations
          enforce reporting requirements that consume the program
          officer&rsquo;s
          week and prevent the program officer from doing the work the
          reporting was meant to evidence. Healthcare networks enforce
          documentation rituals that pull clinicians away from the
          clinical work the documentation was meant to track. Schools
          enforce compliance audits that consume the principal&rsquo;s
          bandwidth and prevent the principal from supporting the teachers
          the audit was meant to evaluate. The Advantage Rule names the
          discipline that resolves this: process compliance is not the
          same as serving the mission. The referee&rsquo;s authority to
          wave off the foul, when enforcing it would defeat the
          foul&rsquo;s purpose, is what keeps the institution serving its
          mission rather than its bureaucracy. Most institutions do not
          have this rule written down. The senior people who run the
          institution apply it informally (the program officer who quietly
          skips a step that would derail a grantee, the dean who lets a
          faculty member miss a deadline that would damage the research),
          and the system depends on their discretion to function. The rule
          that names that discretion, and gives the operator formal
          authority to use it without breaking the rules, is one of the
          most useful rules an institution can have. Almost no
          institution has it.
        </P>

        <H2>The Baton Exchange Zone</H2>
        <P>
          Track and field, the 4&times;100 relay. Runners must complete the
          baton handoff within a 30-meter exchange zone. The fastest team
          does not win. The team with the cleanest handoffs wins. The
          interface (the place where one runner meets the next) is where
          the race is decided. A team with four world-record-holding
          individual sprinters and a sloppy handoff loses to a team with
          four ordinary runners and a clean one. The rule structures the
          interface and makes the interface itself the locus of
          accountability.
        </P>
        <P>
          Every organizational failure I have watched up close has happened at an interface. The handoff between admissions and financial aid. The handoff between the clinician and the population-health analyst. The handoff between the program team and the impact-reporting team. The handoff between the data engineer and the governance committee. The work inside each function is rarely the problem. The handoff between them almost always is. The Baton Exchange Zone says: name the interface, structure it, and put accountability there. Most institutional process maps show the boxes. They do not show the handoffs. The rule book that shows the handoffs, and gives each one its own zone and its own rules, is the one that wins races.
        </P>

        <H2>Five structural lessons</H2>
        <P>
          Those are the five rules, and none of them describes normal
          play.
        </P>
        <P>
          The rules that matter most in any <InternalLink slug="the-decision-system">decision system</InternalLink> are not the
          ones that tell people what to do. They are the ones that prevent
          optimization from destroying the thing the system was built to
          preserve. The Infield Fly Rule pre-resolves an exploit. The Free
          Guard Zone prevents convergent over-optimization. Offside
          preserves distributed structure. The Advantage Rule defends the
          mission against process. The Baton Exchange Zone structures the
          interface.
        </P>

        <H2>Behavioral rules &mdash; the clarification</H2>
        <P>
          One clarification, so this doesn&rsquo;t land wrong. Behavioral
          rules (the ones that tell people what to do inside their
          function) are not optional. A relay team that cannot run does
          not win because the handoff was clean. A funder whose program
          officers cannot write coherent goals does not get rescued by a
          Free Guard Zone equivalent. Behavioral rules are the baseline;
          they have to be in place and executed for the structural rules
          to matter at all. This essay is about the layer above that
          baseline &mdash; the rules that govern what happens between
          functions, and that pre-resolve the exploits behavioral
          compliance alone cannot prevent. Most institutions have the
          behavioral layer; what they typically lack is the structural
          layer. The argument is for both, with attention to the half
          that is usually missing.
        </P>

        <H2>The rule book that works</H2>
        <P>
          Every institution has these rules implicit somewhere. Most do
          not have them written. The board policies describe how to make
          decisions; rarely do they pre-resolve the exploits the structure
          would otherwise reward. The strategy documents describe how to
          grow; rarely do they name the rule that prevents the growth
          metric from hollowing the product. The org charts describe the
          functions; rarely do they show the interfaces between functions,
          where the actual accountability has to live. The compliance
          frameworks describe the requirements; rarely do they include the
          operator&rsquo;s authority to wave them off when they would
          defeat their own purpose.
        </P>
        <P>
          When a leader asks me what they should be writing down that their predecessors did not, this is the answer. Not more policies for the normal case. The weird-looking rules — the ones that pre-resolve exploits, prevent optimization collapse, preserve distributed structure, protect the mission from process, and make interfaces themselves accountable. Those rules will not look like a strategy document. They will look like a baseball umpire calling a batter out for a ball that was never caught. That is what working governance looks like up close.
        </P>
        <P>
          One corollary.{" "}
          <a
            href="https://en.wikipedia.org/wiki/Chesterton%27s_fence"
            target="_blank"
            rel="noopener"
            className="text-accent hover:text-accent-2 no-underline border-b border-line-2 hover:border-accent pb-px"
          >
            G. K. Chesterton
          </a>{" "}
          put it as a heuristic a century ago: never remove a fence until you know why it was put there.
          The rule that looks weird is probably the one holding the game
          together. If you cannot say what predictable failure it was
          written to prevent, the safest assumption is that someone
          before you could &mdash; and that removing it will reveal, at
          cost, the exploit the rule was there to close.
        </P>
        <P>
          The most important systems are not designed to optimize
          performance. They are designed to prevent predictable failure.
          The rules that do that work look weird at first reading, and
          they are doing the job.
        </P>

        <SeeAlso>
          <SeeAlsoItem
            slug="functions-dont-run-plays"
            title="Functions don’t run plays."
            gloss="The structural forms that carry cross-functional work — and the seam contract underneath them."
          />
          <SeeAlsoItem
            slug="blown-assignment"
            title="It’s not a communication issue. It’s a blown assignment."
            gloss="The play as the unit of cross-functional work, and the rule that governs the handoff."
          />
          <SeeAlsoItem
            slug="the-contracts-between-systems"
            title="The Contracts Between Systems"
            gloss="The seam contract at the system-to-system layer — a structural rule made explicit."
          />
          <SeeAlsoItem
            slug="where-should-data-sit"
            title="Where Should Data Sit?"
            gloss="Which seat has the standing to write and enforce the structural rules."
          />
        </SeeAlso>

        <MetaNote>
          Written July 2026 for the Analytic Bytes Library. The five rules
          are drawn from baseball, curling, soccer, rugby, and track and
          field; the institutional parallels reflect patterns observed
          across higher education, foundations, healthcare, and
          mission-driven organizations. Goodhart&rsquo;s Law is included
          as the closest available warning about the pattern the Free
          Guard Zone was written to prevent.
        </MetaNote>
      </>
    ),
  },

  // ===================================================================
  // ESSAY 08 — The Decision System
  // ===================================================================
  {
    kind: "essay",
    slug: "the-decision-system",
    number: "08",
    title: "The Decision System",
    subtitle:
      "The Analytic Bytes framework for turning fragmented data into institutional action.",
    date: "2026-07-01",
    readingTime: "13 min read",
    summary:
      "Most “data problems” are decision-system problems. Three things fail at the faucet — meaning, authority, and validity — and detach any one from the other two and the system produces confident nonsense at speed. This is the umbrella framework that unifies the Analytic Bytes library.",
    cover: "/library/covers/the-decision-system.svg",
    arc: "integration-governance",
    hidden: false,
    body: (
      <>
        <Brief>
          <p>
          Somewhere right now, a flag is firing. A ninth grader has crossed a threshold. The system has labeled her <I>at risk</I>: off track for graduation, the early-warning indicator lit red on a screen. The data is clean enough. The model looks accurate. The dashboard is beautiful.
        </p>
          <p>
            And nothing happens.
          </p>
          <p>
            It isn&rsquo;t because anyone is negligent. It&rsquo;s because
            the flag is the easy part. The flag traveled from a student
            information system to a screen. Then it stopped. Nobody was
            assigned to close the gap between <I>knowing</I> and{" "}
            <I>acting</I>. The counselor assumed the teacher saw it. The
            teacher assumed the intervention team owned it. The intervention
            team never received it at a resolution they could act on. The
            signal was real. The system around it was missing.
          </p>
          <p>
            The Analytic Bytes library has one central claim:{" "}
            <B>most “data problems” are decision-system problems.</B> When
            numbers disagree, when insights don’t change anything, when a
            new dashboard lands and the meeting runs the same way it did
            before — the instinct is to reach for more analysis. More
            analysis is rarely what’s missing. What’s missing is the
            architecture between the analysis and the act.
          </p>
        </Brief>

        <P>
          A dashboard is an artifact. A decision system is what makes that artifact useful: a canonical definition for every measure, surfaces built backward from the recurring calls people actually make, and a distribution that keeps working after the people who built it leave. The flag is not the system. The system is everything that has to be true for the flag to reach someone authorized to act on it, measuring something real, in time to matter.
        </P>

        <P>
          We&rsquo;ll follow that flag (the at-risk / early-warning indicator) through the whole framework. Notice early that the pattern travels. The same decision-system shape shows up as a behavioral-health team&rsquo;s relapse-risk score, a hospital&rsquo;s deterioration alert, a funder&rsquo;s off-track grantee. These aren&rsquo;t structurally identical. The stakes, the data behind them, the right to intervene, and the cost of being wrong all differ. But the shape keeps showing up, and that&rsquo;s why one framework is worth writing.
        </P>

        <H2>Pipes and the faucet</H2>

        <P>
          Let’s start with what’s already solved. Moving data, storing it,
          transforming it at scale (the plumbing) is, for a growing number
          of institutions, increasingly tractable with mature tools.{" "}
          <InternalLink slug="plumbing-got-upgraded-water-didnt">
            The pipes got upgraded.
          </InternalLink>{" "}
          Warehouses are cheap, pipelines are decent, the bytes arrive.
        </P>

        <P>
          The water didn’t get better. What comes out of the faucet (the{" "}
          <I>resolution</I> of the signal, the <I>authority</I> to act on
          it, the <I>meaning</I> it carries) is still mostly ungoverned.{" "}
          <B>Data governance manages the pipe</B>: who can access a table,
          how a field is typed. <B>Decision governance manages the
          faucet</B>: who is allowed to act on what comes out, at what
          resolution, on what cadence. The first is, for many institutions,
          increasingly an engineering problem with engineering answers.
          The second is an architecture problem, and it is mostly still in
          front of us.
        </P>

        <P>
          Three things fail at the faucet, and the rest of this essay is
          about them: <B>meaning, authority, and validity.</B> They are
          not a checklist; they hold one another up. Meaning makes the
          institution internally consistent. Authority decides who acts on
          that consistent signal, and when. Validity asks whether the
          consistent thing is true enough to be worth acting on at all.
          Detach any one from the other two and the system doesn’t
          degrade gracefully — it produces confident nonsense at speed.
          Get all three right and the flag becomes a decision. Miss any
          one and you have a very expensive way of producing a red dot.
        </P>

        <Figure
          src="/library/figures/decision_system_three_anchors_figure.svg"
          alt="The Decision System: three anchors — meaning, authority, validity — that must all hold together"
          caption="The three anchors form the triangle of a decision system — meaning, authority, and validity have to hold together whether the system is human, shared human-AI, or fully AI-driven."
        />

        <H2>Meaning: define it once</H2>

        <P>
          Our flag depends on words. <I>Attendance. On-track.
          Proficient.</I> Every one of them is a definition, and every
          definition is a place where the institution can quietly
          disagree with itself.
        </P>

        <P>
          <InternalLink slug="numbers-dont-agree">
            Numbers don’t disagree because the math is wrong. Numbers
            disagree because the words do.
          </InternalLink>{" "}
          Ask two schools what “chronic absenteeism” means and you’ll get
          two answers — does <I>present but two hours late</I> count?{" "}
          <I>Remote</I>? And the sharpest case of all: a student is
          suspended, and somewhere a staff member codes that day as{" "}
          <I>present</I> rather than <I>absent</I>. No engineer touched
          the pipeline. The definition drifted at the source, at the point
          of capture, in a single keystroke. Now the flag that depends on
          it means something different in one building than in the next.
        </P>

        <P>
          The fix is structural, not a directive. You build a <B><ArtifactLink slug="decision-system-reference-architecture">semantic keystone</ArtifactLink></B>: a single layer, governed in code, where every metric is defined once. <I>On-track</I> is computed in one place, and every surface (the teacher&rsquo;s console, the school&rsquo;s program report, the district&rsquo;s executive view, and every AI feature downstream) reads from that one computation. There&rsquo;s no <I>sanctioned</I> second definition for the number to drift toward. The slow, unglamorous work that makes this real is <B><InternalLink slug="numbers-dont-agree">definitional reconciliation</InternalLink></B>: getting the registrar and the dean, or the program officer and the grantee, to commit to the same canonical meaning before anyone builds a chart on top of it. It&rsquo;s tedious. It&rsquo;s also the foundation.
        </P>

        <P>
          For our ninth grader, this is the difference between <I>at risk</I> meaning the same thing in her building as in the one across town. But notice the limit of what reconciliation buys you: it makes the number consistent. Consistent isn&rsquo;t the same as correct. A definition everyone agrees on can still point at the wrong thing. Hold that thought — it&rsquo;s the third layer.
        </P>

        <H2>Authority: who acts, and when</H2>

        <P>
          Now the flag means one thing. So who acts on it?
        </P>

        <P>
          The most common failure in an early-warning system isn&rsquo;t a
          bad model. It&rsquo;s a{" "}
          <B>
            <InternalLink slug="blown-assignment">blown assignment</InternalLink>
          </B>{" "}
          — nobody named to receive the signal. This is a seam problem: the
          failure lives in the handoff between specialists, not inside any
          one of them. The cleanest sprinter on the team loses the race if
          the baton hits the ground.
        </P>

        <P>
          The instrument that fixes it is a <B><ArtifactLink slug="contract-at-the-seam">seam contract</ArtifactLink></B>: an explicit, written understanding (operational, not legal) of <I>who acts on a signal, with what authority, on what cadence, and at what resolution.</I> It turns integrated bytes into decision-ready intelligence by naming an owner for the recurring call. And because the call is recurring, the surfaces serve it directly: the teacher gets a progress-monitoring console tuned to <I>this week&rsquo;s</I> action, the principal gets a program report, the superintendent gets the portfolio view. <InternalLink slug="three-surfaces-one-keystone">
            Three surfaces, one keystone underneath.
          </InternalLink>
        </P>

        <P>
          For any of this to stick, the function needs traction, and traction is a property of the <I>seat</I>. It belongs with the seat that holds legitimate cross-functional authority (often the COO, sometimes a Chief Impact Officer or equivalent integrator, in a smaller shop the CEO). But not <InternalLink slug="where-should-data-sit">
            inside a single technical or financial function by default
          </InternalLink>. Those functions bend the data toward their own incentives — uptime, or cost — not the cross-functional meaning a dean or clinical director needs. For our ninth grader, the seam contract is the difference between a flag that lands on a named counselor by Tuesday and a flag that everyone could see and no one owned.
        </P>

        <P>
          This is where the support systems live and the framework stops
          being linear. Once the flag fires and an owner acts, the
          response is an intervention: in a school, often a tier of
          support. But the support a student does or doesn’t receive
          becomes an <I>input</I> to the next risk signal.{" "}
          <B>The factors are connected.</B> The same variables
          (attendance, engagement, prior support, history) that predict
          academic risk are the evidence spine a funder uses to judge a
          program and the risk factors a behavioral-health team watches.
          A signal in one decision is a predictor in the next.
        </P>

        <P>
          The recursion is the reason the three layers can&rsquo;t run
          independently. A decision system isn&rsquo;t a pipeline that ends
          at an action. The action becomes part of the data that trains the
          next signal. A drifting definition doesn&rsquo;t just produce one
          bad number. It trains the next model on that drift, and the error
          compounds. What that does to validity is the next section.
        </P>

        <H2>Validity: canonical is not the same as true</H2>

        <P>
          Suppose you’ve done everything right. The flag means one thing.
          An owner acts on it on a known cadence. Every surface agrees.
        </P>

        <P>The flag can still be measuring the wrong thing.</P>

        <P>
          This is the hardest layer, and the one institutions skip.{" "}
          <B>
            <InternalLink slug="what-is-this-system-measuring">Construct validity</InternalLink>
          </B>{" "}
          asks a question the dashboard can never answer: is the system
          measuring the <I>trait it claims to</I> (academic risk,
          wellbeing, quality), or merely a surface proxy that correlates
          with it? Train an “at-risk” model on enough history and it will
          learn to predict the proxy: the zip code, the demographic
          pattern, the prior-discipline record. It will be accurate. It
          will also be measuring the wrong student.
        </P>

        <P>
          The unfairness is real, but it isn&rsquo;t the biggest cost.
          The bigger cost is that the institution now misallocates at
          scale — pouring intervention dollars at a proxy while the
          actual construct goes unseen: the student who is slipping
          but doesn&rsquo;t match the historical pattern. You can
          defund a program that works and miss a cohort that needs
          you, both at once, with a perfectly accurate model.
        </P>

        <P>
          And recursion makes this worse, not better. Once an
          intervention becomes a predictor, the model can no longer
          cleanly separate <I>risk</I> from <I>service received</I> from{" "}
          <I>institutional attention</I>. The student who finally got
          help looks “high-risk” in next year’s data because the system
          finally started watching her; the student no one ever served
          quietly disappears from what the model learns. Left alone, the
          system learns its own past behavior and calls it prediction.
        </P>

        <P>
          The failure has a shape, and the shape travels. A behavioral-health risk model trained on prior service utilization doesn&rsquo;t predict who is <I>at risk</I>; it predicts <I>who the system has already served</I>. Different sector, same mistake: accuracy against a proxy, mistaken for measurement of the construct. When the same error shows up in a school and a clinic, it isn&rsquo;t a domain quirk. It&rsquo;s a recurring failure mode, and the framework is what lets you name it before it ships.
        </P>

        <P>
          Two disciplines guard this layer. The first is refusing the rolled-up average. A single number (the graduation rate, the program&rsquo;s headline outcome) can hide opposing trends underneath it: a falling overall rate that masks a <I>rising</I> rate in one subgroup, the average quietly erasing the very contrast the decision rests on. <B><InternalLink slug="burden-disparity-and-the-next-dollar">Burden and disparity are different signals</InternalLink></B>, and only disaggregation makes the resource choice explicit and honest: where the next dollar goes. The second discipline is asking what the measure is <I>for</I>: <B><InternalLink slug="actions-not-answers">decision utility</InternalLink></B> weighs the expected cost and benefit of the specific action, not just the statistical accuracy of the score. A validated flag that triggers no useful act is a validated waste.
        </P>

        <P>
          For our ninth grader, validity is the question no dashboard
          asked: was the flag measuring her academic risk, or was it
          measuring her zip code with her name on it?
        </P>

        <H2>The stress test: agentic AI</H2>

        <P>
          Until recently, most decision systems still kept a human pause somewhere in the chain — someone read the report, interpreted the flag, judged it before anything happened. That pause was rarely designed on purpose. It was just there — a safeguard the institution never had to pay for.
        </P>

        <P>
          Agentic AI weakens that default. The unit of work shifts from{" "}
          <B>answers</B> (which a human reads) to <B>actions</B> (which
          an agent takes). In an agentic workflow the flag may no longer
          wait to be read; it enrolls the student, escalates the case,
          moves the resource. And every weakness we just walked through
          (a drifting definition, a missing owner, a proxy mistaken for
          a construct, a recursion no one is watching) now executes at
          machine speed, without the pause that used to catch it.
        </P>

        <P>
          The fix isn&rsquo;t a new procurement rubric. An autonomous agent is a specialist that moves faster than you can read. Specialists need <InternalLink slug="the-contracts-between-systems">
            seam contracts
          </InternalLink>. The agent&rsquo;s contract has to make four things explicit that a human&rsquo;s could leave implicit. An <B>autonomy range</B> — how much it may do unsupervised, from <I>return only verified responses</I> to <I>act review-by-exception</I>, set by the stakes of the decision, not the cleverness of the model. A <B>reversibility envelope</B> — how and when its action can be undone, and who is told when a record someone already acted on gets corrected. <B>A named human owner</B> who answers for what it does. And a <B>consumption contract</B>, so metered spend lands on the department that generated it. And like every other reader, the agent reads through the same semantic keystone — because <InternalLink slug="grounding-the-ai-layer">
            an AI ungrounded in canonical definitions will cheerfully
            invent metric names and answer questions no one can reconcile
          </InternalLink>.
        </P>

        <P>
          AI doesn&rsquo;t add new requirements. It removes the slack that
          let institutions skip the old ones. Meaning, authority, and
          validity were always central. Agentic systems are the first thing
          heavy enough to make a hollow architecture fall down.
        </P>

        <H2>Design the rules for the failure mode</H2>

        <P>
          The best institutional rules aren&rsquo;t written to describe normal play; they&rsquo;re written to prevent predictable failure. Goodhart&rsquo;s law (<I>a measure that becomes a target stops being a good measure</I>) isn&rsquo;t a slogan for a poster. It&rsquo;s a design constraint. If a measure will be gamed, the system has to protect the construct before someone hollows it out by chasing the proxy. That&rsquo;s a whole essay of its own — see <a href="/library/why-the-rules-look-weird" target="_blank" rel="noopener" className="text-accent hover:text-accent-2 no-underline border-b border-line-2 hover:border-accent pb-px"><InternalLink slug="why-the-rules-look-weird">
            Why the rules look weird
          </InternalLink></a>. For the decision-system, the corollary is simple: write the weird rule first.
        </P>

        <P>
          There&rsquo;s a payoff worth naming, and a temptation worth refusing. The marginal cost of storing and processing data has collapsed; the cost of making it <I>mean</I> something has not. That collapse tempts institutions toward a fantasy of total visibility: seeing each person <I>whole</I>. They can&rsquo;t, and shouldn&rsquo;t pretend to. The real move is smaller and harder: stop mistaking the fragment you measure for the person in front of you. For years a student showed up in our systems as a postage stamp: a score, a category, an enrollment number. The point of the architecture isn&rsquo;t to replace that thumbnail with a full portrait. It&rsquo;s to keep the institution honest about how little of her it sees, and to make that partial view legible to a decision instead of merely stored.
        </P>

        <H2>What the system is for</H2>

        <Figure
          src="/library/figures/decision-system-flag-vs-system.svg"
          alt="Left: a grid of red, yellow, and green flag dots on a dashboard — the flag wall — captioned 'Nothing happens. The flag was the easy part.' An arrow labeled SYSTEM crosses to the right, where a triangle of navy circles labeled MEANING, AUTHORITY, VALIDITY sits around a teal DECISION dot at the center. The caption reads 'A decision happens. The system is the work.'"
          caption="The flag was always the easy part. What turns a wall of red, yellow, and green flags into a decision is the system around it: meaning, authority, and validity holding each other up."
        />

        <P>
          A decision system is meaning, authority, and validity, holding
          each other up: a single canonical definition, a named owner
          for every recurring call, and a measure that tracks the real
          construct — stress-tested by AI and governed by rules built
          for the failure mode rather than the demo.
        </P>

        <P>
          The aim was never a better dashboard. It’s an architecture
          that turns fragmented bytes into institutional action and
          keeps doing it after the people who built it have moved on.
        </P>

        <P>
          Go back to the ninth grader. The flag didn’t save her; flags
          never do. The system did — <I>if</I> the definition held, so{" "}
          <I>at risk</I> meant the same thing in every building;{" "}
          <I>if</I> a named counselor owned the signal by Tuesday
          instead of admiring it on a screen; <I>if</I> the measure was
          tested, so it found <I>her</I> and not her zip code; and{" "}
          <I>if</I> the support she received fed back into the data as{" "}
          <I>help given</I>, not as fresh evidence that she was the
          problem. That last clause is the one most systems miss, and
          it’s why the layers have to hold together rather than take
          turns.
        </P>

        <P>The flag was always the easy part. The system is the work.</P>

        <SeeAlso>
          <SeeAlsoItem
            slug="plumbing-got-upgraded-water-didnt"
            title="Plumbing got upgraded. The water didn’t."
            gloss="Data governance manages the pipe; decision governance manages the faucet."
          />
          <SeeAlsoItem
            slug="numbers-dont-agree"
            title="The numbers don’t agree because the words don’t"
            gloss="Definitional reconciliation is the foundation of the meaning layer."
          />
          <SeeAlsoItem
            slug="the-contracts-between-systems"
            title="The contracts between systems"
            gloss="The seam contract, extended: who acts on the signal, on what cadence, with what authority."
          />
          <SeeAlsoItem
            slug="what-is-this-system-measuring"
            title="What is this system actually measuring?"
            gloss="Construct validity — canonical is not the same as true."
          />
          <SeeAlsoItem
            slug="actions-not-answers"
            title="Actions, not answers"
            gloss="Decision utility over statistical accuracy: a validated flag that triggers no useful act is a validated waste."
          />
          <SeeAlsoItem
            slug="three-surfaces-one-keystone"
            title="Three surfaces, one keystone"
            gloss="One canonical definition, surfaces built backward from the recurring call."
          />
        </SeeAlso>

        <MetaNote>
          This essay was written in July 2026 for the Analytic Bytes
          Library. It is the umbrella framework the rest of the library
          sits under: meaning, authority, and validity as the three
          faucet-layer failures, stress-tested by agentic AI. The
          ninth-grade early-warning flag is a composite drawn from the
          author’s practice across K–8 charter networks, a
          youth-mental-health foundation, a regional behavioral-health
          agency, a DC public charter school context, and Andhra Pradesh
          state systems. Organizational details are abstracted where
          appropriate.
        </MetaNote>
      </>
    ),
  },

  // ===================================================================
  // ESSAY 14 — The valid dollar
  // ===================================================================
  {
    kind: "essay",
    slug: "the-valid-dollar",
    number: "14",
    title: "The valid dollar",
    subtitle:
      "A validity gate for Dollars in Pockets and the impact numbers that follow.",
    date: "2026-08-10",
    readingTime: "20 min read",
    summary:
      "A response to Dollars in Pockets, the common-unit impact metric from NextLadder Ventures and GitLab Foundation. The essay argues that a big impact number is not yet a valid number — the argument from the number to the claim it makes needs its own gate. Applies Kane and Messick's validity discipline to score composite ROI figures on the weakest inference link (never the average), and separates the verbs a number earns (supports, contributed to, produced) by the strength of the counterfactual behind it. Closes by proposing that a fund publish per-pathway warrant beside the composite: a common unit makes dollars comparable, not the evidence behind them. Written in the same spirit as the Dollars in Pockets authors' own invitation to apply the measure to the field's work.",
    cover: "/library/covers/the-valid-dollar.svg",
    arc: "measurement",
    body: (
      <>
        <P>
          <I>A response to <B><a href="https://www.gitlabfoundation.org/our-journey/dollars-in-pockets" target="_blank" rel="noopener" className="text-accent hover:text-accent-2 no-underline border-b border-line-2 hover:border-accent pb-px">&ldquo;Dollars in Pockets: A New Way to Measure What Matters&rdquo;</a></B> &mdash; NextLadder Ventures &amp; GitLab Foundation, July 2026.</I>
        </P>

        <Brief>
          <p>
            NextLadder Ventures and GitLab Foundation just handed the economic-mobility field something it long lacked: a common unit. Dollars in Pockets converts wages gained, fees avoided, time saved, benefits accessed, and savings built into one comparable figure &mdash; the way global health built the DALY to compare a vaccine against a surgery. That is real progress and it earns its place. It also surfaces a sharper question, the one that arrives the moment the number is on the table: does the argument from that number to <I>&ldquo;our capital produced this&rdquo;</I> hold? A magnitude tells you how big a claim is. It does not tell you whether the claim is sound. This note is about that difference, and about the small discipline that closes it.
          </p>
        </Brief>

        <H2>Getting to a common unit was the hard part</H2>
        <P>
          For years the economic-mobility field measured in units that don&rsquo;t convert. The authors&rsquo; own diagnosis is the right one: a venture return describes what comes back to the investor, and a philanthropic report describes how many people an intervention touched. Neither answers the question a funder is holding: did this do more good per dollar than the alternative? Neither lets you weigh a legal-aid tool against a benefits app against a jobs platform. The evidence was rich and stubbornly incomparable.
        </P>
        <P>
          It was not for lack of trying, and the authors are careful to say so: they credit a lineage that includes the Robin Hood Foundation, Bridgespan, and TPG&rsquo;s Y Analytics. Alongside that work the field also carried shared vocabularies: the Global Impact Investing Network (GIIN)&rsquo;s <a href="https://iris.thegiin.org/" target="_blank" rel="noopener" className="text-accent hover:text-accent-2 no-underline border-b border-line-2 hover:border-accent pb-px">IRIS+ catalog</a> of standardized impact metrics, and <a href="https://www.socialvalueint.org/" target="_blank" rel="noopener" className="text-accent hover:text-accent-2 no-underline border-b border-line-2 hover:border-accent pb-px">Social Return on Investment (SROI)</a>&rsquo;s older tradition of monetizing outcomes into a return ratio. But IRIS+ is a menu of indicators, not a single convertible number. And SROI, which does denominate its ratio in currency, leaves the valuation proxies behind that currency to be selected study by study &mdash; so one organization&rsquo;s ratio is rarely comparable to another&rsquo;s. Both got close to comparability and stopped just short of a common unit. That last step is the one Dollars in Pockets takes.
        </P>
        <P>
          The authors draw the analogy themselves, and it is the right analogy. Global health once faced the same problem: vaccines, surgeries, and mental-health care all funded from one budget, with no way to rank them against each other. It answered by building the disability-adjusted life year &mdash; a single unit expressing what a dollar buys in healthy life. Their claim is that money admits the same treatment. Fees avoided, wages earned, and benefits accessed are financially distinct events; denominate them in one unit and they become comparable, and the interventions producing them become comparable with them. That is the move the field needed. It is not a small thing to have made.
        </P>
        <P>
          The analogy holds in a second way, and this part matters more. The DALY did not arrive settled. Building the unit was the first step; the three decades of argument that followed were the second. The disability weight (the number for how bad a given health state is) is elicited from surveys, not measured, and critics have argued the resulting figure has no clear meaning and overstates how much the world agrees (<a href="https://pubmed.ncbi.nlm.nih.gov/23608637/" target="_blank" rel="noopener" className="text-accent hover:text-accent-2 no-underline border-b border-line-2 hover:border-accent pb-px">Nord, 2013</a>). Two of the original parameters, age-weighting and time discounting, were contested for the better part of two decades and then dropped in the <a href="https://www.sciencedirect.com/science/article/abs/pii/S0140673612616808" target="_blank" rel="noopener" className="text-accent hover:text-accent-2 no-underline border-b border-line-2 hover:border-accent pb-px">GBD 2010 revision</a>. That those parameters could later be removed exposed how much of the unit had rested on normative choices made to look like measurement.
        </P>
        <P>
          That is not a mark against the analogy. It is the analogy. Global health built the unit first and did the validity work afterward, slowly, under pressure from people who kept asking what the weights meant. Dollars in Pockets is at the front of that arc. The authors have done the hard part. The long part is still ahead of them, and it is the part this essay is about.
        </P>

        <H2>A magnitude is not a validity</H2>
        <P>
          A common unit raises a question it does not itself answer. Dollars in Pockets tells you <I>how much</I>. It does not tell you <I>how much of it you can stand behind.</I> Those are two different questions, and only the first one usually gets graded.
        </P>
        <P>
          Good arithmetic can sit on a weak inference. Summing is the operation that lets a strong pathway carry a weak one across the finish line, so the total reads healthy while one of its parts does work the evidence cannot support.
        </P>
        <P>
          It matters exactly what the weak part damages. A soft housing-stability estimate does not make a hard fees-avoided estimate any softer, and each pathway keeps whatever standing its own evidence gives it. What the weak part damages is the composite claim &mdash; the sentence a fund says out loud about the whole figure. That sentence asserts every dollar in the total, so it carries only as much weight as the weakest dollar in it. Blending preserves the arithmetic and loses the warrant.
        </P>
        <P>
          And un-audited is a worse place to be the moment the number becomes a target. Goodhart&rsquo;s law is the standing warning: once a fund optimizes toward its Dollars in Pockets ratio, optimization pressure will eventually find the softest pathway &mdash; the very link the composite already hides. A metric that can&rsquo;t show its weakest inference rewards inflating it.
        </P>
        <P>
          The authors have an answer to this, and it is a fair one. They say the ratio is one input among several, weighed alongside team strength, strategic alignment, organizational effectiveness, execution and evidence risk, and expert judgment. I take them at their word. The difficulty is that this is a governance commitment held by the people who built the measure, not a property of the measure itself. Commitments of that kind travel less well than numbers do. Dollars in Pockets is designed to spread (that is the whole point of a common unit), and the funders who adopt it later will inherit the ratio without inheriting the restraint that currently surrounds it. A gate built into the number survives the journey. A norm standing next to the number may not.
        </P>
        <P>
          Take the piece&rsquo;s own worked example, <a href="https://rasa-legal.com/" target="_blank" rel="noopener" className="text-accent hover:text-accent-2 no-underline border-b border-line-2 hover:border-accent pb-px">Rasa Legal</a>, whose tool helps people clear eligible criminal records. The authors assess it across three named pathways: legal fees avoided, wage gains that follow a cleared record, and savings from reduced housing instability. They draw on Rasa&rsquo;s own data and outside research to estimate how often each benefit occurs, compare each against a researched counterfactual, then sum the three and divide by the investment required. No Rasa-specific ratio is published; what is published is the structure. The structure is enough to make the point.
        </P>
        <P>
          Look at the three pathways side by side and they are not equally certain. Fees avoided is close to immediate and direct &mdash; the record is cleared, the fee is not paid. But &ldquo;wage gains that follow a cleared record&rdquo; and &ldquo;savings from more stable housing&rdquo; each depend on a chain of contribution holding: that the clearance causes the job, that the job causes the housing, and that none of it would have happened anyway. Those are the softer links. Sum the three into one figure and the near-certainty of pathway one underwrites the causal reach of pathways two and three. The composite can&rsquo;t tell you which pathway carries the weakest inference. That isn&rsquo;t a flaw in Rasa Legal; it&rsquo;s a property of adding.
        </P>
        <P>
          One caveat, and it matters. The three pathways above are named in the published article, but the complete methodology behind them is not yet public &mdash; the authors say they intend to publish it. So the question this essay raises cannot be settled from outside. Does that methodology already report per-pathway confidence, grading fees-avoided, wage-gain, and housing-stability separately rather than only in the blend? If it does, the point here narrows from &ldquo;the composite hides the weak link&rdquo; to &ldquo;surface that per-pathway confidence next to the headline number, where a reader can see it.&rdquo; Either way the discipline is the same, and the last section of this essay sets out what showing it would look like. The open question is whether it is already being done and simply not shown.
        </P>

        <H2>What Dollars in Pockets already gets right &mdash; and where the gap is</H2>
        <P>
          It would be easy, and wrong, to say the field just needs more rigor. Dollars in Pockets already does most of what a naive critic would demand, and the authors describe the practice in their own words: they &ldquo;mark down optimistic projections, and weight every assumption by the strength of the evidence behind it.&rdquo; Each modelled return is set against a researched counterfactual, and only the difference is counted. After the money moves, the estimate is tested independently &mdash; Opportunity Insights on the venture side, grantee-run measurement and evaluation on the foundation side.
        </P>
        <P>
          Two further choices deserve more credit than a critic would naturally give them. The first is the benchmark. NextLadder sets its ten-to-one target against direct cash transfers, on the reasoning that a dollar handed to someone is a dollar received, and that any more complicated intervention should have to clear that floor. Anchoring to a benchmark that unflattering is the most disciplined single decision in the framework, and it is the opposite of the behavior a skeptic arrives expecting. The second is volume. GitLab Foundation reports having applied the underlying ROI method across more than three hundred pre-investment impact models, and across two hundred grants, with sixty-five early grantees reporting results and two-thirds of those meeting internal return targets. That is an empirical base, not an assertion.
        </P>
        <P>
          The authors also name a limit of their own. Under the heading of what they still cannot measure, they say Dollars in Pockets addresses economic success but not empowerment or dignity, and that they are still building yardsticks for those. That is an honest admission, and it is a different admission from the one this essay is pressing. Theirs is a limit of <B>scope</B>: which parts of a life the unit covers. Mine is a limit of <B>inference</B>: whether the number, inside the scope it already covers, supports the claim being made on it. A measure can have perfect scope and still fail the second test. Widening the unit to include dignity would not close the gap named here; it would give the same inference problem more surface area.
        </P>
        <P>
          The rigor is real. The place these claims break sits one layer down, in the composite itself: all of that rigor still resolves into a single reported magnitude, and contribution (additionality, the &ldquo;would this have happened anyway&rdquo; question) is the one link a blended ratio is built to hide. The rigor went in. The composite let it back out.
        </P>

        <H2>The gate: the weakest link, not the average</H2>
        <P>
          There is a mature field that already solved a version of this &mdash; in testing. For more than thirty years, high-stakes assessment has treated a decision as a chain of inferences to be examined link by link (<a href="https://doi.org/10.1037/0033-2909.112.3.527" target="_blank" rel="noopener" className="text-accent hover:text-accent-2 no-underline border-b border-line-2 hover:border-accent pb-px">Kane, 1992</a>: validation as an argument, with evidence aimed at the weakest assumption), and has insisted that validity is a property of the <I>use</I> of a number, consequences included, not of the number itself (<a href="https://psycnet.apa.org/doi/10.1037/0003-066X.50.9.741" target="_blank" rel="noopener" className="text-accent hover:text-accent-2 no-underline border-b border-line-2 hover:border-accent pb-px">Messick, 1995</a>: unified construct validity). Point that machinery at an impact figure and you get a small, hard discipline. Four questions, in operator language &mdash; a translation of the argument-based approach for impact capital, not Kane&rsquo;s own four inferences restated:
        </P>
        <NumList>
          <NumItem n={1}>
            <B>Measure it right</B> &mdash; is the underlying quantity captured correctly?
          </NumItem>
          <NumItem n={2}>
            <B>Real, not noise</B> &mdash; would it hold up, or is it an artifact of a good month or a favorable sample?
          </NumItem>
          <NumItem n={3}>
            <B>Reflects what matters</B> &mdash; does the thing measured stand in for the outcome we care about?
          </NumItem>
          <NumItem n={4}>
            <B>Ours, not adjacent</B> &mdash; did our capital contribute to the effect, or did it ride alongside something that would have happened anyway?
          </NumItem>
        </NumList>
        <P>
          Magnitude (<I>is the effect big enough to act on</I>) is deliberately not one of the four. It is a policy threshold, set by a fund&rsquo;s own bar for what counts as worth doing. The four ask whether the number means what it says. How large a meaningful number has to be before it justifies capital is a separate decision, and mixing the two lets a fund answer the easy question in place of the hard one.
        </P>
        <P>
          The move that separates this from a maturity score is the scoring rule: the verdict is the <B>minimum</B> of the four, never the average. One red link caps the claim no matter how strong the other three.
        </P>
        <P>
          Kane does not give you that rule, and the borrowing is worth stating plainly. Argument-based validation tells you to aim evidence at the weakest assumption rather than pile it up where it is already strong. It does not prescribe an arithmetic. The minimum is the operating discipline proposed here, and it earns its place from what these four links are: they run in series. A quantity has to be captured correctly before its stability means anything. It has to be stable before construct relevance means anything. All three have to hold before the contribution question is worth asking at all. Break one and the links downstream have nothing to stand on, so averaging lets the intact links pay for the broken one.
        </P>
        <P>
          That series is what makes the minimum the right operator, and it is also what bounds it. The rule applies down a single pathway, where each inference depends on the one before it. It does not license reading one weak pathway as evidence against a strong one sitting beside it. Applied to a Dollars in Pockets figure, the score you report alongside the number is the weakest link behind it, pathway by pathway. Where it caps tells a fund where the next evaluation dollar should go.
        </P>

        <Figure
          src="/library/figures/valid-dollar-weakest-link-not-average.svg"
          alt="Four inference links behind an impact number shown as bars. Three are strong; the fourth — did our capital contribute — is weak. An averaged verdict sits high and reads healthy. The minimum verdict sits down at the weak link. The distance between the two is what a composite figure conceals."
          caption="The score is the weakest link, not the average."
        />

        <P>
          Read the four as a chain rather than a scorecard and the asymmetry becomes obvious. Measurement, reliability, and construct relevance are the links a well-resourced fund is most likely to have handled. Contribution is the one it is least likely to have settled, and it is also the one that has to carry the word <I>produced</I>. Averaging lets the first three pay for the fourth. Taking the minimum refuses that trade.
        </P>
        <P>
          It is worth naming what this is not. The responsible-AI frameworks a fund is likeliest to reach for do not close this gap either. The National Institute of Standards and Technology (NIST)&rsquo;s <a href="https://www.nist.gov/itl/ai-risk-management-framework" target="_blank" rel="noopener" className="text-accent hover:text-accent-2 no-underline border-b border-line-2 hover:border-accent pb-px">AI Risk Management Framework</a> (2023) organizes its work into four functions: govern, map, measure, and manage. The <a href="https://artificialintelligenceact.eu/" target="_blank" rel="noopener" className="text-accent hover:text-accent-2 no-underline border-b border-line-2 hover:border-accent pb-px">EU AI Act</a> (2024) sorts systems into risk tiers and attaches obligations to each tier. Both use the word <I>valid</I> &mdash; the NIST framework names validity and reliability as the first characteristic of a trustworthy system. Neither contains a validity inference in the argument-based sense meant here: a test of whether a particular number supports the particular claim being made on it. Model validity asks whether a system performs as specified. Argument-based validity asks whether a reported figure can carry the decision resting on it. That second absence is not unique to impact capital. It is the same missing link, surfacing wherever a number is asked to justify a decision. The higher-education version of <InternalLink slug="what-is-this-system-measuring">the validity gate</InternalLink> is exactly this. The gate here is one instance of a discipline the whole responsible-measurement conversation is still missing.
        </P>

        <H2>Validity tells you which verb the number earned</H2>

        <Figure
          src="/library/figures/valid-dollar-verb-the-number-earned.svg"
          alt="Three rows ordered by the strength of the verb an impact number earns. No counterfactual earns supports. Contribution analysis, where rival explanations are tested and defeated, earns contributed to; that row is emphasized because it is where most funders actually sit. A controlled comparison earns produced, and how far produced reaches depends on whether the design was matched, quasi-experimental, or randomized."
          caption="Validity tells you which verb the number earned."
        />

        <P>
          This is where a validity lens stops being a brake and starts being useful. Additionality is the whole game &mdash; and the impact field already knows it: the <a href="https://impactfrontiers.org/norms/five-dimensions-of-impact/" target="_blank" rel="noopener" className="text-accent hover:text-accent-2 no-underline border-b border-line-2 hover:border-accent pb-px">Impact Management Project&rsquo;s five dimensions</a> (what, who, how much, contribution, risk) name <I>contribution</I> as a dimension in its own right, the one that asks whether the change would have happened anyway.
        </P>
        <P>
          Three counts are now in play, and they sit on different axes. The <B>five</B> dimensions describe <I>what a claim is about</I>: they are the fields a complete impact statement has to fill in. The <B>four</B> links test <I>whether the argument holds</I>: they are inferences, and they are scored, not described. The <B>three</B> rows below grade <I>one link</I> (contribution) by the strength of counterfactual standing behind it. Contribution is the pivot where all three meet: fourth of the five dimensions, fourth link in the chain, and the thing the three rows grade. Much of what is hardest about an impact number converges on that one place.
        </P>
        <P>
          Dollars in Pockets&rsquo; own counterfactual work is what pays that dimension off and earns the strong verb. So the discipline isn&rsquo;t there to slow the claim down; it&rsquo;s there to tell a fund how much weight a given number can carry:
        </P>
        <P>
          &mdash; No counterfactual behind the contribution link &rarr; the number <I>supports</I>, is consistent with, the outcome.
        </P>
        <P>
          &mdash; No controlled comparison available, but rival explanations tested and defeated &rarr; <I>contributed to</I> is earned.
        </P>
        <P>
          &mdash; A matched, quasi-experimental, or randomized comparison behind it &rarr; <I>produced</I> is earned. How far <I>produced</I> reaches depends on which of those it was; a matched comparison and a randomized one do not license the same sentence, and a fund should say which it has.
        </P>
        <P>
          That middle row is where most funders actually sit, and it deserves more than a footnote. A controlled counterfactual is expensive and often infeasible; most impact claims will be settled there or not settled at all. It is not a dead end. It is exactly the situation <a href="https://doi.org/10.1177/1356389012451663" target="_blank" rel="noopener" className="text-accent hover:text-accent-2 no-underline border-b border-line-2 hover:border-accent pb-px">contribution analysis (Mayne, 2012)</a> was built for: assemble the contribution story, then test it against the rival explanations that would make the outcome happen without you.
        </P>
        <P>
          The logic is elimination, not argument. You do not reason your way up to a verb; you start with the strongest one you would like to claim and let the rivals knock it down. Say the claim is that a record-clearing tool produced a wage gain. The rivals: the local labor market tightened that year, the person would have found a free legal-aid clinic within a few months anyway, the employers who hired them never ran a record check. Each rival you cannot defeat kills a stronger verb. <I>Contributed to</I> is what stands when you run out of rivals &mdash; the strongest verb none of them could defeat, which is a different thing from the strongest verb you can defend in a meeting.
        </P>
        <P>
          That is not a hedge. &ldquo;Here is our return, and here is how much of it we can stand behind, and where it&rsquo;s thin&rdquo; is a stronger thing to say to a skeptical funder or board than a bigger number with no gate under it. Validity is what holds up when someone leans on it.
        </P>

        <H2>Keep the unit. Publish the warrant beside it.</H2>
        <P>
          None of this is an argument against the common unit. The unit is the achievement. Breaking the figure back into incommensurable pieces would throw away the thing the field spent years trying to build, and it would leave a funder exactly where they started, holding a wage estimate and a fee estimate with no way to weigh one against the other.
        </P>
        <P>
          The fix is smaller than that. A common unit makes dollars comparable. It does not make the evidence behind those dollars comparable. So report the composite, and report the warrant next to it, pathway by pathway.
        </P>

        <Figure
          src="/library/figures/valid-dollar-keep-the-unit-publish-the-warrant.svg"
          alt="An impact figure broken into three pathways, each carrying its own dollar amount. All three cap at the same inference link, the fourth one. What differs is the evidence each has at that link, and so the verb each earns. Legal fees avoided has a controlled comparison and earns produced. Wage gain has rival explanations tested and defeated and earns contributed to. Housing stability has no counterfactual and earns only supports. The blended total is shown last: the dollars add, but the composite claim is capped at the weakest verb among the pathways, so the total row wears the grade of the pathway that capped it. Amounts are illustrative."
          caption="Keep the unit. Publish the warrant beside it."
        />

        <P>
          Three of those four columns are things a fund already has. The dollars come from the model it ran. Where the pathway caps comes from the four questions. The verb comes from the evidence sitting at that link. Nothing here asks for new measurement. It asks a fund to show grading it already did.
        </P>
        <P>
          What that buys is specific. A reader can see that most of the figure rests on a claim the fund can defend and a smaller share rests on a claim it cannot yet, which is a different and more useful fact than one blended number under one blended verdict.
        </P>
        <P>
          It also tells a fund where the next evaluation dollar goes, though not by pointing at the weakest row. A soft warrant on a small number may not be worth buying down. What matters is how many dollars sit at how soft a warrant, and that is a reading of two columns together. In the table above, the housing row has the weakest verb and the smallest stake, while the wage row carries twice the dollars one notch up. The table does not settle which to fund next, but it puts the tradeoff somewhere a board can argue about.
        </P>
        <P>
          It also changes what Goodhart&rsquo;s law can do here. Once per-pathway warrant is visible, growing the total by leaning on the softest pathway shows up in the table as a larger number sitting at a weaker verb. The move stops being free.
        </P>
        <P>
          The last row is the one that costs something. The dollars add cleanly. The claim does not, because a single sentence about the whole figure asserts all of it, and a fund that says <I>produced</I> about a total containing an unexamined pathway has said more than its evidence allows. None of which argues for reporting less. Report the total and the three rows above it together, and the strong pathway keeps the verb it earned instead of surrendering it to the blend.
        </P>

        <H2>An invitation, taken up</H2>
        <P>
          The Dollars in Pockets authors asked the field to apply the measure to its own work and tell them where it breaks. This is that, offered in the same spirit and with real admiration for the thing they built. A better metric isn&rsquo;t what&rsquo;s missing; the metric is good. The reflex is: a fund asking <I>&ldquo;is that a valid dollar?&rdquo;</I> as automatically as it now asks <I>&ldquo;what&rsquo;s the ROI?&rdquo;</I>
        </P>
        <P>
          There is a reason to build the reflex now, while Dollars in Pockets is still a voluntary standard. The authors are already building for spread: they say they are developing AI-native tooling, in partnership with Anthropic, to make the measure easy to adopt. Tooling is how a measure becomes infrastructure, and infrastructure is expensive to add a gate to afterward.
        </P>
        <P>
          Mandating a measure does not make it valid. India&rsquo;s regulated regime already runs the experiment. Rule 8(3) of the Companies (Corporate Social Responsibility Policy) Rules, as amended in 2021, requires large corporate spenders to commission independent impact assessment of their larger completed projects. India&rsquo;s Social Stock Exchange, regulated by the Securities and Exchange Board of India (SEBI), requires listed social enterprises to file annual impact reports assessed by a registered Social Impact Assessor, on a logic-model frame. Both are real obligations with real cost attached. But a reporting requirement can compel the <I>production</I> of an impact number without establishing the <I>quality</I> of the inference behind it. Nothing in either rule specifies what would make the assessed number sound. A common unit will spread faster than the discipline to audit it. The gate is cheapest to install before the number is everywhere.
        </P>
        <P>
          This continues a line already drawn &mdash; that <InternalLink slug="the-reach-trap">reach is not outcome</InternalLink>, that <InternalLink slug="numbers-dont-agree">numbers which don&rsquo;t reconcile can&rsquo;t all be true</InternalLink>. A magnitude, however rigorously built, is not yet a validity. The impact field needs a sounder path from the number to the claim, with the weak link surfaced early, while it&rsquo;s still cheap to fix.
        </P>

        <SeeAlso>
          <SeeAlsoItem
            slug="what-is-this-system-measuring"
            title="What is this system actually measuring?"
            gloss="The higher-education version of the same discipline &mdash; what a governance framework skips when it treats measurement as already settled."
          />
          <SeeAlsoItem
            slug="numbers-dont-agree"
            title="When the numbers don't agree."
            gloss="The reconciliation companion &mdash; why numbers that don't converge can't all carry the claim."
          />
          <SeeAlsoItem
            slug="the-reach-trap"
            title="The reach trap."
            gloss="Reach is not outcome &mdash; the prior essay this one continues on the line between counting and claiming."
          />
          <SeeAlsoItem
            slug="before-it-was-called-ai-evaluation"
            title="Before it was called AI evaluation."
            gloss="The measurement-science lineage the Kane/Messick discipline draws from, mapped across eight bridges to modern AI evaluation."
          />
          <SeeAlsoItem
            slug="the-floor-is-the-frontier"
            title="The floor is the frontier."
            gloss="Additionality applied to a frontier-AI forecast &mdash; what &ldquo;the floor rose&rdquo; would have to earn before it counts as a result."
          />
        </SeeAlso>

        <MetaNote>
          Written August 2026 for the Analytic Bytes Library as a response to &ldquo;Dollars in Pockets: A New Way to Measure What Matters&rdquo; (NextLadder Ventures &amp; GitLab Foundation, July 2026; contributing authors Kyle Nelson, Tamsin Chen, Rhett Dornbach-Bender, and Ellie Bertani). The critique is offered in the spirit of the authors&rsquo; own invitation to apply the measure to the field&rsquo;s work and report where it breaks. Every description of Dollars in Pockets here is drawn from that published announcement. The complete methodology (the formulas, the discounting, the validation design) had not been published at the time of writing; the authors state their intention to publish it. Where this essay&rsquo;s argument depends on what that methodology does or does not report, the dependency is named in the body rather than assumed away. Revised 23 August 2026 to tighten attribution, separate NextLadder&rsquo;s fund-level ten-to-one target from the Rasa Legal worked example, and engage the authors&rsquo; stated position that ROI is one input among several. The same pass corrected the characterization of SROI, re-cited the Indian CSR impact-assessment requirement to Rule 8(3) of the CSR Policy Rules rather than to Section 135 of the Companies Act, separated the NIST AI RMF functions from the EU AI Act&rsquo;s risk tiers, and dated the Kane and Messick lineage. The same pass also split the fourth inference link, which had bundled a magnitude threshold with a contribution inference, and named the relationship between the four links, the three verb grades, and the Impact Management Project&rsquo;s five dimensions. The same pass named <I>contributed to</I> as the verb contribution analysis earns, and re-weighted the verb figure so that row &mdash; the case most funders are actually in &mdash; carries the emphasis rather than <I>produced</I>. The verb vocabulary is this essay&rsquo;s, not Mayne&rsquo;s; Mayne describes the method of eliminating rival explanations without prescribing a fixed set of verbs for its output. Revised 24 August 2026 to add the DALY&rsquo;s own contested history as the second half of the authors&rsquo; analogy, and to correct three citation errors found on a verification pass: the disability-weight critique is Nord (2013), the Messick citation is the 1995 <I>American Psychologist</I> article the link resolves to rather than the 1989 chapter, and the age-weighting and discounting parameters were contested for roughly two decades before the GBD 2010 revision, not a quarter century. A second pass the same day, prompted by two external critiques, made four structural changes. It separated the two things the minimum rule was being asked to do: the rule runs down a single pathway, where each inference depends on the one before it, and it does not license reading one weak pathway as evidence against a strong one beside it. It stopped implying that the minimum rule comes from Kane; argument-based validation motivates attention to the weakest assumption, and the arithmetic is this essay&rsquo;s operating choice. It added a closing section proposing that a fund publish per-pathway warrant beside the composite, which is the constructive form of the same argument. And it ordered the three verb rows by verb strength, since the previous order climbed to <I>produced</I> and then descended to <I>contributed to</I> while emphasizing the lower row. The same pass narrowed &ldquo;researched counterfactual,&rdquo; which had bucketed a matched comparison with a randomized one. The paragraph describing the Analytic Bytes youth-mental-health corpus was cut: the underlying longitudinal coding is not yet published, and an essay arguing that claims should not outrun inspectable evidence should not rest on evidence a reader cannot inspect. It will be restored with a cross-reference when that work publishes.
        </MetaNote>
      </>
    ),
  },

  // ===================================================================
  // ESSAY 15 — Validity is the layer beneath responsible AI
  // ===================================================================
  {
    kind: "essay",
    slug: "validity-layer-beneath-responsible-ai",
    number: "15",
    title: "Validity is the layer beneath responsible AI",
    subtitle:
      "Why responsible-AI rubrics in mental health are necessary, and what they need underneath.",
    date: "2026-08-14",
    readingTime: "10 min read",
    summary:
      "Why responsible-AI rubrics in mental health are necessary, and what they need underneath.",
    cover: "/library/covers/validity-layer-beneath-responsible-ai.svg",
    arc: "measurement",
    body: (
      <>
        <H2>The rubrics, and what they assume</H2>
        <P>
          A round of frameworks for governing AI in mental health has appeared in the last fifteen months. <a href="https://www.lyrahealth.com/blog/the-polaris-principles/" target="_blank" rel="noopener" className="text-accent hover:text-accent-2 no-underline border-b border-line-2 hover:border-accent pb-px">Lyra Health&rsquo;s Polaris Principles</a> articulated the industry-side posture. The <a href="https://nam.edu/our-work/programs/leadership-consortium/health-care-artificial-intelligence-code-of-conduct/" target="_blank" rel="noopener" className="text-accent hover:text-accent-2 no-underline border-b border-line-2 hover:border-accent pb-px">National Academy of Medicine published its AI Code of Conduct for Health and Medicine</a> in May 2025 with six commitments including monitoring performance. The American Psychological Association (APA) released <a href="https://www.apa.org/topics/artificial-intelligence-machine-learning/ethical-guidance-ai-professional-practice" target="_blank" rel="noopener" className="text-accent hover:text-accent-2 no-underline border-b border-line-2 hover:border-accent pb-px">ethical guidance for AI in health service psychology</a> in 2025 and followed with a <a href="https://www.apa.org/topics/artificial-intelligence-machine-learning/health-advisory-chatbots-wellness-apps" target="_blank" rel="noopener" className="text-accent hover:text-accent-2 no-underline border-b border-line-2 hover:border-accent pb-px">2026 health advisory</a> whose plain-language judgment about consumer AI in mental health was blunt: the chatbots and wellness apps lack the testing and safety measures needed for quality mental health support. <a href="https://www.springhealth.com/news/spring-health-expert-council-vera-mh-first-open-source-evaluation-ai-mental-health" target="_blank" rel="noopener" className="text-accent hover:text-accent-2 no-underline border-b border-line-2 hover:border-accent pb-px">VERA-MH (Validation of Ethical and Responsible AI in Mental Health)</a> appeared as an open-source AI safety evaluation built around conversation simulation and clinician judging. <a href="https://neuromodec.org/2025/10/toward-a-framework-for-ai-safety-in-mental-health-ai-safety-levels-mental-health-asl-mh/" target="_blank" rel="noopener" className="text-accent hover:text-accent-2 no-underline border-b border-line-2 hover:border-accent pb-px">ASL-MH (AI Safety Levels for Mental Health)</a> proposed AI safety levels for mental health applications. The WHO convened an <a href="https://www.who.int/news/item/20-03-2026-towards-responsible-ai-for-mental-health-and-well-being--experts-chart-a-way-forward" target="_blank" rel="noopener" className="text-accent hover:text-accent-2 no-underline border-b border-line-2 hover:border-accent pb-px">expert workshop on responsible AI for mental health</a> in January 2026 with explicit recommendations about embedding mental health into AI impact assessments. <a href="https://trovane.com.au/" target="_blank" rel="noopener" className="text-accent hover:text-accent-2 no-underline border-b border-line-2 hover:border-accent pb-px">Trovane</a>, the Australian company behind the Lumara platform, published a thirteen-question handbook for evaluating any AI mental-health tool before deployment, written so that a clinical lead or a foundation program officer can carry it into a procurement conversation. The rubrics are necessary. This essay credits the work being done and names the layer the rubrics do not yet include.
        </P>
        <P>
          Of that set, the handbook is the most thorough example an adopting institution is likely to use, so it is worth walking through. Each of its thirteen questions is scored on three tiers: Basic, Better, Best Practice. Five of the thirteen are gate questions, where a Basic score means the buyer does not proceed until the gap is resolved, and more than one Basic anywhere means the buyer does not deploy at all. The authors also publish an appendix naming where their own product falls below their own bar, which is rarer in vendor-authored guidance than it should be.
        </P>
        <P>
          Before the handbook was released, Trovane previewed it publicly and pulled five of the thirteen forward as the ones to ask in a first vendor meeting. Those five carry most of the weight for the argument here:
        </P>

        <NumList>
          <NumItem n={1}>
            Where does AI inference happen &mdash; what is the data-residency and privacy architecture, and what flows where?
          </NumItem>
          <NumItem n={2}>
            Who is the named clinician accountable for crisis detection, and what does accountability actually mean?
          </NumItem>
          <NumItem n={3}>
            How does crisis detection perform across demographic groups?
          </NumItem>
          <NumItem n={4}>
            What happens after deployment &mdash; monitoring, drift, the post-launch discipline that distinguishes a deployment from a launch?
          </NumItem>
          <NumItem n={5}>
            Can we speak with the clinical lead directly?
          </NumItem>
        </NumList>

        <P>
          These questions map almost exactly to the responsible-AI cluster appearing across the NIST AI Risk Management Framework (RMF), the EU AI Act risk tiers, the NAM Code of Conduct, APA&rsquo;s ethical guidance, the WHO workshop outputs, and the industry frameworks circulating alongside them. They are the right floor for responsible AI in mental health. The institution that can answer them is operating at a much higher standard than the institution that has not asked them at all.
        </P>

        <P>
          The preview post made one claim about those five that is worth sitting with: a responsible vendor answers all of them without hesitation. That is true, and it is also the reason the floor needs something underneath it. A vendor can answer all five cleanly, with inference on shore, a named clinician holding veto, stratified detection results, a monitoring regime with an owner, and a clinical lead who will take the call, and still never have been asked what the detector detects.
        </P>

        <H2>The question the rubric does not ask</H2>
        <P>
          There is a question the rubrics do not yet include, and it decides whether everything else they ask earns its place: does the system measure the mental-health construct it claims to?
        </P>
        <P>
          This library has asked that question before &mdash; of higher-ed AI in <InternalLink slug="what-is-this-system-measuring"><I>What is this system actually measuring?</I></InternalLink>, of impact investing in <InternalLink slug="the-valid-dollar"><I>The valid dollar</I></InternalLink>. Each time, the responsible-AI floor turns out to depend on an unexamined measurement claim. Mental-health AI is the third and hardest application, because the constructs the systems claim to measure are the ones the field itself has been actively contesting for over a decade.
        </P>

        <Figure
          src="/library/figures/validity-layer-beneath-responsible-ai.svg"
          alt="Validity is the layer beneath the responsible-AI frameworks"
          caption="The frameworks are necessary. They assume — but do not check — the discipline beneath."
        />

        <P>
          The responsible-AI rubric as currently practiced assumes the measurement target is correct and asks how the model behaves around that target. Is the inference happening in a secure place. Is someone accountable for the outcome. Does the performance hold across populations. Is the system being monitored for drift. Is there a human you can talk to. Each is necessary. A crisis-detection model that is accountable to a named clinician, runs on data residing in the right jurisdiction, performs evenly across demographic groups, is monitored for drift, and connects to a reachable clinical lead is still a problem if what it is detecting is not crisis but a proxy for crisis the field has not validated yet. The rubric governs the deployment. Validity governs the claim the deployment is making. That distinction is not mine. <a href="https://psycnet.apa.org/doi/10.1037/0003-066X.50.9.741" target="_blank" rel="noopener" className="text-accent hover:text-accent-2 no-underline border-b border-line-2 hover:border-accent pb-px">Messick, 1995</a> settled it thirty years ago: validity is a property of the interpretation and use of a number, consequences included, not of the instrument that produced it. A tool cannot be valid. Only a claim made with it can be.
        </P>
        <P>
          The Trovane handbook shows the pattern clearly, and it shows it because it is the strongest of the set rather than the weakest. Its crisis-detection question asks whether detection accuracy has been audited across demographic groups: age, gender, First Nations status, users from culturally and linguistically diverse backgrounds, users with English as an additional language, neurodivergent users. That is a fairness question and a good one. It also assumes the construct is settled. A detector can only be tested for even performance across groups once there is an account of what it detects. None of the thirteen rows asks what construct the system is measuring, or what evidence supports the claim that it measures it. The closest any row comes is the audit question, whose top tier lists outcome tracking as two words alongside drift detection, with nothing behind it about which outcome or against what. What carries the safety claim across all thirteen is clinical veto: a named, credentialed clinician holds documented authority to block any product decision that conflicts with clinical safety. Their handbook draws a sharp line between clinically informed, meaning a clinician was consulted at some point, and clinically governed, meaning a named clinician holds ongoing accountability and can say no. The distinction is real, and most of the market fails it. Clinical veto establishes who is accountable for a decision. Evidence that the decision is measuring what it claims is a different thing, and no row asks for it.
        </P>
        <P>
          The same omission appears in the most rigorous academic work in the field, which makes it the more telling case. In August 2026 a team from the Max Planck UCL Centre for Computational Psychiatry, Oxford, and the UK AI Security Institute published a framework in <I>Nature Medicine</I> for <a href="https://www.nature.com/articles/s41591-026-04577-2" target="_blank" rel="noopener" className="text-accent hover:text-accent-2 no-underline border-b border-line-2 hover:border-accent pb-px">auditing how AI chatbots behave in mental-health conversations</a>. A model plays a user with a psychiatric vulnerability, talks to a target chatbot for up to ten turns, and a judge model scores every turn against a thirty-nine-dimension rubric, thirteen dimensions of which were selected in advance as psychiatrically relevant and carry the analysis. Eight hundred and ten conversations across nine chatbots produced more than ninety thousand turn-level ratings. The paper calls itself a clinically validated framework and it earns much of that title, on the strength of a validation battery well beyond anything else published: judge checked against judge, scores tested for stability when the rubric is reworded, a check for whether models grade their own output more leniently, and twenty-seven licensed clinicians producing four hundred and eighty-eight independent ratings.
        </P>
        <P>
          Every one of those checks validates the rater. The closest any of them comes to the target is a known-groups test, where the judge separated conversations the authors had already labelled high and low risk at a median AUC of 0.98. That establishes the judge can find the line the authors drew. It does not establish the line is in the right place. The construct being scored is called concerning behavior, and the paper&rsquo;s stated reason for using it is its high face validity, which means it looks right to people who know the area. The criterion check asks whether the model agrees with clinicians applying the same rubric, which establishes that a definition is being applied consistently rather than that the definition names a real thing. Those clinicians agree with each other at an intraclass correlation of 0.31, so the human criterion the model is validated against is itself unstable. The words construct validity, measurement, and psychometric do not appear in the published article.
        </P>
        <P>
          That is the distinction this essay is asking for. Validating the instrument is not validating the target. A rubric can be reliable, reproducible, stable under paraphrase and agreed on by clinicians, and still be scoring something the field has not settled. A procurement handbook written by operators and a framework written by computational psychiatrists arrive at the same omission from opposite directions, which is reasonable evidence that the omission belongs to the field rather than to either set of authors.
        </P>
        <H2>Why validity has to hold in mental health</H2>
        <P>
          The point applies in every AI domain. It applies more sharply in mental health because every claim a mental-health AI system makes is a claim about a construct that cannot be directly observed. Depression is not measurable the way blood glucose is measurable. Suicide risk is not measurable the way blood pressure is measurable. Wellness has no laboratory test. Every mental-health AI tool that claims to detect, predict, score, flag, or assess one of these constructs is making a measurement claim about something inherently latent. The measurement is an inference from a proxy. The validity question &mdash; whether the proxy actually represents the construct &mdash; is upstream of every other governance question in the rubric.
        </P>
        <P>
          The field has been candid about this for fifteen years. In 2010 the National Institute of Mental Health published its Research Domain Criteria (RDoC) framework with a one-sentence diagnosis of why a new framework was needed: the weakness of the Diagnostic and Statistical Manual of Mental Disorders (DSM) is its lack of validity. The standard mental-health diagnoses, unlike definitions of ischemic heart disease or lymphoma or AIDS, are based on consensus about clusters of clinical symptoms, not an objective laboratory measure.
        </P>
        <P>
          Twelve years later Thomas Insel, who led NIMH during the period he is critiquing, wrote in <a href="https://www.penguinrandomhouse.com/books/670329/healing-by-thomas-insel-md/" target="_blank" rel="noopener" className="text-accent hover:text-accent-2 no-underline border-b border-line-2 hover:border-accent pb-px"><I>Healing</I></a> that the research had largely failed to help Americans struggling with mental illness despite billions of dollars directed into it. <a href="https://www.thelancet.com/journals/lancet/article/PIIS0140-6736(18)31612-X/fulltext" target="_blank" rel="noopener" className="text-accent hover:text-accent-2 no-underline border-b border-line-2 hover:border-accent pb-px">The Lancet Commission on Global Mental Health and Sustainable Development</a> in 2018 reframed the field at a global-public-good scale, with a projected sixteen-trillion-dollar cost by 2030 measured against a construct whose foundations remained partly underdetermined. The WHO has made the same point.
        </P>
        <P>
          None of these are fringe positions. They are the field&rsquo;s most authoritative voices saying, on the record, that the underlying construct on which mental health AI tools now make their measurement claims is in active contestation.
        </P>
        <P>
          Not for lack of response. RDoC has generated fifteen years of dimensional-construct research, HiTOP has proposed an empirically-driven alternative taxonomy, DSM-5-TR has folded in dimensional criteria alongside categorical, and precision psychiatry and digital phenotyping are actively building next-generation measurement infrastructure. Those are extensions of the measurement framework around the constructs. They are not resolutions of the constructs themselves, or of construct drift as those constructs are applied &mdash; the level at which consumer-scale AI mental-health tools now make their claims.
        </P>
        <P>
          That is the condition on which AI is being deployed. The proxy that an AI system has learned to associate with a mental-health outcome may be the proxy the field has been using as a stand-in for a construct it has not yet fully adjudicated. Responsible-AI rubrics that screen for privacy, accountability, equity, monitoring, and transparency do not catch this condition. They presuppose it has already been resolved. In most cases it has not.
        </P>
        <P>
          The cost calculus is the second reason. Validity is owed in every domain. What changes across domains is how much evidence you should require before acting on the number, and mental health is where that requirement runs highest. The cost of measuring the wrong thing in administrative AI shows up as a wrong scholarship decision, a wrong advising flag, a wrong staffing recommendation. The cost of measuring the wrong thing in mental health AI shows up as a wrong crisis-detection call for an adolescent who needed it, a missed signal in someone with intent, a chatbot response that reinforced isolation when connection would have helped, an AI companion that taught a vulnerable user a pattern of relating that diminished rather than supported their self-efficacy and locus of control.
        </P>
        <P>
          The most vulnerable users &mdash; adolescents, people in active crisis, those without access to traditional clinical support &mdash; are the populations most likely to use consumer-facing AI mental-health tools, the populations whose construct presentations are most heterogeneous, and the populations for whom the validity case is thinnest. They bear the cost of the validity gap. The demographic evidence is already visible in the data. Roughly one in eight US adolescents have used AI for mental-health advice; Black youth are 5.45 times more likely than White youth to use it at least monthly, girls twice as likely as boys, and 63 percent told no one they were doing it (<a href="https://www.ajmc.com/view/ai-chatbot-use-for-mental-health-advice-rises-sharply-among-us-youth-with-key-disparities-identified" target="_blank" rel="noopener" className="text-accent hover:text-accent-2 no-underline border-b border-line-2 hover:border-accent pb-px">JAMA Pediatrics, June 2026</a>).
        </P>
        <P>
          The canonical mechanism is documented. <a href="https://www.science.org/doi/10.1126/science.aax2342" target="_blank" rel="noopener" className="text-accent hover:text-accent-2 no-underline border-b border-line-2 hover:border-accent pb-px">Obermeyer and colleagues in <I>Science</I> in 2019</a> examined a risk-prediction algorithm applied to millions of patients and found it was not predicting illness. It was predicting next year&rsquo;s healthcare spending and using that as a stand-in for who was sick. Spending tracks the care a person receives, not the illness they have, and less is spent on Black patients at the same level of illness. So two equally sick patients generated different predicted costs, and the algorithm read the cheaper one as healthier. Changing the prediction target from cost to illness would have raised the share of Black patients flagged for extra care from 17.7 percent to 46.5 percent. None of this is visible to a fairness audit that checks whether performance holds at a given risk score, because performance did hold at a given risk score. The score was the wrong quantity.
        </P>
        <P>
          The mental-health version runs the same way with the sign reversed. Engagement is the proxy most consumer tools have to hand: sessions, messages, retention. And the adolescents who use these tools most are the ones described a paragraph above, least served elsewhere and mostly telling no one. Read as benefit, heavy use makes that group look like the group doing best. Obermeyer&rsquo;s proxy underserved people by tracking how little the system spent on them. An engagement proxy underserves the same people by tracking how much they lean on the only thing available.
        </P>
        <H2>Four questions the rubric depends on</H2>
        <P>
          So what does the responsible-AI rubric need underneath it. What is needed is not another principle or another commitment added to the list of six or eight or ten, but a prior layer, asked first, before any of the rubric&rsquo;s other questions can be evaluated. Four questions constitute the validity layer that the rubric depends on.
        </P>

        <Figure
          src="/library/figures/validity-layer-four-questions.svg"
          alt="A vertical stack of four numbered cards, Q1 through Q4, listing the validity questions the responsible-AI floor depends on: name the construct; produce the validation evidence and say what use it was built for; name where the case is thinnest and what policy applies there, with a decision owner and a start date; specify a drift-monitoring cadence and what it triggers. A footer notes that three of the four are questions about use rather than about the instrument, citing Kane 1992 and Messick 1995."
          caption="The four validity questions the responsible-AI floor depends on."
        />

        <P>
          What construct is the system claiming to measure. Name it explicitly &mdash; depression, suicide risk, anxiety, crisis, engagement, well-being. Whatever the system claims, the institution adopting it has to be able to write down, in one sentence, what construct the system is producing scores or flags about. If the answer is fuzzy, the rubric cannot help. The construct has to be named before anything else can be evaluated against it.
        </P>
        <P>
          What is the validation evidence and what it covers. Sample sizes, populations, instruments, comparators, time horizons. Published or proprietary. Independent or vendor-conducted. The institution has to be able to read the validation case the same way it reads any other evidence-based health-tech procurement: with the question of what the evidence says the system measures, what populations the evidence covers, and what use cases the evidence was actually built for. The rubric assumes this case exists. Often it does not exist at the resolution the deployment requires.
        </P>
        <P>
          Where is the validation case thinnest, and what does the institution do about that. Every validation case has gaps. The validity layer requires the institution to name the gaps before the deployment, not after a regulator asks. Which populations is the system under-validated against. Which use cases does the evidence not yet cover. What is the institution&rsquo;s policy for deployment in the under-validated zones. Disclosure to users in those zones. Restricted use. Human-in-the-loop. The answers vary; the question is the same. Naming the thin parts of the validity case before deployment is what distinguishes responsible deployment from responsive deployment.
        </P>
        <P>
          Matthew Krome, who co-founded Trovane and built the safety architecture underneath its products, pushed on this question when he read a draft of this essay. His point is that naming a thin spot does not reliably produce a policy. Sometimes it sits open as an unresolved decision, waiting on a named person with the authority to make the call. He is right, and his own handbook is the evidence. Its author-disclosure appendix names continuous drift monitoring with named owners as documented but not yet fully automated, and no mitigation is attached to that gap. It is simply open. The interval between naming a gap and deciding what to do about it deserves to be measured on its own rather than treated as delay before an answer arrives. So the third question needs a fifth element: name the decision owner, and name the date the gap was opened. One caution, since this is now a measure and measures invite gaming. The clock has to start when the gap became knowable, at the model change or the population shift, not when someone got around to writing it down. An institution that starts the clock at disclosure can improve its record by naming things late.
        </P>
        <P>
          What is the monitoring cadence for drift, and not just the kinds of drift the modern responsible-AI literature usually names? Construct drift, where what the field calls &ldquo;depression&rdquo; or &ldquo;wellbeing&rdquo; or &ldquo;engagement&rdquo; itself shifts relative to the validated proxy. Population drift, where the people using the system shift in composition. User-effect drift, the longitudinal-validity dimension the recent discourse has been naming &mdash; whether the system&rsquo;s effect on users holds up over weeks, months, and years of repeated interaction, whether the cognitive offloading or excessive reassurance-seeking or shifts in self-efficacy that point-in-time evaluation cannot see are being measured at all.
        </P>
        <P>
          Longitudinal experimental evidence from Oxford, Stanford, and the UK AI Security Institute (<a href="https://arxiv.org/abs/2605.07912" target="_blank" rel="noopener" className="text-accent hover:text-accent-2 no-underline border-b border-line-2 hover:border-accent pb-px">Ibrahim et al., 2026</a>) documents the pattern directly: AI sycophancy delivers the in-the-moment support people associate with close relationships but over weeks erodes satisfaction with real-world relationships and produces none of the downstream benefits &mdash; humility, connection &mdash; that human support provides. That is the third drift mode operating in the wild. The validity layer requires that monitoring address all three drift modes and that the institution name what it does when any of them surface.
        </P>
        <P>
          The Trovane handbook names three drift modes too, and they are a different three. Model drift is where the underlying model gets updated and the system&rsquo;s responses shift, including how it handles distress. Conversational drift is where small prompt and content changes accumulate until the tone and scope of the tool no longer match its clinical design. Detection-accuracy regression is where performance degrades for one user group while the aggregate numbers still look fine. Those three watch the instrument. The three above watch the claim the number is making: what it means, who it applies to, and what it does to the people it is applied to. Between them there are six modes in two families, and the responsible-AI literature currently covers one family well and the other not at all. A monitoring regime that runs the first three and none of the second three will catch a model update and miss the fifteen-year argument the field is still having about what the model was built to detect.
        </P>

        <Figure
          src="/library/figures/six-drift-modes-two-families.svg"
          alt="Six drift modes in two families. The instrument family — model drift, conversational drift, detection-accuracy regression — is what responsible-AI monitoring already covers. The claim family — construct drift, population drift, user-effect drift — is what the validity layer adds."
          caption="Six drift modes, two families. Responsible-AI monitoring covers the first family. The second is what the validity layer adds."
        />

        <P>
          These four questions sit underneath the responsible-AI rubric. They do not replace the rubric; they earn it. A mental-health AI tool whose adopter can answer all four &mdash; names the construct, knows the validation evidence and its gaps, has a plan for the under-validated zones, has a monitoring cadence for all three drift modes &mdash; is one a clinician can stand behind, a foundation can fund, a regulator can audit. A tool whose adopter cannot answer them is being deployed against a construct claim no one has examined closely enough to defend, regardless of what the responsible-AI rubric says about privacy, accountability, or monitoring of model behavior. The other questions rest on a foundation that has not been checked.
        </P>
        <H2>Calibration, not exemption</H2>
        <P>
          A real objection from technology leaders is that requiring all four validity questions before any deployment paralyzes adoption. Eduardo Bunge frames the strongest version of that case: roughly 80 percent of the 1.2 billion people worldwide with a mental disorder never receive treatment, and even the field&rsquo;s best-evidenced conditions cap remission near 51 percent (<a href="https://www.parentehealth.com/post/understanding-ai-phobia-in-mental-health" target="_blank" rel="noopener" className="text-accent hover:text-accent-2 no-underline border-b border-line-2 hover:border-accent pb-px">Parente Health, July 2026</a>). The cost of not adopting is real. The objection has weight, and the answer is calibration, not exemption. Some deployments are low-stakes enough that the validity layer can be carried by post-deployment monitoring rather than pre-deployment certainty. A wellness-tracking feature with a corrective off-ramp is not in the same risk class as a crisis-detection model that escalates to a clinician. Others, including clinical decision support, child safety, crisis detection, and anything that triggers action without a human in the loop, are not negotiable. The discipline is to decide which deployment is which before the deployment rather than after a failure. The four questions do not block all deployment. They ask the institution to know, for each one, which deployments it is making with the validity work done and which it is making on a promise to do that work in flight.
        </P>
        <P>
          This is offered as the prior discipline the responsible-AI rubrics assume, and as recognition that the rubrics are doing the right work at the right altitude. The Trovane handbook&rsquo;s thirteen questions are the right responsible-AI floor. So are the NAM Code of Conduct&rsquo;s six commitments, the APA&rsquo;s ethical guidance, the WHO workshop&rsquo;s three recommendations, the Polaris Principles, the <a href="https://www.springhealth.com/news/spring-health-expert-council-vera-mh-first-open-source-evaluation-ai-mental-health" target="_blank" rel="noopener" className="text-accent hover:text-accent-2 no-underline border-b border-line-2 hover:border-accent pb-px">VERA-MH evaluation</a> work, the ASL-MH framework, and the <I>Nature Medicine</I> auditing framework, which sets the standard for how carefully an evaluation instrument should be checked before anyone relies on its scores. All of these are necessary. None of them is sufficient if the validity question is not answered first.
        </P>
        <H2>The instrument itself is fragile</H2>
        <P>
          The VERA-MH benchmark itself has already shown what validity fragility looks like in practice. Spring Health, which released VERA-MH in October 2025, quietly switched its recommended judge from GPT-4o to GPT-5.4 in June 2026 &mdash; as <a href="https://bryanjesterphd.substack.com/p/architecture-over-training-what-vera" target="_blank" rel="noopener" className="text-accent hover:text-accent-2 no-underline border-b border-line-2 hover:border-accent pb-px">Bryan Jester documented in July 2026</a>. The switch happened in a repository update without a peer-reviewed validation of the new judge as more clinician-aligned than the original. Under the new judge, frontier general-purpose models that had been scoring in the mid-60s dropped into the low-50s on the same conversations. The &ldquo;safety&rdquo; every public number was reported against had, six weeks earlier, quietly become a different measure. That is the validity gap operating in real time: the instrument changed, and what had appeared to be measured no longer was. It illustrates the concern this essay names &mdash; not because the judge switch was wrong, but because the framework being adopted at the responsible-AI floor depends on a measurement instrument that can change without notice and without independent validation.
        </P>
        <P>
          There is an architectural answer to that specific failure, and it does not require resolving the construct question first. The rule is that model output alone never triggers a decision. Every escalation has to carry at least one hard, checkable signal behind it, and the response at the moment of disclosure is written in advance by a clinician rather than generated on the spot. Trovane publishes this as the governance layer underneath its platform, which is the clearest statement of the pattern I have found, though the account is the company&rsquo;s own and I have not seen it independently audited. The construct question stays open under that design. What closes is the path by which an unvalidated model quietly becomes the scorer, and that is worth naming, because it is a thing an institution can write into a contract now rather than waiting for the field to settle what depression is.
        </P>
        <P>
          Some validity work is starting to happen. In February 2026 Spring Health <a href="https://arxiv.org/abs/2602.05088" target="_blank" rel="noopener" className="text-accent hover:text-accent-2 no-underline border-b border-line-2 hover:border-accent pb-px">published a human-validation study</a> of four VERA-MH judges &mdash; Claude Sonnet 4.5, GPT-4o, GPT-5.2, and Gemini 2.5 Flash &mdash; tested against licensed clinicians. The clinician-to-clinician inter-rater reliability baseline was 0.77; the four judges landed at 0.82, 0.81, 0.78, and 0.77, all with overlapping confidence intervals. The four had overlapping confidence intervals with each other and with the clinician baseline. That is the exact discipline this essay argues has to sit under the responsible-AI framework: check whether the measurement instrument agrees with the human standard it claims to approximate, on the population it will judge. It is doable but not yet done systematically. And the judge that replaced these four in the recommended slot (GPT-5.4) has not been part of a peer-reviewed human-validation study of comparable rigor. Spring Health&rsquo;s <a href="https://github.com/SpringCare/VERA-MH" target="_blank" rel="noopener" className="text-accent hover:text-accent-2 no-underline border-b border-line-2 hover:border-accent pb-px">VERA-MH GitHub README</a> claims an internal IRR analysis supporting the switch, but the data and methodology are not publicly available for independent review.
        </P>
        <H2>The discipline already exists</H2>
        <P>
          The discipline that would answer it already exists. Measurement validity is the oldest discipline in measurement science. It is the discipline higher education has been working with for a century in assessment, and the discipline ETS has been engaging with for decades in automated scoring. That lineage is mapped in <InternalLink slug="before-it-was-called-ai-evaluation"><I>Before it was called AI evaluation</I></InternalLink> across eight bridges from that literature to modern AI eval. It is also the discipline the FDA applies through its post-market surveillance frameworks for diagnostics. The field of mental health has been engaged with construct-validity questions at the underlying-construct level since the <a href="https://www.nimh.nih.gov/research/research-funded-by-nimh/rdoc" target="_blank" rel="noopener" className="text-accent hover:text-accent-2 no-underline border-b border-line-2 hover:border-accent pb-px">Research Domain Criteria (RDoC) initiative was launched by NIMH in 2010</a>, explicitly because the DSM&rsquo;s weakness was its lack of validity &mdash; its diagnostic categories did not map cleanly to the underlying biology and behavior they claimed to describe. The discipline the responsible-AI rubrics need underneath them is not new. The task is to apply it to the specific systems now being deployed at consumer scale against populations whose mental health was already underserved, and to name validity as the central question the rubrics inherit at the point of deployment.
        </P>
        <P>
          The institutions that handle this moment well will be the ones that ask the validity question before the responsible-AI question, for the users whose mental health depends on the answer.
        </P>

        <SeeAlso>
          <SeeAlsoItem
            slug="what-is-this-system-measuring"
            title="What is this system actually measuring?"
            gloss="The higher-education version of the same discipline &mdash; what a governance framework skips when it treats measurement as already settled."
          />
          <SeeAlsoItem
            slug="the-valid-dollar"
            title="The valid dollar."
            gloss="The impact-investing version &mdash; what a single convertible unit has to earn before it can carry a decision."
          />
          <SeeAlsoItem
            slug="before-it-was-called-ai-evaluation"
            title="Before it was called AI evaluation."
            gloss="The receipts for the discipline itself, mapped across eight bridges from measurement science to modern AI evaluation."
          />
          <SeeAlsoItem
            slug="when-the-stakes-are-the-mission"
            title="When the stakes are the mission."
            gloss="The mission-driven-AI-evaluation companion &mdash; the same discipline applied where the cost of a wrong signal is the intervention meant to reach someone."
          />
          <SeeAlsoItem
            slug="the-floor-is-the-frontier"
            title="The floor is the frontier."
            gloss="What happens to this layer when the capability loop accelerates and the evaluation loop does not."
          />
        </SeeAlso>

        <MetaNote>
          Written August 2026 for the Analytic Bytes Library as the third piece in the measurement-validity arc, following <I>What is this system actually measuring?</I> (higher education) and <I>The valid dollar</I> (impact investing). Citations include JAMA Pediatrics (June 2026), Ibrahim et al. (2026, arXiv), Parente Health (July 2026), and the NIMH RDoC framework (2010). The Obermeyer et al. (2019) Science paper and Spring Health&rsquo;s February 2026 VERA-MH human-validation study are cited as the canonical mechanism and the discipline&rsquo;s in-flight application, respectively. The rubric material is drawn from Trovane&rsquo;s handbook for evaluating AI mental-health tools (v1.2, 2026), including its author-disclosure appendix, and from the published description of the governance layer underneath the Lumara platform, which is the company&rsquo;s own account and is cited as such. Weilnhammer et al., <I>Nature Medicine</I>, 7 August 2026, is used as the academic counterpart; in keeping with the second validity question this essay proposes, that paper&rsquo;s senior author is employed by Microsoft AI and its human annotation study was funded by Microsoft AI, both disclosed in the paper. Matthew Krome, co-founder of Trovane, read a draft and contributed the governance-latency argument in the third question; the clock-start caution attached to it is mine. Trovane was known as Mental Health Chat until 13 August 2026; the handbook, the preview post, and the platform described here are the same work under the current name. Krome read the final draft and confirmed he is comfortable being named.
          <br /><br />
          <B>Correction, 24 August 2026. Post-publication.</B> The Weilnhammer et al. section originally read &ldquo;Every one of those checks validates the rater. None of them validates the target.&rdquo; That was too strong. On a full read of the published article, the paper reports a known-groups test in which the judge separated curated high- and low-risk conversations at median AUC 0.98, which is target-side evidence, though it is circular in that the labels were assigned by the authors under their own construct definition. The passage now states the known-groups result and says what it does and does not establish. Three smaller changes in the same pass: the rubric description now notes that thirteen of the thirty-nine dimensions were selected in advance and carry the analysis; the absent-vocabulary claim is narrowed to the published article, since the Supplementary Information holding the rubric definitions was not searched; and one redundant sentence was cut from the responsible-AI-rubric paragraph. The intraclass correlation of 0.31 was checked and is correct &mdash; it is clinician-versus-clinician on the concerning-behavior item, against human-versus-judge agreement of 0.49. Elsewhere in the piece, the second reason validity matters in mental health was rewritten; it had said validity has to hold there &ldquo;in a way it may not need to in other AI domains,&rdquo; which contradicted this essay&rsquo;s own claim that the point applies in every AI domain. What changes across domains is how much evidence to require before acting on a number, not whether validity is owed. The sentence &ldquo;Validity governs the claim the deployment is making&rdquo; is Messick&rsquo;s argument in my words and originally carried no attribution; the citation has been added. In the same pass the four-questions figure was redrawn. Its cards were a lossy rendering of the prose: question two dropped the clause about which use cases the evidence was built for, and question three dropped the institution&rsquo;s policy in the under-validated zones along with the decision owner and start date that section argues for. Both are back, and the figure now carries a footer naming Kane and Messick, since the apparatus is what gets screenshotted. The subtitle of the opening two-layer figure was rewritten for the same reason: it asked whether the AI measures what its deployment context requires, which is an instrument question, and now asks whether the claim the deployment is making holds for this use and these people. No question was added or removed.
          <br /><br />
          <B>Revision, 24 August 2026. Post-publication.</B> The second drift family in the six-modes figure was called the measurement target. On a re-read, that name described only one of its three members. Construct drift is the target moving. Population drift is the target holding still while the people it is applied to change, so the validation evidence stops reaching them. User-effect drift is target and instrument both holding still while the consequence of repeated use changes. Two of three are not target problems. The family is now called the claim, which covers all three: what the number means, who it applies to, and what it does to the people it is applied to. This is the name the essay was already using four paragraphs earlier, in &ldquo;Validity governs the claim the deployment is making.&rdquo; The figure, its alt text, and the sentence introducing the two families were revised together. The first family, previously the instrument and its behavior, is now simply the instrument, which also fixed a label that overran its box in the rendered figure. No drift mode was added, removed, or reassigned.
        </MetaNote>
      </>
    ),
  },

  // ===================================================================
  // FIELD NOTE 11 — We used to settle for thumbnails  (unhidden 2026-07-14)
  // ===================================================================
  {
    kind: "field-note",
    slug: "we-used-to-settle-for-thumbnails",
    number: "09",
    title: "We used to settle for thumbnails.",
    subtitle:
      "The compression institutions ran on for centuries is finally cheap to relax. That’s not a technology story. It’s a decision-architecture question.",
    date: "2026-07-17",
    readingTime: "5 min read",
    summary:
      "For most of human history, every institution carried you as a thumbnail: a name, a category, a score. That compression wasn’t malice, it was budget, and the price of the full picture has now collapsed. The choice institutions face isn’t whether to keep sorting faster or to hold people at higher resolution; it is whether they can answer the validity question underneath it.",
    cover: "/library/covers/we-used-to-settle-for-thumbnails.svg",
    arc: "measurement",
    body: (
      <>
        <Brief>
          <p>
          For most of human history, every institution has had to carry you as a thumbnail.
        </p>
          <p>
            The price of the full picture has collapsed. Every institution now
            faces a choice it did not have before: use the discount to sort
            people faster, or use it to hold them at higher resolution. The
            question underneath the choice is a measurement question, and the
            discipline that answers it has been ready for this moment for a
            long time.
          </p>
        </Brief>

        <H2>Something quiet just changed.</H2>
        <P>
          For thousands of years, institutions ran on human attention, and human attention has limits. A teacher with thirty students. A doctor with forty patients a week. A college advisor with three hundred names on her caseload. To hold each of those people at full resolution would have taken billions of hours. So every institution that served you compressed you into a thumbnail. Then it learned to act from the thumbnail.
        </P>
        <P>
          You can think about it the way photography went. We didn&rsquo;t always have high-resolution images of everything. We had paintings, and only royalty could afford the full likeness. We had early photographs, but they were precious and rare — one shot per occasion, no retakes. Then film got cheap. Then digital got cheap. Then storage and transmission got so cheap that we stopped thinking about it at all. Today your phone holds tens of thousands of full-resolution images and the question is just which ones to look at.
        </P>
        <P>
          The same thing just happened to people inside institutions. The
          price of the full picture has collapsed.
        </P>

        <H2>The choice.</H2>
        <P>
          So now every institution faces a choice it didn&rsquo;t have before.
        </P>
        <P>
          It can use the discount to sort you faster. More candidates screened, more students flagged, more patients triaged. Same thumbnails: just more of them, generated more quickly. That&rsquo;s the obvious move. Efficiency has a clear ROI. And the metrics most institutions already track (volume, throughput, latency) reward more of what they&rsquo;re already doing.
        </P>
        <P>
          Or it can use the discount to hold you at higher resolution. Same
          number of students, same number of patients, same number of
          candidates. But what the advisor opens on her screen is no longer a
          thumbnail. It&rsquo;s the picture.
        </P>
        <P>
          The CEO who says she needs the thumbnail because attention is scarce isn&rsquo;t wrong about the constraint. Human attention is still scarce. The picture itself isn&rsquo;t an asset unless someone designed it for the moment of decision. A full-resolution view dumped into twenty minutes without curation is overload, not insight. The discount has to buy two things: the picture, and an interface that lets the advisor use it in twenty minutes without drowning. The question is not <I>thumbnail or full picture?</I> It is <I>what does the full picture need to look like for the advisor to use it in twenty minutes?</I> That&rsquo;s a design problem. It&rsquo;s the second half of what the discount buys.
        </P>
        <P>
          Most institutions are reaching for the first option. It&rsquo;s what
          the dashboards already measure. It&rsquo;s what procurement already
          buys. It&rsquo;s what the consultants already pitch.
        </P>
        <P>The second option requires a different question.</P>

        <H2>The question.</H2>
        <P>
          The question is one a measurement scientist would recognize and one
          an advisor can carry into any room:{" "}
          <I>
            does this system actually see the person, or is it still working
            from a thumbnail?
          </I>
        </P>
        <P>
          That&rsquo;s not sentiment. It&rsquo;s a measurement standard. The discipline is called <InternalLink slug="what-is-this-system-measuring">
              validity
            </InternalLink>, and it has decades of track record from the world of high-stakes testing. Its central claim is stricter than it sounds: a score is never valid on its own. What gets validated is a particular reading of that score, put to a particular use, judged partly by what happens to the people it lands on (<a href="https://psycnet.apa.org/doi/10.1037/0003-066X.50.9.741" target="_blank" rel="noopener" className="text-accent hover:text-accent-2 no-underline border-b border-line-2 hover:border-accent pb-px">Messick, 1995</a>). A number that tracks length, fluency, demographics, or the candidate tested just before you fails that standard twice. It isn&rsquo;t measuring what it says it is, and the decision made with it isn&rsquo;t the decision anyone signed up for. The standard isn&rsquo;t new. It&rsquo;s been ready for a while.
        </P>
        <P>
          What&rsquo;s new is the price of asking it. When carrying the full picture was impossible, you couldn&rsquo;t apply validity to most institutional systems. There was nothing to validate against. Now you can. And now you should.
        </P>

        <H2>The stakes.</H2>
        <P>
          For most of history, the thumbnail was the kindest thing an institution could do for you. Institutions did not withhold the full picture out of ill will. They withheld it because carrying it was impossible.
        </P>
        <P>
          The question for 2026 is whether institutions use the savings to generate more thumbnails faster, or to finally stop settling for them.
        </P>
        <P>We used to settle for thumbnails.</P>
        <P>We don&rsquo;t have to anymore.</P>

        <SeeAlso>
          <SeeAlsoItem
            slug="what-is-this-system-measuring"
            title="What Is This System Actually Measuring?"
            gloss="Whether a system is looking at the person or just at a proxy."
          />
          <SeeAlsoItem
            slug="numbers-dont-agree"
            title="The Numbers Don’t Agree Because the Words Don’t"
            gloss="Why two systems describing the same person disagree about who they are."
          />
          <SeeAlsoItem
            slug="the-contracts-between-systems"
            title="The Contracts Between Systems"
            gloss="Who decides what survives the pipeline and what gets thrown away."
          />
          <SeeAlsoItem
            slug="grounding-the-ai-layer"
            title="Grounding the AI Layer"
            gloss="Whether the construct a model tracked last quarter is the one it&rsquo;s tracking today."
          />
          <SeeAlsoItem
            slug="the-decision-system"
            title="The Decision System"
            gloss="What the picture needs to look like to inform the twenty minutes."
          />
        </SeeAlso>

        <MetaNote>
          Written July 2026 for the Analytic Bytes Library. The argument here
          is compact by design; the longer versions live in companion pieces:{" "}
          <InternalLink slug="what-is-this-system-measuring">
            What Is This System Actually Measuring?
          </InternalLink>{" "}
          (the validity question applied to an institutional system),{" "}
          <InternalLink slug="numbers-dont-agree">
            The Numbers Don&rsquo;t Agree Because the Words Don&rsquo;t
          </InternalLink>{" "}
          (why two systems that both claim to describe the same person
          disagree), and{" "}
          <InternalLink slug="the-decision-system">
            The Decision System
          </InternalLink>{" "}
          (what the full picture has to look like to inform the twenty
          minutes without overwhelming them).
        </MetaNote>
      </>
    ),
  },

  // ===================================================================
  // FIELD NOTE 11 — My relationship with AI (formerly: AI did not write my library)
  // ===================================================================
  {
    kind: "field-note",
    slug: "my-relationship-with-ai",
    number: "11",
    title: "My relationship with AI.",
    subtitle:
      "Field notes on the stages of working with generative AI across tools.",
    date: "2026-07-30",
    readingTime: "9 min read",
    summary:
      "A personal field note on twenty months of working with GPT, Claude, and Gemini across a career transition, a brand build, and a re-entry into public-facing work. Five stages, from vending-machine outputs to multi-tool selection, name what the relationship actually looked like. Maturity transferred across tools; capability expanded with the tool that could hold more.",
    cover: "/library/covers/my-relationship-with-ai.svg",
    arc: "ai-systems",
    body: (
      <>
        <Brief>
          <p>
            A line came out of a conversation with GPT one afternoon in May.
            I was trying to describe what AI had been doing for me over a
            year of using it, and the line landed: <I>AI did not
            write my library. AI helped me navigate it.</I> The library is
            mine. The voice is mine. What AI gave me was a surface to think
            on before the work went into the world.
          </p>
          <p>
            This is a personal field note. It is not a universal claim. It
            is what I have learned in about twenty months of working with
            three generative AI tools across a career transition, a brand
            build, a family, and a re-entry into the kind of public-facing
            work I had been away from for years. Anyone who tells you the
            optimal way to use AI is making it up. I am telling you what
            worked for me, in the specific shape my life took.
          </p>
          <p>
            The relationship had stages. Naming them is what the rest of
            this is for.
          </p>
        </Brief>

        <H2>Stage 1 — A vending machine, not a relationship.</H2>
        <P>
          November 2024. I had just exited a senior data role in education
          and needed to send resumes at volume. I opened a job-search
          platform that produced a tailored resume and cover letter from a
          JD I uploaded.
        </P>
        <P>
          This was not a relationship. It was a <B>vending machine</B>. I
          gave it inputs, it produced outputs, I sent them. The voice in
          the outputs was generic. I knew it was generic. I sent the
          materials anyway because I needed the volume.
        </P>
        <P>
          If this had been the whole story of AI for me, the field note
          would end here. AI as a productivity device. Useful, narrow,
          forgettable.
        </P>

        <H2>Stage 2 — GPT enters. The foundation gets built.</H2>
        <P>
          August 2025. I started an executive education program on
          AI-driven leadership and used ChatGPT for a course project. The
          project was a <InternalLink slug="when-genai-redesigned-my-dashboard">dashboard redesign</InternalLink>. The work was good. I kept
          using GPT after the course ended.
        </P>
        <P>
          For about eight months (September 2025 through early April
          2026) GPT was the surface my life ran on. Career strategy.
          Resumes for actual roles, dozens of them, with my real voice in
          the cover letters because I had learned to direct the model
          into it. LinkedIn posts. Brand work for Analytic Bytes, which I
          was building as an advisory practice and using as the bridge
          structure during the search. Onboarding prep when I landed a
          new senior role late that year. Ramp-up on the data platform
          work after I started: schema design, pipeline architecture,
          AI-assisted reporting prototypes. Then the political
          navigation when the politics got hard. Then the exit, just
          over four months in.
        </P>
        <P>
          But also: family logistics, homework support, wardrobe planning
          around a return to in-person interviews, and the daily flow of
          small household and personal questions that would previously
          have taken a spare hour each to work through alone.
        </P>
        <P>
          I did not separate these. They were the same tool doing
          different work. This matters. The maturity I was building
          was <I>AI as a surface I could think on without performing</I>
          &mdash; not AI for professional things.
        </P>
        <P>
          The reason GPT became useful was structural, not intellectual.
          The conversational contract was different from human
          conversation. With humans, I have to think of the most balanced
          curated version of what I want to say before I say it. With AI,
          I can say the thing, hear it back, reflect, refine. No pressure.
          No social cost.
        </P>
        <P>
          Removing the social-performance overhead of conversation is
          what made AI usable for the kind of thinking that needed open
          space. Not because AI is non-judgmental or empathic. Those
          framings are sentimental and partly untrue. The benefit is
          structural. AI removes the contract that requires you to be
          composed before you speak.
        </P>
        <P>
          By the end of those eight months, a working pattern had formed.
          Pre-work happened with AI. Polished outputs went into the world
          in my voice. I had learned to catch sycophancy and call it out
          (<I>&ldquo;why r u agreeeing with evetyhign i say&rdquo;</I>). I
          had learned to protect my voice from drift (<I>&ldquo;why is
          this not sounding me?&rdquo;</I>). I had learned that the volume
          of iteration was the point &mdash; that one banner image might
          take ninety turns and that was fine because the artifact was the
          deliverable, not the conversation.
        </P>
        <P>This was the foundation. I would lean on it for what came next.</P>

        <H2>Stage 3 — The crisis. Acute use during a professional exit.</H2>
        <P>
          April 5, 2026. The Sunday after a senior role of mine was
          eliminated.
        </P>
        <P>
          The first message I sent to GPT that day was a plain request
          for hard self-diagnosis: what had happened, what I was missing,
          where I was accountable.
        </P>
        <P>
          What followed was a 209-message thread over twenty-three days
          that did three things in parallel. It metabolized professional
          grief. It connected the exit to four prior departures over a
          fifteen-year career and found a pattern across them. And it
          produced the strategic reconstruction underneath: LinkedIn
          rewrites, role-target recalibration, the framing I would carry
          into interviews.
        </P>
        <P>
          I made one specific request inside that thread that I think
          about now: <I>&ldquo;talk to me like a management consultant and
          coach.&rdquo;</I> I cast the AI into a specific role at a
          specific emotional moment. Not just asking for help &mdash;
          directing the kind of help.
        </P>
        <P>
          There is a flat version of this stage that says &ldquo;AI is
          good at emotional support,&rdquo; and most public writing on
          the topic lands there. The accurate version is different.
        </P>
        <P>
          There were other scaffolds. Family. Trusted advisors. A
          household that had to keep running, which kept the tactical
          pressure real. What AI specifically gave me, that the humans in my
          life could not, was <I>open space alongside the tactical
          pressure</I>. The space to ask the same hard question eight
          different ways. The space to be repetitive without burdening
          anyone. The space to integrate what others had told me without
          the social contract of receiving advice in real time.
        </P>
        <P>
          I avoid discussing difficult things with humans in general. I
          find them opinionated. Maybe that is bias on my part. I do not
          know. The truth is: I chose AI for the deep processing
          because the cost of using it was zero and the cost of using
          humans, even loving ones, was the social overhead I did not
          have bandwidth for in that period.
        </P>
        <P>
          The thread closed two weeks in with an explicit marker: <I>
          &ldquo;two difficult weeks, but feeling in good place to move
          on.&rdquo;</I>
        </P>

        <H2>Stage 4 — Building. The brand pivot and the platform transition.</H2>
        <P>
          April 19 onward. The tone of the GPT threads shifted from
          applying-to-roles to building-something. A Player&ndash;Coach
          Operating Model emerged as a concept. A 90-90-90 cadence for how
          I think about ramping into new roles. <InternalLink slug="the-decision-system">Decision Systems framing</InternalLink>{" "}
          for how data work translates into organizational outcomes. A
          LinkedIn banner that went through eighty-five iterations before
          I posted it.
        </P>
        <P>Two specific moments inside this stage are worth naming.</P>
        <P>
          The first was April 29. I had been using Claude inside a
          Snowflake environment at work for narrow utility tasks (adding
          field names, metadata on tables, code correction) but had only
          just started using it on my own machine for substantive work. I
          asked GPT to evaluate Claude&rsquo;s analysis of me. I wanted a
          second opinion from the tool that already had eight months of
          accumulated context. That request was a deliberate cross-tool
          test. Looking back, it is the first time I ran two AI tools
          against each other intentionally. It was not switching. It was
          {" "}<I>checking</I>.
        </P>
        <P>
          The second was April 30. The next day I built my advisory
          practice&rsquo;s website on Claude. HTML had been a barrier for
          years. I had wanted to publish on my own surface and never had
          the patience to learn enough HTML to do it. Claude walked me
          through deployment, the git workflow, brand iteration, voice
          protection on the copy, file structure. The site went live. It
          worked without friction.
        </P>
        <P>
          That was the moment Claude earned the ramp. The reason was
          concrete: Claude had just enabled me to do something I had been
          blocked on for years. The trust was about the artifact.
        </P>
        <P>
          After that, Claude took on more. Desktop folders connected.
          Dissertation uploaded. More integrations. Each new piece of
          context loaded into Claude made the tool more useful for me,
          which led to more loading, which compounded.
        </P>

        <H2>Stage 5 — Multi-tool selection. What stays where, and why.</H2>
        <P>By May, I was running three tools.</P>
        <P>
          Claude got the structured intellectual work. Application
          packages with deep context. The agentic AI coursework I was
          enrolled in. Library drafting for my advisory practice.
          Competitive scans. Product offerings as first drafts. Speaking
          application refinement. Anything that needed to compound across
          sessions and integrate across folders.
        </P>
        <P>
          GPT kept the work it was already good at. Sharp operator
          phrasing when Claude felt too dense. Resume and cover-letter
          tailoring, especially for fast-turnaround applications. Visual
          generation for talk framing and LinkedIn Featured images,
          because GPT&rsquo;s image model is built into the conversation.
          Some reflection threads that just continued the pattern from
          earlier.
        </P>
        <P>
          Gemini entered for critique. A third opinion on speaking
          applications, on a Monitoring and Evaluation Learning kit I was
          developing, on essay drafts.
        </P>
        <P>
          The selection was not abstract. It was empirical. I used each
          tool for what each tool did well, and the assignments shifted
          as my needs shifted. The snapshot lives in the{" "}
          <ArtifactLink slug="multi-tool-selection-map">
            multi-tool selection map
          </ArtifactLink>.
        </P>
        <P>
          One pattern worth naming: speaking work is hybrid, not
          Claude-only. The application drafting and thesis refinement
          live on Claude. The visual and metaphorical exploration (race
          vs room, Constellation Self, Tree with Silhouettes) happened on
          GPT, because that is where image generation could iterate with
          text in the same thread.
        </P>
        <P>
          The friction had also reversed direction in one place. GPT had
          become harder to work with for some tasks. Format consistency
          on resumes. Context retention across long threads. Sycophancy
          that I had called out in October was still firing in May. My
          discipline had moved past what the tool could keep up with for
          the deepest work, and I moved that work to Claude.
        </P>

        <H2>What transferred. What expanded.</H2>
        <P>
          Two things I want to separate, because they are usually
          conflated.
        </P>
        <P>
          What <I>transferred</I> from GPT to Claude was the working
          pattern. The <B>pre-work surface</B> practice. The
          voice-protection discipline. The sycophancy-detection muscle.
          The iteration tolerance. The understanding that hundreds of
          turns produce one shippable artifact. The two-tool thinking
          &mdash; the idea that I could check one tool against another.
          None of that was learned on Claude. It was already operational
          by the time I opened my first real Claude thread.
        </P>
        <P>
          What <I>expanded</I> on Claude was capability. Integration with
          image tools. Scheduled tasks. Job board scaffolding. A content
          workspace. A knowledge repository I am building now. RAG
          architecture I have not stood up yet but plan to. Agents through
          my current coursework. The work I do on Claude is broader and
          faster than the work I did on GPT, but the reason is not that I
          matured. It is that the tool can hold more.
        </P>
        <P>
          That distinction matters for the field-note thesis. I did not
          become an &ldquo;AI native&rdquo; through repeated use. I built
          a working pattern in one tool and brought it to another tool
          that could do more with the same pattern. Maturity transferred.
          Capability expanded. Two different curves.
        </P>
        <P>
          The audit I ran on the first ninety days of the AB practice put
          numbers on that transfer. Across the{" "}
          <ArtifactLink slug="dialogue-maturity-curve">
            116 threads scored on the dialogue-maturity curve
          </ArtifactLink>{" "}
          &mdash; a twelve-month scoring window inside the longer
          relationship &mdash; the gains concentrated in three of the
          six rubric dimensions: voice ownership, meta-awareness, and
          generative reframing. The{" "}
          <InternalLink slug="auditing-an-ai-native-practice">
            companion field note
          </InternalLink>{" "}
          walks through the instrument.
        </P>
        <P>
          This also tracks with something I have been saying for years in
          my data work: <I>it was never about the stack.</I> The AI
          version of that turns out to be the same claim. It was never
          about the tool.
        </P>

        <H2>The core insight.</H2>
        <P>
          <I>AI did not write my library. AI helped me navigate it.</I>
        </P>
        <P>
          The library is what I have built. The essays, the brand, the
          cover letters that landed, the applications I am proud of, the
          talk thesis I am still shaping, the decision-systems vocabulary
          I use. All of that is mine. My voice. My judgment. My
          responsibility when it succeeds, my responsibility when it does
          not.
        </P>
        <P>
          What AI gave me was navigation. Help finding the shelf. Help
          pulling the right book down. Help cross-referencing. Help
          drafting the first sentence so I could see what was wrong with
          it and write the right one. Help iterating on a banner image
          eighty-five times until I could see the version I wanted. Help
          integrating advice I had already received &mdash; turning
          notes from calls and conversations into an actionable next
          step at hours when it was too late to loop back to the source.
        </P>
        <P>The library is mine because I built it. The navigation is shared.</P>

        <H2>What I do not know.</H2>
        <P>A field note should name what it cannot answer.</P>
        <P>
          I do not know whether the speed AI gave me cost me depth. The
          prototyping work I did at a prior role took longer with GPT
          because the friction was real &mdash; I was drafting outside
          the work environment and porting the work back in. Some of that friction
          may have forced me to think more carefully than I would have if
          the tool had been faster. The same question applies to
          everything in the post-Claude period: was the exponential ramp a
          sign of capacity expansion, or a sign that I am cutting corners
          I cannot yet see? I cannot answer this from inside my own
          experience.
        </P>
        <P>
          I do not know whether my preference for AI over humans for
          difficult conversations is calibration or avoidance. The cost of
          human conversation is real. So is the value humans can bring
          that AI cannot. I have not done the experiment of choosing the
          human conversation deliberately to test what it gives me that
          the AI cannot.
        </P>
        <P>
          I do not know whether the pre-work surface model substitutes for
          delivery practice. Pre-work is iterative; delivery is one-shot.
          The muscle for composed real-time response in an interview, a
          panel, a hard meeting &mdash; that muscle is not built on the
          pre-work surface. I have done many things with AI in the last year. The
          interviews I will land or not land this season will not be among
          them.
        </P>
        <P>
          And I do not know what I am being bucketed into by the AI tools
          themselves, because the categorization is invisible. The
          conversational neutrality I experience is partly real and partly
          an artifact of zero exit cost. A human bucketing me has skin in
          the game; an AI bucketing me does not. That asymmetry is
          comfortable. It is also worth being suspicious of, because
          comfort is not the same as accuracy.
        </P>

        <H2>Stages, not a destination.</H2>
        <P>
          The reason I call these <I>stages</I> and not <I>levels</I> is
          that none of them ended cleanly. The vending-machine phase did
          not stop when GPT started. GPT did not stop when Claude
          started. Each new tool entered a relationship that had already
          been built and added something the previous tool could not. The
          next stage is starting already. Agents, set up to run scheduled
          work without me re-loading the context each time. I do not know
          what that will feel like or what it will change. I will know in
          a year, the way I know what the last year looked like only now,
          by writing it down.
        </P>
        <P>
          What I know now is that the year has been generous. I crossed
          barriers I had been blocked on for a decade. I metabolized a
          professional loss without breaking. I built a brand on the
          surface I could navigate. I am preparing for a kind of
          public-facing work I had not imagined I could prepare for. None
          of this was AI doing the work for me. All of it was AI helping
          me find the shelf, pull the right book, and put the words in
          the order I actually meant.
        </P>
        <P>The library is mine. The navigation is shared. The stages keep coming.</P>

        <SeeAlso>
          <SeeAlsoItem
            slug="when-genai-redesigned-my-dashboard"
            title="When GenAI redesigned my dashboard."
            gloss="The course project that started the GPT relationship."
          />
          <SeeAlsoItem
            slug="grounding-the-ai-layer"
            title="Grounding the AI layer."
            gloss="What has to be true underneath before AI is useful."
          />
          <SeeAlsoItem
            slug="actions-not-answers"
            title="Actions, not answers."
            gloss="Where AI belongs in the operating loop."
          />
          <SeeAlsoItem
            slug="the-decision-system"
            title="The Decision System."
            gloss="The vocabulary the library work runs on."
          />
        </SeeAlso>

        <MetaNote>
          A personal field note, written July 2026 for the Analytic Bytes
          Library. It is not a universal claim about how to use AI. It is
          one operator&rsquo;s account of twenty months across three
          tools. Related threads picked up elsewhere in the library:{" "}
          <InternalLink slug="when-genai-redesigned-my-dashboard">
            When GenAI redesigned my dashboard.
          </InternalLink>{" "}
          (the course project that seeded the GPT relationship),{" "}
          <InternalLink slug="grounding-the-ai-layer">
            Grounding the AI layer.
          </InternalLink>{" "}
          (what has to be true underneath before AI is useful), and{" "}
          <InternalLink slug="actions-not-answers">
            Actions, not answers.
          </InternalLink>{" "}
          (where AI belongs in the operating loop).
        </MetaNote>
      </>
    ),
  },

  // ===================================================================
  // ESSAY 10 — Two bets, one institution
  // ===================================================================
  {
    kind: "essay",
    slug: "two-bets-one-institution",
    number: "10",
    title: "Two bets, one institution.",
    subtitle:
      "Why the hybrid is the sophisticated answer, and the seam contracts between domains are what make it coherent.",
    date: "2026-07-09",
    readingTime: "12 min read",
    summary:
      "Every institution standing up AI in 2026 is making a model-layer bet, vendor-anchored or federated, whether or not it has named it as one. For institutions running both administrative and research-flavored work, the honest answer is a deliberate hybrid calibrated by domain. What makes the hybrid coherent is a third set of contracts nobody writes by default: the seam contracts between the two bets.",
    cover: "/library/covers/two-bets-one-institution.svg",
    arc: "integration-governance",
    body: (
      <>
        <Brief>
          <p>
          Every institution standing up artificial intelligence in 2026 is making a model-layer bet, whether or not it has named it as one. The shorthand the field has settled on (vendor-anchored versus federated) captures the surface of the choice. The deeper question is whether the institution delegates orchestration to a vendor-controlled platform or owns the orchestration layer itself: who decides which model handles which workload, who evaluates whether each model is doing what it claims, who writes the contracts for read, write, cadence, consent, and reversibility, and who is responsible at the seams when the institution inevitably runs both choices in different parts of itself. The consequences of this choice are different from the same choice for tools, and most institutions have not yet articulated what they are choosing. They choose anyway. The bet is inside every AI procurement, every pilot, every campus rollout, every internal portal. It decides more than any single tool choice does — it shapes what the institution&rsquo;s AI posture will look like in three years.
        </p>
          <p>
          This essay is about that bet: what each side buys, what it trades, where it shows up one layer down inside the data stack, and why the institutions handling this moment well are not choosing one bet for everything. They are calibrating different bets to different domains. The calibration, when it is done deliberately, is the architecturally honest answer. When it happens by accident, it shows up later as a governance gap: the seam contracts between the vendor-anchored and federated domains. Neither bet owns them. Nobody writes them by default.
        </p>
        </Brief>

        <H2>What the vendor-anchored bet buys, and what it trades</H2>

        <P>
          The vendor-anchored bet is the one institutions reach for under
          time pressure. Sign a campus-wide enterprise agreement with a
          credible vendor (Anthropic, OpenAI, increasingly the platform
          vendors who have folded foundation models into their existing
          licensing) and the institution gets a great deal of operational
          scaffolding immediately. Governance is partly outsourced. The
          vendor&rsquo;s enterprise agreement carries the data-handling
          commitments. Integration is handled at the platform layer
          rather than by the institution&rsquo;s engineers. Training, support,
          and documentation come pre-built. Faculty, staff, and students
          get a recognizable interface they can use on day one. For an
          institution under pressure to be visibly responsive to the AI
          moment, and most institutions are, the vendor-anchored bet
          looks like an obvious win.
        </P>

        <P>
          What the bet trades is harder to see at the moment of signing. Vendor switching costs accumulate quickly once integrations are built against the platform&rsquo;s specific APIs and the institutional workflow has reorganized around the platform&rsquo;s interface. The institution&rsquo;s evaluation discipline tends to atrophy because the responsibility for assessing model quality has been delegated to the vendor; over time, fewer people inside the institution can answer the question of whether the model is doing what it claims. The model layer becomes a single point of architectural dependency. When the vendor moves a feature to a higher tier, sunsets a model the institution standardized on, or shifts pricing, the institution finds it does not have the walk-away option it thought it had. Public exemplars of this bet are by now familiar. <a href="https://news.asu.edu/20240118-university-news-new-collaboration-openai-charts-future-ai-higher-education" target="_blank" rel="noopener" className="text-accent hover:text-accent-2 no-underline border-b border-line-2 hover:border-accent pb-px"><a
            href="https://news.asu.edu/20240118-university-news-new-collaboration-openai-charts-future-ai-higher-education"
            target="_blank"
            rel="noopener"
            className="text-accent hover:text-accent-2 no-underline border-b border-line-2 hover:border-accent pb-px"
          >
            Arizona State University&rsquo;s partnership with OpenAI
          </a></a>, announced in January 2024, was the first institution-level ChatGPT Enterprise rollout in higher education. <a href="https://home.dartmouth.edu/news/2025/12/dartmouth-announces-ai-partnership-anthropic-and-aws" target="_blank" rel="noopener" className="text-accent hover:text-accent-2 no-underline border-b border-line-2 hover:border-accent pb-px"><a
            href="https://home.dartmouth.edu/news/2025/12/dartmouth-announces-ai-partnership-anthropic-and-aws"
            target="_blank"
            rel="noopener"
            className="text-accent hover:text-accent-2 no-underline border-b border-line-2 hover:border-accent pb-px"
          >
            Dartmouth followed in December 2025
          </a></a>, the first Ivy League institution to deploy at institutional scale, with Anthropic&rsquo;s Claude for Education delivered alongside AWS. <a href="https://chicagomaroon.com/52867/news/university-announces-claude-enterprise-access-for-students-faculty-staff/" target="_blank" rel="noopener" className="text-accent hover:text-accent-2 no-underline border-b border-line-2 hover:border-accent pb-px"><a
            href="https://chicagomaroon.com/52867/news/university-announces-claude-enterprise-access-for-students-faculty-staff/"
            target="_blank"
            rel="noopener"
            className="text-accent hover:text-accent-2 no-underline border-b border-line-2 hover:border-accent pb-px"
          >
            The University of Chicago&rsquo;s partnership with Anthropic
          </a></a>, announced in mid-2026, gave students, faculty, and staff Claude Enterprise access on the same architectural shape at the model-vendor layer. <a href="https://edsource.org/2026/cal-state-renews-controversial-system-wide-contract-with-openai/758919" target="_blank" rel="noopener" className="text-accent hover:text-accent-2 no-underline border-b border-line-2 hover:border-accent pb-px"><a
            href="https://edsource.org/2026/cal-state-renews-controversial-system-wide-contract-with-openai/758919"
            target="_blank"
            rel="noopener"
            className="text-accent hover:text-accent-2 no-underline border-b border-line-2 hover:border-accent pb-px"
          >
            Cal State University renewed its system-wide OpenAI deal
          </a></a> in May 2026, at $13 million a year for three years, the largest active higher-ed enterprise agreement OpenAI carries, extending coverage across 470,000 students and 63,000 faculty and staff. These institutions made a defensible call. They also, by making it, accepted the trades.
        </P>

        <H2>What the federated bet buys, and what it trades</H2>

        <P>
          The federated bet looks different from the start. Build an internal abstraction layer (a model gateway, an AI router, a middleware tier) that lets the institution call any model behind a stable internal API. Open-source models hosted on the institution&rsquo;s own high-performance compute sit alongside calls to commercial foundation models under business-associate agreements. The user-facing interface is the institution&rsquo;s own; the model behind it can change without changing the interface. What this bet buys is real. Switching costs stay low because the institution is not locked to any single vendor&rsquo;s call interface. Evaluation discipline stays inside the institution because the orchestration layer requires the institution to make active choices about which model handles which workload. The contract layer, covering who reads what data, who writes what record, on what cadence, under what consent, with what reversibility, is owned end to end rather than partly delegated. The institution can route low-complexity queries to inexpensive models and reserve premium frontier models for use cases that justify the cost. None of that is theoretical.{" "}
          <a
            href="https://genai.umich.edu/"
            target="_blank"
            rel="noopener"
            className="text-accent hover:text-accent-2 no-underline border-b border-line-2 hover:border-accent pb-px"
          >
            The University of Michigan&rsquo;s U-M GPT
          </a>{" "}
          is a real, operating example of owned orchestration at scale — a custom UI tier running on top of Azure OpenAI Service and U-M-hosted open-source models, with a three-tier product (U-M GPT for consumption, U-M Maizey for custom-dataset use, U-M GPT Toolkit for full environment control) all governed inside the institutional perimeter. Stanford&rsquo;s Center for Research on Foundation Models runs and evaluates many models explicitly, the clearest public example of an academic institution treating model evaluation as an owned capability rather than a vendor&rsquo;s responsibility.
        </P>

        <P>
          What the federated bet trades is also real. That is why institutions without engineering capital should approach it with caution. Orchestration is now an institutional capability the institution has to build and staff. Integration complexity is higher because the institution is wiring the model layer rather than buying the wiring. Governance is harder. The contracts are no less clear in principle, but they are distributed across more components and require active institutional discipline to keep current. The federated bet rewards institutions that have engineering capital and the appetite to build the orchestration. It punishes institutions that try to federate without the capacity to maintain what they have built.
        </P>

        <H2>The same calibration one layer down</H2>

        <P>
          The pattern is familiar from an earlier layer of the data stack. At the BI layer, the sophisticated institutions long ago stopped trying to standardize on one tool for every reporting surface — institutional research, executive dashboards, operational reporting, and program-team dashboards have different audiences, different cadences, and different decisions, and they reward different tools. I have argued <InternalLink slug="three-surfaces-one-keystone">
            elsewhere
          </InternalLink> that the BI tool selection is the last decision, not the first, and that the architecture should be set against the surfaces before the tool is chosen. The same calibration logic now extends to the model layer. The stakes are larger. The contracts between data, model, vendor, and institutional decision are more entangled than the contracts between data, tool, and dashboard ever were.
        </P>

        <P>
          The same choice plays out one layer down inside the data and AI stack itself, and the two prominent platforms in 2026 make it visible. Snowflake Cortex delegates orchestration to the platform: the institution gets a managed catalog of foundation models (Anthropic&rsquo;s Claude family, OpenAI&rsquo;s GPT models, Meta&rsquo;s Llama, Mistral, Google&rsquo;s Gemini, Snowflake&rsquo;s own Arctic, and others as the catalog grows) where the call into the model happens inside Snowflake&rsquo;s perimeter and the integration with role-based access, audit logging, and the data governance the institution already has in place is part of what the platform delivers. Multiple models are available; orchestration is the platform&rsquo;s, not the institution&rsquo;s. Databricks Mosaic AI takes the opposite posture. It is a model-agnostic orchestration layer designed to let the institution bring any model, including open-source models running on the institution&rsquo;s own compute, and to own the orchestration through the same lakehouse and MLflow tooling the data team is already using. Multiple models are available there too; orchestration sits with the institution. Both platforms are racing to support the full spectrum. Cortex now lets institutions bring fine-tuned open-source models and execute external API stages in some configurations, and Mosaic now offers turn-key managed foundation-model endpoints that look almost vendor-anchored if an enterprise just wants to flip them on. The architectural defaults still betray the posture, though. Cortex defaults to managing orchestration inside its perimeter; Mosaic defaults to handing the institution the tools to build and own the router itself. Any data executive will recognize the parallel. It is the same architectural choice, one layer down. The institutions choosing between Cortex and Mosaic are making the delegated-versus-owned-orchestration decision whether they call it that or not.
        </P>

        <P>
          Whichever way the orchestration decision goes, it commits the institution to a consumption it has to be able to see. A tier is a decision rule, and like any decision rule it is only as good as the institution&rsquo;s ability to check whether it is being followed. Routing low-complexity work to a cheaper model commits the institution to two things it rarely arranges in advance: an estimate, before rollout, of what each class of workload will consume, and a way to attribute that consumption back to the department or center that generated it. Without the estimate, a campus turns the system on and learns its own demand from the invoice. Without the attribution, no dean or program lead can be asked to own the spend their workflows create, and the routing layer decays as teams drift toward whatever model is easiest to call rather than the one the tier assigned. The architectural choice and the consumption it produces are one governance object. You decide it at design time and own it at run time.
        </P>

        <H2>The hybrid is the honest answer</H2>

        <P>
          The institutions handling this moment well are not treating
          the bet as a binary choice. They are calibrating different
          bets to different domains. The same institution runs
          vendor-anchored for the use cases where standardization,
          compliance, and lower risk tolerance reward the vendor&rsquo;s
          pre-built scaffolding, and runs federated for the use cases
          where research-flavored work, multi-stakeholder collaboration,
          and innovation velocity reward the institution&rsquo;s own
          orchestration. The deliberate hybrid is the architecturally
          honest answer for institutions that have both kinds of work.
          The accidental hybrid, the one that grew across both domains
          because no one made an active calibration, doubles the
          governance surface area without buying safety. An institution
          without the engineering capital to run a federated bet does
          not get safer by running a hybrid. It takes on the cost of
          both domains and the cost of the seam nobody is watching.
        </P>

        <P>
          The warning above lands differently for institutions inheriting a hybrid from legacy systems they cannot decommission, most healthcare systems, most public-sector ministries, most universities older than the cloud. For them, the hybrid is not a choice. The governance surface is already paid for, whether anyone intended to take the bet that way or not. What matters, in that situation, is running the inheritance as a deliberate calibration of two domains plus the seam rather than pretending the inheritance is a single coherent system. The institution that recognizes an inherited hybrid as a hybrid, and writes the contracts for both domains plus the seam, pays the cost it was already paying, but pays it knowingly. The institution that pretends the inherited hybrid is one coherent system pays the cost twice. The second payment arrives as a surprise, when the seam fails.
        </P>

        <H2>Four sectors, one pattern</H2>

        <P>
          The pattern is most visible in healthcare, where it has been running for years. Academic medical centers run vendor-anchored Epic-and-cloud-AI stacks for clinical and administrative work, because the clinical workflow is standardized, the compliance requirements are uniform, the risk tolerance is low, and the governance benefits of having one vendor&rsquo;s contracts cover the clinical surface are real. Inside the same institution, the research arms run multi-vendor, multi-model federated stacks for translational research, population health analytics, and model evaluation work, because the research workflow is unstandardized, the disciplines have different needs, open-source models matter for reproducibility, and innovation velocity matters more than standardization. The contract layer between the two domains — what flows from the clinical record into the research analytics, under what consent envelope, with what de-identification, with what reversibility — has taken the longest to mature. It decides whether the hybrid is coherent or accidental.
        </P>

        <P>
          Behavioral health runs the same pattern at a different scale. In regional behavioral-health agencies running Certified Community Behavioral Health Clinic services, vendor-anchored EHR-native AI typically handles clinical documentation and billing workflows, because those workflows benefit from the EHR vendor&rsquo;s pre-built scaffolding. The same agencies run federated approaches for population health analytics, program evaluation, and partner collaboration, because those workflows require the institution to integrate sources that no single vendor owns. The seam between the two domains is where the operational work happens. The freshness contract — what the population-health view shows the clinician at the appointment, on what cadence the source systems update, under what de-identification rule — is what the hybrid rests on. The agencies running this hybrid well are running it without calling it one.
        </P>

        <P>
          Foundations and philanthropy are mid-struggle on the same calibration, and many of them do not yet know that this is the bet they are making. Most foundations have concentrated risk into one grants-management vendor (Fluxx, Salesforce Nonprofit Cloud, Foundant, Bonterra) for grants administration and operations, often without realizing how much of the institution&rsquo;s reporting capability has been outsourced to that vendor&rsquo;s roadmap. The same foundations face board pressure to use generative AI for impact reporting, for grant application screening, for due diligence on grantees, and for program-officer drafting workflows, and they have almost zero in-house data engineering capacity to build the orchestration the federated bet requires. The result is a hybrid by drift rather than by design. The grants-management vendor offers AI features that are easy to enable. The research-flavored work (multi-year program evaluation, instrument-version reconciliation across years of survey data, impact synthesis across portfolios) sits in spreadsheets and ad-hoc tools that no orchestration layer reaches. Foundations are roughly where higher education was twenty months ago on the calibration question: visibly responsive, structurally undecided. Foundations still have a chance to make the calibration deliberate, before the vendor&rsquo;s contracts and the federated work grow apart. That chance is real and narrow.
        </P>

        <P>
          K-12 networks have been running the hybrid pattern long enough to have generated a precedent the rest of us learned from. The vendor-anchored bet shows up at the student-information-system layer (PowerSchool, Infinite Campus, Skyward), the learning-management-system layer (Canvas, Schoology, Google Classroom), and the assessment-vendor layer. The federated bet shows up in the analytics and student-success work, where networks integrate multiple sources and stand up internal data warehouses to do longitudinal work the vendors will not do for them. The Ed-Fi standard is the federation precedent. It is an open data-interoperability standard that lets districts and states integrate any vendor through a common semantic layer. It was built to address the integration friction vendor consolidation at the SIS layer created. The lesson K-12 supplies to every other sector is a historical pattern, not a blueprint for AI seam contracts. Vendor consolidation always forces a reactive federation layer later. Federation through open standards is what preserves agility when consolidation looks rational operationally and turns into a trap at the innovation layer.
        </P>

        <Figure
          src="/library/figures/two-bets-multi-speed-maturity.svg"
          alt="Multi-speed maturity inside a single institution: five functions plotted along a five-stage progression (Emerging, Managed, Defined, Governed, Optimized), each at a different stage, with a governance framework overlay bracketing the whole chart from above."
          caption="Multi-speed maturity — different functions at different stages, one framework across."
        />

        <P>
          Read the four sector cases together and the principle behind the calibration becomes clear. The more standardized the use case and the lower the risk tolerance, the better the vendor-anchored bet performs. The more research-flavored, multi-stakeholder, and innovation-velocity-dependent the work, the better the federated bet performs. The administrative-research split inside an academic medical center, the clinical-population-health split inside a behavioral-health agency, the grants-administration-program-evaluation split inside a foundation, the SIS-analytics split inside a K-12 network: these are not four different patterns. They are the same pattern, calibrated to each sector&rsquo;s vocabulary. Higher education can inherit the lesson instead of reinventing it. The administrative side of an R1 university (financial systems, HR, the SIS, advancement, the core enterprise reporting) looks more like the clinical surface of an academic medical center than the research surface. The research side of the same university (the disciplines, the labs, the grants, the research computing) looks more like the research arm of the same medical center than the administrative core. The hybrid is the answer the sector is already trending toward. The open question is whether higher education calibrates deliberately or drifts into it.
        </P>

        <H2>The seam is where the hybrid is earned or paid for</H2>

        <P>
          Both bets create governance contracts. The vendor-anchored domain inherits the vendor&rsquo;s contracts and supplements them with institutional rules. The federated domain owns its contracts end to end. The hybrid creates two sets of contracts plus a third set the institution most often misses: the seam contracts between the two domains. What data flows from the administrative side into the research side, under what de-identification rule, against what consent envelope. What inference the research side returns into the administrative side — and whether the administrative side is allowed to act on it. What freshness the seam guarantees, how the seam is audited, what happens when a record on one side is corrected after a downstream decision on the other side has already been made. These contracts are not theoretical. They are the failure mode of every hybrid that ran for two years before surfacing a governance breach nobody owned. The seam is where the institution either earns the hybrid or pays for the accident.
        </P>

        <P>
          What does a seam contract look like in operation, before the institution has it written down? Imagine an R1 running a vendor-anchored portal for undergraduate advising drafts alongside a federated internal stack for institutional-research retention forecasting. The seam contract specifies directionality first. The federated retention score can be read by the vendor portal to prompt the advisor in real time. The advisor&rsquo;s response, drafted with vendor-anchored AI assistance, cannot be written back to the core student-information system as a record-of-action without a twenty-four-hour human-in-the-loop reversibility window and an explicit second human review before commit. Retention rules come next: the vendor portal is allowed to retain the prompt, not the underlying retention vector that produced it; the federated stack is allowed to learn from the inference outcome, not the advisor&rsquo;s identity. Cadence sits on top of that: the retention score handed to the portal is refreshed nightly, and any advisor acting on a score older than seventy-two hours is alerted to re-check before continuing. Escalation is the last piece: any disagreement between the vendor-anchored draft and the federated risk signal flags a senior reviewer rather than auto-resolving to either side. Writing this out is not glamorous. It is what an R1 will wish it had done, before the first vendor portal silently commits a recommendation into a student record no advisor reviewed and no auditor can trace.
        </P>

        <P>
          K-12 learned this through Ed-Fi &mdash; the federation
          vendor lock-in forced into existence. The healthcare sector
          learned it through HL7 v2 and FHIR, through the regulation
          that mandated interoperability after decades of
          Epic-and-Cerner consolidation. Both sectors learned, at
          substantial cost, that the contract layer matters more than
          the technology layer. Higher education and philanthropy can
          skip part of the pain. Recognize the hybrid as the honest
          answer up front. Write the seam contracts before the
          architecture drifts.
        </P>

        <P>
          Neither bet is right for the whole institution. Framing the choice that way misses the point. What the institution needs to understand, before committing, is the governance <InternalLink slug="the-contracts-between-systems">
            contracts
          </InternalLink> each bet commits it to. Vendor-anchored suits the parts of the institution where standardization and lower risk tolerance reward the pre-built scaffolding. Federated suits the parts where innovation velocity and stakeholder diversity require the institution to own the orchestration. Almost every R1, every academic medical center, every foundation that runs both grants administration and program evaluation, and every multi-school education network is already running some version of the hybrid, whether it has been named that way or not. What makes the hybrid coherent is the discipline measurement-science training and operational governance have always argued for: write the contracts down and name the seams. Do that and the calibration becomes a deliberate choice, not an inherited default. Institutions that do that work stop being surprised by their own architecture.
        </P>

        <SeeAlso>
          <SeeAlsoItem
            slug="the-contracts-between-systems"
            title="The contracts between systems"
            gloss="The governance layer this essay's seam contracts are a specific case of."
          />
          <SeeAlsoItem
            slug="who-writes-the-contract"
            title="Who writes the contract"
            gloss="Where the seam-contract author has to sit inside the institution."
          />
          <SeeAlsoItem
            slug="grounding-the-ai-layer"
            title="Grounding the AI layer"
            gloss="The data-side discipline the model-layer bet inherits, whichever bet the institution takes."
          />
          <SeeAlsoItem
            slug="where-should-data-sit"
            title="Where should data sit?"
            gloss="The BI-era precedent for calibrating architecture against surfaces before choosing a tool."
          />
          <SeeAlsoItem
            slug="plumbing-got-upgraded-water-didnt"
            title="Plumbing got upgraded. The water didn’t."
            gloss="Why industrialized pipes did not close the governance gap the hybrid re-opens at the model layer."
          />
        </SeeAlso>

        <MetaNote>
          This essay was written in July 2026 for the Analytic Bytes
          Library. It draws on the author&rsquo;s practice across higher
          education, academic medical centers, K-12 networks,
          behavioral-health agencies, and foundations, and on the
          public record of higher-ed enterprise AI deployments through
          mid-2026. The argument is intended to outlast the specific
          vendors and platforms named.
        </MetaNote>
      </>
    ),
  },

  // ===================================================================
  // ESSAY 11 — Who writes the contract
  // ===================================================================
  {
    kind: "essay",
    slug: "who-writes-the-contract",
    number: "11",
    title: "Who writes the contract.",
    subtitle:
      "Why the role the institution needs is the one the hiring rubric can’t see.",
    date: "2026-07-13",
    readingTime: "12 min read",
    summary:
      "The contracts that govern integrated data have to be written by someone, named, inside the institution. But the hiring rubric fuses two roles — engineering and governance — into one job description and screens only for the first. The person who can actually do the work almost never scores well on the rubric written to find them.",
    cover: "/library/covers/who-writes-the-contract.svg",
    arc: "data-foundations",
    body: (
      <>
        <Brief>
          <p>
            The contracts that govern integrated data, definitional
            agreement, and decision-readiness have to be written by
            someone, named, inside the institution. When the institution
            is ready to hire that someone, the rubric it uses to evaluate
            candidates almost always selects against the people who can
            do the work. This is not because the institution is wrong
            about what it needs. It is because the rubric is wrong about
            who can deliver it.
          </p>
          <p>
            The senior data leadership posting at most institutions,
            whether titled Director of Data Platforms, Director of
            Data Analytics and Engineering, Director of Data Systems,
            VP of Analytics, Head of Data or Head of Analytics, Chief
            Data Officer, Chief Data and Analytics Officer, or Chief
            AI Officer, is two roles fused into one job description.
            The engineering half passes the rubric. The governance
            half is treated as either implicit or as a soft skill
            that will fill itself in. This piece names what is being
            assumed, and what has to change on the job description
            and on the org chart before the role starts succeeding at
            the half of its work that matters.
          </p>
        </Brief>

        <P>
          The senior data leadership posting at most institutions — whether titled Director of Data Platforms, Director of Data Analytics and Engineering, Director of Data Systems, VP of Analytics, Head of Data or Head of Analytics, Chief Data Officer, Chief Data and Analytics Officer, or Chief AI Officer — is two roles fused into one job description. One role is engineering: build and operate the warehouse, the ETL, the semantic layer, the lineage tooling. Stand up the dbt models, maintain the Snowflake schemas, configure the Fivetran connectors, keep the freshness SLAs in line. That is a senior data-engineering role the field knows how to define, screen for, and reward. The screens know what to look for.
        </P>
        <P>
          The other role is governance and subject-matter expertise: own the contracts on top of the warehouse, the decision interface those contracts feed, and the relationships with the stakeholders whose decisions the contracts have to support. Write the explicit, named understanding that turns integrated bytes into something a stakeholder can actually act on. Know what a principal needs to act on a recruitment funnel. Know what a clinician needs to act on a no-show count. Know what a District Education Officer needs to act on multiple state systems&rsquo; incompatible cycles. Know what a program officer needs to stand behind a quarterly figure when a funder asks. That is a senior governance-and-domain role. Organizations that have it know what it looks like, but the screens for it are underdeveloped and the rubric rarely names it as its own thing.
        </P>
        <P>
          The institutional posting names both roles. The screens assess
          only the first.
        </P>

        <H2>Why the rubric misses the half that matters</H2>
        <P>
          This is not a critique of the screens. Engineering rubrics
          know how to assess engineering depth. They have benchmarks.
          They can ask candidates to walk through past projects, write
          SQL, defend architectural decisions, debug pipelines.
          Engineering competence is observable and rateable. The
          governance-and-SME half is not. There is no equivalent
          benchmark. No standardized question reveals whether a
          candidate can sit across the table from a Provost, a CFO, a
          program officer, or a clinician, hear what they need from the
          data system, and translate that into a contract the
          institution will write down and enforce. There are no standard
          interview questions for <I>&ldquo;can you author the contract
          that makes a $50M aid scenario reversible at machine cadence
          when the AI assistant gets the recommendation wrong?&rdquo;</I>{" "}
          So the screen defaults to what it can measure. The engineering
          half passes the rubric. The governance half is treated as
          either implicit or as a soft skill that will fill itself in.
        </P>
        <P>
          The result is predictable. The institution hires a senior data engineer. The engineer builds the integration. The integration runs. The dashboards work. The schemas are tight, the freshness SLAs hold, the lineage tooling reports green. And then the Provost still cannot get a 360 view, the program officer still cannot answer the funder when the number moves, and the clinician still cannot act on the population-health view because nobody has written the contract that says they are allowed to. The engineering succeeded. The decision interface stayed unowned. The role failed at the half of its work that mattered.
        </P>
        <P>
          The institution&rsquo;s response to this is, usually, to hire another engineer. Or to commission a governance committee. Or to buy more tooling. None of these address the actual gap. None of them brings in the person who can write the contract, and the contract is operational, not technical. The contract specifies who reads, who writes, on what cadence, under what consent, with what reversibility, with what audit trail, with what authority to act. Writing that contract requires knowing what the principal, the clinician, the program officer, the dean need to be able to do. That knowledge comes from domain context, stakeholder fluency, and the operator&rsquo;s read on the decision the contract has to support. It doesn&rsquo;t come from the stack. (For the anatomy of the contract itself, see{" "}
          <InternalLink slug="the-contracts-between-systems">
            The contracts between systems
          </InternalLink>
          .)
        </P>
        <P>
          A senior engineer who has built three warehouses does not, by default, know any of this. There is no reason they would. That knowledge doesn&rsquo;t come from warehouse-building. You pick it up by sitting inside institutions for years, watching what decisions get made, what contracts hold, who stakeholders trust. That isn&rsquo;t engineering experience. It&rsquo;s subject-matter experience with operational depth — the half the rubric assumes without checking.
        </P>

        <H2>Two architectures, one honest choice</H2>
        <P>
          The correction isn&rsquo;t to swap engineers for
          subject-matter experts. Engineering depth is necessary. The
          integration has to be built. The schemas have to be designed.
          The freshness has to hold. The correction is to specify the
          role honestly: the Director of Data Platforms or Director of
          Data Analytics and Engineering or Chief Data Officer at most
          institutions is two halves of one job, and the screen has to
          assess both halves. The current screen assesses one and
          assumes the other. The half it assumes is the half the role
          usually fails on.
        </P>
        <P>
          There are two valid resolutions to this gap. The institution
          has to pick one deliberately, not drift into one by default.
        </P>
        <P>
          The first is a single-role fusion: structure the role as two
          halves and screen for both.
          The candidate brings engineering depth and governance-authoring
          depth into a single senior position, reports into an
          independent function, and writes the contracts on top of the
          integration they also help build. Most foundations, smaller
          mission-driven organizations, and K-12 networks are best
          served by this architecture because the volume of governance
          work does not justify a second senior position.
        </P>
        <P>
          The second architecture is appropriate when the institution is
          large enough or the contracts complex enough to warrant
          separate functions: a Director of Data Engineering for the
          engineering half, and a separate Director of Decision Systems,
          Chief Data Governance Officer, or equivalent for the
          governance and SME half. Both roles report into the same
          independent function. The engineering role builds and runs
          the substrate. The governance role writes and enforces the
          contracts on top, supports the stakeholders acting on the
          data, and owns the decision interface. The roles work
          together, but each has its own rubric and its own authority.
        </P>
        <P>
          Architect roles sub-divide across these two functions.
          Substrate-first architects (platform, cloud, data platform)
          report into the engineering side. Definition-first architects
          (enterprise, information, semantic, master data management)
          report into the governance side, because canonical data
          models, enterprise data dictionaries, and semantic layers are
          governance work. Data architects and solution architects sit
          at the seam, typically reporting into engineering but
          partnering with governance because their designs anticipate
          the contracts the governance function will author on top.
        </P>
        <P>
          Most R1 universities, large foundations, regional healthcare
          systems, and state-scale public-sector organizations are large
          enough to need this two-role architecture, and many of them
          have not yet realized it. The senior data role they keep
          posting and filling is the engineering role. The governance
          role is missing from the org chart entirely, so even when the
          engineering role is filled by a strong engineer, the work that
          would require a governance authority has no owner.
        </P>
        <P>
          Managed-platform vendor strategy (Snowflake&rsquo;s managed
          services, Databricks workspace, and equivalents) has also
          reduced the in-house engineering ceiling a governance-anchored
          role requires, which makes the second architecture viable at
          smaller scale than it would have been a decade ago. A senior
          governance lead can partner with engineering on guardrails and
          policy while using managed services to move the data
          function forward, without needing a large in-house engineering
          team behind the work.
        </P>
        <P>
          A growing pattern at large research universities is to fuse
          both halves into a single senior associate-CIO-level role
          that names both data infrastructure and data governance in
          its title, sometimes paired with a distinct data-officer
          designation, and reporting into IT leadership with an
          academic-side coordination line. The title names both halves:
          enterprise data strategy, governance and policy infrastructure,
          data stewardship culture, and the technological substrate the
          strategy sits on. The dual reporting line signals institutional
          awareness that the role serves both academic strategic
          decision-making and IT delivery, not only the engineering
          function.
        </P>
        <P>
          The structural risk that remains is rubric capture. Even with
          a title that names governance and an academic-side
          coordination line, the screen often still gets written from
          inside the function the role reports into. Reporting line
          under a CIO means the rubric for evaluating candidates could
          revert to engineering depth, regardless of what the title
          says. The title is a step forward. The screen has to follow
          it, or the role&rsquo;s posted scope and the role&rsquo;s
          actual screen drift apart from the day the position is
          opened.
        </P>
        <P>
          Either resolution requires the institution to name what it is currently assuming. The rubric is hiring for half the role. Whether the fix is a better single role or a missing second role is an architectural choice — and refusing to choose is the failure mode itself.
        </P>

        <H2>Where the role sits shapes what the screen sees</H2>
        <P>
          The rubric problem has a deeper root in where the role sits. Most institutions place data infrastructure ownership under the CTO or CIO. Once that placement happens, the rubric gets written by an engineering function, the screens filter for engineering depth, and a governance-and-SME-anchored candidate looks “non-traditional” to a screen calibrated for pipeline depth. The contracts the role writes end up optimizing for the reporting function&rsquo;s incentives rather than the institution&rsquo;s whole-organization decision interface. Even within a misplaced reporting line, though, the rubric could assess for the missing half. It does not. (The upstream argument about the seat itself is{" "}
          <InternalLink slug="where-should-data-sit">
            Where should data sit?
          </InternalLink>
          )
        </P>
        <P>
          The pattern is visible from several angles to anyone who has been
          around senior data hiring at scale.
        </P>

        <P>
          <I>The empirical pattern that JD scans reveal.</I> A focused
          scan of senior data role postings across sectors makes the
          rubric problem concrete. The pattern holds across Director of
          Data Platforms, Director of Data Analytics and Engineering,
          Director of Data Strategy, VP of Analytics, Chief Data
          Officer, and, increasingly, Director of AI Transformation and
          Director of AI Center of Excellence titles, sampled across
          six org-core types &mdash; technology company, product
          company, research institution, foundations or nonprofits
          anchored in monitoring, evaluation, and learning (MEL),
          service provider, and traditional enterprise.
        </P>
        <P>
          The reporting line is the first signal the scan reveals. The roles overwhelmingly sit inside engineering functions. Director of Data Platforms postings at technology and ed-tech companies report into the CTO, VP of Engineering, or Chief Product and Technology Officer. Director of Data Analytics and Engineering postings at technology companies report into the CTO or VP of Engineering, and at media and ed-tech companies often into a Chief Product Officer or Chief Product and Technology Officer. At universities, Chief Data Officer or Associate CIO for Data roles report into the CIO. VP of Analytics roles at enterprise organizations report into IT or operations. Director of Data Analytics roles at K-8 networks and operationally-heavy mission-driven organizations often report into the COO. The exception, when it appears, is a small subset of foundations and MEL-anchored organizations where the role has been placed under a Chief Impact Officer or SVP for Design and Impact rather than a CIO. At a national mission-driven foundation, for example, a Director of Data Strategy and Impact Analytics (a MEL / Impact Measurement role in the map&rsquo;s general vocabulary) was structured to report into an SVP for design and impact rather than into IT. When the role sits under an impact function, the rubric can reflect both halves: governance and stakeholder fluency are named explicitly, the skill tier includes program evaluation and mission alignment, the stated outcomes include funder reporting and partner-facing analytics. But this placement is champion-dependent. When the chief impact officer who wrote the role leaves, the placement often does not survive. Without sustained investment in the cross-functional work the integrated role required, the organization reverts to its silos. Data governance and architecture get pulled back into technology or digital-products. Research and evaluation regroups into its own specialist cluster. Delivery work is sometimes outsourced to contractors. The integrated rubric dissolves into whichever silo&rsquo;s rubric is dominant. The champion papered over the rubric problem. Structure never resolved it.
        </P>
        <P>
          The skills tier is the second signal. The engineering tier is
          named with specificity in every posting: Snowflake or BigQuery
          or Databricks, dbt, Fivetran or Airflow, Python, SQL, Tableau
          or Power BI, often a long list of specific tools and platforms
          a candidate must prove they have used in production. The
          domain-SME tier and the governance-contract-authoring tier are
          named more abstractly when named at all: &ldquo;stakeholder
          management skills,&rdquo; &ldquo;experience in cross-functional
          collaboration,&rdquo; &ldquo;ability to translate business
          requirements into technical solutions.&rdquo; These phrasings
          are not assessable in the way specific tool proficiency is
          assessable. A candidate without dbt experience cannot fake
          their way through a technical interview. A candidate without
          governance-authoring experience can describe stakeholder
          management plausibly without ever having written a governance
          contract that actually held in production. The screen catches
          the engineering gap. It cannot catch the governance gap.
        </P>
        <P>
          The emerging AI-native roles show the same pattern in a newer register. Recent postings for Director of AI Transformation or Director of AI Center of Excellence, sometimes reporting into an SVP for Data rather than into a CTO or CAIO, name the engineering tier with production-grade specificity — model registries, integrations, single sign-on, data-loss prevention, agentic systems, large-language-model tooling — while the governance and SME tiers are named as traits rather than as capabilities that can be screened: “strong governance instincts,” “proven ability to influence across an organization,” “ability to make complex technical topics clear to non-technical audiences.” The AI-native version of the role has not resolved the rubric problem. If anything, the governance gap is more consequential here than it was in the pre-AI role: engineering-tier specificity has grown, governance and SME tiers have stayed as trait-language, and the stakes of a governance failure at machine cadence are higher than they were at pipeline cadence. Regulated sectors — health (HIPAA, HITECH, 42 CFR Part 2), education (FERPA), commercial data platforms (SOC2), financial services (GLBA, PCI) — are the partial exception, because compliance frameworks force specificity in the compliance tier regardless of reporting line. But compliance specificity is not the same as governance specificity. A JD can name HIPAA or FERPA carefully while leaving “strong governance instincts” as the only signal for the semantic-and-decision-authoring tier that the role actually needs. Where the two coincide — a small number of academic medical center governance postings, or Fortune-scale enterprise CDO roles that name semantic layer, knowledge graphs, and RAG readiness explicitly — the rubric is meaningfully better. When compliance is named but the semantic layer stays abstract, regulatory language masks the rubric problem without solving it.
        </P>
        <P>
          The stated outcomes are the third signal. Engineering-anchored postings name engineering KPIs: pipeline uptime, data freshness, schema reliability, lineage coverage, time-to-insight. MEL-anchored postings name decision-quality outcomes: program officer ability to act on the data, funder reporting that lands, partner-facing analytics that drives decisions, evaluation findings that inform program design. The MEL postings are the contrast case the scan reveals most clearly. They show what the rubric looks like when the institution has structured the role around the decision interface rather than around the engineering stack. They are also the rarest pattern in the corpus.
        </P>
        <P>
          The cross-tabulation that emerges is consistent.
          Engineering-anchored reporting lines produce
          engineering-tier-only rubrics. Impact-anchored or
          program-anchored reporting lines produce rubrics that name
          both halves of the role. The reporting line is upstream of the
          rubric. Where the role reports determines what the screen
          assesses. And in the institutions where the contracts most
          need to be written (foundations doing impact reporting, K-12
          networks doing student-success analytics, behavioral-health
          agencies doing population-health work, public-sector education
          systems doing state-level integration) the role most often
          reports into an engineering function whose rubric then misses
          the half of the role that the institution needs. Part of what
          drives this is stakeholder self-doubt on the program side.
          Program and mission-side leaders often feel they cannot
          supervise a data leader effectively, and read tight coupling
          with an engineering function as the safer, better-managed
          placement &mdash; even when the role&rsquo;s substantive work
          sits closer to their side.
        </P>

        <P>
          <I>The visible asymmetry in JD skill-tier language.</I>{" "}
          Across the scan, what postings name and how specifically they
          name it follows a sharp pattern.
        </P>
        <Figure
          src="/library/covers/who-writes-the-contract-chart.svg"
          alt="JD scan: relative emphasis on three skill tiers across senior data postings"
          caption="JD scan: relative emphasis on three skill tiers across senior data postings."
        />
        <P>
          The engineering tier is named with specificity. The SME tier
          is named abstractly. The governance and contract authoring
          tier is rarely named at all. A candidate reading the rubric
          is being told, implicitly, which half of the role the
          institution cares about screening for.
        </P>

        <P>
          <I>The role landscape behind the rubric.</I> The asymmetry
          the chart above reveals in JD emphasis has a counterpart in
          what the roles are for. The map below distributes seven
          senior data-leadership roles across the five stages of the
          decision arc: build the system, govern the system, interpret
          the signal, support the decision, own the decision. Each
          cell shows how heavily the role loads that arc position.
          Loading here describes where the role&rsquo;s authority sits
          in the decision-system architecture, not what the individual
          leader personally performs &mdash; a role loads on
          &ldquo;interpret the signal&rdquo; when it owns the layer
          (semantic definitions, crosswalks, reconciliation) that
          makes interpretation defensible, even where business users
          do the reading. The roles in the map cluster around one or
          two arc positions. No single role carries every arc stage to
          a heavy level. The band below the map shows what the
          composite role many JDs imply would require: heavy across
          every arc position at once &mdash; the shape no real role
          fits. That is why rubrics written for the composite role
          produce searches that stall.
        </P>
        <Figure
          src="/library/covers/who-writes-the-contract-role-map.svg"
          alt="The data role landscape: senior data-leadership roles distributed across the decision arc"
          caption="The data role landscape: seven senior data-leadership roles distributed across the five stages of the decision arc."
        />

        <P>
          <I>The contrast cases visible in the scan.</I> Where the
          screen did include both halves, the role had been structured
          to demand both halves from the start, and the rubric
          followed. A Data Hub leadership role posted at a national
          philanthropy-supporting organization screened for full-stack
          data fluency (engineering, governance, stakeholder
          management, sector knowledge) as a baseline requirement, and
          the screen worked because the role had been structured to
          demand it. A separate Director of Data Strategy and Impact
          Analytics role at a national mission-driven foundation,
          which reports into an SVP for design and impact rather than
          into an engineering function, named the engineering tier
          (survey platforms, Python, statistical-analysis environments,
          SQL, BI tooling, cloud warehouse) with comparable specificity
          to the SME tier (mission-driven and public-sector context,
          domain knowledge in the foundation&rsquo;s focus area) and
          the governance tier (data governance structures, steward
          roles, metadata standards, quality control systems, RASCI
          project management). Both roles are sometimes described in
          the trade press as &ldquo;unicorn&rdquo; roles because they
          require capability ranges most candidates do not bring. They
          aren&rsquo;t unicorns. They&rsquo;re what the role actually
          needs at most institutions. They&rsquo;re rare because most
          institutions haven&rsquo;t structured the role to demand both
          halves, so they&rsquo;ve never screened for both.
        </P>

        <P>
          <I>The pattern across postings.</I> The sector breadth these
          observations draw on is what makes the pattern legible.
          Reading Director, Head, VP, and
          Chief-level data leadership
          postings across sectors &mdash; K-12 networks and
          public-sector education, behavioral-health agencies and
          healthcare-services organizations, MEL-anchored foundations
          and philanthropy-support intermediaries, ed-tech and
          educational publishing, health-tech and clinical research
          organizations, enterprise data leadership at Fortune-scale
          healthcare payers, financial services (wealth management,
          community banking, fintech), enterprise SaaS, and
          legal-services organizations building AI and
          data-intelligence functions &mdash; is what makes the
          pattern legible. The same
          engineering-tier-specific and governance-tier-abstract shape
          recurs regardless of sector, with the specific exceptions the
          earlier paragraphs name (regulatory compliance,
          impact-anchored placement, deliberate two-role architecture).
          The pattern lives in how the JDs are written. Any specific
          candidate&rsquo;s screen outcome depends on many things
          &mdash; resume shape, cultural fit, referral network, current
          head-count and scope, adjacent-experience gaps against the
          eventually-hired candidate &mdash; that are not being
          diagnosed here.
        </P>
        <P>
          A live scan of six recent VP Data and AI postings across
          sectors &mdash; mission-driven humanitarian services,
          private-sector mission-driven housing, media, mission-driven
          federated healthcare, regulated mission-driven service
          delivery, and enterprise SaaS &mdash; confirms the pattern
          directionally but adds nuance. Engineering-anchored reporting
          lines (CTO, CPO) produce engineering-anchored rubrics with
          governance and SME as trait-language. Impact-anchored
          reporting lines (Chief Impact Officer, Chief Design and
          Impact Officer, or an equivalent Measurement / Evaluation /
          Learning function) produce rubrics that name all three tiers.
          Two exceptions matter. Regulated compliance environments
          force governance to be named specifically because HIPAA,
          FERPA, refugee-services compliance, or equivalent
          requirements make governance non-optional. And at least one
          major mission-driven federation has already implemented the
          two-role architecture named earlier &mdash; a VP Data
          Strategy and Analytics reporting into the COO, partnered with
          a separate VP Technology Strategy under the CIO &mdash;
          pointing at what the deliberate structural resolution can
          look like in practice.
        </P>

        <H2>The operator’s test that resolves the hiring question</H2>
        <P>
          The operator&rsquo;s test that resolves the hiring question is
          the same operator question the integration-contracts argument
          used. Asked of the candidate: can the person you are about to
          hire write the contract that lets a stakeholder act on what
          comes out the other side of the integration? Not can they
          build the integration. Can they specify, in writing, who reads
          what, who writes what, on what cadence, under what consent,
          with what provenance, with what reversibility, and with what
          authority &mdash; for the decision the stakeholder is trying
          to trigger. If the screen does not assess for that, the screen is
          hiring half the role.
        </P>
        <P>
          The fix isn&rsquo;t heroic &mdash; add the governance-and-SME
          half to the rubric explicitly, design the interview to assess
          both halves, and structure the reporting line so the
          governance half has authority. This is editorial work on the
          JD and structural work on the org chart. It does, however,
          require the institution to admit that the role it is hiring
          for is not the role it has been screening for.
        </P>
        <P>
          When a leader asks what they should do differently this time, the answer isn&rsquo;t tougher engineering screens or better recruiters. It&rsquo;s a rubric that names both halves of the role honestly, an interview process that assesses for both, and a reporting line that lets the governance half hold authority across the institution rather than defer to whichever function it reports into. Without those pieces, the screen keeps hiring engineers to do work half of which is not engineering. (For the paired argument on what the institution is actually betting on when it makes this hire, see{" "}
          <InternalLink slug="two-bets-one-institution">
            Two bets, one institution
          </InternalLink>
          .)
        </P>

        <SeeAlso>
          <SeeAlsoItem
            slug="the-contracts-between-systems"
            title="The contracts between systems"
            gloss="The anatomy of the contract the role is being hired to write — who reads, who writes, on what cadence, under what authority."
          />
          <SeeAlsoItem
            slug="where-should-data-sit"
            title="Where should data sit?"
            gloss="Why the reporting line is upstream of the rubric — and what the integration seat has to look like for the governance half to hold."
          />
          <SeeAlsoItem
            slug="two-bets-one-institution"
            title="Two bets, one institution"
            gloss="The sibling argument on what the institution is wagering when it fills this seat — and what it is wagering when it does not."
          />
          <SeeAlsoItem
            slug="plumbing-got-upgraded-water-didnt"
            title="Plumbing got upgraded. The water didn’t."
            gloss="Why the governance half is now the load-bearing half, and why an engineering-only screen keeps missing it."
          />
        </SeeAlso>

        <MetaNote>
          Written July 2026 for the Analytic Bytes Library. A
          rubric-and-role piece drawn from a focused scan of senior data
          postings across six org-core types, contrast cases at two
          national mission-driven organizations that have structured the
          role to demand both halves, and one candidate&rsquo;s hiring
          loop offered as a data point rather than as evidence.
        </MetaNote>
      </>
    ),
  },

  // ===================================================================
  // FIELD NOTE 10 — When the stakes are the mission
  // ===================================================================
  {
    kind: "essay",
    slug: "when-the-stakes-are-the-mission",
    number: "12",
    title: "When the stakes are the mission.",
    subtitle:
      "The evaluation gap in mission-driven AI adoption.",
    date: "2026-07-21",
    readingTime: "10 min read",
    summary:
      "When enterprise AI gets a signal wrong, someone loses money; when mission-driven AI gets it wrong, someone loses the intervention meant to reach them. This piece names the evaluation gap opening as mission-driven organizations adopt frontier AI, proposes a five-part essential minimum, and points toward shared infrastructure that could make it sustainable at sector scale.",
    cover: "/library/covers/when-the-stakes-are-the-mission.svg",
    arc: "measurement",
    body: (
      <>
        <Brief>
          <p>
            Enterprise AI adopters and mission-driven AI adopters are
            fielding the same models. What differs is what happens when
            a model gets it wrong. When enterprise AI produces a bad
            signal, someone loses money. When mission-driven AI
            produces a bad signal, someone loses the intervention that
            was supposed to reach them. The responsible-AI frameworks
            being adopted across the sector do not yet know that
            difference matters.
          </p>
          <p>
            Enterprise adopters have built evaluation infrastructure to
            catch the failure mode. Mission-driven organizations cannot
            replicate that infrastructure at scale, and the sector
            keeps skipping the essential minimum that would make
            adoption earn its keep. This piece names the five-part
            minimum and points at the shared-infrastructure path that
            could make it sustainable at sector scale.
          </p>
        </Brief>

        <P>
          The mission-driven sector produces a recurring pattern I have watched from inside multiple senior data roles: strong proof of concept, incomplete infrastructure, no runway to production. The idea worked. The dashboard ran. The scale was validated. Then the acquisition happened, or the budget was cut, or the champion left. Or the parent company decided the BI costs did not pencil. Or the collaborative building the shared measurement infrastructure moved at the pace its participating organizations could sustain, which was slower than any single adopting institution could wait.
        </P>
        <P>
          This is not a story about individual failure. It is a story
          about a pattern the mission-driven sector runs on. And it is
          the pattern that AI adoption is now walking into.
        </P>

        <H2>The stakes</H2>
        <P>
          Enterprise AI adopters and mission-driven AI adopters are
          fielding the same models. What differs is what happens when
          a model gets it wrong.
        </P>
        <P>
          When an enterprise deployment produces a wrong signal, someone loses money, and the enterprise typically has room for a redo — retrain, re-run the pilot, adjust the model. When a mission-driven deployment produces a wrong signal, someone loses the intervention that was supposed to reach them, and the redo is often not available — the funder moves on, the beneficiary window closes, the trust breaks. A behavioral-health chatbot that recommends the wrong framing to an at-risk beneficiary is a mission problem, not a P&L one. So is a grant-intelligence tool that suggests reallocation based on drifted metric definitions, a program-evaluation AI that generates impact narratives reinforcing sponsor preferences over program reality, and an educational AI tutor adapting to student behavior in ways that reinforce inequitable expectations. The sector has not yet named how much that distinction matters.
        </P>
        <P>
          <InternalLink slug="the-reach-trap">The Reach Trap piece in this library</InternalLink> argued that mistaking activity data for outcome data produces misallocation at scale. In AI deployments, the same failure mode shows up one layer up: mistaking model output for validated signal produces mission misallocation at machine cadence. The stakes are different from enterprise stakes. Responsible-AI frameworks have not been tuned to what mission-driven deployments actually risk.
        </P>

        <H2>The constraint</H2>
        <P>
          Enterprise adopters have built evaluation infrastructure to
          catch this failure mode: dedicated evaluation teams,
          red-teaming budgets (paid adversarial testers whose job is
          to break the model before deployment),
          machine-learning-engineering (MLE) labs focused on eval
          infrastructure, safety review boards, and model-quality
          dashboards. This work is not cheap and it is not fast, but
          it is investable because the P&amp;L cost of getting it
          wrong is legible.
        </P>
        <P>
          Mission-driven organizations cannot replicate this infrastructure at scale. The budgets do not support it. The talent market does not favor them. The staffing pattern I have watched across four institutions is the same one: mission-driven orgs hire data analysts, not evaluation engineers. Larger networks stretch to a senior director for academic reporting or program evaluation. That role gets consumed by accountability reporting. It rarely reaches the measurement-science depth an AI deployment requires: validating that a scale still measures the construct it claims to, running PCA (principal component analysis) or IRT (item response theory) checks as the theory of change shifts, monitoring drift between model output and predicted outcome, recognizing when a decade-old survey needs to be re-anchored because the population has shifted, catching when the enrollment model that worked for five years no longer predicts because K-12 and higher-ed demographics moved post-pandemic. None of that is entry-level work, and none of it is what the sector is hiring for.
        </P>
        <P>
          There is another layer below this. Before AI can be
          evaluated, the data it reads has to be governed. Most
          mission-driven organizations have data. Student information
          systems, electronic health records, program-management
          platforms &mdash; the operational systems are running and
          producing records daily. What is often missing is the
          infrastructure that turns those records into a validated
          foundation an AI system can read from. The SIS is underused.
          The EHR is underused. The workflow that would reconcile them
          into decision-ready data is unfunded. MEL (monitoring, evaluation, and learning) leadership often
          reads this as &ldquo;we need to invest in a CRM,&rdquo; when
          the actual work is one layer down: the operational systems
          already carry the signal, but the{" "}
          <InternalLink slug="numbers-dont-agree">semantic layer</InternalLink>{" "}
          and governance that would make the signal usable never got
          built. When an AI vendor arrives with a deployment offer,
          the deployment lands on a data foundation that has never
          been validated. Every AI evaluation discipline below assumes
          that foundation is in place. In most mission-driven
          contexts, it is not.
        </P>
        <P>
          When there is no funded data infrastructure role, the work gets absorbed by whoever in the organization is capable with numbers or interested in them. A math teacher building professional-development slides. A writing faculty member logging automated-scoring results. A clinician maintaining a caseload tracker. A program coordinator running the grantee spreadsheet. What emerges is an absorption pattern. The primary job (teaching, delivering care, running operations) competes with the absorbed data work, and both suffer. It also produces the spreadsheet sprawl every mission-driven organization has: multiple versions of the same data, maintained by different people, none of it reconcilable at the org level. The distinction between data entry (part of every delivery role) and data curation, integration, and quality assurance (specialized capacity requiring dedicated funding) is where mission-driven org design keeps failing. The absorbed model works until it breaks. When it breaks, both the delivery and the data go with it.
        </P>
        <P>
          <InternalLink slug="what-is-this-system-measuring">
            What Is This System Actually Measuring
          </InternalLink>, the earlier piece in this library, named the discipline: measurement validity is what the field has been doing for a hundred years and what AI evaluation is a new application of. WITSAM assumed the reader had institutional research capacity or its equivalent. This piece names what happens when they don&rsquo;t. The discipline does not go away when the infrastructure to run it is absent. The failure mode does not go away either. It just becomes invisible until the mission drift accumulates and something breaks.
        </P>

        <H2>The essential minimum</H2>
        <P>
          Given the constraint, the question is not how to build enterprise-grade evaluation inside a mission-driven organization. The question is what the minimum discipline looks like when that infrastructure does not exist. The answer, drawn from the work I have watched succeed and fail across four sectors, is five things.
        </P>

        <Figure
          src="/library/figures/when_the_stakes_essential_minimum.svg"
          alt="The essential minimum: five components of mission-driven AI evaluation"
          caption="Five components of one discipline &mdash; none requiring enterprise-scale infrastructure."
        />

        <P>
          <I>Task decomposition.</I> Before the deployment goes live, name what the AI is doing under the hood. Not what the vendor pitch says. What the workflow is actually asking it to do — at what step, with what inputs, against what standard. This is the WITSAM discipline restated: what is this system measuring, and does that match what we say it measures? A behavioral-health screening chatbot is often doing three things at once: intake triage, symptom classification, and referral recommendation. Each has a different evaluation standard. Naming them separately lets you evaluate each; leaving them fused as “the chatbot” means you evaluate none. Most mission-driven adopters skip this step because the vendor pitch is comfortable and the deployment pressure is real. The cost of skipping it is that no one inside the organization can say what the AI is being evaluated against.
        </P>
        <P>
          <I>Ground-truth benchmarking with constrained data.</I> Enterprise adopters run large held-out evaluation sets on standardized data they own end to end. Mission-driven adopters usually have neither. Their deployment populations are small — a K-8 network of four hundred students, a CCBHC (Certified Community Behavioral Health Clinic) caseload in the hundreds, a foundation portfolio of forty grantees. Their operational data is messy in ways enterprise benchmarks are engineered against. I saw a version of this at ETS: the measurement framework that worked for GRE and TOEFL at scale did not transfer intact to just-in-time remediation contexts or to writing-validity studies with smaller populations. Even with clean data, moving a validated framework to a new use case required rebuilding parts of it. In mission-driven contexts, the data is neither clean nor standardized, and the framework has to be rebuilt from the smaller sample up. What organizations can do is build the smallest defensible benchmark: twenty to fifty cases from their actual deployment context, hand-labeled by a domain expert, held back from any AI training or fine-tuning. For a K-8 tutor deployment, that benchmark might be thirty real student writing samples the tutor was asked to help with, hand-scored by a teacher against a rubric the network already uses for its own writing curriculum — not synthetic prompts, not vendor-provided examples, but actual samples from the deployment context, labeled by the person whose judgment the AI is meant to support. The benchmark carries diagnostic weight at small n. When the model changes and the benchmark score moves, someone should notice. Refreshing it at every model update is not a special AI cadence. It is the same operational rhythm the organization already runs for accountability reporting or quarterly dashboard refreshes, applied to a new kind of asset. The talent question is not “who will build the evaluation.” It is “who has the data literacy and coaching capacity to keep the rhythm running after the deployment goes live.” Without that rhythm, the deployment decays. The frontline absorbs the decay. That is the burnout pattern the sector already knows.
        </P>
        <P>
          <I>Deployment-context evaluation.</I> Generic model
          benchmarks measure generic model behavior. Mission-driven
          deployments run in contexts generic benchmarks do not
          represent. A behavioral-health screening chatbot deployed in
          a rural CCBHC serves a population no public leaderboard
          reflects. A student-facing tutor deployed in a K-8 charter
          network serves a population academic AI benchmarks were not
          built for. Evaluate in context, not in a proxy environment.
          This is where the small benchmark from the previous step
          becomes the deployment&rsquo;s own reference set, not the
          vendor&rsquo;s.
        </P>
        <P>
          <I>Downstream impact evaluation.</I> Are the actions taken
          based on the AI output producing the intended impact, or
          drifting from it? This is the Reach Trap discipline applied
          to AI. Activity metrics (queries answered, sessions run,
          students triaged) are not outcome metrics. Track what shifts
          in the mission the deployment was supposed to advance.
          Anchor that tracking both internally (the
          organization&rsquo;s own outcome measures) and externally
          (public data treated as decision systems, triangulating the
          quantitative with the qualitative). Internal-only metrics
          can drift with the deployment; external anchors catch drift
          that internal instruments cannot. If neither shifts, the
          deployment is running without earning its keep &mdash; even
          if the model-quality dashboard shows the model is performing
          well.
        </P>
        <P>
          <I>Escalation and human-in-the-loop discipline.</I> Where
          does the AI hand off to a human, and how is that handoff
          calibrated?{" "}
          <InternalLink slug="actions-not-answers">
            Actions, Not Answers
          </InternalLink>{" "}
          argued that agentic AI removes the free human checkpoint
          and requires organizations to design the checkpoint back
          in. That
          argument applies with more force in mission-driven contexts,
          because the cost of a bad automated action is a person, not
          a dollar. The threshold map (where may the AI act alone,
          where must it stop and pass up to a human, where must the
          human originate the decision) is required for
          mission-driven deployments. For an advising chatbot: AI may
          answer &ldquo;when are drop-add dates.&rdquo; AI must stop
          and pass up for &ldquo;am I on track to graduate.&rdquo; A
          human must originate &ldquo;should I change majors.&rdquo;
          Three tiers, published, calibrated by the advising team.
          Without it, the deployment becomes the failure mode the
          sector was already at risk of.
        </P>
        <P>
          Five items. None of them requires enterprise-scale evaluation infrastructure. All of them require the discipline to name what is being evaluated, evaluate it in the deployment context, and design the human checkpoint back in. This is <ArtifactLink slug="when-the-stakes-essential-minimum">
            the essential minimum
          </ArtifactLink>. It is what the sector has to have.
        </P>

        <H2>The shared-infrastructure path</H2>
        <P>
          Even the essential minimum is more than most
          mission-driven organizations can build alone.
        </P>
        <P>
          The behavioral-health sector has been trying a version of this pattern for years. In the Certified Community Behavioral Health Clinic model, participating organizations join collaboratives that establish shared measurement definitions, shared reporting infrastructure, and shared quality benchmarks. The work is painfully slow. The collaboratives meet monthly because every participating organization is running operational work between meetings. Some organizations advance ahead of the collaborative. Others lag, waiting for shared definitions to land. The collective moves at the pace of the slowest participants. But it works. Infrastructure exists at industry scale that no single participating organization could have built.
        </P>
        <P>
          The pattern generalizes, and the mission-driven AI moment needs it to. If frontier AI adoption in mission-driven contexts is going to happen without producing mission drift, the evaluation infrastructure required to catch drift has to be built as a shared good, jointly by frontier AI providers who benefit from responsible deployment of their models and by philanthropic infrastructure that treats evaluation methodology as sector plumbing, not proprietary advantage. This is the coordination problem the sector faces, and it is not solvable org by org.
        </P>
        <P>
          Two flags before this argument lands as easy. Shared
          infrastructure is champion-dependent, and champions leave.
          Mission-driven collaboratives have collapsed before, when
          the chief impact officer or program officer who was carrying
          the coordination work moved to another role. The durability
          question, who owns the shared infrastructure after the
          founder leaves, is the hardest part of the model and the
          sector has not solved it. And the collaborative model runs
          at the pace its slowest participants can sustain, which is
          slower than the model release cadence. That gap is going to
          widen before it narrows.
        </P>
        <P>
          One more thing worth naming, because the Center for Effective Philanthropy has just written about it publicly: the facilitation and coordination work that keeps a shared-infrastructure model alive is itself unfunded labor, and its cost is usually absorbed by the same operational leaders already running the mission. When that cost stays invisible, small organizations get excluded from the collaborative because they cannot afford to participate; larger organizations dominate the shared infrastructure, and the eval discipline the model was supposed to build ends up shaped by the contexts of the biggest participants. The intermediary that holds the coordination work (a backbone organization, a third-party facilitator, an embedded eval-methodology lead from the frontier lab&rsquo;s side) is essential infrastructure. Call it overhead and the whole model collapses. The coordination cost gets absorbed by operational leaders &mdash; the same pattern{" "}
          <InternalLink slug="the-absorbed-data-role">
            The absorbed data role
          </InternalLink>{" "}
          names one layer down.
        </P>

        <H2>Close</H2>
        <P>
          Mission-driven organizations are adopting frontier AI
          whether the evaluation infrastructure keeps pace or not.
          Adoption is happening. The question is whether it produces
          mission acceleration or mission drift. The essential
          minimum names what has to be true for adoption to earn its
          keep. The shared-infrastructure path names how the minimum
          becomes sustainable at sector scale.
        </P>
        <P>
          Evaluation is what turns a deployed AI into a decision the
          mission can stand behind. It is the difference between
          mission acceleration and mission drift.
        </P>

        <SeeAlso>
          <SeeAlsoItem
            slug="what-is-this-system-measuring"
            title="What is this system actually measuring?"
            gloss="The measurement-validity discipline this piece extends into constrained mission-driven contexts."
          />
          <SeeAlsoItem
            slug="the-reach-trap"
            title="The Reach Trap"
            gloss="The same failure mode one layer down: mistaking activity data for outcome data, applied here to AI output versus validated signal."
          />
          <SeeAlsoItem
            slug="two-bets-one-institution"
            title="Two bets, one institution"
            gloss="The institutional wager underneath the AI adoption decision, and what evaluation has to hold up when the wager is made."
          />
          <SeeAlsoItem
            slug="the-absorbed-data-role"
            title="The absorbed data role"
            gloss="The org-design version of the same infrastructure gap: what happens when the specialized role AI evaluation depends on has no funded home."
          />
        </SeeAlso>

        <MetaNote>
          Written July 2026 for the Analytic Bytes Library. A
          field-note argument drawn from senior data roles across four
          mission-driven sectors (K-12 charter networks,
          behavioral-health CCBHCs, national youth mental-health
          philanthropy, and educational measurement), and from
          watching the same evaluation-infrastructure gap surface in
          each. The five-part load-bearing minimum is what the
          organizations that have kept AI deployments honest actually
          run; the shared-infrastructure path is what the sector will
          need if the essential minimum is going to be sustainable at
          scale.
        </MetaNote>
      </>
    ),
  },

  // ===================================================================
  // FIELD NOTE 11 — The absorbed data role
  // ===================================================================
  {
    kind: "field-note",
    slug: "the-absorbed-data-role",
    number: "10",
    title: "The absorbed data role.",
    subtitle:
      "Where data work goes when no role owns it.",
    date: "2026-07-24",
    readingTime: "11 min read",
    summary:
      "Data work in mission-driven organizations decomposes into three buckets — entry, interpretation, and curation/governance — and the third one, the specialized semantic-layer role, almost never has a funded home. It gets absorbed by whoever is capable with numbers: a math teacher, a clinician, a director of instructional technology. This piece names the absorption pattern across four sectors and argues for the three-layer architecture that would replace it.",
    cover: "/library/covers/the-absorbed-data-role.svg",
    arc: "data-foundations",
    body: (
      <>
        <Brief>
          <p>
            Data infrastructure work in mission-driven organizations
            gets absorbed by whoever is capable with numbers or
            interested in them. A math teacher. A writing faculty
            member. A clinician. A Director of Instructional
            Technology. This is not a role decision. It is an
            absorption pattern that emerges when the specialized data
            role has no funded home, and it keeps the infrastructure
            informal, unowned, and one departure away from collapse.
          </p>
          <p>
            The fix is not one more data-literacy program. It is a
            three-layer architecture that respects what each kind of
            data work actually requires: entry stays distributed
            across delivery, interpretation stays decentralized with
            delivery roles who know context, and curation, integration,
            and governance get centralized in a specialized function
            with a funded seat and named authority.
          </p>
        </Brief>

        <P>
          In 2005 I was a doctoral student on a field team visiting small teacher-education programs across the country to help them make the case for accreditation. My job was data auditor. The team would visit a program in a small town, one at a time, and the observations and interviews took precedence; those built the case. The data was the audit layer that backed it up. I would sit in a back room with my small laptop, paper, pencil, and calculator, and I would meet the faculty member who had collected or logged the program&rsquo;s evaluation data.
        </P>
        <P>
          The data was incomplete &mdash; rows missing, codes
          inconsistent. Not because the faculty member was inattentive,
          but because holding the data sat on top of the day job. The
          person in front of me was a teacher-educator who had absorbed
          the responsibility for the program&rsquo;s data because
          someone had to, and they were the one who was capable with
          numbers or interested in them or both.
        </P>
        <P>
          That was 2005. I spent the next twenty years watching the same shape show up in different sectors. Only recently did I name what I had been observing.
        </P>

        <H2>The pattern</H2>
        <P>
          Data infrastructure work in mission-driven organizations
          gets absorbed by whoever in the organization is capable with
          numbers or interested in them. A math teacher building
          professional-development slides. A writing faculty member
          logging automated-scoring results. A clinician maintaining a
          caseload tracker. A program coordinator running the grantee
          spreadsheet. A Director of Instructional Technology fielding
          data requests because they have system access.
        </P>
        <P>
          Call it the absorption pattern. When there is no funded
          infrastructure role, the work goes to whoever can carry it,
          and it stays there. Never specialized, never advocated for,
          never scaled. Until the person carrying it leaves, and the
          informal knowledge leaves with them.
        </P>
        <P>
          Spreadsheet sprawl is the visible symptom. The real cost is
          that the work never gets to specialization. And the person
          carrying it spends their delivery time on something that was
          supposed to be someone else&rsquo;s job.
        </P>

        <H2>Three buckets</H2>
        <P>
          Data work in any organization decomposes into three kinds of
          work, and the failure mode is trying to collapse them into
          one role.
        </P>

        <Figure
          src="/library/figures/absorbed_data_role_three_buckets_figure.svg"
          alt="The three buckets of data work — and the one that keeps getting absorbed"
          caption="Buckets 1 and 2 fit inside delivery roles. Bucket 3 does not, and when no one is hired for it, someone in a delivery role absorbs it."
        />

        <P>
          <B>Bucket 1 &mdash; data entry.</B> Recording what happened.
          Documenting a session. Logging attendance. Reporting a
          grantee touchpoint. This is legitimately part of every
          delivery role and has always been. Clinicians do it.
          Teachers do it. Program officers do it. This bucket stays
          distributed across delivery.
        </P>
        <P>
          <B>Bucket 2 &mdash; interpretation and action.</B> Reading a
          dashboard. Acting on a flag. Adjusting practice based on a
          signal. Also part of every delivery role, but this bucket
          requires two things the delivery role often does not have:{" "}
          <I>data literacy</I> to interpret the signal correctly, and{" "}
          <I>decision-ready data</I> to act on. When the delivery role
          is asked to interpret an ambiguous or unreconciled signal,
          they either default to their own read (drift) or hoard their
          own local data snapshot (sprawl).
        </P>
        <P>
          <B>Bucket 3 — curation, integration, semantic definition, quality assurance, governance.</B> Maintaining the definitions. Reconciling how “attendance” or “session” or “enrolled” or “at-risk” is defined across systems. Building the pipeline. Catching data quality issues. Owning the <InternalLink slug="numbers-dont-agree">semantic layer</InternalLink>. This bucket is specialized capacity. It needs a dedicated, funded role, separate from delivery.
        </P>
        <P>
          The three buckets exist in every organization. The question
          is where each lives and how each is funded.
        </P>

        <H2>The arc</H2>
        <P>
          The failure mode is when bucket 3 has no funded home and
          gets absorbed by bucket 1 or 2. I watched this take
          different shapes across four sectors.
        </P>
        <P>
          In the 2005 accreditation work, bucket 3 was absorbed by
          teacher-education faculty. Their day job was preparing
          teachers. Their absorbed job was holding the evaluation
          data. The data was incomplete because there was no one whose
          primary responsibility was making it complete.
        </P>
        <P>
          In 2014, I worked with a public university writing program on
          automated scoring for student writing samples and remedial
          placement. The data was being collected, logged, tracked,
          and analyzed by two writing-program faculty who had reached
          for the technology because they wanted to see if it could
          serve their classroom. The scoring worked. The
          infrastructure to sustain it stayed with the two faculty who
          had built it, on top of teaching.
        </P>
        <P>
          In 2023, I stepped into a K-8 charter network. Before the data role existed, the reporting was being done by a math teacher who built the professional-development slides. Fifty Google Sheets carried the semantic layer over an unconsolidated legacy stack. The core measure, student persistence, was independently recalculated eight or more times across sheets. Each version was correct under its own definition. None of them agreed with the others. A Director of Instructional Technology managed the operational systems (student information system, learning management, assessment platform) and had become the de facto data provider because they had access. The role played both ways. Users routed around the org chart to reach the person with system access, and that person held the access as leverage. Systems ran half-configured. Fields sat under-utilized. Users hoarded snapshots in their own sheets. Before long, everyone was arguing about the <InternalLink slug="numbers-dont-agree">single source of truth</InternalLink>.
        </P>
        <P>
          At a behavioral-health agency running Certified Community
          Behavioral Health Clinic services, a
          measurement-based-care pilot ran across two waves with
          thirty or more patients, producing a forty percent lift in
          engagement after reminder automation was added. The
          clinicians who participated were the ones who had elected
          in; they believed measurement-based care could make a
          difference. They had to be provided time by administration
          to attend pilot meetings, learn dashboard access, and
          provide feedback. Even the officially provided time came out
          of billing hours. In the long run, the discipline could have
          recouped that time through more efficient visits and better
          outcomes evidence. In the short run, the delivery role
          absorbed the bucket-2 capacity-building on top of caseload.
        </P>
        <P>
          At a national mission-driven foundation, the
          infrastructure was funded. Fivetran ingestion. Snowflake
          warehouse. A dbt-modeled semantic layer over four to six
          instrument versions of the same construct across years of
          survey data. Digital products managed the client-facing
          surfaces. DevOps managed the pipeline. A
          research-data-steward managed instrument documentation. Each
          role solved a different problem. None of them had the
          mandate or the disciplinary depth to design the semantic
          layer, the reconciliation of what &ldquo;engaged
          participant&rdquo; meant across instrument versions, the
          crosswalks between survey generations, the decisions about
          what could and could not be compared across years of program
          data. The infrastructure existed. The semantic layer stayed
          unowned. Bucket 3 was distributed across three roles, none
          of whom was the semantic-layer architect the work required.
        </P>

        <H2>Data literacy versus decision-ready data</H2>
        <P>
          These are not substitutes. They serve different buckets, and
          mission-driven organizations regularly try to use one to
          compensate for the absence of the other.
        </P>
        <P>
          <I>Data literacy</I> is what the delivery role (bucket 2)
          needs to interpret and act. It is coaching. Professional
          development. Sense-making capacity. A clinician who
          understands what a no-show pattern means, in context. A
          teacher who understands what an assessment score does and
          does not tell them. This is training and reinforcement work,
          and it never stops.
        </P>
        <P>
          <I>Decision-ready data</I> is what the central function
          (bucket 3) delivers. The semantic layer, the reconciled
          records, the dashboard curated for a specific recurring
          call. Without this, the delivery role&rsquo;s data literacy
          does not help. They are interpreting bad signal well.
        </P>
        <P>
          You need both. They come from different capacities. The
          mission-driven failure is training clinicians and teachers
          to be data literate as if that would substitute for the
          semantic-layer role that was never funded. It does not. Data
          literacy layered on unreconciled data produces confident
          wrong interpretation, which is worse than no interpretation.
        </P>

        <H2>The architecture</H2>
        <P>
          Centralization and decentralization are not opposing poles
          that need to be balanced. They are properties of specific
          buckets.
        </P>
        <P>
          <I>Centralize bucket 3.</I> Semantic definitions,
          integration, quality assurance, governance. Owned by a
          specialized function that does not do delivery. Its output
          is decision-ready data.
        </P>
        <P>
          <I>Decentralize bucket 2.</I> Interpretation and action stay
          with delivery roles who understand the operational context.
          A central data function cannot decide what an{" "}
          <InternalLink slug="the-decision-system">at-risk flag</InternalLink>{" "}
          means for a specific student in a specific school &mdash;
          whether it warrants calling the family, escalating to the
          counselor, adjusting the intervention plan, or watching
          closely for another two weeks. That is contextual judgment,
          and it belongs to the delivery role.
        </P>
        <P>
          <I>Distribute bucket 1.</I> Entry stays where it has always
          been, part of every delivery role.
        </P>
        <P>
          This architecture is a three-layer design that respects
          what each bucket requires and what each role can carry.
        </P>
        <P>
          The mission-driven failure is trying to run all three buckets out of one role, the math teacher or the writing faculty member or the Director of Instructional Technology or the research data steward, because the <InternalLink slug="where-should-data-sit">specialized bucket 3 role has no funded home</InternalLink>. It works until it doesn&rsquo;t. Then the delivery role&rsquo;s day job suffers, data quality erodes, and users start hoarding snapshots because they no longer trust the central number.
        </P>

        <H2>What could work</H2>
        <P>
          The enterprise sector has been working on a version of this problem for a decade and has produced partial answers. Federated data governance and data mesh architectures locate a central function that owns the platform, the standards, and the semantic layer, while domain teams own the data products in their operational area. Data contracts formalize the interface between the two. A Chief Data Officer or Chief Data and Analytics Officer holds the accountability. What transfers to mission-driven contexts is the three-bucket separation, the data-contracts vocabulary, and the case for a specialized semantic-layer role. What does not transfer is the staffing scale. Most mission-driven organizations cannot fund a CDO with a team under them, cannot afford the tooling that data mesh implementations run on, and do not have domain teams large enough to own the products the enterprise model assumes.
        </P>
        <P>
          If the enterprise pattern does not port over intact, the mission-driven sector has been working on models that fit its constraints. Sector-level backbone organizations that hold shared definitions and shared infrastructure (Ed-Fi in K–12, CCBHC collaboratives in behavioral health, state longitudinal data systems, Candid in philanthropy) are the most established. The emerging operating model is a fractional bucket-3 advisory arrangement, where a specialized data architect works across several mission-driven organizations at a portion of an FTE each. Foundation-funded direct capacity grants have a mixed track record but have not been retired. Frontier-lab shared-infrastructure partnerships of the kind Anthropic and others are building are the newest and potentially the most durable, if they survive champion turnover. Coalition-owned semantic layers, held jointly by a group of peer organizations, are under-tried and worth trying.
        </P>
        <P>
          What connects these models is a <InternalLink slug="the-contracts-between-systems">customer-and-supplier
          discipline</InternalLink>. Tom Redman and Angela Saitta have argued in the
          CDO Magazine version of this that every delivery role in the
          organization is both a customer of upstream data and a
          supplier of downstream data, and that the specialized data
          function&rsquo;s job is to architect the interfaces between
          them. That framing is what a bucket-3 role does in practice.
          Without it, data literacy programs end up teaching abstract
          concepts instead of the specific customer-supplier
          discipline the delivery role&rsquo;s workflow requires. With
          it, data literacy has something concrete to attach to.
        </P>
        <P>
          One more thing. Mission-driven work does not have to be
          back-breaking, underpaid, or overworked. The
          absorbed-data-role pattern is one specific mechanism of the
          broader burnout the sector already knows it has. When the
          specialized bucket-3 role is unfunded, the delivery capacity
          pays the cost, and the person who absorbed the work pays it
          with their time and their day-job attention. The path
          forward is funding the specialized role at whichever level
          the sector can sustain: shared, fractional,
          foundation-supported, or lab-partnered. All of those are
          better than the absorption model that has been running by
          default.
        </P>

        <H2>Close</H2>
        <P>
          The boundary the sector needs to draw is between data entry, data interpretation, and data infrastructure. All three are real work and need funded capacity. Only two of them belong in delivery roles.
        </P>
        <P>
          Every mission-driven organization I have worked with has held all three in the same person, because that person was capable and there was no one else. That model is the informal structure keeping mission-driven data operations running. It is also why the infrastructure never gets built. When the person absorbing the work leaves, or burns out, or gets pulled onto something else, the informal structure collapses. There is nothing holding it up.
        </P>
        <P>
          Bucket 3 is the role missing from most mission-driven org
          charts, and the sector cannot function without it. Naming
          it, funding it, and hiring for it is the piece of
          decision-systems architecture that mission-driven
          organizations keep skipping. The math teacher, the writing
          faculty member, the clinician, the program coordinator will
          keep absorbing the work in the meantime.
        </P>
        <P>
          That was 2005 in a small town. Twenty-one years later, in
          most places, the pattern still holds.
        </P>

        <SeeAlso>
          <SeeAlsoItem
            slug="where-should-data-sit"
            title="Where should data sit?"
            gloss="The placement argument this piece extends into the operational layer: not a reporting-line question, a decision-architecture one."
          />
          <SeeAlsoItem
            slug="who-writes-the-contract"
            title="Who writes the contract."
            gloss="The JD-side symptom of the absorption pattern named here — why the rubric keeps screening for engineering and missing the governance role."
          />
          <SeeAlsoItem
            slug="numbers-dont-agree"
            title="The numbers don’t agree because the words don’t."
            gloss="What happens when bucket 3 stays unowned across systems: incompatible definitions calcified into incompatible numbers."
          />
          <SeeAlsoItem
            slug="when-the-stakes-are-the-mission"
            title="When the stakes are the mission."
            gloss="The AI-eval-specific version of the same infrastructure gap, and the load-bearing minimum that has to run on top of the role this piece argues for."
          />
        </SeeAlso>

        <MetaNote>
          Written July 2026 for the Analytic Bytes Library. A
          field-note argument drawn from twenty years of watching the
          same absorption pattern take different forms across four
          sectors: teacher-education accreditation, a public
          university writing program, a K-8 charter network, and a
          behavioral-health CCBHC, plus a national mission-driven
          foundation where the infrastructure was funded and the
          semantic-layer role still stayed unowned. The
          three-bucket separation and the customer-supplier framing
          borrow from Tom Redman and Angela Saitta&rsquo;s CDO
          Magazine writing on the specialized data function.
        </MetaNote>
      </>
    ),
  },

  // ===================================================================
  // FIELD NOTE 12 — Auditing an AI-native practice
  // ===================================================================
  {
    kind: "field-note",
    slug: "auditing-an-ai-native-practice",
    number: "12",
    title: "Auditing an AI-native practice.",
    subtitle:
      "Ninety days, one operator, and what measurement-validity discipline looks like at practitioner scale.",
    date: "2026-08-02",
    readingTime: "10 min read",
    summary:
      "AB spent ninety days operating as an AI-native practice. This is the public report from the audit that followed, and the case for practitioner AI governance as a discipline the field has not yet named clearly. Introduces HITL/AITL as a signal-informed proxy for the load-carrier axis, and demonstrates methodology documentation done inline.",
    cover: "/library/covers/auditing-an-ai-native-practice.svg",
    arc: "measurement",
    body: (
      <>
        <Brief>
          <p>
            AB spent ninety days operating as an AI-native practice, with
            Claude in the loop for planning, drafting, research, code,
            and reflection. The question afterward was whether that
            operating model actually did what an AI-native practice is
            supposed to do. Feeling productive is not evidence. Holding
            up under measurement is.
          </p>
          <p>
            This field note is the public report from AB&rsquo;s own
            90-day audit. It documents what a single practice looks like
            when it applies measurement-validity discipline to its own
            use of AI: an audit AB ran on itself, using instruments it
            built. The findings matter, and this piece will name them.
            What matters more is the discipline the field has not yet
            named clearly &mdash; measurement-validity discipline for AI
            governance, at the practitioner scale.
          </p>
        </Brief>

        <H2>How AI-work is typically measured, and what this audit does differently</H2>
        <P>
          Most reporting on AI use at the practitioner level is
          testimonial. &ldquo;It saved me hours.&rdquo; &ldquo;It writes
          my drafts.&rdquo; The claims are common, but the evidence base
          is usually one anecdote.
        </P>
        <P>
          Where the reporting gets quantitative, it typically stops at
          usage counts: sessions, prompts, tokens, screen-time. Usage is
          easy to measure. It is also a weak claim. High usage tells you
          the practice ran. It does not tell you whether the practice
          measured what it claimed to measure. It also does not tell you
          whether AI carries the load or only assists it.
        </P>
        <P>
          This audit is different in three ways. It defines the atomic
          unit of analysis (one session = one named conversation, one
          category per session) before counting anything. It measures
          the same work through three lenses that answer different
          questions. And it applies{" "}
          <InternalLink slug="what-is-this-system-measuring">measurement-validity discipline</InternalLink> (<a href="https://www.ets.org/research/policy_research_reports/publications/article/2013/jrpe.html" target="_blank" rel="noopener" className="text-accent hover:text-accent-2 no-underline border-b border-line-2 hover:border-accent pb-px">Kane-framed inference</a>, construct-definition rigor,
          scorer-operator alignment) to its own findings before
          publishing them.
        </P>

        <H2>Method: three lenses and the HITL/AITL split</H2>
        <P>
          The audit runs on three measurement lenses over the same
          90-day corpus (n &asymp; 93 sessions across ten task
          categories).
        </P>
        <P>
          <B>Session count.</B> How often AI is engaged, per category.
          The cheapest measure, and the most misleading if used alone.
        </P>
        <P>
          <B>Message volume.</B> How much conversation happens inside
          those sessions. A closer proxy for cognitive load.
        </P>
        <P>
          <B>Token usage.</B> What the model actually computed. The real
          system-cost signal, measurable from API records.
        </P>
        <P>
          The three lenses tell three different stories about the same
          practice, and the divergences carry the diagnostic weight.
          Recurring automation is fifty-five percent of sessions and
          fifty-seven percent of tokens after the Jul 31 v2 extract
          correction. That is a rare category where session count and
          cost move together. Website and technical development is a
          small share of sessions but a large share of per-session token
          weight. Strategic and meta-reflection has the fewest sessions
          and the highest cognitive load per session. Session count is a
          bad proxy for time, and token usage is a bad proxy for
          engagement frequency. Both are needed.
        </P>
        <P>
          Cutting across the three lenses is a fourth distinction the
          audit uses to describe the shape of AI engagement per
          category. This is the naming contribution:{" "}
          <B>HITL / AITL</B> used as a paired framework.
        </P>
        <P>
          <B>HITL (Human-in-the-Loop).</B> AI drives; the human
          oversees. Recurring automation fits here &mdash; the AI
          carries almost the full workflow, and the human sets it up,
          monitors, and corrects when it drifts.
        </P>
        <P>
          <B>AITL (AI-in-the-Loop).</B> The operator drives; AI assists.
          Strategic thinking, product/framework work, and long-form
          writing sit here. The operator carries the work; AI is a
          thinking partner, drafts scaffolding, or synthesizes.
        </P>
        <P>
          The two frames are standard AI-ops vocabulary. The move that
          matters here is using them as a <I>signal-informed</I> proxy
          for the load-carrier axis. HITL and AITL name who or what
          carries the primary work. That axis was previously described
          in prose (AI leads versus AI assists) without an operational
          way to name it per category. Placement per category was
          informed by token distribution, message volume, and
          user-turn patterns per session &mdash; categories where AI
          carried the output with few user turns landed HITL;
          categories carried by high-turn operator iteration landed
          AITL. No shared-middle option, because a category that reads
          shared on the surface typically has one side actually
          carrying the decision when you look closely. (The signals
          informed operator judgment on band placement; formalizing
          them into a per-session assignment rule with reliability
          data is a next-cycle instrument.)
        </P>

        <Figure
          src="/library/figures/hitl-aitl-mapping-figure.svg"
          alt="HITL / AITL mapping across the AB practice's task categories"
          caption="Categories mapped to the load-carrier axis as a two-band framework. Recurring automation and technical dev sit in the HITL band — AI carries the execution scaffold, the operator sets direction and reviews. The remaining eight categories (strategic thinking, project proposals and evaluations, product and framework, research and review, long-form writing, talk prep, content and distribution, learning and reading) sit in the AITL band — the operator carries the load, AI assists. The two-band read is the operational choice: shared-middle labels obscure who actually carries the decision, so categories are placed on the side whose lean is stronger in practice."
        />

        <H2>Findings: what ninety days showed</H2>
        <P>
          Six things surfaced across the audit that a testimonial would
          have missed.
        </P>
        <P>
          <B>1. The working pattern is dialogic, not delegative.</B> The{" "}
          <ArtifactLink slug="dialogue-maturity-curve">
            dialogue-maturity curve
          </ArtifactLink>{" "}
          spans 116 scored threads across the twelve-month arc &mdash; 88
          GPT and 28 Claude &mdash; with all 28 Claude sessions inside
          the 90-day window. The mean per-session pattern is iterative
          back-and-forth. Session shape shifted upward on the 6-metric
          scorecard between the GPT-era portion (substantive threads
          cluster 5&ndash;7 composite; the tactical resume and job-app
          volume pulls the aggregate lower) and the Claude-era portion
          (mean composite 7.06, most sessions clustering 7.0&ndash;8.5,
          top of the corpus at 8.83). The gain concentrates in three of
          the six rubric dimensions: voice ownership, meta-awareness,
          and generative reframing.
        </P>
        <P>
          <B>2. The distribution of the practice&rsquo;s attention has three visible modes.</B>{" "}
          Instrumenting the practice &mdash; automation, meta-work,
          research &mdash; took roughly forty-five percent of estimated
          message volume. Positioning the practice &mdash; job search,
          market-identity work &mdash; took another fifteen percent.
          Producing the practice&rsquo;s actual output &mdash; product,
          library, brand, talks, website &mdash; took about
          thirty-eight percent. That mix reads as a
          practice-in-formation. Naming which stage you are in is the
          discipline.
        </P>
        <P>
          <B>3. Session count and token usage disagree about where work happens, and both are right.</B>{" "}
          The dumbbell view on the same ten categories shows recurring
          automation aligned across the two lenses after the v2 extract
          correction. Website and technical dev over-indexes on tokens
          (small session count, heavy per-session weight). Research, job
          applications, and product under-index (many short sessions,
          low token weight per session). Dispatch decisions (hire
          priorities, cost management) should default to the token lens
          when cost matters and the session lens when frequency matters.
          Aggregating them into a single &ldquo;how much AI&rdquo;
          number destroys the signal.
        </P>
        <P>
          <B>4. Dispatch discipline exists at three nested levels, and it is currently prescriptive rather than measured.</B>{" "}
          Cross-tool dispatch (Claude vs GPT vs Gemini). Within-tool
          model dispatch (Haiku vs Sonnet vs Opus). Within-model effort
          dial (low vs medium vs high vs max). The rulebook says what
          should happen at each level. The audit has no per-session
          record of what actually happened. Closing the
          prescription-to-measurement gap is the highest-leverage single
          change for the next audit window.
        </P>
        <P>
          <B>5. The infrastructure has five active layers.</B> Data,
          tooling, workflows, artifacts, and governance, each with
          named components, connected by five workflow loops. Two
          components are honestly dormant (Card Maker, Content HQ).
          <a href="/library/public-data" className="text-accent hover:text-accent-2 no-underline border-b border-line-2 hover:border-accent pb-px">PDDS</a> is a working, public example of measurement-validity
          discipline expressed in code and policy. It runs a
          two-component LLM-as-judge setup (narrator and judge
          separated, deterministic code-veto on grounding claims,
          advisory-only judge scoring, with{" "}
          <InternalLink slug="why-the-rules-look-weird">
            anti-Goodhart guardrails
          </InternalLink>{" "}
          on both sides) and a Kane-framed validation approach; the
          current agreement number (Cohen&rsquo;s &kappa; = 1.00 on a
          small co-evolved 12-item gold set) is suggestive not proof,
          and the eval spec names the residual limits (single model,
          no held-out set, no variance runs, correlated LLM training
          bases).
        </P>
        <P>
          <B>6. The governance dimension is at a moderate baseline, with the two distinctive-discipline anchors scoring HIGH.</B>{" "}
          Self-scored on the seven-dimension governance scorecard
          (self-assessment, not third-party audit).{" "}
          Validity spine (Kane four-inference framework,{" "}
          <a
            href="https://www.nist.gov/itl/ai-risk-management-framework"
            target="_blank"
            rel="noopener"
            className="text-accent hover:text-accent-2 no-underline border-b border-line-2 hover:border-accent pb-px"
          >
            NIST AI RMF
          </a>{" "}
          alignment, reliability + construct-validity discipline) scores
          HIGH. Construct-definition rigor (session unit, category
          rulebook, hub taxonomy, weights table, dispatch guidance)
          scores HIGH. Reflection cadence and instrumentation depth
          score LOW-to-MODERATE. These are the dimensions the audit
          itself just formalized. Descriptive-vs-prescriptive (rulebook
          exists, per-session measurement doesn&rsquo;t) scores LOW.
          This is the expected baseline of a practice that just finished
          its first ninety days.
        </P>

        <H2>Handling the N=1</H2>
        <P>
          A field note built on one practice invites the obvious
          objection: N=1 is not generalizable. That objection is correct
          and worth naming up front.
        </P>
        <P>Two responses.</P>
        <P>
          The value here is not &ldquo;here is what all AI-native
          practices look like.&rdquo; The value is &ldquo;here is an
          instrument other practices can apply to their own
          operations.&rdquo; Session-unit definition, three-lens
          measurement, HITL/AITL mapping, dispatch levels, Kane-framed
          validity discipline &mdash; these travel. The findings
          themselves do not generalize. N=1 is a limitation on findings
          and a reasonable starting point for building instruments.
          Ethnographic tradition, single-subject research designs, and
          autoethnography in the social sciences all operate under the
          same trade.
        </P>
        <P>
          The audit&rsquo;s distinctive discipline is measurement validity.
          Publishing an unaudited claim about that discipline would be
          self-refuting. The audit documented its own methodology
          before publishing its findings on AB &mdash; twenty-three
          discipline moves and seven emergent principles logged as
          they happened during the Jul 30&ndash;31 close (self-selected
          and self-catalogued; Section 9 of the internal document).
          That work is methodology documentation, done inline, dated,
          and available for peer review. Replication is the invitation
          this piece extends.
        </P>

        <H2>The contribution: practitioner AI governance as a distinct discipline</H2>
        <P>
          Two conversations about AI governance dominate the current
          discourse. Data governance addresses asset stewardship: who
          owns, curates, and secures the data AI runs on. Enterprise AI
          governance addresses policy and organization: how a company
          writes its AI-use policy, sets up its review committee, and
          audits its vendor models.
        </P>
        <P>
          Practitioner AI governance is a third slice, and it is
          under-built as a discipline. It addresses how one operator
          governs their own AI-native practice: the session-unit
          definitions, the model-and-effort dispatch, the load-carrier
          calibration, the validity discipline applied to the
          operator&rsquo;s own outputs. It runs whether or not an
          organization has written a policy or stood up a data
          governance team. Every operator working with AI is already
          doing practitioner AI governance, badly or well. Almost none
          are doing it with measurement discipline attached.
        </P>
        <P>
          The claim this audit stands on is that measurement-validity
          discipline for AI governance, at practitioner scale, is a
          distinct discipline worth naming. This audit argues it sits
          as a third slice alongside data governance and enterprise
          AI governance, with its own scope and instruments. The discipline has its own
          instruments: session classification, three-lens measurement,
          HITL/AITL mapping, dispatch guidance. It runs on its own
          validity spine: Kane-framed inference, construct-definition
          rigor, scorer-operator alignment. It produces its own
          artifacts, including the{" "}
          <ArtifactLink slug="governance-craft-log">
            Governance Craft Log
          </ArtifactLink>, the{" "}
          <ArtifactLink slug="governance-craft-card">
            Executive Card
          </ArtifactLink>, and scorecards.
        </P>
        <P>
          Practitioner AI governance behaves like DevOps in software
          engineering: an operating discipline that the other task
          categories depend on, rather than a category of work
          alongside them. The instruments a practitioner uses to run
          this discipline &mdash; session classification, three-lens
          measurement, HITL/AITL mapping, dispatch guidance &mdash;
          apply across whatever categories the practice happens to
          work in.
        </P>

        <H2>From operator governance to agent governance</H2>
        <P>
          Practitioner AI governance and agent AI governance are
          complementary layers, not competing frames. Both are early in
          their formation. Both need measurement-validity discipline for
          the claims each makes to hold up.
        </P>
        <P>
          The frameworks introduced here should transfer to the agent
          context with implementation adjustments (the transfer is
          proposed here, not tested).
        </P>
        <P>
          <B>HITL/AITL as the load-carrier axis.</B> Agents are the HITL
          case, by definition: the AI drives the workflow, and the
          human oversees. The measurable question at the agent level is
          where within an agent&rsquo;s execution path human oversight
          actually engages, and how the boundary is calibrated.
        </P>
        <P>
          <B>Kane&rsquo;s four-inference validity discipline.</B> The
          four inferences are scoring, generalization, extrapolation,
          and implication. The stack applies unchanged to agent
          evaluation. Scoring: did the agent&rsquo;s action correspond
          to the intended output? Generalization: does the action hold
          across the agent&rsquo;s task family? Extrapolation: does it
          hold in production contexts the eval did not reach?
          Implication: does the decision the agent supports actually
          produce the intended outcome?
        </P>
        <P>
          <B>Gate discipline.</B> The checkpoints where a human review
          is required in the practitioner setting become the escalation
          and human-in-loop boundaries in agent systems. The taxonomy is
          the same, though the stakes are higher. This is the argument{" "}
          <InternalLink slug="actions-not-answers">
            Actions, Not Answers
          </InternalLink>{" "}
          made for agentic deployments: the free human checkpoint has to
          be designed back in.
        </P>
        <P>
          <B>Task and session classification.</B> The unit-of-analysis
          discipline (what counts as a session, what counts as a
          category, how boundary calls get resolved) is directly
          transferable to agent-run task decomposition.
        </P>
        <P>
          Two pieces do not transfer cleanly. Voice-map compliance works
          for an operator; agent output does not have a voice to comply
          with in the same sense. Scale changes: procedural governance
          at the operator level has to become programmatic governance at
          the agent level, and the failure modes shift accordingly.
        </P>
        <P>
          The reason practitioner-level discipline matters for agent
          governance is architectural. Operator-level and agent-level
          practice share the same instruments; the operator level is
          where those instruments are calibrated first.
          Practitioner-level discipline is where instruments get built
          and tested before they run inside systems without a human at
          the keyboard.
        </P>

        <H2>Links out</H2>
        <P>
          The audit produces artifacts, not just findings. Four came out
          of the audit itself:
        </P>
        <P>
          <ArtifactLink slug="governance-craft-log">
            Governance Craft Log
          </ArtifactLink>{" "}
          &mdash; the 23 discipline moves catalogued during the
          audit&rsquo;s own execution, phase by phase.
        </P>
        <P>
          <ArtifactLink slug="governance-craft-card">
            Executive Card
          </ArtifactLink>{" "}
          &mdash; the one-page synthesis of the audit and its methodology
          anchors.
        </P>
        <P>
          <ArtifactLink slug="ab-governance-maturity-scorecard">
            AB Governance Maturity Scorecard
          </ArtifactLink>{" "}
          &mdash; the seven dimensions with current baseline and next-90
          targets.
        </P>
        <P>
          <ArtifactLink slug="ab-three-lenses">Three Lenses</ArtifactLink>{" "}
          &mdash; six task categories read through session count,
          weighted-proxy volume, and token share, mapped to HITL and AITL
          bands.
        </P>

        <H2>What&rsquo;s next</H2>
        <P>
          Two immediate follow-ups. A governance scorecard post that
          surfaces the seven-dimension baseline in one page, for
          operators who want to score their own practices against it.
          And a Q4 audit refresh that closes the biggest instrumentation
          gap: the descriptive-to-measured shift for per-session
          dispatch (which model, which effort, actually used, per
          session).
        </P>
        <P>
          The instrument this piece describes is v1. Later versions of
          the instrument will improve as other operators run it against
          their own practices and report what breaks. Send what you
          find.
        </P>

        <SeeAlso>
          <SeeAlsoItem
            slug="what-is-this-system-measuring"
            title="What is this system actually measuring?"
            gloss="The measurement-validity discipline this audit applies to its own operating model."
          />
          <SeeAlsoItem
            slug="when-the-stakes-are-the-mission"
            title="When the stakes are the mission."
            gloss="The same evaluation discipline pointed outward at mission-driven AI deployment, where the essential minimum has to hold under constraint."
          />
          <SeeAlsoItem
            slug="actions-not-answers"
            title="Actions, not answers."
            gloss="The agentic-HITL argument this piece extends from operator practice into agent systems."
          />
          <SeeAlsoItem
            slug="my-relationship-with-ai"
            title="My relationship with AI."
            gloss="The companion piece on how AI actually shows up in the AB working practice, read alongside this audit&rsquo;s findings."
          />
        </SeeAlso>

        <MetaNote>
          Written August 2026 for the Analytic Bytes Library. The public
          report from AB&rsquo;s own 90-day audit &mdash; three
          measurement lenses (session count, message volume, token
          usage) applied to n &asymp; 93 sessions across ten task
          categories, mapped against the HITL/AITL load-carrier axis and
          Kane-framed validity discipline. Draws on the Governance Craft
          Log, Executive Card, and Maturity Scorecard produced during
          the audit.
        </MetaNote>
      </>
    ),
  },

  // ===================================================================
  // FIELD NOTE 13 — Extending the gates (PDDS method note)
  // ===================================================================
  {
    kind: "field-note",
    slug: "extending-the-gates",
    number: "13",
    title: "Extending the gates.",
    subtitle:
      "How PDDS revised its measurement discipline to handle survey data and continuous levers.",
    date: "2026-08-05",
    readingTime: "8 min read",
    summary:
      "A method note from the PDDS project. The first six panels used clean administrative counts and point-in-time policy levers. Extending into survey data (weighted estimates, confidence intervals, suppression) and continuous levers (Title V, ESSA) forced a revision of the gates. This note documents what changed, and why the revisions tightened rather than loosened the discipline.",
    cover: "/library/covers/extending-the-gates.svg",
    arc: "measurement",
    body: (
      <>
        <Brief>
          <p>
            Analytic Bytes builds most-stringent-first. The first six{" "}
            <a
              href="/library/public-data"
              className="text-accent hover:text-accent-2 no-underline border-b border-line-2 hover:border-accent pb-px"
            >
              PDDS
            </a>{" "}
            panels were the clean case on purpose: administrative counts published at their reported grain, each attached to a policy lever with a clean before-and-after. Overdose deaths, NAEP scores, maternal mortality, Medicare readmissions, two earnings panels &mdash; clean numbers, clean levers.
          </p>
          <p>
            This note records the first deliberate step off that easy ground and exactly how the gates were revised to survive it. The honest interest is not a seventh panel; it is the framework growing a new capability in the open, with the revisions named rather than smuggled in.
          </p>
        </Brief>

        <Figure
          src="/library/figures/pdds-data-ai-pipeline.svg"
          alt="PDDS data and AI pipeline — sources through governance gates to decision surface"
          caption="The full PDDS pipeline. Public sources feed ingest and verified seeds, the dbt-duckdb warehouse stages and models the data, an LLM narration layer drafts and reviews the panel note, deterministic dbt governance gates verify it, and the export writes the frozen-six and extension dashboards to the Next.js renderer. The gates are where this note lives — dashed-border gates fire on the extension track only."
        />

        <H2>Why this note exists</H2>
        <P>
          The point of starting stringent was to show the gates operate cleanly where the data is easy before asking them to hold where it isn&rsquo;t. Two things about the new cases break the assumptions the original gates were built on.
        </P>
        <P>
          <B>The numbers stop being counts.</B> The{" "}
          <a
            href="https://mchb.hrsa.gov/data-research/national-survey-childrens-health"
            target="_blank"
            rel="noopener"
            className="text-accent hover:text-accent-2 no-underline border-b border-line-2 hover:border-accent pb-px"
          >
            National Survey of Children&rsquo;s Health
          </a>{" "}
          and the{" "}
          <a
            href="https://www.cdc.gov/yrbs/index.html"
            target="_blank"
            rel="noopener"
            className="text-accent hover:text-accent-2 no-underline border-b border-line-2 hover:border-accent pb-px"
          >
            Youth Risk Behavior Surveillance System
          </a>{" "}
          are complex-sample surveys. Their published values are <I>weighted estimates with confidence intervals</I>, suppressed below cell-size thresholds, and occasionally reset by an instrument redesign. A survey estimate is not a count you can re-tally from records; it carries uncertainty and provenance that a count does not.
        </P>
        <P>
          <B>The levers stop having a date.</B> Title V and ESSA accountability are <I>continuous</I>. The money has attached for years. There is no 2012-penalty moment to measure a number against, the way HRRP gave us one. The pipeline&rsquo;s &ldquo;did the number move after the lever?&rdquo; engine assumes a point in time, and these levers don&rsquo;t have one.
        </P>

        <H2>The clarifying principle, stated first</H2>
        <P>
          The house rule has always been &ldquo;do statistics in code, not in the model.&rdquo; That rule permits deterministic code to compute statistics all day; what is forbidden is the <I>model</I> doing arithmetic. The model only narrates numbers it was handed.
        </P>
        <P>
          Bringing in survey data adds a second honest way a number can reach the page, and it is worth being precise that this is a <B>tightening, not a loosening</B>. <B>Record-derived</B> values are computed deterministically in the warehouse from raw records; these are the original six panels. <B>Published-estimate</B> values are ingested verbatim from the agency&rsquo;s own published table, confidence interval and all, and never recomputed.
        </P>
        <P>
          Both are honest, and neither is the model doing math. For a weighted survey estimate the second is the more conservative choice: rather than re-implement replicate-weight variance in DuckDB and ask the reader to trust our arithmetic, we stand strictly downstream of the official statistic. The grounding gate &mdash; which today whitelists a number only if it traces to a bar or a registered figure &mdash; is extended to accept an official published estimate as a first-class value, tagged with its provenance class. Nothing about the model&rsquo;s leash changes.
        </P>

        <H2>Survey-data mode: three gate revisions</H2>
        <P>
          <B>1. Ingest-not-compute provenance tier.</B> Every value now carries a provenance class, record-derived or published-estimate. The grounding gate accepts both; the export records which. A published estimate arrives with its confidence interval, and the interval is a first-class value the note may cite. This is the primitive that makes NSCH and YRBSS panels possible without writing survey-variance code we&rsquo;d then have to defend.
        </P>
        <P>
          <B>2. Suppression as a cell state.</B> A survey cell is one of three things: present, suppressed (below the disclosure threshold), or missing (the state didn&rsquo;t field it). It is never zero, and zero is never allowed to stand in for either of the other two. A new gate fails the build if a suppressed or missing cell renders as a number or as a bar of height zero. Small cells at state by race by poverty-band are the rule rather than the exception, so this gate earns its keep immediately.
        </P>
        <P>
          <B>3. Version crosswalk.</B> When an instrument is redesigned, series that cross the redesign are not comparable. NSCH&rsquo;s 2016 redesign is the worked example: any flourishing chart that spans 2016 is simply wrong. The extension track enforces this structurally: the warehouse ingests only from the current instrument version onward (raw_flourishing_ext starts at 2016), so a series cannot cross an instrument boundary because the pre-boundary data is not present. Registering a documented crosswalk before extending the warehouse back across a boundary is the discipline; promoting the check to a runtime assert that would fire on future ingest attempts is on the near-term roadmap. Same discipline applies within-series for item drift: if an item&rsquo;s wording or response options changed between releases, pooling across the change is disallowed until the change is disclosed. The crosswalk is the semantic layer that keeps two differently-worded instruments from being silently averaged into one trend.
        </P>

        <H2>Comparison honesty: three more gate revisions</H2>
        <P>
          <B>4. <InternalLink slug="numbers-dont-agree">Definitional-variance layer</InternalLink>.</B> A cross-unit comparison is blocked unless a reconciliation table travels with it. This is the primitive the chronic-absenteeism case exists to demonstrate: two states&rsquo; rates may not sit on the same axis until a table underneath the chart shows how each state defines the denominator. Where the definitions differ and aren&rsquo;t reconciled, the comparison is refused. The reconciliation table is not a footnote under the chart &mdash; it <I>is</I> the chart.
        </P>
        <P>
          <B>5. Lever typing.</B> A lever is now typed as point-in-time or continuous. The timing gate &mdash; the one that checks a number moved <I>after</I> its lever, not before &mdash; runs only on point-in-time levers and is marked explicitly not-applicable on continuous ones. This replaces the quiet dishonesty of inventing a pre/post for Title V just because the gate wanted a date. Naming the lever type is itself a finding the page should state.
        </P>
        <P>
          <B>6. Uncertainty-aware &ldquo;did it move?&rdquo;</B> The NAEP panel already forces the note to say that a one- or two-point move isn&rsquo;t statistically distinguishable from noise. That logic generalizes: when a value carries a confidence interval, a change whose intervals overlap is reported as &ldquo;not distinguishable,&rdquo; full stop. The significance check stops being a NAEP special case and becomes a general CI-overlap caveat every survey panel must disclose &mdash; enforced by the required-caveats gate, which fails the build if the mandated significance phrase is missing from the panel&rsquo;s movement note.
        </P>

        <H2>Implementation note: shapes of enforcement</H2>
        <P>
          These revisions differ in shape, and the difference is worth naming. Three ship as new discrete gates on the extension track (<code>assert_suppressed_never_zero_ext</code>, <code>assert_cross_unit_reconciled_ext</code>, <code>assert_lever_typing_ext</code>) &mdash; any failure stops the build. The CI-overlap check (gate 6) is enforced inside the required-caveats gate as a mandated disclosure: the panel&rsquo;s movement note must carry the significance caveat, or the build fails. It is a <I>disclosure gate</I>, not a numeric-comparison gate &mdash; and for a public dashboard, the disclosure is the point. The provenance-class distinction (gate 1) is a data-structure primitive underneath the extension track (raw_*_ext vs raw_*). Version crosswalk (gate 3) is enforced structurally: the extension warehouse only ingests from the current instrument version onward, so a chart cannot cross a boundary because the pre-boundary data is not present. Promoting the crosswalk to a runtime assert that would fire on future ingest attempts is on the near-term roadmap. All six are inspectable in the repo; the shapes differ on purpose.
        </P>

        <Figure
          src="/library/figures/pdds-two-tracks-one-engine.svg"
          alt="PDDS two-track architecture — frozen six panels and extension panels sharing one engine"
          caption="The two tracks in one view. The frozen six (maternal, naep, overdose, readmissions, scorecard, slds) are golden-locked — any drift stops the build. The extension track (NSCH, absenteeism, YRBS) is live and stays open so new panels can evolve before they earn a lock. Both tracks share ingest, the dbt-duckdb warehouse, and the AI narration layer; each has its own seeds, gates, and export. The extension track's gate set adds three extension-only asserts to the three base gates. The worked case that follows lives on the extension track."
        />

        <H2>The worked case: chronic absenteeism, New Jersey first</H2>
        <P>
          Chronic absenteeism is the strongest construct to carry these revisions, for the same reason HRRP is the strongest panel already on the page: it is a <InternalLink slug="why-the-rules-look-weird">Goodhart case with money and consequences attached</InternalLink>, and it is reported at school and district grain, which is finally the grain communities actually decide at. The share of students absent 10 percent or more of enrolled days sits inside most states&rsquo; ESSA accountability systems as a School Quality / Student Success indicator. Once an indicator sits in an accountability system, its reported value can move through definition, coding, or enrollment practice rather than through student behavior. That is the whole exhibit.
        </P>
        <P>
          <B>Within New Jersey is the anchor.</B> A within-NJ trend, over years where NJ&rsquo;s own definition held constant, is the primary chart. This is the one comparison that needs no reconciliation layer, because the denominator is the same on both ends. Where NJ changed its own definition mid-series, the break is shown rather than smoothed.
        </P>
        <P>
          <B>Neighbors come second, and only gated.</B> New York, Pennsylvania, Delaware &mdash; a comparison to neighboring states is allowed <I>only</I> with the definitional-variance layer (gate 4) attached, because the federal reporting itself calls these definitions inconsistent across states. Each state&rsquo;s denominator rule (enrolled days versus membership days, the minimum-enrollment cutoff before a student counts, treatment of mid-year transfers, excused versus unexcused) is shown beside its number. If we can&rsquo;t assemble the neighbors&rsquo; definitions from published state documentation, the neighbor comparison ships narrower or not at all; the within-NJ panel stands alone regardless.
        </P>
        <P>
          <B>Private schools are outside the frame &mdash; say so.</B> EDFacts and state report-card collections cover public schools; private schools don&rsquo;t report into these accountability systems, so they are structurally absent from the data. That&rsquo;s a stated exclusion rather than a silent drop.
        </P>
        <P>
          <B>Charter versus traditional-district is available but confounded.</B> New Jersey reports charter schools, so the breakout exists and cell sizes usually permit it. Charters and district schools serve different populations, so a raw charter-vs-district gap is a composition difference at least as much as an attendance difference. The two are shown adjacent with that selection caveat stated plainly; we never compute or headline a &ldquo;charters do better/worse&rdquo; claim from it. Same discipline as gate 6: show them side by side, don&rsquo;t subtract what isn&rsquo;t defensibly subtractable.
        </P>
        <P>
          <B>The pandemic years break the series.</B> 2020&ndash;21 and 2021&ndash;22 attendance-taking under remote and hybrid instruction is non-comparable to either side. The break is shown; it is never interpolated across.
        </P>

        <H2>What this panel set must still refuse to claim</H2>
        <P>
          A falling chronic-absenteeism rate does not mean students are attending more, absent evidence that the definition and coding practice held constant. A cross-state difference reflects how each state defines the number at least as much as it reflects policy quality. A charter-vs-district gap reflects who enrolls where before it reflects any school effect. And none of this pushes down to community grain: the best national flourishing instrument publishes at state grain, and the only child indicator that reaches school grain is the one with accountability money attached and no stable cross-state definition. That gap is the argument.
        </P>

        <H2>Status and provenance</H2>
        <P>
          This note documents <I>how the gates were revised</I>, not any finding about New Jersey or any survey. The construct definitions, the specific state absenteeism rules, the NSCH item wording and pooling guidance, and the current YRBSS item inventory are all verify-flagged and belong to the build thread. Nothing here should be read as an established fact about a data source.
        </P>
        <P>
          The operating ethos it records is deliberate: stringent cases first, then slightly messier ones, with every gate revision named in public rather than quietly relaxed. The point of PDDS was never that the data is clean. It is that when the data gets dirty, the wall gets documented rather than lowered.
        </P>

        <SeeAlso>
          <SeeAlsoItem
            slug="auditing-an-ai-native-practice"
            title="Auditing an AI-native practice."
            gloss="The audit that applied the same Kane-framed validity discipline to AB&rsquo;s own operating model."
          />
          <SeeAlsoItem
            slug="when-the-stakes-are-the-mission"
            title="When the stakes are the mission."
            gloss="The essential-minimum evaluation discipline this piece extends into messier data terrain."
          />
          <SeeAlsoItem
            slug="what-is-this-system-measuring"
            title="What is this system actually measuring?"
            gloss="The measurement-validity foundation the gates sit on."
          />
          <SeeAlsoItem
            slug="numbers-dont-agree"
            title="The numbers don&rsquo;t agree because the words don&rsquo;t."
            gloss="The definitional-variance discipline the reconciliation gate operationalizes."
          />
          <SeeAlsoItem
            slug="why-the-rules-look-weird"
            title="Why the rules look weird."
            gloss="The Goodhart-and-consequences argument that makes chronic absenteeism the strongest case for the revised gates."
          />
        </SeeAlso>

        <MetaNote>
          Written July 2026 as a method note from the PDDS project, documenting the first deliberate move from clean administrative counts and point-in-time levers into survey data and continuous-lever cases. The revisions are named in public so the discipline stays inspectable as the framework grows.
        </MetaNote>
      </>
    ),
  },

  // ===================================================================
  // FIELD NOTE 14 — What the search cost
  // ===================================================================
  {
    kind: "field-note",
    slug: "what-the-search-cost",
    number: "14",
    title: "What the search cost.",
    subtitle:
      "Hiring is a high-stakes assessment that carries no consequential validity argument, and the only people who can count what it costs are the ones it sorts out.",
    date: "2026-08-17",
    readingTime: "11 min read",
    summary:
      "Educational measurement requires an instrument to argue for itself before it is used to decide something about a person, including what that use does to the people it sorts out. Employment screening makes the decision and argues none of it. The rejected population is unobservable to employers by construction, so the evidence can only come from the rejected side. This note concedes the strongest objection to consequential validity, shows the gap survives the concession, and reports a candidate-side ledger: 143 applications, 59 rejections, 63 that never returned a response of any kind.",
    cover: "/library/covers/what-the-search-cost.svg",
    arc: "measurement",
    draft: true,
    body: (
      <>
        <Brief>
          <p>
            Educational testing carries a requirement to evaluate what a test does to the people it sorts. Employment screening carries no such requirement. The consequences land on a population that the people who built the screen cannot observe. Nobody has counted what a search costs the people it rejects.
          </p>
          <p>
            I kept the count on myself. This is that ledger, and its limits.
          </p>
        </Brief>

        <H2>A disclosure, before anything else</H2>
        <P>
          I am not a neutral observer. I have been looking for work for most of the past two years. I have an interest in the conclusion of this piece and it would be dishonest to bury that in a closing note.
        </P>
        <P>
          It is also why the data exists. The rejected population is unobservable to employers by construction. Only the rejected can collect it. Almost none of them are trained to.
        </P>

        <H2>Hiring is an assessment, and it carries no validity argument</H2>
        <P>
          I spent my early career in educational measurement. In that field, before an instrument is used to make a decision about a person, you are required to argue for it.
        </P>
        <P>
          Messick unified how that argument works. Validity is not a property a test has. It is, in his words, an integrated evaluative judgment of the degree to which evidence and theory support the adequacy and appropriateness of inferences <B>and actions</B> based on test scores. Actions. Not only inferences. Consequences enter through the definition itself, and they are not an appendix to it.
        </P>
        <P>
          Two of his threat categories transfer to hiring without modification.
        </P>
        <P>
          <B>Construct underrepresentation.</B> The construct is something close to &ldquo;can do this work.&rdquo; The screen samples keyword presence, title adjacency, and tenure continuity, in a single document written in a specific genre.
        </P>
        <P>
          <B>Construct-irrelevant variance.</B> R&eacute;sum&eacute;-writing skill. Formatting compatibility. Prestige of prior employers. Employment continuity. Name effects. All of these vary across candidates. None of them is the construct. None of them is detected.
        </P>
        <P>
          Kyle Brink made a version of this argument in <I>MIT Sloan Management Review</I>{" "}
          <a
            href="https://sloanreview.mit.edu/article/the-elusiveness-of-merit-based-hiring/"
            target="_blank"
            rel="noopener"
            className="text-accent hover:text-accent-2 no-underline border-b border-line-2 hover:border-accent pb-px"
          >
            two weeks ago
          </a>
          , from the management side rather than the measurement side. His subject is the recent turn toward merit-based hiring, and his objection is that the organizations declaring their processes meritocratic have mostly never validated the instruments they use to measure merit. Pedigree, tenure, an interview impression: proxies that were never tested against the construct they are asked to carry. He is arguing toward a conclusion I am not making here, that validated assessment advances merit and diversity at once, since a wider pool plus a valid predictor is a better sample and a better measurement at the same time. The overlap is the diagnosis, and it arrives from inside the organization rather than from the queue outside it.
        </P>
        <P>
          Messick has been contested for thirty years, and the strongest objection is worth stating in full rather than dismissed.
        </P>
        <P>
          Popham argued that consequences matter enormously and must be evaluated, but that calling them validity dissolves a term that should remain about the accuracy of score-based inference. Cizek sharpened it: validating a score interpretation and justifying a test use are two separate enterprises, and fusing them failed for twenty-five years. Shepard and Linn largely sided with Messick. The dispute is live.
        </P>
        <P>
          <B>Concede Popham completely. The gap survives.</B>
        </P>
        <P>
          The objection presupposes that something else takes custody of consequences &mdash; that they belong to policy rather than psychometrics, and that policy will handle them. In educational testing that custodian exists. The <I>Standards</I>. State accountability regimes. Audit requirements. Litigation. In employment screening no custodian exists. The validity community does not claim the rejected population, and no policy body claims it either. Adverse-impact law covers protected classes and instruments formally classified as tests. Most screening today is neither.
        </P>
        <P>
          So the argument does not require winning a thirty-year methodological dispute. It requires noticing that both sides agree someone must evaluate consequences, and that in this domain nobody has.
        </P>
        <P>
          Kane supplies the apparatus. He reframed validation as argument: state the interpretation and use argument explicitly, then evaluate its warrants. The 2014 <I>Standards</I> adopt this framing &mdash; validity is the degree to which evidence and theory support interpretations of scores for proposed uses.
        </P>
        <P>
          Apply that to a r&eacute;sum&eacute; screen and four inferences each need backing.
        </P>
        <P>
          <B>Scoring.</B> The document becomes a match score. No published warrant.
        </P>
        <P>
          <B>Generalization.</B> The score stands in for the candidate&rsquo;s typical work. No warrant; a r&eacute;sum&eacute; samples a writing genre.
        </P>
        <P>
          <B>Extrapolation.</B> The score predicts job performance. Warrants exist only from hired samples, which are range-restricted by construction.
        </P>
        <P>
          <B>Implication.</B> The score justifies the hire or no-hire decision. No warrant.
        </P>
        <P>
          Four links. No published backing for any of them. The argument has never been written down, which is a different problem from having written it down badly.
        </P>

        <H2>Why the consequence cannot be seen from inside</H2>
        <P>
          Criterion validation runs on people who were hired.
        </P>
        <P>
          That sample is restricted by construction. A false negative has no row in any dataset the employer holds. The person who was wrongly screened out generates no performance record, no tenure data, no manager rating. There is nothing for the model to learn from and nothing for an audit to find.
        </P>
        <P>
          So the harm is invisible to the party positioned to correct it, and the party who experiences it has no standing to report it. That is not a gap in the data. It is a property of the design.
        </P>

        <H2>Only one side is instrumented</H2>
        <P>
          Employers measure their own side of a search carefully. Time-to-fill. Cost-per-hire. Quality-of-hire. Source-of-hire. Offer-acceptance rate. These are standard, they are dashboarded, and people are evaluated against them.
        </P>
        <P>
          The other side has no ledger at all. Nothing counts candidate hours. Nothing counts unpaid take-homes, rounds completed, reschedules, days to decision, mid-process description revisions, finalists measured against requirements added after they were measured, or searches closed with no hire.
        </P>
        <P>
          When one party is instrumented, only that party&rsquo;s costs are real. The one-sidedness of employer accounts of their own searches is not malice. It is what an unmeasured cost looks like from the side that does not bear it.
        </P>

        <Figure
          src="/library/figures/what-the-search-cost-two-ledgers.svg"
          alt="Two ledgers for the same search. The employer's side lists seven quantities that are measured, dashboarded and reviewed. The candidate's side lists five that nobody counts, and five that a candidate can count because the employer sets them: rounds required, performance tasks assigned, elapsed days to a decision, people met, and requirements added after the measurement."
          caption="Two ledgers for the same search. The employer&rsquo;s side lists seven quantities that are measured, dashboarded and reviewed. The candidate&rsquo;s side lists five that nobody counts, and five that a candidate can count because the employer sets them: rounds required, performance tasks assigned, elapsed days to a decision, people met, and requirements added after the measurement."
        />

        <P>
          <B>3.1 The performance task as unpaid discovery.</B>
        </P>
        <P>
          Two claims live here and only one of them is publishable.
        </P>
        <P>
          The first is appropriation: that a submitted deliverable gets used as work product. This happens. It is unobservable from the candidate&rsquo;s position and unprovable in any individual case. I am not going to allege it.
        </P>
        <P>
          The second requires no allegation, because organizations state it themselves. After meeting the finalists, we understood what the role actually required. That sentence, or a version of it, appears in public hiring updates regularly.
        </P>
        <P>
          Read the sequence plainly. The organization outsources its construct definition to the applicant pool. It takes the output. It pays nothing. It then rejects the people who produced the definition for not matching the definition they produced.
        </P>
        <P>
          Assume complete good faith at every step and the structure is unchanged. Value moves from candidate to organization, uncompensated and unrecorded. Good faith does not repair it. Any argument that depends on establishing intent is an argument that can be deflected, and this one does not need to be.
        </P>
        <P>
          A note on how not to measure this, since the obvious instrument is the wrong one. The tempting candidate-side measure is the volume of preparation a search generated &mdash; documents written, artifacts produced, visible output. It does not identify anything. Generative tools dropped the cost of producing a preparation document to near zero partway through this corpus, so the searches that came after look heavier than the ones that came before while the preparation behind them did not change. A file count measures the price of a page.
        </P>
        <P>
          What the employer sets does not move when my production cost moves: rounds required, whether a performance task was assigned, elapsed days from first contact to decision, people met, and requirements introduced after the first measurement. Those are the entries that can go in a ledger. The effort I spent in response is real and is the actual cost, and it is precisely the quantity neither side has ever instrumented.
        </P>
        <P>
          <B>3.2 Capability as a fixed attribute.</B>
        </P>
        <P>
          An unstated assumption sits underneath every screen: that capability is a property of the person, present or absent at the moment of measurement, waiting to be detected.
        </P>
        <P>
          Every organization also claims that development happens on the job. Both cannot be fully true. If people are built by the work, then &ldquo;lacking a requirement&rdquo; is a statement about a date. The screen reads it as a statement about a person.
        </P>
        <P>
          Employers say the first half of that out loud when someone asks them directly. Strada&rsquo;s May 2026 employer survey on{" "}
          <a
            href="https://www.strada.org/news-insights/entry-level-hiring-in-the-ai-era-what-employers-are-thinking-and-doing"
            target="_blank"
            rel="noopener"
            className="text-accent hover:text-accent-2 no-underline border-b border-line-2 hover:border-accent pb-px"
          >
            entry-level hiring in the AI era
          </a>{" "}
          found entry-level work moving from routine tasks toward analytical and judgment responsibilities, employers ranking critical thinking and communication well above AI literacy, and real work experience valued over GPA. That is employers describing a role that builds the person who holds it. It is the same organization whose screen reads the document for what the person already had before they arrived.
        </P>
        <P>
          In Kane&rsquo;s terms this is the extrapolation inference doing work it cannot support. It extrapolates from a snapshot to typical future performance in a role that is designed to change whoever holds it.
        </P>
        <P>
          This connects the candidate outside the building to the staff already inside it. The same assumption that rejects an applicant for a gap on a given Tuesday is what leaves existing junior staff undeveloped. Both follow from treating capability as found rather than built. In the nonprofit sector, where development budgets are the first line cut, the effect compounds.
        </P>

        <H2>What actually lands on the person</H2>
        <P>
          A rejection carries approximately one bit.
        </P>
        <P>
          Seven distinct causes compress into that one bit: the role was cancelled, an internal candidate existed, the budget froze, the requirements changed, the screen misread the document, a stronger candidate applied, or the person genuinely could not do the work. Inverting one bit has no unique solution. People resolve the ambiguity by choosing the explanation about themselves.
        </P>
        <P>
          Stated precisely: a measurement failure is reliably converted into a self-assessment of capability.
        </P>

        <Figure
          src="/library/figures/what-the-search-cost-one-bit.svg"
          alt="Seven causes of a rejection converge on a single box reading NO — one bit, no reason attached. Dashed arrows fan back out to the same seven causes, all still live, because inverting one bit has no unique solution. The one marked in teal, a real capability gap, is the one most people pick."
          caption="Seven causes of a rejection converge on a single box reading NO &mdash; one bit, no reason attached. Dashed arrows fan back out to the same seven causes, all still live, because inverting one bit has no unique solution. The one marked in teal, a real capability gap, is the one most people pick."
        />

        <P>
          What the literature supports, and where it stops:
        </P>
        <P>
          Jahoda&rsquo;s latent deprivation model holds that employment supplies time structure, social contact, status, collective purpose, and activity, not only income. Losing it removes all five.
        </P>
        <P>
          The association between unemployment and mental health is well established longitudinally, including recovery on re-employment.
        </P>
        <P>
          Cohort exposure is uneven. People aged eighteen to twenty-four out of school run more than double national unemployment even in strong economies. The Stanford Digital Economy Lab&rsquo;s 2026 finding &mdash; entry-level employment for twenty-two to twenty-five year olds in AI-exposed occupations running roughly nineteen percent below trend &mdash; sits on top of that baseline rather than replacing it.
        </P>
        <P>
          Mattering is a defined construct with its own measurement literature. Repeated unattributed rejection is an anti-mattering exposure delivered at scale.
        </P>
        <P>
          <B>Now the limit, plainly.</B> Unemployment leading to distress is established. Rejection as an exposure distinct from unemployment has not been studied. This section names a research gap. It does not report a finding. That is the honest claim and it is the more useful one, because it is the claim that tells someone what to go measure.
        </P>

        <H2>The ledger</H2>
        <P>
          <B>The corpus, and why it is not two cycles.</B>
        </P>
        <P>
          I have been searching, with one interruption, since November 2024.
        </P>
        <P>
          November 2024 to November 2025: twelve months of continuous search.
        </P>
        <P>
          December 2025 to April 2026: employed. Five months. The role was eliminated.
        </P>
        <P>
          April 4, 2026 to the present: searching again.
        </P>
        <P>
          So the object here is roughly twenty-one months of active search inside a twenty-two month span, interrupted once by a seat that did not survive. Treating it as two discrete cycles would be tidier and would misdescribe it.
        </P>
        <P>
          <B>What the current cycle shows.</B>
        </P>
        <P>
          As of August 16, 2026, tracked and reconciled against email:
        </P>
        <P>
          <B>143 applications. 59 rejections. 63 that never returned a response of any kind. 21 still open.</B>
        </P>
        <P>
          Forty-four percent produced no response at all. Not a rejection. Nothing.
        </P>
        <P>
          [EXTRACT &mdash; needed before publication: median days from application to any response; median days to rejection; share of rejections containing any stated reason; share of postings still live at 30/60/90 days after application; share reposted, re-titled, or materially rewritten after application; rounds required per process; performance tasks assigned; elapsed days from first contact to decision. Not preparation volume &mdash; see &sect;3.1.]
        </P>
        <P>
          <B>The estimate I got wrong, which is a result.</B>
        </P>
        <P>
          Asked from inside the search how many applications I had sent, I said five hundred. Pressed, I revised to two hundred and fifty. The instrumented figure for the current cycle is 143.
        </P>
        <P>
          I am not reporting that as an error to be embarrassed about. The five hundred is accurate to the lived denominator &mdash; twenty-one months &mdash; while the 143 covers four. And the gap between felt volume and counted volume is itself the thing this piece is about, running in the other direction. The subjective cost of a search outruns the countable one. Neither side has ever measured either.
        </P>
        <P>
          A candidate-side ledger that reports its own subject&rsquo;s misestimate is more credible than one that does not.
        </P>
        <P>
          <B>Two confounds, named before the comparison rather than after.</B>
        </P>
        <P>
          <B>Denominator leakage is not random.</B> Applications that generate no confirmation email are invisible to any email-based reconciliation, and they are disproportionately the lowest-friction, highest-volume channels &mdash; which are also the lowest-response channels. The applications I cannot see are systematically the ones least likely to have received a reply. Undercounting them biases the observed response rate upward. Every number above is a ceiling on response and a floor on silence.
        </P>
        <P>
          <B>The subject changed between periods.</B> Four simultaneous moves in the current cycle: sector, technology, function, and level. Any comparison across periods cannot separate market change from candidate change and should not pretend to.
        </P>
        <P>
          <B>The r&eacute;sum&eacute; series.</B>
        </P>
        <P>
          A second corpus, and the one with no legal exposure. It names no organization&rsquo;s conduct. It is my own document, versioned.
        </P>
        <P>
          Twenty-nine base documents survive between January 2013 and July 2026, counting only the ones addressed to nobody. Documents written for a named employer are excluded, because those measure the employer. So are format-only duplicates: where the same document exists as both a Word file and a PDF, or as two saves with no substantive difference between them, it counts once. A file is not a version.
        </P>
        <P>
          The count is not the finding and cannot be. A version was expensive to produce for most of that span and nearly free to produce after April 2026, so the number of documents in a given year measures the cost of making one at least as much as it measures the pressure to make one. What survives that confound is whose words open the document.
        </P>
        <P>
          Most of the openings are not mine. The earliest, January 2013, opens <I>Curriculum Vitae of Chaitanya Ramineni</I> and then education &mdash; the discipline&rsquo;s format, carrying no self-description at all. By December 2015 there is one, and it is <I>research scientist</I>, still the discipline&rsquo;s word. From 2018 the vocabulary changes hands: core strengths, results-driven professional, achievement-driven professional, twelve plus years, fifteen plus years. Those are not terms I would use about myself. They are the terms that were being used that year.
        </P>
        <P>
          In November 2024 and January 2025 the words are not even the market&rsquo;s in the abstract. They are a vendor&rsquo;s. A r&eacute;sum&eacute; service wrote two of these documents, opened one with <I>dynamic data strategist</I>, and moved my tenure to sixteen years without consulting me about what the count should include. That is the seam at its plainest: the construct definition of a person, drafted by a third party who has met neither side.
        </P>
        <P>
          Two documents break the pattern and they are the reason &ldquo;each one required by the market&rdquo; is the wrong sentence. In December 2016 a CV opens with <I>Interests and Expertise &mdash; bridging research and practice, conceptualizing new applications of technology</I>. Nobody asked for that phrasing. In January 2020 two documents are saved the same day, a r&eacute;sum&eacute; and a CV, identical in content and opposite in order: the executive certificate above the doctorate on one, the doctorate first on the other. That is not vocabulary. That is a decision about which credential to lead with, made twice, for two audiences, by me.
        </P>
        <P>
          So the accurate claim is narrower and more useful. Most re-authorings were market-required. A few were not, and the ones that were not did not hold. The December 2016 opening appears once and does not recur for nine years.
        </P>
        <P>
          There is a second thing the series shows, and it is a measurement finding rather than a biographical one. Sort each document&rsquo;s sections into three kinds &mdash; credentials and scholarship, experience, and claims about myself &mdash; and the proportions invert. The 2013 vita is ninety-five percent credentials and scholarship. The mid-decade CVs are eighty-six to eighty-nine percent. From April 2023 onward the same band is usually around ten percent, while experience runs to seventy-five or eighty. The page did not get shorter. The room went somewhere else.
        </P>
        <P>
          The obvious reading of that inversion is wrong, and it is worth naming because it is the same error the whole note is about. It looks like scholarship stopped. It did not. What changed is the artifact. In the research years the output of the work was a paper, a conference presentation, a technical report &mdash; objects with a name, a date, a venue, and a r&eacute;sum&eacute; section built to hold them. In the operator years the output of the same analytic work is a strategy deck presented to a C-suite or a board, a measurement framework a program adopted, a decision a leadership team made differently. That work is not smaller and it is not less rigorous. It is simply an artifact the instrument has no slot for.
        </P>
        <P>
          So the credentials band does not fall because the scholarship fell. It falls because the document has a section called Publications and no section called <I>decisions this changed</I>. The evidence migrates into the experience band as a bullet, where it is indistinguishable in form from any other bullet, and its provenance &mdash; who saw it, what it moved &mdash; is not recoverable from the page. A shape series looks like a story about a career. It is at least as much a story about what the form can record.
        </P>
        <P>
          The most recent document, July 2026, leads with a title line I wrote, twenty-plus years, an independent practice at the top of the experience section, and a published body of work entering as a credential. The tenure figure changed because I recounted it, not because it drifted: the assessment work I did during graduate school, at NBME and TEAC, had never been on the document. Deciding that those years count is the same act as writing the title line. Both are choices about what a career is made of, and both had been left to whoever was reading.
        </P>
        <P>
          An employer writes one construct definition per requisition and is paid to do it. A candidate writes one per cycle and pays for it in hours nobody counts. That is a ledger entry.
        </P>
        <P>
          There is a mechanism worth stating as a hypothesis rather than a finding. The roles a wide profile can actually reach are disproportionately the roles an organization has not finished defining, because a wide requisition is what matches a wide candidate. Undefined roles are unstable roles. A profile that clears an ambiguous requisition is therefore selected into the population of roles most likely to be restructured or eliminated. One case cannot establish that. It can specify it well enough to test.
        </P>
        <P>
          <B>What I am not claiming.</B>
        </P>
        <P>
          That I should have been hired anywhere.
        </P>
        <P>
          Anything about a population. This is one subject.
        </P>
        <P>
          The cause of any individual rejection.
        </P>
        <P>
          Any causal path from rejection to distress.
        </P>
        <P>
          <B>The contribution is not the argument.</B> The argument is that hiring is an assessment without a validity argument, and that is not new. The contribution is a candidate-side ledger that someone actually kept and published &mdash; a demonstration of the missing instrument rather than a description of it.
        </P>

        <H2>The seam</H2>
        <P>
          Every organization runs on contracts between systems. Most of them are written down. Data contracts between teams. Service agreements with vendors. Reporting definitions between functions. When those contracts are missing, the systems drift apart and someone eventually pays to reconcile them.
        </P>
        <P>
          The seam between an organization and the labor market is the one where the contract was never written, and the only one where the counterparty never sees the terms.
        </P>
        <P>
          An unwritten contract does not stay empty. A market grows in the gap and sells the candidate a guess at the terms, and the guess arrives as a finished document with her name at the top and a tenure figure she did not choose. Two of mine were written that way. Nobody in that transaction &mdash; not the vendor, not the candidate, not the employer reading the result &mdash; has seen the definition being matched against.
        </P>
        <P>
          A signed construct definition is what a written contract looks like on that seam. No requisition opens without one. What decision does this role make that is not being made today. What we would expect to observe in twelve months if it worked. Which requirements are central and which are decorative. What structure the role assumes, and what happens if that structure changes. Hiring manager and HR both sign before anything goes live.
        </P>
        <P>
          This is not a freeze. Requisitions should change; organizations that cannot reshape roles die of it. It is a version stamp. This is what we are measuring against as of today, and if it changes, the people measured against the previous version were measured against the previous version. Software teams do not argue that specifications should never change. They argue that changes should be recorded. Nobody calls that bureaucratic.
        </P>
        <P>
          Enforcement is publication. Report what each search cost the people who did not get the job. Hours. Rounds. Take-homes. Days to a decision. Revisions made mid-process.
        </P>
        <P>
          The first organization to publish that number will look worse than its competitors for exactly one cycle, and will be the only one that knows what its hiring actually costs.
        </P>

        <MetaNote>
          Standing practice: no organization is named in this piece. Patterns are drawn across many.
        </MetaNote>
      </>
    ),
  },

  // ===================================================================
  // FIELD NOTE 15 — The Floor Is the Frontier
  // ===================================================================
  {
    kind: "field-note",
    slug: "the-floor-is-the-frontier",
    number: "15",
    title: "The Floor Is the Frontier",
    subtitle:
      "A measurement read of Machines of Loving Grace. If AI raises the floor at all, development isn&rsquo;t where the science lands, it&rsquo;s the point, and &ldquo;beneficial&rdquo; is a claim someone has to keep proving.",
    date: "2026-08-18",
    readingTime: "6 min read",
    summary:
      "Dario&rsquo;s five areas mostly raise the ceiling; economic development is the one that raises the floor, and it belongs in the causal model from the start. But &ldquo;the floor rose&rdquo; is a claim, not a result. Beneficial is a claim about an outcome &mdash; defined before the build, and re-measured as the loop accelerates.",
    cover: "/library/covers/the-floor-is-the-frontier.svg",
    arc: "measurement",
    draft: true,
    body: (
      <>
        <P>
          I read Machines of Loving Grace the way I read most things, from the measurement seat. What could happen is half the question. How we would know it did is the half I get paid for. Dario lays out five areas where powerful AI could change a human life: biology and health, neuroscience and mind, economic development and poverty, peace and governance, and work and meaning. The one that stayed with me was economic development, and it is also the one where I would push back the hardest.
        </P>
        <P>
          Most of the essay raises the ceiling. Biology and neuroscience are frontier moves: take the most advanced thing we can do and accelerate it. Remarkable work, and the people it reaches first are the people already closest to the frontier. That is the distinction I care about, and it runs on distribution. Any domain can produce a ceiling move. What makes it one is who it reaches first. Development is the inverse. Its whole promise is lifting the baseline capability of the many. That is the version of powerful AI I have spent a career trying to build, in education and in health, and it is the version the essay treats as an afterthought.
        </P>
        <P>
          So my first disagreement is the ordering. Dario leads frontier-first and treats development as where the science eventually lands, a downstream beneficiary of breakthroughs made elsewhere. There is a real case for that sequence. Breakthroughs are lumpy and hard to schedule, so you fund the frontier because you cannot route to the floor what does not yet exist, and distribution looks like the easier problem to solve second.
        </P>
        <P>
          I would still invert it. Treating distribution as a later stage puts it outside the design, and a thing outside the design does not get specified, budgeted, or measured. If AI raises the floor at all, global development belongs in the causal model from the start (a design claim, not a moral one). It is what floor-raising means. The floor is not the leftover. The floor is the frontier.
        </P>
        <P>
          I would also expect the two areas Dario is least sure of, governance and meaning, to get easier once baseline capacity rises. I would expect it; I cannot show it, and the essay does not show it either. Someone would have to say what a better-governed society looks like in observable terms, and how they would measure it, before either of us could put weight on the claim.
        </P>
        <P>
          Education is nearly absent, and the absence is the tell. The development section runs on the distribution of health interventions, economic growth, food security, mitigating climate change, inequality within countries, and what he calls the opt-out problem. Education is not one of the six. The word appears once in the essay, in the section on peace and governance, where Dario expects improvements in mental health, well-being, and education to increase democracy, since all three are negatively correlated with support for authoritarian leaders. Education enters as a correlate of a political outcome. I would have given it the other seat, as the instrument itself: education is how a gain in capability reaches a person who did not already have access to it. Leave education out and the capability still arrives, but it arrives at institutions before it arrives at people. That matters, because of how institutions carry people.
        </P>
        <P>
          Our institutions have always <InternalLink slug="we-used-to-settle-for-thumbnails">carried people as thumbnails</InternalLink>: a name, a score, a category standing in for a whole person. We compressed because carrying the full picture was expensive. That cost has now collapsed. So we face a choice the essay does not quite name: run the old compression faster, or rebuild our systems to carry more of the person forward to the human who has to act. Powerful AI makes both cheaper. Only one of them raises the floor.
        </P>
        <P>
          And that is the part the essay leaves for someone else to do. &ldquo;The floor rose&rdquo; is a claim, not a result. Rose for whom? By how much? And did the capability cause it, or merely coincide with a change already underway? Two questions are doing the work there, and they fail in different ways.
        </P>
        <P>
          The first is attribution. <InternalLink slug="the-valid-dollar">Additionality</InternalLink>, the contribution dimension that separates what an intervention produced from what it only supported, is what stands between a number that is big and a number that holds. A program can run alongside a rising trend for years and report the whole rise.
        </P>
        <P>
          The second is validity. A model can apply a measure with superhuman consistency and still be <InternalLink slug="what-is-this-system-measuring">scoring the wrong thing</InternalLink>, because <InternalLink slug="validity-layer-beneath-responsible-ai">consistency is not validity</InternalLink>. The faster and more reliably the system reports, the more a proxy starts to feel like rigor; a stable number begins to pass for a true one. Beneficial does not arrive free with capability. It is a claim about an outcome, and the claim is harder to establish than the capability that was supposed to deliver it.
        </P>
        <P>
          I have hit that wall from the inside. I ran data for a K-8 charter network in the Bronx, five schools, about 1,800 children. The work was to connect what we knew about behavior, academics, and student experience into one picture, and then use it. Who is leaving, who is persisting, who is at risk, what is actually moving achievement.
        </P>
        <P>
          I could not get there. Elementary grades lived in one system and middle-school grades in another, and nobody could say which source was primary for a given field. Persistence, a single named construct, had been recalculated eight or more times since the start of that school year, off roughly fifty files. My notes from the period say plainly that the data were not available to make any comparison across time. So the question underneath all of it stayed open: were we serving the children in this district who needed us? Two of the districts we had moved into were sixteen to seventeen percent English learners. We were serving five percent.
        </P>
        <P>
          What a model can do now that I could not do then is real. The most expensive thing I did on that engagement was copy years of NYSED district demographic data by hand. One table at a time, to see how the population around us had changed. A model does that in an afternoon. It can also reconcile the same child across systems that spell her name differently, and pull the attributes out of the spreadsheets where they were actually living. What it cannot do is tell me which of those eight persistence numbers my question needed. Each was correct under its own definition, and each definition existed because a different obligation required it. Choosing among them is a judgment about what persistence should mean for this question, this network, this year, after the population shifted underneath it. Nobody had done that <InternalLink slug="numbers-dont-agree">definitional reconciliation</InternalLink> yet, and no model does it for you. That work did not get faster, and it is the work the claim depends on.
        </P>
        <P>
          There is a loop hiding in the essay. Powerful AI accelerates its own improvement: measure, evaluate, learn, repeat, faster each turn. The same loop is available for the outcomes we actually care about, whether the floor is rising and for whom. But the two loops do not run at the same speed. Capability compounds quickly. The evaluation that tells us whether the capability was beneficial compounds slowly, because building a valid measure of a real-world outcome is patient work (you cannot observe a two-year outcome in six months), and it does not accelerate just because the model did. That gap is the risk. The faster the capability loop turns, the more load it puts on an evaluation layer that was already the harder half. If the eval cannot keep pace, we are scaling something we can no longer see.
        </P>

        <Figure
          src="/library/figures/the-floor-is-the-frontier-two-loops.svg"
          alt="Two tracks running over the same elapsed time. The capability loop on top — build, ship, measure the model, improve — is drawn as eight blocks that narrow left to right, because each turn shortens the next. The evaluation loop below is a single turn split into four wide segments: define the construct, reach the right people, observe the outcome, establish the warrant. A dashed line marks where that first evaluation turn closes. Six capability turns ship inside its span. The cadence is illustrative; no cycle times are claimed."
          caption=""
        />

        <P>
          So the measurement seat reads this essay as a specification with the acceptance criteria left out. Beneficial is where the acceptance criteria go &mdash; a set of conditions somebody writes down before the build, checks after, and checks again as the system that produced the outcome shifts underneath them.
        </P>
        <P>
          That is what I take beneficial deployment to mean, and it is more demanding than the phrase sounds. Pointing AI at <InternalLink slug="when-the-stakes-are-the-mission">good sectors</InternalLink> and letting it do good is the easy reading. The harder one instruments the benefit: defined before the build, measured against the people it was meant to reach, held honest as the loop accelerates. &ldquo;The floor rose&rdquo; is where the work starts. Somebody has to stay in the room after the capability ships and keep asking whether the floor actually rose, for whom, and whether the number still means what it meant last quarter.
        </P>
        <P>
          That somebody is the job I have been doing for a decade. This essay does not name that job, but it needs it.
        </P>

        <SeeAlso>
          <SeeAlsoItem
            slug="the-valid-dollar"
            title="The Valid Dollar"
            gloss="Additionality as the test that separates what an intervention produced from what it only accompanied."
          />
          <SeeAlsoItem
            slug="validity-layer-beneath-responsible-ai"
            title="The Validity Layer Beneath Responsible AI"
            gloss="Why a model that is consistent is not therefore valid, and what has to sit under a responsible-AI claim."
          />
          <SeeAlsoItem
            slug="we-used-to-settle-for-thumbnails"
            title="We Used to Settle for Thumbnails"
            gloss="The compression argument in full: what our systems drop when they carry a person as a name and a score."
          />
        </SeeAlso>

        <MetaNote>
          This is a measurement read of a published essay, not a forecast. Claims about what Machines of Loving Grace does and does not argue were checked against the essay itself; claims about evaluation practice come from the AB measurement arc linked above.
        </MetaNote>
      </>
    ),
  },

  // ===================================================================
  // ESSAY 13 — Before it was called AI evaluation
  // ===================================================================
  {
    kind: "essay",
    slug: "before-it-was-called-ai-evaluation",
    number: "13",
    title: "Before it was called AI evaluation.",
    subtitle:
      "Human-machine agreement is a reliability indicator, not a validity strategy.",
    date: "2026-07-27",
    readingTime: "14 min read",
    summary:
      "The classical automated-scoring literature already worked through most of what modern AI evaluation is now rebuilding — fairness across subgroups, adversarial testing, a priori thresholds, risk-tiered deployment, population-matched corpora, prompt curation, cross-domain generalization, and responsible framing. Eight bridges, with the receipts.",
    cover: "/library/covers/before-it-was-called-ai-evaluation.svg",
    arc: "measurement",
    body: (
      <>
        <Brief>
          <p>
            In 2017, I co-authored a paper published in <I>Assessing Writing</I> that opened with a claim I have not been able to un-see since. The claim was small, technical, and &mdash; for the automated-writing-evaluation field it was written into (automated writing evaluation, or AWE) &mdash; unfashionable. It read: &ldquo;Agreement with human scores on the same essays should not be the only validity criterion; indeed, it can be argued that such agreement is merely a reliability indicator, and not a proper validation strategy.&rdquo;
          </p>
          <p>
            The reference was Bennett &amp; Bejar (1997), and the argument was already twenty years old when we wrote it. Two more decades have passed. The modern AI evaluation discussion is now rebuilding that same argument in a different vocabulary, mostly without the source lineage that produced it the first time. Large-language-model-as-judge (LLM-as-judge) validation studies, disparate-performance benchmarks, red-teaming methodologies, benchmark contamination detection &mdash; the current wave of AI eval is rediscovering the discipline of measurement science with the frame that this is a new field.
          </p>
          <p>
            I spent seven years at Educational Testing Service (ETS) evaluating AI-driven scoring systems for essays and speech, on assessments like the GRE (Graduate Record Examinations), TOEFL (Test of English as a Foreign Language), and Praxis (educator licensure tests). That work forced me to notice something the modern framing tends to obscure. The discipline for evaluating whether AI systems measure what they claim already existed &mdash; inside measurement science and psychometrics, developed against automated scoring engines a decade or two before &ldquo;AI eval&rdquo; was a term. The vocabulary was different. The problems were the same.
          </p>
          <p>
            This essay maps eight of those disciplines to their modern AI-evaluation equivalents. Each carries a citation from my published record as the receipt. The claim I am making is not that I did all of the work modern AI evaluation needs. It is that the work modern AI evaluation is doing has a longer history than most current framings acknowledge, and it is worth reading before it is reinvented.
          </p>
        </Brief>

        <Figure
          src="/library/figures/eight-bridges-classical-to-modern.svg"
          alt="Eight bridges — two-column map pairing classical automated-scoring disciplines (left, navy) with their modern AI-evaluation equivalents (right, teal)."
          caption="The eight bridges at a glance. Classical automated-scoring disciplines on the left, their modern AI-evaluation equivalents on the right. The sections below walk each row."
        />

        <H2>1. Fairness across subgroups &mdash; two tests, not one.</H2>
        <P>
          The modern version: HELM (Holistic Evaluation of Language Models) slices its benchmarks by demographic subgroup, BBQ (Bias Benchmark for QA) measures accuracy gaps across identity axes, and enterprise LLM audits routinely check whether a model&rsquo;s error rate differs materially for one population versus another. The methodological punch is that a single aggregate metric &mdash; accuracy, F1, human-rater agreement &mdash; can hide a substantial subgroup gap. Only per-group evaluation surfaces it.
        </P>
        <P>
          The classical version, in automated essay scoring, was doing this two ways at once. The first test was the surface fairness check: standardized mean score differences between the machine and human raters, computed per subgroup, with an ETS-published flagging threshold of 0.10 for any subgroup of concern &mdash; deliberately more stringent than the 0.15 flagging threshold for the overall gap (Ramineni &amp; Williamson, 2012). The second test was a validity-of-the-scoring-claim check: differential predictive validity. Compare the correlation between the human score and an external criterion, within a subgroup, against the correlation between the machine score and the same external criterion, within the same subgroup. If those two correlations diverge, the human and the machine are not measuring the same thing for that population, even if their aggregate scores agree. Modern AI eval has begun folding the equivalent into &ldquo;fairness under distribution shift&rdquo; &mdash; measuring downstream-task performance per demographic slice, not just benchmark performance.
        </P>
        <P>
          The receipt for the mechanistic version of this discipline is the 2018 ETS Research Report on demographic subgroup differences in GRE Analytical Writing (Ramineni &amp; Williamson, 2018). N=215,000 operational responses across 215 prompts. Three subgroups flagged on the Argument task: standardized mean <I>e-rater</I>&ndash;human differences of +0.56 for examinees from China, &minus;0.19 for Taiwan, and &minus;0.11 for African American test-takers. Four alternative regression architectures compared head-to-head. Expert re-scoring of the maximally discrepant essays. Two independent mechanistic hypotheses tested with dedicated tooling. What that paper showed is that the discrepancies were architectural in origin rather than a form of adversarial bias. Human raters were using conditional, rule-based logic &mdash; gating on language control errors before assigning organization scores. <I>e-rater</I> was using linear weighting of all features, which allowed strong organization scores (correlated with essay length) to offset weak language control. The subgroups where the two scoring architectures diverged the most were the subgroups whose writing patterns triggered that offset the hardest. Modern AI eval calls this rationale-alignment failure. The discipline for finding it is not new.
        </P>

        <H2>2. Adversarial evaluation &mdash; CIRS before GCG.</H2>
        <P>
          Modern AI eval has developed a class of methods for testing whether an LLM&rsquo;s outputs can be manipulated by adversarial inputs. Gradient-based attacks like GCG (Greedy Coordinate Gradient) produce prompt suffixes that jailbreak alignment. PAIR (Prompt Automatic Iterative Refinement) uses one LLM to attack another. AutoDAN generates readable adversarial prompts. The unifying diagnostic method is three steps: posit a strategy that gains reward without gaining ground on the target construct, implement it programmatically, measure the reward delta on real inputs.
        </P>
        <P>
          That method was named and operationalized in the automated-scoring literature in 2014 as Construct-Irrelevant Response Strategies &mdash; CIRS (Bejar, Flor, Futagi, &amp; Ramineni, 2014). The paper built a lemma-indexed synonym-substitution algorithm that swapped a portion of words in real GRE essays for longer, less-frequent synonyms. Ten to thirty-five substitutions per essay. Then it rescored the manipulated essays with <I>e-rater</I> and measured what happened. What happened was that the vulnerability was real, and asymmetric: substituting five percent of words with longer, rarer synonyms produced meaningful score gains for lower-scoring essays but had negligible or opposite effect on high-scoring essays. The exploit was strongest where the stakes for the examinee were highest.
        </P>
        <P>
          The CIRS paper was explicit that the vulnerability followed directly from <I>e-rater</I>&rsquo;s inclusion of word-frequency and average-word-length features. Any AES (automated essay scoring) system that weighted lexical sophistication was exposed to the same class of attack. And CIRS was proposed as a general evaluation category, not a one-off finding. The synonym-substitution was an illustration of a broader method: simulate a plausible strategy against real responses, then measure the score delta. That is the diagnostic template modern LLM red-teaming inherits.
        </P>

        <H2>3. A priori published thresholds &mdash; and guardrails on top of learned models.</H2>
        <P>
          Modern AI evaluation is still consolidating its methodology for what &ldquo;an eval passes&rdquo; means.{" "}
          <a
            href="https://www.nist.gov/itl/ai-risk-management-framework"
            target="_blank"
            rel="noopener"
            className="text-accent hover:text-accent-2 no-underline border-b border-line-2 hover:border-accent pb-px"
          >
            NIST&rsquo;s AI Risk Management Framework
          </a>{" "}
          proposes categories. HELM publishes multi-metric scenarios with per-scenario acceptance criteria. The Language Model Evaluation Harness standardizes scoring conventions. What these have in common is the discipline of publishing performance thresholds a priori &mdash; before deployment &mdash; with named justifications, so that adoption is not judged post-hoc against whatever number came out.
        </P>
        <P>
          That discipline was formalized for automated essay scoring in Ramineni &amp; Williamson (2012). The paper&rsquo;s Table 1 gives the quantitative gates directly: quadratic weighted kappa of at least 0.70 between machine and human, Pearson r of at least 0.70, degradation from human-human to human-machine of no more than 0.10, standardized mean score difference of no more than 0.15 overall and no more than 0.10 per subgroup of concern. The subgroup threshold is 33 percent tighter than the aggregate threshold on purpose. The 0.70 threshold is not arbitrary; the paper names its justification as &ldquo;the tipping point at which signal outweighs noise in the prediction and so at least half the variance is accounted for.&rdquo;
        </P>
        <P>
          The 2012 NCME (National Council on Measurement in Education) paper that used Classification and Regression Trees (CART) to trace the mechanistic gap between human and machine raters (Ramineni, Li, &amp; Breyer, 2012) added a discipline that modern AI eval is beginning to develop under a different name. CART showed that humans conditioned on language control as the first splitting variable; <I>e-rater</I> weighted organization and development as the most important feature. The proposed remedy was to add a rule on top of the model rather than retrain it &mdash; &ldquo;implementing a cap on the organization and development scores for responses that fail to meet a certain threshold for content scores&rdquo; &mdash; so that essay length could not offset weak content. That is a guardrail-rule stacked on a learned model. It is the same architectural pattern Constitutional AI classifiers and output-filtering safety layers use on top of LLMs today.
        </P>

        <H2>4. Risk-tiered deployment &mdash; check score vs. contributory.</H2>
        <P>
          Modern AI evaluation increasingly frames deployment as a tiered decision. A model can be evaluated as capable enough for a chat assistant but not for autonomous agentic tool use. A safety eval that clears one deployment mode does not clear another. The framework distinguishes human-in-the-loop, human-on-the-loop, and autonomous operation, and calibrates its acceptance criteria to the mode.
        </P>
        <P>
          That distinction has been operational in automated essay scoring since the 2012 GRE and TOEFL evaluation reports (Ramineni, Trapani, Williamson, Davey, &amp; Bridgeman, 2012a and 2012b). The two papers evaluated the same scoring engine, <I>e-rater</I>, against two different implementation modes. The GRE program adopted what the papers named &ldquo;check score&rdquo; or &ldquo;confirmatory&rdquo; mode: the <I>e-rater</I> score is used only to check or confirm the human rating, and when within the allowable discrepancy threshold, the human rating constitutes the final score. <I>e-rater</I> does not contribute directly to the reported score. The operational impact of that posture was substantial &mdash; 41 percent of Issue responses and 47 percent of Argument responses triggered a second human rating. The TOEFL program adopted &ldquo;contributory&rdquo; mode: the mean of the <I>e-rater</I> score and the human rating yields the final score. That posture triggered a second human on 3 percent of independent responses and 33 percent of integrated responses.
        </P>
        <P>
          The 2012 guidelines paper (Ramineni &amp; Williamson, 2012) is explicit about why the modes differ: &ldquo;For implementation of AES in contexts that are less consequential, such as practice tests and other settings, the criteria may be relaxed somewhat. By contrast, use of AES as the sole score, with no human counterpart, for consequential assessment, the criteria may need to become more rigorous.&rdquo; The GRE paper is more specific about the risk logic: &ldquo;As a more conservative approach, check score or a confirmatory score model was identified as a potential alternative implementation of automated scoring.&rdquo; That is deployment mode chosen as a safety response to observed subgroup discrepancies, not as cost optimization. Modern AI eval is arriving at the same principle by a different route.
        </P>

        <H2>5. Population-matched training and evaluation corpora.</H2>
        <P>
          The modern AI eval discussion of training data has, in the last few years, converged on a set of concerns: preference-training datasets should reflect the target population, red-team corpora should include real distribution attackers, and benchmark corpora should not be contaminated with pre-training data. Shared datasets are recognized as an open problem &mdash; Chatbot Arena, HumanEval, HELM scenarios, MMLU (Massive Multitask Language Understanding) each carry their own limitations, and the field is publicly navigating the shared-eval scarcity.
        </P>
        <P>
          That discipline is not new to automated scoring. The Cambridge Handbook of Learner Corpus Research chapter on automated scoring (Higgins, Ramineni, &amp; Zechner, 2015) laid it out explicitly across writing and speech scoring. Calibration corpora ranged from 400 to 1,200 responses per prompt, with a train/validation split, evaluated using quadratic weighted kappa, Pearson correlations, and standardized mean score differences. Population-matched training was non-negotiable: &ldquo;Trying to apply scoring models from GRE to TOEFL and vice versa can be problematic because of the differences in the population for the two tests.&rdquo; That is the classical statement of the distribution-shift constraint. Speech-scoring corpora carried an additional problem the chapter named directly: word error rates on non-native speech reached about 50 percent versus 13 to 17 percent for broadcast news, so the training corpora required manual transcription and were often locked inside the commercial organizations that produced them. &ldquo;The use of learner corpora in this field is currently rather fragmented, with the result that findings are difficult to compare and generalize.&rdquo;
        </P>
        <P>
          Modern AI eval is having exactly this conversation about shared datasets, benchmark contamination, and closed evaluation regimes at commercial labs. The chapter&rsquo;s insistence on population-matched training, held-out validation, construct-appropriate feature design, and shared datasets for cross-lab comparison is a point-for-point ancestor of that discussion.
        </P>

        <H2>6. Prompt and eval-item curation &mdash; screening what you evaluate.</H2>
        <P>
          The modern eval field has begun to notice that a benchmark is only as informative as the prompts inside it. Benchmark contamination, prompt saturation, and out-of-distribution prompts are all recognized failure modes. Canary items are used to detect training-data leakage. Prompt engineering has become a discipline of its own. Some evaluation frameworks now include prompt curation as a first-class step.
        </P>
        <P>
          Two NCME 2015 conference papers formalized a version of this discipline for automated scoring. The first (Williams &amp; Ramineni, 2015) developed an aberrant-prompt detection method: compute feature-distribution confidence intervals across the existing prompt pool, then count feature violations on new prompts to flag those whose response distributions fall outside acceptable ranges. That is out-of-distribution detection for eval items, before the term existed in the LLM context. The second (Ramineni, Mattar, Tessema, Li, &amp; Schultz, 2015) worked on deviant prompts: generic scoring models could pass at aggregate but fail on individual prompts, and those failures were then routed to content experts to inform future prompt authoring. That is eval-driven benchmark curation as a feedback loop. Both papers were framed as replacements for expensive item tryouts &mdash; automated screening as an operational efficiency, not only a research method.
        </P>
        <P>
          These are conference-paper receipts, less formal than the journal work, but they name a discipline modern AI eval is now building without the prior vocabulary. The screening question &mdash; is this prompt one your scoring system can be trusted to score &mdash; is the same in both worlds. The tools differ. The problem does not.
        </P>

        <H2>7. Cross-domain generalization &mdash; validity in naturalistic settings.</H2>
        <P>
          The sharpest current question in AI evaluation is whether a model&rsquo;s benchmark performance carries over to real-world use. LLM leaderboards do not resolve this. A model that tops HELM can fail on a domain-specific customer workflow. Generalization from curated benchmarks to naturalistic user data is where deployed AI systems live or die, and modern eval methodology is still developing the tools for measuring it.
        </P>
        <P>
          The classical automated-scoring literature confronted the same problem directly, and the receipt for that work sits in the 2017 paper I co-authored with Brent Bridgeman, published in <I>Assessing Writing</I> (Bridgeman &amp; Ramineni, 2017). The paper carries the essay&rsquo;s opening thesis &mdash; that agreement with human scores on the same essays is a reliability indicator, not a validity strategy &mdash; and proposes naturalistic writing samples (writing produced under real conditions, not standardized-test conditions) as a stronger validity criterion. It executes the method by training new automated scoring models on first-year graduate coursework writing samples across disciplines, evaluated with a holistic rubric by trained human raters, and testing whether features from an existing timed-essay scoring engine transfer. The result was informative in both directions. The features applied. But their weights in the coursework model diverged substantially from their weights in the timed-essay model.
        </P>
        <P>
          That divergence is the classical version of the modern generalization question. A scoring model trained on one construct-representation (timed impromptu writing) does not automatically hold on another (untimed authentic coursework), even when the underlying construct (writing quality) is nominally the same. The features carry across; the weightings do not. Modern AI eval is discovering the same pattern with LLM benchmark-to-production drift. The evidence for it in the automated-scoring literature has been on the record for eight years.
        </P>

        <H2>8. Responsible-AI framing at the point of deployment.</H2>
        <P>
          The modern responsible-AI discussion has developed a set of framing conventions: model cards, system cards, responsible scaling policies, IRB (Institutional Review Board)&ndash;equivalent review processes, ethical guidelines for training-data provenance, and a growing distinction between observed-correlation claims and causal-impact claims in reporting on AI systems. NIST&rsquo;s AI Risk Management Framework organizes many of these. Anthropic&rsquo;s Responsible Scaling Policy, OpenAI&rsquo;s system cards, and comparable industry frameworks operationalize them.
        </P>
        <P>
          In March of 2015, I gave a talk at the Conference on College Composition and Communication in Tampa titled &ldquo;Risks and Rewards of Digital Data: Case of Automated Writing Evaluation&rdquo; (Ramineni, 2015). The talk split its analysis into two categories that map directly onto the modern responsible-AI vocabulary. Statistical concerns: selection bias, unbalanced design, nested structure, missing collateral information or control groups, and the seductive but unlicensed move from observed trends to causal inferences. Ethical concerns, citing CCCC&rsquo;s own research guidelines on the use of online and digital media: &ldquo;Who owns the data? Who has access? How to access? How to use? (Identification information, IRB approvals). Consequences? Dissemination?&rdquo; The illustration data was observational &mdash; 132 schools, 9,340 students, 213 tasks &mdash; and the point was to show that observed trends across the corpus (score gains across attempts, ELL (English language learner) versus non-ELL differences) can be seductive but do not license causal inferences.
        </P>
        <P>
          That was a decade before the mainstream responsible-AI conversation reached these framings for LLM systems. The AWE (automated writing evaluation) community was small; the audience for that talk was smaller; the discussion did not scale into the field the way the modern responsible-AI conversation has. But the framework existed, and the receipt is in the record.
        </P>

        <H2>Close</H2>
        <P>
          The eight bridges above are not a complete map. They are the ones I have receipts for. Modern AI evaluation is a broader project than automated essay scoring ever was, and much of what it is developing is genuinely new &mdash; the alignment problems of frontier models, the specific failure modes of agentic systems, the scale at which modern evaluation has to run. What is not new is the discipline for asking whether an AI system measures what its label claims. That discipline was built in measurement science, refined against automated scoring engines, and published in journals and conference proceedings while the current AI eval field was still forming. Its two foundational statements are older than every receipt above. <a href="https://doi.org/10.1037/0033-2909.112.3.527" target="_blank" rel="noopener" className="text-accent hover:text-accent-2 no-underline border-b border-line-2 hover:border-accent pb-px">Kane (1992)</a> established that validation is an argument: a chain of inferences examined link by link, with evidence aimed at the weakest assumption rather than spread evenly. <a href="https://psycnet.apa.org/doi/10.1037/0003-066X.50.9.741" target="_blank" rel="noopener" className="text-accent hover:text-accent-2 no-underline border-b border-line-2 hover:border-accent pb-px">Messick (1995)</a> established that validity is a property of the interpretation and use of a score, consequences included, and not of the instrument that produced it. Every paper in the reference list below sits downstream of those two. A field that reads only the recent literature will rebuild the receipts and miss the frame they were written inside.
        </P>
        <P>
          I did not write this to claim credit for what modern AI eval is doing. I wrote it because the recognition kept surfacing across the AB Library work of the last few months &mdash; that the arguments I keep making about validity, evaluation, and construct integrity are arguments I made in print more than a decade ago, under different vocabulary, and that the field currently doing this work does not always know the earlier literature exists. The pieces closest to this argument in the library are <InternalLink slug="what-is-this-system-measuring">What is this system actually measuring?</InternalLink> and <InternalLink slug="when-the-stakes-are-the-mission">When the stakes are the mission</InternalLink>, and both draw on the same source lineage cited above.
        </P>
        <P>
          Human-machine agreement is a reliability indicator, not a validity strategy. That claim was in a 2017 manuscript. The infrastructure for what a validity strategy actually looks like &mdash; for AI systems, for automated scoring, for any measurement system that stands in for human judgment &mdash; was built alongside it. The AI eval field does not need to invent that infrastructure. It needs to find it and turn it toward the systems being built now.
        </P>

        <H2>References</H2>
        <P>
          Bejar, I. I., Flor, M., Futagi, Y., &amp; Ramineni, C. (2014). On the vulnerability of automated scoring to construct-irrelevant response strategies (CIRS): An illustration. <I>Assessing Writing, 22</I>, 48&ndash;59.
        </P>
        <P>
          Bennett, R. E., &amp; Bejar, I. I. (1997). <I>Validity and automated scoring: It&rsquo;s not only the scoring.</I> ETS Research Report Series, RR-97-19. (Also published in <I>Educational Measurement: Issues and Practice, 17</I>(4), 9&ndash;17, 1998.)
        </P>
        <P>
          Bridgeman, B., &amp; Ramineni, C. (2017). Design and evaluation of automated writing evaluation models: Relationships with writing in naturalistic settings. <I>Assessing Writing, 34</I>, 62&ndash;71.
        </P>
        <P>
          Higgins, D., Ramineni, C., &amp; Zechner, K. (2015). The use of learner corpora to support automated scoring of test responses. In S. Granger, G. Gilquin, &amp; F. Meunier (Eds.), <I>The Cambridge Handbook of Learner Corpus Research</I> (pp. 587&ndash;604). Cambridge University Press.
        </P>
        <P>
          Kane, M. T. (1992). An argument-based approach to validity. <I>Psychological Bulletin, 112</I>(3), 527&ndash;535.
        </P>
        <P>
          Messick, S. (1995). Validity of psychological assessment: Validation of inferences from persons&rsquo; responses and performances as scientific inquiry into score meaning. <I>American Psychologist, 50</I>(9), 741&ndash;749.
        </P>
        <P>
          Ramineni, C. (2015, March). <I>Risks and Rewards of Digital Data: Case of Automated Writing Evaluation.</I> Presentation at the annual Conference on College Composition and Communication, Tampa, FL.
        </P>
        <P>
          Ramineni, C., Li, C., &amp; Breyer, F. J. (2012, April). <I>Understanding mean score differences between automated and human scores using Classification and Regression Trees.</I> Paper presented at the annual meeting of NCME, Vancouver.
        </P>
        <P>
          Ramineni, C., Mattar, J., Tessema, A., Li, C., &amp; Schultz, M. (2015, April). <I>Using automated generic scoring models to identify deviant prompts.</I> Paper presented at the annual meeting of NCME, Chicago.
        </P>
        <P>
          Ramineni, C., Trapani, C., Williamson, D. M., Davey, T., &amp; Bridgeman, B. (2012a). <I>Evaluation of the e-rater scoring engine for the GRE Issue and Argument prompts</I> (ETS RR-12-02). Princeton, NJ: Educational Testing Service.
        </P>
        <P>
          Ramineni, C., Trapani, C., Williamson, D. M., Davey, T., &amp; Bridgeman, B. (2012b). <I>Evaluation of the e-rater scoring engine for the TOEFL Independent and Integrated prompts</I> (ETS RR-12-06). Princeton, NJ: Educational Testing Service.
        </P>
        <P>
          Ramineni, C., &amp; Williamson, D. M. (2012). Automated essay scoring: Psychometric guidelines and practices. <I>Assessing Writing, 18</I>(1), 25&ndash;39.
        </P>
        <P>
          Ramineni, C., &amp; Williamson, D. (2018). <I>Understanding mean score differences between the e-rater automated scoring engine and humans for demographically based groups in the GRE General Test</I> (ETS RR-18-12 / GRE Board Research Report 18-01). Princeton, NJ: Educational Testing Service.
        </P>
        <P>
          Williams, D. R., &amp; Ramineni, C. (2015, April). <I>Using automated features to identify aberrant prompts.</I> Paper presented at the annual meeting of NCME, Chicago.
        </P>

        <SeeAlso>
          <SeeAlsoItem
            slug="what-is-this-system-measuring"
            title="What is this system actually measuring?"
            gloss="The measurement-validity discipline this essay's evidence base draws on, in its earlier statement for university AI adoption."
          />
          <SeeAlsoItem
            slug="when-the-stakes-are-the-mission"
            title="When the stakes are the mission."
            gloss="The mission-driven-AI-evaluation companion &mdash; the same discipline applied where the cost of a wrong signal is the intervention meant to reach someone."
          />
          <SeeAlsoItem
            slug="auditing-an-ai-native-practice"
            title="Auditing an AI-native practice."
            gloss="The practitioner-scale application of the same validity discipline, run against my own AI-assisted workflow."
          />
          <SeeAlsoItem
            slug="actions-not-answers"
            title="Actions, not answers."
            gloss="The agentic-checkpoint companion &mdash; where the human evaluator sits when the AI has moved from answering to acting."
          />
        </SeeAlso>

        <MetaNote>
          Written August 2026 for the Analytic Bytes Library. The piece draws on seven years of automated-scoring research produced during my time at Educational Testing Service (2009&ndash;2016), with publications appearing between 2012 and 2018, and on the recognition &mdash; surfacing repeatedly across the library work of the last few months &mdash; that the modern AI evaluation field is rebuilding a discipline the automated-scoring literature already carried. The eight bridges are the ones with citations in my own record; a fuller map of the classical measurement-science literature on this question would run longer.
        </MetaNote>
      </>
    ),
  },
];

// ---------------------------------------------------------------------
// HELPERS
// ---------------------------------------------------------------------

export const ESSAY_SLUGS = ESSAYS.map((e) => e.slug);

// Visibility helper. Drafts show in local dev so they can be read on
// localhost before publishing; they disappear from production. Hidden
// pieces (retired/archived) are invisible everywhere.
//
// Use this everywhere we filter the ESSAYS list. Do NOT filter by
// `!e.hidden` directly — it will leak drafts to production.
const IS_DEV = process.env.NODE_ENV === "development";
export function isEssayVisible(e: Essay): boolean {
  if (e.hidden) return false;
  if (e.draft && !IS_DEV) return false;
  return true;
}

export function getEssay(slug: string): Essay | undefined {
  return ESSAYS.find((e) => e.slug === slug && isEssayVisible(e));
}
