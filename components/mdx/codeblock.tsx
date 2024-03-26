"use client"

import { HTMLAttributes } from "react"

import { cn } from "@/lib/utils"
import CopyButton from "@/components/copy-button"

type CodeBlockProps = HTMLAttributes<HTMLPreElement> & {
  title?: string
  __rawString__?: string
  __withMeta__?: boolean
}

export default function CodeBlock({
  title,
  className,
  __rawString__,
  __withMeta__,
  ...props
}: Readonly<CodeBlockProps>) {
  console.log("title:", title)
  return (
    <>
      <pre
        className={cn(
          "mb-4 mt-6 overflow-x-auto rounded-b-lg border border-t-0 border-gray-600 !bg-[#0A0A0A] py-4",
          className
        )}
        {...props}
      />
      {__rawString__ && (
        <CopyButton value={__rawString__} withMeta={__withMeta__} />
      )}
    </>
  )
}
