import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const timeline = [
  { year: '2003', title: 'Born in Kobe, Japan', desc: 'Grew up surrounded by technology and developed an early passion for computers and electronics.' },
  { year: '2015', title: 'Moved to the United States', desc: 'Relocated to pursue education and new opportunities.' },
  { year: '2023', title: 'De Anza College', desc: 'Started studying Computer Science at De Anza Community College.' },
  { year: '2024', title: 'San Jose State University', desc: 'Transferred to SJSU, majoring in Software Engineering.' },
  { year: '2025', title: 'Open to Internships', desc: 'Actively building projects and looking for opportunities in software engineering.' },
]

export default function About() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="about" className="py-32 px-6 max-w-5xl mx-auto">
      <h2 className="font-display font-bold text-4xl md:text-5xl text-text mb-16">About Me</h2>

      <div ref={ref} className="grid md:grid-cols-5 gap-12 items-start">
        {/* Photo */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="md:col-span-2">
          <div className="aspect-[3/4] bg-surface border border-border overflow-hidden relative">
            <img src="/images/Profile.png" alt="Thomas Johnson"
              className="w-full h-full object-cover hover:grayscale-0 transition-all duration-700" />
            <div className="absolute inset-0 bg-gradient-to-t from-bg/40 to-transparent pointer-events-none" />
          </div>
        </motion.div>

        {/* Text + Timeline */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="md:col-span-3 flex flex-col gap-5">
          <p className="font-body text-dim leading-relaxed">
            Born and raised in Kobe, Japan, I developed a passion for electronics and computers early on. In 2015, I moved to the United States to pursue my education.
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

          {/* Timeline */}
          <div className="mt-8">
            <p className="font-mono text-xs text-muted tracking-[0.25em] uppercase mb-6">Timeline</p>
            <div className="relative">
              {/* Vertical line */}
              <div className="absolute left-[5px] top-2 bottom-2 w-px bg-border" />

              <div className="flex flex-col gap-8">
                {timeline.map((item, i) => (
                  <TimelineItem key={i} item={item} index={i} />
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

function TimelineItem({ item, index }: { item: typeof timeline[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -10 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      className="flex gap-6 pl-6 relative"
    >
      {/* Dot */}
      <div className="absolute left-0 top-1.5 w-[11px] h-[11px] rounded-full border border-accent bg-bg" />

      <div className="flex flex-col gap-1">
        <span className="font-mono text-xs text-accent tracking-widest">{item.year}</span>
        <span className="font-display font-semibold text-text text-sm">{item.title}</span>
        <span className="font-body text-dim text-xs leading-relaxed">{item.desc}</span>
      </div>
    </motion.div>
  )
}