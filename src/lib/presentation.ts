import type { StaticPost } from '@/lib/content'

export const categoryName = (post: StaticPost) => post.category?.name || 'Notes'

export const formatDate = (date: string) =>
  new Date(date).toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    timeZone: 'UTC',
  })

export const kindLabel = (post: StaticPost) => (post.kind === 'update' ? 'Daily update' : 'Article')
