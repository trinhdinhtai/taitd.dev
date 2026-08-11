"use client"

import { useRouter } from "@bprogress/next/app"
import { useHotkeys } from "react-hotkeys-hook"

export function KeyboardShortcuts() {
  const router = useRouter()

  const navigate = (path: string) => {
    router.push(path)
  }

  useHotkeys("g>h", () => navigate("/"))
  useHotkeys("g>b", () => navigate("/blog"))

  return null
}
