"use client"

import { create } from "zustand"
import { persist } from "zustand/middleware"

export type PackageManager = "pnpm" | "yarn" | "npm" | "bun"

const PACKAGE_MANAGERS = ["pnpm", "yarn", "npm", "bun"] as const

function isPackageManager(value: unknown): value is PackageManager {
  return (
    typeof value === "string" &&
    (PACKAGE_MANAGERS as readonly string[]).includes(value)
  )
}

type PackageManagerStore = {
  packageManager: PackageManager
  setPackageManager: (packageManager: PackageManager) => void
}

const usePackageManagerStore = create<PackageManagerStore>()(
  persist(
    (set) => ({
      packageManager: "pnpm",
      setPackageManager: (packageManager) => set({ packageManager }),
    }),
    {
      name: "packageManager",
      // jotai atomWithStorage wrote a bare PackageManager string under the same key
      merge: (persisted, current) => {
        if (isPackageManager(persisted)) {
          return { ...current, packageManager: persisted }
        }

        return {
          ...current,
          ...(persisted as Partial<PackageManagerStore> | undefined),
        }
      },
      partialize: (state) => ({
        packageManager: state.packageManager,
      }),
    }
  )
)

/** jotai-compatible `[packageManager, setPackageManager]` tuple backed by zustand. */
export function usePackageManager() {
  const packageManager = usePackageManagerStore((s) => s.packageManager)
  const setPackageManager = usePackageManagerStore((s) => s.setPackageManager)

  return [packageManager, setPackageManager] as const
}
