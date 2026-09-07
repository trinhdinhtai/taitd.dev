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
import {
  HandwrittenArrow,
  HandwrittenNote,
} from "@/features/blog/components/handwritten-note"

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
      const previous = resolvedTheme === "dark" ? "dark" : ("light" as const)
      const next = previous === "dark" ? "light" : "dark"

      return startThemeTransition(
        () => {
          flushSync(() => {
            setTheme(next)
          })
        },
        origin,
        previous
      )
    },
    [resolvedTheme, setTheme]
  )

  return (
    <>
      <PullCord
        onDetent={onDetent}
        onPull={onSwitchTheme}
        pulled={isClient && resolvedTheme === "light"}
        ariaLabel="Toggle theme"
      />

      <HandwrittenNote
        className="pullcord fixed top-52 right-[calc(var(--pullcord-right)+3.25rem)] z-60 hidden w-32 flex-col items-end pointer-fine:xl:flex"
        aria-hidden
      >
        <HandwrittenArrow className="-scale-x-100 -scale-y-100 rotate-12" />
        <span className="mr-1 -rotate-6 text-right">
          pull to toggle
          <span className="block" />
          light / dark
        </span>
      </HandwrittenNote>
    </>
  )
}

export default ThemeToggle
