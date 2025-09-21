import { Metadata } from 'next'
import Hero from '@/components/Hero'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Row from '@/components/Row'
import { ProofStrip } from '@/components/MetricBadge'
import { getSelectedWork, getAverageImprovement, getAllProjects } from '@/lib/projects'

export const metadata: Metadata = {
  title: 'Charlie — Designer & Developer',
  description: 'Building experiences that drive measurable results. Product designer and frontend developer focused on conversion-driven design systems.',
  openGraph: {
    title: 'Charlie — Designer & Developer',
    description: 'Building experiences that drive measurable results',
    images: ['/assets/og/home.jpg'],
  },
}

export default function HomePage() {
  const selectedWork = getSelectedWork()
  const allProjects = getAllProjects()
  
  // Generate proof metrics from all projects
  const proofMetrics = [
    { label: 'Average improvement', change: getAverageImprovement(allProjects) },
    { label: 'Projects completed', change: `${allProjects.length}+` },
    { label: 'Client satisfaction', change: '98%' },
    { label: 'Conversion increase', change: '+42%' }
  ]

  return (
    <>
      <Header />
      
      <main id="main">
        {/* Hero Section */}
        <Hero />

        {/* Selected Work Section */}
        <section id="work" className="selected-work" aria-labelledby="work-heading">
          <div className="selected-work__container">
            <header className="selected-work__header">
              <h2 id="work-heading" className="selected-work__title">
                Selected Work
              </h2>
              <p className="selected-work__subtitle">
                Recent projects with measurable outcomes
              </p>
            </header>

            <div className="selected-work__grid">
              {selectedWork.map((project, index) => (
                <Row 
                  key={project.slug}
                  project={project}
                  index={index}
                />
              ))}
            </div>

            <div className="selected-work__cta">
              <a 
                href="/work" 
                className="btn btn--secondary"
                aria-label="View all projects"
              >
                <span className="btn__text">View all work</span>
                <span aria-hidden="true">→</span>
              </a>
            </div>
          </div>
        </section>

        {/* Proof Strip */}
        <ProofStrip 
          metrics={proofMetrics}
          footnote="Results from client projects 2023-2024"
        />
      </main>

      <Footer />
    </>
  )
}