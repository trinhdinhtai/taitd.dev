import { Fragment } from "react"
import { projectsData } from "@/constants/projects-data"

import Container from "@/components/layout/container"
import PageHeading from "@/components/page-heading"
import ProjectCard from "@/components/project-card"

const ProjectPage = () => {
  return (
    <Container>
      <PageHeading
        title="Projects"
        description="I've been making various types of projects some of them were basics and some of them were complicated."
      />

      {projectsData.map((project, index) => (
        <Fragment key={index}>
          <ProjectCard project={project} />
        </Fragment>
      ))}
    </Container>
  )
}

export default ProjectPage
