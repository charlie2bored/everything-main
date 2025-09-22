'use client'

import { useRef, useState, useCallback, useEffect } from 'react'
import { m } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { Project } from '@/lib/projects'
import TagChips from './TagChips'
import MetricBadge from './MetricBadge'
import { fadeUp } from '@/app/providers/MotionProvider'

interface RowProps {
  project: Project
  index: number
}

export default function Row({ project, index }: RowProps) {
  const mediaRef = useRef<HTMLDivElement>(null)
  const pillRef = useRef<HTMLSpanElement>(null)
  const [isHovered, setIsHovered] = useState(false)
  const [pillPosition, setPillPosition] = useState({ x: -9999, y: -9999 })
  const rafRef = useRef<number>(0)

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!mediaRef.current || !pillRef.current) return
    
    // Cancel any pending RAF to avoid queuing up multiple updates
    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current)
    }
    
    // Batch DOM reads and writes using requestAnimationFrame
    rafRef.current = requestAnimationFrame(() => {
      if (!mediaRef.current) return
      
      const rect = mediaRef.current.getBoundingClientRect()
      const x = e.clientX - rect.left + 12  // offset for pill positioning
      const y = e.clientY - rect.top + 12
      
      setPillPosition({ x, y })
      rafRef.current = 0
    })
  }, [])

  const handleMouseEnter = useCallback(() => {
    setIsHovered(true)
  }, [])

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false)
    setPillPosition({ x: -9999, y: -9999 })
  }, [])

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      // The Link will handle navigation
    }
  }, [])

  const handleFocus = useCallback(() => {
    setIsHovered(true)
    // Pin pill to bottom-right for keyboard focus as specified
    if (mediaRef.current) {
      const rect = mediaRef.current.getBoundingClientRect()
      setPillPosition({ x: rect.width - 80, y: rect.height - 40 })
    }
  }, [])

  const handleBlur = useCallback(() => {
    setIsHovered(false)
    setPillPosition({ x: -9999, y: -9999 })
  }, [])

  // Cleanup any pending RAF on unmount
  useEffect(() => {
    return () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current)
      }
    }
  }, [])

  return (
    <m.li 
      className="work-row"
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-10%" }}
      variants={fadeUp}
      transition={{ delay: index * 0.1 }}
    >
        <Link
          href={`/case/${project.slug}/`}
          className="work-link"
          aria-label={`Open case study: ${project.title}`}
          data-cursor-text="See the work"
        >
        {/* Text Column (48%) */}
        <div className="col-text">
          <m.h3 
            className="project-title"
            variants={fadeUp}
          >
            {project.title}
          </m.h3>
          <m.p 
            className="project-subtitle"
            variants={fadeUp}
          >
            {project.subtitle}
          </m.p>
          <m.div variants={fadeUp}>
            <TagChips tags={project.tags} />
          </m.div>
          
          {/* KPI Chip from first KPI */}
          {project.kpis && project.kpis.length > 0 && (
            <m.div variants={fadeUp} className="project-kpi">
              <MetricBadge 
                kpi={project.kpis[0]} 
                variant="default"
              />
            </m.div>
          )}
        </div>

        {/* Media Column (52%) */}
        <div className="col-media">
          <m.div 
            ref={mediaRef}
            className="media-wrap"
            onMouseMove={handleMouseMove}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            whileHover={{ 
              scale: 1.02,
              transition: { duration: 0.3, ease: "easeOut" }
            }}
            variants={fadeUp}
          >
{index === 0 ? (
              // LCP optimized picture element for first image
              <picture>
                <source 
                  type="image/avif" 
                  srcSet="/assets/projects/zenflow-cover-640.avif 640w, /assets/projects/zenflow-cover-960.avif 960w, /assets/projects/zenflow-cover-1280.avif 1280w" 
                />
                <source 
                  type="image/webp" 
                  srcSet="/assets/projects/zenflow-cover-640.webp 640w, /assets/projects/zenflow-cover-960.webp 960w, /assets/projects/zenflow-cover-1280.webp 1280w" 
                />
                <img
                  src="/assets/projects/zenflow-cover-960.webp"
                  alt={`${project.title} cover demonstrating brand & motion`}
                  width={960}
                  height={540}
                  sizes="(max-width: 480px) 100vw, (max-width: 768px) 100vw, (max-width: 1024px) 52vw, 50vw"
                  loading="eager"
                  decoding="async"
                  fetchPriority="high"
                  className="project-thumb"
                  style={{ objectFit: 'cover', width: '100%', height: '100%' }}
                />
              </picture>
            ) : (
              <Image
                src={project.cover}
                alt={`${project.title} cover`}
                fill
                className="project-thumb"
                sizes="(min-width: 900px) 52vw, 100vw"
                loading="lazy"
                decoding="async"
                style={{ objectFit: 'cover' }}
              />
            )}
            
            {/* Cursor-following pill */}
            <span
              ref={pillRef}
              className="hover-pill"
              style={{
                transform: `translate(${pillPosition.x}px, ${pillPosition.y}px)`,
                opacity: isHovered ? 1 : 0,
              }}
              aria-hidden="true"
            >
              See the work
            </span>
          </m.div>
        </div>
      </Link>
    </m.li>
  )
}
