import { ImageResponse } from 'next/og'
import { getProjectBySlug } from '@/lib/projects'

export const runtime = 'edge'
export const alt = 'Case Study'
export const size = {
  width: 1200,
  height: 630,
}
export const contentType = 'image/png'

export default async function Image({ params }: { params: { slug: string } }) {
  const project = getProjectBySlug(params.slug)

  if (!project) {
    return new ImageResponse(
      (
        <div
          style={{
            height: '100%',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#0A0A0A',
            color: '#FEFEFE',
          }}
        >
          <div style={{ fontSize: 60, fontWeight: 'bold' }}>
            Case Study Not Found
          </div>
        </div>
      ),
      {
        ...size,
      }
    )
  }

  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'space-between',
          backgroundColor: '#0A0A0A',
          backgroundImage: 'radial-gradient(circle at 25% 25%, #D4AF37 0%, transparent 50%)',
          padding: '80px',
        }}
      >
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          <div
            style={{
              width: '60px',
              height: '60px',
              backgroundColor: '#D4AF37',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '24px',
              fontWeight: 'bold',
              color: '#0A0A0A',
            }}
          >
            C
          </div>
          <div style={{ fontSize: '28px', color: '#FEFEFE', fontWeight: '600' }}>
            Charlie — Case Study
          </div>
        </div>

        {/* Main Content */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', maxWidth: '800px' }}>
          <div
            style={{
              fontSize: '72px',
              fontWeight: 'bold',
              color: '#FEFEFE',
              lineHeight: 1.1,
              letterSpacing: '-0.02em',
            }}
          >
            {project.title}
          </div>
          <div
            style={{
              fontSize: '36px',
              color: '#E8E8E8',
              lineHeight: 1.3,
            }}
          >
            {project.subtitle}
          </div>
        </div>

        {/* Tags */}
        <div style={{ display: 'flex', gap: '15px', flexWrap: 'wrap' }}>
          {project.tags.map((tag) => (
            <div
              key={tag}
              style={{
                padding: '12px 24px',
                backgroundColor: '#D4AF37',
                color: '#0A0A0A',
                borderRadius: '8px',
                fontSize: '20px',
                fontWeight: '600',
              }}
            >
              {tag}
            </div>
          ))}
        </div>
      </div>
    ),
    {
      ...size,
    }
  )
}
