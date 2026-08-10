import { SiteHeader } from "@/components/site-header"

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="group/layout relative isolate">
      <SiteHeader />

      <main className="max-w-screen overflow-x-clip overflow-y-hidden px-2">
        {children}
      </main>

      <div
        className="pointer-events-none fixed inset-x-0 bottom-0 z-50"
        aria-hidden
      >
        <div className="h-(--fade-bottom-height) bg-linear-to-b from-transparent to-background mask-linear-[to_top,var(--background)_25%,transparent] backdrop-blur-[1px]" />
        <div className="bg-background pb-[env(safe-area-inset-bottom,0)]" />
      </div>
    </div>
  )
}
