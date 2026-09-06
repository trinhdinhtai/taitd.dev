"use client"

import { useTheme } from "next-themes"

import { useClickSound } from "@/hooks/soundcn/use-click-sound"
import { useIsClient } from "@/hooks/use-is-client"
import {
  HandwrittenArrow,
  HandwrittenNote,
} from "@/features/blog/components/handwritten-note"

import { PullCord } from "./pull-cord"

import "../styles/pull-cord.css"

function LampPullChain() {
  const { resolvedTheme, systemTheme, setTheme } = useTheme()
  const isClient = useIsClient()

  const [clickSound] = useClickSound()

  const onSwitchTheme = () => {
    const next = resolvedTheme === "dark" ? "light" : "dark"

    clickSound()

    setTheme(next === systemTheme ? "system" : next)
  }

  return (
    <>
      <PullCord
        onPull={() => onSwitchTheme()}
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

export default LampPullChain
