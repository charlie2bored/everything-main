'use client'

import Link from 'next/link'
import { m } from 'framer-motion'
import Row from '@/components/Row'
import { getAllProjects } from '@/lib/projects'
import { fadeUp, stagger } from '@/app/providers/MotionProvider'

export default function WorkPage() {
  const projects = getAllProjects()
  
  return (
    <main>
      {/* Header */}
      <section className="work-header" style={{ paddingTop: '120px', paddingBottom: '60px' }}>
        <div className="container">
          <nav style={{ marginBottom: '40px' }}>
            <Link href="/" className="breadcrumb-link">
              ← Back to Home
            </Link>
          </nav>
          
          <m.div 
            initial="hidden"
            animate="show"
            variants={stagger(0.1)}
          >
            <m.h1 
              className="section-title"
              variants={fadeUp}
            >
              All Work
            </m.h1>
            <m.p 
              className="section-subtitle"
              variants={fadeUp}
            >
              A comprehensive look at my design and development projects.
            </m.p>
          </m.div>
        </div>
      </section>

      {/* Work Grid */}
      <section className="work" id="work">
        <div className="work-container">
          <ul className="work-rows" role="list">
            {projects.map((project, index) => (
              <Row 
                key={project.slug}
                project={project}
                index={index}
              />
            ))}
          </ul>
        </div>
      </section>
    </main>
  )
}
