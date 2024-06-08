"use client"

import { HTMLAttributes, useEffect, useState } from "react"

import { cn } from "@/lib/utils"
import { useCopyToClipboard } from "@/hooks/use-copy-to-clipboard"

import { Icons } from "./icons"
import { Button } from "./ui/button"

interface CopyButtonProps extends HTMLAttributes<HTMLButtonElement> {
  value: string
  withMeta?: boolean
}

const CopyButton = ({
  className,
  value,
  withMeta = false,
  ...props
}: CopyButtonProps) => {
  const { copy, isCopied } = useCopyToClipboard()

  return (
    <div className={cn("absolute right-2 top-1", withMeta && "top-16")}>
      <Button
        {...props}
        size="icon"
        variant="ghost"
        className={cn("relative z-10 size-7", className)}
        onClick={() => copy({ text: value })}
      >
        <span className="sr-only">Copy</span>
        {isCopied ? (
          <Icons.check className="size-4" />
        ) : (
          <Icons.copy className="size-4" />
        )}
      </Button>
    </div>
  )
}

export default CopyButton
