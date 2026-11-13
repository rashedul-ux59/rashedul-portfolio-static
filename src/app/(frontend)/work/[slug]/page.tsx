import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getProject, projects } from '@/content/projects'
import { ArrowIcon } from '@/components/ArrowIcon'

export const dynamicParams = false
export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }))
}
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const project = getProject((await params).slug)
  return { title: project ? `${project.title} — Rashedul Karim` : 'Case study not found', description: project?.description }
}
export default async function CaseStudyPage({ params }: { params: Promise<{ slug: string }> }) {
  const project = getProject((await params).slug)
  if (!project) notFound()
  return (
    <main className={`case-page case-page-${project.color}`}>
      <div className="case-page-inner">
        <Link className="case-back" href="/#work">← Back to selected work</Link>
        <header className="case-page-header">
          <p className="chapter-number">{project.client} · {project.discipline} · {project.year}</p>
          <h1>{project.title}</h1>
          <p className="case-page-lede">{project.description}</p>
          <div className="case-facts"><div><span>Role</span><strong>{project.role}</strong></div><div><span>Services</span><strong>{project.services.join(' · ')}</strong></div><div><span>Year</span><strong>{project.year}</strong></div></div>
        </header>
        <section className="case-copy-block"><p className="chapter-number">01 / Overview</p><div><h2>The context</h2><p>{project.overview}</p></div></section>
        <section className="case-copy-block"><p className="chapter-number">02 / The challenge</p><div><h2>What needed to change</h2><p>{project.challenge}</p></div></section>
        <section className="case-approach"><p className="chapter-number">03 / The approach</p><h2>From understanding<br />to considered decisions.</h2><div className="case-steps">{project.approach.map((step, index) => <article key={step.title}><span>0{index + 1}</span><h3>{step.title}</h3><p>{step.description}</p></article>)}</div></section>
        <section className="case-copy-block case-outcome"><p className="chapter-number">04 / Outcome</p><div><h2>What came together</h2><p>{project.outcome}</p></div></section>
        <footer className="case-page-footer"><p>Have a similar challenge?</p><a href="mailto:hello@rashedulkarim.design">Let’s talk <ArrowIcon /></a><Link href="/#work">Explore more work ↗</Link></footer>
      </div>
    </main>
  )
}
