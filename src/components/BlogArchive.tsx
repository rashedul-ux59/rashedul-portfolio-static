'use client'

import Link from 'next/link'
import { useState } from 'react'
import type { StaticPost } from '@/lib/content'
import { CmsImage } from './CmsImage'
import { ArrowIcon } from './ArrowIcon'
import { categoryName, formatDate, kindLabel } from '@/lib/presentation'

export function BlogArchive({ posts }: { posts: StaticPost[] }) {
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState('All')
  const [kind, setKind] = useState('all')
  const categories = ['All', ...new Set(posts.map(categoryName))]
  const featured = posts.find((post) => post.featured) || posts[0]
  const filtered = posts.filter(
    (post) =>
      (category === 'All' || categoryName(post) === category) &&
      (kind === 'all' || post.kind === kind) &&
      `${post.title} ${post.excerpt} ${post.body} ${categoryName(post)}`
        .toLowerCase()
        .includes(query.toLowerCase().trim()),
  )
  return (
    <main className="blog-page">
      <header className="blog-masthead">
        <p className="chapter-number">Notes from the practice</p>
        <h1>The daily record.</h1>
        <p>Working notes on design, attention, and the life around both.</p>
      </header>
      {featured && (
        <Link className="blog-feature" href={`/blog/${featured.slug}`}>
          <div
            className={`blog-feature-image relative ${!featured.image ? 'blog-feature-empty' : ''}`}
          >
            {featured.image ? (
              <CmsImage media={featured.image} sizes="(min-width: 900px) 55vw, 100vw" priority />
            ) : (
              <span className="feature-glyph" aria-hidden="true">
                ↗
              </span>
            )}
          </div>
          <div className="blog-feature-copy">
            <span>Featured · {categoryName(featured)}</span>
            <h2>{featured.title}</h2>
            <p>{featured.excerpt}</p>
            <span className="read-link">
              Read the entry <ArrowIcon />
            </span>
          </div>
        </Link>
      )}
      <section className="blog-archive" aria-label="Blog archive">
        <div className="blog-tools">
          <div className="category-list" aria-label="Filter by category">
            {categories.map((item) => (
              <button
                key={item}
                className={category === item ? 'active' : ''}
                aria-pressed={category === item}
                onClick={() => setCategory(item)}
              >
                {item}
              </button>
            ))}
          </div>
          <label className="blog-search">
            Search the archive
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Type a word or idea"
            />
          </label>
        </div>
        <div className="archive-kind-filters">
          {(
            [
              ['all', 'All entries'],
              ['article', 'Articles'],
              ['update', 'Daily updates'],
            ] as const
          ).map(([value, label]) => (
            <button key={value} aria-pressed={kind === value} onClick={() => setKind(value)}>
              {label}
            </button>
          ))}
          <span role="status">
            {filtered.length} {filtered.length === 1 ? 'entry' : 'entries'}
          </span>
        </div>
        <div className="blog-list">
          {filtered.map((post) => (
            <Link className="blog-row" href={`/blog/${post.slug}`} key={post.id}>
              <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
              <div>
                <span>
                  {kindLabel(post)} · {categoryName(post)}
                </span>
                <h2>{post.title}</h2>
                <p>{post.excerpt}</p>
              </div>
              <ArrowIcon />
            </Link>
          ))}
          {!filtered.length && (
            <div className="empty-state">
              <p>
                {posts.length
                  ? 'No notes found. Try another phrase.'
                  : 'The notebook is open. The first entry is on its way.'}
              </p>
              {posts.length > 0 && (
                <button
                  className="text-link"
                  onClick={() => {
                    setQuery('')
                    setCategory('All')
                    setKind('all')
                  }}
                >
                  Clear filters
                </button>
              )}
            </div>
          )}
        </div>
        <a className="studio-link" href="/blog">
          Explore all notes <ArrowIcon />
        </a>
      </section>
    </main>
  )
}
