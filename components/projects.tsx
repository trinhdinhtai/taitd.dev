"use client"

import { Project, Tag } from "@prisma/client"

import ProjectCard from "@/components/project-card"

interface ProjectsProps {
  projects: (Project & {
    projectTag: { projectId: string; tagId: string; tag: Tag }[]
  })[]
}

export default function Projects({ projects }: Readonly<ProjectsProps>) {
  return (
    <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
      {projects.map((project) => (
        <ProjectCard key={project.id} project={project} />
      ))}
    </div>
  )
}
