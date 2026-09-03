"use client"

import { useTheme } from "next-themes"

import { useClickSound } from "@/hooks/soundcn/use-click-sound"
import { useIsClient } from "@/hooks/use-is-client"

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
    <PullCord
      onPull={() => onSwitchTheme()}
      pulled={isClient && resolvedTheme === "light"}
      ariaLabel="Toggle theme"
    />
  )
}

export default LampPullChain
