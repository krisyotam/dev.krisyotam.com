'use client'
import { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { XIcon, PlusIcon, MinusIcon } from 'lucide-react'
import { Spotlight } from '@/components/ui/spotlight'
import { Magnetic } from '@/components/ui/magnetic'
import {
  MorphingDialog,
  MorphingDialogTrigger,
  MorphingDialogContent,
  MorphingDialogClose,
  MorphingDialogContainer,
} from '@/components/ui/morphing-dialog'
import Link from 'next/link'
import { AnimatedBackground } from '@/components/ui/animated-background'
import {
  PROJECTS,
  FEATURED_PROJECT_SLUGS,
  WORK_EXPERIENCE,
  BLOG_POSTS,
  EMAIL,
  SOCIAL_LINKS,
} from './data'
import { sounds } from '@/lib/sounds'

const VARIANTS_CONTAINER = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
}

const VARIANTS_SECTION = {
  hidden: { opacity: 0, y: 20, filter: 'blur(8px)' },
  visible: { opacity: 1, y: 0, filter: 'blur(0px)' },
}

const TRANSITION_SECTION = {
  duration: 0.3,
}

type ProjectVideoProps = {
  src: string
}

function ProjectVideo({ src }: ProjectVideoProps) {
  return (
    <MorphingDialog
      transition={{
        type: 'spring',
        bounce: 0,
        duration: 0.3,
      }}
    >
      <MorphingDialogTrigger>
        <video
          src={src}
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
            src={src}
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
            animate: {
              opacity: 1,
              transition: { delay: 0.3, duration: 0.1 },
            },
            exit: { opacity: 0, transition: { duration: 0 } },
          }}
        >
          <XIcon className="h-5 w-5" style={{ color: 'hsl(var(--muted-foreground))' }} />
        </MorphingDialogClose>
      </MorphingDialogContainer>
    </MorphingDialog>
  )
}

function MagneticSocialLink({
  children,
  link,
}: {
  children: React.ReactNode
  link: string
}) {
  return (
    <Magnetic springOptions={{ bounce: 0 }} intensity={0.3}>
      <a
        href={link}
        className="group relative inline-flex shrink-0 items-center gap-[1px] rounded-full px-2.5 py-1 text-sm transition-colors duration-200"
        style={{
          backgroundColor: 'hsl(var(--muted))',
          color: 'hsl(var(--foreground))',
        }}
        onMouseEnter={(e) => {
          sounds.tick()
          e.currentTarget.style.backgroundColor = 'hsl(var(--primary))'
          e.currentTarget.style.color = 'hsl(var(--primary-foreground))'
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = 'hsl(var(--muted))'
          e.currentTarget.style.color = 'hsl(var(--foreground))'
        }}
      >
        {children}
        <svg
          width="15"
          height="15"
          viewBox="0 0 15 15"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="h-3 w-3"
        >
          <path
            d="M3.64645 11.3536C3.45118 11.1583 3.45118 10.8417 3.64645 10.6465L10.2929 4L6 4C5.72386 4 5.5 3.77614 5.5 3.5C5.5 3.22386 5.72386 3 6 3L11.5 3C11.6326 3 11.7598 3.05268 11.8536 3.14645C11.9473 3.24022 12 3.36739 12 3.5L12 9.00001C12 9.27615 11.7761 9.50001 11.5 9.50001C11.2239 9.50001 11 9.27615 11 9.00001V4.70711L4.35355 11.3536C4.15829 11.5488 3.84171 11.5488 3.64645 11.3536Z"
            fill="currentColor"
            fillRule="evenodd"
            clipRule="evenodd"
          ></path>
        </svg>
      </a>
    </Magnetic>
  )
}

function ExpandableJob({ job }: { job: typeof WORK_EXPERIENCE[number] }) {
  const [open, setOpen] = useState(false)

  return (
    <div
      className="relative overflow-hidden rounded-2xl p-[1px] cursor-pointer"
      style={{ backgroundColor: 'hsl(var(--border))' }}
      onClick={() => { sounds.toggle(); setOpen(!open) }}
    >
      <Spotlight
        className="from-zinc-900 via-zinc-800 to-zinc-700 blur-2xl dark:from-zinc-100 dark:via-zinc-200 dark:to-zinc-50"
        size={64}
      />
      <div
        className="relative h-full w-full rounded-[15px] p-4"
        style={{ backgroundColor: 'hsl(var(--background))' }}
      >
        <div className="relative flex w-full flex-row justify-between items-start">
          <div>
            <h4 className="font-normal" style={{ color: 'hsl(var(--foreground))' }}>
              {job.title}
            </h4>
            <p style={{ color: 'hsl(var(--muted-foreground))' }}>
              {job.company}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <p style={{ color: 'hsl(var(--muted-foreground))' }}>
              {job.start} - {job.end}
            </p>
            {open ? (
              <MinusIcon className="h-4 w-4" style={{ color: 'hsl(var(--muted-foreground))' }} />
            ) : (
              <PlusIcon className="h-4 w-4" style={{ color: 'hsl(var(--muted-foreground))' }} />
            )}
          </div>
        </div>
        <AnimatePresence>
          {open && (
            <motion.ul
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="overflow-hidden mt-3 space-y-1 list-disc list-inside text-sm"
              style={{ color: 'hsl(var(--muted-foreground))' }}
            >
              {job.bullets.map((bullet, i) => (
                <li key={i}>{bullet}</li>
              ))}
            </motion.ul>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

export default function Personal() {
  return (
    <motion.main
      className="space-y-12"
      variants={VARIANTS_CONTAINER}
      initial="hidden"
      animate="visible"
    >
      <motion.section
        variants={VARIANTS_SECTION}
        transition={TRANSITION_SECTION}
      >
        <div className="flex-1 space-y-4">
          <p style={{ color: 'hsl(var(--muted-foreground))' }}>
            I build and break systems for a living. My work spans penetration
            testing, infrastructure engineering, and full-stack development. I
            care about security, simplicity, and software that does exactly what
            it claims to.
          </p>
          <p style={{ color: 'hsl(var(--muted-foreground))' }}>
            I am particularly interested in:
          </p>
          <ul className="list-disc list-inside space-y-1" style={{ color: 'hsl(var(--muted-foreground))' }}>
            <li>Offensive security and vulnerability research</li>
            <li>Self-hosted infrastructure and homelab design</li>
            <li>Developer tooling and CLI utilities</li>
            <li>Systems programming and low-level networking</li>
          </ul>
          <div className="pt-2">
            <span
              className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium"
              style={{ border: '1px solid hsl(var(--border))', color: 'hsl(var(--foreground))' }}
            >
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-black opacity-75 dark:bg-orange-400" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-black dark:bg-orange-500" />
              </span>
              Currently on the job market
            </span>
          </div>
        </div>
      </motion.section>

      <motion.section
        variants={VARIANTS_SECTION}
        transition={TRANSITION_SECTION}
      >
        <Link href="/projects" className="group mb-5 inline-flex items-center gap-1.5">
          <h3 className="text-sm font-medium tracking-wide" style={{ color: 'hsl(var(--foreground))' }}>SELECTED PROJECTS</h3>
          <svg width="12" height="12" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg" className="opacity-40 transition-opacity group-hover:opacity-100" style={{ color: 'hsl(var(--foreground))' }}>
            <path d="M3.64645 11.3536C3.45118 11.1583 3.45118 10.8417 3.64645 10.6465L10.2929 4L6 4C5.72386 4 5.5 3.77614 5.5 3.5C5.5 3.22386 5.72386 3 6 3L11.5 3C11.6326 3 11.7598 3.05268 11.8536 3.14645C11.9473 3.24022 12 3.36739 12 3.5L12 9.00001C12 9.27615 11.7761 9.50001 11.5 9.50001C11.2239 9.50001 11 9.27615 11 9.00001V4.70711L4.35355 11.3536C4.15829 11.5488 3.84171 11.5488 3.64645 11.3536Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"/>
          </svg>
        </Link>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          {PROJECTS.filter((p) => FEATURED_PROJECT_SLUGS.includes(p.slug)).map((project) => (
            <div key={project.name} className="space-y-2">
              <div
                className="relative rounded-2xl p-1 ring-1 ring-inset"
                style={{
                  backgroundColor: 'hsl(var(--accent))',
                  '--tw-ring-color': 'hsl(var(--border))',
                } as React.CSSProperties}
              >
                <ProjectVideo src={project.video} />
              </div>
              <div className="px-1">
                <a
                  className="font-base group relative inline-block font-[450]"
                  href={project.link}
                  target="_blank"
                  style={{ color: 'hsl(var(--foreground))' }}
                >
                  {project.name}
                  <span
                    className="absolute bottom-0.5 left-0 block h-[1px] w-full max-w-0 transition-all duration-200 group-hover:max-w-full"
                    style={{ backgroundColor: 'hsl(var(--foreground))' }}
                  ></span>
                </a>
                <p className="text-base" style={{ color: 'hsl(var(--muted-foreground))' }}>
                  {project.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </motion.section>

      <motion.section
        variants={VARIANTS_SECTION}
        transition={TRANSITION_SECTION}
      >
        <h3 className="mb-5 text-sm font-medium tracking-wide">EXPERIENCE</h3>
        <div className="flex flex-col space-y-2">
          {WORK_EXPERIENCE.map((job) => (
            <ExpandableJob key={job.id} job={job} />
          ))}
        </div>
      </motion.section>

      <motion.section
        variants={VARIANTS_SECTION}
        transition={TRANSITION_SECTION}
      >
        <h3 className="mb-3 text-sm font-medium tracking-wide">PUBLICATIONS</h3>
        <div className="flex flex-col space-y-0">
          <AnimatedBackground
            enableHover
            className="h-full w-full rounded-lg bg-[hsl(var(--muted))]"
            transition={{
              type: 'spring',
              bounce: 0,
              duration: 0.2,
            }}
          >
            {BLOG_POSTS.map((post) => (
              <Link
                key={post.uid}
                className="-mx-3 rounded-xl px-3 py-3"
                href={post.link}
                data-id={post.uid}
                onMouseEnter={() => sounds.tick()}
              >
                <div className="flex flex-col space-y-1">
                  <h4 className="font-normal" style={{ color: 'hsl(var(--foreground))' }}>
                    {post.title}
                  </h4>
                  <p style={{ color: 'hsl(var(--muted-foreground))' }}>
                    {post.description}
                  </p>
                </div>
              </Link>
            ))}
          </AnimatedBackground>
        </div>
      </motion.section>

      <motion.section
        variants={VARIANTS_SECTION}
        transition={TRANSITION_SECTION}
      >
        <h3 className="mb-5 text-sm font-medium tracking-wide">CONNECT</h3>
        <p className="mb-5" style={{ color: 'hsl(var(--muted-foreground))' }}>
          Feel free to contact me at{' '}
          <a className="underline" style={{ color: 'hsl(var(--foreground))' }} href={`mailto:${EMAIL}`}>
            {EMAIL}
          </a>
        </p>
        <div className="flex items-center justify-start space-x-3">
          {SOCIAL_LINKS.map((link) => (
            <MagneticSocialLink key={link.label} link={link.link}>
              {link.label}
            </MagneticSocialLink>
          ))}
        </div>
      </motion.section>
    </motion.main>
  )
}
