"use client"

import type { TOCItemType } from "fumadocs-core/toc"
import { TextIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import {
  Collapsible,
  CollapsibleChevronDownIcon,
} from "@/components/ui/collapsible-animated"
import {
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/base/ui/collapsible"

export function TOCInline({
  items,
  className,
  children,
  onOpenChange,
  ...props
}: React.ComponentProps<typeof Collapsible> & {
  items: TOCItemType[]
}) {
  if (!items.length) {
    return null
  }

  return (
    <Collapsible
      className={cn(
        "not-prose group/inline-toc rounded-xl bg-surface font-sans inset-ring-1 inset-ring-border/64",
        className
      )}
      onOpenChange={(open, eventDetails) => {
        onOpenChange?.(open, eventDetails)
      }}
      {...props}
    >
      <CollapsibleTrigger className="inline-flex w-full items-center gap-2 rounded-xl py-2.5 pr-2 pl-4 text-sm font-medium outline-none group-data-open/inline-toc:rounded-b-none focus-visible:inset-ring-2 focus-visible:inset-ring-ring/50 [&_svg]:size-4">
        <TextIcon className="-translate-x-0.5" />
        {children ?? "On this page"}
        <div className="ml-auto shrink-0 text-muted-foreground">
          <CollapsibleChevronDownIcon duration={0.15} />
        </div>
      </CollapsibleTrigger>

      <CollapsibleContent>
        <ul className="flex flex-col px-4 pb-2">
          {items.map((item) => (
            <li key={item.url} className="flex py-1">
              <a
                href={item.url}
                data-depth={item.depth}
                className="text-sm text-muted-foreground transition-colors hover:text-accent-foreground data-[depth=3]:pl-4 data-[depth=4]:pl-8"
              >
                {item.title}
              </a>
            </li>
          ))}
        </ul>
      </CollapsibleContent>
    </Collapsible>
  )
}
