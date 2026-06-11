import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'

const CHARS = 'THOMASJOHNSON'

function useScramble(target: string, trigger: boolean) {
  const [display, setDisplay] = useState(target.replace(/[A-Z0-9]/g, '?'))
  useEffect(() => {
    if (!trigger) return
    let frame = 0
    const totalFrames = 25
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
    }, 55)
    return () => clearInterval(interval)
  }, [trigger, target])
  return display
}

interface LetterPos {
  ox: number; oy: number
  x: number; y: number
  vx: number; vy: number
  angle: number
  angleSpeed: number
  swimRadius: number
  char: string
  fontSize: number
  opacity: number
}

export default function Hero() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const lettersRef = useRef<LetterPos[]>([])
  const mouseRef = useRef({ x: -9999, y: -9999 })
  const animRef = useRef<number>(0)
  const [revealed, setRevealed] = useState(false)

  const line1 = useScramble('THOMAS', revealed)
  const line2 = useScramble('JOHNSON', revealed)

  // Grain
  const grainRef = useRef<HTMLCanvasElement>(null)
  useEffect(() => {
    const canvas = grainRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    let animId: number
    const resize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight }
    resize()
    window.addEventListener('resize', resize)
    const drawGrain = () => {
      const { width, height } = canvas
      const imageData = ctx.createImageData(width, height)
      for (let i = 0; i < imageData.data.length; i += 4) {
        const val = Math.random() * 255
        imageData.data[i] = val; imageData.data[i+1] = val; imageData.data[i+2] = val; imageData.data[i+3] = 18
      }
      ctx.putImageData(imageData, 0, 0)
      animId = requestAnimationFrame(drawGrain)
    }
    drawGrain()
    return () => { cancelAnimationFrame(animId); window.removeEventListener('resize', resize) }
  }, [])

  // Swimming + fleeing letters
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      initLetters()
    }

    const initLetters = () => {
      const w = canvas.width
      const h = canvas.height
      const allChars = 'THOMASJOHNSON'.repeat(2).split('')

      lettersRef.current = allChars.map((char) => {
        const x = Math.random() * w
        const y = Math.random() * h
        return {
          char,
          ox: x,
          oy: y,
          x,
          y,
          vx: (Math.random() - 0.5) * 1.5,
          vy: (Math.random() - 0.5) * 1.5,
          angle: Math.random() * Math.PI * 2,
          angleSpeed: (Math.random() - 0.5) * 0.008,
          swimRadius: 40 + Math.random() * 80,
          fontSize: Math.min(w * 0.22, 200) * (0.2 + Math.random() * 0.9),
          opacity: 0.02 + Math.random() * 0.08,
        }
      })
    }

    resize()
    window.addEventListener('resize', resize)

    const onMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      mouseRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top }
    }
    window.addEventListener('mousemove', onMouseMove)

    const REPEL_RADIUS = 140
    const REPEL_STRENGTH = 5000
    const DAMPING = 0.88

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      const fontSize = Math.min(canvas.width * 0.22, 200)
      ctx.font = `800 ${fontSize}px Syne`
      ctx.textBaseline = 'alphabetic'

      lettersRef.current.forEach((l) => {
        l.angle += l.angleSpeed

        // Drift freely
        l.vx += Math.cos(l.angle) * 0.04
        l.vy += Math.sin(l.angle * 0.7) * 0.04

        // Repel from cursor
        const dx = l.x - mouseRef.current.x
        const dy = l.y - mouseRef.current.y
        const dist = Math.sqrt(dx * dx + dy * dy)
        if (dist < REPEL_RADIUS && dist > 0) {
          const force = (REPEL_RADIUS - dist) / REPEL_RADIUS
          l.vx += (dx / dist) * force * force * REPEL_STRENGTH * 0.01
          l.vy += (dy / dist) * force * force * REPEL_STRENGTH * 0.01
        }

        // Speed cap
        const speed = Math.sqrt(l.vx * l.vx + l.vy * l.vy)
        if (speed > 2.5) { l.vx = (l.vx / speed) * 2.5; l.vy = (l.vy / speed) * 2.5 }

        l.vx *= DAMPING
        l.vy *= DAMPING

        l.x += l.vx
        l.y += l.vy

        // Wrap around edges
        if (l.x > canvas.width + fontSize) l.x = -fontSize
        if (l.x < -fontSize) l.x = canvas.width + fontSize
        if (l.y > canvas.height + fontSize) l.y = -fontSize
        if (l.y < -fontSize) l.y = canvas.height + fontSize

        ctx.font = `800 ${l.fontSize}px Syne`
        ctx.fillStyle = `rgba(255,255,255,${l.opacity})`
        ctx.fillText(l.char, l.x, l.y)
      })

      animRef.current = requestAnimationFrame(draw)
    }

    draw()
    setTimeout(() => setRevealed(true), 300)

    return () => {
      cancelAnimationFrame(animRef.current)
      window.removeEventListener('resize', resize)
      window.removeEventListener('mousemove', onMouseMove)
    }
  }, [])

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-bg">
      <canvas ref={canvasRef} className="absolute inset-0 z-10 pointer-events-none" />
      <canvas ref={grainRef} className="absolute inset-0 z-20 pointer-events-none" />

      <div className="relative z-30 text-center px-6 max-w-4xl">
        <motion.p initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: revealed ? 1 : 0, y: revealed ? 0 : 10 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="font-mono text-xs text-dim tracking-[0.3em] uppercase mb-8">
          Software Engineer
        </motion.p>

        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: revealed ? 1 : 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
          className="font-display font-extrabold leading-none mb-8 tracking-tight"
          style={{ fontSize: 'clamp(3.5rem, 10vw, 8rem)' }}>
          <span className="block text-text font-mono">{line1}</span>
          <span className="block text-accent font-mono">{line2}</span>
        </motion.h1>

        <motion.p initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: revealed ? 1 : 0, y: revealed ? 0 : 10 }}
          transition={{ duration: 0.6, delay: 0.35 }}
          className="font-body text-dim text-lg mb-10 max-w-md mx-auto leading-relaxed">
          Software Engineering student at SJSU. Welcome to my internet section.
        </motion.p>

        <motion.div initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: revealed ? 1 : 0, y: revealed ? 0 : 10 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="flex items-center justify-center gap-4">
          <a href="#projects"
            className="font-mono text-sm px-6 py-3 bg-accent text-bg font-medium hover:bg-text transition-colors duration-200">
            View Projects
          </a>
          <a href="#contact"
            className="font-mono text-sm px-6 py-3 border border-border text-dim hover:border-accent hover:text-accent transition-all duration-200">
            Get in Touch
          </a>
        </motion.div>
      </div>

     
    </section>
  )
}