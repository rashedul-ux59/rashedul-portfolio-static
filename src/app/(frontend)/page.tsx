import { Hero } from '@/components/Hero'
import { HomeChapters } from '@/components/HomeChapters'
import { getPosts, getProjects } from '@/lib/content'

export default async function HomePage() {
  const [posts, projects] = await Promise.all([getPosts(), getProjects()])
  return (
    <main>
      <Hero />
      <HomeChapters entries={posts} projects={projects} />
    </main>
  )
}
