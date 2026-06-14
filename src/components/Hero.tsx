import { useEffect, useState, useRef } from 'react'
import { motion } from 'framer-motion'

const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%'

function useScramble(target: string, trigger: boolean) {
  const [display, setDisplay] = useState(target.replace(/[A-Z0-9]/g, '?'))
  useEffect(() => {
    if (!trigger) return
    let frame = 0
    const totalFrames = 18
    const interval = setInterval(() => {
      setDisplay(
        target.split('').map((char, i) => {
          if (char === ' ') return ' '
          if (frame >= totalFrames - (target.length - i)) return char
          return CHARS[Math.floor(Math.random() * CHARS.length)]
        }).join('')
      )
      frame++
      if (frame > totalFrames + target.length) clearInterval(interval)
    }, 45)
    return () => clearInterval(interval)
  }, [trigger, target])
  return display
}

const TERMINAL_LINES = [
  { type: 'cmd', text: 'whoami' },
  { type: 'out', text: 'thomas johnson' },
  { type: 'cmd', text: 'status' },
  { type: 'out', text: 'open to internships' },
  { type: 'cmd', text: 'location' },
  { type: 'out', text: 'san jose, ca' },
  { type: 'cmd', text: 'education' },
  { type: 'out', text: 'sjsu — software engineering' },
  { type: 'cmd', text: 'skills' },
  { type: 'out', text: 'java · react · typescript · tailwind' },
  { type: 'cmd', text: 'origin' },
  { type: 'out', text: 'kobe, japan 🇯🇵' },
]

function Terminal({ active }: { active: boolean }) {
  const [visibleLines, setVisibleLines] = useState<number>(0)
  const [currentText, setCurrentText] = useState('')
  const [typing, setTyping] = useState(false)
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!active) return
    let cancelled = false

    const runLines = async () => {
      for (let i = 0; i < TERMINAL_LINES.length; i++) {
        if (cancelled) return
        const line = TERMINAL_LINES[i]

        if (line.type === 'cmd') {
          setTyping(true)
          setCurrentText('')
          for (let j = 0; j <= line.text.length; j++) {
            if (cancelled) return
            await new Promise(r => setTimeout(r, 55))
            setCurrentText(line.text.slice(0, j))
          }
          setTyping(false)
          await new Promise(r => setTimeout(r, 120))
          setVisibleLines(i + 1)
        } else {
          await new Promise(r => setTimeout(r, 80))
          setVisibleLines(i + 1)
        }
        await new Promise(r => setTimeout(r, 80))
      }
    }

    runLines()
    return () => { cancelled = true }
  }, [active])

  useEffect(() => {
    if (bottomRef.current) {
      bottomRef.current.parentElement?.scrollTo({
        top: bottomRef.current.offsetTop,
        behavior: 'smooth'
      })
    }
  }, [visibleLines, currentText])

  return (
    <div className="w-full h-full bg-surface border border-border flex flex-col overflow-hidden"
      style={{ fontFamily: 'JetBrains Mono, monospace' }}>
      {/* Terminal top bar */}
      <div className="flex items-center gap-2 px-4 py-3 border-b border-border shrink-0">
        <div className="w-3 h-3 rounded-full bg-red-500/60" />
        <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
        <div className="w-3 h-3 rounded-full bg-green-500/60" />
        <span className="ml-3 text-xs text-muted">tj@portfolio ~ </span>
      </div>

      {/* Terminal body */}
      <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-1 text-sm">
        {TERMINAL_LINES.slice(0, visibleLines).map((line, i) => (
          <div key={i} className={line.type === 'cmd' ? 'text-accent' : 'text-dim pl-2'}>
            {line.type === 'cmd' ? (
              <span><span className="text-muted">{'> '}</span>{line.text}</span>
            ) : (
              line.text
            )}
          </div>
        ))}

        {/* Currently typing line */}
        {typing && (
          <div className="text-accent">
            <span className="text-muted">{'> '}</span>
            {currentText}
            <span className="animate-pulse">▋</span>
          </div>
        )}

        {/* Idle cursor at end */}
        {!typing && visibleLines >= TERMINAL_LINES.length && (
          <div className="text-accent">
            <span className="text-muted">→ </span>
            <span className="animate-pulse">▋</span>
          </div>
        )}
        <div ref={bottomRef} />
      </div>
    </div>
  )
}

export default function Hero() {
  const [revealed, setRevealed] = useState(false)

  const line1 = useScramble('THOMAS', revealed)
  const line2 = useScramble('JOHNSON', revealed)

  useEffect(() => {
    const t = setTimeout(() => setRevealed(true), 300)
    return () => clearTimeout(t)
  }, [])

  return (
    <section id="home" className="relative min-h-screen flex flex-col overflow-hidden bg-bg">

      {/* Top bar */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: revealed ? 1 : 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="flex items-center justify-between px-6 md:px-12 pt-28 pb-4 border-b border-border">
        <span className="font-mono text-xs text-muted tracking-[0.25em] uppercase">Portfolio 2025</span>
        <span className="font-mono text-xs text-muted tracking-[0.25em] uppercase">San Jose, CA</span>
      </motion.div>

      {/* Main split */}
      <div className="flex-1 grid md:grid-cols-2 overflow-hidden">

        {/* Left — name */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: revealed ? 1 : 0, x: revealed ? 0 : -30 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="flex flex-col justify-center px-6 md:px-12 py-12 border-r border-border"
        >
          <div style={{
            fontFamily: 'Syne, sans-serif',
            fontWeight: 800,
            lineHeight: 0.88,
            letterSpacing: '-0.03em',
            fontSize: 'clamp(2.5rem, 5vw, 8rem)',
            whiteSpace: 'nowrap',
          }}>
            <div style={{ color: '#f0f0f0' }}>{line1}</div>
            <div style={{
              height: '1px',
              background: 'rgba(255,255,255,0.12)',
              margin: '0.3em 0',
            }} />
            <div style={{ color: '#e8e0d0' }}>{line2}</div>
          </div>

          <p className="font-body text-dim text-sm mt-8 max-w-xs leading-relaxed">
            CS student at SJSU. I build things that work.
          </p>

          <div className="flex items-center gap-4 mt-8">
            <a href="#projects"
              className="font-mono text-sm px-6 py-3 bg-accent text-bg font-medium hover:bg-text transition-colors duration-200">
              View Work
            </a>
            <a href="#contact"
              className="font-mono text-sm px-6 py-3 border border-border text-dim hover:border-accent hover:text-accent transition-all duration-200">
              Get in Touch
            </a>
          </div>
        </motion.div>

        {/* Right — terminal */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: revealed ? 1 : 0, x: revealed ? 0 : 30 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="flex items-center justify-center p-8 md:p-12"
        >
          <div className="w-full max-w-md" style={{ height: '380px' }}>
            <Terminal active={revealed} />
          </div>
        </motion.div>
      </div>
    </section>
  )
}