import './DataTrails.css'

const PATHS = [
  'M10,170 C120,110 180,200 300,120 S480,40 560,70',
  'M20,40 C140,90 220,20 320,80 S470,160 570,130',
  'M0,110 C100,60 200,150 310,100 S460,90 580,100',
]

/**
 * Decorative curved "data trail" lines flowing toward the dashboard visual,
 * with small glowing dots animated continuously along each curve via CSS.
 * Purely visual — marked aria-hidden and skipped under reduced motion
 * (handled globally in index.css, which halts the animation but leaves the
 * static curves visible).
 */
export default function DataTrails() {
  return (
    <svg className="data-trails" viewBox="0 0 580 210" aria-hidden="true" preserveAspectRatio="none">
      <defs>
        <linearGradient id="trailGradient" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#22d3ee" stopOpacity="0" />
          <stop offset="50%" stopColor="#22d3ee" stopOpacity="0.55" />
          <stop offset="100%" stopColor="#a78bfa" stopOpacity="0.55" />
        </linearGradient>
      </defs>

      {PATHS.map((d, i) => (
        <g key={i}>
          <path d={d} className="data-trails__line" stroke="url(#trailGradient)" />
          <path
            d={d}
            className="data-trails__dots"
            style={{ animationDelay: `${i * -1.3}s` }}
          />
        </g>
      ))}
    </svg>
  )
}
