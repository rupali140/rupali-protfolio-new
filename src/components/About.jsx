import useScrollReveal from '../hooks/useScrollReveal.js'
import './About.css'

export default function About({ reducedMotion }) {
  const revealRef = useScrollReveal(reducedMotion)

  return (
    <section id="about">
      <div className="wrap">
        <div ref={revealRef} className="reveal about__content">
          <span className="section-label">About</span>
          <h2 className="section-title">A little about my approach.</h2>
          <p className="about__text">
            I'm Rupali Jat, an MCA student at Acropolis Institute of Technology and Research,
            Indore, exploring data science and analytics. I enjoy turning messy, real-world data
            into clear, trustworthy insight — asking the right question before reaching for a
            model, and presenting findings so a non-technical stakeholder can act on them with
            confidence. My work spans cleaning and exploring data, building dashboards, and
            communicating what the numbers actually mean.
          </p>
        </div>
      </div>
    </section>
  )
}
