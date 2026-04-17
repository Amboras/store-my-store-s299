'use client'

import { useState, useEffect } from 'react'
import { Clock, Flame } from 'lucide-react'

export default function UrgencyTimer() {
  // Static "sale ends in" countdown — resets to ~6 hours each page load
  const [timeLeft, setTimeLeft] = useState({ hours: 5, minutes: 47, seconds: 23 })

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        let { hours, minutes, seconds } = prev
        seconds -= 1
        if (seconds < 0) {
          seconds = 59
          minutes -= 1
        }
        if (minutes < 0) {
          minutes = 59
          hours -= 1
        }
        if (hours < 0) {
          // Reset loop
          return { hours: 5, minutes: 59, seconds: 59 }
        }
        return { hours, minutes, seconds }
      })
    }, 1000)
    return () => clearInterval(interval)
  }, [])

  const pad = (n: number) => String(n).padStart(2, '0')

  return (
    <div
      className="flex items-center gap-3 rounded-xl px-4 py-3 border"
      style={{
        backgroundColor: 'rgba(232,91,4,0.06)',
        borderColor: 'rgba(232,91,4,0.25)',
      }}
    >
      <div className="flex items-center gap-1.5" style={{ color: 'var(--brand-primary)' }}>
        <Flame className="h-4 w-4 flex-shrink-0" fill="currentColor" />
        <span className="text-xs font-bold uppercase tracking-wide">Flash Sale</span>
      </div>
      <div className="flex items-center gap-1.5 flex-1">
        <Clock className="h-3.5 w-3.5 text-muted-foreground flex-shrink-0" />
        <span className="text-xs text-muted-foreground">Ends in</span>
        <div className="flex items-center gap-1">
          {[pad(timeLeft.hours), pad(timeLeft.minutes), pad(timeLeft.seconds)].map((unit, i) => (
            <span key={i} className="flex items-center gap-0.5">
              <span
                className="inline-flex h-7 w-8 items-center justify-center rounded text-sm font-bold tabular-nums"
                style={{ backgroundColor: 'var(--brand-secondary)', color: 'white' }}
              >
                {unit}
              </span>
              {i < 2 && <span className="text-muted-foreground font-bold text-sm">:</span>}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}
