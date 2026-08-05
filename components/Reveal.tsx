"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

type Props = { children: ReactNode; className?: string };

export default function Reveal({ children, className = "" }: Props) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    // threshold: 0 so we fire as soon as any part of the element enters
    // the viewport. A larger threshold (e.g. 0.12) silently breaks on
    // very tall wrapped sections — a viewport-sized slice of a
    // 12,000px-tall wrapper is well under 12% of the element, so the
    // callback never fires and the content stays at opacity 0 forever.
    // rootMargin: "0px 0px -10% 0px" nudges reveal to trigger slightly
    // before the top edge crosses in, which feels less abrupt.
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setShown(true);
            io.disconnect();
          }
        });
      },
      { threshold: 0, rootMargin: "0px 0px -10% 0px" }
    );
    io.observe(node);
    // Safety net: if IO never fires for any reason (older browsers,
    // ad-blockers that stub it, or a hydration race with tall pages),
    // reveal after a short delay so the page can never be permanently
    // stuck at opacity 0.
    const failsafe = window.setTimeout(() => setShown(true), 400);
    return () => {
      window.clearTimeout(failsafe);
      io.disconnect();
    };
  }, []);

  return (
    <div ref={ref} className={`reveal ${shown ? "in" : ""} ${className}`}>
      {children}
    </div>
  );
}
