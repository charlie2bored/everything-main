import Hero from '@/components/Hero'
import Row from '@/components/Row'
import { getAllProjects } from '@/lib/projects'

export default function HomePage() {
  const projects = getAllProjects()
  
  return (
    <>
      <Hero />
      
      {/* Work Section */}
      <section className="work" id="work">
        <div className="work-container">
          <header className="section-header centered">
            <h2 className="section-title">Selected Work</h2>
            <p className="section-subtitle">A few things I'm proud of.</p>
          </header>
          
          {/* Work Rows */}
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

      {/* Skills Section */}
      <section className="skills" id="skills">
        <div className="skills-container">
          <header className="section-header centered">
            <h2 className="section-title">My Skills</h2>
          </header>
          
          <div className="skills-grid">
            <div className="skill-card">
              <div className="skill-icon">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
                </svg>
              </div>
              <h3 className="skill-title">Communication</h3>
            </div>
            
            <div className="skill-card featured">
              <div className="skill-icon">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                </svg>
              </div>
              <h3 className="skill-title">Leadership</h3>
            </div>
            
            <div className="skill-card">
              <div className="skill-icon">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <circle cx="12" cy="12" r="3"/>
                  <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/>
                </svg>
              </div>
              <h3 className="skill-title">Critical Thinking</h3>
            </div>
            
            <div className="skill-card">
              <div className="skill-icon">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-5 0V4.5A2.5 2.5 0 0 1 9.5 2z"/>
                  <path d="M14.5 8.5A2.5 2.5 0 0 1 17 11v8.5a2.5 2.5 0 0 1-5 0V11a2.5 2.5 0 0 1 2.5-2.5z"/>
                </svg>
              </div>
              <h3 className="skill-title">Problem Solving</h3>
            </div>
            
            <div className="skill-card">
              <div className="skill-icon">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M12 2L2 7l10 5 10-5-10-5z"/>
                  <path d="M2 17l10 5 10-5"/>
                  <path d="M2 12l10 5 10-5"/>
                </svg>
              </div>
              <h3 className="skill-title">Public Speaking</h3>
            </div>
            
            <div className="skill-card">
              <div className="skill-icon">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <rect x="2" y="3" width="20" height="14" rx="2" ry="2"/>
                  <line x1="8" y1="21" x2="16" y2="21"/>
                  <line x1="12" y1="17" x2="12" y2="21"/>
                </svg>
              </div>
              <h3 className="skill-title">Digital Media</h3>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="about" id="about">
        <div className="about-container">
          <div className="about-content">
            <div className="about-text">
              <h2 className="section-title">About Me</h2>
              <div className="about-description">
                <p className="about-intro">I'm a designer and developer focused on conversion-driven digital products. My work combines strategic design thinking with performance-optimized development.</p>
                
                <p>I work remotely with early-stage startups and established brands. My process emphasizes rapid prototyping, user testing, and measurable outcomes. I use Figma for design, React/Next.js for development, and analytics tools to validate impact.</p>
                
                <div className="about-highlights">
                  <div className="highlight-item">
                    <h4>SF-based</h4>
                    <p>Working with clients globally</p>
                  </div>
                  <div className="highlight-item">
                    <h4>Full-stack</h4>
                    <p>Design through deployment</p>
                  </div>
                  <div className="highlight-item">
                    <h4>Conversion-focused</h4>
                    <p>Every project has measurable goals</p>
                  </div>
                </div>
              </div>
              <div className="about-actions">
                <a className="btn-secondary" href="/resume.pdf" download rel="noopener" aria-label="Download résumé PDF">
                  <span className="btn-text">Download résumé</span>
                </a>
                <a className="btn-link" href="#contact">
                  <span className="btn-text">Get in touch</span>
                </a>
              </div>
            </div>
            <div className="about-visual">
              <figure className="about-image">
                <div className="image-texture"></div>
                <div className="image-overlay"></div>
              </figure>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="contact" id="contact">
        <div className="contact-background">
          <div className="contact-texture"></div>
        </div>
        <div className="contact-container">
          <div className="contact-content">
            <div className="contact-header">
              <h2 className="section-title">Let's Create Together</h2>
              <p className="section-subtitle">Ready to bring your vision to life? I'd love to hear about your project and explore how we can collaborate.</p>
            </div>
            
            <form className="contact-form" id="contactForm">
              {/* Honeypot field for spam protection */}
              <div className="form-group" style={{ position: 'absolute', left: '-9999px', opacity: 0 }}>
                <label htmlFor="website">Website</label>
                <input type="text" id="website" name="website" tabIndex={-1} autoComplete="off" />
              </div>
              
              <div className="form-group">
                <label htmlFor="name" className="form-label">Name</label>
                <input type="text" id="name" name="name" className="form-input" required aria-describedby="name-error" />
                <div id="name-error" className="form-error" role="alert" aria-live="polite"></div>
              </div>
              
              <div className="form-group">
                <label htmlFor="email" className="form-label">Email</label>
                <input type="email" id="email" name="email" className="form-input" required aria-describedby="email-error" />
                <div id="email-error" className="form-error" role="alert" aria-live="polite"></div>
              </div>
              
              <div className="form-group">
                <label htmlFor="message" className="form-label">Message</label>
                <textarea id="message" name="message" className="form-textarea" rows={6} required aria-describedby="message-error"></textarea>
                <div id="message-error" className="form-error" role="alert" aria-live="polite"></div>
              </div>
              
              <button type="submit" className="btn-primary btn-submit">
                <span className="btn-text">Send Message</span>
                <div className="btn-ripple"></div>
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-container">
          <div className="footer-content">
            <div className="footer-text">
              <p>&copy; 2024 Charlie Portfolio. Crafted with intention and care.</p>
            </div>
            <div className="footer-links">
              <a href="https://dribbble.com/charlie" className="footer-link" target="_blank" rel="noopener noreferrer">Dribbble</a>
              <a href="https://behance.net/charlie" className="footer-link" target="_blank" rel="noopener noreferrer">Behance</a>
              <a href="https://linkedin.com/in/charliedesigns" className="footer-link" target="_blank" rel="noopener noreferrer">LinkedIn</a>
              <a href="https://github.com/charlie" className="footer-link" target="_blank" rel="noopener noreferrer">GitHub</a>
            </div>
          </div>
        </div>
      </footer>
    </>
  )
}
