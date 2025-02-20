"use client"

import { ComponentProps, useRef } from "react"

import { getIconByLanguage } from "@/lib/icon"
import { cn } from "@/lib/utils"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import CopyButton from "@/components/copy-button"

type CodeBlockProps = {
  "data-lang"?: string
  figureClassName?: string
} & ComponentProps<"pre">

export default function CodeBlock({
  title,
  className,
  figureClassName,
  "data-lang": lang,
  ref,
  children,
  ...rest
}: Readonly<CodeBlockProps>) {
  const Icon = getIconByLanguage(lang ?? "")
  const textInput = useRef<HTMLPreElement>(null)

  return (
    <figure
      className={cn(
        "not-prose group relative my-6 overflow-hidden rounded-lg border bg-secondary/50 text-sm",
        figureClassName
      )}
    >
      {title ? (
        <div className="flex flex-row items-center gap-2 border-b bg-muted/50 px-4 py-1.5">
          <div className="text-muted-foreground">
            <Icon className="size-3.5" />
          </div>
          <figcaption className="flex-1 truncate text-muted-foreground">
            {title}
          </figcaption>
          <CopyButton
            className="-me-2"
            value={textInput.current?.textContent ?? ""}
          />
        </div>
      ) : (
        <CopyButton
          className="absolute right-2 top-2 z-10"
          value={textInput.current?.textContent ?? ""}
        />
      )}

      <ScrollArea>
        <pre className={cn("p-4 text-[13px]", className)} {...rest}>
          {children}
        </pre>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </figure>
  )
}
