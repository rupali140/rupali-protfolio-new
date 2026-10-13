import useScrollReveal from '../hooks/useScrollReveal.js'
import ProjectCard from './ProjectCard.jsx'
import { projects } from '../data/projects.js'
import './Projects.css'

export default function Projects({ reducedMotion }) {
  const revealRef = useScrollReveal(reducedMotion)

  return (
    <section id="projects">
      <div className="wrap">
        <div ref={revealRef} className="reveal">
          <span className="section-label">Featured Projects</span>
          <h2 className="section-title">A few things I've worked on.</h2>
          <p className="section-lede">
            Sample projects below — swap in your own work, links, and write-ups.
          </p>
        </div>

        <div className="projects-grid">
          {projects.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} reducedMotion={reducedMotion} />
          ))}
        </div>
      </div>
    </section>
  )
}
