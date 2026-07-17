import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";
import type { Metadata } from "next";
import Link from "next/link";
import { ARTIFACTS, type Artifact } from "../artifacts-data";

export const metadata: Metadata = {
  title: "Artifacts — Analytic Bytes Library",
  description:
    "Diagrams, tables, and frames from the Analytic Bytes library — one dedicated page per artifact, with download and cross-links to the essays that reference them.",
  openGraph: {
    title: "Artifacts — Analytic Bytes Library",
    description:
      "Diagrams, tables, and frames from the analytical work. One dedicated page per artifact, with download and essay cross-links.",
    url: "https://analyticbytes.systems/library/artifacts",
    type: "article",
    images: [{ url: "https://analyticbytes.systems/og-artifacts.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Artifacts — Analytic Bytes Library",
    description:
      "Diagrams, tables, and frames from the analytical work.",
    images: ["https://analyticbytes.systems/og-artifacts.png"],
  },
};

function firstSentence(s: string): string {
  const trimmed = s.trim();
  // First sentence ends at ". ", "? ", or "! " — keep the terminator.
  const m = trimmed.match(/^[^.?!]*[.?!]/);
  return (m ? m[0] : trimmed).trim();
}

export default function ArtifactsIndexPage() {
  return (
    <>
      <Nav />

      <main>
        {/* HEADER */}
        <section className="pt-20 pb-10 sm:pt-24 sm:pb-14">
          <div className="max-w-page mx-auto px-5 sm:px-8">
            <Reveal>
              <div className="font-mono text-[12px] text-ink-3">
                <span className="text-accent">●</span>
                &nbsp;&nbsp;Library&nbsp;&nbsp;·&nbsp;&nbsp;Artifacts
              </div>
              <h1 className="font-extrabold leading-[0.95] tracking-[-0.035em] mt-6 text-[44px] sm:text-[68px] lg:text-[84px] text-ink max-w-[18ch]">
                <span className="text-accent">Artifacts.</span>
              </h1>
              <p className="text-ink-2 text-[17px] max-w-[640px] mt-6 leading-[1.55]">
                Diagrams, tables, and frames from the analytical work. Each
                artifact stands on its own and travels between decks,
                one-pagers, and conversations. Most also appear inside one
                or more library essays; those essay pages link back here.
              </p>
              <p className="text-ink-3 text-[14.5px] sm:text-[15px] max-w-[640px] mt-4 leading-[1.6]">
                {ARTIFACTS.length} artifacts, each on its own page with a
                downloadable SVG and cross-links back to the essays that
                cite it.
              </p>
            </Reveal>
          </div>
        </section>

        {/* GRID */}
        <section className="pb-32">
          <div className="max-w-page mx-auto px-5 sm:px-8">
            <Reveal>
              <div className="border-t border-line pt-10">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-14">
                  {ARTIFACTS.map((a) => (
                    <ArtifactCard key={a.slug} artifact={a} />
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}

function ArtifactCard({ artifact }: { artifact: Artifact }) {
  return (
    <Link
      href={`/library/artifacts/${artifact.slug}`}
      className="group block no-underline"
    >
      <div className="rounded-md overflow-hidden border border-line bg-bg-alt mb-4 group-hover:border-line-2 transition-colors">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={artifact.image}
          alt={artifact.title}
          className="w-full h-auto block"
          loading="lazy"
        />
      </div>
      <div className="font-mono text-[11px] tracking-[0.18em] uppercase text-accent mb-2">
        Artifact
      </div>
      <h3 className="text-[18px] sm:text-[20px] font-bold tracking-[-0.015em] text-ink leading-[1.3] group-hover:text-accent transition-colors">
        {artifact.title}
      </h3>
      <p className="text-ink-2 text-[14px] sm:text-[15px] leading-[1.55] mt-2 max-w-[60ch]">
        {firstSentence(artifact.summary)}
      </p>
    </Link>
  );
}
