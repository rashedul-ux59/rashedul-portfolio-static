import type React from 'react'

// Custom injected scripts are intentionally disabled in the static edition.
export function renderHeadCustomCode(_html: string | undefined, _slot: 'head-start' | 'head-end'): React.ReactNode {
  return null
}

export function BodyCustomCode(_props: { html: string | undefined }) {
  return null
}
