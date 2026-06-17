import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'

export default function Contact() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setStatus('sending')
    const form = e.currentTarget
    const data = new FormData(form)

    try {
      const res = await fetch('https://formspree.io/f/mjgdzzvd', {
        method: 'POST',
        body: data,
        headers: { Accept: 'application/json' },
      })
      if (res.ok) {
        setStatus('sent')
        form.reset()
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  return (
    <section id="contact" className="py-32 px-6 max-w-5xl mx-auto">
      <p className="font-mono text-xs text-muted tracking-[0.25em] uppercase mb-3">Say Hi</p>
      <h2 className="font-display font-bold text-4xl md:text-5xl text-text mb-4">Contact</h2>
      <p className="font-body text-dim mb-16 max-w-md">
        Let's build something together. Message me below or find me on socials.
      </p>

      <div ref={ref} className="grid md:grid-cols-2 gap-16">
        <motion.div initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}>
          {status === 'sent' ? (
            <div className="flex flex-col gap-3 py-10">
              <span className="font-mono text-accent text-sm">Message sent ✓</span>
              <p className="font-body text-dim text-sm">I'll get back to you as soon as I can.</p>
              <button onClick={() => setStatus('idle')}
                className="font-mono text-xs text-muted hover:text-dim transition-colors mt-2 text-left">
                Send another →
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div>
                <label className="font-mono text-[11px] text-muted tracking-widest uppercase block mb-2">Name</label>
                <input type="text" name="name" required placeholder="Your name"
                  className="w-full bg-surface border border-border text-text placeholder-muted font-body text-sm px-4 py-3 focus:border-muted focus:outline-none transition-colors duration-200" />
              </div>
              <div>
                <label className="font-mono text-[11px] text-muted tracking-widest uppercase block mb-2">Email</label>
                <input type="email" name="email" required placeholder="your@email.com"
                  className="w-full bg-surface border border-border text-text placeholder-muted font-body text-sm px-4 py-3 focus:border-muted focus:outline-none transition-colors duration-200" />
              </div>
              <div>
                <label className="font-mono text-[11px] text-muted tracking-widest uppercase block mb-2">Message</label>
                <textarea rows={5} name="message" required placeholder="What's on your mind?"
                  className="w-full bg-surface border border-border text-text placeholder-muted font-body text-sm px-4 py-3 focus:border-muted focus:outline-none transition-colors duration-200 resize-none" />
              </div>

              {status === 'error' && (
                <p className="font-mono text-xs text-red-400">Something went wrong. Try again.</p>
              )}

              <button type="submit" disabled={status === 'sending'}
                className="font-mono text-sm px-6 py-3 bg-accent text-bg font-medium hover:bg-text transition-colors duration-200 disabled:opacity-50 mt-2 text-left">
                {status === 'sending' ? 'Sending...' : 'Send Message →'}
              </button>
            </form>
          )}
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="flex flex-col gap-6">
          <p className="font-body text-dim text-sm leading-relaxed">
            I'm always open to new opportunities, collaborations, or just a good conversation.
          </p>
          <div className="flex flex-col gap-3 border-t border-border pt-6">
            {[
              { label: 'GitHub', href: 'https://github.com/itsnotvii', handle: '@itsnotvii' },
              { label: 'LinkedIn', href: 'https://www.linkedin.com/in/thomas-johnson-821603327/', handle: 'thomas-johnson' },
              { label: 'Instagram', href: 'https://www.instagram.com/tomtom_lowell/', handle: '@tomtom_lowell' },
            ].map(({ label, href, handle }) => (
              <a key={label} href={href} target="_blank" rel="noreferrer"
                className="group flex items-center justify-between py-3 border-b border-border hover:border-muted transition-colors duration-200">
                <span className="font-mono text-sm text-dim group-hover:text-text transition-colors duration-200">{label}</span>
                <span className="font-mono text-xs text-muted group-hover:text-dim transition-colors duration-200">{handle} ↗</span>
              </a>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}