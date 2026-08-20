"use client"

import { useTheme } from "next-themes"

import { useClickSound } from "@/hooks/soundcn/use-click-sound"

import { PullCord } from "./pull-cord"

import "../styles/pull-cord.css"

function LampPullChain() {
  const { resolvedTheme, systemTheme, setTheme } = useTheme()

  const [clickSound] = useClickSound()

  const onSwitchTheme = () => {
    const next = resolvedTheme === "dark" ? "light" : "dark"

    clickSound()

    setTheme(next === systemTheme ? "system" : next)
  }

  return (
    <PullCord
      onPull={() => onSwitchTheme()}
      pulled={resolvedTheme === "dark"}
      ariaLabel="Toggle theme"
    />
  )
}

export default LampPullChain
