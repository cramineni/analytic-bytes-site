import Logo, { Wordmark } from "./Logo";

const links = [
  { href: "/#architecture", label: "/architecture" },
  { href: "/#arc", label: "/arc" },
  { href: "/case-studies", label: "/proof" },
  { href: "/#work", label: "/work" },
  { href: "/library", label: "/library" },
  { href: "/about", label: "/about" },
  { href: "mailto:hello@analyticbytes.systems", label: "/contact" },
];

const LINKEDIN_URL = "https://www.linkedin.com/in/chaitanyaramineni/";

export default function Footer() {
  return (
    <footer className="border-t border-line py-12 text-ink-3">
      <div className="max-w-page mx-auto px-5 sm:px-8">
        <div className="flex flex-wrap items-end justify-between gap-8">
          <div>
            <div className="flex items-center gap-3">
              <Logo height={48} gradientId="abG-foot" />
              <Wordmark height={11} />
            </div>
            <div className="text-ink text-sm font-semibold mt-3.5 tracking-[-0.005em]">
              From fragmented to decision-ready.
            </div>
            <div className="font-mono text-ink-3 text-[11px] mt-1.5 tracking-[0.04em] uppercase">
              Decision Systems &middot; in 90-day arcs
            </div>
            {/* ABOUT — light footer line. Full bio lives at /about */}
            <div className="text-[13px] text-ink-2 mt-[18px] tracking-[-0.005em]">
              Built by{" "}
              <a
                href="/about"
                className="text-ink font-semibold border-b border-line-2 hover:border-accent transition-colors no-underline pb-px"
              >
                Chaitanya Ramineni
              </a>
              .
            </div>
          </div>
          <div className="flex gap-6 text-[12.5px] font-mono">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="text-ink-3 hover:text-ink no-underline transition-colors"
              >
                {l.label}
              </a>
            ))}
          </div>
        </div>
        <div className="text-[11px] text-ink-3 mt-8 font-mono tracking-[0.04em] uppercase">
          © {new Date().getFullYear()} Analytic Bytes — All rights reserved
        </div>
      </div>
    </footer>
  );
}
