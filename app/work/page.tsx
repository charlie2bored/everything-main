import type { Metadata } from 'next'
import { getAllProjects } from '@/lib/projects'
import Footer from '@/components/Footer'
import WorkClient from '@/components/WorkClient'

 

const allProjects = getAllProjects()

export const metadata: Metadata = {
  title: 'Work — Charlie',
  description: `Browse ${allProjects.length} projects across branding, web design, motion, and UX. View detailed case studies with measurable outcomes.`,
  openGraph: {
    title: 'Work — Charlie',
    description: `${allProjects.length} projects with measurable outcomes`,
    type: 'website',
    url: 'https://everything-evu.pages.dev/work/',
    images: [
      {
        url: '/assets/og/work.jpg',
        width: 1200,
        height: 630,
        alt: 'Charlie Work Portfolio - Project case studies',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Work — Charlie',
    description: `${allProjects.length} projects with measurable outcomes`,
    images: ['/assets/og/work.jpg'],
  },
  alternates: { 
    canonical: '/work' 
  },
}

export default async function WorkPage() {
  // Server component - handle data loading here
  const projects = getAllProjects()
  
  return (
    <>
      <WorkClient projects={projects} />
      <Footer />
    </>
  )
}
