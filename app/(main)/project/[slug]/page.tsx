import { notFound } from "next/navigation"

import { prisma } from "@/lib/prisma"
import PageHeading from "@/components/page-heading"
import ProjectContent from "@/components/project-content"

export const revalidate = 0

interface ProjectPageProps {
  params: {
    slug: string
  }
}

export default async function ProjectPage({
  params,
}: Readonly<ProjectPageProps>) {
  const slug = params.slug
  const project = await prisma.project.findFirst({
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
