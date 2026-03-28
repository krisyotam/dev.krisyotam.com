'use client'
import { TextEffect } from '@/components/ui/text-effect'
import Link from 'next/link'

export function Header() {
  return (
    <header className="mb-8 flex items-center justify-between">
      <div>
        <Link href="/" className="font-medium" style={{ color: 'hsl(var(--foreground))' }}>
          Kris Yotam
        </Link>
        <TextEffect
          as="p"
          preset="fade"
          per="char"
          className=""
          style={{ color: 'hsl(var(--muted-foreground))' }}
          delay={0.5}
        >
          Systems Engineer
        </TextEffect>
      </div>
    </header>
  )
}
