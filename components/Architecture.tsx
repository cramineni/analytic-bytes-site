import Reveal from "./Reveal";

/**
 * The Architecture section — full-bleed animated decision flow.
 * Signal → Interpretation → Decision → Action with a pulse traveling left to right.
 */
export default function Architecture() {
  return (
    <section className="architecture-section pt-24 pb-32 sm:pt-28 sm:pb-36 border-t border-line mt-14" id="architecture">
      <div className="max-w-page mx-auto px-5 sm:px-8">
        <Reveal>
          <div className="flex flex-wrap items-start justify-between gap-6 mb-12">
            <div className="flex items-start gap-6">
              <div className="font-mono text-[12px] text-ink-3">
                01<span className="opacity-50 mx-1.5">/</span>
                <span className="opacity-50">05</span>
              </div>
              <div>
                <div className="font-mono text-[11px] text-ink-2">Architecture</div>
                <div className="font-mono text-[11px] text-ink-3 mt-1.5">
                  The decision system, in motion.
                </div>
              </div>
            </div>
            <div className="font-mono text-[11px] text-ink-3 text-right leading-[1.7]">
              DECISION FLOW
              <br />
              <span className="text-accent">● LIVE</span>
            </div>
          </div>
        </Reveal>
      </div>

      <Reveal>
        <div className="arch-bleed">
          <div className="arch-svg-wrap">
            <svg
              className="arch-svg"
              viewBox="0 0 1400 380"
              preserveAspectRatio="xMidYMid meet"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <radialGradient id="actionGlowGrad">
                  <stop offset="0%" stopColor="#0EA5E9" stopOpacity="0.5" />
                  <stop offset="60%" stopColor="#0EA5E9" stopOpacity="0.08" />
                  <stop offset="100%" stopColor="#0EA5E9" stopOpacity="0" />
                </radialGradient>
                <pattern id="dotgrid" x="0" y="0" width="32" height="32" patternUnits="userSpaceOnUse">
                  <circle cx="2" cy="2" r="0.9" fill="#06101F" opacity="0.06" />
                </pattern>
              </defs>

              <rect x="0" y="40" width="1400" height="300" fill="url(#dotgrid)" />

              <path
                d="M 0 190 Q 50 130, 100 190 T 200 190 T 300 190 L 340 190"
                stroke="#7A8499" strokeWidth="1.4" fill="none" opacity="0.6"
              />
              <path
                d="M 0 150 Q 50 220, 100 150 T 200 170 T 300 180 L 340 190"
                stroke="#7A8499" strokeWidth="0.9" fill="none" opacity="0.4"
              />
              <path
                d="M 0 230 Q 50 160, 100 230 T 200 210 T 300 200 L 340 190"
                stroke="#7A8499" strokeWidth="0.9" fill="none" opacity="0.4"
              />

              <g opacity="0.7">
                <circle cx="30" cy="100" r="1.8" fill="#7A8499" />
                <circle cx="80" cy="270" r="1.8" fill="#7A8499" opacity="0.7" />
                <circle cx="140" cy="90" r="1.8" fill="#7A8499" opacity="0.5" />
                <circle cx="60" cy="300" r="1.8" fill="#7A8499" opacity="0.5" />
                <circle cx="180" cy="280" r="1.8" fill="#7A8499" opacity="0.6" />
                <circle cx="220" cy="110" r="1.8" fill="#7A8499" opacity="0.45" />
                <circle cx="270" cy="260" r="1.8" fill="#7A8499" opacity="0.5" />
                <circle cx="40" cy="200" r="1.5" fill="#7A8499" opacity="0.35" />
                <circle cx="160" cy="220" r="1.5" fill="#7A8499" opacity="0.35" />
              </g>

              <line x1="340" y1="190" x2="1300" y2="190" stroke="#3A4658" strokeWidth="1.2" opacity="0.5" />

              <line x1="340" y1="210" x2="340" y2="218" stroke="#3A4658" strokeWidth="1" opacity="0.5" />
              <line x1="660" y1="210" x2="660" y2="218" stroke="#3A4658" strokeWidth="1" opacity="0.5" />
              <line x1="980" y1="210" x2="980" y2="218" stroke="#3A4658" strokeWidth="1" opacity="0.5" />
              <line x1="1300" y1="210" x2="1300" y2="218" stroke="#0EA5E9" strokeWidth="1.2" opacity="0.8" />

              <circle className="arch-pulse" cx="340" cy="190" r="6" fill="#0EA5E9">
                <animate attributeName="r" values="6;10;6" dur="0.6s" repeatCount="indefinite" />
              </circle>

              <rect className="arch-node-1" x="333" y="183" width="14" height="14" fill="#3A4658" />
              <rect className="arch-node-2" x="653" y="183" width="14" height="14" fill="#3A4658" />
              <rect className="arch-node-3" x="973" y="183" width="14" height="14" fill="#3A4658" />

              <circle className="arch-action-glow" cx="1300" cy="190" r="60" fill="url(#actionGlowGrad)" />
              <rect className="arch-action-square" x="1288" y="178" width="24" height="24" fill="#0EA5E9" />
              <rect x="1282" y="172" width="36" height="36" fill="none" stroke="#0EA5E9" strokeWidth="1.2" opacity="0.5" />

              <text x="340" y="148" fontFamily="JetBrains Mono, monospace" fontSize="14" fill="#7A8499" textAnchor="middle" letterSpacing="0.5">01</text>
              <text x="660" y="148" fontFamily="JetBrains Mono, monospace" fontSize="14" fill="#7A8499" textAnchor="middle" letterSpacing="0.5">02</text>
              <text x="980" y="148" fontFamily="JetBrains Mono, monospace" fontSize="14" fill="#7A8499" textAnchor="middle" letterSpacing="0.5">03</text>
              <text x="1300" y="142" fontFamily="JetBrains Mono, monospace" fontSize="15" fill="#0EA5E9" textAnchor="middle" fontWeight="500" letterSpacing="0.5">04</text>

              <text x="340" y="252" fontFamily="Inter, sans-serif" fontSize="26" fontWeight="800" fill="#06101F" textAnchor="middle" letterSpacing="-0.025em">Signal</text>
              <text x="660" y="252" fontFamily="Inter, sans-serif" fontSize="26" fontWeight="800" fill="#06101F" textAnchor="middle" letterSpacing="-0.025em">Interpretation</text>
              <text x="980" y="252" fontFamily="Inter, sans-serif" fontSize="26" fontWeight="800" fill="#06101F" textAnchor="middle" letterSpacing="-0.025em">Decision</text>
              <text x="1300" y="252" fontFamily="Inter, sans-serif" fontSize="26" fontWeight="800" fill="#0EA5E9" textAnchor="middle" letterSpacing="-0.025em">Action</text>

              <text x="340" y="284" fontFamily="JetBrains Mono, monospace" fontSize="12" fill="#7A8499" textAnchor="middle">data, patterns</text>
              <text x="660" y="284" fontFamily="JetBrains Mono, monospace" fontSize="12" fill="#7A8499" textAnchor="middle">context, judgment</text>
              <text x="980" y="284" fontFamily="JetBrains Mono, monospace" fontSize="12" fill="#7A8499" textAnchor="middle">choice, owner</text>
              <text x="1300" y="284" fontFamily="JetBrains Mono, monospace" fontSize="12" fill="#7A8499" textAnchor="middle">execution, rhythm</text>

              <text x="0" y="28" fontFamily="JetBrains Mono, monospace" fontSize="12" fill="#B7BFCE">noise</text>
              <text x="1400" y="28" fontFamily="JetBrains Mono, monospace" fontSize="12" fill="#B7BFCE" textAnchor="end">outcome</text>
              <text x="0" y="362" fontFamily="JetBrains Mono, monospace" fontSize="11" fill="#B7BFCE">PHASE.0 :: INTAKE</text>
              <text x="1400" y="362" fontFamily="JetBrains Mono, monospace" fontSize="11" fill="#B7BFCE" textAnchor="end">PHASE.4 :: SHIPPED</text>
            </svg>

            {/* Learning loop indicator */}
            <div className="flex justify-center items-center mt-6 py-3 font-mono text-[11px] text-accent tracking-[0.18em] uppercase">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2.5">
                <path d="M3 12a9 9 0 0 1 15.5-6.3L21 8" />
                <path d="M21 3v5h-5" />
                <path d="M21 12a9 9 0 0 1-15.5 6.3L3 16" />
                <path d="M3 21v-5h5" />
              </svg>
              <span className="text-ink-3">Action feeds the next signal&nbsp;&nbsp;·&nbsp;&nbsp;</span>&nbsp;Learning loop
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
