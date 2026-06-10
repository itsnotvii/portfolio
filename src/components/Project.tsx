import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import type { Project } from '../types'
import projectsData from '../data/projects.json'

const projects: Project[] = projectsData

export default function Projects() {
  return (
    <section id="projects" className="py-32 px-6 max-w-5xl mx-auto">
      <p className="font-mono text-xs text-muted tracking-[0.25em] uppercase mb-3">Work</p>
      <h2 className="font-display font-bold text-4xl md:text-5xl text-text mb-16 mt-3">
        Projects
      </h2>
      <div className="flex flex-col gap-px border border-border">
        {projects.map((project, i) => (
          <ProjectRow key={project.id} project={project} index={i} />
        ))}
      </div>
    </section>
  )
}

function ProjectRow({ project, index }: { project: Project; index: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <motion.div ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group bg-surface hover:bg-border transition-colors duration-300 p-8 md:p-10">
      <div className="flex flex-col md:flex-row md:items-start gap-6">
        <span className="font-mono text-xs text-muted shrink-0 mt-1">0{index + 1}</span>
        <div className="flex-1">
          <div className="flex items-start justify-between gap-4 mb-4">
            <h3 className="font-display font-semibold text-xl text-text group-hover:text-accent transition-colors duration-200">
              {project.title}
            </h3>
            <div className="flex gap-3 shrink-0">
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
          <p className="font-body text-dim text-sm leading-relaxed mb-5">{project.description}</p>
          <ul className="flex flex-col gap-2 mb-6">
            {project.bullets.map((b, i) => (
              <li key={i} className="flex items-start gap-3 text-sm text-dim">
                <span className="text-muted mt-1 shrink-0">—</span>
                <span className="font-body leading-relaxed">{b}</span>
              </li>
            ))}
          </ul>
          <div className="flex flex-wrap gap-2">
            {project.tech.map((t) => (
              <span key={t}
                className="font-mono text-[11px] text-dim px-2.5 py-1 border border-border hover:border-muted transition-colors duration-200">
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  )
}