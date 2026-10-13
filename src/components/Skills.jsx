import useScrollReveal from '../hooks/useScrollReveal.js'
import { skillGroups } from '../data/skills.js'
import './Skills.css'

export default function Skills({ reducedMotion }) {
  const revealRef = useScrollReveal(reducedMotion)

  return (
    <section id="skills" className="skills-section">
      <div className="wrap">
        <div ref={revealRef} className="reveal">
          <span className="section-label">Skills</span>
          <h2 className="section-title">Tools I work with.</h2>
          <p className="section-lede">Sample skill set — adjust to match your own toolkit.</p>
        </div>

        <div className="skills-grid">
          {skillGroups.map((group, i) => (
            <SkillGroup key={group.category} group={group} index={i} reducedMotion={reducedMotion} />
          ))}
        </div>
      </div>
    </section>
  )
}

function SkillGroup({ group, index, reducedMotion }) {
  const revealRef = useScrollReveal(reducedMotion)

  return (
    <div
      ref={revealRef}
      className="reveal reveal-stagger skills-card"
      style={{ '--i': index }}
    >
      <h3 className="skills-card__title">{group.category}</h3>
      <ul className="skills-card__list">
        {group.items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
  )
}
