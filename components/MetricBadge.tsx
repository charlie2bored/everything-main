'use client'

import { m } from 'framer-motion'
import { KPI } from '@/lib/projects'

interface MetricBadgeProps {
  kpi: KPI
  delay?: number
  variant?: 'default' | 'featured'
}

export default function MetricBadge({ kpi, delay = 0, variant = 'default' }: MetricBadgeProps) {
  const isPositive = kpi.change.includes('+')
  const isNegative = kpi.change.includes('-')
  
  return (
    <m.div 
      className={`metric-badge metric-badge--${variant}`}
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ 
        duration: 0.38, 
        delay,
        ease: "easeOut" 
      }}
    >
      <div className="metric-badge__content">
        <span 
          className={`metric-badge__change ${
            isPositive ? 'metric-badge__change--positive' : 
            isNegative ? 'metric-badge__change--negative' : 
            'metric-badge__change--neutral'
          }`}
        >
          {kpi.change}
        </span>
        <span className="metric-badge__label">
          {kpi.label}
        </span>
      </div>
    </m.div>
  )
}

interface MetricGridProps {
  kpis: KPI[]
  className?: string
}

export function MetricGrid({ kpis, className = '' }: MetricGridProps) {
  return (
    <div className={`metric-grid ${className}`}>
      {kpis.map((kpi, index) => (
        <MetricBadge 
          key={`${kpi.label}-${index}`}
          kpi={kpi} 
          delay={index * 0.06}
        />
      ))}
    </div>
  )
}

interface ProofStripProps {
  metrics: KPI[]
  footnote?: string
}

export function ProofStrip({ metrics, footnote }: ProofStripProps) {
  return (
    <section className="proof-strip" aria-labelledby="proof-heading">
      <div className="proof-strip__container">
        <m.h2 
          id="proof-heading"
          className="proof-strip__heading"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.38 }}
        >
          Typical outcomes
        </m.h2>
        
        <div className="proof-strip__metrics">
          {metrics.slice(0, 4).map((metric, index) => (
            <MetricBadge 
              key={`proof-${metric.label}-${index}`}
              kpi={metric}
              delay={index * 0.06}
              variant="featured"
            />
          ))}
        </div>
        
        {footnote && (
          <m.p 
            className="proof-strip__footnote"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.38, delay: 0.3 }}
          >
            {footnote}
          </m.p>
        )}
      </div>
    </section>
  )
}
