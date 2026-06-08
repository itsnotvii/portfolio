import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const links = ['Home', 'Projects', 'About', 'Contact']

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false)
    const [menuOpen, setMenuOpen] = useState(false)

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 40)
        window.addEventListener('scroll', onScroll)
        return () => window.removeEventListener('scroll', onScroll)
    }, [])

    return (
        <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
            scrolled ? 'bg-bg/90 backdrop-blyr-md border-b border-border' : 'bg-transparent'
        }`}>
            <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
                <a href="#home" className="font-display font-bold text-lg tracking-tight text-accent">TJ</a>

                <nav className="hidden md:flex items-center gap-8">
                    {links.map((link) => (
                        <a key={link} href={`#${link.toLowerCase()}`}
                        className="font-mono text-sm text-dim hover:text-text transition-colors duration-200">
                            {link}
                        </a>
                    ))}
                    <a href="https://github.com/itsnotvii" target="_blank" rel="noreferrer"
                    className="font-mono text-xs px-4 py-2 border border-border text-dim hover:border-accent hover:text-accent transition-all duration-200">
                        GitHub ↗
                    </a>
                </nav>
            </div>
        </header>
    )
   
}