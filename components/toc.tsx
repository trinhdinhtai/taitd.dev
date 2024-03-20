"use client"

import { useMemo } from "react"

import { TableOfContents as TOC } from "@/lib/toc"
import { cn } from "@/lib/utils"
import useActiveItem from "@/hooks/use-active-item"
import useMounted from "@/hooks/use-mounted"

interface TableOfContentProps {
  toc: TOC
}

export default function TableOfContents({ toc }: TableOfContentProps) {
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
      <p className="font-medium uppercase">On This Page</p>
      <Tree tree={toc} activeItem={activeHeading} />
    </div>
  )
}

interface TreeProps {
  tree: TOC
  level?: number
  activeItem?: string | null
}

function Tree({ tree, level = 1, activeItem }: TreeProps) {
  return tree?.items?.length && level < 3 ? (
    <ul className={cn("m-0 list-none")}>
      {tree.items.map((item) => {
        return (
          <li key={item.url} className={cn("mt-0")}>
            <a
              href={item.url}
              className={cn(
                "inline-block border-l-2 py-1.5 pl-4 no-underline transition-all hover:text-primary hover:underline",
                item.url === `#${activeItem}`
                  ? "border-primary text-primary"
                  : "text-sm text-muted-foreground",
                { "pl-8": level !== 1 }
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
