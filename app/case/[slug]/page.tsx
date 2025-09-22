import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getProjectBySlug, getProjectSlugs, getProjectOGImage } from '@/lib/projects'
import dynamic from 'next/dynamic'
const CaseStudyContent = dynamic(() => import('@/components/CaseStudyContent'), { ssr: false })
export const dynamicParams = false

export async function generateStaticParams() {
  const slugs = getProjectSlugs()
  return slugs.map((slug) => ({
    slug,
  }))
}

export async function generateMetadata({ 
  params 
}: { 
  params: { slug: string } 
}): Promise<Metadata> {
  const project = getProjectBySlug(params.slug)

  if (!project) {
    return {
      title: 'Case Study Not Found',
      description: 'The requested case study could not be found.',
    }
  }

  return {
    title: `${project.title} — Charlie`,
    description: project.problem,
    openGraph: {
      title: `${project.title} — Charlie`,
      description: project.problem,
      type: 'article',
      url: `https://everything-evu.pages.dev/case/${project.slug}/`,
      images: [
        {
          url: getProjectOGImage(project.slug),
          width: 1200,
          height: 630,
          alt: `${project.title} case study`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${project.title} — Charlie`,
      description: project.problem,
      images: [getProjectOGImage(project.slug)],
    },
  }
}

export default function CaseStudyPage({ 
  params 
}: { 
  params: { slug: string } 
}) {
  const project = getProjectBySlug(params.slug)

  if (!project) {
    notFound()
  }

  return <CaseStudyContent project={project} />
}
