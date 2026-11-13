import type { Metadata } from 'next'
import { BlogArchive } from '@/components/BlogArchive'
import { getPosts } from '@/lib/content'

export const metadata: Metadata = { title: 'The daily record — Rashedul Karim' }
export default async function BlogPage() {
  return <BlogArchive posts={await getPosts()} />
}
