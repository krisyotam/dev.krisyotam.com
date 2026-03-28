'use client'
import { useEffect, useState, useCallback } from 'react'
import { useTheme } from 'next-themes'
import { sounds } from '@/lib/sounds'

function useDateTime(tz: string) {
  const [val, setVal] = useState('')
  useEffect(() => {
    const fmt = () => {
      const now = new Date()
      const time = now.toLocaleTimeString('en-GB', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
        timeZone: tz,
      })
      const y = now.toLocaleDateString('en-CA', { year: 'numeric', timeZone: tz })
      const m = now.toLocaleDateString('en-CA', { month: '2-digit', timeZone: tz })
      const d = now.toLocaleDateString('en-CA', { day: '2-digit', timeZone: tz })
      return `${y}.${m}.${d} ${time}`
    }
    setVal(fmt())
    const id = setInterval(() => setVal(fmt()), 1000)
    return () => clearInterval(id)
  }, [tz])
  return val
}

function PulseDot() {
  return (
    <span className="relative inline-flex h-1.5 w-1.5 shrink-0">
      <span
        className="absolute inline-flex h-full w-full animate-ping rounded-full opacity-60"
        style={{ animationDuration: '2s', backgroundColor: 'hsl(var(--muted-foreground))' }}
      />
      <span
        className="relative inline-flex h-1.5 w-1.5 rounded-full"
        style={{ backgroundColor: 'hsl(var(--muted-foreground))' }}
      />
    </span>
  )
}

function IconButton({
  label,
  children,
  onClick,
}: {
  label: string
  children: React.ReactNode
  onClick?: () => void
}) {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      className="inline-flex h-7 w-7 items-center justify-center rounded-lg transition-colors duration-100"
      style={{ color: 'hsl(var(--muted-foreground))' }}
      onMouseEnter={(e) => {
        sounds.tick()
        e.currentTarget.style.backgroundColor = 'hsl(var(--muted))'
        e.currentTarget.style.color = 'hsl(var(--foreground))'
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.backgroundColor = 'transparent'
        e.currentTarget.style.color = 'hsl(var(--muted-foreground))'
      }}
    >
      <svg
        className="h-4 w-4"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {children}
      </svg>
    </button>
  )
}

export function Footer() {
  const dateTime = useDateTime('America/Chicago')
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])

  const toggleTheme = useCallback(() => {
    setTheme(theme === 'dark' ? 'light' : 'dark')
  }, [theme, setTheme])

  return (
    <footer className="mt-24 px-0 py-3" style={{ borderTop: '1px solid hsl(var(--border))' }}>
      <div className="flex items-center justify-between">
        <div className="text-xs font-mono" style={{ color: 'hsl(var(--muted-foreground))' }}>
          <span className="inline-flex items-center gap-1.5">
            <PulseDot />
            {dateTime} in Naperville, IL
          </span>
        </div>

        <div className="flex items-center gap-1">
          <a href="https://krisyotam.com/rss.xml" target="_blank" rel="noopener noreferrer">
            <IconButton label="RSS feed">
              <path d="M4 4h2a14 14 0 0 1 14 14v2" />
              <path d="M4 10h2a8 8 0 0 1 8 8v2" />
              <circle cx="6" cy="18" r="2" fill="currentColor" />
            </IconButton>
          </a>
          <a href="https://github.com/krisyotam" target="_blank" rel="noopener noreferrer">
            <IconButton label="GitHub">
              <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
            </IconButton>
          </a>
          {mounted && (
            <IconButton label="Toggle theme" onClick={toggleTheme}>
              {theme === 'dark' ? (
                <>
                  <circle cx="12" cy="12" r="5" />
                  <line x1="12" y1="1" x2="12" y2="3" />
                  <line x1="12" y1="21" x2="12" y2="23" />
                  <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
                  <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                  <line x1="1" y1="12" x2="3" y2="12" />
                  <line x1="21" y1="12" x2="23" y2="12" />
                  <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
                  <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
                </>
              ) : (
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
              )}
            </IconButton>
          )}
        </div>
      </div>
    </footer>
  )
}
