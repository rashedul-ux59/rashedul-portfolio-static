import { Hero } from '@/components/Hero'
import { HomeChapters } from '@/components/HomeChapters'
import { projects } from '@/content/projects'

export default function HomePage() {
  return (
    <main>
      <Hero />
      <HomeChapters projects={projects} />
    </main>
  )
}
