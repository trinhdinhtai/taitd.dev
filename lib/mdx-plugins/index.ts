import remarkGfm from "remark-gfm"
import type { PluggableList } from "unified"

import { rehypeCode } from "@/lib/mdx-plugins/rehype/rehype-code"
import { rehypeInlineCode } from "@/lib/mdx-plugins/rehype/rehype-inline-code"
import { remarkHeading } from "@/lib/mdx-plugins/remark/remark-heading"

export const remarkPlugins: PluggableList = [remarkGfm, remarkHeading]
export const rehypePlugins: PluggableList = [rehypeCode, rehypeInlineCode]
