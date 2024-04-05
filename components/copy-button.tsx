"use client"

import { HTMLAttributes, useEffect, useState } from "react"

import { cn } from "@/lib/utils"

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
  const [hasCopied, setHasCopied] = useState(false)

  const handleCopy = () => {
    setHasCopied(true)
    navigator.clipboard.writeText(value)
  }

  useEffect(() => {
    setTimeout(() => {
      setHasCopied(false)
    }, 2000)
  }, [hasCopied])

  return (
    <div className={cn("absolute right-4 top-4", withMeta && "top-16")}>
      <Button
        {...props}
        size="icon"
        variant="ghost"
        className={cn(
          "relative z-10 size-6 border-zinc-400 bg-zinc-600 text-zinc-50 hover:bg-zinc-700 hover:text-zinc-50",
          className
        )}
        onClick={handleCopy}
      >
        <span className="sr-only">Copy</span>
        {hasCopied ? (
          <Icons.check className="h-3 w-3" />
        ) : (
          <Icons.copy className="h-3 w-3" />
        )}
      </Button>
    </div>
  )
}

export default CopyButton
