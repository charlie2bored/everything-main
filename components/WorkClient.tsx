'use client'

import { useMemo, useState } from 'react'
import { m } from 'framer-motion'
import Button from './Button'
import FilterChips from './FilterChips'
import Row from './Row'
import { Project } from '@/lib/projects'
import { fadeUp, stagger } from '@/app/providers/MotionProvider'

type FilterType = 'All' | 'Branding' | 'Web' | 'Motion' | 'UX'

interface WorkClientProps {
  projects: Project[]
}

export default function WorkClient({ projects }: WorkClientProps) {
  const [activeFilter, setActiveFilter] = useState<FilterType>('All')

  const filteredProjects = useMemo(() => {
    if (activeFilter === 'All') return projects
    return projects.filter(project => 
      project.tags?.some(tag => tag.toLowerCase() === activeFilter.toLowerCase())
    )
  }, [activeFilter, projects])

  const allTags = useMemo(() => {
    const tags = new Set<string>()
    projects.forEach(project => {
      project.tags?.forEach(tag => tags.add(tag))
    })
    return Array.from(tags).sort()
  }, [projects])

  const handleFilterChange = (filter: string) => {
    setActiveFilter(filter as FilterType)
  }

  return (
    <main id="main" className="work-page">
      {/* Header Section */}
      <m.header 
        className="work-page__header"
        initial="hidden"
        animate="show"
        variants={stagger(0.06)}
      >
        <div className="work-page__header-container content-grid">
          <m.h1 
            className="work-page__title"
            variants={fadeUp}
          >
            All Work
          </m.h1>
          <m.p 
            className="work-page__subtitle"
            variants={fadeUp}
          >
            {projects.length} projects across branding, web, motion, and UX
          </m.p>
        </div>
      </m.header>

      {/* Filter Section */}
      <section 
        className="work-page__filters section" 
        aria-label="Filter projects"
        style={{ contentVisibility: 'auto', containIntrinsicSize: '200px' }}
      >
        <div className="work-page__filters-container content-grid">
          <div className="chips" role="tablist" aria-label="Work filters">
            {['All', ...allTags].map(tag => (
              <button
                key={tag}
                role="tab"
                aria-selected={activeFilter === tag}
                onClick={() => handleFilterChange(tag)}
                className={`chip ${activeFilter === tag ? 'chip--active' : ''}`}
                type="button"
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section 
        className="work-page__projects section" 
        aria-labelledby="projects-heading"
        style={{ contentVisibility: 'auto', containIntrinsicSize: '2000px' }}
      >
        <div className="work-page__projects-container content-grid">
          <h2 id="projects-heading" className="sr-only">
            {activeFilter === 'All' 
              ? 'All projects' 
              : `Projects filtered by ${activeFilter}`
            }
          </h2>
          
          {filteredProjects.length > 0 ? (
            <m.div 
              className="work-page__grid"
              initial="hidden"
              animate="show"
              variants={stagger(0.06)}
            >
              {filteredProjects.map((project, index) => (
                <article 
                  key={project.slug} 
                  className="project-row section"
                  style={{ contentVisibility: 'auto', containIntrinsicSize: '800px' }}
                >
                  <div className="row-content">
                    <div className="col-text">
                      <h3 className="project-title">{project.title}</h3>
                      {project.subtitle && (
                        <p className="project-subtitle">{project.subtitle}</p>
                      )}
                      
                      <div className="chips">
                        {project.tags?.map(tag => (
                          <span key={tag} className="chip chip--light">
                            {tag}
                          </span>
                        ))}
                      </div>
                      
                      {project.kpis?.[0] && (
                        <div className="project-kpi">
                          <span className="kpi-label">{project.kpis[0].label}</span>
                          {project.kpis[0].change && (
                            <span className="kpi-change">{project.kpis[0].change}</span>
                          )}
                        </div>
                      )}
                    </div>

                    <a 
                      className="col-media media-wrap" 
                      href={`/case/${project.slug}/`} 
                      aria-label={`Open case study: ${project.title}`}
                      data-cursor-text="See the work"
                    >
                      <picture>
                        <source 
                          type="image/avif" 
                          srcSet={`${project.cover.replace(/\.(webp|jpg|png|avif)$/, '')}-960.avif 960w, ${project.cover.replace(/\.(webp|jpg|png|avif)$/, '')}-1280.avif 1280w`} 
                        />
                        <source 
                          type="image/webp" 
                          srcSet={`${project.cover.replace(/\.(webp|jpg|png|avif)$/, '')}-960.webp 960w, ${project.cover.replace(/\.(webp|jpg|png|avif)$/, '')}-1280.webp 1280w`} 
                        />
                        <img
                          src={project.cover}
                          alt={`${project.title} cover`}
                          width={1280}
                          height={720}
                          loading="lazy"
                          decoding="async"
                          sizes="(max-width: 600px) 100vw, (max-width: 1024px) 90vw, 50vw"
                        />
                      </picture>
                      <span className="see-pill" aria-hidden="true">
                        See the work
                      </span>
                    </a>
                  </div>
                </article>
              ))}
            </m.div>
          ) : (
            <m.div 
              className="work-page__empty"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
            >
              <p className="work-page__empty-text">
                No projects found for "{activeFilter}".
              </p>
              <Button
                onClick={() => handleFilterChange('All')}
                variant="ghost"
              >
                Show all projects
              </Button>
            </m.div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <m.section 
        className="work-page__cta section" 
        aria-labelledby="cta-heading"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: '-10% 0px -10% 0px' }}
        variants={stagger(0.06)}
        style={{ contentVisibility: 'auto', containIntrinsicSize: '400px' }}
      >
        <div className="work-page__cta-container content-grid">
          <m.h2 
            id="cta-heading" 
            className="work-page__cta-title"
            variants={fadeUp}
          >
            Ready to start your project?
          </m.h2>
          <m.p 
            className="work-page__cta-subtitle"
            variants={fadeUp}
          >
            Let's discuss how we can create something amazing together
          </m.p>
          <m.div variants={fadeUp}>
            <Button
              href="/contact"
              variant="primary"
              aria-label="Start a project"
            >
              Let's collaborate
            </Button>
          </m.div>
        </div>
      </m.section>
    </main>
  )
}
