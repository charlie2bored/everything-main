'use client'

import { useEffect, useRef } from 'react'
import { m, useScroll, useTransform } from 'framer-motion'
import { fadeUp, stagger } from '@/app/providers/MotionProvider'

export default function Hero() {
  const containerRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  })
  
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"])
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0])

  const scrollToWork = () => {
    const workSection = document.getElementById('work')
    if (workSection) {
      workSection.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const scrollToContact = () => {
    const contactSection = document.getElementById('contact')
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section 
      ref={containerRef}
      className="hero" 
      id="home"
    >
      {/* Background layer with parallax (non-text) */}
      <m.div 
        className="hero-background"
        style={{ y: backgroundY }}
      >
        <canvas id="particleCanvas" className="particle-canvas"></canvas>
        <div className="gradient-mesh"></div>
      </m.div>

      {/* Content layer (no transform after settle) */}
      <m.div 
        className="hero-content"
        style={{ opacity }}
      >
        <m.div 
          className="hero-text"
          initial="hidden"
          animate="show"
          variants={stagger(0.06)}
        >
          <m.p 
            className="hero-greeting"
            variants={fadeUp}
          >
            Designer & Developer
          </m.p>
          
          <h1 className="hero-title">
            <m.span 
              className="title-line"
              variants={fadeUp}
            >
              Hey, I'm Charlie
            </m.span>
          </h1>
          
          <m.p 
            className="hero-subtitle"
            variants={fadeUp}
          >
            I create design and experiences for everyone.
          </m.p>
          
          <m.div 
            className="hero-actions"
            variants={fadeUp}
          >
            <button 
              className="btn-primary" 
              onClick={scrollToWork}
              aria-label="View my work"
            >
              <span className="btn-text">View Work</span>
              <div className="btn-ripple"></div>
            </button>
            <button 
              className="btn-secondary" 
              onClick={scrollToContact}
              aria-label="Let's collaborate"
            >
              <span className="btn-text">Let's Collaborate</span>
            </button>
          </m.div>
        </m.div>
      </m.div>

      <m.button 
        className="scroll-more" 
        onClick={scrollToWork}
        aria-label="Scroll for more"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 0.5 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <span className="scroll-dot" aria-hidden="true"></span>
        <span className="scroll-label">Scroll for more</span>
      </m.button>
    </section>
  )
}
