import { useEffect, useRef, useState } from 'react'

/**
 * Animates a number counting up to `target` whenever `cycleKey` changes.
 * Used to sync KPI tiles with the revenue chart's draw/reset loop.
 * With reduced motion, jumps straight to the target value.
 */
export default function useCountUp(target, cycleKey, { duration = 1100, reducedMotion = false } = {}) {
  const [value, setValue] = useState(reducedMotion ? target : 0)
  const frame = useRef(null)

  useEffect(() => {
    if (reducedMotion) {
      setValue(target)
      return
    }

    const start = performance.now()
    const from = 0

    const tick = (now) => {
      const elapsed = now - start
      const progress = Math.min(elapsed / duration, 1)
      // ease-out cubic for a gentle, non-jarring finish
      const eased = 1 - Math.pow(1 - progress, 3)
      setValue(Math.round(from + (target - from) * eased))
      if (progress < 1) {
        frame.current = requestAnimationFrame(tick)
      }
    }

    frame.current = requestAnimationFrame(tick)
    return () => {
      if (frame.current) cancelAnimationFrame(frame.current)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cycleKey, target, reducedMotion, duration])

  return value
}
