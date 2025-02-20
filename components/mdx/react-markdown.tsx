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
    <Markdown components={components} remarkPlugins={[remarkGfm]}>
      {children}
    </Markdown>
  )
}
