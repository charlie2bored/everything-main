'use client'

import { useState, useRef, useCallback, useEffect } from 'react'
import { m } from 'framer-motion'

interface BeforeAfterProps {
  beforeSrc: string
  afterSrc: string
  beforeAlt: string
  afterAlt: string
  beforeLabel?: string
  afterLabel?: string
  className?: string
}

export default function BeforeAfter({
  beforeSrc,
  afterSrc,
  beforeAlt,
  afterAlt,
  beforeLabel = 'Before',
  afterLabel = 'After',
  className = ''
}: BeforeAfterProps) {
  const [sliderPosition, setSliderPosition] = useState(50) // Percentage
  const [isDragging, setIsDragging] = useState(false)
  const [isImagesLoaded, setIsImagesLoaded] = useState({ before: false, after: false })
  const containerRef = useRef<HTMLDivElement>(null)
  const sliderRef = useRef<HTMLDivElement>(null)

  const updateSliderPosition = useCallback((clientX: number) => {
    if (!containerRef.current) return

    const rect = containerRef.current.getBoundingClientRect()
    const x = clientX - rect.left
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100))
    setSliderPosition(percentage)
  }, [])

  // Mouse events
  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    e.preventDefault()
    setIsDragging(true)
    updateSliderPosition(e.clientX)
  }, [updateSliderPosition])

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!isDragging) return
    updateSliderPosition(e.clientX)
  }, [isDragging, updateSliderPosition])

  const handleMouseUp = useCallback(() => {
    setIsDragging(false)
  }, [])

  // Touch events
  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    e.preventDefault()
    setIsDragging(true)
    const touch = e.touches[0]
    updateSliderPosition(touch.clientX)
  }, [updateSliderPosition])

  const handleTouchMove = useCallback((e: TouchEvent) => {
    if (!isDragging) return
    e.preventDefault()
    const touch = e.touches[0]
    updateSliderPosition(touch.clientX)
  }, [isDragging, updateSliderPosition])

  const handleTouchEnd = useCallback(() => {
    setIsDragging(false)
  }, [])

  // Keyboard navigation
  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    switch (e.key) {
      case 'ArrowLeft':
        e.preventDefault()
        setSliderPosition(prev => Math.max(0, prev - 5))
        break
      case 'ArrowRight':
        e.preventDefault()
        setSliderPosition(prev => Math.min(100, prev + 5))
        break
      case 'Home':
        e.preventDefault()
        setSliderPosition(0)
        break
      case 'End':
        e.preventDefault()
        setSliderPosition(100)
        break
    }
  }, [])

  // Set up event listeners
  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove)
      document.addEventListener('mouseup', handleMouseUp)
      document.addEventListener('touchmove', handleTouchMove, { passive: false })
      document.addEventListener('touchend', handleTouchEnd)

      return () => {
        document.removeEventListener('mousemove', handleMouseMove)
        document.removeEventListener('mouseup', handleMouseUp)
        document.removeEventListener('touchmove', handleTouchMove)
        document.removeEventListener('touchend', handleTouchEnd)
      }
    }
  }, [isDragging, handleMouseMove, handleMouseUp, handleTouchMove, handleTouchEnd])

  const handleImageLoad = (type: 'before' | 'after') => {
    setIsImagesLoaded(prev => ({ ...prev, [type]: true }))
  }

  const allImagesLoaded = isImagesLoaded.before && isImagesLoaded.after

  return (
    <div className={`before-after ${className}`}>
      <div 
        ref={containerRef}
        className="before-after__container"
        role="img"
        aria-label={`Before and after comparison: ${beforeAlt} vs ${afterAlt}`}
      >
        {/* Loading state */}
        {!allImagesLoaded && (
          <div className="before-after__loading">
            <div className="before-after__spinner" aria-label="Loading comparison images" />
          </div>
        )}

        {/* Before image */}
        <div 
          className="before-after__image-container before-after__image-container--before"
          style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
        >
          <img
            src={beforeSrc}
            alt={beforeAlt}
            className="before-after__image"
            onLoad={() => handleImageLoad('before')}
            loading="lazy"
            decoding="async"
          />
          <div className="before-after__label before-after__label--before">
            {beforeLabel}
          </div>
        </div>

        {/* After image */}
        <div 
          className="before-after__image-container before-after__image-container--after"
          style={{ clipPath: `inset(0 0 0 ${sliderPosition}%)` }}
        >
          <img
            src={afterSrc}
            alt={afterAlt}
            className="before-after__image"
            onLoad={() => handleImageLoad('after')}
            loading="lazy"
            decoding="async"
          />
          <div className="before-after__label before-after__label--after">
            {afterLabel}
          </div>
        </div>

        {/* Slider */}
        <div 
          ref={sliderRef}
          className={`before-after__slider ${isDragging ? 'before-after__slider--dragging' : ''}`}
          style={{ left: `${sliderPosition}%` }}
          onMouseDown={handleMouseDown}
          onTouchStart={handleTouchStart}
          onKeyDown={handleKeyDown}
          role="slider"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={Math.round(sliderPosition)}
          aria-label="Adjust comparison slider"
          tabIndex={0}
        >
          <div className="before-after__slider-line" />
          <div className="before-after__slider-handle">
            <svg 
              width="24" 
              height="24" 
              viewBox="0 0 24 24" 
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M8.59 16.59L10 18l4-4-4-4-1.41 1.41L11.17 14H2v2h9.17l-2.58 2.59zM16.41 7.41L15 6l-4 4 4 4 1.41-1.41L12.83 10H22V8h-9.17l2.58-2.59z"/>
            </svg>
          </div>
        </div>

        {/* Instructions */}
        <div className="before-after__instructions">
          <p className="sr-only">
            Drag the slider or use arrow keys to compare before and after images. 
            Press Home to show only before image, End to show only after image.
          </p>
          <div className="before-after__hint" aria-hidden="true">
            Drag to compare
          </div>
        </div>
      </div>

      {/* Accessible description */}
      <div className="before-after__description">
        <p className="sr-only">
          This interactive comparison shows {beforeAlt} on the left and {afterAlt} on the right. 
          The slider is currently at {Math.round(sliderPosition)}%, 
          showing {sliderPosition < 50 ? 'more of the before image' : 'more of the after image'}.
        </p>
      </div>
    </div>
  )
}
