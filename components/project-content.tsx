import { EntireProject } from "@/types/project"

interface ProjectContentProps {
  project: EntireProject
}

export default function ProjectContent({
  project,
}: Readonly<ProjectContentProps>) {
  return <div>ProjectContent</div>
}
