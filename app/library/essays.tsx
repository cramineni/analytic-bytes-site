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

/** Inline link to an artifact in the /library gallery. Use mid-essay only
 * when prose explicitly invokes the diagram or frame the artifact depicts.
 * Anchors directly to the artifact card via id="artifact-{slug}".
 * Exported so other pages (e.g. case-studies) can reuse the styling. */
export function ArtifactLink({
  slug,
  children,
}: {
  slug: string;
  children: ReactNode;
}) {
  return (
    <a
      href={`/library#artifact-${slug}`}
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
  | "organizational-design";

export const ARC_LABELS: Record<Arc, string> = {
  measurement: "Measurement",
  "integration-governance": "Integration governance",
  "ai-systems": "AI systems",
  "organizational-design": "Organizational design",
};

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
  hidden?: boolean; // if true, hidden from /library feed, homepage Library section, and route generation
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
    arc: "organizational-design",
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
            It isn’t, and the reason is worth a leader’s attention before the
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
          produces something recognizable: sprawl. Multiple tool licenses, no
          cohesion across reports and dashboards, users still running
          workarounds because no single tool quite fit the job it was handed.
          AI features amplify it. More vendors offer more in-tool AI, there is
          more incentive to bolt features in across the stack, and more risk of
          overpaying for AI without knowing where each capability belongs.
        </P>
        <P>
          An analytics product that serves more than one audience, and that is
          most of them, is serving three reporting surfaces at once.
          They differ on five dimensions: audience, cadence, governance,
          permission model, output format. None of the five compromises
          gracefully. Force a single tool to span all three surfaces and the
          result is mediocre on every axis — the kind of failure that never
          trips an alarm. It just produces a system nobody relies on.
        </P>
        <P>
          The first decision is not which BI tool. It is recognizing that the
          surfaces are different products, and giving each the architecture it
          deserves. The second decision is what sits underneath all three, and
          it matters more than any of the surface choices. Vendor selection
          comes last. Once the rest is done, it barely matters.
        </P>

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
          non-technical and personally invested in what the data says about
          them.
        </P>
        <P>
          <B>Surface B is the operator console.</B> Internal staff, opened
          whenever they open it, governance essentially nil because nothing gets
          published from it. The user wants “what’s mine, what’s overdue, what
          changed since last week.” The output is the workflow itself. The user
          does work in the surface; they don’t read it and walk away. Its
          failure mode is being a day out of date.
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
          differ on every one of those, and not one of them bends gracefully.
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
          The interesting case is Surface A, because that is where the BI vendor
          pitch breaks down hardest and where most organizations underweight the
          gap.
        </P>
        <P>
          Most BI tools on a typical evaluation matrix assume the deliverable is
          a screen rendered live against a data source. The publication problem
          needs the inverse: a templated document with branded typography,
          headers, footers, footnotes, and language that comms or design owns
          separately from the analyst. PDF export from the dashboarding mode of
          most BI tools produces a screenshot, not a structured document.
          Paginated-reporting features (SSRS-style modules inside Power BI and
          their equivalents elsewhere) are the real exception, designed for
          exactly this use, and a publication-grade option when an institution
          already has the skillset; they are a different toolset than the
          dashboarding mode that dominates BI demos. The artifact a board
          member emails to a colleague is a Word file, or a PDF that looks
          like one. Nobody forwards a dashboard URL with a login prompt behind
          it.
        </P>
        <P>
          There is also a layout-ownership problem. In a BI tool, the analyst
          owns the visual layout because the layout is the dashboard. In a real
          publication system, comms or design owns the template and the analyst
          owns the data. Those should be different people with different review
          authority and different release cadences. BI vendors don’t have a
          credible answer for that split, and most don’t try.
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
          one less system. The system that goes missing is the one that was
          shaped for the job.
        </P>

        <H2>The keystone: one canonical computation per concept</H2>
        <P>
          The keystone argument is the one most worth holding firm on. It is the
          difference between a system that scales and a system that erodes
          trust over time.
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
          This matters, and “do the keystone first” is non-negotiable, because
          of the failure mode it prevents.
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
          It’s slow. It rarely triggers a single alarm. It just gradually
          corrodes the credibility of every artifact the team produces, until
          people stop quoting numbers in meetings and start saying “I’d want to
          verify that.” Once that phrase shows up, the product is functionally
          dead even if it’s still being maintained.
        </P>
        <P>
          This is what a decision-system problem looks like traced to its root:
          not a missing dashboard, but a missing source of truth, taxing every
          decision downstream with the cost of re-verification. Every number now
          arrives with a question attached, and that question is load the
          decision-maker carries before they can act.
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
          This is where most teams get it wrong, including teams that nominally
          agree with everything above. The instinct is to start with the
          visible surface: pick a BI tool, build a dashboard, show leadership
          progress. The result is a polished surface over an ungrounded data
          layer, which is worse than the prototype it replaced, because now it
          looks credible.
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
          Underneath all of it is one discipline: a reporting system is only as
          good as the decision it was built to serve. Most reporting gets built
          backward, from the tool the organization happened to buy, instead of
          forward from the decision someone has to make. Name the decisions.
          Give each its own surface. Put one canonical computation beneath them
          all. The vendor is the last and smallest choice. <I>From fragmented to
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
            rarely shows up in a status update. And it is where a lot of
            analytics work stops earning its keep.
          </p>
          <p>
            What follows is written for the people building dashboards, but the
            method is small enough for a leader to hold a team to: let an AI
            tool propose what the audience needs to see before the team’s craft
            instincts lock in, then curate from there. The claim is not
            that AI designs better. It is that AI doesn’t yet carry your team’s
            aesthetic habits, which makes it a useful mirror for a bias every
            data team has and few can see in themselves.
          </p>
        </Brief>

        <P>
          A few years ago I built a school-performance dashboard in Looker for a
          charter network. It was sophisticated. Meter charts for percentile
          readings. Multi-layered filters. Polished visual treatment that took
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
          That gap is the one that matters in mission-driven analytics: the gap
          between the dashboards data teams build because they are satisfying to
          make and the dashboards decision-makers use to decide. And GenAI
          tools, used the right way, are surprisingly good at exposing it.
        </P>
        <P>
          This is what came out of the four-phase capstone. The discipline of
          letting AI propose first changed the work.
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
          design. The AI is acting as a fast proxy for the stakeholder’s
          cognitive needs — or more precisely, as a regression toward the
          average of the human design corpus it was trained on. It hasn’t
          spent five years in your design reviews; what makes it useful at
          this step is that it hasn’t yet adopted the local in-group
          aesthetics that pull dashboards away from clarity. The AI’s
          neutrality is averaged-design neutrality, not stakeholder
          neutrality. Useful for the first cut. Not a substitute for a
          real reading of who is going to look at this and why.
        </P>
        <P>
          One caveat the AI’s clarity-first instinct won’t supply on its
          own: regulated contexts often require what looks like uglier
          design for compliance reasons. FERPA cell-suppression for small-N
          subgroups, HIPAA minimum-necessary framing, mandatory disclaimer
          footers, IRB-style consent language — none of these make a
          dashboard cleaner, and none can be cut for design simplicity. An
          AI redesign that simplifies past those constraints isn’t cleaner;
          it’s noncompliant in a way that looks like clarity. The curation
          step has to put those constraints back in.
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
          already happening. The discipline doesn’t shift. The discipline is:
          let AI propose what the stakeholder needs to see before the data
          team’s preferences lock in. Curate from there.
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
          build something interesting? That is a productive conversation to have
          early instead of after the dashboard ships.
        </P>
        <P>
          <B>Stakeholder interpretation becomes part of the design process.</B>{" "}
          AI proposals are easy to test against actual users. Does a school
          principal read this faster than the original? That is a question you
          can answer with five principals and a week, which is most of the
          point.
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
          which question matters most. The analyst keeps that call; it’s
          the part of the workflow that hasn’t softened under any tool I’ve
          tried.
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
          Beautiful dashboards aren’t the same as decision-driving ones. AI
          tools are a discipline against our own biases. Use them that way.
        </Pull>
        <P>
          And the discipline generalizes well past dashboards. Design every
          surface backward from the decision it is meant to change, not forward
          from the data you happen to hold. Ask it of a report, an alert, a
          model’s output: what decision does this serve, and does it measurably
          move it? The fifteen-second dashboard a principal can act on is just
          one surface answering that question honestly. <I>From fragmented to
          decision-ready</I> is the distance a data team closes when it stops
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
            A leader rarely sees AI architecture as architecture. It arrives as
            a series of small, reasonable approvals: an AI-assisted connector
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
          what grounds it, and it is the one that decides whether your AI
          investments compound or corrupt the data product. Place AI in the wrong
          layer and it gets expensive, slow, and untrustworthy. Place it in the
          right layer with no grounding contract and it makes things up. Place it
          correctly, ground it against the same canonical metric definitions as
          your BI and your reports, and it earns trust the way the rest of the
          stack does.
        </P>
        <P>
          This is the argument, in three parts. AI compute has a natural
          placement at each layer of the stack, and placement is more
          consequential than feature selection. The dbt semantic layer is the
          grounding contract for AI features, the same way it is the grounding
          contract for BI surfaces; drift between AI features is the same
          problem as drift between dashboards, only harder to detect, because
          the symptoms are language, not numbers. And in the client portal where
          dashboards and reports live, AI shows up as alerts, summaries, and
          chat. Each earns its place by doing something the deterministic layer
          cannot, and none of them get to invent metrics.
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
          quality model that drops rows for reasons you cannot reproduce is the
          kind of dependency that breaks during a stakeholder review and leaves
          you unable to explain why.
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
          writing SQL. That single move eliminates most of the hallucination
          risk in a portal chatbot, and the setup work is mostly already done.
          You just have to decide that the dbt semantic layer is the canonical
          contract every AI feature reads through.
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
          which is the next part, is where most stacks come apart.
        </P>

        <H2>The semantic layer is also the AI contract</H2>
        <P>
          The keystone argument from the companion piece, <I>Three Surfaces, One
          Keystone</I>, extends one step. There, the claim was that all three
          reporting surfaces (program report, operator console, executive view)
          must read from a single dbt-defined semantic layer or they drift,
          and drift is the failure mode that kills trust.
        </P>
        <P>
          The same argument applies, more strongly, to AI features. Three
          reasons.
        </P>
        <P>
          <B>The drift surface is bigger.</B> With BI tools you have a small
          number of dashboards, each owned by an analyst who can be talked to.
          With AI features you have potentially every alert, every summary,
          every chatbot answer, every auto-generated email, each of which can
          independently drift from the canonical metric. There is no single
          owner to call.
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
          superintendent who can’t see where the number came from won’t use it
          twice.
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
            answer the question the data was supposed to answer: here, <I>which
            classrooms need which support this term.</I>
          </p>
          <p>
            That is not a data-collection problem. It is an integration
            problem: the layers exist and don’t talk to each other, so no
            decision-maker sees the whole picture at the granularity their own
            decision requires. The fix is not another portal. It is an
            architecture that stitches the layers you already have into decision
            surfaces for the people who have to act. Different surface, same
            discipline — the one that applies as readily to a behavioral-health
            nonprofit or a charter network as to a state education ministry.
          </p>
        </Brief>

        <P>
          In healthcare, you don’t pick one data source and use it for
          everything. You stitch CDC mortality data with NSDUH prevalence,
          claims data with electronic health records, patient-reported outcomes
          with hospital encounter feeds. Each layer measures something
          different. Each runs at a different cadence. Each serves a different
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
          districts. The layers exist. The integration architecture isn’t yet
          built.
        </P>
        <P>
          That integration architecture is what LO 2.0 proposes: the thing that
          stitches national, district, school, and classroom layers into
          coherent decision support for teachers, headmasters, district
          officers, ministries, and policy designers.
        </P>
        <P>
          This is the analytical landscape, the state-level evidence that
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
          ranking grades across 73 indicators on a 1,000-point scale. Don’t
          reach for it when the question is operational or improvement-shaped;
          it won’t carry the weight.
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
          The pattern is recognizable: each layer does something well, and each
          layer has a clear failure mode. None alone is sufficient. Stitched
          through an integration architecture, they can serve a teacher, a
          headmaster, a district officer, and a policy designer reading the same
          assets at different cadences.
        </P>

        <H2>The picture for one state</H2>
        <P>
          Andhra Pradesh, 2021. NAS data shows Class X performance below 50% on
          every measured learning outcome, and below the national average on 16
          of them. Eighty percent of students at or below basic level in Math;
          94% at or below basic in Science; 86% at or below basic in Social
          Science. The pattern compounds with grade: at-or-below-basic in Math
          goes from 63% in Class III to 80% in Class X. The state-private gap
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
          These signals come from national data. They’re real. They’re useful
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
          This is what stitching makes possible. None of the layers alone
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
          The semantic layer underneath is shared.
        </P>

        <H2>The decisions stitching enables</H2>
        <P>
          The integration is not abstract. With the layers stitched, specific
          decisions get sharper.
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
          classroom assessments” as a binary. They aren’t. Each layer does
          something the other can’t. The question isn’t which to invest in; it’s
          what integration architecture lets them serve different
          decision-makers running different decisions at different cadences.
        </P>
        <P>
          Healthcare has spent decades building toward this, integrating CDC +
          NSDUH + claims + EHR + patient-reported outcomes through
          population-health platforms and clinical decision-support systems,
          though it is far from finished even there. Education hasn’t yet built
          the equivalent. LO 2.0 is one shape that integration architecture
          could take.
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
          The opportunity is sitting in the layers already collected. The work
          is to stitch them into decision surfaces for the people who have to
          act.
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
          reflect NAS 2021 and PGI 2022–23 cycles; subsequent NAS 2024 and PGI
          releases would refine the picture. The integration-architecture
          argument is intended to outlast specific cycle data.
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
            A funder with a fixed prevention budget, or a state health officer
            with one, faces the same question every cycle: where does the next
            dollar go? The instinct is to follow the headline and fund the
            states with the highest suicide rate. That instinct isn’t wrong. It
            is just one signal, and on its own it sends money to the wrong map.
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
          Now split the same dataset differently. The mid-life bands moved the
          other way over the same three years: ages 35–44 up roughly 3 percent,
          and 45–54 up about 3.5 percent. The decline among the young and the
          rise after 35 are happening at the same time, in the same country, in
          the same data.
        </P>

        <Figure
          src="/library/figures/cdc-age-rate-change-2021-2024.png"
          alt="Bar chart of percent change in crude suicide rate by age band, 2021 to 2024, ages 10–54. Four younger bands (10–14, 15–19, 20–24, 25–34) declined 12–16 percent; two mid-life bands (35–44, 45–54) rose 3 to 3.5 percent."
          caption="Percent change in crude suicide rate by age band, 2021 to 2024, ages 10–54. Source: CDC WONDER provisional mortality data. Descriptive comparison; not causal."
        />

        <P>
          A single national rate blends those opposite movements into one
          number, and because the youngest bands are falling fast, that number
          still reads as progress. The blend hides the reversal underneath it:
          for every age band past 35, the trend has already turned. An average
          cannot tell a funder that, and a funder who reads only the average
          will not know to look. The lesson isn’t really about age. It is that
          any rolled-up number is a decision hazard. It blends signals moving in
          opposite directions, and the blend erases the contrast a resource
          decision depends on. You have to disaggregate before you can allocate.
          Age is one cut; the cut this note is about is harder.
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
          Rank states by burden for 2024, ages 10–54, and the top of the list is
          Alaska (a rate of 36.4 per 100,000), Wyoming (31.5), Montana (30.4),
          New Mexico (29.8), South Dakota (26.9), then North Dakota, Colorado,
          Oklahoma, Maine, Arkansas, Idaho. It is, broadly, a Mountain-West and
          rural map.
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
          One pattern runs through nearly every disparity signal on the map. In
          six of the seven states with a reliable signal, the most-affected
          group is American Indian and Alaska Native communities; in Hawaii, it
          is residents of more than one race. That is the clearest pattern in
          the disparity signals. It should shape not only where the dollar goes
          but who helps design what it funds; a prevention dollar designed for
          a community without their participation tends to underperform a
          dollar designed in partnership with them.
        </P>

        <H2>Where the next dollar goes</H2>
        <P>
          The framework doesn’t hand a funder an answer. It does something more
          useful. It makes the question explicit. A dollar can be spent to
          prevent the most deaths or to close the widest gap, and those are
          different ethical commitments that lead to different states. A serious
          allocation decision says which one it is optimizing, or splits the
          budget across both on purpose, instead of letting the choice get made
          implicitly by whichever number happened to be on the slide.
        </P>
        <P>
          The overlap group is where the argument is easiest. Alaska, South
          Dakota, Montana, Arizona, and Hawaii satisfy both commitments
          simultaneously, and for most funders that is where a first tranche
          belongs. The harder and more revealing conversations are the
          off-diagonal ones. Is a Minnesota (an unremarkable statewide rate
          hiding a more-than-threefold disparity) a priority for your mission? A
          burden ranking already answered “no” on your behalf, silently, before
          anyone in the room got to weigh in. The quadrant’s value is that it
          puts the state back on the table and forces the answer to be given on
          purpose.
        </P>

        <H2>The honest version</H2>
        <P>
          This is a field note, and being precise about what the data cannot do
          is part of the method, not a disclaimer bolted to the end.
        </P>
        <P>
          The figures are <I>provisional</I>. CDC WONDER mortality counts for
          2021–2024 are revised over time; the picture will shift.
        </P>
        <P>
          The disparity signals are <I>reliability-filtered</I>. A signal was
          counted here only if there were at least 20 deaths in both the
          comparison group and the White comparison group, a relative risk of at
          least 1.25, and a positive absolute rate difference. Below those
          thresholds, small counts produce rates that swing wildly from year to
          year, and an unfiltered ranking would look precise without being it.
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
          The next dollar gets spent either way. A framework like this one
          doesn’t spend it for you, and it shouldn’t. What it does is make sure
          that when you spend it, you were looking at the whole map: both
          signals, and the honest edges of what the data can and cannot say.{" "}
          <I>From fragmented to decision-ready.</I>
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
    arc: "organizational-design",
    body: (
      <>
        <Brief>
          <p>
            In most organizations, one line on the org chart was never
            decided. It was inherited. Who owns data infrastructure? The
            function ended up reporting wherever the first analyst was hired, or
            under IT because data felt technical, or under finance because data
            felt like an asset to safeguard. It was rarely a deliberate choice,
            and it tends to stay wherever it landed.
          </p>
          <p>
            That accident has consequences. Where data infrastructure reports
            decides what the function is allowed to become, and it drives a
            hiring problem that looks unrelated. This piece argues there is a
            right answer. Not a right title; a right principle. It is written
            for anyone drawing, or redrawing, an org chart with a data function
            on it, and it is an argued position: I will make the honest case for
            each alternative before I make mine.
          </p>
        </Brief>

        <P>
          Let’s start with the confusion. It is real, and it is a clue. Ask ten
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
          So set the title question aside. It is the wrong question, and
          answering it first is how organizations end up improvising. Ask the
          prior one. What does data infrastructure need from its place
          on the org chart? Answer that, and the seat stops being a matter of
          taste.
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
          deserves its honest case before I argue against it.
        </P>
        <P>
          <B>Under the CTO or CIO.</B> The case is strong. Data runs on
          technical infrastructure: pipelines, warehouses, access controls,
          uptime. That is engineering, and engineering muscle lives under the
          CTO. Put data where the people who can build and run the plumbing
          already sit. The cost shows up later. Under the CTO, data gets read as
          a system to keep running, and what gets resourced is what the CTO is
          measured on: reliability, security, uptime, incident response. The semantic layer, the
          part that makes data <I>mean</I> something to a program lead or a
          board, becomes nobody’s priority. The function slowly turns into a
          service desk — requests arrive through a ticketing queue, analysts
          close them quickly, and the decision happens somewhere else without
          them.
        </P>
        <P>
          <B>The CFO or CFAO option.</B> Also a real case. Data is a governed,
          risk-bearing asset, and finance already runs enterprise reporting, has
          audit discipline, and treats numbers as things that must reconcile and
          withstand scrutiny. Few functions are better at custody. The cost is
          orientation. Finance looks backward by instinct, and it looks at
          compliance: the close, the audit, the filing. Under finance, the data
          function optimizes for the report being correct rather than the
          decision being better, and forward-looking operational work is always
          the thing finance will get to later.
        </P>
        <P>
          <B>Its own seat, a CDO or CDAO.</B> This is the strongest alternative,
          and it should be conceded as one. Data is strategic enough to warrant
          a peer-level seat: uncaptured, visible, carrying a standing none of the
          embedded options confer. The role exists to solve the placement
          problem. The cost is the gap between a seat and traction. A CDO with a
          title but no integration mandate produces strategy (frameworks,
          roadmaps, decks) and not adopted systems, because nothing structurally
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
          own incentive. The executives aren’t at fault; it is what reporting
          lines do. A cross-functional capability owned by one function gets
          narrowed by it.
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
            It needs <B>traction</B>. Sight is not enough; it needs the standing
            to make functions adopt shared definitions and use what it produces.
            Sight without traction is a research office nobody acts on.
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
          The seat that’s left, once the four embedded options are set aside,
          is the one already accountable for how the whole organization runs
          together. Call it the integration seat. In most organizations, it is
          the Chief Operating Officer.
        </P>
        <P>
          The COO is not a single function. The COO is the place the functions
          already meet, which clears the capture test, and the COO sees across
          all of operations, which clears the sight test. The third test is the
          one a standalone CDO cannot pass: the COO has the standing to make a
          shared definition stick. When the COO says every team will use one
          definition of an active client, teams use it. When a peer says it,
          they negotiate. Traction is a property of the seat, not the person.
          And the altitude matches: the COO’s job is how the organization
          operates day to day, which is where data infrastructure’s decisions
          live.
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
          CEO <I>is</I> the operating integrator. There is no second seat.
          There, data infrastructure should sit with the CEO or ED, not because
          that office is senior enough, but because in that organization it is
          the integration seat. As the organization grows and adds a COO,
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
          motion. The capability did not change across those moves. Its reach
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
          acts. The placement question does not get easier. It gets unavoidable.
        </P>
        <P>
          The answer, when an organization finally faces it, will not be a
          title. It will be a decision about what the function is <I>for</I>:
          serving decisions across the whole organization. Once that is named,
          the seat is named with it — the one place already accountable for the
          whole organization running together. Put data there and it stops being
          a service desk, a compliance engine, or an island. It becomes the
          thing it was always meant to be. <I>From fragmented to
          decision-ready</I>, and that begins, before a single dashboard is
          built, with where the function sits.
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
            What changed is not the model. It is the unit of work. AI used to
            produce answers, and an answer has a human reading it before
            anything happens. Agentic AI produces actions, and an action does
            not wait to be read. The human checkpoint that came free with every
            answer is gone, unless you design it back in. That makes agentic
            adoption a decision-system question, not a technology one. What
            follows is written for the leader who has to decide, concretely,
            what their organization will let an agent do.
          </p>
        </Brief>

        <P>
          Let’s start with what an “agent” is, because the demo obscures it.
          An agent is not a new kind of model. It is the same kind of model
          with two
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
          A working definition, the kind you would say at the start of a
          meeting (I drafted this for my MIT capstone playbook and use it now
          in client conversations): agentic AI is a software system that takes
          a goal, plans its own next moves across your tools and data, and
          produces actions rather than answers. Hold onto “actions rather than
          answers.” Everything else is downstream of it.
        </P>

        <P>
          Throughout the rest of this piece, I’ll keep coming back to one
          workflow as the worked example: AB’s “Deliver Signal,” the first
          ninety days of how I take a mission-driven client from fragmented
          sources to one decision-ready surface an executive and a frontline
          operator can both act on. It is the candidate workflow I worked
          through in detail for my MIT capstone, and it is also the work I am
          doing, currently end-to-end myself, with AI augmentation in code,
          prose, and analysis. It surfaces every decision this essay
          will walk through: where the human checkpoint sits, where the
          agent’s autonomy ends, what safeguards have to hold, and who owns
          the result.
        </P>

        <H2>The checkpoint that used to be free</H2>
        <P>
          When an AI system produces an answer, a decision still has to happen.
          Someone reads the answer, judges it, and acts on it, or doesn’t. That
          human decision point is not something anyone designed in. It comes
          free, built into the format. An answer is inert until a person picks
          it up, and the picking-up is the checkpoint.
        </P>
        <P>
          When an AI system produces actions, that checkpoint is gone by
          default. The agent books the appointment, sends the message, moves the
          money. The decision still gets made; each of those is a decision. But
          now the system makes it, at its own speed, unless a human was
          deliberately designed into the path.
        </P>
        <P>
          None of this is new in principle. Algorithmic trading has taken
          actions without human checkpoints for decades. Industrial control
          systems, autopilots, ad-bidding engines, and anti-fraud rule
          engines all already produce actions, not answers, at speeds no
          human can review. What is new about agentic AI is breadth and
          generality. A trading algorithm acts inside a narrow envelope its
          quants modeled in advance; an LLM agent is being handed envelopes
          nobody has modeled yet, across decision categories an organization
          has never had to ask the design question for, with reasoning steps
          the deploying team usually cannot inspect. The principle that
          machines act is old. The scope at which the principle is now being
          applied is new, and that is what makes the design question — who
          holds which decisions — load-bearing across more of the
          organization than it ever had to be before.
        </P>
        <P>
          The move underneath is a relocation. Agentic AI does not add a
          decision to your organization; it relocates one. It takes a decision
          that used to belong, by default, to a human who got it for free, and
          hands it, by default, to a model. Every “let the agent handle that” is
          a decision about who holds decision authority, made whether or not
          anyone in the room noticed they were making it.
        </P>
        <P>
          That is why this is a decision-system redesign and not a tooling
          upgrade. A tooling upgrade changes how a step gets performed. This
          changes who performs the deciding.
        </P>

        <H2>Most data problems are still decision problems</H2>
        <P>
          There is a claim at the center of how Analytic Bytes reads every one
          of these situations: most organizations do not have a data problem.
          They have a decision-system problem. The decisions are unnamed,
          unowned, made by default, or resting on signals nobody checks.
        </P>
        <P>
          Agentic AI does not change that claim. It sharpens it to a point. An
          organization that never named which decisions its workflows make, who
          carries them, and what evidence they stand on has a decision-system
          problem whether or not AI is anywhere near it. Hand that organization
          a set of agents and it does not get those questions answered. It gets
          them executed: unanswered, at machine speed, by a system that will not
          pause to ask. The confusion was survivable when a human sat in every
          loop, slow enough to catch it. Take the human out of the loop and the
          confusion is what runs.
        </P>
        <Pull>
          The unexamined decision system does not get fixed. It gets automated.
        </Pull>
        <P>
          So the readiness question for agentic AI is not “is the technology
          good enough.” The technology is mostly good enough. The question is
          whether the decision system underneath is clear enough to be worth
          speeding up.
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
          The second move is recognizing that autonomy isn’t a binary setting.
          An agent isn’t “autonomous” or “not.” For each task, in each
          context, it sits somewhere on a range: from only returning
          pre-verified responses, to acting within tight rules, to acting with
          every consequential move reviewed first, to acting freely and
          checked only by exception. The discipline is to calibrate that
          range per decision, by stakes, not once and globally by habit. A
          low-stakes, highly repeatable decision can sit well along the
          range. A decision that is rare, hard to reverse, or lands on a
          vulnerable person should not, however capable the model looks in a
          demo.
        </P>
        <P>
          In AB’s case, that calibration looks different across the same
          engagement. Source-inventory tagging sits well along the range,
          because the criteria are pattern-matchable and the cost of an
          individual wrong tag is low and recoverable. Diagnostic
          prioritization, choosing which of the client’s many problems is the
          highest-leverage gap to close first, sits much closer to the
          human-only end. The criteria there (political readiness, sponsor
          energy, data quality, frontline pain) trade off against each other
          in ways the agent can’t yet weigh, and the cost of getting it wrong
          is months of misdirected engagement.
        </P>

        <Figure
          src="/library/figures/ab-autonomy-range.svg"
          alt="A horizontal autonomy spectrum with four decisions from AB's Deliver Signal workflow plotted at different points. Diagnostic prioritization and Frontline-versus-boardroom framing sit near the human-only end. Gap ranking is mid-spectrum, escalation-heavy. Source-inventory tagging sits well along the spectrum toward agent autonomy."
          caption="Autonomy range for AB's Deliver Signal workflow: same engagement, four decisions, each with its own calibration. Stakes set the position, not capability."
        />

        <P>
          Readers of earlier pieces will recognize the shape: it is the same
          risk-and-repeatability logic that decides where AI authority sits in
          any deployment. Agentic AI does not introduce that question. It raises
          the stakes on getting the answer written down.
        </P>

        <H2>You cannot bolt safety onto the model</H2>
        <P>
          Two design truths close the loop, and both cut against instinct.
        </P>
        <P>
          The first: do not rely on the model to keep itself safe. The
          temptation is to make the model careful, with better instructions
          and sterner prompts. But a system whose safety depends on the model
          choosing well, every single time, has no safety at all. Safety has
          to be built into the{" "}
          <ArtifactLink slug="agent-system">structure around the model</ArtifactLink>
          . Start with reversibility: an action designed to be undone has
          margin for the other layers to fail. Then hard limits the agent cannot cross
          because they are enforced in code, not requested in a prompt. Then
          an independent second check that does not share the first model’s
          blind spots. Then a human escalation path more than one person
          deep. Layered defense, because any single layer will eventually
          fail, and the design has to assume it.
        </P>
        <P>
          For AB’s Deliver Signal workflow, that stack looks specific. The
          agent’s outputs (source tags, gap rankings, draft dashboards) are
          all reversible because the artifact lives in AB’s working
          environment, not in client production systems, until I sign off.
          The hard limits live in code: the agent cannot touch regulated-data
          systems without my explicit pre-approval, and it cannot ship a
          deliverable to a client. The independent check is a separate model
          reviewing the synthesizer’s gap rankings before they make it into a
          draft. The human escalation path is short by design (there is only
          me), but the design assumes that short path is the wrong long-term
          answer.
        </P>
        <P>
          The second design truth is the comparison the conversation most
          often gets wrong. The question to ask of an agent is not “does it
          make mistakes?” Of course it does. So does the human process it
          would replace. The honest question is whether this agent, with its
          safeguards, produces better decisions than the process it replaces,
          on the dimensions that matter. That reframe keeps the conversation
          off a fantasy (agent versus perfection) and on the real choice: the
          agent and its safeguards together, weighed against a status quo
          that had its own error rate all along, usually unmeasured.
        </P>
        <P>
          This is also where AB’s ed-tech and behavioral-health client
          conversations diverge before the comparison can even be made. In
          ed-tech, “agent” tends to mean an LLM-wrapped assistant that helps
          a teacher draft a lesson, and the comparison is straightforward,
          against the lesson the teacher would have written. In
          behavioral-health, “agent” gets confused with regulated staff roles
          (intake agent, case management agent) or with RPA bots already
          approved under HIPAA review. The comparison cannot be made until
          that definitional confusion is cleared with the Chief Clinical
          Officer or whoever holds the regulated-data accountability.
        </P>
        <P>
          Evaluation does not end at launch. Because the model drifts, an
          agent has to be watched continuously: its override rate, its
          disagreement signals, its slow slide as the ground shifts. The
          monitoring surface is not a quarterly report. It is a conversation
          you are now having with a system still out there making decisions
          in your name.
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
          Managing an agent is not a lighter version of using a tool. It is a
          new job, with responsibilities no prior role quite contained. The
          owner calibrates the thresholds as the agent’s behavior drifts, and
          it will drift, because the model underneath gets upgraded by a
          vendor on a schedule nobody consulted you about. The owner decides
          which patterns the agent carries forward and which it lets go. And
          the owner does the hardest thing of all: refusal. Deciding, in real
          time, that a particular case is one the agent should not touch, and
          being able to defend that call.
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
          An organization that deploys agents without naming who owns each
          one has installed a decision-maker without an accountable seat.
          When the agent makes a bad call, the question of who carries it has
          no answer prepared, and the cycle that follows tends to be slower
          than the call that caused it.
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
          For AB, working through that list is the work, not a preliminary to
          the work. The Deliver Signal workflow gets handed to an agent only
          after the decisions inside it have been named, the owners assigned,
          the thresholds drawn, the safeguards built. An organization that
          does this first can gain real speed without losing the thread. An
          organization that hands an agent its confusion gets the confusion
          back faster, with no human in the loop slow enough to notice.
        </P>
        <P>
          The discipline is not in any single safeguard. It is in the
          architecture, the cadence, and the refusal to relax the bound at the
          moment relaxing it would be convenient. <I>From fragmented to
          decision-ready</I> was always the work. Agentic AI did not change
          that. It only raised the price of skipping it.
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
      "Universities have built the scaffolding to govern AI and left out a load-bearing pillar: evaluation. The measurement-science question every adopted system should face — what is this actually measuring, and is that what we meant?",
    cover: "/library/covers/what-is-this-system-measuring.svg",
    arc: "measurement",
    body: (
      <>
        <Brief>
          <p>
            By the start of 2026, most universities had done the visible work of
            putting AI on the institutional agenda. They had written policies on
            student and faculty use, stood up AI committees and working groups,
            and run pilots — assistants for student services, drafting tools for
            administrative staff, models that flag students who might be
            slipping. The scaffolding went up quickly, and under genuine
            pressure: a contracting enrollment as the{" "}
            <a
              href="https://www.press.jhu.edu/books/title/11859/demographics-and-demand-higher-education"
              target="_blank"
              rel="noopener"
              className="text-accent hover:text-accent-2 no-underline border-b border-line-2 hover:border-accent pb-px"
            >
              demographic cliff
            </a>{" "}
            arrives, public skepticism about the return on a degree, tightened
            federal funding and tax conditions, and a sector that{" "}
            <a
              href="https://www.deloitte.com/us/en/insights/industry/articles-on-higher-education/2026-higher-education-trends.html"
              target="_blank"
              rel="noopener"
              className="text-accent hover:text-accent-2 no-underline border-b border-line-2 hover:border-accent pb-px"
            >
              Deloitte’s 2026 higher education outlook
            </a>{" "}
            describes as moving from a long period of growth into one of
            disciplined focus, with the business model under scrutiny and risk
            management demanding tighter coordination across offices that once
            operated siloed. AI arrived in the middle of all
            of it, as both another pressure and a promised relief.
          </p>
          <p>
            The role of the technology executive has shifted with it. In{" "}
            <a
              href="https://www.deloitte.com/us/en/programs/chief-information-officer/articles/global-technology-leadership-study.html"
              target="_blank"
              rel="noopener"
              className="text-accent hover:text-accent-2 no-underline border-b border-line-2 hover:border-accent pb-px"
            >
              Deloitte’s 2026 Global Technology Leadership Study
            </a>
            , based on responses from more than 660 tech leaders, the large
            majority of CIOs described their primary job as implementing AI or
            evangelizing for it across the institution, a shift the report
            frames as moving from keeping the lights on to lighting the way
            forward. That shift
            is real and, on balance, healthy. But it carries a quiet cost: when
            the mandate becomes adoption, evaluation tends to be assumed rather
            than performed.
          </p>
        </Brief>

        <H2>The question that gets skipped</H2>
        <P>
          There is a gap I keep noticing. Universities have become literate in
          two questions about AI: should we use it, and what are the rules for
          using it. Those are the questions a policy answers and a committee
          debates, and they are necessary. But they are not the question that
          determines whether a given AI system (the deployed model plus the
          workflow it is sitting inside) is doing its job. That question is
          narrower and harder: does this specific system do what we claim it
          does?
        </P>
        <P>
          It is an easy question to skip. A tool gets adopted because it is
          plausible, because a vendor demonstrated it well, because a respected
          peer institution uses it, because a pilot felt successful. None of
          those is evidence that the system measures or predicts what it claims
          to. Adoption and policy have outrun evaluation. We have built the
          scaffolding for governing AI and left out a load-bearing pillar.
        </P>

        <H2>What seven years of scoring engines taught me</H2>
        <P>
          I spent seven years at the Educational Testing Service evaluating
          AI-driven scoring systems — the engines that score essays and spoken
          responses on large-scale assessments. That work taught me something I
          have never been able to un-see, and it is the reason this gap worries
          me.
        </P>
        <P>
          When you build an automated scoring model, the obvious way to judge it
          is agreement: how often does the machine’s score match a trained human
          rater’s score? It is a clean number, and it is reassuring. It is also
          not sufficient. A model can agree with human raters at a high rate and
          still be measuring only part of what it claims to measure. It can
          learn that longer essays tend to score higher, and quietly come to
          lean on length. It can rest on vocabulary, sentence count, surface
          fluency: features that correlate with writing quality without
          constituting it. The scores look right. The agreement statistics look
          right. And underneath, the system is measuring something narrower than
          its label suggests.
        </P>
        <P>
          The discipline of measurement science exists, in large part, to catch
          exactly that. The question it trains you to ask is the one I have
          carried into every kind of data work since: what is this system
          actually measuring, and does that match what we say it measures? Not
          whether the output looks plausible, but whether the thing being
          measured is the thing we intended. An automated scoring engine that
          earns its agreement primarily through length is not measuring writing
          quality directly. It is measuring a feature that correlates with
          writing quality. The difference looks small in aggregate. It is
          decisive for{" "}
          <ArtifactLink slug="fair-for-whom">
            the writers the correlation doesn’t hold for
          </ArtifactLink>
          .
        </P>

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
          Every AI system a university adopts carries a label of its own, a
          claim about what it measures, and most of those claims are never
          written down. An early-alert model claims to identify students at
          academic risk. An advising assistant claims to surface the guidance a
          student needs. An admissions-support tool claims to predict yield, or
          fit, or success. A staff-facing assistant claims to produce work
          accurate enough to act on. Each is a statement about an intended
          outcome. And each can be wrong in the specific, quiet way an
          automated scoring engine can be wrong, tracking a surface signal
          while missing the substance, because the claim was implicit and no
          one was assigned to check it.
        </P>
        <P>
          The early-alert model is the cleanest example. Built without care, it
          can learn that the strongest predictor of risk in the historical
          record is a demographic pattern, or a single missed assignment, or
          enrollment in one difficult course. It will flag students, and the
          flags will even be partly accurate. But a model that flags students
          by proxy is not measuring academic risk; it is measuring the proxy,
          and routing the institution’s attention and resources accordingly.
          No one set out to build that system. It is what results when a tool
          is adopted on plausibility and never asked the intended-outcome
          question.
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
            EDUCAUSE’s 2026 Top 10 IT Issues
          </a>{" "}
          name the human edge of AI, and data analytics for institutional
          decision-making, among the issues that matter most.
          University technology leaders have been clear that the next phase of
          AI work is operational, moving from written policy to running
          practice. Evaluation is the part of that practice most easily
          skipped, because it is invisible when it is working and expensive to
          do well. It is also the part that decides whether everything else is
          real.
        </P>
        <P>
          Applying the discipline does not mean slowing adoption, and it does
          not mean another layer of bureaucracy. It means a small set of hard
          questions, asked consistently: before a system is trusted, and
          periodically after. Is the system measuring the intended construct,
          or a proxy for it? When it is wrong, what happens downstream, and to
          whom? Does it perform consistently across the different groups of
          people it touches, or does its accuracy concentrate where the
          training data was richest? What human decision is the system meant to
          support, and does its output improve that decision? None of these
          questions is esoteric. They are the ordinary questions of
          measurement. A university that has an institutional research office
          and an assessment culture already employs people who know how to ask
          them. Those people have not yet been pointed at the AI systems
          moving into administrative use.
        </P>

        <H2>Seeing the student whole</H2>
        <P>
          There is a deeper version of the intended-outcome question, and in a
          university it is the one that matters most. When we ask what a
          system is actually measuring, we are often asking whether it
          sees a person whole. An early-alert model that optimizes a retention
          number is not the same as one that helps an institution understand
          and support a student. The first reduces the student to the outcome
          the institution wants to protect. The second treats the number as a
          signal that points back toward a person, one with a context, a
          trajectory, and reasons. Asked seriously, the intended-outcome
          question is a check against the quiet drift toward measuring students
          as proxies for the metrics we happen to collect. A university, of
          all institutions, should want its systems to see students whole.
          That is not a sentiment. It is an evaluation standard, it is
          answerable, and it is the standard worth holding AI to.
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
          That discipline does not need to be invented. Higher education has
          spent decades building the science of measuring hard things well and
          holding the measurements accountable to what they claim. The same
          rigor that asks whether an essay score reflects writing or length can
          ask whether an early-alert flag reflects risk or a proxy for it. The
          question travels intact; it is the same question. Higher education’s
          AI moment does not need a new framework so much as it needs to turn
          an old and well-tested one toward a new set of systems, and to ask,
          of every system it adopts, the plain and demanding question: what is
          this actually measuring, and is that what we meant?
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
    arc: "organizational-design",
    hidden: false,
    body: (
      <>
        <Brief>
          <p>
            The interview take-home is a strange little genre. A stranger hands
            you their messiest data situation, gives you somewhere between two
            hours and five days, and asks you to diagnose it and design
            something. Cold — no colleagues, no institutional memory, a clock
            running. Most people do one or two over a career and never think
            about them again.
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
          A take-home is a compressed, unusually honest instrument. The clock is
          short, so the organization cannot dress the problem up. It has to hand
          you the thing it wants help with. And what an organization reaches for
          when it wants help tells you, with some precision, how it understands
          its own data. Do enough of them and the individual scenarios blur, but
          the shape underneath stops being noise. The same handful of things are
          wrong, and wrong in the same order.
        </P>
        <P>
          Say this plainly first: none of these organizations was bad at data.
          That is the part worth sitting with. Most had real systems, real
          analysts, real dashboards. They were good at data and still stuck.
          That is the whole point, and the rest of this piece is why.
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
          It is a completely reasonable request. Read closely, it is also a
          request for outputs, not a decision. Six questions, a slide deck, an
          hour, and nothing about what gets <I>done</I> differently once the
          slides go up. “Anything else you find interesting” is the tell. If a
          decision were driving the request, “interesting” would already be
          defined — interesting <I>toward what</I>. Its absence means the
          analysis has become the destination.
        </P>
        <P>
          Nearly every take-home had this shape. Build the dashboard. Write the
          trends report. Produce the plan. A surprising share did not ask for
          analysis-toward-a-decision at all. They asked for <I>compliance</I>:
          get the new state attendance codes computing correctly, get the
          course-collection feed accurate and auditable. That is necessary work.
          But compliance is the purest form of the pattern, an output the
          organization must produce with no decision attached to it at all. When
          most of what a data function is handed is outputs and filings, it
          becomes a service desk. And a service desk, however fast, however
          good, never gets to the decision.
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
          That task is not hard because attendance is conceptually difficult. It
          is hard because the concept “attendance” is defined in seven places,
          with no single place to change it. This is the fault line under half
          the take-homes: the organization has no canonical definition of its
          own core measures, so every measure exists in several slightly
          different versions, and any change, or any disagreement about a
          number, becomes an archaeology project. An organization in that state
          is not one tool away from fixed. It is one decision away — the
          decision that each measure means one thing, computed in one place.
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
          The difference is not cosmetic. An organization that asks for “a
          dashboard” and an organization that asks for “the Monday-morning
          surface the enrollment lead decides from” will get two different
          objects. The first is a display. The second is a decision surface,
          built backward from a decision, an owner, and a cadence. Both have
          charts on them. Only the second changes what happens on Monday. Most
          briefs ask for the first and hope for the second.
        </P>

        <Figure
          src="/library/figures/dashboard-vs-decision-surface.svg"
          alt="Two enrollment objects side by side. The left object is a generic dashboard with charts and an unspecified audience. The right object is a decision surface labeled with the owner, the recurring call, and the cadence."
          caption="Same enrollment data, rendered two ways. The left object is built for an audience; the owner and the call are unspecified. The right object is built backward from a recurring call — where this week’s outreach hours go — with the owner, the cadence, and the decision named on the surface itself."
        />

        <H2>The organization hires a person to be the system it never built</H2>
        <P>
          Several take-homes asked for leadership-grade systems thinking: a
          first-ninety-days plan, a risk-and-change-management plan for
          replacing core systems across several regions at once, a strategy for
          collecting and safeguarding sensitive personal data. Anticipate
          resistance. Build buy-in. See around corners.
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
          A person is not a system. A person takes vacation, gets pulled into a
          crisis, and eventually leaves. When they go, the systems thinking
          walks out with them. The take-home that asks for a brilliant
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
          Read together, more than a dozen take-homes point at one thing, and it
          is not a skills gap. These organizations had analysts, tools, and
          dashboards. What they did not have was the layer between the analysis
          and the decision: a canonical definition of each measure, a surface
          built backward from a specific recurring call, a distribution system
          that speaks to every audience without redoing the work, and an
          architecture that outlives the person who built it.
        </P>
        <P>
          That layer has a name. It is the decision system. And the take-home is
          an honest instrument because it catches an organization in the act of
          reaching for more analysis, under real pressure and in good faith,
          when the thing missing is the system that connects analysis to a
          decision.
        </P>

        <H2>The reframe</H2>
        <P>
          A decade of take-homes taught me one habit, and it is the one I would
          hand to anyone who commissions this kind of work. When an organization
          gives you a data problem, the first job is not to answer it. It is to
          find the decision underneath, the one the brief did not name, and
          answer <I>that</I>. The slides the principal asked for take an hour.
          The question of which students get which support this term, who owns
          that call, and from what surface they make it — that is the work, and
          the brief never mentioned it.
        </P>
        <P>
          Do that a dozen times and something shifts in how you see. You stop
          seeing data problems. You start seeing decision systems with one part
          missing, and often you can name the missing part inside the first
          honest conversation. That is the whole of it. Most organizations do not have a data
          problem. They have a decision-system problem, and a take-home is a
          short, honest way to surface one. <I>From fragmented to
          decision-ready</I> is the distance between the brief they wrote and the
          brief they meant.
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
          Governance councils default to architecture, and they have
          well-developed frames to draw on.{" "}
          <a
            href="https://dama.org/learning-resources/dama-data-management-body-of-knowledge-dmbok/"
            target="_blank"
            rel="noopener"
            className="text-accent hover:text-accent-2 no-underline border-b border-line-2 hover:border-accent pb-px"
          >
            DAMA’s Data Management Body of Knowledge
          </a>{" "}
          organizes the field into eleven knowledge areas with governance at
          the center: architecture, modeling, integration, quality, metadata,
          master and reference data, and the rest.{" "}
          <a
            href="https://www.educause.edu/showcase-series/2025/the-data-empowered-institution"
            target="_blank"
            rel="noopener"
            className="text-accent hover:text-accent-2 no-underline border-b border-line-2 hover:border-accent pb-px"
          >
            EDUCAUSE’s data-empowered-institution model
          </a>{" "}
          distills the higher-education version to five components — data
          quality, integration, governance, management, and literacy. Both frames
          are correct about what to build. Both are necessary. Both are
          also insufficient. The actual operational work that makes
          governance hold (getting the registrar, financial aid,
          institutional research, and the deans into the same room to
          decide which version of “persistence” gets used where, and why
          each version exists) is slow, unglamorous, and often unwritten.
          Most councils never do it. The framework looks complete. The
          numbers still do not agree.
        </P>

        <H2>Three definitions, one number, eight recalculations</H2>

        <P>
          At a K–8 charter network operating across multiple campuses,
          student persistence was formally defined at least three different
          ways at the same time. From day one of the school year to the
          last day, for program-completion reporting. From one annual state
          census day to the next year’s census day, for state
          accountability. From the first day of school to that same year’s
          census date, for early-year persistence reporting. Those
          translations fed into still more obligations (S&amp;P bond-rating
          reporting, principal incentive calculations, enrollment
          forecasting, federal accountability), each of which required a
          particular version. None of the definitions could be discarded;
          each existed because a real obligation required exactly that
          version. In one year alone, the same persistence number was
          independently recalculated eight or more times across the
          network’s reports: every recalculation correct under its own
          definition, none of them agreeing with the others. And yet the
          institution still had to be able to talk about persistence
          without the conversation fragmenting into a definitional argument
          every time it came up.
        </P>

        <P>
          The same gap now carries a second cost, and it arrives as
          consumption rather than confusion. When an analyst recalculated
          persistence eight ways, the institution was spending labor it had
          already paid for in salary. When an agent does that work, each
          version it computes is a metered call against a model. Ask an agent
          for the persistence rate against ungoverned definitions and it has
          no basis to pick one; it can compute every plausible version, or
          recompute the same one on every request, because nothing in the
          data told it which definition the question meant. The stuck meeting
          was the human-scale symptom of missing definitional reconciliation.
          Metered recomputation is the machine-scale symptom of the same
          missing thing. A governed number that names which definition feeds
          which obligation does not just end the disagreement; it keeps the
          agent from paying to generate versions no one asked for. The
          semantic layer was always a correctness control. Pointed at an
          agent that runs at machine cadence and bills per call, it becomes
          a consumption control too, and the spend, like the disagreement,
          traces back to whether the words were settled first.
        </P>

        <P>
          The work that closed the gap was not a framework. It was
          definitional reconciliation. The team mapped every reporting
          obligation to its required definition. Each definition was named
          explicitly. The relationships among them were established: how
          one translated to another, which report drew which number from
          where, what shared baseline assumptions sat underneath. Then a
          small set of trusted, governed numbers fed every obligation with
          the correct version, so that one set of dashboards could serve
          all of them without any of them being wrong. With that
          definitional reconciliation as the foundation, data completeness
          rose from 60 percent to 90 percent, principal dashboard adoption
          reached 70 percent, and reporting lag dropped by 40 percent. The
          framework looked the same after that work as it had before. The
          numbers themselves did not become identical; the framework still
          required several different ones, for several different
          obligations. What changed was that the words underneath each one
          started meaning the same thing in the same place, and the
          disagreements stopped.
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
          What holds that work together, in modern data-stack terms, is a
          semantic layer above the raw data tables: explicit canonical
          definitions for each construct, maintained as the underlying
          instruments evolve, with the discipline of crosswalks. The
          crosswalks document how a question asked in one survey version
          maps to the same construct asked slightly differently in the
          next, with documented limits of comparability and documented gaps
          where comparison is not warranted. In practice the semantic
          layer might live as a separate analytics schema sitting above raw
          tables, reachable from dashboards through whatever read interface
          fits the stack (PySpark or otherwise), and the field-mapping
          work of bringing parallel collection platforms together (for
          example two separate survey-collection environments feeding the
          same warehouse) is itself a definitional discipline before it is
          an engineering one. The framework is not the answer. The
          semantic layer, the crosswalks, and the discipline of owning
          every definitional change are what hold the reporting foundation
          honest as the underlying questions keep evolving.
        </P>

        <H2>Granularity is its own governance problem</H2>

        <P>
          Granularity is its own governance problem, and aggregation is
          where many institutions quietly compromise it. At the same K–8
          network, daily attendance was a single data stream with at least
          three different operational lives. A single absence on a given
          day triggered an immediate workflow (outreach, follow-up,
          resolution), owned by an operations coordinator. Three
          consecutive days of absence triggered a different workflow,
          owned by a teacher or student-support counselor. Chronic
          absenteeism (eighteen or more days in a year, or more than ten
          percent of school days as a running rate) triggered a third
          workflow, owned by the principal. The same data, three
          aggregations, three views, three sets of decision rights, three
          stakeholders. Governance at the granularity layer was not
          deciding whether to compute these numbers. It was deciding which
          view triggered which workflow, who owned each decision, and what
          the legitimate translation among them was, knowing that a daily
          count cannot be disaggregated from a chronic-absenteeism rate
          without losing what it measured.
        </P>

        <H2>Architecture is governance</H2>

        <P>
          Architecture is governance too. When a student-information
          system is replaced, or a behavioral-health electronic record is
          migrated to a new platform, the definitional question is not the
          migration. It is whether what the new system records is the same
          thing the old one recorded. Field mappings have to be made
          explicit; new fields added where the schema changed; legacy
          fields retired only after every use case is accounted for;
          data-entry personnel trained on the new system’s expectations
          for completeness, accuracy, and timeliness. None of that is
          technical work. It is definitional work conducted at the
          architectural layer — the layer{" "}
          <InternalLink slug="the-contracts-between-systems">
            the contract between systems
          </InternalLink>{" "}
          has to govern.
        </P>

        <H2>Stewardship is what makes it stick</H2>

        <P>
          Quality is not a one-time achievement. It is a continuous
          practice owned by the people closest to the data. The principal
          dashboard adoption rate of 70 percent at the K–8 network was not
          just a usage statistic. It was evidence of distributed
          stewardship. The principals were not merely consumers of their
          numbers; they were the ones who noticed anomalies, raised
          corrections, pushed back on definitions that did not serve their
          schools, and held the institution accountable to its own
          standards. A central data office that owns quality alone is
          fragile. A network of stewards who own their own data, with
          shared definitions they help refresh, is durable. This is the
          model that survives leadership turnover, budget cycles, and
          reorganization.
        </P>

        <P>
          Stewardship of that kind requires operational discipline at the
          configuration and training layer, because the biggest risk in
          any compliance or reporting process is rarely one dramatic
          mistake. It is drift. If a gradebook is configured one way at
          one school and a different way at another, GPA calculations
          diverge before any dashboard sees them. The same instance has to
          be replicated across sites (same scales, same formulae, same
          business rules) with a checking cadence and alerts in place to
          catch unintended drift or misconfiguration before errors
          propagate. Definitional work also has to reach the personnel who
          actually enter the data. Whether an in-house suspension is coded
          as “present” or “absent” in the student-information system is a
          definitional decision data-entry personnel make every day. If
          they have not been trained on which version the institution is
          using, no framework above them can compensate. Quality is held
          together one configuration, one alert, and one training
          conversation at a time.
        </P>

        <H2>Why universities need this most</H2>

        <P>
          Universities are structurally decentralized in ways most
          organizations are not. School autonomy, faculty governance, and
          distributed authority by design are how the institution is
          meant to work. Governance imposed from the center has a poor track record in
          higher education because the autonomy is rightly defended.
          Governance embedded through definitions has a much better one. A
          definition agreed across the registrar, financial aid,
          institutional research, and the relevant deans is much harder to
          walk back, because each domain steward owns it. A policy written
          by the governance council, however thorough, can be politely
          ignored by a department running its own numbers. The framework’s
          real authority is not the document. It is the working set of
          shared definitions that domain leaders maintain together.
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
            Universities, school networks, foundations, and
            behavioral-health agencies have been buying integration for a
            long time. Warehouses get built. Pipes get plumbed. Connectors
            land. The bytes move from the system that wrote them to the
            system that reads them. And then, very often, the leader
            looking for institutional intelligence (a 360 view for the
            CEO, role-specific intelligence for a program officer or a
            principal or a clinician or a dean, a number a District
            Education Officer can act on this week) discovers that the
            integration ran and the institution still cannot decide.
          </p>
          <p>
            That is the gap I want to name. Integration is two questions
            stacked on top of each other, and institutions have been
            treating them as one. The first is engineering: do the bytes
            move from where they were written to where they will be read,
            in the right shape, on a defensible cadence, without breaking?
            The second is governance: when the bytes arrive, can anyone act
            on them? Who is allowed to read them, who is allowed to write
            them, on what cadence, under what consent envelope, with what
            authority, with what reversibility, with what audit trail if
            they are wrong? The first question has good answers in every
            era’s stack. The second has answered itself in almost no
            institution I have worked inside, in any era.
          </p>
          <p>
            Those second-question elements together are what I will call
            the governance contract: the explicit, named understanding
            that turns integrated bytes into something a stakeholder can
            act on with authority — an operational agreement the
            institution writes for itself and can enforce internally, not
            a legal document. This essay is about that contract, and
            about what it has looked like across three eras of
            integration: legacy, modern, and the agentic era now
            arriving. The engineering changes. The contract has to change
            with it. The governance gap, in most institutions, does not.
            I have named this same gap, in a field note, a{" "}
            <InternalLink slug="blown-assignment">blown assignment</InternalLink>
            : the dashboard runs and nobody wrote the contract that says
            who acts on the number, with what authority, on what cadence.
          </p>
        </Brief>

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
          The harder question is who can vouch for the number when the
          principal calls and asks why their applicant count moved by twelve
          in a week. Someone has to know which of the source systems was
          reconciled when, which sheet version held the most recent
          definition of “applicant” versus “enrolled,” which call-center
          status code rolled up to which funnel stage, and what changed in
          the overnight refresh. In the legacy era that someone is a
          steward. The contracts were not absent: they were everywhere, in
          vendor documentation, in file format conventions, in batch
          cadences, in the append-versus-delete semantics buried in
          scheduled jobs, in the implicit understanding that “an applicant
          is who SchoolMint says they are unless HubSpot has them flagged
          for follow-up.” They simply lived in tacit institutional
          knowledge, held in the head of the steward who could vouch for a
          number when a stakeholder was about to act on it. That is not a
          failure of engineering. It is what legacy-era integration
          governance was. When the steward left, the integration still ran
          and the number stopped being actionable, because the contract that
          connected the integration to the decision had walked out the door.
        </P>

        <P>
          Move the same problem into a public-sector frame and the fragility
          shows differently. An Indian state runs four parallel state
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
          system tells them something different in a different language
          about overlapping populations on incompatible cycles. The
          contracts between these four state systems were never written.
          There is no single steward who holds them. The integration runs.
          The decision interface does not exist.
        </P>

        <P>
          The legacy-era test was the steward’s test: can the steward vouch
          for the number a stakeholder is about to act on, because the
          implicit contracts held? In K–8 networks the answer was sometimes
          yes, when one institutional research lead or data manager held the
          full picture. In multi-ministry state systems the answer was
          rarely yes, because no single steward held the contracts across
          four systems owned by four different bodies. Higher education’s
          legacy era looked more like the school-network case at much larger
          scale: Banner sitting on top of a legacy database, PeopleSoft
          Campus Solutions feeding several downstream warehouses, multiple
          legacy financial systems feeding the budget office on separate
          cycles. The contracts were implicit, lived in the institutional
          research team, and were held in the head of a senior IR analyst
          whose vouching let the Provost and the CFO act on a number. The
          decision interface was a person. That worked, in the institutions
          where it worked, only as long as the person stayed and the
          questions stayed within their working memory.
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
          What changes less than institutions hope is the governance layer
          on top of the artifact. A youth-mental-health foundation, working
          with a Snowflake warehouse a prior contractor had stood up at the
          dev/prod schema layer but never finished integrating data into,
          had Azure and Qualtrics running as two
          parallel data-collection platforms, with survey data accumulating
          across four to six instrument versions of the same construct over
          multiple years and external standardized survey instruments and
          public datasets pulled in for context. The activation work was
          technical — Fivetran connectors, DevOps cleanup, and Snowflake
          schema design that reconciled the two collection platforms and
          the instrument versions into a unified semantic layer, with named
          definitions for what “engaged participant” meant in the canonical
          schema and how each instrument version mapped into it. At the end
          of that work, the artifact existed and the integration ran on a
          defensible cadence. That is the engineering layer.
        </P>

        <P>
          What turned that work into institutional intelligence was not the
          schema design. It was the council, however lightweight, that sat
          on top of it. Who is allowed to ship a change to the “engaged
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
          The architecture work made the governance question visible in a
          way the engineering work could not answer. When a clinician at a
          partner clinic opens the chart and the integrated
          population-health view shows the patient has had three no-shows
          in sixty days, what is the contract that says the clinician is
          allowed to act on that number? At what cadence does the no-show
          count have to be fresh enough to support an outreach call without
          first re-checking the source system? When the patient’s status
          updates at the partner clinic, how long until the central view
          reflects it, and what action is the clinician expected to take
          in the lag window? HL7 carries the message. The schema defines
          the fields. The governance contract (written, agreed, enforced
          across the partner clinics and the central agency) is what
          tells the clinician whether the number on their screen is a
          decision interface or only a description.
        </P>

        <P>
          A measurement-based-care pilot run through a patient-facing
          smartphone app, built into the same behavioral-health setting,
          made the freshness-contract question concrete at clinical
          cadence. A patient opens the app and completes a brief symptom
          inventory in the morning; the result lands on the clinician’s
          dashboard before the day’s appointments, and the clinician
          adjusts treatment planning based on the symptom trajectory. The
          dashboard feeds the warehouse, which in turn feeds adherence and
          engagement analytics. The pilot ran with thirty-plus patients
          across two waves, produced a forty percent engagement lift after
          reminder automation, surfaced earlier clinician response, and
          began to show predictive patterns in adherence and symptom
          improvement. There is a human clinician acting on integrated
          data at a faster cadence than weekly review can sustain, and the
          freshness contract is already what holds that loop together,
          even with no agent in the cycle. If the morning symptom score
          reaches the clinician three days late, the treatment planning at
          the noon appointment is being done on a stale number. The
          contract that has to be specified is not “the data is
          integrated.” It is “the cadence at which the patient’s status
          stays fresh enough for the clinician to adjust treatment
          planning, and what happens when it slips below that threshold.”
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
          Higher education is standing in this same gap at scale right
          now. Most institutions are standing up (or have stood up) a
          warehouse, a semantic layer, some dbt, and some lineage, and the
          integration engineering is largely being done. What is missing
          is the council that owns the decision interface on top of the
          artifact, and so the Provost still cannot get a 360 view even
          after the CIO has built the warehouse. The data governance
          committee, where one exists, often meets quarterly to debate
          naming conventions. The decision interface is unowned.
        </P>

        <H2>The agentic era: provenance, consent, reversibility</H2>

        <P>
          The agentic era changes what the contract has to specify and
          raises what the stakes are when it does not exist. The
          freshness-contract pattern that was already central to
          modern-era clinical loops becomes more demanding when an agent
          enters the cycle, because the agent acts at machine cadence and
          the human stakeholder still has to stand behind the action. The
          earliest agentic example I have worked on is a reporting
          prototype where Snowflake Cortex reads
          from governed Snowflake schemas, Streamlit fronts a Python
          pattern that reads against the warehouse, and Gemini is used at
          a bounded scope to verify significance-test results and the
          interpretation of those tests before a human program officer
          acts on them. Even at that bounded scope (LLM-inferred
          verification of a statistical claim a human is about to act on)
          the provenance question already arrives. Was this
          confidence-interval check produced by a human, by a
          deterministic test, or by an LLM that may have hallucinated it?
          Once agentic deployments scale beyond verification into drafting
          and writing, which is the direction reporting pipelines are
          heading, the contract has to extend to provenance categories the
          data-integration era did not have to name. Was this paragraph
          human-authored, deterministic-pipeline-generated, or
          LLM-inferred? On the warehouse side, was this record written by
          a human program officer, by the nightly ingestion job, or by the
          agent acting on the program officer’s behalf? Provenance is now
          part of the data, not metadata about it. A program officer
          reading the impact report has to know which sentences were
          synthesized and which were sourced, because the question “can I
          stand behind this when a funder asks” depends on the answer.
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
          Reversibility envelopes are the third extension. When a human
          writes a wrong number to a record, the institution can undo it
          through a defined process and a known reviewer. When an LLM
          writes a wrong number at machine cadence, the institution may
          have minutes, not days, before downstream stakeholders are
          already acting on the changed record. The reversibility contract
          has to specify the window within which a roll-back is possible,
          the conditions under which it is automatic versus reviewed, and
          the downstream stakeholders who have to be notified that the
          records they were acting on may have just moved. The contract is
          no longer “did the upstream system honor the schema it
          promised.” It is “if the machine writes something wrong, can the
          institution take it back before a decision has been triggered on
          it.”
        </P>

        <P>
          Consumption is the fourth extension, and the one institutions
          notice last because it arrives as an invoice rather than an
          incident. When a human runs a query, the cost is a salary the
          institution has already paid. When an agent runs a query, the
          institution pays per call, and an agent that reads across six
          systems to answer one question can run that question hundreds of
          times a day without anyone having decided it should. The contract
          that governed who is allowed to write a record now has to govern
          what an agent is allowed to spend to produce one: which workloads
          may call a premium model and which are routed to a cheaper one,
          and how the consumption is attributed back to the program or
          department whose workflow generated it, so the spend has an owner
          who can be asked about it. An institution that writes the read,
          write, consent, provenance, and reversibility contracts and skips
          the consumption contract discovers the gap the way it discovers
          every other ungoverned seam: after the fact, when the bill
          arrives and no one can say which workflow produced it or whether
          it was worth producing.
        </P>

        <H2>Higher ed and the agentic era</H2>

        <P>
          Higher education is not far from this. Banner-to-Workday-Student
          transitions are landing. Financial-aid agents reading across
          multiple systems are landing. Advising assistants writing to
          advising notes are landing. AI tutors writing to gradebooks are
          landing. The institution will have the integration. It will
          have, mostly, the engineering. What it will not have, in most
          cases, is the contract layer. That gap is not unique to higher
          education: in a{" "}
          <a
            href="https://www.deloitte.com/us/en/insights/topics/emerging-technologies/ai-agents-scaling-faster.html"
            target="_blank"
            rel="noopener"
            className="text-accent hover:text-accent-2 no-underline border-b border-line-2 hover:border-accent pb-px"
          >
            2026 Deloitte survey of more than three thousand technology and
            business leaders
          </a>
          , only about one in five reported a mature governance model for
          agentic AI, while adoption ran well ahead of it. Who is allowed
          to write a gradebook entry on behalf of an AI tutor? What is the consent
          envelope under which a financial-aid agent moves a student
          between aid scenarios? When the advising assistant writes a
          recommendation into a student’s record that the advisor never
          reviewed, what is the reversibility window, and who tells the
          advisor? The architectural question is the same one the
          behavioral-health case faces. The systems differ. The contract
          questions are identical.
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
          That is what makes integration governance a layer the
          institution cannot leave to engineering or architecture in any
          era. Engineering moves the bytes. Architecture stages them.
          Governance contracts (who reads, who writes, on what cadence,
          with what consent, with what provenance, with what reversibility,
          with what consumption, with what authority to act) turn
          fragmented bytes into decision-ready institutional intelligence
          stakeholders can stand behind. Without those contracts, the integration runs and the
          data on the other side stays fragmented to anyone trying to act
          on it. With those contracts, fragmented bytes become
          decision-ready intelligence: a 360 view for the CEO,
          role-specific intelligence for program officers and principals
          and clinicians and deans and District Education Officers, and a
          decision interface that triggers action.
        </P>

        <P>
          The contracts have to be written. By someone, named, inside the
          institution. Where in the institution that role should sit is a
          question worth its own treatment, and one I have taken up
          directly elsewhere. In every era these contracts were already
          needed. In the next one they will be load-bearing.
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
          For most of my career, when people asked what I do, I’d say
          <I> data plumbing</I>. It was a useful shorthand. Everyone got
          it. The pipes, the joints, the connections between systems,
          the unglamorous infrastructure that makes everything else
          possible. Plumbers don’t get a lot of credit. But the building
          doesn’t work without them.
        </P>
        <P>Lately I’ve stopped using the word.</P>
        <P>
          Not because it was wrong. Because the word stopped meaning
          what it used to mean.
        </P>
        <P>
          When I started in this work, <I>plumbing</I> was where the
          difficulty lived. Moving data between two enterprise systems
          took months. Integration was a strategic asset. Today the
          pipes have been industrialized: Fivetran, dbt, Snowflake, the
          cloud data platforms. The difficulty is no longer engineering
          the pipe; it’s mostly paying the subscription and managing
          the configuration. The plumbing got upgraded. It’s a solved
          problem class, even if individual lines still get clogged.
        </P>
        <P>
          So if “plumbing” was what I called the hard part of the work,
          and the hard part has moved, the word doesn’t fit anymore.
        </P>

        <H2>The faucet, not the pipes</H2>
        <P>
          Imagine your house has plumbing. Pipes run through the walls.
          Water comes from a treatment plant somewhere. It reaches a
          faucet. You turn the handle. Something comes out.
        </P>
        <P>
          The work of getting pipes into the walls — that’s plumbing in
          the old sense. Most modern houses have it. It’s table stakes.
        </P>
        <P>
          The work that determines whether you can drink the
          water, cook with it, give it to a child, wash a wound — that
          work isn’t in the pipes. It’s: What’s the source. Is the
          source clean. Did anything get added or removed upstream.
          What’s the pressure at the faucet: too high and it sprays,
          too low and you can’t fill a pot. Who’s allowed to open which
          tap. What happens when the system fails. Who notices.
        </P>
        <P>
          None of that is plumbing. All of it is the actual experience
          of having water.
        </P>

        <H2>Speed was the only knob we turned</H2>
        <P>
          There’s a useful way to think about what AI changed
          in all this.
        </P>
        <P>
          For a long time, the only knob most data systems could really
          turn was speed. Faster pipes. More frequent refreshes.
          Real-time dashboards. Speed got cheap — that’s most of what
          the modern stack delivered.
        </P>
        <P>But speed isn’t the only knob. Two others have been sitting there the whole time.</P>
        <P>
          <I>Resolution</I> — how granular a picture you can carry
          through the pipe. Whether the thing arriving at the
          decision-maker is the full pattern, or a flattened score that
          stands in for it.
        </P>
        <P>
          <I>Context</I> — what surrounds the data point. The
          cross-system signals and the constraints that change what a
          number actually means.
        </P>
        <P>
          AI made all three knobs more accessible. The speed knob was
          already turned up; that’s the part most institutions invested
          in. The resolution and context knobs are still mostly at their
          default positions. That’s the gap. Not that we lack speed. It’s that we haven’t spent the other two.{" "}
          <I>
            (There is a fourth dimension worth naming separately: whether
            the construct in the pipe is still the construct
            you sampled last quarter. That one gets its own treatment
            in “The construct keeps moving.”)
          </I>
        </P>

        <H2>The Thursday afternoon</H2>
        <P>
          Consider a Thursday afternoon in a college advisor’s office. A
          junior student-athlete has skipped three classes and tripped
          the LMS risk flag. The bursar’s stack shows their aid
          disbursement is on hold for a missing verification document.
          The campus dining system hasn’t seen a swipe in forty-eight
          hours. All three systems know something. None of them are
          talking to the advisor across the desk. The plumbing ran
          perfectly. The student still slipped through the seam.
        </P>
        <P>
          When I look at what I spend my time on now, it’s almost
          entirely those kinds of moments, applied to data. Not <I>can
          we connect these two systems</I> — yes, almost always, fine.
          The questions that stay hard are: what does the field actually
          measure, whose number wins when two systems disagree, who’s
          allowed to read what, who’s allowed to change it, on what
          cadence, and when it goes wrong, who notices.
        </P>
        <P>That’s not plumbing. That’s closer to running a water authority.</P>
        <P>
          It’s worth naming the distinction directly. Most institutions
          have some form of <I>data governance</I> in place: the
          policies that decide who can access which table, how a field
          is defined in the catalog, how lineage is tracked. That work
          is real and necessary. But data governance is governance of
          the pipe. <I>Decision governance</I> is governance of the
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
          The water treatment plant, the place that decides what
          counts as drinkable water and tests every batch, is the
          construct question. Are we measuring what we say we’re
          measuring. Is the thing in the pipe still what it was when we
          sampled it last quarter.
        </P>
        <P>
          The municipal authority, who decides which neighborhoods get
          pressure, who sets the testing cadence, who’s responsible
          when the boil-water advisory goes out, is the governance
          contract. Who reads. Who writes. Cadence. Authority. This is
          the contract at the seam: the point where the architecture
          stops and a person has to act on what comes through. Most
          institutions have a contract for the pipes: vendor SLAs,
          integration agreements, data-sharing terms. Few have one for
          what happens at the faucet.
        </P>
        <P>
          The faucet itself, the moment someone turns the handle,
          is the decision. A dosage adjustment, a budget call, an
          eligibility flag, a credit limit, a clinical alert. That’s
          where the entire stack either works or doesn’t. And the
          agentic era is already installing faucets that turn themselves
          on, mix their own temperature, and pour before a human can
          taste what’s coming out of the tap.
        </P>
        <P>
          The engineers who used to be your bottleneck, the integration
          specialists — they’re more like the contractors who installed
          the pipes in the first place. Important, but not who you call
          when the water tastes wrong.
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
          That last piece is the one most institutions skip: what kind
          of decision. They build for monitoring, then ask the
          same plumbing to support intervention, and the seam fails.
          The work is matching the architecture to the decision the
          institution needs to make.
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
          If I had to describe what I do now without picking a clever
          new name for it, I’d just say it’s water authority work.
          Sourcing. Testing. Pressure. Authority. Who’s allowed to
          drink. The integration layer is solved enough to not need
          most senior people’s time. The layer that determines whether
          what comes out of the faucet is fit for purpose — that layer
          is barely staffed at most institutions, barely contracted
          for, barely measured. It’s the gap between <I>we have a data
          warehouse</I> and <I>we can make a decision.</I>
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
    number: "07",
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
          Football coaches drill the same three-word mantra every year:{" "}
          <B>Alignment. Assignment. Execute.</B>
        </P>
        <P>Know where you stand. Know what you do. Run the play.</P>
        <P>
          That’s the whole frame. It does most of what cross-functional teams
          actually need.
        </P>

        <H2>Three phases, three failure modes</H2>
        <P>
          <B>Alignment</B> is where you fit relative to everyone else. In
          football, it’s where you stand on the field. In cross-functional
          work, it’s where your function sits relative to the others. Who you
          partner with upstream. Who you hand off to downstream. Whose problem
          becomes your problem when something doesn’t move.
        </P>
        <P>
          Alignment failures look like this. The school counselor, the
          behavioral health clinic, and the family are all aware of the same
          student. None of them know who is supposed to be carrying the
          picture. The student is not missed because no one cared. They are
          missed because everyone thought they were on someone else’s coverage.
        </P>
        <P>
          <B>Assignment</B> is what you do on this specific play. In football,
          it’s the difference between blocking the inside gap and pulling left
          to lead block. Same player, two completely different jobs depending
          on the call.
        </P>
        <P>
          Assignment failures look like this. The data architecture is fine.
          Three systems flow into a dashboard. The advisor sees the dashboard.
          Then nothing happens, because nobody wrote what should happen. There
          is no contract that says{" "}
          <I>
            if the score crosses this line, who acts, with what authority, on
            what cadence.
          </I>{" "}
          The dashboard isn’t the problem. The missing assignment is.
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
          Most of the work we get pulled into looks like a data problem on the
          surface. A dashboard nobody uses. A handoff that doesn’t stick. A
          metric that lives in someone’s email instead of moving into a
          workflow. None of those are data problems. They are alignment
          problems, assignment problems, or execution problems misread as data
          problems.
        </P>
        <P>
          The fix is the play. Written down. Owned by named roles. With the
          contingencies designed in. That’s the{" "}
          <ArtifactLink slug="contract-at-the-seam">seam contract</ArtifactLink>
          . That’s the artifact the modern data stack does not ship in the box.
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
    number: "08",
    title: "Functions don’t run plays.",
    subtitle:
      "The org chart is vertical. The work is horizontal. Multiple honest structural forms can carry the play (councils, flash teams, standing squads) and none of them works without a seam contract underneath.",
    date: "2026-06-30",
    readingTime: "4 min read",
    summary:
      "The mismatch between horizontal work and vertical org charts is structural. Multiple honest forms can carry it: councils that deliberate and hand playbooks back to functions, flash teams that merge for the deliverable, standing squads drawn permanently from across functions. All rely on the same seam contract underneath. Without that contract, none of them holds.",
    cover: "/library/covers/functions-dont-run-plays.svg",
    arc: "organizational-design",
    body: (
      <>
        <Brief>
          <p>
            Most modern work is cross-functional and time-bound. Most org
            charts are functional and indefinite. The mismatch is structural.
            It does not go away when the people are smart and well-meaning.
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
          The work is horizontal: a specific deliverable, a specific clock,
          expertise drawn from several functions. The org chart is vertical:
          each function reporting up to its own executive, evaluated against
          its own scorecard, accountable to its own incentives. The mismatch
          is structural. It does not go away when the people are smart and
          well-meaning. It is the structure.
        </P>
        <P>
          So institutions patch it. The patches are familiar. A standing
          cross-functional meeting names the breakdown without fixing it. A
          matrix reporting line multiplies the bosses without changing the
          unit of work. A <I>communication issue</I> diagnosis schedules
          another meeting. The heroic senior hire is expected to span every
          layer the org chart failed to connect, then gets sighed about as a
          unicorn when one person cannot.
        </P>

        <H2>More than one honest answer</H2>
        <P>
          There is more than one honest structural answer to the mismatch,
          and the field of practice is diverse. Councils. Steering
          committees. Advisory boards. Working groups. Task forces. Tiger
          teams. Flash teams. Agile squads. Product teams. Centers of
          excellence. Each carries a different profile on permanence,
          authority, composition, and purpose. Each has a legitimate role in
          the institutional toolkit.
        </P>
        <P>Three archetypes cover most of the actual practice.</P>

        <H3>Deliberate together, execute locally</H3>
        <P>
          A cross-functional body (a council, a steering committee, a
          working group) deliberates and writes a shared playbook. The
          playbook names the definitions, the handoffs, the timing, the
          cadences, and the decisions the cross-functional work depends on.
          Each function then takes the playbook back to its own team and
          runs its portion inside its existing operating context.
          Advancement, facilities, research management, and academic affairs
          contribute to the same playbook in council, then execute their
          piece each in their own house. Widespread in universities,
          foundations, and mission-driven organizations. Can run for
          decades.
        </P>

        <H3>Merge for the deliverable</H3>
        <P>
          Flash teams (Melissa Valentine and her collaborators at Stanford
          named this pattern), tiger teams, project teams, task forces.
          Expertise is drawn from across functions and merged into a single
          team for the duration of the work. When the work is done, the
          team dissolves. Expertise returns to the function. More common in
          tech, product, and consulting.
        </P>

        <H3>Standing cross-functional composition</H3>
        <P>
          Agile squads, product teams, centers of excellence, matrix teams.
          Ongoing teams drawn permanently or semi-permanently from across
          functions. Common in software organizations and in mature
          product-led institutions.
        </P>

        <P>
          These are structurally different. They carry different rhythms,
          different authority patterns, different membership assumptions.
          Which one fits depends on the institution and the work — the
          operating rhythm, the permanence of the effort, the culture that
          already exists to receive it. What is common to all three is what{" "}
          <InternalLink slug="blown-assignment">the football piece</InternalLink>{" "}
          called a{" "}
          <ArtifactLink slug="contract-at-the-seam">seam contract</ArtifactLink>:
          who acts, on what signal, at what cadence, with what authority.{" "}
          <I>
            The container is the institution&rsquo;s choice. The contract is
            not optional.
          </I>
        </P>

        <H2>Not anti-function</H2>
        <P>
          None of this is anti-function. Functions are where deep expertise
          lives and grows. An evaluator reports into research and
          evaluation. An advisor reports into student success. A clinician
          reports into clinical operations. The function is the home of the
          role, and that does not change.
        </P>
        <P>What changes is what runs the play.</P>
        <P>
          Whichever container carries the work (a merged team, a council
          with a playbook, a standing squad) draws expertise from the
          functions for a specific deliverable and carries its own seam
          contract. It is authorized to form across functions by an
          integration seat that has the standing to make the arrangement
          stick. When the work lands, the container&rsquo;s rhythm adjusts.
          A flash team dissolves. A council closes a chapter. A squad rolls
          onto its next mission. The expertise stays home. The next play
          composes a different container.
        </P>
        <P>
          <InternalLink slug="blown-assignment">The football piece</InternalLink>{" "}
          in the library named the artifact underneath all of this: the{" "}
          <ArtifactLink slug="contract-at-the-seam">seam contract</ArtifactLink>. The{" "}
          <InternalLink slug="plumbing-got-upgraded-water-didnt">plumbing piece</InternalLink>{" "}
          described the same artifact at a different layer, between architecture and
          human.{" "}
          <InternalLink slug="the-contracts-between-systems">
            Contracts Between Systems
          </InternalLink>{" "}
          and <I>Two Bets, One Institution</I> describe it at still other
          layers. This piece is not naming a new artifact. It is naming what
          the seam contract asks of the org chart: multiple honest
          structural forms can carry it, and none of them work without it.
        </P>

        <H2>The agentic era intensifies this</H2>
        <P>
          The agentic era does not change this argument. It intensifies it.
        </P>
        <P>
          Agents can be introduced at every layer where a seam contract
          exists. The container that absorbs them (flash team, council
          playbook, standing squad) matters less than the contract they
          are joining. What matters is that the contract exists at that
          layer, with its four pieces named: who acts, on what signal, at
          what cadence, with what authority. Without a contract, an agent
          at any layer creates the same problem: decisions made without
          an owner, without a cadence, and without the standing to reverse.
        </P>
        <P>
          The consequence of introducing an agent scales with the layer. An
          agent inside a data pipeline is a technical operation; a failed
          transform is a rerun. An agent inside a clinical alert, an
          eligibility flag, or an intervention call is an institutional
          action; a failed call is a person harmed. Most institutions will
          introduce agents first at the layer whose failures are
          reversible, then work upward as the contracts at higher layers
          mature. That is not a claim about where agents belong. It is a
          claim about where they safely arrive first.
        </P>
        <P>
          The patches will not hold. The work is horizontal. The org chart
          is vertical. The mismatch only grows.
        </P>
        <P>
          The unit of work is the play. The mechanism that runs it across
          the org chart is a seam contract. Some institutions carry that
          contract in a flash team. Some in a council playbook. Some in a
          standing squad. All are honest answers. None works without the
          contract.
        </P>
        <P>That&rsquo;s the work.</P>

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
    number: "09",
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
            A program officer, a portfolio manager, and a CSR lead are
            staring at the same wall. Each can tell you how many people were
            reached, how much money went out, how many sessions were
            delivered. None can tell you, across the whole book, whether it
            worked or where the next rupee or dollar should go. The usual
            diagnosis is a reporting problem: buy a better dashboard,
            tighten the template. The real problem is a category error.
            You bought a system of record for <I>activity</I> and asked it
            to behave like a system of record for <I>outcomes</I>. This
            note is about that difference, and about the missing category,
            the evidence spine, that turns reach into a decision. It is a
            field note. It makes one structural claim.
          </p>
        </Brief>

        <H2>Reach is what falls out for free</H2>
        <P>
          Every measurement stack has a gravity, and its gravity is reach.
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
          Outcomes are not exhaust. Nobody’s operational system logs “and
          it worked” as a side effect of cutting a check. Whether a
          program moved the thing it exists to move has to be{" "}
          <I>constructed</I> — the outcome defined, placed on a scale, and
          made comparable to the next program that defines success in its
          own words. Reach is counted. Evidence is built. The reach trap
          is mistaking the first for the second, and then blaming the
          reporting when the second never shows up.
        </P>

        <H2>Why the CRM can’t save you</H2>
        <P>
          This is where most teams go looking for the fix, and where it
          fails. The instinct is familiar: we have a CRM, it holds all our
          grantee data, surely the answer is a better view on top of it.
          But a CRM is a system of record for <I>relationships and
          transactions</I> — contacts, grants, touchpoints, disbursements,
          pipeline stage. It is engineered, correctly, to answer{" "}
          <I>who did we fund, what did we do, what is the status.</I>{" "}
          That is a real and necessary job. It is just not the job of
          telling you whether any of it worked.
        </P>

        <Figure
          src="/library/figures/reach-trap-crm-vs-spine.svg"
          alt="CRM versus the evidence spine — two systems of record. A CRM holds activity and answers who, what, and status, yielding reach metrics. An evidence spine holds outcomes and answers whether it worked and where next, yielding invest, scale, and stop."
          caption="CRM versus the evidence spine — two systems of record. A CRM holds activity and answers who, what, and status, yielding reach metrics. An evidence spine holds outcomes and answers whether it worked and where next, yielding invest, scale, and stop."
        />

        <P>
          The honest version of the claim is not “CRMs are bad.” You can
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
          None of this says measurement people have ignored use.
          Utilization-focused evaluation has argued for decades that an
          evaluation nobody acts on has failed; the conviction here is
          inherited, not invented. What changes is where it lives.
          Shared-measurement frameworks reach comparability by making
          every grantee report the same indicators up front; metric
          catalogs like IRIS+ do it by prescribing a common dictionary to
          pick from. Both work when a portfolio shares one goal or one
          asset class. A grant book rarely does. Forty grantees carry
          forty theories of change, so the spine runs the other way: let
          each keep its own language, then place it on one scale
          afterward. The results-framework world already tried the
          alternative, and the OECD’s review of results-based management
          landed on a familiar pattern: the data gets collected, but it
          rarely reaches the decision. The obvious read is a culture
          problem, teams that never build the habit of looking. The deeper
          one is structural: the data was never shaped to be read as a
          decision, and the second system is what shapes it.
        </P>

        <H2>What the rubric actually is</H2>
        <P>
          The second system has two moving parts, and the first is the
          one people skip. A rubric is not a survey and it is not a KPI
          list. It is a <I>shared outcome scale</I> — an explicit, small,
          ordered set of what “good” looks like, the same scale for every
          grantee in the book. Four points, say: emerging, building,
          established, sustained. That much is intuitive. The part that
          does the real work is the second piece: a semantic layer that
          maps each grantee’s own language onto that scale.
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
          Grantee A says “kids reading at grade level.” Grantee B says
          “literacy gains held two years.” Grantee C says “fewer kids
          need remediation.” Left alone, those are three incomparable
          sentences. Run them through the semantic layer and they become
          placements on one scale — B at sustained, C at established, A
          at building. Different words in; one comparable placement out.
          Without the semantic layer, a rubric is just a fourth dialect
          nobody speaks. With it, forty theories of change finally line
          up on a single axis.
        </P>
        <P>
          That mapping is the part people imagine is automatic, and it is
          not. Funder and grantee co-author it: they agree, in advance,
          what evidence justifies each placement. The layer does not
          dissolve the judgment about whether “held two years” outranks
          “reading at grade level.” It forces that judgment to be made
          once, in the open, and then reused, instead of relitigated
          grantee by grantee every cycle.
        </P>

        <H2>What the spine actually is</H2>
        <P>
          The rubric tells you where one grantee lands. The spine is
          what makes the whole book a book. It is the shared record
          shape — the same handful of columns for every grantee, every
          cycle: the outcome tier from the rubric, the leading signal
          you are watching, the confidence you have in the evidence
          behind it. That consistency is not clerical tidiness. The
          shared columns <I>are</I> the structure. They are what a
          CRM’s per-grantee custom fields can never be. One of those
          columns earns a definition the others assume. Confidence is
          not a mood. It names how much weight the evidence behind a
          placement can bear: how strong it is, how recent, whether it
          is comparable to the grantee in the next row. Keep it vague
          and one officer’s “high” is another’s “medium.” Define it and
          the column carries actual weight.
        </P>

        <Figure
          src="/library/figures/reach-trap-spine.svg"
          alt="The evidence spine — one shared record shape for every grantee. A table with consistent columns (outcome tier, leading signal, confidence) across grantees; the shared schema is the spine, and it reads across into invest, scale, and stop."
          caption="The evidence spine — one shared record shape for every grantee. A table with consistent columns (outcome tier, leading signal, confidence) across grantees; the shared schema is the spine, and it reads across into invest, scale, and stop."
        />

        <P>
          Keep the columns identical and the book reads across in one
          glance: same columns, one axis, comparability. You can sort,
          compare, and rank forty grantees on the same terms, and the
          portfolio question — where does the next dollar go — becomes
          answerable instead of rhetorical. Fragmented in, decision-ready
          out. Drop the columns, let each grantee report in its own
          shape, and you are back to forty PDFs that agree on nothing.
          The spine is unglamorous by design. It is a schema, not a
          dashboard. But it is the actual decision architecture for MEL,
          and it is the thing the reach trap leaves out.
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
          You do not start by ripping out the CRM. You start by
          admitting it is a system of record for activity and will never
          be more than that, and then you build the small second system
          beside it. Name the four-point scale before you argue about
          metrics. Write down the semantic layer — the mapping from each
          grantee’s language to the scale — because that is the part
          everyone wants to skip and the part that makes the rest work.
          Fix the three or four columns that will be identical for every
          grantee, forever. That is a spine. It is less software than
          people fear and more discipline than they hope. But it is the
          difference between a stack that hands you reach and a decision
          system that hands you decisions.
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
    arc: "organizational-design",
    body: (
      <>
        <Brief>
          <p>
            Most rule books in any organization read like a description of
            normal behavior. Show up on time. Document the decision. Get the
            approval. Follow the policy. They are the rules that explain how
            to do the thing. They are necessary. They are also not the rules
            that decide whether the institution holds together when the
            pressure rises.
          </p>
          <p>
            The interesting rules are the others. The ones that look weird
            at first reading. The ones a new player has to have explained
            twice. The ones that seem to interrupt the flow of the game
            rather than describe it. Those are the rules doing the
            structural work, and once you start noticing them, you cannot
            stop noticing the parallel problem inside every institution.
          </p>
        </Brief>

        <P>
          The most important systems are not designed to optimize
          performance. They are designed to prevent predictable failure.
          Most rules in those systems describe the normal case. The handful
          that do not (that interrupt, that constrain, that pre-resolve a
          specific exploit before it can happen) are the rules carrying the
          system&rsquo;s actual integrity. Sports rules are the cleanest
          place to see this discipline because the system is visible, the
          failure modes have been observed at scale, and the rule book has
          had decades of pressure-testing under the most adversarial
          conditions any rule book ever faces.
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
          That move (pre-resolving an exploit before it can be exploited)
          is the most underused discipline in institutional design. Every
          governance document I have read at scale describes what people
          should do. Almost none of them name the specific exploits the
          structure would otherwise reward, and pre-resolve them. The
          Infield Fly Rule is what a rule book looks like when someone has
          actually thought about what the rules are for: not to describe
          the obvious, but to close the loopholes the obvious would
          otherwise create.
        </P>

        <H2>The Free Guard Zone</H2>
        <P>
          Curling. For the first four rocks of every end, no stone in the
          free guard zone (the area between the hog line and the house,
          outside the rings) can be removed from play. The rule was added
          in the 1990s after every team converged on the same strategy:
          take out, take out, take out. The dominant strategy worked. It
          also collapsed the game into low-scoring sterility. The rule was
          added not to tell players what to do, but to prevent rational
          optimization from destroying the thing the game was built to be.
        </P>
        <P>
          This is{" "}
          <a
            href="https://en.wikipedia.org/wiki/Goodhart%27s_law"
            target="_blank"
            rel="noopener noreferrer"
          >
            Goodhart&rsquo;s Law
          </a>{" "}
          as architecture rather than warning. (Originally Charles
          Goodhart&rsquo;s 1975 observation that statistical regularities
          collapse once they are targeted for policy, popularly
          reformulated by Marilyn Strathern in 1997 as{" "}
          <I>
            &ldquo;when a measure becomes a target, it ceases to be a good
            measure.&rdquo;
          </I>
          ) Every metric eventually gets gamed. Every KPI eventually
          rewards the behavior that hits the number rather than the
          behavior the number was meant to encourage. Every
          growth-at-all-costs strategy eventually hollows the product. The
          institutional discipline is not to ask whether the metric will be
          gamed; it will. The discipline is to write the rule that prevents
          the gaming from destroying the thing the metric was meant to
          measure. A funder whose impact metric inadvertently rewards
          risk-averse program design needs the Free Guard Zone equivalent:
          the rule that prevents the rational pursuit of the metric from
          killing what the metric was meant to encourage. Almost no funder
          has that rule written down.
        </P>
        <P>
          Measurement scientists have a name for the pattern the Free Guard
          Zone was written to prevent: <B>construct-irrelevant strategies</B>{" "}
          &mdash; responses that hit the score without demonstrating the
          thing the score was built to measure. Samuel Messick built the
          modern validity framework around exactly this failure mode. The
          AI benchmark community has been rediscovering it under other
          names &mdash; reward hacking, specification gaming, Goodhart
          taxonomy &mdash; as models learn to score high on evaluations
          without learning the underlying skill. It is the same problem in
          a different domain, and it is the reason the weird rule has to be
          written before the metric is deployed.
        </P>

        <H2>Soccer Offside</H2>
        <P>
          A player is offside if they are in the opposing team&rsquo;s half
          AND closer to the opposing goal line than both the ball and the
          second-to-last defender when their teammate plays the ball.
          Generations of new fans have asked: why is this a rule? The
          answer is that without it, the optimal strategy is to camp a
          fast striker near the opposing goal and play long balls over the
          top. The midfield empties. The game dissolves into two penalty
          boxes and a void in between. The structure of the game
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
          This is the rule the AB audience lives. Foundations enforce
          reporting requirements that consume the program officer&rsquo;s
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
          that names that discretion explicitly, and gives the operator
          the formal authority to exercise it without breaking the rules,
          is one of the most useful rules an institution can have, and
          almost no institution has it.
        </P>

        <H2>The Baton Exchange Zone</H2>
        <P>
          Track and field, the 4&times;100 relay. Runners must complete the
          baton handoff within a 20-meter exchange zone. The fastest team
          does not win. The team with the cleanest handoffs wins. The
          interface (the place where one runner meets the next) is where
          the race is decided. A team with four world-record-holding
          individual sprinters and a sloppy handoff loses to a team with
          four ordinary runners and a clean one. The rule structures the
          interface and makes the interface itself the locus of
          accountability.
        </P>
        <P>
          Every organizational failure I have watched up close has
          happened at an interface. The handoff between admissions and
          financial aid. The handoff between the clinician and the
          population-health analyst. The handoff between the program team
          and the impact-reporting team. The handoff between the data
          engineer and the governance committee. The work inside each
          function is rarely the problem. The handoff between them almost
          always is. The Baton Exchange Zone is the rule that says: name
          the interface, structure the interface, make the interface
          itself the place where accountability lives. Most institutional
          process maps show the boxes. They do not show the handoffs. The
          rule book that shows the handoffs (and gives the handoff its own
          structured zone with its own rules) is the one that wins races.
        </P>

        <H2>Five structural lessons</H2>
        <P>
          Five rules. Five structural lessons. None of them describes
          normal play.
        </P>
        <P>
          The rules that matter most in any decision system are not the
          ones that tell people what to do. They are the ones that prevent
          optimization from destroying the thing the system was built to
          preserve. The Infield Fly Rule pre-resolves an exploit. The Free
          Guard Zone prevents convergent over-optimization. Offside
          preserves distributed structure. The Advantage Rule defends the
          mission against process. The Baton Exchange Zone structures the
          interface.
        </P>

        <H2>Behavioral rules — the clarification</H2>
        <P>
          A clarification before that lands as the wrong claim. Behavioral
          rules (the ones that tell people what to do inside their
          function) are not optional. A relay team that cannot run does
          not win because the handoff was clean. A funder whose program
          officers cannot write coherent goals does not get rescued by a
          Free Guard Zone equivalent. Behavioral rules are the baseline;
          they have to be in place and executed for the structural rules
          to matter at all. What this essay names is the layer above that
          baseline: the rules that govern what happens between functions,
          the rules that pre-resolve the exploits behavioral compliance
          alone cannot prevent. Most institutions have the behavioral
          layer; what they typically lack is the structural layer. The
          argument is for both, with attention to the half that is usually
          missing.
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
          When a leader asks me what they should be writing down that
          their predecessors did not, this is the answer. Not more
          policies describing the normal case. The handful of
          weird-looking rules that pre-resolve the exploits, prevent the
          optimization collapse, preserve the distributed structure,
          protect the mission from the process, and make the interfaces
          themselves accountable. Those rules will not look like a
          strategy document. They will look like a baseball umpire calling
          a batter out for a ball that was never caught. That is what
          working governance looks like up close.
        </P>
        <P>
          There is a corollary worth naming. G. K. Chesterton put it as a
          heuristic a century ago: never remove a fence until you know why
          it was put there. The rule that looks weird is probably
          load-bearing. If you cannot say what predictable failure it was
          written to prevent, the safest assumption is that someone before
          you could — and that removing it will reveal, at cost, the
          exploit the rule was there to close.
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
            Somewhere right now, a flag is firing. A ninth grader has crossed
            a threshold and the system has labeled her <I>at risk</I> — off
            track for graduation, the early-warning indicator lit red on a
            screen. The data is clean enough. The model looks accurate. The
            dashboard is beautiful.
          </p>
          <p>
            And nothing happens.
          </p>
          <p>
            Not because anyone is negligent. Because the flag was the easy
            part. The flag traveled all the way from a student information
            system to a screen, and then it died there, in the gap between{" "}
            <I>knowing</I> and <I>acting</I> — the gap no one was assigned
            to close. The counselor assumed the teacher saw it. The teacher
            assumed the intervention team owned it. The intervention team
            never received it at a resolution they could act on. The signal
            was real. The system around it was missing.
          </p>
          <p>
            This is the central claim of the Analytic Bytes library, and it
            is worth stating plainly:{" "}
            <B>most “data problems” are decision-system problems.</B> When
            numbers disagree, when insights don’t change anything, when a
            new dashboard lands and the meeting runs the same way it did
            before — the instinct is to reach for more analysis. More
            analysis is rarely what’s missing. What’s missing is the
            architecture between the analysis and the act.
          </p>
        </Brief>

        <P>
          A dashboard is an artifact. A decision system is that artifact in
          motion — a canonical definition for every measure, surfaces built
          backward from the specific recurring calls people make, and a
          distribution that outlives the individuals who built it. The flag
          is not the system. The system is everything that has to be true
          for the flag to reach someone authorized to act on it, measuring
          something real, in time to matter.
        </P>

        <P>
          We’ll follow that flag (the at-risk / early-warning indicator)
          through the whole framework. It’s worth noticing early that the{" "}
          <I>pattern</I> travels. The same decision-system shape shows up
          as a behavioral-health team’s relapse-risk score, a hospital’s
          deterioration alert, a funder’s off-track grantee. These aren’t
          structurally identical. The stakes, the data behind them, the
          right to intervene, and the cost of being wrong all differ. But
          the shape recurs, and that recurrence is what makes a single
          framework worth writing.
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
          The fix is structural, not a directive. You build a{" "}
          <B>
            <ArtifactLink slug="decision-system-reference-architecture">semantic keystone</ArtifactLink>
          </B>: a single layer, governed in code,
          where every metric is defined once. <I>On-track</I> is computed
          in one place, and every surface (
          <InternalLink slug="three-surfaces-one-keystone">
            the teacher’s console, the school’s program report, the
            district’s executive view
          </InternalLink>
          , and every AI feature downstream) reads from that one
          computation. There’s no <I>sanctioned</I> second definition for
          the number to drift toward. The slow, unglamorous work that
          makes this real is <B>definitional reconciliation</B>: getting
          the registrar and the dean, or the program officer and the
          grantee, to commit to the same canonical meaning before anyone
          builds a chart on top of it. It’s tedious. It’s also the
          foundation.
        </P>

        <P>
          For our ninth grader, this is the difference between <I>at
          risk</I> meaning the same thing in her building as in the one
          across town. But notice the limit of what reconciliation buys
          you: it makes the number <I>consistent</I>, not <I>correct</I>.
          A definition everyone agrees on can still point at the wrong
          thing. Hold that thought — it’s the third layer.
        </P>

        <H2>Authority: who acts, and when</H2>

        <P>
          Now the flag means one thing. Who moves?
        </P>

        <P>
          One of the most common failures in any early-warning system is
          not a bad model — it’s a{" "}
          <B>
            <InternalLink slug="blown-assignment">blown assignment</InternalLink>
          </B>
          . The signal fires and no one is named to receive it. This is a
          seam problem: the failure lives in the handoff between
          specialists, not inside any one of them. The cleanest sprinter
          on the team loses the race if the baton hits the ground in the
          exchange zone.
        </P>

        <P>
          The instrument that fixes it is a{" "}
          <B>
            <ArtifactLink slug="contract-at-the-seam">seam contract</ArtifactLink>
          </B>
          : an explicit, written understanding (operational, not legal) of{" "}
          <I>
            who acts on a signal, with what authority, on what cadence,
            and at what resolution.
          </I>{" "}
          It turns integrated bytes into decision-ready intelligence by
          naming an owner for the recurring call. And because the call is
          recurring, the surfaces serve it directly: the teacher gets a
          progress-monitoring console tuned to <I>this week’s</I> action,
          the principal gets a program report, the superintendent gets the
          portfolio view.{" "}
          <InternalLink slug="three-surfaces-one-keystone">
            Three surfaces, one keystone underneath.
          </InternalLink>
        </P>

        <P>
          For any of this to stick, the function needs traction, and
          traction is a property of the <I>seat</I>. It belongs with the
          seat that holds legitimate cross-functional authority (often
          the COO, sometimes a Chief Impact Officer or equivalent
          integrator, in a smaller shop the CEO), but never{" "}
          <InternalLink slug="where-should-data-sit">
            inside a single technical or financial function by default
          </InternalLink>
          , which will bend the data toward its own incentives:
          optimized for uptime, or for cost, but not for the
          cross-functional meaning a dean or a clinical director needs.
          For our ninth grader, the seam contract is the difference
          between a flag that lands on a named counselor by Tuesday and a
          flag that everyone could see and no one owned.
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
          That recursion isn’t a footnote; it’s the reason the three
          layers can’t be run independently. A decision system isn’t a
          pipeline that ends at an action. The action becomes part of the
          data that trains the next signal. Which means a definition that
          drifts in the meaning layer doesn’t just produce one bad
          number — it teaches the next model to be wrong on purpose,
          indefinitely. What that does to validity is the next section.
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
          The cost isn’t only that this is unfair, though it is. It’s
          that the institution now misallocates at scale: pouring
          intervention dollars at a proxy while the actual construct goes
          unseen: the student who is slipping but doesn’t match the
          historical pattern. You can defund a program that works and
          miss a cohort that needs you, both at once, with a perfectly
          accurate model.
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
          The failure has a shape, and the shape travels. A
          behavioral-health risk model trained on prior service
          utilization doesn’t predict who is <I>at risk</I>; it predicts{" "}
          <I>who the system has already served</I>. Different sector,
          identical mistake — accuracy against a proxy, mistaken for
          measurement of the construct. When the same error shows up in a
          school and a clinic, you’re not looking at a domain quirk.
          You’re looking at a recurring failure mode, and the framework
          is what lets you name it before it ships.
        </P>

        <P>
          Two disciplines guard this layer. The first is refusing the
          rolled-up average. A single number (the graduation rate, the
          program’s headline outcome) can hide opposing trends underneath
          it: a falling overall rate that masks a <I>rising</I> rate in
          one subgroup, the average quietly erasing the very contrast
          the decision rests on.{" "}
          <B>
            <InternalLink slug="burden-disparity-and-the-next-dollar">Burden and disparity are different signals</InternalLink>
          </B>
          , and only disaggregation makes the resource choice explicit
          and honest: where the next dollar goes. The second discipline
          is asking what the measure is <I>for</I>:{" "}
          <B>
            <InternalLink slug="actions-not-answers">decision utility</InternalLink>
          </B>{" "}
          weighs the expected cost and benefit of the specific action,
          not just the statistical accuracy of the score. A validated
          flag that triggers no useful act is a validated waste.
        </P>

        <P>
          For our ninth grader, validity is the question no dashboard
          asked: was the flag measuring her academic risk, or was it
          measuring her zip code with her name on it?
        </P>

        <H2>The stress test: agentic AI</H2>

        <P>
          Until recently, most decision systems still kept a human pause
          somewhere in the chain — someone read the report, interpreted
          the flag, judged it before anything happened. That pause was
          rarely designed. It was just there, a free safeguard no one
          had to budget for.
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
          The fix isn’t a new procurement rubric. An autonomous agent is
          a specialist that moves faster than you can read, and a
          specialist needs a{" "}
          <InternalLink slug="the-contracts-between-systems">
            seam contract
          </InternalLink>
          . The agent’s contract just has to make explicit what a
          human’s could leave implicit: an <B>autonomy range</B> (how
          much it may do unsupervised, from <I>return only verified
          responses</I> to <I>act review-by-exception</I>, set by the
          stakes of the decision, not the cleverness of the model); a{" "}
          <B>reversibility envelope</B> (how and when its action can be
          undone, and who is told when a record someone already acted
          on gets corrected); <B>a named human owner</B> who answers for
          what it does; and a <B>consumption contract</B>, so metered spend
          lands on the department that generated it. And like every
          other reader, the agent reads through the same semantic
          keystone — because{" "}
          <InternalLink slug="grounding-the-ai-layer">
            an AI ungrounded in canonical definitions will cheerfully
            invent metric names and answer questions no one can reconcile
          </InternalLink>
          .
        </P>

        <P>
          The stress test is the proof. AI doesn’t introduce new
          requirements so much as it removes the slack that let
          institutions get away with skipping the old ones. Meaning,
          authority, and validity were always load-bearing. Agentic
          systems are the first thing heavy enough to make a hollow
          architecture fall down.
        </P>

        <H2>Design the rules for the failure mode</H2>

        <P>
          The best institutional rules aren’t written to describe normal
          play; they’re written to prevent predictable failure. Goodhart’s
          law (<I>a measure that becomes a target stops being a good
          measure</I>) isn’t a slogan for a poster. It’s a design
          constraint. If a measure will be gamed, the system has to
          protect the construct before someone hollows it out by chasing
          the proxy. That’s a whole essay of its own — see{" "}
          <InternalLink slug="why-the-rules-look-weird">
            Why the rules look weird
          </InternalLink>
          . For the decision-system, the corollary is simple: write the
          weird rule first.
        </P>

        <P>
          There’s a payoff worth naming, and a temptation worth
          refusing. The marginal cost of storing and processing data
          has collapsed; the cost of making it <I>mean</I> something has
          not. That collapse tempts institutions toward a fantasy of
          total visibility: seeing each person <I>whole</I>. They can’t,
          and shouldn’t pretend to. The honest version is smaller and
          harder: stop mistaking the fragment you measure for the person
          in front of you. For years a student arrived in our systems as
          a postage stamp: a score, a category, a proxy for an enrollment
          number. The aim of the architecture isn’t to swap that
          thumbnail for a perfect portrait. It’s to keep the institution
          honest about how little of her it sees, and to make that
          partial view legible to a decision instead of merely stored.
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
  // FIELD NOTE 11 — We used to settle for thumbnails  (HIDDEN — unhides next week)
  // ===================================================================
  {
    kind: "field-note",
    hidden: true,
    slug: "we-used-to-settle-for-thumbnails",
    number: "11",
    title: "We used to settle for thumbnails.",
    subtitle:
      "The compression institutions ran on for centuries is finally cheap to relax. That&rsquo;s not a technology story. It&rsquo;s a decision-architecture question.",
    date: "2026-07-09",
    readingTime: "5 min read",
    summary:
      "For most of human history, every institution carried you as a thumbnail: a name, a category, a score. That compression wasn’t malice, it was budget, and the price of the full picture has now collapsed. The choice institutions face isn’t whether to keep sorting faster or to hold people at higher resolution; it is whether they can answer the validity question underneath it.",
    cover: "/library/covers/we-used-to-settle-for-thumbnails.svg",
    arc: "measurement",
    body: (
      <>
        <Brief>
          <p>
            For most of human history, every institution has had to carry you
            as a thumbnail. A name, a category, a score, a photo the size of a
            postage stamp. That wasn&rsquo;t malice. It was budget. Human
            attention had limits, and the thumbnail was what fit through the
            pipeline.
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
          For thousands of years, the bottleneck was carrying the picture. Not
          anymore. The advisor still has twenty minutes with you. The
          clinician still has fifty. But what travels into that twenty minutes
          (what survives the pipeline from intake to conversation) used to be
          a thumbnail and can now be the full picture. Not because human
          attention got cheaper. Because the cost of preserving and presenting
          the picture to the human at the moment of decision finally dropped.
        </P>
        <P>
          You can think about it the way photography went. We didn&rsquo;t
          always have high-resolution images of everything. We had paintings,
          and only royalty could afford the full likeness. We had early
          photographs, but they were precious and rare, one shot per occasion,
          no retakes. Then film got cheap. Then digital got cheap. Then
          storage and transmission got so cheap that we stopped thinking about
          it at all. Today your phone holds tens of thousands of full-resolution
          images and the question is just which ones to look at.
        </P>
        <P>
          The same thing has just happened to people, inside institutions. The
          price of the full picture has collapsed.
        </P>

        <H2>The choice.</H2>
        <P>
          So now every institution faces a choice it didn&rsquo;t have before.
        </P>
        <P>
          It can use the discount to sort you faster. More candidates
          screened, more students flagged, more patients triaged. Same
          thumbnails: just more of them, generated more quickly. That&rsquo;s
          the obvious move, because efficiency has a clear ROI. And the
          metrics most institutions already track (volume, throughput,
          latency) reward more of what they&rsquo;re already doing.
        </P>
        <P>
          Or it can use the discount to hold you at higher resolution. Same
          number of students, same number of patients, same number of
          candidates. But what the advisor opens on her screen is no longer a
          thumbnail. It&rsquo;s the picture.
        </P>
        <P>
          The CEO who says she needs the thumbnail because attention is scarce
          is not wrong about the constraint. Human attention is still scarce;
          the picture itself is not an asset unless it has been designed for
          the moment of decision. A full-resolution view dumped into the
          advisor&rsquo;s twenty minutes without curation produces overload,
          not insight. The discount has to be spent on two things, not one:
          on preserving the picture, and on designing the interface that lets
          the picture inform the twenty minutes without overwhelming them.
          The question is not <I>thumbnail or full picture?</I> It is{" "}
          <I>
            what does the full picture need to look like for the advisor to
            use it in twenty minutes?
          </I>{" "}
          That is a design problem, and it is the second half of what the
          discount buys.
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
          That&rsquo;s not sentiment. It&rsquo;s a measurement standard. The
          discipline is called{" "}
          <B>
            <InternalLink slug="what-is-this-system-measuring">
              validity
            </InternalLink>
          </B>
          , and it has decades of track record from the world of high-stakes
          testing. A score that tracks the construct it claims to measure is
          valid. A score that tracks something else (length, fluency,
          demographics, the candidate tested just before you) is not. The
          standard isn&rsquo;t new. It&rsquo;s been ready for this moment for
          a long time.
        </P>
        <P>
          What&rsquo;s new is the price of asking it. When carrying the full
          picture was impossible, you couldn&rsquo;t really apply validity to
          most institutional systems, there was no full picture to validate
          against. Now you can. And now you should.
        </P>

        <H2>The stakes.</H2>
        <P>
          For most of history, the thumbnail was the kindest thing an
          institution could do for you. The full picture wasn&rsquo;t kept out
          of cruelty. It was kept out because nobody could carry it.
        </P>
        <P>That isn&rsquo;t true anymore.</P>
        <P>
          The question for 2026 is whether institutions use the savings to
          take more thumbnails faster, or to finally stop settling for them.
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
  // FIELD NOTE 12 — AI did not write my library  (HIDDEN — unhides next week)
  // ===================================================================
  {
    kind: "field-note",
    hidden: true,
    slug: "ai-did-not-write-my-library",
    number: "12",
    title: "AI did not write my library. AI helped me navigate it.",
    subtitle:
      "Field notes on the stages of working with generative AI across tools.",
    date: "2026-07-13",
    readingTime: "9 min read",
    summary:
      "A personal field note on eighteen months of working with GPT, Claude, and Gemini across a career transition, a brand build, and a re-entry into public-facing work. Five stages, from vending-machine outputs to multi-tool selection, name what the relationship actually looked like. The through-line: maturity transferred, capability expanded.",
    cover: "/library/covers/ai-did-not-write-my-library.svg",
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
            is what I have learned in about eighteen months of working with
            three generative AI tools across a career transition, a brand
            build, a family, and a re-entry into the kind of public-facing
            work I had been away from for years. Anyone who tells you the
            optimal way to use AI is making it up. I am telling you what
            worked for me, in the specific shape my life took.
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
          project was a dashboard redesign. The work was good. I kept
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
          But also: my son&rsquo;s Sanskrit homework. Fitness routines.
          Clothes shopping when I needed to look like someone who could
          walk into a senior interview after a year of working from home.
          Hair and skin products I had let lapse. Watch recommendations the
          morning after a hard day. Recipes. Once, the surface area of a
          sliced cake for a math worksheet.
        </P>
        <P>
          I did not separate these. They were the same tool doing
          different work. This matters, because the maturity I was
          building was not &ldquo;AI for professional things.&rdquo; It
          was <I>AI as a surface I could think on without performing.</I>
        </P>
        <P>
          That last part is the one I would lift out of the eight months
          and underline. The reason GPT became useful for me was not that
          it was smart. It was that the conversational contract was
          different from human conversation. With humans, I have to think
          of the most balanced curated version of what I want to say
          before I say it. With AI, I can say the thing, hear it back,
          reflect, refine. No pressure. No social cost.
        </P>
        <P>
          That property (<I>removing the social-performance overhead of
          conversation</I>) is what made AI usable for the kind of
          thinking that needed open space. Not because AI is
          non-judgmental or empathic. Those framings are sentimental and
          partly untrue. The benefit is structural. AI removes the
          contract that requires you to be composed before you speak.
        </P>
        <P>
          By the end of those eight months, a working pattern had formed.
          Pre-work happened with AI. Polished outputs went into the world
          in my voice. I had learned to catch sycophancy and call it out
          (<I>&ldquo;why r u agreeeing with evetyhign i say&rdquo;</I>). I
          had learned to protect my voice from drift (<I>&ldquo;why is
          this not sounding me?&rdquo;</I>). I had learned that the volume
          of iteration was the point, that one banner image might take
          ninety turns and that was fine because the artifact was the
          deliverable, not the conversation.
        </P>
        <P>This was the foundation. I would lean on it for what came next.</P>

        <H2>Stage 3 — The crisis. Acute use during a professional exit.</H2>
        <P>
          April 5, 2026. The Sunday after a senior role of mine was
          eliminated.
        </P>
        <P>
          The first message I sent to GPT that day opened: <I>&ldquo;this
          transition still sucks, make me think what is wrong with
          me?&rdquo;</I>
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
          specific emotional moment. Not just asking for help, directing
          the kind of help.
        </P>
        <P>
          I want to be careful here, because there is a flat version of
          this stage that says &ldquo;AI is good at emotional
          support&rdquo; and most public writing on the topic lands
          there. The accurate version is different.
        </P>
        <P>
          There were other scaffolds. My father called with advice. My
          husband had his own take. We are a family with a household to
          keep running, and I was also being tactical for the same
          reason. What AI specifically gave me, that the humans in my
          life could not, was <I>open space alongside the tactical
          pressure</I>. The space to ask the same hard question eight
          different ways. The space to be repetitive without burdening
          anyone. The space to integrate what others had told me without
          the social contract of receiving advice in real time.
        </P>
        <P>
          I avoid discussing difficult things with humans in general. I
          find them opinionated. Maybe that is bias on my part. I do not
          know. The honest version is: I chose AI for the deep processing
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
          I think about ramping into new roles. Decision Systems framing
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
          That was the moment Claude earned the ramp. Not because Claude
          was better than GPT in some abstract way, but because it had
          just enabled me to do something I had been blocked on for
          years. The trust was concrete. It was about the artifact.
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
          Competitive scans. Product offerings as first drafts. TEDx
          application refinement. Anything that needed to compound across
          sessions and integrate across folders.
        </P>
        <P>
          GPT kept the work it was already good at. Sharp operator
          phrasing when Claude felt too dense. Resume and cover-letter
          tailoring, especially for fast-turnaround applications. Visual
          generation for TEDx framing and LinkedIn Featured images,
          because GPT&rsquo;s image model is built into the conversation.
          Some reflection threads that just continued the pattern from
          earlier.
        </P>
        <P>
          Gemini entered for critique. A third opinion on TEDx
          applications, on a Monitoring and Evaluation Learning kit I was
          developing, on essay drafts.
        </P>
        <P>
          The selection was not abstract. It was empirical. I used each
          tool for what each tool did well, and the assignments shifted
          as my needs shifted.
        </P>
        <P>
          One pattern worth naming: TEDx work is hybrid, not Claude-only.
          The application drafting and thesis refinement live on Claude.
          The visual and metaphorical exploration (race vs room,
          Constellation Self, Tree with Silhouettes) happened on GPT,
          because that is where image generation could iterate with text
          in the same thread.
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
          turns produce one shippable artifact. The two-tool thinking, the
          idea that I could check one tool against another. None of that
          was learned on Claude. It was already operational by the time I
          opened my first real Claude thread.
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
          that could do more with the same pattern. <B>Maturity
          transferred. Capability expanded.</B> Two different curves.
        </P>
        <P>
          This also tracks with something I have been saying for years in
          my data work: <I>&ldquo;it was never about the stack.&rdquo;</I>
          {" "}The AI version of that turns out to be the same claim. It was
          never about the tool.
        </P>

        <H2>The core insight.</H2>
        <P>
          <I>AI did not write my library. AI helped me navigate it.</I>
        </P>
        <P>
          The library is what I have built. The essays, the brand, the
          cover letters that landed, the applications I am proud of, the
          TEDx thesis I am still shaping, the decision-systems vocabulary
          I use. All of that is mine. My voice. My judgment. My
          responsibility when it succeeds, my responsibility when it does
          not.
        </P>
        <P>
          What AI gave me was navigation. Help finding the shelf. Help
          pulling the right book down. Help cross-referencing. Help
          drafting the first sentence so I could see what was wrong with
          it and write the right one. Help iterating on a banner image
          ninety times until I could see the version I wanted. Help
          integrating a piece of advice from my father in the middle of
          the night when the cost of calling him back was too high.
        </P>
        <P>The library is mine because I built it. The navigation is shared.</P>

        <H2>What I do not know.</H2>
        <P>A field note should name what it cannot answer.</P>
        <P>
          I do not know whether the speed AI gave me cost me depth. The
          prototyping work I did at a prior role took longer with GPT
          because the friction was real. I was drafting outside the work
          environment and porting the work back in. Some of that friction
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
          panel, a hard meeting, that muscle is not built on the pre-work
          surface. I have done many things with AI in the last year. The
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
          one operator&rsquo;s account of eighteen months across three
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
];

// ---------------------------------------------------------------------
// HELPERS
// ---------------------------------------------------------------------

export const ESSAY_SLUGS = ESSAYS.map((e) => e.slug);

export function getEssay(slug: string): Essay | undefined {
  return ESSAYS.find((e) => e.slug === slug && !e.hidden);
}
