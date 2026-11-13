'use client'

import { useEffect, useRef } from 'react'
import { isSandTap, stepGrain, type Grain } from '@/lib/sand-physics'

export function SandField({ paused }: { paused: boolean }) {
  const ref = useRef<HTMLCanvasElement>(null)
  const pausedRef = useRef(paused)
  useEffect(() => {
    pausedRef.current = paused
  }, [paused])

  useEffect(() => {
    const canvas = ref.current
    const hero = canvas?.parentElement
    const context = canvas?.getContext('2d')
    if (!canvas || !hero || !context) return
    let width = 0,
      height = 0,
      frame = 0,
      last = 0,
      visible = true
    let grains: Grain[] = []
    let nightMix = document.documentElement.dataset.theme === 'day' ? 0 : 1
    let activePointer: number | null = null
    const pointer = { x: -1000, y: -1000, active: false }
    const press = { x: 0, y: 0, time: 0, distance: 0 }
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)')
    const resize = () => {
      const rect = hero.getBoundingClientRect()
      width = rect.width
      height = rect.height
      const ratio = Math.min(window.devicePixelRatio || 1, 1.75)
      canvas.width = width * ratio
      canvas.height = height * ratio
      context.setTransform(ratio, 0, 0, ratio, 0, 0)
      grains = Array.from(
        { length: Math.min(2000, Math.max(380, Math.round((width * height) / 850))) },
        () => {
          const x = Math.random() * width,
            y = Math.random() * height
          return {
            x,
            y,
            homeX: x,
            homeY: y,
            vx: 0,
            vy: 0,
            radius: 0.35 + Math.random() * 0.65,
            opacity: 0.12 + Math.random() * 0.52,
            burstLife: 0,
          }
        },
      )
      canvas.dataset.particles = String(grains.length)
    }
    const locate = (event: PointerEvent) => {
      const rect = hero.getBoundingClientRect()
      pointer.x = event.clientX - rect.left
      pointer.y = event.clientY - rect.top
      pointer.active = true
    }
    const move = (event: PointerEvent) => {
      if (!event.isPrimary) return
      locate(event)
      if (activePointer === event.pointerId)
        press.distance = Math.max(
          press.distance,
          Math.hypot(event.clientX - press.x, event.clientY - press.y),
        )
    }
    const down = (event: PointerEvent) => {
      if (!event.isPrimary) {
        activePointer = null
        pointer.active = false
        return
      }
      if (event.button !== 0 || (event.target as HTMLElement).closest('a, button, input')) return
      locate(event)
      activePointer = event.pointerId
      press.x = event.clientX
      press.y = event.clientY
      press.time = performance.now()
      press.distance = 0
    }
    const up = (event: PointerEvent) => {
      if (event.pointerId !== activePointer) return
      press.distance = Math.max(
        press.distance,
        Math.hypot(event.clientX - press.x, event.clientY - press.y),
      )
      if (
        isSandTap(performance.now() - press.time, press.distance) &&
        !reduced.matches &&
        !pausedRef.current
      ) {
        locate(event)
        const nearby = [...grains]
          .sort(
            (a, b) =>
              Math.hypot(a.x - pointer.x, a.y - pointer.y) -
              Math.hypot(b.x - pointer.x, b.y - pointer.y),
          )
          .slice(0, 100)
        nearby.forEach((grain) => {
          const angle = Math.random() * Math.PI * 2,
            speed = 2 + Math.random() * 5
          grain.x = pointer.x + (Math.random() - 0.5) * 8
          grain.y = pointer.y + (Math.random() - 0.5) * 8
          grain.vx = Math.cos(angle) * speed
          grain.vy = Math.sin(angle) * speed
          grain.burstLife = 0.65 + Math.random() * 0.35
        })
        canvas.dataset.bursts = String(Number(canvas.dataset.bursts || 0) + 1)
      }
      activePointer = null
      if (event.pointerType === 'touch') pointer.active = false
    }
    const cancel = () => {
      activePointer = null
      pointer.active = false
    }
    const draw = (now: number) => {
      const dt = Math.min(2, (now - last) / 16.667 || 1)
      last = now
      if (visible && !document.hidden) {
        context.clearRect(0, 0, width, height)
        const night = document.documentElement.dataset.theme !== 'day'
        nightMix += ((night ? 1 : 0) - nightMix) * Math.min(1, 0.035 * dt)
        context.fillStyle = `rgb(${165 + 56 * nightMix}, ${118 + 66 * nightMix}, ${59 + 61 * nightMix})`
        for (const grain of grains) {
          if (!pausedRef.current && !reduced.matches) stepGrain(grain, dt, pointer, width, height)
          context.globalAlpha =
            grain.opacity * (grain.burstLife > 0 ? Math.min(1, grain.burstLife * 4) : 1)
          context.beginPath()
          context.arc(grain.x, grain.y, grain.radius, 0, Math.PI * 2)
          context.fill()
        }
      }
      frame = requestAnimationFrame(draw)
    }
    const observer = new ResizeObserver(resize)
    observer.observe(hero)
    const intersection = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting
    })
    intersection.observe(hero)
    hero.addEventListener('pointermove', move)
    hero.addEventListener('pointerdown', down)
    window.addEventListener('pointerup', up)
    window.addEventListener('pointercancel', cancel)
    hero.addEventListener('pointerleave', cancel)
    window.addEventListener('blur', cancel)
    resize()
    frame = requestAnimationFrame(draw)
    return () => {
      cancelAnimationFrame(frame)
      observer.disconnect()
      intersection.disconnect()
      hero.removeEventListener('pointermove', move)
      hero.removeEventListener('pointerdown', down)
      window.removeEventListener('pointerup', up)
      window.removeEventListener('pointercancel', cancel)
      hero.removeEventListener('pointerleave', cancel)
      window.removeEventListener('blur', cancel)
    }
  }, [])

  return <canvas className="particle-field" ref={ref} aria-hidden="true" data-bursts="0" />
}
