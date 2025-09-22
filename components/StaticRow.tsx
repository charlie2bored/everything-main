import { Project } from '@/lib/projects'
import TagChips from './TagChips'
import MetricBadge from './MetricBadge'
import Link from 'next/link'

interface StaticRowProps {
  project: Project
  index: number
}

export default function StaticRow({ project, index }: StaticRowProps) {
  return (
    <li className="work-row">
      <Link 
        href={`/case/${project.slug}/`}
        className="work-link"
        aria-label={`Open case study: ${project.title}`}
      >
        {/* Text Column (48%) */}
        <div className="col-text">
          <h3 className="project-title">
            {project.title}
          </h3>
          <p className="project-subtitle">
            {project.subtitle}
          </p>
          
          <div className="project-tags">
            <TagChips tags={project.tags} />
          </div>

          {/* KPI Chip from first KPI */}
          {project.kpis && project.kpis.length > 0 && (
            <div className="project-kpi">
              <MetricBadge
                kpi={project.kpis[0]}
                variant="default"
              />
            </div>
          )}
        </div>

        {/* Media Column (52%) */}
        <div className="col-media">
          <div className="media-wrap">
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
              <img
                src={project.cover}
                alt={`${project.title} cover`}
                width={960}
                height={540}
                className="project-thumb"
                sizes="(min-width: 900px) 52vw, 100vw"
                loading="lazy"
                decoding="async"
                style={{ objectFit: 'cover', width: '100%', height: '100%' }}
              />
            )}
          </div>
        </div>
      </Link>
    </li>
  )
}
