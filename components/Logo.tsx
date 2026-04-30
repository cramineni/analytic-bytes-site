"use client";

import { useState } from "react";

/**
 * AB monogram. Tries to load /public/logo.png first.
 * If logo.png is missing, falls back to the inline SVG approximation.
 *
 * To use your real artwork: drop your monogram as `public/logo.png`.
 */

type LogoProps = { className?: string; height?: number; gradientId?: string };

export default function Logo({
  className = "",
  height = 64,
  gradientId = "abG",
}: LogoProps) {
  const [imgFailed, setImgFailed] = useState(false);

  if (!imgFailed) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src="/logo.png"
        alt="Analytic Bytes"
        style={{ height: `${height}px`, width: "auto", display: "block" }}
        className={className}
        onError={() => setImgFailed(true)}
      />
    );
  }

  return (
    <svg
      className={className}
      style={{ height: `${height}px`, width: "auto", display: "block" }}
      viewBox="0 0 64 56"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Analytic Bytes"
      role="img"
    >
      <defs>
        <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0EA5E9" />
          <stop offset="100%" stopColor="#0369A1" />
        </linearGradient>
      </defs>
      <path
        d="M 2 54 L 26 2 L 30 2 L 54 54 L 44 54 L 28 16 L 12 54 Z M 22 38 L 34 38 L 28 26 Z"
        fill={`url(#${gradientId})`}
        fillRule="evenodd"
      />
      <path
        d="M 36 2 L 56 2 L 62 8 L 62 22 L 58 26 L 62 30 L 62 48 L 56 54 L 36 54 Z
           M 42 8 L 42 22 L 54 22 L 56 20 L 56 10 L 54 8 Z
           M 42 30 L 42 48 L 54 48 L 56 46 L 56 32 L 54 30 Z"
        fill={`url(#${gradientId})`}
        fillRule="evenodd"
        opacity="0.95"
      />
    </svg>
  );
}

/**
 * Custom-built wordmark using JetBrains Mono with wide tracking. Scales sharp at any size.
 */
export function Wordmark({ className = "", height = 13 }: { className?: string; height?: number }) {
  return (
    <svg
      className={className}
      style={{ height: `${height}px`, width: "auto", display: "block" }}
      viewBox="0 0 220 14"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Analytic Bytes"
      role="img"
    >
      <text
        x="0"
        y="11"
        fontFamily="var(--font-jetbrains), JetBrains Mono, monospace"
        fontSize="11"
        fontWeight="500"
        letterSpacing="2.4"
        fill="#06101F"
      >
        ANALYTIC BYTES
      </text>
    </svg>
  );
}

/** Brand block: Logo + Wordmark + descriptor (used in nav). */
export function Brand() {
  return (
    <div className="flex items-center gap-3">
      <Logo height={64} />
      <div className="flex flex-col gap-[3px]">
        <Wordmark height={13} />
        <div className="font-mono text-[11px] text-ink-3 tracking-[0.04em] uppercase whitespace-nowrap hidden md:block">
          Decision Systems Architecture
        </div>
      </div>
    </div>
  );
}
