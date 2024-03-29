import Markdown from "react-markdown"
import remarkGfm from "remark-gfm"

import { components } from "@/components/mdx/mdx-components"

export default function ReactMarkdownComponent({ children }) {
  return (
    // @ts-expect-error
    <Markdown components={components} remarkPlugins={[remarkGfm]}>
      {children}
    </Markdown>
  )
}
