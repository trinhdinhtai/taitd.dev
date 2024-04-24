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
  console.log("__rawString__:", __rawString__)
  return (
    <>
      <pre
        className={cn(
          "overflow-x-auto rounded-lg bg-white py-4 dark:!bg-[#0A0A0A]",
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
