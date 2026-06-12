'use client'
import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import {
  MorphingDialog,
  MorphingDialogTrigger,
  MorphingDialogContent,
  MorphingDialogClose,
  MorphingDialogContainer,
} from '@/components/ui/morphing-dialog'
import { XIcon, SearchIcon } from 'lucide-react'
import { Spotlight } from '@/components/ui/spotlight'
import { PROJECTS } from '../data'

const CATEGORY_LABELS: Record<string, string> = {
  web:      'Web',
  security: 'Security',
  systems:  'Systems',
  cli:      'CLI',
  ai:       'AI',
  infra:    'Infrastructure',
}

function ProjectCard({ project }: { project: typeof PROJECTS[number] }) {
  return (
    <div
      className="relative overflow-hidden rounded-2xl p-[1px]"
      style={{ backgroundColor: 'hsl(var(--border))' }}
    >
      <Spotlight
        className="from-zinc-900 via-zinc-800 to-zinc-700 blur-2xl dark:from-zinc-100 dark:via-zinc-200 dark:to-zinc-50"
        size={80}
      />
      <div
        className="relative rounded-[15px] p-3 space-y-2"
        style={{ backgroundColor: 'hsl(var(--background))' }}
      >
        <MorphingDialog transition={{ type: 'spring', bounce: 0, duration: 0.3 }}>
          <MorphingDialogTrigger>
            <video
              src={project.video}
              autoPlay
              loop
              muted
              className="aspect-video w-full cursor-zoom-in rounded-xl"
            />
          </MorphingDialogTrigger>
          <MorphingDialogContainer>
            <MorphingDialogContent
              className="relative aspect-video rounded-2xl p-1 ring-1 ring-inset"
              style={{
                backgroundColor: 'hsl(var(--card))',
                '--tw-ring-color': 'hsl(var(--border))',
              } as React.CSSProperties}
            >
              <video
                src={project.video}
                autoPlay
                loop
                muted
                className="aspect-video h-[50vh] w-full rounded-xl md:h-[70vh]"
              />
            </MorphingDialogContent>
            <MorphingDialogClose
              className="fixed top-6 right-6 h-fit w-fit rounded-full p-1"
              style={{ backgroundColor: 'hsl(var(--card))' }}
              variants={{
                initial: { opacity: 0 },
                animate: { opacity: 1, transition: { delay: 0.3, duration: 0.1 } },
                exit:    { opacity: 0, transition: { duration: 0 } },
              }}
            >
              <XIcon className="h-5 w-5" style={{ color: 'hsl(var(--muted-foreground))' }} />
            </MorphingDialogClose>
          </MorphingDialogContainer>
        </MorphingDialog>

        <div className="px-1 space-y-2">
          <div>
            <a
              href={project.link}
              target="_blank"
              className="font-base group relative inline-block font-[450]"
              style={{ color: 'hsl(var(--foreground))' }}
            >
              {project.name}
              <span
                className="absolute bottom-0.5 left-0 block h-[1px] w-full max-w-0 transition-all duration-200 group-hover:max-w-full"
                style={{ backgroundColor: 'hsl(var(--foreground))' }}
              />
            </a>
            <p className="text-sm" style={{ color: 'hsl(var(--muted-foreground))' }}>
              {project.description}
            </p>
          </div>
          <div className="flex flex-wrap gap-1">
            <span
              className="rounded-full px-2 py-0.5 text-xs font-medium"
              style={{
                backgroundColor: 'hsl(var(--primary))',
                color: 'hsl(var(--primary-foreground))',
              }}
            >
              {CATEGORY_LABELS[project.category]}
            </span>
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full px-2 py-0.5 text-xs"
                style={{
                  backgroundColor: 'hsl(var(--muted))',
                  color: 'hsl(var(--muted-foreground))',
                }}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default function ProjectsPage() {
  const [query, setQuery]               = useState('')
  const [activeCategory, setActiveCategory] = useState<string | null>(null)
  const [activeTag, setActiveTag]       = useState<string | null>(null)

  const allCategories = useMemo(() => [...new Set(PROJECTS.map((p) => p.category))], [])
  const allTags       = useMemo(() => [...new Set(PROJECTS.flatMap((p) => p.tags))].sort(), [])

  const filtered = useMemo(() => {
    const q = query.toLowerCase()
    return PROJECTS.filter((p) => {
      const matchesQuery =
        !q ||
        p.name.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.tags.some((t) => t.toLowerCase().includes(q)) ||
        CATEGORY_LABELS[p.category].toLowerCase().includes(q)
      const matchesCategory = !activeCategory || p.category === activeCategory
      const matchesTag      = !activeTag || p.tags.includes(activeTag)
      return matchesQuery && matchesCategory && matchesTag
    })
  }, [query, activeCategory, activeTag])

  return (
    <div className="space-y-6">
      {/* Search */}
      <div
        className="flex items-center gap-2 rounded-xl px-3 py-2 ring-1 ring-inset"
        style={{
          backgroundColor: 'hsl(var(--muted))',
          '--tw-ring-color': 'hsl(var(--border))',
        } as React.CSSProperties}
      >
        <SearchIcon className="h-4 w-4 shrink-0" style={{ color: 'hsl(var(--muted-foreground))' }} />
        <input
          type="text"
          placeholder="Search by name, tag, or language..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full bg-transparent text-sm outline-none placeholder:opacity-50"
          style={{ color: 'hsl(var(--foreground))' }}
        />
        {query && (
          <button onClick={() => setQuery('')}>
            <XIcon className="h-3.5 w-3.5" style={{ color: 'hsl(var(--muted-foreground))' }} />
          </button>
        )}
      </div>

      {/* Category pills */}
      <div className="space-y-2">
        <p className="text-xs font-medium tracking-wide" style={{ color: 'hsl(var(--muted-foreground))' }}>
          CATEGORY
        </p>
        <div className="flex flex-wrap gap-1.5">
          <button
            onClick={() => setActiveCategory(null)}
            className="rounded-full px-3 py-1 text-xs font-medium transition-colors duration-150"
            style={
              !activeCategory
                ? { backgroundColor: 'hsl(var(--foreground))', color: 'hsl(var(--background))' }
                : { backgroundColor: 'hsl(var(--muted))',      color: 'hsl(var(--muted-foreground))' }
            }
          >
            All
          </button>
          {allCategories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(activeCategory === cat ? null : cat)}
              className="rounded-full px-3 py-1 text-xs font-medium transition-colors duration-150"
              style={
                activeCategory === cat
                  ? { backgroundColor: 'hsl(var(--foreground))', color: 'hsl(var(--background))' }
                  : { backgroundColor: 'hsl(var(--muted))',      color: 'hsl(var(--muted-foreground))' }
              }
            >
              {CATEGORY_LABELS[cat]}
            </button>
          ))}
        </div>
      </div>

      {/* Tag pills */}
      <div className="space-y-2">
        <p className="text-xs font-medium tracking-wide" style={{ color: 'hsl(var(--muted-foreground))' }}>
          STACK
        </p>
        <div className="flex flex-wrap gap-1.5">
          {allTags.map((tag) => (
            <button
              key={tag}
              onClick={() => setActiveTag(activeTag === tag ? null : tag)}
              className="rounded-full px-3 py-1 text-xs transition-colors duration-150"
              style={
                activeTag === tag
                  ? { backgroundColor: 'hsl(var(--foreground))', color: 'hsl(var(--background))' }
                  : { backgroundColor: 'hsl(var(--muted))',      color: 'hsl(var(--muted-foreground))' }
              }
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      {/* Results count */}
      <p className="text-xs" style={{ color: 'hsl(var(--muted-foreground))' }}>
        {filtered.length} project{filtered.length !== 1 ? 's' : ''}
      </p>

      {/* Grid — plain div, no layout animation, so MorphingDialog layoutIds work cleanly */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <AnimatePresence mode="popLayout">
          {filtered.map((project) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.97 }}
              transition={{ duration: 0.2 }}
            >
              <ProjectCard project={project} />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {filtered.length === 0 && (
        <p className="py-12 text-center text-sm" style={{ color: 'hsl(var(--muted-foreground))' }}>
          No projects match.
        </p>
      )}
    </div>
  )
}
