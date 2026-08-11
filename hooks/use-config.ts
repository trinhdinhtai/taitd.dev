"use client"

import { create } from "zustand"
import { persist } from "zustand/middleware"

export type InstallationType = "cli" | "manual"

type Config = {
  installationType: InstallationType
}

type ConfigStore = Config & {
  setConfig: (update: Config | ((prev: Config) => Config)) => void
}

const useConfigStore = create<ConfigStore>()(
  persist(
    (set, get) => ({
      installationType: "cli",
      setConfig: (update) => {
        const prev: Config = { installationType: get().installationType }
        const next = typeof update === "function" ? update(prev) : update
        set(next)
      },
    }),
    {
      name: "config_v1",
      // jotai atomWithStorage wrote a bare Config object under the same key
      merge: (persisted, current) => {
        if (
          persisted &&
          typeof persisted === "object" &&
          "installationType" in persisted &&
          !("state" in persisted)
        ) {
          const { installationType } = persisted as Config
          if (installationType === "cli" || installationType === "manual") {
            return { ...current, installationType }
          }
        }

        return {
          ...current,
          ...(persisted as Partial<ConfigStore> | undefined),
        }
      },
      partialize: (state) => ({
        installationType: state.installationType,
      }),
    }
  )
)

/** jotai-compatible `[config, setConfig]` tuple backed by zustand. */
export function useConfig() {
  const installationType = useConfigStore((s) => s.installationType)
  const setConfig = useConfigStore((s) => s.setConfig)

  return [{ installationType }, setConfig] as const
}
