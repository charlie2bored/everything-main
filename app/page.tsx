import { Metadata } from 'next'
import Footer from '@/components/Footer'
import Row from '@/components/Row'
import { ProofStrip } from '@/components/MetricBadge'
import EffectsGate from '@/components/EffectsGate'
import Hero from '@/components/Hero'
import StaticRow from '@/components/StaticRow'
import { getSelectedWork, getAverageImprovement, getAllProjects } from '@/lib/projects'


export const metadata: Metadata = {
  title: 'Charlie — Designer & Developer',
  description: 'Brand systems + motion that convert. Identity, web, and UX that ship fast and move metrics.',
  openGraph: {
    title: 'Charlie — Designer & Developer',
    description: 'Brand systems + motion that convert',
    type: 'website',
    url: 'https://everything-evu.pages.dev/',
    images: [
      {
        url: '/assets/og/home.jpg',
        width: 1200,
        height: 630,
        alt: 'Charlie Portfolio - Brand systems + motion that convert',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Charlie — Designer & Developer',
    description: 'Brand systems + motion that convert',
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

  const websiteJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Charlie — Designer & Developer',
    url: 'https://everything-evu.pages.dev/',
    description: 'Brand systems + motion that convert. Identity, web, and UX that ship fast and move metrics.',
    author: {
      '@type': 'Person',
      name: 'Charlie',
      jobTitle: 'Designer & Frontend Developer',
      url: 'https://everything-evu.pages.dev/',
    },
    mainEntity: {
      '@type': 'Person',
      name: 'Charlie',
    },
    potentialAction: {
      '@type': 'SearchAction',
      target: 'https://everything-evu.pages.dev/work',
      'query-input': 'required name=search_term_string',
    },
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
      />
      
      
      <main id="main">
        {/* Hero Section with animated graphic/parallax */}
        <Hero />
        
        {/* Background effects - loads after idle, skipped on mobile */}
        <EffectsGate />

        {/* Selected Work Section */}
        <section id="work" className="selected-work" aria-labelledby="work-heading" style={{ contentVisibility: 'auto', containIntrinsicSize: '800px' }}>
          <div className="selected-work__container content-grid">
            <header className="selected-work__header">
              <h2 id="work-heading" className="selected-work__title">
                Selected work
              </h2>
              <p className="selected-work__subtitle">
                One project per row. Real constraints, real outcomes.
              </p>
            </header>

            <ul className="selected-work__grid">
              {selectedWork.map((project, index) => (
                index === 0 ? (
                  <StaticRow
                    key={project.slug}
                    project={project}
                    index={index}
                  />
                ) : (
                  <Row
                    key={project.slug}
                    project={project}
                    index={index}
                  />
                )
              ))}
            </ul>

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

        {/* About Section */}
        <section id="about" className="about-page__bio section" aria-labelledby="about-heading" style={{ contentVisibility: 'auto', containIntrinsicSize: '600px' }}>
          <div className="selected-work__container content-grid">
            <h2 id="about-heading" className="selected-work__title">About</h2>
            <p className="about-page__subtitle">NYC-based designer & front-end dev focused on intentional, conversion-aware brand and product experiences.</p>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="services-page__cta section" aria-labelledby="contact-heading">
          <div className="services-page__cta-container">
            <h2 id="contact-heading" className="services-page__cta-title">Start a project</h2>
            <p className="services-page__cta-subtitle">Tell me about your goals and timeline. I’ll reply within 24 hours.</p>
            <a href="/contact" className="btn btn--primary" aria-label="Start a project">
              <span className="btn__text">Get in touch</span>
            </a>
          </div>
        </section>
      </main>

      <Footer />
    </>
  )
}
