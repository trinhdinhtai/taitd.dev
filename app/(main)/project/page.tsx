import { Metadata } from "next"
import { projectsData } from "@/constants/projects-data"

import { prisma } from "@/lib/prisma"
import PageHeading from "@/components/page-heading"
import ProjectCard from "@/components/project-card"
import Projects from "@/components/projects"

export const metadata: Metadata = {
  title: "Projects",
}

export default async function ProjectPage() {
  const projects = await prisma.project.findMany({})

  return (
    <>
      <PageHeading
        title="Projects"
        description="I've been making various types of projects some of them were basics and some of them were complicated."
      />

      <Projects projects={projects} />
    </>
  )
}
