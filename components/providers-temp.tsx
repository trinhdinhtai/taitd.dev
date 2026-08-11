"use client"

import { ProgressProvider } from "@bprogress/next/app"
import { ThemeProvider } from "next-themes"

import { Toaster } from "@/components/ui/toast"
import { TooltipProvider } from "@/components/ui/tooltip"
import { TooltipProvider as BaseTooltipProvider } from "@/components/base/ui/tooltip"

import { KeyboardShortcuts } from "./keyboard-shortcuts"

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider
      enableSystem
      disableTransitionOnChange
      enableColorScheme
      storageKey="theme"
      defaultTheme="system"

      attribute="class"
    >
      <ProgressProvider
        color="var(--foreground)"
        height="2px"
        delay={500}
        options={{ showSpinner: false }}
      >
        <BaseTooltipProvider>
          <TooltipProvider>{children}</TooltipProvider>
        </BaseTooltipProvider>

        <KeyboardShortcuts />
      </ProgressProvider>

      <Toaster />
    </ThemeProvider>
  )
}
