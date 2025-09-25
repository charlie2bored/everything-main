import { Metadata } from 'next'
import Footer from '@/components/Footer'
import { MetricGrid } from '@/components/MetricBadge'

export const metadata: Metadata = {
  title: 'Services — Charlie',
  description: 'Brand systems, product websites, and motion design services with clear timelines, pricing, and expected outcomes.',
  openGraph: {
    title: 'Services — Charlie',
    description: 'Brand systems, product websites, and motion design services',
    images: ['/assets/og/services.jpg'],
  },
}

const services = [
  {
    id: 'brand-system',
    title: 'Brand System',
    subtitle: 'Complete visual identity and guidelines',
    scope: [
      'Logo design and variations',
      'Color palette and typography',
      'Brand guidelines document',
      'Business card and letterhead',
      'Social media templates',
      'Icon set (up to 20 icons)'
    ],
    deliverables: [
      'Brand strategy document',
      'Logo files (SVG, PNG, PDF)',
      'Complete brand guidelines',
      'Stationery templates',
      'Digital asset library'
    ],
    timeline: '6-8 weeks',
    startingPrice: '$8,500',
    expectedKpis: [
      { label: 'Brand recognition', change: '+40%' },
      { label: 'Marketing consistency', change: '+60%' },
      { label: 'Customer trust', change: '+25%' }
    ]
  },
  {
    id: 'product-website',
    title: 'Product Website',
    subtitle: 'Conversion-optimized websites that drive results',
    scope: [
      'UX research and strategy',
      'Custom design system',
      'Responsive development',
      'CMS setup (if needed)',
      'Performance optimization',
      'Analytics integration'
    ],
    deliverables: [
      'Figma design files',
      'Responsive website',
      'Performance report',
      'SEO optimization',
      'CMS training (if applicable)',
      '30-day support period'
    ],
    timeline: '8-12 weeks',
    startingPrice: '$15,000',
    expectedKpis: [
      { label: 'Conversion rate', change: '+35%' },
      { label: 'Page load speed', change: '+50%' },
      { label: 'Mobile usability', change: '+45%' }
    ]
  },
  {
    id: 'motion-launch',
    title: 'Motion & Launch',
    subtitle: 'Animated experiences and launch campaigns',
    scope: [
      'Motion design system',
      'Micro-interactions',
      'Video content creation',
      'Social media animations',
      'Launch campaign assets',
      'Email templates'
    ],
    deliverables: [
      'Motion guidelines',
      'Component library',
      'Video assets (3-5 pieces)',
      'Social media kit',
      'Launch timeline',
      'Performance tracking setup'
    ],
    timeline: '4-6 weeks',
    startingPrice: '$6,500',
    expectedKpis: [
      { label: 'User engagement', change: '+55%' },
      { label: 'Time on page', change: '+30%' },
      { label: 'Social shares', change: '+40%' }
    ]
  }
]

export default function ServicesPage() {
  return (
    <>
      <main id="main" className="services-page">
        {/* Header Section */}
        <header className="services-page__header">
          <div className="services-page__header-container">
            <h1 className="services-page__title">
              Services
            </h1>
            <p className="services-page__subtitle">
              Clear processes, transparent pricing, and measurable outcomes
            </p>
          </div>
        </header>

        {/* Services Grid */}
        <section className="services-page__content" aria-labelledby="services-heading">
          <div className="services-page__container">
            <h2 id="services-heading" className="sr-only">Available services</h2>
            
            <div className="services-grid">
              {services.map((service, index) => (
                <article key={service.id} className="service-card">
                  <header className="service-card__header">
                    <h3 className="service-card__title">
                      {service.title}
                    </h3>
                    <p className="service-card__subtitle">
                      {service.subtitle}
                    </p>
                  </header>

                  <div className="service-card__content">
                    {/* Scope */}
                    <div className="service-card__section">
                      <h4 className="service-card__section-title">What's included</h4>
                      <ul className="service-card__list">
                        {service.scope.map((item, i) => (
                          <li key={i} className="service-card__list-item">
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Deliverables */}
                    <div className="service-card__section">
                      <h4 className="service-card__section-title">What you get</h4>
                      <ul className="service-card__list">
                        {service.deliverables.map((item, i) => (
                          <li key={i} className="service-card__list-item">
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Timeline & Pricing */}
                    <div className="service-card__meta">
                      <div className="service-card__meta-item">
                        <span className="service-card__meta-label">Timeline</span>
                        <span className="service-card__meta-value">{service.timeline}</span>
                      </div>
                      <div className="service-card__meta-item">
                        <span className="service-card__meta-label">Starting at</span>
                        <span className="service-card__meta-value service-card__meta-value--price">
                          {service.startingPrice}
                        </span>
                      </div>
                    </div>

                    {/* Expected KPIs */}
                    <div className="service-card__section">
                      <h4 className="service-card__section-title">Expected outcomes</h4>
                      <MetricGrid kpis={service.expectedKpis} className="service-card__metrics" />
                    </div>
                  </div>

                  <footer className="service-card__footer">
                    <a 
                      href={`/contact?service=${service.id}`}
                      className="btn btn--primary service-card__cta"
                      aria-label={`Get started with ${service.title}`}
                    >
                      <span className="btn__text">Get started</span>
                    </a>
                  </footer>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Process Section */}
        <section className="services-page__process" aria-labelledby="process-heading">
          <div className="services-page__container">
            <header className="process__header">
              <h2 id="process-heading" className="process__title">
                How we work together
              </h2>
              <p className="process__subtitle">
                A proven 3-step process that delivers results
              </p>
            </header>

            <div className="process__steps">
              <div className="process__step">
                <div className="process__step-number" aria-hidden="true">01</div>
                <h3 className="process__step-title">Discovery</h3>
                <p className="process__step-description">
                  We start with understanding your business goals, target audience, and current challenges. 
                  Research and strategy phase to set the foundation.
                </p>
              </div>

              <div className="process__step">
                <div className="process__step-number" aria-hidden="true">02</div>
                <h3 className="process__step-title">System</h3>
                <p className="process__step-description">
                  Design and build the system with regular check-ins and feedback loops. 
                  Iterative approach ensures we're always aligned on direction.
                </p>
              </div>

              <div className="process__step">
                <div className="process__step-number" aria-hidden="true">03</div>
                <h3 className="process__step-title">Ship</h3>
                <p className="process__step-description">
                  Launch with performance tracking and ongoing support. 
                  Measure results and optimize based on real user data.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="services-page__cta" aria-labelledby="cta-heading">
          <div className="services-page__cta-container">
            <h2 id="cta-heading" className="services-page__cta-title">
              Ready to get started?
            </h2>
            <p className="services-page__cta-subtitle">
              Tell me about your project and we'll discuss how to move forward
            </p>
            <a 
              href="/contact" 
              className="btn btn--primary"
              aria-label="Start a project"
            >
              <span className="btn__text">Start a project</span>
            </a>
          </div>
        </section>
      </main>

      <Footer />
    </>
  )
}

