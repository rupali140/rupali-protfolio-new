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
            I'm a data science and analytics professional who enjoys turning messy, real-world data
            into clear, trustworthy insight. I care about asking the right question before reaching
            for a model, and about presenting findings so that a non-technical stakeholder can act
            on them with confidence. My day-to-day spans cleaning and exploring data, building
            dashboards, and communicating what the numbers actually mean.
          </p>
          <p className="about__text about__text--muted">
            Sample bio — replace with your own background, education, and the kind of work you're
            looking for.
          </p>
        </div>
      </div>
    </section>
  )
}
