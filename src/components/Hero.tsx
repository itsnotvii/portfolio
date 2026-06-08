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
        
    )
}