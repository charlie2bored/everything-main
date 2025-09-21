'use client'

import { useState } from 'react'
import Link from 'next/link'
import { m } from 'framer-motion'
import { Project, hasBeforeAfter, getProjectStructuredData } from '@/lib/projects'
import Header from './Header'
import Footer from './Footer'
import StickyToc from './StickyToc'
import { MetricGrid } from './MetricBadge'
import Testimonial from './Testimonial'
import Lightbox from './Lightbox'
import BeforeAfter from './BeforeAfter'
import { MediaGrid } from './Media'
import TagChips from './TagChips'
import { fadeUp, stagger } from '@/app/providers/MotionProvider'

interface CaseStudyContentProps {
  project: Project
}

export default function CaseStudyContent({ project }: CaseStudyContentProps) {
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [lightboxIndex, setLightboxIndex] = useState(0)

  const sections = [
    { id: 'overview', title: 'Overview' },
    { id: 'problem', title: 'Problem' },
    { id: 'insights', title: 'Insights' },
    { id: 'solution', title: 'Solution' },
    { id: 'outcomes', title: 'Outcomes' },
    { id: 'gallery', title: 'Gallery' }
  ]

  const handleImageClick = (index: number) => {
    setLightboxIndex(index)
    setLightboxOpen(true)
  }

  const projectStructuredData = getProjectStructuredData(project)

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(projectStructuredData) }}
      />
      
      <Header />
      
      {/* Sticky TOC */}
      <StickyToc sections={sections} />

      <main id="main" className="case-study">
        {/* Hero Section */}
        <header className="case-study__hero">
          <div className="case-study__container">
            <m.div
              className="case-study__hero-content"
              initial="hidden"
              animate="show"
              variants={stagger(0.06)}
            >
              <m.h1 
                className="case-study__title"
                variants={fadeUp}
              >
                {project.title}
              </m.h1>
              <m.p 
                className="case-study__subtitle"
                variants={fadeUp}
              >
                {project.subtitle}
              </m.p>
              <m.div variants={fadeUp}>
                <TagChips tags={project.tags} variant="light" />
              </m.div>
            </m.div>

            {/* Meta Grid */}
            <m.div 
              className="case-study__meta"
              initial="hidden"
              animate="show"
              variants={stagger(0.04)}
            >
              <m.div className="meta-item" variants={fadeUp}>
                <h3 className="meta-label">Client</h3>
                <p className="meta-value">{project.client}</p>
              </m.div>
              <m.div className="meta-item" variants={fadeUp}>
                <h3 className="meta-label">Industry</h3>
                <p className="meta-value">{project.industry}</p>
              </m.div>
              <m.div className="meta-item" variants={fadeUp}>
                <h3 className="meta-label">Role</h3>
                <p className="meta-value">{Array.isArray(project.role) ? project.role.join(', ') : project.role}</p>
              </m.div>
              <m.div className="meta-item" variants={fadeUp}>
                <h3 className="meta-label">Timeline</h3>
                <p className="meta-value">{project.timeline}</p>
              </m.div>
            </m.div>
          </div>
        </header>

        <div className="case-study__content">
          <div className="case-study__container">
            
            {/* Overview */}
            <section id="overview" className="case-study__section">
              <m.h2 
                className="section-title"
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.38 }}
              >
                Overview
              </m.h2>
              <m.div 
                className="section-content"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <p className="section-text">
                  {project.solution}
                </p>
              </m.div>
            </section>

            {/* Problem */}
            <section id="problem" className="case-study__section">
              <m.h2 
                className="section-title"
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.38 }}
              >
                Problem
              </m.h2>
              <m.div 
                className="section-content"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <p className="section-text">
                  {project.problem}
                </p>
              </m.div>
            </section>

            {/* Insights */}
            <section id="insights" className="case-study__section">
              <m.h2 
                className="section-title"
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.38 }}
              >
                Insights
              </m.h2>
              <m.div 
                className="section-content"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <ul className="insights-list">
                  {project.insights.map((insight, index) => (
                    <m.li 
                      key={index}
                      className="insight-item"
                      initial={{ opacity: 0, x: -12 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: index * 0.1 }}
                    >
                      {insight}
                    </m.li>
                  ))}
                </ul>
              </m.div>
            </section>

            {/* Solution */}
            <section id="solution" className="case-study__section">
              <m.h2 
                className="section-title"
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.38 }}
              >
                Solution
              </m.h2>
              <m.div 
                className="section-content"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <p className="section-text">
                  {project.solution}
                </p>

                {/* Before/After if available */}
                {hasBeforeAfter(project) && (
                  <div className="before-after-section">
                    <h3 className="subsection-title">Before & After</h3>
                    <BeforeAfter
                      beforeSrc={project.before!}
                      afterSrc={project.after!}
                      beforeAlt={`${project.title} before redesign`}
                      afterAlt={`${project.title} after redesign`}
                    />
                  </div>
                )}
              </m.div>
            </section>

            {/* Outcomes */}
            <section id="outcomes" className="case-study__section">
              <m.h2 
                className="section-title"
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.38 }}
              >
                Outcomes
              </m.h2>
              <m.div 
                className="section-content"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                {/* KPI Metrics */}
                {project.kpis && project.kpis.length > 0 && (
                  <div className="outcomes-kpis">
                    <h3 className="subsection-title">Key Metrics</h3>
                    <MetricGrid kpis={project.kpis} className="case-study-metrics" />
                  </div>
                )}

                {/* Testimonial */}
                {project.testimonial && (
                  <div className="outcomes-testimonial">
                    <Testimonial 
                      testimonial={project.testimonial} 
                      variant="featured"
                      delay={0.2}
                    />
                  </div>
                )}
              </m.div>
            </section>

            {/* Gallery */}
            {project.gallery && project.gallery.length > 0 && (
              <section id="gallery" className="case-study__section">
                <m.h2 
                  className="section-title"
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.38 }}
                >
                  Gallery
                </m.h2>
                <m.div 
                  className="section-content"
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                >
                  <MediaGrid 
                    items={project.gallery} 
                    onImageClick={handleImageClick}
                    className="case-study-gallery"
                  />
                </m.div>
              </section>
            )}

            {/* Navigation */}
            <section className="case-study__navigation">
              <Link 
                href="/work"
                className="btn btn--secondary"
              >
                <span className="btn__text">← Back to Work</span>
              </Link>
              
              <Link 
                href="/contact"
                className="btn btn--primary"
              >
                <span className="btn__text">Start your project</span>
              </Link>
            </section>
          </div>
        </div>
      </main>

      {/* Lightbox */}
      {project.gallery && (
        <Lightbox
          images={project.gallery}
          initialIndex={lightboxIndex}
          isOpen={lightboxOpen}
          onClose={() => setLightboxOpen(false)}
        />
      )}

      <Footer />
    </>
  )
}
