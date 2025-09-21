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
    description: 'Launched independent practice focusing on conversion-driven design systems and user experiences.',
    highlight: true
  },
  {
    year: '2022-2024',
    title: 'Senior Product Designer at Stripe',
    description: 'Led design for payment flows and developer tools, improving conversion rates by 30% across core products.'
  },
  {
    year: '2020-2022',
    title: 'Design Lead at Figma',
    description: 'Managed design system team and component library, supporting 50M+ users and 100+ internal designers.'
  },
  {
    year: '2018-2020',
    title: 'Product Designer at Airbnb',
    description: 'Designed host onboarding flows and listing optimization tools, increasing host conversion by 25%.'
  },
  {
    year: '2016-2018',
    title: 'Frontend Developer at GitHub',
    description: 'Built accessible React components and design system infrastructure for developer productivity.'
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
                  Hi, I'm Charlie
                </h2>
                
                <div className="bio__description">
                  <p>
                    I'm a product designer and frontend developer with 8+ years of experience 
                    creating conversion-focused digital experiences. Currently based in San Francisco, 
                    I work with startups and established companies worldwide.
                  </p>
                  
                  <p>
                    My approach combines design thinking with technical implementation, ensuring 
                    that every decision serves both user needs and business goals. I specialize in 
                    design systems, conversion optimization, and accessible user interfaces.
                  </p>
                  
                  <p>
                    When I'm not designing or coding, you'll find me photographing architecture 
                    around the city, experimenting with new brewing methods, or contributing to 
                    open-source design tools.
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
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Skills/Tools Section */}
        <section className="about-page__skills" aria-labelledby="skills-heading">
          <div className="about-page__container">
            <h2 id="skills-heading" className="skills__title">
              Tools & Technologies
            </h2>
            
            <div className="skills__grid">
              <div className="skills__category">
                <h3 className="skills__category-title">Design</h3>
                <ul className="skills__list">
                  <li>Figma</li>
                  <li>Adobe Creative Suite</li>
                  <li>Principle</li>
                  <li>Framer</li>
                  <li>Sketch</li>
                </ul>
              </div>

              <div className="skills__category">
                <h3 className="skills__category-title">Development</h3>
                <ul className="skills__list">
                  <li>React & Next.js</li>
                  <li>TypeScript</li>
                  <li>CSS & Sass</li>
                  <li>Node.js</li>
                  <li>Git & GitHub</li>
                </ul>
              </div>

              <div className="skills__category">
                <h3 className="skills__category-title">Process</h3>
                <ul className="skills__list">
                  <li>Design Systems</li>
                  <li>User Research</li>
                  <li>A/B Testing</li>
                  <li>Analytics</li>
                  <li>Agile/Scrum</li>
                </ul>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  )
}
