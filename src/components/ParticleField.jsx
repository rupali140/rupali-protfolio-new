import { useEffect, useRef } from 'react'

const COLORS = [
  { r: 34, g: 211, b: 238 }, // cyan
  { r: 167, g: 139, b: 250 }, // violet
]

/**
 * Lightweight canvas particle field: a handful of soft dots drifting slowly
 * and pulsing gently. Intentionally cheap — no physics library, no trails
 * buffer, capped particle count, and a single requestAnimationFrame loop.
 */
export default function ParticleField({ reducedMotion, density = 42 }) {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    let width = 0
    let height = 0
    let dpr = Math.min(window.devicePixelRatio || 1, 2)
    let particles = []
    let frameId = null
    let startTime = performance.now()

    function resize() {
      const parent = canvas.parentElement
      width = parent.clientWidth
      height = parent.clientHeight
      dpr = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width = width * dpr
      canvas.height = height * dpr
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }

    function makeParticles() {
      const count = reducedMotion ? Math.round(density / 2) : density
      particles = Array.from({ length: count }, () => {
        const color = COLORS[Math.random() < 0.5 ? 0 : 1]
        return {
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.12,
          vy: (Math.random() - 0.5) * 0.12,
          r: 1 + Math.random() * 2.2,
          phase: Math.random() * Math.PI * 2,
          color,
        }
      })
    }

    function drawFrame(elapsed) {
      ctx.clearRect(0, 0, width, height)
      particles.forEach((p) => {
        if (!reducedMotion) {
          p.x += p.vx
          p.y += p.vy
          if (p.x < -10) p.x = width + 10
          if (p.x > width + 10) p.x = -10
          if (p.y < -10) p.y = height + 10
          if (p.y > height + 10) p.y = -10
        }
        const pulse = reducedMotion ? 0.6 : 0.45 + 0.4 * Math.sin(elapsed / 1400 + p.phase)
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(${p.color.r}, ${p.color.g}, ${p.color.b}, ${pulse.toFixed(3)})`
        ctx.fill()
      })
    }

    function loop(now) {
      drawFrame(now - startTime)
      frameId = requestAnimationFrame(loop)
    }

    resize()
    makeParticles()

    if (reducedMotion) {
      drawFrame(0)
    } else {
      frameId = requestAnimationFrame(loop)
    }

    const onResize = () => {
      resize()
      makeParticles()
      if (reducedMotion) drawFrame(0)
    }
    window.addEventListener('resize', onResize)

    return () => {
      window.removeEventListener('resize', onResize)
      if (frameId) cancelAnimationFrame(frameId)
    }
  }, [reducedMotion, density])

  return <canvas ref={canvasRef} className="particle-field" aria-hidden="true" />
}
