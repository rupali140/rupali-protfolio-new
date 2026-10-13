import useReducedMotion from './hooks/useReducedMotion.js'
import Header from './components/Header.jsx'
import Hero from './components/Hero.jsx'
import About from './components/About.jsx'
import Projects from './components/Projects.jsx'
import Skills from './components/Skills.jsx'
import Contact from './components/Contact.jsx'
import Footer from './components/Footer.jsx'

export default function App() {
  const reducedMotion = useReducedMotion()

  return (
    <>
      <a href="#main" className="skip-link">
        Skip to main content
      </a>
      <Header reducedMotion={reducedMotion} />
      <main id="main">
        <Hero reducedMotion={reducedMotion} />
        <About reducedMotion={reducedMotion} />
        <Projects reducedMotion={reducedMotion} />
        <Skills reducedMotion={reducedMotion} />
        <Contact reducedMotion={reducedMotion} />
      </main>
      <Footer />
    </>
  )
}
