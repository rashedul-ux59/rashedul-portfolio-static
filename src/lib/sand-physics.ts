export const isSandTap = (duration: number, distance: number, cancelled = false) =>
  !cancelled && duration >= 0 && duration < 300 && distance < 8

export type Grain = {
  x: number
  y: number
  homeX: number
  homeY: number
  vx: number
  vy: number
  radius: number
  opacity: number
  burstLife: number
}

export function stepGrain(
  grain: Grain,
  dt: number,
  pointer: { x: number; y: number; active: boolean },
  width: number,
  height: number,
) {
  grain.homeX += 0.035 * dt
  grain.homeY -= 0.012 * dt
  if (grain.homeX > width + 10) grain.homeX = -10
  if (grain.homeY < -10) grain.homeY = height + 10
  const dx = grain.x - pointer.x
  const dy = grain.y - pointer.y
  const distance = Math.hypot(dx, dy)
  if (pointer.active && distance < 105) {
    const force = Math.pow(1 - distance / 105, 2) * 0.68
    grain.vx += (distance > 0.1 ? dx / distance : 1) * force * dt
    grain.vy += (distance > 0.1 ? dy / distance : 0) * force * dt
  }
  if (grain.burstLife > 0) {
    grain.burstLife -= 0.012 * dt
    grain.vy += 0.025 * dt
    if (grain.burstLife <= 0) {
      grain.x = grain.homeX
      grain.y = grain.homeY
      grain.vx = 0
      grain.vy = 0
    }
  } else {
    grain.vx += (grain.homeX - grain.x) * 0.0035 * dt
    grain.vy += (grain.homeY - grain.y) * 0.0035 * dt
  }
  grain.vx *= Math.pow(0.91, dt)
  grain.vy *= Math.pow(0.91, dt)
  grain.x += grain.vx * dt
  grain.y += grain.vy * dt
}
