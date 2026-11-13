import Link from 'next/link'
import type { CaseStudy } from '@/content/projects'
import { ArrowIcon } from './ArrowIcon'
import siteConfig from '../../config/site.json'

export function HomeChapters({ projects }: { projects: CaseStudy[] }) {
  return (
    <>
      <section className="introduction chapter" id="about">
        <div className="vertical-note">Chapter one · The person</div>
        <div className="intro-copy">
          <p className="chapter-number">01 / Introduction</p>
          <h2>I help complicated things feel <em>clear and considered.</em></h2>
          <div className="intro-columns">
            <p>I’m Rashedul, a product designer focused on turning complex systems into useful, thoughtful digital experiences.</p>
            <div>
              <p>I work across UX strategy, interaction design, interface design, and visual craft—bringing structure to problems and clarity to the people using the product.</p>
              <a className="text-link" href="#philosophy">A little more about me <ArrowIcon /></a>
            </div>
          </div>
        </div>
        <aside className="availability"><span className="pulse" /><p>Available for select<br />projects and collaborations.</p></aside>
      </section>

      <section className="work chapter" id="work">
        <div className="section-head">
          <p className="chapter-number">02 / Selected work</p>
          <p>A selection of product challenges<br />and design explorations.</p>
        </div>
        <div className="project-stack">
          {projects.map((project, index) => (
            <article className={`project-card ${project.color}`} key={project.slug}>
              <div className="project-meta"><span>{String(index + 1).padStart(2, '0')}</span><p>{project.client}<br />{project.discipline}</p></div>
              <div className="project-story">
                <h3>{project.title}</h3><p>{project.description}</p>
                <Link href={`/work/${project.slug}`} aria-label={`Read ${project.title} case study`}><ArrowIcon /></Link>
              </div>
              <div className="metric"><strong>{project.year}</strong><span>{project.role}</span></div>
              <div className="project-shape" aria-hidden="true"><i /><i /><i /></div>
            </article>
          ))}
        </div>
      </section>

      <section className="philosophy chapter" id="philosophy">
        <div className="section-head"><p className="chapter-number">03 / How I work</p><h2>A practice built on<br /><em>attention.</em></h2></div>
        <div className="principles">
          <article><span>Ⅰ</span><h3>Start with the real world.</h3><p>Before flows and frames, understand the context, constraints, and people already making it work.</p></article>
          <article><span>Ⅱ</span><h3>Make the system visible.</h3><p>Clarity begins when everyone can see the same problem—and the connections hidden inside it.</p></article>
          <article><span>Ⅲ</span><h3>Earn every detail.</h3><p>Craft is the accumulation of small decisions that make a product easier to understand and trust.</p></article>
        </div>
      </section>

      <section className="expertise chapter" id="expertise">
        <div><p className="chapter-number">04 / What I bring</p><h2>Wide lens.<br />Close attention.</h2></div>
        <div className="expertise-list">
          {[
            ['Product direction', 'Framing the right opportunity and giving teams a clear way forward.'],
            ['Research & synthesis', 'Listening for needs, patterns, and the detail that changes the brief.'],
            ['Interaction design', 'Making complex workflows legible without sanding away their nuance.'],
            ['Design systems', 'Creating shared foundations that make quality repeatable.'],
            ['Prototyping', 'Turning decisions into something teams can see, touch, and test.'],
          ].map(([name, description], index) => <article key={name}><span>0{index + 1}</span><h3>{name}</h3><p>{description}</p></article>)}
        </div>
      </section>

      <section className="contact" id="contact">
        <p className="chapter-number">The next chapter</p><h2>Have something<br />worth untangling?</h2>
        <a className="contact-link" href={`mailto:${siteConfig.email}`}>{siteConfig.email} <ArrowIcon /></a>
        <div className="contact-foot"><p>Bangladesh · Working worldwide</p><div><a href={siteConfig.socials.linkedin}>LinkedIn</a><a href={siteConfig.socials.behance}>Behance</a><a href={siteConfig.socials.dribbble}>Dribbble</a></div><a href="#top">Back to the sky ↑</a></div>
      </section>
    </>
  )
}
