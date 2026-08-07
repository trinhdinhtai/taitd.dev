"use client"

import { useTiks } from "@rexa-developer/tiks/react"
import { create } from "zustand"
import { persist } from "zustand/middleware"

type AvatarLights = "on" | "off"

type AvatarLightsStore = {
  lights: AvatarLights
  setLights: (lights: AvatarLights) => void
}

function syncLightsDataset(lights: AvatarLights) {
  document.documentElement.dataset.avatarLights = lights
}

const useAvatarLightsStore = create<AvatarLightsStore>()(
  persist(
    (set) => ({
      lights: "on",
      setLights: (lights) => {
        syncLightsDataset(lights)
        set({ lights })
      },
    }),
    {
      name: "avatarLights",
      // jotai atomWithStorage wrote a bare "on" | "off" string under the same key
      merge: (persisted, current) => {
        if (persisted === "on" || persisted === "off") {
          return { ...current, lights: persisted }
        }

        return {
          ...current,
          ...(persisted as Partial<AvatarLightsStore> | undefined),
        }
      },
      onRehydrateStorage: () => (state) => {
        if (state) {
          syncLightsDataset(state.lights)
        }
      },
    }
  )
)

export function useAvatarLights() {
  const lights = useAvatarLightsStore((s) => s.lights)
  const setLights = useAvatarLightsStore((s) => s.setLights)
  const { toggle: tiksToggle } = useTiks()

  const toggleLights = () => {
    const nextLights: AvatarLights = lights === "off" ? "on" : "off"
    setLights(nextLights)
    tiksToggle(nextLights === "on")
  }

  return { toggleLights }
}
