'use client'

import Link from 'next/link'
import Image from 'next/image'
import { m } from 'framer-motion'
import { Project } from '@/lib/projects'
import TagChips from './TagChips'
import { fadeUp, stagger } from '@/app/providers/MotionProvider'

interface CaseStudyContentProps {
  project: Project
}

export default function CaseStudyContent({ project }: CaseStudyContentProps) {
  return (
    <main className="case-study-content">
      {/* Breadcrumb */}
      <nav className="breadcrumb">
        <Link href="/#work" className="breadcrumb-link">
          ← Back to Work
        </Link>
      </nav>

      {/* Header */}
      <m.header 
        className="case-study-section"
        initial="hidden"
        animate="show"
        variants={stagger(0.1)}
      >
        <m.h1 variants={fadeUp}>{project.title}</m.h1>
        <m.p variants={fadeUp}>{project.subtitle}</m.p>
        <m.div variants={fadeUp}>
          <TagChips tags={project.tags} />
        </m.div>
      </m.header>

      {/* Meta Information */}
      <m.section 
        className="case-study-section"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        variants={stagger(0.05)}
      >
        <div className="meta-grid">
          <m.div className="meta-item" variants={fadeUp}>
            <h3>Role</h3>
            <p>{project.role}</p>
          </m.div>
          <m.div className="meta-item" variants={fadeUp}>
            <h3>Timeline</h3>
            <p>{project.timeline}</p>
          </m.div>
          <m.div className="meta-item" variants={fadeUp}>
            <h3>Tags</h3>
            <TagChips tags={project.tags} />
          </m.div>
          <m.div className="meta-item" variants={fadeUp}>
            <h3>Links</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {project.live && (
                <a 
                  href={project.live} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="btn-link"
                >
                  View Live Site
                </a>
              )}
              {project.repo && (
                <a 
                  href={project.repo} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="btn-link"
                >
                  View Repository
                </a>
              )}
            </div>
          </m.div>
        </div>
      </m.section>

      {/* Overview */}
      <m.section 
        className="case-study-section"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        variants={fadeUp}
      >
        <h2>Overview</h2>
        <p>{project.summary}</p>
      </m.section>

      {/* Process */}
      <m.section 
        className="case-study-section"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        variants={stagger(0.1)}
      >
        <m.h2 variants={fadeUp}>Process</m.h2>
        <div>
          {project.process.map((step, index) => (
            <m.p key={index} variants={fadeUp}>
              {step}
            </m.p>
          ))}
        </div>
      </m.section>

      {/* Gallery */}
      {project.gallery && project.gallery.length > 0 && (
        <m.section 
          className="case-study-section"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={stagger(0.1)}
        >
          <m.h2 variants={fadeUp}>Gallery</m.h2>
          <m.div className="cs-gallery" variants={fadeUp}>
            {project.gallery.map((imageSrc, index) => (
              <m.div 
                key={index} 
                className="cs-media"
                variants={fadeUp}
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <Image
                  src={imageSrc}
                  alt={`${project.title} gallery image ${index + 1}`}
                  width={800}
                  height={600}
                  loading="lazy"
                  style={{ 
                    width: '100%', 
                    height: 'auto',
                    borderRadius: 'var(--radius-sm)'
                  }}
                />
              </m.div>
            ))}
          </m.div>
        </m.section>
      )}

      {/* Outcomes */}
      <m.section 
        className="case-study-section"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        variants={stagger(0.05)}
      >
        <m.h2 variants={fadeUp}>Outcomes</m.h2>
        <m.ul className="cs-outcomes" variants={fadeUp}>
          {project.outcomes.map((outcome, index) => (
            <m.li 
              key={index}
              variants={fadeUp}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              {outcome}
            </m.li>
          ))}
        </m.ul>
      </m.section>

      {/* CTA Section */}
      <m.section 
        className="cta-section"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        variants={stagger(0.1)}
      >
        <m.h2 variants={fadeUp}>Let's Work Together</m.h2>
        <m.p variants={fadeUp}>
          Interested in collaborating on your next project? I'd love to hear about your vision and explore how we can bring it to life.
        </m.p>
        <m.div variants={fadeUp}>
          <Link href="/#contact" className="btn-primary">
            <span className="btn-text">Get In Touch</span>
            <div className="btn-ripple"></div>
          </Link>
        </m.div>
      </m.section>
    </main>
  )
}
