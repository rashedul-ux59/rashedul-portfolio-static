import Link from 'next/link'
import type { Metadata } from 'next'
import { getPosts, getPost } from '@/lib/content'
import { CmsImage } from '@/components/CmsImage'
import { ArrowIcon } from '@/components/ArrowIcon'
import { categoryName, formatDate, kindLabel } from '@/lib/presentation'

export const dynamicParams = false
export async function generateStaticParams() {
  return (await getPosts()).map((post) => ({ slug: post.slug }))
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const post = getPost((await params).slug)
  return {
    title: post ? `${post.title} — Rashedul Karim` : 'Entry not found',
    description: post?.excerpt,
  }
}
export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const post = getPost((await params).slug)
  if (!post) return <main className="article-page"><h1>Entry not found</h1><Link href="/blog">Back to the daily record</Link></main>
  return (
    <main className="article-page">
      <Link className="article-back" href="/blog">
        ← Back to the daily record
      </Link>
      <article>
        <header>
          <p className="chapter-number">
            {kindLabel(post)} · {categoryName(post)}
          </p>
          <h1>{post.title}</h1>
          <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)} · Rashedul Karim</time>
        </header>
        {post.image && (
          <div className="article-image">
            <CmsImage media={post.image} priority sizes="(min-width: 1200px) 1080px, 100vw" />
          </div>
        )}
        <div className="article-body">
          <p className="article-lede">{post.excerpt}</p>
          {post.body
            .split(/\n\s*\n/)
            .filter(Boolean)
            .map((paragraph, i) => (
              <p key={i}>{paragraph}</p>
            ))}
        </div>
      </article>
      <footer className="article-footer">
        <p>Written from Rashedul’s desk in Bangladesh.</p>
        <Link href="/blog">
          More notes <ArrowIcon />
        </Link>
      </footer>
    </main>
  )
}
