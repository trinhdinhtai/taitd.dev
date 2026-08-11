"use client"

import type { Route } from "next"
import { useRouter } from "next/navigation"
import { useHotkeys } from "react-hotkeys-hook"

export function DocKeyboardShortcuts({
  previous,
  next,
}: {
  previous: Route | null
  next: Route | null
}) {
  const router = useRouter()

  const navigate = (href: Route | null) => {
    if (href) {
      router.push(href)
    }
  }

  useHotkeys("ArrowRight", (event) => {
    // A native interaction was prevented on this event, someone else took ownership of it, ignore.
    if (event.defaultPrevented) {
      return
    }

    navigate(next)
  })
  useHotkeys("ArrowLeft", (event) => {
    // A native interaction was prevented on this event, someone else took ownership of it, ignore.
    if (event.defaultPrevented) {
      return
    }

    navigate(previous)
  })

  return null
}
