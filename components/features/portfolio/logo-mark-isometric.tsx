"use client"

import { useEffect, useId, useRef } from "react"
import type { Transition } from "motion/react"
import {
  motion,
  useInView,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "motion/react"

import { metalClickSound } from "@/lib/soundcn/metal-click"
import { useSound } from "@/hooks/soundcn/use-sound"

const transition: Transition = {
  type: "spring",
  mass: 0.5,
  damping: 18,
  stiffness: 200,
}

/**
 * The T is drawn on the same isometric lattice as the D: one column step is
 * (55.425, -32), one row step is (55.425, 32), and the extrusion is 32 deep.
 * Its group transform places it exactly one column after the D.
 */
const tTopFace =
  "M0 128L221.70 0L277.13 32L193.99 80L360.26 176L304.84 208L138.56 112L55.43 160Z"

// One walker touring only the top faces of D and T, then looping forever.
const walkerSize = 78
// Asset bottom cut sits ~9.3° (y-down); rotate to the iso column axis (55.425, -32) of D/T.
const walkerBottomAngle = 9.33
const walkerRotate =
  (Math.atan2(-32, 55.425) * 180) / Math.PI - walkerBottomAngle
const walkerPath: readonly (readonly [x: number, y: number])[] = [
  // D top face — solid ring (outside the hollow)
  [50, 290],
  [90, 250],
  [150, 240],
  [210, 220],
  [270, 250],
  [330, 280],
  [360, 310],
  [320, 350],
  [250, 380],
  [180, 360],
  [100, 330],
  [50, 290],
  // Approach the D→T junction along D's top-right
  [150, 230],
  [220, 220],
  [280, 194],
  // Short hop onto T's top face
  [308, 146],
  // T top face — crossbar, then stem, then back
  [340, 120],
  [380, 100],
  [420, 80],
  [460, 60],
  [500, 45],
  [530, 40],
  [500, 55],
  [490, 100],
  [520, 130],
  [550, 155],
  [580, 180],
  [560, 165],
  [530, 145],
  [490, 125],
  [450, 110],
  [400, 120],
  [360, 130],
  [308, 146],
  // Return hop onto D
  [280, 194],
  [220, 220],
  [150, 230],
  [50, 290],
]

const walkerXs = walkerPath.map(([x]) => x - walkerSize / 2)
const walkerYs = walkerPath.map(([, y]) => y - walkerSize / 2)

/**
 * Designed by ncdai on Figma with [Fast Isometric Plugin](https://www.figma.com/community/plugin/1249759048471403961).
 * Inspired by tailwindcss.com.
 */
export function LogoMarkIsometric() {
  const id = useId()
  const ids = {
    facePattern: `ncdai-face-pattern-${id}`,
    faceFill: `ncdai-face-fill-${id}`,
    stroke: `ncdai-stroke-${id}`,
    radialGradient: `ncdai-radial-gradient-${id}`,
  }

  const ref = useRef<SVGSVGElement>(null)

  const [play] = useSound(metalClickSound)

  const shouldReduceMotion = useReducedMotion()
  const isInView = useInView(ref, { margin: "80px" })

  const mouseX = useMotionValue(0.5)
  const mouseY = useMotionValue(0.5)

  const cx = useSpring(useTransform(mouseX, [0, 1], [0, 556]), {
    stiffness: 300,
    damping: 30,
    mass: 0.1,
  })

  const cy = useSpring(useTransform(mouseY, [0, 1], [0, 354]), {
    stiffness: 300,
    damping: 30,
    mass: 0.1,
  })

  useEffect(() => {
    if (shouldReduceMotion || !isInView) {
      return
    }

    if (window.matchMedia("(hover: none)").matches) {
      return
    }

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX / window.innerWidth)
      mouseY.set(e.clientY / window.innerHeight)
    }

    window.addEventListener("mousemove", handleMouseMove)

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
    }
  }, [shouldReduceMotion, isInView, mouseX, mouseY])

  return (
    <motion.svg
      ref={ref}
      className="h-auto w-full touch-manipulation overflow-visible [--pattern:color-mix(in_oklab,var(--foreground)_12%,var(--background))] [--stroke:color-mix(in_oklab,var(--foreground)_16%,var(--background))]"
      viewBox="0 0 638.38 449"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
      initial="normal"
      whileTap="pressed"
      onTap={() => play()}
    >
      <defs>
        <pattern
          id={ids.facePattern}
          x="0"
          y="0"
          width="10"
          height="10"
          patternUnits="userSpaceOnUse"
        >
          <path
            d="M-1 1l2 -2M0 10l10 -10M9 11l2 -2"
            stroke="var(--pattern)"
            strokeWidth="1"
          />
        </pattern>

        <motion.g
          id={ids.faceFill}
          variants={{
            normal: {
              transform: "translate(0px, 0px)",
            },
            pressed: {
              transform: "translate(0px, 16px)",
            },
          }}
          transition={transition}
          // Since motion@12.43.0 SVG transforms are hardware-accelerated, which
          // approximates the spring as a WAAPI `linear()` easing and desyncs this
          // group from the `d` morphs that still run on the JS frameloop. Declaring
          // `transformTemplate` opts this element back out of WAAPI; it is never
          // invoked because a literal `transform` keyframe bypasses the builder.
          transformTemplate={(_, generated) => generated}
        >
          <g transform="translate(277.62 .5)">
            <path d={tTopFace} />
          </g>
          <g transform="translate(-166.28 191.92)">
            <path d="M388.48 32.58L277.63 96.58L388.48 160.58L499.33 96.58L554.76 128.58L388.48 224.58L166.78 96.58L333.05 0.58L388.48 32.58Z" />
            <path d="M554.76 64.58L499.33 96.58L388.48 32.58L443.90 0.58L554.76 64.58Z" />
          </g>
        </motion.g>

        <g id={ids.stroke}>
          <g transform="translate(277.62 .5)">
            <motion.path
              variants={{
                normal: {
                  d: [
                    "M0 128 L221.70 0 L277.13 32 L193.99 80 L360.26 176 L304.84 208 L138.56 112 L55.43 160 L0 128",
                    "M277.13 32 V64 L221.70 96",
                    "M360.26 176 V208 L304.84 240 L138.56 144 L55.43 192 L0 160 V128",
                    "M304.84 208 V240",
                    "M138.56 112 V144",
                    "M55.43 160 V192",
                  ].join(""),
                },
                pressed: {
                  d: [
                    "M0 144 L221.70 16 L277.13 48 L193.99 96 L360.26 192 L304.84 224 L138.56 128 L55.43 176 L0 144",
                    "M277.13 48 V64 L207.85 104",
                    "M360.26 192 V208 L304.84 240 L138.56 144 L55.43 192 L0 160 V144",
                    "M304.84 224 V240",
                    "M138.56 128 V144",
                    "M55.43 176 V192",
                  ].join(""),
                },
              }}
              transition={transition}
            />
          </g>
          <g transform="translate(-166.28 191.92)">
            <motion.path
              variants={{
                normal: {
                  d: [
                    "M499.33 96.58 L554.76 128.58 V160.58 L388.48 256.58 L166.78 128.58 V96.58 L333.05 0.58 L499.33 96.58",
                    "M166.78 96.58 L388.48 224.58 L554.76 128.58",
                    "M527.04 112.58 L554.76 96.58 V64.58 L443.90 0.58 L277.63 96.58 L388.48 160.58 L554.76 64.58",
                    "M305.34 112.58 L388.48 64.58 L471.62 112.58",
                    "M388.48 224.58 V256.58",
                    "M388.48 32.58 V64.58",
                  ].join(""),
                },
                pressed: {
                  d: [
                    "M499.33 112.58 L554.76 144.58 V160.58 L388.48 256.58 L166.78 128.58 V112.58 L333.05 16.58 L499.33 112.58",
                    "M166.78 112.58 L388.48 240.58 L554.76 144.58",
                    "M513.19 120.58 L554.76 96.58 V80.58 L443.90 16.58 L277.63 112.58 L388.48 176.58 L554.76 80.58",
                    "M291.48 120.58 L388.48 64.58 L485.47 120.58",
                    "M388.48 240.58 V256.58",
                    "M388.48 48.58 V64.58",
                  ].join(""),
                },
              }}
              transition={transition}
            />
          </g>
        </g>

        <motion.radialGradient
          id={ids.radialGradient}
          cx={cx}
          cy={cy}
          r="200"
          gradientUnits="userSpaceOnUse"
        >
          <stop
            className="dark:[stop-color:#fff]"
            stopColor="var(--color-zinc-700)"
          />
          <stop
            className="dark:[stop-color:var(--color-zinc-600)]"
            offset="1"
            stopColor="var(--color-zinc-400)"
            stopOpacity="0"
          />
        </motion.radialGradient>
      </defs>

      <g className="stroke-line" strokeWidth="1" strokeDasharray="4 2">
        <path d="M-248.92 720.50L1081.28 -47.50" />
        <path d="M-692.32 -79.50L637.88 688.50" />
        <path d="M-415.19 -239.50L915.01 528.50" />
      </g>

      <g className="fill-background" fillRule="evenodd" clipRule="evenodd">
        <g transform="translate(277.62 .5)">
          <motion.path
            variants={{
              normal: {
                d: "M277.13 32L193.99 80L193.99 112L277.13 64Z",
              },
              pressed: {
                d: "M277.13 48L193.99 96L193.99 112L277.13 64Z",
              },
            }}
            transition={transition}
          />
          <motion.path
            variants={{
              normal: {
                d: "M360.26 176L304.84 208L138.56 112L55.43 160L0 128L0 160L55.43 192L138.56 144L304.84 240L360.26 208Z",
              },
              pressed: {
                d: "M360.26 192L304.84 224L138.56 128L55.43 176L0 144L0 160L55.43 192L138.56 144L304.84 240L360.26 208Z",
              },
            }}
            transition={transition}
          />
        </g>
        <g transform="translate(-166.28 191.92)">
          <motion.path
            variants={{
              normal: {
                d: "M388.48 224.58L166.78 96.58V128.58L388.48 256.58L554.76 160.58V128.58L388.48 224.58Z",
              },
              pressed: {
                d: "M388.48 240.58L166.78 112.58V128.58L388.48 256.58L554.76 160.58V144.58L388.48 240.58Z",
              },
            }}
            transition={transition}
          />
          <motion.path
            variants={{
              normal: {
                d: "M388.48 32.58L277.63 96.58V128.58L388.48 64.58L499.33 128.58L554.75 96.58V64.58L499.33 96.58L388.48 32.58Z",
              },
              pressed: {
                d: "M388.48 48.58L277.63 112.58V128.58L388.48 64.58L499.33 128.58L554.75 96.58V80.58L499.33 112.58L388.48 48.58Z",
              },
            }}
            transition={transition}
          />
        </g>
      </g>

      <use href={`#${ids.faceFill}`} className="fill-background" />
      <use href={`#${ids.faceFill}`} fill={`url(#${ids.facePattern})`} />

      <use href={`#${ids.stroke}`} stroke="var(--stroke)" />
      <use href={`#${ids.stroke}`} stroke={`url(#${ids.radialGradient})`} />

      <motion.g
        variants={{
          normal: { transform: "translate(0px, 0px)" },
          pressed: { transform: "translate(0px, 16px)" },
        }}
        transition={transition}
        transformTemplate={(_, generated) => generated}
      >
        <motion.g
          initial={{ x: walkerXs[0], y: walkerYs[0] }}
          animate={
            shouldReduceMotion || !isInView
              ? { x: walkerXs[0], y: walkerYs[0] }
              : { x: walkerXs, y: walkerYs }
          }
          transition={{
            duration: 60,
            ease: "linear",
            repeat: Infinity,
          }}
        >
          <image
            href="/images/bongo-cat-walk.png"
            width={walkerSize}
            height={walkerSize}
            preserveAspectRatio="xMidYMid meet"
            transform={`rotate(${walkerRotate} ${walkerSize / 2} ${walkerSize / 2})`}
            className="pointer-events-none filter-[drop-shadow(0_1px_2px_color-mix(in_oklab,var(--foreground)_45%,transparent))] dark:opacity-50 dark:filter-[brightness(0.72)_drop-shadow(0_1px_1px_color-mix(in_oklab,var(--foreground)_20%,transparent))]"
          />
        </motion.g>
      </motion.g>
    </motion.svg>
  )
}
