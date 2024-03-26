import React from "react"
import cx from "clsx"

import { Icons } from "./icons"

interface Node {
  name: string
  isHighlighted?: boolean
  children?: Node[]
}

interface FolderTreeProps {
  data: Node[]
  title?: string
}

export default function FolderTree({ title, data }: Readonly<FolderTreeProps>) {
  return (
    <div className="shadow-surface-elevation-low mt-6 overflow-hidden rounded-lg border bg-background font-mono dark:bg-[#0A0A0A]">
      {title && (
        <div className="mb-0.5 rounded-md bg-rose-100/10 px-3 py-1 text-xs text-rose-100/70 shadow-sm">
          {title}
        </div>
      )}
      <div className="py-3 text-[13px] leading-6 [counter-reset:line]">
        <Inner level={0} data={data} />
      </div>
    </div>
  )
}

interface InnerProps {
  data: Node[]
  level: number
}

const Inner = ({ data, level }: InnerProps) => {
  return (
    <>
      {data.map((node) => {
        return (
          <React.Fragment key={node.name}>
            <div
              className={cx(
                "flex items-center space-x-2 border-l-4 border-l-transparent pr-4 before:ml-2 before:mr-4 before:inline-block before:w-4 before:text-right before:[content:counter(line)] before:[counter-increment:line]",
                {
                  "border-l-slate-400/70 bg-gray-200/80 before:text-white/70 dark:border-l-rose-300/30 dark:bg-secondary":
                    node.isHighlighted,
                  "before:text-white/20": !node.isHighlighted,
                }
              )}
            >
              <div
                className={cx(
                  node.isHighlighted ? "text-primary" : "text-muted-foreground",
                  {
                    "pl-[20px]": level === 1,
                    "pl-[40px]": level === 2,
                    "pl-[60px]": level === 3,
                    "pl-[80px]": level === 4,
                  }
                )}
              >
                {!node.children ? (
                  <Icons.fileCode className="w-4" />
                ) : (
                  <Icons.folder className="w-4" />
                )}
              </div>
              <div
                className={cx(
                  node.isHighlighted ? "text-primary" : "text-muted-foreground"
                )}
              >
                {node.name}
              </div>
            </div>

            {node.children && <Inner data={node.children} level={level + 1} />}
          </React.Fragment>
        )
      })}
    </>
  )
}
