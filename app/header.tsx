'use client'
import Link from 'next/link'
import { TextLoop } from '@/components/ui/text-loop'

export function Header() {
  return (
    <header className="mb-8 flex items-center justify-between">
      <div>
        <Link href="/" className="font-medium" style={{ color: 'hsl(var(--foreground))' }}>
          Kris Yotam
        </Link>
        <TextLoop
          className="text-sm"
          interval={3}
          transition={{
            duration: 0.6,
            ease: [0.16, 1, 0.3, 1],
          }}
          variants={{
            initial: { opacity: 0, y: 6, filter: 'blur(4px)' },
            animate: { opacity: 1, y: 0, filter: 'blur(0px)' },
            exit:    { opacity: 0, y: -6, filter: 'blur(4px)' },
          }}
        >
          {[
            'Security Researcher',
            'Pentester',
            'Systems Engineer',
            'Network Engineer',
            'Full-Stack Developer',
            'Cloud Engineer',
            'Software Engineer',
            'Prompt Engineer',
          ].map((t) => (
            <span key={t} style={{ color: 'hsl(var(--muted-foreground))' }}>
              {t}
            </span>
          ))}
        </TextLoop>
      </div>
    </header>
  )
}
