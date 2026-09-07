export type ThemeTransitionOrigin = {
  x: number
  y: number
}

const X_VAR = "--theme-transition-x"
const Y_VAR = "--theme-transition-y"
const ACTIVE_CLASS = "theme-transition-active"

/** Circle zoom-in from `origin` via View Transition (new theme expands over old). */
export function startThemeTransition(
  updateDom: () => void,
  origin: ThemeTransitionOrigin
): void | Promise<void> {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    updateDom()
    return
  }

  const root = document.documentElement
  root.style.setProperty(X_VAR, `${origin.x}px`)
  root.style.setProperty(Y_VAR, `${origin.y}px`)
  root.classList.add(ACTIVE_CLASS)

  if (!document.startViewTransition) {
    updateDom()
    root.classList.remove(ACTIVE_CLASS)
    return
  }

  const transition = document.startViewTransition(updateDom)

  return transition.finished
    .catch(() => {})
    .finally(() => {
      root.classList.remove(ACTIVE_CLASS)
    })
}
