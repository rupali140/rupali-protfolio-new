import { scrollToId } from '../lib/scroll.js'
import ParticleField from './ParticleField.jsx'
import DataTrails from './DataTrails.jsx'
import RevenueChart from './RevenueChart.jsx'
import './Hero.css'

export default function Hero({ reducedMotion }) {
  return (
    <section id="home" className="hero">
      <div className="hero__bg">
        <ParticleField reducedMotion={reducedMotion} />
      </div>

      <div className="wrap hero__inner">
        <div className="hero__copy">
          <span className="section-label">Data Science &amp; Analytics</span>
          <h1 className="hero__headline">Turning data into decisions.</h1>
          <p className="hero__intro">
            I explore data, find what matters, and turn it into clear insights that drive real impact.
          </p>
          <div className="hero__actions">
            <button type="button" className="btn btn-primary" onClick={() => scrollToId('projects', reducedMotion)}>
              View my work
            </button>
            <button type="button" className="btn btn-secondary" onClick={() => scrollToId('contact', reducedMotion)}>
              Get in touch
            </button>
          </div>
        </div>

        <div className="hero__visual">
          <DataTrails />
          <RevenueChart reducedMotion={reducedMotion} />
        </div>
      </div>
    </section>
  )
}
