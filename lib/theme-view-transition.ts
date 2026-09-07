export type ThemeTransitionOrigin = {
  x: number
  y: number
}

const ACTIVE_CLASS = "theme-transition-active"
const DURATION_MS = 550
/** Approximation of --expo-out for WAAPI / SVG. */
const EASING = "cubic-bezier(0.16, 1, 0.3, 1)"

const THEME_BG = {
  light: "oklch(1 0 0)",
  dark: "oklch(0.141 0.005 285.823)",
} as const

function maxRevealRadius(origin: ThemeTransitionOrigin) {
  const { innerWidth: w, innerHeight: h } = window
  return (
    Math.hypot(
      Math.max(origin.x, w - origin.x),
      Math.max(origin.y, h - origin.y)
    ) * 1.05
  )
}

/**
 * SVG mask + WAAPI — expanding hole at `origin` (zoom-in). Pull cord stays live
 * above the veil (z-index 60 vs 55). Avoids CSS mask-image full-page repaints.
 */
export function startThemeTransition(
  updateDom: () => void,
  origin: ThemeTransitionOrigin,
  previousTheme: "light" | "dark"
): void | Promise<void> {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    updateDom()
    return
  }

  const root = document.documentElement
  root.classList.add(ACTIVE_CLASS)

  const { innerWidth: vw, innerHeight: vh } = window
  const maskId = `theme-transition-mask-${Date.now()}`

  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg")
  svg.setAttribute("aria-hidden", "true")
  svg.setAttribute("viewBox", `0 0 ${vw} ${vh}`)
  svg.classList.add("theme-transition-overlay")

  const defs = document.createElementNS("http://www.w3.org/2000/svg", "defs")
  const mask = document.createElementNS("http://www.w3.org/2000/svg", "mask")
  mask.setAttribute("id", maskId)

  const maskBg = document.createElementNS("http://www.w3.org/2000/svg", "rect")
  maskBg.setAttribute("width", String(vw))
  maskBg.setAttribute("height", String(vh))
  maskBg.setAttribute("fill", "white")

  const hole = document.createElementNS("http://www.w3.org/2000/svg", "circle")
  hole.setAttribute("cx", String(origin.x))
  hole.setAttribute("cy", String(origin.y))
  hole.setAttribute("r", "0")
  hole.setAttribute("fill", "black")

  const veil = document.createElementNS("http://www.w3.org/2000/svg", "rect")
  veil.setAttribute("width", String(vw))
  veil.setAttribute("height", String(vh))
  veil.setAttribute("fill", THEME_BG[previousTheme])
  veil.setAttribute("mask", `url(#${maskId})`)

  mask.append(maskBg, hole)
  defs.append(mask)
  svg.append(defs, veil)
  document.body.appendChild(svg)

  const maxR = maxRevealRadius(origin)

  return new Promise<void>((resolve) => {
    const finish = () => {
      svg.remove()
      root.classList.remove(ACTIVE_CLASS)
      resolve()
    }

    requestAnimationFrame(() => {
      updateDom()

      requestAnimationFrame(() => {
        const anim = hole.animate([{ r: "0px" }, { r: `${maxR}px` }], {
          duration: DURATION_MS,
          easing: EASING,
          fill: "forwards",
        })

        anim.finished.then(finish).catch(finish)
      })
    })
  })
}
