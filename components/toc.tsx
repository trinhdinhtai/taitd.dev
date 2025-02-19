"use client"

import { TOC } from "@/types"

import { cn } from "@/lib/utils"
import useActiveItem from "@/hooks/use-active-item"
import useMounted from "@/hooks/use-mounted"

interface TableOfContentProps {
  toc: TOC[]
}

export default function TableOfContents({ toc }: TableOfContentProps) {
  const itemIds = toc.map((item) => item.url)

  const mounted = useMounted()
  const activeHeading = useActiveItem(itemIds)

  if (!toc || !mounted) {
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
  tree: TOC[]
  activeItem?: string | null
}

function Tree({ tree, activeItem }: TreeProps) {
  const minDepth = Math.min(...tree.map((item) => item.depth))

  return tree?.length ? (
    <ul className={cn("m-0 list-none")}>
      {tree.map((item) => {
        return (
          <li key={item.url} className={cn("mt-0")}>
            <a
              href={item.url}
              className={cn(
                "inline-block border-l-2 py-1.5 pl-4 no-underline transition-all hover:text-primary hover:underline",
                item.url === activeItem
                  ? "border-primary text-primary"
                  : "text-sm text-muted-foreground"
              )}
              style={{
                paddingLeft: `${(item.depth - minDepth + 1) * 16}px`,
              }}
            >
              {item.title}
            </a>
          </li>
        )
      })}
    </ul>
  ) : null
}
