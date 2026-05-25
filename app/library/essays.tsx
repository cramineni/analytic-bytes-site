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
            request lands for a BI platform — Tableau, Power BI, Looker, Sisense
            — with an evaluation matrix attached and a recommendation at the
            bottom. Approve it, and on paper reporting is handled.
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
          operator console is mostly used as a launcher for other tools.
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
          most of them, is really serving three reporting surfaces, not one.
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
          specific — one school, one client, one regulator — and the cadence is
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
          You cannot ship one tool that is good at all of this. What you can
          ship is one tool that is good at one surface and acceptable at the
          others, which is what most BI selections deliver. The org chart where
          one person owns “BI” and one tool owns “all reporting” is what
          guarantees that outcome.
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
          Not a link to a dashboard with credentials.
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
          one less system. It isn’t one less system. It’s one less
          correctly-shaped system.
        </P>

        <H2>The keystone: one canonical computation per concept</H2>
        <P>
          The keystone argument is the one most worth holding firm on. It is the
          difference between a system that scales and a system that poisons
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
          you will find the choice barely matters. Run it before, and you will
          spend six months optimizing the wrong variable while the foundation
          that determines the outcome goes unbuilt.
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
  // ESSAY 02 — Grounding the AI Layer
  // ===================================================================
  {
    kind: "essay",
    slug: "grounding-the-ai-layer",
    number: "02",
    title: "Grounding the AI Layer",
    subtitle:
      "Where AI belongs in the modern data stack, and what keeps it honest.",
    date: "2026-05-13",
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
          investments compound or poison the data product. Place AI in the wrong
          layer and it gets expensive, slow, and untrustworthy. Place it in the
          right layer with no grounding contract and it confabulates. Place it
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
          vendor’s AI features for what they are good at — schema-drift alerts,
          anomaly detection on row counts, AI-assisted connector creation — and
          stop there. Data-quality logic with semantic stakes (this respondent
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
          confabulates metric names. Don’t expose it to clients in v1.
        </P>
        <P>
          Cortex COMPLETE / SUMMARIZE / EMBED_TEXT for narrative generation and
          embeddings, used inside warehouse-native apps when PHI needs to stay
          in place.
        </P>
        <P>
          Document AI if you have any PDF intake — consent forms, partner
          packets, prior reports — that you’d otherwise extract by hand.
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
          That is the placement story, one paragraph per layer. The harder
          question is what grounds the AI features once you have placed them.
        </P>

        <H2>The semantic layer is also the AI contract</H2>
        <P>
          The keystone argument from the companion piece, <I>Three Surfaces, One
          Keystone</I>, extends one step. There, the claim was that all three
          reporting surfaces — program report, operator console, executive view
          — must read from a single dbt-defined semantic layer or they drift,
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
          LLM is wrapped in tool-use, not given freeform SQL. Three permitted
          scopes.
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
          it pulled from, with a “view underlying data” link. Citations are not
          optional in this domain.
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
          <B>Free-text NL-to-SQL in the user-facing chatbot.</B> The right tool
          for an internal analyst console, the wrong tool for a client portal
          where the surface area is too large to keep grounded. Use typed tool
          calls into the metric API instead.
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
          One reframe to carry out of this. Every AI feature is a small
          delegation of a decision to a model. The architecture’s whole job is
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
  // FIELD NOTE 01 — When GenAI Redesigned My Dashboard
  // ===================================================================
  {
    kind: "field-note",
    slug: "when-genai-redesigned-my-dashboard",
    number: "01",
    title: "When GenAI Redesigned My Dashboard",
    subtitle:
      "The redesign was uglier and clearer. What that taught me about data teams and AI tools.",
    date: "2026-05-18",
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
            rarely shows up in a status update. And it is where a great deal of
            analytics investment goes to die.
          </p>
          <p>
            What follows is written for the people building dashboards, but the
            method inside it is small enough for a leader to hold a team to. Let
            an AI tool propose what the audience needs to see before the team’s
            craft instincts lock in, then curate from there. The claim is not
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
          dashboard back in front of GenAI tools — ChatGPT, Claude, Gemini — and
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
            governance, edge cases. But the structure — what is prominent, what
            is secondary, what is omitted — is anchored on the AI’s reading of
            what the audience needs to see, not the data team’s reading of
            what’s satisfying to build.
          </NumItem>
        </NumList>
        <P>
          This is closer to user-research methodology than to traditional BI
          design. The AI is acting as a fast proxy for the stakeholder’s
          cognitive needs, not because the AI knows the stakeholder, but because
          the AI doesn’t yet carry the data team’s aesthetic biases.
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
          proposal. The team’s bandwidth concentrates on the judgment calls —
          what is right for this stakeholder, what governance demands, what
          brand voice requires — instead of on building from a blank canvas.
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
          principal read this faster than the original? You can find out in a
          week instead of after launch.
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
          which question matters most. That is still the analyst’s call, and the
          closest thing to a human-only step in the workflow.
        </P>

        <H2>The reframe</H2>
        <P>
          The traditional dashboard-design conversation centers on what the data
          team can build. The discipline I’d recommend now centers on what the
          audience can read in fifteen seconds and act on. That is the
          difference between building for the immediate task — display the data,
          accurately — and building for the intended outcome the dashboard
          exists to support: a better decision, made sooner, by the person it
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
  // FIELD NOTE 02 — LO 2.0, Stitching the Layers
  // ===================================================================
  {
    kind: "field-note",
    slug: "lo-2-0-stitching-the-layers",
    number: "02",
    title: "LO 2.0 — Stitching the Layers",
    subtitle:
      "Why national education data, classroom assessments, and local instruments are most useful when used together, and what the integration architecture looks like.",
    date: "2026-05-22",
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
          <B>PGI 2.0</B> (Performance Grading Index). Composite index, 73
          indicators, 1,000-point scale. Combines UDISE+ and NAS data into
          ranking grades. Strong for state-level comparison, federal incentive
          frameworks, publicly visible accountability. Weak for improvement work
          or operational decisions.
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
          layer has a clear failure mode. None alone is sufficient. All of them
          combined, with the right integration architecture, can support
          different decision-makers running different decisions at different
          cadences.
        </P>

        <H2>The picture for one state</H2>
        <P>
          Andhra Pradesh, 2021. NAS data shows Class X performance below 50% on
          every measured learning outcome, and below the national average on 16
          of them. Eighty percent of students at or below basic level in Math;
          94% at or below basic in Science; 86% at or below basic in Social
          Science. The pattern compounds with grade: at-or-below-basic in Math
          goes from 63% in Class III to 80% in Class X. State schools badly
          underperform private, 85% at or below basic in Math at state schools
          against 73% at private. AP graded Akanshi-1 overall on PGI 2022–23
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
          layer — student-level continuous assessment, teacher-feedback loops,
          principal observation — running in tandem with the national signal.
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
          different decisions for different actors at different cadences. The
          integration architecture is what makes it possible.
        </P>

        <H2>The pilot</H2>
        <P>
          Ten to twelve weeks (February–April 2025), Class X, Math and Science,
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
          The proposal didn’t materialize as a paid engagement. The framework
          remains current. The state-level findings (NAS 2021, PGI 2022–23)
          would benefit from a refresh against more recent NAS 2024 results.
        </P>
        <P>
          The opportunity isn’t a new portal. It’s stitching the layers we
          already have into decision surfaces for the people who need to act.
        </P>
        <P>
          That is decision-systems architecture at state-government scale: start
          from the assets already in place rather than the ones that are
          missing, route each decision to the layer that can answer it, and give
          every decision-maker — teacher, headmaster, district officer, ministry
          — a surface built for the call in front of them. The portal was never
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
];

// ---------------------------------------------------------------------
// HELPERS
// ---------------------------------------------------------------------

export const ESSAY_SLUGS = ESSAYS.map((e) => e.slug);

export function getEssay(slug: string): Essay | undefined {
  return ESSAYS.find((e) => e.slug === slug);
}
