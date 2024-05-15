import { Metadata } from "next"
import { db } from "@/server/db"

import PageHeading from "@/components/page-heading"
import Projects from "@/components/projects"

export const metadata: Metadata = {
  title: "Projects",
}

export const revalidate = 60

export default async function ProjectPage() {
  const projects = await db.project.findMany({
    include: {
      projectStack: {
        include: {
          stack: true,
        },
      },
    },
  })

  return (
    <>
      <PageHeading
        title="Projects"
        description="Several projects that I have worked on, both private and open source."
      />

      <Projects projects={projects} />
    </>
  )
}
