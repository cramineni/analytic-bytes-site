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
                className="absolute inset-y-0 left-0 bg-ink"
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

// ---------------------------------------------------------------------
// PIECE TYPE + REGISTRY
// ---------------------------------------------------------------------

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
            same numbers. This is a decision-system question wearing a
            procurement question’s clothes.
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
          cognitive needs. It hasn’t spent five years in your design reviews,
          which is what makes it useful at this step.
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
          <B>UDISE+</B> (Unified District Information System Education Plus).
          Census-style coverage of every school. Strong on infrastructure
          adequacy, demographic patterns, enrollment trends, attendance
          aggregates. Weak on learning outcomes, individual student tracking,
          and real-time signal. Best used for: macro-policy decisions,
          infrastructure investment, demographic-shift analysis, federal funding
          allocation.
        </P>
        <P>
          <B>NAS</B> (National Achievement Survey). Sample-based, high-quality
          achievement assessment, fielded only every few years. Reports state
          and group averages. Strong on national snapshots and inter-state
          comparison. Weak on improvement tracking, classroom-level signal, and
          cross-cycle comparability when grades sampled change. Best used for:
          periodic state benchmarking, policy effectiveness review,
          resource-prioritization signals.
        </P>
        <P>
          <B>PGI 2.0</B> (Performance Grading Index). Built for state-level
          comparison, federal incentive frameworks, and publicly visible
          accountability. A composite index that combines UDISE+ and NAS into
          ranking grades across 73 indicators on a 1,000-point scale. Don’t
          reach for it when the question is operational or improvement-shaped;
          it won’t carry the weight.
        </P>
        <P>
          <B>SEQI</B> (School Education Quality Index). Composite ranking,
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
            reliability-filtered read of CDC WONDER mortality data from 2021
            to 2024, and its only real claim is structural: burden and disparity
            are two different signals, the priority list you would build from
            one is not the list you would build from the other, and a
            prioritization framework that shows both, and stays honest about
            what it can’t see, changes the allocation decision. This piece is
            for the person who has to defend that decision after it’s made.
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
          year, and an unfiltered ranking would be mostly noise wearing the
          costume of precision.
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
          alphabet: the CTO, the CIO, the CFO, the CFAO, the COO, a CDO, a CDAO,
          a Chief AI Officer, a Chief Innovation Officer, sometimes a Chief
          Impact Officer, occasionally a CPO. Several of those titles mean
          different things at different organizations. The acronym soup is not a
          trivia problem; it is the symptom. The field has not agreed what this
          function <I>is</I>, so it has not agreed who should own it. Every
          organization improvises.
        </P>
        <P>
          So set the title question aside. It is the wrong question, and
          answering it first is how organizations end up improvising. Ask the
          prior one. What does data infrastructure need from its place
          on the org chart? Answer that, and the seat stops being a matter of
          taste.
        </P>
        <P>
          I first met this argument in a narrower form: the
          monitoring-and-evaluation data of mission-driven organizations, the
          data that tells a funder whether a program worked. That data usually
          belongs to a technology or digital-products team, and it gets bent
          toward that team’s priorities rather than the evaluators’. The fix
          there and the fix here are one argument at two scales. Data should not
          be owned by a function whose incentives point somewhere else. What
          follows is that argument at full-organization scale.
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
          service desk, quick to answer a request and absent from the decision.
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
          barely needs defending. Where data is not the product, it is the
          narrowest capture of all: the function answers the product’s questions
          well and the rest of the organization’s not at all.
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
            It needs to report at the <B>altitude where its decisions live</B>.
            Data infrastructure’s daily work is the recurring operating
            decisions that run across functions, not the strategic decisions
            that sit with the CEO and the board.
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
          executive to another and renamed on the way. The capability did not
          change across those moves. Its reach did. Under the integrator it
          served the whole organization. Everywhere else it served whoever it
          reported to, and the rest of the organization learned to route around
          it.
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
          Most of the time, the unicorn is not a talent problem. It is a
          placement problem wearing a talent problem’s clothes. When data
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
          for the lack of one. The role was mis-housed, and the job description
          was billing one person for the org chart’s unpaid debt.
        </P>

        <H2>Where this is going</H2>
        <P>
          The field is slowly moving toward all of this. Data spent two decades
          under IT, a cost center with the lights kept on. The Chief Data
          Officer emerged to pull it up and out, and the title has since
          absorbed analytics and then AI, cycling through CDO, CDAO, Chief AI
          Officer. The direction of travel is real: data climbing from the
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
          to be built into the structure around the model. Start with
          reversibility: an action designed to be undone has margin for the
          other layers to fail. Then hard limits the agent cannot cross
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
            pressure: a contracting enrollment as the demographic cliff arrives,
            public skepticism about the return on a degree, tightened federal
            funding and tax conditions, and a sector that Deloitte’s 2026 higher
            education outlook describes as moving from a long period of growth
            into one of disciplined focus, with the business model under
            scrutiny and risk management demanding tighter coordination across
            offices that once operated siloed. AI arrived in the middle of all
            of it, as both another pressure and a promised relief.
          </p>
          <p>
            The role of the technology executive has shifted with it. In
            Deloitte’s 2026 study of technology leaders, the large majority of
            CIOs described their primary job as implementing AI or evangelizing
            for it across the institution, a shift the report frames as moving
            from keeping the lights on to lighting the way forward. That shift
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
          decisive for the writers the correlation doesn’t hold for.
        </P>

        <H2>The harder question</H2>
        <P>
          The methodological alternative is older than machine learning, and it
          is what measurement science was built on. A test like GRE Writing is
          not, at its core, asking whether an AI can match a human rater on a
          30-minute timed essay. The GRE Writing test asks students to write
          two essays under timed pressure, an Issue essay and an Argument
          essay. It is making a claim about the relationship between
          performance on those timed tasks and performance on something quite
          different in shape: the longer, drafted-and-revised writing students
          produce over weeks in a first-year graduate course. Two different
          formats. Different rubrics. Different human evaluators. Two ways of
          capturing the same underlying writing construct, with the test
          asserting a relationship between them.
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
          predict. The first is reliability, often pursued because it is
          faster and cheaper. The second is validity, and it is what the test
          claims to do in the first place. The AI-scoring conversation has
          mostly been running on the easier question.
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
          itself a proxy the human eye is inclined to reward. The 2026
          enterprise-AI research is consistent on this point: only a small
          share of organizations report a mature model for governing autonomous
          AI agents, and the real constraints on scaling AI are rarely the
          technology itself. They are data quality, security, and the absence
          of evaluation discipline. The newer the system, the more easily
          plausibility substitutes for proof.
        </P>

        <H2>The discipline already exists</H2>
        <P>
          This is the missing discipline inside AI governance. EDUCAUSE’s 2026
          priorities name the human edge of AI, and data analytics for
          institutional decision-making, among the issues that matter most.
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
          missing, and more often than not you can name the missing part before
          lunch. That is the whole of it. Most organizations do not have a data
          problem. They have a decision-system problem, and a take-home is a
          short, honest way to watch one happen. <I>From fragmented to
          decision-ready</I> is the distance between the brief they wrote and the
          brief they meant.
        </P>

        <MetaNote>
          Written June 2026 for the Analytic Bytes Library. Drawn from interview
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
            definitional disagreements wearing a technical disguise.
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
          well-developed frames to draw on. DAMA’s Data Management Body of
          Knowledge organizes the field into eleven knowledge areas with
          governance at the center: architecture, modeling, integration,
          quality, metadata, master and reference data, and the rest.
          EDUCAUSE’s data-empowered-institution model distills the
          higher-education version to five components — data quality,
          integration, governance, management, and literacy. Both frames
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
          architectural layer.
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
          distributed authority by design — these are features, not bugs.
          Governance imposed from the center has a poor track record in
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

        <MetaNote>
          Written June 2026 for the Analytic Bytes Library by Chaitanya
          Ramineni. Cases described are drawn from the author’s practice
          across a K–8 charter network and longitudinal-measurement
          settings; organizational details are abstracted and no
          individual record, person, or proprietary number is reproduced.
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
            act on with authority. This essay is about that contract, and
            about what it has looked like across three eras of
            integration — legacy, modern, and the agentic era now
            arriving. The engineering changes. The contract has to change
            with it. The governance gap, in most institutions, does not.
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
          systems — UDISE+ for the annual school census, NAS for a
          sample-based achievement survey on a four-year cycle with
          grade-band shifts between cycles, PGI as a centrally-designed
          state grading index, and SEQI as a state quality index with its
          own definitions of the same outcome variables. Technically the
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

        <H2>Higher ed and the agentic era</H2>

        <P>
          Higher education is not far from this. Banner-to-Workday-Student
          transitions are landing. Financial-aid agents reading across
          multiple systems are landing. Advising assistants writing to
          advising notes are landing. AI tutors writing to gradebooks are
          landing. The institution will have the integration. It will
          have, mostly, the engineering. What it will not have, in most
          cases, is the contract layer. Who is allowed to write a
          gradebook entry on behalf of an AI tutor? What is the consent
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
          with what authority to act) turn fragmented bytes into
          decision-ready institutional intelligence stakeholders can stand
          behind. Without those contracts, the integration runs and the
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
            drink. The contract at the seam, not the pipe in the wall.
            The gap between <I>we have a data warehouse</I>{" "}
            and <I>we can make a decision.</I>
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
          The work that actually determines whether you can drink the
          water, cook with it, give it to a child, wash a wound — that
          work isn’t in the pipes. It’s: What’s the source. Is the
          source clean. Did anything get added or removed upstream.
          What’s the pressure at the faucet — too high and it sprays,
          too low and you can’t fill a pot. Who’s allowed to open which
          tap. What happens when the system fails. Who notices.
        </P>
        <P>
          None of that is plumbing. All of it is the actual experience
          of having water.
        </P>

        <H2>Speed was the only knob we turned</H2>
        <P>
          There’s a useful way to think about what AI actually changed
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
          default positions. That’s the gap — not that we lack speed,
          but that we haven’t spent the other two.{" "}
          <I>
            (There is a fourth dimension worth naming separately —
            whether the construct in the pipe is still the construct
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
          have some form of <I>data governance</I> in place — the
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
          The water treatment plant — the place that decides what
          counts as drinkable water and tests every batch — that’s the
          construct question. Are we measuring what we say we’re
          measuring. Is the thing in the pipe still what it was when we
          sampled it last quarter.
        </P>
        <P>
          The municipal authority — who decides which neighborhoods get
          pressure, who sets the testing cadence, who’s responsible
          when the boil-water advisory goes out — that’s the governance
          contract. Who reads. Who writes. Cadence. Authority. This is
          the contract at the seam: the point where the architecture
          stops and a person has to act on what comes through. Most
          institutions have a contract for the pipes — vendor SLAs,
          integration agreements, data-sharing terms. Few have one for
          what happens at the faucet.
        </P>
        <P>
          The faucet itself — the moment someone turns the handle —
          that’s the decision. A dosage adjustment, a budget call, an
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
          That last piece — what kind of decision — is the one most
          institutions skip. They build for monitoring, then ask the
          same plumbing to support intervention, and the seam fails.
          The work is matching the architecture to the decision the
          institution actually needs to make.
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
          anymore. The unglamorous part is the water: what’s in it,
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

        <MetaNote>
          This field note was written in June 2026 for the Analytic
          Bytes Library. The longer arguments referenced here live in
          other library pieces: <I>What Is This System Actually
          Measuring?</I> (the water-safety question), <I>The numbers
          don’t agree because the words don’t</I> (when two pipes feed
          the same tap), <I>The Contracts Between Systems</I> and
          related work on who writes the contract (authority at the
          seam).
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
