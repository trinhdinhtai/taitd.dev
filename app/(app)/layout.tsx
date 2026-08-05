import { SiteHeader } from "@/components/site-header"

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="group/layout relative isolate">
      <SiteHeader />

      <main className="max-w-screen overflow-x-clip px-2">{children}</main>
    </div>
  )
}
