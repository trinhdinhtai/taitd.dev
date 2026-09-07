"use client"

import { useTheme } from "next-themes"

import { useClickSound } from "@/hooks/soundcn/use-click-sound"
import { useIsClient } from "@/hooks/use-is-client"

import { PullCord } from "./pull-cord"

import "../styles/pull-cord.css"

import { useEffect, useLayoutEffect } from "react"

export const EFFECT_STYLE_ID = "theme-toggle-effect-style"

function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme()
  const isClient = useIsClient()

  const [clickSound] = useClickSound()

  const switchTheme = () => {
    setTheme(resolvedTheme === "dark" ? "light" : "dark")
  }

  const onSwitchTheme = () => {
    clickSound()

    if (!document.startViewTransition) switchTheme()
    else document.startViewTransition(switchTheme)
  }

  function removeEffectStyle(doc: Document, styleId: string) {
    doc.getElementById(styleId)?.remove()
  }

  function addEffectStyle(doc: Document) {
    let styleEl = doc.getElementById(EFFECT_STYLE_ID) as HTMLStyleElement | null

    if (!styleEl) {
      styleEl = doc.createElement("style")
      styleEl.id = EFFECT_STYLE_ID
      doc.head.appendChild(styleEl)
    }

    styleEl.textContent = `
      ::view-transition-group(root) {
        animation-timing-function: var(--expo-out);
      }
      ::view-transition-new(root) {
        mask: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40"><defs><filter id="blur"><feGaussianBlur stdDeviation="2"/></filter></defs><circle cx="0" cy="0" r="18" fill="white" filter="url(%23blur)"/></svg>')
          top left / 0 no-repeat;
        mask-origin: content-box;
        animation: scale 1s;
        animation-fill-mode: both;
        transform-origin: top left;
      }
      ::view-transition-old(root),
      .dark::view-transition-old(root) {
        animation: scale 1s;
        animation-fill-mode: both;
        transform-origin: top left;
        z-index: -1;
      }

      @keyframes scale {
        to {
          mask-size: 350vmax;
        }
      }
    `
  }

  useLayoutEffect(() => {
    addEffectStyle(document)
  }, [])

  useEffect(() => {
    return () => {
      removeEffectStyle(document, EFFECT_STYLE_ID)
    }
  }, [])

  return (
    <PullCord
      onPull={() => onSwitchTheme()}
      pulled={isClient && resolvedTheme === "light"}
      ariaLabel="Toggle theme"
    />
  )
}

export default ThemeToggle
