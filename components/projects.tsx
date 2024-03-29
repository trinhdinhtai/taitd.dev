"use client"

import { EntireProject } from "@/types/project"
import ProjectCard from "@/components/project-card"

interface ProjectsProps {
  projects: EntireProject[]
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
