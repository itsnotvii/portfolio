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

function ProjectRow({ project, index }: { project: Project; index: numer }) {
    const ref = useRef<HTMLDivElement>(null)
    const inView = useInView(ref, { once: true, margin: '-80px' })

    return (
        <motion.div ref={ref}
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: index * 0.1 }}
        )
}

