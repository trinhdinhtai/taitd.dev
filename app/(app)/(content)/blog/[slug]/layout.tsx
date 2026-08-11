import { DocGrid, DocLeftCol } from "@/features/content/components/doc-layout"
import { DocPageRoot } from "@/features/content/components/doc-page-root"

export default function ContentLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <DocPageRoot>
      <DocGrid>
        <DocLeftCol className="-translate-x-1 pb-3.75" />
        {children}
      </DocGrid>
    </DocPageRoot>
  )
}
