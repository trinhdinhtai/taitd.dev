/** Static "normal" state of LogoMarkIsometric — no bongo cat, no motion. */

const tTopFace =
  "M0 128L221.70 0L277.13 32L193.99 80L360.26 176L304.84 208L138.56 112L55.43 160Z"

const strokeT =
  "M0 128 L221.70 0 L277.13 32 L193.99 80 L360.26 176 L304.84 208 L138.56 112 L55.43 160 L0 128 M277.13 32 V64 L221.70 96 M360.26 176 V208 L304.84 240 L138.56 144 L55.43 192 L0 160 V128 M304.84 208 V240 M138.56 112 V144 M55.43 160 V192"

const strokeD =
  "M499.33 96.58 L554.76 128.58 V160.58 L388.48 256.58 L166.78 128.58 V96.58 L333.05 0.58 L499.33 96.58 M166.78 96.58 L388.48 224.58 L554.76 128.58 M527.04 112.58 L554.76 96.58 V64.58 L443.90 0.58 L277.63 96.58 L388.48 160.58 L554.76 64.58 M305.34 112.58 L388.48 64.58 L471.62 112.58 M388.48 224.58 V256.58 M388.48 32.58 V64.58"

const faceFillD1 =
  "M388.48 32.58L277.63 96.58L388.48 160.58L499.33 96.58L554.76 128.58L388.48 224.58L166.78 96.58L333.05 0.58L388.48 32.58Z"

const faceFillD2 =
  "M554.76 64.58L499.33 96.58L388.48 32.58L443.90 0.58L554.76 64.58Z"

const bgT1 = "M277.13 32L193.99 80L193.99 112L277.13 64Z"
const bgT2 =
  "M360.26 176L304.84 208L138.56 112L55.43 160L0 128L0 160L55.43 192L138.56 144L304.84 240L360.26 208Z"

const bgD1 =
  "M388.48 224.58L166.78 96.58V128.58L388.48 256.58L554.76 160.58V128.58L388.48 224.58Z"

const bgD2 =
  "M388.48 32.58L277.63 96.58V128.58L388.48 64.58L499.33 128.58L554.75 96.58V64.58L499.33 96.58L388.48 32.58Z"

const guidePaths = [
  "M-248.92 720.50L1081.28 -47.50",
  "M-692.32 -79.50L637.88 688.50",
  "M-415.19 -239.50L915.01 528.50",
] as const

/** Logo viewBox — used to map guide geometry onto OG canvas. */
export const LOGO_MARK_VIEWBOX = { width: 638.38, height: 449 } as const

export type LogoMarkTheme = "light" | "dark"

export type LogoMarkSvgOptions = {
  theme?: LogoMarkTheme
  /** Guide lines are drawn separately on OG canvas at full bleed. */
  includeGuides?: boolean
}

const palettes = {
  light: {
    background: "#ffffff",
    pattern: "#e4e4e7",
    stroke: "#dcdee3",
    guide: "#e4e4e7",
    gradientInner: "#3f3f46",
    gradientOuter: "#a1a1aa",
  },
  dark: {
    background: "#09090b",
    pattern: "#27272a",
    stroke: "#3f3f46",
    guide: "#3f3f46",
    gradientInner: "#ffffff",
    gradientOuter: "#52525b",
  },
} as const

export function logoMarkIsometricSvg(options: LogoMarkSvgOptions = {}) {
  const theme = options.theme ?? "light"
  const includeGuides = options.includeGuides ?? true
  const c = palettes[theme]

  const guides = includeGuides
    ? guidePaths
        .map(
          (d) =>
            `<path d="${d}" stroke="${c.guide}" stroke-width="1.25" stroke-dasharray="8 4" fill="none"/>`
        )
        .join("\n    ")
    : ""

  return `<svg viewBox="0 0 638.38 449" fill="none" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <pattern id="face-pattern" x="0" y="0" width="10" height="10" patternUnits="userSpaceOnUse">
      <path d="M-1 1l2 -2M0 10l10 -10M9 11l2 -2" stroke="${c.pattern}" stroke-width="1"/>
    </pattern>
    <g id="face-fill">
      <g transform="translate(277.62 .5)"><path d="${tTopFace}"/></g>
      <g transform="translate(-166.28 191.92)">
        <path d="${faceFillD1}"/>
        <path d="${faceFillD2}"/>
      </g>
    </g>
    <g id="stroke">
      <g transform="translate(277.62 .5)"><path d="${strokeT}"/></g>
      <g transform="translate(-166.28 191.92)"><path d="${strokeD}"/></g>
    </g>
    <radialGradient id="radial-gradient" cx="319" cy="225" r="200" gradientUnits="userSpaceOnUse">
      <stop stop-color="${c.gradientInner}"/>
      <stop offset="1" stop-color="${c.gradientOuter}" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <g>${guides}</g>
  <g fill="${c.background}" fill-rule="evenodd" clip-rule="evenodd">
    <g transform="translate(277.62 .5)">
      <path d="${bgT1}"/>
      <path d="${bgT2}"/>
    </g>
    <g transform="translate(-166.28 191.92)">
      <path d="${bgD1}"/>
      <path d="${bgD2}"/>
    </g>
  </g>
  <use href="#face-fill" fill="${c.background}"/>
  <use href="#face-fill" fill="url(#face-pattern)"/>
  <use href="#stroke" stroke="${c.stroke}"/>
  <use href="#stroke" stroke="url(#radial-gradient)"/>
</svg>`
}

type Point = { x: number; y: number }

function parseGuideSegment(path: string): { point: Point; direction: Point } {
  const [, x1, y1, x2, y2] =
    path.match(/^M\s*([-\d.]+)\s+([-\d.]+)L\s*([-\d.]+)\s+([-\d.]+)$/) ?? []
  if (!x1 || !y1 || !x2 || !y2) {
    throw new Error(`Invalid guide path: ${path}`)
  }

  const start = { x: Number(x1), y: Number(y1) }
  const end = { x: Number(x2), y: Number(y2) }

  return {
    point: {
      x: (start.x + end.x) / 2,
      y: (start.y + end.y) / 2,
    },
    direction: {
      x: end.x - start.x,
      y: end.y - start.y,
    },
  }
}

function extendLineToRect(
  width: number,
  height: number,
  point: Point,
  direction: Point
): string {
  const ts: number[] = []

  if (direction.x !== 0) {
    for (const x of [0, width]) {
      const t = (x - point.x) / direction.x
      const y = point.y + t * direction.y
      if (y >= 0 && y <= height) ts.push(t)
    }
  }

  if (direction.y !== 0) {
    for (const y of [0, height]) {
      const t = (y - point.y) / direction.y
      const x = point.x + t * direction.x
      if (x >= 0 && x <= width) ts.push(t)
    }
  }

  const tMin = Math.min(...ts)
  const tMax = Math.max(...ts)
  const x1 = point.x + tMin * direction.x
  const y1 = point.y + tMin * direction.y
  const x2 = point.x + tMax * direction.x
  const y2 = point.y + tMax * direction.y

  return `M${x1.toFixed(2)} ${y1.toFixed(2)}L${x2.toFixed(2)} ${y2.toFixed(2)}`
}

/** Full-bleed isometric guides aligned with a scaled logo on an OG canvas. */
export function ogGuideLinesSvg({
  width,
  height,
  logoLeft,
  logoTop,
  logoScale,
  theme = "dark",
}: {
  width: number
  height: number
  logoLeft: number
  logoTop: number
  logoScale: number
  theme?: LogoMarkTheme
}) {
  const guide = palettes[theme].guide
  const paths = guidePaths
    .map((path) => {
      const { point, direction } = parseGuideSegment(path)
      const canvasPoint = {
        x: logoLeft + point.x * logoScale,
        y: logoTop + point.y * logoScale,
      }

      return extendLineToRect(width, height, canvasPoint, direction)
    })
    .map(
      (d) =>
        `<path d="${d}" stroke="${guide}" stroke-width="1.25" stroke-dasharray="8 4" fill="none"/>`
    )
    .join("\n  ")

  return `<svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" fill="none" xmlns="http://www.w3.org/2000/svg">
  ${paths}
</svg>`
}
