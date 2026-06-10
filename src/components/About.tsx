import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

export default function About() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="about" className="py-32 px-6 max-w-5xl mx-auto">
      <p className="font-mono text-xs text-muted tracking-[0.25em] uppercase mb-3">Background</p>
      <h2 className="font-display font-bold text-4xl md:text-5xl text-text mb-16">About Me</h2>

      <div ref={ref} className="grid md:grid-cols-5 gap-12 items-start">
        <motion.div initial={{ opacity: 0, x: -20 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="md:col-span-2">
          <div className="aspect-[3/4] bg-surface border border-border overflow-hidden relative">
            <img src="/images/IMG_8842.png" alt="Thomas Johnson"
              className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700" />
            <div className="absolute inset-0 bg-gradient-to-t from-bg/40 to-transparent pointer-events-none" />
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, x: 20 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="md:col-span-3 flex flex-col gap-5">
          <p className="font-body text-dim leading-relaxed">
            Born and raised in Kobe, Japan, I developed a passion for electronics and computers early on. In 2015, I moved to the United States to pursue my education.
          </p>
          <p className="font-body text-dim leading-relaxed">
            After completing high school, I enrolled at De Anza Community College to study Computer Science. I'm now continuing at San Jose State University, majoring in Software Engineering.
          </p>
          <p className="font-body text-dim leading-relaxed">
            I'm a passionate problem-solver — whether through code, design, or creative thinking. I'm driven to build things that are both functional and thoughtfully made.
          </p>

          <div className="flex flex-wrap gap-2 pt-2">
            {['San Jose State', 'Software Engineering', 'Kobe, Japan', 'Problem Solver'].map((tag) => (
              <span key={tag} className="font-mono text-[11px] text-dim px-3 py-1.5 border border-border">
                {tag}
              </span>
            ))}
          </div>

          <div className="flex gap-6 pt-2">
            <a href="https://github.com/itsnotvii" target="_blank" rel="noreferrer"
              className="font-mono text-xs text-muted hover:text-accent transition-colors duration-200">
              GitHub ↗
            </a>
            <a href="https://www.linkedin.com/in/thomas-johnson-821603327/" target="_blank" rel="noreferrer"
              className="font-mono text-xs text-muted hover:text-accent transition-colors duration-200">
              LinkedIn ↗
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}