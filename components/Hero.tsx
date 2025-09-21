'use client'

import Link from 'next/link'
import { useRef } from 'react'
import { m, useScroll, useTransform } from 'framer-motion'
import { fadeUp, stagger } from '@/app/providers/MotionProvider'

export default function Hero() {
  const containerRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  })
  
  // Only parallax the background, never the text
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"])

  return (
    <section 
      ref={containerRef}
      className="hero" 
      id="home"
    >
      {/* Background layer with noise and beams - parallax only here */}
      <m.div 
        className="hero__background"
        style={{ y: backgroundY }}
      />

      {/* Content layer - no transforms after settle for crisp text */}
      <div className="hero__content">
        <m.div 
          className="hero__text"
          initial="hidden"
          animate="show"
          variants={stagger(0.06)}
        >
          <m.p 
            className="hero__eyebrow"
            variants={fadeUp}
          >
            Designer & Developer
          </m.p>
          
          <h1 className="hero__title">
            <m.span 
              className="hero__title-line hero__title-line--white"
              variants={fadeUp}
            >
              Building experiences that
            </m.span>
            <m.span 
              className="hero__title-line hero__title-line--yellow"
              variants={fadeUp}
            >
              drive measurable results
            </m.span>
          </h1>
          
          <m.p 
            className="hero__lede"
            variants={fadeUp}
          >
            Product designer and frontend developer focused on conversion-driven design systems and user experiences.
          </m.p>
          
          <m.div 
            className="hero__actions"
            variants={fadeUp}
          >
            <Link 
              href="/work" 
              className="btn btn--primary"
              aria-label="View my work"
            >
              <span className="btn__text">View Work</span>
            </Link>
            <Link 
              href="/contact" 
              className="btn btn--secondary"
              aria-label="Let's collaborate"
            >
              <span className="btn__text">Let's Collaborate</span>
            </Link>
          </m.div>
        </m.div>
      </div>

      {/* Scroll indicator */}
      <m.div 
        className="hero__scroll"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 0.5 }}
      >
        <Link 
          href="#work"
          className="scroll-indicator"
          aria-label="Scroll to work section"
        >
          <span className="scroll-indicator__dot" aria-hidden="true"></span>
          <span className="scroll-indicator__label">Scroll for work</span>
        </Link>
      </m.div>
    </section>
  )
}
