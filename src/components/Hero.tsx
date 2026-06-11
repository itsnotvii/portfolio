import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'

const COLS = 16
const ROWS = 10

export default function Hero() {
  const gridRef = useRef<HTMLDivElement>(null)
  const [revealed, setRevealed] = useState(false)

  useEffect(() => {
    const tiles = gridRef.current?.querySelectorAll<HTMLDivElement>('.tile')
    if (!tiles) return

    let count = 0
    const total = tiles.length

    const reveal = () => {
      const idx = Math.floor(Math.random() * total)
      const tile = tiles[idx]
      if (tile && tile.style.opacity !== '0') {
        tile.style.opacity = '0'
        tile.style.transform = 'scale(1.2)'
        count++
        if (count >= total * 0.6 && !revealed) setRevealed(true)
      }
    }

    const interval = setInterval(reveal, 18)
    const timeout = setTimeout(() => {
      clearInterval(interval)
      tiles.forEach((t) => { t.style.opacity = '0' })
    }, 1800)

    return () => { clearInterval(interval); clearTimeout(timeout) }
  }, [])

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-bg">

      {/* Deconstructed background typography */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none select-none">
        {/* THOMA - top left, cropped on right */}
        <div style={{
          position: 'absolute',
          top: '-2vw',
          left: '-1vw',
          fontSize: '28vw',
          fontFamily: 'Syne, sans-serif',
          fontWeight: 800,
          color: 'transparent',
          WebkitTextStroke: '1px rgba(255,255,255,0.06)',
          lineHeight: 1,
          whiteSpace: 'nowrap',
          letterSpacing: '-0.03em',
        }}>
          THOMA
        </div>

        {/* S - rotated, right side */}
        <div style={{
          position: 'absolute',
          top: '8vw',
          right: '-4vw',
          fontSize: 'Syne, sans-serif',
          fontWeight: 800,
          color: 'transparent',
          WebkitTextStroke: '1px rgba(255,255,255,0.05)',
          lineHeight: 1,
          transform: 'rotate(90deg)',
          letterSpacing: '-0.03em',
        }}>
          S
        </div>

        {/* JOHNS - bottom left */}
        <div style={{
          position: 'absolute',
          bottom: '2vw',
          left: '-1vw',
          fontSize: '22vw',
          fontFamily: 'Syne, sans-serif',
          fontWeight: 800,
          color: 'transparent',
          WebkitTextStroke: '1px rgba(255,255,255,0.06)',
          lineHeight: 1,
          whiteSpace: 'nowrap',
          letterSpacing: '-0.03em',
        }}>
          JOHNS
        </div>
      </div>


      {/* Tile grid */}
      <div ref={gridRef} className="absolute inset-0 z-10 pointer-events-none"
        style={{ display: 'grid', gridTemplateColumns: `repeat(${COLS}, 1fr)`, gridTemplateRows: `repeat(${ROWS}, 1fr)`, gap: '1px' }}>
        {Array.from({ length: COLS * ROWS }).map((_, i) => (
          <div key={i} className="tile" style={{
            background: 'rgba(255,255,255,0.055)',
            transition: 'opacity 0.6s cubic-bezier(0.2,0.9,0.3,1.1), transform 0.6s cubic-bezier(0.2,0.9,0.3,1.1)',
            opacity: 1,
          }} />
        ))}
      </div>

      {/* Subtle grid bg */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)',
        backgroundSize: '80px 80px',
      }} />

      {/* Content */}
      <div className="relative z-20 text-center px-6 max-w-3xl">
        <motion.p initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: revealed ? 1 : 0, y: revealed ? 0 : 10 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="font-mono text-xs text-dim tracking-[0.3em] uppercase mb-6">
          Software Engineer
        </motion.p>

        <motion.h1 initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: revealed ? 1 : 0, y: revealed ? 0 : 20 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="font-display font-extrabold text-6xl md:text-8xl tracking-tight text-text leading-none mb-6">
          Thomas<br />
          <span className="text-accent">Johnson</span>
        </motion.h1>

        <motion.p initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: revealed ? 1 : 0, y: revealed ? 0 : 10 }}
          transition={{ duration: 0.6, delay: 0.35 }}
          className="font-body text-dim text-lg mb-10 max-w-md mx-auto leading-relaxed">
          Building clean, thoughtful software. Currently studying Software Engineering at SJSU.
        </motion.p>

        <motion.div initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: revealed ? 1 : 0, y: revealed ? 0 : 10 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="flex items-center justify-center gap-4">
          <a href="#projects"
            className="font-mono text-sm px-6 py-3 bg-accent text-bg font-medium hover:bg-text transition-colors duration-200">
            View Work
          </a>
          <a href="#contact"
            className="font-mono text-sm px-6 py-3 border border-border text-dim hover:border-accent hover:text-accent transition-all duration-200">
            Get in Touch
          </a>
        </motion.div>
      </div>

      {/* Scroll hint */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: revealed ? 0.4 : 0 }}
        transition={{ delay: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
        <span className="font-mono text-[10px] text-dim tracking-widest uppercase">Scroll</span>
        <div className="w-px h-8 bg-gradient-to-b from-dim to-transparent" />
      </motion.div>
    </section>
  )
}