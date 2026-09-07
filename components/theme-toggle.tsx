"use client"

import { useCallback } from "react"
import { useTheme } from "next-themes"
import { flushSync } from "react-dom"

import {
  startThemeTransition,
  type ThemeTransitionOrigin,
} from "@/lib/theme-view-transition"
import { useClickSound } from "@/hooks/soundcn/use-click-sound"
import { useIsClient } from "@/hooks/use-is-client"

import { PullCord } from "./pull-cord"

import "../styles/pull-cord.css"

function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme()
  const isClient = useIsClient()

  const [clickSound] = useClickSound()

  const onDetent = useCallback(() => {
    clickSound()
  }, [clickSound])

  const onSwitchTheme = useCallback(
    (origin: ThemeTransitionOrigin) => {
      const next = resolvedTheme === "dark" ? "light" : "dark"

      return startThemeTransition(() => {
        flushSync(() => {
          setTheme(next)
        })
      }, origin)
    },
    [resolvedTheme, setTheme]
  )

  return (
    <PullCord
      onDetent={onDetent}
      onPull={onSwitchTheme}
      pulled={isClient && resolvedTheme === "light"}
      ariaLabel="Toggle theme"
    />
  )
}

export default ThemeToggle
