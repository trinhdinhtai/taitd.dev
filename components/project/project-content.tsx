import { EntireProject } from "@/types/project"
import ProjectStacks from "@/components/project/project-stacks"

interface ProjectContentProps {
  project: EntireProject
}

export default function ProjectContent({
  project,
}: Readonly<ProjectContentProps>) {
  const { projectStack } = project
  return (
    <div className="space-y-8">
      <div className="flex flex-col justify-between gap-5 sm:flex-row lg:items-center">
        <div className="flex flex-wrap items-center gap-3">
          <span className="mb-1 text-[15px] text-neutral-700 dark:text-neutral-300">
            Tech Stack :
          </span>

          <ProjectStacks projectStack={projectStack} />
        </div>
      </div>
    </div>
  )
}
