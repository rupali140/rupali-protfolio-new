import useScrollReveal from '../hooks/useScrollReveal.js'
import './ProjectCard.css'

const SPARK_W = 160
const SPARK_H = 48
const PAD = 4

function sparkPath(values) {
  const step = (SPARK_W - PAD * 2) / (values.length - 1)
  return values
    .map((v, i) => {
      const x = PAD + i * step
      const y = SPARK_H - PAD - v * (SPARK_H - PAD * 2)
      return `${i === 0 ? 'M' : 'L'}${x.toFixed(1)},${y.toFixed(1)}`
    })
    .join(' ')
}

export default function ProjectCard({ project, index, reducedMotion }) {
  const revealRef = useScrollReveal(reducedMotion)
  const d = sparkPath(project.spark)

  return (
    <article ref={revealRef} className="reveal reveal-stagger project-card" style={{ '--i': index }}>
      <div className="project-card__top">
        <span className="project-card__tag">{project.tag}</span>
        <span className="project-card__live">● Live</span>
      </div>

      <h3 className="project-card__title">{project.title}</h3>
      <p className="project-card__desc">{project.description}</p>

      <svg
        className="project-card__spark"
        viewBox={`0 0 ${SPARK_W} ${SPARK_H}`}
        aria-hidden="true"
        preserveAspectRatio="none"
      >
        <path d={d} className="project-card__spark-line" />
        <path d={d} className="project-card__spark-glow" />
      </svg>

      <ul className="project-card__stack">
        {project.stack.map((s) => (
          <li key={s}>{s}</li>
        ))}
      </ul>

      <a href={project.link} target="_blank" rel="noopener noreferrer" className="project-card__link">
        View live project ↗
      </a>
    </article>
  )
}
