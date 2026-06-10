import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Projects from './components/Project'
import About from './components/About'
import Contact from './components/Contact'
import Footer from './components/Footer'

export default function App() {
  return (
    <div className="min-h-screen bg-bg text-text">
      <Navbar />
        <main>
          <Hero />
          <div className="border-t border-border" />
          <Projects />
          <div className="border-t border-border" />
          <About />
          <div className="border-t border-border" />
          <Contact />
        </main>
        <Footer />
    </div>
  )
}