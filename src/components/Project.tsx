import { useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import type { Project } from '../types'
import projectsData from '../data/projects.json'

const projects: Project[] = projectsData

export default function Projects() {
  const [current, setCurrent] = useState(0)
  const [direction, setDirection] = useState(0)

  const prev = () => {
    setDirection(-1)
    setCurrent((c) => (c - 1 + projects.length) % projects.length)
  }

  const next = () => {
    setDirection(1)
    setCurrent((c) => (c + 1) % projects.length)
  }

  const getPeek = (offset: -1 | 1) => {
    return projects[(current + offset + projects.length) % projects.length]
  }

  return (
    <section id="projects" className="py-32 px-6 max-w-6xl mx-auto">
      <p className="font-mono text-xs text-muted tracking-[0.25em] uppercase mb-3">Work</p>
      <h2 className="font-display font-bold text-4xl md:text-5xl text-text mb-16 mt-3">Projects</h2>

      <div className="relative flex items-center gap-4">

        {/* Left peek */}
        <div className="hidden lg:block w-48 shrink-0 opacity-30 scale-95 origin-right pointer-events-none select-none">
          <PeekCard project={getPeek(-1)} />
        </div>

        {/* Arrow left */}
        <button onClick={prev}
          className="hidden lg:flex shrink-0 w-10 h-10 items-center justify-center border border-border text-dim hover:border-accent hover:text-accent transition-all duration-200 z-10">
          ←
        </button>

        {/* Main card */}
        <div className="flex-1 overflow-hidden relative" style={{ minHeight: '480px' }}>
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={current}
              custom={direction}
              initial={{ opacity: 0, x: direction * 80 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: direction * -80 }}
              transition={{ duration: 0.35, ease: 'easeInOut' }}
              className="w-full"
            >
              <MainCard project={projects[current]} />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Arrow right */}
        <button onClick={next}
          className="hidden lg:flex shrink-0 w-10 h-10 items-center justify-center border border-border text-dim hover:border-accent hover:text-accent transition-all duration-200 z-10">
          →
        </button>

        {/* Right peek */}
        <div className="hidden lg:block w-48 shrink-0 opacity-30 scale-95 origin-left pointer-events-none select-none">
          <PeekCard project={getPeek(1)} />
        </div>
      </div>

      {/* Mobile arrows */}
      <div className="flex lg:hidden items-center justify-center gap-4 mt-6">
        <button onClick={prev}
          className="w-10 h-10 flex items-center justify-center border border-border text-dim hover:border-accent hover:text-accent transition-all duration-200">
          ←
        </button>
        <button onClick={next}
          className="w-10 h-10 flex items-center justify-center border border-border text-dim hover:border-accent hover:text-accent transition-all duration-200">
          →
        </button>
      </div>

      {/* Dots + progress */}
      <div className="flex flex-col items-center gap-3 mt-8">
        <div className="flex gap-2">
          {projects.map((_, i) => (
            <button key={i} onClick={() => { setDirection(i > current ? 1 : -1); setCurrent(i) }}
              className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${i === current ? 'bg-accent w-4' : 'bg-muted'}`}
            />
          ))}
        </div>
        <div className="w-48 h-px bg-border relative overflow-hidden">
          <motion.div
            className="absolute top-0 left-0 h-full bg-accent"
            animate={{ width: `${((current + 1) / projects.length) * 100}%` }}
            transition={{ duration: 0.35 }}
          />
        </div>
        <span className="font-mono text-xs text-muted">
          {String(current + 1).padStart(2, '0')} / {String(projects.length).padStart(2, '0')}
        </span>
      </div>
    </section>
  )
}

function MainCard({ project }: { project: Project }) {
  return (
    <div className="bg-surface border border-border p-8 md:p-10">
      {/* Preview image */}
      <div className="w-full aspect-video bg-border mb-8 overflow-hidden">
        {project.image ? (
          <img src={project.image} alt={project.title}
            className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <span className="font-mono text-xs text-muted">No preview</span>
          </div>
        )}
      </div>

      <div className="flex items-start justify-between gap-4 mb-4">
        <h3 className="font-display font-semibold text-2xl text-text">{project.title}</h3>
        <div className="flex gap-4 shrink-0">
          {project.github && (
            <a href={project.github} target="_blank" rel="noreferrer"
              className="font-mono text-xs text-muted hover:text-accent transition-colors duration-200">
              GitHub ↗
            </a>
          )}
          {project.live && (
            <a href={project.live} target="_blank" rel="noreferrer"
              className="font-mono text-xs text-muted hover:text-accent transition-colors duration-200">
              Live ↗
            </a>
          )}
        </div>
      </div>

      <p className="font-body text-dim text-sm leading-relaxed mb-6">{project.description}</p>

      <ul className="flex flex-col gap-2 mb-6">
        {project.bullets.map((b, i) => (
          <li key={i} className="flex items-start gap-3 text-sm text-dim">
            <span className="text-muted mt-1 shrink-0">—</span>
            <span className="font-body leading-relaxed">{b}</span>
          </li>
        ))}
      </ul>

      <div className="flex flex-wrap gap-3">
        {project.tech.map((t) => (
          <div key={t.name}
            className="flex items-center gap-2 font-mono text-[11px] text-dim px-3 py-1.5 border border-border hover:border-muted transition-colors duration-200">
            <img src={t.icon} alt={t.name} className="w-4 h-4 object-contain" />
            {t.name}
          </div>
        ))}
      </div>
    </div>
  )
}

function PeekCard({ project }: { project: Project }) {
  return (
    <div className="bg-surface border border-border p-4">
      <div className="w-full aspect-video bg-border mb-3 overflow-hidden">
        {project.image ? (
          <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <span className="font-mono text-[10px] text-muted">No preview</span>
          </div>
        )}
      </div>
      <p className="font-display font-semibold text-sm text-text truncate">{project.title}</p>
    </div>
  )
}