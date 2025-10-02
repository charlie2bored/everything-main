'use client'

import { useEffect } from 'react'

interface VideoModalProps {
  open: boolean
  onClose: () => void
  src: string
  poster?: string
}

export default function VideoModal({ open, onClose, src, poster }: VideoModalProps) {
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => { document.removeEventListener('keydown', onKey); document.body.style.overflow = '' }
  }, [open, onClose])

  if (!open) return null
  return (
    <div role="dialog" aria-modal="true" aria-label="Video" style={{
      position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.9)', zIndex: 1000,
      display: 'grid', placeItems: 'center', padding: '16px'
    }}>
      <button onClick={onClose} aria-label="Close" className="ring-focus" style={{
        position: 'absolute', top: '16px', right: '16px', padding: '8px 12px',
        borderRadius: '8px', border: '1px solid var(--border)', background: 'transparent', color: 'white'
      }}>Close</button>
      <video controls autoPlay poster={poster} style={{ maxWidth: '100%', maxHeight: '80vh', borderRadius: '12px' }}>
        <source src={src} type="video/mp4" />
      </video>
    </div>
  )
}


