"use client"

import { cn } from "cn"
import { LinkIcon } from "lucide-react"

import { CopyButton } from "@/components/copy-button"
import { createHeadingUrl } from "@/components/heading"

export function PanelTitleCopy({
  id,
  className,
  ...props
}: Omit<React.ComponentProps<typeof CopyButton>, "id" | "text"> & {
  id: string
}) {
  return (
    <CopyButton
      className={cn(
        "absolute top-1 ml-1 size-7 shrink-0 border-none text-muted-foreground opacity-0 transition-opacity group-hover/panel-title:opacity-100",
        className
      )}
      variant="ghost"
      text={() => createHeadingUrl(id || "")}
      idleIcon={<LinkIcon />}
      aria-label="Copy link to section"
      {...props}
    />
  )
}
