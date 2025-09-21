'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { m, AnimatePresence } from 'framer-motion'
import { GalleryItem } from '@/lib/projects'

interface LightboxProps {
  images: GalleryItem[]
  initialIndex: number
  isOpen: boolean
  onClose: () => void
}

export default function Lightbox({ images, initialIndex, isOpen, onClose }: LightboxProps) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex)
  const [isZoomed, setIsZoomed] = useState(false)
  const lightboxRef = useRef<HTMLDivElement>(null)
  const imageRef = useRef<HTMLImageElement>(null)
  const closeButtonRef = useRef<HTMLButtonElement>(null)
  const prevButtonRef = useRef<HTMLButtonElement>(null)
  const nextButtonRef = useRef<HTMLButtonElement>(null)
  
  // Focus trap elements
  const focusableElements = useRef<HTMLElement[]>([])

  // Update current index when initialIndex changes
  useEffect(() => {
    setCurrentIndex(initialIndex)
  }, [initialIndex])

  // Set up focus trap when lightbox opens
  useEffect(() => {
    if (isOpen) {
      // Get all focusable elements in the lightbox
      const updateFocusableElements = () => {
        if (lightboxRef.current) {
          const elements = Array.from(
            lightboxRef.current.querySelectorAll(
              'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
            )
          ) as HTMLElement[]
          focusableElements.current = elements
        }
      }

      updateFocusableElements()
      
      // Focus the close button initially
      setTimeout(() => {
        closeButtonRef.current?.focus()
      }, 100)

      // Prevent body scroll
      document.body.style.overflow = 'hidden'

      return () => {
        document.body.style.overflow = ''
      }
    }
  }, [isOpen])

  // Handle keyboard navigation
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (!isOpen) return

    switch (e.key) {
      case 'Escape':
        e.preventDefault()
        onClose()
        break
      case 'ArrowLeft':
        e.preventDefault()
        goToPrevious()
        break
      case 'ArrowRight':
        e.preventDefault()
        goToNext()
        break
      case ' ':
        e.preventDefault()
        toggleZoom()
        break
      case 'Tab':
        // Handle focus trap
        e.preventDefault()
        const elements = focusableElements.current
        if (elements.length === 0) return

        const currentFocusIndex = elements.findIndex(el => el === document.activeElement)
        let nextFocusIndex: number

        if (e.shiftKey) {
          // Shift+Tab: go to previous focusable element
          nextFocusIndex = currentFocusIndex <= 0 ? elements.length - 1 : currentFocusIndex - 1
        } else {
          // Tab: go to next focusable element
          nextFocusIndex = currentFocusIndex >= elements.length - 1 ? 0 : currentFocusIndex + 1
        }

        elements[nextFocusIndex]?.focus()
        break
    }
  }, [isOpen, onClose])

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [handleKeyDown])

  const goToPrevious = () => {
    setCurrentIndex(prev => prev === 0 ? images.length - 1 : prev - 1)
    setIsZoomed(false)
  }

  const goToNext = () => {
    setCurrentIndex(prev => prev === images.length - 1 ? 0 : prev + 1)
    setIsZoomed(false)
  }

  const toggleZoom = () => {
    setIsZoomed(prev => !prev)
  }

  const currentImage = images[currentIndex]

  if (!isOpen) return null

  return (
    <AnimatePresence>
      <m.div
        ref={lightboxRef}
        className="lightbox"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        role="dialog"
        aria-modal="true"
        aria-label="Image gallery"
      >
        {/* Backdrop */}
        <div 
          className="lightbox__backdrop" 
          onClick={onClose}
          aria-hidden="true"
        />

        {/* Content */}
        <div className="lightbox__content">
          {/* Header */}
          <header className="lightbox__header">
            <div className="lightbox__counter">
              <span aria-live="polite">
                {currentIndex + 1} of {images.length}
              </span>
            </div>
            
            <button
              ref={closeButtonRef}
              type="button"
              className="lightbox__close"
              onClick={onClose}
              aria-label="Close lightbox"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
              </svg>
            </button>
          </header>

          {/* Image container */}
          <div className="lightbox__image-container">
            <button
              ref={prevButtonRef}
              type="button"
              className="lightbox__nav lightbox__nav--prev"
              onClick={goToPrevious}
              disabled={images.length <= 1}
              aria-label="Previous image"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/>
              </svg>
            </button>

            <div 
              className={`lightbox__image-wrapper ${isZoomed ? 'lightbox__image-wrapper--zoomed' : ''}`}
              onClick={toggleZoom}
              role="button"
              tabIndex={0}
              aria-label={`${isZoomed ? 'Zoom out' : 'Zoom in'} image`}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault()
                  toggleZoom()
                }
              }}
            >
              <m.img
                ref={imageRef}
                src={currentImage.src}
                alt={currentImage.alt}
                className="lightbox__image"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                loading="eager"
                decoding="async"
              />
              
              {/* Zoom indicator */}
              <div className="lightbox__zoom-hint">
                <span>{isZoomed ? 'Click to zoom out' : 'Click to zoom in'}</span>
              </div>
            </div>

            <button
              ref={nextButtonRef}
              type="button"
              className="lightbox__nav lightbox__nav--next"
              onClick={goToNext}
              disabled={images.length <= 1}
              aria-label="Next image"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"/>
              </svg>
            </button>
          </div>

          {/* Footer with caption */}
          {currentImage.caption && (
            <footer className="lightbox__footer">
              <p className="lightbox__caption">
                {currentImage.caption}
              </p>
            </footer>
          )}

          {/* Keyboard shortcuts hint */}
          <div className="lightbox__hints">
            <p className="lightbox__hint">
              Use arrow keys to navigate, space to zoom, esc to close
            </p>
          </div>
        </div>
      </m.div>
    </AnimatePresence>
  )
}

