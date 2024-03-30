"use client"

import { slideInWithFadeOut } from "@/constants/framer-motion-variants"
import { motion } from "framer-motion"

import { EntireProject } from "@/types/project"
import ProjectCard from "@/components/project/project-card"

interface ProjectsProps {
  projects: EntireProject[]
}

export default function Projects({ projects }: Readonly<ProjectsProps>) {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={slideInWithFadeOut}
      className="grid grid-cols-1 gap-8 sm:grid-cols-2"
    >
      {projects.map((project) => (
        <ProjectCard key={project.id} project={project} />
      ))}
    </motion.div>
  )
}
