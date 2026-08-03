import Link from "next/link"

import { ThemeToggle } from "@/components/theme-toggle"

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 max-w-screen overflow-x-clip bg-background px-2">
      <div className="screen-line-top screen-line-bottom border-line mx-auto flex h-(--header-height) items-center gap-2 border-r pr-2 group-has-data-[slot=layout-wide]/layout:container after:z-1 after:bg-border sm:gap-4 md:max-w-3xl">
        <div className="flex-1" />

        <div className="flex items-center max-sm:*:data-[slot=command-menu-trigger]:hidden">
          <ThemeToggle />
        </div>
      </div>
    </header>
  )
}
