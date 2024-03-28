"use client"

import Image from "next/image"
import Link from "next/link"
import { Project, Tag } from "@prisma/client"
import { ArrowRight, PinIcon } from "lucide-react"

interface ProjectCardProps {
  project: Project & {
    projectTag: { projectId: string; tagId: string; tag: Tag }[]
  }
}

const ProjectCard = ({ project }: ProjectCardProps) => {
  const { title, description, imageUrl, isFeature, projectTag } = project

  return (
    <Link href={`/project/${title}`}>
      <div className="group relative flex cursor-pointer flex-col justify-center rounded-lg border bg-background p-4 dark:bg-gray-900">
        {isFeature && (
          <div className="absolute right-0 top-0 z-[2] flex items-center gap-1 rounded-bl-lg rounded-tr-lg bg-lime-300 px-2 py-1 text-[13px] font-medium text-emerald-950">
            <PinIcon size={15} />
            <span>Featured</span>
          </div>
        )}

        <div className="relative w-full overflow-hidden rounded-md border">
          <Image
            src={imageUrl}
            alt={description}
            width={1200}
            height={630}
            quality={50}
            className="my-auto aspect-[2/1] w-full animate-reveal rounded-md object-cover transition-all group-hover:scale-105"
          />
          <div className="absolute left-0 top-0 flex h-full w-full items-center justify-center gap-1 rounded-md bg-black text-sm font-medium text-white opacity-0 transition-opacity duration-300 group-hover:opacity-80">
            <span>View Project</span>
            <ArrowRight size={20} />
          </div>
        </div>

        <div className="mt-4 flex h-full flex-col gap-3">
          <h1 className="font-bold text-neutral-900 dark:text-neutral-200">
            {title}
          </h1>
          <p className="line-clamp-5 text-sm text-muted-foreground">
            {description}
          </p>

          <div className="mt-auto flex flex-wrap items-center gap-1">
            {projectTag.map(({ tag }) => {
              return (
                <span
                  key={tag.id}
                  className="rounded bg-gray-100 px-2 py-1 text-xs text-gray-500 dark:bg-gray-700 dark:text-gray-300"
                >
                  {tag.name}
                </span>
              )
            })}
          </div>
        </div>
      </div>
    </Link>
  )
}

export default ProjectCard
