import { ReactNode } from "react"
import Link from "next/link"

interface ProjectLinksProps {
  title: string
  url: string
  icon?: ReactNode
}

export default function ProjectLink({
  title,
  url,
  icon,
}: Readonly<ProjectLinksProps>) {
  return (
    <Link href={url} target="_blank">
      <div className="flex items-center gap-2 font-medium text-neutral-700 dark:text-neutral-300">
        {icon}
        <span className="text-[15px] capitalize transition-all duration-300 dark:text-teal-500 hover:dark:text-teal-400">
          {title}
        </span>
      </div>
    </Link>
  )
}
