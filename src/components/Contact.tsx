import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'

export default function Contact() {
    const ref = useRef<HTMLDivElement>(null)
    const inView = useInView(ref, { once: true, margin: '-100px' })
    const [status, setStatus] = useState<'idle' | 'sending' | 'sent'>('idle')

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setStatus('sending')
        setTimeout(() => setStatus('sent'), 1000)
    }

    
}