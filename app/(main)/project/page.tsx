import { Metadata } from "next"
import { projectsData } from "@/constants/projects-data"

import PageHeading from "@/components/page-heading"
import ProjectCard from "@/components/project-card"

export const metadata: Metadata = {
  title: "Projects",
}

const ProjectPage = () => {
  return (
    <>
      <PageHeading
        title="Projects"
        description="I've been making various types of projects some of them were basics and some of them were complicated."
      />

      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
        {projectsData.map((project, index) => (
          <ProjectCard key={index} project={project} />
        ))}
      </div>
    </>
  )
}

export default ProjectPage
