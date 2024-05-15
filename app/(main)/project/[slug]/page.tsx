import { notFound } from "next/navigation"
import { db } from "@/server/db"

import PageHeading from "@/components/page-heading"
import ProjectContent from "@/components/project/project-content"

export const revalidate = 60

interface ProjectPageProps {
  params: {
    slug: string
  }
}

export default async function ProjectPage({
  params,
}: Readonly<ProjectPageProps>) {
  const slug = params.slug
  const project = await db.project.findFirst({
    where: {
      slug: {
        equals: slug,
      },
    },
    include: {
      projectStack: {
        include: {
          stack: true,
        },
      },
    },
  })

  if (!project) return notFound()

  return (
    <div>
      <PageHeading title={project.title} description={project.description} />
      <ProjectContent project={project} />
    </div>
  )
}
