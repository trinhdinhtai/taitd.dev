import Link from "next/link"

import { Icons } from "./icons"

interface BreadcrumbProps {
  title: string
}

const Breadcrumb = ({ title }: BreadcrumbProps) => {
  return (
    <div className="mb-4 flex items-center space-x-1 text-sm text-muted-foreground">
      <Link
        href="/"
        className="overflow-hidden text-ellipsis whitespace-nowrap"
      >
        <Icons.home className="h-4 w-4" />
      </Link>

      <Icons.chevronRight className="h-4 w-4" />

      <Link
        href="/blog"
        className="overflow-hidden text-ellipsis whitespace-nowrap"
      >
        Blog
      </Link>

      <Icons.chevronRight className="h-4 w-4" />
      <div className="font-medium text-foreground">{title}</div>
    </div>
  )
}

export default Breadcrumb
