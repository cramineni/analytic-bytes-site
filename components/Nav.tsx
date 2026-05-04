"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Brand } from "./Logo";

// Single source of truth — update Calendly URL here if it ever changes
const CALENDLY_URL = "https://calendly.com/chaitanya-ramineni/30min";

const links = [
  { href: "/#architecture", label: "Architecture" },
  { href: "/#arc", label: "Operating Arc" },
  { href: "/case-studies", label: "Proof" },
  { href: "/#work", label: "Work" },
  { href: "/library", label: "Library" },
  { href: "/about", label: "About" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`sticky top-0 z-50 backdrop-blur-md backdrop-saturate-150 bg-bg/78 border-b transition-colors ${
        scrolled ? "border-line" : "border-transparent"
      }`}
    >
      <div className="max-w-page mx-auto px-5 sm:px-8 flex items-center justify-between gap-6 py-[18px]">
        <Link href="/" className="no-underline text-ink">
          <Brand />
        </Link>
        <div className="flex items-center gap-9">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="hidden md:inline text-ink-2 hover:text-ink text-[14.5px] font-medium transition-colors"
            >
              {l.label}
            </a>
          ))}
          <a
            href={CALENDLY_URL}
            target="_blank"
            rel="noopener"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-md bg-accent text-white font-semibold text-[13.5px] hover:bg-accent-2 hover:-translate-y-px transition-all border border-accent"
          >
            Let&rsquo;s talk <span aria-hidden>→</span>
          </a>
        </div>
      </div>
    </nav>
  );
}
