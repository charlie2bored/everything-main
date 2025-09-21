import { Metadata } from 'next'
import { m } from 'framer-motion'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { fadeUp, stagger } from '@/app/providers/MotionProvider'

export const metadata: Metadata = {
  title: 'About — Charlie',
  description: 'Designer and developer with 8+ years creating conversion-focused experiences. Based in San Francisco, working with clients worldwide.',
  openGraph: {
    title: 'About — Charlie',
    description: 'Designer and developer creating conversion-focused experiences',
    images: ['/assets/og/about.jpg'],
  },
}

const timeline = [
  {
    year: '2024',
    title: 'Independent Designer & Developer',
    description: 'Launched independent practice focusing on conversion-driven design systems and user experiences for ambitious startups and scale-ups.',
    highlight: true
  },
  {
    year: '2022-2024',
    title: 'Senior Product Designer at Stripe',
    description: 'Led design for payment flows and developer tools across global markets. Redesigned checkout experience and API documentation for improved developer adoption.',
    metric: '+30% conversion across core products'
  },
  {
    year: '2020-2022',
    title: 'Design Lead at Figma',
    description: 'Managed design system team and component library architecture. Built scalable design tokens and documentation that supported rapid company growth.',
    metric: 'Supported 50M+ users and 100+ designers'
  },
  {
    year: '2018-2020',
    title: 'Product Designer at Airbnb',
    description: 'Designed host onboarding flows and listing optimization tools for global expansion. Focused on reducing friction for new hosts in emerging markets.',
    metric: '+25% host conversion rate'
  },
  {
    year: '2016-2018',
    title: 'Frontend Developer at GitHub',
    description: 'Built accessible React components and design system infrastructure. Contributed to open-source component library used by developer community.',
    metric: '99.9% uptime across design system'
  }
]

export default function AboutPage() {
  return (
    <>
      <Header />
      
      <main id="main" className="about-page">
        {/* Header Section */}
        <header className="about-page__header">
          <div className="about-page__header-container">
            <m.div
              className="about-page__intro"
              initial="hidden"
              animate="show"
              variants={stagger(0.06)}
            >
              <m.h1 
                className="about-page__title"
                variants={fadeUp}
              >
                About
              </m.h1>
              <m.p 
                className="about-page__subtitle"
                variants={fadeUp}
              >
                Designer and developer creating experiences that drive measurable results
              </m.p>
            </m.div>
          </div>
        </header>

        {/* Bio Section */}
        <section className="about-page__bio" aria-labelledby="bio-heading">
          <div className="about-page__container">
            <div className="bio__content">
              <div className="bio__text">
                <h2 id="bio-heading" className="bio__heading">
                  I help founders and product teams build brands and experiences that convert.
                </h2>
                
                <div className="bio__description">
                  <p>
                    Whether you're launching a new product or scaling an existing one, I combine 
                    design strategy with technical implementation to create systems that drive 
                    measurable business outcomes.
                  </p>
                  
                  <p>
                    My process focuses on understanding your users deeply, then building brands 
                    and digital experiences that convert visitors into customers. Every project 
                    includes performance tracking and optimization based on real user data.
                  </p>
                  
                  <p>
                    Based in San Francisco, I work with ambitious teams worldwide who want 
                    design that moves metrics, not just aesthetics.
                  </p>
                </div>

                <div className="bio__actions">
                  <a 
                    href="/resume.pdf" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn--primary"
                    aria-label="Download resume (PDF)"
                  >
                    <span className="btn__text">Download Resume</span>
                    <span aria-hidden="true">↓</span>
                  </a>
                  
                  <a 
                    href="/contact" 
                    className="btn btn--secondary"
                  >
                    <span className="btn__text">Let's talk</span>
                  </a>
                </div>
              </div>

              <div className="bio__image">
                <div className="bio__image-container">
                  <img 
                    src="/assets/charlie-headshot.jpg" 
                    alt="Charlie - Designer and Developer"
                    className="bio__photo"
                    loading="eager"
                    width="400"
                    height="400"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Method Section */}
        <section className="about-page__method" aria-labelledby="method-heading">
          <div className="about-page__container">
            <header className="method__header">
              <h2 id="method-heading" className="method__title">
                How I work
              </h2>
              <p className="method__subtitle">
                A proven approach that delivers measurable results
              </p>
            </header>

            <div className="method__steps">
              <div className="method__step">
                <div className="method__step-icon" aria-hidden="true">🔍</div>
                <h3 className="method__step-title">Discovery</h3>
                <p className="method__step-description">
                  Deep dive into your business goals, user needs, and current challenges. 
                  Research and strategy phase sets the foundation for everything that follows.
                </p>
                <ul className="method__step-details">
                  <li>Stakeholder interviews</li>
                  <li>User research and analytics</li>
                  <li>Competitive analysis</li>
                  <li>Technical assessment</li>
                </ul>
              </div>

              <div className="method__step">
                <div className="method__step-icon" aria-hidden="true">⚙️</div>
                <h3 className="method__step-title">System</h3>
                <p className="method__step-description">
                  Design and build with scalability in mind. Every component, pattern, 
                  and interaction is crafted to work together as a cohesive system.
                </p>
                <ul className="method__step-details">
                  <li>Design system creation</li>
                  <li>Prototyping and testing</li>
                  <li>Component development</li>
                  <li>Regular feedback loops</li>
                </ul>
              </div>

              <div className="method__step">
                <div className="method__step-icon" aria-hidden="true">🚀</div>
                <h3 className="method__step-title">Ship</h3>
                <p className="method__step-description">
                  Launch with confidence, then measure and optimize. Performance tracking 
                  and ongoing iterations ensure long-term success.
                </p>
                <ul className="method__step-details">
                  <li>Performance optimization</li>
                  <li>Analytics implementation</li>
                  <li>User testing and feedback</li>
                  <li>Continuous improvement</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Timeline Section */}
        <section className="about-page__timeline" aria-labelledby="timeline-heading">
          <div className="about-page__container">
            <header className="timeline__header">
              <h2 id="timeline-heading" className="timeline__title">
                Experience
              </h2>
              <p className="timeline__subtitle">
                8+ years designing and building products at scale
              </p>
            </header>

            <div className="timeline__content">
              {timeline.map((item, index) => (
                <article 
                  key={item.year} 
                  className={`timeline__item ${item.highlight ? 'timeline__item--highlight' : ''}`}
                >
                  <div className="timeline__marker" aria-hidden="true" />
                  <div className="timeline__content-wrapper">
                    <div className="timeline__year">{item.year}</div>
                    <h3 className="timeline__title-item">{item.title}</h3>
                    <p className="timeline__description">{item.description}</p>
                    {item.metric && (
                      <div className="timeline__metric">
                        {item.metric}
                      </div>
                    )}
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Capabilities Section */}
        <section className="about-page__capabilities" aria-labelledby="capabilities-heading">
          <div className="about-page__container">
            <h2 id="capabilities-heading" className="capabilities__title">
              Capabilities
            </h2>
            
            <div className="capabilities__grid">
              <div className="capability">
                <h3 className="capability__title">Branding Systems</h3>
                <p className="capability__description">
                  Complete visual identities that scale across touchpoints. 
                  From logo to guidelines, built for consistency and growth.
                </p>
              </div>

              <div className="capability">
                <h3 className="capability__title">Conversion UX</h3>
                <p className="capability__description">
                  User experiences designed to drive measurable business outcomes. 
                  Research-backed flows that optimize for conversion and retention.
                </p>
              </div>

              <div className="capability">
                <h3 className="capability__title">Motion/Interactions</h3>
                <p className="capability__description">
                  Purposeful animation that enhances usability and delight. 
                  Micro-interactions and motion systems that guide user behavior.
                </p>
              </div>

              <div className="capability">
                <h3 className="capability__title">Web (Next/Perf)</h3>
                <p className="capability__description">
                  Fast, accessible websites built with Next.js. 
                  Performance-optimized for Core Web Vitals and real user metrics.
                </p>
              </div>

              <div className="capability">
                <h3 className="capability__title">Analytics</h3>
                <p className="capability__description">
                  Data-driven design decisions backed by user behavior insights. 
                  A/B testing and metrics that prove business impact.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  )
}

