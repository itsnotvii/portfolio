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
            {/* Tile grid */}
            <div ref={gridRef} className="absolute inset-0 z-10 pointer-events-none"
                style={{ display: 'grid', gridTemplateColumns: `repeat(${COLS}, 1fr)`, gridTemplateRows: `repeat(${ROWS}, 1fr)`, gap: '1px'}}>
                {Array.from({ length: COLS * ROWS }).map((_, i) => (
                    <div key={i} className="tile" style={{
                        background: 'rgba(255,255,255,0.055)',
                        transition: 'opacity 0.6s cubic-bezier(0.2,0.9,0.3,1.1), transform 0.6s cubic-bezier(0.2,0.9,0.3,1.1)',
                        opacity: 1,
                    }} />
                ))}
                </div>

                
        </section>
    )
}