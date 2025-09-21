'use client'

import { ReactNode } from 'react'
import { MotionConfig, LazyMotion, domAnimation, AnimatePresence } from 'framer-motion'
import { usePathname } from 'next/navigation'

interface MotionProviderProps {
  children: ReactNode
}

export default function MotionProvider({ children }: MotionProviderProps) {
  const pathname = usePathname()

  return (
    <LazyMotion features={domAnimation}>
      <MotionConfig reducedMotion="user">
        <AnimatePresence mode="wait" initial={false}>
          <RouteTransition key={pathname}>
            {children}
          </RouteTransition>
        </AnimatePresence>
      </MotionConfig>
    </LazyMotion>
  )
}

interface RouteTransitionProps {
  children: ReactNode
}

function RouteTransition({ children }: RouteTransitionProps) {
  return (
    <div>
      {children}
    </div>
  )
}

// Export common animation variants
export const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { 
    opacity: 1, 
    y: 0,
    transition: { 
      duration: 0.5, 
      ease: "easeOut" 
    }
  }
}

export const stagger = (staggerTime = 0.06) => ({
  show: {
    transition: {
      staggerChildren: staggerTime
    }
  }
})

export const scaleIn = {
  hidden: { opacity: 0, scale: 0.95 },
  show: { 
    opacity: 1, 
    scale: 1,
    transition: { 
      duration: 0.4, 
      ease: "easeOut" 
    }
  }
}

export const slideInFromLeft = {
  hidden: { opacity: 0, x: -50 },
  show: { 
    opacity: 1, 
    x: 0,
    transition: { 
      duration: 0.5, 
      ease: "easeOut" 
    }
  }
}

export const slideInFromRight = {
  hidden: { opacity: 0, x: 50 },
  show: { 
    opacity: 1, 
    x: 0,
    transition: { 
      duration: 0.5, 
      ease: "easeOut" 
    }
  }
}
