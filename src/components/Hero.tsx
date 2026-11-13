'use client'

import Image from 'next/image'
import { useState } from 'react'
import { SandField } from './SandField'

export function Hero() {
  const [paused, setPaused] = useState(false)
  return (
    <section className="hero" id="top" aria-label="Rashedul Karim, independent product designer">
      <div className="hero-night-sky" />
      <div className="hero-day-sky" />
      <div className="hero-dunes">
        <Image src="/images/dunes.webp" alt="" fill priority sizes="100vw" />
      </div>
      <div className="horizon-haze" />
      <div className="celestial" aria-hidden="true">
        <div className="sun-disc">
          <Image src="/images/sun.webp" alt="" fill sizes="80px" />
        </div>
        <div className="moon-disc">
          <Image src="/images/moon.webp" alt="" fill sizes="80px" />
        </div>
      </div>
      <SandField paused={paused} />
      <div className="hero-content">
        <p className="hero-availability">
          <span />
          Available for select projects
        </p>
        <p className="hero-role">Independent Product Designer</p>
        <h1>
          Designing digital
          <br />
          <span className="headline-middle">
            <em>experiences</em> with
          </span>
          <br />
          purpose.
        </h1>
        <p className="hero-intro">
          I’m Rashedul — a product designer blending strategy, UX and
          <br className="desktop-break" /> visual craft to make complex things feel simple.
        </p>
        <div className="hero-actions">
          <a className="hero-cta" href="#work">
            Explore my work <span aria-hidden="true">↘</span>
          </a>
          <a className="hero-about" href="#about">
            A little about me <span aria-hidden="true">↗</span>
          </a>
        </div>
      </div>
      <button
        className="sand-hint"
        onClick={() => setPaused(!paused)}
        aria-label={paused ? 'Resume particle motion' : 'Pause particle motion'}
        aria-pressed={paused}
      >
        <svg viewBox="0 0 20 20" width="16" height="16" aria-hidden="true">
          <path
            d="M10 2v16M2 10h16M4.3 4.3l11.4 11.4M4.3 15.7 15.7 4.3"
            fill="none"
            stroke="currentColor"
            strokeWidth=".8"
          />
        </svg>
        <span>
          {paused ? 'The sand is resting. Click to resume.' : 'Move your cursor through the sand'}
        </span>
      </button>
      <div className="hero-foot">
        <a className="scroll-cue" href="#about">
          Scroll to explore <span />
        </a>
        <p>Based in Bangladesh · Working worldwide</p>
      </div>
    </section>
  )
}
