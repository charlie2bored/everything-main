'use client'

import { useState } from 'react'
import { Metadata } from 'next'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Row from '@/components/Row'
import FilterChips from '@/components/FilterChips'
import { getAllProjects, getAllTags, getProjectsByTag } from '@/lib/projects'

const allProjects = getAllProjects()
const allTags = getAllTags()

export default function WorkPage() {
  const [activeFilter, setActiveFilter] = useState('All')
  
  const filteredProjects = activeFilter === 'All' 
    ? allProjects 
    : getProjectsByTag(activeFilter)

  const handleFilterChange = (filter: string) => {
    setActiveFilter(filter)
  }

  return (
    <>
      <Header />
      
      <main id="main" className="work-page">
        {/* Header Section */}
        <header className="work-page__header">
          <div className="work-page__header-container">
            <h1 className="work-page__title">
              All Work
            </h1>
            <p className="work-page__subtitle">
              {allProjects.length} projects across branding, web, motion, and UX
            </p>
          </div>
        </header>

        {/* Filter Section */}
        <section className="work-page__filters" aria-label="Filter projects">
          <div className="work-page__filters-container">
            <FilterChips
              tags={allTags}
              activeFilter={activeFilter}
              onFilterChange={handleFilterChange}
            />
          </div>
        </section>

        {/* Projects Grid */}
        <section className="work-page__projects" aria-labelledby="projects-heading">
          <div className="work-page__projects-container">
            <h2 id="projects-heading" className="sr-only">
              {activeFilter === 'All' 
                ? 'All projects' 
                : `Projects filtered by ${activeFilter}`
              }
            </h2>
            
            {filteredProjects.length > 0 ? (
              <div className="work-page__grid">
                {filteredProjects.map((project, index) => (
                  <Row 
                    key={project.slug}
                    project={project}
                    index={index}
                  />
                ))}
              </div>
            ) : (
              <div className="work-page__empty">
                <p className="work-page__empty-text">
                  No projects found for the selected filter.
                </p>
                <button
                  type="button"
                  className="btn btn--secondary"
                  onClick={() => handleFilterChange('All')}
                >
                  <span className="btn__text">Show all projects</span>
                </button>
              </div>
            )}
          </div>
        </section>

        {/* CTA Section */}
        <section className="work-page__cta" aria-labelledby="cta-heading">
          <div className="work-page__cta-container">
            <h2 id="cta-heading" className="work-page__cta-title">
              Ready to start your project?
            </h2>
            <p className="work-page__cta-subtitle">
              Let's discuss how we can create something amazing together
            </p>
            <a 
              href="/contact" 
              className="btn btn--primary"
              aria-label="Start a project"
            >
              <span className="btn__text">Let's collaborate</span>
            </a>
          </div>
        </section>
      </main>

      <Footer />
    </>
  )
}

// Generate metadata (this will be called at build time for static export)
export const metadata: Metadata = {
  title: 'Work — Charlie',
  description: `Browse ${allProjects.length} projects across branding, web design, motion, and UX. View detailed case studies with measurable outcomes.`,
  openGraph: {
    title: 'Work — Charlie',
    description: `${allProjects.length} projects with measurable outcomes`,
    type: 'website',
    url: 'https://everything-evu.pages.dev/work/',
    images: [
      {
        url: '/assets/og/work.jpg',
        width: 1200,
        height: 630,
        alt: 'Charlie Work Portfolio - Project case studies',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Work — Charlie',
    description: `${allProjects.length} projects with measurable outcomes`,
    images: ['/assets/og/work.jpg'],
  },
}