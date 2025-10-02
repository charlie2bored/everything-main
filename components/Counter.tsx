'use client'

import { useEffect, useRef, useState } from 'react'

/**
 * Counter: animates from 0 to target when in view; reduced-motion safe.
 */
export default function Counter({ value, duration = 1200 }: { value: number | string, duration?: number }) {
  const ref = useRef<HTMLSpanElement>(null)
  const [display, setDisplay] = useState('0')

  useEffect(() => {
    const node = ref.current
    if (!node) return

    const end = typeof value === 'string' ? parseFloat(value.replace(/[^\d.-]/g, '')) : value
    if (!isFinite(end)) { setDisplay(String(value)); return }

    let startTime = 0
    const preferReduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const total = preferReduce ? 0 : duration

    const step = (t: number) => {
      if (!startTime) startTime = t
      const p = total === 0 ? 1 : Math.min((t - startTime) / total, 1)
      const current = Math.round((end as number) * p)
      setDisplay(current.toString())
      if (p < 1) requestAnimationFrame(step)
    }

    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        requestAnimationFrame(step)
        io.disconnect()
      }
    }, { threshold: 0.3 })
    io.observe(node)
    return () => io.disconnect()
  }, [value, duration])

  return <span ref={ref}>{display}{typeof value === 'string' && /%|\+$/.test(value as string) ? (value as string).replace(/[\d.\-]/g, '') : ''}</span>
}


