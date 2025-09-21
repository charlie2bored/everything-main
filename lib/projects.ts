import projectsData from '../data/projects.json'

export interface KPI {
  label: string
  change: string
}

export interface Testimonial {
  quote: string
  author: string
}

export interface GalleryItem {
  src: string
  alt: string
  caption: string
}

export interface ProjectLinks {
  live?: string
  repo?: string
  press?: string
}

export interface Project {
  slug: string
  title: string
  subtitle: string
  tags: string[]
  client: string
  industry: string
  role: string[]
  timeline: string
  problem: string
  insights: string[]
  solution: string
  kpis: KPI[]
  testimonial?: Testimonial
  cover: string
  before?: string
  after?: string
  gallery: GalleryItem[]
  links: ProjectLinks
}

export function getAllProjects(): Project[] {
  return projectsData as Project[]
}

export function getProjectSlugs(): string[] {
  return projectsData.map((project) => project.slug)
}

export function getProjectBySlug(slug: string): Project | null {
  const project = projectsData.find((project) => project.slug === slug)
  return project ? (project as Project) : null
}

export function getFeaturedProjects(limit?: number): Project[] {
  const projects = getAllProjects()
  return limit ? projects.slice(0, limit) : projects
}

export function getProjectsByTag(tag: string): Project[] {
  return projectsData.filter((project) => 
    project.tags.some((projectTag) => 
      projectTag.toLowerCase() === tag.toLowerCase()
    )
  ) as Project[]
}

export function getAllTags(): string[] {
  const tags = new Set<string>()
  projectsData.forEach((project) => {
    project.tags.forEach((tag) => tags.add(tag))
  })
  return Array.from(tags).sort()
}

export function getRelatedProjects(currentSlug: string, limit = 3): Project[] {
  const currentProject = getProjectBySlug(currentSlug)
  if (!currentProject) return []

  const allProjects = getAllProjects()
  const otherProjects = allProjects.filter(p => p.slug !== currentSlug)
  
  // Sort by tag similarity
  const scored = otherProjects.map(project => {
    const commonTags = project.tags.filter(tag => 
      currentProject.tags.includes(tag)
    ).length
    return { project, score: commonTags }
  })
  
  return scored
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map(item => item.project)
}

// Helper function to generate OpenGraph image path for a project
export function getProjectOGImage(slug: string): string {
  return `/assets/og/${slug}.jpg`
}

// Helper function to format project URL
export function getProjectUrl(slug: string): string {
  return `/case/${slug}/`
}

// Helper function to get projects for homepage (reduced to 3 for performance)
export function getSelectedWork(): Project[] {
  return getFeaturedProjects(3)
}

// Helper function to format KPI display
export function formatKPI(kpi: KPI): string {
  return `${kpi.change} ${kpi.label.toLowerCase()}`
}

// Helper function to get unique industries
export function getAllIndustries(): string[] {
  const industries = new Set<string>()
  projectsData.forEach((project) => {
    industries.add(project.industry)
  })
  return Array.from(industries).sort()
}

// Helper function to get projects by industry
export function getProjectsByIndustry(industry: string): Project[] {
  return projectsData.filter((project) => 
    project.industry.toLowerCase() === industry.toLowerCase()
  ) as Project[]
}

// Helper function to check if project has before/after
export function hasBeforeAfter(project: Project): boolean {
  return !!(project.before && project.after)
}

// Helper function to get project duration in weeks
export function getProjectDurationWeeks(timeline: string): number {
  const match = timeline.match(/(\d+)\s*weeks?/i)
  return match ? parseInt(match[1]) : 0
}

// Helper function to generate structured data for a project
export function getProjectStructuredData(project: Project) {
  return {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    name: project.title,
    description: project.subtitle,
    creator: {
      '@type': 'Person',
      name: 'Charlie'
    },
    about: project.problem,
    keywords: project.tags.join(', '),
    dateCreated: new Date().getFullYear().toString(), // You might want to add actual dates to your data
    image: project.cover,
    url: getProjectUrl(project.slug)
  }
}

// Helper function to get average KPI improvement
export function getAverageImprovement(projects: Project[]): string {
  const improvements = projects.flatMap(project => 
    project.kpis
      .map(kpi => kpi.change)
      .filter(change => change.includes('+'))
      .map(change => parseInt(change.replace(/[^0-9]/g, '')))
      .filter(num => !isNaN(num))
  )
  
  if (improvements.length === 0) return '0%'
  
  const average = improvements.reduce((sum, val) => sum + val, 0) / improvements.length
  return `+${Math.round(average)}%`
}

// Helper function to get testimonial for homepage proof
export function getFeaturedTestimonials(limit = 3): Testimonial[] {
  return projectsData
    .filter(project => project.testimonial)
    .map(project => project.testimonial!)
    .slice(0, limit)
}