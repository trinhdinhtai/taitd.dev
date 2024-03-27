"use client"

import Image from "next/image"
import Link from "next/link"
import { Project } from "@/types"
import { PinIcon } from "lucide-react"

interface ProjectCardProps {
  project: Project
}

const ProjectCard = ({ project }: ProjectCardProps) => {
  const { title, description, tags, imageUrl, githubUrl } = project
  return (
    <div className="group relative flex cursor-pointer flex-col justify-center rounded-lg border bg-background p-4 dark:bg-gray-900">
      <div className="absolute right-0 top-0 z-[2] flex items-center gap-1 rounded-bl-lg rounded-tr-lg bg-lime-300 px-2 py-1 text-[13px] font-medium text-emerald-950">
        <PinIcon size={15} />
        <span>Featured</span>
      </div>
      <Link
        href={githubUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="relative w-full rounded-md border"
      >
        <Image
          src={imageUrl}
          alt={description}
          width={1200}
          height={630}
          quality={50}
          className="my-auto aspect-[2/1] w-full animate-reveal rounded-md object-cover transition-colors"
        />
      </Link>

      <div className="mt-4 flex h-full flex-col gap-3">
        <h1 className="font-bold text-neutral-900 dark:text-neutral-200">
          {title}
        </h1>
        <p className="line-clamp-5 text-sm text-muted-foreground">
          {description}
        </p>

        <div className="mt-auto flex flex-wrap items-center gap-1">
          {tags.map((tag, index) => {
            return (
              <span
                key={`${tag}-${index}`}
                className="rounded bg-gray-100 px-2 py-1 text-xs text-gray-500 dark:bg-gray-700 dark:text-gray-300"
              >
                {tag}
              </span>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default ProjectCard
