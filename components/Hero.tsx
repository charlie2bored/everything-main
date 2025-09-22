'use client'

import { useRef } from 'react'
import { m, useScroll, useTransform } from 'framer-motion'
import { fadeUp, stagger } from '@/app/providers/MotionProvider'
import Button from './Button'

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
          className="hero__text-group"
          initial="hidden"
          animate="show"
          variants={stagger(0.06)}
        >
          <m.p 
            className="hero__eyebrow"
            variants={fadeUp}
          >
            Brand Systems & Motion
          </m.p>
          
          <h1 className="hero__title">
            <m.span 
              className="hero__title-line hero__title-line--white"
              variants={fadeUp}
            >
              Brand systems + motion
            </m.span>
            <m.span 
              className="hero__title-line hero__title-line--yellow"
              variants={fadeUp}
            >
              that convert.
            </m.span>
          </h1>
          
          <m.p 
            className="hero__lede"
            variants={fadeUp}
          >
            Identity, web, and UX that move metrics.
          </m.p>
          
          <m.div 
            className="hero__actions"
            variants={fadeUp}
          >
            <Button
              href="/work"
              variant="primary"
              aria-label="View my work portfolio"
            >
              See the work
            </Button>
          </m.div>

          {/* Sticky scroll indicator with hero text group */}
          <m.div 
            className="hero__scroll"
            variants={fadeUp}
          >
            <span className="hero__scroll-text">Scroll for more</span>
            <m.div 
              className="hero__scroll-arrow"
              animate={{ y: [0, 6, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              ↓
            </m.div>
          </m.div>
        </m.div>
      </div>
    </section>
  )
}
