'use client'

import { m } from 'framer-motion'
import { Testimonial as TestimonialType } from '@/lib/projects'

interface TestimonialProps {
  testimonial: TestimonialType
  variant?: 'default' | 'featured' | 'compact'
  delay?: number
}

export default function Testimonial({ 
  testimonial, 
  variant = 'default',
  delay = 0 
}: TestimonialProps) {
  return (
    <m.blockquote 
      className={`testimonial testimonial--${variant}`}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ 
        duration: 0.5, 
        delay,
        ease: "easeOut" 
      }}
    >
      <div className="testimonial__content">
        <div className="testimonial__quote-mark" aria-hidden="true">
          "
        </div>
        
        <p className="testimonial__quote">
          {testimonial.quote}
        </p>
        
        <footer className="testimonial__attribution">
          <cite className="testimonial__author">
            {testimonial.author}
          </cite>
        </footer>
      </div>
    </m.blockquote>
  )
}

interface TestimonialCarouselProps {
  testimonials: TestimonialType[]
  className?: string
}

export function TestimonialCarousel({ testimonials, className = '' }: TestimonialCarouselProps) {
  if (testimonials.length === 0) return null

  return (
    <section className={`testimonial-carousel ${className}`} aria-label="Client testimonials">
      <div className="testimonial-carousel__container">
        <m.h2 
          className="testimonial-carousel__heading"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.38 }}
        >
          What clients say
        </m.h2>
        
        <div className="testimonial-carousel__grid">
          {testimonials.map((testimonial, index) => (
            <Testimonial 
              key={`testimonial-${index}`}
              testimonial={testimonial}
              variant="featured"
              delay={index * 0.1}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

