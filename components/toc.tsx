"use client"

import { useMemo } from "react"

import { TableOfContents } from "@/lib/toc"
import { cn } from "@/lib/utils"
import useActiveItem from "@/hooks/use-active-item"
import useMounted from "@/hooks/use-mounted"

interface DashboardTableOfContentProps {
  toc: TableOfContents
}

export default function DashboardTableOfContents({
  toc,
}: DashboardTableOfContentProps) {
  const itemIds = useMemo(
    () =>
      toc.items
        ? toc.items
            .flatMap((item) => [item.url, item?.items?.map((item) => item.url)])
            .flat()
            .filter(Boolean)
            .map((id) => id?.split("#")[1])
        : [],
    [toc]
  )

  const mounted = useMounted()
  const activeHeading = useActiveItem(itemIds)

  if (!toc?.items || !mounted) {
    return null
  }

  return (
    <div className="space-y-2">
      <p className="font-medium">On This Page</p>
      <Tree tree={toc} activeItem={activeHeading} />
    </div>
  )
}

interface TreeProps {
  tree: TableOfContents
  level?: number
  activeItem?: string | null
}

function Tree({ tree, level = 1, activeItem }: TreeProps) {
  return tree?.items?.length && level < 3 ? (
    <ul className={cn("m-0 list-none", { "pl-4": level !== 1 })}>
      {tree.items.map((item) => {
        return (
          <li key={item.url} className={cn("mt-0 pt-2")}>
            <a
              href={item.url}
              className={cn(
                "inline-block no-underline transition-all hover:text-primary hover:underline",
                item.url === `#${activeItem}`
                  ? "font-medium text-primary"
                  : "text-sm text-muted-foreground"
              )}
            >
              {item.title}
            </a>
            {item.items?.length ? (
              <Tree tree={item} level={level + 1} activeItem={activeItem} />
            ) : null}
          </li>
        )
      })}
    </ul>
  ) : null
}
