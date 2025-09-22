import { Metadata } from 'next'
import dynamic from 'next/dynamic'
import StaticHero from '@/components/StaticHero'
import StaticRow from '@/components/StaticRow'
import StaticHeader from '@/components/StaticHeader'
import { getSelectedWork, getAverageImprovement, getAllProjects } from '@/lib/projects'

const Footer = dynamic(() => import('@/components/Footer'), { ssr: false })
const Row = dynamic(() => import('@/components/Row'), { ssr: false })
const ProofStrip = dynamic(() => import('@/components/MetricBadge').then(m => ({ default: m.ProofStrip })), { ssr: false })

const EffectsGate = dynamic(() => import('@/components/EffectsGate'), { 
  ssr: false, 
  loading: () => null 
})

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
      
      <StaticHeader />
      
      <main id="main">
        {/* Hero Section - Static for faster rendering */}
        <StaticHero />
        
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

        {/* Proof Strip */}
        <div style={{ contentVisibility: 'auto', containIntrinsicSize: '300px' }}>
          <ProofStrip 
            metrics={proofMetrics}
            footnote="Results from client projects 2023-2024"
          />
        </div>
      </main>

      <Footer />
    </>
  )
}
