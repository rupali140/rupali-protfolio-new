import { useEffect, useRef, useState } from 'react'
import useCountUp from '../hooks/useCountUp.js'
import './RevenueChart.css'

// SAMPLE DATA — replace with your own figures.
const MONTHLY_REVENUE = [32, 38, 35, 44, 41, 52, 49, 58, 55, 66, 70, 82] // $k
const KPIS = [
  { label: 'Total Revenue', target: 572, prefix: '$', suffix: 'k' },
  { label: 'YoY Growth', target: 34, prefix: '', suffix: '%' },
  { label: 'Avg. Deal Size', target: 8.4, prefix: '$', suffix: 'k', decimals: 1 },
]

const VB_W = 560
const VB_H = 200
const PAD = 16

function buildPath(values) {
  const max = Math.max(...values)
  const min = Math.min(...values)
  const range = max - min || 1
  const step = (VB_W - PAD * 2) / (values.length - 1)
  return values
    .map((v, i) => {
      const x = PAD + i * step
      const y = VB_H - PAD - ((v - min) / range) * (VB_H - PAD * 2)
      return `${i === 0 ? 'M' : 'L'}${x.toFixed(1)},${y.toFixed(1)}`
    })
    .join(' ')
}

const DRAW_MS = 2200
const HOLD_MS = 1400
const CYCLE_MS = DRAW_MS + HOLD_MS

function easeInOutCubic(t) {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2
}

export default function RevenueChart({ reducedMotion }) {
  const pathRef = useRef(null)
  const [length, setLength] = useState(0)
  const [offset, setOffset] = useState(0)
  const [cycle, setCycle] = useState(0)

  useEffect(() => {
    if (pathRef.current) {
      setLength(pathRef.current.getTotalLength())
    }
  }, [])

  useEffect(() => {
    if (reducedMotion || !length) {
      setOffset(0)
      return
    }

    let frameId = null
    let lastCycleIndex = -1

    const loop = (now) => {
      const elapsed = now % CYCLE_MS
      const cycleIndex = Math.floor(now / CYCLE_MS)

      if (cycleIndex !== lastCycleIndex) {
        lastCycleIndex = cycleIndex
        setCycle(cycleIndex)
      }

      if (elapsed < DRAW_MS) {
        const progress = easeInOutCubic(elapsed / DRAW_MS)
        setOffset(length * (1 - progress))
      } else {
        setOffset(0)
      }

      frameId = requestAnimationFrame(loop)
    }

    frameId = requestAnimationFrame(loop)
    return () => frameId && cancelAnimationFrame(frameId)
  }, [length, reducedMotion])

  const points = MONTHLY_REVENUE.map((v, i) => {
    const max = Math.max(...MONTHLY_REVENUE)
    const min = Math.min(...MONTHLY_REVENUE)
    const range = max - min || 1
    const step = (VB_W - PAD * 2) / (MONTHLY_REVENUE.length - 1)
    const x = PAD + i * step
    const y = VB_H - PAD - ((v - min) / range) * (VB_H - PAD * 2)
    return { x, y }
  })

  const lastPoint = points[points.length - 1]

  return (
    <div className="revenue-chart">
      <div className="revenue-chart__head">
        <span className="revenue-chart__title">Monthly Revenue</span>
        <span className="revenue-chart__badge">Sample data</span>
      </div>

      <svg viewBox={`0 0 ${VB_W} ${VB_H}`} className="revenue-chart__svg" role="img" aria-label="Monthly revenue trend, sample data, trending upward">
        <defs>
          <linearGradient id="revenueLine" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#22d3ee" />
            <stop offset="100%" stopColor="#a78bfa" />
          </linearGradient>
          <linearGradient id="revenueFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="rgba(34,211,238,0.28)" />
            <stop offset="100%" stopColor="rgba(34,211,238,0)" />
          </linearGradient>
        </defs>

        {/* horizontal gridlines */}
        {[0.25, 0.5, 0.75].map((f) => (
          <line
            key={f}
            x1={PAD}
            x2={VB_W - PAD}
            y1={PAD + f * (VB_H - PAD * 2)}
            y2={PAD + f * (VB_H - PAD * 2)}
            className="revenue-chart__grid"
          />
        ))}

        <path
          d={`${buildPath(MONTHLY_REVENUE)} L${lastPoint.x},${VB_H - PAD} L${PAD},${VB_H - PAD} Z`}
          fill="url(#revenueFill)"
          stroke="none"
          opacity={reducedMotion ? 1 : offset === 0 ? 1 : 0}
          style={{ transition: reducedMotion ? 'none' : 'opacity 0.4s ease' }}
        />

        <path
          ref={pathRef}
          d={buildPath(MONTHLY_REVENUE)}
          fill="none"
          stroke="url(#revenueLine)"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{
            strokeDasharray: length,
            strokeDashoffset: reducedMotion ? 0 : offset,
          }}
        />

        {points.map((p, i) => (
          <circle key={i} cx={p.x} cy={p.y} r="2.4" className="revenue-chart__dot" />
        ))}
      </svg>

      <div className="revenue-chart__kpis">
        {KPIS.map((kpi) => (
          <KpiTile key={kpi.label} kpi={kpi} cycle={cycle} reducedMotion={reducedMotion} />
        ))}
      </div>
    </div>
  )
}

function KpiTile({ kpi, cycle, reducedMotion }) {
  const multiplier = kpi.decimals ? Math.pow(10, kpi.decimals) : 1
  const raw = useCountUp(Math.round(kpi.target * multiplier), cycle, {
    duration: 1100,
    reducedMotion,
  })
  const display = kpi.decimals ? (raw / multiplier).toFixed(kpi.decimals) : raw

  return (
    <div className="revenue-chart__kpi">
      <span className="revenue-chart__kpi-value">
        {kpi.prefix}
        {display}
        {kpi.suffix}
      </span>
      <span className="revenue-chart__kpi-label">{kpi.label}</span>
    </div>
  )
}
