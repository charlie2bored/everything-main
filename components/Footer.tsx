'use client'

import Link from 'next/link'
import { m } from 'framer-motion'

const quickLinks = [
  { name: 'Work', href: '/work' },
  { name: 'Services', href: '/services' },
  { name: 'About', href: '/about' },
  { name: 'Contact', href: '/contact' }
]

const socialLinks = [
  { name: 'Instagram', href: 'https://instagram.com/charlie_designs' },
  { name: 'LinkedIn', href: 'https://www.linkedin.com/in/charliedesigns/' },
  { name: 'YouTube', href: 'https://www.youtube.com/@charliedesigns' },
  { name: 'Medium', href: 'https://medium.com/@charliedesigns' }
]

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="footer" role="contentinfo">
      <div className="footer__container">
        <div className="footer__content">
          {/* Main footer content */}
          <div className="footer__main">
            <div className="footer__brand">
              <h3 className="footer__title">
                Let's create something amazing together
              </h3>
              <p className="footer__subtitle">
                Available for select projects in 2025
              </p>
              <m.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Link 
                  href="/contact" 
                  className="footer__cta"
                  aria-label="Start a project"
                >
                  Start a project
                </Link>
              </m.div>
            </div>

            <div className="footer__links">
              <div className="footer__section">
                <h4 className="footer__section-title">Navigation</h4>
                <ul className="footer__link-list">
                  {quickLinks.map((link) => (
                    <li key={link.name}>
                      <Link 
                        href={link.href}
                        className="footer__link"
                      >
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="footer__section">
                <h4 className="footer__section-title">Connect</h4>
                <ul className="footer__link-list">
                  {socialLinks.map((link) => (
                    <li key={link.name}>
                      <a 
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="footer__link"
                      >
                        {link.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="footer__section">
                <h4 className="footer__section-title">Resources</h4>
                <ul className="footer__link-list">
                  <li>
                    <a 
                      href="/resume.pdf"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="footer__link"
                      aria-label="Download resume (PDF)"
                    >
                      Resume
                    </a>
                  </li>
                  <li>
                    <Link 
                      href="/sitemap.xml"
                      className="footer__link"
                    >
                      Sitemap
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Footer bottom */}
          <div className="footer__bottom">
            <div className="footer__bottom-content">
              <p className="footer__copyright">
                © {currentYear} Charlie. All rights reserved.
              </p>
              <p className="footer__built">
                Built with Next.js, deployed on Cloudflare Pages
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
