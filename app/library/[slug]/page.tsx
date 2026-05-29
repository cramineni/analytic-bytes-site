import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ESSAYS, getEssay } from "../essays";

// Pre-render every essay route at build time. Hidden essays are skipped —
// they 404 in production until their `hidden` flag is removed.
export function generateStaticParams() {
  return ESSAYS.filter((e) => !e.hidden).map((e) => ({ slug: e.slug }));
}

export function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Metadata {
  const essay = getEssay(params.slug);
  if (!essay) {
    return { title: "Essay not found — Analytic Bytes" };
  }
  return {
    title: `${essay.title} — Analytic Bytes`,
    description: essay.subtitle,
    openGraph: {
      title: `${essay.title} — Analytic Bytes Library`,
      description: essay.subtitle,
      type: "article",
      url: `https://analyticbytes.systems/library/${essay.slug}`,
    },
    twitter: {
      card: "summary_large_image",
      title: `${essay.title} — Analytic Bytes Library`,
      description: essay.subtitle,
    },
  };
}

function formatDate(iso: string) {
  const d = new Date(iso + "T00:00:00");
  return d.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default function EssayPage({
  params,
}: {
  params: { slug: string };
}) {
  const essay = getEssay(params.slug);
  if (!essay) notFound();

  const idx = ESSAYS.findIndex((e) => e.slug === essay.slug);
  const prev = idx > 0 ? ESSAYS[idx - 1] : null;
  const next = idx < ESSAYS.length - 1 ? ESSAYS[idx + 1] : null;

  return (
    <>
      <Nav />

      <main>
        {/* HERO */}
        <section className="pt-16 pb-8 sm:pt-20 sm:pb-10">
          <div className="max-w-page mx-auto px-5 sm:px-8">
            <Reveal>
              <div className="max-w-[68ch]">
                <Link
                  href="/library"
                  className="font-mono text-[12px] text-ink-3 hover:text-accent no-underline transition-colors"
                >
                  ←&nbsp;&nbsp;Library
                </Link>
                <div className="font-mono text-[11px] text-accent tracking-[0.18em] uppercase mt-7">
                  {essay.kind === "essay" ? "Essay" : "Field Note"} {essay.number}
                </div>
                <h1 className="font-extrabold leading-[1.06] tracking-[-0.03em] mt-4 text-[32px] sm:text-[46px] lg:text-[54px] text-ink">
                  {essay.title}
                </h1>
                <p className="text-ink-2 text-[17px] sm:text-[20px] italic leading-[1.5] mt-5">
                  {essay.subtitle}
                </p>
                <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-7 font-mono text-[12px] text-ink-3 tracking-[0.03em]">
                  <span className="text-ink-2 font-medium not-italic">
                    Chaitanya Ramineni, PhD
                  </span>
                  <span aria-hidden>·</span>
                  <span>{formatDate(essay.date)}</span>
                  <span aria-hidden>·</span>
                  <span>{essay.readingTime}</span>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* COVER */}
        <section className="pb-10 sm:pb-14">
          <div className="max-w-page mx-auto px-5 sm:px-8">
            <Reveal>
              <div className="max-w-[820px]">
                <div className="rounded-md overflow-hidden border border-line bg-bg-alt">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={essay.cover}
                    alt={`Cover illustration for ${essay.title}`}
                    className="w-full h-auto block"
                  />
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* BODY */}
        <section className="pb-16">
          <div className="max-w-page mx-auto px-5 sm:px-8">
            <article className="max-w-[68ch]">
              {essay.body}

              {/* Brand sign-off */}
              <div className="mt-12 pt-8 border-t border-line">
                <div className="font-mono text-[11px] text-ink-3 tracking-[0.18em] uppercase mb-1.5">
                  Analytic Bytes
                </div>
                <div className="text-accent font-bold text-[20px] sm:text-[22px] tracking-[-0.015em]">
                  From fragmented to decision-ready.
                </div>
                <p className="text-ink-3 text-[13.5px] sm:text-[14px] mt-4 leading-[1.6]">
                  Questions, pushback, or a problem that looks like this one?
                  Write to{" "}
                  <a
                    href="mailto:chai@analyticbytes.systems"
                    className="text-ink font-medium border-b border-line-2 hover:border-accent transition-colors no-underline pb-px"
                  >
                    chai@analyticbytes.systems
                  </a>
                  .
                </p>
              </div>
            </article>
          </div>
        </section>

        {/* PREV / NEXT — series navigation */}
        <section className="pb-32 border-t border-line pt-12">
          <div className="max-w-page mx-auto px-5 sm:px-8">
            <div className="max-w-[68ch]">
              <div className="font-mono text-[11px] text-ink-3 tracking-[0.18em] uppercase mb-6">
                Keep reading
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {prev ? (
                  <Link
                    href={`/library/${prev.slug}`}
                    className="group block rounded-md border border-line hover:border-accent/40 hover:bg-bg-alt transition-all p-5 no-underline"
                  >
                    <div className="font-mono text-[11px] text-ink-3 tracking-[0.04em] uppercase mb-2">
                      ←&nbsp;&nbsp;{prev.kind === "essay" ? "Essay" : "Field Note"} {prev.number}
                    </div>
                    <div className="text-ink text-[16px] sm:text-[17px] font-bold tracking-[-0.015em] leading-[1.3] group-hover:text-accent transition-colors">
                      {prev.title}
                    </div>
                  </Link>
                ) : (
                  <div className="hidden sm:block" aria-hidden />
                )}
                {next ? (
                  <Link
                    href={`/library/${next.slug}`}
                    className="group block rounded-md border border-line hover:border-accent/40 hover:bg-bg-alt transition-all p-5 no-underline sm:text-right"
                  >
                    <div className="font-mono text-[11px] text-ink-3 tracking-[0.04em] uppercase mb-2">
                      {next.kind === "essay" ? "Essay" : "Field Note"} {next.number}&nbsp;&nbsp;→
                    </div>
                    <div className="text-ink text-[16px] sm:text-[17px] font-bold tracking-[-0.015em] leading-[1.3] group-hover:text-accent transition-colors">
                      {next.title}
                    </div>
                  </Link>
                ) : (
                  <div className="hidden sm:block" aria-hidden />
                )}
              </div>
              <div className="mt-8">
                <Link
                  href="/library"
                  className="inline-flex items-center gap-2 text-ink font-medium text-[14px] no-underline border-b border-line-2 hover:border-accent pb-px transition-colors"
                >
                  All essays, artifacts &amp; field notes&nbsp;→
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
