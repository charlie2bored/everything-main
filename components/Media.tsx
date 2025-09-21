'use client'

import { useState, useRef } from 'react'
import { m } from 'framer-motion'
import { GalleryItem } from '@/lib/projects'

interface MediaProps {
  item: GalleryItem
  onClick?: () => void
  loading?: 'lazy' | 'eager'
  sizes?: string
  className?: string
}

export default function Media({ 
  item, 
  onClick, 
  loading = 'lazy',
  sizes = '100vw',
  className = '' 
}: MediaProps) {
  const [isLoaded, setIsLoaded] = useState(false)
  const [hasError, setHasError] = useState(false)
  const imageRef = useRef<HTMLImageElement>(null)

  const handleLoad = () => {
    setIsLoaded(true)
  }

  const handleError = () => {
    setHasError(true)
  }

  const handleClick = () => {
    if (onClick) {
      onClick()
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if ((e.key === 'Enter' || e.key === ' ') && onClick) {
      e.preventDefault()
      onClick()
    }
  }

  return (
    <figure className={`media ${className}`}>
      <div className="media__container">
        <div 
          className={`media__wrapper ${onClick ? 'media__wrapper--clickable' : ''}`}
          onClick={handleClick}
          onKeyDown={handleKeyDown}
          role={onClick ? 'button' : undefined}
          tabIndex={onClick ? 0 : undefined}
          aria-label={onClick ? `Open ${item.alt} in lightbox` : undefined}
        >
          {/* Loading placeholder */}
          {!isLoaded && !hasError && (
            <div className="media__placeholder">
              <div className="media__spinner" aria-label="Loading image" />
            </div>
          )}

          {/* Error state */}
          {hasError && (
            <div className="media__error">
              <div className="media__error-icon" aria-hidden="true">⚠️</div>
              <p className="media__error-text">Failed to load image</p>
            </div>
          )}

          {/* Main image */}
          <m.img
            ref={imageRef}
            src={item.src}
            alt={item.alt}
            className={`media__image ${isLoaded ? 'media__image--loaded' : ''}`}
            loading={loading}
            decoding="async"
            sizes={sizes}
            onLoad={handleLoad}
            onError={handleError}
            initial={{ opacity: 0 }}
            animate={{ opacity: isLoaded ? 1 : 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            // Prevent layout shift
            style={{
              aspectRatio: '16/10', // Default aspect ratio
              objectFit: 'cover'
            }}
          />

          {/* Click indicator for lightbox */}
          {onClick && isLoaded && (
            <div className="media__overlay">
              <div className="media__zoom-icon" aria-hidden="true">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
                  <path d="M12 10h-2v2H9v-2H7V9h2V7h1v2h2v1z"/>
                </svg>
              </div>
            </div>
          )}
        </div>

        {/* Caption */}
        {item.caption && (
          <figcaption className="media__caption">
            {item.caption}
          </figcaption>
        )}
      </div>
    </figure>
  )
}

interface MediaGridProps {
  items: GalleryItem[]
  onImageClick?: (index: number) => void
  className?: string
}

export function MediaGrid({ items, onImageClick, className = '' }: MediaGridProps) {
  return (
    <div className={`media-grid ${className}`}>
      {items.map((item, index) => (
        <Media
          key={`media-${index}`}
          item={item}
          onClick={() => onImageClick?.(index)}
          loading={index < 2 ? 'eager' : 'lazy'}
          sizes="(min-width: 1024px) 50vw, 100vw"
        />
      ))}
    </div>
  )
}

interface VideoMediaProps {
  src: string
  poster?: string
  caption?: string
  autoPlay?: boolean
  muted?: boolean
  loop?: boolean
  className?: string
}

export function VideoMedia({ 
  src, 
  poster, 
  caption, 
  autoPlay = false,
  muted = true,
  loop = false,
  className = '' 
}: VideoMediaProps) {
  const [isLoaded, setIsLoaded] = useState(false)

  return (
    <figure className={`media media--video ${className}`}>
      <div className="media__container">
        <div className="media__wrapper">
          {!isLoaded && (
            <div className="media__placeholder">
              <div className="media__spinner" aria-label="Loading video" />
            </div>
          )}

          <video
            className={`media__video ${isLoaded ? 'media__video--loaded' : ''}`}
            poster={poster}
            autoPlay={autoPlay}
            muted={muted}
            loop={loop}
            controls
            preload="metadata"
            onLoadedData={() => setIsLoaded(true)}
            style={{
              aspectRatio: '16/10',
              objectFit: 'cover'
            }}
          >
            <source src={src} type="video/mp4" />
            <p>Your browser doesn't support HTML5 video. <a href={src}>Download the video</a> instead.</p>
          </video>
        </div>

        {caption && (
          <figcaption className="media__caption">
            {caption}
          </figcaption>
        )}
      </div>
    </figure>
  )
}

