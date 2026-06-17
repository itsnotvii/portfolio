import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import type { Project } from '../types'
import projectsData from '../data/projects.json'

const projects: Project[] = projectsData as Project[]

export default function Projects() {
  return (
    <section id="projects" className="py-32 px-6 md:px-12 max-w-7xl mx-auto">
      <p className="font-mono text-xs text-muted tracking-[0.25em] uppercase mb-3">Work</p>
      <h2 className="font-display font-bold text-4xl md:text-5xl text-text mb-16">Projects</h2>

      <div className="grid md:grid-cols-2 gap-px border border-border">
        {projects.map((project, i) => (
          <ProjectCard key={project.id} project={project} index={i} />
        ))}
      </div>
    </section>
  )
}

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group relative bg-surface hover:bg-border transition-colors duration-300 p-8 flex flex-col gap-6"
    >
      {/* Top row */}
      <div className="flex items-start justify-between">
        <span className="font-mono text-xs text-muted">0{index + 1}</span>
        <div className="flex gap-4">
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

      {/* Title */}
      <h3 className="font-display font-bold text-2xl text-text group-hover:text-accent transition-colors duration-200 leading-tight">
        {project.title}
      </h3>

      {/* Description */}
      <p className="font-body text-dim text-sm leading-relaxed flex-1">
        {project.description}
      </p>

      {/* Bullets */}
      <ul className="flex flex-col gap-2">
        {project.bullets.map((b, i) => (
          <li key={i} className="flex items-start gap-3 text-xs text-dim">
            <span className="text-muted shrink-0 mt-0.5">—</span>
            <span className="font-body leading-relaxed">{b}</span>
          </li>
        ))}
      </ul>

      {/* Tech */}
      <div className="flex flex-wrap gap-2 pt-2 border-t border-border">
        {project.tech.map((t) => (
          <div key={t.name}
            className="flex items-center gap-1.5 font-mono text-[11px] text-dim px-2.5 py-1 border border-border hover:border-muted transition-colors duration-200">
            <img src={t.icon} alt={t.name} className="w-3.5 h-3.5 object-contain" />
            {t.name}
          </div>
        ))}
      </div>

      {/* Accent line on hover */}
      <div className="absolute bottom-0 left-0 w-0 h-px bg-accent group-hover:w-full transition-all duration-500" />
    </motion.div>
  )
}