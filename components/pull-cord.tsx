"use client"

import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react"
import { motion, useReducedMotion } from "motion/react"

import { DEFAULT_CONFIG, type PullCordConfig } from "../config/pull-cord"

/*
 * PullCord — a ceiling pull-cord with a real rope.
 *
 * Verlet rope (nodes + distance constraints, with frame-time correction).
 * GRAVITY makes it hang straight and is the restoring force; NO wind, so it
 * is still at rest and never swings forever, just settles.
 *
 *  - ENTRANCE: a CSS transform drops the whole rope + knob in from above on
 *    mount (see pullcord.css), once.
 *  - Then it's a normal rope: grab the knob (or click / Enter), it follows /
 *    swings, and fires onPull; release and it settles under gravity + damping.
 *
 * One rAF loop steps the sim and writes the DOM via refs, and sleeps once still.
 */

// ---- geometry (SVG units == px) ----
const W = 64
const ANCHOR_X = W / 2
const REST_Y = 176
const SVG_H = 340
const SEGMENTS = 16
const REST_SEG = REST_Y / SEGMENTS
const HIT = 46
const FILAMENT_R = 2.3
const BULB_SCALE = 1.2
const BULB_HEIGHT = 23.5 * BULB_SCALE
const BULB_HIT = HIT * BULB_SCALE

type RopeNode = { x: number; y: number; ox: number; oy: number; fixed: boolean }

function buildPath(p: RopeNode[]): string {
  let d = `M ${p[0].x.toFixed(1)} ${p[0].y.toFixed(1)}`
  for (let i = 1; i < p.length - 1; i++) {
    const xc = (p[i].x + p[i + 1].x) / 2
    const yc = (p[i].y + p[i + 1].y) / 2
    d += ` Q ${p[i].x.toFixed(1)} ${p[i].y.toFixed(1)} ${xc.toFixed(1)} ${yc.toFixed(1)}`
  }
  const n = p.length - 1
  d += ` L ${p[n].x.toFixed(1)} ${p[n].y.toFixed(1)}`
  return d
}

/** Nodes at full rest (straight hang). The drop-in entrance is a CSS transform
 *  on the wrapper; the Verlet sim is for grabbing/swinging. */
function makeNodes(): RopeNode[] {
  const arr: RopeNode[] = []
  for (let i = 0; i <= SEGMENTS; i++) {
    const y = REST_SEG * i
    arr.push({ x: ANCHOR_X, y, ox: ANCHOR_X, oy: y, fixed: i === 0 })
  }
  return arr
}
const INITIAL_PATH = buildPath(makeNodes())

function PullCordBulb({
  cx,
  cy,
  pulled,
}: {
  cx: number
  cy: number
  pulled: boolean
}) {
  const attach = cy
  const baseTop = attach
  const baseBottom = attach + 5.5
  const glassTop = baseBottom
  const glassBottom = attach + 23.5
  const baseW = 7.2

  const glassPath = [
    `M ${cx - 2.9} ${glassTop}`,
    `L ${cx + 2.9} ${glassTop}`,
    `C ${cx + 4.4} ${glassTop + 1.5}, ${cx + 7.4} ${glassTop + 5}, ${cx + 7.8} ${glassTop + 9}`,
    `C ${cx + 8.2} ${glassTop + 13}, ${cx + 7} ${glassBottom - 1.5}, ${cx} ${glassBottom}`,
    `C ${cx - 7} ${glassBottom - 1.5}, ${cx - 8.2} ${glassTop + 13}, ${cx - 7.8} ${glassTop + 9}`,
    `C ${cx - 7.4} ${glassTop + 5}, ${cx - 4.4} ${glassTop + 1.5}, ${cx - 2.9} ${glassTop}`,
    "Z",
  ].join(" ")

  return (
    <g>
      <defs>
        <clipPath id="pc-bulb-glass-clip">
          <path d={glassPath} />
        </clipPath>
      </defs>

      <path
        d={glassPath}
        fill="rgba(255, 255, 255, 0.06)"
        stroke="var(--pullcord-bulb-outline, #cbd5e1)"
        strokeWidth={0.85}
        strokeLinejoin="round"
      />

      <g clipPath="url(#pc-bulb-glass-clip)">
        <path
          d={[
            `M ${cx - 5.2} ${glassTop + 2.5}`,
            `C ${cx - 7.4} ${glassTop + 4.8}, ${cx - 6.8} ${glassTop + 8.2}, ${cx - 4.6} ${glassTop + 9.6}`,
            `C ${cx - 6.2} ${glassTop + 6.2}, ${cx - 6} ${glassTop + 3.8}, ${cx - 5.2} ${glassTop + 2.5}`,
            "Z",
          ].join(" ")}
          fill="var(--pullcord-bulb-outline, #cbd5e1)"
          opacity={0.55}
        />
      </g>

      <path
        d={[
          `M ${cx - 1.6} ${glassTop + 1.2}`,
          `L ${cx - 2.2} ${glassTop + 3.6}`,
          `L ${cx + 2.2} ${glassTop + 3.6}`,
          `L ${cx + 1.6} ${glassTop + 1.2}`,
          "Z",
        ].join(" ")}
        fill="var(--pullcord-bulb-wire, #94a3b8)"
        stroke="rgba(0,0,0,0.12)"
        strokeWidth={0.25}
      />

      <line
        x1={cx - 2.3}
        y1={glassTop + 4.2}
        x2={cx}
        y2={glassTop + 8.8}
        stroke="var(--pullcord-bulb-wire, #94a3b8)"
        strokeWidth={0.45}
        strokeLinecap="round"
      />
      <line
        x1={cx + 2.3}
        y1={glassTop + 4.2}
        x2={cx}
        y2={glassTop + 8.8}
        stroke="var(--pullcord-bulb-wire, #94a3b8)"
        strokeWidth={0.45}
        strokeLinecap="round"
      />
      <circle
        cx={cx}
        cy={glassTop + 8.8}
        r={FILAMENT_R}
        fill={
          pulled
            ? "var(--pullcord-bulb-lit-filament)"
            : "var(--pullcord-bulb-off-filament)"
        }
        filter={pulled ? "url(#pc-filament-glow)" : undefined}
      />

      <rect
        x={cx - baseW / 2}
        y={baseTop}
        width={baseW}
        height={baseBottom - baseTop}
        rx={0.45}
        fill="url(#pc-bulb-base)"
        stroke="var(--pullcord-bulb-outline, #cbd5e1)"
        strokeWidth={0.55}
      />
      <line
        x1={cx - baseW / 2 + 0.6}
        y1={baseTop + 0.4}
        x2={cx - baseW / 2 + 0.6}
        y2={baseBottom - 0.4}
        stroke="rgba(255,255,255,0.35)"
        strokeWidth={0.35}
      />
      <line
        x1={cx + baseW / 2 - 0.6}
        y1={baseTop + 0.4}
        x2={cx + baseW / 2 - 0.6}
        y2={baseBottom - 0.4}
        stroke="rgba(255,255,255,0.22)"
        strokeWidth={0.35}
      />
      {[0.85, 1.85, 2.85, 3.85].map((offset) => (
        <line
          key={offset}
          x1={cx - baseW / 2 + 1}
          y1={baseTop + offset}
          x2={cx + baseW / 2 - 1}
          y2={baseTop + offset}
          stroke="#64748b"
          strokeWidth={0.38}
          strokeLinecap="round"
        />
      ))}

      <path
        d={[
          `M ${cx - 1.5} ${baseTop}`,
          `L ${cx + 1.5} ${baseTop}`,
          `L ${cx + 2.4} ${baseTop - 1.5}`,
          `L ${cx - 2.4} ${baseTop - 1.5}`,
          "Z",
        ].join(" ")}
        fill="#3f2e23"
        stroke="rgba(0,0,0,0.2)"
        strokeWidth={0.25}
      />
    </g>
  )
}

export interface PullCordProps {
  /** Fired once per pull, the moment the pull crosses the actuation depth
   *  (like a real pull-chain detenting mid-pull), and on click / Enter. */
  onPull?: () => void
  /** When true the bulb is lit (warm glass + glowing filament). */
  pulled?: boolean
  /** Accessible name for the knob button. */
  ariaLabel?: string
  /** Skip the drop-in entrance and start at rest. */
  noEntrance?: boolean
  /** Partial physics overrides, merged over the defaults. */
  config?: Partial<PullCordConfig>
  /** Extra class on the fixed wrapper (position with --pullcord-top / --pullcord-right). */
  className?: string
}

export function PullCord({
  onPull,
  pulled = false,
  ariaLabel = "Pull the cord",
  noEntrance = false,
  config,
  className,
}: PullCordProps) {
  const reduce = useReducedMotion()

  // Per-instance config, synced before paint so prop changes apply to the next
  // frame (the sim reads cfgRef.current inside the rAF loop).
  const cfgRef = useRef<PullCordConfig>({ ...DEFAULT_CONFIG })

  useLayoutEffect(() => {
    Object.assign(cfgRef.current, DEFAULT_CONFIG, config)
  }, [config])

  const knobRef = useRef<HTMLButtonElement>(null)
  const cordRef = useRef<SVGPathElement>(null)
  const groupRef = useRef<SVGGElement>(null)

  const dragging = useRef(false)
  const didDrag = useRef(false)
  const clicked = useRef(false) // once-per-pull guard: the switch clicks a single time per pull
  const target = useRef({ x: ANCHOR_X, y: REST_Y })
  const wake = useRef<() => void>(() => {})
  const onPullRef = useRef(onPull)

  useLayoutEffect(() => {
    onPullRef.current = onPull
  }, [onPull])

  const nodesRef = useRef<RopeNode[]>(makeNodes())

  const [drop, setDrop] = useState(!noEntrance)
  // One-shot guard so the drop's physics handoff fires once, even though endDrop
  // can be reached from both onAnimationEnd and the fallback timeout.
  const dropDone = useRef(noEntrance)

  useEffect(() => {
    const pts = nodesRef.current
    const last = pts.length - 1
    let raf = 0
    let running = false
    let prevT = 0
    let prevDt = 0

    const render = () => {
      cordRef.current?.setAttribute("d", buildPath(pts))
      groupRef.current?.setAttribute(
        "transform",
        `translate(${(pts[last].x - ANCHOR_X).toFixed(2)} ${(pts[last].y - REST_Y).toFixed(2)})`
      )
    }

    const step = (now: number) => {
      const { gravity, damping, iterations, sleepVelocity } = cfgRef.current
      const dt = prevT
        ? Math.min(0.04, Math.max(0.004, (now - prevT) / 1000))
        : 1 / 60
      prevT = now
      const tc = prevDt > 0 ? dt / prevDt : 1
      // damping is a per-frame retention tuned at 60fps. On a high-refresh display
      // it would be applied ~2x as often per second and over-damp into slow motion;
      // normalise it to real time so the feel is identical at any refresh rate.
      const velCoef = tc * Math.pow(damping, dt * 60)
      const accCoef = dt * dt

      pts[last].fixed = dragging.current

      for (let i = 1; i < pts.length; i++) {
        const p = pts[i]
        if (p.fixed) continue
        const vx = p.x - p.ox
        const vy = p.y - p.oy
        p.ox = p.x
        p.oy = p.y
        p.x += vx * velCoef
        p.y += vy * velCoef + gravity * accCoef
      }
      pts[0].x = ANCHOR_X
      pts[0].y = 0
      if (dragging.current) {
        pts[last].ox = pts[last].x
        pts[last].oy = pts[last].y
        pts[last].x = target.current.x
        pts[last].y = target.current.y
      }
      for (let k = 0; k < iterations; k++) {
        for (let i = 0; i < last; i++) {
          const a = pts[i]
          const b = pts[i + 1]
          const dx = b.x - a.x
          const dy = b.y - a.y
          const dist = Math.hypot(dx, dy) || 0.0001
          const diff = ((REST_SEG - dist) / dist) * 0.5
          const ox = dx * diff
          const oy = dy * diff
          if (!a.fixed) {
            a.x -= ox
            a.y -= oy
          }
          if (!b.fixed) {
            b.x += ox
            b.y += oy
          }
        }
      }
      prevDt = dt
      render()

      let speed = 0
      for (let i = 1; i < pts.length; i++)
        speed += Math.abs(pts[i].x - pts[i].ox) + Math.abs(pts[i].y - pts[i].oy)
      // speed sums per-frame displacements (smaller at high refresh), so scale the
      // threshold by dt*60 too, else high-refresh frames would sleep prematurely.
      if (!dragging.current && speed < sleepVelocity * dt * 60) {
        render()
        running = false
        return
      }
      raf = requestAnimationFrame(step)
    }

    wake.current = () => {
      if (running) return
      running = true
      prevT = 0
      prevDt = 0
      raf = requestAnimationFrame(step)
    }

    render() // paint the resting rope; the CSS entrance slides the whole thing in
    return () => cancelAnimationFrame(raf)
  }, [])

  // The "click" itself.
  const doToggle = () => onPullRef.current?.()

  // A click / keypress simulates a real pull: the switch clicks and the rope
  // yanks down then retracts under physics.
  const scriptedPull = () => {
    doToggle()
    if (reduce) return
    const pts = nodesRef.current
    pts[pts.length - 1].oy -= 22 // downward yank -> the rope recoils + settles
    wake.current()
  }

  const onPanStart = () => {
    dragging.current = true
    didDrag.current = true
    clicked.current = false // arm the switch for this pull
    wake.current()
  }

  const onPan = (
    _e: PointerEvent,
    info: { offset: { x: number; y: number } }
  ) => {
    const { stretchMax, stretchToggle } = cfgRef.current
    const rx = info.offset.x
    const ry = REST_Y + info.offset.y
    const dist = Math.hypot(rx, ry) || 0.0001
    const maxD = REST_Y + stretchMax
    const k = dist > maxD ? maxD / dist : 1
    target.current = { x: ANCHOR_X + rx * k, y: ry * k }
    // The "click": fire once the moment the pull crosses the actuation depth, like
    // a real pull-chain detenting mid-pull. Clamp the depth below the travel so
    // the click always lands while the knob is still moving.
    const clickAt = Math.min(stretchToggle, stretchMax - 1)
    if (!clicked.current && dist - REST_Y >= clickAt) {
      clicked.current = true
      doToggle()
    }
  }

  const onPanEnd = () => {
    const { maxVelocity } = cfgRef.current
    dragging.current = false
    const pts = nodesRef.current
    const p = pts[pts.length - 1]
    const vx = p.x - p.ox
    const vy = p.y - p.oy
    const v = Math.hypot(vx, vy)
    if (v > maxVelocity) {
      const k = maxVelocity / v
      p.ox = p.x - vx * k
      p.oy = p.y - vy * k
    }
    // Release: the cord retracts and settles under physics. The switch already
    // clicked mid-pull (onPan), so there is deliberately no toggle here.
    wake.current()
    requestAnimationFrame(() => {
      didDrag.current = false
    })
  }

  const onClick = (e: React.MouseEvent) => {
    if (didDrag.current) return
    if (e.detail === 0) return
    scriptedPull()
  }

  const onKeyDown = (e: React.KeyboardEvent) => {
    if ((e.key === "Enter" || e.key === " ") && !e.repeat) {
      e.preventDefault()
      scriptedPull()
    }
  }

  // Finish the entrance exactly once, then kick the rope so it whips and settles
  // with physics instead of stopping dead like a rigid stick.
  const endDrop = useCallback(() => {
    if (dropDone.current) return
    dropDone.current = true
    setDrop(false)
    if (reduce) return
    const pts = nodesRef.current
    if (!pts) return
    // The css fall ends fast and AT rest position; hand its downward momentum to
    // the rope so it overshoots + bounces back, plus a lateral component so it
    // swings, all as ONE continuous settle.
    pts[pts.length - 1].oy -= 13 // continue the fall -> a single overshoot + bounce
    pts[pts.length - 1].ox -= 6 // lateral -> the subtle waddle
    wake.current()
  }, [reduce])

  // Fallback in case animationend never fires (reduced motion, or a tab
  // backgrounded mid-drop).
  useEffect(() => {
    if (noEntrance) return
    const fb = window.setTimeout(endDrop, 1700)
    return () => window.clearTimeout(fb)
  }, [endDrop, noEntrance])

  const onDropEnd = (e: React.AnimationEvent) => {
    if (e.animationName !== "pullcord-drop") return
    endDrop()
  }

  return (
    <div
      className={className ? `pullcord ${className}` : "pullcord"}
      style={{
        position: "fixed",
        top: "var(--pullcord-top, 0px)",
        right: "var(--pullcord-right)",
        zIndex: "var(--pullcord-z, 60)" as unknown as number,
        width: W,
        height: SVG_H,
        pointerEvents: "none",
      }}
    >
      {/* inner wrapper carries the drop-in transform, so the OUTER wrapper keeps
          a stable z-index above the site header */}
      <div
        className={
          drop ? "pullcord-inner pullcord-inner--drop" : "pullcord-inner"
        }
        onAnimationEnd={onDropEnd}
      >
        <svg
          viewBox={`0 0 ${W} ${SVG_H}`}
          width={W}
          height={SVG_H}
          aria-hidden="true"
          style={{ overflow: "visible" }}
        >
          <defs>
            <linearGradient id="pc-bulb-base" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#cbd5e1" />
              <stop offset="18%" stopColor="#e2e8f0" />
              <stop offset="50%" stopColor="#94a3b8" />
              <stop offset="82%" stopColor="#e2e8f0" />
              <stop offset="100%" stopColor="#cbd5e1" />
            </linearGradient>
            <filter
              id="pc-filament-glow"
              x="-120%"
              y="-120%"
              width="340%"
              height="340%"
            >
              <feGaussianBlur stdDeviation="2" result="blur" />
              <feFlood
                floodColor="#facc15"
                floodOpacity="0.75"
                result="color"
              />
              <feComposite in="color" in2="blur" operator="in" result="glow" />
              <feMerge>
                <feMergeNode in="glow" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            <filter
              id="pc-knob-sh"
              x="-70%"
              y="-70%"
              width="240%"
              height="240%"
            >
              <feDropShadow
                dx="0"
                dy="1.4"
                stdDeviation="1.5"
                floodColor="rgba(0,0,0,0.32)"
              />
            </filter>
          </defs>

          <path
            ref={cordRef}
            d={INITIAL_PATH}
            stroke="var(--pullcord-ink, rgba(127, 127, 127, 0.45))"
            strokeWidth={1.5}
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
            vectorEffect="non-scaling-stroke"
          />

          <g ref={groupRef}>
            <g
              transform={`translate(${ANCHOR_X} ${REST_Y}) scale(${BULB_SCALE}) translate(${-ANCHOR_X} ${-REST_Y})`}
            >
              <g filter="url(#pc-knob-sh)">
                <PullCordBulb cx={ANCHOR_X} cy={REST_Y} pulled={pulled} />
              </g>
            </g>
          </g>
        </svg>

        <motion.button
          ref={knobRef}
          type="button"
          className="pullcord-knob"
          aria-label={ariaLabel}
          aria-pressed={pulled}
          title={ariaLabel}
          onPanStart={reduce ? undefined : onPanStart}
          onPan={reduce ? undefined : onPan}
          onPanEnd={reduce ? undefined : onPanEnd}
          onClick={onClick}
          onKeyDown={onKeyDown}
          style={{
            position: "absolute",
            left: ANCHOR_X - BULB_HIT / 2,
            top: REST_Y + BULB_HEIGHT / 2 - BULB_HIT / 2,
            width: BULB_HIT,
            height: BULB_HIT,
            padding: 0,
            border: "none",
            background: "transparent",
            cursor: "grab",
            touchAction: "none",
            pointerEvents: "auto",
          }}
        />
      </div>
    </div>
  )
}
