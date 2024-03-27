"use client"

import { Project } from "@prisma/client"

import ProjectCard from "@/components/project-card"

interface ProjectsProps {
  projects: Project[]
}

export default function Projects({ projects }: ProjectsProps) {
  console.log(projects)

  return (
    <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
      {projects.map((project) => (
        <ProjectCard key={project.id} project={project} />
      ))}
    </div>
  )
}
