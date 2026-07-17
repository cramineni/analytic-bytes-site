import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ARTIFACTS, type Artifact } from "../../artifacts-data";

const SITE = "https://analyticbytes.systems";

function firstSentence(s: string): string {
  const trimmed = s.trim();
  const m = trimmed.match(/^[^.?!]*[.?!]/);
  return (m ? m[0] : trimmed).trim();
}

function truncate(s: string, n: number): string {
  if (s.length <= n) return s;
  return s.slice(0, n - 1).trimEnd() + "…";
}

function findArtifact(slug: string): {
  artifact: Artifact;
  index: number;
} | null {
  const index = ARTIFACTS.findIndex((a) => a.slug === slug);
  if (index === -1) return null;
  return { artifact: ARTIFACTS[index], index };
}

export function generateStaticParams() {
  return ARTIFACTS.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const found = findArtifact(slug);
  if (!found) return {};
  const { artifact } = found;
  const title = `${artifact.title} — Analytic Bytes`;
  const description = truncate(firstSentence(artifact.summary), 155);
  const url = `${SITE}/library/artifacts/${artifact.slug}`;
  const image = artifact.image;
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "article",
      url,
      images: [{ url: image, alt: artifact.title }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
  };
}

export default async function ArtifactPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const found = findArtifact(slug);
  if (!found) notFound();
  const { artifact, index } = found;
  const prev = index > 0 ? ARTIFACTS[index - 1] : null;
  const next = index < ARTIFACTS.length - 1 ? ARTIFACTS[index + 1] : null;

  return (
    <>
      <Nav />

      <main>
        {/* HEADER */}
        <section className="pt-20 pb-8 sm:pt-24 sm:pb-10">
          <div className="max-w-page mx-auto px-5 sm:px-8">
            <Reveal>
              <div className="max-w-[900px] mx-auto">
                <div className="font-mono text-[11.5px] text-ink-3 tracking-[0.04em]">
                  <Link
                    href="/library"
                    className="hover:text-accent no-underline"
                  >
                    Library
                  </Link>
                  <span>&nbsp;·&nbsp;</span>
                  <Link
                    href="/library/artifacts"
                    className="hover:text-accent no-underline"
                  >
                    Artifacts
                  </Link>
                  <span>&nbsp;·&nbsp;</span>
                  <span className="text-ink-2">{artifact.title}</span>
                </div>
                <div className="font-mono text-[11px] tracking-[0.18em] uppercase text-accent mt-6 mb-3">
                  Artifact
                </div>
                <h1 className="font-extrabold leading-[1.05] tracking-[-0.025em] text-[32px] sm:text-[44px] lg:text-[52px] text-ink max-w-[22ch]">
                  {artifact.title}
                </h1>
              </div>
            </Reveal>
          </div>
        </section>

        {/* SVG — full-bleed inside a comfortable max-width container */}
        <section className="pb-10">
          <div className="max-w-page mx-auto px-5 sm:px-8">
            <Reveal>
              <div className="max-w-[900px] mx-auto">
                <figure className="rounded-md overflow-hidden border border-line bg-white">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={artifact.image}
                    alt={artifact.title}
                    className="w-full h-auto block"
                  />
                </figure>
                {/* Action row */}
                <div className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-3">
                  <a
                    href={artifact.image}
                    download
                    className="inline-flex items-center gap-2 font-mono text-[12px] tracking-[0.06em] uppercase text-ink border border-line-2 hover:border-accent hover:text-accent rounded-sm px-3 py-2 no-underline transition-colors"
                  >
                    <span aria-hidden>↓</span>
                    Download SVG
                  </a>
                  <a
                    href={artifact.image}
                    target="_blank"
                    rel="noopener"
                    className="font-mono text-[12px] tracking-[0.06em] uppercase text-ink-3 hover:text-accent no-underline border-b border-line-2 hover:border-accent pb-px"
                  >
                    View full-size ↗
                  </a>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* SUMMARY */}
        <section className="pb-16">
          <div className="max-w-page mx-auto px-5 sm:px-8">
            <Reveal>
              <div className="max-w-[720px] mx-auto pt-8 border-t border-line">
                <p className="text-ink-2 text-[17px] sm:text-[18px] leading-[1.72]">
                  {artifact.summary}
                </p>
              </div>
            </Reveal>
          </div>
        </section>

        {/* REFERENCED IN */}
        {artifact.referencedIn && artifact.referencedIn.length > 0 ? (
          <section className="pb-16">
            <div className="max-w-page mx-auto px-5 sm:px-8">
              <Reveal>
                <div className="max-w-[720px] mx-auto pt-8 border-t border-line">
                  <div className="font-mono text-[11px] text-accent tracking-[0.18em] uppercase mb-4">
                    Referenced in
                  </div>
                  <ul className="list-none p-0 m-0 space-y-3">
                    {artifact.referencedIn.map((ref) => (
                      <li key={ref.slug}>
                        <Link
                          href={`/library/${ref.slug}`}
                          className="text-ink hover:text-accent no-underline border-b border-line-2 hover:border-accent pb-px text-[15.5px] sm:text-[16px]"
                        >
                          {ref.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            </div>
          </section>
        ) : null}

        {/* PREV / NEXT */}
        <section className="pb-32">
          <div className="max-w-page mx-auto px-5 sm:px-8">
            <Reveal>
              <div className="max-w-[900px] mx-auto pt-8 border-t border-line grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  {prev ? (
                    <Link
                      href={`/library/artifacts/${prev.slug}`}
                      className="group block no-underline"
                    >
                      <div className="font-mono text-[11px] tracking-[0.18em] uppercase text-ink-3 mb-2">
                        ← Previous
                      </div>
                      <div className="text-ink text-[15.5px] sm:text-[16px] font-semibold group-hover:text-accent transition-colors leading-[1.35]">
                        {prev.title}
                      </div>
                    </Link>
                  ) : null}
                </div>
                <div className="sm:text-right">
                  {next ? (
                    <Link
                      href={`/library/artifacts/${next.slug}`}
                      className="group block no-underline"
                    >
                      <div className="font-mono text-[11px] tracking-[0.18em] uppercase text-ink-3 mb-2">
                        Next →
                      </div>
                      <div className="text-ink text-[15.5px] sm:text-[16px] font-semibold group-hover:text-accent transition-colors leading-[1.35]">
                        {next.title}
                      </div>
                    </Link>
                  ) : null}
                </div>
              </div>
              <div className="max-w-[900px] mx-auto mt-8 text-center">
                <Link
                  href="/library/artifacts"
                  className="font-mono text-[12px] tracking-[0.06em] uppercase text-ink-3 hover:text-accent no-underline"
                >
                  ← All artifacts
                </Link>
              </div>
            </Reveal>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
