import { PropsWithChildren } from "react"

import { QueryProvider } from "@/components/providers/query-provider"

export default function StatsLayout({ children }: PropsWithChildren) {
  return <QueryProvider>{children}</QueryProvider>
}
