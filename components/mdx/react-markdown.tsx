import { PropsWithChildren } from "react"
import Markdown from "react-markdown"
import remarkGfm from "remark-gfm"

import { components } from "@/components/mdx/mdx-components"

interface ReactMarkdownComponentProps {
  children?: string
}

export default function ReactMarkdownComponent({
  children,
}: ReactMarkdownComponentProps) {
  return (
    // @ts-expect-error
    <Markdown components={components} remarkPlugins={[remarkGfm]}>
      {children}
    </Markdown>
  )
}
