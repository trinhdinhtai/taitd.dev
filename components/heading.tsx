"use client"

import React from "react"
import { LinkIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { CopyButton } from "@/components/copy-button"

type HeadingTypes = "h1" | "h2" | "h3" | "h4" | "h5" | "h6"
type HeadingProps<T extends HeadingTypes> = React.ComponentProps<T> & {
  as?: T
}

export function Heading<T extends HeadingTypes = "h1">({
  as,
  className,
  ...props
}: HeadingProps<T>): React.ReactElement {
  const Comp = as ?? "h1"

  if (!props.id) {
    return <Comp className={className} {...props} />
  }

  return (
    <Comp
      className={cn(
        "group/heading flex flex-row items-center gap-1",
        className
      )}
      {...props}
    >
      <a href={`#${props.id}`} className="peer not-prose">
        {props.children}
      </a>

      <CopyButton
        className="size-7 shrink-0 text-muted-foreground opacity-0 group-hover/heading:opacity-100"
        variant="ghost"
        text={() => createHeadingUrl(props.id || "")}
        idleIcon={<LinkIcon />}
        aria-label="Copy link to section"
      />
    </Comp>
  )
}

export function createHeadingUrl(id: string) {
  if (typeof window === "undefined") {
    return `#${id}`
  }

  const url = new URL(window.location.href)

  url.hash = id

  return url.toString()
}
