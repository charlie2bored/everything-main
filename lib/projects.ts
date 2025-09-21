import projectsData from '../data/projects.json'

export interface Project {
  slug: string
  title: string
  subtitle: string
  tags: string[]
  role: string
  timeline: string
  summary: string
  process: string[]
  gallery: string[]
  outcomes: string[]
  cover: string
  live?: string
  repo?: string
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
