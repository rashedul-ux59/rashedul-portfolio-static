import postsData from '@/data/posts.json'
import projectsData from '@/data/projects.json'

export type StaticMedia = string | null
export type StaticPost = {
  id: string
  title: string
  slug: string
  excerpt: string
  image: StaticMedia
  body: string
  kind: 'article' | 'update'
  category: { id: string; name: string; slug: string }
  featured: boolean
  publishedAt: string
}
export type StaticProject = {
  id: string
  title: string
  client: string
  detail: string
  description: string
  metric: string
  metricLabel: string
  order: number
  color: string
}

const posts = postsData as StaticPost[]
const projects = projectsData as StaticProject[]

export function getPosts(): StaticPost[] {
  return [...posts].sort((a, b) => Date.parse(b.publishedAt) - Date.parse(a.publishedAt))
}

export function getPost(slug: string): StaticPost | undefined {
  return posts.find((post) => post.slug === slug)
}

export function getProjects(): StaticProject[] {
  return [...projects].sort((a, b) => a.order - b.order)
}
