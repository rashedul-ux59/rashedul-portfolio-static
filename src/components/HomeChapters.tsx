import type { StaticPost, StaticProject } from '@/lib/content'
import { ArrowIcon } from './ArrowIcon'
import { CmsImage } from './CmsImage'
import { categoryName, kindLabel } from '@/lib/presentation'

export function HomeChapters({ entries, projects }: { entries: StaticPost[]; projects: StaticProject[] }) {
  return (
    <>
      <section className="introduction chapter" id="about">
        <div className="vertical-note">Chapter one · The person</div>
        <div className="intro-copy">
          <p className="chapter-number">01 / Introduction</p>
          <h2>
            I help complicated things
            <br />
            feel <em>clear and considered.</em>
          </h2>
          <div className="intro-columns">
            <p>
              I’m Rashedul, a product designer with twelve years of experience turning knotty
              systems into useful, humane products.
            </p>
            <div>
              <p>
                I work from first question to final detail—researching the context, finding the
                structure, and staying close enough to engineering to make the work real.
              </p>
              <a className="text-link" href="#philosophy">
                A little more about me <ArrowIcon />
              </a>
            </div>
          </div>
        </div>
        <aside className="availability">
          <span className="pulse" />
          <p>
            Currently taking on one
            <br />
            new project for the coming season.
          </p>
        </aside>
      </section>

      <section className="work chapter" id="work">
        <div className="section-head">
          <p className="chapter-number">02 / Selected work</p>
          <p>
            Three projects, three different kinds
            <br />
            of complexity.
          </p>
        </div>
        <div className="project-stack">
          {projects.map((project, i) => (
            <article className={`project-card ${project.color}`} key={project.id}>
              <div className="project-meta">
                <span>{String(i + 1).padStart(2, '0')}</span>
                <p>
                  {project.client}
                  <br />
                  {project.detail}
                </p>
              </div>
              <div className="project-story">
                <h3>{project.title}</h3>
                <p>{project.description}</p>
                <a href="#case-study" aria-label={`Read ${project.title} case study`}>
                  <ArrowIcon />
                </a>
              </div>
              <div className="metric">
                <strong>{project.metric}</strong>
                <span>{project.metricLabel}</span>
              </div>
              <div className="project-shape" aria-hidden="true">
                <i />
                <i />
                <i />
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="case-study" id="case-study">
        <div className="case-title">
          <p className="chapter-number">A closer look · Luma Health</p>
          <h2>
            From fragments
            <br />
            to one journey.
          </h2>
        </div>
        <div className="case-flow" aria-label="Case study process">
          <div>
            <span>01</span>
            <strong>Listen</strong>
            <p>22 interviews across patients, carers, and clinical teams.</p>
          </div>
          <div>
            <span>02</span>
            <strong>Frame</strong>
            <p>One shared model for a journey that never moves in a straight line.</p>
          </div>
          <div>
            <span>03</span>
            <strong>Make</strong>
            <p>Weekly prototypes, tested in the rooms where care happens.</p>
          </div>
        </div>
        <blockquote>
          “The work stopped being about another portal. It became about giving people their
          bearings.”
        </blockquote>
      </section>

      <section className="philosophy chapter" id="philosophy">
        <div className="section-head">
          <p className="chapter-number">03 / How I work</p>
          <h2>
            A practice built on
            <br />
            <em>attention.</em>
          </h2>
        </div>
        <div className="principles">
          <article>
            <span>Ⅰ</span>
            <h3>Start with the real world.</h3>
            <p>
              Before flows and frames, understand the room, the pressures, and the people already
              making it work.
            </p>
          </article>
          <article>
            <span>Ⅱ</span>
            <h3>Make the system visible.</h3>
            <p>
              Clarity begins when everyone can see the same problem—and the connections hidden
              inside it.
            </p>
          </article>
          <article>
            <span>Ⅲ</span>
            <h3>Earn every detail.</h3>
            <p>
              Craft is not decoration. It is the accumulation of small decisions that make a product
              easier to trust.
            </p>
          </article>
        </div>
      </section>

      <section className="expertise chapter" id="expertise">
        <div>
          <p className="chapter-number">04 / Useful across the whole arc</p>
          <h2>
            Wide lens.
            <br />
            Close attention.
          </h2>
        </div>
        <div className="expertise-list">
          {[
            [
              'Product direction',
              'Framing the right opportunity and giving teams a clear way forward.',
            ],
            [
              'Research & synthesis',
              'Listening for needs, patterns, and the detail that changes the brief.',
            ],
            [
              'Interaction design',
              'Making complex workflows legible without sanding away their nuance.',
            ],
            ['Design systems', 'Creating shared foundations that make quality repeatable.'],
            ['Prototyping', 'Turning decisions into something teams can see, touch, and test.'],
          ].map(([name, desc], i) => (
            <article key={name}>
              <span>0{i + 1}</span>
              <h3>{name}</h3>
              <p>{desc}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="notes chapter" id="notes">
        <div className="notes-intro">
          <p className="chapter-number">05 / From the desk</p>
          <h2>
            Notes on design,
            <br />
            work, and being here.
          </h2>
          <p>Short observations, shared while they are still useful.</p>
          <a className="studio-link" href="/blog">
            Explore all notes <ArrowIcon />
          </a>
        </div>
        <div className="notes-grid">
          {!entries.length && <p className="empty-state">The first entry is on its way.</p>}
          {entries.slice(0, 3).map((entry, i) => (
            <article className={i === 0 ? 'note featured' : 'note'} key={entry.id}>
              {entry.image && (
                <div className="note-image">
                  <CmsImage media={entry.image} sizes="(min-width: 900px) 40vw, 100vw" />
                </div>
              )}
              <div className="note-meta">
                <span>
                  {kindLabel(entry)} · {categoryName(entry)}
                </span>
                <time>
                  {new Date(entry.publishedAt).toLocaleDateString('en', {
                    day: '2-digit',
                    timeZone: 'UTC',
                    month: 'short',
                  })}
                </time>
              </div>
              <h3>{entry.title}</h3>
              <p>{entry.excerpt}</p>
              <a href={`/blog/${entry.slug}`} aria-label={`Read ${entry.title}`}>
                <ArrowIcon />
              </a>
            </article>
          ))}
        </div>
      </section>

      <section className="contact" id="contact">
        <p className="chapter-number">The next chapter</p>
        <h2>
          Have something
          <br />
          worth untangling?
        </h2>
        <a className="contact-link" href="mailto:hello@rashedulkarim.design">
          hello@rashedulkarim.design <ArrowIcon />
        </a>
        <div className="contact-foot">
          <p>Bangladesh · Working worldwide</p>
          <div>
            <a href="#top">LinkedIn</a>
            <a href="#top">Are.na</a>
            <a href="#top">Read.cv</a>
          </div>
          <a href="#top">Back to the sky ↑</a>
        </div>
      </section>
    </>
  )
}
